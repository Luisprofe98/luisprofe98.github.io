"use strict";
window.Progress = (() => {
  // El almacenamiento es por origen y navegador. Nunca se transmite al servidor.
  const KEY='pylab-asir-progress-v1';
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
  const fresh=()=>({version:1,lessons:[],exercises:[],challenges:[],quizzes:{},days:[],lastLesson:null,lastModule:null,game:GameRules.empty()});
  let persistent=true;
  function day(date=new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  function sanitize(raw,strict=false) {
    if(!raw || typeof raw!=='object' || Array.isArray(raw) || raw.version!==1) {
      if(strict) throw new Error('No es una copia de progreso compatible (versión 1).');
      return fresh();
    }
    const value=fresh();
    for(const type of ['lessons','exercises','challenges']) {
      const known=new Set(Course[type].map(x=>x.id));
      value[type]=[...new Set((Array.isArray(raw[type])?raw[type]:[]).filter(id=>known.has(id)))];
    }
    for(const m of Course.modules) {
      if(!raw.quizzes || !own(raw.quizzes,String(m.id))) continue;
      const score=raw.quizzes[m.id];
      if(!score || typeof score!=='object') continue;
      const clamp=n=>Number.isFinite(n)?Math.min(100,Math.max(0,n)):0;
      value.quizzes[m.id]={best:clamp(score.best),last:clamp(score.last),attempts:Math.max(1,Math.min(100000,Math.floor(Number(score.attempts)||1)))};
      value.quizzes[m.id].best=Math.max(value.quizzes[m.id].best,value.quizzes[m.id].last);
    }
    value.days=[...new Set((Array.isArray(raw.days)?raw.days:[]).filter(d=>typeof d==='string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && Number.isFinite(Date.parse(`${d}T12:00:00`)) && day(new Date(`${d}T12:00:00`))===d && d<=day()))].sort().slice(-1000);
    value.lastLesson=Course.lessons.some(l=>l.id===raw.lastLesson)?raw.lastLesson:null;
    value.lastModule=Course.modules.some(m=>m.id===raw.lastModule)?raw.lastModule:null;
    value.game=GameRules.sanitize(raw.game,value);
    return value;
  }
  let state;
  try { state=sanitize(JSON.parse(localStorage.getItem(KEY))); }
  catch (_) { state=fresh(); }
  function save() {
    try { localStorage.setItem(KEY,JSON.stringify(state)); persistent=true; }
    catch (_) { if(persistent) UI.toast('No se puede guardar en este navegador. Exporta tu progreso antes de salir.'); persistent=false; }
    window.dispatchEvent(new Event('progresschange'));
  }
  function touch() { const today=day(); if(!state.days.includes(today)) state.days.push(today); }
  function transact(change) {
    const before=GameRules.snapshot(state);
    change(state); GameRules.sync(state); save();
    const after=GameRules.snapshot(state);
    const badges=after.badges.filter(id=>!before.badges.includes(id));
    if(after.xp>before.xp||badges.length)window.dispatchEvent(new CustomEvent('gamereward',{detail:{xp:after.xp-before.xp,level:after.level>before.level?after.level:null,badges}}));
  }
  function toggle(type,id) {
    if(!['lessons','exercises','challenges'].includes(type)||!Course[type].some(x=>x.id===id))return;
    transact(()=>{
      if(state[type].includes(id))state[type]=state[type].filter(x=>x!==id);
      else {state[type].push(id);GameRules.record(state,type,id);}
    });
  }
  function visit(lesson) { state.lastLesson=lesson.id; state.lastModule=lesson.module; save(); }
  function quiz(id,score) {
    if(!Course.modules.some(m=>m.id===Number(id))||!Number.isFinite(score))return;
    score=Math.min(100,Math.max(0,Math.round(score)));
    transact(()=>{
      const old=state.quizzes[id];
      state.quizzes[id]={best:Math.max(old?.best||0,score),last:score,attempts:(old?.attempts||0)+1};
      GameRules.activity(state,'quizzes:'+id);
    });
  }
  function record(kind,id){transact(()=>GameRules.record(state,kind,id));}
  function incident(id,step){
    const inc=GameData.incidents.find(x=>x.id===id);
    if(!inc||!Number.isInteger(step)||!inc.steps[step])return;
    transact(()=>{const solved=state.game.incidents[id]||(state.game.incidents[id]=[]);if(!solved.includes(step))solved.push(step);GameRules.activity(state,`incident:${id}:${step}`);});
  }
  function claim(id){
    const mission=GameRules.missions(state).find(m=>m.id===id);
    if(!mission?.ready||mission.claimed)return false;
    transact(()=>state.game.claimed.push(id));return true;
  }
  function profile(values){
    const old=state.game.profile,level=GameRules.summary(state).level;
    const updated={...old,...values};
    updated.alias=String(updated.alias).replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,24)||'Operador ASIR';
    if(!GameData.avatars.some(x=>x.id===updated.avatar))updated.avatar=old.avatar;
    if(!GameData.palettes.some(x=>x.id===updated.palette&&x.level<=level))updated.palette=old.palette;
    if(![1,3,5].includes(updated.goal))updated.goal=old.goal;
    updated.effects=updated.effects!==false;
    state.game.profile=updated;save();
  }
  function stats(module=null) {
    let total=0,done=0;
    for(const type of ['lessons','exercises','challenges']) {
      const items=Course[type].filter(x=>module===null||x.module===module);
      total+=items.length; done+=items.filter(x=>state[type].includes(x.id)).length;
    }
    const modules=module===null?Course.modules:Course.modules.filter(m=>m.id===module);
    total+=modules.length; done+=modules.filter(m=>state.quizzes[m.id]).length;
    return {total,done,percent:UI.pct(done,total)};
  }
  function streak() {
    const days=new Set(state.days); const date=new Date();
    if(!days.has(day(date))) date.setDate(date.getDate()-1);
    let count=0;
    while(days.has(day(date))) { count++; date.setDate(date.getDate()-1); }
    return count;
  }
  function next() {
    const last=Course.lessons.find(l=>l.id===state.lastLesson);
    if(last&&!state.lessons.includes(last.id)) return last;
    return Course.lessons.find(l=>!state.lessons.includes(l.id)) || Course.lessons[0];
  }
  function badges() {return GameRules.badges(state);}
  function exportData() { UI.download('pylab-asir-progreso.json',JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),'application/json'); }
  function importData(text) { state=sanitize(JSON.parse(text),true); save(); window.dispatchEvent(new Event('progressreplace')); }
  function reset() { state=fresh(); save(); window.dispatchEvent(new Event('progressreplace')); }
  function refresh() { try { state=sanitize(JSON.parse(localStorage.getItem(KEY))); } catch (_) { return; } window.dispatchEvent(new Event('progresschange')); }
  window.addEventListener('storage',e=>{if(e.key===KEY) refresh();});
  return {get state(){return state;},get persistent(){return persistent;},save,toggle,visit,quiz,record,incident,claim,profile,stats,streak,next,badges,exportData,importData,reset,day,touch};
})();

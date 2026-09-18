"use strict";
/* Reglas puras. Los XP se derivan de logros identificables, nunca de un contador importado. */
window.GameRules = (() => {
  const kinds=['lessons','exercises','challenges','predictions','debug'];
  const catalog=kind=>kind==='debug'?Course.bugs:Course[kind];
  const dateKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const unique=items=>[...new Set(items)];
  const validIds=(raw,known)=>unique((Array.isArray(raw)?raw:[]).filter(id=>known.includes(id)));
  const clamp=(n,max)=>Number.isFinite(n)?Math.max(0,Math.min(max,Math.floor(n))):0;
  function empty(){return {version:1,profile:{alias:'Operador ASIR',avatar:'terminal',palette:'mint',goal:3,effects:true},earned:{lessons:[],exercises:[],challenges:[],predictions:[],debug:[],quizzes:{}},incidents:{},claimed:[],activity:[]};}
  function sync(state){
    const g=state.game;
    for(const kind of ['lessons','exercises','challenges'])g.earned[kind]=unique([...g.earned[kind],...state[kind]]);
    for(const [id,q] of Object.entries(state.quizzes))g.earned.quizzes[id]=Math.max(g.earned.quizzes[id]||0,q.best);
  }
  function sanitize(raw,state){
    const g=empty();
    if(raw&&typeof raw==='object'&&!Array.isArray(raw)&&raw.version===1){
      const p=raw.profile||{};
      if(typeof p.alias==='string')g.profile.alias=p.alias.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,24)||g.profile.alias;
      if(GameData.avatars.some(a=>a.id===p.avatar))g.profile.avatar=p.avatar;
      if(GameData.palettes.some(a=>a.id===p.palette))g.profile.palette=p.palette;
      if([1,3,5].includes(p.goal))g.profile.goal=p.goal;
      g.profile.effects=p.effects!==false;
      for(const kind of kinds)g.earned[kind]=validIds(raw.earned?.[kind],catalog(kind).map(x=>x.id));
      for(const m of Course.modules){
        const score=raw.earned?.quizzes?.[m.id];
        if(typeof score==='number'&&Number.isFinite(score))g.earned.quizzes[m.id]=clamp(score,100);
      }
      for(const inc of GameData.incidents)g.incidents[inc.id]=validIds(raw.incidents?.[inc.id],inc.steps.map((_,i)=>i));
      g.claimed=validIds(raw.claimed,GameData.missions.map(m=>m.id));
      const known=new Set(kinds.flatMap(k=>catalog(k).map(x=>`${k}:${x.id}`)));
      Course.modules.forEach(m=>known.add(`quizzes:${m.id}`));
      GameData.incidents.forEach(i=>i.steps.forEach((_,n)=>known.add(`incident:${i.id}:${n}`)));
      const seen=new Set();
      g.activity=(Array.isArray(raw.activity)?raw.activity:[]).filter(a=>{
        if(!a||typeof a.day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(a.day)||a.day>dateKey()||!known.has(a.key))return false;
        const date=new Date(a.day+'T12:00:00');
        if(!Number.isFinite(date.getTime())||dateKey(date)!==a.day)return false;
        const key=a.day+'|'+a.key;if(seen.has(key))return false;seen.add(key);return true;
      }).map(a=>({day:a.day,key:a.key})).sort((a,b)=>a.day.localeCompare(b.day)).slice(-3000);
    }
    state.game=g;sync(state);
    // Una copia no puede reclamar misiones sin conservar sus requisitos.
    g.claimed=g.claimed.filter(id=>missions(state).find(m=>m.id===id)?.ready);
    const level=summary(state).level;
    if(GameData.palettes.find(p=>p.id===g.profile.palette).level>level)g.profile.palette='mint';
    return g;
  }
  function stars(state,id){
    const e=state.game.earned;
    return [Course.lessons.filter(x=>x.module===id).every(x=>e.lessons.includes(x.id)),Course.exercises.filter(x=>x.module===id&&e.exercises.includes(x.id)).length>=2,(e.quizzes[id]||0)>=80];
  }
  const mastery=state=>Course.modules.filter(m=>stars(state,m.id).every(Boolean)).map(m=>m.id);
  const incidentDone=(state,id)=>{const inc=GameData.incidents.find(i=>i.id===id);return !!inc&&inc.steps.every((_,n)=>(state.game.incidents[id]||[]).includes(n));};
  function missions(state){
    const e=state.game.earned, mastered=mastery(state),scores=Object.values(e.quizzes);
    const checks={
      first:[[e.lessons.length,2,'Lecciones'],[e.exercises.length,2,'Ejercicios'],[scores.filter(x=>x>=67).length,1,'Quiz ≥ 67%']],
      diagnostic:[[e.predictions.length,3,'Predicciones correctas'],[e.debug.length,3,'Diagnósticos autoevaluados']],
      foundation:[[mastered.filter(x=>x<=4).length,4,'Módulos 1–4 con 3 estrellas']],
      field:[[e.exercises.length,15,'Ejercicios'],[e.challenges.length,2,'Retos']],
      quality:[[scores.filter(x=>x===100).length,5,'Quiz con un 100%']],
      resilience:[[mastered.filter(x=>[11,12].includes(x)).length,2,'Módulos 11 y 12 con 3 estrellas']],
      response:[[GameData.incidents.filter(i=>incidentDone(state,i.id)).length,3,'Incidentes resueltos']],
      deployment:[[mastered.length,14,'Módulos con 3 estrellas'],[e.challenges.length,6,'Retos']]
    };
    return GameData.missions.map(m=>({...m,checks:checks[m.id],ready:checks[m.id].every(([n,target])=>n>=target),claimed:state.game.claimed.includes(m.id)}));
  }
  function points(kind,id){
    const x=catalog(kind)?.find(x=>x.id===id);if(!x)return 0;
    const rule=GameData.points[kind];return typeof rule==='number'?rule:rule[x.level]||0;
  }
  function summary(state){
    const g=state.game,p=GameData.points,e=g.earned;
    const breakdown=kinds.map(kind=>({kind,xp:e[kind].reduce((n,id)=>n+points(kind,id),0)}));
    const quizXP=Object.entries(e.quizzes).reduce((sum,[id,best])=>{
      const count=Course.quizzes.filter(q=>q.module===Number(id)).length;
      return sum+p.quizAttempt+Math.round(best*count/100)*p.quizAnswer+(best===100?p.quizPerfect:0);
    },0);
    breakdown.push({kind:'quizzes',xp:quizXP},{kind:'mastery',xp:mastery(state).length*p.mastery});
    breakdown.push({kind:'incidents',xp:GameData.incidents.reduce((n,i)=>n+(g.incidents[i.id]||[]).length*p.incidentStep+(incidentDone(state,i.id)?i.bonus:0),0)});
    breakdown.push({kind:'missions',xp:GameData.missions.filter(m=>g.claimed.includes(m.id)).reduce((n,m)=>n+m.xp,0)});
    const xp=breakdown.reduce((n,x)=>n+x.xp,0),ranks=GameData.ranks;
    let idx=0;for(let n=1;n<ranks.length;n++)if(xp>=ranks[n].xp)idx=n;
    const next=ranks[idx+1]||null;
    return {xp,level:idx+1,title:ranks[idx].title,next,remaining:next?next.xp-xp:0,percent:next?Math.floor((xp-ranks[idx].xp)/(next.xp-ranks[idx].xp)*100):100,breakdown,mastered:mastery(state).length};
  }
  function longestStreak(state){
    const days=[...new Set(state.days)].sort();let best=0,current=0,previous=null;
    for(const key of days){const date=new Date(key+'T12:00:00');const yesterday=new Date(date);yesterday.setDate(yesterday.getDate()-1);current=previous===dateKey(yesterday)?current+1:1;best=Math.max(best,current);previous=key;}
    return best;
  }
  function badges(state){
    const e=state.game.earned,s=summary(state),finished=GameData.incidents.filter(i=>incidentDone(state,i.id)).length;
    return [
      ['first','Primer despliegue','Completa las 2 lecciones del módulo 1.','terminal',Course.lessons.filter(l=>l.module===1&&e.lessons.includes(l.id)).length,2],
      ['practice10','Manos al teclado','Completa 10 ejercicios.','code',e.exercises.length,10],
      ['practice50','Resolución de problemas','Completa 50 ejercicios.','spark',e.exercises.length,50],
      ['route','Ruta completada','Completa las 28 lecciones.','book',e.lessons.length,28],
      ['perfect','Sin fallos','Consigue un 100% en un quiz.','quiz',Object.values(e.quizzes).filter(x=>x===100).length,1],
      ['predict','Visión de código','Acierta 5 predicciones.','eye',e.predictions.length,5],
      ['debug','Cazador de errores','Autoevalúa 5 diagnósticos.','bug',e.debug.length,5],
      ['challenge','En producción simulada','Completa 3 retos.','flag',e.challenges.length,3],
      ['all-challenges','Ingeniería de campo','Completa los 12 retos.','layers',e.challenges.length,12],
      ['days','Constancia','Practica 3 días consecutivos. El logro se conserva después.','flame',longestStreak(state),3],
      ['incident','Respuesta completa','Resuelve los 3 incidentes.','shield',finished,3],
      ['master','Dominio de la ruta','Obtén las 3 estrellas de los 14 módulos.','award',s.mastered,14]
    ].map(([id,title,text,icon,value,target])=>({id,title,text,icon,value,target,earned:value>=target}));
  }
  function activity(state,key){
    const day=dateKey();if(!state.days.includes(day))state.days.push(day);
    if(!state.game.activity.some(a=>a.day===day&&a.key===key))state.game.activity.push({day,key});
    state.game.activity=state.game.activity.slice(-3000);
  }
  function record(state,kind,id){
    if(!kinds.includes(kind)||!catalog(kind).some(x=>x.id===id))return false;
    if(!state.game.earned[kind].includes(id))state.game.earned[kind].push(id);
    activity(state,kind+':'+id);return true;
  }
  function snapshot(state){return {...summary(state),badges:badges(state).filter(x=>x.earned).map(x=>x.id)};}
  function daily(state){const done=state.game.activity.filter(x=>x.day===dateKey()).length;return {done,goal:state.game.profile.goal,percent:Math.min(100,Math.round(done/state.game.profile.goal*100))};}
  return {empty,sanitize,sync,stars,mastery,incidentDone,missions,points,summary,badges,activity,record,snapshot,daily,dateKey};
})();

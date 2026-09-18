"use strict";
window.GameUI = (() => {
  const {h,icon}=UI;
  let rewardTimer=null,accumulated=null;
  function update(){
    const profile=Progress.state.game.profile,s=GameRules.summary(Progress.state);
    document.documentElement.dataset.palette=profile.palette;
    document.documentElement.dataset.effects=profile.effects?'on':'off';
    const chip=document.getElementById('game-profile-chip');
    if(chip){chip.innerHTML=`${icon(profile.avatar)}<span>Nv. ${s.level}</span>`;chip.setAttribute('aria-label',`Perfil de ${profile.alias}. Nivel ${s.level}, ${s.xp} XP`);}
    const nav=document.getElementById('game-nav-xp');if(nav)nav.textContent=s.xp.toLocaleString('es-ES')+' XP';
    const ready=GameRules.missions(Progress.state).filter(m=>m.ready&&!m.claimed).length;
    const count=document.getElementById('game-mission-count');if(count){count.textContent=ready||'';count.hidden=!ready;}
  }
  function reward(event){
    const d=event.detail,el=document.getElementById('game-reward');if(!el)return;
    // Una acción puede ganar XP, nivel e insignias a la vez: se comunica en una sola tarjeta.
    if(!accumulated)accumulated={xp:0,level:null,badges:[]};
    accumulated.xp+=d.xp;accumulated.level=d.level||accumulated.level;accumulated.badges=[...new Set([...accumulated.badges,...d.badges])];
    const all=GameRules.badges(Progress.state),titles=accumulated.badges.map(id=>all.find(x=>x.id===id)?.title).filter(Boolean);
    const title=accumulated.level?`¡Nivel ${accumulated.level} desbloqueado!`:titles.length?'Nueva insignia conseguida':'Un paso más en tu trayectoria';
    el.innerHTML=`<span class="g-reward-icon">${icon(accumulated.level?'spark':titles.length?'award':'check')}</span><div><strong>${h(title)}</strong><span>${accumulated.xp?'+'+accumulated.xp+' XP':''}${titles.length?' · '+h(titles.join(' · ')):''}</span></div>`;
    el.classList.add('visible');clearTimeout(rewardTimer);
    rewardTimer=setTimeout(()=>{el.classList.remove('visible');accumulated=null;},5000);
  }
  function checkIncident(el){
    const id=el.dataset.id,n=Number(el.dataset.step),inc=GameData.incidents.find(x=>x.id===id),step=inc?.steps[n];if(!step)return;
    const field=document.querySelector(`input[name="incident-${id}-${n}"]:checked`),feedback=document.getElementById(`incident-feedback-${id}-${n}`);
    if(!field){feedback.innerHTML='<p class="callout">Selecciona una decisión antes de comprobar.</p>';feedback.focus();return;}
    if(Number(field.value)!==step.answer){feedback.innerHTML=`<p class="callout warning"><strong>Aún no resuelve el problema. No pierdes puntos.</strong> ${h(step.explanation)} Puedes revisar tu decisión e intentarlo de nuevo.</p>`;feedback.focus();return;}
    Progress.incident(id,n);App.render();
    document.getElementById(`incident-feedback-${id}-${n}`)?.focus({preventScroll:true});
  }
  function debug(el){
    const id=el.dataset.id,field=document.getElementById('diagnosis-'+id),checked=document.getElementById('reviewed-'+id);
    if(!field||field.value.trim().length<30){UI.toast('Escribe un diagnóstico de al menos 30 caracteres: causa, corrección y comprobación.');field?.focus();return;}
    if(!checked?.checked){UI.toast('Contrasta la solución y confirma que has revisado tu diagnóstico.');checked?.focus();return;}
    Progress.record('debug',id);el.disabled=true;el.textContent='Diagnóstico registrado · XP conseguidos';
    const tag=el.closest('article')?.querySelector('.g-xp-tag');if(tag)tag.outerHTML=GameViews.xpTag('debug',id);
    UI.toast('Diagnóstico registrado como autoevaluación, no como corrección automática.');
  }
  function profileSubmit(event){
    event.preventDefault();const form=new FormData(event.target);
    Progress.profile({alias:form.get('alias'),goal:Number(form.get('goal')),effects:form.has('effects')});
    App.render();UI.toast('Perfil guardado. Tu objetivo se adapta a ti.');
  }
  function init(){
    window.addEventListener('gamereward',reward);
    window.addEventListener('progressreplace',()=>{clearTimeout(rewardTimer);accumulated=null;document.getElementById('game-reward')?.classList.remove('visible');});
    document.addEventListener('submit',e=>{if(e.target.id==='game-profile-form')profileSubmit(e);});
  }
  function act(action,el){
    if(action==='game-claim'){if(Progress.claim(el.dataset.id))App.render();}
    if(action==='game-incident')checkIncident(el);
    if(action==='game-debug')debug(el);
    if(action==='game-avatar'){Progress.profile({avatar:el.dataset.id});App.render();UI.toast('Emblema actualizado.');}
    if(action==='game-palette'){Progress.profile({palette:el.dataset.id});App.render();UI.toast('Tema visual actualizado.');}
  }
  return {init,update,act};
})();

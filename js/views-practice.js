"use strict";
window.PracticeViews = (() => {
  const {h,icon,link,code,badge,pageHead}=UI;
  const filterItem=(x,p,type)=>{
    const module=Number(p.get('module')), level=p.get('level'), state=p.get('state'), q=UI.norm(p.get('q')||'');
    return (!module||x.module===module)&&(!level||x.level===level)&&(!state||(state==='done')===Progress.state[type].includes(x.id))&&(!q||UI.norm(x.title+' '+(x.statement||x.brief)+' '+(x.concepts||[]).join(' ')).includes(q));
  };
  function filters(route,p) {
    return `<form class="card filter-bar" data-filter-route="${route}"><label class="search-field">Buscar actividad<input type="search" name="q" value="${h(p.get('q')||'')}" placeholder="Logs, puertos, usuarios…"></label><label>Módulo<select name="module">${CourseViews.moduleOptions(p.get('module'))}</select></label><label>Dificultad<select name="level"><option value="">Todas las dificultades</option>${['Básico','Intermedio','Avanzado'].map(d=>`<option ${p.get('level')===d?'selected':''}>${d}</option>`).join('')}</select></label><label>Estado<select name="state"><option value="">Todas las actividades</option><option value="pending" ${p.get('state')==='pending'?'selected':''}>Pendientes</option><option value="done" ${p.get('state')==='done'?'selected':''}>Completadas</option></select></label><button class="btn secondary" type="submit">Aplicar ${icon('search')}</button><a class="btn ghost" href="#/${route}">Limpiar</a></form>`;
  }
  function activityCard(x,type) {
    const done=Progress.state[type].includes(x.id), route=type==='exercises'?'exercise':'challenge';
    return `<article class="card exercise-card"><div class="card-header"><span class="exercise-id">${x.id.toUpperCase()} · M${String(x.module).padStart(2,'0')}</span>${badge(x.level)}</div><h3><a href="#/${route}/${x.id}">${h(x.title)}</a></h3><p>${h(x.statement||x.brief)}</p>${x.concepts?`<div class="tag-row">${x.concepts.map(t=>`<span class="pill">${h(t)}</span>`).join('')}</div>`:''}<div class="card-footer"><span>${done?`${icon('check')} Completado`:x.minutes?`${x.minutes} min orientativos`:'Pendiente'}</span><a class="text-link" href="#/${route}/${x.id}">${type==='exercises'?'Resolver':'Abrir reto'} ${icon('arrow')}</a></div></article>`;
  }
  function exercises(p) {
    const items=Course.exercises.filter(x=>filterItem(x,p,'exercises'));
    return pageHead('PRACTICA LO APRENDIDO','Pequeños problemas. Grandes avances.','56 ejercicios con contexto ASIR. Intenta resolverlos antes de desplegar la solución.')+filters('exercises',p)+`<p class="filter-count">${items.length} ejercicios encontrados · ${Progress.state.exercises.length} de 56 marcados como realizados</p>`+(items.length?`<div class="grid-3">${items.map(x=>activityCard(x,'exercises')).join('')}</div>`:UI.empty('No hay coincidencias','Cambia el módulo, la dificultad o el texto de búsqueda.'));
  }
  function exercise(id) {
    const x=Course.exercises.find(x=>x.id===id);if(!x)return UI.empty('Ejercicio no encontrado','Abre una actividad desde el banco de ejercicios.');
    const done=Progress.state.exercises.includes(id);
    return `<div class="exercise-detail"><a class="back-link" href="#/exercises?module=${x.module}">${icon('arrow')} Ejercicios · ${h(UI.moduleName(x.module))}</a>`+pageHead(`${id.toUpperCase()} · MÓDULO ${String(x.module).padStart(2,'0')}`,x.title,'',badge(x.level))+
      `${GameViews.xpTag('exercises',id)}<p class="brief">${h(x.statement)}</p><div class="tag-row">${x.concepts.map(t=>`<span class="pill">${h(t)}</span>`).join('')}</div><div class="section"><h2>Tu espacio de trabajo</h2>${code(x.starter,'Punto de partida',true,x.inputs)}<button class="btn primary" data-action="exercise-lab" data-id="${id}">${icon('terminal')} Resolver en el laboratorio</button>${x.inputs?`<p class="inline-note">${icon('info')}Entradas de prueba, en orden: ${h(x.inputs.split('\n').join(' · '))}.</p>`:''}</div>
      <details><summary>Necesito una pista</summary><div class="details-body"><p>${h(x.hint)}</p></div></details>
      ${x.expected!==null?`<details><summary>Consultar la salida esperada</summary><div class="details-body">${code(x.expected,'Salida esperada',false)}</div></details>`:''}
      <details><summary>Ver solución explicada</summary><div class="details-body">${code(x.solution,'Una posible solución',true,x.inputs)}<h3>Por qué funciona</h3><p>${h(x.explanation)}</p></div></details>
      <div class="callout"><strong>Comprueba tu trabajo:</strong> contrasta la salida, revisa los conceptos utilizados y prueba un caso distinto. Ejecutar código no marca automáticamente este ejercicio como correcto.</div><div class="button-row"><button class="btn ${done?'secondary':'primary'}" data-action="complete" data-kind="exercises" data-id="${id}">${icon(done?'reset':'check')}${done?'Marcar como pendiente':'Marcar como realizado (autoevaluación)'}</button>${link(`#/quiz/${x.module}`,'Quiz del módulo','ghost','quiz')}</div></div>`;
  }
  function challenges(p) {
    const items=Course.challenges.filter(x=>filterItem(x,p,'challenges'));
    return pageHead('INTEGRA TUS CONOCIMIENTOS','Un reto. Varias herramientas.','12 proyectos de administración simulada. Lee los requisitos, planifica la solución y comprueba los casos límite.')+filters('challenges',p)+`<p class="filter-count">${items.length} retos encontrados · ${Progress.state.challenges.length} de 12 completados</p>`+(items.length?`<div class="grid-2">${items.map(x=>activityCard(x,'challenges')).join('')}</div>`:UI.empty('No hay retos con estos filtros','Prueba otra dificultad o módulo.'));
  }
  function challenge(id) {
    const x=Course.challenges.find(x=>x.id===id); if(!x)return UI.empty('Reto no encontrado','Vuelve al catálogo de retos.');
    const done=Progress.state.challenges.includes(id);
    return `<div class="exercise-detail"><a class="back-link" href="#/challenges">${icon('arrow')} Todos los retos</a>`+pageHead(`${id.toUpperCase()} · ${x.minutes} MIN ORIENTATIVOS · HASTA EL MÓDULO ${x.module}`,x.title,'',badge(x.level))+
      `${GameViews.xpTag('challenges',id)}<p class="brief">${h(x.brief)}</p><section class="section card"><h2>Criterios de aceptación</h2><ol class="acceptance-list">${x.requirements.map(t=>`<li>${h(t)}</li>`).join('')}</ol></section><section class="section"><h2>Datos y punto de partida</h2>${code(x.starter,'Datos del reto')}<button class="btn primary" data-action="challenge-lab" data-id="${id}">${icon('terminal')} Empezar en el laboratorio</button></section><details><summary>Ver la salida para los datos de ejemplo</summary><div class="details-body">${code(x.expected,'Salida de referencia',false)}</div></details><details><summary>Consultar una solución completa</summary><div class="details-body">${code(x.solution,'Solución de referencia')}<h3>Decisiones de diseño</h3><p>${h(x.explanation)}</p></div></details><div class="callout warning"><strong>Antes de completar:</strong> verifica todos los requisitos, prueba una entrada vacía o incorrecta y explica cómo evita tu código modificar sistemas reales.</div><button class="btn ${done?'secondary':'primary'}" data-action="complete" data-kind="challenges" data-id="${id}">${icon(done?'reset':'check')} ${done?'Marcar como pendiente':'Marcar reto como completado (autoevaluación)'}</button></div>`;
  }
  function predict(p) {
    const mid=Number(p.get('module'))||0,items=Course.predictions.filter(x=>!mid||x.module===mid);
    return pageHead('LEE · PIENSA · COMPRUEBA','¿Qué hace este código?','Escribe la salida antes de verla. Se respetan mayúsculas y espacios internos; no se exige un salto final.')+
      `<form class="card filter-bar" data-filter-route="predict"><label>Módulo<select name="module">${CourseViews.moduleOptions(mid)}</select></label><button class="btn secondary" type="submit">Filtrar</button></form>`+
      `<div class="grid-2">${items.map(x=>`<article class="card" id="prediction-${x.id}"><p class="eyebrow">${x.id.toUpperCase()} · MÓDULO ${String(x.module).padStart(2,'0')}</p><h2>${h(x.title)}</h2><div id="prediction-xp-${x.id}">${GameViews.xpTag('predictions',x.id)}</div>${code(x.code,'Predice antes de ejecutar',false)}<label class="sr-only" for="answer-${x.id}">Salida prevista para ${h(x.title)}</label><textarea class="prediction-input" id="answer-${x.id}" placeholder="Escribe aquí la salida, una línea por cada print…" spellcheck="false"></textarea><div class="activity-controls"><button class="btn secondary small" data-action="predict-check" data-id="${x.id}">Comprobar predicción</button><button class="btn ghost small" data-action="predict-show" data-id="${x.id}">Ver resultado ${icon('eye')}</button></div><div id="feedback-${x.id}" aria-live="polite"></div><a class="text-link" href="#/module/${x.module}">Repasar el concepto ${icon('arrow')}</a></article>`).join('')}</div>`;
  }
  function checkPrediction(id,reveal=false) {
    const x=Course.predictions.find(x=>x.id===id);if(!x)return;
    const field=document.getElementById('answer-'+id), box=document.getElementById('feedback-'+id);
    const normalize=s=>s.replace(/\r/g,'').split('\n').map(line=>line.trimEnd()).join('\n').replace(/^\n+|\n+$/g,'');
    if(!reveal&&!field.value.trim()){UI.toast('Escribe primero tu predicción.');field.focus();return;}
    const correct=normalize(field.value)===normalize(x.output);
    box.innerHTML=`<div class="prediction-feedback ${correct&&!reveal?'correct':'incorrect'}"><strong>${reveal?'Salida de referencia':correct?'Predicción correcta':'Hay una diferencia. Revisa la salida.'}</strong><pre>${h(x.output)}</pre><p>${h(x.explanation)}</p></div>`;
    if(!reveal&&correct)Progress.record('predictions',id);
    else if(!reveal){Progress.touch();Progress.save();}
    const xp=document.getElementById('prediction-xp-'+id);if(xp)xp.innerHTML=GameViews.xpTag('predictions',id);
  }
  function debug(p) {
    const mid=Number(p.get('module'))||0;
    return pageHead('ENTRENA EL DIAGNÓSTICO','El error también enseña.','14 fallos habituales: detecta la causa, redacta el diagnóstico y contrasta una posible corrección. Tu explicación es de autoevaluación.')+
      `<form class="card filter-bar" data-filter-route="debug"><label>Módulo<select name="module">${CourseViews.moduleOptions(mid)}</select></label><button class="btn secondary" type="submit">Filtrar</button></form>`+
      `<div class="grid-2">${Course.bugs.filter(x=>!mid||x.module===mid).map(x=>`<article class="card"><p class="eyebrow">${x.id.toUpperCase()} · MÓDULO ${String(x.module).padStart(2,'0')}</p><h2>${h(x.title)}</h2>${GameViews.xpTag('debug',x.id)}${code(x.code,'Código con un fallo',true,x.module===4?'20':'')}<label class="sr-only" for="diagnosis-${x.id}">Tu diagnóstico para ${h(x.title)}</label><textarea class="prediction-input" id="diagnosis-${x.id}" placeholder="¿Qué falla, por qué y cómo lo cambiarías?"></textarea><details><summary>Contrastar diagnóstico y corrección</summary><div class="details-body"><p><strong>${h(x.error)}</strong></p>${code(x.solution,'Código corregido',true,x.module===4?'20':'')}<p>${h(x.explanation)}</p><label class="g-check-label"><input type="checkbox" id="reviewed-${x.id}"> He comparado mi diagnóstico y entiendo la corrección.</label></div></details><div class="g-debug-action"><button class="btn secondary" data-action="game-debug" data-id="${x.id}" ${Progress.state.game.earned.debug.includes(x.id)?'disabled':''}>${Progress.state.game.earned.debug.includes(x.id)?'Diagnóstico registrado · XP conseguidos':'Registrar diagnóstico (autoevaluación)'}</button><p class="tiny">Escribe al menos 30 caracteres y confirma la revisión dentro de la solución. El texto no se corrige automáticamente.</p></div><a class="text-link" href="#/module/${x.module}">Repasar el módulo ${icon('arrow')}</a></article>`).join('')}</div>`;
  }
  return {exercises,exercise,challenges,challenge,predict,debug,checkPrediction};
})();

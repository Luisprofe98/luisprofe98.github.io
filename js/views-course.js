"use strict";
window.CourseViews = (() => {
  const {h,icon,link,code,bar,pageHead}=UI;
  function moduleCard(m) {
    const stats=Progress.stats(m.id), done=Course.lessons.filter(l=>l.module===m.id&&Progress.state.lessons.includes(l.id)).length;
    const status=stats.percent===100?'Completado':stats.done?'En progreso':'Disponible';
    return `<a class="module-card" href="#/module/${m.id}"><div class="module-top"><span class="module-number">${String(m.id).padStart(2,'0')}</span><span class="badge ${stats.done?'accent':''}">${status}</span></div><h3>${h(m.title)}</h3><p>${h(m.description)}</p><div class="module-bottom"><span>${done}/2 lecciones · 4 ejercicios</span><span>${stats.percent}%</span></div>${bar(stats.percent,`Módulo ${m.id}`)}</a>`;
  }
  function home() {return GameViews.home();}
  function modules() {
    const total=Progress.stats();
    const groups=[['01','Fundamentos y primeros scripts',1,4],['02','Lógica y estructuras de datos',5,10],['03','Archivos, robustez y automatización',11,14]];
    return pageHead('RECORRIDO DEL CURSO','Un paso cada vez.','14 módulos, 28 lecciones y práctica en cada etapa. Puedes avanzar en orden o consultar cualquier concepto.')+
      `<div class="card course-overview"><div class="progress-ring" style="--progress:${total.percent}"><strong>${total.percent}%</strong></div><div><h2>Fundamentos de Python para ASIR</h2><p>${total.done} de ${total.total} actividades del recorrido completadas. Tu progreso solo se guarda en este navegador.</p><p class="tiny">El progreso cuenta lecciones, ejercicios, retos y quiz entregados; no representa una calificación.</p></div></div>`+
      groups.map(([n,title,a,b])=>`<section class="roadmap-group"><h2 class="group-heading"><span>${n}</span>${title}</h2><div class="grid-3">${Course.modules.filter(m=>m.id>=a&&m.id<=b).map(moduleCard).join('')}</div></section>`).join('');
  }
  function lessonItem(l,index) {
    const done=Progress.state.lessons.includes(l.id);
    return `<a class="lesson-item" href="#/lesson/${l.id}"><span class="lesson-index">${done?icon('check'):String(index+1).padStart(2,'0')}</span><div><h3>${h(l.title)}</h3><p>${h(l.objective)} · ${l.minutes} min orientativos</p></div>${icon(done?'check':'chevron',done?'done':'')}</a>`;
  }
  function moduleView(id) {
    const m=Course.modules.find(x=>x.id===Number(id)); if(!m)return UI.empty('Módulo no encontrado','Vuelve al temario para elegir un módulo válido.');
    const items=Course.lessons.filter(l=>l.module===m.id), stats=Progress.stats(m.id), result=Progress.state.quizzes[m.id];
    return `<a class="back-link" href="#/modules">${icon('arrow')} Volver al temario</a>`+pageHead(`MÓDULO ${String(m.id).padStart(2,'0')} / 14`,m.title,m.description)+
      `<div class="g-module-star-note"><span class="g-stars" aria-label="${GameRules.stars(Progress.state,m.id).filter(Boolean).length} de 3 estrellas">${GameRules.stars(Progress.state,m.id).map(on=>`<span class="${on?'earned':''}" aria-hidden="true">★</span>`).join('')}</span><p>Completa las dos lecciones, realiza dos ejercicios y alcanza al menos el 80% en el quiz para ganar +100 XP. <a class="text-link" href="#/operations">Ver campaña</a></p></div><div class="tag-row">${m.terms.map(t=>`<span class="pill">${h(t)}</span>`).join('')}</div><section class="section"><div class="section-head"><h2>01 · Aprende los conceptos</h2><span class="tiny">${stats.percent}% del módulo</span></div><div class="lesson-list">${items.map(lessonItem).join('')}</div></section>
      <section class="section grid-2"><div class="card"><p class="eyebrow">02 · PRACTICA</p><h2>Del ejemplo a tu solución</h2><p class="muted">Cuatro ejercicios con pistas y soluciones explicadas. Marca tu avance después de contrastar tu trabajo.</p>${link(`#/exercises?module=${m.id}`,'Practicar este módulo','primary','code')}</div><div class="card"><p class="eyebrow">03 · COMPRUEBA</p><h2>Quiz del módulo</h2><p class="muted">Seis preguntas con corrección y explicación. ${result?`Mejor resultado: ${result.best}%. Intentos: ${result.attempts}.`:'Todavía no has entregado este cuestionario.'}</p>${link(`#/quiz/${m.id}`,'Abrir cuestionario','secondary','quiz')}</div></section>
      <div class="section button-row">${m.id>1?link(`#/module/${m.id-1}`,'Módulo anterior','ghost','book'):''}${m.id<14?link(`#/module/${m.id+1}`,'Siguiente módulo','ghost'):''}</div>`;
  }
  function lessonsIndex(params) {
    const mid=Number(params.get('module'))||0;
    return pageHead('BIBLIOTECA','Todas las lecciones','Explicación → ejemplo → práctica. Accede directamente a la parte que necesitas repasar.')+
      `<form class="card filter-bar" data-filter-route="lessons"><label>Módulo<select name="module">${moduleOptions(mid)}</select></label><button class="btn secondary" type="submit">Filtrar ${icon('search')}</button></form>`+
      Course.modules.filter(m=>!mid||m.id===mid).map(m=>`<section class="section"><div class="section-head"><h2>${String(m.id).padStart(2,'0')} · ${h(m.title)}</h2><a class="text-link" href="#/module/${m.id}">Ver módulo ${icon('arrow')}</a></div><div class="lesson-list">${Course.lessons.filter(l=>l.module===m.id).map(lessonItem).join('')}</div></section>`).join('');
  }
  function moduleOptions(id=0) { return `<option value="">Todos los módulos</option>`+Course.modules.map(m=>`<option value="${m.id}" ${Number(id)===m.id?'selected':''}>${String(m.id).padStart(2,'0')} · ${h(m.title)}</option>`).join(''); }
  function lessonView(id) {
    const l=Course.lessons.find(x=>x.id===id); if(!l)return UI.empty('Lección no encontrada','Selecciona una lección desde el temario.');
    Progress.visit(l);
    const done=Progress.state.lessons.includes(id), all=Course.lessons, index=all.indexOf(l), stats=Progress.stats(l.module);
    const sections=[['objective','Objetivo'],['theory','Explicación'],['syntax','Sintaxis'],['example','Ejemplo paso a paso'],['asir','En un entorno ASIR'],['mistakes','Errores frecuentes'],['practice','Práctica rápida']];
    const pbody=l.body.map(p=>`<p>${h(p)}</p>`).join('');
    return `<a class="back-link" href="#/module/${l.module}">${icon('arrow')} ${h(UI.moduleName(l.module))}</a>`+
      pageHead(`MÓDULO ${String(l.module).padStart(2,'0')} · LECCIÓN ${index%2+1} DE 2`,l.title,l.objective)+
      `<div class="lesson-meta"><span>${icon('clock')}${l.minutes} min orientativos</span><span>${icon('book')} Teoría + práctica</span>${done?`<span class="badge accent">${icon('check')} Completada</span>`:''}</div><div class="lesson-layout"><article class="lesson-body">
      ${GameViews.xpTag('lessons',id)}<section id="objective"><div class="callout objective"><strong>Al terminar:</strong> ${h(l.objective)}</div></section><section id="theory"><h2>01 · Entiende la idea</h2>${pbody}</section>
      <section id="syntax"><h2>02 · La sintaxis</h2>${code(l.syntax,'Referencia de sintaxis',false)}<p class="tiny">La referencia usa nombres genéricos. Ejecuta los ejemplos completos que aparecen debajo.</p></section>
      <section id="example"><h2>03 · Mira cómo funciona</h2>${code(l.code,l.title,true,l.module===4?'web01\n16':'')}<h3>Línea por línea</h3><ol class="line-explanation">${l.lineNotes.map(t=>`<li>${h(t)}</li>`).join('')}</ol></section>
      <section id="asir"><h2>04 · Aplícalo a ASIR</h2>${code(l.asir,'Ejemplo de administración',true,l.module===4?'443':'')}${l.note?`<div class="callout warning">${h(l.note)}</div>`:''}</section>
      <section id="mistakes"><h2>05 · Errores que conviene evitar</h2><ul>${l.errors.map(e=>`<li>${h(e)}</li>`).join('')}</ul></section>
      <section id="practice"><h2>06 · Tu turno</h2><p>${h(l.quick)}</p><button class="btn secondary" data-action="quick-lab" data-id="${l.id}">${icon('terminal')} Resolver en el laboratorio</button><details><summary>Ver una posible solución</summary><div class="details-body">${code(l.answer,'Solución de la práctica',true,l.module===4?'5':'')}</div></details></section>
      <div class="lesson-complete"><h3>${done?'Ya has completado esta lección.':'¿Has entendido y practicado el ejemplo?'}</h3><p>Completar la lección es una autoevaluación. El quiz del módulo te ayudará a contrastarla.</p><div class="button-row"><button class="btn ${done?'secondary':'primary'}" data-action="complete" data-kind="lessons" data-id="${id}">${icon(done?'reset':'check')} ${done?'Marcar como pendiente':'Marcar lección como completada'}</button>${link(`#/exercises?module=${l.module}`,'Ir a ejercicios','ghost','code')}</div></div>
      <div class="lesson-pagination">${index>0?link('#/lesson/'+all[index-1].id,'Anterior: '+all[index-1].title,'secondary','book'):'<span></span>'}${index<all.length-1?link('#/lesson/'+all[index+1].id,'Siguiente: '+all[index+1].title,'secondary'):link('#/challenges','Ir a los retos finales','primary')}</div></article>
      <aside class="card lesson-toc"><p class="eyebrow">EN ESTA LECCIÓN</p>${sections.map(([target,text])=>`<a href="#${target}" data-scroll="${target}">${h(text)}</a>`).join('')}<hr><h2>Tu avance en el módulo</h2>${bar(stats.percent)}<p class="tiny">${stats.done} de ${stats.total} actividades</p>${link(`#/quiz/${l.module}`,'Quiz del módulo','secondary','quiz')}</aside></div>`;
  }
  return {home,modules,moduleView,lessonsIndex,lessonView,moduleCard,moduleOptions};
})();

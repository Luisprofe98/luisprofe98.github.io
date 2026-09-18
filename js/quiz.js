"use strict";
window.Quiz = (() => {
  const {h,icon,link,pageHead,code}=UI;
  let active=null;
  const labels={choice:'Elección única',multi:'Selección múltiple',boolean:'Verdadero / falso',output:'Salida de código',error:'Detectar el error',fill:'Completar código'};
  function index() {
    return pageHead('PON A PRUEBA TUS CONCEPTOS','No solo saber. Entender.','14 cuestionarios de 6 preguntas. Recibe una explicación en cada respuesta y conserva tu mejor puntuación.')+
      `<div class="callout"><strong>Cómo se corrige:</strong> cada pregunta vale un punto. En selección múltiple debes marcar todas las opciones correctas y ninguna incorrecta. Entregar un quiz cuenta como realizado, aunque la nota no sea perfecta.</div><div class="grid-3">${Course.modules.map(m=>{const score=Progress.state.quizzes[m.id];return `<article class="card exercise-card"><div class="card-header"><span class="module-number">${String(m.id).padStart(2,'0')}</span><span class="badge ${score?'accent':''}">${score?'Realizado':'Sin intentar'}</span></div><h3>${h(m.title)}</h3><p>${score?`Mejor resultado: ${score.best}%. Último: ${score.last}%. Intentos: ${score.attempts}.`:'6 preguntas · elección, código y diagnóstico.'}</p><div class="card-footer"><span>${score?'Puedes mejorar tu resultado':'Sin límite de intentos'}</span><a class="text-link" href="#/quiz/${m.id}">Empezar ${icon('arrow')}</a></div></article>`;}).join('')}</div>`;
  }
  function view(id) {
    const m=Course.modules.find(x=>x.id===Number(id));if(!m)return UI.empty('Quiz no encontrado','Selecciona un cuestionario del catálogo.');
    active={module:m.id,questions:Course.quizzes.filter(q=>q.module===m.id),submitted:false};
    return `<a class="back-link" href="#/quizzes">${icon('arrow')} Todos los cuestionarios</a>`+pageHead(`QUIZ · MÓDULO ${String(m.id).padStart(2,'0')}`,m.title,'Responde las 6 preguntas antes de corregir. Las preguntas de código evalúan la salida sin las comillas de Python.')+
      `<div id="quiz-result" tabindex="-1" aria-live="polite"></div><form id="quiz-form" novalidate>${active.questions.map((q,i)=>question(q,i)).join('')}<p class="quiz-notice" id="quiz-notice" role="alert"></p><div class="quiz-footer"><p id="quiz-status">0 de 6 preguntas respondidas</p><button class="btn primary" type="submit" id="quiz-submit">Corregir cuestionario ${icon('check')}</button><button class="btn secondary" type="button" id="quiz-retry" data-action="quiz-retry" hidden>Volver a intentarlo ${icon('reset')}</button></div></form>`;
  }
  function question(q,index) {
    const options=q.type==='fill'?`<label class="sr-only" for="fill-${q.id}">Código que falta</label><input class="fill-answer" id="fill-${q.id}" name="${q.id}" autocomplete="off" spellcheck="false" placeholder="Escribe solo el nombre que falta">`:
      `<div class="answer-options">${q.options.map((opt,i)=>`<label class="answer-option"><input type="${q.type==='multi'?'checkbox':'radio'}" name="${q.id}" value="${i}"><span>${h(opt)}</span></label>`).join('')}</div>`;
    return `<article class="card question-card" id="card-${q.id}"><div class="question-top"><span>PREGUNTA ${index+1} / 6</span><span>${labels[q.type]}</span></div><fieldset><legend>${h(q.text)}</legend>${q.code?code(q.code,'Fragmento del cuestionario',false):''}${q.type==='multi'?'<p class="tiny">Marca todas las opciones correctas.</p>':''}${options}</fieldset><div id="result-${q.id}"></div></article>`;
  }
  function answers(q,form) {
    if(q.type==='fill')return form.elements[q.id].value.trim();
    return [...form.querySelectorAll(`input[name="${q.id}"]:checked`)].map(x=>Number(x.value));
  }
  function answered(q,value) {return value.length>0;}
  function isCorrect(q,value) {
    if(q.type==='fill')return q.answer.some(a=>value.trim()===a);
    const expected=Array.isArray(q.answer)?q.answer:[q.answer];
    return expected.length===value.length&&expected.every(a=>value.includes(a));
  }
  function correctText(q) {
    if(q.type==='fill')return q.answer.join(' / ');
    return (Array.isArray(q.answer)?q.answer:[q.answer]).map(i=>q.options[i]).join(' · ');
  }
  function updateStatus() {
    const form=document.getElementById('quiz-form');if(!form||!active||active.submitted)return;
    const count=active.questions.filter(q=>answered(q,answers(q,form))).length;
    document.getElementById('quiz-status').textContent=`${count} de ${active.questions.length} preguntas respondidas`;
  }
  function submit(event) {
    event.preventDefault();if(!active||active.submitted)return;
    const form=event.target;
    const missing=active.questions.filter(q=>!answered(q,answers(q,form)));
    if(missing.length){document.getElementById('quiz-notice').textContent=`Faltan ${missing.length} preguntas. Responde todas antes de corregir.`;document.querySelector(`#card-${missing[0].id} input`)?.focus();return;}
    let hits=0;
    for(const q of active.questions){
      const correct=isCorrect(q,answers(q,form));if(correct)hits++;
      document.getElementById('result-'+q.id).innerHTML=`<div class="quiz-feedback ${correct?'correct':''}"><strong>${correct?'✓ Correcta':'✕ Incorrecta'}</strong>${!correct?`<p>Respuesta correcta: <strong>${h(correctText(q))}</strong></p>`:''}<p>${h(q.explanation)}</p></div>`;
    }
    const score=Math.round(hits/active.questions.length*100);
    active.submitted=true;Progress.quiz(active.module,score);
    const result=document.getElementById('quiz-result');
    result.innerHTML=`<div class="quiz-result"><div><h2>${score===100?'Conceptos bien afianzados.':score>=67?'Buen avance. Sigue practicando.':'Una oportunidad para repasar.'}</h2><p>${hits} respuestas correctas · ${active.questions.length-hits} errores · Mejor puntuación: ${Progress.state.quizzes[active.module].best}%</p></div><span class="quiz-score">${score}%</span>${link(`#/module/${active.module}`,'Repasar módulo','secondary','book')}</div>`;
    form.querySelectorAll('input').forEach(input=>input.disabled=true);
    document.getElementById('quiz-submit').hidden=true;document.getElementById('quiz-retry').hidden=false;
    document.getElementById('quiz-notice').textContent='';document.getElementById('quiz-status').textContent='Intento guardado en este navegador.';
    result.focus();result.scrollIntoView({behavior:'smooth',block:'start'});
  }
  return {index,view,submit,updateStatus,isCorrect};
})();

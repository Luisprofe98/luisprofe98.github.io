"use strict";
window.Search = (() => {
  const {h,icon,norm}=UI;
  let index=[];
  function build(){
    index=Course.lessons.map(l=>({title:l.title,subtitle:l.objective,label:`Lección · Módulo ${l.module}`,href:`#/lesson/${l.id}`,terms:norm([l.title,...l.terms,l.objective,...l.body,UI.moduleName(l.module)].join(' ')),priority:0}));
    index.push(...Course.exercises.map(x=>({title:x.title,subtitle:x.statement,label:`Ejercicio ${x.id.toUpperCase()} · ${x.level}`,href:`#/exercise/${x.id}`,terms:norm([x.title,x.statement,...x.concepts].join(' ')),priority:1})));
    index.push(...Course.challenges.map(x=>({title:x.title,subtitle:x.brief,label:`Reto ${x.id.toUpperCase()}`,href:`#/challenge/${x.id}`,terms:norm(x.title+' '+x.brief),priority:2})));
  }
  function open(){const dialog=document.getElementById('search-dialog');if(!dialog.open)dialog.showModal();const input=document.getElementById('global-search');input.value='';results('');input.focus();}
  function close(){document.getElementById('search-dialog').close();}
  function results(value){
    const box=document.getElementById('search-results'),words=norm(value).trim().split(/\s+/).filter(Boolean);
    if(!words.length){box.innerHTML='<div class="search-hint">Busca un concepto: <strong>listas</strong>, <strong>diccionarios</strong>, <strong>funciones</strong>, <strong>archivos</strong>…<br>También puedes buscar ejercicios y retos.</div>';document.getElementById('search-count').textContent='Lecciones · Ejercicios · Retos';return;}
    const all=index.filter(item=>words.every(word=>item.terms.includes(word))).sort((a,b)=>a.priority-b.priority);
    box.innerHTML=all.length?all.slice(0,25).map(item=>`<a class="search-result" href="${item.href}" data-search-result><small>${h(item.label)}</small><strong>${h(item.title)}</strong><p>${h(item.subtitle.length>130?item.subtitle.slice(0,130)+'…':item.subtitle)}</p></a>`).join(''):'<div class="search-hint">No hay resultados. Prueba con otro concepto o una palabra más corta.</div>';
    document.getElementById('search-count').textContent=`${all.length} resultados${all.length>25?' · se muestran los 25 primeros':''} · Enter abre el primer resultado`;
  }
  function init(){
    build();const input=document.getElementById('global-search');
    input.addEventListener('input',()=>results(input.value));
    input.addEventListener('keydown',e=>{if(e.key==='Enter'){const first=document.querySelector('.search-result');if(first){e.preventDefault();first.click();}}if(e.key==='ArrowDown'){e.preventDefault();document.querySelector('.search-result')?.focus();}});
    document.getElementById('search-results').addEventListener('click',e=>{if(e.target.closest('[data-search-result]'))close();});
  }
  return {init,open,close};
})();

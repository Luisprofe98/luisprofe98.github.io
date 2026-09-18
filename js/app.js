"use strict";
window.App = (() => {
  const {icon}=UI;
  const titles={home:'Inicio',modules:'Temario',module:'Temario',lessons:'Lecciones',lesson:'Lecciones',exercises:'Ejercicios',exercise:'Ejercicios',challenges:'Retos',challenge:'Retos',quizzes:'Quiz',quiz:'Quiz',lab:'Laboratorio',predict:'Predice la salida',debug:'Depura código',cheatsheet:'Cheatsheet',progress:'Mi progreso',about:'Guía de uso'};
  let route='home',id='',params=new URLSearchParams(),confirmCallback=null;
  const navGroup={module:'modules',lesson:'lessons',exercise:'exercises',challenge:'challenges',quiz:'quizzes'};
  function parse(){
    const hash=location.hash.slice(1)||'/home';const [path,query='']=hash.split('?');
    const segments=path.replace(/^\//,'').split('/');
    route=segments[0]||'home';try{id=decodeURIComponent(segments[1]||'');}catch(_){id='';}
    params=new URLSearchParams(query);
  }
  function render({focus=false}={}){
    parse();UI.codes.clear();
    let view;
    const views={home:()=>CourseViews.home(),modules:()=>CourseViews.modules(),module:()=>CourseViews.moduleView(id),lessons:()=>CourseViews.lessonsIndex(params),lesson:()=>CourseViews.lessonView(id),exercises:()=>PracticeViews.exercises(params),exercise:()=>PracticeViews.exercise(id),challenges:()=>PracticeViews.challenges(params),challenge:()=>PracticeViews.challenge(id),quizzes:()=>Quiz.index(),quiz:()=>Quiz.view(id),lab:()=>Lab.render(),predict:()=>PracticeViews.predict(params),debug:()=>PracticeViews.debug(params),cheatsheet:()=>ToolViews.cheatsheet(params),progress:()=>ToolViews.progress(),about:()=>ToolViews.about()};
    try{view=views[route]?views[route]():UI.empty('Esta ruta no existe','Usa el menú para volver al curso.');}
    catch(error){console.error(error);view=UI.empty('No se ha podido abrir esta vista','Recarga la página. Tus datos guardados no se han borrado.');}
    document.getElementById('main-content').innerHTML=view;
    document.title=`${titles[route]||'Curso'} · PyLab ASIR`;
    document.getElementById('current-page').textContent=titles[route]||'Curso';
    document.querySelectorAll('.nav-link').forEach(a=>{const active=a.dataset.route===(navGroup[route]||route);a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    updateChrome();
    if(focus){window.scrollTo({top:0,behavior:'instant'});document.getElementById('main-content').focus({preventScroll:true});}
  }
  function updateChrome(){
    const s=Progress.stats();
    document.getElementById('sidebar-percent').textContent=s.percent+'%';
    const bar=document.getElementById('sidebar-bar');bar.setAttribute('aria-valuenow',s.percent);bar.firstElementChild.style.width=s.percent+'%';
    document.getElementById('local-storage-label').textContent=Progress.persistent?'Guardado en este navegador':'Guardado no disponible · exporta';
  }
  function theme(){
    const html=document.documentElement;html.dataset.theme=html.dataset.theme==='light'?'dark':'light';
    try{localStorage.setItem('pylab-asir-theme',html.dataset.theme);}catch(_){}
    themeLabel();
  }
  function themeLabel(){const light=document.documentElement.dataset.theme==='light',button=document.getElementById('theme-toggle');button.innerHTML=icon(light?'moon':'sun');button.setAttribute('aria-label',light?'Activar modo oscuro':'Activar modo claro');button.title=light?'Modo oscuro':'Modo claro';}
  function openMenu(){const sidebar=document.getElementById('sidebar');sidebar.classList.add('open');sidebar.inert=false;document.getElementById('nav-overlay').classList.add('visible');document.getElementById('menu-toggle').setAttribute('aria-expanded','true');document.body.style.overflow='hidden';sidebar.querySelector('.nav-link').focus();}
  function closeMenu(restore=false){const sidebar=document.getElementById('sidebar');sidebar.classList.remove('open');sidebar.inert=window.innerWidth<=760;document.getElementById('nav-overlay').classList.remove('visible');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');document.body.style.overflow='';if(restore)document.getElementById('menu-toggle').focus();}
  function ask(title,message,callback,label='Confirmar'){
    document.getElementById('confirm-title').textContent=title;document.getElementById('confirm-message').textContent=message;document.getElementById('confirm-accept').textContent=label;confirmCallback=callback;document.getElementById('confirm-dialog').showModal();document.getElementById('confirm-cancel').focus();
  }
  function goLab(source,title,inputs=''){if(Lab.setSource(source,title,inputs)){if(route==='lab')render();else location.hash='/lab';}}
  const actions={
    search:()=>Search.open(),'search-close':()=>Search.close(),theme,menu:openMenu,'menu-close':()=>closeMenu(true),
    copy:el=>{const c=UI.codes.get(el.dataset.code);if(c)UI.copy(c.source);},
    edit:el=>{const c=UI.codes.get(el.dataset.code);if(c)goLab(c.source,c.title,c.inputs);},
    complete:el=>{const {kind,id}=el.dataset;Progress.toggle(kind,id);render();UI.toast(Progress.state[kind].includes(id)?'Progreso actualizado. Un paso más.':'Actividad marcada como pendiente.');},
    'quick-lab':el=>{const l=Course.lessons.find(l=>l.id===el.dataset.id);if(l)goLab('# '+l.quick+'\n',l.title,l.module===4?'5':'');},
    'exercise-lab':el=>{const x=Course.exercises.find(x=>x.id===el.dataset.id);if(x)goLab(x.starter,x.title,x.inputs);},
    'challenge-lab':el=>{const x=Course.challenges.find(x=>x.id===el.dataset.id);if(x)goLab(x.starter,x.title);},
    'predict-check':el=>PracticeViews.checkPrediction(el.dataset.id),
    'predict-show':el=>PracticeViews.checkPrediction(el.dataset.id,true),
    'quiz-retry':()=>render({focus:true}),
    'lab-run':()=>Lab.run(),'lab-stop':()=>Lab.stop(),'lab-reset':()=>Lab.reset(),'lab-download':()=>Lab.download(),'lab-clear':()=>Lab.clear(),
    'lab-file':el=>Lab.downloadFile(el.dataset.id),'lab-sample':el=>Lab.sample(el.dataset.id),
    print:()=>window.print(),export:()=>Progress.exportData(),import:()=>document.getElementById('progress-import').click(),
    'reset-progress':()=>ask('¿Reiniciar todo el progreso?','Se borrarán las marcas de lecciones, ejercicios y retos, todas las puntuaciones y la racha de este navegador. Exporta una copia antes si necesitas conservarlos.',()=>{Progress.reset();render();UI.toast('Progreso reiniciado.');},'Sí, reiniciar progreso'),
    'confirm-cancel':()=>{document.getElementById('confirm-dialog').close();confirmCallback=null;},
    'confirm-accept':()=>{document.getElementById('confirm-dialog').close();const callback=confirmCallback;confirmCallback=null;callback?.();}
  };
  function click(event){
    const scroll=event.target.closest('[data-scroll]');if(scroll){event.preventDefault();const target=document.getElementById(scroll.dataset.scroll);target?.scrollIntoView({behavior:'smooth'});if(target?.hasAttribute('tabindex'))target.focus({preventScroll:true});return;}
    const action=event.target.closest('[data-action]');if(action&&actions[action.dataset.action]){event.preventDefault();actions[action.dataset.action](action);}
    const nav=event.target.closest('.nav-link');if(nav&&window.innerWidth<=760)closeMenu();
  }
  async function change(event){
    if(event.target.id!=='progress-import')return;
    const file=event.target.files[0];event.target.value='';if(!file)return;
    if(file.size>1048576){UI.toast('La copia supera el límite de 1 MiB.');return;}
    try{
      const text=await file.text();const raw=JSON.parse(text);
      if(!raw||raw.version!==1||!Array.isArray(raw.lessons)||!Array.isArray(raw.exercises)||!Array.isArray(raw.challenges)||typeof raw.quizzes!=='object')throw new Error('Estructura no compatible.');
      ask('¿Sustituir el progreso actual?','Se importará esta copia. Las actividades desconocidas se omiten y las puntuaciones se validan. El borrador del laboratorio no cambiará.',()=>{try{Progress.importData(text);render();UI.toast('Copia importada correctamente.');}catch(error){UI.toast('No se pudo importar: '+error.message);}},'Importar copia');
    }catch(error){UI.toast('Archivo de progreso no válido: '+error.message);}
  }
  function keyboard(event){
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();Search.open();}
    if(event.key==='Escape'&&document.getElementById('sidebar').classList.contains('open'))closeMenu(true);
    if(route==='lab'&&(event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();Lab.run();}
    if(event.target.id==='python-editor'&&(event.ctrlKey||event.metaKey)&&event.key===']'){
      event.preventDefault();const el=event.target;el.setRangeText('    ',el.selectionStart,el.selectionEnd,'end');Lab.sync();
    }
    if(event.key==='Tab'&&document.getElementById('sidebar').classList.contains('open')){
      const all=[...document.getElementById('sidebar').querySelectorAll('a,button')],first=all[0],last=all[all.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  }
  function init(){
    document.addEventListener('click',click);document.addEventListener('change',change);document.addEventListener('keydown',keyboard);
    document.addEventListener('submit',event=>{
      if(event.target.id==='quiz-form'){Quiz.submit(event);return;}
      const form=event.target.closest('[data-filter-route]');if(!form)return;event.preventDefault();
      const query=new URLSearchParams([...new FormData(form)].filter(([,v])=>String(v).trim()));
      const hash=`/${form.dataset.filterRoute}${query.size?'?'+query:''}`;if(location.hash==='#'+hash)render();else location.hash=hash;
    });
    document.addEventListener('input',event=>{if(event.target.closest('#quiz-form'))Quiz.updateStatus();if(event.target.id==='python-editor'||event.target.id==='python-inputs')Lab.sync();});
    window.addEventListener('hashchange',()=>{Lab.sync();closeMenu();render({focus:true});});
    window.addEventListener('progresschange',updateChrome);
    window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();else if(!document.getElementById('sidebar').classList.contains('open'))document.getElementById('sidebar').inert=true;});
    window.addEventListener('pagehide',()=>Lab.sync());
    Search.init();themeLabel();closeMenu();render();
    // Detecta desde el principio almacenamiento restringido y avisa sin bloquear la lectura.
    Progress.save();
  }
  return {init,render,ask};
})();
App.init();

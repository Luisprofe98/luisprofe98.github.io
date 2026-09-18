"""Pruebas opcionales: pip install playwright; playwright install chromium.
Usan Storage sintético y un worker simulado; NO validan el motor remoto.
PYLAB_CHROMIUM permite indicar un Chromium ya instalado.
"""
from pathlib import Path
import json,time,os
from build_standalone import build
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "tests" / "output"
OUTPUT.mkdir(parents=True, exist_ok=True)
STANDALONE = OUTPUT / "test-course.html"
build(STANDALONE)
from playwright.sync_api import sync_playwright
html=STANDALONE.read_text(encoding='utf-8')
shim='''<script>class TestStorage { constructor(){this.data={};}getItem(k){return this.data[k]??null;}setItem(k,v){this.data[k]=String(v);}removeItem(k){delete this.data[k];}clear(){this.data={};}}Object.defineProperty(window,'localStorage',{value:new TestStorage()});</script>'''
results=[]; errors=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=os.environ.get('PYLAB_CHROMIUM'),args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('dialog',lambda dialog:dialog.accept())
 page.set_content(html.replace('<head>','<head>'+shim),wait_until='load')
 page.set_default_timeout(4000)
 def check(label,condition):
  assert condition,label
  results.append(label)
 def nav(route):
  page.evaluate('(r)=>{location.hash=r;App.render();}',route)
  page.wait_for_timeout(15)
 check('Inicio, 14 nodos de la campaña',page.locator('.g-network-node').count()==14)
 check('Sin desbordamiento escritorio',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
 page.locator('#theme-toggle').click()
 check('Alternancia a modo claro',page.locator('html').get_attribute('data-theme')=='light')
 page.screenshot(path=str(OUTPUT / 'home-light.png'),full_page=True)
 page.locator('#theme-toggle').click()
 # Search and direct link navigation.
 page.locator('[data-action=search]').click()
 page.locator('#global-search').fill('diccionarios')
 check('Buscador ofrece lecciones',page.locator('.search-result').count()>0)
 page.locator('.search-result').first.click()
 check('Búsqueda navega directamente a lección','/lesson/' in page.url)
 check('Buscador se cierra',not page.locator('#search-dialog').is_visible())
 nav('/modules');check('14 módulos en temario',page.locator('.module-card').count()==14)
 nav('/lessons');check('28 lecciones en índice',page.locator('.lesson-item').count()==28)
 # Visit all lesson routes and verify required structure, copy IDs, hidden solutions.
 lesson_ids=page.evaluate('Course.lessons.map(x=>x.id)')
 for lid in lesson_ids:
  nav('/lesson/'+lid)
  check('Lección completa '+lid,page.locator('.lesson-body section').count()==7 and page.locator('[data-action=complete]').count()==1)
 nav('/lesson/m01-l1');page.locator('[data-action=complete]').click()
 check('Marcado lección',page.evaluate('Progress.state.lessons.includes("m01-l1")'))
 check('Persistencia serializada',json.loads(page.evaluate('localStorage.getItem("pylab-asir-progress-v1")'))['lessons']==['m01-l1'])
 # Additional complete updates.
 nav('/exercises');check('56 ejercicios visibles',page.locator('.exercise-card').count()==56)
 page.locator('select[name=module]').select_option('7');page.locator('button[type=submit]').click();page.wait_for_timeout(100)
 check('Filtro de módulo',page.locator('.exercise-card').count()==4)
 page.locator('select[name=level]').select_option('Intermedio');page.locator('button[type=submit]').click();page.wait_for_timeout(100)
 check('Filtro combinado dificultad',page.locator('.exercise-card').count()==1)
 nav('/exercise/e01')
 check('Soluciones ocultas',not page.locator('details').last.get_attribute('open'))
 page.locator('details summary').last.click()
 check('Solución desplegable',page.locator('details').last.get_attribute('open') is not None)
 page.locator('[data-action=complete]').click()
 check('Marcado ejercicio',page.evaluate('Progress.state.exercises.includes("e01")'))
 nav('/exercises?state=done');check('Filtro realizadas',page.locator('.exercise-card').count()==1)
 nav('/challenges');check('12 retos presentes',page.locator('.exercise-card').count()==12)
 nav('/challenge/r12');check('Reto final con criterios',page.locator('.acceptance-list li').count()==5)
 page.locator('[data-action=complete]').click();check('Reto guardado',page.evaluate('Progress.state.challenges.includes("r12")'))
 # Empty submission is rejected.
 nav('/quiz/1');page.locator('#quiz-submit').click()
 check('Quiz no acepta entrega vacía','Faltan 6' in page.locator('#quiz-notice').inner_text())
 # Exercise all question types and all 14 quiz scoring paths.
 for mid in range(1,15):
  nav(f'/quiz/{mid}')
  page.evaluate('''(mid)=>{const f=document.getElementById('quiz-form');for(const q of Course.quizzes.filter(x=>x.module===mid)){if(q.type==='fill'){f.elements[q.id].value=q.answer[0];}else{const ans=Array.isArray(q.answer)?q.answer:[q.answer];for(const val of ans)f.querySelector(`input[name="${q.id}"][value="${val}"]`).checked=true;}}Quiz.updateStatus();}''',mid)
  page.locator('#quiz-submit').click()
  check('Quiz corregido 100% módulo '+str(mid),page.locator('.quiz-score').inner_text()=='100%')
  check('6 explicaciones módulo '+str(mid),page.locator('.quiz-feedback.correct').count()==6)
 nav('/quiz/1')
 page.evaluate('''()=>{const f=document.getElementById('quiz-form');for(const q of Course.quizzes.filter(x=>x.module===1)){if(q.type==='fill'){f.elements[q.id].value='incorrecto';}else{f.querySelector(`input[name="${q.id}"][value="2"]`)?.click();if(!f.querySelector(`input[name="${q.id}"]:checked`))f.querySelector(`input[name="${q.id}"][value="1"]`).click();}}}''')
 page.locator('#quiz-submit').click()
 check('Mejor nota conservada tras un intento inferior',page.evaluate('Progress.state.quizzes[1].best===100 && Progress.state.quizzes[1].last<100 && Progress.state.quizzes[1].attempts===2'))
 # Prediction and debug.
 nav('/predict?module=1');page.locator('#answer-p01').fill('web-01');page.locator('[data-action=predict-check]').click()
 check('Predicción correcta',page.locator('.prediction-feedback.correct').count()==1)
 nav('/debug');check('14 errores de diagnóstico',page.locator('.prediction-input').count()==14)
 nav('/cheatsheet');check('14 bloques de consulta',page.locator('.cheat-card').count()==14)
 page.locator('input[name=q]').fill('diccionarios');page.locator('button[type=submit]').click();page.wait_for_timeout(100)
 check('Filtro de referencia',page.locator('.cheat-card').count()==1)
 # Lab source, autosave, simulated controller messages (not a live engine test).
 nav('/exercise/e01');page.locator('[data-action=exercise-lab]').click();page.locator('#python-editor').wait_for()
 check('Abrir editor desde un ejercicio',page.locator('#python-editor').count()==1)
 page.locator('#python-editor').fill('print("Prueba")');page.locator('#python-inputs').fill('dato')
 nav('/modules');nav('/lab')
 check('Borrador conserva código y entradas',page.locator('#python-editor').input_value()=='print("Prueba")' and page.locator('#python-inputs').input_value()=='dato')
 page.evaluate('''()=>{window.Worker=class {constructor(){window.testWorker=this;}postMessage(data){if(data.type==='init'){setTimeout(()=>this.onmessage({data:{type:'ready'}}),0);}else if(data.type==='run'){this.onmessage({data:{type:'started',id:data.id}});setTimeout(()=>this.onmessage({data:{type:'result',id:data.id,output:'Prueba\\n',error:'',files:[{name:'informe.txt',content:'OK',size:2}]}}),40);}}terminate(){this.terminated=true;}};}''')
 page.locator('#run-python').click();page.wait_for_timeout(100)
 check('Controlador presenta resultado del worker',page.locator('#python-output').inner_text()=='Prueba\n')
 check('Archivos virtuales descargables',page.locator('[data-action=lab-file]').count()==1)
 with page.expect_download() as d:page.locator('[data-action=lab-download]').click()
 check('Descarga .py',d.value.suggested_filename=='practica_asir.py')
 with page.expect_download() as d:page.locator('[data-action=lab-file]').click()
 check('Descarga archivo virtual',d.value.suggested_filename=='informe.txt')
 page.screenshot(path=str(OUTPUT / 'lab-desktop.png'),full_page=True)
 # Progress export/reset/import.
 nav('/progress')
 check('Progreso tabla de 14 módulos',page.locator('.progress-table tbody tr').count()==14)
 backup=page.evaluate('JSON.stringify(Progress.state)')
 with page.expect_download() as d:page.locator('[data-action=export]').click()
 check('Exportación JSON',d.value.suggested_filename=='pylab-asir-progreso.json')
 page.locator('[data-action=reset-progress]').click()
 check('Reinicio pide confirmación',page.locator('#confirm-dialog').is_visible())
 page.locator('#confirm-cancel').click();check('Cancelar conserva datos',page.evaluate('Progress.state.lessons.length')==1)
 page.locator('[data-action=reset-progress]').click();page.locator('#confirm-accept').click()
 check('Reinicio borra progreso y quiz',page.evaluate('Progress.stats().done')==0)
 page.locator('#progress-import').set_input_files({'name':'copia.json','mimeType':'application/json','buffer':backup.encode()})
 page.locator('#confirm-accept').click()
 check('Importación recupera marcas y puntuaciones',page.evaluate('Progress.state.lessons.length===1 && Object.keys(Progress.state.quizzes).length===14'))
 nav('/progress');page.screenshot(path=str(OUTPUT / 'progress-desktop.png'),full_page=True)
 # Mobile menu, screen sizes and no overflow for key pages.
 for width in [390,768,1024,1440]:
  page.set_viewport_size({'width':width,'height':844})
  for route in ['/home','/lesson/m08-l2','/exercise/e52','/challenges','/quiz/14','/lab','/progress','/cheatsheet']:
   nav(route)
   check(f'Sin desbordamiento {width}px {route}',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
  if width==390:
   nav('/home');page.screenshot(path=str(OUTPUT / 'home-mobile.png'),full_page=True)
   page.locator('#menu-toggle').click()
   check('Menú móvil abre',page.locator('#sidebar').evaluate('(e)=>e.classList.contains("open")'))
   page.keyboard.press('Escape')
   check('Escape cierra menú móvil',page.locator('#sidebar').evaluate('(e)=>!e.classList.contains("open")'))
 # Check imported hostile values are sanitized.
 page.evaluate('''()=>Progress.importData(JSON.stringify({version:1,lessons:['m01-l1','evil','m01-l1'],exercises:[],challenges:[],days:['2099-01-01','not-a-day'],quizzes:{1:{best:900,last:-5,attempts:-2}},lastLesson:'evil'}))''')
 check('Importación valida y limita datos',page.evaluate('Progress.state.lessons.length===1 && Progress.state.quizzes[1].best===100 && Progress.state.quizzes[1].last===0 && Progress.state.days.length===0 && Progress.state.lastLesson===null'))
 check('Sin errores JavaScript',len(errors)==0)
 browser.close()
report={'passed':len(results),'checks':results,'javascript_errors':errors,'method':'Chromium, inline copy of original assets, synthetic Storage on about:blank; native navigation is blocked by environment policy. Runtime controller tested with synthetic worker. CDN engine not executed.'}
(OUTPUT / 'ui-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'passed':len(results),'errors':errors},ensure_ascii=False))

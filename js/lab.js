"use strict";
window.Lab = (() => {
  const {h,icon,pageHead}=UI;
  const DRAFT='pylab-asir-draft-v1';
  const defaultCode='print("Hola, ASIR")\n\nhost = "web01"\ncpu = 72.5\nprint(f"{host}: CPU {cpu:.1f}%")';
  let doc={code:defaultCode,inputs:'',title:'mi_practica.py'};
  try{const saved=JSON.parse(localStorage.getItem(DRAFT));if(saved&&typeof saved.code==='string'&&saved.code.length<=100000)doc={code:saved.code,inputs:typeof saved.inputs==='string'?saved.inputs.slice(0,10000):'',title:typeof saved.title==='string'?saved.title.slice(0,150):'mi_practica.py'};}catch(_){}
  let worker=null,workerURL=null,ready=false,busy=false,pending=null,runId=0,loadTimer=null,runTimer=null;
  let output='La consola está lista para tu primer programa.\nPulsa Ejecutar Python para cargar el motor.',error=false,status='Motor bajo demanda · requiere conexión',files=[];
  let loadError=false,draftError=false;
  function persist(){try{localStorage.setItem(DRAFT,JSON.stringify(doc));}catch(_){if(!draftError){UI.toast('No se puede guardar el borrador. Descarga el archivo .py antes de salir.');draftError=true;}}}
  function sync(){const editor=document.getElementById('python-editor');if(editor){doc.code=editor.value;doc.inputs=document.getElementById('python-inputs').value;persist();}}
  function setSource(code,title='mi_practica.py',inputs=''){
    sync();
    if(doc.code!==code&&doc.code!==defaultCode&&doc.code.trim()&&!confirm('El código seleccionado sustituirá el borrador actual del laboratorio. Descarga antes el borrador si necesitas conservarlo. ¿Continuar?'))return false;
    doc={code,inputs,title};persist();return true;
  }
  function render(){
    return pageHead('EXPERIMENTA SIN SALIR DEL CURSO','Tu código. Tu laboratorio.','Edita, ejecuta y observa. Python se ejecuta en tu navegador mediante Pyodide; no necesita un servidor Python.')+
      `<div class="callout warning"><strong>Primera ejecución:</strong> se descarga el motor desde un CDN y requiere conexión. El contenido del curso no depende de esa descarga. Los archivos son virtuales; no se accede a tus carpetas personales.</div>
      <div class="lab-controls"><div class="button-row"><button class="btn primary" id="run-python" data-action="lab-run" ${busy?'disabled':''}>${icon('play')} Ejecutar Python</button><button class="btn secondary" id="stop-python" data-action="lab-stop" ${busy?'':'disabled'}>${icon('stop')} Detener</button></div><div class="button-row"><button class="btn ghost small" data-action="lab-download">${icon('download')} Descargar .py</button><button class="btn ghost small" data-action="lab-reset">${icon('reset')} Reiniciar motor</button></div></div>
      <div class="lab-layout"><section class="card editor-card"><div class="editor-top"><span class="editor-title">${h(doc.title)}</span><span class="badge accent">Python · borrador local</span></div><label for="python-editor" class="sr-only">Editor de código Python</label><textarea id="python-editor" class="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" maxlength="100000" aria-describedby="editor-help">${h(doc.code)}</textarea><div class="editor-bottom"><label for="python-inputs">Entradas para input() · una respuesta por línea</label><textarea class="lab-input" id="python-inputs" spellcheck="false" maxlength="10000" placeholder="web01&#10;16">${h(doc.inputs)}</textarea><p class="editor-help" id="editor-help">Ctrl+Enter ejecuta · Tab sale del editor · Ctrl+] inserta 4 espacios. Sin entradas disponibles, input() produce EOFError.</p></div></section>
      <section class="card output-card"><div class="editor-top"><span>Consola de salida</span><button class="code-action" data-action="lab-clear">Limpiar</button></div><pre class="lab-output ${error?'error':''}" id="python-output" tabindex="0" aria-label="Salida de Python">${h(output)}</pre><div class="runtime-status ${busy?'running':ready?'ready':''}" id="runtime-status" role="status"><i class="status-dot" aria-hidden="true"></i><span>${h(status)}</span></div></section></div>
      <div class="grid-2 section"><section class="card"><h2>Prueba algo diferente</h2><p class="lab-note">Cargar un ejemplo sustituye el borrador actual, previa confirmación si has cambiado el código.</p><div class="sample-buttons"><button data-action="lab-sample" data-id="hello">Primer programa</button><button data-action="lab-sample" data-id="input">Pedir datos</button><button data-action="lab-sample" data-id="logs">Leer logs</button><button data-action="lab-sample" data-id="file">Crear un informe</button></div><p class="lab-note"><strong>Ámbito:</strong> cada ejecución comienza con variables nuevas. Los archivos virtuales y módulos importados persisten hasta reiniciar o detener el motor. No se instalan paquetes externos automáticamente.</p><p class="lab-note"><strong>Límites:</strong> 8 segundos por ejecución tras cargar el motor y 64 KiB de salida. Detener termina el worker y descarta sus archivos, pero conserva tu código. Ejecuta solo código de confianza: esto no es un aislamiento de seguridad frente a código hostil.</p></section>
      <section class="card"><h2>Archivos virtuales de práctica</h2><p class="lab-note">Precargados: logs.txt, usuarios.txt, config.ini e inventario.csv. Después de ejecutar, puedes descargar archivos de texto de tu carpeta de prácticas (hasta 50 archivos, 128 KiB por archivo y 1 MiB en total).</p><div id="virtual-files">${filesHTML()}</div></section></div>`;
  }
  function filesHTML(){return files.length?files.map((file,i)=>`<div class="virtual-file">${icon('folder')}<span>${h(file.name)}</span><button class="btn ghost small" data-action="lab-file" data-id="${i}">Descargar ${icon('download')}</button></div>`).join(''):'<p class="tiny">Los archivos aparecerán tras una ejecución. El motor virtual todavía no ha generado un listado.</p>';}
  function update(){
    const out=document.getElementById('python-output');if(!out)return;
    out.textContent=output;out.classList.toggle('error',error);
    const stat=document.getElementById('runtime-status');stat.className='runtime-status '+(busy?'running':ready?'ready':'');stat.querySelector('span').textContent=status;
    document.getElementById('run-python').disabled=busy;document.getElementById('stop-python').disabled=!busy;
    document.getElementById('virtual-files').innerHTML=filesHTML();
  }
  function destroy(){clearTimeout(loadTimer);clearTimeout(runTimer);worker?.terminate();worker=null;if(workerURL)URL.revokeObjectURL(workerURL);workerURL=null;ready=false;busy=false;pending=null;files=[];}
  function failure(message){destroy();error=true;output=message;status='Motor no disponible · puedes reintentar';loadError=true;update();}
  function startWorker(){
    const source=`(${PythonWorkerSource.toString()})();`;
    workerURL=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
    worker=new Worker(workerURL,{type:'module'});
    worker.onerror=e=>{e.preventDefault();failure('No se ha podido iniciar Pyodide. Comprueba la conexión y el acceso a cdn.jsdelivr.net.\n\n'+(e.message||'Error al cargar el módulo remoto.'));};
    worker.onmessage=event=>{
      const data=event.data;
      if(data.type==='ready'){
        clearTimeout(loadTimer);ready=true;loadError=false;status='Python preparado';
        if(pending){const request=pending;pending=null;worker.postMessage(request);}else{busy=false;update();}
      }else if(data.type==='started'&&data.id===runId){
        status='Ejecutando · límite de 8 segundos';update();
        runTimer=setTimeout(()=>{destroy();error=true;output='Ejecución detenida: se ha alcanzado el límite de 8 segundos. Revisa los bucles o divide el trabajo en partes.';status='Motor reiniciado por límite de tiempo';update();},8000);
      }else if(data.type==='result'&&data.id===runId){
        clearTimeout(runTimer);busy=false;error=Boolean(data.error);files=Array.isArray(data.files)?data.files:[];
        output=(data.output||'')+(data.error?'\n'+data.error:'');if(!output)output='Programa terminado sin salida. Usa print() para mostrar resultados.';
        status=error?'Finalizado con un error · revisa el mensaje':'Ejecución completada · los archivos permanecen en memoria';update();
      }else if(data.type==='fatal'){failure('Error del motor: '+data.message+'\n\nEl resto del curso sigue disponible. Puedes descargar tu .py y ejecutarlo con Python local.');}
    };
    loadTimer=setTimeout(()=>failure('La descarga del motor no se ha completado. Comprueba tu conexión o si el centro bloquea cdn.jsdelivr.net y vuelve a pulsar Ejecutar. El contenido del curso no necesita esta descarga.'),120000);
    worker.postMessage({type:'init',samples:Course.samples});
  }
  function run(){
    if(busy)return;sync();if(!doc.code.trim()){UI.toast('Escribe un programa antes de ejecutarlo.');return;}
    busy=true;error=false;output='';runId++;
    const request={type:'run',code:doc.code,inputs:doc.inputs,id:runId};
    if(ready&&worker){status='Preparando ejecución…';worker.postMessage(request);}
    else{
      pending=request;status='Descargando el motor Python… Puedes detener la carga.';output='Cargando Python desde jsDelivr. Esta operación necesita conexión.';
      try{startWorker();}catch(e){failure('No se puede crear el worker en este navegador: '+e.message);}
    }
    update();
  }
  function stop(){destroy();error=false;output='Ejecución o carga detenida. Se conservan tu código y las entradas; el sistema virtual se ha descartado.';status='Motor detenido · Ejecutar inicia uno nuevo';update();}
  function reset(){if(!confirm('¿Reiniciar el motor y descartar sus archivos virtuales? Tu código no se borrará.'))return;stop();}
  function download(){sync();UI.download('practica_asir.py',doc.code,'text/x-python;charset=utf-8');}
  function downloadFile(id){const file=files[Number(id)];if(file)UI.download(file.name.replaceAll('/','_'),file.content);}
  function clear(){output='';error=false;update();}
  function sample(id){
    const samples={
      hello:[defaultCode,'Primer programa',''],
      input:['host = input("Equipo: ")\nram = int(input("RAM en GiB: "))\nprint(f"{host}: {ram * 1024} MiB")','Entrada y salida','web01\n16'],
      logs:['with open("logs.txt", "r", encoding="utf-8") as archivo:\n    for linea in archivo:\n        if linea.startswith("ERROR "):\n            print(linea.strip())','Lectura de logs',''],
      file:['with open("informe.txt", "w", encoding="utf-8") as archivo:\n    archivo.write("web01: ONLINE\\n")\nprint("Informe virtual creado. Puedes descargarlo en Archivos virtuales.")','Informe de práctica','']
    };
    if(samples[id]&&setSource(...samples[id]))App.render();
  }
  return {render,setSource,sync,run,stop,reset,download,downloadFile,clear,sample,get busy(){return busy;}};
})();

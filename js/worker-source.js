"use strict";
// Worker de tipo módulo creado desde Blob: el resto del sitio usa scripts clásicos
// para funcionar también con file:// sin fetch ni un servidor de desarrollo.
window.PythonWorkerSource = function () {
  const BASE='https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';
  let python=null;
  let loading=null;
  let busy=false;
  let filesSeed={};
  function send(type,data={}) { self.postMessage({type,...data}); }
  async function init(samples) {
    filesSeed=samples;
    const {loadPyodide}=await import(BASE+'pyodide.mjs');
    python=await loadPyodide({indexURL:BASE});
    python.FS.mkdirTree('/home/pyodide/practicas');
    python.FS.chdir('/home/pyodide/practicas');
    for(const [name,content] of Object.entries(filesSeed)) {
      python.FS.writeFile(name,content,{encoding:'utf8'});
    }
    // Hace importables los módulos creados por el alumno en la carpeta virtual.
    await python.runPythonAsync('import sys\nif "/home/pyodide/practicas" not in sys.path:\n    sys.path.insert(0, "/home/pyodide/practicas")');
    send('ready');
  }
  function virtualFiles() {
    const result=[];
    const root='/home/pyodide/practicas';
    let visited=0,totalBytes=0;
    function walk(folder,depth) {
      if(depth>3||visited>400||result.length>=50)return;
      for(const name of python.FS.readdir(folder)) {
        if(name==='.'||name==='..'||name==='__pycache__')continue;
        if(++visited>400||result.length>=50)return;
        const absolute=folder+'/'+name;
        const stat=python.FS.lstat(absolute);
        if(python.FS.isLink(stat.mode))continue;
        if(python.FS.isDir(stat.mode))walk(absolute,depth+1);
        else if(python.FS.isFile(stat.mode)&&stat.size<=131072&&/\.(txt|log|csv|ini|py|json|md)$/i.test(name)&&totalBytes+stat.size<=1048576){
          const bytes=python.FS.readFile(absolute);
          try {
            const content=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
            result.push({name:absolute.slice(root.length+1),content,size:stat.size});totalBytes+=stat.size;
          }catch(_){/* Los archivos binarios no se ofrecen como texto. */}
        }
      }
    }
    try{walk(root,0);}catch(_){/* El código del alumno puede eliminar una ruta de práctica. */}
    return result.sort((a,b)=>a.name.localeCompare(b.name));
  }
  async function run({code,inputs,id}) {
    if(busy)return;busy=true;
    send('started',{id});
    let output='',error='',namespace=null,outputBytes=0;
    const decoder=new TextDecoder('utf-8');
    const write=buffer=>{
      const remaining=65536-outputBytes;
      if(buffer.length>remaining){
        output+=decoder.decode(buffer.subarray(0,remaining),{stream:true});outputBytes=65536;
        throw new Error('Límite de salida alcanzado (64 KiB). Reduce las impresiones.');
      }
      outputBytes+=buffer.length;output+=decoder.decode(buffer,{stream:true});
      return buffer.length;
    };
    const lines=inputs===''?[]:inputs.replace(/\r/g,'').split('\n');
    let current=0;
    try {
      python.setStdout({write});python.setStderr({write});
      python.setStdin({stdin:()=>current<lines.length?lines[current++]:null,isatty:false});
      // Variables nuevas en cada ejecución; los archivos virtuales y módulos importados persisten.
      namespace=python.runPython('{"__name__": "__main__", "__file__": "practica.py"}');
      const result=await python.runPythonAsync(code,{globals:namespace,filename:'practica.py'});
      if(result&&typeof result.destroy==='function')result.destroy();
    }catch(e){error=String(e.message||e);}
    finally {
      if(namespace)namespace.destroy();
      output+=decoder.decode();
      send('result',{id,output:output.slice(0,65536),error:error.slice(-14000),files:virtualFiles()});
      busy=false;
    }
  }
  self.onmessage=async event=>{
    const data=event.data;
    try {
      if(data.type==='init') {
        if(!loading)loading=init(data.samples);
        await loading;
      }else if(data.type==='run'){
        await loading;
        if(!python)throw new Error('El motor todavía no está disponible.');
        await run(data);
      }
    }catch(error){busy=false;send('fatal',{message:String(error.message||error)});}
  };
};

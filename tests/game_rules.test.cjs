/* Pruebas de reglas y persistencia serializada, sin DOM ni red. Ejecuta: node tests/game_rules.test.cjs */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const ROOT=path.resolve(__dirname,'..'),results=[];
const check=(label,condition)=>{assert.ok(condition,label);results.push(label);};
const same=(label,a,b)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),label);results.push(label);};
function boot(storage={}){
 const events=new EventTarget();const c={console,Date,Event,CustomEvent,Set,Map,URLSearchParams,Number,JSON,Math};c.window=c;
 c.addEventListener=events.addEventListener.bind(events);c.dispatchEvent=events.dispatchEvent.bind(events);
 c.localStorage={getItem:key=>storage[key]??null,setItem:(key,value)=>{storage[key]=value;}};
 c.UI={pct:(n,d)=>d?Math.round(n/d*100):0,toast:()=>{},download:(name,text)=>{c.downloaded={name,text};}};
 vm.createContext(c);
 const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 for(const [,file]of index.matchAll(/<script defer src="([^"]+)"/g)){
  if(file.startsWith('data/')||['js/game-rules.js','js/progress.js'].includes(file))vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),c,{filename:file});
 }
 c.storage=storage;return c;
}
const legacy=(extra={})=>({version:1,lessons:[],exercises:[],challenges:[],quizzes:{},days:[],lastLesson:null,lastModule:null,...extra});
let c=boot(),P=c.Progress,G=c.GameRules,summary=()=>G.summary(P.state),xp=()=>summary().xp;
check('Estado inicial: 0 XP y nivel 1',xp()===0&&summary().level===1);
P.visit(c.Course.lessons[0]);check('Visitar una lección no concede XP',xp()===0);
P.toggle('lessons','m01-l1');check('Lección: +25 XP',xp()===25);
P.toggle('lessons','m01-l1');check('Desmarcar mantiene el historial de XP',xp()===25&&P.state.lessons.length===0);
P.toggle('lessons','m01-l1');check('Marcar de nuevo no duplica XP',xp()===25);
check('Una actividad distinta al día aunque se repita',G.daily(P.state).done===1);
P.toggle('lessons','unknown');check('ID de lección desconocido rechazado',xp()===25);
P.profile({alias:'Test',goal:5,effects:false});check('Personalizar no da XP ni actividad',xp()===25&&G.daily(P.state).done===1);
P.profile({palette:'amber'});check('No se equipa un tema bloqueado',P.state.game.profile.palette==='mint');
P.reset();check('Reinicio elimina XP, logros y actividad',xp()===0&&P.state.game.activity.length===0);
for(const kind of ['exercises','challenges']){
 for(const level of ['Básico','Intermedio','Avanzado']){
  const item=c.Course[kind].find(x=>x.level===level);if(!item)continue;const before=xp();P.toggle(kind,item.id);
  check(`XP de ${kind} ${level}`,xp()-before===c.GameData.points[kind][level]);P.toggle(kind,item.id);P.toggle(kind,item.id);
  check(`Sin duplicado de ${kind} ${level}`,xp()-before===c.GameData.points[kind][level]);
 }
}
P.reset();P.quiz(1,0);check('Quiz con 0 aciertos: 20 XP primera entrega',xp()===20);
P.quiz(1,0);check('Repetir quiz sin mejorar no concede XP',xp()===20);
P.quiz(1,50);check('3 aciertos nuevos: +45 XP',xp()===65);
P.quiz(1,100);check('6 aciertos + perfección: 140 XP totales',xp()===140);
P.quiz(1,17);check('Una peor nota conserva XP y mejor resultado',xp()===140&&P.state.quizzes[1].best===100);
P.quiz(1,NaN);P.quiz(999,100);check('Quiz o nota no válidos no suman',xp()===140);
P.reset();for(const l of c.Course.lessons.filter(x=>x.module===1))P.toggle('lessons',l.id);
check('Primera estrella por 2 lecciones',G.stars(P.state,1)[0]===true);
const ex=c.Course.exercises.filter(x=>x.module===1).slice(0,2);for(const e of ex)P.toggle('exercises',e.id);
check('Segunda estrella por 2 ejercicios',G.stars(P.state,1)[1]===true);
P.quiz(1,67);check('67% no concede estrella de quiz',G.stars(P.state,1)[2]===false);
let before=xp();P.quiz(1,83);check('83% concede estrella y 100 XP de dominio',G.stars(P.state,1).every(Boolean)&&xp()-before===115);
check('Misión inicial disponible por requisitos',G.missions(P.state).find(m=>m.id==='first').ready);
before=xp();check('Recoger misión inicial funciona',P.claim('first')===true);check('Bonus de misión inicial +100 XP',xp()===before+100);
check('Recoger la misma misión no funciona',P.claim('first')===false&&xp()===before+100);
check('Misión no cumplida no concede XP',P.claim('deployment')===false);
P.toggle('lessons','m01-l1');check('Estrellas históricas no desaparecen al desmarcar',G.stars(P.state,1).every(Boolean));
P.reset();
for(const inc of c.GameData.incidents){
 const before=xp();P.incident(inc.id,-1);P.incident(inc.id,NaN);check('Índice de incidente no válido '+inc.id,xp()===before);
 for(let n=0;n<inc.steps.length;n++){P.incident(inc.id,n);if(n<2)check('Cada decisión correcta suma 25 XP '+inc.id+'/'+n,xp()===before+(n+1)*25);}
 check('Bonus final correcto '+inc.id,xp()-before===inc.bonus+75);
 P.incident(inc.id,0);check('Repetir decisión no duplica '+inc.id,xp()-before===inc.bonus+75);
}
check('Tres incidentes dan 900 XP en total',xp()===900);
P.reset();const pred=c.Course.predictions[0].id,bug=c.Course.bugs[0].id;
P.record('predictions',pred);check('Predicción correcta +40 XP',xp()===40);P.record('predictions',pred);check('Predicción repetida sin XP extra',xp()===40);
P.record('debug',bug);check('Diagnóstico autoevaluado +30 XP',xp()===70);P.record('debug',bug);check('Diagnóstico repetido sin XP extra',xp()===70);
P.record('not-a-kind',bug);P.record('predictions','unknown');check('Registro inválido sin XP extra',xp()===70);
P.exportData();const exported=c.downloaded.text;P.reset();P.importData(exported);check('Copia nueva recupera XP y diagnósticos',xp()===70&&P.state.game.earned.debug.includes(bug));
const old=legacy({lessons:['m01-l1'],exercises:['e01'],quizzes:{1:{best:67,last:50,attempts:2}},days:['2025-06-03']});
P.importData(JSON.stringify(old));check('Copia antigua mantiene marcas y mejor nota',P.state.lessons[0]==='m01-l1'&&P.state.quizzes[1].best===67);
check('Copia antigua recibe XP de su progreso',xp()===140);
check('Migrar no finge una actividad nueva hoy',P.state.game.activity.length===0);
P.toggle('lessons','m01-l1');P.toggle('lessons','m01-l1');check('Progreso migrado no se puede recobrar',xp()===140);
const backup=JSON.stringify(P.state);P.save();const second=boot(c.storage);
check('Recarga del motor desde Storage recupera XP',second.GameRules.summary(second.Progress.state).xp===xp());
check('Estado serializado incluye gamificación',JSON.parse(c.storage['pylab-asir-progress-v1']).game.version===1);
const broken=legacy({lessons:['m01-l1','evil','m01-l1'],days:['2025-02-31','2099-01-01','wrong'],quizzes:{1:{best:900,last:-10,attempts:-5}},game:{version:1,earned:{lessons:['evil'],quizzes:{999:100}},claimed:['deployment','fake'],incidents:{i01:[0,0,1,99,'2']},profile:{alias:'X'.repeat(200),goal:999,palette:'invalid'},activity:[{day:'2025-02-31',key:'lessons:m01-l1'}]}});
P.importData(JSON.stringify(broken));check('Importación filtra duplicados y IDs extraños',P.state.lessons.length===1&&P.state.game.earned.lessons.length===1);
check('Importación filtra fechas imposibles o futuras',P.state.days.length===0&&P.state.game.activity.length===0);
check('Importación limita puntuaciones y alias',P.state.quizzes[1].best===100&&P.state.quizzes[1].last===0&&P.state.game.profile.alias.length===24);
check('No se importan misiones sin requisitos',P.state.game.claimed.length===0);
same('Pasos importados conocidos y sin duplicado',P.state.game.incidents.i01,[0,1]);
check('Preferencias inválidas se normalizan',P.state.game.profile.goal===3&&P.state.game.profile.palette==='mint');
const beforeInvalid=xp();assert.throws(()=>P.importData('{broken'));check('JSON mal formado no reemplaza estado',xp()===beforeInvalid);
assert.throws(()=>P.importData(JSON.stringify({version:2})));check('Versión incompatible no reemplaza estado',xp()===beforeInvalid);
P.reset();for(const l of c.Course.lessons)P.toggle('lessons',l.id);P.profile({palette:'blue'});
check('Tema azul desbloqueado al alcanzar nivel 3',summary().level>=3&&P.state.game.profile.palette==='blue');
for(const type of ['exercises','challenges'])for(const x of c.Course[type])P.toggle(type,x.id);
for(const m of c.Course.modules)P.quiz(m.id,100);
for(const x of c.Course.predictions)P.record('predictions',x.id);for(const x of c.Course.bugs)P.record('debug',x.id);
for(const inc of c.GameData.incidents)for(let n=0;n<3;n++)P.incident(inc.id,n);
for(const m of c.GameData.missions)P.claim(m.id);
check('Nivel 10 alcanzable con el contenido disponible',summary().level===10&&xp()>=8500);
check('Todos los módulos alcanzan 3 estrellas',summary().mastered===14);
check('Todas las misiones son alcanzables',P.state.game.claimed.length===8);
P.importData(JSON.stringify({...P.state,days:['2025-01-01','2025-01-02','2025-01-03']}));
check('Insignia de constancia histórica se conserva tras descanso',G.badges(P.state).find(b=>b.id==='days').earned);
check('Las 12 insignias son alcanzables',G.badges(P.state).filter(b=>b.earned).length===12);
P.profile({palette:'amber'});check('Tema de máximo nivel equipable',P.state.game.profile.palette==='amber');
const full=xp();P.exportData();P.reset();P.importData(c.downloaded.text);check('Copia completa conserva todo el historial',xp()===full&&P.state.game.profile.palette==='amber');
const report={passed:results.length,max_xp:full,checks:results,method:'Node VM con Storage en memoria; sin navegador ni red.'};
fs.mkdirSync(path.join(ROOT,'tests/results'),{recursive:true});fs.writeFileSync(path.join(ROOT,'tests/results/game-rules-results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:results.length,max_xp:full}));

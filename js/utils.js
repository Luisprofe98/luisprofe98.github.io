"use strict";
window.UI = (() => {
  const icons = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1zM12 5v15"/>',
    layers: '<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
    code: '<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18"/>',
    terminal: '<path d="m5 7 5 5-5 5m8 0h6"/><rect x="1" y="2" width="22" height="20" rx="3"/>',
    flag: '<path d="M5 22V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0"/>',
    quiz: '<rect x="5" y="3" width="15" height="19" rx="2"/><path d="M9 3V1h7v2M9 9h7M9 14h7M9 18h4"/>',
    chart: '<path d="M3 3v18h18M7 16v-4m5 4V7m5 9V3"/>',
    search: '<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
    moon: '<path d="M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11z"/>',
    play: '<path d="m7 3 14 9-14 9z"/>',
    stop: '<rect x="5" y="5" width="14" height="14" rx="1"/>',
    bug: '<path d="M8 7 6 3m10 4 2-4M3 8l4 2m-4 5h4m-4 6 5-3M21 8l-4 2m4 5h-4m4 6-5-3M12 10v11"/><rect x="7" y="6" width="10" height="15" rx="5"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/>',
    flame: '<path d="M13 2c2 6-4 6-2 10 2-1 3-3 3-5 10 8 4 15-2 15-9 0-12-9-5-16-1 5 2 5 2 5s-1-5 4-9z"/>',
    download: '<path d="M12 2v13m-5-5 5 5 5-5M3 16v5h18v-5"/>',
    upload: '<path d="M12 16V3m-5 5 5-5 5 5M3 16v5h18v-5"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="m5 5 14 14M5 19 19 5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    shield: '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6z"/><path d="m8 12 3 3 5-6"/>',
    reset: '<path d="M3 10a9 9 0 1 1 2 9M3 3v7h7"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 10v7m0-11v1"/>',
    folder: '<path d="M2 6V3h7l3 3h10v14H2z"/>',
    edit: '<path d="m15 3 6 6-12 12H3v-6zM12 6l6 6"/>',
    spark: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>'
  };
  const codes = new Map();
  const h = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.code}</svg>`;
  const norm = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function highlight(code) {
    const pattern = /(?:[frbuFRBU]{0,2})(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|#[^\n]*|\b(?:def|return|if|elif|else|for|while|in|not|and|or|try|except|finally|with|as|import|from|raise|break|continue|class|pass|is|lambda)\b|\b(?:True|False|None)\b|\b(?:print|input|int|float|str|bool|len|range|open|set|list|dict|tuple|sorted|type|sum|min|max|enumerate|isinstance)\b|\b\d+(?:\.\d+)?\b/g;
    let result='', offset=0;
    for (const m of code.matchAll(pattern)) {
      const token=m[0];
      const cls=token.startsWith('#')?'comment':/^[frbu]*["']/i.test(token)?'string':/^\d/.test(token)?'number':/^(True|False|None)$/.test(token)?'literal':/^(print|input|int|float|str|bool|len|range|open|set|list|dict|tuple|sorted|type|sum|min|max|enumerate|isinstance)$/.test(token)?'builtin':'keyword';
      result+=h(code.slice(offset,m.index))+`<span class="tok-${cls}">${h(token)}</span>`;
      offset=m.index+token.length;
    }
    return result+h(code.slice(offset));
  }
  function code(source, title='Python', editable=true, inputs='') {
    const id=`code-${codes.size}`;
    codes.set(id,{source,title,inputs});
    return `<div class="code-block"><div class="code-toolbar"><span>${icon('code')} ${h(title)}</span><div><button class="code-action" data-action="copy" data-code="${id}" aria-label="Copiar código" title="Copiar código">${icon('copy')}<span>Copiar código</span></button>${editable?`<button class="code-action" data-action="edit" data-code="${id}" aria-label="Modificar ejemplo" title="Modificar ejemplo">${icon('edit')}<span>Modificar ejemplo</span></button>`:''}</div></div><pre tabindex="0"><code>${highlight(source)}</code></pre></div>`;
  }
  const pct = (a,b) => b ? Math.round(a/b*100) : 0;
  const bar = (value,label='Progreso') => `<div class="progress-track" role="progressbar" aria-label="${h(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div>`;
  const badge = (level) => `<span class="badge level-${norm(level)}"><i aria-hidden="true"></i>${h(level)}</span>`;
  const link = (href,text,style='secondary',ico='arrow') => `<a class="btn ${style}" href="${href}">${h(text)}${icon(ico)}</a>`;
  const pageHead = (eyebrow,title,description,aside='') => `<header class="page-head"><div><p class="eyebrow">${h(eyebrow)}</p><h1>${h(title)}</h1><p class="page-intro">${h(description)}</p></div>${aside}</header>`;
  const empty = (title,text) => `<div class="empty-state">${icon('search')}<h2>${h(title)}</h2><p>${h(text)}</p>${link('#/modules','Ver todos los módulos')}</div>`;
  function toast(message) {
    const el=document.getElementById('toast'); el.textContent=message; el.classList.add('visible');
    clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('visible'),4500);
  }
  function download(name,text,type='text/plain;charset=utf-8') {
    const url=URL.createObjectURL(new Blob([text],{type})); const a=document.createElement('a');
    a.href=url; a.download=name; document.body.append(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); }
    catch (_) {
      const el=document.createElement('textarea'); el.value=text; el.className='clipboard-fallback'; document.body.append(el);
      const active=document.activeElement; el.select(); const ok=document.execCommand('copy'); el.remove(); active?.focus();
      if(!ok) { toast('No se pudo copiar. Selecciona el código y usa Ctrl+C.'); return; }
    }
    toast('Código copiado al portapapeles.');
  }
  function moduleName(id) { return Course.modules.find(m=>m.id===Number(id))?.title || 'Todos los módulos'; }
  return {h,icon,norm,highlight,code,codes,pct,bar,badge,link,pageHead,empty,toast,download,copy,moduleName};
})();

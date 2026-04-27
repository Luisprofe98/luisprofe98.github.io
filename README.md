<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Canciones con IA — 1º Bachillerato</title>
  <meta name="description" content="Proyecto de creación musical con inteligencia artificial para 1º de Bachillerato." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
  <style>
    /* ─── TOKENS ──────────────────────────────────────────────── */
    :root {
      --bg:       #0b0c10;
      --surface:  #13151c;
      --border:   #1e2130;
      --accent:   #e8ff47;
      --accent2:  #ff5e5e;
      --text:     #e4e8f0;
      --muted:    #6b7280;
      --card:     #161a27;
      --font-display: 'Bebas Neue', sans-serif;
      --font-body:    'DM Sans', sans-serif;
      --nav-h: 64px;
      --radius: 12px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; font-size: 16px; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* ─── SCROLLBAR ───────────────────────────────────────────── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

    /* ─── NAV ─────────────────────────────────────────────────── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: var(--nav-h);
      background: rgba(11,12,16,.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 clamp(1rem, 5vw, 3rem);
      z-index: 1000;
    }

    .nav-logo {
      font-family: var(--font-display);
      font-size: 1.6rem;
      letter-spacing: .06em;
      color: var(--accent);
      text-decoration: none;
    }

    .nav-logo span { color: var(--text); }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: .875rem;
      font-weight: 600;
      letter-spacing: .04em;
      text-transform: uppercase;
      transition: color .2s;
      position: relative;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: var(--accent);
      transition: width .25s;
    }

    .nav-links a:hover { color: var(--accent); }
    .nav-links a:hover::after { width: 100%; }

    /* hamburger */
    .burger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
    }
    .burger span {
      display: block;
      width: 24px; height: 2px;
      background: var(--text);
      border-radius: 2px;
      transition: transform .3s, opacity .3s;
    }
    .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .burger.open span:nth-child(2) { opacity: 0; }
    .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 680px) {
      .burger { display: flex; }
      .nav-links {
        position: fixed;
        top: var(--nav-h); left: 0; right: 0;
        background: var(--surface);
        border-bottom: 1px solid var(--border);
        flex-direction: column;
        gap: 0;
        padding: 1rem 0;
        transform: translateY(-120%);
        transition: transform .3s ease;
      }
      .nav-links.open { transform: translateY(0); }
      .nav-links li { border-bottom: 1px solid var(--border); }
      .nav-links a {
        display: block;
        padding: .9rem 2rem;
        font-size: 1rem;
      }
      .nav-links a::after { display: none; }
    }

    /* ─── HERO ────────────────────────────────────────────────── */
    #inicio {
      min-height: 100svh;
      padding-top: var(--nav-h);
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,255,71,.07) 0%, transparent 70%),
        radial-gradient(ellipse 40% 40% at 80% 80%, rgba(255,94,94,.06) 0%, transparent 60%);
      animation: pulse-bg 8s ease-in-out infinite alternate;
    }

    @keyframes pulse-bg {
      from { opacity: .6; }
      to   { opacity: 1; }
    }

    /* grid lines decoration */
    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 80%);
    }

    .hero-inner {
      position: relative;
      text-align: center;
      padding: 4rem clamp(1rem, 6vw, 4rem);
      max-width: 860px;
    }

    .hero-badge {
      display: inline-block;
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid rgba(232,255,71,.3);
      border-radius: 99px;
      padding: .3rem 1rem;
      margin-bottom: 2rem;
      animation: fade-up .6s ease both;
    }

    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(3.5rem, 12vw, 9rem);
      line-height: .92;
      letter-spacing: .02em;
      color: var(--text);
      animation: fade-up .6s .1s ease both;
    }

    .hero-title .accent { color: var(--accent); display: block; }

    .hero-subtitle {
      margin-top: 1.5rem;
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      color: var(--muted);
      max-width: 600px;
      margin-inline: auto;
      animation: fade-up .6s .2s ease both;
    }

    .hero-desc {
      margin-top: 1.5rem;
      font-size: 1rem;
      color: var(--text);
      max-width: 640px;
      margin-inline: auto;
      animation: fade-up .6s .3s ease both;
      line-height: 1.8;
    }

    .hero-cta {
      margin-top: 2.5rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      animation: fade-up .6s .4s ease both;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      padding: .75rem 1.75rem;
      border-radius: 99px;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: .9rem;
      letter-spacing: .03em;
      text-decoration: none;
      cursor: pointer;
      transition: transform .2s, box-shadow .2s;
    }

    .btn:hover { transform: translateY(-2px); }

    .btn-primary {
      background: var(--accent);
      color: var(--bg);
      box-shadow: 0 0 24px rgba(232,255,71,.25);
    }
    .btn-primary:hover { box-shadow: 0 0 36px rgba(232,255,71,.45); }

    .btn-ghost {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

    @keyframes fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* waveform decoration */
    .waveform {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 40px;
      opacity: .35;
    }
    .waveform span {
      display: block;
      width: 4px;
      background: var(--accent);
      border-radius: 2px;
      animation: wave var(--d, .8s) ease-in-out infinite alternate;
    }
    @keyframes wave {
      from { transform: scaleY(.2); }
      to   { transform: scaleY(1); }
    }

    /* ─── SECTIONS SHARED ─────────────────────────────────────── */
    section {
      padding: 6rem clamp(1rem, 6vw, 4rem);
      max-width: 1100px;
      margin-inline: auto;
    }

    .section-tag {
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: .75rem;
    }

    .section-title {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 6vw, 4rem);
      line-height: 1;
      letter-spacing: .02em;
      margin-bottom: 1rem;
    }

    .section-intro {
      color: var(--muted);
      max-width: 600px;
      margin-bottom: 3rem;
      font-size: 1rem;
    }

    hr.divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 0;
    }

    /* ─── CANCIONES ───────────────────────────────────────────── */
    #canciones { padding-top: 5rem; }

    .songs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .song-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: border-color .25s, transform .25s, box-shadow .25s;
      position: relative;
    }

    .song-card:hover {
      border-color: rgba(232,255,71,.4);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0,0,0,.4);
    }

    .song-card-header {
      padding: 1.25rem 1.25rem .75rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .song-icon {
      width: 48px; height: 48px;
      border-radius: 10px;
      background: rgba(232,255,71,.1);
      border: 1px solid rgba(232,255,71,.2);
      display: grid;
      place-items: center;
      font-size: 1.4rem;
      flex-shrink: 0;
    }

    .song-meta { flex: 1; min-width: 0; }

    .song-title {
      font-family: var(--font-display);
      font-size: 1.35rem;
      letter-spacing: .03em;
      line-height: 1.1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .song-artist {
      font-size: .85rem;
      color: var(--muted);
      margin-top: .15rem;
    }

    .song-genre {
      display: inline-block;
      font-size: .7rem;
      font-weight: 600;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--accent);
      background: rgba(232,255,71,.08);
      border: 1px solid rgba(232,255,71,.2);
      border-radius: 99px;
      padding: .2rem .65rem;
      margin: 0 1.25rem .75rem;
    }

    .song-desc {
      padding: 0 1.25rem 1.25rem;
      font-size: .88rem;
      color: var(--muted);
      line-height: 1.6;
    }

    .song-player {
      padding: 0 1.25rem 1.25rem;
    }

    /* custom audio */
    .audio-wrap {
      background: rgba(0,0,0,.3);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: .75rem 1rem;
    }

    .audio-wrap audio {
      width: 100%;
      height: 32px;
      accent-color: var(--accent);
    }

    .audio-placeholder {
      font-size: .78rem;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: .5rem;
    }

    .audio-placeholder .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--accent);
      opacity: .5;
      animation: blink 1.2s infinite;
    }

    @keyframes blink {
      0%,100% { opacity: .3; }
      50%      { opacity: 1; }
    }

    /* ─── PROCESO ─────────────────────────────────────────────── */
    #proceso { padding-top: 5rem; }

    .proceso-steps {
      display: grid;
      gap: 2rem;
    }

    .step {
      display: grid;
      grid-template-columns: 56px 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    .step-number {
      width: 56px; height: 56px;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: var(--card);
      display: grid;
      place-items: center;
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--accent);
      flex-shrink: 0;
      position: relative;
    }

    .step-number::after {
      content: '';
      position: absolute;
      top: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: calc(100% + 1.5rem);
      background: linear-gradient(to bottom, var(--border), transparent);
    }

    .step:last-child .step-number::after { display: none; }

    .step-content {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      transition: border-color .2s;
    }

    .step-content:hover { border-color: rgba(232,255,71,.3); }

    .step-label {
      font-size: .72rem;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: .4rem;
    }

    .step-title {
      font-family: var(--font-display);
      font-size: 1.5rem;
      letter-spacing: .03em;
      margin-bottom: .6rem;
    }

    .step-text {
      color: var(--muted);
      font-size: .9rem;
      line-height: 1.75;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      margin-top: 1rem;
    }

    .tag {
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .06em;
      padding: .25rem .75rem;
      border-radius: 99px;
      background: rgba(255,255,255,.05);
      border: 1px solid var(--border);
      color: var(--text);
    }

    .tag.accent {
      background: rgba(232,255,71,.1);
      border-color: rgba(232,255,71,.25);
      color: var(--accent);
    }

    .prompt-box {
      margin-top: 1rem;
      background: rgba(0,0,0,.35);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 8px;
      padding: .9rem 1.1rem;
      font-family: 'Courier New', monospace;
      font-size: .82rem;
      color: var(--text);
      line-height: 1.7;
      white-space: pre-wrap;
      word-break: break-word;
    }

    /* ─── NORMAS ──────────────────────────────────────────────── */
    #normas { padding-top: 5rem; }

    .normas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .norma-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.75rem;
      transition: border-color .2s;
    }

    .norma-card:hover { border-color: rgba(232,255,71,.3); }

    .norma-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      display: block;
    }

    .norma-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      letter-spacing: .02em;
      margin-bottom: .75rem;
    }

    .norma-text {
      color: var(--muted);
      font-size: .88rem;
      line-height: 1.75;
    }

    .norma-text strong { color: var(--text); }

    .license-badges {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      margin-top: 1rem;
    }

    .license-badge {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      font-size: .72rem;
      font-weight: 600;
      letter-spacing: .06em;
      padding: .3rem .8rem;
      border-radius: 99px;
      border: 1px solid var(--border);
      color: var(--text);
    }

    /* ─── FOOTER ──────────────────────────────────────────────── */
    footer {
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 3rem clamp(1rem, 6vw, 4rem);
    }

    .footer-inner {
      max-width: 1100px;
      margin-inline: auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 600px) {
      .footer-inner { grid-template-columns: 1fr; }
    }

    .footer-brand {
      font-family: var(--font-display);
      font-size: 1.8rem;
      color: var(--accent);
      letter-spacing: .06em;
      margin-bottom: .5rem;
    }

    .footer-meta {
      font-size: .85rem;
      color: var(--muted);
      line-height: 2;
    }

    .footer-meta strong { color: var(--text); }

    .footer-credits {
      text-align: right;
      font-size: .8rem;
      color: var(--muted);
      line-height: 2;
    }

    @media (max-width: 600px) {
      .footer-credits { text-align: left; }
    }

    /* ─── BACK TO TOP ─────────────────────────────────────────── */
    .back-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 44px; height: 44px;
      background: var(--accent);
      color: var(--bg);
      border: none;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      display: grid;
      place-items: center;
      box-shadow: 0 4px 16px rgba(232,255,71,.3);
      opacity: 0;
      pointer-events: none;
      transition: opacity .25s, transform .25s;
      z-index: 999;
      text-decoration: none;
    }

    .back-top.visible { opacity: 1; pointer-events: auto; }
    .back-top:hover { transform: translateY(-3px); }

    /* ─── UTILITY ─────────────────────────────────────────────── */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); border: 0;
    }
  </style>
</head>
<body>

<!-- ══════════════ NAVEGACIÓN ══════════════ -->
<nav aria-label="Menú principal">
  <a href="#inicio" class="nav-logo">Canciones<span> IA</span></a>
  <button class="burger" aria-label="Abrir menú" aria-expanded="false" id="burger">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="nav-links" role="list">
    <li><a href="#inicio">Inicio</a></li>
    <li><a href="#canciones">Canciones</a></li>
    <li><a href="#proceso">Proceso Creativo</a></li>
    <li><a href="#normas">Normas</a></li>
  </ul>
</nav>

<!-- ══════════════ HERO / INICIO ══════════════ -->
<section id="inicio" aria-label="Página principal">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-grid" aria-hidden="true"></div>

  <div class="hero-inner">
    <div class="hero-badge">Proyecto de aula · 2º Bachillerato</div>

    <h1 class="hero-title">
      Música
      <span class="accent">con IA</span>
    </h1>

    <p class="hero-subtitle">
      Creación musical asistida por Inteligencia Artificial
    </p>

    <p class="hero-desc">
      Bienvenido/a a nuestra galería de canciones creadas con herramientas de inteligencia artificial.
      Este proyecto explora cómo la tecnología puede convertirse en un instrumento de expresión artística,
      combinando creatividad humana con el poder generativo de la IA.
    </p>

    <div class="hero-cta">
      <a href="#canciones" class="btn btn-primary">🎵 Ver canciones</a>
      <a href="#proceso" class="btn btn-ghost">Proceso creativo →</a>
    </div>
  </div>

  <!-- decorative waveform -->
  <div class="waveform" aria-hidden="true">
    <span style="height:30%;--d:.7s"></span>
    <span style="height:60%;--d:.5s"></span>
    <span style="height:100%;--d:.9s"></span>
    <span style="height:50%;--d:.6s"></span>
    <span style="height:80%;--d:.4s"></span>
    <span style="height:40%;--d:1.1s"></span>
    <span style="height:90%;--d:.65s"></span>
    <span style="height:55%;--d:.8s"></span>
    <span style="height:70%;--d:.45s"></span>
    <span style="height:35%;--d:.75s"></span>
    <span style="height:85%;--d:.55s"></span>
    <span style="height:45%;--d:.95s"></span>
  </div>
</section>

<hr class="divider" />

<!-- ══════════════ CANCIONES ══════════════ -->
<section id="canciones" aria-labelledby="canciones-title">
  <p class="section-tag">4 · Canciones</p>
  <h2 class="section-title" id="canciones-title">Nuestras Creaciones</h2>
  <p class="section-intro">
    Cada tarjeta representa una canción generada con IA por el alumnado. Haz clic en el reproductor para escucharla.
  </p>

  <div class="songs-grid">

    <!-- Canción 1 -->
    <article class="song-card">
      <div class="song-card-header">
        <div class="song-icon" aria-hidden="true">🎸</div>
        <div class="song-meta">
          <div class="song-title">Sin Título Aún</div>
          <div class="song-artist">Autor/a · Alumno/a 1</div>
        </div>
      </div>
      <span class="song-genre">Rock Alternativo</span>
      <p class="song-desc">
        Una canción sobre la dualidad entre lo analógico y lo digital, creada explorando los límites de la IA generativa musical.
      </p>
      <div class="song-player">
        <div class="audio-wrap">
          <!-- Sustituye "cancion1.mp3" por el archivo real -->
          <audio controls preload="none" aria-label="Reproducir Sin Título Aún">
            <source src="audio/cancion1.mp3" type="audio/mpeg" />
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      </div>
    </article>

    <!-- Canción 2 -->
    <article class="song-card">
      <div class="song-card-header">
        <div class="song-icon" aria-hidden="true">🎹</div>
        <div class="song-meta">
          <div class="song-title">Código y Alma</div>
          <div class="song-artist">Autor/a · Alumno/a 2</div>
        </div>
      </div>
      <span class="song-genre">Electrónica / Ambient</span>
      <p class="song-desc">
        Composición ambiental que mezcla texturas sintetizadas y melodías generadas por modelos de lenguaje musical.
      </p>
      <div class="song-player">
        <div class="audio-wrap">
          <audio controls preload="none" aria-label="Reproducir Código y Alma">
            <source src="audio/cancion2.mp3" type="audio/mpeg" />
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      </div>
    </article>

    <!-- Canción 3 -->
    <article class="song-card">
      <div class="song-card-header">
        <div class="song-icon" aria-hidden="true">🎤</div>
        <div class="song-meta">
          <div class="song-title">Voz Digital</div>
          <div class="song-artist">Autor/a · Alumno/a 3</div>
        </div>
      </div>
      <span class="song-genre">Pop / Indie</span>
      <p class="song-desc">
        Canción pop con letra generada por IA y armonías vocales procesadas digitalmente. Habla de identidad en la era tecnológica.
      </p>
      <div class="song-player">
        <div class="audio-wrap">
          <audio controls preload="none" aria-label="Reproducir Voz Digital">
            <source src="audio/cancion3.mp3" type="audio/mpeg" />
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      </div>
    </article>

    <!-- Canción 4 — placeholder para añadir más -->
    <article class="song-card">
      <div class="song-card-header">
        <div class="song-icon" aria-hidden="true">🥁</div>
        <div class="song-meta">
          <div class="song-title">Pulso Binario</div>
          <div class="song-artist">Autor/a · Alumno/a 4</div>
        </div>
      </div>
      <span class="song-genre">Hip-Hop / Lo-fi</span>
      <p class="song-desc">
        Beat lo-fi con samples generados y rapeado a partir de un guión escrito con IA. Ritmo lento y letras reflexivas.
      </p>
      <div class="song-player">
        <div class="audio-wrap">
          <audio controls preload="none" aria-label="Reproducir Pulso Binario">
            <source src="audio/cancion4.mp3" type="audio/mpeg" />
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      </div>
    </article>

  </div>
</section>

<hr class="divider" />

<!-- ══════════════ PROCESO CREATIVO ══════════════ -->
<section id="proceso" aria-labelledby="proceso-title">
  <p class="section-tag">5 · Proceso Creativo</p>
  <h2 class="section-title" id="proceso-title">¿Cómo lo hicimos?</h2>
  <p class="section-intro">
    Cada canción sigue un proceso estructurado que combina la intención artística del alumnado con el poder de herramientas de IA.
  </p>

  <div class="proceso-steps">

    <!-- Paso 1 -->
    <div class="step">
      <div class="step-number" aria-hidden="true">1</div>
      <div class="step-content">
        <div class="step-label">5.1 · Punto de partida</div>
        <h3 class="step-title">Idea Inicial</h3>
        <p class="step-text">
          Antes de usar ninguna herramienta, cada alumno/a reflexionó sobre qué quería transmitir con su canción:
          una emoción, una historia, un concepto. Esta fase humana es el motor de todo el proceso.
          Se definió el género musical, el tono emocional y el público objetivo.
        </p>
        <div class="tag-list">
          <span class="tag">Brainstorming</span>
          <span class="tag">Mapa conceptual</span>
          <span class="tag">Guión inicial</span>
        </div>
      </div>
    </div>

    <!-- Paso 2 -->
    <div class="step">
      <div class="step-number" aria-hidden="true">2</div>
      <div class="step-content">
        <div class="step-label">5.2 · Tecnología</div>
        <h3 class="step-title">Herramientas de IA Utilizadas</h3>
        <p class="step-text">
          El proyecto empleó varias herramientas especializadas según la fase de creación:
        </p>
        <div class="tag-list">
          <span class="tag accent">Suno AI</span>
          <span class="tag accent">Udio</span>
          <span class="tag accent">MusicGen (Meta)</span>
          <span class="tag accent">ChatGPT / Claude</span>
          <span class="tag accent">Audacity</span>
          <span class="tag">Letras con LLM</span>
          <span class="tag">Música generativa</span>
          <span class="tag">Edición de audio</span>
        </div>
      </div>
    </div>

    <!-- Paso 3 -->
    <div class="step">
      <div class="step-number" aria-hidden="true">3</div>
      <div class="step-content">
        <div class="step-label">5.3 · Instrucciones</div>
        <h3 class="step-title">Prompts Utilizados</h3>
        <p class="step-text">
          Los prompts son las instrucciones que damos a la IA. Un buen prompt es claro, específico y contextualizado.
          Ejemplo de prompt usado en Suno AI para una de las canciones:
        </p>
        <div class="prompt-box">🎵 Genera una canción de rock alternativo en español, tempo medio (120 BPM), 
con letra sobre la soledad en la era digital. 
Incluye guitarra eléctrica distorsionada, batería y bajo.
Tono melancólico pero esperanzador.
Estructura: intro – estrofa – coro – estrofa – coro – puente – coro final.</div>
        <p class="step-text" style="margin-top:.75rem;">
          El proceso de <strong>prompt engineering</strong> requirió varias iteraciones para obtener el resultado deseado.
        </p>
      </div>
    </div>

    <!-- Paso 4 -->
    <div class="step">
      <div class="step-number" aria-hidden="true">4</div>
      <div class="step-content">
        <div class="step-label">5.4 · Edición</div>
        <h3 class="step-title">Creación y Edición Final</h3>
        <p class="step-text">
          Una vez generado el material por la IA, el alumnado realizó ajustes manuales:
          recortes, mezcla de pistas, ajuste de volumen, aplicación de efectos y, en algunos casos,
          grabación de voz o instrumentos reales para añadir el toque personal.
          Herramientas como <strong>Audacity</strong> o <strong>GarageBand</strong> completaron el proceso.
        </p>
        <div class="tag-list">
          <span class="tag">Mezcla de pistas</span>
          <span class="tag">Corrección de tono</span>
          <span class="tag">Masterización básica</span>
          <span class="tag">Voz humana añadida</span>
        </div>
      </div>
    </div>

  </div>
</section>

<hr class="divider" />

<!-- ══════════════ NORMAS / AVISO LEGAL ══════════════ -->
<section id="normas" aria-labelledby="normas-title">
  <p class="section-tag">6 · Aviso Legal y Ético</p>
  <h2 class="section-title" id="normas-title">Normas del Proyecto</h2>
  <p class="section-intro">
    El uso de IA en la creación artística conlleva responsabilidades. Estas son las normas que guían nuestro trabajo.
  </p>

  <div class="normas-grid">

    <!-- 6.1 -->
    <div class="norma-card">
      <span class="norma-icon" aria-hidden="true">🤖</span>
      <h3 class="norma-title">Uso Responsable de la IA</h3>
      <p class="norma-text">
        La IA es una herramienta de apoyo, no un sustituto de la creatividad. En este proyecto,
        <strong>toda creación parte de una idea humana</strong> y la IA actúa como colaborador.
        Se prohíbe el uso de IA para generar contenido ofensivo, discriminatorio o inapropiado.
        Las creaciones se presentan con transparencia, indicando siempre qué partes generó la IA.
      </p>
    </div>

    <!-- 6.2 -->
    <div class="norma-card">
      <span class="norma-icon" aria-hidden="true">🔒</span>
      <h3 class="norma-title">Privacidad y Protección de Datos</h3>
      <p class="norma-text">
        No se han introducido datos personales en las herramientas de IA.
        Las canciones publicadas en esta web están alojadas en <strong>GitHub Pages</strong> bajo
        protección HTTPS. No se recogen datos del visitante ni se usan cookies de terceros.
        El alumnado menor de edad aparece únicamente con nombre de pila o seudónimo.
      </p>
    </div>

    <!-- 6.2b — Licencias -->
    <div class="norma-card">
      <span class="norma-icon" aria-hidden="true">📄</span>
      <h3 class="norma-title">Copyright, Copyleft y Creative Commons</h3>
      <p class="norma-text">
        Las obras se publican bajo licencia <strong>Creative Commons CC BY-NC-SA 4.0</strong>:
        se permite compartir y adaptar el material <em>siempre que</em> se atribuya la autoría,
        no se use con fines comerciales y las obras derivadas mantengan la misma licencia.
      </p>
      <div class="license-badges">
        <span class="license-badge">© Copyright</span>
        <span class="license-badge">🄯 Copyleft</span>
        <span class="license-badge">CC BY-NC-SA</span>
      </div>
    </div>

    <!-- 6.4 -->
    <div class="norma-card">
      <span class="norma-icon" aria-hidden="true">⚖️</span>
      <h3 class="norma-title">Derechos de Autor</h3>
      <p class="norma-text">
        La autoría de las canciones corresponde al <strong>alumnado de 2º de Bachillerato</strong>
        que las ha concebido y dirigido. El uso de herramientas como Suno AI o Udio implica
        aceptar sus términos de servicio, que en muchos casos permiten uso educativo no comercial.
        No se han utilizado muestras de audio (samples) con derechos registrados sin autorización.
      </p>
    </div>

  </div>
</section>

<hr class="divider" />

<!-- ══════════════ FOOTER ══════════════ -->
<footer role="contentinfo">
  <div class="footer-inner">
    <div>
      <div class="footer-brand">Canciones IA</div>
      <div class="footer-meta">
        <strong>Proyecto:</strong> Creación Musical con Inteligencia Artificial<br />
        <strong>Curso:</strong> 1º Bachillerato · Curso 2025–2026<br />
        <strong>Materia:</strong> Tecnología e Informática<br />
        <strong>Centro:</strong> IES Maria Auxiliadora
      </div>
    </div>
    <div class="footer-credits">
      Desarrollado enteramente con sudor y sangre humanas<br />
      Alojado en <strong>GitHub Pages</strong><br />
      Licencia <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es"
                  target="_blank" rel="noopener noreferrer"
                  style="color:var(--accent);text-decoration:none;">CC BY-NC-SA 4.0</a><br />
      <span style="font-size:.75rem;color:var(--muted);margin-top:.5rem;display:block;">
        © 2026 · Proyecto educativo sin ánimo de lucro
      </span>
    </div>
  </div>
</footer>

<!-- Back to top -->
<a href="#inicio" class="back-top" id="back-top" aria-label="Volver arriba">↑</a>

<script>
  /* ── Burger menu ─────────────────────────────────── */
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  // close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Back to top ─────────────────────────────────── */
  const backTop = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ── Active nav highlight ────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id
            ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: .35 });

  sections.forEach(s => io.observe(s));
</script>
</body>
</html>

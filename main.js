/* ══════════════════════════════════════════════════════
   Canciones con IA — 2º Bachillerato
   Script principal
   ══════════════════════════════════════════════════════ */

/* ── Menú hamburguesa (móvil) ────────────────────────── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

/* Cerrar menú al pulsar un enlace (móvil) */
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ── Botón volver arriba ─────────────────────────────── */
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── Resaltado de sección activa en el nav ───────────── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

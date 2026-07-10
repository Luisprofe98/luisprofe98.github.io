export function renderLanding(appRoot) {
  appRoot.innerHTML = `
    <main class="container py-5">
      <nav class="navbar mb-5"><span class="navbar-brand fw-bold">Clubox</span><a class="btn btn-outline-clubox" href="#/login">Acceder</a></nav>
      <section class="hero-panel p-5 mb-4">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <p class="text-uppercase small mb-2">Gestion para clubes deportivos</p>
            <h1 class="display-5 fw-bold">Gestiona tu club deportivo desde un solo lugar.</h1>
            <p class="lead mt-3">Centraliza formularios, jugadores, equipos, cuotas y contabilidad con una base simple preparada para crecer.</p>
            <div class="d-flex flex-wrap gap-3 mt-4">
              <a class="btn btn-clubox btn-lg bg-white text-dark border-white" href="#/login">Acceder a Clubox</a>
              <a class="btn btn-outline-light btn-lg" href="mailto:info@clubox.local">Solicitar informacion</a>
            </div>
          </div>
          <div class="col-lg-5"><div class="card card-clubox text-dark"><div class="card-body p-4"><h2 class="h5">Todo listo para tu club</h2><p class="mb-0">Una SPA modular con rutas publicas, acceso privado y datos mock hasta conectar Google Cloud.</p></div></div></div>
        </div>
      </section>
    </main>`;
}

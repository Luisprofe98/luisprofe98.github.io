export function renderInscripciones(pageRoot) {
  pageRoot.innerHTML = `<section class="container-fluid px-0">
    <h1 class="h3 mb-3">Solicitudes recibidas</h1>
    <ul class="nav nav-tabs mb-3"><li class="nav-item"><a class="nav-link" href="#/app/formularios">Formularios</a></li>
      <li class="nav-item"><a class="nav-link active" href="#/app/inscripciones">Inscripciones recibidas</a></li></ul>
    <div class="alert alert-warning" role="alert">
      La gestion administrativa de inscripciones se completara en el siguiente bloque.
    </div>
  </section>`;
}

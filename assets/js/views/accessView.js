export function renderDenied(pageRoot) {
  pageRoot.innerHTML = `
    <section class="container-fluid px-0">
      <div class="alert alert-warning" role="alert">
        <h1 class="h4">Acceso no permitido</h1>
        <p class="mb-0">No tienes permiso para abrir esta seccion.</p>
      </div>
    </section>`;
}

export function renderModule(pageRoot, pageData) {
  pageRoot.innerHTML = `
    <section class="container-fluid px-0">
      <h1 class="h3 mb-2">${pageData.title}</h1>
      <p class="text-muted mb-4">${pageData.description}</p>
      <div class="card module-card">
        <div class="card-body d-flex align-items-center">
          <p class="mb-0 text-muted">Modulo preparado para su desarrollo.</p>
        </div>
      </div>
    </section>`;
}

import { fetchList } from "../services/apiService.js";

export async function renderFormularios(pageRoot) {
  const itemList = await fetchList("formularios");
  pageRoot.innerHTML = `
    <section class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div><h1 class="h3 mb-1">Formularios creados</h1><p class="text-muted mb-0">Gestiona formularios publicos para altas e inscripciones.</p></div>
        <button class="btn btn-clubox">+ Nuevo</button>
      </div>
      <div class="card card-clubox"><div class="card-body">
        <div class="alert alert-success succeed">Modulo preparado para datos del club.</div>
        <div class="table-responsive"><table class="table table-hover align-middle mb-0">
          <thead><tr><th>Nombre</th><th>Estado</th><th>Envios</th><th>Accion</th></tr></thead>
          <tbody>${itemList.map((itemDato) => `<tr><td>${itemDato.nombre}</td><td><span class="badge text-bg-success">${itemDato.estado}</span></td><td>${itemDato.envios}</td><td><button class="btn btn-sm btn-outline-clubox">Ver</button></td></tr>`).join("") || '<tr><td colspan="4" class="text-muted">Sin datos disponibles.</td></tr>'}</tbody>
        </table></div>
      </div></div>
    </section>`;
}

import { fetchList } from "../services/apiService.js";

export async function renderTecnicos(pageRoot) {
  const itemList = await fetchList("tecnicos");
  pageRoot.innerHTML = `
    <section class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div><h1 class="h3 mb-1">Cuerpo tecnico</h1><p class="text-muted mb-0">Administra entrenadores y ayudantes.</p></div>
        <button class="btn btn-clubox">+ Nuevo</button>
      </div>
      <div class="card card-clubox"><div class="card-body">
        <div class="alert alert-success succeed">Modulo preparado para datos del club.</div>
        <div class="table-responsive"><table class="table table-hover align-middle mb-0">
          <thead><tr><th>Nombre</th><th>Rol</th><th>Equipo</th><th>Accion</th></tr></thead>
          <tbody>${itemList.map((itemDato) => `<tr><td>${itemDato.nombre}</td><td>${itemDato.rol}</td><td>${itemDato.equipo}</td><td><button class="btn btn-sm btn-outline-clubox">Editar</button></td></tr>`).join("") || '<tr><td colspan="4" class="text-muted">Sin datos disponibles.</td></tr>'}</tbody>
        </table></div>
      </div></div>
    </section>`;
}

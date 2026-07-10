import { fetchList } from "../services/apiService.js";

export async function renderJugadores(pageRoot) {
  const itemList = await fetchList("jugadores");
  pageRoot.innerHTML = `
    <section class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div><h1 class="h3 mb-1">Jugadores</h1><p class="text-muted mb-0">Listado de jugadores del club.</p></div>
        <button class="btn btn-clubox">+ Nuevo</button>
      </div>
      <div class="card card-clubox"><div class="card-body">
        <div class="alert alert-success succeed">Modulo preparado para datos del club.</div>
        <div class="table-responsive"><table class="table table-hover align-middle mb-0">
          <thead><tr><th>Nombre</th><th>Equipo</th><th>Estado</th><th>Accion</th></tr></thead>
          <tbody>${itemList.map((itemDato) => `<tr><td>${itemDato.nombre}</td><td>${itemDato.equipo}</td><td><span class="badge text-bg-success">${itemDato.estado}</span></td><td><button class="btn btn-sm btn-outline-clubox">Editar</button></td></tr>`).join("") || '<tr><td colspan="4" class="text-muted">Sin datos disponibles.</td></tr>'}</tbody>
        </table></div>
      </div></div>
    </section>`;
}

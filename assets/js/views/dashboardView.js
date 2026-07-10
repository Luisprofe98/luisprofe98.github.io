import { fetchList } from "../services/apiService.js";

export async function renderDashboard(pageRoot) {
  const formsList = await fetchList("formularios");
  const insList = await fetchList("inscripciones");
  const playerList = await fetchList("jugadores");
  const movList = await fetchList("movimientos");
  const cardList = [
    { title: "Formularios", count: formsList.length, route: "#/app/formularios" },
    { title: "Inscripciones", count: insList.length, route: "#/app/inscripciones" },
    { title: "Gestion deportiva", count: playerList.length, route: "#/app/jugadores" },
    { title: "Contabilidad", count: movList.length, route: "#/app/contabilidad" },
    { title: "Cuotas", count: "Listo", route: "#/app/cuotas" }
  ];
  pageRoot.innerHTML = `
    <section class="container-fluid">
      <h1 class="h3 mb-1">Panel principal</h1>
      <p class="text-muted mb-4">Accesos rapidos a los modulos de Clubox.</p>
      <div class="row g-3">
        ${cardList.map((cardDato) => `<div class="col-md-6 col-xl-4"><div class="card card-clubox h-100"><div class="card-body"><p class="text-muted mb-1">${cardDato.title}</p><h2 class="h4">${cardDato.count}</h2><button class="btn btn-sm btn-outline-clubox" data-go="${cardDato.route}">Abrir</button></div></div></div>`).join("")}
      </div>
    </section>`;
  pageRoot.querySelectorAll("[data-go]").forEach((goLink) => {
    goLink.addEventListener("click", () => {
      window.location.hash = goLink.dataset.go;
    });
  });
}

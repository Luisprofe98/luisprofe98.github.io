import { fetchList } from "../services/apiService.js";

export async function renderDashboard(pageRoot) {
  const [formList, insList, playerList, movList, feeList] = await Promise.all([fetchList("formularios"), fetchList("inscripciones"), fetchList("jugadores"), fetchList("movimientos"), fetchList("cuotas")]);
  const cardList = [
    { title: "Formularios", value: formList.length, route: "#/app/formularios" },
    { title: "Inscripciones", value: insList.filter((itemData) => itemData.estado === "recibida").length, route: "#/app/inscripciones" },
    { title: "Gestion deportiva", value: playerList.length, route: "#/app/jugadores" },
    { title: "Contabilidad", value: movList.length, route: "#/app/contabilidad" },
    { title: "Cuotas", value: feeList.length, route: "#/app/cuotas" }
  ];
  pageRoot.innerHTML = `<section class="container-fluid px-0"><h1 class="h3 mb-2">Panel principal</h1><p class="text-muted mb-4">Resumen de la actividad del club.</p><div class="row g-3">${cardList.map((cardData) => `<div class="col-md-6 col-xl-4"><div class="card card-clubox h-100"><div class="card-body"><p class="text-muted mb-1">${cardData.title}</p><strong class="h3 d-block mb-3">${cardData.value}</strong><button class="btn btn-sm btn-outline-clubox" data-route="${cardData.route}" type="button">Abrir</button></div></div></div>`).join("")}</div></section>`;
  pageRoot.querySelectorAll("[data-route]").forEach((buttonData) => buttonData.addEventListener("click", () => { window.location.hash = buttonData.dataset.route; }));
}

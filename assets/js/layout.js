import { getSession, logoutUser } from "./auth.js";

const menuData = [
  { title: "Inicio", items: [{ label: "Dashboard", route: "#/app/dashboard" }] },
  { title: "Formularios", items: [{ label: "Formularios creados", route: "#/app/formularios" }, { label: "Inscripciones recibidas", route: "#/app/inscripciones" }] },
  { title: "Gestion deportiva", items: [{ label: "Jugadores", route: "#/app/jugadores" }, { label: "Equipos", route: "#/app/equipos" }, { label: "Cuerpo tecnico", route: "#/app/tecnicos" }] },
  { title: "Contabilidad", items: [{ label: "Registro de movimientos", route: "#/app/contabilidad" }, { label: "Resumen economico", route: "#/app/resumen" }] },
  { title: "Cuotas y pagos", items: [{ label: "Configuracion de cuotas", route: "#/app/cuotas" }, { label: "Pagos", route: "#/app/pagos" }] }
];

export function renderShell(appRoot) {
  const sessionData = getSession();
  appRoot.innerHTML = `
    <div class="app-shell">
      <header class="navbar navbar-dark bg-dark px-3">
        <a class="navbar-brand fw-bold" href="#/app/dashboard">Clubox</a>
        <div class="d-flex align-items-center gap-3 text-white">
          <span class="small d-none d-sm-inline">${sessionData?.club || "Club activo"}</span>
          <button class="btn btn-sm btn-outline-light" id="logoutBtn">Cerrar sesion</button>
        </div>
      </header>
      <div class="container-fluid">
        <div class="row">
          <aside class="col-lg-3 col-xl-2 sidebar p-3">
            <div class="accordion accordion-flush" id="menuRoot">
              ${menuData.map(renderMenu).join("")}
            </div>
          </aside>
          <main class="col-lg-9 col-xl-10 page-main p-4" id="pageRoot"></main>
        </div>
      </div>
    </div>`;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    logoutUser();
    window.location.hash = "#/login";
  });
}

export function bindMenu() {
  document.querySelectorAll("[data-route]").forEach((routeLink) => {
    routeLink.addEventListener("click", () => {
      window.location.hash = routeLink.dataset.route;
    });
  });
}

export function setActive(hashValue) {
  document.querySelectorAll("[data-route]").forEach((routeLink) => {
    routeLink.classList.toggle("active", routeLink.dataset.route === hashValue);
  });
}

function renderMenu(menuItem, itemIndex) {
  const menuId = `menu${itemIndex}`;
  return `
    <div class="accordion-item border-0 bg-transparent">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${menuId}">
          ${menuItem.title}
        </button>
      </h2>
      <div id="${menuId}" class="accordion-collapse collapse show" data-bs-parent="#menuRoot">
        <div class="accordion-body px-0 py-2">
          <nav class="nav flex-column gap-1">
            ${menuItem.items.map((itemDato) => `<button class="nav-link text-start border-0" data-route="${itemDato.route}">${itemDato.label}</button>`).join("")}
          </nav>
        </div>
      </div>
    </div>`;
}

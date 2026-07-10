import { hasSession } from "./auth.js";
import { renderShell, bindMenu, setActive } from "./layout.js";
import { renderLanding } from "./views/landingView.js";
import { renderLogin } from "./views/loginView.js";
import { renderDashboard } from "./views/dashboardView.js";
import { renderFormularios } from "./views/formulariosView.js";
import { renderInscripciones } from "./views/inscripcionesView.js";
import { renderJugadores } from "./views/jugadoresView.js";
import { renderEquipos } from "./views/equiposView.js";
import { renderTecnicos } from "./views/tecnicosView.js";
import { renderContabilidad } from "./views/contabilidadView.js";
import { renderResumen } from "./views/resumenView.js";
import { renderCuotas } from "./views/cuotasView.js";
import { renderPagos } from "./views/pagosView.js";

const routeMap = {
  "#/app/dashboard": renderDashboard,
  "#/app/formularios": renderFormularios,
  "#/app/inscripciones": renderInscripciones,
  "#/app/jugadores": renderJugadores,
  "#/app/equipos": renderEquipos,
  "#/app/tecnicos": renderTecnicos,
  "#/app/contabilidad": renderContabilidad,
  "#/app/resumen": renderResumen,
  "#/app/cuotas": renderCuotas,
  "#/app/pagos": renderPagos
};

export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  if (!window.location.hash) {
    window.location.hash = "#/";
  } else {
    handleRoute();
  }
}

export async function handleRoute() {
  const appRoot = document.getElementById("appRoot");
  const hashValue = window.location.hash || "#/";

  if (hashValue === "#/") {
    renderLanding(appRoot);
    return;
  }

  if (hashValue === "#/login") {
    renderLogin(appRoot);
    return;
  }

  if (hashValue.startsWith("#/app") && !hasSession()) {
    window.location.hash = "#/login";
    return;
  }

  const viewRender = routeMap[hashValue] || renderDashboard;
  renderShell(appRoot);
  bindMenu();
  setActive(hashValue);
  await viewRender(document.getElementById("pageRoot"));
}

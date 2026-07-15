import { hasSession } from "./auth.js";
import { renderShell } from "./layout.js";
import { setActive } from "./menu.js";
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
  "/app/dashboard": renderDashboard,
  "/app/formularios": renderFormularios,
  "/app/inscripciones": renderInscripciones,
  "/app/jugadores": renderJugadores,
  "/app/equipos": renderEquipos,
  "/app/tecnicos": renderTecnicos,
  "/app/contabilidad": renderContabilidad,
  "/app/resumen": renderResumen,
  "/app/cuotas": renderCuotas,
  "/app/pagos": renderPagos
};

export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  if (!window.location.hash) window.location.hash = "#/";
  else handleRoute();
}

export async function handleRoute() {
  const appRoot = document.getElementById("appRoot");
  const routePath = window.location.hash.slice(1) || "/";

  if (routePath === "/") {
    renderLanding(appRoot);
    return;
  }
  if (routePath === "/login") {
    renderLogin(appRoot);
    return;
  }
  if (routePath.startsWith("/app") && !hasSession()) {
    window.location.hash = "#/login";
    return;
  }
  const viewRender = routeMap[routePath];
  if (!viewRender) {
    window.location.hash = hasSession() ? "#/app/dashboard" : "#/";
    return;
  }
  if (!document.getElementById("clubApp")) renderShell(appRoot);
  setActive(routePath);
  await viewRender(document.getElementById("pageRoot"));
}

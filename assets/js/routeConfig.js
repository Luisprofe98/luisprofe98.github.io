import { permissionTypes } from "./constants/permissionTypes.js";
import { renderContabilidad } from "./views/contabilidadView.js";
import { renderCuotas } from "./views/cuotasView.js";
import { renderDashboard } from "./views/dashboardView.js";
import { renderEquipos } from "./views/equiposView.js";
import { renderFormularioPublico } from "./views/formularioPublico.js";
import { renderFormularios } from "./views/formulariosView.js";
import { renderInscripciones } from "./views/inscripcionesView.js";
import { renderJugadores } from "./views/jugadoresView.js";
import { renderPagos } from "./views/pagosView.js";
import { renderResumen } from "./views/resumenView.js";
import { renderTecnicos } from "./views/tecnicosView.js";

export const routeMap = Object.freeze({
  "/app/dashboard": { render: renderDashboard, permission: permissionTypes.dashboardView, isPrivate: true },
  "/app/formularios": { render: renderFormularios, permission: permissionTypes.formsView, isPrivate: true },
  "/app/inscripciones": { render: renderInscripciones, permission: permissionTypes.inscriptionsView, isPrivate: true },
  "/app/jugadores": { render: renderJugadores, permission: permissionTypes.playersView, isPrivate: true },
  "/app/equipos": { render: renderEquipos, permission: permissionTypes.teamsView, isPrivate: true },
  "/app/tecnicos": { render: renderTecnicos, permission: permissionTypes.staffView, isPrivate: true },
  "/app/contabilidad": { render: renderContabilidad, permission: permissionTypes.accountView, isPrivate: true },
  "/app/resumen": { render: renderResumen, permission: permissionTypes.accountView, isPrivate: true },
  "/app/cuotas": { render: renderCuotas, permission: permissionTypes.feesView, isPrivate: true },
  "/app/pagos": { render: renderPagos, permission: permissionTypes.paymentsView, isPrivate: true }
});

export const menuList = Object.freeze([
  { menuId: "home", menuText: "Inicio", menuRoute: "/app/dashboard" },
  { menuId: "forms", menuText: "Formularios", menuItems: [
    { itemText: "Formularios creados", itemRoute: "/app/formularios" },
    { itemText: "Solicitudes recibidas", itemRoute: "/app/inscripciones" }
  ] },
  { menuId: "sports", menuText: "Gestion deportiva", menuItems: [
    { itemText: "Jugadores", itemRoute: "/app/jugadores" },
    { itemText: "Equipos", itemRoute: "/app/equipos" },
    { itemText: "Cuerpo tecnico", itemRoute: "/app/tecnicos" }
  ] },
  { menuId: "ledger", menuText: "Contabilidad", menuItems: [
    { itemText: "Movimientos", itemRoute: "/app/contabilidad" },
    { itemText: "Resumen economico", itemRoute: "/app/resumen" }
  ] },
  { menuId: "fees", menuText: "Cuotas y pagos", menuItems: [
    { itemText: "Cuotas", itemRoute: "/app/cuotas" },
    { itemText: "Pagos", itemRoute: "/app/pagos" }
  ] }
]);

export function matchDynamicRoute(routePath) {
  const prefix = "/formulario/";
  if (!routePath.startsWith(prefix)) return null;
  const encodedSlug = routePath.slice(prefix.length);
  if (!encodedSlug || encodedSlug.includes("/")) return null;
  try {
    const publicSlug = decodeURIComponent(encodedSlug);
    if (!publicSlug || publicSlug.includes("/")) return null;
    return { render: renderFormularioPublico, publicSlug, isPrivate: false };
  } catch {
    return null;
  }
}

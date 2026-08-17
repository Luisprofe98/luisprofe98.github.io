import { getClub, hasSession, initializeAuth, waitForAuth } from "./auth.js";
import { matchDynamicRoute, routeMap } from "./routeConfig.js";
import { canRoute } from "./services/accessService.js";
import { renderShell } from "./layout.js";
import { setActive } from "./menu.js";
import { renderDenied } from "./views/accessView.js";
import { renderLanding } from "./views/landingView.js";
import { renderLogin } from "./views/loginView.js";

export function initRouter() {
  initializeAuth();
  window.addEventListener("hashchange", () => handleRoute());
  if (!window.location.hash) window.location.hash = "#/";
  else handleRoute();
}

let routeRevision = 0;

export async function handleRoute() {
  const revision = ++routeRevision;
  const appRoot = document.getElementById("appRoot");
  const routePath = window.location.hash.slice(1) || "/";

  if (routePath === "/") {
    renderLanding(appRoot);
    return;
  }
  if (routePath === "/login") {
    await waitForAuth();
    if (revision !== routeRevision) return;
    if (hasSession() && getClub()) {
      window.location.hash = "#/app/dashboard";
      return;
    }
    renderLogin(appRoot);
    return;
  }
  const dynamicRoute = matchDynamicRoute(routePath);
  if (dynamicRoute) {
    await dynamicRoute.render(appRoot, dynamicRoute.publicSlug);
    return;
  }
  const routeData = routeMap[routePath];
  if (!routeData) {
    await waitForAuth();
    if (revision !== routeRevision) return;
    window.location.hash = hasSession() && getClub() ? "#/app/dashboard" : "#/";
    return;
  }
  if (routeData.isPrivate) {
    renderAuthLoading(appRoot);
    await waitForAuth();
    if (revision !== routeRevision) return;
  }
  if (routeData.isPrivate && !hasSession()) {
    window.location.hash = "#/login";
    return;
  }
  if (routeData.isPrivate && !getClub()) {
    window.location.hash = "#/";
    return;
  }
  if (!document.getElementById("clubApp")) renderShell(appRoot);
  const pageRoot = document.getElementById("pageRoot");
  if (!canRoute(routeData)) {
    renderDenied(pageRoot);
    return;
  }
  setActive(routePath);
  await routeData.render(pageRoot);
}

function renderAuthLoading(appRoot) {
  appRoot.innerHTML = `<main class="container py-5"><div class="d-flex align-items-center gap-2 text-muted" role="status">
    <span class="spinner-border spinner-border-sm"></span>Restaurando sesion...
  </div></main>`;
}

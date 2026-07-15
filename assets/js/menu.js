const sideKey = "clubSidebar";
const menuData = [
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
];

export function initMenu() {
  const menuRoot = document.getElementById("menuRoot");
  menuRoot.innerHTML = menuData.map(buildItem).join("");
  loadSide();

  menuRoot.addEventListener("click", (event) => {
    const routeBtn = event.target.closest("[data-route]");
    if (!routeBtn) return;
    goRoute(routeBtn.dataset.route);
    closeMobile();
  });
  document.getElementById("sideToggle").addEventListener("click", toggleSide);
  document.getElementById("mobileToggle").addEventListener("click", openMobile);
  document.getElementById("sideShade").addEventListener("click", closeMobile);
  document.removeEventListener("keydown", handleKey);
  document.addEventListener("keydown", handleKey);
}

export function setActive(routePath) {
  const menuRoot = document.getElementById("menuRoot");
  if (!menuRoot) return;
  menuRoot.querySelectorAll("[data-route]").forEach((routeBtn) => {
    const isActive = routeBtn.dataset.route === routePath;
    routeBtn.classList.toggle("is-active", isActive);
    if (isActive) routeBtn.setAttribute("aria-current", "page");
    else routeBtn.removeAttribute("aria-current");
  });
  openParent(routePath);
}

export function closeMobile() {
  const sideRoot = document.getElementById("sideRoot");
  if (!sideRoot) return;
  sideRoot.classList.remove("is-open");
  document.getElementById("sideShade").classList.remove("is-open");
  const mobileBtn = document.getElementById("mobileToggle");
  mobileBtn.setAttribute("aria-expanded", "false");
  mobileBtn.setAttribute("aria-label", "Abrir menu");
}

function buildItem(menuItem) {
  if (menuItem.menuRoute) {
    return `<button class="club-menu-link" type="button" data-route="${menuItem.menuRoute}"><span class="menu-text">${menuItem.menuText}</span></button>`;
  }
  const groupId = `group-${menuItem.menuId}`;
  return `
    <div class="club-group">
      <button class="club-menu-head collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${groupId}" aria-expanded="false" aria-controls="${groupId}">
        <span class="menu-text">${menuItem.menuText}</span>
      </button>
      <div class="collapse" id="${groupId}" data-bs-parent="#menuRoot">
        <div class="club-submenu">
          ${menuItem.menuItems.map((itemData) => `<button class="club-menu-link club-sub-link" type="button" data-route="${itemData.itemRoute}"><span class="menu-text">${itemData.itemText}</span></button>`).join("")}
        </div>
      </div>
    </div>`;
}

function goRoute(routePath) {
  window.location.hash = `#${routePath}`;
}

function openParent(routePath) {
  const activeBtn = document.querySelector(`[data-route="${routePath}"]`);
  const activeGroup = activeBtn?.closest(".club-group")?.querySelector(".collapse");
  document.querySelectorAll(".club-group .collapse").forEach((groupRoot) => {
    const groupApi = bootstrap.Collapse.getOrCreateInstance(groupRoot, { toggle: false });
    if (groupRoot === activeGroup) groupApi.show();
    else groupApi.hide();
  });
}

function toggleSide() {
  if (window.innerWidth < 992) {
    const sideRoot = document.getElementById("sideRoot");
    if (sideRoot.classList.contains("is-open")) closeMobile();
    else openMobile();
    return;
  }
  const clubApp = document.getElementById("clubApp");
  const isSmall = clubApp.classList.toggle("is-small");
  localStorage.setItem(sideKey, isSmall ? "collapsed" : "expanded");
  const sideBtn = document.getElementById("sideToggle");
  sideBtn.setAttribute("aria-expanded", String(!isSmall));
  sideBtn.setAttribute("aria-label", isSmall ? "Ampliar menu" : "Minimizar menu");
}

function loadSide() {
  const isSmall = localStorage.getItem(sideKey) === "collapsed";
  document.getElementById("clubApp").classList.toggle("is-small", isSmall);
  const sideBtn = document.getElementById("sideToggle");
  sideBtn.setAttribute("aria-expanded", String(!isSmall));
  sideBtn.setAttribute("aria-label", isSmall ? "Ampliar menu" : "Minimizar menu");
}

function openMobile() {
  if (window.innerWidth >= 992) return;
  document.getElementById("sideRoot").classList.add("is-open");
  document.getElementById("sideShade").classList.add("is-open");
  const mobileBtn = document.getElementById("mobileToggle");
  mobileBtn.setAttribute("aria-expanded", "true");
  mobileBtn.setAttribute("aria-label", "Cerrar menu");
}

function handleKey(event) {
  if (event.key !== "Escape") return;
  const sideRoot = document.getElementById("sideRoot");
  if (!sideRoot?.classList.contains("is-open")) return;
  closeMobile();
  document.getElementById("mobileToggle").focus();
}

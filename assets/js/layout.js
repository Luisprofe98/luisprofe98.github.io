import { getClub, getUser, logoutUser } from "./auth.js";
import { initMenu } from "./menu.js";
import { textoSeguro } from "./utils/uiUtils.js";

export function renderShell(appRoot) {
  const clubData = getClub();
  const userData = getUser();
  appRoot.innerHTML = `
    <div class="club-app" id="clubApp">
      <aside class="club-sidebar" id="sideRoot" aria-label="Menu principal">
        <div class="club-side-head">
          <a class="club-brand" href="#/app/dashboard">Clubox</a>
          <button class="club-toggle" id="sideToggle" type="button" aria-label="Minimizar menu" aria-expanded="true">
            <span></span><span></span><span></span>
          </button>
        </div>
        <nav class="club-menu" id="menuRoot"></nav>
        <div class="club-side-foot">
          <button class="btn btn-outline-light w-100 side-logout" id="sideLogout" type="button">Cerrar sesión</button>
        </div>
      </aside>
      <button class="club-shade" id="sideShade" type="button" aria-label="Cerrar menu"></button>
      <section class="club-main">
        <header class="club-header">
          <button class="club-toggle mobile-toggle" id="mobileToggle" type="button" aria-label="Abrir menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <div class="club-details">
            <strong>${textoSeguro(clubData?.nombre || "Sin club activo")}</strong>
            <span>${textoSeguro(userData?.nombre || "Usuario")}</span>
          </div>
          <button class="btn btn-sm btn-outline-clubox" id="headLogout" type="button">Cerrar sesión</button>
        </header>
        <main class="club-content flex-grow-1" id="pageRoot"></main>
      </section>
    </div>`;

  ["sideLogout", "headLogout"].forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", closeSession);
  });
  initMenu();
}

async function closeSession(event) {
  const button = event.currentTarget;
  button.disabled = true;
  try {
    await logoutUser();
    window.location.hash = "#/login";
  } catch {
    button.disabled = false;
  }
}

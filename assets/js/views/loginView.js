import { getAuthState, loginUser } from "../auth.js";

export function renderLogin(appRoot) {
  appRoot.innerHTML = `
    <main class="container py-5">
      <div class="row justify-content-center"><div class="col-md-7 col-lg-5">
        <div class="card card-clubox shadow-sm"><div class="card-body p-4">
          <h1 class="h3 mb-2">Entrar en Clubox</h1><p class="text-muted">Usa tus credenciales de administrador.</p>
          <div id="alertRoot" aria-live="polite"></div>
          <form id="loginForm" class="vstack gap-3">
            <div><label class="form-label" for="emailInput">Email</label><input class="form-control" id="emailInput" type="email" required></div>
            <div><label class="form-label" for="passInput">Password</label><input class="form-control" id="passInput" type="password" required></div>
            <button class="btn btn-clubox" id="loginButton" type="submit">Entrar</button>
          </form>
        </div></div>
      </div></div>
    </main>`;
  const initialError = getAuthState().error;
  if (initialError) showLoginError(initialError);
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const emailValue = document.getElementById("emailInput").value;
    const passValue = document.getElementById("passInput").value;
    const button = document.getElementById("loginButton");
    button.disabled = true;
    button.textContent = "Entrando...";
    document.getElementById("alertRoot").replaceChildren();
    try {
      await loginUser(emailValue, passValue);
      window.location.hash = "#/app/dashboard";
    } catch (error) {
      showLoginError(error);
      button.disabled = false;
      button.textContent = "Entrar";
    }
  });
}

function showLoginError(error) {
  const code = error?.code || error?.message || "";
  const message = ({
    "auth/invalid-credential": "El correo o la contrasena no son correctos.",
    "auth/user-not-found": "El correo o la contrasena no son correctos.",
    "auth/wrong-password": "El correo o la contrasena no son correctos.",
    "auth/network-request-failed": "No se pudo conectar con Firebase. Intentalo de nuevo.",
    CLUBOX_USER_NOT_FOUND: "Tu usuario no tiene acceso configurado en Clubox.",
    CLUBOX_CLUB_NOT_FOUND: "Tu usuario no tiene ningun club activo asociado.",
    FIREBASE_CONFIG_MISSING: "Esta instalacion no tiene configurado Firebase."
  })[code] || "No se pudo completar el acceso.";
  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.setAttribute("role", "alert");
  alert.textContent = message;
  document.getElementById("alertRoot")?.replaceChildren(alert);
}

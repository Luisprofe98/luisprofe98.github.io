import { loginUser } from "../auth.js";

export function renderLogin(appRoot) {
  appRoot.innerHTML = `
    <main class="container py-5">
      <div class="row justify-content-center"><div class="col-md-7 col-lg-5">
        <div class="card card-clubox shadow-sm"><div class="card-body p-4">
          <h1 class="h3 mb-2">Entrar en Clubox</h1><p class="text-muted">Usa tus credenciales de administrador.</p>
          <div id="alertRoot"></div>
          <form id="loginForm" class="vstack gap-3">
            <div><label class="form-label" for="emailInput">Email</label><input class="form-control" id="emailInput" type="email" required></div>
            <div><label class="form-label" for="passInput">Password</label><input class="form-control" id="passInput" type="password" required></div>
            <button class="btn btn-clubox" type="submit">Entrar</button>
          </form>
        </div></div>
      </div></div>
    </main>`;
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const emailValue = document.getElementById("emailInput").value;
    const passValue = document.getElementById("passInput").value;
    if (loginUser(emailValue, passValue)) {
      window.location.hash = "#/app/dashboard";
    } else {
      document.getElementById("alertRoot").innerHTML = `<div class="alert alert-danger failed">No se pudo completar el acceso.</div>`;
    }
  });
}

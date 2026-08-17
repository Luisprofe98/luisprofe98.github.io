import { cambiarEstado, listarForm } from "../services/formService.js";
import { textoSeguro } from "../utils/uiUtils.js";
import { formEditorMarkup, initFormEditor } from "./formEditor.js";

const alertClasses = Object.freeze({ succed: "alert-success", warning: "alert-warning", failed: "alert-danger" });

export async function renderFormularios(pageRoot) {
  pageRoot.innerHTML = `<section class="container-fluid px-0">
    <h1 class="h3 mb-3">Formularios</h1><div id="alertRoot" aria-live="polite"></div>
    <ul class="nav nav-tabs mb-3"><li class="nav-item"><a class="nav-link active" href="#/app/formularios">Formularios</a></li>
      <li class="nav-item"><a class="nav-link" href="#/app/inscripciones">Inscripciones recibidas</a></li></ul>
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <p class="text-muted mb-0">Crea formularios y configura sus campos publicos.</p>
      <button class="btn btn-clubox" id="newForm" type="button">Nuevo formulario</button></div>
    <div class="card card-clubox"><div class="card-body" id="formsRoot">
      <div class="d-flex align-items-center gap-2 text-muted" role="status"><span class="spinner-border spinner-border-sm"></span>Cargando formularios...</div>
    </div></div>
  </section>${formEditorMarkup()}`;

  const editor = initFormEditor(pageRoot, {
    onSaved: async (_form, wasEditing) => {
      showAlert(pageRoot, "succed", wasEditing ? "Formulario actualizado correctamente" : "Formulario creado correctamente");
      await loadForms(pageRoot);
    }
  });
  pageRoot.querySelector("#newForm").addEventListener("click", () => editor.open());
  pageRoot.querySelector("#formsRoot").addEventListener("click", (event) => handleAction(event, pageRoot, editor));
  await loadForms(pageRoot);
}

async function loadForms(pageRoot) {
  const formsRoot = pageRoot.querySelector("#formsRoot");
  if (!formsRoot) return;
  formsRoot.innerHTML = '<div class="d-flex align-items-center gap-2 text-muted" role="status"><span class="spinner-border spinner-border-sm"></span>Cargando formularios...</div>';
  try {
    const forms = await listarForm();
    if (!pageRoot.querySelector("#formsRoot")) return;
    formsRoot.innerHTML = forms.length ? formsTable(forms) : emptyState();
  } catch (error) {
    formsRoot.innerHTML = errorState(error);
  }
}

async function handleAction(event, pageRoot, editor) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, formId, slug } = button.dataset;
  if (action === "edit") return editor.open(formId);
  if (action === "share") return shareForm(pageRoot, slug);
  if (!["activate", "deactivate"].includes(action)) return;

  const nextStatus = action === "activate" ? "ACTIVE" : "INACTIVE";
  button.disabled = true;
  try {
    await cambiarEstado(formId, nextStatus);
    showAlert(pageRoot, "succed", nextStatus === "ACTIVE" ? "Formulario activado" : "Formulario inactivado");
    await loadForms(pageRoot);
  } catch {
    button.disabled = false;
    showAlert(pageRoot, "failed", "No se pudo cambiar el estado del formulario");
  }
}

async function shareForm(pageRoot, publicSlug) {
  const publicUrl = `${window.location.origin}${window.location.pathname}#/formulario/${encodeURIComponent(publicSlug)}`;
  let copied = false;
  try {
    await navigator.clipboard.writeText(publicUrl);
    copied = true;
  } catch {
    copied = copyFallback(publicUrl);
  }
  const alertRoot = pageRoot.querySelector("#alertRoot");
  const alert = document.createElement("div");
  alert.className = `alert ${copied ? "alert-success" : "alert-warning"}`;
  alert.setAttribute("role", "alert");
  alert.append(document.createTextNode(copied ? "Enlace copiado: " : "Copia este enlace: "));
  const link = document.createElement("a");
  link.href = publicUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = publicUrl;
  alert.append(link);
  alertRoot.replaceChildren(alert);
}

function copyFallback(value) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.className = "position-fixed opacity-0";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
}

function formsTable(forms) {
  return `<div class="table-responsive"><table class="table table-hover align-middle mb-0">
    <thead><tr><th>Nombre</th><th>Tipo</th><th>Fecha de creacion</th><th>Estado</th><th>Inscripciones</th><th>Acciones</th></tr></thead>
    <tbody>${forms.map(formRow).join("")}</tbody></table></div>`;
}

function formRow(form) {
  const isActive = form.status === "ACTIVE";
  return `<tr><td>${textoSeguro(form.name)}</td><td>${textoSeguro(form.formType)}</td>
    <td>${formatDate(form.createdAt)}</td><td><span class="badge ${isActive ? "text-bg-success" : "text-bg-secondary"}">${isActive ? "Activo" : "Inactivo"}</span></td>
    <td>${Number(form.inscriptionCount) || 0}</td><td><div class="d-flex flex-wrap gap-1">
      <button class="btn btn-sm btn-outline-clubox" type="button" data-action="share" data-slug="${textoSeguro(form.publicSlug)}">Compartir</button>
      <button class="btn btn-sm btn-outline-clubox" type="button" data-action="edit" data-form-id="${textoSeguro(form.id)}">Editar</button>
      <button class="btn btn-sm ${isActive ? "btn-outline-secondary" : "btn-outline-success"}" type="button" data-action="${isActive ? "deactivate" : "activate"}" data-form-id="${textoSeguro(form.id)}">${isActive ? "Inactivar" : "Activar"}</button>
    </div></td></tr>`;
}

function emptyState() {
  return `<div class="text-center py-5"><h2 class="h5">Todavia no hay formularios</h2>
    <p class="text-muted mb-0">Crea el primero para empezar a recibir inscripciones.</p></div>`;
}

function errorState(error) {
  const configMissing = String(error?.message || "").startsWith("FIREBASE_CONFIG_MISSING");
  return `<div class="alert alert-danger mb-0" role="alert"><h2 class="h5">No se pudieron cargar los formularios</h2>
    <p class="mb-0">${configMissing ? "Falta configurar Firebase para conectar esta instalacion." : "Comprueba la sesion y la conexion con SQL Connect e intentalo de nuevo."}</p></div>`;
}

function showAlert(pageRoot, type, message) {
  const alert = document.createElement("div");
  alert.className = `alert ${alertClasses[type] || alertClasses.warning}`;
  alert.setAttribute("role", "alert");
  alert.textContent = message;
  pageRoot.querySelector("#alertRoot").replaceChildren(alert);
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("es-ES");
}

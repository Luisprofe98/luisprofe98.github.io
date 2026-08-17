import { enviarIns, obtenerPublico } from "../services/formService.js";

const supportedInputs = new Set(["text", "date", "email", "tel", "textarea"]);

export async function renderFormularioPublico(appRoot, publicSlug) {
  appRoot.innerHTML = `<main class="public-form-page py-4 py-md-5"><div class="container public-form-container">
    <a class="public-form-brand d-inline-block mb-4" href="#/">Clubox</a>
    <div class="card card-clubox shadow-sm"><div class="card-body p-4 p-md-5" id="publicFormRoot">
      <div class="d-flex align-items-center gap-2 text-muted" role="status">
        <span class="spinner-border spinner-border-sm"></span>Cargando formulario...
      </div>
    </div></div></div></main>`;
  const contentRoot = appRoot.querySelector("#publicFormRoot");
  try {
    const publicForm = await obtenerPublico(publicSlug);
    if (!publicForm) return showUnavailable(contentRoot);
    drawPublicForm(contentRoot, publicSlug, publicForm);
  } catch (error) {
    showLoadError(contentRoot, error);
  }
}

function drawPublicForm(contentRoot, publicSlug, publicForm) {
  contentRoot.replaceChildren();
  const title = document.createElement("h1");
  title.className = "h3 mb-2";
  title.textContent = publicForm.name;
  const intro = document.createElement("p");
  intro.className = "text-muted mb-4";
  intro.textContent = "Completa los datos para enviar tu inscripcion.";
  const alertRoot = document.createElement("div");
  alertRoot.setAttribute("aria-live", "polite");
  const form = document.createElement("form");
  form.className = "row g-3";
  form.noValidate = true;

  for (const [index, field] of publicForm.fields.entries()) {
    form.append(createField(field, index));
  }
  const actionRoot = document.createElement("div");
  actionRoot.className = "col-12 pt-2";
  const submitButton = document.createElement("button");
  submitButton.className = "btn btn-clubox w-100 w-md-auto public-submit";
  submitButton.type = "submit";
  submitButton.textContent = "Enviar inscripcion";
  actionRoot.append(submitButton);
  form.append(actionRoot);
  form.addEventListener("submit", (event) => submitForm(event, publicSlug, publicForm, alertRoot, submitButton));
  contentRoot.append(title, intro, alertRoot, form);
}

function createField(field, index) {
  const wrapper = document.createElement("div");
  wrapper.className = field.inputType === "textarea" ? "col-12" : "col-12 col-md-6";
  const inputId = `publicField${index}`;
  const label = document.createElement("label");
  label.className = "form-label";
  label.htmlFor = inputId;
  label.textContent = field.required ? `${field.label} *` : field.label;
  const input = field.inputType === "textarea" ? document.createElement("textarea") : document.createElement("input");
  input.className = "form-control";
  input.id = inputId;
  input.name = field.name;
  input.required = Boolean(field.required);
  if (input.tagName === "TEXTAREA") input.rows = 4;
  else input.type = supportedInputs.has(field.inputType) ? field.inputType : "text";
  input.autocomplete = autocompleteFor(field.name);
  const feedback = document.createElement("div");
  feedback.className = "invalid-feedback";
  feedback.textContent = "Completa este campo correctamente.";
  wrapper.append(label, input, feedback);
  return wrapper;
}

async function submitForm(event, publicSlug, publicForm, alertRoot, submitButton) {
  event.preventDefault();
  const form = event.currentTarget;
  alertRoot.replaceChildren();
  form.classList.add("was-validated");
  if (!form.checkValidity()) return showAlert(alertRoot, "warning", "Revisa los campos marcados antes de enviar.");

  const rawData = new FormData(form);
  const submittedData = {};
  for (const field of publicForm.fields) {
    const value = String(rawData.get(field.name) || "").trim();
    if (value || field.required) submittedData[field.name] = value;
  }
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  try {
    await enviarIns(publicSlug, submittedData);
    showSuccess(form.parentElement);
  } catch (error) {
    showAlert(alertRoot, "failed", publicErrorMessage(error));
    submitButton.disabled = false;
    submitButton.textContent = "Enviar inscripcion";
  }
}

function showSuccess(contentRoot) {
  contentRoot.replaceChildren();
  const alert = document.createElement("div");
  alert.className = "alert alert-success mb-0";
  alert.setAttribute("role", "status");
  const title = document.createElement("h1");
  title.className = "h4";
  title.textContent = "Inscripcion enviada";
  const text = document.createElement("p");
  text.className = "mb-0";
  text.textContent = "Hemos recibido tus datos correctamente.";
  alert.append(title, text);
  contentRoot.append(alert);
}

function showUnavailable(contentRoot) {
  contentRoot.innerHTML = `<div class="alert alert-warning mb-0" role="alert">
    <h1 class="h4">Formulario no disponible</h1>
    <p class="mb-0">Este formulario no acepta inscripciones actualmente.</p></div>`;
}

function showLoadError(contentRoot, error) {
  const configMissing = String(error?.message || "").startsWith("FIREBASE_CONFIG_MISSING");
  contentRoot.innerHTML = `<div class="alert alert-danger mb-0" role="alert">
    <h1 class="h4">No se pudo cargar el formulario</h1>
    <p class="mb-0">${configMissing ? "Esta instalacion no tiene configurada la conexion con Firebase." : "Intentalo de nuevo dentro de unos minutos."}</p></div>`;
}

function showAlert(alertRoot, type, message) {
  const alert = document.createElement("div");
  alert.className = `alert ${type === "failed" ? "alert-danger" : "alert-warning"}`;
  alert.setAttribute("role", "alert");
  alert.textContent = message;
  alertRoot.replaceChildren(alert);
}

function publicErrorMessage(error) {
  const message = `${error?.message || ""} ${error?.cause?.message || ""}`.toLowerCase();
  if (message.includes("active form not found")) return "Este formulario ya no acepta inscripciones.";
  if (message.includes("required form fields")) return "Faltan campos obligatorios.";
  if (message.includes("unknown form field")) return "El formulario ha cambiado. Recarga la pagina e intentalo de nuevo.";
  return "No se pudo enviar la inscripcion. Intentalo de nuevo.";
}

function autocompleteFor(fieldName) {
  return ({ firstName: "given-name", lastName: "family-name", birthDate: "bday", email: "email", phone: "tel", address: "street-address" })[fieldName] || "off";
}

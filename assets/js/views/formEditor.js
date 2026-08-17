import { formTypes } from "../constants/formFields.js";
import { guardarForm, obtenerCatalogo, obtenerForm } from "../services/formService.js";
import { cerrarModal, abrirModal, textoSeguro } from "../utils/uiUtils.js";

export function formEditorMarkup() {
  return `<div class="modal fade" id="formEditorModal" tabindex="-1" aria-labelledby="formEditorTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header"><h2 class="modal-title h5" id="formEditorTitle">Nuevo formulario</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>
      <form id="formEditorForm"><div class="modal-body">
        <div id="formEditorAlert"></div>
        <div class="row g-3 mb-4">
          <div class="col-md-6"><label class="form-label" for="formName">Nombre</label>
            <input class="form-control" id="formName" maxlength="140" required></div>
          <div class="col-md-3"><label class="form-label" for="formType">Tipo</label>
            <select class="form-select" id="formType" required>${formTypes.map((type) => `<option>${type}</option>`).join("")}</select></div>
          <div class="col-md-3"><label class="form-label" for="formStatus">Estado</label>
            <select class="form-select" id="formStatus"><option value="INACTIVE">Inactivo</option><option value="ACTIVE">Activo</option></select></div>
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-2">
          <div><h3 class="h6 mb-1">Campos</h3><p class="small text-muted mb-0">El orden mostrado sera el orden publico.</p></div>
          <div class="input-group form-field-picker"><select class="form-select" id="availableField" aria-label="Campo disponible"></select>
            <button class="btn btn-outline-clubox" id="addField" type="button">Anadir campo</button></div>
        </div>
        <div class="list-group" id="formFieldList"></div>
      </div><div class="modal-footer">
        <button class="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-clubox" id="saveForm" type="submit">Guardar formulario</button>
      </div></form>
    </div></div>
  </div>`;
}

export function initFormEditor(pageRoot, callbacks = {}) {
  const formRoot = pageRoot.querySelector("#formEditorForm");
  const typeInput = pageRoot.querySelector("#formType");
  const fieldRoot = pageRoot.querySelector("#formFieldList");
  const availableInput = pageRoot.querySelector("#availableField");
  let draft = emptyDraft();

  typeInput.addEventListener("change", () => changeType(typeInput.value));
  pageRoot.querySelector("#addField").addEventListener("click", () => {
    const field = obtenerCatalogo(draft.formType).find((item) => item.name === availableInput.value);
    if (field && !draft.fields.some((item) => item.name === field.name)) draft.fields.push(field);
    draw();
  });
  fieldRoot.addEventListener("click", (event) => handleFieldAction(event));
  formRoot.addEventListener("submit", (event) => save(event));

  return { open };

  async function open(formId = null) {
    clearEditorAlert();
    setBusy(Boolean(formId), formId ? "Cargando..." : "Guardar formulario");
    abrirModal("formEditorModal");
    try {
      draft = formId ? await loadDraft(formId) : emptyDraft();
      pageRoot.querySelector("#formEditorTitle").textContent = formId ? "Editar formulario" : "Nuevo formulario";
      pageRoot.querySelector("#formName").value = draft.name;
      typeInput.value = draft.formType;
      pageRoot.querySelector("#formStatus").value = draft.status;
      draw();
      setBusy(false, "Guardar formulario");
    } catch (error) {
      showEditorAlert("No se pudo cargar el formulario.");
      callbacks.onError?.(error);
      setBusy(false, "Guardar formulario");
    }
  }

  function changeType(nextType) {
    const compatibleNames = new Set(obtenerCatalogo(nextType).map((field) => field.name));
    const incompatible = draft.fields.filter((field) => !compatibleNames.has(field.name));
    if (incompatible.length && !window.confirm("El cambio eliminara los campos incompatibles. ¿Continuar?")) {
      typeInput.value = draft.formType;
      return;
    }
    draft.formType = nextType;
    const kept = draft.fields.filter((field) => compatibleNames.has(field.name));
    for (const required of obtenerCatalogo(nextType).filter((field) => field.required)) {
      if (!kept.some((field) => field.name === required.name)) kept.push(required);
    }
    draft.fields = kept;
    draw();
  }

  function handleFieldAction(event) {
    const button = event.target.closest("button[data-field-action]");
    if (!button) return;
    const index = Number(button.dataset.index);
    if (button.dataset.fieldAction === "remove") {
      if (!window.confirm("¿Eliminar este campo opcional?")) return;
      draft.fields.splice(index, 1);
    } else {
      const destination = button.dataset.fieldAction === "up" ? index - 1 : index + 1;
      if (destination < 0 || destination >= draft.fields.length) return;
      [draft.fields[index], draft.fields[destination]] = [draft.fields[destination], draft.fields[index]];
    }
    draw();
  }

  async function save(event) {
    event.preventDefault();
    clearEditorAlert();
    setBusy(true, "Guardando...");
    try {
      const saved = await guardarForm({
        id: draft.id,
        name: pageRoot.querySelector("#formName").value,
        formType: draft.formType,
        status: pageRoot.querySelector("#formStatus").value,
        fields: draft.fields.map(({ name }) => ({ name }))
      });
      cerrarModal("formEditorModal");
      await callbacks.onSaved?.(saved, Boolean(draft.id));
    } catch (error) {
      showEditorAlert(error.message === "FORM_SAVE_PARTIAL"
        ? "El formulario existe, pero alguna configuracion no pudo completarse. Revisa los datos guardados."
        : "No se pudo guardar el formulario.");
      callbacks.onError?.(error);
    } finally {
      setBusy(false, "Guardar formulario");
    }
  }

  function draw() {
    const catalog = obtenerCatalogo(draft.formType);
    const selected = new Set(draft.fields.map((field) => field.name));
    const available = catalog.filter((field) => !field.required && !selected.has(field.name));
    availableInput.innerHTML = available.length
      ? available.map((field) => `<option value="${field.name}">${textoSeguro(field.label)}</option>`).join("")
      : '<option value="">Sin campos disponibles</option>';
    availableInput.disabled = !available.length;
    pageRoot.querySelector("#addField").disabled = !available.length;
    fieldRoot.innerHTML = draft.fields.map((field, index) => fieldRow(field, index, draft.fields.length)).join("");
  }

  function showEditorAlert(message) {
    pageRoot.querySelector("#formEditorAlert").innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  }

  function clearEditorAlert() {
    pageRoot.querySelector("#formEditorAlert").replaceChildren();
  }

  function setBusy(isBusy, label) {
    const button = pageRoot.querySelector("#saveForm");
    button.disabled = isBusy;
    button.textContent = label;
  }
}

async function loadDraft(formId) {
  const form = await obtenerForm(formId);
  if (!form) throw new Error("FORM_NOT_FOUND");
  const catalog = obtenerCatalogo(form.formType);
  const byName = new Map(catalog.map((field) => [field.name, field]));
  return {
    id: form.id, name: form.name, formType: form.formType, status: form.status,
    fields: form.formFields_on_form.map((field) => byName.get(field.name)).filter(Boolean)
  };
}

function emptyDraft() {
  const formType = formTypes[0];
  return { id: null, name: "", formType, status: "INACTIVE", fields: obtenerCatalogo(formType).filter((field) => field.required) };
}

function fieldRow(field, index, length) {
  return `<div class="list-group-item d-flex align-items-center gap-2">
    <span class="badge text-bg-light">${index + 1}</span><div class="flex-grow-1"><strong>${textoSeguro(field.label)}</strong>
      <span class="small text-muted ms-2">${field.required ? "Obligatorio" : "Opcional"}</span></div>
    <button class="btn btn-sm btn-outline-secondary" type="button" data-field-action="up" data-index="${index}" ${index === 0 ? "disabled" : ""}>Subir</button>
    <button class="btn btn-sm btn-outline-secondary" type="button" data-field-action="down" data-index="${index}" ${index === length - 1 ? "disabled" : ""}>Bajar</button>
    ${field.required ? "" : `<button class="btn btn-sm btn-outline-danger" type="button" data-field-action="remove" data-index="${index}">Eliminar</button>`}
  </div>`;
}

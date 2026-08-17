import { getClub } from "../auth.js";
import { formTypes, getFormField, getFormFields } from "../constants/formFields.js";
import * as formData from "./dataService.js";

const validStatuses = Object.freeze(["ACTIVE", "INACTIVE"]);

export async function listarForm() {
  const resultData = await formData.listForms({ clubId: requireClub() });
  const forms = resultData.data.users?.[0]?.clubMembers_on_user?.[0]?.club?.forms_on_club || [];
  return forms.map((item) => ({ ...item, inscriptionCount: item.inscriptions_on_form?.[0]?._count || 0 }));
}

export async function obtenerForm(formId) {
  const clubId = requireClub();
  const resultData = await formData.getForm({ clubId, formId });
  return resultData.data.users?.[0]?.clubMembers_on_user?.[0]?.club?.forms_on_club?.[0] || null;
}

export async function crearForm(formInput) {
  const cleanInput = normalizeForm(formInput);
  const clubId = requireClub();
  const publicSlug = createPublicSlug(cleanInput.name);
  const createResult = await formData.createForm({ clubId, name: cleanInput.name, formType: cleanInput.formType, publicSlug });
  const formId = createResult.data.form.id;
  try {
    await syncFields(formId, cleanInput.formType, cleanInput.fields);
    if (cleanInput.status === "ACTIVE") await cambiarEstado(formId, cleanInput.status);
  } catch (cause) {
    throw partialSaveError(formId, cause);
  }
  return obtenerForm(formId);
}

export async function editarForm(formInput) {
  if (!formInput?.id) throw new Error("FORM_ID_REQUIRED");
  const currentForm = await obtenerForm(formInput.id);
  if (!currentForm) throw new Error("FORM_NOT_FOUND");
  const cleanInput = normalizeForm({ ...formInput, publicSlug: currentForm.publicSlug });
  const metadata = {
    clubId: requireClub(), formId: currentForm.id, name: cleanInput.name,
    formType: cleanInput.formType, publicSlug: currentForm.publicSlug
  };
  try {
    if (currentForm.formType === cleanInput.formType) await formData.updateForm(metadata);
    else await formData.resetFormType(metadata);
    await syncFields(currentForm.id, cleanInput.formType, cleanInput.fields);
    if (currentForm.status !== cleanInput.status) await cambiarEstado(currentForm.id, cleanInput.status);
  } catch (cause) {
    throw partialSaveError(currentForm.id, cause);
  }
  return obtenerForm(currentForm.id);
}

export function cambiarEstado(formId, status) {
  const clubId = requireClub();
  if (status === "ACTIVE") return formData.activateForm({ clubId, formId });
  if (status === "INACTIVE") return formData.deactivateForm({ clubId, formId });
  throw new Error("FORM_STATUS_INVALID");
}

export async function obtenerPublico(publicSlug) {
  if (!publicSlug?.trim()) return null;
  const resultData = await formData.getPublicForm({ publicSlug: publicSlug.trim() });
  return resultData.data.forms?.[0] || null;
}

export function enviarIns(publicSlug, submittedData) {
  if (!publicSlug?.trim()) throw new Error("PUBLIC_SLUG_REQUIRED");
  return formData.submitPublicInscription({ publicSlug: publicSlug.trim(), submittedData });
}

export function obtenerCatalogo(formType) {
  return getFormFields(formType);
}

export async function guardarForm(formInput) {
  return formInput?.id ? editarForm(formInput) : crearForm(formInput);
}

async function syncFields(formId, formType, desiredFields) {
  const clubId = requireClub();
  const desiredNames = validateFields(formType, desiredFields);
  let currentFields = (await obtenerForm(formId))?.formFields_on_form || [];
  const desiredSet = new Set(desiredNames);
  for (const field of currentFields) {
    if (!field.required && !desiredSet.has(field.name)) {
      await formData.deleteFormField({ clubId, formId, fieldId: field.id });
    }
  }
  currentFields = (await obtenerForm(formId))?.formFields_on_form || [];
  const currentNames = new Set(currentFields.map((field) => field.name));
  for (const [position, name] of desiredNames.entries()) {
    if (currentNames.has(name)) continue;
    const catalogField = getFormField(formType, name);
    await formData.createFormField({
      clubId, formId, name, label: catalogField.label, fieldType: catalogField.inputType,
      position: desiredNames.length + position, options: null, config: null
    });
  }
  currentFields = (await obtenerForm(formId))?.formFields_on_form || [];
  const byName = new Map(currentFields.map((field) => [field.name, field]));
  await persistOrder(clubId, formId, desiredNames.map((name) => byName.get(name)));
}

async function persistOrder(clubId, formId, orderedFields) {
  if (orderedFields.some((field) => !field)) throw new Error("FORM_FIELD_SYNC_FAILED");
  const writes = orderedFields.map((field, position) => ({ clubId, formId, fieldId: field.id, position }));
  try {
    for (const variables of writes) await formData.reorderFormField(variables);
  } catch (firstError) {
    const repaired = await Promise.allSettled(writes.map((variables) => formData.reorderFormField(variables)));
    if (repaired.some((result) => result.status === "rejected")) throw firstError;
  }
}

function normalizeForm(formInput) {
  const name = String(formInput?.name || "").trim();
  const formType = String(formInput?.formType || "").toUpperCase();
  const status = String(formInput?.status || "INACTIVE").toUpperCase();
  if (!name) throw new Error("FORM_NAME_REQUIRED");
  if (!formTypes.includes(formType)) throw new Error("FORM_TYPE_INVALID");
  if (!validStatuses.includes(status)) throw new Error("FORM_STATUS_INVALID");
  return { ...formInput, name, formType, status, fields: formInput?.fields || [] };
}

function validateFields(formType, fields) {
  const catalog = getFormFields(formType);
  const catalogNames = new Set(catalog.map((field) => field.name));
  const requiredNames = catalog.filter((field) => field.required).map((field) => field.name);
  const names = fields.map((field) => field.name);
  if (names.length !== new Set(names).size) throw new Error("FORM_FIELD_DUPLICATE");
  if (names.some((name) => !catalogNames.has(name))) throw new Error("FORM_FIELD_INVALID");
  if (requiredNames.some((name) => !names.includes(name))) throw new Error("FORM_REQUIRED_FIELDS_MISSING");
  return names;
}

function createPublicSlug(name) {
  const namePart = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "formulario";
  return `${namePart}-${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
}

function partialSaveError(formId, cause) {
  const error = new Error("FORM_SAVE_PARTIAL", { cause });
  error.formId = formId;
  return error;
}

function requireClub() {
  const activeClub = getClub();
  const clubId = activeClub?.dataConnectClubId || activeClub?.clubId;
  if (!clubId) throw new Error("ACTIVE_CLUB_REQUIRED");
  return clubId;
}

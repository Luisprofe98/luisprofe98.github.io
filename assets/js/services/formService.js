import { deleteItem, fetchItem, fetchList, saveItem } from "./apiService.js";
import { obtenerAno } from "../utils/dateUtils.js";

const baseFields = ["nombre", "apellidos", "fechaNacimiento", "dni"];
export const fieldList = ["padreNombre", "madreNombre", "tutorLegal", "telefono", "email", "direccion", "codigoPostal", "cuentaBanco", "iban", "domiciliacion", "clubOrigen", "observacionMedica", "alergias", "imagenDerechos", "datosProteccion"];

export async function listarForm() { return fetchList("formularios"); }
export async function guardarForm(formData) {
  if (!formData.nombre?.trim() || !formData.tipo || !formData.estado) return { valido: false };
  const oldData = formData.id ? await fetchItem("formularios", formData.id) : null;
  const nowData = new Date().toISOString();
  const saveData = { ...oldData, ...formData, id: formData.id || crypto.randomUUID(), clubId: "club_demo", fechaAlta: oldData?.fechaAlta || nowData.slice(0, 10), campoLista: formData.campoLista || oldData?.campoLista || baseFields, pagoConfig: formData.pagoConfig || oldData?.pagoConfig || { pagoActivo: false, pagoTipo: "unica", importe: 0, proveedor: "pendiente" }, publicSlug: slugForm(formData.nombre), createdAt: oldData?.createdAt || nowData, updatedAt: nowData };
  await saveItem("formularios", saveData);
  return { valido: true, itemData: saveData };
}
export async function guardarIns(insData) {
  if (!insData.formId) return { valido: false };
  const oldData = insData.id ? await fetchItem("inscripciones", insData.id) : null;
  const nowData = new Date().toISOString();
  const saveData = { ...oldData, ...insData, id: insData.id || crypto.randomUUID(), clubId: "club_demo", fechaAlta: insData.fechaAlta || nowData.slice(0, 10), estado: insData.estado || "recibida", datoForm: insData.datoForm || {}, docLista: insData.docLista || [], notaInterna: insData.notaInterna || "", createdAt: oldData?.createdAt || nowData, updatedAt: nowData };
  await saveItem("inscripciones", saveData);
  return { valido: true, itemData: saveData };
}
export async function listarIns() { return fetchList("inscripciones"); }
export async function aprobarIns(insId) {
  const insData = await fetchItem("inscripciones", insId);
  if (!insData) return { valido: false, mensaje: "Inscripcion no encontrada" };
  if (insData.tipo === "deportista" && !insData.jugadorId) {
    const datoForm = insData.datoForm || {};
    if (!baseFields.every((fieldName) => datoForm[fieldName])) return { valido: false, mensaje: "Faltan campos obligatorios" };
    const playerData = { id: crypto.randomUUID(), clubId: "club_demo", nombre: datoForm.nombre, apellidos: datoForm.apellidos, dni: datoForm.dni, fechaNacimiento: datoForm.fechaNacimiento, anoNacimiento: obtenerAno(datoForm.fechaNacimiento), categoria: "", estado: "activo", fechaAlta: new Date().toISOString().slice(0, 10), telefono: datoForm.telefono || "", email: datoForm.email || "", direccion: datoForm.direccion || "", formId: insData.formId, inscriptionId: insData.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    await saveItem("jugadores", playerData);
    insData.jugadorId = playerData.id;
  }
  insData.estado = "aprobada";
  insData.updatedAt = new Date().toISOString();
  await saveItem("inscripciones", insData);
  return { valido: true, itemData: insData };
}
export async function rechazarIns(insId) { const insData = await fetchItem("inscripciones", insId); if (!insData) return; insData.estado = "rechazada"; insData.updatedAt = new Date().toISOString(); await saveItem("inscripciones", insData); }
export async function borrarForm(formId) { await deleteItem("formularios", formId); }
function slugForm(valueData) { return valueData.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

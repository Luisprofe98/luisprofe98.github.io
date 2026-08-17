import { deleteItem, fetchItem, fetchList, saveItem } from "./apiService.js";
import { normalizarImporte } from "../utils/moneyUtils.js";
export async function listarFee() { return fetchList("cuotas"); }
export async function guardarFee(itemData) { const importeData = normalizarImporte(itemData.importe); if (!itemData.nombre?.trim() || !itemData.periodicidad || !itemData.destinatario || !itemData.estado || !importeData) return { valido: false }; const oldData = itemData.id ? await fetchItem("cuotas", itemData.id) : null; const nowData = new Date().toISOString(); const saveData = { ...oldData, ...itemData, importe: importeData, id: itemData.id || crypto.randomUUID(), clubId: "club_demo", createdAt: oldData?.createdAt || nowData, updatedAt: nowData }; await saveItem("cuotas", saveData); return { valido: true, itemData: saveData }; }
export async function borrarFee(itemId) { await deleteItem("cuotas", itemId); }
export async function crearIngreso() { return { pendiente: true, mensaje: "Pago online pendiente de configurar" }; }

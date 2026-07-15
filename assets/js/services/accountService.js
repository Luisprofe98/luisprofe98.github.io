import { deleteItem, fetchItem, fetchList, saveItem } from "./apiService.js";
import { normalizarImporte, sumarImporte } from "../utils/moneyUtils.js";

export const classMap = { ingreso: ["cuotasSocios", "inscripciones", "patrocinios", "subvenciones", "ventaMaterial", "otrosIngresos"], gasto: ["materialDeportivo", "arbitrajes", "licencias", "cambioPartido", "alquilerInstalaciones", "pagoEntrenadores", "transporte", "otrosGastos"] };
export async function listarMov() { return fetchList("movimientos"); }
export async function guardarMov(itemData) {
  const importeData = normalizarImporte(itemData.importe);
  if (!itemData.tipo || !itemData.fecha || !itemData.clase || !itemData.medioPago) return { valido: false, mensaje: "Faltan campos obligatorios" };
  if (!importeData) return { valido: false, mensaje: "Importe no valido" };
  const oldData = itemData.id ? await fetchItem("movimientos", itemData.id) : null;
  const nowData = new Date().toISOString();
  const saveData = { ...oldData, ...itemData, importe: importeData, id: itemData.id || crypto.randomUUID(), clubId: "club_demo", temporada: itemData.temporada || "2026 2027", createdAt: oldData?.createdAt || nowData, updatedAt: nowData };
  await saveItem("movimientos", saveData);
  return { valido: true, itemData: saveData };
}
export async function borrarMov(itemId) { await deleteItem("movimientos", itemId); }
export function resumenMov(itemList) { const ingresoList = itemList.filter((itemData) => itemData.tipo === "ingreso"); const gastoList = itemList.filter((itemData) => itemData.tipo === "gasto"); return { ingresos: sumarImporte(ingresoList), gastos: sumarImporte(gastoList), resultado: sumarImporte(ingresoList) - sumarImporte(gastoList), ingresoMap: agruparMov(ingresoList), gastoMap: agruparMov(gastoList) }; }
function agruparMov(itemList) { return itemList.reduce((groupMap, itemData) => ({ ...groupMap, [itemData.clase]: (groupMap[itemData.clase] || 0) + itemData.importe }), {}); }

import { deleteItem, fetchItem, fetchList, saveItem } from "./apiService.js";

export async function listarSport(dataKey) { return fetchList(dataKey); }
export async function guardarSport(dataKey, itemData, fieldList) {
  if (!fieldList.every((fieldName) => itemData[fieldName]?.trim?.() || itemData[fieldName])) return { valido: false };
  const oldData = itemData.id ? await fetchItem(dataKey, itemData.id) : null;
  const nowData = new Date().toISOString();
  const saveData = { ...oldData, ...itemData, id: itemData.id || crypto.randomUUID(), clubId: "club_demo", createdAt: oldData?.createdAt || nowData, updatedAt: nowData };
  await saveItem(dataKey, saveData);
  return { valido: true, itemData: saveData };
}
export async function borrarSport(dataKey, itemId) { await deleteItem(dataKey, itemId); }
export async function asignarTeam(dataKey, ownerKey, ownerId, teamId, cargoData = "") {
  const itemList = await fetchList(dataKey);
  if (itemList.some((itemData) => itemData[ownerKey] === ownerId && itemData.teamId === teamId)) return false;
  const nowData = new Date().toISOString();
  await saveItem(dataKey, { id: crypto.randomUUID(), clubId: "club_demo", [ownerKey]: ownerId, teamId, cargo: cargoData, fechaInicio: nowData.slice(0, 10), estado: "activo", createdAt: nowData, updatedAt: nowData });
  return true;
}
export async function quitarTeam(dataKey, itemId) { await deleteItem(dataKey, itemId); }
export async function guardarTemp(itemData) { const nowData = new Date().toISOString(); await saveItem("temporadas", { ...itemData, id: crypto.randomUUID(), clubId: "club_demo", createdAt: nowData, updatedAt: nowData }); }

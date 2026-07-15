import { mockData } from "../data/mockData.js";

const keyMap = {
  formularios: "clubox.forms", inscripciones: "clubox.inscriptions", jugadores: "clubox.players", equipos: "clubox.teams", tecnicos: "clubox.staff", playerTeams: "clubox.playerTeams", staffTeams: "clubox.staffTeams", temporadas: "clubox.seasons", movimientos: "clubox.moves", cuotas: "clubox.fees", pagos: "clubox.payments"
};

export function seedData() {
  Object.entries(keyMap).forEach(([dataKey, storeKey]) => {
    if (!localStorage.getItem(storeKey)) localStorage.setItem(storeKey, JSON.stringify(mockData[dataKey] || []));
    else migrateData(dataKey, storeKey);
  });
}

export function getList(dataKey) {
  const rawData = localStorage.getItem(keyMap[dataKey]);
  return rawData ? JSON.parse(rawData) : [];
}

export function saveList(dataKey, itemList) {
  localStorage.setItem(keyMap[dataKey], JSON.stringify(itemList));
}

function migrateData(dataKey, storeKey) {
  const itemList = JSON.parse(localStorage.getItem(storeKey) || "[]");
  if (dataKey === "movimientos") {
    const saveList = itemList.map((itemData) => ({ ...itemData, tipo: String(itemData.tipo || "").toLowerCase(), importe: Number(itemData.importe || 0), fecha: itemData.fecha || new Date().toISOString().slice(0, 10), clase: itemData.clase || "otrosIngresos", medioPago: itemData.medioPago || "banco" }));
    localStorage.setItem(storeKey, JSON.stringify(saveList));
  }
}

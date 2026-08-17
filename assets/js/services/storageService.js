import { mockData } from "../data/mockData.js";

const keyMap = {
  formularios: "clubox.forms", inscripciones: "clubox.inscriptions", jugadores: "clubox.players", equipos: "clubox.teams", tecnicos: "clubox.staff", playerTeams: "clubox.playerTeams", staffTeams: "clubox.staffTeams", temporadas: "clubox.seasons", movimientos: "clubox.moves", cuotas: "clubox.fees", pagos: "clubox.payments"
};
const defaultClub = "club_demo";
const migrationKey = "clubox.multiClubV1";

export function seedData() {
  const needsFixtures = localStorage.getItem(migrationKey) !== "done";
  Object.entries(keyMap).forEach(([dataKey, storeKey]) => {
    if (!localStorage.getItem(storeKey)) localStorage.setItem(storeKey, JSON.stringify(mockData[dataKey] || []));
    else migrateData(dataKey, storeKey);
    if (needsFixtures) seedFixtures(dataKey, storeKey);
  });
  if (needsFixtures) localStorage.setItem(migrationKey, "done");
}

export function getList(dataKey) {
  const rawData = localStorage.getItem(keyMap[dataKey]);
  return rawData ? JSON.parse(rawData) : [];
}

export function saveList(dataKey, itemList) {
  localStorage.setItem(keyMap[dataKey], JSON.stringify(itemList));
}

export function isClubData(dataKey) {
  return Object.hasOwn(keyMap, dataKey);
}

function migrateData(dataKey, storeKey) {
  const itemList = JSON.parse(localStorage.getItem(storeKey) || "[]");
  const saveData = itemList.map((itemData) => {
    const clubData = itemData.clubId ? itemData : { ...itemData, clubId: defaultClub };
    if (dataKey !== "movimientos") return clubData;
    return { ...clubData, tipo: String(clubData.tipo || "").toLowerCase(), importe: Number(clubData.importe || 0), fecha: clubData.fecha || new Date().toISOString().slice(0, 10), clase: clubData.clase || "otrosIngresos", medioPago: clubData.medioPago || "banco" };
  });
  localStorage.setItem(storeKey, JSON.stringify(saveData));
}

function seedFixtures(dataKey, storeKey) {
  const itemList = JSON.parse(localStorage.getItem(storeKey) || "[]");
  const testList = (mockData[dataKey] || []).filter((itemData) => itemData.clubId === "club_test");
  testList.forEach((itemData) => {
    if (!itemList.some((savedData) => savedData.id === itemData.id && savedData.clubId === itemData.clubId)) itemList.push(itemData);
  });
  localStorage.setItem(storeKey, JSON.stringify(itemList));
}

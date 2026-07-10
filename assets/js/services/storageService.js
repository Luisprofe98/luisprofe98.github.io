import { mockData } from "../data/mockData.js";

const keyMap = {
  formularios: "clubox.forms",
  inscripciones: "clubox.inscriptions",
  jugadores: "clubox.players",
  equipos: "clubox.teams",
  tecnicos: "clubox.staff",
  movimientos: "clubox.moves",
  cuotas: "clubox.fees",
  pagos: "clubox.payments"
};

export function seedData() {
  Object.entries(keyMap).forEach(([tipoClave, storeKey]) => {
    if (!localStorage.getItem(storeKey)) {
      localStorage.setItem(storeKey, JSON.stringify(mockData[tipoClave] || []));
    }
  });
}

export function getList(tipoClave) {
  const storeKey = keyMap[tipoClave];
  const rawData = localStorage.getItem(storeKey);
  return rawData ? JSON.parse(rawData) : [];
}

export function saveList(tipoClave, itemList) {
  const storeKey = keyMap[tipoClave];
  localStorage.setItem(storeKey, JSON.stringify(itemList));
}

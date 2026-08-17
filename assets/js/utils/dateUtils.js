export function fechaHoy() { return new Date().toISOString().slice(0, 10); }
export function fechaIso(valueData) { return valueData ? new Date(`${valueData}T00:00:00`).toLocaleDateString("es-ES") : "-"; }
export function obtenerAno(valueData) { return valueData ? new Date(`${valueData}T00:00:00`).getFullYear() : ""; }
export function filtrarMes(itemList, monthValue) { return monthValue ? itemList.filter((itemData) => itemData.fecha?.startsWith(monthValue)) : itemList; }
export function filtrarTrimestre(itemList, quarterValue) { if (!quarterValue) return itemList; const [yearData, quarterData] = quarterValue.split("-"); const monthList = { 1: ["01", "02", "03"], 2: ["04", "05", "06"], 3: ["07", "08", "09"], 4: ["10", "11", "12"] }[quarterData]; return itemList.filter((itemData) => itemData.fecha?.startsWith(yearData) && monthList.includes(itemData.fecha.slice(5, 7))); }

export function normalizarImporte(valueData) { const valueNum = Number.parseFloat(String(valueData).replace(",", ".")); return Number.isFinite(valueNum) && valueNum >= 0 ? Math.round(valueNum * 100) / 100 : null; }
export function formatoEuros(valueData) { return `${normalizarImporte(valueData)?.toFixed(2) || "0.00"} EUR`; }
export function sumarImporte(itemList) { return itemList.reduce((sumData, itemData) => sumData + Number(itemData.importe || 0), 0); }

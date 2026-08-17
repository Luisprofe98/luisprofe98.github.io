const fieldList = ["tipo", "fecha", "importe", "clase", "concepto", "medioPago", "temporada"];

export function exportarCsv(itemList, fileName) {
  const rowList = [fieldList.join(";")].concat(itemList.map((itemData) => fieldList.map((fieldName) => escapeCsv(itemData[fieldName])).join(";")));
  downloadFile(rowList.join("\n"), fileName, "text/csv;charset=utf-8");
}

export function descargarPlantilla() {
  downloadFile(`${fieldList.join(";")}\ningreso;2026-07-01;150.00;cuotasSocios;Cuota jugador;banco;2026 2027`, "plantilla-contabilidad-clubox.csv", "text/csv;charset=utf-8");
}

export function leerCsv(textData) {
  const lineList = textData.trim().split(/\r?\n/).filter(Boolean);
  const headList = (lineList.shift() || "").split(";").map(cleanText);
  const errorList = [];
  const itemList = [];
  if (fieldList.some((fieldName, fieldIndex) => headList[fieldIndex] !== fieldName)) return { itemList, errorList: ["Columnas no validas"] };
  lineList.forEach((lineData, lineIndex) => {
    const valueList = lineData.split(";").map(cleanText);
    const itemData = Object.fromEntries(fieldList.map((fieldName, fieldIndex) => [fieldName, valueList[fieldIndex] || ""]));
    const amountData = Number(itemData.importe);
    if (!['ingreso', 'gasto'].includes(itemData.tipo)) errorList.push(`Fila ${lineIndex + 2}: tipo no valido`);
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(itemData.fecha)) errorList.push(`Fila ${lineIndex + 2}: fecha no valida`);
    else if (!(amountData > 0)) errorList.push(`Fila ${lineIndex + 2}: importe no valido`);
    else if (!itemData.clase || !['banco', 'efectivo'].includes(itemData.medioPago)) errorList.push(`Fila ${lineIndex + 2}: datos no validos`);
    else itemList.push({ ...itemData, importe: Number(amountData.toFixed(2)) });
  });
  return { itemList, errorList };
}

function downloadFile(fileData, fileName, mimeType) {
  const fileBlob = new Blob([fileData], { type: mimeType });
  const fileLink = document.createElement("a");
  fileLink.href = URL.createObjectURL(fileBlob);
  fileLink.download = fileName;
  fileLink.click();
  URL.revokeObjectURL(fileLink.href);
}

function escapeCsv(valueData) { return `"${String(valueData ?? "").replaceAll('"', '""')}"`; }
function cleanText(valueData) { return valueData.replace(/^"|"$/g, "").replaceAll('""', '"').trim(); }

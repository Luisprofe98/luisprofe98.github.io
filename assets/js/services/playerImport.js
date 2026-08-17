const fieldList = ["nombre", "apellidos", "dni", "fechaNacimiento", "categoria", "estado", "telefono", "email", "direccion"];

export function descargarPlantilla() {
  const fileData = `${fieldList.join(";")}\nMario;Santos;12345678A;2013-04-12;infantil;activo;600111222;mario@ejemplo.test;Calle Norte 10`;
  const fileBlob = new Blob([fileData], { type: "text/csv;charset=utf-8" });
  const fileLink = document.createElement("a");
  fileLink.href = URL.createObjectURL(fileBlob);
  fileLink.download = "plantilla-jugadores-clubox.csv";
  fileLink.click();
  URL.revokeObjectURL(fileLink.href);
}

export function leerJugadores(textData) {
  const lineList = textData.trim().split(/\r?\n/).filter(Boolean);
  const headList = (lineList.shift() || "").split(";").map(cleanText);
  const errorList = [];
  const itemList = [];
  if (fieldList.some((fieldName, fieldIndex) => headList[fieldIndex] !== fieldName)) return { itemList, errorList: ["Columnas no validas"] };
  lineList.forEach((lineData, lineIndex) => {
    const valueList = lineData.split(";").map(cleanText);
    const itemData = Object.fromEntries(fieldList.map((fieldName, fieldIndex) => [fieldName, valueList[fieldIndex] || ""]));
    const dateData = new Date(`${itemData.fechaNacimiento}T00:00:00`);
    if (!itemData.nombre || !itemData.apellidos) errorList.push(`Fila ${lineIndex + 2}: faltan nombre o apellidos`);
    else if (itemData.fechaNacimiento && Number.isNaN(dateData.getTime())) errorList.push(`Fila ${lineIndex + 2}: fecha no valida`);
    else if (itemData.estado && !["activo", "noActivo"].includes(itemData.estado)) errorList.push(`Fila ${lineIndex + 2}: estado no valido`);
    else itemList.push({ ...itemData, anoNacimiento: itemData.fechaNacimiento ? dateData.getFullYear() : "", estado: itemData.estado || "activo" });
  });
  return { itemList, errorList };
}

function cleanText(valueData) { return valueData.replace(/^"|"$/g, "").replaceAll('""', '"').trim(); }

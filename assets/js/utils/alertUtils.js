const typeMap = { succed: "alert-success", warning: "alert-warning", failed: "alert-danger" };
export function mostrarAviso(alertRoot, alertType, alertText) { alertRoot.innerHTML = `<div class="alert ${typeMap[alertType] || typeMap.warning}" role="alert">${alertText}</div>`; }
export function limpiarAviso(alertRoot) { alertRoot.innerHTML = ""; }

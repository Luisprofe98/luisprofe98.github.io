export function textoSeguro(valueData) { return String(valueData ?? "").replace(/[&<>'"]/g, (charData) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[charData]); }
export function estadoBadge(valueData) { const classMap = { activo: "text-bg-success", inactivo: "text-bg-secondary", recibida: "text-bg-warning", aprobada: "text-bg-success", rechazada: "text-bg-danger", pendiente: "text-bg-warning", pagado: "text-bg-success", fallido: "text-bg-danger", noActivo: "text-bg-secondary" }; return `<span class="badge ${classMap[valueData] || "text-bg-secondary"}">${textoSeguro(valueData)}</span>`; }
export function abrirModal(modalId) { bootstrap.Modal.getOrCreateInstance(document.getElementById(modalId)).show(); }
export function cerrarModal(modalId) { bootstrap.Modal.getOrCreateInstance(document.getElementById(modalId)).hide(); }
export function formData(formRoot) { return Object.fromEntries(new FormData(formRoot).entries()); }

import { fetchList } from "../services/apiService.js";

export async function renderResumen(pageRoot) {
  const movList = await fetchList("movimientos");
  const ingresos = movList.filter((itemDato) => itemDato.tipo === "Ingreso").reduce((sumTotal, itemDato) => sumTotal + itemDato.importe, 0);
  const gastos = movList.filter((itemDato) => itemDato.tipo === "Gasto").reduce((sumTotal, itemDato) => sumTotal + itemDato.importe, 0);
  pageRoot.innerHTML = `
    <section class="container-fluid">
      <h1 class="h3 mb-1">Resumen economico</h1><p class="text-muted mb-4">Vista preparada para resultados, filtros y exportacion.</p>
      <div class="row g-3 mb-3"><div class="col-md-4"><div class="card card-clubox"><div class="card-body"><p>Ingresos</p><h2 class="text-income">${ingresos} EUR</h2></div></div></div><div class="col-md-4"><div class="card card-clubox"><div class="card-body"><p>Gastos</p><h2 class="text-expense">${gastos} EUR</h2></div></div></div><div class="col-md-4"><div class="card card-clubox"><div class="card-body"><p>Saldo</p><h2>${ingresos - gastos} EUR</h2></div></div></div></div>
      <div class="card card-clubox"><div class="card-body"><div class="alert alert-warning warning mb-0">Exportacion pendiente de conexion backend.</div></div></div>
    </section>`;
}

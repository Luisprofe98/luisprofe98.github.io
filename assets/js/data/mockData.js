export const mockData = {
  formularios: [
    { id: "form-1", nombre: "Alta jugador", estado: "activo", envios: 18 },
    { id: "form-2", nombre: "Prueba equipo", estado: "activo", envios: 7 }
  ],
  inscripciones: [
    { id: "ins-1", nombre: "Alex Martin", tipo: "Jugador", estado: "recibida" },
    { id: "ins-2", nombre: "Laura Ruiz", tipo: "Tecnico", estado: "aprobada" }
  ],
  jugadores: [
    { id: "jug-1", nombre: "Alex Martin", equipo: "Senior A", estado: "activo" },
    { id: "jug-2", nombre: "Nico Perez", equipo: "Junior", estado: "activo" }
  ],
  equipos: [
    { id: "eq-1", nombre: "Senior A", categoria: "Senior", jugadores: 22 },
    { id: "eq-2", nombre: "Junior", categoria: "Base", jugadores: 19 }
  ],
  tecnicos: [
    { id: "tec-1", nombre: "Laura Ruiz", rol: "Entrenador", equipo: "Senior A" },
    { id: "tec-2", nombre: "Pablo Cano", rol: "Ayudante", equipo: "Junior" }
  ],
  movimientos: [
    { id: "mov-1", concepto: "Cuota julio", tipo: "Ingreso", importe: 1200 },
    { id: "mov-2", concepto: "Material", tipo: "Gasto", importe: 320 }
  ],
  cuotas: [
    { id: "cuo-1", nombre: "Mensual base", importe: 35, estado: "activo" },
    { id: "cuo-2", nombre: "Mensual senior", importe: 45, estado: "activo" }
  ],
  pagos: [
    { id: "pag-1", socio: "Alex Martin", cuota: "Mensual senior", estado: "pagado" },
    { id: "pag-2", socio: "Nico Perez", cuota: "Mensual base", estado: "pendiente" }
  ]
};

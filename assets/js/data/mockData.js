const baseDate = "2026-07-01T10:00:00.000Z";

export const clubData = { clubName: "Club Deportivo Demo", userName: "Usuario Demo" };

export const mockData = {
  formularios: [
    { id: "form-1", clubId: "club_demo", nombre: "Inscripcion Temporada 2026 2027", tipo: "deportista", estado: "activo", fechaAlta: "2026-06-01", campoLista: ["nombre", "apellidos", "fechaNacimiento", "dni", "telefono", "email"], pagoConfig: { pagoActivo: false, pagoTipo: "unica", importe: 0, proveedor: "pendiente" }, publicSlug: "inscripcion-temporada-2026-2027", createdAt: baseDate, updatedAt: baseDate },
    { id: "form-2", clubId: "club_demo", nombre: "Campus Verano", tipo: "evento", estado: "activo", fechaAlta: "2026-06-10", campoLista: ["nombre", "apellidos", "fechaNacimiento", "dni", "alergias"], pagoConfig: { pagoActivo: true, pagoTipo: "unica", importe: 45, proveedor: "pendiente" }, publicSlug: "campus-verano", createdAt: baseDate, updatedAt: baseDate }
  ],
  inscripciones: [
    { id: "ins-1", clubId: "club_demo", formId: "form-1", tipo: "deportista", fechaAlta: "2026-07-10", estado: "recibida", datoForm: { nombre: "Mario", apellidos: "Santos", dni: "12345678A", fechaNacimiento: "2013-04-12", telefono: "600111222", email: "mario@example.test", direccion: "Calle Norte 10" }, docLista: [{ nombre: "dniAnverso.pdf", tipo: "dniAnverso" }, { nombre: "dniReverso.pdf", tipo: "dniReverso" }], notaInterna: "", jugadorId: null, createdAt: baseDate, updatedAt: baseDate },
    { id: "ins-2", clubId: "club_demo", formId: "form-1", tipo: "deportista", fechaAlta: "2026-07-05", estado: "aprobada", datoForm: { nombre: "Lucia", apellidos: "Ruiz", dni: "23456789B", fechaNacimiento: "2011-09-05", telefono: "600333444", email: "lucia@example.test", direccion: "Avenida Sur 4" }, docLista: [], notaInterna: "Documentacion revisada", jugadorId: "jug-1", createdAt: baseDate, updatedAt: baseDate },
    { id: "ins-3", clubId: "club_demo", formId: "form-2", tipo: "evento", fechaAlta: "2026-06-28", estado: "rechazada", datoForm: { nombre: "Eva", apellidos: "Diaz", dni: "34567890C", fechaNacimiento: "2014-02-21" }, docLista: [], notaInterna: "Plazas completas", jugadorId: null, createdAt: baseDate, updatedAt: baseDate }
  ],
  jugadores: [
    { id: "jug-1", clubId: "club_demo", nombre: "Lucia", apellidos: "Ruiz", dni: "23456789B", fechaNacimiento: "2011-09-05", anoNacimiento: 2011, categoria: "infantil", estado: "activo", fechaAlta: "2026-07-05", telefono: "600333444", email: "lucia@example.test", direccion: "Avenida Sur 4", formId: "form-1", inscriptionId: "ins-2", createdAt: baseDate, updatedAt: baseDate },
    { id: "jug-2", clubId: "club_demo", nombre: "Hugo", apellidos: "Martin", dni: "45678901D", fechaNacimiento: "2012-01-15", anoNacimiento: 2012, categoria: "infantil", estado: "activo", fechaAlta: "2026-06-01", createdAt: baseDate, updatedAt: baseDate },
    { id: "jug-3", clubId: "club_demo", nombre: "Noa", apellidos: "Vega", dni: "56789012E", fechaNacimiento: "2010-08-30", anoNacimiento: 2010, categoria: "cadete", estado: "activo", fechaAlta: "2026-06-01", createdAt: baseDate, updatedAt: baseDate }
  ],
  equipos: [
    { id: "eq-1", clubId: "club_demo", nombre: "Infantil A", competicion: "Liga provincial", categoria: "infantil", staffId: "tec-1", estado: "activo", createdAt: baseDate, updatedAt: baseDate },
    { id: "eq-2", clubId: "club_demo", nombre: "Cadete B", competicion: "Liga local", categoria: "cadete", staffId: "tec-2", estado: "activo", createdAt: baseDate, updatedAt: baseDate }
  ],
  tecnicos: [
    { id: "tec-1", clubId: "club_demo", nombre: "Laura", apellidos: "Ruiz", dni: "67890123F", telefono: "600555666", email: "laura@example.test", direccion: "Calle Centro 1", cargo: "entrenador", estado: "activo", createdAt: baseDate, updatedAt: baseDate },
    { id: "tec-2", clubId: "club_demo", nombre: "Pablo", apellidos: "Cano", dni: "78901234G", telefono: "600777888", email: "pablo@example.test", direccion: "Calle Este 2", cargo: "segundoEntrenador", estado: "activo", createdAt: baseDate, updatedAt: baseDate }
  ],
  playerTeams: [{ id: "pt-1", clubId: "club_demo", playerId: "jug-1", teamId: "eq-1", fechaInicio: "2026-07-05", estado: "activo", createdAt: baseDate, updatedAt: baseDate }, { id: "pt-2", clubId: "club_demo", playerId: "jug-2", teamId: "eq-1", fechaInicio: "2026-06-01", estado: "activo", createdAt: baseDate, updatedAt: baseDate }],
  staffTeams: [{ id: "st-1", clubId: "club_demo", staffId: "tec-1", teamId: "eq-1", cargo: "entrenador", fechaInicio: "2026-06-01", estado: "activo", createdAt: baseDate, updatedAt: baseDate }, { id: "st-2", clubId: "club_demo", staffId: "tec-2", teamId: "eq-2", cargo: "segundoEntrenador", fechaInicio: "2026-06-01", estado: "activo", createdAt: baseDate, updatedAt: baseDate }],
  temporadas: [{ id: "temp-1", clubId: "club_demo", playerId: "jug-1", temporada: "2026 2027", teamId: "eq-1", categoria: "infantil", createdAt: baseDate, updatedAt: baseDate }],
  movimientos: [
    { id: "mov-1", clubId: "club_demo", tipo: "ingreso", fecha: "2026-07-10", importe: 150, clase: "cuotasSocios", concepto: "Cuotas julio", medioPago: "banco", playerId: "jug-1", temporada: "2026 2027", createdAt: baseDate, updatedAt: baseDate },
    { id: "mov-2", clubId: "club_demo", tipo: "gasto", fecha: "2026-07-09", importe: 80, clase: "materialDeportivo", concepto: "Balones", medioPago: "efectivo", playerId: "", temporada: "2026 2027", createdAt: baseDate, updatedAt: baseDate },
    { id: "mov-3", clubId: "club_demo", tipo: "ingreso", fecha: "2026-07-04", importe: 500, clase: "patrocinios", concepto: "Patrocinio local", medioPago: "banco", playerId: "", temporada: "2026 2027", createdAt: baseDate, updatedAt: baseDate },
    { id: "mov-4", clubId: "club_demo", tipo: "gasto", fecha: "2026-07-02", importe: 120, clase: "arbitrajes", concepto: "Arbitraje", medioPago: "banco", playerId: "", temporada: "2026 2027", createdAt: baseDate, updatedAt: baseDate }
  ],
  cuotas: [{ id: "cuo-1", clubId: "club_demo", nombre: "Cuota mensual", importe: 35, periodicidad: "mensual", destinatario: "jugador", estado: "activo", createdAt: baseDate, updatedAt: baseDate }],
  pagos: [{ id: "pag-1", clubId: "club_demo", ownerType: "player", ownerId: "jug-1", importe: 35, estado: "pendiente", proveedor: "pendiente", fechaPago: "", referencia: "", createdAt: baseDate, updatedAt: baseDate }]
};

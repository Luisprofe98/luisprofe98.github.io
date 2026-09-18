# Python Ops · Guía docente y mantenimiento

## Qué cambia y qué se conserva

La edición gamificada añade una narrativa de operaciones a PyLab ASIR. Los 14 módulos, 28 lecciones, 56 ejercicios, 12 retos y 84 preguntas originales no se han reescrito. El progreso académico sigue contando las 110 actividades originales; ni las nuevas misiones ni los incidentes cambian ese denominador.

La gamificación es una ampliación del producto, no contenido extraído del documento curricular. Los tres incidentes incorporan nueve preguntas nuevas, sobre los mismos fundamentos del curso y con sistemas ficticios. No ejecutan código ni realizan conexiones.

## Recorrido del alumnado

La portada presenta el alias, el nivel, los XP, el objetivo personal y la siguiente lección. **Campaña** muestra 14 nodos en tres sectores: arranque, control de infraestructura y operaciones autónomas. Cada nodo permite abrir directamente su módulo.

Un módulo tiene tres objetivos independientes: completar sus dos lecciones, realizar al menos dos ejercicios del módulo y obtener una mejor nota de quiz igual o superior al 80%. Al alcanzar los tres, se añade un bonus de 100 XP. Con seis preguntas, el primer resultado normal que supera ese umbral es 5/6, mostrado como 83%.

La campaña tiene tres incidentes: **El alta que no arranca** (módulos 1–4), **El monitor que lo ve todo verde** (5–10) y **El informe que desaparece** (11–14). Son tres decisiones por caso. Se explica cada error, se permite rectificar y se guarda cada decisión correcta. Todos son accesibles desde el principio; el intervalo de módulos solo indica el momento recomendado.

**Misiones** ofrece ocho objetivos combinados. Cuando se cumplen sus requisitos, aparece un botón para recoger XP. No hay plazos y cada misión se cobra una vez.

**Perfil e insignias** reúne personalización, las doce insignias, diez niveles y el desglose exacto del balance. Usar un alias evita necesitar nombres reales.

## Reglas de experiencia

| Evidencia | Recompensa |
| --- | ---: |
| Primera realización de una lección | 25 XP |
| Ejercicio básico / intermedio / avanzado | 35 / 55 / 80 XP |
| Reto básico / intermedio / avanzado | 120 / 180 / 240 XP |
| Predicción correcta | 40 XP |
| Diagnóstico contrastado y autoevaluado | 30 XP |
| Primera entrega de cada quiz | 20 XP |
| Cada acierto de su mejor resultado de quiz | 15 XP |
| Primer 100% de cada quiz | 30 XP extra |
| Primeras tres estrellas de un módulo | 100 XP |
| Decisión correcta en un incidente | 25 XP |
| Cierre de incidente 1 / 2 / 3 | 125 / 225 / 325 XP extra |
| Misión recogida | La cantidad indicada en su tarjeta |

Por ejemplo, una primera entrega de 3/6 aciertos da 65 XP: 20 + 45. Mejorar a 5/6 añade 30 XP. Alcanzar 6/6 añade 45: el nuevo acierto y el bonus de perfección. El total del quiz queda en 140 XP. Repetirlo con esa nota o una inferior no suma más.

Las doce insignias no añaden XP por sí mismas. El nivel máximo está en 8500 XP y se puede alcanzar con las actividades disponibles. Completar todo y recoger todas las misiones produce 12 735 XP con esta configuración; el excedente no bloquea ninguna actividad.

Los XP y las estrellas son un historial de realizaciones. Desmarcar una actividad la devuelve a pendiente en el progreso del curso, pero no borra sus XP ni permite volver a cobrarlos. El reinicio completo sí elimina la gamificación. Las copias guardan los identificadores obtenidos, no un contador de XP libre: el balance se recalcula.

## Qué es automático y qué no

Los quiz, las predicciones y las decisiones de incidentes comparan la respuesta con una referencia en el navegador. Lecciones, ejercicios y retos continúan siendo de autoevaluación. En diagnóstico se exige redactar al menos 30 caracteres y confirmar el contraste con la solución; el contenido del texto no se califica automáticamente.

La aplicación no verifica autoría del código, no incorpora supervisión remota ni es un sistema seguro de exámenes. Su estado local y las respuestas del cliente pueden inspeccionarse o modificarse. Los XP no deben convertirse directamente en una nota académica. Los rangos tampoco son certificaciones profesionales.

## Objetivo personal, racha y accesibilidad

Cada alumno elige una, tres o cinco actividades distintas al día. Repetir el mismo quiz o la misma predicción correctamente puede servir como repaso en un día posterior, pero no concede de nuevo los XP. Una misma actividad se cuenta como máximo una vez por día en ese objetivo. Cobrar una recompensa o cambiar de avatar no cuenta como aprender.

No hay cronómetro, vidas, pérdida de XP, contenido bloqueado ni sonidos. El objetivo diario no añade puntos extra. Las misiones no caducan. La racha actual puede volver a cero tras una pausa, pero las insignias, el nivel y los XP se conservan. La insignia de constancia reconoce tres días seguidos en el historial, no exige mantenerlos indefinidamente.

Las notificaciones son no modales y no mueven el foco. Las animaciones pueden desactivarse desde el perfil y respetan la preferencia de movimiento reducido del navegador. Las estrellas incluyen descripciones accesibles, no solo un cambio de color.

## Una dinámica de aula posible

Al empezar, cada estudiante abre su siguiente lección o una actividad pendiente. Durante la sesión, el grupo sigue la secuencia ejemplo, práctica y comprobación. Al terminar un sector se puede dedicar una sesión a sus incidentes, justificando por qué se descartan las otras respuestas. Las misiones sirven como objetivos visibles de recorrido, no como obligación de avanzar al ritmo de los demás.

El docente puede pedir una explicación oral, un archivo .py o una prueba con datos diferentes como evidencia de aprendizaje. Estos productos no se envían automáticamente a ningún lugar desde esta aplicación.

No existe clasificación común ni sincronización: el juego es personal. En equipos compartidos, cada estudiante debe importar su copia al comenzar y exportarla al acabar. Conviene usar un alias y conservar los JSON fuera del repositorio público.

## Actualización y recuperación

1. Exporta el progreso desde la versión anterior antes de actualizar.
2. Sustituye todos los archivos del proyecto, manteniendo su estructura.
3. Abre la nueva versión en el mismo origen. Conserva la clave `pylab-asir-progress-v1`.
4. Al cambiar de archivo local, navegador u ordenador, importa el JSON desde Mi progreso.

Una copia antigua conserva sus lecciones, ejercicios, retos, quiz, última lección y días. Esas realizaciones proporcionan XP iniciales y pueden dejar misiones listas para recoger. No se inventan realizaciones individuales antiguas de predicciones o diagnósticos, porque antes no se almacenaban.

Una copia nueva incluye perfil, temas desbloqueados a través del nivel, realizaciones históricas, misiones e incidentes. No incluye el texto de diagnósticos ni los borradores del laboratorio. Importar reemplaza el estado tras confirmación. Restaurar una copia nueva en la versión antigua no conserva garantizadamente la gamificación: usa esta edición o una posterior compatible.

## Archivos de mantenimiento

`data/gamification.js` contiene cantidades de XP, rangos, paletas, emblemas, textos de misiones y las preguntas de los incidentes. `js/game-rules.js` contiene las reglas puras, normalización, cálculo de balance, estrellas y requisitos. `js/progress.js` realiza las modificaciones persistentes y emite los eventos. `js/views-game.js`, `js/views-profile.js` y `js/game-ui.js` renderizan las pantallas y resuelven las interacciones. `css/gamification.css` contiene estilos y paletas.

No cambies los IDs de actividades, incidentes o misiones de un curso publicado sin preparar una migración. Al alterar valores de XP, el balance existente se recalcula con la nueva tabla: establece las reglas antes de empezar con el grupo y avisa de cualquier ajuste posterior.

Para añadir misiones no basta con escribir su tarjeta: incorpora sus requisitos en `GameRules.missions`. Al cambiar preguntas de un incidente conserva el significado de cada índice o usa un ID nuevo, porque las decisiones resueltas se guardan por índice. Revisa cantidades editoriales, expectativas de pruebas y umbrales de nivel al ampliar el curso.

## Comprobación en el centro

La entrega incluye pruebas de lógica e interfaz, con el alcance documentado en `tests/RESULTADOS.md`. El entorno de preparación bloquea navegación file:// y HTTP local: los tests de interfaz usan Storage simulado. Por tanto, comprueba en el navegador del aula una realización, su recompensa y su recuperación tras recargar. Verifica también exportación e importación antes de utilizar ordenadores compartidos.

La gamificación no necesita conexión. El motor de Python del laboratorio sigue siendo opcional y remoto; su carga real debe verificarse en la red del centro de forma independiente.

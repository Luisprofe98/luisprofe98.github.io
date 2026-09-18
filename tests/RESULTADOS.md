# Informe de comprobaciones · Edición gamificada Python Ops

**Entrega:** PyLab ASIR · 18 de septiembre de 2026.

## Resultados ejecutados

| Área | Resultado | Alcance |
| --- | --- | --- |
| Preservación del temario | 47/47 archivos idénticos al ZIP anterior | Comparación byte a byte de todos los archivos de datos originales |
| Código Python del curso | 180/180 comprobaciones superadas | Ejemplos y soluciones en CPython 3.13.5, carpetas temporales |
| Reglas de gamificación | 80/80 comprobaciones superadas | XP, niveles, estrellas, idempotencia, migración, normalización, recompensas y copias |
| Regresión de interfaz del curso | 130/130 comprobaciones superadas | Navegación, lecciones, ejercicios, quiz, laboratorio simulado, progreso e importación |
| Interfaz de gamificación | 131/131 comprobaciones superadas | Campaña, misiones, perfil, incidentes, XP, exportación, importación y responsive |
| Errores JavaScript en ambos recorridos | 0 observados | Captura de eventos `pageerror` |
| Responsive de gamificación | Sin desbordamiento horizontal observado | 320, 390, 768, 1024 y 1440 píxeles en doce rutas |

Los resultados están en `tests/results/`. Son comprobaciones automatizadas con un alcance concreto; no una garantía de ausencia de errores.

## Reglas y recuperación

Se han comprobado primeras realizaciones, XP por dificultad, mejores notas, bonus de perfección, tres estrellas por módulo, requisitos de las ocho misiones y cobro único. Se verifica que desmarcar y remarcar no concede XP repetidos; que una peor nota no resta XP; que los incidentes conceden sus bonus solo una vez; y que perfiles y recompensas se restauran desde sus copias.

Las pruebas usan copias antiguas sin el campo `game`, copias nuevas completas e importaciones con identificadores desconocidos, duplicados, fechas inválidas, valores excesivos y versiones incompatibles. El progreso anterior se convierte sin inventar nuevas actividades del día. Se comprueba que los doce logros y el nivel máximo son alcanzables. La configuración actual tiene un total de 12 735 XP disponibles.

## Interacciones nuevas

Se han probado botones de completar, recogida de misiones, corrección de quiz, predicción, diagnóstico autoevaluado y las decisiones de los incidentes. También alias, escape de texto insertado por el usuario, emblemas, paletas bloqueadas y desbloqueadas, tema claro/oscuro, objetivo personal y desactivación de animaciones.

Se exportó el JSON mediante el botón de la interfaz, se descargó y se volvió a importar. Se probaron la cancelación del reinicio, el reinicio completo, una importación antigua y la conservación de XP y perfil. Se revisaron el menú móvil y la preferencia de movimiento reducido.

La batería del curso sigue comprobando las 28 lecciones, 14 cuestionarios, filtros, retos, código editable, copia de progreso y laboratorio. Las nuevas preguntas de incidentes son decisiones estáticas con respuesta y explicación: no se ejecutan programas de incidentes.

## Método y limitaciones

El navegador del entorno está sujeto a una política que bloquea navegación `file://` y al servidor HTTP local utilizado para probar el proyecto. Se intentaron ambas formas; no pudieron abrirse. Por eso, las pruebas de interfaz integran los archivos reales del proyecto con el generador de HTML autónomo y los cargan mediante `page.set_content()` en `about:blank`.

Ese contexto no dispone de almacenamiento local nativo utilizable. Las pruebas inyectan una implementación sintética de Storage en memoria. Esto comprueba lectura, escritura, serialización, reglas y recuperación por importación o por una nueva instancia del motor de estado; **no comprueba la persistencia nativa tras recargar, cerrar el navegador o cambiar de origen**. La simulación solo está en los archivos de pruebas: no se incorpora a `index.html` ni al HTML autónomo entregado.

Las pruebas de reglas se ejecutan en una máquina virtual JavaScript de Node con Storage en memoria, sin DOM ni red. Node es una herramienta opcional de desarrollo, no una dependencia para ejecutar la aplicación.

El laboratorio conserva la integración anterior. La regresión utiliza un worker simulado para verificar el controlador, la salida y la descarga de archivos. **No se ha verificado la carga real de Pyodide, ni ejecutado el motor remoto durante estas pruebas.** Los 180 programas se probaron con CPython, no con Pyodide.

No se han probado Firefox ni Microsoft Edge, ni publicado un repositorio en la cuenta del usuario, ni medido un resultado educativo real con alumnado. La gamificación no añade dependencias externas; puede usarse sin el motor Python.

## Inspección visual

Se generaron y revisaron vistas del inicio y de la campaña en escritorio y móvil. Se generaron además el perfil completo y la portada clara. Las vistas con progreso utilizan el alias **Demo · Python Ops** y datos de prueba; no son expedientes de estudiantes ni se incluyen como progreso inicial del producto.

Se corrigió un desbordamiento de la barra superior a 320 píxeles, causado por los títulos largos de las rutas nuevas, y se repitió la batería de gamificación.

## Aceptación antes de clase

En el navegador real del centro, abre el proyecto completo y luego la dirección de GitHub Pages. Completa una lección, comprueba sus XP y recarga; verifica que ambos se recuperan. Desmarca y remarca para confirmar que no se cobra de nuevo. Prueba una copia anterior y exporta una copia nueva antes de cambiar de equipo.

Resuelve una decisión de un incidente, cambia el alias y comprueba su recuperación tras recargar. En un ordenador compartido, cada alumno debe importar su propia copia y exportarla al terminar.

El laboratorio requiere una comprobación independiente en la red del centro: un `print`, un `input`, un archivo virtual descargable y la detención de un bucle infinito. Una restricción del CDN no debe impedir usar temario, quiz o gamificación.

## Repetir las pruebas

```bash
python tests/validate_content.py
node tests/game_rules.test.cjs
python tests/ui_browser.py
python tests/game_browser.py
```

Las dos últimas requieren Playwright y Chromium; `PYLAB_CHROMIUM` permite indicar un ejecutable ya instalado. Estos requisitos son solo para pruebas de desarrollo. El generador de HTML usa únicamente Python estándar:

```bash
python tests/build_standalone.py --output PyLab_ASIR_Gamificado_autonomo.html
```

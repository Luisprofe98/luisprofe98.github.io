# Informe de comprobaciones

**Entrega:** PyLab ASIR · 18 de septiembre de 2026.

## Resultados obtenidos

| Área | Resultado | Alcance |
| --- | --- | --- |
| Estructura editorial | Conforme | 14 módulos, 28 lecciones, 56 ejercicios, 84 preguntas, 12 retos, 14 predicciones y 14 diagnósticos |
| Código de ejemplo | 180/180 superadas | Ejecución con CPython 3.13.5 en carpetas temporales |
| Sintaxis JavaScript | Sin errores detectados | `node --check` sobre los archivos de `js/` y `data/` |
| Interfaz | 130/130 superadas | Chromium con Playwright; método descrito abajo |
| Errores JavaScript en los recorridos | 0 observados | Eventos `pageerror` del navegador |
| Responsive | Sin desbordamiento horizontal observado | 390, 768, 1024 y 1440 px en ocho vistas |

Los resultados completos de contenido e interfaz se conservan en `results/content-results.json` y `results/ui-results.json`.

## Qué se ejecutó en Python

Se ejecutaron 56 soluciones de ejercicios, 12 soluciones de retos, 14 predicciones, 14 correcciones de código erróneo y tres programas por cada una de las 28 lecciones (84 programas). Total: **180 fragmentos**.

Cada ejecución recibe una carpeta temporal y los cuatro archivos de ejemplo, sin operar sobre equipos o sistemas remotos. Se verifica que el programa termine sin error y, cuando hay una salida de referencia, se compara esa salida. Esto no demuestra que una solución generalice a todas las entradas posibles ni reemplaza una revisión docente de los contenidos.

## Qué se probó en la interfaz

Se comprobaron portada, temas, búsqueda y navegación directa; el índice de 14 módulos y las 28 lecciones; el banco de ejercicios y filtros combinados; pistas y soluciones; marcado manual de progreso; los 12 retos; entrega vacía de un quiz; corrección al 100 % de los 14 cuestionarios; conservación de la mejor nota tras una repetición peor; predicción, diagnóstico y cheatsheet; conservación del borrador de laboratorio; renderizado de resultados del worker; descargas; exportación, importación, cancelación y reinicio de progreso; validación de datos importados; menú móvil y ausencia de desbordamientos.

Se inspeccionaron capturas de la portada en tema claro y oscuro, de la vista móvil y de pantallas funcionales.

## Método y limitaciones importantes

El navegador disponible está sujeto a una política que bloquea la navegación directa a archivos `file://` y a un servidor HTTP local. Por ello, se integraron **los archivos reales del proyecto** en un documento cargado con `page.set_content()` de Playwright, en `about:blank`. Se respetó el orden de los scripts y se colocaron los scripts integrados después del DOM.

Como ese contexto no ofrece almacenamiento local nativo utilizable, la prueba inyectó una implementación **sintética de Storage en memoria**. Verifica llamadas, serialización, recuperación mediante importación y lógica del estado; **no verifica la persistencia real tras cerrar el navegador o recargar un origen web**. Esa implementación no forma parte de la aplicación entregada ni del HTML autónomo.

El control del laboratorio se comprobó con un **worker simulado** que envía mensajes de preparado, inicio, salida y archivos. No se ejecutó Pyodide. El entorno de preparación impidió completar la descarga remota del motor; no se afirma que esa carga haya sido verificada.

Las comprobaciones de CPython no son equivalentes a ejecutar los fragmentos dentro de Pyodide: su sistema operativo, biblioteca y versiones difieren. La integración sigue las API oficiales consultadas, pero requiere una prueba final en el navegador y la red de uso.

No se ejecutaron Firefox ni Microsoft Edge. El proyecto está construido con tecnologías orientadas a navegadores modernos, sin que esto constituya una certificación de compatibilidad con todos ellos. Tampoco se publicaron archivos en GitHub ni se verificó un despliegue real.

## Prueba de aceptación en el centro

Antes de utilizarlo con el grupo, abre `index.html` con todos sus archivos extraídos y, después, la URL de GitHub Pages. En ambos casos comprueba navegación, una pregunta de quiz, el marcado de una lección y su recuperación tras recargar.

En el laboratorio ejecuta un `print`, una lectura `input()` con su respuesta preparada y un programa que escriba un informe virtual descargable. Comprueba el botón Detener con un bucle infinito. Repite una carga sin acceso al CDN para comprobar el mensaje de error y que el resto del curso sigue disponible.

Verifica también que puedes exportar e importar el progreso entre el archivo local y el sitio publicado. Conserva los JSON de prueba fuera del repositorio si incluyen datos que no quieras publicar.

## Repetir las comprobaciones

```bash
python tests/validate_content.py
python -m pip install playwright
python -m playwright install chromium
python tests/ui_browser.py
```

Para usar un Chromium instalado, establece `PYLAB_CHROMIUM` con su ruta antes del último comando. La prueba genera sus resultados y capturas en `tests/output/`, carpeta excluida mediante `.gitignore`. Los resultados guardados en `tests/results/` corresponden a esta entrega.

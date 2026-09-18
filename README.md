# PyLab ASIR · Python Ops · Edición gamificada

Plataforma educativa estática para alumnado de **2º de ASIR**. El recorrido conecta los fundamentos de Python con servidores ficticios, inventarios, almacenamiento, registros y automatización segura. No es un sistema de gestión de calificaciones ni una programación didáctica oficial.

## Empezar

1. Extrae **todo** el ZIP en una carpeta.
2. Abre `index.html` con un navegador moderno. No lo abras dentro del visor de archivos comprimidos.
3. Entra en **Temario**, abre el primer módulo y sigue la secuencia explicación → ejemplo → práctica.

No necesitas Node.js, Python instalado, una terminal, claves, cuenta de usuario ni un servidor para consultar el curso y realizar sus actividades. La ejecución opcional de Python descarga Pyodide desde un CDN; consulta las condiciones del laboratorio más abajo.

También se entrega una versión de un solo archivo, `PyLab_ASIR_Gamificado_autonomo.html`, para transportar o abrir el curso sin conservar sus carpetas. El proyecto separado en carpetas es la versión recomendada para mantenimiento y GitHub Pages. Ambas versiones contienen el mismo material. Los enlaces a documentación de la versión autónoma descargan las copias incrustadas.

## Actualizar desde la versión anterior

Antes de sustituir archivos, entra en **Mi progreso → Exportar progreso** en la versión anterior y conserva el JSON. Publica el contenido de este ZIP completo, no solo `index.html`, manteniendo la dirección del curso.

La nueva edición utiliza la misma clave `pylab-asir-progress-v1` y amplía el registro con `game`. Al encontrar un progreso anterior, conserva sus marcas y mejores notas y calcula sus XP iniciales. También acepta importar una copia antigua sin el campo `game`. No inventa un historial individual de predicciones o diagnósticos que la versión antigua no guardaba.

Al cambiar de archivo HTML local, navegador, ordenador u origen web, importa la copia desde **Mi progreso → Importar copia**. No supongas que dos archivos locales comparten almacenamiento. Una copia nueva incluye toda la gamificación y se debe restaurar en esta edición; abrirla con una versión antigua puede descartar sus campos nuevos.

## Python Ops: qué se ha añadido

| Elemento | Funcionamiento |
| --- | --- |
| Experiencia y 10 niveles | XP por primeras realizaciones y por mejorar el mejor quiz. Desmarcar y volver a marcar no duplica recompensas. |
| Campaña de 14 nodos | Tres sectores. Cada módulo tiene una estrella por sus dos lecciones, otra por dos ejercicios y otra por alcanzar un 80% en su quiz. Las tres añaden 100 XP. |
| Ocho misiones | Objetivos combinados con requisitos visibles y botón para recoger una recompensa única. No caducan. |
| Tres incidentes | Nueve decisiones nuevas con corrección automática: alta de un servidor, monitorización e informes. Hasta 900 XP entre los tres casos. |
| Doce insignias | Se amplían las cinco originales. Incluyen práctica, quiz, predicción, diagnóstico, retos, campaña y constancia histórica. |
| Perfil personal | Alias opcional, seis emblemas y cuatro paletas; las adicionales se habilitan en los niveles 3, 5 y 7. |
| Objetivo personal diario | Una, tres o cinco actividades distintas; los repasos de quiz o predicciones pueden contar una vez al día. No da XP adicional. |
| Recompensas accesibles | Avisos no modales, sin sonido, animaciones desactivables y respeto a movimiento reducido. |

Todo el temario sigue disponible: no hay vidas, bloqueos de contenidos, pagos, recompensas aleatorias ni ranking público. Los XP **no son notas académicas**. Los rangos son nombres del juego, no titulaciones profesionales. La gamificación no necesita Pyodide, conexión ni nuevas dependencias.

Las reglas detalladas aparecen en **Perfil e insignias**. El ZIP también incluye `GAMIFICACION.md`, con guía docente y mantenimiento.

## Contenido incluido

| Recurso | Cantidad | Organización |
| --- | ---: | --- |
| Módulos | 14 | Desde el primer programa hasta automatización |
| Lecciones | 28 | Dos por módulo, con objetivos, sintaxis y práctica |
| Ejercicios | 56 | Cuatro por módulo; tres niveles de dificultad |
| Quiz | 14 | Seis preguntas cada uno: 84 preguntas en total |
| Retos | 12 | Casos integradores con requisitos y solución |
| Predicciones de salida | 14 | Una actividad por módulo |
| Diagnósticos de errores | 14 | Una actividad por módulo |
| Bloques de referencia | 14 | Cheatsheet filtrable e imprimible |

Los módulos respetan este orden: introducción; variables y tipos; operadores; entrada y salida; condicionales; bucles; listas; tuplas, conjuntos y diccionarios; funciones; strings; archivos; excepciones; módulos y librerías; introducción a automatización.

Cada lección incorpora objetivo, explicación, sintaxis, ejemplo comentado línea por línea, aplicación a ASIR, errores frecuentes, práctica rápida y marcado de finalización. Los ejercicios ofrecen pista, solución inicialmente oculta y explicación; los retos añaden criterios de aceptación. Las duraciones son orientativas.

## Arquitectura

La aplicación es una SPA sencilla con rutas hash. `index.html` carga scripts clásicos con `defer`, en orden, y todas las referencias a recursos del curso son relativas. No se usa `fetch()` para leer el contenido local, ni imports de módulos ES para la aplicación principal, ni una fase de compilación.

- **Datos:** archivos JavaScript con objetos y arrays de contenido, registrados en `window.Course`.
- **Vistas:** funciones que construyen el HTML a partir de esos datos. Los valores insertados se escapan.
- **Control:** enrutador y delegación de eventos para navegación, formularios y botones.
- **Estado:** progreso, tema y borrador en `localStorage`, con exportación de respaldo del progreso.
- **Laboratorio:** worker de tipo módulo creado desde un Blob; carga Pyodide bajo demanda. No bloquea intencionadamente el hilo de interfaz para ejecutar Python.

```text
/
├── index.html
├── favicon.svg
├── .nojekyll
├── README.md
├── FUENTES.md
├── css/
│   ├── base.css              # Variables, temas, tipografía y componentes
│   ├── layout.css            # Estructura general y portada
│   ├── content.css           # Lecciones, prácticas y cuestionarios
│   ├── lab.css               # Editor y consola
│   ├── responsive.css        # Adaptación e impresión
│   └── gamification.css      # Campaña, perfil, XP y recompensas
├── data/
│   ├── catalog.js            # Metadatos de módulos e inicialización
│   ├── gamification.js       # Recompensas, rangos, misiones e incidentes
│   ├── lessons/m01.js … m14.js
│   ├── exercises/m01.js … m14.js
│   ├── quizzes/m01.js … m14.js
│   ├── challenges.js
│   ├── predictions.js
│   ├── bugs.js
│   └── samples.js            # Archivos virtuales de práctica
├── js/
│   ├── utils.js              # Escape, resaltado, iconos, copia y descargas
│   ├── game-rules.js         # Reglas puras, XP y migración
│   ├── progress.js           # Validación y persistencia
│   ├── views-game.js         # Inicio, campaña, misiones e incidentes
│   ├── views-profile.js      # Perfil, insignias y reglas visibles
│   ├── game-ui.js            # Eventos y avisos de recompensas
│   ├── views-course.js       # Portada, temario y lecciones
│   ├── views-practice.js     # Ejercicios, retos, predicción y diagnóstico
│   ├── quiz.js               # Cuestionarios y corrección
│   ├── views-tools.js        # Cheatsheet, progreso y guía
│   ├── worker-source.js      # Motor Python y sistema de archivos virtual
│   ├── lab.js                # Interfaz y ciclo de vida del laboratorio
│   ├── search.js             # Búsqueda de conceptos
│   └── app.js                # Enrutador y eventos
└── tests/
    ├── validate_content.py   # 180 ejecuciones de ejemplos y soluciones
    ├── build_standalone.py   # Empaquetado HTML opcional
    ├── ui_browser.py         # Regresión del curso con Playwright
    ├── game_browser.py       # Interacciones y responsive de gamificación
    ├── game_rules.test.cjs   # Reglas de recompensas y migración
    ├── RESULTADOS.md         # Alcance real y limitaciones de las pruebas
    └── results/              # Resultados obtenidos en la entrega
```

### Navegación

La ruta inicial es `#/home`. Ejemplos de enlaces internos: `#/module/4`, `#/lesson/m04-l1`, `#/exercise/e13`, `#/challenge/r01`, `#/quiz/4`, `#/lab`, `#/progress`, `#/operations`, `#/missions`, `#/profile` y `#/incident/i01`. Las rutas hash evitan necesitar reglas de reescritura o un backend al recargar una actividad.

El buscador global se abre con el botón superior o `Ctrl+K` / `Cmd+K` y permite ir directamente a lecciones. Los catálogos de actividades incluyen filtros propios. Hay navegación lateral, retorno al catálogo y botones de anterior/siguiente en las lecciones.

## Progreso y evaluación

Las claves utilizadas son:

```text
pylab-asir-progress-v1
pylab-asir-theme
pylab-asir-draft-v1
```

Cada lección, ejercicio, reto y quiz entregado pesa una unidad: **110 actividades** en total (28 + 56 + 12 + 14). El porcentaje general es la proporción completada, redondeada. Por módulo se cuentan las actividades asignadas a ese módulo; por eso los módulos con retos tienen un total diferente.

Lecciones, ejercicios y retos se marcan manualmente. El laboratorio **no verifica automáticamente** que la solución de un ejercicio sea correcta. Los quiz sí se corrigen automáticamente; cada pregunta vale un punto, y una selección múltiple exige todas las respuestas correctas y ninguna incorrecta. Se conservan la mejor nota, la última y el número de intentos. Entregar un quiz cuenta como actividad realizada independientemente de la nota.

También se guardan la última lección y su módulo. La racha cuenta días con actividad marcada, quiz entregado, predicción comprobada, diagnóstico registrado o decisión correcta de incidente. Las insignias son logros históricos; no certifican competencias. La de constancia se obtiene con tres días consecutivos y se conserva aunque la racha actual se interrumpa.

En **Mi progreso** puedes exportar un JSON, importar una copia validada y reiniciar, siempre con confirmación cuando se sustituye o elimina el progreso. La copia incluye XP, perfil, misiones recogidas, estrellas históricas, incidentes y realizaciones de predicciones y diagnósticos. No contiene el texto de esos diagnósticos ni el borrador de código; este se descarga por separado como `.py`. El reinicio del progreso tampoco borra ese borrador.

El almacenamiento es por navegador y origen: pasar de un archivo local a GitHub Pages, cambiar de navegador o borrar los datos puede dar lugar a un progreso independiente. En `file://` la persistencia depende del navegador. No hay cuentas ni sincronización entre equipos; conserva una copia exportada. Si el almacenamiento está bloqueado, se muestra una advertencia y puedes continuar durante la sesión.

## Laboratorio Python opcional

Se usa **Pyodide 314.0.7**, con URL fijada en `js/worker-source.js`:

```text
https://cdn.jsdelivr.net/pyodide/v314.0.7/full/
```

Pulsar **Ejecutar Python** crea un worker de tipo módulo y descarga el motor. La primera carga requiere conexión; futuras cargas también pueden necesitarla cuando la caché no conserva los archivos. Las lecciones, soluciones, quiz, búsqueda y referencias del ZIP no dependen del CDN. Esta entrega no incluye una caché offline garantizada del motor.

Escribe las respuestas de `input()` en el campo de entradas, una por línea. Si el programa solicita más de las disponibles recibe `EOFError`. Cada ejecución comienza con nuevas variables; los módulos importados y los archivos virtuales permanecen mientras siga vivo el motor.

La carpeta virtual `/home/pyodide/practicas` contiene inicialmente `logs.txt`, `usuarios.txt`, `config.ini` e `inventario.csv`. El código del alumno puede crear sus propios informes de texto y descargarlos mediante los botones del laboratorio. No se montan las carpetas personales del equipo.

Límites de interfaz: 120 segundos para cargar el motor, 8 segundos por ejecución una vez iniciado y 64 KiB de salida. El listado de descarga ofrece hasta 50 archivos de texto reconocidos, de un máximo de 128 KiB por archivo y 1 MiB acumulado, recorriendo hasta tres niveles de subcarpetas. No es un explorador de archivos completo.

**Detener** termina el worker, incluido un bucle bloqueado, y descarta su sistema de archivos. **Reiniciar motor** tiene el mismo efecto previa confirmación. El código del editor se conserva. Descarga los informes antes de detener, reiniciar o cerrar la pestaña.

Esto **no es una sandbox de seguridad para código hostil**. Python se ejecuta con las capacidades del worker del navegador, incluida potencialmente la red. Usa código propio o de confianza y datos ficticios, no contraseñas ni secretos. No se instalan automáticamente paquetes externos. `os`, `sys` y `pathlib` describen el entorno virtual de Pyodide, no el servidor real ni el equipo personal. No se implementan SSH, procesos remotos ni administración real de sistemas.

Si el navegador o la red del centro impiden la descarga, el laboratorio informa del problema y permite reintentar. Como alternativa, descarga el código `.py` y ejecútalo con una instalación local de Python en un entorno de prácticas.

## Modificar o ampliar contenidos

Edita el archivo correspondiente dentro de `data/` con un editor de texto que conserve UTF-8. Los contenidos se almacenan como arrays JSON válidos insertados mediante `Course.lessons.push(...)`, `Course.exercises.push(...)` o `Course.quizzes.push(...)`. No es necesario modificar la lógica para cambiar textos, pistas, código u opciones.

Los campos de una lección son: `id`, `module`, `title`, `objective`, `body`, `syntax`, `code`, `lineNotes`, `asir`, `errors`, `quick`, `answer`, `terms`, `note` y `minutes`.

Los ejercicios usan `statement`, `concepts`, `level`, `starter`, `hint`, `solution`, `explanation`, `inputs` y `expected`, además de su identificación. `expected: null` indica que no se ofrece una única salida textual de referencia.

Las preguntas de quiz admiten `choice`, `multi`, `boolean`, `output`, `error` y `fill`. Las respuestas de selección se almacenan mediante índices desde cero; `multi` usa un array de índices y `fill` un array de textos aceptados. La corrección de código distingue mayúsculas de minúsculas. Cada pregunta incluye explicación.

Conserva los identificadores de actividades publicadas para mantener el progreso existente. Si añades un archivo nuevo, incluye su etiqueta `<script defer>` en `index.html` después de `catalog.js` y antes de la lógica de la aplicación. Al cambiar el número de módulos o actividades, actualiza también los contadores editoriales de las vistas y las expectativas de los tests; el porcentaje de progreso ya obtiene su denominador de los datos.

Los colores base se personalizan en `css/base.css` y las paletas del juego en `css/gamification.css`. Las recompensas, rangos e incidentes se configuran en `data/gamification.js`; los requisitos de misiones están en `js/game-rules.js`. No cambies valores de XP de un curso en marcha sin avisar: el balance se deriva de esas reglas y se recalcula con ellas. El contenido visible se escapa antes de insertarlo; escribe texto y código, no HTML arbitrario, en los datos del curso.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `python-asir`. Para la opción de GitHub Free, utiliza un repositorio público.
2. Sube **el contenido extraído del ZIP**, no el propio ZIP. `index.html`, `css`, `js` y `data` deben quedar en la raíz del repositorio. Incluye `.nojekyll`.
3. Confirma los cambios en la rama `main`.
4. Abre **Settings** del repositorio.
5. Entra en **Pages**.
6. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
7. Selecciona la rama **main** y la carpeta **/(root)**, es decir, la raíz `/`. No crees una carpeta llamada `root`.
8. Pulsa **Save** y espera a que termine el despliegue. Abre la URL que muestra GitHub Pages.

Una dirección habitual será `https://TU_USUARIO.github.io/python-asir/`. Sustituye usuario y nombre de repositorio por los reales; esa dirección de ejemplo no es un despliegue de esta entrega. No hace falta añadir un workflow propio de compilación.

Si aparece un 404, revisa que `index.html` esté en la carpeta seleccionada, que los cambios se hayan subido a `main` y que el despliegue haya terminado. No coloques datos privados o credenciales en el repositorio. El estado local del alumnado no se sube al repositorio.

Referencia oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Validación de desarrollo

Las siguientes herramientas son opcionales **para mantener el proyecto**, no para usar la web.

```bash
# Con Python 3 instalado: verifica contenidos y ejecuta ejemplos en carpetas temporales.
python tests/validate_content.py

# Genera una copia de un solo archivo, sin dependencias de empaquetado.
python tests/build_standalone.py --output PyLab_ASIR_Gamificado_autonomo.html
```

Para las pruebas de interfaz:

```bash
python -m pip install playwright
python -m playwright install chromium
python tests/ui_browser.py
python tests/game_browser.py

# Node es solo una herramienta opcional de pruebas, nunca un requisito de uso.
node tests/game_rules.test.cjs
```

Puedes usar un Chromium instalado indicando la variable de entorno `PYLAB_CHROMIUM`. Las pruebas usan una copia con recursos integrados, un almacenamiento sintético y respuestas de worker simuladas para el controlador. No prueban el motor remoto real.

Esta edición supera 180 comprobaciones de fragmentos Python, 80 comprobaciones de reglas de juego, 130 comprobaciones de regresión de la interfaz y 131 comprobaciones específicas de gamificación. La revisión de anchuras incluye 320, 390, 768, 1024 y 1440 píxeles. El alcance exacto, los resultados y las limitaciones están en `tests/RESULTADOS.md`. La descarga real del motor, la carga directa de `file://`/HTTP y la persistencia nativa no pudieron verificarse en el entorno de preparación, que bloquea esas navegaciones. Tampoco se ejecutó una batería en Firefox o Edge.

Antes de usar el laboratorio con un grupo, verifica en su navegador y red: `print("Hola, ASIR")`, una entrada `input()`, un informe con `with open(...)`, un bucle infinito detenido con el botón y la recuperación del progreso después de recargar. El sitio se entrega preparado para publicar; no se ha creado ni publicado un repositorio en tu cuenta.

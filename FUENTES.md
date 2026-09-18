# Fuentes técnicas y alcance editorial

Fecha de consulta: **18 de septiembre de 2026**.

## Base del encargo

La estructura de catorce módulos, el público de 2º de ASIR, las funcionalidades educativas y los requisitos de una web estática proceden del documento de especificación aportado por el usuario. Ese documento solicita desarrollar el material, no reproduce un manual de Python que deba transcribirse.

Las explicaciones, ejemplos, ejercicios, preguntas y retos de esta entrega son contenido original elaborado para ese encargo. Los datos de equipos, personas usuarias, direcciones y logs son ficticios. No se atribuyen resultados de aprendizaje oficiales, una carga horaria normativa ni una acreditación académica.

## Referencias oficiales de Python

Estas referencias respaldan la sintaxis y los comportamientos del lenguaje. No se han copiado capítulos completos ni bancos de ejercicios de terceros.

- Tutorial oficial en español: https://docs.python.org/es/3/tutorial/
- Control de flujo y funciones: https://docs.python.org/es/3/tutorial/controlflow.html
- Estructuras de datos: https://docs.python.org/es/3/tutorial/datastructures.html
- Entrada, salida y archivos: https://docs.python.org/es/3/tutorial/inputoutput.html
- Errores y excepciones: https://docs.python.org/es/3/tutorial/errors.html
- Módulos: https://docs.python.org/es/3/tutorial/modules.html
- Biblioteca estándar: https://docs.python.org/es/3/library/
- Sitio de descarga oficial: https://www.python.org/downloads/

Las comprobaciones de ejecución incluidas se realizaron con CPython 3.13.5. Los ejemplos evitan deliberadamente sintaxis exclusiva de versiones recientes. Esto no sustituye una comprobación del motor de navegador cuando se actualice Pyodide.

## Pyodide

- Workers de tipo módulo y ejecución asíncrona: https://pyodide.org/en/stable/usage/webworker.html
- Entrada y salida estándar: https://pyodide.org/en/stable/usage/streams.html
- Sistema de archivos: https://pyodide.org/en/stable/usage/file-system.html
- Referencia de JavaScript: https://pyodide.org/en/stable/usage/api/js-api.html

La documentación estable consultada mostraba la versión **314.0.7**, que queda fijada en `js/worker-source.js`. Su integración usa un worker de tipo módulo, `loadPyodide`, control explícito de `stdin`/`stdout`/`stderr` y un sistema de archivos virtual. El motor no forma parte del ZIP: se obtiene bajo demanda desde jsDelivr.

Pyodide y sus componentes mantienen sus propias licencias y avisos. No se redistribuyen sus binarios ni fuentes en este proyecto. Al actualizar la versión, verifica nuevamente la API, el comportamiento de entrada/salida, los módulos disponibles y el arranque en un navegador real.

## GitHub Pages

Instrucciones oficiales para configurar rama y carpeta de publicación:

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

El proyecto se prepara para publicación desde una rama, con `index.html` y `.nojekyll` en su raíz. La publicación real y los permisos de la cuenta no se han probado ni modificado.

## Diferenciar contenido, simulación y verificación

Los ejemplos de monitorización representan datos de práctica: no comprueban disponibilidad real ni acceden a servicios remotos. Las validaciones de puertos, contraseñas o IP de los primeros módulos son ejercicios didácticos con alcance explicado, no soluciones completas de seguridad o de gestión de redes.

Las soluciones ejecutadas localmente y las pruebas de la interfaz se documentan en `tests/RESULTADOS.md`. Las respuestas simuladas del worker en las pruebas no constituyen evidencia de que se descargara o ejecutara el motor remoto.

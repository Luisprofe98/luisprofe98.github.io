"use strict";
Course.lessons.push(...[
  {
    "id": "m01-l1",
    "module": 1,
    "title": "Tu primer programa",
    "objective": "Distinguir un intérprete de un script y mostrar mensajes.",
    "body": [
      "Python es un lenguaje de propósito general: con las mismas bases puedes transformar texto, generar informes o automatizar tareas. Su sintaxis legible ayuda a concentrarse en el problema. El tipo de un valor se determina durante la ejecución; aprenderás a comprobarlo en el siguiente módulo.",
      "El intérprete ejecuta instrucciones de Python. La consola interactiva permite probarlas una a una, mientras que un script guarda una secuencia en un archivo .py para repetirla. La aplicación usa Python dentro del navegador solo cuando abres el laboratorio y lo ejecutas.",
      "print() es una función: los paréntesis contienen aquello que quieres mostrar. Las comillas delimitan un texto y no aparecen en la salida. Python distingue mayúsculas y minúsculas: Print no es print."
    ],
    "syntax": "print(\"mensaje\")",
    "code": "print(\"Hola, ASIR\")",
    "lineNotes": [
      "Línea 1: llama a print() con el texto Hola, ASIR; la salida termina con un salto de línea."
    ],
    "asir": "print(\"Inicio del inventario\")\nprint(\"Servidor: web01\")\nprint(\"Estado: ONLINE\")",
    "errors": [
      "Escribir Print() provoca NameError: el nombre no coincide.",
      "Olvidar una comilla o un paréntesis impide analizar el programa.",
      "No escribas el indicador >>> de la consola dentro de un script."
    ],
    "quick": "Muestra dos líneas: Inicio de copia y Copia completada.",
    "answer": "print(\"Inicio de copia\")\nprint(\"Copia completada\")",
    "terms": [
      "python",
      "intérprete",
      "script",
      "print"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m01-l2",
    "module": 1,
    "title": "Instalación, scripts y comentarios",
    "objective": "Preparar un entorno local y documentar un script sencillo.",
    "body": [
      "Para trabajar fuera de esta web, instala Python 3 desde la página oficial. En Windows comprueba py --version; en GNU/Linux o macOS comprueba python3 --version. Estos son comandos de terminal, no instrucciones para el editor de Python. Si no se encuentra el comando, revisa la instalación y el PATH del equipo.",
      "Guarda tu código en un archivo llamado inicio.py y abre una terminal en su carpeta. En Windows puedes ejecutar py inicio.py; en GNU/Linux o macOS, python3 inicio.py. No llames a tu archivo random.py, os.py o pathlib.py: puede ocultar módulos de la biblioteca estándar.",
      "Un comentario comienza con # y termina al acabar la línea. Explica la intención o una decisión, no repitas lo obvio. La sangría delimitará bloques en módulos posteriores: acostúmbrate a cuatro espacios y no mezcles tabuladores."
    ],
    "syntax": "# comentario\nprint(\"mensaje\")",
    "code": "# Aviso antes de una simulación\nprint(\"No se modificará ningún equipo\")",
    "lineNotes": [
      "Línea 1: el intérprete ignora el comentario; sirve como documentación para quien lee.",
      "Línea 2: print() presenta el aviso, pero no ejecuta ninguna acción sobre un sistema."
    ],
    "asir": "# Informe de ejemplo; no consulta la red\nprint(\"INVENTARIO DEL AULA\")\nprint(\"Equipos registrados: 12\")",
    "errors": [
      "Un archivo inicio.py.txt no es el script que esperas.",
      "Los comandos py y python3 se escriben en la terminal, no dentro de inicio.py.",
      "Un comentario útil explica por qué existe una decisión."
    ],
    "quick": "Añade un comentario que aclare que los datos son ficticios y muestra Servidor de pruebas.",
    "answer": "# Datos ficticios para practicar\nprint(\"Servidor de pruebas\")",
    "terms": [
      "instalación",
      "PATH",
      "comentarios",
      "ejecución"
    ],
    "note": "El laboratorio no necesita que instales Python. Su motor se descarga de un CDN al ejecutar por primera vez; el contenido del curso sí está incluido en estos archivos.",
    "minutes": 25
  }
]);

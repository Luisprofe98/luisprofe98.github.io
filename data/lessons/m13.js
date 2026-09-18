"use strict";
Course.lessons.push(...[
  {
    "id": "m13-l1",
    "module": 13,
    "title": "Importar y crear módulos",
    "objective": "Organizar código reutilizable en archivos independientes.",
    "body": [
      "Un módulo es una unidad de código reutilizable, normalmente un archivo .py. import modulo permite acceder a sus miembros como modulo.nombre. from modulo import nombre incorpora ese nombre directamente al ámbito actual.",
      "Puedes crear utilidades.py con tus funciones y usar import utilidades desde otro script en la misma carpeta. Evita from modulo import *: oculta el origen de los nombres y puede sobrescribir otros identificadores.",
      "El bloque if __name__ == \"__main__\": permite ejecutar una prueba al lanzar el archivo como script sin ejecutarla durante una importación normal. En el laboratorio puedes crear un módulo virtual con open(); para volver a probar una versión modificada, reinicia el motor porque las importaciones se almacenan en caché."
    ],
    "syntax": "import modulo\nfrom modulo import funcion",
    "code": "import math\n\ncapacidad = 7.2\nprint(math.ceil(capacidad))",
    "lineNotes": [
      "Línea 1: importa el módulo estándar math.",
      "Línea 2: separa importaciones y lógica.",
      "Línea 3: almacena un valor decimal.",
      "Línea 4: ceil devuelve el entero superior, 8."
    ],
    "asir": "codigo = \"def etiqueta(host):\\n    return host.upper()\\n\"\nwith open(\"utilidades.py\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(codigo)\nimport utilidades\nprint(utilidades.etiqueta(\"web01\"))",
    "errors": [
      "Llamar random.py a tu script puede ocultar el módulo estándar del mismo nombre.",
      "Un módulo importado no se vuelve a ejecutar en cada importación del mismo proceso.",
      "Instalar paquetes externos no es necesario para estos fundamentos."
    ],
    "quick": "Importa math y muestra la raíz cuadrada de 81.",
    "answer": "import math\nprint(math.sqrt(81))",
    "terms": [
      "import",
      "módulos",
      "biblioteca estándar",
      "__name__"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m13-l2",
    "module": 13,
    "title": "Herramientas de la biblioteca estándar",
    "objective": "Reconocer utilidades de rutas, entorno, fechas y simulación.",
    "body": [
      "pathlib representa rutas como objetos Path y permite consultar nombres, extensiones e iterar carpetas. os ofrece interfaces del sistema operativo, como getcwd(). En el navegador estas operaciones ven el entorno virtual, no todo el sistema anfitrión.",
      "sys permite consultar información del intérprete, como sys.version y sys.platform. En scripts locales también puedes estudiar sys.argv; en este laboratorio los argumentos no equivalen a los de una terminal normal. datetime trabaja con fechas y tiempos.",
      "random genera valores pseudoaleatorios para simulación. No se usa para contraseñas ni tokens de seguridad; para ese ámbito existe secrets, fuera del objetivo de esta práctica. Las APIs del sistema disponibles dependen del entorno: Pyodide no es un servidor de administración remota."
    ],
    "syntax": "from pathlib import Path\nfrom datetime import date\nimport os, sys, random",
    "code": "from pathlib import Path\nfrom datetime import date\nimport random\n\nruta = Path(\"informes/estado.txt\")\nprint(ruta.name, ruta.suffix)\nprint(date(2026, 9, 18).isoformat())\nprint(random.randint(1, 3))",
    "lineNotes": [
      "Líneas 1–3: importan rutas, fechas y simulación aleatoria.",
      "Línea 4: separa las importaciones.",
      "Línea 5: representa una ruta, sin crearla.",
      "Línea 6: muestra estado.txt y .txt.",
      "Línea 7: formatea una fecha fija, no la fecha actual.",
      "Línea 8: genera uno de los enteros 1, 2 o 3."
    ],
    "asir": "import os\nimport sys\nfrom pathlib import Path\n\nprint(\"Directorio:\", os.getcwd())\nprint(\"Plataforma:\", sys.platform)\nfor ruta in sorted(Path(\".\").iterdir()):\n    if ruta.is_file():\n        print(ruta.name)",
    "errors": [
      "Construir Path(\"x.txt\") no crea el archivo.",
      "random no es apropiado para secretos de seguridad.",
      "Los resultados de os y sys reflejan el entorno donde se ejecuta el código."
    ],
    "quick": "Con Path(\"copias/inventario.csv\"), muestra el nombre y la extensión.",
    "answer": "from pathlib import Path\nruta = Path(\"copias/inventario.csv\")\nprint(ruta.name)\nprint(ruta.suffix)",
    "terms": [
      "os",
      "sys",
      "datetime",
      "random",
      "pathlib"
    ],
    "note": "",
    "minutes": 25
  }
]);

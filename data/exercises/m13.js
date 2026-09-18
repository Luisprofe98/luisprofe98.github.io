"use strict";
Course.exercises.push(...[
  {
    "id": "e49",
    "module": 13,
    "title": "Nombre y extensión",
    "statement": "Usa pathlib para obtener el nombre y la extensión de informes/estado.log, cada uno en una línea. No crees archivos.",
    "concepts": [
      "pathlib",
      "Path"
    ],
    "hint": "Consulta .name y .suffix.",
    "solution": "from pathlib import Path\nruta = Path(\"informes/estado.log\")\nprint(ruta.name)\nprint(ruta.suffix)",
    "explanation": "Path representa rutas y permite descomponerlas sin acceder al contenido.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "estado.log\n.log",
    "inputs": ""
  },
  {
    "id": "e50",
    "module": 13,
    "title": "Fecha de un informe",
    "statement": "Usa datetime.date para representar el 18 de septiembre de 2026 y muestra su formato ISO.",
    "concepts": [
      "datetime",
      "date",
      "isoformat"
    ],
    "hint": "El constructor recibe año, mes y día.",
    "solution": "from datetime import date\nfecha = date(2026, 9, 18)\nprint(fecha.isoformat())",
    "explanation": "ISO presenta una fecha como año-mes-día.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "2026-09-18",
    "inputs": ""
  },
  {
    "id": "e51",
    "module": 13,
    "title": "Métricas simuladas",
    "statement": "Usa random.randint para generar cinco valores de CPU entre 0 y 100, incluidos. Muéstralos uno por línea. No los presentes como medidas reales.",
    "concepts": [
      "random",
      "range",
      "simulación"
    ],
    "hint": "El extremo superior de randint sí se incluye.",
    "solution": "import random\nfor _ in range(5):\n    print(random.randint(0, 100))",
    "explanation": "Son datos pseudoaleatorios de práctica y pueden variar en cada ejecución.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": null,
    "inputs": ""
  },
  {
    "id": "e52",
    "module": 13,
    "title": "Tu propio módulo",
    "statement": "Crea util_capacidad.py con una función doble(n) que devuelva n*2. Impórtala desde tu script y muestra doble(8). Trabaja solo en el entorno de prácticas.",
    "concepts": [
      "módulos",
      "import",
      "archivos"
    ],
    "hint": "Escribe el código del módulo con sangría y saltos de línea.",
    "solution": "codigo = \"def doble(n):\\n    return n * 2\\n\"\nwith open(\"util_capacidad.py\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(codigo)\nfrom util_capacidad import doble\nprint(doble(8))",
    "explanation": "El archivo escrito puede importarse desde el directorio de trabajo. Reinicia el motor al cambiar un módulo ya importado.",
    "level": "Avanzado",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "16",
    "inputs": ""
  }
]);

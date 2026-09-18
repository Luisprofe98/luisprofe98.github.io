"use strict";
Course.exercises.push(...[
  {
    "id": "e25",
    "module": 7,
    "title": "Primer y último servicio",
    "statement": "Con servicios=[\"ssh\", \"dns\", \"http\"], muestra el primer y último servicio en líneas separadas.",
    "concepts": [
      "índices",
      "listas"
    ],
    "hint": "Usa 0 y -1.",
    "solution": "servicios = [\"ssh\", \"dns\", \"http\"]\nprint(servicios[0])\nprint(servicios[-1])",
    "explanation": "El índice negativo cuenta desde el final.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "ssh\nhttp",
    "inputs": ""
  },
  {
    "id": "e26",
    "module": 7,
    "title": "Ventana de equipos",
    "statement": "Con equipos=[\"pc01\", \"pc02\", \"pc03\", \"pc04\", \"pc05\"], muestra pc02, pc03 y pc04 como lista mediante un solo slice.",
    "concepts": [
      "slicing"
    ],
    "hint": "El inicio es 1 y el final exclusivo es 4.",
    "solution": "equipos = [\"pc01\", \"pc02\", \"pc03\", \"pc04\", \"pc05\"]\nprint(equipos[1:4])",
    "explanation": "El corte incluye posiciones 1, 2 y 3.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "['pc02', 'pc03', 'pc04']",
    "inputs": ""
  },
  {
    "id": "e27",
    "module": 7,
    "title": "Actualizar servicios",
    "statement": "Partiendo de [\"ssh\", \"telnet\"], añade \"https\", elimina \"telnet\" y ordena la lista. Muéstrala.",
    "concepts": [
      "append",
      "remove",
      "sort"
    ],
    "hint": "Las tres operaciones modifican la misma lista.",
    "solution": "servicios = [\"ssh\", \"telnet\"]\nservicios.append(\"https\")\nservicios.remove(\"telnet\")\nservicios.sort()\nprint(servicios)",
    "explanation": "sort() se llama sin asignar su retorno a la lista.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "['https', 'ssh']",
    "inputs": ""
  },
  {
    "id": "e28",
    "module": 7,
    "title": "Cola de copias",
    "statement": "Con pendientes=[\"lunes\", \"martes\", \"miércoles\"], extrae el primer elemento con pop(0). Muestra la tarea extraída y las pendientes.",
    "concepts": [
      "pop",
      "colas",
      "len"
    ],
    "hint": "pop(0) elimina y devuelve el elemento inicial.",
    "solution": "pendientes = [\"lunes\", \"martes\", \"miércoles\"]\ntarea = pendientes.pop(0)\nprint(tarea)\nprint(pendientes)",
    "explanation": "Es una cola didáctica; para muchas operaciones al inicio se estudiaría deque.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "lunes\n['martes', 'miércoles']",
    "inputs": ""
  }
]);

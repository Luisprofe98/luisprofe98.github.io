"use strict";
Course.exercises.push(...[
  {
    "id": "e21",
    "module": 6,
    "title": "Recorrido de servidores",
    "statement": "Recorre [\"web01\", \"db01\", \"backup01\"] y muestra un nombre por línea.",
    "concepts": [
      "for",
      "listas"
    ],
    "hint": "No necesitas índices para un recorrido directo.",
    "solution": "servidores = [\"web01\", \"db01\", \"backup01\"]\nfor servidor in servidores:\n    print(servidor)",
    "explanation": "for asigna cada elemento a servidor.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "web01\ndb01\nbackup01",
    "inputs": ""
  },
  {
    "id": "e22",
    "module": 6,
    "title": "Direcciones de laboratorio",
    "statement": "Genera 192.0.2.1, 192.0.2.2, 192.0.2.3 y 192.0.2.4 con range() y f-strings. Solo muestra direcciones; no realices conexiones.",
    "concepts": [
      "range",
      "f-string"
    ],
    "hint": "El extremo final de range es exclusivo.",
    "solution": "for numero in range(1, 5):\n    print(f\"192.0.2.{numero}\")",
    "explanation": "La parte final de la dirección se interpola en cada iteración.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "192.0.2.1\n192.0.2.2\n192.0.2.3\n192.0.2.4",
    "inputs": ""
  },
  {
    "id": "e23",
    "module": 6,
    "title": "Tres intentos",
    "statement": "Usa while para mostrar Intento 1, Intento 2 e Intento 3. No uses pausas ni conexiones reales.",
    "concepts": [
      "while",
      "contador"
    ],
    "hint": "Actualiza el contador en cada vuelta.",
    "solution": "intento = 1\nwhile intento <= 3:\n    print(f\"Intento {intento}\")\n    intento += 1",
    "explanation": "El contador alcanza 4 y hace falsa la condición.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Intento 1\nIntento 2\nIntento 3",
    "inputs": ""
  },
  {
    "id": "e24",
    "module": 6,
    "title": "Registros hasta STOP",
    "statement": "Recorre [\"INFO\", \"\", \"ERROR\", \"STOP\", \"ERROR\"]. Omite vacíos con continue y termina con break al encontrar STOP. Muestra los demás registros.",
    "concepts": [
      "break",
      "continue",
      "for"
    ],
    "hint": "Comprueba STOP antes de imprimir el registro.",
    "solution": "registros = [\"INFO\", \"\", \"ERROR\", \"STOP\", \"ERROR\"]\nfor registro in registros:\n    if registro == \"\":\n        continue\n    if registro == \"STOP\":\n        break\n    print(registro)",
    "explanation": "El último ERROR no se visita porque STOP interrumpe el recorrido.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "INFO\nERROR",
    "inputs": ""
  }
]);

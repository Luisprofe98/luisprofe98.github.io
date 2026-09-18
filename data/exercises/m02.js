"use strict";
Course.exercises.push(...[
  {
    "id": "e05",
    "module": 2,
    "title": "Ficha de un equipo",
    "statement": "Crea hostname=\"web01\", ram=16 y activo=True. Muestra los tres valores en una sola llamada a print().",
    "concepts": [
      "variables",
      "str",
      "int",
      "bool"
    ],
    "hint": "print() acepta varios argumentos separados por comas.",
    "solution": "hostname = \"web01\"\nram = 16\nactivo = True\nprint(hostname, ram, activo)",
    "explanation": "Cada variable conserva su tipo; print() separa los argumentos con espacios.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "web01 16 True",
    "inputs": ""
  },
  {
    "id": "e06",
    "module": 2,
    "title": "Puerto importado",
    "statement": "Convierte el texto \"8080\" a entero y muestra el puerto siguiente.",
    "concepts": [
      "int",
      "conversión"
    ],
    "hint": "Convierte antes de sumar.",
    "solution": "puerto = int(\"8080\")\nprint(puerto + 1)",
    "explanation": "El entero permite sumar 1 numéricamente.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "8081",
    "inputs": ""
  },
  {
    "id": "e07",
    "module": 2,
    "title": "Medida de CPU",
    "statement": "Convierte \"37.5\" a float y muestra su valor y su tipo.",
    "concepts": [
      "float",
      "type"
    ],
    "hint": "Usa float() y después type().",
    "solution": "cpu = float(\"37.5\")\nprint(cpu)\nprint(type(cpu))",
    "explanation": "El punto decimal es parte del formato que reconoce float().",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "37.5\n<class 'float'>",
    "inputs": ""
  },
  {
    "id": "e08",
    "module": 2,
    "title": "Estado textual",
    "statement": "Dado estado=\"False\", muestra bool(estado) y después el resultado de estado == \"True\". Explica por qué difieren.",
    "concepts": [
      "bool",
      "comparación"
    ],
    "hint": "Un texto no vacío es verdadero aunque diga False.",
    "solution": "estado = \"False\"\nprint(bool(estado))\nprint(estado == \"True\")",
    "explanation": "La primera expresión comprueba si el texto está vacío; la segunda compara su contenido.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "True\nFalse",
    "inputs": ""
  }
]);

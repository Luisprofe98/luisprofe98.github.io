"use strict";
Course.exercises.push(...[
  {
    "id": "e01",
    "module": 1,
    "title": "Saludo de la consola",
    "statement": "Muestra exactamente Hola, ASIR en una línea.",
    "concepts": [
      "print",
      "strings"
    ],
    "hint": "El texto debe ir entre comillas.",
    "solution": "print(\"Hola, ASIR\")",
    "explanation": "print() recibe una cadena y añade un salto de línea.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Hola, ASIR",
    "inputs": ""
  },
  {
    "id": "e02",
    "module": 1,
    "title": "Parte de incidencias",
    "statement": "Muestra tres líneas: INCIDENCIA, Equipo: aula03 y Estado: pendiente.",
    "concepts": [
      "print",
      "salida"
    ],
    "hint": "Usa una llamada a print() por línea.",
    "solution": "print(\"INCIDENCIA\")\nprint(\"Equipo: aula03\")\nprint(\"Estado: pendiente\")",
    "explanation": "Las instrucciones se ejecutan de arriba abajo.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "INCIDENCIA\nEquipo: aula03\nEstado: pendiente",
    "inputs": ""
  },
  {
    "id": "e03",
    "module": 1,
    "title": "Documentar una simulación",
    "statement": "Escribe un comentario que indique que la operación es simulada. Muestra Reinicio simulado. No ejecutes comandos del sistema.",
    "concepts": [
      "comentarios",
      "print"
    ],
    "hint": "El comentario comienza con #.",
    "solution": "# Operación simulada; no reinicia el equipo\nprint(\"Reinicio simulado\")",
    "explanation": "Un comentario no produce salida ni ejecuta acciones.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Reinicio simulado",
    "inputs": ""
  },
  {
    "id": "e04",
    "module": 1,
    "title": "Cabecera de inventario",
    "statement": "Muestra INVENTARIO, una línea de 10 guiones y Host: web01. Utiliza únicamente print() y textos.",
    "concepts": [
      "script",
      "orden de ejecución"
    ],
    "hint": "El orden de las llamadas debe coincidir con el informe.",
    "solution": "print(\"INVENTARIO\")\nprint(\"----------\")\nprint(\"Host: web01\")",
    "explanation": "Cada llamada genera una línea independiente.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "INVENTARIO\n----------\nHost: web01",
    "inputs": ""
  }
]);

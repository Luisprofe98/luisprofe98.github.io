"use strict";
Course.quizzes.push(...[
  {
    "id": "q02-1",
    "module": 2,
    "type": "choice",
    "text": "¿Qué tipo es apropiado para un contador de servidores?",
    "options": [
      "int",
      "str exclusivamente",
      "None"
    ],
    "answer": 0,
    "explanation": "int representa cantidades enteras.",
    "code": ""
  },
  {
    "id": "q02-2",
    "module": 2,
    "type": "boolean",
    "text": "bool(\"False\") devuelve False.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 1,
    "explanation": "Cualquier cadena no vacía tiene valor de verdad verdadero.",
    "code": ""
  },
  {
    "id": "q02-3",
    "module": 2,
    "type": "output",
    "text": "¿Cuál es la salida?",
    "options": [
      "23",
      "221",
      "TypeError"
    ],
    "answer": 0,
    "explanation": "int convierte \"22\" en el número 22 antes de sumar.",
    "code": "print(int(\"22\") + 1)"
  },
  {
    "id": "q02-4",
    "module": 2,
    "type": "error",
    "text": "¿Por qué falla?",
    "options": [
      "Se suma str con int",
      "print no acepta números",
      "cpu es una palabra reservada"
    ],
    "answer": 0,
    "explanation": "Convierte el texto a número antes de una suma aritmética.",
    "code": "cpu = \"80\"\nprint(cpu + 5)"
  },
  {
    "id": "q02-5",
    "module": 2,
    "type": "fill",
    "text": "Completa la función para convertir a decimal.",
    "options": [],
    "answer": [
      "float"
    ],
    "explanation": "float() interpreta una cadena decimal con punto.",
    "code": "cpu = ____(\"73.5\")"
  },
  {
    "id": "q02-6",
    "module": 2,
    "type": "multi",
    "text": "Selecciona dos identificadores válidos.",
    "options": [
      "uso_cpu",
      "servidor2",
      "2servidor",
      "nombre equipo"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "Un identificador puede incluir números, pero no comenzar por uno ni contener espacios.",
    "code": ""
  }
]);

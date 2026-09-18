"use strict";
Course.quizzes.push(...[
  {
    "id": "q10-1",
    "module": 10,
    "type": "choice",
    "text": "¿Qué hace strip() sin argumentos?",
    "options": [
      "Limpia espacios en blanco de los extremos",
      "Borra todos los espacios internos",
      "Convierte a mayúsculas"
    ],
    "answer": 0,
    "explanation": "Elimina espacios, tabulaciones y saltos de línea de los extremos.",
    "code": ""
  },
  {
    "id": "q10-2",
    "module": 10,
    "type": "boolean",
    "text": "Los métodos de str modifican la cadena original.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 1,
    "explanation": "Las cadenas son inmutables; los métodos retornan otras cadenas.",
    "code": ""
  },
  {
    "id": "q10-3",
    "module": 10,
    "type": "output",
    "text": "¿Qué muestra?",
    "options": [
      "['a', 'b']",
      "a;b",
      "ab"
    ],
    "answer": 0,
    "explanation": "split divide usando el delimitador indicado.",
    "code": "print(\"a;b\".split(\";\"))"
  },
  {
    "id": "q10-4",
    "module": 10,
    "type": "error",
    "text": "¿Por qué falla?",
    "options": [
      "No se puede asignar a una posición de str",
      "El índice cero no existe",
      "lower sería obligatorio"
    ],
    "answer": 0,
    "explanation": "Una cadena no permite cambiar sus caracteres mediante asignación.",
    "code": "host = \"web01\"\nhost[0] = \"W\""
  },
  {
    "id": "q10-5",
    "module": 10,
    "type": "fill",
    "text": "Completa para unir los nombres con comas.",
    "options": [],
    "answer": [
      "join"
    ],
    "explanation": "El separador llama a join con una colección de cadenas.",
    "code": "print(\",\".____([\"ana\", \"luis\"]))"
  },
  {
    "id": "q10-6",
    "module": 10,
    "type": "multi",
    "text": "Selecciona métodos que devuelven booleanos.",
    "options": [
      "startswith()",
      "endswith()",
      "find()",
      "split()"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "startswith y endswith comprueban coincidencias; find devuelve un índice y split una lista.",
    "code": ""
  }
]);

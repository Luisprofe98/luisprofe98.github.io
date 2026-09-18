"use strict";
Course.quizzes.push(...[
  {
    "id": "q08-1",
    "module": 8,
    "type": "choice",
    "text": "¿Qué estructura elimina duplicados?",
    "options": [
      "set",
      "tuple siempre",
      "str"
    ],
    "answer": 0,
    "explanation": "Un set contiene elementos únicos.",
    "code": ""
  },
  {
    "id": "q08-2",
    "module": 8,
    "type": "boolean",
    "text": "{} crea un conjunto vacío.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 1,
    "explanation": "{} es un diccionario; para un conjunto vacío se usa set().",
    "code": ""
  },
  {
    "id": "q08-3",
    "module": 8,
    "type": "output",
    "text": "¿Qué muestra?",
    "options": [
      "16",
      "ram",
      "KeyError"
    ],
    "answer": 0,
    "explanation": "La clave ram existe y su valor es 16.",
    "code": "equipo = {\"ram\": 16}\nprint(equipo.get(\"ram\", 0))"
  },
  {
    "id": "q08-4",
    "module": 8,
    "type": "error",
    "text": "¿Por qué falla?",
    "options": [
      "La tupla no permite asignar elementos",
      "La IP no es numérica",
      "El puerto debe ser texto"
    ],
    "answer": 0,
    "explanation": "Las tuplas son inmutables.",
    "code": "endpoint = (\"192.0.2.1\", 80)\nendpoint[1] = 443"
  },
  {
    "id": "q08-5",
    "module": 8,
    "type": "fill",
    "text": "Completa para recorrer pares clave-valor.",
    "options": [],
    "answer": [
      "items"
    ],
    "explanation": "items() produce pares de clave y valor.",
    "code": "for clave, valor in equipo.____():\n    print(clave, valor)"
  },
  {
    "id": "q08-6",
    "module": 8,
    "type": "multi",
    "text": "Selecciona métodos de diccionario.",
    "options": [
      "get()",
      "keys()",
      "append()",
      "add()"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "get consulta con alternativa y keys devuelve una vista de las claves.",
    "code": ""
  }
]);

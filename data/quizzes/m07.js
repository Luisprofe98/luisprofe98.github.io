"use strict";
Course.quizzes.push(...[
  {
    "id": "q07-1",
    "module": 7,
    "type": "choice",
    "text": "¿Cuál es el índice del primer elemento?",
    "options": [
      "0",
      "1",
      "-1"
    ],
    "answer": 0,
    "explanation": "Las secuencias de Python empiezan por el índice cero.",
    "code": ""
  },
  {
    "id": "q07-2",
    "module": 7,
    "type": "boolean",
    "text": "sort() devuelve una nueva lista ordenada.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 1,
    "explanation": "sort() modifica la lista y devuelve None; sorted() devuelve otra lista.",
    "code": ""
  },
  {
    "id": "q07-3",
    "module": 7,
    "type": "output",
    "text": "¿Qué se muestra?",
    "options": [
      "[2, 3]",
      "[2, 3, 4]",
      "[1, 2]"
    ],
    "answer": 0,
    "explanation": "El índice 1 se incluye y el índice 3 se excluye.",
    "code": "print([1, 2, 3, 4][1:3])"
  },
  {
    "id": "q07-4",
    "module": 7,
    "type": "error",
    "text": "¿Qué problema hay?",
    "options": [
      "remove recibe un valor ausente",
      "remove solo acepta números",
      "La lista es inmutable"
    ],
    "answer": 0,
    "explanation": "remove() genera ValueError si no encuentra el valor.",
    "code": "servicios = [\"ssh\"]\nservicios.remove(\"dns\")"
  },
  {
    "id": "q07-5",
    "module": 7,
    "type": "fill",
    "text": "Completa para añadir un equipo al final.",
    "options": [],
    "answer": [
      "append"
    ],
    "explanation": "append añade un único elemento al final.",
    "code": "equipos.____(\"web02\")"
  },
  {
    "id": "q07-6",
    "module": 7,
    "type": "multi",
    "text": "¿Qué operaciones modifican la lista original?",
    "options": [
      "append()",
      "pop()",
      "len()",
      "sorted()"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "append añade y pop extrae; len consulta y sorted crea otra lista.",
    "code": ""
  }
]);

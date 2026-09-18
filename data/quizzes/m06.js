"use strict";
Course.quizzes.push(...[
  {
    "id": "q06-1",
    "module": 6,
    "type": "choice",
    "text": "¿Qué valores produce range(1, 4)?",
    "options": [
      "1, 2, 3",
      "1, 2, 3, 4",
      "0, 1, 2, 3"
    ],
    "answer": 0,
    "explanation": "El inicio se incluye y el extremo final se excluye.",
    "code": ""
  },
  {
    "id": "q06-2",
    "module": 6,
    "type": "boolean",
    "text": "break termina el bucle más interno.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "No termina automáticamente todos los bucles anidados.",
    "code": ""
  },
  {
    "id": "q06-3",
    "module": 6,
    "type": "output",
    "text": "¿Qué se imprime?",
    "options": [
      "0\n1\n2",
      "1\n2\n3",
      "0\n1\n2\n3"
    ],
    "answer": 0,
    "explanation": "range(3) empieza en cero y excluye tres.",
    "code": "for n in range(3):\n    print(n)"
  },
  {
    "id": "q06-4",
    "module": 6,
    "type": "error",
    "text": "¿Qué problema tiene este bucle?",
    "options": [
      "No cambia n y puede no terminar",
      "range es obligatorio",
      "print cambia n"
    ],
    "answer": 0,
    "explanation": "La condición seguirá siendo verdadera porque n permanece en cero.",
    "code": "n = 0\nwhile n < 3:\n    print(n)"
  },
  {
    "id": "q06-5",
    "module": 6,
    "type": "fill",
    "text": "Completa para omitir los registros vacíos.",
    "options": [],
    "answer": [
      "continue"
    ],
    "explanation": "continue salta el resto de la iteración actual.",
    "code": "for linea in registros:\n    if linea == \"\":\n        ____\n    print(linea)"
  },
  {
    "id": "q06-6",
    "module": 6,
    "type": "multi",
    "text": "Selecciona dos prácticas correctas.",
    "options": [
      "Inicializar el acumulador antes del bucle",
      "Actualizar la condición de un while",
      "Reiniciar siempre el contador dentro del bucle",
      "Suponer que range incluye su fin"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "La inicialización y la actualización permiten acumular y terminar correctamente.",
    "code": ""
  }
]);

"use strict";
Course.quizzes.push(...[
  {
    "id": "q03-1",
    "module": 3,
    "type": "choice",
    "text": "¿Qué operador da el resto?",
    "options": [
      "%",
      "//",
      "**"
    ],
    "answer": 0,
    "explanation": "% obtiene el resto de una división.",
    "code": ""
  },
  {
    "id": "q03-2",
    "module": 3,
    "type": "boolean",
    "text": "En medidas binarias, 1 GiB equivale a 1024 MiB.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "El factor entre estas unidades binarias es 1024.",
    "code": ""
  },
  {
    "id": "q03-3",
    "module": 3,
    "type": "output",
    "text": "¿Qué se muestra?",
    "options": [
      "14",
      "20",
      "24"
    ],
    "answer": 0,
    "explanation": "El producto se evalúa antes que la suma.",
    "code": "print(2 + 3 * 4)"
  },
  {
    "id": "q03-4",
    "module": 3,
    "type": "error",
    "text": "¿Qué expresión comprueba correctamente dos puertos permitidos?",
    "options": [
      "puerto == 80 or puerto == 443",
      "puerto == 80 or 443",
      "puerto = 80 and 443"
    ],
    "answer": 0,
    "explanation": "Debes escribir las dos comparaciones; or 443 no compara el puerto.",
    "code": ""
  },
  {
    "id": "q03-5",
    "module": 3,
    "type": "fill",
    "text": "Completa para exigir ambas condiciones.",
    "options": [],
    "answer": [
      "and"
    ],
    "explanation": "and exige que las dos condiciones sean verdaderas.",
    "code": "correcto = cpu < 80 ____ ram < 80"
  },
  {
    "id": "q03-6",
    "module": 3,
    "type": "multi",
    "text": "Selecciona las expresiones que valen True.",
    "options": [
      "5 >= 5",
      "not False",
      "5 != 5",
      "True and False"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": ">= incluye la igualdad; not False produce True.",
    "code": ""
  }
]);

"use strict";
Course.quizzes.push(...[
  {
    "id": "q09-1",
    "module": 9,
    "type": "choice",
    "text": "¿Qué hace return?",
    "options": [
      "Devuelve un valor y termina la función",
      "Imprime siempre",
      "Define una variable global"
    ],
    "answer": 0,
    "explanation": "El llamador recibe el valor devuelto; no implica mostrarlo.",
    "code": ""
  },
  {
    "id": "q09-2",
    "module": 9,
    "type": "boolean",
    "text": "Una función sin return explícito devuelve None.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "Python devuelve None al finalizar sin un retorno explícito de otro valor.",
    "code": ""
  },
  {
    "id": "q09-3",
    "module": 9,
    "type": "output",
    "text": "¿Qué se imprime?",
    "options": [
      "6",
      "3",
      "None"
    ],
    "answer": 0,
    "explanation": "doble devuelve el producto y print muestra ese retorno.",
    "code": "def doble(n):\n    return n * 2\nprint(doble(3))"
  },
  {
    "id": "q09-4",
    "module": 9,
    "type": "error",
    "text": "¿Por qué la segunda línea de la función no se ejecuta?",
    "options": [
      "Está después de return en ese camino",
      "print está prohibido",
      "n tiene que ser global"
    ],
    "answer": 0,
    "explanation": "return termina la ejecución de la función.",
    "code": "def ejemplo(n):\n    return n\n    print(\"fin\")"
  },
  {
    "id": "q09-5",
    "module": 9,
    "type": "fill",
    "text": "Completa para definir la función.",
    "options": [],
    "answer": [
      "def"
    ],
    "explanation": "def introduce la definición de una función.",
    "code": "____ estado(activo):\n    return activo"
  },
  {
    "id": "q09-6",
    "module": 9,
    "type": "multi",
    "text": "Selecciona buenas prácticas.",
    "options": [
      "Pasar datos mediante parámetros",
      "Devolver cálculos para reutilizarlos",
      "Usar [] como predeterminado mutable sin revisar efectos",
      "Usar global para cualquier resultado"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "Los parámetros y retornos explicitan dependencias y facilitan pruebas.",
    "code": ""
  }
]);

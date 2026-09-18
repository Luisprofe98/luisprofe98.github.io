"use strict";
Course.quizzes.push(...[
  {
    "id": "q05-1",
    "module": 5,
    "type": "choice",
    "text": "¿Cuándo se ejecuta else en una cadena if/elif?",
    "options": [
      "Cuando ninguna condición anterior se cumple",
      "Siempre",
      "Cuando todas se cumplen"
    ],
    "answer": 0,
    "explanation": "else es la alternativa residual de esa cadena.",
    "code": ""
  },
  {
    "id": "q05-2",
    "module": 5,
    "type": "boolean",
    "text": "La sangría delimita bloques en Python.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "La sangría forma parte de la sintaxis, no solo del estilo.",
    "code": ""
  },
  {
    "id": "q05-3",
    "module": 5,
    "type": "output",
    "text": "¿Qué muestra?",
    "options": [
      "ALTO",
      "MEDIO",
      "ALTO y MEDIO"
    ],
    "answer": 0,
    "explanation": "La primera condición verdadera determina la única rama ejecutada.",
    "code": "cpu = 95\nif cpu >= 90:\n    print(\"ALTO\")\nelif cpu >= 70:\n    print(\"MEDIO\")"
  },
  {
    "id": "q05-4",
    "module": 5,
    "type": "error",
    "text": "¿Qué falta en la cabecera?",
    "options": [
      "Dos puntos",
      "Punto y coma",
      "Una llave"
    ],
    "answer": 0,
    "explanation": "La cabecera if debe terminar con : antes de su bloque.",
    "code": "if True\n    print(\"activo\")"
  },
  {
    "id": "q05-5",
    "module": 5,
    "type": "fill",
    "text": "Completa la alternativa intermedia.",
    "options": [],
    "answer": [
      "elif"
    ],
    "explanation": "elif comprueba una nueva condición tras descartar la anterior.",
    "code": "if cpu >= 90:\n    print(\"crítico\")\n____ cpu >= 70:\n    print(\"aviso\")"
  },
  {
    "id": "q05-6",
    "module": 5,
    "type": "multi",
    "text": "Selecciona las condiciones verdaderas para puerto=443.",
    "options": [
      "0 <= puerto <= 65535",
      "puerto < 1024",
      "puerto == 80",
      "puerto > 49151"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "443 está en el rango global y es menor de 1024.",
    "code": ""
  }
]);

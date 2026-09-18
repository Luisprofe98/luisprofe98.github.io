"use strict";
Course.quizzes.push(...[
  {
    "id": "q01-1",
    "module": 1,
    "type": "choice",
    "text": "¿Qué es un script de Python?",
    "options": [
      "Un archivo con instrucciones reutilizables",
      "Un servidor obligatorio",
      "Una base de datos"
    ],
    "answer": 0,
    "explanation": "Un script es un archivo de código que puedes ejecutar de nuevo.",
    "code": ""
  },
  {
    "id": "q01-2",
    "module": 1,
    "type": "boolean",
    "text": "Python distingue entre print y Print.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "Los identificadores distinguen mayúsculas y minúsculas.",
    "code": ""
  },
  {
    "id": "q01-3",
    "module": 1,
    "type": "output",
    "text": "¿Qué aparece en la consola?",
    "options": [
      "web01",
      "\"web01\"",
      "print(web01)"
    ],
    "answer": 0,
    "explanation": "Las comillas delimitan el texto; no forman parte de la salida.",
    "code": "print(\"web01\")"
  },
  {
    "id": "q01-4",
    "module": 1,
    "type": "error",
    "text": "¿Qué falta?",
    "options": [
      "Una comilla de cierre",
      "Un punto y coma obligatorio",
      "Una variable global"
    ],
    "answer": 0,
    "explanation": "El literal de texto no está cerrado.",
    "code": "print(\"ASIR)"
  },
  {
    "id": "q01-5",
    "module": 1,
    "type": "fill",
    "text": "Completa el nombre de la función para mostrar un mensaje.",
    "options": [],
    "answer": [
      "print"
    ],
    "explanation": "La función incorporada print() muestra datos.",
    "code": "____(\"Servicio activo\")"
  },
  {
    "id": "q01-6",
    "module": 1,
    "type": "multi",
    "text": "Selecciona las dos afirmaciones correctas.",
    "options": [
      "# inicia un comentario",
      "Un archivo .py puede contener varias instrucciones",
      ">>> debe copiarse dentro del script",
      "Python necesita un servidor web para cualquier script"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "# documenta una línea; un script contiene instrucciones. >>> es el indicador del intérprete interactivo.",
    "code": ""
  }
]);

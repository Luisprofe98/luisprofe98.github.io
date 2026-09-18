"use strict";
Course.quizzes.push(...[
  {
    "id": "q04-1",
    "module": 4,
    "type": "choice",
    "text": "¿Qué devuelve input()?",
    "options": [
      "str",
      "int siempre",
      "float siempre"
    ],
    "answer": 0,
    "explanation": "input() devuelve texto sin el salto de línea final.",
    "code": ""
  },
  {
    "id": "q04-2",
    "module": 4,
    "type": "boolean",
    "text": "Una f-string permite insertar expresiones entre llaves.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "La f inicial activa la interpolación de expresiones.",
    "code": ""
  },
  {
    "id": "q04-3",
    "module": 4,
    "type": "output",
    "text": "¿Qué se imprime?",
    "options": [
      "CPU: 12.3%",
      "CPU: {cpu:.1f}%",
      "CPU: 12.34%"
    ],
    "answer": 0,
    "explanation": "El formato .1f presenta un decimal.",
    "code": "cpu = 12.34\nprint(f\"CPU: {cpu:.1f}%\")"
  },
  {
    "id": "q04-4",
    "module": 4,
    "type": "error",
    "text": "¿Qué falta para interpolar host?",
    "options": [
      "La f antes de las comillas",
      "Un punto y coma",
      "int(host)"
    ],
    "answer": 0,
    "explanation": "Sin f, la cadena contiene literalmente {host}.",
    "code": "host = \"web01\"\nprint(\"Equipo: {host}\")"
  },
  {
    "id": "q04-5",
    "module": 4,
    "type": "fill",
    "text": "Completa para leer un puerto entero.",
    "options": [],
    "answer": [
      "int"
    ],
    "explanation": "int() convierte el texto leído a un entero cuando el formato es válido.",
    "code": "puerto = ____(input(\"Puerto: \"))"
  },
  {
    "id": "q04-6",
    "module": 4,
    "type": "multi",
    "text": "¿Qué argumentos modifican la salida de print()?",
    "options": [
      "sep",
      "end",
      "input",
      "return"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "sep separa argumentos y end define el texto final.",
    "code": ""
  }
]);

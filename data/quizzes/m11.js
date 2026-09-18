"use strict";
Course.quizzes.push(...[
  {
    "id": "q11-1",
    "module": 11,
    "type": "choice",
    "text": "¿Qué modo añade al final?",
    "options": [
      "a",
      "w",
      "r"
    ],
    "answer": 0,
    "explanation": "a conserva el contenido previo y añade al final.",
    "code": ""
  },
  {
    "id": "q11-2",
    "module": 11,
    "type": "boolean",
    "text": "with cierra el archivo al salir del bloque aunque ocurra una excepción.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "La gestión del contexto garantiza la limpieza del recurso.",
    "code": ""
  },
  {
    "id": "q11-3",
    "module": 11,
    "type": "output",
    "text": "¿Qué contenido queda?",
    "options": [
      "B",
      "AB",
      "BA"
    ],
    "answer": 0,
    "explanation": "La segunda apertura con w trunca el contenido anterior.",
    "code": "with open(\"x.txt\", \"w\") as f:\n    f.write(\"A\")\nwith open(\"x.txt\", \"w\") as f:\n    f.write(\"B\")"
  },
  {
    "id": "q11-4",
    "module": 11,
    "type": "error",
    "text": "¿Qué problema hay al leer un archivo inexistente en modo r?",
    "options": [
      "FileNotFoundError",
      "Se crea automáticamente",
      "Devuelve siempre None"
    ],
    "answer": 0,
    "explanation": "El modo lectura exige que el archivo exista.",
    "code": ""
  },
  {
    "id": "q11-5",
    "module": 11,
    "type": "fill",
    "text": "Completa el gestor de contexto.",
    "options": [],
    "answer": [
      "with"
    ],
    "explanation": "with cierra el archivo al terminar el bloque.",
    "code": "____ open(\"logs.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read())"
  },
  {
    "id": "q11-6",
    "module": 11,
    "type": "multi",
    "text": "Selecciona dos afirmaciones correctas.",
    "options": [
      "write no añade un salto de línea por sí solo",
      "w puede sobrescribir contenido",
      "r crea archivos inexistentes",
      "Los archivos virtuales del laboratorio son archivos reales del disco del alumno"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "El salto se incluye explícitamente y w trunca; el laboratorio utiliza memoria virtual.",
    "code": ""
  }
]);

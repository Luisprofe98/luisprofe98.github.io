"use strict";
Course.quizzes.push(...[
  {
    "id": "q12-1",
    "module": 12,
    "type": "choice",
    "text": "¿Qué excepción produce int(\"abc\")?",
    "options": [
      "ValueError",
      "FileNotFoundError",
      "KeyError"
    ],
    "answer": 0,
    "explanation": "El tipo de entrada es aceptable, pero su contenido no representa un entero.",
    "code": ""
  },
  {
    "id": "q12-2",
    "module": 12,
    "type": "boolean",
    "text": "except ValueError captura cualquier excepción.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 1,
    "explanation": "Solo captura ValueError y tipos derivados compatibles.",
    "code": ""
  },
  {
    "id": "q12-3",
    "module": 12,
    "type": "output",
    "text": "¿Qué aparece?",
    "options": [
      "error\nfin",
      "error",
      "2\nfin"
    ],
    "answer": 0,
    "explanation": "La división falla, se captura y después se ejecuta finally.",
    "code": "try:\n    print(2 / 0)\nexcept ZeroDivisionError:\n    print(\"error\")\nfinally:\n    print(\"fin\")"
  },
  {
    "id": "q12-4",
    "module": 12,
    "type": "error",
    "text": "¿Qué falta al validar un puerto?",
    "options": [
      "Comprobar el rango tras convertir",
      "Usar print dos veces",
      "Convertir a bool"
    ],
    "answer": 0,
    "explanation": "int(\"70000\") funciona, pero el valor está fuera de 0–65535.",
    "code": "puerto = int(\"70000\")"
  },
  {
    "id": "q12-5",
    "module": 12,
    "type": "fill",
    "text": "Completa la cláusula de éxito.",
    "options": [],
    "answer": [
      "else"
    ],
    "explanation": "else se ejecuta cuando try termina sin excepción.",
    "code": "try:\n    n = int(\"3\")\nexcept ValueError:\n    print(\"error\")\n____:\n    print(\"correcto\")"
  },
  {
    "id": "q12-6",
    "module": 12,
    "type": "multi",
    "text": "Selecciona prácticas recomendables.",
    "options": [
      "Capturar tipos específicos",
      "Mantener try limitado a la operación arriesgada",
      "Ignorar errores sin registrar ni responder",
      "Devolver siempre un dato inventado al fallar"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "Una gestión explícita evita ocultar fallos no relacionados.",
    "code": ""
  }
]);

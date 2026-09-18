"use strict";
Course.quizzes.push(...[
  {
    "id": "q13-1",
    "module": 13,
    "type": "choice",
    "text": "¿Qué palabra importa un módulo?",
    "options": [
      "import",
      "include",
      "using"
    ],
    "answer": 0,
    "explanation": "import carga un módulo y hace accesible su nombre.",
    "code": ""
  },
  {
    "id": "q13-2",
    "module": 13,
    "type": "boolean",
    "text": "Path(\"nuevo.txt\") crea ese archivo automáticamente.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 1,
    "explanation": "Solo construye una representación de ruta; escribir requiere otra operación.",
    "code": ""
  },
  {
    "id": "q13-3",
    "module": 13,
    "type": "output",
    "text": "¿Qué se muestra?",
    "options": [
      ".csv",
      "archivo",
      ".txt"
    ],
    "answer": 0,
    "explanation": "suffix es la extensión con su punto.",
    "code": "from pathlib import Path\nprint(Path(\"archivo.csv\").suffix)"
  },
  {
    "id": "q13-4",
    "module": 13,
    "type": "error",
    "text": "¿Qué problema puede causar llamar random.py a tu script?",
    "options": [
      "Ocultar el módulo estándar random",
      "Convertir todos los valores en texto",
      "Borrar el intérprete"
    ],
    "answer": 0,
    "explanation": "El nombre local puede entrar en conflicto con el módulo que quieres importar.",
    "code": ""
  },
  {
    "id": "q13-5",
    "module": 13,
    "type": "fill",
    "text": "Completa para importar date.",
    "options": [],
    "answer": [
      "datetime"
    ],
    "explanation": "date pertenece al módulo datetime.",
    "code": "from ____ import date"
  },
  {
    "id": "q13-6",
    "module": 13,
    "type": "multi",
    "text": "Selecciona usos apropiados.",
    "options": [
      "random para simular CPU",
      "pathlib para manejar rutas",
      "random para tokens secretos de producción",
      "os del navegador para gestionar cualquier servidor remoto"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "Simulación y rutas son adecuados; no se prometen seguridad criptográfica ni acceso remoto.",
    "code": ""
  }
]);

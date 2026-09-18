"use strict";
Course.exercises.push(...[
  {
    "id": "e45",
    "module": 12,
    "title": "Conversión segura",
    "statement": "Intenta convertir \"cuatro\" a int. Si falla, muestra Introduce un entero.",
    "concepts": [
      "try",
      "except",
      "ValueError"
    ],
    "hint": "Captura el tipo de error de la conversión.",
    "solution": "try:\n    cantidad = int(\"cuatro\")\n    print(cantidad)\nexcept ValueError:\n    print(\"Introduce un entero\")",
    "explanation": "ValueError describe un valor cuyo formato no puede convertirse.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Introduce un entero",
    "inputs": ""
  },
  {
    "id": "e46",
    "module": 12,
    "title": "Divisor cero",
    "statement": "Con total=0 y activos=5, intenta calcular activos/total y captura ZeroDivisionError mostrando Total no válido.",
    "concepts": [
      "ZeroDivisionError",
      "try"
    ],
    "hint": "Esta práctica busca capturar el error; otra solución podría validar antes.",
    "solution": "total = 0\nactivos = 5\ntry:\n    print(activos / total)\nexcept ZeroDivisionError:\n    print(\"Total no válido\")",
    "explanation": "La excepción evita que continúe la expresión de división.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Total no válido",
    "inputs": ""
  },
  {
    "id": "e47",
    "module": 12,
    "title": "Éxito y finalización",
    "statement": "Convierte \"22\" a int dentro de try. En else muestra Puerto 22; en finally muestra Revisión finalizada. Incluye except ValueError.",
    "concepts": [
      "else",
      "finally"
    ],
    "hint": "El mensaje de éxito pertenece a else.",
    "solution": "try:\n    puerto = int(\"22\")\nexcept ValueError:\n    print(\"Puerto inválido\")\nelse:\n    print(f\"Puerto {puerto}\")\nfinally:\n    print(\"Revisión finalizada\")",
    "explanation": "else se ejecuta solo sin fallo en try y finally cierra ambos caminos.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Puerto 22\nRevisión finalizada",
    "inputs": ""
  },
  {
    "id": "e48",
    "module": 12,
    "title": "Lector de puertos robusto",
    "statement": "Define convertir_puerto(texto) que convierta a int y lance ValueError(\"Fuera de rango\") si no está entre 0 y 65535. Pruébala con \"70000\" y muestra el mensaje capturado.",
    "concepts": [
      "raise",
      "funciones",
      "validación"
    ],
    "hint": "Primero convierte; después comprueba el rango.",
    "solution": "def convertir_puerto(texto):\n    puerto = int(texto)\n    if not 0 <= puerto <= 65535:\n        raise ValueError(\"Fuera de rango\")\n    return puerto\n\ntry:\n    print(convertir_puerto(\"70000\"))\nexcept ValueError as error:\n    print(error)",
    "explanation": "La función comunica el fallo al llamador en vez de inventar un puerto válido.",
    "level": "Avanzado",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Fuera de rango",
    "inputs": ""
  }
]);

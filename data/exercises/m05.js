"use strict";
Course.exercises.push(...[
  {
    "id": "e17",
    "module": 5,
    "title": "Alerta de CPU",
    "statement": "Con cpu=76 muestra AVISO si cpu >= 70 y NORMAL en caso contrario.",
    "concepts": [
      "if",
      "else"
    ],
    "hint": "El umbral incluye el 70.",
    "solution": "cpu = 76\nif cpu >= 70:\n    print(\"AVISO\")\nelse:\n    print(\"NORMAL\")",
    "explanation": "Solo se ejecuta una de las dos ramas.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "AVISO",
    "inputs": ""
  },
  {
    "id": "e18",
    "module": 5,
    "title": "Clasificar puertos",
    "statement": "Con puerto=443, valida 0–65535. Clasifica como 0–1023, 1024–49151 o 49152–65535. Si no está en rango, muestra Inválido.",
    "concepts": [
      "if",
      "elif",
      "rangos"
    ],
    "hint": "Comprueba primero la validez y después los límites superiores.",
    "solution": "puerto = 443\nif not 0 <= puerto <= 65535:\n    print(\"Inválido\")\nelif puerto <= 1023:\n    print(\"0–1023\")\nelif puerto <= 49151:\n    print(\"1024–49151\")\nelse:\n    print(\"49152–65535\")",
    "explanation": "Al descartar rangos anteriores, cada elif solo necesita el límite superior.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "0–1023",
    "inputs": ""
  },
  {
    "id": "e19",
    "module": 5,
    "title": "Longitud de una clave ficticia",
    "statement": "Con clave=\"Practica-ASIR\", muestra Longitud suficiente si tiene al menos 12 caracteres. En caso contrario muestra Demasiado corta. No uses una contraseña real.",
    "concepts": [
      "len",
      "comparación",
      "if"
    ],
    "hint": "len() devuelve el número de caracteres.",
    "solution": "clave = \"Practica-ASIR\"\nif len(clave) >= 12:\n    print(\"Longitud suficiente\")\nelse:\n    print(\"Demasiado corta\")",
    "explanation": "Solo se comprueba longitud; no equivale a una validación de seguridad completa.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "Longitud suficiente",
    "inputs": ""
  },
  {
    "id": "e20",
    "module": 5,
    "title": "Estado de un nodo",
    "statement": "Con encendido=True, servicio=True y mantenimiento=True, muestra MANTENIMIENTO antes que cualquier otro estado. Sin mantenimiento, muestra ONLINE si equipo y servicio están activos; si no, OFFLINE.",
    "concepts": [
      "prioridad",
      "and",
      "elif"
    ],
    "hint": "El mantenimiento tiene prioridad en el enunciado.",
    "solution": "encendido = True\nservicio = True\nmantenimiento = True\nif mantenimiento:\n    print(\"MANTENIMIENTO\")\nelif encendido and servicio:\n    print(\"ONLINE\")\nelse:\n    print(\"OFFLINE\")",
    "explanation": "Ordenar las ramas refleja las reglas del negocio.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "MANTENIMIENTO",
    "inputs": ""
  }
]);

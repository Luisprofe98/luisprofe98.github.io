"use strict";
Course.exercises.push(...[
  {
    "id": "e13",
    "module": 4,
    "title": "Presentación del host",
    "statement": "Pide el nombre de un equipo y muestra Equipo registrado: seguido del nombre. Prueba con aula01.",
    "concepts": [
      "input",
      "f-string"
    ],
    "hint": "Guarda el resultado de input() en una variable.",
    "solution": "host = input(\"Host: \")\nprint(f\"Equipo registrado: {host}\")",
    "explanation": "La f-string inserta el texto leído.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": null,
    "inputs": "aula01"
  },
  {
    "id": "e14",
    "module": 4,
    "title": "Temperatura del rack",
    "statement": "Pide una temperatura en Celsius, conviértela a Fahrenheit con C*9/5+32 y muéstrala con un decimal. Prueba 25.",
    "concepts": [
      "float",
      "input",
      "f-string"
    ],
    "hint": "Convierte a float y utiliza :.1f.",
    "solution": "celsius = float(input(\"Celsius: \"))\nfahrenheit = celsius * 9 / 5 + 32\nprint(f\"{fahrenheit:.1f} F\")",
    "explanation": "25 Celsius equivalen a 77.0 F en esta fórmula.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": null,
    "inputs": "25"
  },
  {
    "id": "e15",
    "module": 4,
    "title": "Resumen del disco",
    "statement": "Con host=\"backup01\", usados=75 y total=200, muestra backup01: 37.50% ocupado.",
    "concepts": [
      "porcentaje",
      "f-string"
    ],
    "hint": "Calcula el porcentaje y usa dos decimales.",
    "solution": "host = \"backup01\"\nusados = 75\ntotal = 200\nprint(f\"{host}: {usados / total * 100:.2f}% ocupado\")",
    "explanation": "La expresión se calcula dentro de las llaves y el formato decide los decimales.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "backup01: 37.50% ocupado",
    "inputs": ""
  },
  {
    "id": "e16",
    "module": 4,
    "title": "Fila de configuración",
    "statement": "Con host=\"web01\", puerto=443 y activo=True, muestra web01;443;True usando sep en print().",
    "concepts": [
      "print",
      "sep",
      "salida"
    ],
    "hint": "sep cambia el espacio predeterminado entre argumentos.",
    "solution": "host = \"web01\"\npuerto = 443\nactivo = True\nprint(host, puerto, activo, sep=\";\")",
    "explanation": "sep=\";\" delimita las columnas con punto y coma.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "web01;443;True",
    "inputs": ""
  }
]);

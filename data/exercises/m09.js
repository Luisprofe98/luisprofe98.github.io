"use strict";
Course.exercises.push(...[
  {
    "id": "e33",
    "module": 9,
    "title": "Convertir capacidad",
    "statement": "Define gib_a_mib(gib) y muestra el resultado para 6. La función debe devolver, no imprimir, el cálculo.",
    "concepts": [
      "def",
      "return"
    ],
    "hint": "Multiplica por 1024 dentro de la función.",
    "solution": "def gib_a_mib(gib):\n    return gib * 1024\n\nprint(gib_a_mib(6))",
    "explanation": "El retorno permite usar el resultado en otras expresiones.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "6144",
    "inputs": ""
  },
  {
    "id": "e34",
    "module": 9,
    "title": "Estado reutilizable",
    "statement": "Define estado(nombre, activo) que devuelva nombre: ONLINE o nombre: OFFLINE. Pruébala con db01 y False.",
    "concepts": [
      "funciones",
      "if",
      "return"
    ],
    "hint": "Un return en cada camino evita resultados None.",
    "solution": "def estado(nombre, activo):\n    if activo:\n        return f\"{nombre}: ONLINE\"\n    return f\"{nombre}: OFFLINE\"\n\nprint(estado(\"db01\", False))",
    "explanation": "La función no consulta red: transforma los datos de entrada.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "db01: OFFLINE",
    "inputs": ""
  },
  {
    "id": "e35",
    "module": 9,
    "title": "Umbral configurable",
    "statement": "Define alerta(cpu, limite=80). Debe devolver True si cpu >= limite. Muestra alerta(75) y alerta(75, limite=70).",
    "concepts": [
      "predeterminados",
      "argumentos nombrados"
    ],
    "hint": "La segunda llamada sustituye el valor por defecto.",
    "solution": "def alerta(cpu, limite=80):\n    return cpu >= limite\n\nprint(alerta(75))\nprint(alerta(75, limite=70))",
    "explanation": "La primera usa 80; la segunda usa 70.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "False\nTrue",
    "inputs": ""
  },
  {
    "id": "e36",
    "module": 9,
    "title": "Disponibilidad",
    "statement": "Define disponibilidad(minutos_activos, minutos_totales). Devuelve 0.0 si total <= 0; en otro caso devuelve el porcentaje. Prueba 1430 y 1440, mostrando dos decimales.",
    "concepts": [
      "funciones",
      "validación",
      "return"
    ],
    "hint": "Descarta el denominador inválido antes de dividir.",
    "solution": "def disponibilidad(minutos_activos, minutos_totales):\n    if minutos_totales <= 0:\n        return 0.0\n    return minutos_activos / minutos_totales * 100\n\nprint(f\"{disponibilidad(1430, 1440):.2f}%\")",
    "explanation": "La comprobación evita dividir por cero. En un sistema real también se validarían límites de minutos_activos.",
    "level": "Avanzado",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "99.31%",
    "inputs": ""
  }
]);

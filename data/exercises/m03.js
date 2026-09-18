"use strict";
Course.exercises.push(...[
  {
    "id": "e09",
    "module": 3,
    "title": "De GiB a MiB",
    "statement": "Convierte 12 GiB a MiB usando un factor de 1024.",
    "concepts": [
      "multiplicación",
      "unidades"
    ],
    "hint": "No uses 1000 para unidades binarias.",
    "solution": "gib = 12\nprint(gib * 1024)",
    "explanation": "GiB y MiB son unidades binarias con factor 1024.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "12288",
    "inputs": ""
  },
  {
    "id": "e10",
    "module": 3,
    "title": "Disco ocupado",
    "statement": "Calcula qué porcentaje representan 180 GiB usados en un disco de 600 GiB.",
    "concepts": [
      "división",
      "porcentaje"
    ],
    "hint": "Divide usados entre total y multiplica por 100.",
    "solution": "usados = 180\ntotal = 600\nprint((usados / total) * 100)",
    "explanation": "La división produce una proporción; al multiplicar por 100 se obtiene el porcentaje.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "30.0",
    "inputs": ""
  },
  {
    "id": "e11",
    "module": 3,
    "title": "Reparto de copias",
    "statement": "Reparte 29 copias en lotes de 6. Muestra lotes completos y copias sobrantes, en ese orden.",
    "concepts": [
      "división entera",
      "resto"
    ],
    "hint": "Usa // y %.",
    "solution": "copias = 29\nprint(copias // 6)\nprint(copias % 6)",
    "explanation": "Hay cuatro lotes completos y sobran cinco copias.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "4\n5",
    "inputs": ""
  },
  {
    "id": "e12",
    "module": 3,
    "title": "Umbral combinado",
    "statement": "Con cpu=82, ram=65 y mantenimiento=False, muestra si debe alertarse: CPU o RAM de al menos 80, pero nunca durante mantenimiento.",
    "concepts": [
      "or",
      "and",
      "not",
      "precedencia"
    ],
    "hint": "Agrupa el or y combínalo con not mantenimiento.",
    "solution": "cpu = 82\nram = 65\nmantenimiento = False\nprint((cpu >= 80 or ram >= 80) and not mantenimiento)",
    "explanation": "Primero se comprueba la sobrecarga; después se exige que no haya mantenimiento.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "True",
    "inputs": ""
  }
]);

"use strict";
Course.exercises.push(...[
  {
    "id": "e37",
    "module": 10,
    "title": "Normalizar nombres",
    "statement": "Normaliza \"  BACKUP01\\n\" quitando espacios y el salto de línea y pasando a minúsculas.",
    "concepts": [
      "strip",
      "lower"
    ],
    "hint": "Encadena ambos métodos y muestra el resultado.",
    "solution": "host = \"  BACKUP01\\n\"\nprint(host.strip().lower())",
    "explanation": "Cada método devuelve una nueva cadena.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "backup01",
    "inputs": ""
  },
  {
    "id": "e38",
    "module": 10,
    "title": "Errores exactos",
    "statement": "Cuenta las líneas cuyo primer campo sea ERROR: [\"INFO inicio\", \"ERROR disco\", \"WARNING texto ERROR\", \"ERROR red\"].",
    "concepts": [
      "split",
      "strings",
      "for"
    ],
    "hint": "No basta buscar ERROR en cualquier posición.",
    "solution": "logs = [\"INFO inicio\", \"ERROR disco\", \"WARNING texto ERROR\", \"ERROR red\"]\nerrores = 0\nfor linea in logs:\n    if linea.split()[0] == \"ERROR\":\n        errores += 1\nprint(errores)",
    "explanation": "Se clasifica por el nivel, no por palabras del mensaje.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "2",
    "inputs": ""
  },
  {
    "id": "e39",
    "module": 10,
    "title": "Extraer dominio",
    "statement": "Con correo=\"admin@example.test\", separa por @ y muestra solo example.test. El enunciado garantiza exactamente una @.",
    "concepts": [
      "split",
      "índices"
    ],
    "hint": "El dominio es el segundo campo.",
    "solution": "correo = \"admin@example.test\"\nusuario, dominio = correo.split(\"@\")\nprint(dominio)",
    "explanation": "La garantía de formato permite desempaquetar dos valores.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "example.test",
    "inputs": ""
  },
  {
    "id": "e40",
    "module": 10,
    "title": "Cambiar entorno",
    "statement": "Con ruta=\"/srv/pruebas/web/config.ini\", sustituye solo la primera aparición de /pruebas/ por /produccion/ y muestra la nueva ruta. Solo transforma texto.",
    "concepts": [
      "replace",
      "rutas"
    ],
    "hint": "replace admite un tercer argumento para limitar cambios.",
    "solution": "ruta = \"/srv/pruebas/web/config.ini\"\nnueva = ruta.replace(\"/pruebas/\", \"/produccion/\", 1)\nprint(nueva)",
    "explanation": "La ruta se modifica como texto; no se mueve ni escribe ningún archivo.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "/srv/produccion/web/config.ini",
    "inputs": ""
  }
]);

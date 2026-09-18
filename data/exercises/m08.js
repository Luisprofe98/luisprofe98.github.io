"use strict";
Course.exercises.push(...[
  {
    "id": "e29",
    "module": 8,
    "title": "Desempaquetar un endpoint",
    "statement": "Crea (\"192.0.2.25\", 22), desempaqueta sus componentes en ip y puerto y muéstralos.",
    "concepts": [
      "tuplas",
      "desempaquetado"
    ],
    "hint": "Deben existir tantos nombres como elementos.",
    "solution": "endpoint = (\"192.0.2.25\", 22)\nip, puerto = endpoint\nprint(ip, puerto)",
    "explanation": "La asignación múltiple reparte los valores de la tupla.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "192.0.2.25 22",
    "inputs": ""
  },
  {
    "id": "e30",
    "module": 8,
    "title": "Usuarios sin duplicados",
    "statement": "De [\"ana\", \"luis\", \"ana\", \"marta\", \"luis\"] obtiene una lista ordenada de usuarios únicos.",
    "concepts": [
      "set",
      "sorted"
    ],
    "hint": "Convierte a set y después ordena.",
    "solution": "usuarios = [\"ana\", \"luis\", \"ana\", \"marta\", \"luis\"]\nprint(sorted(set(usuarios)))",
    "explanation": "El conjunto elimina repeticiones; sorted hace determinista la presentación.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "['ana', 'luis', 'marta']",
    "inputs": ""
  },
  {
    "id": "e31",
    "module": 8,
    "title": "Servicios comunes",
    "statement": "Con a={\"ssh\", \"dns\"} y b={\"dns\", \"https\"}, muestra ordenados los servicios comunes y los que faltan en a respecto a b.",
    "concepts": [
      "intersección",
      "diferencia"
    ],
    "hint": "Usa a & b y b - a.",
    "solution": "a = {\"ssh\", \"dns\"}\nb = {\"dns\", \"https\"}\nprint(sorted(a & b))\nprint(sorted(b - a))",
    "explanation": "La dirección de la diferencia importa: b - a muestra lo requerido por b y ausente en a.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "['dns']\n['https']",
    "inputs": ""
  },
  {
    "id": "e32",
    "module": 8,
    "title": "Inventario mínimo",
    "statement": "Crea un diccionario web01 con ip=\"192.0.2.10\" y ram=16. Actualiza ram a 32 y consulta so con alternativa \"sin dato\". Muestra RAM y SO.",
    "concepts": [
      "dict",
      "get",
      "actualización"
    ],
    "hint": "El nombre de variable puede ser equipo; web01 es el hostname del registro.",
    "solution": "equipo = {\"host\": \"web01\", \"ip\": \"192.0.2.10\", \"ram\": 16}\nequipo[\"ram\"] = 32\nprint(equipo[\"ram\"])\nprint(equipo.get(\"so\", \"sin dato\"))",
    "explanation": "get() permite consultar un campo opcional sin KeyError.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "32\nsin dato",
    "inputs": ""
  }
]);

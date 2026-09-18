"use strict";
Course.predictions = [
  {
    "id": "p01",
    "module": 1,
    "title": "Separadores de consola",
    "code": "print(\"web\", \"01\", sep=\"-\")",
    "output": "web-01",
    "explanation": "sep sustituye el espacio entre argumentos por un guion."
  },
  {
    "id": "p02",
    "module": 2,
    "title": "Texto frente a número",
    "code": "puerto = \"22\"\nprint(puerto * 2)",
    "output": "2222",
    "explanation": "Multiplicar una cadena por un entero repite la cadena."
  },
  {
    "id": "p03",
    "module": 3,
    "title": "El resto del lote",
    "code": "print(17 // 5, 17 % 5)",
    "output": "3 2",
    "explanation": "Hay tres grupos de cinco y sobran dos unidades."
  },
  {
    "id": "p04",
    "module": 4,
    "title": "Dos decimales",
    "code": "uso = 25\nprint(f\"Disco: {uso:.2f}%\")",
    "output": "Disco: 25.00%",
    "explanation": "El formato .2f presenta dos posiciones decimales."
  },
  {
    "id": "p05",
    "module": 5,
    "title": "Prioridad de las ramas",
    "code": "cpu = 80\nif cpu > 80:\n    print(\"ALTO\")\nelse:\n    print(\"NORMAL\")",
    "output": "NORMAL",
    "explanation": "El operador > no incluye la igualdad; 80 no es mayor que 80."
  },
  {
    "id": "p06",
    "module": 6,
    "title": "Acumulador",
    "code": "total = 0\nfor n in range(1, 4):\n    total += n\nprint(total)",
    "output": "6",
    "explanation": "El recorrido suma 1, 2 y 3; el final 4 queda excluido."
  },
  {
    "id": "p07",
    "module": 7,
    "title": "El último de la fila",
    "code": "cola = [\"web\", \"db\", \"dns\"]\nprint(cola.pop())\nprint(len(cola))",
    "output": "dns\n2",
    "explanation": "pop sin índice extrae el último elemento y modifica la lista."
  },
  {
    "id": "p08",
    "module": 8,
    "title": "Claves repetidas",
    "code": "equipo = {\"ram\": 8, \"ram\": 16}\nprint(equipo[\"ram\"])",
    "output": "16",
    "explanation": "Una clave es única; en un literal repetido prevalece su último valor."
  },
  {
    "id": "p09",
    "module": 9,
    "title": "Una variable local",
    "code": "cpu = 10\ndef cambiar():\n    cpu = 80\n    return cpu\nprint(cambiar())\nprint(cpu)",
    "output": "80\n10",
    "explanation": "La asignación dentro de cambiar crea una variable local, no modifica la exterior."
  },
  {
    "id": "p10",
    "module": 10,
    "title": "Limpieza encadenada",
    "code": "print(\"  DNS01  \".strip().lower()[:3])",
    "output": "dns",
    "explanation": "Se limpian extremos, se pasa a minúsculas y se toman las tres primeras posiciones."
  },
  {
    "id": "p11",
    "module": 11,
    "title": "Contenido añadido",
    "code": "with open(\"prediccion.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"A\")\nwith open(\"prediccion.txt\", \"a\", encoding=\"utf-8\") as f:\n    f.write(\"B\")\nwith open(\"prediccion.txt\", \"r\", encoding=\"utf-8\") as f:\n    print(f.read())",
    "output": "AB",
    "explanation": "a añade sin truncar lo escrito anteriormente."
  },
  {
    "id": "p12",
    "module": 12,
    "title": "Cuando todo va bien",
    "code": "try:\n    n = int(\"4\")\nexcept ValueError:\n    print(\"error\")\nelse:\n    print(n + 1)\nfinally:\n    print(\"fin\")",
    "output": "5\nfin",
    "explanation": "La conversión funciona; se ejecuta else y después finally."
  },
  {
    "id": "p13",
    "module": 13,
    "title": "Partes de una ruta",
    "code": "from pathlib import Path\nruta = Path(\"datos/equipos.csv\")\nprint(ruta.stem)",
    "output": "equipos",
    "explanation": "stem devuelve el nombre sin su última extensión."
  },
  {
    "id": "p14",
    "module": 14,
    "title": "Datos válidos únicos",
    "code": "from ipaddress import IPv4Address\nips = {IPv4Address(\"192.0.2.1\"), IPv4Address(\"192.0.2.1\")}\nprint(len(ips))",
    "output": "1",
    "explanation": "Dos objetos de la misma dirección se deduplican dentro del conjunto."
  }
];

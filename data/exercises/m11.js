"use strict";
Course.exercises.push(...[
  {
    "id": "e41",
    "module": 11,
    "title": "Leer usuarios",
    "statement": "Lee usuarios.txt línea a línea y muestra los nombres sin saltos duplicados. El laboratorio incluye ana, luis y marta.",
    "concepts": [
      "with",
      "open",
      "lectura"
    ],
    "hint": "Recorre directamente el objeto archivo.",
    "solution": "with open(\"usuarios.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    for linea in archivo:\n        print(linea.strip())",
    "explanation": "strip elimina el salto original antes de que print añada el suyo.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "ana\nluis\nmarta",
    "inputs": ""
  },
  {
    "id": "e42",
    "module": 11,
    "title": "Crear configuración ficticia",
    "statement": "Crea ejemplo.ini con dos líneas: host=web01 y puerto=443. Después muestra su contenido.",
    "concepts": [
      "write",
      "with",
      "encoding"
    ],
    "hint": "Incluye \\n entre líneas.",
    "solution": "with open(\"ejemplo.ini\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"host=web01\\npuerto=443\\n\")\nwith open(\"ejemplo.ini\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "explanation": "Se escribe un archivo de prácticas en la memoria virtual.",
    "level": "Básico",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "host=web01\npuerto=443",
    "inputs": ""
  },
  {
    "id": "e43",
    "module": 11,
    "title": "Añadir un registro",
    "statement": "Crea historial.txt con INICIO y luego, en una apertura distinta en modo a, añade FIN. Muestra ambas líneas.",
    "concepts": [
      "append",
      "modos"
    ],
    "hint": "El segundo open usa a, no w.",
    "solution": "with open(\"historial.txt\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"INICIO\\n\")\nwith open(\"historial.txt\", \"a\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"FIN\\n\")\nwith open(\"historial.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "explanation": "El añadido conserva INICIO y escribe FIN al final.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "INICIO\nFIN",
    "inputs": ""
  },
  {
    "id": "e44",
    "module": 11,
    "title": "Exportar inventario",
    "statement": "Escribe inventario_nuevo.csv con cabecera host;ram y filas web01;16 y db01;32. Lee después el archivo y muéstralo.",
    "concepts": [
      "archivos",
      "bucles",
      "f-string"
    ],
    "hint": "Usa una lista de tuplas para generar las filas.",
    "solution": "equipos = [(\"web01\", 16), (\"db01\", 32)]\nwith open(\"inventario_nuevo.csv\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"host;ram\\n\")\n    for host, ram in equipos:\n        archivo.write(f\"{host};{ram}\\n\")\nwith open(\"inventario_nuevo.csv\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "explanation": "Este formato simple es válido porque los campos no contienen delimitadores ni saltos internos.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "host;ram\nweb01;16\ndb01;32",
    "inputs": ""
  }
]);

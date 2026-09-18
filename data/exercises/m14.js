"use strict";
Course.exercises.push(...[
  {
    "id": "e53",
    "module": 14,
    "title": "Validar IPv4",
    "statement": "Valida [\"192.0.2.1\", \"256.2.3.4\", \"198.51.100.8\"] usando IPv4Address. Muestra válida o inválida junto a cada cadena. No hagas conexiones.",
    "concepts": [
      "ipaddress",
      "try",
      "for"
    ],
    "hint": "Captura ValueError por cada elemento, no fuera de todo el bucle.",
    "solution": "from ipaddress import IPv4Address\ndatos = [\"192.0.2.1\", \"256.2.3.4\", \"198.51.100.8\"]\nfor dato in datos:\n    try:\n        IPv4Address(dato)\n    except ValueError:\n        print(f\"inválida: {dato}\")\n    else:\n        print(f\"válida: {dato}\")",
    "explanation": "Cada dato inválido se registra y el resto sigue procesándose.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "válida: 192.0.2.1\ninválida: 256.2.3.4\nválida: 198.51.100.8",
    "inputs": ""
  },
  {
    "id": "e54",
    "module": 14,
    "title": "Usuarios ficticios",
    "statement": "Genera los nombres alumno01 a alumno05 y escríbelos, uno por línea, en altas_simuladas.txt. Muestra el contenido. No crees cuentas reales.",
    "concepts": [
      "range",
      "f-string",
      "archivos"
    ],
    "hint": "El formato :02d rellena con ceros hasta dos posiciones.",
    "solution": "with open(\"altas_simuladas.txt\", \"w\", encoding=\"utf-8\") as archivo:\n    for numero in range(1, 6):\n        archivo.write(f\"alumno{numero:02d}\\n\")\nwith open(\"altas_simuladas.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "explanation": "Se genera únicamente un archivo de texto con nombres de prueba.",
    "level": "Intermedio",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "alumno01\nalumno02\nalumno03\nalumno04\nalumno05",
    "inputs": ""
  },
  {
    "id": "e55",
    "module": 14,
    "title": "Selección de archivos",
    "statement": "Crea un directorio virtual muestras con a.txt, b.csv y c.txt. Muestra ordenados solo los nombres de archivos .txt. No borres ni muevas nada.",
    "concepts": [
      "pathlib",
      "iterdir",
      "suffix"
    ],
    "hint": "Crea datos con write_text y filtra por is_file y suffix.",
    "solution": "from pathlib import Path\ncarpeta = Path(\"muestras\")\ncarpeta.mkdir(exist_ok=True)\nfor nombre in [\"a.txt\", \"b.csv\", \"c.txt\"]:\n    (carpeta / nombre).write_text(\"dato\\n\", encoding=\"utf-8\")\nfor ruta in sorted(carpeta.iterdir()):\n    if ruta.is_file() and ruta.suffix == \".txt\":\n        print(ruta.name)",
    "explanation": "Se trabaja en una carpeta creada para la práctica, no sobre archivos de producción.",
    "level": "Avanzado",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "a.txt\nc.txt",
    "inputs": ""
  },
  {
    "id": "e56",
    "module": 14,
    "title": "Informe de niveles",
    "statement": "Analiza [\"INFO inicio\", \"ERROR disco\", \"WARNING cpu\", \"ERROR red\", \"\"]. Cuenta cada nivel conocido, ignora vacíos y muestra INFO: 1, WARNING: 1 y ERROR: 2, una línea por nivel.",
    "concepts": [
      "dict",
      "split",
      "bucles",
      "validación"
    ],
    "hint": "Inicializa un contador por nivel y comprueba que split no esté vacío.",
    "solution": "logs = [\"INFO inicio\", \"ERROR disco\", \"WARNING cpu\", \"ERROR red\", \"\"]\nconteo = {\"INFO\": 0, \"WARNING\": 0, \"ERROR\": 0}\nfor linea in logs:\n    partes = linea.split(maxsplit=1)\n    if partes and partes[0] in conteo:\n        conteo[partes[0]] += 1\nfor nivel, cantidad in conteo.items():\n    print(f\"{nivel}: {cantidad}\")",
    "explanation": "La condición usa cortocircuito para no acceder al primer elemento de una lista vacía.",
    "level": "Avanzado",
    "starter": "# Escribe tu solución aquí\n",
    "expected": "INFO: 1\nWARNING: 1\nERROR: 2",
    "inputs": ""
  }
]);

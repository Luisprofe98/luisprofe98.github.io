"use strict";
Course.lessons.push(...[
  {
    "id": "m14-l1",
    "module": 14,
    "title": "Validar y transformar datos de práctica",
    "objective": "Diseñar una pequeña tubería de entrada, proceso y salida.",
    "body": [
      "Una automatización sencilla separa tres fases: leer datos, transformarlos y producir un resultado. Antes de programar, define el formato de entrada, los casos válidos y lo que debe ocurrir con líneas vacías, duplicadas o incorrectas.",
      "Una dirección con tres puntos no necesariamente es una IPv4 válida. La biblioteca estándar ipaddress ya valida direcciones. IPv4Address(texto) acepta direcciones IPv4 válidas o genera ValueError cuando el dato no cumple el formato.",
      "Validar una dirección no demuestra que exista un equipo, que responda o que sea seguro conectarse. Estos ejemplos solo procesan cadenas. Para usuarios ficticios, genera nombres sin crear cuentas reales en el sistema operativo."
    ],
    "syntax": "for dato in entradas:\n    validar(dato)\n    transformar(dato)\n    registrar(resultado)",
    "code": "from ipaddress import IPv4Address\n\ndatos = [\"192.0.2.10\", \"999.1.1.1\", \"198.51.100.7\"]\nfor dato in datos:\n    try:\n        ip = IPv4Address(dato)\n    except ValueError:\n        print(f\"Inválida: {dato}\")\n    else:\n        print(f\"Válida: {ip}\")",
    "lineNotes": [
      "Línea 1: importa el validador de la biblioteca estándar.",
      "Línea 2: separa importaciones y datos.",
      "Línea 3: mezcla casos correctos e incorrectos.",
      "Línea 4: recorre cada cadena.",
      "Líneas 5–8: captura formatos no válidos sin detener el resto.",
      "Líneas 9–10: registra las direcciones bien formadas."
    ],
    "asir": "usuarios = []\nfor numero in range(1, 6):\n    usuarios.append(f\"alumno{numero:02d}\")\nprint(\"\\n\".join(usuarios))",
    "errors": [
      "Contar puntos no valida el rango de los octetos.",
      "Una IP bien formada no confirma conectividad ni existencia.",
      "No incluyas acciones sobre cuentas reales en prácticas de generación de nombres."
    ],
    "quick": "Valida 192.0.2.30 con IPv4Address y muestra Formato correcto si no hay error.",
    "answer": "from ipaddress import IPv4Address\ntry:\n    IPv4Address(\"192.0.2.30\")\nexcept ValueError:\n    print(\"Formato incorrecto\")\nelse:\n    print(\"Formato correcto\")",
    "terms": [
      "IP",
      "validación",
      "usuarios",
      "automatización"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m14-l2",
    "module": 14,
    "title": "Del script al informe",
    "objective": "Combinar funciones, archivos y comprobaciones en un flujo completo.",
    "body": [
      "Empieza en una carpeta de prácticas y con datos de ejemplo. La primera versión debe ser una simulación: enumera lo que haría sin borrar, mover ni modificar archivos del sistema. Una salida clara permite revisar el resultado antes de cualquier uso real.",
      "Para analizar un log de nivel al principio de cada línea, separa con split(maxsplit=1), descarta líneas vacías y cuenta niveles conocidos. Conviene conservar también un contador de registros desconocidos en lugar de perderlos silenciosamente.",
      "Genera un informe nuevo, no sobrescribas el archivo de origen. Prueba al menos una entrada normal, una vacía y otra incorrecta. Divide el trabajo en funciones cuando una pieza tenga un nombre claro: contar_niveles, validar_ip o escribir_informe."
    ],
    "syntax": "datos = leer_origen()\nresumen = analizar(datos)\nescribir_informe(resumen)",
    "code": "from pathlib import Path\n\ncarpeta = Path(\".\")\nfor ruta in sorted(carpeta.iterdir()):\n    if ruta.is_file() and ruta.suffix == \".txt\":\n        print(f\"SIMULACIÓN: revisar {ruta.name}\")",
    "lineNotes": [
      "Línea 1: importa Path.",
      "Línea 2: separa importaciones.",
      "Línea 3: representa el directorio de trabajo de prácticas.",
      "Línea 4: recorre entradas con presentación ordenada.",
      "Línea 5: selecciona solo archivos .txt.",
      "Línea 6: informa de una intención sin modificar el archivo."
    ],
    "asir": "conteo = {\"INFO\": 0, \"WARNING\": 0, \"ERROR\": 0}\nwith open(\"logs.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    for linea in archivo:\n        partes = linea.split(maxsplit=1)\n        if partes and partes[0] in conteo:\n            conteo[partes[0]] += 1\nwith open(\"resumen_logs.txt\", \"w\", encoding=\"utf-8\") as salida:\n    for nivel, cantidad in conteo.items():\n        salida.write(f\"{nivel}: {cantidad}\\n\")\nprint(conteo)",
    "errors": [
      "No pruebes scripts nuevos sobre rutas reales con información importante.",
      "No sobrescribas la fuente al generar un informe.",
      "Un programa que funciona con un ejemplo necesita también pruebas de casos límite."
    ],
    "quick": "Cuenta ERROR en [\"INFO inicio\", \"ERROR disco\", \"\", \"ERROR red\"] sin fallar con la línea vacía.",
    "answer": "errores = 0\nfor linea in [\"INFO inicio\", \"ERROR disco\", \"\", \"ERROR red\"]:\n    partes = linea.split(maxsplit=1)\n    if partes and partes[0] == \"ERROR\":\n        errores += 1\nprint(errores)",
    "terms": [
      "automatización",
      "informes",
      "logs",
      "pathlib",
      "simulación"
    ],
    "note": "",
    "minutes": 25
  }
]);

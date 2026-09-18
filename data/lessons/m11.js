"use strict";
Course.lessons.push(...[
  {
    "id": "m11-l1",
    "module": 11,
    "title": "Abrir y leer con with",
    "objective": "Leer un archivo de texto y cerrar el recurso correctamente.",
    "body": [
      "open(ruta, modo, encoding=\"utf-8\") abre un archivo. El modo \"r\" lee y requiere que exista. with gestiona el contexto y cierra el archivo al salir del bloque, incluso si ocurre una excepción dentro.",
      "read() obtiene todo el contenido como texto. También puedes recorrer el objeto archivo línea a línea, una opción adecuada para logs grandes. Cada línea normalmente conserva su salto final; strip() puede retirarlo cuando corresponda.",
      "Una ruta relativa se interpreta respecto al directorio de trabajo, no necesariamente al directorio del script. En este laboratorio los archivos viven en un sistema virtual de memoria y no son archivos de tu equipo. Los ejemplos de lectura incluyen datos de muestra."
    ],
    "syntax": "with open(\"archivo.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    contenido = archivo.read()",
    "code": "with open(\"logs.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    for linea in archivo:\n        print(linea.strip())",
    "lineNotes": [
      "Línea 1: abre logs.txt en lectura y garantiza el cierre al terminar el bloque.",
      "Línea 2: obtiene una línea en cada vuelta sin leer todo el archivo de una vez.",
      "Línea 3: muestra la línea sin duplicar su salto final."
    ],
    "asir": "errores = 0\nwith open(\"logs.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    for linea in archivo:\n        if linea.startswith(\"ERROR \"):\n            errores += 1\nprint(f\"Errores encontrados: {errores}\")",
    "errors": [
      "El modo r falla con FileNotFoundError si falta el archivo.",
      "La codificación debe corresponder a los datos del archivo.",
      "Una ruta relativa depende del directorio de trabajo."
    ],
    "quick": "Lee usuarios.txt completo y muéstralo sin añadir un salto final extra.",
    "answer": "with open(\"usuarios.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "terms": [
      "open",
      "read",
      "with",
      "lectura",
      "encoding"
    ],
    "note": "Datos virtuales precargados: logs.txt, usuarios.txt, config.ini e inventario.csv. Se restauran al reiniciar el motor. Fuera del laboratorio, crea esos archivos en una carpeta de prácticas.",
    "minutes": 20
  },
  {
    "id": "m11-l2",
    "module": 11,
    "title": "Escribir sin perder datos por accidente",
    "objective": "Distinguir creación, sobrescritura y añadido.",
    "body": [
      "El modo \"w\" crea un archivo o trunca el existente: su contenido anterior se pierde al abrirlo. \"a\" añade al final y también crea el archivo si falta. \"x\" crea exclusivamente y falla si el nombre ya existe; \"b\" indica datos binarios.",
      "write(texto) escribe exactamente el texto entregado y no añade un salto de línea automático. Incluye \\n para separar registros. Para guardar números primero conviértelos o usa una f-string.",
      "Trabaja solo con archivos ficticios y nombres de práctica. Escribir un archivo no equivale a hacer una copia de seguridad segura. En el laboratorio todos estos cambios son virtuales: puedes descargar los archivos de texto creados desde la zona Archivos virtuales."
    ],
    "syntax": "with open(\"informe.txt\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"Registro\\n\")",
    "code": "with open(\"informe.txt\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"INFORME DE PRÁCTICAS\\n\")\nwith open(\"informe.txt\", \"a\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"web01: ONLINE\\n\")\nwith open(\"informe.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "lineNotes": [
      "Líneas 1–2: crea o reemplaza el archivo y escribe una cabecera.",
      "Líneas 3–4: lo reabre para añadir una línea sin borrar la cabecera.",
      "Líneas 5–6: lo lee y muestra su contenido."
    ],
    "asir": "usuarios = [\"ana\", \"luis\", \"marta\"]\nwith open(\"usuarios_nuevos.txt\", \"w\", encoding=\"utf-8\") as archivo:\n    for usuario in usuarios:\n        archivo.write(f\"{usuario}\\n\")",
    "errors": [
      "Abrir con w borra el contenido anterior antes de escribir.",
      "write() no añade \\n por sí solo.",
      "Abrir repetidamente con w dentro de un bucle conserva solo la última escritura."
    ],
    "quick": "Crea aviso.txt con la línea Simulación terminada y léela para comprobarla.",
    "answer": "with open(\"aviso.txt\", \"w\", encoding=\"utf-8\") as archivo:\n    archivo.write(\"Simulación terminada\\n\")\nwith open(\"aviso.txt\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")",
    "terms": [
      "write",
      "append",
      "modos",
      "escritura",
      "archivos"
    ],
    "note": "",
    "minutes": 25
  }
]);

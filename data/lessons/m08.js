"use strict";
Course.lessons.push(...[
  {
    "id": "m08-l1",
    "module": 8,
    "title": "Tuplas y conjuntos",
    "objective": "Representar registros fijos y eliminar duplicados.",
    "body": [
      "Una tupla es una secuencia inmutable. Puedes leer posiciones y desempaquetar sus valores, pero no sustituir un elemento. La coma construye una tupla: (443,) tiene un elemento; (443) es solo un entero entre paréntesis.",
      "Un conjunto o set reúne elementos únicos y no ofrece posiciones indexadas. set(lista) elimina duplicados, pero no garantiza el orden de presentación. Usa sorted(conjunto) para obtener una salida reproducible.",
      "add añade un elemento; discard lo elimina si está presente sin fallar cuando falta. La unión | combina elementos, la intersección & conserva los comunes y la diferencia - conserva los que solo están en el primer conjunto. Los elementos deben ser hashables, como cadenas o enteros."
    ],
    "syntax": "endpoint = (\"192.0.2.10\", 443)\nunicos = set(usuarios)\ncomunes = grupo_a & grupo_b",
    "code": "endpoint = (\"192.0.2.10\", 443)\nip, puerto = endpoint\nusuarios = [\"ana\", \"luis\", \"ana\"]\nunicos = set(usuarios)\nprint(ip, puerto)\nprint(sorted(unicos))",
    "lineNotes": [
      "Línea 1: agrupa dos valores en una tupla.",
      "Línea 2: desempaqueta sus dos componentes.",
      "Línea 3: contiene un duplicado.",
      "Línea 4: el set conserva solo ana y luis.",
      "Línea 5: muestra el endpoint.",
      "Línea 6: ordena para mostrar siempre ['ana', 'luis']."
    ],
    "asir": "requeridos = {\"ssh\", \"https\"}\ninstalados = {\"ssh\", \"dns\"}\nfaltantes = requeridos - instalados\nprint(sorted(faltantes))",
    "errors": [
      "{} crea un diccionario vacío; el conjunto vacío se crea con set().",
      "Los conjuntos no tienen índice [0].",
      "Una tupla no admite asignar tupla[0] = otro."
    ],
    "quick": "Obtén y muestra ordenados los usuarios únicos de [\"marta\", \"ana\", \"marta\"].",
    "answer": "usuarios = [\"marta\", \"ana\", \"marta\"]\nprint(sorted(set(usuarios)))",
    "terms": [
      "tuplas",
      "conjuntos",
      "sets",
      "duplicados",
      "intersección"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m08-l2",
    "module": 8,
    "title": "Diccionarios e inventarios",
    "objective": "Relacionar claves con valores y recorrer registros.",
    "body": [
      "Un diccionario asocia claves únicas con valores. Es mutable y mantiene el orden de inserción. servidor[\"ip\"] accede a una clave existente; si no está, produce KeyError. get(\"ip\", \"sin dato\") permite indicar una alternativa.",
      "Puedes añadir o actualizar un valor mediante diccionario[clave] = valor. keys() consulta las claves; values(), los valores; items(), los pares clave-valor. Iterar directamente sobre un diccionario recorre sus claves.",
      "Un inventario puede ser una lista de diccionarios, uno por equipo, o un diccionario cuya clave sea el hostname. Escoge según la operación habitual: recorrer todos los registros o encontrar uno por su nombre."
    ],
    "syntax": "equipo = {\"host\": \"web01\", \"activo\": True}\nequipo[\"ip\"] = \"192.0.2.10\"\nfor clave, valor in equipo.items():\n    print(clave, valor)",
    "code": "equipo = {\"host\": \"web01\", \"ram\": 16}\nequipo[\"ram\"] = 32\nequipo[\"ip\"] = \"192.0.2.10\"\nprint(equipo.get(\"so\", \"Desconocido\"))\nfor clave, valor in equipo.items():\n    print(clave, valor)",
    "lineNotes": [
      "Línea 1: crea dos claves.",
      "Línea 2: sustituye el valor de ram sin crear una clave duplicada.",
      "Línea 3: añade ip.",
      "Línea 4: devuelve la alternativa porque so no existe.",
      "Líneas 5–6: desempaquetan y muestran cada par."
    ],
    "asir": "inventario = {\"web01\": {\"ip\": \"192.0.2.10\", \"activo\": True},\n              \"db01\": {\"ip\": \"192.0.2.11\", \"activo\": False}}\nfor host, datos in inventario.items():\n    print(host, datos[\"ip\"], datos[\"activo\"])",
    "errors": [
      "Iterar con for clave, valor in diccionario exige .items() para obtener pares.",
      "Repetir una clave en un literal conserva su último valor.",
      "get() no inserta la alternativa en el diccionario."
    ],
    "quick": "Crea un diccionario con host=\"dns01\" y puerto=53. Añade activo=True y muestra el puerto.",
    "answer": "equipo = {\"host\": \"dns01\", \"puerto\": 53}\nequipo[\"activo\"] = True\nprint(equipo[\"puerto\"])",
    "terms": [
      "diccionarios",
      "claves",
      "valores",
      "items",
      "get",
      "inventario"
    ],
    "note": "",
    "minutes": 25
  }
]);

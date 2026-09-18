"use strict";
Course.lessons.push(...[
  {
    "id": "m06-l1",
    "module": 6,
    "title": "Recorrer con for y range",
    "objective": "Procesar una colección y generar secuencias numéricas.",
    "body": [
      "for toma los elementos de un iterable uno por uno. En cada vuelta asigna el elemento actual a la variable del bucle y ejecuta el bloque indentado. No necesitas conocer de antemano la longitud para recorrer una lista de equipos.",
      "range(fin) genera enteros desde 0 hasta fin sin incluirlo. range(inicio, fin, paso) permite elegir el comienzo y el incremento. range(1, 4) produce 1, 2 y 3; no produce 4.",
      "Un acumulador reúne resultados a lo largo del recorrido. Inicialízalo antes del bucle y actualízalo dentro. Si lo reinicias en cada vuelta, solo conservarás la información de la última iteración."
    ],
    "syntax": "for elemento in coleccion:\n    accion\nfor numero in range(1, 4):\n    accion",
    "code": "servidores = [\"web01\", \"db01\", \"backup01\"]\nfor servidor in servidores:\n    print(f\"Revisando {servidor}\")",
    "lineNotes": [
      "Línea 1: crea una lista de tres nombres.",
      "Línea 2: servidor toma cada nombre, en orden.",
      "Línea 3: se ejecuta tres veces; solo muestra mensajes, no consulta la red."
    ],
    "asir": "errores = 0\nfor nivel in [\"INFO\", \"ERROR\", \"WARNING\", \"ERROR\"]:\n    if nivel == \"ERROR\":\n        errores += 1\nprint(f\"Errores: {errores}\")",
    "errors": [
      "El límite final de range() se excluye.",
      "No reinicies el acumulador dentro del bucle.",
      "No cambies el tamaño de una lista mientras la recorres sin diseñar ese comportamiento."
    ],
    "quick": "Muestra los nombres nodo1, nodo2 y nodo3 utilizando range().",
    "answer": "for numero in range(1, 4):\n    print(f\"nodo{numero}\")",
    "terms": [
      "for",
      "range",
      "acumulador"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m06-l2",
    "module": 6,
    "title": "while, break y continue",
    "objective": "Controlar repeticiones y evitar bucles infinitos.",
    "body": [
      "while repite su bloque mientras la condición sea verdadera. Es útil cuando el número de repeticiones depende de una condición. Debe existir una forma de que la condición cambie o de salir con break.",
      "break termina el bucle más interno inmediatamente. continue omite el resto de la vuelta actual y pasa a la siguiente. En un while, ten cuidado de no saltarte con continue la actualización que permite terminar.",
      "En prácticas simularemos intentos de conexión sin conectar a equipos reales. En el laboratorio hay un botón Detener y un límite de ejecución para que un bucle infinito no bloquee la interfaz."
    ],
    "syntax": "while condicion:\n    accion\n    # actualiza la condición",
    "code": "intento = 0\nwhile intento < 3:\n    intento += 1\n    print(f\"Intento {intento}\")\n    if intento == 2:\n        print(\"Conexión simulada correcta\")\n        break",
    "lineNotes": [
      "Línea 1: inicializa el contador antes del bucle.",
      "Línea 2: limita el máximo de intentos a tres.",
      "Líneas 3–4: actualiza el contador y muestra cada intento.",
      "Líneas 5–7: simula éxito en el segundo intento y termina con break."
    ],
    "asir": "for ip in [\"192.0.2.10\", \"\", \"192.0.2.12\"]:\n    if ip == \"\":\n        continue\n    print(f\"IP registrada: {ip}\")",
    "errors": [
      "Un while sin actualización puede ser infinito.",
      "break no sale de todas las estructuras anidadas: sale del bucle más interno.",
      "continue no termina el bucle completo."
    ],
    "quick": "Recorre 1–5 y muestra solo los números distintos de 3 utilizando continue.",
    "answer": "for numero in range(1, 6):\n    if numero == 3:\n        continue\n    print(numero)",
    "terms": [
      "while",
      "break",
      "continue",
      "bucles"
    ],
    "note": "",
    "minutes": 25
  }
]);

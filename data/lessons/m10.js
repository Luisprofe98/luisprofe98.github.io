"use strict";
Course.lessons.push(...[
  {
    "id": "m10-l1",
    "module": 10,
    "title": "Limpiar, buscar y reemplazar",
    "objective": "Normalizar texto sin modificar la cadena original.",
    "body": [
      "Las cadenas son secuencias inmutables de caracteres. Puedes consultar posiciones y slices como en una lista, pero no sustituir un carácter mediante asignación. Los métodos de transformación devuelven nuevas cadenas.",
      "strip() elimina espacios y saltos de línea de los extremos. lower() y upper() cambian mayúsculas y minúsculas. replace(viejo, nuevo) sustituye coincidencias; debes guardar su retorno para conservar la transformación.",
      "in comprueba pertenencia y devuelve un booleano. find(texto) devuelve el índice de la primera coincidencia o -1 si no existe. startswith() y endswith() comprueban prefijos y sufijos; son más claros que cortar manualmente cuando ese es el objetivo."
    ],
    "syntax": "texto.strip().lower()\ntexto.replace(\"viejo\", \"nuevo\")\n\"ERROR\" in linea",
    "code": "host = \"  WEB01.example.test\\n\"\nnormalizado = host.strip().lower()\nprint(normalizado)\nprint(normalizado.endswith(\".test\"))\nprint(normalizado.find(\"web\"))",
    "lineNotes": [
      "Línea 1: el dato contiene espacios y un salto de línea.",
      "Línea 2: strip limpia extremos y lower produce minúsculas.",
      "Línea 3: muestra web01.example.test.",
      "Línea 4: el sufijo coincide y devuelve True.",
      "Línea 5: web comienza en el índice 0."
    ],
    "asir": "linea = \"ERROR servicio=web01\"\nif linea.startswith(\"ERROR\"):\n    print(linea.replace(\"ERROR\", \"CRÍTICO\", 1))",
    "errors": [
      "host.lower() no cambia host si no guardas el resultado.",
      "find() puede devolver 0: no lo uses directamente como booleano para decidir si encontró algo.",
      "strip(\"abc\") elimina caracteres a, b o c en los extremos; no quita un prefijo literal completo."
    ],
    "quick": "Normaliza \"  DNS01  \" eliminando espacios y convirtiendo a minúsculas.",
    "answer": "host = \"  DNS01  \"\nprint(host.strip().lower())",
    "terms": [
      "strip",
      "lower",
      "upper",
      "find",
      "replace",
      "startswith",
      "endswith"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m10-l2",
    "module": 10,
    "title": "Separar y recomponer registros",
    "objective": "Extraer campos de texto y generar nuevas líneas.",
    "body": [
      "split(separador) divide un texto en una lista. Sin separador, agrupa cualquier espacio en blanco; con \";\", conserva el significado de ese separador específico. split(\"=\", 1) divide solo la primera coincidencia.",
      "separador.join(elementos) une cadenas con ese delimitador. El separador es quien recibe la llamada, por ejemplo \";\".join(campos). Todos los elementos deben ser cadenas; convierte los números previamente.",
      "Un slice texto[inicio:fin] permite extraer fragmentos. Al analizar logs de un formato fijo, documenta ese formato. Separar por espacios no sirve para todos los logs reales: algunos incluyen campos entre comillas o mensajes con espacios."
    ],
    "syntax": "campos = linea.split(\";\")\nlinea = \";\".join(campos)\nfragmento = texto[:3]",
    "code": "linea = \"web01;192.0.2.10;ONLINE\"\ncampos = linea.split(\";\")\nhost, ip, estado = campos\nprint(host, ip)\nprint(\" | \".join(campos))",
    "lineNotes": [
      "Línea 1: define un registro con tres campos separados por punto y coma.",
      "Línea 2: obtiene una lista de tres cadenas.",
      "Línea 3: desempaqueta los tres campos.",
      "Línea 4: muestra solo nombre e IP.",
      "Línea 5: vuelve a unirlos con un separador legible."
    ],
    "asir": "log = \"ERROR 192.0.2.10 autenticacion_fallida\"\nnivel, ip, mensaje = log.split(maxsplit=2)\nprint(f\"{nivel}: {ip} -> {mensaje}\")",
    "errors": [
      "Desempaquetar un número inesperado de campos produce ValueError.",
      "\";\".join([\"web01\", 443]) falla porque 443 no es str.",
      "El fin de un slice sigue siendo exclusivo, también en cadenas."
    ],
    "quick": "Separa \"ana,luis,marta\" y vuelve a unir los nombres con \" / \".",
    "answer": "usuarios = \"ana,luis,marta\".split(\",\")\nprint(\" / \".join(usuarios))",
    "terms": [
      "split",
      "join",
      "slicing",
      "logs"
    ],
    "note": "",
    "minutes": 25
  }
]);

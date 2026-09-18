"use strict";
Course.lessons.push(...[
  {
    "id": "m09-l1",
    "module": 9,
    "title": "Definir, llamar y devolver",
    "objective": "Separar una tarea en una función reutilizable.",
    "body": [
      "def crea una función con un nombre, parámetros entre paréntesis y un bloque indentado. Definirla no ejecuta su cuerpo: debes llamarla. Los parámetros son nombres de entrada; los argumentos son los valores concretos de cada llamada.",
      "return devuelve un valor a quien llama y termina la función. print() solo muestra una salida. Una función sin return explícito devuelve None; imprimir un dato no permite reutilizar automáticamente ese dato en un cálculo.",
      "Separa cálculo y presentación: una función puede determinar el estado de un servidor y otra parte del programa puede mostrarlo o guardarlo. Esta separación facilita las pruebas con diferentes entradas."
    ],
    "syntax": "def nombre(parametro):\n    return resultado\nvalor = nombre(argumento)",
    "code": "def comprobar_servidor(nombre, activo):\n    if activo:\n        return f\"{nombre}: ONLINE\"\n    return f\"{nombre}: OFFLINE\"\n\nprint(comprobar_servidor(\"web01\", True))",
    "lineNotes": [
      "Línea 1: define dos parámetros locales.",
      "Líneas 2–3: si activo es verdadero, devuelve ONLINE y termina.",
      "Línea 4: solo se alcanza cuando activo es falso.",
      "Línea 5: separa visualmente definición y uso.",
      "Línea 6: llama con dos argumentos y muestra el retorno."
    ],
    "asir": "def porcentaje_usado(usados, total):\n    return usados / total * 100\n\nuso = porcentaje_usado(50, 200)\nprint(f\"Disco: {uso:.1f}%\")",
    "errors": [
      "Definir una función no equivale a ejecutarla.",
      "return y print no son intercambiables.",
      "El código situado después de un return en el mismo camino no se ejecuta."
    ],
    "quick": "Define doble(numero) que devuelva el doble y muestra doble(8).",
    "answer": "def doble(numero):\n    return numero * 2\n\nprint(doble(8))",
    "terms": [
      "def",
      "return",
      "parámetros",
      "argumentos"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m09-l2",
    "module": 9,
    "title": "Valores por defecto y ámbito",
    "objective": "Diseñar funciones que no dependan de variables ocultas.",
    "body": [
      "Un parámetro puede tener un valor por defecto: def alerta(cpu, umbral=80). La llamada puede omitirlo o pasarlo por nombre, por ejemplo alerta(70, umbral=65). Los parámetros obligatorios se escriben antes que los que tienen valor predeterminado.",
      "Una variable asignada dentro de una función suele ser local. No cambia una variable externa del mismo nombre. Es mejor recibir los datos por parámetros y devolver los resultados que depender de globales modificables.",
      "Los valores por defecto se evalúan una vez, al definir la función. No uses una lista mutable como predeterminado para acumular por llamada: podría compartir datos inesperadamente. Usa None y crea una lista dentro cuando sea necesario."
    ],
    "syntax": "def alerta(cpu, umbral=80):\n    return cpu >= umbral",
    "code": "umbral = 90\n\ndef en_alerta(cpu, limite=80):\n    resultado = cpu >= limite\n    return resultado\n\nprint(en_alerta(85))\nprint(en_alerta(85, limite=umbral))",
    "lineNotes": [
      "Línea 1: establece una variable externa.",
      "Línea 2: separa bloques.",
      "Línea 3: define un valor predeterminado distinto, 80.",
      "Líneas 4–5: resultado es local y se devuelve.",
      "Línea 6: separa definición y llamadas.",
      "Línea 7: utiliza 80 y muestra True.",
      "Línea 8: pasa 90 explícitamente y muestra False."
    ],
    "asir": "def registrar(host, equipos=None):\n    if equipos is None:\n        equipos = []\n    equipos.append(host)\n    return equipos\n\nprint(registrar(\"web01\"))\nprint(registrar(\"db01\"))",
    "errors": [
      "Una variable local no está disponible fuera de la función.",
      "Los predeterminados mutables pueden compartir cambios entre llamadas.",
      "Pasar una lista como argumento puede permitir que la función la modifique."
    ],
    "quick": "Crea necesita_backup(dias, limite=7) que devuelva si dias es mayor o igual al límite.",
    "answer": "def necesita_backup(dias, limite=7):\n    return dias >= limite\n\nprint(necesita_backup(8))",
    "terms": [
      "ámbito",
      "local",
      "valores por defecto",
      "None"
    ],
    "note": "",
    "minutes": 25
  }
]);

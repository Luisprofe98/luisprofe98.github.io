"use strict";
Course.lessons.push(...[
  {
    "id": "m12-l1",
    "module": 12,
    "title": "Detectar y capturar errores",
    "objective": "Diferenciar errores de sintaxis y fallos de ejecución.",
    "body": [
      "Un error de sintaxis impide analizar el programa. Una excepción ocurre durante la ejecución de una instrucción: convertir \"abc\" a entero genera ValueError, dividir por cero genera ZeroDivisionError y abrir un archivo inexistente genera FileNotFoundError.",
      "try contiene la operación que puede fallar. except TipoError captura únicamente las excepciones compatibles con ese tipo. Mantén el bloque try pequeño para no esconder errores ajenos a la operación que quieres controlar.",
      "La captura debe decidir una respuesta útil: informar, usar un valor alternativo o volver a pedir un dato. No silencies todos los fallos con un except vacío. Una excepción no capturada muestra un traceback: empieza por el tipo y mensaje final y localiza la línea del script."
    ],
    "syntax": "try:\n    operacion\nexcept ValueError:\n    alternativa",
    "code": "dato = \"ochenta\"\ntry:\n    cpu = float(dato)\n    print(cpu)\nexcept ValueError:\n    print(\"La CPU debe ser un número\")",
    "lineNotes": [
      "Línea 1: el dato no representa un número.",
      "Línea 2: inicia el bloque protegido.",
      "Línea 3: float produce ValueError.",
      "Línea 4: se omite tras la excepción.",
      "Líneas 5–6: capturan el fallo y explican qué corregir."
    ],
    "asir": "try:\n    with open(\"no_existe.txt\", \"r\", encoding=\"utf-8\") as archivo:\n        print(archivo.read())\nexcept FileNotFoundError:\n    print(\"No se ha creado el archivo de prácticas\")",
    "errors": [
      "except ValueError no captura automáticamente FileNotFoundError.",
      "Un except sin tipo puede ocultar interrupciones y errores inesperados.",
      "No confíes en capturar un SyntaxError de tu propio código mal escrito para hacerlo funcionar."
    ],
    "quick": "Convierte el texto \"22x\" a int y, si falla, muestra Puerto no válido.",
    "answer": "try:\n    puerto = int(\"22x\")\n    print(puerto)\nexcept ValueError:\n    print(\"Puerto no válido\")",
    "terms": [
      "try",
      "except",
      "ValueError",
      "traceback"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m12-l2",
    "module": 12,
    "title": "else, finally y validación",
    "objective": "Separar éxito, error y limpieza de una operación.",
    "body": [
      "else en una estructura try/except se ejecuta cuando el bloque try termina sin excepción. Coloca allí las operaciones que dependen de una conversión correcta pero cuyos fallos no quieres atribuir a esa conversión.",
      "finally se ejecuta al abandonar la estructura en condiciones normales de ejecución, tanto si hubo excepción como si no. Es útil para liberar recursos, aunque with suele ser preferible para archivos. No se garantiza si el proceso o el motor se termina a la fuerza.",
      "No todo dato incorrecto produce una excepción automáticamente. int(\"70000\") funciona, pero no es un puerto dentro de 0–65535. Después de convertir debes validar el rango. Puedes usar raise ValueError(...) para comunicar una precondición incumplida desde una función."
    ],
    "syntax": "try:\n    operacion\nexcept ValueError:\n    gestionar_error\nelse:\n    gestionar_exito\nfinally:\n    limpieza",
    "code": "try:\n    puerto = int(\"443\")\nexcept ValueError:\n    print(\"Formato no numérico\")\nelse:\n    print(f\"Puerto leído: {puerto}\")\nfinally:\n    print(\"Fin de la comprobación\")",
    "lineNotes": [
      "Líneas 1–2: la conversión termina correctamente.",
      "Líneas 3–4: no se entra en except.",
      "Líneas 5–6: else muestra Puerto leído: 443.",
      "Líneas 7–8: finally muestra el cierre de la comprobación."
    ],
    "asir": "def convertir_puerto(texto):\n    puerto = int(texto)\n    if not 0 <= puerto <= 65535:\n        raise ValueError(\"Puerto fuera de rango\")\n    return puerto\n\ntry:\n    print(convertir_puerto(\"70000\"))\nexcept ValueError as error:\n    print(error)",
    "errors": [
      "finally no significa que la operación haya sido correcta.",
      "No uses return dentro de finally para tapar retornos o excepciones previas.",
      "Conversión correcta no implica rango correcto."
    ],
    "quick": "Convierte \"53\" a int y muestra Correcto en else y Fin en finally.",
    "answer": "try:\n    puerto = int(\"53\")\nexcept ValueError:\n    print(\"Error\")\nelse:\n    print(\"Correcto\")\nfinally:\n    print(\"Fin\")",
    "terms": [
      "else",
      "finally",
      "raise",
      "validación"
    ],
    "note": "",
    "minutes": 25
  }
]);

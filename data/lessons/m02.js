"use strict";
Course.lessons.push(...[
  {
    "id": "m02-l1",
    "module": 2,
    "title": "Nombres, valores y tipos",
    "objective": "Representar datos de administración mediante variables.",
    "body": [
      "Una variable es un nombre asociado a un objeto. La asignación con = evalúa la expresión de la derecha y vincula el resultado al nombre de la izquierda. Puedes reasignar el nombre más adelante; Python no exige declarar su tipo por separado.",
      "Usa nombres descriptivos en snake_case, como uso_cpu o nombre_servidor. Un nombre no puede empezar por un dígito ni contener espacios; tampoco puede ser una palabra reservada como if. Evita usar list, str o type como nombres porque ocultarías funciones incorporadas.",
      "int representa enteros; float, números de coma flotante; str, texto; bool, los valores True o False. Un porcentaje como 63.5 usa punto decimal. type(valor) permite inspeccionar su tipo. Un texto \"22\" no es el mismo objeto que el entero 22."
    ],
    "syntax": "nombre = valor\ntype(nombre)",
    "code": "servidores = 4\nuso_cpu = 63.5\nhostname = \"web01\"\nactivo = True\nprint(type(servidores))",
    "lineNotes": [
      "Línea 1: asigna un entero a servidores.",
      "Línea 2: uso_cpu recibe un float, escrito con punto decimal.",
      "Línea 3: hostname contiene texto.",
      "Línea 4: activo recibe un bool; True se escribe con mayúscula inicial.",
      "Línea 5: muestra <class 'int'>, el tipo de servidores."
    ],
    "asir": "nombre_equipo = \"db01\"\nmemoria_gib = 16\nservicio_activo = False\nprint(nombre_equipo, memoria_gib, servicio_activo)",
    "errors": [
      "No confundas = (asignar) con == (comparar).",
      "true y false no son los booleanos de Python: usa True y False.",
      "No incluyas unidades en un número: 16 es un entero, \"16 GiB\" es texto."
    ],
    "quick": "Crea la variable puerto con el entero 443 y muestra su tipo.",
    "answer": "puerto = 443\nprint(type(puerto))",
    "terms": [
      "variables",
      "int",
      "float",
      "str",
      "bool",
      "type",
      "asignación"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m02-l2",
    "module": 2,
    "title": "Convertir y comprobar datos",
    "objective": "Transformar texto en números de forma explícita.",
    "body": [
      "int(), float() y str() construyen valores del tipo indicado cuando la conversión tiene sentido. int(\"22\") da 22; float(\"72.5\") da 72.5. int(\"22.5\") genera ValueError porque ese texto no representa directamente un entero.",
      "Una conversión no modifica por sí sola la variable original. Guarda su resultado en otro nombre o reasigna el original. int(3.9) trunca hacia cero; no redondea. Los float son aproximaciones binarias: reserva su uso para medidas, no para asumir igualdad exacta de todos los decimales.",
      "bool(0) y bool(\"\") dan False; bool(\"False\") da True porque el texto no está vacío. Para interpretar un estado textual, compáralo con el valor que esperas. En módulos posteriores validarás formatos y capturarás errores de conversión."
    ],
    "syntax": "numero = int(texto)\nmedida = float(texto)\ntexto = str(numero)",
    "code": "puerto_texto = \"443\"\npuerto = int(puerto_texto)\nsiguiente = puerto + 1\nprint(siguiente)",
    "lineNotes": [
      "Línea 1: el puerto llega como str.",
      "Línea 2: int() convierte ese texto numérico en un entero.",
      "Línea 3: la suma ahora es aritmética, no concatenación.",
      "Línea 4: muestra 444."
    ],
    "asir": "cpu_texto = \"81.5\"\ncpu = float(cpu_texto)\nestado_texto = \"activo\"\nactivo = estado_texto == \"activo\"\nprint(cpu, activo)",
    "errors": [
      "Sumar \"22\" + 1 genera TypeError.",
      "float(\"72,5\") falla: el separador decimal esperado es el punto.",
      "bool(\"False\") no interpreta el significado de esa palabra."
    ],
    "quick": "Convierte \"1024\" a entero, suma 512 y muestra el resultado.",
    "answer": "memoria = int(\"1024\")\nprint(memoria + 512)",
    "terms": [
      "conversión",
      "int",
      "float",
      "str",
      "bool"
    ],
    "note": "",
    "minutes": 25
  }
]);

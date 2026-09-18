"use strict";
Course.lessons.push(...[
  {
    "id": "m04-l1",
    "module": 4,
    "title": "Pedir y convertir información",
    "objective": "Recoger datos mediante input() y usarlos en cálculos.",
    "body": [
      "input(mensaje) presenta una pregunta y devuelve el texto introducido, sin el salto de línea final. Incluso si escribes 443, el resultado es str. Si necesitas hacer cálculos, convierte explícitamente a int o float.",
      "Separa la lectura, la conversión y el cálculo para encontrar errores con facilidad. Un nombre de equipo se puede mantener como texto, mientras que una cantidad de memoria necesita un tipo numérico. La validación con try/except llegará en el módulo 12.",
      "En el laboratorio de esta web, prepara las respuestas en el campo Entradas, una por línea y en el mismo orden que las llamadas a input(). Si el programa pide más respuestas de las disponibles, recibirás EOFError; no es una ventana de terminal interactiva."
    ],
    "syntax": "texto = input(\"Pregunta: \")\nnumero = int(texto)",
    "code": "hostname = input(\"Equipo: \")\nram_texto = input(\"RAM en GiB: \")\nram = int(ram_texto)\nprint(hostname, ram * 1024, \"MiB\")",
    "lineNotes": [
      "Línea 1: solicita el nombre y conserva su texto.",
      "Línea 2: obtiene otro texto para la RAM.",
      "Línea 3: lo convierte a entero.",
      "Línea 4: calcula MiB y muestra un resumen."
    ],
    "asir": "puerto = int(input(\"Puerto: \"))\nprint(\"Puerto seleccionado:\", puerto)",
    "errors": [
      "input() no devuelve int automáticamente.",
      "Una entrada vacía no puede convertirse con int(\"\").",
      "No pidas credenciales reales en ejercicios o en un sitio público."
    ],
    "quick": "Pide el número de equipos y muestra el doble. Prueba con la entrada 5.",
    "answer": "equipos = int(input(\"Equipos: \"))\nprint(equipos * 2)",
    "terms": [
      "input",
      "conversión",
      "entrada"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m04-l2",
    "module": 4,
    "title": "Informes con f-strings",
    "objective": "Combinar texto, variables y formato numérico.",
    "body": [
      "Una f-string comienza por f antes de las comillas. Cada expresión entre llaves se evalúa e inserta en el texto. Esto evita concatenar manualmente cadenas con str() y permite mostrar informes legibles.",
      "Después de una expresión, : introduce un formato. {cpu:.1f} muestra un decimal; {uso:.2f} muestra dos. Es una presentación redondeada: no cambia el valor guardado en la variable.",
      "print() admite sep para el separador entre argumentos y end para el final de línea. Para informes breves puedes generar cabeceras y filas. Evita presentar una unidad distinta de la usada en el cálculo."
    ],
    "syntax": "f\"Equipo: {hostname}\"\nf\"CPU: {cpu:.1f}%\"",
    "code": "hostname = \"web01\"\ncpu = 72.345\ninforme = f\"{hostname}: CPU {cpu:.1f}%\"\nprint(informe)",
    "lineNotes": [
      "Línea 1: guarda el nombre del equipo.",
      "Línea 2: mantiene la medida con su precisión original.",
      "Línea 3: inserta el nombre y representa la CPU con un decimal.",
      "Línea 4: muestra web01: CPU 72.3%."
    ],
    "asir": "usados = 125\ntotal = 500\nprint(f\"Disco: {usados}/{total} GiB ({usados / total:.1%})\")\nprint(\"host\", \"ip\", \"estado\", sep=\";\")",
    "errors": [
      "Sin la f inicial, las llaves se muestran literalmente.",
      "Un formato como :.2f requiere un valor numérico compatible.",
      "El símbolo % en :.1% ya multiplica la proporción por 100 para mostrarla."
    ],
    "quick": "Con equipo=\"db01\" y cpu=40.25 muestra db01 | CPU: 40.2% con un decimal.",
    "answer": "equipo = \"db01\"\ncpu = 40.25\nprint(f\"{equipo} | CPU: {cpu:.1f}%\")",
    "terms": [
      "f-strings",
      "interpolación",
      "formato",
      "sep",
      "end"
    ],
    "note": "",
    "minutes": 25
  }
]);

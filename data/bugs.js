"use strict";
Course.bugs = [
  {
    "id": "b01",
    "module": 1,
    "title": "Nombre de función",
    "code": "Print(\"Inicio\")",
    "error": "NameError: se ha cambiado la mayúscula de print.",
    "solution": "print(\"Inicio\")",
    "explanation": "Respeta el nombre exacto de las funciones."
  },
  {
    "id": "b02",
    "module": 2,
    "title": "Suma incompatible",
    "code": "ram = \"16\"\nprint(ram + 8)",
    "error": "TypeError: ram es una cadena y 8 es un entero.",
    "solution": "ram = int(\"16\")\nprint(ram + 8)",
    "explanation": "Convierte antes de operar numéricamente."
  },
  {
    "id": "b03",
    "module": 3,
    "title": "Condición siempre verdadera",
    "code": "puerto = 22\nif puerto == 80 or 443:\n    print(\"Web\")",
    "error": "El número 443 tiene valor de verdad verdadero; falta la segunda comparación.",
    "solution": "puerto = 22\nif puerto == 80 or puerto == 443:\n    print(\"Web\")",
    "explanation": "Cada alternativa necesita su propia comparación."
  },
  {
    "id": "b04",
    "module": 4,
    "title": "input no devuelve un entero",
    "code": "edad = input(\"Edad: \")\nif edad >= 18:\n    print(\"Mayor de edad\")",
    "error": "TypeError: input devuelve texto, no un entero.",
    "solution": "edad = int(input(\"Edad: \"))\nif edad >= 18:\n    print(\"Mayor de edad\")",
    "explanation": "Para entradas arbitrarias añade manejo de ValueError; aquí la entrada de prueba es 20."
  },
  {
    "id": "b05",
    "module": 5,
    "title": "Sangría ausente",
    "code": "if True:\nprint(\"Activo\")",
    "error": "IndentationError: el bloque no está indentado.",
    "solution": "if True:\n    print(\"Activo\")",
    "explanation": "Indenta el cuerpo del if con cuatro espacios."
  },
  {
    "id": "b06",
    "module": 6,
    "title": "Acumulador reiniciado",
    "code": "for n in [1, 2, 3]:\n    total = 0\n    total += n\nprint(total)",
    "error": "Error lógico: total se reinicia en cada vuelta y solo conserva el último valor.",
    "solution": "total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)",
    "explanation": "Inicializa el acumulador fuera del bucle."
  },
  {
    "id": "b07",
    "module": 7,
    "title": "Perder una lista al ordenar",
    "code": "equipos = [\"db\", \"web\"]\nequipos = equipos.sort()\nprint(equipos)",
    "error": "sort modifica la lista y devuelve None.",
    "solution": "equipos = [\"db\", \"web\"]\nequipos.sort()\nprint(equipos)",
    "explanation": "No asignes el retorno de sort; alternativamente usa sorted."
  },
  {
    "id": "b08",
    "module": 8,
    "title": "Clave ausente",
    "code": "equipo = {\"host\": \"web01\"}\nprint(equipo[\"ip\"])",
    "error": "KeyError: la clave ip no existe.",
    "solution": "equipo = {\"host\": \"web01\"}\nprint(equipo.get(\"ip\", \"Sin IP\"))",
    "explanation": "Usa una alternativa explícita para campos opcionales."
  },
  {
    "id": "b09",
    "module": 9,
    "title": "Imprimir no devuelve",
    "code": "def doble(n):\n    print(n * 2)\nresultado = doble(3)\nprint(resultado + 1)",
    "error": "TypeError: doble devuelve None porque solo imprime.",
    "solution": "def doble(n):\n    return n * 2\nresultado = doble(3)\nprint(resultado + 1)",
    "explanation": "Devuelve el dato que necesitará el llamador."
  },
  {
    "id": "b10",
    "module": 10,
    "title": "Transformación descartada",
    "code": "host = \"WEB01\"\nhost.lower()\nprint(host)",
    "error": "Error lógico: se ignora la nueva cadena devuelta por lower.",
    "solution": "host = \"WEB01\"\nhost = host.lower()\nprint(host)",
    "explanation": "Las cadenas son inmutables; guarda el resultado de la transformación."
  },
  {
    "id": "b11",
    "module": 11,
    "title": "Sobrescritura en cada vuelta",
    "code": "for host in [\"web01\", \"db01\"]:\n    with open(\"lista.txt\", \"w\") as f:\n        f.write(host + \"\\n\")",
    "error": "Cada apertura en modo w borra el contenido anterior.",
    "solution": "with open(\"lista.txt\", \"w\", encoding=\"utf-8\") as f:\n    for host in [\"web01\", \"db01\"]:\n        f.write(host + \"\\n\")",
    "explanation": "Abre el destino una vez y escribe todas las filas dentro."
  },
  {
    "id": "b12",
    "module": 12,
    "title": "Excepción equivocada",
    "code": "try:\n    print(int(\"abc\"))\nexcept FileNotFoundError:\n    print(\"Dato inválido\")",
    "error": "La conversión genera ValueError, que no coincide con la excepción capturada.",
    "solution": "try:\n    print(int(\"abc\"))\nexcept ValueError:\n    print(\"Dato inválido\")",
    "explanation": "Captura el fallo que puede producir la operación del try."
  },
  {
    "id": "b13",
    "module": 13,
    "title": "Importación y nombre",
    "code": "import pathlib\nruta = Path(\"logs.txt\")",
    "error": "NameError: se importó pathlib, no el nombre Path directamente.",
    "solution": "import pathlib\nruta = pathlib.Path(\"logs.txt\")\nprint(ruta.name)",
    "explanation": "Accede a los miembros mediante el nombre del módulo importado."
  },
  {
    "id": "b14",
    "module": 14,
    "title": "Línea vacía en un log",
    "code": "for linea in [\"INFO inicio\", \"\"]:\n    nivel = linea.split()[0]\n    print(nivel)",
    "error": "IndexError: split devuelve una lista vacía para la línea vacía.",
    "solution": "for linea in [\"INFO inicio\", \"\"]:\n    partes = linea.split()\n    if not partes:\n        continue\n    print(partes[0])",
    "explanation": "Comprueba la estructura antes de acceder por posición."
  }
];

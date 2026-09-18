"use strict";
Course.quizzes.push(...[
  {
    "id": "q14-1",
    "module": 14,
    "type": "choice",
    "text": "¿Qué demuestra validar el formato de una IP?",
    "options": [
      "Que la cadena representa una dirección válida",
      "Que el equipo está encendido",
      "Que su contraseña es segura"
    ],
    "answer": 0,
    "explanation": "La validación sintáctica no prueba conectividad ni servicios.",
    "code": ""
  },
  {
    "id": "q14-2",
    "module": 14,
    "type": "boolean",
    "text": "Una primera automatización debe probarse con datos y rutas de práctica.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "answer": 0,
    "explanation": "La simulación reduce el riesgo de modificar recursos reales por error.",
    "code": ""
  },
  {
    "id": "q14-3",
    "module": 14,
    "type": "output",
    "text": "¿Qué se imprime?",
    "options": [
      "2",
      "3",
      "IndexError"
    ],
    "answer": 0,
    "explanation": "Las dos listas no vacías permiten comprobar el primer campo; la vacía se descarta.",
    "code": "total = 0\nfor linea in [\"ERROR x\", \"\", \"ERROR y\"]:\n    partes = linea.split()\n    if partes and partes[0] == \"ERROR\":\n        total += 1\nprint(total)"
  },
  {
    "id": "q14-4",
    "module": 14,
    "type": "error",
    "text": "¿Por qué no basta este validador?",
    "options": [
      "No comprueba octetos ni sus rangos",
      "count siempre falla",
      "Una IPv4 no contiene puntos"
    ],
    "answer": 0,
    "explanation": "999.999.999.999 tiene tres puntos y no es una IPv4 válida.",
    "code": "valida = ip.count(\".\") == 3"
  },
  {
    "id": "q14-5",
    "module": 14,
    "type": "fill",
    "text": "Completa el validador estándar para IPv4.",
    "options": [],
    "answer": [
      "IPv4Address"
    ],
    "explanation": "IPv4Address valida exclusivamente direcciones IPv4.",
    "code": "from ipaddress import ____"
  },
  {
    "id": "q14-6",
    "module": 14,
    "type": "multi",
    "text": "Selecciona dos criterios de una automatización didáctica segura.",
    "options": [
      "No modificar sistemas remotos reales",
      "Probar entradas vacías e incorrectas",
      "Sobrescribir siempre el origen",
      "Ocultar registros que no se entienden"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "Los límites de acción y las pruebas de casos límite son parte del diseño.",
    "code": ""
  }
]);

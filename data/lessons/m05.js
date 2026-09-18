"use strict";
Course.lessons.push(...[
  {
    "id": "m05-l1",
    "module": 5,
    "title": "Elegir con if, elif y else",
    "objective": "Ejecutar bloques distintos según una condición.",
    "body": [
      "if evalúa una condición. Si su valor de verdad es verdadero, ejecuta el bloque indentado. elif comprueba una alternativa cuando las condiciones anteriores no se cumplen. else recoge el resto de casos; no lleva condición.",
      "Cada cabecera termina con dos puntos y su bloque usa sangría consistente de cuatro espacios. En una cadena if/elif/else solo se ejecuta el primer bloque cuya condición se cumple. El orden de los umbrales importa.",
      "Para clasificar una medida de mayor a menor gravedad, comprueba primero el umbral más alto. Si colocas cpu >= 60 antes que cpu >= 90, una CPU al 95 % entrará en la rama de 60 y nunca alcanzará la crítica."
    ],
    "syntax": "if condicion:\n    accion\nelif otra_condicion:\n    otra_accion\nelse:\n    alternativa",
    "code": "cpu = 92\nif cpu >= 90:\n    print(\"CRÍTICO\")\nelif cpu >= 70:\n    print(\"AVISO\")\nelse:\n    print(\"NORMAL\")",
    "lineNotes": [
      "Línea 1: la medida inicial es 92.",
      "Líneas 2–3: 92 cumple >= 90, por lo que se muestra CRÍTICO.",
      "Líneas 4–5: esta alternativa se omite porque ya se ejecutó la primera rama.",
      "Líneas 6–7: else también se omite."
    ],
    "asir": "puerto = 8080\nif not 0 <= puerto <= 65535:\n    print(\"Fuera de rango\")\nelif puerto <= 1023:\n    print(\"Rango 0–1023\")\nelif puerto <= 49151:\n    print(\"Rango 1024–49151\")\nelse:\n    print(\"Rango 49152–65535\")",
    "errors": [
      "Olvidar : produce SyntaxError.",
      "No indentar el bloque produce IndentationError.",
      "Varios if independientes no equivalen a una cadena if/elif."
    ],
    "quick": "Con disco=85 muestra AVISO si alcanza 80; en otro caso muestra NORMAL.",
    "answer": "disco = 85\nif disco >= 80:\n    print(\"AVISO\")\nelse:\n    print(\"NORMAL\")",
    "terms": [
      "if",
      "elif",
      "else",
      "umbrales"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m05-l2",
    "module": 5,
    "title": "Condiciones combinadas y anidadas",
    "objective": "Expresar decisiones de dos niveles sin perder claridad.",
    "body": [
      "Puedes combinar condiciones con and, or y not o introducir un if dentro de otro. La anidación tiene sentido cuando una pregunta solo debe plantearse si antes se cumple un requisito, por ejemplo comprobar un servicio únicamente en un equipo encendido.",
      "No añadas niveles de sangría que no aporten una decisión diferente. Una comprobación como activo and cpu < 80 suele ser más legible que dos if anidados que terminan haciendo lo mismo.",
      "En prácticas de contraseñas solo usaremos datos ficticios. Comprobar una longitud sirve para practicar condiciones, pero no constituye una política de seguridad completa ni verifica una contraseña frente a un sistema real."
    ],
    "syntax": "if requisito:\n    if detalle:\n        accion",
    "code": "encendido = True\nservicio_activo = False\nif encendido:\n    if servicio_activo:\n        print(\"Operativo\")\n    else:\n        print(\"Revisar servicio\")\nelse:\n    print(\"Equipo apagado\")",
    "lineNotes": [
      "Líneas 1–2: describen el estado de un equipo ficticio.",
      "Línea 3: solo entra porque el equipo está encendido.",
      "Líneas 4–5: no se ejecuta el mensaje operativo; el servicio es False.",
      "Líneas 6–7: muestra Revisar servicio.",
      "Líneas 8–9: else exterior corresponde a if encendido y se omite."
    ],
    "asir": "clave_prueba = \"Laboratorio-2026\"\nusuario_activo = True\nif len(clave_prueba) >= 12 and usuario_activo:\n    print(\"Cumple la comprobación didáctica\")\nelse:\n    print(\"Revisar datos de prueba\")",
    "errors": [
      "Un else pertenece al if de su mismo nivel de sangría.",
      "No confundas una comprobación de longitud con una autenticación real.",
      "Demasiados niveles anidados dificultan probar todos los caminos."
    ],
    "quick": "Con encendido=True y mantenimiento=False, muestra Disponible solo cuando está encendido y no en mantenimiento.",
    "answer": "encendido = True\nmantenimiento = False\nif encendido and not mantenimiento:\n    print(\"Disponible\")",
    "terms": [
      "anidación",
      "condiciones",
      "and",
      "not"
    ],
    "note": "",
    "minutes": 25
  }
]);

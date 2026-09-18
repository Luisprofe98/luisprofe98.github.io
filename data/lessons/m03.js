"use strict";
Course.lessons.push(...[
  {
    "id": "m03-l1",
    "module": 3,
    "title": "Cálculos y asignación",
    "objective": "Aplicar operadores aritméticos a recursos de un equipo.",
    "body": [
      "Los operadores +, -, *, / y ** realizan suma, resta, producto, división y potencia. / produce división real; // calcula división entera hacia menos infinito, y % devuelve el resto. Por ejemplo, 7 // 3 es 2 y 7 % 3 es 1.",
      "Los paréntesis hacen explícito el orden. La potencia tiene prioridad sobre el producto y la división; estos se evalúan antes que la suma y la resta. Cuando el cálculo represente una fórmula de administración, usa paréntesis para que resulte evidente.",
      "Las asignaciones aumentadas actualizan una variable: usados += 10 equivale, para estos números, a usados = usados + 10. En almacenamiento distinguiremos GiB y MiB: 1 GiB son 1024 MiB. GB y MB decimales usan factores de 1000."
    ],
    "syntax": "+  -  *  /  //  %  **\ncontador += 1",
    "code": "total = 500\nusados = 125\nporcentaje = (usados / total) * 100\nlibres = total - usados\nprint(porcentaje, libres)",
    "lineNotes": [
      "Línea 1: establece una capacidad total de 500 unidades.",
      "Línea 2: registra 125 unidades ocupadas.",
      "Línea 3: divide y escala por 100; el resultado es 25.0.",
      "Línea 4: resta para obtener 375 unidades libres.",
      "Línea 5: muestra ambas medidas."
    ],
    "asir": "capacidad_gib = 8\ncapacidad_mib = capacidad_gib * 1024\ncopias = capacidad_mib // 700\nresto = capacidad_mib % 700\nprint(copias, resto)",
    "errors": [
      "Dividir entre cero genera ZeroDivisionError.",
      "No mezcles GB con GiB sin especificar la conversión.",
      "2 + 3 * 4 no es lo mismo que (2 + 3) * 4."
    ],
    "quick": "Un disco de 200 GiB usa 50 GiB. Calcula su porcentaje ocupado.",
    "answer": "print((50 / 200) * 100)",
    "terms": [
      "aritmética",
      "porcentaje",
      "asignación",
      "precedencia",
      "módulo"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m03-l2",
    "module": 3,
    "title": "Comparaciones y lógica",
    "objective": "Construir condiciones legibles con resultados booleanos.",
    "body": [
      "== y != comparan igualdad y diferencia. <, <=, > y >= comparan orden. Cada expresión produce True o False. Para un rango se puede encadenar: 0 <= puerto <= 65535, sin repetir la variable en dos comparaciones separadas.",
      "and exige que ambas condiciones sean verdaderas; or acepta que al menos una lo sea; not invierte su valor de verdad. and y or usan cortocircuito: pueden evitar evaluar la parte derecha cuando el resultado ya está decidido.",
      "Las comparaciones tienen prioridad sobre not, después se evalúa and y finalmente or. Aunque conozcas esta precedencia, agrupa condiciones extensas con paréntesis. Una expresión clara es más fácil de revisar que una expresión breve pero ambigua."
    ],
    "syntax": "valor == otro\ncondicion_a and condicion_b\nnot condicion",
    "code": "cpu = 85\nram = 40\nalerta = cpu >= 80 or ram >= 90\nsaludable = not alerta\nprint(alerta, saludable)",
    "lineNotes": [
      "Línea 1: CPU al 85 %.",
      "Línea 2: RAM al 40 %.",
      "Línea 3: basta que una métrica supere su umbral; alerta vale True.",
      "Línea 4: not invierte True a False.",
      "Línea 5: muestra True False."
    ],
    "asir": "puerto = 443\nvalido = 0 <= puerto <= 65535\npermitido = puerto == 80 or puerto == 443\nprint(valido and permitido)",
    "errors": [
      "Usar = donde querías == no es una comparación.",
      "puerto == 80 or 443 no compara dos puertos: 443 tiene valor de verdad verdadero.",
      "Una comparación de textos ordena texto, no números convertidos implícitamente."
    ],
    "quick": "Comprueba si una CPU al 45 % y una RAM al 60 % están ambas por debajo de 80.",
    "answer": "cpu = 45\nram = 60\nprint(cpu < 80 and ram < 80)",
    "terms": [
      "lógicos",
      "and",
      "or",
      "not",
      "comparación",
      "cortocircuito"
    ],
    "note": "",
    "minutes": 25
  }
]);

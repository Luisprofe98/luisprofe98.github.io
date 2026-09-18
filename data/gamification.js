"use strict";
// Configuración de recompensas y casos simulados. No sustituye el temario.
window.GameData = {
  "version": 1,
  "ranks": [
    {
      "xp": 0,
      "title": "Aprendiz de sistemas"
    },
    {
      "xp": 200,
      "title": "Operador de terminal"
    },
    {
      "xp": 550,
      "title": "Técnico de soporte"
    },
    {
      "xp": 1000,
      "title": "Explorador de scripts"
    },
    {
      "xp": 1650,
      "title": "Analista de sistemas"
    },
    {
      "xp": 2500,
      "title": "Especialista Python"
    },
    {
      "xp": 3500,
      "title": "Administrador de sistemas"
    },
    {
      "xp": 4800,
      "title": "Ingeniero de automatización"
    },
    {
      "xp": 6500,
      "title": "Arquitecto de operaciones"
    },
    {
      "xp": 8500,
      "title": "Maestro de Python Ops"
    }
  ],
  "points": {
    "lessons": 25,
    "exercises": {
      "Básico": 35,
      "Intermedio": 55,
      "Avanzado": 80
    },
    "challenges": {
      "Básico": 120,
      "Intermedio": 180,
      "Avanzado": 240
    },
    "predictions": 40,
    "debug": 30,
    "quizAttempt": 20,
    "quizAnswer": 15,
    "quizPerfect": 30,
    "mastery": 100,
    "incidentStep": 25
  },
  "avatars": [
    {
      "id": "terminal",
      "title": "Terminal",
      "icon": "terminal"
    },
    {
      "id": "shield",
      "title": "Centinela",
      "icon": "shield"
    },
    {
      "id": "bug",
      "title": "Depurador",
      "icon": "bug"
    },
    {
      "id": "code",
      "title": "Scripter",
      "icon": "code"
    },
    {
      "id": "layers",
      "title": "Arquitecto",
      "icon": "layers"
    },
    {
      "id": "spark",
      "title": "Automatizador",
      "icon": "spark"
    }
  ],
  "palettes": [
    {
      "id": "mint",
      "title": "Terminal menta",
      "level": 1
    },
    {
      "id": "blue",
      "title": "Red azul",
      "level": 3
    },
    {
      "id": "violet",
      "title": "Noche violeta",
      "level": 5
    },
    {
      "id": "amber",
      "title": "Ámbar de operaciones",
      "level": 7
    }
  ],
  "sectors": [
    {
      "id": "boot",
      "title": "Arranque del sistema",
      "subtitle": "De la consola a tu primer script interactivo.",
      "from": 1,
      "to": 4,
      "incident": "i01",
      "icon": "terminal"
    },
    {
      "id": "network",
      "title": "Control de la infraestructura",
      "subtitle": "Decisiones, estructuras y código reutilizable.",
      "from": 5,
      "to": 10,
      "incident": "i02",
      "icon": "layers"
    },
    {
      "id": "automation",
      "title": "Operaciones autónomas",
      "subtitle": "Archivos, diagnósticos y automatización segura.",
      "from": 11,
      "to": 14,
      "incident": "i03",
      "icon": "shield"
    }
  ],
  "missions": [
    {
      "id": "first",
      "title": "Primer turno de guardia",
      "text": "Completa 2 lecciones, 2 ejercicios y consigue al menos un 67% en un quiz.",
      "xp": 100,
      "icon": "terminal",
      "href": "#/module/1"
    },
    {
      "id": "diagnostic",
      "title": "Lee antes de ejecutar",
      "text": "Acierta 3 predicciones y autoevalúa 3 diagnósticos de errores.",
      "xp": 140,
      "icon": "eye",
      "href": "#/predict"
    },
    {
      "id": "foundation",
      "title": "Base de operaciones",
      "text": "Consigue las 3 estrellas de los módulos 1, 2, 3 y 4.",
      "xp": 180,
      "icon": "layers",
      "href": "#/operations"
    },
    {
      "id": "field",
      "title": "Trabajo de campo",
      "text": "Completa 15 ejercicios y 2 retos integradores.",
      "xp": 220,
      "icon": "code",
      "href": "#/exercises"
    },
    {
      "id": "quality",
      "title": "Control de calidad",
      "text": "Obtén un 100% en 5 cuestionarios distintos.",
      "xp": 200,
      "icon": "quiz",
      "href": "#/quizzes"
    },
    {
      "id": "resilience",
      "title": "Plan de contingencia",
      "text": "Consigue las 3 estrellas de los módulos 11 y 12.",
      "xp": 180,
      "icon": "shield",
      "href": "#/module/11"
    },
    {
      "id": "response",
      "title": "Equipo de respuesta",
      "text": "Resuelve los 3 incidentes de la campaña.",
      "xp": 250,
      "icon": "bug",
      "href": "#/operations"
    },
    {
      "id": "deployment",
      "title": "Despliegue completo",
      "text": "Consigue las 3 estrellas de los 14 módulos y completa 6 retos.",
      "xp": 400,
      "icon": "flag",
      "href": "#/challenges"
    }
  ],
  "incidents": [
    {
      "id": "i01",
      "title": "El alta que no arranca",
      "subtitle": "Un script de inventario mezcla texto y números. Revisa el alta de web01 antes de incorporarlo al laboratorio.",
      "modules": "1–4",
      "bonus": 125,
      "steps": [
        {
          "title": "01 · Normaliza la entrada",
          "text": "El operador escribe 16. ¿Qué línea permite sumar 4 GiB a la memoria introducida?",
          "code": "ram = input(\"RAM en GiB: \")\n# Normaliza ram aquí\nprint(ram + 4)",
          "options": [
            "ram = str(ram)",
            "ram = int(ram)",
            "ram = bool(ram)"
          ],
          "answer": 1,
          "explanation": "input() devuelve texto. int(ram) convierte \"16\" en 16, de modo que 16 + 4 produce 20. Una entrada no numérica requeriría validación, que estudiarás más adelante."
        },
        {
          "title": "02 · Calcula la ocupación",
          "text": "El disco tiene 200 GiB y se han usado 50. ¿Qué expresión calcula el porcentaje ocupado?",
          "code": "total = 200\nusados = 50\nporcentaje = ...",
          "options": [
            "total / usados * 100",
            "usados // total * 100",
            "usados / total * 100"
          ],
          "answer": 2,
          "explanation": "Se divide la parte usada entre la capacidad total y se multiplica por 100: 50 / 200 * 100 = 25.0. La capacidad debe ser mayor que cero."
        },
        {
          "title": "03 · Publica el resumen",
          "text": "El informe debe mostrar web01: 25.0%. ¿Qué línea genera ese texto?",
          "code": "host = \"web01\"\nporcentaje = 25.0",
          "options": [
            "print(f\"{host}: {porcentaje:.1f}%\")",
            "print(\"{host}: {porcentaje:.1f}%\")",
            "print(host + porcentaje + \"%\")"
          ],
          "answer": 0,
          "explanation": "La f-string sustituye las variables y :.1f muestra un decimal. Sin el prefijo f se imprimirían las llaves; sumar texto y un float produce TypeError."
        }
      ]
    },
    {
      "id": "i02",
      "title": "El monitor que lo ve todo verde",
      "subtitle": "El panel da por sanos equipos que necesitan atención. Corrige la lógica del monitor con datos ficticios, sin conexiones reales.",
      "modules": "5–10",
      "bonus": 225,
      "steps": [
        {
          "title": "01 · Revisa el umbral",
          "text": "Una CPU igual o superior al 80% debe activar la alerta. ¿Qué función cumple el requisito?",
          "code": "def en_alerta(cpu):\n    return ...",
          "options": [
            "cpu > 80",
            "cpu >= 80",
            "cpu <= 80"
          ],
          "answer": 1,
          "explanation": "El requisito incluye exactamente 80: se necesita >=. Con > se perdería el caso límite y con <= se alertaría sobre valores bajos."
        },
        {
          "title": "02 · Recorre el inventario",
          "text": "Necesitas recibir un hostname y su CPU en cada vuelta. ¿Cómo recorres el diccionario?",
          "code": "equipos = {\"web01\": 82, \"db01\": 35}\nfor host, cpu in ...:\n    print(host, cpu)",
          "options": [
            "equipos.values()",
            "equipos",
            "equipos.items()"
          ],
          "answer": 2,
          "explanation": "items() ofrece pares (clave, valor). Iterar directamente entrega las claves y values() entrega solo las medidas."
        },
        {
          "title": "03 · Conserva el contador",
          "text": "El resumen debe contar 2 alertas. ¿Dónde inicializas alertas = 0?",
          "code": "medidas = [91, 42, 85]\nfor cpu in medidas:\n    if en_alerta(cpu):\n        alertas += 1\nprint(alertas)",
          "options": [
            "Antes del for, fuera del bucle",
            "En cada vuelta, antes del if",
            "Después del print"
          ],
          "answer": 0,
          "explanation": "El acumulador debe existir antes de la primera suma y conservar su valor entre iteraciones. Inicializarlo en cada vuelta borraría el resultado anterior."
        }
      ]
    },
    {
      "id": "i03",
      "title": "El informe que desaparece",
      "subtitle": "Un proceso de informes pierde sus resultados. Revisa rutas, escritura y manejo de errores en un entorno de práctica.",
      "modules": "11–14",
      "bonus": 325,
      "steps": [
        {
          "title": "01 · No borres el historial",
          "text": "Cada turno añade una línea al informe sin borrar las anteriores. ¿Qué modo debes elegir?",
          "code": "with open(\"informe.txt\", ..., encoding=\"utf-8\") as f:\n    f.write(\"web01: ONLINE\\n\")",
          "options": [
            "\"w\"",
            "\"a\"",
            "\"r\""
          ],
          "answer": 1,
          "explanation": "El modo a añade al final y crea el archivo si no existe. w truncaría el contenido anterior; r no permite escribir."
        },
        {
          "title": "02 · Explica el error",
          "text": "El archivo de entrada aún no existe. ¿Qué excepción específica permite dar un mensaje útil?",
          "code": "try:\n    with open(\"entrada.txt\", encoding=\"utf-8\") as f:\n        datos = f.read()\nexcept ...:\n    print(\"Falta el archivo de entrada\")",
          "options": [
            "ValueError",
            "ZeroDivisionError",
            "FileNotFoundError"
          ],
          "answer": 2,
          "explanation": "La ausencia del archivo al abrirlo en lectura produce FileNotFoundError. Capturar una excepción concreta permite distinguirla de otros problemas."
        },
        {
          "title": "03 · Limita el alcance",
          "text": "Quieres enumerar solo los archivos .log directamente dentro de practica, sin modificar archivos. ¿Qué opción encaja?",
          "code": "from pathlib import Path\ncarpeta = Path(\"practica\")\nfor ruta in ...:\n    if ruta.is_file():\n        print(ruta.name)",
          "options": [
            "carpeta.glob(\"*.log\")",
            "carpeta.glob(\"*.txt\")",
            "carpeta.rglob(\"*.log\")"
          ],
          "answer": 0,
          "explanation": "glob(\"*.log\") enumera las coincidencias directamente en la carpeta de práctica. El filtro is_file() excluye directorios. El patrón *.txt no selecciona logs y rglob recorrería también subcarpetas, fuera del alcance solicitado. Ninguna operación escribe ni borra archivos."
        }
      ]
    }
  ]
};

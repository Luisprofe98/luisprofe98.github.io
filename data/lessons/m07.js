"use strict";
Course.lessons.push(...[
  {
    "id": "m07-l1",
    "module": 7,
    "title": "Crear, indexar y cortar listas",
    "objective": "Consultar partes de una colección ordenada.",
    "body": [
      "Una lista conserva el orden de sus elementos y es mutable: puedes modificarla. Se escribe con corchetes y comas. Los índices empiezan por cero; -1 accede al último elemento si existe.",
      "El slicing lista[inicio:fin:paso] obtiene una nueva lista. El inicio se incluye y el final se excluye. Omitir un extremo permite ir desde el comienzo o hasta el final. lista[:] crea una copia superficial, suficiente para nuestras listas de nombres.",
      "len(lista) da el número de elementos. Acceder a un índice inexistente causa IndexError, pero un slice que sobrepasa el final se recorta. Antes de usar lista[0] en datos desconocidos, comprueba que la lista no esté vacía."
    ],
    "syntax": "equipos = [\"web01\", \"db01\"]\nequipos[0]\nequipos[0:2]",
    "code": "equipos = [\"web01\", \"db01\", \"dns01\", \"backup01\"]\nprint(equipos[0])\nprint(equipos[-1])\nprint(equipos[1:3])\nprint(len(equipos))",
    "lineNotes": [
      "Línea 1: crea cuatro elementos ordenados.",
      "Línea 2: el índice 0 devuelve web01.",
      "Línea 3: el índice -1 devuelve backup01.",
      "Línea 4: los índices 1 y 2 forman ['db01', 'dns01']; el 3 queda fuera.",
      "Línea 5: la lista tiene cuatro elementos."
    ],
    "asir": "usuarios = [\"ana\", \"luis\", \"marta\", \"pablo\"]\nprimer_turno = usuarios[:2]\nsegundo_turno = usuarios[2:]\nprint(primer_turno, segundo_turno)",
    "errors": [
      "La primera posición es 0, no 1.",
      "lista[len(lista)] está fuera de rango.",
      "Una copia superficial no duplica recursivamente objetos anidados."
    ],
    "quick": "Con servicios=[\"ssh\", \"http\", \"dns\"], muestra los dos primeros mediante slicing.",
    "answer": "servicios = [\"ssh\", \"http\", \"dns\"]\nprint(servicios[:2])",
    "terms": [
      "listas",
      "índices",
      "slicing",
      "len"
    ],
    "note": "",
    "minutes": 20
  },
  {
    "id": "m07-l2",
    "module": 7,
    "title": "Modificar y ordenar colecciones",
    "objective": "Elegir entre añadir, quitar, extraer y ordenar.",
    "body": [
      "append(valor) añade un elemento al final. Puedes sustituir una posición con lista[indice] = nuevo. remove(valor) elimina la primera coincidencia de un valor y falla con ValueError si no existe.",
      "pop(indice) elimina y devuelve un elemento; sin índice extrae el último. No es lo mismo que remove, que recibe un valor y no devuelve el elemento eliminado. Ambos modifican la lista.",
      "sort() ordena la propia lista y devuelve None. sorted(lista) construye una nueva lista ordenada sin modificar la original. Dos variables unidas mediante otra = lista apuntan a la misma lista; usa copy() si necesitas una copia superficial independiente."
    ],
    "syntax": "lista.append(valor)\nlista.remove(valor)\nultimo = lista.pop()\nlista.sort()",
    "code": "servicios = [\"ssh\", \"dns\"]\nservicios.append(\"http\")\nservicios.remove(\"dns\")\nservicios.sort()\nultimo = servicios.pop()\nprint(servicios, ultimo)",
    "lineNotes": [
      "Línea 1: crea ssh y dns.",
      "Línea 2: añade http al final.",
      "Línea 3: elimina el valor dns.",
      "Línea 4: ordena a ['http', 'ssh'].",
      "Línea 5: extrae ssh y lo guarda en ultimo.",
      "Línea 6: muestra ['http'] ssh."
    ],
    "asir": "equipos = [\"pc03\", \"pc01\", \"pc02\"]\nordenados = sorted(equipos)\nprint(\"Original:\", equipos)\nprint(\"Informe:\", ordenados)",
    "errors": [
      "lista = lista.sort() reemplaza tu variable por None.",
      "remove() falla si el valor no está presente.",
      "pop() sobre una lista vacía produce IndexError."
    ],
    "quick": "Añade \"backup01\" a [\"web01\", \"db01\"] y muestra la lista ordenada.",
    "answer": "equipos = [\"web01\", \"db01\"]\nequipos.append(\"backup01\")\nequipos.sort()\nprint(equipos)",
    "terms": [
      "append",
      "remove",
      "pop",
      "sort",
      "sorted",
      "copy"
    ],
    "note": "",
    "minutes": 25
  }
]);

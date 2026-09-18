"use strict";
Course.challenges = [
  {
    "id": "r01",
    "title": "Monitor de servidores",
    "module": 8,
    "level": "Intermedio",
    "brief": "El equipo de soporte te entrega los estados de cuatro servidores. Construye un informe sin realizar conexiones: los booleanos ya representan el resultado de una comprobación simulada.",
    "requirements": [
      "Muestra cada hostname y su estado ONLINE u OFFLINE.",
      "Cuenta cuántos están activos y cuántos están caídos.",
      "Conserva el orden de entrada y termina con el resumen.",
      "Prueba después con un diccionario vacío y comprueba que ambos contadores sean cero."
    ],
    "starter": "servidores = {\n    \"web01\": True, \"web02\": False,\n    \"db01\": True, \"backup01\": False\n}\n# Genera el informe y el resumen a partir de estos datos.",
    "solution": "servidores = {\"web01\": True, \"web02\": False, \"db01\": True, \"backup01\": False}\nactivos = 0\ncaidos = 0\nfor nombre, activo in servidores.items():\n    if activo:\n        estado = \"ONLINE\"\n        activos += 1\n    else:\n        estado = \"OFFLINE\"\n        caidos += 1\n    print(f\"{nombre}: {estado}\")\nprint(f\"Activos: {activos} | Caídos: {caidos}\")",
    "explanation": "items() proporciona el nombre y el estado de cada servidor. La rama elegida actualiza su contador; los contadores se inicializan fuera del bucle, así que una entrada vacía sigue siendo válida.",
    "expected": "web01: ONLINE\nweb02: OFFLINE\ndb01: ONLINE\nbackup01: OFFLINE\nActivos: 2 | Caídos: 2",
    "minutes": 35
  },
  {
    "id": "r02",
    "title": "Analizador de logs",
    "module": 10,
    "level": "Intermedio",
    "brief": "Un servicio exporta registros con formato NIVEL IP MENSAJE. Necesitas contar errores y avisos y extraer las IP implicadas en ellos. Las palabras del mensaje no deben alterar el nivel del registro.",
    "requirements": [
      "Cuenta ERROR y WARNING por el primer campo.",
      "Recoge las IP de esos dos niveles sin duplicados y muéstralas ordenadas.",
      "Ignora líneas vacías y cuenta como malformadas las que no tienen tres campos.",
      "No cuentes ERROR cuando aparece solamente dentro de un mensaje INFO."
    ],
    "starter": "logs = [\n    \"INFO 192.0.2.1 inicio\",\n    \"ERROR 192.0.2.2 disco_lleno\",\n    \"WARNING 192.0.2.3 cpu_alta\",\n    \"ERROR 192.0.2.2 timeout\",\n    \"INFO 192.0.2.4 mensaje ERROR\", \"\", \"ERROR\"\n]\n# Analiza el formato NIVEL IP MENSAJE.",
    "solution": "logs = [\"INFO 192.0.2.1 inicio\", \"ERROR 192.0.2.2 disco_lleno\",\n        \"WARNING 192.0.2.3 cpu_alta\", \"ERROR 192.0.2.2 timeout\",\n        \"INFO 192.0.2.4 mensaje ERROR\", \"\", \"ERROR\"]\nconteo = {\"ERROR\": 0, \"WARNING\": 0}\nips = set()\nmalformadas = 0\nfor linea in logs:\n    if not linea.strip():\n        continue\n    partes = linea.split(maxsplit=2)\n    if len(partes) != 3:\n        malformadas += 1\n        continue\n    nivel, ip, mensaje = partes\n    if nivel in conteo:\n        conteo[nivel] += 1\n        ips.add(ip)\nprint(f\"ERROR: {conteo['ERROR']}\")\nprint(f\"WARNING: {conteo['WARNING']}\")\nprint(\"IP: \" + \", \".join(sorted(ips)))\nprint(f\"Malformadas: {malformadas}\")",
    "explanation": "split(maxsplit=2) conserva el mensaje completo y permite verificar la estructura. El conjunto elimina las IP repetidas; el nivel se comprueba por igualdad exacta.",
    "expected": "ERROR: 2\nWARNING: 1\nIP: 192.0.2.2, 192.0.2.3\nMalformadas: 1",
    "minutes": 45
  },
  {
    "id": "r03",
    "title": "Inventario de red",
    "module": 9,
    "level": "Intermedio",
    "brief": "El aula necesita un inventario en memoria con hostname, IP, sistema operativo y estado. Diseña una función de alta que rechace hostnames duplicados y otra que consulte un equipo.",
    "requirements": [
      "Usa el hostname como clave del inventario.",
      "La función registrar debe devolver False si el hostname ya existe, sin sobrescribirlo.",
      "Registra web01 y db01 con los datos proporcionados y prueba un alta duplicada.",
      "Muestra la ficha de db01 y un mensaje si consultas un equipo inexistente."
    ],
    "starter": "inventario = {}\n# web01: 192.0.2.10, Linux, True\n# db01: 192.0.2.11, Linux, False\n# Define registrar y consultar antes de utilizarlas.",
    "solution": "def registrar(inventario, host, ip, so, activo):\n    if host in inventario:\n        return False\n    inventario[host] = {\"ip\": ip, \"so\": so, \"activo\": activo}\n    return True\n\ndef consultar(inventario, host):\n    return inventario.get(host)\n\ninventario = {}\nregistrar(inventario, \"web01\", \"192.0.2.10\", \"Linux\", True)\nregistrar(inventario, \"db01\", \"192.0.2.11\", \"Linux\", False)\nprint(\"Alta duplicada:\", registrar(inventario, \"web01\", \"192.0.2.99\", \"Otro\", True))\ndatos = consultar(inventario, \"db01\")\nprint(f\"db01 | {datos['ip']} | {datos['so']} | {datos['activo']}\")\nif consultar(inventario, \"no_existe\") is None:\n    print(\"Equipo no encontrado\")",
    "explanation": "Las funciones reciben el inventario explícitamente. La comprobación de pertenencia evita reemplazar un registro existente; get devuelve None cuando falta una clave.",
    "expected": "Alta duplicada: False\ndb01 | 192.0.2.11 | Linux | False\nEquipo no encontrado",
    "minutes": 50
  },
  {
    "id": "r04",
    "title": "Planificador de copias",
    "module": 9,
    "level": "Intermedio",
    "brief": "Se dispone de 10 GiB libres para copiar ficheros ficticios cuyos tamaños ya conoces. Selecciona, en el orden dado, los que caben. No muevas ni copies archivos reales.",
    "requirements": [
      "Convierte los 10 GiB disponibles a MiB antes de comparar.",
      "Acepta cada elemento si cabe en el espacio restante y descuenta su tamaño.",
      "Si uno no cabe, omítelo y sigue evaluando los siguientes.",
      "Muestra COPIAR u OMITIR, el nombre y al final el espacio libre en MiB."
    ],
    "starter": "libres_gib = 10\narchivos = [(\"usuarios.csv\", 100), (\"imagen.img\", 9000),\n            (\"datos.tar\", 2000), (\"config.zip\", 200)]\n# Todos los tamaños de archivos están en MiB.",
    "solution": "libres_gib = 10\narchivos = [(\"usuarios.csv\", 100), (\"imagen.img\", 9000),\n            (\"datos.tar\", 2000), (\"config.zip\", 200)]\nlibres = libres_gib * 1024\nfor nombre, tamano in archivos:\n    if tamano <= libres:\n        libres -= tamano\n        print(f\"COPIAR: {nombre}\")\n    else:\n        print(f\"OMITIR: {nombre}\")\nprint(f\"Libres: {libres} MiB\")",
    "explanation": "El espacio disponible se actualiza después de cada aceptación. Un elemento omitido no detiene la evaluación de los demás. Es una selección por orden, no un algoritmo de optimización del espacio.",
    "expected": "COPIAR: usuarios.csv\nCOPIAR: imagen.img\nOMITIR: datos.tar\nCOPIAR: config.zip\nLibres: 940 MiB",
    "minutes": 40
  },
  {
    "id": "r05",
    "title": "Auditor de usuarios",
    "module": 10,
    "level": "Intermedio",
    "brief": "Un listado combina nombres con mayúsculas, espacios y entradas repetidas. Prepara una lista limpia y un informe de duplicados, sin crear, borrar ni modificar cuentas.",
    "requirements": [
      "Limpia extremos y convierte cada nombre a minúsculas.",
      "Ignora nombres vacíos.",
      "Cuenta cada aparición adicional de un nombre ya visto.",
      "Muestra los nombres únicos ordenados y el número de duplicados."
    ],
    "starter": "entradas = [\" Ana \", \"LUIS\", \"ana\", \"\", \" Marta \", \"luis\", \"  \"]\n# Normaliza antes de comparar.",
    "solution": "entradas = [\" Ana \", \"LUIS\", \"ana\", \"\", \" Marta \", \"luis\", \"  \"]\nunicos = set()\nduplicados = 0\nfor entrada in entradas:\n    nombre = entrada.strip().lower()\n    if not nombre:\n        continue\n    if nombre in unicos:\n        duplicados += 1\n    else:\n        unicos.add(nombre)\nprint(\"Usuarios: \" + \", \".join(sorted(unicos)))\nprint(f\"Duplicados: {duplicados}\")",
    "explanation": "La normalización debe preceder a la comparación: Ana y ana se consideran la misma entrada. Cada aparición extra cuenta una vez, incluso si un usuario aparece tres o más veces.",
    "expected": "Usuarios: ana, luis, marta\nDuplicados: 2",
    "minutes": 35
  },
  {
    "id": "r06",
    "title": "Validador de puertos",
    "module": 12,
    "level": "Avanzado",
    "brief": "Un fichero de configuración ha llegado como una lista de cadenas. Convierte los puertos y distingue errores de formato, errores de rango y valores válidos.",
    "requirements": [
      "Procesa todas las entradas aunque alguna falle.",
      "Usa int para convertir y captura ValueError.",
      "Exige un rango inclusivo de 0 a 65535.",
      "Conserva el orden de las entradas y muestra el diagnóstico de cada una."
    ],
    "starter": "entradas = [\"22\", \"443\", \"abc\", \"70000\", \"-1\", \"0\"]\n# Separa conversión y comprobación de rango.",
    "solution": "def clasificar_puerto(texto):\n    try:\n        puerto = int(texto)\n    except ValueError:\n        return \"FORMATO INCORRECTO\"\n    if not 0 <= puerto <= 65535:\n        return \"FUERA DE RANGO\"\n    return \"VÁLIDO\"\n\nentradas = [\"22\", \"443\", \"abc\", \"70000\", \"-1\", \"0\"]\nfor entrada in entradas:\n    print(f\"{entrada}: {clasificar_puerto(entrada)}\")",
    "explanation": "La función produce un diagnóstico para cada caso. 70000 y -1 son enteros bien formados, pero no pertenecen al rango permitido.",
    "expected": "22: VÁLIDO\n443: VÁLIDO\nabc: FORMATO INCORRECTO\n70000: FUERA DE RANGO\n-1: FUERA DE RANGO\n0: VÁLIDO",
    "minutes": 45
  },
  {
    "id": "r07",
    "title": "Informe de disponibilidad",
    "module": 9,
    "level": "Avanzado",
    "brief": "Recibes pares de minutos activos y minutos observados. Genera un porcentaje por servicio y distingue las mediciones inválidas para no presentar cifras engañosas.",
    "requirements": [
      "Rechaza totales <= 0, activos negativos y activos mayores que el total.",
      "No calcules porcentajes con datos inválidos.",
      "Para datos válidos muestra dos decimales.",
      "Indica CUMPLE si la disponibilidad alcanza el 99 %; en otro caso, REVISAR."
    ],
    "starter": "mediciones = {\"web01\": (1430, 1440), \"db01\": (1300, 1440),\n              \"dns01\": (10, 0), \"backup01\": (1500, 1440)}\n# Define una función que devuelva None cuando los datos sean inválidos.",
    "solution": "def disponibilidad(activos, total):\n    if total <= 0 or activos < 0 or activos > total:\n        return None\n    return activos / total * 100\n\nmediciones = {\"web01\": (1430, 1440), \"db01\": (1300, 1440),\n              \"dns01\": (10, 0), \"backup01\": (1500, 1440)}\nfor host, tiempos in mediciones.items():\n    porcentaje = disponibilidad(*tiempos)\n    if porcentaje is None:\n        print(f\"{host}: DATOS INVÁLIDOS\")\n    else:\n        estado = \"CUMPLE\" if porcentaje >= 99 else \"REVISAR\"\n        print(f\"{host}: {porcentaje:.2f}% | {estado}\")",
    "explanation": "None distingue una medición inválida de una disponibilidad válida de 0 %. El desempaquetado *tiempos pasa los dos componentes como argumentos; también podrías pasar tiempos[0] y tiempos[1].",
    "expected": "web01: 99.31% | CUMPLE\ndb01: 90.28% | REVISAR\ndns01: DATOS INVÁLIDOS\nbackup01: DATOS INVÁLIDOS",
    "minutes": 50
  },
  {
    "id": "r08",
    "title": "Lector de configuración",
    "module": 12,
    "level": "Avanzado",
    "brief": "Analiza una configuración de texto con líneas clave=valor, comentarios y espacios. Algunas líneas están malformadas y un valor puede contener el carácter =.",
    "requirements": [
      "Ignora líneas vacías y comentarios que comiencen por # tras limpiar espacios.",
      "Divide solo por el primer = y limpia clave y valor.",
      "Cuenta como inválidas las líneas sin = o con clave vacía.",
      "Si hay claves repetidas, gana la última; documenta esta decisión."
    ],
    "starter": "lineas = [\"# Práctica\", \" host = web01 \", \"puerto=443\",\n          \"token=valor=simulado\", \"sin_separador\", \"=vacío\", \"host=web02\"]\n# El token es texto ficticio; no introduzcas secretos reales.",
    "solution": "lineas = [\"# Práctica\", \" host = web01 \", \"puerto=443\",\n          \"token=valor=simulado\", \"sin_separador\", \"=vacío\", \"host=web02\"]\nconfig = {}\ninvalidas = 0\nfor linea in lineas:\n    linea = linea.strip()\n    if not linea or linea.startswith(\"#\"):\n        continue\n    if \"=\" not in linea:\n        invalidas += 1\n        continue\n    clave, valor = linea.split(\"=\", 1)\n    clave, valor = clave.strip(), valor.strip()\n    if not clave:\n        invalidas += 1\n        continue\n    config[clave] = valor\nfor clave, valor in config.items():\n    print(f\"{clave}: {valor}\")\nprint(f\"Inválidas: {invalidas}\")",
    "explanation": "split(\"=\", 1) evita romper valores que contienen ese carácter. La asignación de diccionario sustituye valores duplicados y mantiene la posición inicial de la clave en el orden de inserción.",
    "expected": "host: web02\npuerto: 443\ntoken: valor=simulado\nInválidas: 2",
    "minutes": 55
  },
  {
    "id": "r09",
    "title": "Inventario de archivos",
    "module": 14,
    "level": "Avanzado",
    "brief": "Prepara una carpeta virtual con tres archivos de ejemplo y genera un informe CSV de sus nombres y tamaños. La práctica no debe inspeccionar carpetas personales ni borrar archivos.",
    "requirements": [
      "Crea practica_archivos y escribe los tres archivos suministrados.",
      "Recorre únicamente esa carpeta y descarta directorios.",
      "Obtén el tamaño en bytes con stat().st_size y ordena por nombre.",
      "Escribe el informe fuera de la carpeta analizada para que no se incluya a sí mismo."
    ],
    "starter": "from pathlib import Path\ncarpeta = Path(\"practica_archivos\")\ncarpeta.mkdir(exist_ok=True)\nfor nombre, texto in {\"a.txt\": \"hola\", \"b.ini\": \"x=1\", \"c.log\": \"OK\"}.items():\n    (carpeta / nombre).write_text(texto, encoding=\"utf-8\")\n# Genera informe_archivos.csv en el directorio de trabajo.",
    "solution": "from pathlib import Path\ncarpeta = Path(\"practica_archivos\")\ncarpeta.mkdir(exist_ok=True)\nfor nombre, texto in {\"a.txt\": \"hola\", \"b.ini\": \"x=1\", \"c.log\": \"OK\"}.items():\n    (carpeta / nombre).write_text(texto, encoding=\"utf-8\")\nwith open(\"informe_archivos.csv\", \"w\", encoding=\"utf-8\") as salida:\n    salida.write(\"nombre;bytes\\n\")\n    for ruta in sorted(carpeta.iterdir()):\n        if ruta.is_file():\n            salida.write(f\"{ruta.name};{ruta.stat().st_size}\\n\")\nprint(Path(\"informe_archivos.csv\").read_text(encoding=\"utf-8\"), end=\"\")",
    "explanation": "El informe se crea fuera del origen. Los textos contienen solo caracteres ASCII, por lo que sus tamaños UTF-8 son 4, 3 y 2 bytes; con otros caracteres el número de bytes puede diferir del número de caracteres.",
    "expected": "nombre;bytes\na.txt;4\nb.ini;3\nc.log;2",
    "minutes": 55
  },
  {
    "id": "r10",
    "title": "Depurador de direcciones IP",
    "module": 14,
    "level": "Avanzado",
    "brief": "Un inventario contiene direcciones repetidas, espacios e IPv4 incorrectas. Produce una lista normalizada y ordenada de direcciones válidas sin duplicados y cuenta las inválidas.",
    "requirements": [
      "Limpia cada entrada antes de validarla.",
      "Usa IPv4Address; no basta separar por puntos.",
      "Cuenta las entradas no válidas, incluida la cadena vacía.",
      "Ordena numéricamente las direcciones y no como simples cadenas."
    ],
    "starter": "entradas = [\"192.0.2.10\", \"192.0.2.2\", \" 192.0.2.10 \",\n            \"999.1.1.1\", \"\", \"198.51.100.1\"]\n# No realices ping, escaneos ni conexiones.",
    "solution": "from ipaddress import IPv4Address\nentradas = [\"192.0.2.10\", \"192.0.2.2\", \" 192.0.2.10 \",\n            \"999.1.1.1\", \"\", \"198.51.100.1\"]\nvalidas = set()\ninvalidas = 0\nfor entrada in entradas:\n    try:\n        validas.add(IPv4Address(entrada.strip()))\n    except ValueError:\n        invalidas += 1\nfor ip in sorted(validas):\n    print(ip)\nprint(f\"Inválidas: {invalidas}\")",
    "explanation": "Los objetos IPv4Address se pueden comparar por el valor numérico de la dirección, así que .2 aparece antes que .10. El conjunto elimina duplicados tras normalizar.",
    "expected": "192.0.2.2\n192.0.2.10\n198.51.100.1\nInválidas: 2",
    "minutes": 50
  },
  {
    "id": "r11",
    "title": "Resumen de métricas",
    "module": 12,
    "level": "Avanzado",
    "brief": "Una monitorización simulada entrega medidas de CPU como texto. Descarta conversiones inválidas y valores fuera de 0–100, y genera estadísticas sobre el resto.",
    "requirements": [
      "Convierte cada dato a float y captura errores.",
      "Acepta solo valores en el intervalo inclusivo 0–100.",
      "Muestra número de válidos e inválidos, mínimo, máximo y media con un decimal.",
      "Si no hay valores válidos, muestra Sin métricas válidas en vez de dividir por cero."
    ],
    "starter": "datos = [\"20\", \"80\", \"100\", \"err\", \"-1\", \"101\", \"40\"]\n# Mantén un contador de descartes y una lista de valores válidos.",
    "solution": "datos = [\"20\", \"80\", \"100\", \"err\", \"-1\", \"101\", \"40\"]\nvalidos = []\ninvalidos = 0\nfor dato in datos:\n    try:\n        cpu = float(dato)\n    except ValueError:\n        invalidos += 1\n        continue\n    if not 0 <= cpu <= 100:\n        invalidos += 1\n        continue\n    validos.append(cpu)\nprint(f\"Válidos: {len(validos)} | Inválidos: {invalidos}\")\nif validos:\n    print(f\"Mínimo: {min(validos):.1f}\")\n    print(f\"Máximo: {max(validos):.1f}\")\n    print(f\"Media: {sum(validos) / len(validos):.1f}\")\nelse:\n    print(\"Sin métricas válidas\")",
    "explanation": "La conversión y el rango son comprobaciones diferentes. La lista vacía se trata antes de min, max y la división, que no producirían estadísticas útiles.",
    "expected": "Válidos: 4 | Inválidos: 3\nMínimo: 20.0\nMáximo: 100.0\nMedia: 60.0",
    "minutes": 50
  },
  {
    "id": "r12",
    "title": "Proyecto final: parte de operaciones",
    "module": 14,
    "level": "Avanzado",
    "brief": "Une inventario, validación y exportación en un pequeño parte diario. Los registros son ficticios y el informe debe permitir al docente comprobar qué entradas se aceptaron y cuáles se rechazaron.",
    "requirements": [
      "Valida hostname no vacío, IPv4, CPU numérica entre 0 y 100 y estado de tipo bool.",
      "Rechaza los registros inválidos sin detener el procesamiento.",
      "Muestra ALERTA si el equipo está caído o su CPU es al menos 80; en otro caso, OK.",
      "Exporta operaciones.csv con host;ip;cpu;estado y los equipos válidos.",
      "Muestra el informe y el número de registros rechazados."
    ],
    "starter": "registros = [\n    {\"host\": \"web01\", \"ip\": \"192.0.2.10\", \"cpu\": \"85\", \"activo\": True},\n    {\"host\": \"db01\", \"ip\": \"192.0.2.11\", \"cpu\": \"30\", \"activo\": False},\n    {\"host\": \"dns01\", \"ip\": \"192.0.2.12\", \"cpu\": \"20\", \"activo\": True},\n    {\"host\": \"roto\", \"ip\": \"999.0.0.1\", \"cpu\": \"x\", \"activo\": True}\n]\n# Organiza validación y exportación en funciones.",
    "solution": "from ipaddress import IPv4Address\n\ndef validar(registro):\n    host = registro[\"host\"].strip()\n    ip = str(IPv4Address(registro[\"ip\"]))\n    cpu = float(registro[\"cpu\"])\n    activo = registro[\"activo\"]\n    if not host or \";\" in host or \"\\n\" in host or not 0 <= cpu <= 100:\n        raise ValueError(\"Datos no válidos\")\n    if not isinstance(activo, bool):\n        raise ValueError(\"Estado no booleano\")\n    estado = \"ALERTA\" if not activo or cpu >= 80 else \"OK\"\n    return f\"{host};{ip};{cpu:.1f};{estado}\"\n\ndef exportar(filas):\n    with open(\"operaciones.csv\", \"w\", encoding=\"utf-8\") as archivo:\n        archivo.write(\"host;ip;cpu;estado\\n\")\n        for fila in filas:\n            archivo.write(fila + \"\\n\")\n\nregistros = [\n    {\"host\": \"web01\", \"ip\": \"192.0.2.10\", \"cpu\": \"85\", \"activo\": True},\n    {\"host\": \"db01\", \"ip\": \"192.0.2.11\", \"cpu\": \"30\", \"activo\": False},\n    {\"host\": \"dns01\", \"ip\": \"192.0.2.12\", \"cpu\": \"20\", \"activo\": True},\n    {\"host\": \"roto\", \"ip\": \"999.0.0.1\", \"cpu\": \"x\", \"activo\": True}\n]\nfilas = []\nrechazados = 0\nfor registro in registros:\n    try:\n        filas.append(validar(registro))\n    except (ValueError, KeyError, TypeError, AttributeError):\n        rechazados += 1\nexportar(filas)\nwith open(\"operaciones.csv\", \"r\", encoding=\"utf-8\") as archivo:\n    print(archivo.read(), end=\"\")\nprint(f\"Rechazados: {rechazados}\")",
    "explanation": "La función validar devuelve una fila solo si cumple las precondiciones. El bucle captura los errores por registro; exportar recibe exclusivamente filas válidas. Para CSV con campos arbitrarios se debe estudiar el módulo csv, evitando concatenar campos sin escapar.",
    "expected": "host;ip;cpu;estado\nweb01;192.0.2.10;85.0;ALERTA\ndb01;192.0.2.11;30.0;ALERTA\ndns01;192.0.2.12;20.0;OK\nRechazados: 1",
    "minutes": 90
  }
];

# 🎵 Canciones con IA — 2º Bachillerato

Proyecto de creación musical con inteligencia artificial para la asignatura de Tecnología e Informática de 2º de Bachillerato.

## 📁 Estructura del repositorio

```
/
├── index.html        ← Página principal (HTML limpio, sin CSS ni JS inline)
├── css/
│   └── style.css     ← Todos los estilos
├── js/
│   └── main.js       ← Toda la interactividad
├── audio/
│   ├── cancion1.mp3  ← Archivos de audio del alumnado
│   ├── cancion2.mp3
│   └── ...
└── README.md
```

## 🚀 Cómo publicar en GitHub Pages

1. Sube todos los archivos al repositorio respetando la estructura de carpetas.
2. Ve a **Settings → Pages** del repositorio.
3. En *Source*, selecciona **Deploy from a branch → main → / (root)**.
4. Guarda. En unos minutos la web estará disponible en:
   `https://[usuario].github.io/[nombre-repositorio]/`

> **Importante:** GitHub Pages sirve `index.html` automáticamente si está en la raíz. Las rutas relativas (`css/style.css`, `js/main.js`, `audio/cancionX.mp3`) funcionan sin ninguna configuración adicional.

## 🎵 Cómo añadir canciones

1. Sube el archivo de audio (`.mp3`) a la carpeta `audio/`.
2. En `index.html`, localiza la sección `<div class="songs-grid">`.
3. Copia y pega un bloque `<article class="song-card">` existente.
4. Edita: título, artista, género, descripción y ruta `src="audio/tu-archivo.mp3"`.

## ✏️ Cómo personalizar

| Qué cambiar            | Dónde                          |
|------------------------|--------------------------------|
| Colores del tema       | `css/style.css` → `:root { }` |
| Tipografías            | `index.html` → `<link>` Google Fonts + `css/style.css` → `--font-*` |
| Textos de la web       | `index.html`                   |
| Lógica / interactividad | `js/main.js`                  |

## 📝 Licencia

Creative Commons CC BY-NC-SA 4.0 — Uso educativo no comercial.

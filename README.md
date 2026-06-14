# Plaza Paraíso Torremolinos — Sitio web

Sitio web del festival **Plaza Paraíso** (Plaza de Toros de Torremolinos, verano 2026).
HTML + CSS puro, sin frameworks ni dependencias de compilación. Funciona abriendo `index.html` directamente en el navegador.

## Estructura

```
index.html              Home
programa.html           Programa completo (cartel) + calendario
festival.html           El Festival (historia, timeline, cifras)
faqs.html               Preguntas frecuentes + tabla comparativa
entradas.html           Tipos de entrada / abonos
contacto.html           Formulario de contacto (Formspree)
categoria-*.html        Páginas por categoría (música, teatro, gastronomía, ocio)
evento-*.html           7 landing pages de venta, una por evento
aviso-legal.html        Aviso legal y condiciones de compra
privacidad.html         Política de privacidad (RGPD)
cookies.html            Política de cookies
styles.css              Hoja de estilos global (tokens editables al inicio)
cookies.js              Banner de cookies (RGPD) + Google Analytics 4 + Meta Pixel + eventos
assets/
  img/                  Imágenes y carteles de los eventos
  video/cabecera.mp4    Vídeo de fondo del hero
  fonts/Esther.otf      Tipografía display de la marca
```

## Publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta a un repositorio.
2. En el repo: **Settings → Pages → Branch: main / root** → Save.
3. La web quedará publicada en `https://<usuario>.github.io/<repo>/`.

## Configuración pendiente (placeholders)

- **Formulario de contacto** (`contacto.html`): sustituir `https://formspree.io/f/TU_FORM_ID`
  en el `action` del `<form id="contact-form">` por el endpoint real de Formspree.
- **Analítica** (`cookies.js`): ya configurado con Google Analytics 4 (`G-BHMT2HPE9S`) y
  Meta Pixel (`1682488766224635`). Se cargan solo tras aceptar el banner de cookies.
- **Vídeo del reel** (home): el reel enlaza a un Short de YouTube; requiere que el vídeo
  tenga la incrustación permitida.

## Personalización

Todas las variables de marca (colores, tipografías, espaciado, radios, sombras) están al
inicio de `styles.css`, en el bloque `:root`. Cambiándolas ahí se reestiliza todo el sitio.

---
© 2026 Plaza Paraíso Torremolinos · Organiza Locamente con la colaboración del Ayuntamiento de Torremolinos.

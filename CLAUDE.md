# Plaza Paraíso — notas del proyecto

Sitio estático multipágina (HTML + `styles.css`). Idioma `es`. Dominio: `https://www.plazaparaiso.com`.
Analítica: GTM `GTM-P6BSNSRF` (carga GA4 `G-BHMT2HPE9S` y Meta Pixel `1715018873258485`).

## Checklist OBLIGATORIA para entradas del blog (pasadas y futuras)

Cada vez que cree o edite un artículo del blog, debe cumplir TODO esto:

1. **URL propia y limpia** — un artículo = una carpeta: `blog/<slug>/index.html` (Netlify lo sirve en
   `https://www.plazaparaiso.com/blog/<slug>`, sin `.html` ni barra final). El `<slug>` de la carpeta DEBE
   coincidir exactamente con el del `<link rel="canonical" href="https://www.plazaparaiso.com/blog/<slug>">`,
   y esa misma URL va en `og:url`, `mainEntityOfPage` y el último item del `BreadcrumbList`.
   El listado del blog sigue siendo `blog.html` en la raíz (se sirve en `/blog`).
2. **Sitemap actualizado** — añadir `https://www.plazaparaiso.com/blog/<slug>` a `sitemap.xml`
   (changefreq monthly, priority 0.6) con `lastmod` de hoy.
3. **No bloqueado en robots.txt** — `robots.txt` permite `/` y solo bloquea `/uploads/` y `/_ds/`.
   Nunca añadir `Disallow` que afecte a `/blog`. El artículo lleva `<meta name="robots" content="index, follow, ...">`.
4. **Title y meta description ÚNICOS** — distintos de cualquier otra página del sitio. Comprobar con grep antes de publicar.
5. **Contenido en HTML, no dependiente de JS** — todo el texto del artículo va en el HTML servido
   (nada de inyectar el cuerpo con JavaScript). Las imágenes pueden ser `loading="lazy"`.
6. **Enlaces internos** — el artículo enlaza a las landings de los eventos que menciona y a
   `festival.html` / `programa.html` / `entradas.html` y a otros artículos. Además, "Blog" debe estar
   en la nav (escritorio + móvil) y en el pie ("Explora") de TODAS las páginas.

### Cómo crear un artículo nuevo
- Duplicar `blog/planes-verano-torremolinos/index.html` (o el más parecido) como `blog/<slug>/index.html`.
- **Rutas relativas con `../../`**: al estar dentro de `blog/<slug>/`, todos los recursos de la raíz se
  referencian con `../../` (`../../styles.css`, `../../assets/...`, `../../uploads/...`, `../../festival.html`, etc.).
  El listado es `../../blog.html`; los enlaces a OTROS artículos son `../<otro-slug>/index.html`.
- Reescribir head (title, description, keywords, canonical, og/twitter, JSON-LD `BlogPosting` + breadcrumb) y el `<main>`.
- Añadir una tarjeta en el grid de `blog.html` (enlace `blog/<slug>/index.html`) y un `BlogPosting` al schema `Blog` de `blog.html`.
- Añadir la URL `https://www.plazaparaiso.com/blog/<slug>` a `sitemap.xml`.
- Si cambias el slug de un artículo existente, añade una redirección 301 en `_redirects` (Netlify) de la URL vieja a la nueva.

### Rutas y despliegue (Netlify)
- Las URLs limpias (`/blog/<slug>`, `/festival`, etc.) las resuelve Netlify (Pretty URLs) + los `canonical`.
  En el preview local solo funcionan rutas relativas con archivo explícito (`index.html`), por eso los
  enlaces internos apuntan a `.../index.html` y los recursos van con `../../`.
- `_redirects` en la raíz mantiene las redirecciones 301 de las URLs antiguas `blog-<slug>.html` → `/blog/<slug>`.

## Estructura de navegación
Orden del menú: Inicio · Programa · Festival · Blog · FAQs · Contacto. El enlace del menú dice "Festival" (no "El Festival").

## Texto
En toda la web se usa "tardes"/"tarde" (no "noches"/"noche").

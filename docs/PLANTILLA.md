# Plantilla y sistema de diseño

Esta carpeta no es solo el portfolio: también es una **plantilla reutilizable** para otros proyectos personales. No hay framework ni build; todo son archivos estáticos que se pueden copiar, cambiar de contenido y publicar.

La referencia visual: negro cálido, hueso, naranja clara, tipografía editorial (serif + grotesk + mono) y detalles técnicos (líneas, rejillas, microtipografía).

---

## 1. Archivos que forman la plantilla

| Archivo | Qué contiene |
|---|---|
| `assets/css/styles.css` | Tokens, reset, tipografía, navegación, botones, secciones, proyectos, formularios, modal, footer y responsive. |
| `assets/css/cv.css` | Variante “documento” para el CV: hoja clara, una columna clásica y estilos de impresión A4. |
| `assets/js/main.js` | Navegación, menú móvil, reveals, contadores, modal de proyectos, copiar email, formulario, impresión y arranque. |
| `assets/js/i18n.js` | Textos ES / EN / ZH, selector de idioma, preferencia y `?lang=`. |
| `assets/js/mascot.js` | Chispa 3D: escena de la portada con dos containers y saltos, más el proyecto anterior. No se carga en el CV. |
| `index.html` | Ejemplo de página “portfolio” (oscura, editorial). |
| `cv.html` | Ejemplo de página “documento” (clara, imprimible). |
| `404.html` | Página de error autocontenida (sin dependencias). |

> Todas las rutas son relativas (`./assets/...`). Eso permite publicar en la raíz (`usuario.github.io`) o en una subcarpeta (`usuario.github.io/repo/`) sin cambiar nada.

---

## 2. Tokens

En `styles.css`, bloque `:root`:

```css
--ink: #0B0B0A;        /* fondo principal */
--ink-2: #121210;      /* tarjetas */
--bone: #F2EEE4;       /* papel / texto claro */
--bone-2: #E7E1D3;     /* papel secundario */
--muted: #8E887A;      /* texto secundario sobre oscuro */
--muted-dark: #6B6558; /* texto secundario sobre claro */
--accent: #FFA45C;       /* acento principal */
--accent-deep: #9B4214;  /* acento legible sobre claro */
--clay: #D9815F;       /* acento cálido */
--line: rgba(242,238,228,.14);
--line-dark: rgba(18,17,14,.16);
--gutter: clamp(20px, 4.6vw, 72px);
--max: 1480px;
--radius: 6px;
```

Tipografías autoalojadas:

- **Space Grotesk** (variable 300–700) → interfaz, titulares sans, cuerpo.
- **Instrument Serif** (400, normal e italic) → énfasis editorial y nombres.
- **JetBrains Mono** (400/500) → etiquetas, datos, microtipografía.

No se cargan fuentes de Google en tiempo de ejecución: los `.woff2` viven en `assets/fonts/` y las licencias OFL en `assets/fonts/licenses/`.

---

## 3. Escala tipográfica

| Rol | Clase | Tamaño |
|---|---|---|
| Titular de portada | `.hero__title` | `clamp(3.15rem, 7.15vw, 7.3rem)` |
| Titular de sección | `.section-title` | `clamp(2.5rem, 4.9vw, 4.7rem)` |
| Titular de CV | `.cv-head h1` | `clamp(2.5rem, 5vw, 3.85rem)` |
| Entradilla | `.section-intro` / `.hero__lede` | `.92–1.12rem` |
| Cuerpo | — | `.86–.98rem` |
| Etiqueta mono | `.label` / `.mono` | `.56–.66rem`, mayúsculas, tracking amplio |

El énfasis editorial se hace con `<em>` dentro de un titular: se renderiza en Instrument Serif italic. Ejemplo:

```html
<h2 class="section-title">Cosas que he <em>hecho.</em></h2>
```

---

## 4. Layout

- `.wrap` centra el contenido con `max-width: 1480px` y el gutter lateral.
- `.section` aplica el espaciado vertical; `.section--bone` cambia a fondo claro y ajusta bordes/colores.
- `.section-head` es la cabecera de sección: etiqueta + titular a la izquierda, entradilla o metadatos a la derecha. En móvil colapsa a una columna.
- La portada usa una rejilla de dos columnas (`head` + `body` a la izquierda, `stage` 3D a la derecha); en pantallas menores pasa a una columna con el muñeco entre el titular y el texto.
- El CV usa una “hoja” (`.cv-sheet`) centrada sobre `--bone-2`, con una sola columna clásica, cabecera azul marino y reglas finas.

---

## 5. Componentes

### Etiqueta de sección

```html
<p class="label"><span class="label__num">02</span> Trabajo seleccionado</p>
```

### Botones

```html
<a class="btn btn--accent" href="#trabajo">Ver proyectos</a>
<a class="btn btn--ghost" href="./assets/cv/Sergio_Toro_CV.pdf" download>Descargar CV</a>
<button class="btn btn--ink" type="submit">Enviar</button>
```

Variantes: `btn--accent`, `btn--ghost`, `btn--ink`, `btn--pill`. En fondos claros, `btn--ghost` necesita el override de `cv.css` (borde y texto oscuros).

### Proyecto

```html
<article class="project" data-project>
  <div class="project__visual" aria-hidden="true"><!-- SVG o imagen --></div>
  <div class="project__body">
    <div class="project__meta mono"><span>01</span><span>2026</span></div>
    <h3 class="project__title">
      <button class="project__open" type="button" aria-haspopup="dialog">Título</button>
    </h3>
    <p class="project__summary">Resumen corto.</p>
    <ul class="tags"><li>ROS 2</li><li>OpenCV</li></ul>
    <span class="project__cta">Ver ficha</span>
  </div>
  <div class="project__more" hidden>
    <!-- Detalle que se clona dentro del <dialog> -->
  </div>
</article>
```

- `data-project` activa el modal.
- `.project--featured` crea la tarjeta destacada a dos columnas.
- El detalle oculto (`.project__more`) contiene `<dl class="project__facts">`, `.prose` y `.project__note`.

### Ficha técnica / habilidades

`.spec` + `.spec__bar` + `.spec__grid` + `.skill`. Es el patrón “documento técnico” del stack.

### Timeline

`.timeline` + `.tl` + `.tl__when` + `.tl__dot` + `.tl__body`. La línea vertical se dibuja con `.timeline::before`; los puntos son absolutos.

### Formulario

`.form`, `.field`, `.field--full`, `.form__foot`, `.form__status`. El formulario de contacto no envía datos: compone un `mailto:` en `main.js`.

### FAQ

`<details class="faq__item">` con `<summary>` y `.faq__icon`. Sin JS; el acordeón es nativo.

### Modal

`<dialog class="modal" id="project-dialog">` + `.modal__close` + `.modal__frame` + `.modal__content`. `main.js` clona el contenido de cada proyecto y abre con `showModal()`.

### CV

- `.cv-sheet` → hoja A4 en pantalla, con cabecera azul marino.
- `.cv-head` → nombre, subtítulo, botones y línea de contacto (email + ubicación).
- `.cv-toolbar` → descargar PDF / imprimir; se oculta al imprimir.
- `.cv-section` + `h2` → sección con regla.
- `.cv-bullets` → listas con viñeta cuadrada.
- `.cv-entry` + `.cv-entry__head` + `.cv-date` + `.cv-entry__org` + `.cv-entry__desc` → puesto/proyecto con fecha a la derecha.
- `.cv-end` → pie de la hoja con enlaces; se oculta al imprimir.
- `assets/cv/Sergio_Toro_Codo_CV.tex` → fuente LaTeX (una columna, inglés, sin foto ni teléfono).
- `@media print` → A4, oculta nav/footer/botones, una columna y saltos de página controlados.

---

## 6. Crear una página nueva

1. Copia `cv.html` (documento) o `index.html` (página editorial).
2. Cambia `<title>`, `meta description` y el contenido de `<main>`.
3. Mantén las rutas relativas: `./assets/...`.
4. Enlaza `assets/css/styles.css`; añade una hoja propia si la página tiene un layout distinto.
5. Si necesitas menú/nav interactivo, incluye `assets/js/main.js`. El script comprueba qué elementos existen y no falla si faltan el canvas, el modal o el formulario.
6. Añade la página a:
   - `.nav__links` o `.nav__cv` de `index.html` y `cv.html`.
   - `.menu__nav` (menú móvil).
   - `.footer__links`.
7. Añádela a `README.md` y a `docs/GITHUB_PAGES.md` si cambia la estructura publicada.

### Página sin JS

Si la página no necesita interacción, puedes omitir `main.js`. En ese caso:
- El menú móvil no funcionará: deja los enlaces visibles o usa un `<noscript>`.
- Las clases `.reveal` se quedarán ocultas: no las uses o añade `html.no-js .reveal { opacity: 1; transform: none; }`.

---

## 7. Reglas de estilo

- **No** uses rutas absolutas (`/assets/...`): rompen los *project sites* de GitHub Pages.
- **No** añadas dependencias de CDN para fuentes o Three.js: todo está autoalojado.
- **No** cargues `mascot.js`/Three.js en páginas que no tengan el canvas: la portada tiene el canvas de Chispa; el CV no lo necesita.
- Mantén el acento naranja para acciones y datos, no para párrafos largos.
- Sobre fondo claro, usa `--muted-dark` y `--accent-deep`; el naranja claro no tiene contraste suficiente para texto.
- Los textos mono pequeños no bajan de ~9–10 px en contenido esencial.
- Respeta `prefers-reduced-motion`: la web tiene un toggle manual en el footer y `html.reduce-motion` como clase global.
- Los elementos interactivos necesitan `:focus-visible`; el estilo global ya lo define (naranja sobre oscuro, tinta sobre claro).

---

## 8. Checklist antes de publicar

- [ ] `index.html`, `cv.html` y `404.html` abren con un servidor local (no `file://`).
- [ ] Nav, menú móvil y footer enlazan correctamente entre `index.html` y `cv.html`.
- [ ] Todos los assets están en `assets/` y las rutas son `./...`.
- [ ] `.nojekyll` presente.
- [ ] Probado en `/` y en `/portfolio/`.
- [ ] El CV imprime bien (A4) y el PDF descarga.
- [ ] El email es el correcto en `index.html`, `cv.html` y `main.js`.
- [ ] No hay teléfonos o datos privados que no quieras publicar.
- [ ] El modelo 3D, si existe, está en `assets/models/mascot.glb`.
- [ ] Revisado en móvil y con teclado.

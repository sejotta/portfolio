# ¿Se puede publicar en GitHub Pages?

**Sí.** El portfolio está pensado para GitHub Pages desde el primer momento: es un sitio 100 % estático (HTML + CSS + JavaScript + un `.glb`), no necesita servidor, base de datos ni proceso de build. Se puede publicar arrastrando la carpeta a un repositorio.

Esta guía recoge la verificación hecha, los límites que conviene conocer y los pasos exactos para publicarlo.

> Comprobado en octubre de 2026 contra la documentación oficial de GitHub Pages y con una prueba local servida desde una subcarpeta (`/portfolio/`), que es como funciona un *project site*.

---

## 1. Resultado de la verificación

| Comprobación | Resultado |
|---|---|
| Sitio estático, sin backend | ✅ |
| Rutas relativas (`./assets/...`), funciona en raíz y en subcarpeta | ✅ Probado en `/portfolio/` |
| Módulos ES + `importmap` | ✅ La portada usa `importmap` para el canvas 3D de Chispa; el CV no carga Three.js |
| Tipos MIME correctos (JS, CSS, fuentes, PDF, GLB) | ✅ |
| Página de currículum web + versión imprimible | ✅ `cv.html` probado en `/portfolio/cv.html` |
| Idiomas del portfolio | ✅ ES / EN / 中文 con selector; preferencia en `localStorage` y `?lang=` |
| Página 404 personalizada | ✅ `404.html` autocontenida |
| `.nojekyll` para evitar el procesado de Jekyll | ✅ Incluido |
| Tamaño del sitio | ✅ ≈ 1,93 MB con CV incluido (límite: 1 GB) |
| Ancho de banda | ✅ Holgado (límite blando: 100 GB/mes) |
| Primera carga | ✅ ≈ 0,6 MB comprimida (sin el CV); Three.js solo se carga para el canvas de Chispa; el CV no |
| Formulario de contacto sin servidor | ✅ Abre el cliente de correo (`mailto:`) |
| HTTPS y dominio propio | ✅ Soportados por GitHub Pages |
| Dependencias externas en tiempo de ejecución | ✅ Ninguna: fuentes, Three.js e imágenes son locales |

**Lo que no se ha podido comprobar:** el despliegue real en `github.io`, porque hace falta tu cuenta de GitHub y crear el repositorio. La prueba local reproduce las condiciones de ruta y de servidor estático, pero el despliegue final lo hacemos juntos (o lo haces tú siguiendo los pasos).

---

## 2. Límites oficiales de GitHub Pages

Según la [documentación de límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits):

- **Repositorio público** con GitHub Free (o privado con GitHub Pro/Team/Enterprise).
- **Un sitio de usuario/organización** por cuenta (`usuario.github.io`); los sitios de proyecto (`usuario.github.io/repo`) no tienen ese límite.
- **1 GB** de tamaño recomendado para el repositorio y **1 GB** para el sitio publicado.
- **100 GB/mes** de ancho de banda (límite blando).
- **10 builds/hora** (límite blando) si publicas desde una rama; no aplica si usas un workflow de GitHub Actions.
- **10 minutos** de tiempo máximo de despliegue.
- No se puede usar como hosting comercial, e-commerce o SaaS, ni para transacciones sensibles.
- HTTPS incluido; dominio personalizado incluido.

Para este portfolio, todos los límites quedan muy lejos. El único punto a tener en cuenta es el **ancho de banda**: cada visita completa consume ~0,5 MB; incluso con miles de visitas al mes no se acerca a 100 GB.

---

## 3. Publicarlo (opción recomendada: sitio de usuario)

Un sitio de usuario tiene la URL más limpia: `https://TU-USUARIO.github.io/`.

1. Crea un repositorio llamado exactamente **`TU-USUARIO.github.io`** (público).
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub: **Settings → Pages**.
4. En **Source**, elige **Deploy from a branch**.
5. Selecciona **`main`** y **`/ (root)`**. Guarda.
6. Espera 1–2 minutos. La URL aparecerá en esa misma pantalla.

```bash
cd Portfolio
git init
git add .
git commit -m "Portfolio de Sergio Toro"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-USUARIO.github.io.git
git push -u origin main
```

> Si el repositorio ya existe y tiene contenido, no hagas `git init`: clona, copia los archivos, commit y push.

### Opción B: sitio de proyecto

Si prefieres un repositorio llamado `portfolio`:

1. Crea el repositorio `portfolio` (público).
2. Sube el contenido.
3. **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
4. La URL será `https://TU-USUARIO.github.io/portfolio/`.

No hay que cambiar ninguna ruta: el sitio usa `./assets/...` y funciona igual en `/` que en `/portfolio/`. Ya está probado.

### Actualizar el sitio

Cada `git push` a `main` vuelve a publicar automáticamente. Tarda entre unos segundos y un par de minutos. Si no ves los cambios, fuerza recarga (`Ctrl + F5`).

---

## 4. Dominio propio (opcional)

Si quieres `sergiotoro.com` en vez de `usuario.github.io`:

1. Compra el dominio (Namecheap, Cloudflare, DonDominio, IONOS…).
2. En **Settings → Pages → Custom domain**, escribe el dominio y guarda. GitHub crea un archivo `CNAME` en el repositorio.
3. En el DNS del dominio, configura los registros que indique GitHub:
   - Para el dominio raíz (`sergiotoro.com`): registros **A** y **AAAA** de GitHub Pages.
   - Para `www`: un **CNAME** a `TU-USUARIO.github.io`.
4. Vuelve a Settings → Pages y activa **Enforce HTTPS** cuando el certificado esté listo (puede tardar unas horas).

Los valores exactos de los registros DNS cambian; usa los que muestre GitHub en la documentación de [configurar un dominio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## 5. Qué tener en cuenta antes de publicar

### El repositorio será público (con GitHub Free)

Cualquiera podrá ver el código, las imágenes y el CV. Eso es normal en un portfolio, pero conviene saberlo:

- **Ni el CV web ni el PDF muestran foto o teléfono.** La sección «Sobre mí» del portfolio conserva un retrato; si no quieres que sea público, quita `assets/img/portrait.png` y su figura.
- **El modelo 3D será descargable.** Si es un diseño exclusivo, valora si te importa. Se puede ofuscar, pero no proteger de verdad en un sitio estático.
- **No subas datos privados** (dirección, DNI, documentos internos, claves). No hay nada de eso ahora.

### Formulario de contacto

GitHub Pages no ejecuta código de servidor. El formulario actual **abre tu cliente de correo** con el mensaje ya escrito; no envía nada a ningún servidor. Si quieres recibir mensajes sin salir de la web, hay que usar un servicio externo (Formspree, Netlify Forms, Basin…) o un `mailto:` como el actual.

### El PDF del CV pesa ~14 KB

Solo se descarga si el visitante pulsa el botón. Es un PDF de texto (dos páginas, sin imagen ni teléfono), generado a partir de `assets/cv/Sergio_Toro_Codo_CV.tex`. La fuente LaTeX también está en el repositorio por si quieres recompilarlo.

### Actualizaciones y caché

GitHub Pages cachea los archivos unos minutos. Tras un cambio, puede tardar en verse. Para forzar la actualización, cambia el nombre del archivo o añade un parámetro de versión (`styles.css?v=2`).

---

## 6. Checklist de publicación

- [ ] Repositorio creado (público).
- [ ] `index.html` y `cv.html` en la raíz del repo.
- [ ] `.nojekyll` incluido.
- [ ] Carpeta `assets/` completa (incluye `vendor/three`, fuentes, CV, retrato, `css/cv.css` y `js/i18n.js`).
- [ ] `docs/` no molesta; puede quedarse.
- [ ] Settings → Pages configurado.
- [ ] URL abierta en móvil y escritorio.
- [ ] Revisado que el muñeco 3D carga y sigue el cursor.
- [ ] Revisada la página de CV, el botón de imprimir y el PDF.
- [ ] Revisado que los enlaces entre `index.html` y `cv.html` funcionan.
- [ ] Revisado el formulario (abre el correo).
- [ ] (Opcional) Dominio propio + HTTPS.

---

## 7. Si algo falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| 404 al abrir la URL | Pages no está activado o la rama/carpeta no es la correcta | Settings → Pages → `main` / `(root)` |
| La web carga sin estilos | Ruta base incorrecta | Comprueba que `assets/` está en la raíz publicada y que las rutas son `./assets/...` |
| El muñeco no aparece | WebGL desactivado, o el `.glb` no está en `assets/models/` | Se muestra el fallback 2D; revisa la consola |
| El `.glb` da 404 | Nombre o ruta incorrectos | Debe ser exactamente `assets/models/mascot.glb` |
| El PDF no descarga | Falta el archivo o la ruta cambió | Debe estar en `assets/cv/Sergio_Toro_CV.pdf` |
| El CV web no se ve bien al imprimir | El navegador no aplica los estilos de impresión | Usa el botón «Imprimir / Guardar PDF» de `cv.html`; revisa `assets/css/cv.css` |
| Cambios que no se ven | Caché de GitHub Pages o del navegador | Espera unos minutos y recarga con `Ctrl + F5` |

---

## 8. Alternativas si algún día se queda pequeño

- **Cloudflare Pages / Netlify / Vercel:** despliegue estático gratis, con formularios y funciones serverless si hacen falta.
- **Cloudflare delante de GitHub Pages:** CDN y control de caché si el tráfico crece.
- **Formspree / Basin:** formulario real sin backend.
- **Plausible / Umami:** analítica sin cookies, si quieres medir visitas.

Pero para empezar, GitHub Pages es más que suficiente: es gratis, rápido, con HTTPS y con una URL que puedes enseñar en el CV.

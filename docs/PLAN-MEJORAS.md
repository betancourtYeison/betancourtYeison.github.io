# Plan de mejoras del portafolio — 2026

Plan completo para modernizar el portafolio (stack, diseño, contenido y
despliegue), organizado por fases con prioridad y esfuerzo estimado.
Estado del análisis: julio 2026, rama `develop`.

---

## Resumen ejecutivo

| Fase | Objetivo | Prioridad | Esfuerzo |
|------|----------|-----------|----------|
| 1 | Correcciones y limpieza inmediata | Alta | Bajo |
| 2 | Migración de stack (Vite + React 19) | Alta | Alto |
| 3 | Rediseño visual orientado a recruiters | Alta | Medio-Alto |
| 4 | Theme toggle con View Transitions API | Media | Bajo |
| 5 | SEO, accesibilidad y performance | Media | Medio |
| 6 | Automatización del despliegue (CI/CD) | Media | Bajo |
| 7 | Extras (analytics, i18n, blog) | Baja | Medio |

---

## Fase 1 — Correcciones y limpieza inmediata

Cosas rotas, obsoletas o innecesarias que se pueden arreglar hoy sin
riesgo, antes de cualquier migración.

### Errores / ajustes detectados

1. **`Dockerfile` con `node:10.16.0-alpine`** — Node 10 es EOL desde 2021.
   Opciones: eliminarlo (no se usa para el deploy real, que es estático) o
   actualizarlo a `node:22-alpine`. Recomendación: **eliminarlo** salvo que
   uses dev en contenedor.
2. **Dependencias muertas o sin uso real**:
   - `react-twitter-embed` — la sección Twitter está deshabilitada
     (`twitterDetails.display: false`). Eliminar dependencia y contenedor
     `src/containers/twitter-embed/` si no piensas reactivarla.
   - `enzyme` + `enzyme-adapter-react-16` — Enzyme está abandonado y no
     soporta React 17+. Bloquea la migración de React. Eliminar y, si se
     quiere testear, usar React Testing Library (ya viene con CRA/Vitest).
   - `colorthief` — verificar uso real; si solo lo usa `githubRepoCard`,
     evaluar si vale la pena mantenerlo tras el rediseño.
   - `react-easy-emoji` — sin mantenimiento desde hace años. Los emojis
     nativos se renderizan bien en todos los navegadores modernos; se puede
     eliminar y usar emojis directos en los strings.
3. **`react-reveal` está abandonado** (última publicación 2018) y es
   **incompatible con React 17+** — es el principal bloqueador de la
   migración. Reemplazar por `framer-motion` (ahora `motion`) o CSS
   `@scroll-timeline` / Intersection Observer.
4. **`react-headroom`** — funciona, pero tras el rediseño evaluar
   reemplazo por CSS `position: sticky` + `scroll-driven animations`.
5. **Podcast/Talks con datos del template original** (Saad Pasta) —
   `talkSection` y `podcastSection` aún tienen contenido de ejemplo del
   template. Están ocultos (`display: false`), pero conviene limpiar los
   datos placeholder para evitar publicarlos por accidente.
6. **Bumps seguros de dependencias** (patch/minor, sin breaking):
   `lottie-react` 2.4.0→2.4.1, `jest-canvas-mock`, `react-headroom`
   3.0→3.2. Correr también `npm audit fix` (sin `--force`).
7. **`.pre-commit-config.yaml` usa `mirrors-prettier` v3.0.0-alpha.4** —
   ese mirror está archivado. Migrar el hook a prettier local (lint-staged
   + husky) o actualizar el rev.
8. **`fetch.js` usa `https.request` a mano** — modernizar a `fetch()`
   nativo de Node 18+, con manejo de errores que no tumbe el build si la
   API externa falla (hoy un fallo de rss2json rompe `npm run build`).

### Checklist Fase 1

- [ ] Eliminar o actualizar `Dockerfile`
- [ ] Eliminar `react-twitter-embed` + contenedor twitter-embed
- [ ] Eliminar `enzyme` y adaptadores
- [ ] Eliminar `react-easy-emoji` (usar emojis nativos)
- [ ] Limpiar datos placeholder de talks/podcast en `portfolio.js`
- [ ] `npm audit fix` + bumps patch/minor
- [ ] Modernizar `fetch.js` con `fetch()` nativo y errores no fatales
- [ ] Actualizar pre-commit hook de prettier

---

## Fase 2 — Migración de stack: Vite + React 19

**Por qué**: Create React App está oficialmente deprecado. react-scripts 5
ya no recibe mantenimiento, arrastra ~70 vulnerabilidades en su toolchain
y fuerza React 16. Vite es hoy el estándar de facto para SPAs estáticas
(build ~10x más rápido, HMR instantáneo, sin dependencias vulnerables).

**Alternativas evaluadas**:
- **Vite + React 19** ✅ recomendado — mínimo cambio conceptual (sigue
  siendo SPA estática, GitHub Pages la sirve igual), esfuerzo moderado.
- Next.js — aporta SSR/SSG que un portafolio en GitHub Pages no
  necesita (Pages no ejecuta servidor); solo tendría sentido con export
  estático, y complica más que Vite.
- Astro — excelente para sitios de contenido, pero implicaría reescribir
  los componentes; más cambio del necesario.

**Pasos**:
1. Rama `feature/vite-migration`.
2. `npm create vite@latest` (template react), mover `src/` y `public/`.
3. Renombrar variables de entorno `REACT_APP_*` → `VITE_*` (afecta
   `fetch.js` y `env.example`).
4. Reemplazar `react-reveal` por `motion` (framer-motion) — prerequisito
   para React 19 (Fase 1.3).
5. Subir React 16 → 19: cambiar `ReactDOM.render` → `createRoot` en
   `index.js`, revisar `componentWillReceiveProps` si existe en
   componentes de clase.
6. Sass: migrar `@import` → `@use`/`@forward` (Dart Sass 3 elimina
   `@import`); subir `sass` a la última.
7. Sustituir `serviceWorker.js` de CRA por `vite-plugin-pwa` (o eliminar
   PWA si no aporta — para un portafolio es prescindible).
8. Tests: `react-scripts test` → Vitest + React Testing Library.
9. Verificar `npm run build` + `gh-pages -b master -d dist` (Vite genera
   `dist/`, no `build/` — actualizar script `deploy`).

**Resultado esperado**: mismas features, 0 vulnerabilidades de toolchain,
builds de segundos, base moderna para las fases siguientes.

---

## Fase 3 — Rediseño visual orientado a recruiters

Objetivo: que en los primeros 5 segundos un recruiter vea quién eres, qué
haces, tu seniority y cómo contactarte — y que el sitio en sí funcione
como demostración de tu nivel de frontend.

### 3.1 Hero / above the fold

- **CTA doble visible sin scroll**: "Download CV" + "Contact me"
  (mailto/LinkedIn). Hoy el CV está, pero el contacto queda al final.
- Foto profesional o avatar de calidad (hoy depende del avatar de GitHub).
- Badge de disponibilidad ("Open to opportunities") ligado a `isHireable`.
- Enlaces sociales visibles en el hero, no solo al pie.
- Reducir el texto del subtítulo: 2-3 líneas máximo; los recruiters
  escanean, no leen párrafos.

### 3.2 Jerarquía y layout

- **Reordenar secciones por interés del recruiter**:
  Hero → Experiencia → Proyectos destacados → Skills → Certificaciones →
  Educación → Contacto. (Hoy Skills va antes que Experiencia.)
- Timeline vertical para la experiencia laboral (más escaneable que
  cards sueltas), con stack tecnológico como chips/tags por puesto —
  igual que en el CV PDF.
- Proyectos: destacar 3-4 con imagen/screenshot real, métricas de impacto
  y stack usado; el resto colapsado en "ver más". 9 cards planas iguales
  diluyen los importantes.
- Skills: agrupar por categoría (Frontend / Backend / Mobile / DevOps /
  Databases) en vez de una grilla plana de 24 iconos. Considerar quitar
  las barras de "proficiency" con porcentajes — están desaconsejadas en
  portafolios modernos (¿qué significa "95% Programming"?).
- Sección "highlights" numérica: años de experiencia, # proyectos,
  # certificaciones — datos rápidos escaneables.

### 3.3 Sistema de diseño

- **Tipografía**: reemplazar la fuente actual (Google Sans, cargada como
  archivos locales sin licencia clara) por una fuente variable moderna
  self-hosted vía **Fontsource** (`@fontsource-variable/inter`,
  `@fontsource-variable/manrope` o `@fontsource-variable/sora` para
  headings). Self-hosted = sin FOUT de CDN y mejor Core Web Vitals.
- **Iconos**: eliminar el `<link>` CDN de Font Awesome 5.15.4 y migrar a
  **`react-icons`** (incluye Simple Icons para logos de tecnologías —
  TypeScript, Next.js, Flutter, NestJS, GraphQL tienen icono real, cosa
  que FA5 no ofrece y hoy obliga a reutilizar iconos genéricos) o
  **`lucide-react`** para iconografía de UI. Tree-shakeable: solo se
  empaquetan los iconos usados.
- **Tokens de color**: `_globalColor.scss` ya centraliza colores — migrar
  a CSS custom properties (`--color-*`) para poder animar el cambio de
  tema (necesario para la Fase 4) y simplificar dark mode.
- **Animaciones**: `motion` (framer-motion) para reveals on-scroll,
  micro-interacciones en cards y stagger de listas. Sobrio: animaciones
  cortas (150-300ms), respetar `prefers-reduced-motion`.
- Espaciado y grid consistentes (escala 4/8px), max-width de lectura,
  cards con hover states claros.

### 3.4 Responsive y detalles

- Auditar mobile: los recruiters abren desde el teléfono el 50%+ de las
  veces. Header, timeline y grid de proyectos deben funcionar a 360px.
- Modo oscuro como primera clase: contrastar ambos temas con WCAG AA.
- Favicon/manifest actualizados con branding propio.

---

## Fase 4 — Theme toggle con View Transitions API ✅ (hecha)

Implementada. Referencia: https://theme-toggle.rdsx.dev/ — usa la
**View Transitions API** (`document.startViewTransition`) para animar el
cambio de tema con una revelación circular desde el botón.

Resumen de lo implementado:
- `changeTheme(origin)` en `src/containers/Main.jsx` envuelve el cambio de
  estado en `document.startViewTransition` + `flushSync` (React aplica la
  clase de tema de forma síncrona para que el navegador capture el
  snapshot "new" ya con el tema cambiado).
- `ToggleSwitch.jsx` calcula el centro del botón con `getBoundingClientRect`
  y lo pasa como origen (funciona igual con click o teclado); se eliminó el
  estado `isChecked` redundante.
- Keyframes `theme-reveal` en `src/index.css` con `clip-path: circle()`
  desde `--vt-x/--vt-y` y radio `--vt-r` (esquina más lejana).
- Fallback a cambio instantáneo si no hay soporte o
  `prefers-reduced-motion: reduce`.

Nota: no fue necesario migrar los colores a CSS custom properties como se
preveía; la clase `.dark-mode` sigue funcionando porque la API captura todo
el documento. Esa migración queda como mejora opcional futura.

### Implementación

1. Prerequisito: colores como CSS custom properties en `:root` /
   `[data-theme="dark"]` (Fase 3.3) — la transición anima el repaint
   completo del documento, no funciona bien con el approach actual de
   clase `.dark-mode` + SCSS por componente.
2. En `ToggleSwitch.js` (o su reemplazo):

   ```js
   const toggleTheme = () => {
     // Fallback: navegadores sin View Transitions cambian sin animación
     if (!document.startViewTransition) {
       changeTheme();
       return;
     }
     document.startViewTransition(() => changeTheme());
   };
   ```

3. CSS de la revelación circular desde la posición del botón:

   ```css
   ::view-transition-old(root),
   ::view-transition-new(root) {
     animation: none;
     mix-blend-mode: normal;
   }
   ::view-transition-new(root) {
     clip-path: circle(0 at var(--toggle-x) var(--toggle-y));
     animation: reveal 0.5s ease-in-out forwards;
   }
   @keyframes reveal {
     to { clip-path: circle(150% at var(--toggle-x) var(--toggle-y)); }
   }
   ```

   (Pasar `--toggle-x/y` desde el click handler con las coordenadas del
   botón.)
4. Respetar `prefers-reduced-motion: reduce` → sin animación.
5. Reemplazar el switch checkbox actual por un botón icono sol/luna
   animado (SVG morph, p. ej. los toggles de `toggles.dev`), coherente
   con el nuevo sistema de iconos.

Soporte 2026: Chrome/Edge/Opera ✅, Safari 18+ ✅, Firefox 141+ ✅ — con el
fallback, nadie queda fuera.

---

## Fase 5 — SEO, accesibilidad y performance

### SEO
- Meta tags Open Graph + Twitter Card con imagen social (og:image
  1200×630) — hoy al compartir el link en LinkedIn no sale preview rica.
- JSON-LD `Person` schema (nombre, jobTitle, sameAs con redes) para
  resultados enriquecidos en Google.
- `sitemap.xml` + `robots.txt` verificado, título/description únicos.
- `lang` correcto en `<html>` y títulos jerárquicos (un solo `h1`).

### Accesibilidad
- Auditar con Lighthouse/axe: contraste AA en ambos temas, focus visible,
  `alt` en todas las imágenes (logos de empresas incluidos), navegación
  por teclado del toggle y el menú.
- `aria-label` en enlaces de iconos sociales.
- `prefers-reduced-motion` en todas las animaciones (splash screen
  incluido — hoy fuerza 2s de Lottie a todo el mundo; considerar
  eliminarlo o mostrarlo solo la primera visita).

### Performance
- Imágenes: convertir PNG/JPEG de logos a WebP/AVIF, `loading="lazy"`,
  dimensiones explícitas (evitar CLS).
- Lottie: cargar `lottie-react` de forma diferida (dynamic import) — es
  de lo más pesado del bundle.
- Los PDFs de certificados (~30 archivos) se empaquetan vía `require()`
  dentro del bundle — verificar que queden como assets estáticos con
  hash, no inflando el JS.
- Presupuesto: Lighthouse ≥95 en las 4 categorías tras la migración.

---

## Fase 6 — Automatización del despliegue (CI/CD)

Hoy el deploy es manual (`npm run deploy` → force-push a `master`).
Migrar a **GitHub Actions + GitHub Pages (artifact deploy)**:

1. Workflow `.github/workflows/deploy.yml`: en push a `develop` →
   checkout, `npm ci`, `npm run build`, `actions/upload-pages-artifact` +
   `actions/deploy-pages`.
2. Cambiar en Settings → Pages el source de "branch master" a
   "GitHub Actions".
3. Eliminar `gh-pages` de las dependencias y los scripts
   `predeploy`/`deploy`; la rama `master` deja de existir como artefacto
   de build.
4. Secrets del repo para `REACT_APP_GITHUB_TOKEN`/`VITE_GITHUB_TOKEN` si
   se mantiene `USE_GITHUB_DATA`.
5. Plus: job de PR que corra `npm run check-format` + build como check.

Beneficios: publicar = merge a `develop`, sin pasos manuales, sin
force-push, historial de deploys en Actions.

---

## Fase 7 — Extras (backlog)

- **Analytics ligero y sin cookies**: GoatCounter (gratis) o Plausible —
  saber cuántos recruiters visitan y qué secciones ven.
- **i18n ES/EN**: audiencia mixta Colombia/internacional; con la
  estructura data-driven de `portfolio.js` es viable duplicar el objeto
  de contenido por idioma.
- **Sección de blog propia** (hoy apunta a un post de FullStack Labs) o
  reactivar el fetch de Medium si vuelves a escribir.
- **CV generado desde los mismos datos**: hoy el PDF y `portfolio.js` se
  desincronizan (pasó con el ascenso a Senior). Generar el PDF desde los
  datos (react-pdf / typst) eliminaría la doble fuente de verdad.
- **Testimonios/recomendaciones** de LinkedIn como sección.
- Página 404 personalizada (`404.html` en GitHub Pages).

---

## Orden de ejecución recomendado

```
Fase 1 (limpieza)  →  Fase 2 (Vite+React 19)  →  Fase 3 (rediseño)
                                                      ↓
        Fase 6 (CI/CD)  ←  Fase 5 (SEO/a11y/perf)  ←  Fase 4 (toggle)
```

Fase 1 es prerequisito de la 2 (elimina los bloqueadores de React 19).
La 3 y la 4 comparten el trabajo de CSS custom properties. La 6 puede
hacerse en cualquier momento, pero conviene después de la 2 para no
automatizar el build viejo.

Cada fase debe ser su propia rama + PR contra `develop`, con smoke-test
local (`npm start` + build) antes de mergear, y un solo
`npm run deploy` (o merge, tras Fase 6) al final de cada fase.

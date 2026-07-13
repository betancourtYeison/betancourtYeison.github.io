betancourtYeison.github.io
====================

Portafolio Oficial de Yeison Betancourt Solís

Sitio en vivo: https://betancourtyeison.github.io/

## De qué trata

Portafolio personal construido con **Create React App (react-scripts 5)**,
React 16 y SCSS. Es una plantilla data-driven: casi todo el contenido
visible (bio, skills, experiencia laboral, educación, proyectos,
certificaciones, blogs, charlas, contacto) vive en un único archivo de
configuración, [`src/portfolio.js`](src/portfolio.js), y los componentes
solo se encargan de renderizar esos datos.

## Cómo funciona

- `src/App.js` → `src/containers/Main.js` compone la página completa:
  cada sección (Greeting, Skills, WorkExperience, Education, Projects,
  Achievement, Blogs, Talks, Twitter, Podcast, Profile, Footer) es un
  contenedor propio en `src/containers/*` que lee sus datos desde
  `portfolio.js`.
- Los componentes reutilizables (cards, botones, header, footer, iconos
  de redes) están en `src/components/*`.
- El tema claro/oscuro se maneja con React Context
  (`src/contexts/StyleContext.js`) y se guarda en `localStorage`.
- Los iconos son de Font Awesome 5.15.4, cargados por CDN desde
  `public/index.html`.
- Antes de `start`/`build` corre [`fetch.js`](fetch.js), un script opcional
  controlado por variables de entorno (ver [`env.example`](env.example)):
  si `USE_GITHUB_DATA=true` trae el perfil y repos destacados desde la API
  de GitHub, y si defines `MEDIUM_USERNAME` trae posts de Medium. Si esas
  variables no están configuradas, el sitio usa los datos hardcodeados de
  `portfolio.js`.

## Flujo de trabajo: desarrollo → despliegue

Todo el desarrollo ocurre en la rama `develop`. La rama `master` es
generada automáticamente y **no debe editarse a mano**.

1. **Desarrollo local**
   ```bash
   npm install
   cp env.example .env   # opcional, solo si vas a usar USE_GITHUB_DATA o MEDIUM_USERNAME
   npm start
   ```
   Levanta el servidor de desarrollo en `http://localhost:3000`.

2. **Actualizar contenido**
   Edita [`src/portfolio.js`](src/portfolio.js) para cambios de contenido
   (experiencia, skills, proyectos, certificados, CV). Evita hardcodear
   texto en los componentes/contenedores.

3. **Formateo**
   ```bash
   npm run format         # aplica Prettier
   npm run check-format   # solo verifica, no modifica
   ```
   Hay un pre-commit hook (`.pre-commit-config.yaml`) que corre Prettier
   sobre archivos `js|css|json` antes de cada commit.

4. **Commit y push a `develop`**
   El trabajo diario (features, fixes, contenido) se commitea y pushea
   normalmente a `develop`.

5. **Build de producción**
   ```bash
   npm run build
   ```
   Corre `fetch.js` y luego `react-scripts build`, generando la carpeta
   `build/` con el sitio estático optimizado.

6. **Despliegue a GitHub Pages**
   ```bash
   npm run deploy
   ```
   Este comando ejecuta `predeploy` (que es `npm run build`) y luego usa
   el paquete `gh-pages` para forzar un push del contenido de `build/` a
   la rama `master` de este mismo repositorio (`gh-pages -b master -d build`).
   GitHub Pages sirve el sitio directamente desde `master`.

   **No hay CI/CD automático**: el despliegue es manual y bajo demanda,
   ejecutado por quien decide publicar cambios. El campo `homepage` en
   `package.json` debe permanecer como
   `https://betancourtyeison.github.io/` para que las rutas de los
   assets del build resuelvan correctamente.

⚠️ `npm run deploy` sobrescribe (force-push) la rama `master`, que es
pública y sirve el sitio en producción — úsalo solo cuando estés seguro
de publicar los cambios de `develop`.

## Estructura del proyecto

```
src/
├── portfolio.js        # fuente única de verdad para todo el contenido
├── containers/          # una carpeta por sección de la página
├── components/          # piezas reutilizables (cards, header, footer, etc.)
├── contexts/             # StyleContext (tema claro/oscuro)
├── hooks/                # useLocalStorage
└── assets/
    ├── cv/               # CV descargable (PDF)
    ├── resources/        # certificados (PDF/imagen)
    └── images/           # logos de empresas, universidades, certificados
```

## Más contexto para desarrollo con IA

Ver [`CLAUDE.md`](CLAUDE.md) para el detalle de arquitectura, deuda
técnica conocida y convenciones del repositorio.

# DESIGN — Gorgias · τέχνη (Vite + React)

Sistema de diseño y convenciones del sitio del ensayo. Léelo antes de añadir
páginas o animaciones para mantener la coherencia entre etapas.

## Stack

- **Vite + React 18**, `react-router-dom` v6, `framer-motion`.
- Idioma del contenido: **español**; griego **politónico correcto**
  (p. ej. `έ` = U+03AD, `ἦ` = U+1F26). Nunca uses vocales latinas dentro de
  palabras griegas.
- Build: `npm run build` (salida en `dist/`). Dev: `npm run dev`.
- **No tocar `.vercel/`** (link al proyecto Vercel). `_legacy/` guarda los HTML
  originales como fuente de contenido (se borran al final del proyecto).

## Tokens (CSS variables) — `src/styles/theme.css`

Definidos en `:root`, con override oscuro por `@media (prefers-color-scheme)`
y por `:root[data-theme="dark"|"light"]` (el toggle manual gana).

| Token        | Claro     | Oscuro    | Uso                             |
| ------------ | --------- | --------- | ------------------------------- |
| `--bg`       | `#FBF8F0` | `#14171C` | Fondo principal                 |
| `--ink`      | `#211E18` | `#F5F1E8` | Texto principal                 |
| `--blue`     | `#1C3A5E` | `#5B9BD5` | Acento frío (subtítulos, refs)  |
| `--gold`     | `#B08D4C` | `#D4AF7B` | Acento cálido (marca, detalles) |
| `--bg2`      | `#F5F0E5` | `#1E2229` | Fondo secundario (bloques)      |
| `--muted`    | `#5A5348` | `#B8B0A4` | Texto secundario                |
| `--divider`  | `#D4C5B0` | `#3A3F47` | Líneas y bordes                 |

Tipografía (Google Fonts, subset griego, cargadas en `index.html`):

- `--font-display` → **Cormorant Garamond** (títulos, hero, marca).
- `--font-body` → **EB Garamond** (cuerpo).
- `--font-mono` → **IBM Plex Mono** (etiquetas, kickers, código st-lang).

Otros: `--measure` (70ch, ancho de lectura), `--radius`, `--header-h` (64px,
usado para `scroll-margin-top` y `sticky`).

## Tema claro/oscuro — `src/hooks/useTheme.js`

`useTheme()` devuelve `{ theme, toggleTheme, setTheme }`. Persiste en
`localStorage['gorgias-theme']` y refleja el valor en `data-theme` de `<html>`.
El estado vive en `Layout` (fuente única de verdad); `ThemeToggle` lo consume
por props. **No** instancies `useTheme` en varios sitios a la vez.

## Componentes — `src/components/`

- **`Logo.jsx`** — monograma SVG: letra griega **τ** en un medallón circular de
  trazo fino con dos ramas de laurel. Monoline; el medallón y la τ usan
  `currentColor`, el laurel usa `var(--gold)`. Props: `size` (px, default 40),
  `wordmark` (añade «Gorgias · τέχνη»), `title`. Escala de 24px a 96px.
  El favicon (`public/favicon.svg`) replica la marca con colores fijos (no
  hereda las CSS vars de la página).
- **`ThemeToggle.jsx`** — botón circular ☾/☀︎; recibe `{ theme, onToggle }`.
- **`Layout.jsx`** (+ `layout.css`) — header sticky (Logo enlaza a `/`, nav
  Ensayo/Presentación/PDF con `NavLink`, toggle) + `<Outlet/>` + footer discreto.

## Rutas — `src/App.jsx`

| Ruta            | Página             | Chrome        |
| --------------- | ------------------ | ------------- |
| `/`             | `EssayPage`        | Con Layout    |
| `/presentacion` | `PresentationPage` | Con Layout    |
| `/pdf`          | `PdfPage`          | **Sin chrome** (para imprimir) |

`PdfPage` se enruta **fuera** del `<Route element={<Layout/>}>` a propósito: el
formato de entrega no lleva header ni footer. En Vercel, `vercel.json` reescribe
todo a `/index.html` (SPA).

## Contenido — `src/content/`

- **`essay.jsx`** — el ensayo como JSX, fiel a `_legacy/index.html`. Exporta:
  - `<Ref>` para citas estéfano: `<Ref>(462b–466a)</Ref>` → `<span class="ref">`.
  - `essayMeta`, `tocItems`.
  - `mermaidDiagrams` (definiciones `graph TD` crudas — aún sin renderizar).
  - `stArguments` (5 cards st-lang), `stScript` (fuente `derivaciones.st`),
    `stLinks` (npm `@stevenvo780/st-lang`, docs `agora.elenxos.com/docs/st`).
  - `<EssayContent />` (intro, §1, §2, §3.1–3.4, conclusión, bibliografía).
- **`slides.jsx`** — `slides`: array de 13 diapositivas
  `{ id, kicker, title (JSX), body (JSX), variant? }`. `variant`:
  `cover` | `grid` | `quote`.

## Convenciones

- **CSS por página/componente**: cada página importa su `*.css` co-ubicado
  (`essay.css`, `presentation.css`, `pdf.css`, `layout.css`). Los estilos
  globales/reset viven solo en `theme.css`.
- Usa **siempre** las CSS vars de tema; no hardcodees colores (excepción: la
  `PdfPage`, formato académico fijo en negro sobre blanco).
- Clases: prefijo por zona (`essay-…`, `deck-…`, `site-…`, `pdf-…`).
- Todo debe verse bien en claro y oscuro. Respeta `prefers-reduced-motion`
  (ya contemplado en `theme.css`).
- Fechas del proyecto: **17 de julio de 2026**.

## Cómo añadir animaciones (framer-motion)

- Envuelve el elemento en `motion.<tag>` y define `initial/animate/exit` +
  `transition`. Patrón de referencia: el deck en `PresentationPage.jsx`
  (`AnimatePresence mode="wait"` para el cambio de slide).
- Para entradas al hacer scroll usa `whileInView={{...}}` con
  `viewport={{ once: true }}`.
- Mantén las transiciones sobrias (0.3–0.5s, `easeOut`), acordes al tono
  académico. Nada llamativo.

## Pendiente para etapas siguientes (stubs)

- **Mermaid**: en `EssayPage` los dos diagramas se muestran como su definición
  cruda dentro de `<pre class="mermaid-src">`. Falta renderizarlos como gráficos
  (integrando `mermaid`, con tema claro/oscuro) y, opcionalmente, animarlos.
- **st-lang highlighter**: los bloques `.st-block` se muestran en texto plano;
  el sitio original resaltaba palabras clave/operadores. Se puede reintroducir.
- **TOC activo**: el índice del ensayo no marca aún la sección visible al hacer
  scroll (había un observer en el original). Opcional.
- **Presentación**: falta pantalla completa (tecla F), swipe táctil y deep-link
  por hash; el resto del deck ya funciona (teclado, puntos, progreso).

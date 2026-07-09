# 📓 Bitácora del Ensayo Final — «La retórica como τέχνη»

> **Qué es esto:** el registro de **proceso** del proyecto —la construcción de la plataforma
> web, el repositorio y las lecciones—, más los punteros al resto. El **historial del ensayo
> versión por versión** (con ciclos de crítica) vive en `docs/iteraciones/`, para no duplicarlo.
> Entrega: **17 de julio de 2026**. Ensayo canónico: `ensayo/Ensayo_Final.md`.

---

## Historial del ensayo

> El historial **versión por versión** (anteproyecto → v6.2) —cada iteración con su **ciclo de
> crítica → cambio → evidencia**, incluida la auditoría adversarial H1–H6— vive en
> **[`docs/iteraciones/`](../docs/iteraciones/README.md)**, seccionado y navegable. No se
> duplica aquí: esta bitácora registra el **proceso** (plataforma, repositorio) y las **lecciones**.

## Cobertura de las recomendaciones del profesor

> Auditoría de cierre del **Nota 5,0** y sus dos recomendaciones. El detalle está en una sola
> fuente por tema: el historial en `docs/iteraciones/`; las respuestas tácticas en
> `Defensa_Oral_QA.md`. Aquí queda solo el veredicto.

**Elogios del profesor (no perderlos):** intuición filosóficamente valiosa; contextualización
clara y rigurosa; pregunta bien formulada; estrategia bien estructurada —«impecable»—.

- **Recomendación 1 — orientación al bien (la fuerte). Estado: abordada.** El trilema-trampa y el
  mapa pregunta→respuesta están en [`iteraciones/0-anteproyecto`](../docs/iteraciones/0-anteproyecto.md)
  y en `Defensa_Oral_QA.md` (Q1–Q3). La 4.ª condición recibe **dos secciones** (Orientación + Objeción).
- **Recomendación 2 — reducir autores. Estado: resuelta.** De **7** modernos a **3** (Perelman,
  Toulmin, Cialdini), cada uno confinado a un criterio. Detalle en
  [`iteraciones/1-destilacion-v2`](../docs/iteraciones/1-destilacion-v2.md).
- **Dos flancos de nivel defensa oral** (paridad cocina → asentimiento razonado; Cialdini como
  cuantificación): cierre en [`iteraciones/6-flancos-v6-1`](../docs/iteraciones/6-flancos-v6-1.md);
  respuestas para hablar en `Defensa_Oral_QA.md` (Q5–Q6). **Guía rápida de sustentación →
  `Defensa_Oral_QA.md`.**

## Lecciones aprendidas (no repetir)

1. **Menos autores, más profundidad.** El error del anteproyecto fue acumular 7 autores para 5 páginas. Regla: cada autor incluido debe trabajarse a fondo y quedar confinado a UN criterio del argumento.
2. **Equilibrio entre secciones.** El desequilibrio señalado en la revisión se debió a que §3.1–3.3 quedaron breves frente a §3.4. Si el profesor pide analizar N condiciones "a fondo", las N deben recibir profundidad comparable.
3. **Toda cita Stephanus/Bekker se verifica contra el texto fuente** (`01_Gorgias/00_Texto_Fuente/`) antes de escribirla. Las citas literales verificadas fueron lo más sólido de la revisión.
4. **No afirmar lo que se puede argumentar.** El tramo de Calicles (σωφροσύνη/κόσμος) se presupuso en vez de anclarse en pasajes — bastaban 2-4 líneas con cita.
5. **Con límite de extensión, profundizar = recortar en otra parte.** Presupuesto de palabras explícito: 2.200–2.800.
6. **Una sola versión canónica del ensayo** en esta carpeta; los respaldos van FUERA del workspace (`/tmp/ensayo-archivo/`), porque el sync de Agora duplica/restaura archivos y genera confusión de versiones.
7. La objeción más fuerte del profesor (orientación al bien) se respondió con: τέλος interno del arte ≠ ciencia del Bien último (*EN* VI), diferencia con la justicia por objeto formal, y "la orientación pertenece al arte, el uso al agente (ἦθος)" — el peligro de la retórica como *prueba* de su condición de τέχνη.

## Ubicaciones

- **Ensayo (canónico):** `ensayo/Ensayo_Final.md` (+ `.docx`, `.pdf`).
- **Historial por versión:** `docs/iteraciones/`.
- **Método y auditoría:** `docs/METODOLOGIA.md`.
- **Defensa oral:** `ensayo/Defensa_Oral_QA.md`.
- **Crítica / evaluación (artefactos v4–v5):** `ensayo/Critica_Ensayo.md`, `ensayo/Evaluacion_5_y_pendientes.md`.
- **Carta del profesor:** `ensayo/Steven Vallejo revisado.md` (gitignored — no redistribuida).

---

## Plataforma web, PDF entregable y material de estudio (capa de difusión)

> En paralelo al ensayo (5–9 jul 2026) se construyó una **plataforma web** que presenta el
> argumento, permite **descargar el PDF entregable** con el formato exacto del profesor, ejecuta la
> lógica formal **en vivo** y aloja el **material de estudio**. El repositorio se publicó como
> referencia abierta y auditable. Esta capa **no es parte del entregable**: el ensayo (`.md`/`.docx`/
> PDF) se sostiene solo. Aquí se registra el arco de críticas → iteraciones → resultado, para no
> repetir los tropiezos de diseño.

### Stack y despliegue

- **Vite + React 18.3** · `react-router-dom` 6.27 · `framer-motion` 11.11 · `react-markdown` 10.1 (+`remark-gfm`).
- Despliegue por **Vercel CLI** (`vercel --prod --yes`) desde `web/`; proyecto ligado en `web/.vercel/` (Vercel `web-kappa-weld-59`). El enlace de Vercel **se preserva** (nunca se borra ni se commitea).
- Repo público: **github.com/stevenvo780/ensayo-platon-gorgias**, enlazado desde el sitio.
- Páginas: `EssayPage` (ensayo interactivo) · `PresentationPage` (tipo PPT) · `PdfPage` (formato de entrega) · `MaterialesPage` (material de estudio) · `LecturaPage` (visor de Markdown).

### Cronología de críticas e iteraciones (la voz del autor, textual en lo esencial)

| # | Crítica recibida | Diagnóstico | Resolución |
|---|---|---|---|
| 1 | «El PDF se ve **corrupto/extraño**, ya no cumple el criterio del profesor» (referentes: `hinton.stevenvallejo.com`, `fenomenologiaurbana.stevenvallejo.com`) | Captura headless: **no** era la fuente (el griego politónico renderiza bien) sino **ríos de justificado** en móvil + solape del botón de descarga | Se quitó el justificado en móvil (`text-align:left`), se recolocó el botón |
| 2 | «Sube a **React**, deja todo limpio, crea **logo**, más **animaciones**, revisa **responsive** en celular, veo **espacios en blanco gigantes**» | Sitio estático → migración a componentes; huecos por medidas fijas y contenedores sin `max-width` fluido | Migración a React + router; logo; animaciones `framer-motion`; medidas fluidas; se cerraron los huecos |
| 3 | «El PDF sigue con **contrastes y líneas incorrectas**, debe **encajar a la perfección** con los criterios» | Los subtítulos heredaban la display font (Cormorant Garamond) por una regla global `h1,h2,h3`; color no era negro puro | Se forzó **Times New Roman** (`Tinos`/`Liberation Serif` fallback), cifras *lining*, **`#000`** en los descendientes de `.pdf-root` |
| 4 | «Debe ser **descargable** perfectamente desde la web» | Faltaba el binario servido y el botón | `web/public/ensayo-gorgias.pdf` (regenerado) + botón de descarga en `PdfPage` |
| 5 | «El PDF **medio 7 hojas** no cumple; **validas muy poco**, desaprovechas que tienes **workflows** y modelos (Gemini/MiniMax)» | La página servía aún el texto base (8 pp) | Se hizo de `Ensayo_Final.md` la **v6 ≤5 pp**; **`pdfinfo` como guardián duro** de conteo (5 pp); `make pages` valida ≤5 |
| 6 | «El **ST** se podría ejecutar en **tiempo real** dentro del sistema» | La lógica formal estaba estática | **Serverless** `web/api/st.js` (runtime Node) corre `@stevenvo780/st-lang` con **z3-solver** (WASM); `ArgumentCard` hace `fetch('/api/st')`; resultado real en vivo (~0.3 s) |
| 7 | «Debería ser más fácil **leer**; poder **ocultar el índice** y dar protagonismo al texto; lo tengo en pantalla **vertical** y es difícil» | El índice competía con el texto; sin control de colapso | (1ª iteración) botón flotante de «modo lectura» + estado |
| 8 | «¿**No era más simple un botón** para colapsar? Lo tengo en **vertical** y hay **demasiado espacio a los costados**; el responsive debería manejarlo» | El «modo lectura» era una sobre-ingeniería; el breakpoint dejaba el índice lateral robando ancho en vertical | Se **eliminó** el modo lectura; índice **colapsable**; breakpoint 1024→**1280 px** para que en vertical el índice pase a barra superior; `--measure` a **78ch**; artículo `min(96vw, 60rem)` |
| 9 | «Falta **padding** entre el índice y la parte superior, está pegado y se ve feo; **se contrae hacia arriba, no hacia el lado**; **no le pusiste ni 1 gota de sentido UI/UX**» | El índice-barra se contraía mal y sin aire | Índice que **pliega hacia arriba** con padding y borde; tipografía de cuerpo mayor (`clamp`), `line-height` 1.78; artículo centrado, estable y ancho |
| 10 | «En material de estudio los **.md** deberían tener **vista de lectura**; y **resúmenes de cada autor** citando **la fuente** de cada punto» | Los `.md` sólo se descargaban; no había síntesis por autor | Visor Markdown (`LecturaPage` `/lectura/:slug`); **9 resúmenes de autor** con citas (Stephanus/Bekker/páginas) |

### Material de estudio — resúmenes de autores (las «lecturas»)

Nueve fichas en `web/public/materiales/autores/`, con prosa propia y aparato de citas, seguras de
copyright, para que el autor **sustente cada punto** en la defensa:

- **Antiguos (citas Stephanus/Bekker verificadas contra el argumento del ensayo):** `platon-gorgias`,
  `socrates`, `gorgias`, `polo`, `calicles`, `aristoteles`.
- **Modernos (teoría de la argumentación / persuasión):** `perelman-olbrechts-tyteca`, `toulmin`,
  `cialdini`. Algunos números de página van marcados **`[verificar]`** (pendiente del autor cotejar
  contra copia física antes de citarlos en la defensa).

`MaterialesPage` presenta los `.md` con acción **«LEER →»** (abre el visor) + descarga secundaria, y
una sección **«Autores y fuentes»** con las 9 fichas.

### Build y guardianes (formato del profesor, sin intervención humana)

- `scripts/md2docx.py` → **TNR 12 / interlineado 1.5 / márgenes 2.54 cm** (verificado: cuerpo 12 pt/1.5; los subtítulos a 13 pt negrita son estándar, no una violación).
- `scripts/md2pdf.sh` → 12 pt / 1.5 / 2.54 cm, fuente Times-métrica con griego politónico (Liberation Serif en este entorno); fix del título (se retiran `* _ #` del metadato pandoc).
- `Makefile`: `verify` (citas) · `docx` · `pdf` · `pdf-web` (regenera y copia a `web/public/ensayo-gorgias.pdf`) · `wordcount` (≤1490) · **`pages`** (regenera PDF y falla si >5) · `all`.
- **`pdfinfo` es la compuerta dura de conteo de páginas**: el PDF entregable mide **5 páginas** exactas.

### Repositorio público, limpio y auditable

- El profesor invitó a **auditar el uso de IA** («demostrar un uso excelso»). Se optó por
  **transparencia radical**: se publican ensayo, web, proceso, bitácora y build.
- **Copyright fuera del historial:** la fuente primaria (traducción de Gredos, `fuente/`) y la
  **carta del profesor** (`Steven Vallejo revisado.md/.docx`) están en `.gitignore`; se rehízo el
  historial (rama limpia, *orphan*) para que **no aparezcan en ningún commit** del remoto público.
- README presentable + enlace a GitHub desde el sitio.
- **Reorganización para auditoría (9-jul).** Se eliminó la app web muerta `retorica-techne/`
  (segundo proyecto Vite abandonado) y el `index.html` de raíz (sitio pre-React); se
  des-trackeó `__pycache__`. Los 9 resúmenes de autor se unificaron en
  `material-estudio/autores/` (fuente única), eliminando los duplicados `08-13`. El espejo
  `web/public/materiales/` pasó a **generarse** con `scripts/sync_materiales.sh` (`make
  materiales`), corrigiendo un bug de trazabilidad (el ensayo servido estaba desfasado). Se
  documentó el método en `docs/METODOLOGIA.md`. Resultado: sin redundancias, con fuente
  única y espejo reproducible.
- **Historial de iteración seccionado (9-jul).** Se creó `docs/iteraciones/` (índice + 8 docs,
  del anteproyecto a la v6.2): cada versión con su **ciclo de crítica → cambio → evidencia**,
  reconstruido del registro real de esta bitácora (no fabricado). Se expone como **subvista de
  navegación** en `/materiales` («Iteraciones del ensayo»), sustituyendo el volcado de versiones
  suelto por un recorrido coherente. Las ediciones asistidas van marcadas y pendientes de la voz
  del autor.

### Correcciones de coherencia para la auditoría (3 obligatorias — aplicadas)

1. **Cialdini coherente.** La reincorporación de Cialdini en v6 se documentó como **uno de los dos
   anacronismos declarados** (fila v6 de la tabla), para que bitácora y ensayo **coincidan** ante un
   auditor.
2. **`Defensa_Oral_QA.md` público — decisión consciente.** Es preparación de examen oral legítima; se
   mantiene visible como parte de la transparencia. *(Ver nota de estado más abajo: en la práctica
   también quedaron públicos `Critica_Ensayo.md`, `Evaluacion_5_y_pendientes.md` y `PLAN_V6…`.)*
3. **Lenguaje de nota simulada, reformulado.** Se eliminó todo «evaluador simulado: 5,0» y similares,
   sustituido por «**verificación adversarial: sin objeciones pendientes**» (en esta bitácora y en el
   design spec). **Verificado 9-jul:** `git grep` no halla ninguna ocurrencia del lenguaje de nota
   simulada en el repo; el único «5,0» que queda es la **nota real** del profesor al anteproyecto.

### Automatización — hook de auto-sync (9-jul-2026)

Para «commit y push en cada cambio», se añadió un **hook `Stop`** en `.claude/settings.local.json`
(gitignored, no se publica): al terminar cada turno hace `git add -A` y, **solo si** hay cambios y
**ningún** archivo de copyright/privado quedó *staged* (`grep -qiE 'fuente/|revisado'`), commitea
`auto-sync <ISO-UTC>` y hace `push origin public-clean:main`. Es **red de seguridad**, no reemplazo:
los commits de trabajo siguen siendo descriptivos y a mano.

### Estado de los documentos internos en el repo (9-jul-2026)

Confirmado con `git ls-files`: están **públicos** los cuatro documentos de trabajo —
`ensayo/Critica_Ensayo.md`, `ensayo/Evaluacion_5_y_pendientes.md`, `ensayo/Defensa_Oral_QA.md`,
`ensayo/PLAN_V6_Reestructuracion.md`—. Ninguno contiene ya lenguaje de nota fabricada. Coherente con
la transparencia elegida; **queda como decisión del autor** si prefiere mantener alguno privado
(bastaría añadirlo a `.gitignore` y `git rm --cached`).

## Lecciones aprendidas — capa web / UX / entregable

8. **El «PDF corrupto» casi nunca es la fuente.** Diagnosticar con captura headless antes de tocar
   tipografías: el problema real eran justificado en móvil y una regla global de headings que filtraba
   la display font al formato de entrega.
9. **Aislar el formato de entrega del tema del sitio.** El PDF/`PdfPage` debe forzar TNR + negro puro
   + cifras *lining* en su propio *scope* (`.pdf-root`), sin heredar las fuentes decorativas del sitio.
10. **Validar el conteo de páginas con una compuerta dura (`pdfinfo`), no a ojo.** «Medio 7 hojas» se
    repitió porque no había *gate*; ahora `make pages` falla si >5.
11. **UI/UX: colapsar, no re-inventar.** La primera respuesta (un «modo lectura» con estado) fue
    sobre-ingeniería. Lo que el usuario pedía era simple: **un índice colapsable** que en vertical se
    pliega **hacia arriba** con aire, devolviendo el ancho al texto. Escuchar la forma exacta de la
    queja («se contrae así arriba, no así al lado») antes de codificar.
12. **Responsive real = el breakpoint sirve al caso de uso.** En pantalla vertical el índice lateral
    robaba ancho; subir el breakpoint a 1280 px y mandar el índice arriba resolvió el «demasiado
    espacio a los costados».
13. **Transparencia auditada exige coherencia entre artefactos.** Si el ensayo reincorpora a Cialdini,
    la bitácora debe decirlo; si se publican docs de proceso, no pueden contener lenguaje de nota
    simulada. La consistencia entre ensayo ↔ bitácora ↔ repo es parte del entregable de confianza.

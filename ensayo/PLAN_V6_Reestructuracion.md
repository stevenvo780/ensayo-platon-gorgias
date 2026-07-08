# PLAN OPERATIVO v6 — Reestructuración del ensayo (Gorgias) a ≤5 páginas

> **Qué es esto:** un mapa de trabajo para que Steven reescriba **a mano** su ensayo base
> (`ensayo/Ensayo_Final.md`) hasta el formato estricto del profesor. **No contiene prosa nueva
> del ensayo**: solo presupuestos, recortes, instrucciones y checklists. Las frases entre «...»
> son anclas del texto **ya existente** (para localizar tramos), no redacción sugerida.
>
> **Regla base:** el autor edita solo `ensayo/Ensayo_Final.md`. Todo lo demás (docx, pdf, web)
> se regenera con `make`. Ver §7.

---

## 1. Parámetros duros y matemática de páginas

**Formato del profesor (obligatorio):** máx. **5 páginas TOTAL**, interlineado **1.5**, **Times New
Roman 12pt**, márgenes estándar (2.54 cm), entrega **viernes 17 de julio de 2026**. Subtítulos
recomendados (úsalos). Bibliografía: **2–6 referencias** (ya hay 6).

**Calibración empírica** (medida sobre el PDF real en ese formato): **≈349 palabras/página**.

| Zona | Páginas | Presupuesto (palabras) |
|---|---|---|
| Título | — | 12–15 |
| Introducción | ≤ 1 | **≤ 320** |
| Desarrollo (S1–S4, con subtítulos) | 3 | **≈ 1000** |
| Conclusión | ½ | **≤ 160** |
| **Cuerpo total (título→antes de Bibliografía)** | 4.5 | **≤ 1490** ← tope de `make wordcount` |
| Bibliografía | ½ | ~100 (las 6 actuales entran) |

**Punto de partida (medido en la base actual):** cuerpo = **2678 palabras** → hay que **quitar
~1190** para llegar a 1490. No es retoque: es reestructuración. El presupuesto ya trae colchón del
5%; si `make pages` da 5 justas, recorta 30–40 palabras más de margen.

---

## 2. Mapa sección-a-sección — plantilla del profesor ← material de la base

Conteos reales por sección de la base (medidos):

| Base actual | Palabras | → | Sección v6 | Objetivo |
|---|---:|---|---|---:|
| Título (línea 1) | 18 | → | **Título** | 12–15 |
| Introducción | 335 | → | **Introducción** | ≤ 320 |
| §1 (tres interlocutores) | 346 | ⟶ fusión | **S1** El problema y la clasificación | ~280 |
| §2 (clasificación arbitraria) | 280 | ⟶ fusión | | |
| 3.1 objeto propio | 264 | ⟶ compresión | **S2** Los cuatro criterios y su verificación | ~300 |
| 3.2 principios racionales | 309 | ⟶ compresión | | |
| 3.3 conocimiento de causas | 287 | ⟶ compresión | | |
| 3.4(a)+(b) + encabezado | 356 | → | **S3** El criterio decisivo: orientación al bien | ~230 |
| 3.4(c) + salida | 292 | → | **S4** Objeción y respuesta (+ implicaciones) | ~190 |
| Conclusión | 181 | → | **Conclusión** | ≤ 160 |
| Bibliografía | 101 | → | **Bibliografía** | ~100 |

### TÍTULO
El actual (18 palabras, con subtítulo largo) excede lo pedido. **Conserva el núcleo**
«La retórica como τέχνη y no ἐμπειρία» y **abrevia el subtítulo** (o elimínalo). Corto e informativo.

### INTRODUCCIÓN (≤ 320, ≤1 pág) — orden sugerido de la plantilla
- **Contexto:** párrafo 1 actual (desde «El *Gorgias* contiene» hasta «sin poder decir la causa»).
  Recórtalo ~15%: la enumeración de los cuatro criterios puede condensarse (se despliega luego en S2–S4).
- **Pregunta en 1 frase:** **ya existe**, consérvala literal — «**Pregunta central:** ¿puede
  mostrarse... orientación al bien?». No la reescribas.
- **Relevancia filosófica explícita:** **HOY FALTA.** Añade 1–2 frases (→ **lo escribe el autor**, §4).
- **Tesis:** **ya existe** — «acepto la jerarquía socrática... pero disputo que la retórica pertenezca
  a las segundas». Consérvala.
- **Plan:** adapta la última frase de la intro («Procedo en tres movimientos...») a las **cuatro**
  secciones nuevas S1–S4.

### DESARROLLO (3 págs, con subtítulos)

**S1 — El problema y la clasificación del *Gorgias*** (~280; fusiona §1+§2, hoy 626)
- Conserva la **refutación de Gorgias con su premisa de contrabando**: ancla «descansa sobre una
  premisa de contrabando: que la retórica *versa sobre la justicia*».
- Conserva los **dos movimientos no probados** de 462b–466a: «reduce el objeto... a "lo justo y lo
  injusto"» y «niega... principios racionales sin probarlo».
- **Comprime Polo y Calicles a 2–3 líneas cada uno**, conservando el **riesgo democrático** («el
  riesgo democrático en estado puro» / «Retendré ese riesgo... para el §3.4»).
- **La cadena 503e–508a a una sola línea con sus citas** («una casa con orden [...]», «la justicia y
  la moderación», «un alma moderada es buena»).

**S2 — Los cuatro criterios y su verificación** (~300; comprime 3.1+3.2+3.3, hoy 860)
- **Tres géneros** (objeto propio): oyente-futuro/pasado/espectador; deliberativo, judicial,
  epidíctico. La falacia de tomar la parte por el todo, en 1 frase.
- **ethos/pathos/logos + entimema, con Perelman y Toulmin en 2–3 líneas** (auditorio universal =
  patrón de validez; Toulmin = anatomía dato/garantía/respaldo). No un párrafo por autor.
- **Libro II + Cialdini en 2–3 líneas** (las παθη como tratado causal; Cialdini «cuantifica lo que
  Aristóteles describía»). **Los dos anacronismos del autor se conservan, pero breves.**

**S3 — El criterio decisivo: la orientación al bien** (~230; de 3.4(a)+(b), hoy 356)
- (a) τέχνη vs φρόνησις: «puede emplearse mal: el dominio del arte no incluye la rectitud del fin»;
  fin propio + «toma sus premisas (*Retórica* I, 1356a)».
- (b) diferencia con la justicia = objeto formal («no produce almas justas, sino discursos
  persuasivos...»). Comprime el «contragolpe más duro» a 1 frase que remita a S2.

**S4 — Objeción y respuesta** (~190; de 3.4(c)+salida, hoy 292) — **casilla exacta de la plantilla**
- **La objeción ES la contra-pregunta del profesor:** «¿Entonces el retórico nunca podría actuar
  injustamente? Y si nunca, ¿no deja de ser la retórica un riesgo para la democracia?».
- **La respuesta:** orientación del *arte* (τέλος) vs uso del *agente* (ἦθος), + la **inversión**
  («El peligro de la retórica es, paradójicamente, consecuencia de que es τέχνη»).
- **Implicaciones filosóficas (80–100 palabras, cierran S4):** **HOY FALTA** como pieza propia
  (→ **lo escribe el autor**, §4): qué significa la inversión del riesgo para la democracia.

### CONCLUSIÓN (≤ 160, ½ pág)
- **Recapitulación comprimida:** el largo repaso de los cuatro criterios (desde «Verificada frente a
  los cuatro criterios...» hasta «...τέχνη y no ἐμπειρία») baja a 2–3 frases.
- **Preguntas abiertas:** **HOY FALTAN** (→ **lo escribe el autor**, §4).

### BIBLIOGRAFÍA (½ pág) — **no tocar**
Las 6 referencias actuales cumplen el rango 2–6. Déjalas.

---

## 3. Tabla de recortes (tramo → objetivo, con anclas)

| # | Tramo (ancla existente) | Actual | Objetivo | Ahorro | Acción |
|---|---|---:|---:|---:|---|
| R1 | Intro, enumeración de los 4 criterios en «una τέχνη tiene (1)...(4)...» | 335 | 320 | ~15 | condensar (se despliegan en S2–S4) |
| R2 | §1 Polo: «abandona el arte... los más felices» | — | 2–3 líneas | — | comprimir |
| R3 | §1 Calicles: «opone φύσις a νόμος... apetito» | — | 2–3 líneas | — | comprimir, conservar riesgo democrático |
| R4 | §1 cadena orden del alma «como todo artesano... (508a)» | — | 1 línea + citas | ~60 | fusionar |
| R5 | §1+§2 completos → **S1** | 626 | ~280 | **~346** | fusión + poda |
| R6 | 3.1 «Una τέχνη exige, ante todo, un objeto propio...» | 264 | parte de S2 | | comprimir a esquema |
| R7 | 3.2 párrafos Perelman y Toulmin (uno cada uno) | 309 | 2–3 líneas | | fundir ambos |
| R8 | 3.3 Cialdini «En *Influence* (1984) sistematiza seis principios...» | 287 | 2–3 líneas | | comprimir, conservar anacronismo |
| R9 | 3.1+3.2+3.3 → **S2** | 860 | ~300 | **~560** | compresión fuerte |
| R10 | 3.4(a) «¿Cómo puede la retórica orientarse al bien...» | 175 | ~130 | ~45 | podar |
| R11 | 3.4(b) «¿en qué se diferencia de la justicia?» | 134 | ~100 | ~35 | podar |
| R12 | 3.4(c)+salida → **S4** | 292 | ~190 (incl. implicaciones nuevas) | **~100** | comprimir la doble presuposición a 1 frase |
| R13 | Conclusión recap de los 4 criterios | 181 | ~160 | ~20 | comprimir enumeración |

**Ahorro agregado dirigido:** ~1190 palabras (2678 → ~1490). Prioriza R5 y R9 (aportan el 75% del recorte).

---

## 4. Lo que la plantilla exige y HOY FALTA — **lo escribe el autor**

Tres piezas nuevas (redáctalas tú; no están en la base). Mantén el presupuesto: lo que agregues
aquí, recórtalo de los tramos de §3.

1. **Relevancia filosófica explícita** (Introducción, 1–2 frases): por qué la pregunta importa más
   allá del *Gorgias* (p. ej., estatuto epistémico de la persuasión / retórica y democracia). Ya hay
   material latente en «atacar la retórica era atacar la política misma» — hazlo explícito como
   *relevancia*.
2. **Implicaciones filosóficas** (cierre de S4, 80–100 palabras): qué significa la **inversión del
   riesgo** («el peligro... consecuencia de que es τέχνη») para la democracia deliberativa.
3. **Preguntas abiertas** (Conclusión): formula 2–3, **solo sobre temas ya presentes en tus
   materiales**, sin desarrollarlas:
   - la **retórica ideal del *Fedro* 271c–277a** como investigación futura;
   - la **formación del carácter (ἦθος)** del orador;
   - **qué instancia vigila el mal uso** de la retórica en una democracia.

> Nota: el *Fedro* no está citado en el cuerpo de la base (sí en la v5 archivada). Como **pregunta
> abierta** puedes nombrarlo sin añadir una entrada bibliográfica; si decides desarrollarlo en el
> cuerpo, entonces sí añádelo a la bibliografía.

---

## 5. Citas intocables (verificadas contra la fuente — NO alterar al reescribir)

Puedes **mover, acortar el contexto o quitar** una cita para ahorrar palabras, pero si la conservas,
el texto entre «...» y su localizador (Stephanus/Bekker) deben quedar **idénticos**. `make verify`
las comprueba una a una.

**Platón, *Gorgias* (literales verificadas):**
- «adulación» (κολακεία)
- «ningún fundamento por el que ofrecer las cosas que ella ofrece» (465a)
- «el mayor bien» (452d)  ← **corrección ya aplicada** (antes «el mayor de los bienes»)
- «creencia sin el saber» (454e)  ← **corrección ya aplicada** (antes «creencia sin saber»)
- «ciencia» (454e)
- «lo justo y lo injusto» / «lo justo y lo injusto en los tribunales y las asambleas» (454b–455a)
- «un simulacro de una parte de la política» (463d)
- «no se ocupa del bien» (464d)
- «irracional» (ἄλογον) (465a)
- «decir la causa» / «no puede decir la causa» (465a)
- «pone su punto de mira en el placer sin el bien» (464d–465a)
- «una casa con orden [...] es buena, pero sin orden es mala» (504a)
- «la justicia y la moderación» (σωφροσύνη, 504d)
- «un alma moderada es buena» (506e–507a)

**Aristóteles — localizadores Bekker (no verificables por script, pero NO inventar ni cambiar):**
1140a, 1354a, 1355b, **1356a**, 1358a, 1358b, 1366a, 1378a.
- **Corrección ya aplicada:** las premisas que la retórica «toma» de la ética/política → **(*Retórica*
  I, 1356a)**. Ojo: el otro «*Retórica* I, 1355b» (junto a «considera en cada caso lo que es apto para
  persuadir») es **correcto y no se toca**.

Las glosas/paráfrasis (marcadas `info(glosa)` en `make verify`, p. ej. «práctica empírica», «lo que
les parece», «cuerpo de la prueba») no son cita literal: puedes reformularlas, pero no las conviertas
en «...» atribuidas a la fuente sin verificar.

---

## 6. Checklist de entrega

- [ ] **Subtítulos** dividen las secciones (S1–S4 con título propio).
- [ ] **Pregunta en 1 frase** presente y literal («Pregunta central: ...»).
- [ ] **Relevancia filosófica** explícita en la intro (pieza nueva §4.1).
- [ ] **Una objeción + una respuesta** identificables (S4).
- [ ] **Implicaciones filosóficas** presentes (cierre S4, pieza nueva §4.2).
- [ ] **Preguntas abiertas** en la conclusión (pieza nueva §4.3).
- [ ] **≤ 5 páginas:** `make pages` → veredicto OK.
- [ ] **Presupuesto:** `make wordcount` → cuerpo ≤ 1490.
- [ ] **Citas:** `make verify` → «0 cita(s)... sin coincidencia».
- [ ] **2–6 referencias** en bibliografía (hay 6).
- [ ] **Lectura en voz alta** de intro y conclusión (fluidez tras los recortes).
- [ ] **Exportar:** `make docx` (y `make pdf`) al formato de entrega.

---

## 7. Flujo de trabajo exacto (comandos literales)

```sh
cd /workspace/ensayo-platon-gorgias

# 1. Editar SOLO el ensayo, a mano:
$EDITOR ensayo/Ensayo_Final.md

# 2. Control de calidad + export (verify + wordcount + docx + pdf):
make all

# 3. Chequear tope de páginas (regenera el PDF y cuenta):
make pages          # veredicto: OK (<= 5 páginas)

# 4. Regenerar la página web imprimible (web/pdf.html):
make web

# 5. Deploy (Vercel auto-despliega al hacer push a GitHub):
git add ensayo/Ensayo_Final.md ensayo/Ensayo_Final.docx ensayo/Ensayo_Final.pdf web/pdf.html
git commit -m "essay: v6 reestructuracion a <=5 paginas"
git push origin elevar-ensayo-gorgias
```

**Ciclo corto mientras editas** (sin exportar todavía):

```sh
make wordcount      # ¿cuerpo <= 1490?
make verify         # ¿citas OK?
```

Itera 2→3 hasta que `make pages` y `make wordcount` den ambos OK; recién entonces `make web` y push.

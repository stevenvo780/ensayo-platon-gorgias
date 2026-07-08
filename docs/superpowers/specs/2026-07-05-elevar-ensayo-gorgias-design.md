# Diseño — Elevar el nivel del proyecto del ensayo *Gorgias* ("ensayo esbelto + repo de alto nivel")

- **Fecha:** 2026-07-05
- **Autor del proyecto:** Steven Vallejo (programador)
- **Entrega del ensayo:** 13 de julio de 2026 · Prof. Juan Camilo Toro · Seminario *Gorgias* y *Fedón*
- **Estado:** aprobado (brainstorming) → pendiente de plan de implementación

## 1. Contexto y requisitos (verificados en el repo)

- El escrito final es un ensayo sobre **la retórica en el *Gorgias***; entrega 13-jul-2026 (`curso/Plan de trabajo`).
- **No hay** requisito duro de formato, extensión ni norma de citación. La única señal de longitud es la carta del profesor: *"un ensayo de cinco páginas"* (blanda). Sus dos recomendaciones (analizar a fondo las 4 condiciones de τέχνη —esp. la orientación al bien— y reducir autores) **ya están atendidas** en `Ensayo_Final.md`.
- El ensayo actual **cumple todos los requisitos explícitos** (2.929 palabras de cuerpo; 5,0 en evaluación simulada; citas de Platón verificadas literales).
- Hallazgo latente: el propio plan del autor (`Autores_y_Contexto.md`, Fase 4) quería promover **Dodds** y **Guthrie** (aparato erudito) al cuerpo §1–§2; nunca se hizo.

## 2. Objetivo y no-objetivos

**Objetivo.** Subir el nivel intelectual del proyecto: (a) rigor lógico explícito de las refutaciones, (b) aparato erudito, (c) un repositorio "programable" que se auto-verifica — **sin** romper el ensayo como entregable limpio.

**No-objetivos.**
- No reescribir el argumento del ensayo (ya es 5,0).
- No añadir autores *teóricos* nuevos al cuerpo (respeta R2 del profesor). Dodds/Guthrie entran como *aparato*, no como tesis.
- No proof-checkers ni CI (el usuario eligió notación legible, no machine-checkable).

## 3. Invariante rector

> **El ensayo (`ensayo/Ensayo_Final.md` / `.docx`) se sostiene solo.** Nada de `docs/` es necesario para seguir el argumento. La capa extendida es supplementary: para el lector riguroso y para el craft del autor. Consecuencia verificable: si se borrara `docs/`, el ensayo seguiría siendo completo y entregable.

## 4. Arquitectura en capas

```
ensayo/                         NÚCLEO auto-contenido (se entrega esto)
  Ensayo_Final.md · Ensayo_Final.docx
docs/                           CAPA EXTENDIDA (el "nivel")
  README.md                     índice de la capa y cómo se relaciona con el ensayo
  formal/derivaciones.md        refutaciones en notación legible (∀ ∃ → ¬)
  aparato/dodds-guthrie.md      aparato erudito (Dodds, Guthrie) + nota Fedro
  mapas/argumento.md            diagramas mermaid del argumento
scripts/
  verify_citations.py           valida cada Stephanus/cita del ensayo vs fuente/
  md2docx.py                    genera Ensayo_Final.docx desde el .md
Makefile                        targets: verify · docx · wordcount · all
docs/superpowers/specs/         este diseño
```

Estructura existente (`curso/`, `fuente/`, `material-estudio/`, `notas-clase/`) **intacta**. `requirements.txt` o venv documentado para `python-docx`.

## 5. Componentes

### 5.1 Capa formal — `docs/formal/derivaciones.md`
Notación **legible**: predicados con símbolos (∀ ∃ → ¬ ∧ ↔), validez explicada en prosa; **no** ejecutable. Cada argumento es una unidad auto-contenida con este molde fijo:
**(i) enunciado natural → (ii) formalización → (iii) veredicto de validez → (iv) nexo con el pasaje/§ del ensayo.**

Argumentos a formalizar (los cinco):
1. **Refutación de Gorgias (460b).** Silogismo intelectualista válido; se aísla la premisa oculta *"la retórica versa sobre la justicia"* como el punto de contrabando.
2. **Falacia de composición (§2).** `∃x(R(x)∧S(x)) ⊬ ∀x(R(x)→¬λόγον(x))`: de "algún orador persuade sin saber" no se sigue "la retórica carece de principios".
3. **τέχνη como predicado.** `τέχνη(x) ↔ objeto(x) ∧ principios(x) ∧ causas(x) ∧ orientación(x)`; la verificación del ensayo = probar cada conyunto para `x = retórica`.
4. **Trampa simétrica (§3.4c).** Se exhibe que `orientación_al_bien(r) → ¬puede_dañar(r)` es el paso inválido (confunde τέλος del arte con conducta del agente).
5. **Disolución arte/agente.** La aparente contradicción `orientada_al_bien(r) ∧ puede_usarse_mal(r)` se disuelve por *scope*: `orientación` predica del arte (τέλος), `mal uso` del agente; sujetos distintos ⇒ no hay contradicción.

### 5.2 Aparato erudito — `docs/aparato/dodds-guthrie.md`
- **Dodds**, *Plato: Gorgias. A Revised Text with Introduction and Commentary* (OUP 1959): comentario estándar; se citan lemas relevantes (p. ej. *ad* 465a, 466b) que apoyan la lectura del ensayo.
- **Guthrie**, *A History of Greek Philosophy* IV (CUP 1975): contexto sofístico/retórico.
- **Nota Fedro** (271c–277a) ampliada: por qué la retórica dialéctica del *Fedro* concede a Platón mismo una retórica-τέχνη.
- **Política de fuentes (riesgo).** Estos textos **no están en el repo**; se redactan desde conocimiento y van con marca explícita **`⚠️ VERIFICAR contra copia física`** en cada punto. **Solo** se promueve al ensayo graduado lo más estándar y seguro (a lo sumo 1–2 apoyos); el resto vive en `docs/`, sin arriesgar la nota.

### 5.3 Mapas — `docs/mapas/argumento.md`
Diagramas **mermaid** (render autocontenido):
- (a) árbol de los cuatro criterios de τέχνη y su verificación;
- (b) la cadena de contra-preguntas a/b/c de §3.4 y sus respuestas.

### 5.4 Build / auto-verificación — `Makefile` + `scripts/`
- **`scripts/verify_citations.py`**: extrae del ensayo (1) todas las referencias Stephanus `\b\d{3}[a-e]\b` y (2) todas las citas literales en guillemets `« … »`. Para cada Stephanus: comprueba presencia en `fuente/` (marcador escaso ⇒ chequeo blando, reporta hallado/no-hallado). Para cada cita literal: normaliza (quita `[...]`, colapsa saltos de línea/OCR) y busca una subcadena distintiva en `fuente/`; reporta ✓/✗ con nº de línea. Las citas Bekker de Aristóteles se listan como **"no verificable (sin fuente en repo)"**. **Sale con código ≠0 si alguna cita literal de Platón falla** (para que `make verify` sea un guardián real).
- **`scripts/md2docx.py`**: conversor markdown→docx ya escrito y validado (TNR 12, justificado, griego + negritas/cursivas). Se mueve al repo.
- **`Makefile`**:
  - `make verify` → corre `verify_citations.py`.
  - `make docx` → regenera `ensayo/Ensayo_Final.docx`.
  - `make wordcount` → cuerpo (sin bibliografía) vs presupuesto.
  - `make all` → verify + wordcount + docx.
- Dependencia `python-docx` en venv; documentada en `README` (o `requirements.txt`).

### 5.5 Toque al ensayo (mínimo — "solo donde afila un golpe")
El cuerpo **sigue en prosa** (un lector de filosofía no quiere notación densa en 5pp). Cambios acotados:
- **§2**: una aclaración estructural que nombre el salto inválido (composición) — sin símbolos crudos.
- **§3.4c** (opcional): una nota breve que remita al apéndice formal.
- Cada remisión a `docs/` es **discreta y opcional**; el ensayo no depende de ella (invariante §3).
- Umbral de formalismo dentro del ensayo: **conservador por defecto**; ajustable si el autor lo pide.

### 5.6 README
Nueva sección "Arquitectura en capas" documentando el núcleo vs. la capa extendida y los `make` targets.

## 6. Plan de ejecución por modelos (política de flota)
Se **re-verifican saldos (`get_ai_quotas`) al empezar la implementación** y se reparte por holgura. Asignación tentativa (calidad primero):
- `docs/formal/derivaciones.md` (rigor lógico) → modelo más capaz con saldo (Codex si hay; si no, Gemini/Opus).
- `docs/aparato/` (erudición) → Gemini (contexto/erudición).
- `scripts/*.py` + `Makefile` (código) → OpenCode/Codex.
- `docs/mapas/` (mermaid) → MiniMax.
- Edición quirúrgica del ensayo, verificación adversarial y síntesis → **Opus (no delegar)**.

## 7. Riesgos y mitigaciones
- **Citas Dodds/Guthrie sin fuente** → marca `⚠️ VERIFICAR`; mantener el grueso en `docs/`, no en el ensayo.
- **Longitud del ensayo** (~5,5–6 pp) → la capa extendida absorbe la profundidad; el cuerpo puede incluso adelgazar. Confirmar interlineado con el profesor sigue pendiente (independiente de este diseño).
- **Formalismo que ensucie el ensayo** → invariante §3 + umbral conservador; los símbolos viven en `docs/formal`.
- **Regresión de citas** → `make verify` como guardián automático.

## 8. Criterios de aceptación
1. `make verify` corre y **todas las citas literales de Platón dan ✓**; sale ≠0 si alguna falla.
2. `make docx` regenera un `.docx` válido (griego + formato intactos).
3. Borrar `docs/` no rompe el ensayo (invariante §3): sigue completo y entregable.
4. El ensayo graduado no gana autores teóricos nuevos; a lo sumo 1–2 apoyos de aparato bien sourced.
5. `docs/formal/derivaciones.md` cubre los 5 argumentos con el molde (i)–(iv).
6. `README` documenta las capas y los targets.

## 9. Fuera de alcance (YAGNI)
Proof-checkers (Lean/Coq/SMT), CI, sitio web, y reescritura del argumento del ensayo.

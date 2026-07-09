# Metodología — análisis y auditoría de un ensayo filosófico asistido por IA

> Cómo se produjo y se verifica este proyecto. Documento de proceso, no de contenido.
> El principio rector: **un trabajo asistido por IA no se juzga por su procedencia, sino
> por si resiste una batería de verificación más dura que la aplicada a un texto
> artesanal.** La asistencia no rebaja el estándar; lo sube, porque expone el trabajo a
> pruebas reproducibles. Este archivo documenta esas pruebas para que cualquiera pueda
> repetirlas.

Regla de integridad, previa a todo: **el argumento y la redacción del ensayo son del
autor.** La IA orquesta la verificación, señala flancos y aplica *ediciones quirúrgicas
declaradas* sobre puntos ya propios del autor; nunca inventa la tesis ni redacta secciones
de cero. Cada intervención asistida queda registrada en la bitácora con esa marca.

---

## 1. El proceso, de punta a punta

El ciclo de trabajo de cada versión del ensayo (ver `ensayo/Bitacora_Ensayo.md` para la
ejecución real, versión por versión):

1. **Fuente canónica única.** El texto vive en `ensayo/Ensayo_Final.md`; el `.docx`, el
   `.pdf` y el espejo web se **generan** desde ahí (`make docx`, `make pdf`, `make
   materiales`). Nada se edita en dos sitios a mano.
2. **Redacción del autor.** El autor escribe/ajusta la prosa. La IA no la sustituye.
3. **Verificación de fuentes** (`make verify`): cada cita literal de Platón debe aparecer
   en el texto fuente o la compilación falla (ver lente 2).
4. **Guardianes de forma** (`make wordcount`, `make pages`): presupuesto de palabras y
   conteo de páginas con `pdfinfo` como compuerta dura (≤5 págs, formato del profesor).
5. **Verificación adversarial** (las 7 lentes de §3): se busca la fractura, no el elogio.
6. **Honestidad modal** (§2): se declara qué se *demuestra*, qué se *reinterpreta* y qué
   se *concede*. Reinterpretar un criterio para satisfacerlo **no** es satisfacerlo en su
   versión fuerte; el texto debe decir cuál de las dos cosas hizo.
7. **Recorte solo-borrado.** Cuando hay que acortar, se elimina; no se reescribe. El
   resultado se verifica como **subsecuencia** del original, para no introducir prosa nueva
   por la puerta de atrás.
8. **Trazabilidad.** Cada cambio va a git con mensaje descriptivo y se resume en la
   bitácora (críticas → iteración → resultado). El repo es auditable de principio a fin.

## 2. Carga de la prueba: demostrar vs. reinterpretar vs. conceder

El eje ético del trabajo asistido. Para cada afirmación fuerte del ensayo se clasifica su
estatus y se exige que el texto sea transparente al respecto:

- **Demuestra** — se sigue de premisas + inferencia válida (idealmente formalizable: ver
  `formal/derivaciones.md`).
- **Reinterpreta** — redefine un término/criterio para poder satisfacerlo. Legítimo **solo
  si** se declara y se justifica que la redefinición no es *ad hoc* (p. ej.: exigir a la
  retórica «conocer el Bien» es ilegítimo porque **ninguna** τέχνη lo cumple —ni la
  medicina—; basta ordenarse a un fin propio bueno).
- **Concede / presupone** — se admite sin probar. Debe marcarse para que el lector sepa
  dónde está el suelo blando.

## 3. La batería adversarial — siete lentes

Criterio: reconstruir la mejor objeción posible a cada movimiento y comprobar si el texto
**la responde** o solo **la esquiva**.

1. **Validez lógica.** Cada inferencia central se aísla y se prueba. Lo formalizable se
   valida (notación de `formal/derivaciones.md`; st-lang/`z3` para lo mecanizable); lo no
   formalizable se audita por contraejemplo. Un argumento inválido no se admite por
   concesión académica.
2. **Fidelidad de fuentes.** Toda cita literal aparece en el texto primario; toda
   atribución conceptual corresponde al pasaje referido. Automatizado en
   `scripts/verify_citations.py` (`make verify`): las Stephanus de Platón se chequean
   contra `fuente/`; las Bekker de Aristóteles se declaran «no verificable (sin fuente en
   repo)» y se cotejan contra edición crítica a mano.
3. **Carga de la prueba.** Se distingue lo demostrado de lo reinterpretado/concedido (§2).
4. **Autoconsistencia.** Tensiones internas: una sección que erosiona a otra, concesiones
   que contradicen la conclusión, un término usado en dos sentidos (equivocación).
5. **Adversario experto.** La mejor réplica de un especialista —aquí, un platonista y el
   propio profesor—. ¿El texto ya la responde?
6. **Exceso probatorio.** Ningún argumento debe probar *más* de lo que la tesis necesita:
   el que prueba demasiado no prueba nada (p. ej. «ser peligroso ⟹ ser arte» prueba
   demasiado; la premisa correcta es «manipular *con método* exige conocer las causas»).
7. **Economía y andamiaje.** Autores citados que no hacen trabajo argumentativo,
   afirmaciones decorativas que no son premisas, secciones cuyo peso no corresponde a su
   dificultad. Lo que se pueda borrar sin pérdida, sobra.

## 4. Cómo reproducir una auditoría

```bash
make verify      # lente 2: citas ↔ fuente (falla si una cita literal no aparece)
make wordcount   # forma: cuerpo ≤ presupuesto
make pages       # forma: PDF ≤ 5 páginas (pdfinfo)
```

Las lentes 1, 3–7 son de juicio: se ejecutan leyendo el ensayo con cada lente y anotando
hallazgos con **ubicación, severidad y reparación propuesta** (formato de la última
ejecución en la bitácora, sección «Auditoría adversarial»). Cada hallazgo confirmado se
repara con edición quirúrgica declarada y se re-corren los guardianes.

## 5. Ruteo multi-modelo (cuando aplica)

Las fases mecánicas o voluminosas pueden delegarse a modelos de la flota (lectura/resumen
masivo, drafts, conversiones); la **orquestación, la edición quirúrgica del ensayo, la
verificación adversarial y la síntesis final no se delegan**. La asignación por fase se
declara antes de ejecutar y se elige por calidad primero (el modelo más capaz con saldo),
no por ahorro.

---

*Este marco es reutilizable para cualquier trabajo filosófico asistido por IA. Su ejecución
concreta contra el ensayo de entrega vive en `ensayo/Bitacora_Ensayo.md`.*

# Derivaciones formales del *Gorgias*

> **Apéndice formal:** Este documento es suplementario. El ensayo (`../../ensayo/Ensayo_Final.md`) **no depende** de estas derivaciones; puede leerse y validarse sin consultarlo.

---

### A1 · Refutación de Gorgias (460b)

**(i)** Quien aprendió lo justo es justo; el justo no obra injustamente; luego el discípulo no podría obrar mal — y como sí puede, Gorgias se contradice.

**(ii)** Dominio: personas. `Aj(x)`: aprendió lo justo · `J(x)`: es justo · `I(x)`: obra injustamente.
- P1  ∀x( Aj(x) → J(x) )
- P2  ∀x( J(x) → ¬I(x) )
- C   ∀x( Aj(x) → ¬I(x) )

**(iii)** **Válido** (encadenamiento de condicionales universales). El fallo no está aquí.

**(iv)** §1–§2. El ensayo no niega P1–P2; ataca la **premisa oculta** `P0 ∀x(aprende_retórica(x) → Aj(x))` (la retórica *versa sobre la justicia*). Sin P0 la cadena no arranca para la retórica. §2 muestra que P0 es la reducción arbitraria del objeto; retirada, la refutación sólo toca la pretensión de Gorgias de *enseñar justicia*, no a la retórica como τέχνη.

---

### A2 · Falacia de composición (§2)

**(i)** Sócrates arguye que, dado que algún orador puede persuadir sin conocer la materia, la retórica carece de principios racionales como arte. De que algunos ejemplares de retórica persuadan sin saber no se deduce que la retórica en su totalidad sea carente de principios.

**(ii)** Dominio: ejercicios de retórica. `R(x)`: x es un ejercicio de retórica · `S(x)`: persuade sin conocer la materia.
- Observación: ∃x(R(x)∧S(x))
- Conclusión propuesta: ∀y(R(y) → ¬Principios(y))

**(iii)** **Inválido** — de una propiedad de algunos ejemplares no se sigue una propiedad universal del arte (falacia de composición). Contraejemplo estructural: "algún médico envenena" ⊬ "la medicina carece de principios".

**(iv)** §2. El ensayo expone el salto: la existencia de un mal ejercitante no compromete la estructura racional del arte, sino sólo la competencia del agente. Esta falacia es la primera línea de defensa contra la objeción socrática.

---

### A3 · τέχνη como predicado (marco de todo el §3)

**(i)** Para que la retórica sea un arte y no mera experiencia, debe satisfacer cuatro criterios: poseer un objeto propio, descansar en principios racionales, conocer las causas de su efecto, y orientarse a un bien. Estos cuatro caracteres son necesarios y conjuntamente suficientes.

**(ii)** Dominio: objetos susceptibles de ser artes. `τέχνη(x) ↔ Obj(x) ∧ Prin(x) ∧ Caus(x) ∧ Orient(x)`.
- Obj(ret): la retórica versa sobre deliberaciones públicas (géneros judicial, deliberativo, epidíctico)
- Prin(ret): posee principios racionales (ἦθος, πάθος, λόγος, entimema, etc.)
- Caus(ret): conoce las causas de las pasiones (libro II de la *Retórica*)
- Orient(ret): se orienta a su fin propio (deliberar, juzgar, educar), no al Bien mismo
- Conclusión: τέχνη(ret)

**(iii)** **Válido** si los cuatro conyuntos se sostienen (modus ponens sobre la bicondicional). El ensayo dedica §3 a verificar cada uno.

**(iv)** §3 completa. La estructura formal de la prueba: cada subsección (§3.1–§3.4) revisa uno de los criterios; la conjunción de todos ellos establece la conclusión. La lógica del argumento reposa en esta bicondicional.

---

### A4 · Trampa simétrica (§3.4c)

**(i)** El objetor silenciosamente asume que si la retórica se orienta a un fin bueno (la persuasión), entonces no puede causar daño. Pero la orientación del arte (su τέλος propio) es distinta de la conducta de quien la practica; una τέχνη orientada al bien puede ser mal usada.

**(ii)** Dominio: artes y sus aplicaciones. Paso que el objetor presupone:
- Orient(r) → ¬◇Daño(r)
  [Si la retórica está orientada al bien, no puede causar daño]

**(iii)** **Inválido** — la orientación de un arte a un fin no implica imposibilidad de daño en sus aplicaciones. Confunde el τέλος formal del arte con la conducta ética del agente. Una medicina orientada a la salud puede envenenar si el médico lo desea.

**(iv)** §3.4c. El ensayo disuelve esta trampa al distinguir entre la orientación del arte (definición) y el uso del agente (responsabilidad moral). Sin esta distinción, ninguna τέχνη podrá defenderse de la acusación de "peligro potencial".

---

### A5 · Disolución arte/agente (§3.4c)

**(i)** Parece haber una contradicción: si la retórica está orientada al bien, ¿cómo puede permitir manipulación malintencionada? La respuesta reside en el alcance de los predicados: la orientación caracteriza al *arte*, mientras que el mal uso caracteriza al *agente* que la ejerce.

**(ii)** Dominio: artes, agentes y acciones. Aparente contradicción:
- Orient(r) ∧ ◇MalUso(r)
  [La retórica está orientada al bien Y es posible usarla maliciosamente]

Resolución por alcance (*scope*):
- Orient(r): el arte, por su estructura, orienta su producción hacia su fin propio
- MalUso(r): ∃a( agente(a) ∧ usa(a,r) ∧ mal(a,r) )
  [Existe un agente que usa la retórica de forma mala]

Sujetos distintos (arte vs. agente) ⇒ predicados de orden distinto ⇒ sin contradicción.

**(iii)** **Consistente** (no hay contradicción). Sólo parecía haberla por confusión de sujetos. Corolario involutivo: ◇ManipulaciónMetódica(r) requiere Caus(r) (conocimiento de causas); sólo una τέχνη la posee ⇒ el peligro *prueba precisamente* que es τέχνη, no lo refuta.

**(iv)** §3.4c (cierre). Esta disolución es el remate de toda la sección: transforma la objeción más severa (la retórica es peligrosa) en una *confirmación* de que es τέχνη. Un mero truco o ἐμπειρία no podría manipular metodológicamente; sólo quien sabe las αἰτίαι alcanza ese grado de peligro.

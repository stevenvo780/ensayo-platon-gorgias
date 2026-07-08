# La retórica como τέχνη · Ensayo sobre el *Gorgias* de Platón

Un ensayo académico sobre el *Gorgias* de Platón, acompañado de un sitio web que
lo presenta como lectura, como presentación animada y como material de referencia.

<p align="center">
  <a href="https://retorica.stevenvallejo.com"><b>→ Leer el sitio en vivo · retorica.stevenvallejo.com</b></a>
</p>

<p align="center">
  <a href="https://retorica.stevenvallejo.com/presentacion">Presentación</a> ·
  <a href="https://retorica.stevenvallejo.com/pdf">PDF de entrega</a> ·
  <a href="https://retorica.stevenvallejo.com/materiales">Materiales</a>
</p>

---

## El ensayo

**Tesis:** la retórica es una **τέχνη** (arte con método), no una mera **ἐμπειρία**
(rutina empírica). El ensayo acepta la jerarquía socrática —las τέχναι valen más que
las ἐμπειρίαι— pero disputa que la retórica caiga entre las segundas *por naturaleza*,
y no sólo por alguno de sus usos.

La prueba es una verificación: se somete la retórica a los **cuatro criterios**
implícitos en la distinción del *Gorgias* (462b–466a) —objeto propio, principios
racionales (λόγον ἔχει), conocimiento de causas (αἰτίαι) y orientación al bien
(ἀγαθόν)— y se muestra, con la *Retórica* de Aristóteles, que los satisface los cuatro.
El criterio del bien se reinterpreta: el fin propio de la retórica no es la ciencia del
Bien, sino el **asentimiento razonado** del auditorio.

## Estructura del repositorio

```
.
├── ensayo/           El trabajo: Ensayo_Final en Markdown, .docx y .pdf
├── material-estudio/ Guía de lectura del Gorgias por actos (Gorgias · Polo · Calicles)
├── notas-clase/      Apuntes del seminario (Gorgias 486e–527e)
├── fuente/           Texto primario del diálogo (uso interno; no redistribuido)
├── docs/             Aparato: derivaciones formales, comentario y mapas del argumento
│   ├── formal/         derivaciones lógicas (st-lang)
│   ├── aparato/        notas apoyadas en Dodds y Guthrie
│   └── mapas/          esquema del argumento
├── curso/            Plan de trabajo y temas del seminario
├── scripts/          Generación de .docx / .pdf y verificación de citas
└── web/              El sitio (Vite + React)
```

## La web

Sitio en **Vite + React** (`react-router-dom`, `framer-motion`) con un sistema de
diseño clásico propio —tipografías Cormorant y EB Garamond, acentos en dorado y azul,
tema claro/oscuro— documentado en [`web/DESIGN.md`](web/DESIGN.md).

| Ruta            | Qué es                                                      |
| --------------- | ---------------------------------------------------------- |
| `/`             | El ensayo completo, con índice, mapas del argumento y rigor formal |
| `/presentacion` | Presentación animada en diapositivas (teclado, progreso)   |
| `/pdf`          | El ensayo en el formato exacto de entrega, listo para imprimir |
| `/materiales`   | Todo el proyecto como referencia descargable, por categorías |

## Build

El `Makefile` genera y verifica los entregables desde la fuente en Markdown:

| Target      | Qué hace                                                            |
| ----------- | ------------------------------------------------------------------ |
| `verify`    | Valida las citas Stephanus del ensayo contra el texto fuente       |
| `docx`      | Regenera `ensayo/Ensayo_Final.docx` con el formato de entrega      |
| `pdf`       | Compila `ensayo/Ensayo_Final.pdf` (Pandoc + XeLaTeX)               |
| `pdf-web`   | Regenera el PDF y lo sincroniza en `web/public/ensayo-gorgias.pdf` |
| `wordcount` | Cuenta las palabras del cuerpo y las contrasta con el presupuesto  |
| `pages`     | Verifica que el PDF no exceda las 5 páginas                        |
| `all`       | Encadena `verify + wordcount + docx + pdf`                         |

## Formato de entrega

Times New Roman 12 · interlineado 1.5 · márgenes 2.54 cm · **máximo 5 páginas**.

---

_Steven Vallejo · Seminario Gorgias y Fedón · 2026._
_Fuente primaria: Platón, *Gorgias*, trad. J. Calonge (Gredos, 1983) — no redistribuida por derechos de autor._

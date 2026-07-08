#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Ensayo_Final.md -> web/pdf.html.

Genera UNA página imprimible EXACTAMENTE en el formato de entrega del profesor:
Times New Roman 12pt, interlineado 1.5, @page A4 con márgenes de 2.54 cm, texto
justificado, título centrado, subtítulos en negrita. Conserva griego y guillemets
(« ») en UTF-8. Soporta markdown básico (negrita, cursiva, títulos, listas de
bibliografía). Incluye un botón flotante "Imprimir / Guardar como PDF" que llama a
window.print() y se oculta en @media print. Sin dependencias externas.

Uso: .venv/bin/python scripts/md2web.py   (desde la raíz del repo)
"""
import html
import re
import sys
from html.parser import HTMLParser

SRC = "ensayo/Ensayo_Final.md"
OUT = "web/pdf.html"

# --- Inline markdown: **negrita** y *cursiva* -------------------------------
INLINE = re.compile(r"(\*\*.+?\*\*|\*[^*]+?\*)")


def render_inline(text):
    """Convierte **negrita**/*cursiva* a <strong>/<em>, escapando el resto.

    Escapa primero los caracteres HTML peligrosos (& < >) preservando UTF-8
    (griego, guillemets « », etc.) intactos.
    """
    out = []
    pos = 0
    for m in INLINE.finditer(text):
        if m.start() > pos:
            out.append(html.escape(text[pos:m.start()]))
        tok = m.group(0)
        if tok.startswith("**"):
            out.append("<strong>" + html.escape(tok[2:-2]) + "</strong>")
        else:
            out.append("<em>" + html.escape(tok[1:-1]) + "</em>")
        pos = m.end()
    if pos < len(text):
        out.append(html.escape(text[pos:]))
    return "".join(out)


def md_to_body(md_text):
    """Convierte el markdown del ensayo a HTML de contenido (interior de <article>)."""
    lines = md_text.split("\n")
    parts = []
    in_list = False

    def close_list():
        nonlocal in_list
        if in_list:
            parts.append("</ul>")
            in_list = False

    for raw in lines:
        s = raw.strip()
        if s == "":
            continue
        if s == "***":
            close_list()
            parts.append('<hr class="sep"/>')
            continue
        if s.startswith("# "):
            close_list()
            parts.append('<h1 class="titulo">' + render_inline(s[2:]) + "</h1>")
        elif s.startswith("### "):
            close_list()
            parts.append('<h3 class="subtitulo">' + render_inline(s[4:]) + "</h3>")
        elif s.startswith("## "):
            close_list()
            parts.append('<h2 class="subtitulo">' + render_inline(s[3:]) + "</h2>")
        elif s.startswith("* "):
            if not in_list:
                parts.append('<ul class="bibliografia">')
                in_list = True
            parts.append("<li>" + render_inline(s[2:]) + "</li>")
        else:
            close_list()
            parts.append("<p>" + render_inline(s) + "</p>")
    close_list()
    return "\n".join(parts)


PAGE_TMPL = """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Ensayo — formato de entrega</title>
<style>
  :root {{ --tinta:#111; }}
  @page {{ size: A4; margin: 2.54cm; }}
  html, body {{ background:#f2f2f2; margin:0; padding:0; }}
  body {{
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: var(--tinta);
  }}
  article {{
    box-sizing: border-box;
    background:#fff;
    color: var(--tinta);
    max-width: 21cm;
    min-height: 29.7cm;
    margin: 24px auto;
    padding: 2.54cm;
    box-shadow: 0 1px 6px rgba(0,0,0,.18);
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
  }}
  article p {{ margin: 0 0 .6em 0; text-indent: 0; }}
  h1.titulo {{
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    line-height: 1.4;
    margin: 0 0 1em 0;
  }}
  h2.subtitulo {{ font-size: 12pt; font-weight: bold; margin: 1em 0 .4em 0; }}
  h3.subtitulo {{ font-size: 12pt; font-weight: bold; margin: .8em 0 .3em 0; }}
  ul.bibliografia {{ list-style: none; padding-left: 0; margin: 0 0 .6em 0; }}
  ul.bibliografia li {{
    text-align: left;
    text-indent: -1.2em;
    padding-left: 1.2em;
    margin: 0 0 .35em 0;
  }}
  hr.sep {{ border: none; height: .8em; }}
  .print-btn {{
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
    font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 18px;
    border: none;
    border-radius: 999px;
    background:#1b3a5b;
    color:#fff;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,.28);
  }}
  .print-btn:hover {{ background:#254e79; }}
  @media print {{
    html, body {{ background:#fff; }}
    article {{
      margin: 0; max-width: none; min-height: 0;
      padding: 0; box-shadow: none;
    }}
    .print-btn {{ display: none !important; }}
  }}
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()" type="button">Imprimir / Guardar como PDF</button>
<article>
{body}
</article>
</body>
</html>
"""


class _TextExtractor(HTMLParser):
    """Extrae texto (para validar) y confirma que el HTML es parseable."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.chunks = []

    def handle_data(self, data):
        self.chunks.append(data)

    def text(self):
        return "".join(self.chunks)


def _words_from_md(md_text):
    """Cuenta palabras del markdown ignorando tokens de marcado."""
    t = md_text
    t = re.sub(r"(?m)^\s{0,3}#{1,6}\s+", " ", t)   # encabezados
    t = re.sub(r"(?m)^\s*\*\s+", " ", t)            # viñetas
    t = t.replace("***", " ")                        # separadores
    t = t.replace("**", " ").replace("*", " ")       # énfasis
    return [w for w in re.split(r"\s+", t) if w]


def _words_from_html(body_html):
    parser = _TextExtractor()
    parser.feed(body_html)
    parser.close()
    return [w for w in re.split(r"\s+", parser.text()) if w]


def main():
    with open(SRC, encoding="utf-8") as fh:
        md_text = fh.read()

    body = md_to_body(md_text)
    page = PAGE_TMPL.format(body=body)

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(page)

    # --- Validación 1: HTML parseable (no lanza excepción) ------------------
    checker = _TextExtractor()
    try:
        checker.feed(page)
        checker.close()
        parseable = True
    except Exception as exc:  # pragma: no cover
        parseable = False
        print(f"ERROR: HTML no parseable: {exc}", file=sys.stderr)

    # --- Validación 2: conteo de palabras md vs html dentro de ±3% ----------
    md_words = _words_from_md(md_text)
    html_words = _words_from_html(body)  # solo el contenido del artículo
    n_md, n_html = len(md_words), len(html_words)
    diff_pct = (abs(n_html - n_md) / n_md * 100.0) if n_md else 0.0
    within = diff_pct <= 3.0

    print(f"OK -> {OUT}")
    print(f"HTML parseable: {'sí' if parseable else 'NO'}")
    print(f"palabras md={n_md}  html={n_html}  desvío={diff_pct:.2f}%  "
          f"(±3% -> {'OK' if within else 'FUERA DE RANGO'})")

    if not (parseable and within):
        sys.exit(1)


if __name__ == "__main__":
    main()

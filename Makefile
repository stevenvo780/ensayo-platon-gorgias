PY := .venv/bin/python
ESSAY := ensayo/Ensayo_Final.md
# Presupuesto de cuerpo calibrado empíricamente (12pt, interlineado 1.5, márgenes
# 2.54 cm): densidad ~349 palabras/página; 4.5 páginas para título+cuerpo (0.5 pág
# reservada a bibliografía) con colchón del 5% -> 1490 palabras. Ver `make pages`.
BUDGET := 1490

.PHONY: all verify docx pdf web wordcount pages venv clean materiales
venv:
	@test -d .venv || python3 -m venv .venv
	@.venv/bin/pip install -q -r requirements.txt

verify: venv
	@$(PY) scripts/verify_citations.py

docx: venv
	@$(PY) scripts/md2docx.py

pdf:
	@./scripts/md2pdf.sh

web:
	@$(PY) scripts/md2web.py

wordcount:
	@w=$$(awk '/^## Bibliografía/{exit} {print}' $(ESSAY) | wc -w); \
	  echo "cuerpo: $$w palabras (presupuesto <= $(BUDGET); calibrado 12pt/1.5/2.54cm)"; \
	  if [ "$$w" -le $(BUDGET) ]; then \
	    echo "veredicto: OK (<= presupuesto)"; \
	  else \
	    echo "veredicto: EXCEDE presupuesto en $$((w - $(BUDGET))) palabras"; \
	  fi

pages: pdf
	@p=$$(pdfinfo ensayo/Ensayo_Final.pdf | awk '/^Pages:/{print $$2}'); \
	  echo "páginas PDF (formato de entrega): $$p"; \
	  if [ "$$p" -le 5 ]; then \
	    echo "veredicto: OK (<= 5 páginas)"; \
	  else \
	    echo "veredicto: EXCEDE (>5) por $$((p - 5)) página(s)"; \
	  fi

all: verify wordcount docx pdf
	@echo "OK: verify + wordcount + docx + pdf"

clean:
	@rm -rf .venv

pdf-web: pdf
	@cp ensayo/Ensayo_Final.pdf web/public/ensayo-gorgias.pdf
	@echo "OK: PDF de descarga sincronizado en web/public/ensayo-gorgias.pdf"

# Regenera el espejo web/public/materiales/ desde las fuentes canónicas.
# NO editar web/public/materiales a mano; editar las fuentes y correr esto.
materiales:
	@bash scripts/sync_materiales.sh

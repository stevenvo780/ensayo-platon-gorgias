#!/usr/bin/env bash
set -euo pipefail

# Archivos
INPUT_FILE="ensayo/Ensayo_Final.md"
TEMP_FILE="ensayo/Ensayo_Final_temp.md"
OUTPUT_FILE="ensayo/Ensayo_Final.pdf"

echo "=== Procesando ensayo ==="

# Fuente: espejo del formato de entrega (métricamente compatible con Times New Roman).
# Prioridad: la propia "Times New Roman" si el sistema la tiene; si no, sustitutos
# métricamente compatibles. Se prefiere "Liberation Serif" porque —además de métricas
# de Times— cubre el griego politónico del ensayo (ἐ, ἦ, ῖ, breathing marks + tonos);
# "TeX Gyre Termes" (clon de Times para XeLaTeX) NO cubre el bloque Greek Extended y
# queda como último recurso. Se comprueba contra fc-list en runtime.
pick_font() {
    local candidate
    for candidate in "Times New Roman" "Liberation Serif" "TeX Gyre Termes"; do
        if fc-list 2>/dev/null | grep -qi "$candidate"; then
            echo "$candidate"; return 0
        fi
    done
    # Último recurso razonable si nada de lo anterior está instalado.
    echo "Liberation Serif"
}
MAINFONT="$(pick_font)"
echo "Fuente (Times-compatible): $MAINFONT"

# Extraer el título del primer H1
# Elimina el '# ' inicial del H1
TITLE=$(grep '^# ' "$INPUT_FILE" | head -n 1 | sed 's/^# //; s/\*//g; s/_//g')
echo "Título extraído: $TITLE"

# Quitar las primeras 4 líneas del markdown original
# Línea 1: H1
# Línea 2: vacía
# Línea 3: ***
# Línea 4: vacía
# Para que empiece directamente en el H2 (## Introducción)
sed '1,4d' "$INPUT_FILE" | sed '/^\*\*\*$/d' > "$TEMP_FILE"

echo "=== Compilando con Pandoc + XeLaTeX ==="
# Espejo del formato de entrega: 12pt, interlineado 1.5, márgenes 2.54 cm.
pandoc "$TEMP_FILE" \
    -o "$OUTPUT_FILE" \
    --pdf-engine=xelatex \
    --metadata title="$TITLE" \
    -V mainfont="$MAINFONT" \
    -V fontsize=12pt \
    -V geometry:margin=2.54cm \
    -V linestretch=1.5

# Limpiar archivo temporal
rm -f "$TEMP_FILE"

echo "=== PDF generado exitosamente ($OUTPUT_FILE) ==="

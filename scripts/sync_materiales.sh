#!/usr/bin/env bash
# =============================================================================
# sync_materiales.sh — genera web/public/materiales/ (espejo PUBLICADO) desde
# las fuentes CANÓNICAS del repo. El sitio sirve estáticos desde ese espejo.
#
#   FUENTE ÚNICA (se edita aquí)        →  ESPEJO PUBLICADO (generado)
#   ensayo/Ensayo_Final.{md,docx}          web/public/materiales/
#   material-estudio/00-07 + autores/      web/public/materiales/[+ autores/]
#   docs/{formal,aparato,mapas,README}     web/public/materiales/*.md
#   notas-clase/ · curso/                  web/public/materiales/*.md
#
# NO editar web/public/materiales a mano: se sobrescribe. Ejecutar `make materiales`.
# =============================================================================
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_ME="$ROOT/material-estudio"
DST="$ROOT/web/public/materiales"

mkdir -p "$DST/autores"
# Limpia el espejo por completo (todo lo de aquí es derivado)
find "$DST" -type f -delete

# --- El ensayo (fuente Markdown + Word; el PDF se sincroniza con `make pdf-web`) ---
cp "$ROOT/ensayo/Ensayo_Final.md"   "$DST/Ensayo_Final.md"
cp "$ROOT/ensayo/Ensayo_Final.docx" "$DST/Ensayo_Final.docx"

# --- Guía de estudio del Gorgias (material-estudio/00-07) ---
for f in 00_README 01_vision_general_del_gorgias 02_gorgias_retórica_y_persuasión \
         03_polo_poder_injusticia_y_castigo 04_calicles_naturaleza_convencion_y_placer \
         05_socrates_politica_justicia_y_cuidado_del_alma 06_conceptos_clave \
         07_analisis_general_tres_actos; do
  cp "$SRC_ME/$f.md" "$DST/$f.md"
done

# --- Resúmenes de autor (canónicos en material-estudio/autores/) ---
cp "$SRC_ME"/autores/*.md "$DST/autores/"

# --- Aparato formal y mapas (docs/) ---
cp "$ROOT/docs/formal/derivaciones.md"   "$DST/derivaciones.md"
cp "$ROOT/docs/aparato/dodds-guthrie.md" "$DST/dodds-guthrie.md"
cp "$ROOT/docs/mapas/argumento.md"       "$DST/argumento.md"
cp "$ROOT/docs/README.md"                "$DST/docs-README.md"

# --- Notas de clase ---
cp "$ROOT/notas-clase/Clase_08_Gorgias_486e-527e.md" "$DST/Clase_08_Gorgias_486e-527e.md"

# --- Curso ---
cp "$ROOT/curso/Plan de trabajo - Fedon y Gorgias.md" "$DST/curso-plan-de-trabajo.md"
cp "$ROOT/curso/temas_borrador.md"                    "$DST/curso-temas-borrador.md"

# --- Método y proceso (documentos de trabajo, expuestos como referencia auditable) ---
cp "$ROOT/docs/METODOLOGIA.md"                 "$DST/metodologia.md"
cp "$ROOT/ensayo/Bitacora_Ensayo.md"           "$DST/bitacora.md"
cp "$ROOT/ensayo/Critica_Ensayo.md"            "$DST/critica.md"
cp "$ROOT/ensayo/Evaluacion_5_y_pendientes.md" "$DST/evaluacion.md"
# (PLAN_V6, propuesta-corte-v6, diseno-spec y plan-implementacion NO se exponen:
#  son docs operativos/internos, hogar canónico en el repo pero no material de estudio.)

# --- Defensa y contexto ---
cp "$ROOT/ensayo/Defensa_Oral_QA.md"                       "$DST/defensa-oral-qa.md"
cp "$ROOT/ensayo/01_Fragmentos_Retorica_Poder_Gorgias.md"  "$DST/fragmentos-retorica-poder.md"

# --- Versiones del ensayo (base + archivadas: trazabilidad) ---
cp "$ROOT/ensayo/Ensayo_Base_Original_Steven.md"            "$DST/base-original-steven.md"
cp "$ROOT/ensayo/archivo/Ensayo_v5_revision_2026-07-06.md"  "$DST/v5-revision.md"
cp "$ROOT/ensayo/archivo/Ensayo_base_pre-v6_2026-07-07.md"  "$DST/base-pre-v6.md"

# --- Repositorio (documentación técnica) ---
cp "$ROOT/README.md"     "$DST/repo-readme.md"
cp "$ROOT/web/DESIGN.md" "$DST/web-design.md"

# --- Iteraciones del ensayo (historial seccionado con ciclos de crítica) ---
mkdir -p "$DST/iteraciones"
cp "$ROOT"/docs/iteraciones/*.md "$DST/iteraciones/"

# --- Manifiesto legible del espejo (generado) ---
cat > "$DST/README.txt" <<'EOF'
MATERIALES · La retórica como τέχνη — Ensayo sobre el Gorgias de Platón
Sitio: https://retorica.stevenvallejo.com/materiales
Autor: Steven Vallejo · Seminario Gorgias y Fedón

*** CARPETA GENERADA — no editar a mano. Se regenera con `make materiales`
    desde las fuentes canónicas (ensayo/, material-estudio/, docs/, notas-clase/,
    curso/). Editar allí, no aquí. ***

EL ENSAYO
  Ensayo_Final.docx  El ensayo final en Word (editable), mismo contenido que el PDF.
  Ensayo_Final.md    Fuente en Markdown del ensayo (base de la que se generan PDF y DOCX).
  (El PDF de entrega se descarga desde el sitio: /ensayo-gorgias.pdf)

MÉTODO Y PROCESO (cómo se hizo y se auditó)
  metodologia.md · bitacora.md · critica.md · evaluacion.md

ESTUDIO DEL GORGIAS (guía de lectura del diálogo)
  00_README.md .. 07_analisis_general_tres_actos.md   Guía por actos + conceptos.

AUTORES Y FUENTES
  autores/*.md   Resumen citado de cada autor citado en el ensayo (9 fichas).

APARATO FORMAL Y MAPAS
  derivaciones.md · dodds-guthrie.md · argumento.md · docs-README.md

DEFENSA Y CONTEXTO
  defensa-oral-qa.md · fragmentos-retorica-poder.md

VERSIONES DEL ENSAYO (trazabilidad)
  base-original-steven.md · v5-revision.md · base-pre-v6.md

NOTAS DE CLASE / CURSO
  Clase_08_Gorgias_486e-527e.md · curso-plan-de-trabajo.md · curso-temas-borrador.md

REPOSITORIO
  repo-readme.md · web-design.md

FUENTE PRIMARIA
  Platón, Gorgias, trad. J. Calonge (Gredos, 1983) — no redistribuida por
  derechos de autor.
EOF

echo "OK: web/public/materiales/ regenerado desde fuentes canónicas ($(find "$DST" -type f | wc -l | tr -d ' ') archivos)"

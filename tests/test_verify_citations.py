import subprocess, sys, os, textwrap, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
def run(essay, src):
    return subprocess.run([sys.executable, str(ROOT/"scripts/verify_citations.py"), essay, src],
                          capture_output=True, text=True)
def test_matching_quote_passes(tmp_path):
    (tmp_path/"src.md").write_text("...la retorica es el simulacro de una parte de la politica...", encoding="utf-8")
    (tmp_path/"essay.md").write_text("es «un simulacro de una parte de la política» (463d).", encoding="utf-8")
    r = run(str(tmp_path/"essay.md"), str(tmp_path/"src.md"))
    assert r.returncode == 0, r.stdout
def test_referenced_quote_not_in_source_fails(tmp_path):
    (tmp_path/"src.md").write_text("texto que no contiene la cita", encoding="utf-8")
    (tmp_path/"essay.md").write_text("Sócrates dice «esto es una invención total del autor» (999z? 465a).", encoding="utf-8")
    r = run(str(tmp_path/"essay.md"), str(tmp_path/"src.md"))
    assert r.returncode != 0, r.stdout
def test_gloss_without_ref_does_not_fail(tmp_path):
    (tmp_path/"src.md").write_text("nada relacionado", encoding="utf-8")
    (tmp_path/"essay.md").write_text("mi propia glosa «la justicia, medicina del alma» sin referencia.", encoding="utf-8")
    r = run(str(tmp_path/"essay.md"), str(tmp_path/"src.md"))
    assert r.returncode == 0, r.stdout

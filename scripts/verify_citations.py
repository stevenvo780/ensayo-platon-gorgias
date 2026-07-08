#!/usr/bin/env python3
"""Valida las citas literales del ensayo contra el texto fuente del Gorgias.
Regla dura: toda cita «...» seguida (dentro de ~30 chars) de una referencia
Stephanus DEBE aparecer en fuente/ (matching sin acentos ni espacios, robusto
a OCR). Glosas sin referencia -> informativas, no fallan. Bekker -> no verificable.
Uso: verify_citations.py [essay.md] [source_glob]"""
import re, sys, glob, unicodedata

def flatten(s):
    s = s.lower().replace("[...]", " ")
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", s)

STEPH = re.compile(r"\b\d{3}[a-e]\b")

def found(qflat, srcflat):
    if len(qflat) < 8:
        return True  # demasiado corto para afirmar/negar
    if qflat in srcflat:
        return True
    win = min(len(qflat), 24)
    for i in range(0, len(qflat) - win + 1):
        if qflat[i:i+win] in srcflat:
            return True
    return False

def check(essay_path, source_glob):
    essay = open(essay_path, encoding="utf-8").read()
    src = ""
    for p in glob.glob(source_glob):
        src += "\n" + open(p, encoding="utf-8").read()
    srcflat = flatten(src)
    rows, fails = [], 0
    for m in re.finditer(r"«(.+?)»", essay, flags=re.S):
        q = m.group(1).strip()
        tail = essay[m.end():m.end()+30]
        referenced = bool(STEPH.search(tail))
        ok = found(flatten(q), srcflat)
        status = "OK" if ok else ("FALLA" if referenced else "info(glosa)")
        if referenced and not ok:
            fails += 1
        rows.append((status, referenced, q[:70]))
    return fails, rows

def main():
    essay = sys.argv[1] if len(sys.argv) > 1 else "ensayo/Ensayo_Final.md"
    srcg = sys.argv[2] if len(sys.argv) > 2 else "fuente/*.md"
    fails, rows = check(essay, srcg)
    print("== Citas «...» del ensayo vs fuente ==")
    for status, ref, q in rows:
        tag = "[ref]" if ref else "[   ]"
        print(f"  {status:11} {tag} «{q}»")
    bekker = sorted(set(re.findall(r"\b1[0-4]\d{2}[ab]\b", open(essay, encoding='utf-8').read())))
    if bekker:
        print("\n== Bekker (Aristóteles) — no verificable (sin fuente en repo) ==")
        print("  " + ", ".join(bekker))
    print(f"\nResultado: {fails} cita(s) referenciada(s) sin coincidencia en fuente.")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()

/**
 * Serverless function — ejecuta código ST (st-lang) en vivo.
 *
 * POST /api/st  { "source": "logic classical.propositional\ncheck valid (P | !P)" }
 *   → 200 { ok, exitCode, stdout, stderr, results, diagnostics }
 *   → 400 { ok:false, error }   (source ausente / inválido / demasiado grande)
 *   → 405 { ok:false, error }   (método distinto de POST)
 *   → 500 { ok:false, error }   (fallo inesperado del motor)
 *
 * El motor `evaluate` de @stevenvo780/st-lang/api es síncrono: no cuelga por
 * la inicialización de z3 (que sólo se carga de forma perezosa para perfiles
 * que lo requieren). Se limita el tamaño del fuente para acotar el coste.
 */
import { evaluate } from '@stevenvo780/st-lang/api';

const MAX_SOURCE_BYTES = 8 * 1024; // 8 KiB: las derivaciones del ensayo son cortas

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return send(res, 405, { ok: false, error: 'Método no permitido. Usa POST.' });
  }

  // Body: Vercel suele parsear JSON en req.body, pero toleramos string/stream.
  let body = req.body;
  if (body === undefined || body === null) {
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      body = Buffer.concat(chunks).toString('utf-8');
    } catch {
      body = '';
    }
  }
  if (typeof body === 'string') {
    try {
      body = body ? JSON.parse(body) : {};
    } catch {
      return send(res, 400, { ok: false, error: 'JSON inválido en el cuerpo.' });
    }
  }

  const source = body && typeof body.source === 'string' ? body.source : null;
  if (!source || !source.trim()) {
    return send(res, 400, {
      ok: false,
      error: 'Falta el campo "source" (string con código ST).',
    });
  }
  if (Buffer.byteLength(source, 'utf-8') > MAX_SOURCE_BYTES) {
    return send(res, 400, {
      ok: false,
      error: `El fuente excede ${MAX_SOURCE_BYTES} bytes.`,
    });
  }

  try {
    const r = evaluate(source);
    return send(res, 200, {
      ok: r.ok,
      exitCode: r.exitCode,
      stdout: r.stdout,
      stderr: r.stderr,
      results: r.results,
      diagnostics: r.diagnostics,
    });
  } catch (err) {
    return send(res, 500, {
      ok: false,
      error: 'Fallo al ejecutar st-lang: ' + (err && err.message ? err.message : String(err)),
    });
  }
}

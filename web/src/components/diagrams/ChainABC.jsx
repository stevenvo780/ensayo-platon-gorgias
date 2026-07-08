/**
 * ChainABC — Criterio 4 · la cadena que fluye.
 *
 * Cada pregunta genera su respuesta y el enlace se dibuja en secuencia:
 *   (a) ¿bien sin conocerlo?  → τέχνη ≠ φρόνησις
 *   (b) ¿entonces = justicia? → objeto formal propio
 *   (c) ¿nunca obra mal?      → arte vs agente  (puente a la objeción)
 * Una línea vertical conecta las respuestas: el hilo del argumento.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { DrawLink, useGlow, makeVariants, ArrowMarker } from './primitives.jsx';
import './diagrams.css';

const ROWS = [
  { key: 'a', q: '(a) ¿bien sin conocerlo?', a: 'τέχνη ≠ φρόνησις', y: 50, dim: false },
  { key: 'b', q: '(b) ¿entonces = justicia?', a: 'objeto formal propio', y: 146, dim: false },
  { key: 'c', q: '(c) ¿nunca obra mal?', a: 'arte vs agente →', y: 242, dim: true },
];
const QP = { x: 12, w: 196, h: 42 };
const AP = { x: 268, w: 200, h: 42 };

export default function ChainABC() {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);
  const arrow = `${glowId}-arw`;

  const container = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.55, delayChildren: 0.2 } },
  };
  const row = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.16 } },
  };

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 480 320"
      role="img"
      aria-label="Cadena de tres preguntas y respuestas del cuarto criterio, conectadas por un hilo vertical"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />
      <ArrowMarker id={arrow} />

      {ROWS.map((r, i) => {
        const cy = r.y + QP.h / 2;
        const prev = i > 0 ? ROWS[i - 1] : null;
        return (
          <motion.g key={r.key} variants={row}>
            {/* Hilo vertical desde la respuesta anterior */}
            {prev && (
              <DrawLink
                d={`M${AP.x + AP.w / 2},${prev.y + QP.h} L${AP.x + AP.w / 2},${r.y}`}
                variants={v.draw}
                strong={!prev.dim}
              />
            )}

            {/* Pregunta */}
            <motion.g variants={v.pop}>
              <rect x={QP.x} y={r.y} width={QP.w} height={QP.h} rx="10" fill="var(--bg2)" stroke="var(--divider)" strokeWidth="1.3" />
              <text className="dg-label dg-label--ink" x={QP.x + QP.w / 2} y={cy + 4} textAnchor="middle" fontSize="11">
                {r.q}
              </text>
            </motion.g>

            {/* Flecha Q → A */}
            <DrawLink d={`M${QP.x + QP.w + 4},${cy} L${AP.x - 6},${cy}`} variants={v.draw} strong={!r.dim} marker={`url(#${arrow})`} />

            {/* Respuesta */}
            <motion.g variants={v.pop} className={r.dim ? 'dg-dim' : undefined}>
              {!r.dim && <rect x={AP.x - 3} y={r.y - 3} width={AP.w + 6} height={QP.h + 6} rx="12" fill={`url(#${glowId}-glow)`} opacity="0.5" />}
              <rect
                x={AP.x}
                y={r.y}
                width={AP.w}
                height={QP.h}
                rx="10"
                fill={r.dim ? 'var(--bg2)' : 'color-mix(in srgb, var(--gold) 15%, var(--bg))'}
                stroke="var(--gold)"
                strokeWidth={r.dim ? 1.3 : 1.8}
                opacity={r.dim ? 0.6 : 1}
              />
              <text className={'dg-gk'} x={AP.x + AP.w / 2} y={cy + 5} textAnchor="middle" fontSize="15" fontStyle="italic">
                {r.a}
              </text>
            </motion.g>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

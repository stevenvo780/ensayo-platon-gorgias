/**
 * ThreeGenres — Criterio 1 · el objeto propio se trifurca.
 *
 * Un núcleo (el discurso) se divide en tres géneros, cada uno con su tiempo:
 *   deliberativo → futuro (→) · judicial → pasado (←) · epidíctico → presente (•)
 * Sócrates tomó SOLO el judicial (anillo azul); recuperamos los dos omitidos.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { GlowNode, DrawLink, useGlow, makeVariants, ArrowMarker } from './primitives.jsx';
import './diagrams.css';

const ROOT = { x: 80, y: 152 };
const NODES = [
  { key: 'del', x: 372, y: 58, name: 'Deliberativo', tense: 'futuro', dir: 'r', taken: false },
  { key: 'jud', x: 372, y: 152, name: 'Judicial', tense: 'pasado', dir: 'l', taken: true },
  { key: 'epi', x: 372, y: 246, name: 'Epidíctico', tense: 'presente', dir: 'c', taken: false },
];

export default function ThreeGenres() {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);
  const arrow = `${glowId}-arw`;

  const container = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.42, delayChildren: 0.25 } },
  };
  const group = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.12 } },
  };

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 520 310"
      role="img"
      aria-label="El discurso se trifurca en deliberativo, judicial y epidíctico; Sócrates tomó solo el judicial"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />
      <ArrowMarker id={arrow} />

      {/* Núcleo */}
      <motion.g variants={group}>
        <GlowNode x={ROOT.x} y={ROOT.y} r={32} glowId={glowId} lit reduce={reduce} variants={v.pop}>
          <text className="dg-gk" x={ROOT.x} y={ROOT.y - 2} textAnchor="middle" fontSize="16" fontStyle="italic">
            γένη
          </text>
          <text className="dg-label dg-label--ink" x={ROOT.x} y={ROOT.y + 16} textAnchor="middle" fontSize="8.5">
            del discurso
          </text>
        </GlowNode>
      </motion.g>

      {NODES.map((n) => {
        const nameY = n.y - 40;
        const ax = n.x + 32; // inicio de la mini flecha temporal
        const wordX = n.x + 62;
        return (
          <motion.g key={n.key} variants={group}>
            <DrawLink d={`M${ROOT.x + 32},${ROOT.y} C210,${ROOT.y} 250,${n.y} ${n.x - 28},${n.y}`} variants={v.draw} strong={n.taken} />

            <GlowNode x={n.x} y={n.y} r={24} glowId={glowId} lit reduce={reduce} strong={n.taken} variants={v.pop}>
              {n.taken && (
                <circle cx={n.x} cy={n.y} r={29} fill="none" stroke="var(--blue)" strokeWidth="1.6" opacity="0.85" />
              )}
              <circle cx={n.x} cy={n.y} r={4} fill="var(--gold)" />
            </GlowNode>

            {/* Nombre del género (arriba) */}
            <motion.text className={'dg-label ' + (n.taken ? 'dg-label--ink' : 'dg-label--lit')} x={n.x} y={nameY} textAnchor="middle" fontSize="11.5" variants={v.fade}>
              {n.name}
            </motion.text>

            {/* Mini flecha temporal + tiempo (a la derecha del nodo) */}
            <motion.g variants={v.fade}>
              {n.dir === 'r' && <path d={`M${ax},${n.y} L${ax + 26},${n.y}`} stroke="var(--gold)" strokeWidth="1.6" fill="none" markerEnd={`url(#${arrow})`} />}
              {n.dir === 'l' && <path d={`M${ax + 26},${n.y} L${ax},${n.y}`} stroke="var(--gold)" strokeWidth="1.6" fill="none" markerEnd={`url(#${arrow})`} />}
              {n.dir === 'c' && <circle cx={ax + 13} cy={n.y} r={4} fill="var(--gold)" />}
              <text className="dg-gk" x={wordX} y={n.y + 5} textAnchor="start" fontSize="13">
                {n.tense}
              </text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* Leyenda: Sócrates tomó 1 de 3 */}
      <motion.text className="dg-note" x={260} y={296} textAnchor="middle" fontSize="12.5" variants={v.fade}>
        Sócrates tomó <tspan fill="var(--blue)" fontStyle="normal">1</tspan> de 3 — recuperamos los <tspan fill="var(--gold)" fontStyle="normal">2</tspan> omitidos
      </motion.text>
    </motion.svg>
  );
}

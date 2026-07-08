/**
 * CausalMechanism — Criterio 3 · conocimiento de causas.
 *
 * La ira (ἡ ὀργή) se ENSAMBLA de sujeto + objeto + circunstancia → definición
 * → αἰτία (por qué · cómo): «decir la causa», encendido. Debajo, en contraste
 * tenue, la ἐμπειρία «solo retiene que persuade» (sin causa).
 */

import { motion, useReducedMotion } from 'framer-motion';
import { GlowNode, DrawLink, useGlow, makeVariants, ArrowMarker } from './primitives.jsx';
import './diagrams.css';

const INPUTS = [
  { key: 'suj', label: 'sujeto', y: 44 },
  { key: 'obj', label: 'objeto', y: 118 },
  { key: 'cir', label: 'circunstancia', y: 192 },
];
const PILL = { x: 16, w: 120, h: 32 };
const DEF = { x: 288, y: 124 };
const RES = { x: 440, y: 124 };

function Pill({ x, y, w, h, label, dim, variants }) {
  return (
    <motion.g variants={variants} className={dim ? 'dg-dim' : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="var(--bg2)" stroke="var(--gold)" strokeWidth="1.4" opacity={dim ? 0.6 : 1} />
      <text className="dg-label dg-label--ink" x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="11">
        {label}
      </text>
    </motion.g>
  );
}

export default function CausalMechanism() {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);
  const arrow = `${glowId}-arw`;

  const container = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 500 330"
      role="img"
      aria-label="La ira se ensambla de sujeto, objeto y circunstancia hacia su definición y su causa; la empeiría solo retiene que persuade"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />
      <ArrowMarker id={arrow} />

      {/* Entradas que se ensamblan */}
      {INPUTS.map((it) => (
        <Pill key={it.key} x={PILL.x} y={it.y} w={PILL.w} h={PILL.h} label={it.label} variants={v.pop} />
      ))}

      {/* Flechas de ensamblaje */}
      {INPUTS.map((it) => (
        <DrawLink
          key={`a-${it.key}`}
          d={`M${PILL.x + PILL.w + 2},${it.y + PILL.h / 2} C210,${it.y + PILL.h / 2} 220,${DEF.y} ${DEF.x - 48},${DEF.y}`}
          variants={v.draw}
          marker={`url(#${arrow})`}
        />
      ))}

      {/* Definición: la ira */}
      <GlowNode x={DEF.x} y={DEF.y} r={46} glowId={glowId} lit strong reduce={reduce} variants={v.pop}>
        <text className="dg-gk" x={DEF.x} y={DEF.y - 2} textAnchor="middle" fontSize="17" fontStyle="italic">
          ἡ ὀργή
        </text>
        <text className="dg-label dg-label--ink" x={DEF.x} y={DEF.y + 16} textAnchor="middle" fontSize="9">
          definición
        </text>
      </GlowNode>

      {/* De la definición a la causa */}
      <DrawLink d={`M${DEF.x + 48},${DEF.y} L${RES.x - 36},${DEF.y}`} variants={v.draw} strong marker={`url(#${arrow})`} />
      <GlowNode x={RES.x} y={RES.y} r={30} glowId={glowId} lit strong pulse reduce={reduce} variants={v.pop}>
        <text className="dg-gk" x={RES.x} y={RES.y + 6} textAnchor="middle" fontSize="15" fontStyle="italic">
          αἰτία
        </text>
      </GlowNode>
      <motion.text className="dg-label dg-label--lit" x={RES.x} y={RES.y + 48} textAnchor="middle" fontSize="10" variants={v.fade}>
        por qué · cómo
      </motion.text>

      {/* Contraste tenue: la empeiría no da la causa */}
      <Pill x={PILL.x} y={266} w={PILL.w} h={PILL.h} label="ἐμπειρία" dim variants={v.pop} />
      <motion.g variants={v.fade} className="dg-dim">
        <path d={`M${PILL.x + PILL.w + 2},282 L232,282`} stroke="var(--muted)" strokeWidth="1.4" fill="none" strokeDasharray="4 5" markerEnd={`url(#${arrow})`} opacity="0.7" />
        <text className="dg-note" x={244} y={286} textAnchor="start" fontSize="12">
          solo retiene «que persuade» — sin causa
        </text>
      </motion.g>
    </motion.svg>
  );
}

/**
 * EthosPathosLogos — Criterio 2 · principios racionales.
 *
 * Tres haces (ἦθος · πάθος · λόγος) que se DIBUJAN y CONVERGEN en la πειθώ
 * (persuasión). λόγος va destacado: el entimema es σῶμα τῆς πίστεως.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { GlowNode, DrawLink, useGlow, makeVariants } from './primitives.jsx';
import './diagrams.css';

const HUB = { x: 240, y: 262 };
const SRC = [
  { key: 'ethos', x: 92, y: 74, gk: 'ἦθος', strong: false },
  { key: 'logos', x: 240, y: 62, gk: 'λόγος', strong: true },
  { key: 'pathos', x: 388, y: 74, gk: 'πάθος', strong: false },
];

export default function EthosPathosLogos() {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);

  const container = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.28, delayChildren: 0.2 } },
  };

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 480 340"
      role="img"
      aria-label="Ethos, pathos y logos convergen en la persuasión; logos destacado como cuerpo de la prueba"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />

      {/* Haces que convergen */}
      {SRC.map((s) => (
        <DrawLink
          key={`l-${s.key}`}
          d={`M${s.x},${s.y + 30} L${HUB.x},${HUB.y - 40}`}
          variants={v.draw}
          strong={s.strong}
        />
      ))}

      {/* Fuentes */}
      {SRC.map((s) => (
        <GlowNode key={s.key} x={s.x} y={s.y} r={s.strong ? 34 : 27} glowId={glowId} lit strong={s.strong} reduce={reduce} variants={v.pop}>
          <text className="dg-term dg-term--gold" x={s.x} y={s.y + (s.strong ? 7 : 6)} textAnchor="middle" fontSize={s.strong ? 21 : 17} fontStyle="italic">
            {s.gk}
          </text>
        </GlowNode>
      ))}

      {/* Destacado de λόγος */}
      <motion.text className="dg-label dg-label--lit" x={240} y={116} textAnchor="middle" fontSize="10" variants={v.fade}>
        entimema
      </motion.text>

      {/* Nodo de convergencia: persuasión */}
      <GlowNode x={HUB.x} y={HUB.y} r={42} glowId={glowId} lit strong pulse reduce={reduce} variants={v.pop}>
        <text className="dg-gk" x={HUB.x} y={HUB.y - 2} textAnchor="middle" fontSize="17" fontStyle="italic">
          πειθώ
        </text>
        <text className="dg-label dg-label--ink" x={HUB.x} y={HUB.y + 16} textAnchor="middle" fontSize="9.5">
          persuasión
        </text>
      </GlowNode>

      <motion.text className="dg-note" x={240} y={326} textAnchor="middle" fontSize="12.5" variants={v.fade}>
        λόγος = σῶμα τῆς πίστεως
      </motion.text>
    </motion.svg>
  );
}

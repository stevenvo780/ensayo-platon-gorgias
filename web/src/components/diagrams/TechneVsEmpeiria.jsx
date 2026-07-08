/**
 * TechneVsEmpeiria — la clasificación en disputa (slide «El problema»).
 *
 * «ἡ ῥητορική» se bifurca en dos ramas: τέχνη (luminosa, con cuatro marcas
 * que se encienden) y ἐμπειρία (tenue, «placer sin causa»). Una flecha
 * discontinua —el veredicto socrático— la empuja hacia ἐμπειρία.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { GlowNode, DrawLink, useGlow, makeVariants, ArrowMarker } from './primitives.jsx';
import './diagrams.css';

export default function TechneVsEmpeiria() {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);
  const arrow = `${glowId}-arw`;

  const container = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.22, delayChildren: 0.2 } },
  };
  const marks = [336, 366, 396, 426];
  const markStagger = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.16, delayChildren: 0.2 } },
  };

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 500 340"
      role="img"
      aria-label="La retórica se bifurca en téchne (luminosa) y empeiría (tenue); el veredicto socrático la empuja a empeiría"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />
      <ArrowMarker id={arrow} />

      {/* Ramas */}
      <DrawLink d="M132,150 C210,120 250,110 366,96" variants={v.draw} strong />
      <DrawLink d="M132,190 C210,220 250,232 368,250" variants={v.draw} />

      {/* Nodo raíz: la retórica */}
      <GlowNode x={92} y={170} r={36} glowId={glowId} lit reduce={reduce} variants={v.pop}>
        <text className="dg-gk" x={92} y={166} textAnchor="middle" fontSize="15" fontStyle="italic">
          ἡ
        </text>
        <text className="dg-gk" x={92} y={186} textAnchor="middle" fontSize="15" fontStyle="italic">
          ῥητορική
        </text>
      </GlowNode>

      {/* Rama τέχνη — luminosa */}
      <GlowNode x={398} y={96} r={32} glowId={glowId} lit strong reduce={reduce} variants={v.pop}>
        <text className="dg-term dg-term--gold" x={398} y={103} textAnchor="middle" fontSize="20" fontStyle="italic">
          τέχνη
        </text>
      </GlowNode>

      {/* Cuatro marcas que se encienden una a una */}
      <motion.g variants={markStagger}>
        {marks.map((x, i) => (
          <motion.circle key={i} cx={x} cy={158} r={5.5} fill="var(--gold)" variants={v.pop} />
        ))}
      </motion.g>
      <motion.text className="dg-label dg-label--lit" x={398} y={182} textAnchor="middle" fontSize="11" variants={v.fade}>
        cuatro marcas
      </motion.text>

      {/* Rama ἐμπειρία — tenue */}
      <g className="dg-dim">
        <GlowNode x={398} y={250} r={30} glowId={glowId} lit={false} reduce={reduce} variants={v.pop}>
          <text className="dg-gk" x={398} y={256} textAnchor="middle" fontSize="17" fontStyle="italic" fill="var(--muted)">
            ἐμπειρία
          </text>
        </GlowNode>
        <motion.text className="dg-note" x={398} y={300} textAnchor="middle" fontSize="12.5" variants={v.fade}>
          placer sin causa
        </motion.text>
      </g>

      {/* Veredicto socrático: flecha discontinua que empuja hacia abajo */}
      <DrawLink d="M150,210 C230,255 300,262 356,256" variants={v.draw} dashed marker={`url(#${arrow})`} />
      <motion.text className="dg-label" x={244} y={286} textAnchor="middle" fontSize="10.5" variants={v.fade}>
        veredicto socrático
      </motion.text>
    </motion.svg>
  );
}

/**
 * ArtVsAgent — Objeción y respuesta (LA CLAVE).
 *
 * «ῥητορική» se PARTE en dos sujetos distintos:
 *   ARTE   → su τέλος orienta al bien (dorado)
 *   AGENTE → su uso puede torcerlo
 * Un separador marca «sin contradicción: sujetos distintos».
 * Luego la INVERSIÓN: conoce αἰτίαι → manipula con método → ∴ es τέχνη
 * (el peligro lo PRUEBA).
 */

import { motion, useReducedMotion } from 'framer-motion';
import { GlowNode, DrawLink, useGlow, makeVariants, ArrowMarker } from './primitives.jsx';
import './diagrams.css';

const ROOT = { x: 250, y: 50 };
const ARTE = { x: 140, y: 142 };
const AGEN = { x: 360, y: 142 };

export default function ArtVsAgent() {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);
  const arrow = `${glowId}-arw`;

  const container = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.22, delayChildren: 0.2 } },
  };
  const step = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.16, delayChildren: 0.15 } },
  };

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 500 360"
      role="img"
      aria-label="La retórica se parte en arte y agente, sujetos distintos; conocer las causas prueba que es téchne"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />
      <ArrowMarker id={arrow} />

      {/* Raíz que se parte */}
      <DrawLink d={`M${ROOT.x - 18},${ROOT.y + 22} C200,90 170,110 ${ARTE.x + 18},${ARTE.y - 30}`} variants={v.draw} strong />
      <DrawLink d={`M${ROOT.x + 18},${ROOT.y + 22} C300,90 330,110 ${AGEN.x - 18},${AGEN.y - 30}`} variants={v.draw} />

      <GlowNode x={ROOT.x} y={ROOT.y} r={30} glowId={glowId} lit reduce={reduce} variants={v.pop}>
        <text className="dg-gk" x={ROOT.x} y={ROOT.y + 5} textAnchor="middle" fontSize="14" fontStyle="italic">
          ῥητορική
        </text>
      </GlowNode>

      {/* ARTE — orientado al bien (dorado, fuerte) */}
      <GlowNode x={ARTE.x} y={ARTE.y} r={44} glowId={glowId} lit strong reduce={reduce} variants={v.pop}>
        <text className="dg-label dg-label--lit" x={ARTE.x} y={ARTE.y - 8} textAnchor="middle" fontSize="12">
          ARTE
        </text>
        <text className="dg-gk" x={ARTE.x} y={ARTE.y + 12} textAnchor="middle" fontSize="12.5">
          τέλος → bien
        </text>
      </GlowNode>

      {/* AGENTE — el uso puede torcerlo */}
      <GlowNode x={AGEN.x} y={AGEN.y} r={44} glowId={glowId} lit={false} reduce={reduce} variants={v.pop}>
        <text className="dg-label dg-label--ink" x={AGEN.x} y={AGEN.y - 8} textAnchor="middle" fontSize="12">
          AGENTE
        </text>
        <text className="dg-gk" x={AGEN.x} y={AGEN.y + 12} textAnchor="middle" fontSize="12.5">
          uso · ἦθος
        </text>
      </GlowNode>

      {/* Separador: sujetos distintos */}
      <motion.g variants={v.fade}>
        <line x1={250} y1={104} x2={250} y2={196} stroke="var(--divider)" strokeWidth="1.4" strokeDasharray="3 5" />
        <text className="dg-label" x={250} y={214} textAnchor="middle" fontSize="9.5">
          sin contradicción
        </text>
        <text className="dg-label" x={250} y={227} textAnchor="middle" fontSize="9.5">
          sujetos distintos
        </text>
      </motion.g>

      {/* Puente del arte a la inversión */}
      <DrawLink d={`M${ARTE.x},${ARTE.y + 44} C${ARTE.x},220 90,240 92,266` } variants={v.draw} strong marker={`url(#${arrow})`} />

      {/* INVERSIÓN: conoce αἰτίαι → manipula con método → ∴ es τέχνη */}
      <motion.g variants={step}>
        <motion.g variants={v.pop}>
          <rect x={20} y={280} width={150} height={40} rx="10" fill="var(--bg2)" stroke="var(--gold)" strokeWidth="1.5" />
          <text className="dg-gk" x={95} y={305} textAnchor="middle" fontSize="13">
            conoce αἰτίαι
          </text>
        </motion.g>

        <DrawLink d="M172,300 L196,300" variants={v.draw} strong marker={`url(#${arrow})`} />

        <motion.g variants={v.pop}>
          <rect x={198} y={280} width={168} height={40} rx="10" fill="var(--bg2)" stroke="var(--gold)" strokeWidth="1.5" />
          <text className="dg-label dg-label--ink" x={282} y={305} textAnchor="middle" fontSize="11.5">
            manipula con método
          </text>
        </motion.g>

        <DrawLink d="M368,300 L406,300" variants={v.draw} strong marker={`url(#${arrow})`} />

        <GlowNode x={452} y={300} r={34} glowId={glowId} lit strong pulse reduce={reduce} variants={v.pop}>
          <text className="dg-term dg-term--gold" x={452} y={296} textAnchor="middle" fontSize="13">
            ∴ es
          </text>
          <text className="dg-term dg-term--gold" x={452} y={312} textAnchor="middle" fontSize="15" fontStyle="italic">
            τέχνη
          </text>
        </GlowNode>
      </motion.g>
    </motion.svg>
  );
}

/**
 * FourCriteriaOrbit — la pieza central (estilo fenomenología urbana).
 *
 * Nodo central «¿τέχνη?» con 4 satélites en anillo que se ENCIENDEN uno a
 * uno (Objeto propio · Principios λόγον ἔχει · Causas αἰτίαι · Bien ἀγαθόν).
 * Al completarse, el centro resuelve a «τέχνη» y late.
 *
 * Props:
 *   allLit  → arranca todo encendido (conclusión): bloom final + subtítulo
 *             «y no ἐμπειρία». Sin la fase de pregunta.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Bloom, GlowNode, OrbitRings, DrawLink, useGlow, makeVariants } from './primitives.jsx';
import './diagrams.css';

const C = { x: 240, y: 210 };
const R = 118;
const SAT = [
  { key: 'obj', x: C.x, y: C.y - R, label: 'Objeto propio', gk: null, lx: C.x, ly: C.y - R - 40, anchor: 'middle' },
  { key: 'cau', x: C.x + R, y: C.y, label: 'Causas', gk: 'αἰτίαι', lx: C.x + R, ly: C.y + 46, anchor: 'middle' },
  { key: 'bien', x: C.x, y: C.y + R, label: 'Bien', gk: 'ἀγαθόν', lx: C.x, ly: C.y + R + 40, anchor: 'middle' },
  { key: 'pri', x: C.x - R, y: C.y, label: 'Principios', gk: 'λόγον ἔχει', lx: C.x - R, ly: C.y + 46, anchor: 'middle' },
];

export default function FourCriteriaOrbit({ allLit = false }) {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();
  const v = makeVariants(reduce);

  // Un satélite (link + nodo + etiqueta) como unidad de stagger.
  const satGroup = {
    hidden: {},
    show: { transition: reduce ? {} : { staggerChildren: 0.14 } },
  };
  // Contenedor: satélites uno a uno; en allLit, más rápido/simultáneo.
  const container = {
    hidden: {},
    show: {
      transition: reduce
        ? {}
        : { staggerChildren: allLit ? 0.14 : 0.5, delayChildren: 0.35 },
    },
  };

  const nSats = SAT.length;
  const swapDelay = reduce ? 0 : 0.35 + (nSats + 1) * (allLit ? 0.14 : 0.5);

  return (
    <motion.svg
      className="dg"
      viewBox="0 0 480 440"
      role="img"
      aria-label="Diagrama orbital: los cuatro criterios de la téchne alrededor de un núcleo"
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
    >
      <Defs />

      {/* Anillos concéntricos que giran lento */}
      <OrbitRings cx={C.x} cy={C.y} radii={[R, R * 0.66, R * 1.28]} reduce={reduce}
        dots={[{ r: R, size: 2.4 }, { r: R * 1.28, size: 1.8 }]} />

      {/* Bloom de fondo (fuerte en la conclusión) */}
      {allLit && <Bloom cx={C.x} cy={C.y} r={R * 1.7} glowId={glowId} reduce={reduce} delay={swapDelay} intensity={1} />}

      {/* Satélites */}
      {SAT.map((s) => {
        const belowCenter = s.ly > s.y; // etiqueta hacia afuera
        return (
          <motion.g key={s.key} variants={satGroup}>
            <DrawLink d={`M${C.x},${C.y} L${s.x},${s.y}`} variants={v.draw} />
            <GlowNode x={s.x} y={s.y} r={22} glowId={glowId} lit reduce={reduce} variants={v.pop}>
              <circle cx={s.x} cy={s.y} r={4} fill="var(--gold)" />
            </GlowNode>
            <motion.g variants={v.fade}>
              <text className="dg-label dg-label--lit" x={s.lx} y={s.ly} textAnchor={s.anchor} fontSize="12.5" dominantBaseline={belowCenter ? 'hanging' : 'auto'}>
                {s.label}
              </text>
              {s.gk && (
                <text className="dg-gk" x={s.lx} y={s.ly + (belowCenter ? 17 : 15)} textAnchor={s.anchor} fontSize="13.5" dominantBaseline={belowCenter ? 'hanging' : 'auto'}>
                  {s.gk}
                </text>
              )}
            </motion.g>
          </motion.g>
        );
      })}

      {/* Núcleo */}
      <motion.g variants={satGroup}>
        {!allLit && <Bloom cx={C.x} cy={C.y} r={R * 0.95} glowId={glowId} reduce={reduce} delay={swapDelay - 0.2} intensity={0.85} />}
        <GlowNode x={C.x} y={C.y} r={44} glowId={glowId} lit strong pulse reduce={reduce} variants={v.pop}>
          {/* Pregunta → resolución */}
          {!allLit && (
            <motion.text
              className="dg-term dg-term--muted"
              x={C.x}
              y={C.y + 8}
              textAnchor="middle"
              fontSize="23"
              fontStyle="italic"
              initial={{ opacity: reduce ? 0 : 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: swapDelay - 0.3 }}
            >
              ¿τέχνη?
            </motion.text>
          )}
          <motion.text
            className="dg-term dg-term--gold"
            x={C.x}
            y={C.y + 8}
            textAnchor="middle"
            fontSize="26"
            fontStyle="italic"
            initial={{ opacity: allLit || reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: allLit ? 0 : swapDelay }}
          >
            τέχνη
          </motion.text>
        </GlowNode>

        {allLit && (
          <motion.text
            className="dg-note"
            x={C.x}
            y={C.y + 74}
            textAnchor="middle"
            fontSize="14"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 1 }}
          >
            y no ἐμπειρία
          </motion.text>
        )}
      </motion.g>
    </motion.svg>
  );
}

/**
 * HaloBloom — halo/bloom dorado que se expande detrás del monograma τ.
 *
 * Se coloca en un contenedor con `position: relative`; llena el espacio y
 * queda detrás del logo (pointer-events: none). Un bloom central + anillos
 * que crecen y se desvanecen dan la «luz dorada sobre negro» del referente.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useGlow } from './primitives.jsx';

export default function HaloBloom({ spread = 300 }) {
  const reduce = useReducedMotion();
  const { glowId, Defs } = useGlow();

  const rings = [0, 1];

  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: spread,
        height: spread,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 240 240" width={spread} height={spread} style={{ display: 'block', overflow: 'visible' }}>
        <Defs />
        {/* Bloom central */}
        {reduce ? (
          <circle cx="120" cy="120" r="96" fill={`url(#${glowId}-bloom)`} opacity="0.9" />
        ) : (
          <motion.circle
            cx="120"
            cy="120"
            r="96"
            fill={`url(#${glowId}-bloom)`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.95, 0.8], scale: [0.5, 1.05, 1] }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }}
            style={{ transformOrigin: '120px 120px', transformBox: 'fill-box' }}
          />
        )}

        {/* Anillos que se expanden */}
        {!reduce &&
          rings.map((i) => (
            <motion.circle
              key={i}
              cx="120"
              cy="120"
              r="60"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.4, 1.7] }}
              transition={{
                duration: 2.6,
                ease: 'easeOut',
                delay: 0.3 + i * 0.9,
                repeat: Infinity,
                repeatDelay: 1.4,
              }}
              style={{ transformOrigin: '120px 120px', transformBox: 'fill-box' }}
            />
          ))}
      </svg>
    </span>
  );
}

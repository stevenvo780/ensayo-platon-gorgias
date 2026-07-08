/**
 * Primitivas de diagramas — SVG + framer-motion, clave luminosa/orbital.
 *
 * Norte estético (sitios del autor): nodos ámbar luminosos sobre fondo con
 * glow, anillos concéntricos, paths que se dibujan para CONSTRUIR el concepto.
 * Todo en `var(--gold)` para que brille en oscuro y funcione en claro.
 *
 * Reglas transversales:
 *  - Animan solo `opacity`/`transform`/`pathLength` (60fps, sin layout).
 *  - `useReducedMotion` → variantes instantáneas (estado final, sin pulsos).
 *  - viewBox fijo → escalan en móvil sin desbordar (width:100%).
 *  - El glow se hace con radialGradient (gold→transparente), no filtros caros.
 */

import { useId } from 'react';
import { motion } from 'framer-motion';

/* ---------- Variantes compartidas (fábrica según reduce) ---------- */

export function makeVariants(reduce) {
  return {
    /** Contenedor: orquesta el stagger de los hijos. */
    container: {
      hidden: {},
      show: {
        transition: reduce
          ? {}
          : { staggerChildren: 0.16, delayChildren: 0.15 },
      },
    },
    /** Nodo que aparece con un “pop” elástico. */
    pop: reduce
      ? { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } }
      : {
          hidden: { opacity: 0, scale: 0.35 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 210, damping: 18 },
          },
        },
    /** Aparición suave (etiquetas, texto). */
    fade: reduce
      ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y: 8 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] },
          },
        },
    /** Path que se dibuja (pathLength). */
    draw: reduce
      ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
      : {
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 0.85, ease: 'easeInOut' },
              opacity: { duration: 0.15 },
            },
          },
        },
  };
}

/* ---------- Defs de glow (radialGradient reutilizable por SVG) ---------- */

/**
 * Inserta los gradientes de glow. Devuelve los ids para referenciarlos.
 * Uso: `const { glowId, Defs } = useGlow();  … <Defs/> … fill={`url(#${glowId})`}`
 */
export function GlowDefs({ id }) {
  return (
    <defs>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.75" />
        <stop offset="45%" stopColor="var(--gold)" stopOpacity="0.28" />
        <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-bloom`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
        <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.12" />
        <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ---------- Bloom: glow radial de fondo que se expande ---------- */

export function Bloom({ cx, cy, r, glowId, reduce, delay = 0, intensity = 1 }) {
  if (reduce) {
    return (
      <circle cx={cx} cy={cy} r={r} fill={`url(#${glowId}-bloom)`} opacity={intensity} />
    );
  }
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={`url(#${glowId}-bloom)`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: intensity, scale: 1 }}
      transition={{ duration: 1.1, ease: 'easeOut', delay }}
      style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'fill-box' }}
    />
  );
}

/* ---------- OrbitRings: anillos concéntricos (opcional: giran) ---------- */

export function OrbitRings({
  cx,
  cy,
  radii = [],
  reduce,
  spin = true,
  dots = [],
}) {
  const rings = radii.map((r, i) => (
    <circle
      key={`r${i}`}
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1"
      strokeDasharray="2 7"
      opacity={0.35 - i * 0.06}
    />
  ));

  // Puntos que orbitan sobre un anillo (decorativos, no llevan texto).
  const orbitingDots = dots.map((d, i) => (
    <circle key={`d${i}`} cx={cx + d.r} cy={cy} r={d.size || 2.2} fill="var(--gold)" opacity="0.8" />
  ));

  if (reduce || !spin) {
    return (
      <g>
        {rings}
        {orbitingDots}
      </g>
    );
  }

  return (
    <g>
      {rings}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
        style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }}
      >
        {orbitingDots}
      </motion.g>
    </g>
  );
}

/* ---------- GlowNode: círculo luminoso con label + pulso ---------- */

/**
 * Nodo luminoso. Coordenadas en el espacio del viewBox.
 *  - `lit`  → encendido (glow dorado + relleno cálido).
 *  - `pulse`→ latido continuo (respeta reduce).
 *  - `r`    → radio del círculo.
 *  - children → contenido SVG centrado (texto), opcional.
 */
export function GlowNode({
  x,
  y,
  r = 26,
  glowId,
  lit = true,
  pulse = false,
  reduce,
  variants,
  strong = false,
  children,
}) {
  const core = (
    <>
      {lit && (
        <circle cx={x} cy={y} r={r * (strong ? 2.6 : 2)} fill={`url(#${glowId}-glow)`} />
      )}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={lit ? 'color-mix(in srgb, var(--gold) 16%, var(--bg))' : 'var(--bg2)'}
        stroke="var(--gold)"
        strokeWidth={strong ? 2 : 1.5}
        opacity={lit ? 1 : 0.55}
      />
      {children}
    </>
  );

  return (
    <motion.g variants={variants}>
      {pulse && !reduce ? (
        <motion.g
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
        >
          {core}
        </motion.g>
      ) : (
        core
      )}
    </motion.g>
  );
}

/* ---------- DrawLink: path/línea que se dibuja ---------- */

export function DrawLink({ d, variants, strong = false, dashed = false, marker }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--gold)"
      strokeWidth={strong ? 2 : 1.4}
      strokeLinecap="round"
      opacity={strong ? 0.9 : 0.6}
      strokeDasharray={dashed ? '4 5' : undefined}
      variants={variants}
      markerEnd={marker}
    />
  );
}

/* ---------- Hook de conveniencia: id único + defs ---------- */

export function useGlow() {
  const raw = useId();
  const glowId = raw.replace(/[:]/g, ''); // ids SVG válidos
  return { glowId, Defs: () => <GlowDefs id={glowId} /> };
}

/* Punta de flecha reutilizable (marker). Devuelve <defs> + id. */
export function ArrowMarker({ id }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0,1 L9,5 L0,9" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

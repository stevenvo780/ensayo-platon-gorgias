/**
 * Logo — monograma clásico: la letra griega τ dentro de un medallón
 * circular de trazo fino, flanqueado por dos ramas de laurel sobrias.
 *
 * - Monoline. El medallón y la τ usan `currentColor` (heredan el color
 *   del texto); el laurel usa el dorado (var(--gold)) como acento.
 * - Escalable y legible de 24px a 96px.
 * - Se ve bien en claro y oscuro (currentColor se adapta al tema).
 *
 * Props:
 *   size       número (px) — lado del cuadrado. Default 40.
 *   wordmark   boolean — si true, añade "Gorgias · τέχνη" a la derecha.
 *   title      string — etiqueta accesible. Default "Gorgias · τέχνη".
 */

const LEAVES = [
  // [cx, cy, rotación en grados] — rama izquierda; la derecha se refleja.
  [40, 75, -38],
  [33.5, 70, -48],
  [28, 63.5, -58],
  [24, 56, -68],
  [21.5, 48, -78],
];

function LaurelBranch({ mirror = false }) {
  const stem = mirror
    ? 'M58,78 Q72,73 78.5,48'
    : 'M42,78 Q28,73 21.5,48';
  return (
    <g fill="var(--gold)" stroke="none">
      <path
        d={stem}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {LEAVES.map(([cx, cy, rot], i) => {
        const x = mirror ? 100 - cx : cx;
        const r = mirror ? -rot : rot;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={cy}
            rx="3.4"
            ry="1.7"
            transform={`rotate(${r} ${x} ${cy})`}
          />
        );
      })}
    </g>
  );
}

export function LogoMark({ size = 40, title = 'Gorgias · τέχνη' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Medallón */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Anillo interior fino, acento dorado */}
      <circle
        cx="50"
        cy="50"
        r="33.5"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.8"
        opacity="0.7"
      />
      {/* Letra τ (tau): barra superior + astil con pie */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34,38 H66" />
        <path d="M50,38 V60 Q50,66 56,65" />
      </g>
      {/* Laurel */}
      <LaurelBranch />
      <LaurelBranch mirror />
    </svg>
  );
}

export default function Logo({ size = 40, wordmark = false, title = 'Gorgias · τέχνη' }) {
  if (!wordmark) return <LogoMark size={size} title={title} />;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        color: 'var(--ink)',
      }}
    >
      <LogoMark size={size} title={title} />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: `${Math.round(size * 0.5)}px`,
          letterSpacing: '0.01em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        Gorgias <span style={{ color: 'var(--gold)' }}>·</span>{' '}
        <span style={{ fontStyle: 'italic' }}>τέχνη</span>
      </span>
    </span>
  );
}

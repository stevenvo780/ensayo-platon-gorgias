/**
 * ThemeToggle — botón circular que alterna claro/oscuro.
 * Recibe el estado del hook useTheme desde el Layout (fuente única de verdad).
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? '☀︎' : '☾'}
    </button>
  );
}

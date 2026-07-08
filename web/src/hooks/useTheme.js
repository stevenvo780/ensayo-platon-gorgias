import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'gorgias-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) {
    /* localStorage bloqueado: caemos a preferencia del sistema */
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Hook de tema claro/oscuro.
 * - Persiste en localStorage bajo 'gorgias-theme'.
 * - Refleja el valor en el atributo data-theme de <html>.
 * Devuelve { theme, toggleTheme, setTheme }.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      /* no-op */
    }
  }, [theme]);

  const setTheme = useCallback((next) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );

  return { theme, toggleTheme, setTheme };
}

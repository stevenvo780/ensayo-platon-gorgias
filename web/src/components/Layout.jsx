import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useTheme } from '../hooks/useTheme.js';
import './layout.css';

const NAV = [
  { to: '/', label: 'Ensayo', end: true },
  { to: '/presentacion', label: 'Presentación', end: false },
  { to: '/materiales', label: 'Materiales', end: false },
  { to: '/pdf', label: 'PDF', end: false },
];

/**
 * Layout compartido: header (Logo + nav + toggle de tema), <Outlet/> y footer.
 * El tema vive aquí (useTheme) para ser una sola fuente de verdad.
 * En móvil la navegación colapsa tras un botón (menú desplegable accesible).
 */
export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  /* Cierra el menú al cambiar de ruta. */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Escape cierra el menú móvil. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="layout">
      <header className={'site-header' + (menuOpen ? ' is-menu-open' : '')}>
        <Link to="/" className="site-brand" aria-label="Inicio — Ensayo">
          <Logo size={38} />
          <span className="site-brand__word">
            Gorgias <span className="site-brand__dot">·</span>{' '}
            <span className="site-brand__gk">τέχνη</span>
          </span>
        </Link>

        <div className="site-header__right">
          <nav
            id="site-nav"
            className={'site-nav' + (menuOpen ? ' is-open' : '')}
            aria-label="Navegación principal"
          >
            {NAV.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  'site-nav__link' + (isActive ? ' is-active' : '')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <a
            className="site-github"
            href="https://github.com/stevenvo780/ensayo-platon-gorgias"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositorio en GitHub"
            title="Ver el repositorio en GitHub"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            type="button"
            className="site-burger"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="site-burger__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* Telón para cerrar el menú tocando fuera (solo móvil) */}
      {menuOpen && (
        <button
          type="button"
          className="site-scrim"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          © Steven Vallejo 2026 · Seminario <em>Gorgias</em> y <em>Fedón</em> ·
          Prof. Juan Camilo Toro
        </p>
      </footer>
    </div>
  );
}

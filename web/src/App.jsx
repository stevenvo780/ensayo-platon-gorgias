import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  Link,
} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import EssayPage from './pages/EssayPage.jsx';
import PresentationPage from './pages/PresentationPage.jsx';
import PdfPage from './pages/PdfPage.jsx';
import MaterialesPage from './pages/MaterialesPage.jsx';
import LecturaPage from './pages/LecturaPage.jsx';
import './pages/lectura.css';

/* /materiales/<algo> (p. ej. una ruta cruda sin .md o un enlace viejo) no es
   una vista: se reencamina al visor de lectura correspondiente. */
function MaterialesRedirect() {
  const rest = useParams()['*'] || '';
  const slug = rest.replace(/\.md$/i, '');
  return <Navigate to={slug ? '/lectura/' + slug : '/materiales'} replace />;
}

/* 404: ninguna vista debe quedar en blanco. */
function NotFound() {
  return (
    <div className="lec-state lec-state--error" role="alert">
      <p className="lec-state__title">Página no encontrada</p>
      <p className="lec-state__body">
        La dirección no corresponde a ninguna vista del sitio.
      </p>
      <Link to="/materiales" className="lec-state__cta">
        ← Ir a Materiales
      </Link>
    </div>
  );
}

/**
 * Rutas:
 *   /              → EssayPage        (dentro del Layout: header, nav, footer)
 *   /presentacion  → PresentationPage (dentro del Layout)
 *   /materiales    → MaterialesPage   (dentro del Layout)
 *   /materiales/*  → redirección al visor de lectura (evita blancos)
 *   /lectura/*     → LecturaPage      (visor de Markdown; splat = slug, admite autores/)
 *   /pdf           → PdfPage          (SIN chrome: formato de entrega para imprimir)
 *   *              → NotFound         (404 con salida a Materiales)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EssayPage />} />
          <Route path="/presentacion" element={<PresentationPage />} />
          <Route path="/materiales" element={<MaterialesPage />} />
          <Route path="/materiales/*" element={<MaterialesRedirect />} />
          <Route path="/lectura/*" element={<LecturaPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/pdf" element={<PdfPage />} />
      </Routes>
    </BrowserRouter>
  );
}

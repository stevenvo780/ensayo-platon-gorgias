import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import EssayPage from './pages/EssayPage.jsx';
import PresentationPage from './pages/PresentationPage.jsx';
import PdfPage from './pages/PdfPage.jsx';
import MaterialesPage from './pages/MaterialesPage.jsx';
import LecturaPage from './pages/LecturaPage.jsx';

/**
 * Rutas:
 *   /             → EssayPage        (dentro del Layout: header, nav, footer)
 *   /presentacion → PresentationPage (dentro del Layout)
 *   /materiales   → MaterialesPage   (dentro del Layout)
 *   /lectura/*    → LecturaPage      (visor de Markdown; splat = slug, admite autores/)
 *   /pdf          → PdfPage          (SIN chrome: formato de entrega para imprimir)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EssayPage />} />
          <Route path="/presentacion" element={<PresentationPage />} />
          <Route path="/materiales" element={<MaterialesPage />} />
          <Route path="/lectura/*" element={<LecturaPage />} />
        </Route>
        <Route path="/pdf" element={<PdfPage />} />
      </Routes>
    </BrowserRouter>
  );
}

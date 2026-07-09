import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import './lectura.css';

/* El contenido es de confianza (archivos .md del propio repo, sin input de
   usuario), pero sanitizamos igual por defensa en profundidad: rehype-raw
   convierte el HTML embebido y rehype-sanitize elimina <script>, manejadores
   de eventos, etc. Solo ampliamos el esquema por defecto para permitir el
   atributo `align` (los enlaces centrados del README) — nada ejecutable. */
const SANITIZE_SCHEMA = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    p: [...(defaultSchema.attributes?.p || []), 'align'],
    div: [...(defaultSchema.attributes?.div || []), 'align'],
    h1: [...(defaultSchema.attributes?.h1 || []), 'align'],
    h2: [...(defaultSchema.attributes?.h2 || []), 'align'],
    h3: [...(defaultSchema.attributes?.h3 || []), 'align'],
    img: [...(defaultSchema.attributes?.img || []), 'align'],
  },
};

/* ---------------------------------------------------------------
   LecturaPage — visor editorial de Markdown.
   Ruta: /lectura/*  (el splat es el slug; admite subrutas como
   "autores/aristoteles"). Hace fetch de `/materiales/${slug}.md`
   y lo renderiza con react-markdown + remark-gfm, estilizado con
   el design system (serif editorial, griego politónico correcto).
   --------------------------------------------------------------- */

const BASE = '/materiales/';

/* Estados de carga del documento. */
const STATUS = { LOADING: 'loading', READY: 'ready', ERROR: 'error' };

/* Deriva un título legible del slug como respaldo (si el .md no
   arrancara con un H1, cosa que no ocurre en el corpus actual). */
function prettySlug(slug) {
  const last = (slug || '').split('/').pop() || '';
  return last
    .replace(/^\d+[_-]/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\.md$/i, '')
    .trim();
}

export default function LecturaPage() {
  const params = useParams();
  const slug = params['*'] || '';

  const [status, setStatus] = useState(STATUS.LOADING);
  const [markdown, setMarkdown] = useState('');

  const fileUrl = BASE + slug + '.md';

  useEffect(() => {
    let cancelled = false;
    setStatus(STATUS.LOADING);
    setMarkdown('');

    if (!slug) {
      setStatus(STATUS.ERROR);
      return;
    }

    fetch(fileUrl)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const ct = res.headers.get('content-type') || '';
        // En SPA, una ruta inexistente devuelve el index.html (200).
        // Filtramos ese caso para no renderizar HTML como markdown.
        if (ct.includes('text/html')) throw new Error('not-markdown');
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        if (/^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) {
          throw new Error('not-markdown');
        }
        setMarkdown(text);
        setStatus(STATUS.READY);
      })
      .catch(() => {
        if (!cancelled) setStatus(STATUS.ERROR);
      });

    return () => {
      cancelled = true;
    };
  }, [fileUrl, slug]);

  useEffect(() => {
    if (status === STATUS.READY) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [status, slug]);

  return (
    <div className="lec">
      <header className="lec-bar">
        <div className="lec-bar__inner">
          <Link to="/materiales" className="lec-bar__back">
            <span aria-hidden="true">←</span> Volver a Materiales
          </Link>
          {status === STATUS.READY && (
            <a
              className="lec-bar__dl"
              href={fileUrl}
              download={prettySlug(slug) + '.md'}
            >
              Descargar .md <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
      </header>

      {status === STATUS.LOADING && (
        <div className="lec-state" role="status" aria-live="polite">
          <span className="lec-spinner" aria-hidden="true" />
          <p>Cargando lectura…</p>
        </div>
      )}

      {status === STATUS.ERROR && (
        <div className="lec-state lec-state--error" role="alert">
          <p className="lec-state__title">No se pudo abrir este documento</p>
          <p className="lec-state__body">
            El archivo <code>{slug || '—'}.md</code> no existe o no está
            disponible. Puede que el enlace esté mal escrito.
          </p>
          <Link to="/materiales" className="lec-state__cta">
            ← Volver a Materiales
          </Link>
        </div>
      )}

      {status === STATUS.READY && (
        <motion.article
          className="lec-doc"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, SANITIZE_SCHEMA]]}
            components={{
              // Las tablas GFM se envuelven para permitir scroll horizontal
              // propio sin romper el ancho de la página.
              table: ({ node, ...props }) => (
                <div className="lec-tablewrap">
                  <table {...props} />
                </div>
              ),
              // Enlaces externos se abren en pestaña nueva de forma segura.
              a: ({ node, href, ...props }) => {
                const external = /^https?:\/\//i.test(href || '');
                return (
                  <a
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    {...props}
                  />
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </motion.article>
      )}
    </div>
  );
}

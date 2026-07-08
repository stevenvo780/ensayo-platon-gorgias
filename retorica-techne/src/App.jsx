import { useState, useEffect, useRef, useMemo } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import mermaid from 'mermaid'
import 'katex/dist/katex.min.css'
import {
  FileText, Presentation, Sun, Moon, Waypoints, ScrollText,
  ChevronLeft, ChevronRight, Maximize2,
} from 'lucide-react'
import ensayoMd from './content/ensayo.md?raw'
import mapasMd from './content/mapas.md?raw'
import derivMd from './content/derivaciones.md?raw'

marked.use(markedKatex())

/* ---------- theme ---------- */
function useTheme() {
  const [dark, setDark] = useState(() => {
    const s = localStorage.getItem('tema')
    if (s) return s === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('tema', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark]
}

/* ---------- helpers ---------- */
function mermaidBlocks(md) {
  const re = /```mermaid\s*\n([\s\S]*?)```/g
  const out = []
  let m
  while ((m = re.exec(md))) out.push(m[1].trim())
  return out
}

function Mermaid({ chart, id, dark }) {
  const ref = useRef(null)
  useEffect(() => {
    let alive = true
    mermaid.initialize({
      startOnLoad: false, securityLevel: 'loose',
      theme: dark ? 'dark' : 'neutral', fontFamily: 'EB Garamond, Georgia, serif',
    })
    mermaid
      .render('mmd-' + id + (dark ? 'd' : 'l'), chart)
      .then(({ svg }) => { if (alive && ref.current) ref.current.innerHTML = svg })
      .catch(() => { if (ref.current) ref.current.innerHTML = '<pre>' + chart + '</pre>' })
    return () => { alive = false }
  }, [chart, id, dark])
  return <div className="mermaid-box" ref={ref} />
}

/* ---------- essay ---------- */
function Essay({ dark }) {
  const html = useMemo(() => marked.parse(ensayoMd), [])
  const maps = useMemo(() => mermaidBlocks(mapasMd), [])
  const cards = useMemo(() => {
    return derivMd.split(/\n### /).slice(1).map((chunk) => {
      const nl = chunk.indexOf('\n')
      return { title: chunk.slice(0, nl).trim(), html: marked.parse(chunk.slice(nl + 1)) }
    })
  }, [])
  const artRef = useRef(null)
  const [toc, setToc] = useState([])
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!artRef.current) return
    const hs = [...artRef.current.querySelectorAll('h2, h3')]
    const items = hs.map((h, i) => {
      const id = 'h-' + i
      h.id = id
      return { id, text: h.textContent, lvl: h.tagName }
    })
    const extra = [
      { id: 'mapas', text: 'Mapas del argumento', lvl: 'H2' },
    ]
    setToc([...items, ...extra])
    const targets = [...hs, ...extra.map((e) => document.getElementById(e.id)).filter(Boolean)]
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-15% 0px -75% 0px' }
    )
    targets.forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [html])

  return (
    <>
      <div className="reader">
        <aside className="toc">
          <div className="toc-title">Índice</div>
          {toc.map((t) => (
            <a
              key={t.id}
              href={'#' + t.id}
              className={(t.lvl === 'H3' ? 'lvl3 ' : '') + (active === t.id ? 'active' : '')}
            >
              {t.text}
            </a>
          ))}
        </aside>

        <div>
          <article className="prose" ref={artRef} dangerouslySetInnerHTML={{ __html: html }} />

          <section id="mapas" className="extra">
            <h2><Waypoints size={26} /> Mapas del argumento</h2>
            {maps.map((c, i) => (
              <Mermaid key={i} id={'map' + i} chart={c} dark={dark} />
            ))}
          </section>

          <div className="foot">
            Steven Vallejo · Seminario <span className="gk">Gorgias</span> y <span className="gk">Fedón</span> ·
            Prof. Juan Camilo Toro · 13 jul 2026
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- slides ---------- */
const SLIDES = [
  { k: 'Ensayo final · Seminario Gorgias y Fedón', t: 'La retórica como τέχνη, no ἐμπειρία', b: 'Verificación aristotélica de los cuatro criterios socráticos del Gorgias (462b–466a). — Steven Vallejo' },
  { k: 'El problema', t: 'Palabra = poder político', b: 'En la Atenas del s. V, ῥήτωρ es orador y político a la vez. Atacar la retórica es atacar la política. Sócrates la llama κολακεία —adulación— y ἐμπειρία, nunca τέχνη.' },
  { k: 'Tres interlocutores', t: 'Gorgias · Polo · Calicles', b: 'Gorgias: la retórica como «el mayor bien». Polo: el poder desnudo. Calicles: φύσις contra νόμος y el placer sin freno — el riesgo democrático en estado puro.' },
  { k: 'El marco', t: 'τέχνη frente a ἐμπειρία', b: 'Una τέχνη tiene: (1) objeto propio, (2) principios racionales (λόγον ἔχει), (3) conocimiento de causas (αἰτίαι), (4) orientación al bien (ἀγαθόν). La tesis: la retórica los cumple.' },
  { k: '§2', t: 'La clasificación es arbitraria', b: 'Sócrates reduce el objeto a «lo justo y lo injusto» —un solo género, el judicial— y le niega principios por una falacia de composición: que algún orador persuada sin saber no dice nada del arte.' },
  { k: 'Criterio 1', t: 'Objeto propio: tres géneros', b: 'De la posición del oyente ante el tiempo: deliberativo (futuro), judicial (pasado), epidíctico. El objeto excede a la sola justicia. ✓' },
  { k: 'Criterio 2', t: 'Principios racionales', b: 'ἦθος · πάθος · λόγος · τόποι · entimema. Su racionalidad la confirman el auditorio universal de Perelman y el respaldo (backing) de Toulmin. ✓' },
  { k: 'Criterio 3', t: 'Conocimiento de causas — αἰτίαι', b: 'El libro II de la Retórica es un tratado causal de las pasiones. Cialdini mide, predice y replica esas causas: «decir la causa» en su forma más fuerte. ✓' },
  { k: 'Criterio 4 · la objeción más fuerte', t: '¿Orientación al bien?', b: '(a) ¿orientarse al bien sin conocerlo? (b) ¿en qué se diferencia de la justicia? (c) ¿entonces nunca obra mal —y deja de ser un riesgo para la democracia?' },
  { k: 'La salida', t: 'El arte y el agente', b: 'La orientación es del arte (su τέλος); el uso, del agente (su ἦθος). τέχνη ≠ φρόνησις: conocer los medios no garantiza el buen uso —ninguna τέχνη lo hace.' },
  { k: 'La inversión', t: 'El peligro prueba que es τέχνη', b: 'Solo un arte que conoce de veras las αἰτίαι del asentimiento puede manipular con método. La mera ἐμπειρία, ciega, no. El riesgo es consecuencia de que es τέχνη.' },
  { k: 'Conclusión', t: 'Retórica: τέχνη, no ἐμπειρία', b: 'Verificada frente a los cuatro criterios que se siguen de la propia distinción socrática, los satisface. No se abandona el marco de Sócrates: se aplica con su rigor.' },
  { k: 'Fin', t: 'εὐχαριστῶ', b: 'Steven Vallejo · Seminario Gorgias y Fedón · Prof. Juan Camilo Toro · 13 de julio de 2026' },
]

function Slides() {
  const [i, setI] = useState(0)
  const n = SLIDES.length
  useEffect(() => {
    const on = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') setI((v) => Math.min(v + 1, n - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') setI((v) => Math.max(v - 1, 0))
      else if (e.key === 'Home') setI(0)
      else if (e.key === 'End') setI(n - 1)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [n])
  const fs = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }
  const s = SLIDES[i]
  return (
    <div className="deck">
      <div className="progress" style={{ width: ((i + 1) / n) * 100 + '%' }} />
      <div className="slide" key={i}>
        <div className="kicker">{s.k}</div>
        <h2>{s.t}</h2>
        <p>{s.b}</p>
        <div className="deck-meander" />
      </div>
      <div className="deck-ctrl">
        <button onClick={() => setI((v) => Math.max(v - 1, 0))} disabled={i === 0} aria-label="Anterior"><ChevronLeft size={20} /></button>
        <span className="count">{i + 1} / {n}</span>
        <button onClick={() => setI((v) => Math.min(v + 1, n - 1))} disabled={i === n - 1} aria-label="Siguiente"><ChevronRight size={20} /></button>
        <button onClick={fs} aria-label="Pantalla completa"><Maximize2 size={18} /></button>
      </div>
    </div>
  )
}

/* ---------- app ---------- */
export default function App() {
  const [dark, setDark] = useTheme()
  const loc = useLocation()
  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">Retórica como <span className="gk">τέχνη</span></Link>
        <nav>
          <Link to="/" className={loc.pathname === '/' ? 'on' : ''}><FileText size={16} /><span>Ensayo</span></Link>
          <Link to="/presentacion" className={loc.pathname === '/presentacion' ? 'on' : ''}><Presentation size={16} /><span>Presentación</span></Link>
          <button onClick={() => setDark((v) => !v)} aria-label="Cambiar tema">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Essay dark={dark} />} />
        <Route path="/presentacion" element={<Slides />} />
      </Routes>
    </>
  )
}

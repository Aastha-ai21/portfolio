import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import AiSkills from './components/AiSkills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Beyond from './components/Beyond'
import Contact from './components/Contact'
import ProjectDialog from './components/ProjectDialog'
import { ProjectCtx } from './components/primitives'
import { hasWebGL } from './lib/cosmos'
import { initSmoothScroll } from './lib/scroll'

// The WebGL universe is a separate chunk so the page text paints immediately.
const Universe = lazy(() => import('./scene/Universe'))

/** If WebGL fails at runtime we fall back to the CSS gradient background — the content still works. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function UniverseLayer() {
  const [webgl] = useState(hasWebGL)
  if (!webgl) return null
  return (
    <SceneBoundary>
      <Suspense fallback={null}>
        <Universe />
      </Suspense>
    </SceneBoundary>
  )
}

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = useCallback((id: string) => setOpenId(id), [])

  useEffect(() => initSmoothScroll(), [])

  // restore deep links like /#projects after the page has laid out
  useEffect(() => {
    const id = location.hash.slice(1)
    if (!id) return
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <ProjectCtx.Provider value={open}>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <UniverseLayer />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <AiSkills />
        <Projects />
        <Journey />
        <Beyond />
      </main>
      <Contact />
      <ProjectDialog id={openId} onClose={() => setOpenId(null)} onNav={setOpenId} />
    </ProjectCtx.Provider>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useActiveSection } from '../lib/hooks'
import { lockScroll, scrollToId } from '../lib/scroll'
import { profile } from '../data/profile'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]
// 'ai-skills' is its own section but belongs to the Skills nav item
const ids = ['hero', ...links.map((l) => l.id), 'ai-skills']

export default function Nav() {
  const section = useActiveSection(ids)
  const active = section === 'ai-skills' ? 'skills' : section
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current?.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0))
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      lockScroll(false)
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // let the menu release the scroll lock first
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav container">
        <a href="#hero" className="nav__brand" onClick={go('hero')} aria-label={`${profile.name} — back to top`}>
          <span className="nav__mark" aria-hidden="true" />
          <span>{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              aria-current={active === l.id ? 'true' : undefined}
              className={active === l.id ? 'is-active' : ''}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="nav__bars" />
        </button>
      </div>
      <div className="nav__progress" ref={bar} aria-hidden="true" />
    </header>

      <div id="mobile-menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {links.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} style={{ '--i': i } as React.CSSProperties} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

import type { CSSProperties } from 'react'
import { Arrow } from './primitives'
import { scrollToId } from '../lib/scroll'
import { profile } from '../data/profile'

/** Splits a word into individually animated letters (3D flip-in). */
function Letters({ text, offset = 0, tint = false }: { text: string; offset?: number; tint?: boolean }) {
  return (
    <span className="word" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span
          className="char"
          key={i}
          style={
            {
              '--i': i + offset,
              // per-letter colour: background-clip:text breaks on transformed children
              ...(tint && { color: `color-mix(in srgb, #e1d8ff, #f0a6d8 ${Math.round((i / (text.length - 1)) * 100)}%)` }),
            } as CSSProperties
          }
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [first, last] = profile.name.split(' ')
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">AI Engineer · AI Automation</p>

        <h1 id="hero-title" className="hero__title" aria-label={profile.name}>
          <Letters text={first} />
          <Letters text={last} offset={first.length} tint />
        </h1>

        <p className="hero__lead">
          I build AI-powered tools and automations that solve real problems — and I learn best by shipping them.
        </p>

        <div className="hero__cta">
          <a
            href="#projects"
            className="btn btn--primary"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('projects')
            }}
          >
            Explore my universe <Arrow />
          </a>
          <a
            href="#about"
            className="btn"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('about')
            }}
          >
            Who’s here?
          </a>
        </div>

        <ul className="hero__meta" aria-label="Currently">
          <li>
            <span className="live-dot" aria-hidden="true" />
            AI Engineer at {profile.companyInline}
          </li>
          <li>{profile.location}</li>
        </ul>
      </div>

      <div className="hero__hud" aria-hidden="true">
        <span>19.16°N · 72.99°E</span>
        <span>Airoli, Navi Mumbai</span>
      </div>

      <button type="button" className="scrollcue" onClick={() => scrollToId('about')}>
        <span>Scroll to travel</span>
        <i aria-hidden="true" />
      </button>
    </section>
  )
}

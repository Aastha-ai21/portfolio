import { useState, type CSSProperties } from 'react'
import { Reveal, useOpenProject } from './primitives'
import { useMediaQuery } from '../lib/hooks'
import { aiRings, aiSkillCount, type AiMoon } from '../data/aiSkills'

type Pick = { r: number; m: number }
const RING = [34, 60, 86] // ring diameters, % of the orbit box

function MoonCard({ moon, ring, hue }: { moon: AiMoon; ring: string; hue: number }) {
  const open = useOpenProject()
  return (
    <div className="moon-card" style={{ '--h': hue } as CSSProperties}>
      <span className="eyebrow">{ring}</span>
      <h4>{moon.name}</h4>
      <p>{moon.line}</p>
      {moon.projects.length > 0 && (
        <>
          <p className="moon-card__used">Used in</p>
          <ul className="chips">
            {moon.projects.map((p) => (
              <li key={p.id}>
                <button type="button" className="chip chip--btn" onClick={() => open(p.id)}>
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default function AiSkills() {
  const compact = useMediaQuery('(max-width: 767px)')
  const [picked, setPicked] = useState<Pick | null>(null)
  const [hover, setHover] = useState<Pick | null>(null)
  const [ring, setRing] = useState<number | null>(null)
  const active = hover ?? picked
  const same = (a: Pick | null, r: number, m: number) => !!a && a.r === r && a.m === m
  const toggle = (r: number, m: number) => setPicked(same(picked, r, m) ? null : { r, m })
  const pickRing = (r: number) => setRing(ring === r ? null : r)

  return (
    <section id="ai-skills" className="section aisk" aria-labelledby="aisk-h">
      <div className="container">
        <Reveal className="aisk__head">
          <h2 id="aisk-h">
            AI <em>Skills</em>
          </h2>
          <p>The tools I reach for when I want a machine to do the boring part — and do it smartly.</p>
        </Reveal>

        {compact ? (
          <div className="aisk__stack">
            <p className="aisk__hint">
              {aiSkillCount} AI skills across {aiRings.length} orbits — tap a chip to explore.
            </p>
            {aiRings.map((rg, r) => (
              <section key={rg.id} className="aisk__group" style={{ '--h': rg.hue } as CSSProperties} aria-label={rg.name}>
                <h3>
                  <i aria-hidden="true" />
                  {rg.name}
                </h3>
                <ul className="aisk__chips">
                  {rg.moons.map((m, i) => (
                    <li key={m.name}>
                      <button
                        type="button"
                        className={`aichip ${same(picked, r, i) ? 'is-on' : ''}`}
                        aria-pressed={same(picked, r, i)}
                        onClick={() => toggle(r, i)}
                      >
                        {m.label}
                      </button>
                    </li>
                  ))}
                </ul>
                {picked?.r === r && <MoonCard moon={rg.moons[picked.m]} ring={rg.name} hue={rg.hue} />}
              </section>
            ))}
          </div>
        ) : (
          <Reveal className="aisk__grid">
            <div
              className="aorbit"
              data-ring={ring ?? undefined}
              data-paused={picked ? '' : undefined}
              onPointerLeave={() => setHover(null)}
            >
              <div className="acore" aria-hidden="true">
                <span>AI</span>
              </div>
              {aiRings.map((rg, r) => (
                <div
                  key={rg.id}
                  className={`aring ${ring === r ? 'is-ring' : ''}`}
                  style={
                    {
                      width: `${RING[r]}%`,
                      '--h': rg.hue,
                      '--dur': `${130 + r * 60}s`,
                      '--dir': r % 2 ? 'reverse' : 'normal',
                      '--rdir': r % 2 ? 'normal' : 'reverse',
                    } as CSSProperties
                  }
                >
                  {rg.moons.map((m, i) => {
                    const a = (i / rg.moons.length) * Math.PI * 2 + r * 0.8 - Math.PI / 2
                    return (
                      <button
                        key={m.name}
                        type="button"
                        className={`moon ${same(active, r, i) ? 'is-on' : ''}`}
                        style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` } as CSSProperties}
                        aria-label={`${m.name} — ${rg.name}`}
                        aria-pressed={same(picked, r, i)}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover({ r, m: i })}
                        onFocus={() => setHover({ r, m: i })}
                        onBlur={() => setHover(null)}
                        onClick={() => toggle(r, i)}
                      >
                        <i className="moon__dot" aria-hidden="true" />
                        <span className="moon__label" aria-hidden="true">
                          {m.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="aisk__side">
              <ul className="aisk__legend" aria-label="Skill orbits">
                {aiRings.map((rg, r) => (
                  <li key={rg.id} style={{ '--h': rg.hue } as CSSProperties}>
                    <button
                      type="button"
                      className={`aleg ${ring === r ? 'is-on' : ''}`}
                      aria-pressed={ring === r}
                      onClick={() => pickRing(r)}
                    >
                      <i aria-hidden="true" />
                      <span>
                        <strong>{rg.name}</strong>
                        <small>{rg.blurb}</small>
                      </span>
                      <b>0{r + 1}</b>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="aisk__card" aria-live="polite">
                {active ? (
                  <MoonCard moon={aiRings[active.r].moons[active.m]} ring={aiRings[active.r].name} hue={aiRings[active.r].hue} />
                ) : (
                  <p className="aisk__hint">
                    {aiSkillCount} AI skills across {aiRings.length} orbits — tap a moon to explore.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

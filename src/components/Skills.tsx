import { useState, type CSSProperties } from 'react'
import { Reveal, SectionHead, useOpenProject } from './primitives'
import { skillCategories, skillDescription, totalSkills } from '../data/skills'
import { projectById } from '../data/projects'

const ROW = 54

/** x position (in %) of the i-th star — a gentle wave so each category draws a different constellation shape. */
const starX = (i: number, seed: number) => 8 + 32 * (0.5 + 0.5 * Math.sin(i * 1.3 + seed * 1.9))

/** A roadmap runs down the sky in a gentle S-curve, one step after another. */
const roadX = (i: number) => 12 + 22 * (0.5 + 0.5 * Math.sin(i * 0.95))

export default function Skills() {
  const [ci, setCi] = useState(0)
  const [si, setSi] = useState<number | null>(null)
  const openProject = useOpenProject()

  const cat = skillCategories[ci]
  const n = cat.skills.length
  const pts = cat.skills.map((_, i) => [cat.roadmap ? roadX(i) : starX(i, ci), i + 0.5] as const)
  const selected = si !== null ? cat.skills[si] : null

  const pick = (i: number) => {
    setCi(i)
    setSi(null)
  }

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-h">
      <div className="container">
        <SectionHead
          index="02"
          eyebrow="Skills"
          lead={`${totalSkills} tools and techniques across five constellations.`}
        >
          <span id="skills-h">
            Five constellations <em>of craft.</em>
          </span>
        </SectionHead>

        <Reveal className="skills__board glass">
          <div className="skills__cats" role="group" aria-label="Skill categories">
            {skillCategories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`cat ${i === ci ? 'is-on' : ''}`}
                aria-pressed={i === ci}
                onClick={() => pick(i)}
              >
                <span className="cat__orb" style={{ '--h': 250 + i * 22 } as CSSProperties} aria-hidden="true" />
                <span className="cat__name">{c.name}</span>
                <span className="cat__count">{c.skills.length}</span>
              </button>
            ))}
          </div>

          <div className="skills__sky" key={cat.id}>
            <div className="constellation" style={{ height: n * ROW }}>
              <svg viewBox={`0 0 100 ${n}`} preserveAspectRatio="none" aria-hidden="true">
                <polyline className="line line--main" points={pts.map(([x, y]) => `${x},${y}`).join(' ')} />
                {!cat.roadmap &&
                  pts.slice(2).map(([x, y], k) => (
                    <line key={k} className="line line--chord" x1={pts[k][0]} y1={pts[k][1]} x2={x} y2={y} />
                  ))}
              </svg>
              {cat.skills.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  className={`star ${si === i ? 'is-on' : ''} ${s.projects?.length ? 'has-proj' : ''} ${cat.roadmap ? 'star--step' : ''}`}
                  style={{ left: `${pts[i][0]}%`, top: i * ROW + ROW / 2, '--i': i } as CSSProperties}
                  aria-pressed={si === i}
                  onClick={() => setSi(si === i ? null : i)}
                >
                  <i aria-hidden="true">{cat.roadmap ? i + 1 : null}</i>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

            <aside className="skills__detail" aria-live="polite">
              <p className="eyebrow">{cat.name}</p>
              {selected ? (
                <>
                  <h3>{selected.name}</h3>
                  <p className="skills__desc">{skillDescription(selected.name)}</p>
                  {selected.projects?.length ? (
                    <>
                      <p className="skills__hint">Appears in</p>
                      <ul className="chips">
                        {selected.projects.map((id) => (
                          <li key={id}>
                            <button type="button" className="chip chip--btn" onClick={() => openProject(id)}>
                              {projectById(id).name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <h3>{cat.heading ?? cat.blurb}</h3>
                  {cat.heading && <p className="skills__sub">{cat.blurb}</p>}
                </>
              )}
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { Arrow, Reveal, SectionHead, Tilt, useOpenProject } from './primitives'
import {
  CnnDiagram,
  CropDiagram,
  GestureDiagram,
  KanbanDiagram,
  LedgerDiagram,
  PipelineDiagram,
  PortalDiagram,
  RecruitDiagram,
} from './Diagrams'
import { featuredIds, projectById, projects, type Project } from '../data/projects'
import { spotlights, type SpotArt, type Spotlight as SpotData } from '../data/featured'

const diagrams: Record<string, ReactNode> = {
  'recruitment-analyzer': <PipelineDiagram />,
  'payroll-compliance-calculator': <LedgerDiagram />,
  'client-request-portal': <PortalDiagram />,
  'task-master': <KanbanDiagram />,
}

/* ------------------------------------------------------------------ */
/* Flagship cards                                                      */
/* ------------------------------------------------------------------ */

/** Business-focused wording where a project also appears in the Featured AI block, so the two don't repeat. */
const businessSummary: Record<string, string> = {
  'recruitment-analyzer':
    'A multi-tenant SaaS for HR teams: job openings, AI-assisted resume screening and evidence-based candidate scores, with humans making the final call.',
}

function FlagshipCard({ p, i }: { p: Project; i: number }) {
  const open = useOpenProject()
  return (
    <Reveal delay={i} className={`flag flag--${i}`}>
      <Tilt className="glass flag__card" max={6}>
        <div className="flag__glow" aria-hidden="true" />
        <div className="flag__top">
          <span className="flag__no">0{i + 1}</span>
        </div>
        <div className="flag__art">{diagrams[p.id]}</div>
        <h3>
          <button type="button" className="stretch" onClick={() => open(p.id)}>
            {p.name}
          </button>
        </h3>
        <p>{businessSummary[p.id] ?? p.summary}</p>
        <ul className="chips">
          {p.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <span className="flag__more" aria-hidden="true">
          Details <Arrow />
        </span>
      </Tilt>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Featured AI Projects                                                */
/* ------------------------------------------------------------------ */

const spotArt: Record<SpotArt, ReactNode> = {
  cnn: <CnnDiagram />,
  gesture: <GestureDiagram />,
  crop: <CropDiagram />,
  recruit: <RecruitDiagram />,
}

function Spotlight({ s }: { s: SpotData }) {
  const open = useOpenProject()
  const { project: p } = s
  return (
    <Reveal className="spot glass">
      <div className="spot__copy">
        <span className="pill">{s.tag}</span>
        <h3>{p.name}</h3>
        <p>{s.description}</p>
        <ol className="spot__steps" aria-label="Pipeline">
          {s.steps.map((step, i) => (
            <li key={step} style={{ '--i': i } as CSSProperties}>
              {step}
            </li>
          ))}
        </ol>
        <ul className="chips">
          {p.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <button type="button" className="btn" onClick={() => open(p.id)}>
          Project details <Arrow />
        </button>
      </div>
      <div className="spot__art">
        {spotArt[s.art]}
        <p className="spot__note">Simplified, illustrative pipeline</p>
      </div>
    </Reveal>
  )
}

function SpotlightSeries() {
  return (
    <div className="spots">
      {spotlights.map((s, i) => (
        <Fragment key={s.project.id}>
          {i > 0 && <div className="spots__rule" aria-hidden="true" />}
          <Spotlight s={s} />
        </Fragment>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Complete collection                                                 */
/* ------------------------------------------------------------------ */

/** Projects already shown in the Featured AI or Real-World Business parts. */
const shownAbove = new Set([...spotlights.map((s) => s.project.id), ...featuredIds])

function Collection() {
  const open = useOpenProject()
  return (
    <ul className="collection" aria-label="More projects">
      {projects
        .filter((p) => !shownAbove.has(p.id))
        .map((p) => (
          <li key={p.id} className="mini-wrap">
            <Tilt className="mini glass" max={5}>
              <div className="mini__top">
                <i className="mini__planet" style={{ '--h': p.hue } as CSSProperties} aria-hidden="true" />
              </div>
              <h4>
                <button type="button" className="stretch" onClick={() => open(p.id)}>
                  {p.name}
                </button>
              </h4>
              <p>{p.summary}</p>
              <ul className="chips">
                {p.tech.slice(0, 3).map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
                {p.tech.length > 3 && <li className="chip">+{p.tech.length - 3}</li>}
              </ul>
            </Tilt>
          </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */

export default function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-h">
      <div className="container">
        <SectionHead index="03" eyebrow="Projects" lead="A few things I’ve designed, built and shipped.">
          <span id="projects-h">Projects</span>
        </SectionHead>

        <div className="part">
          <h3 className="part__h">
            Featured <em>AI</em> Projects
          </h3>
          <p className="part__sub">Where I put models to work: vision, learning and language.</p>
        </div>
        <SpotlightSeries />

        <div className="part">
          <h3 className="part__h">Real-World Business Projects</h3>
          <p className="part__sub">
            Tools built for real teams and clients — solving everyday business problems at work.
          </p>
        </div>
        <div className="flagships">
          {featuredIds.map((id, i) => (
            <FlagshipCard key={id} p={projectById(id)} i={i} />
          ))}
        </div>

        <div className="part">
          <h3 className="part__h">More Projects</h3>
        </div>
        <Collection />
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import { skillsForProject } from '../data/skills'
import { lockScroll } from '../lib/scroll'
import { Arrow } from './primitives'

export default function ProjectDialog({ id, onClose, onNav }: { id: string | null; onClose: () => void; onNav: (id: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const project = projects.find((p) => p.id === id)
  const idx = project ? projects.indexOf(project) : -1

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project && !d.open) {
      d.showModal()
      lockScroll(true)
    }
    if (!project && d.open) {
      d.close()
      lockScroll(false)
    }
    body.current?.scrollTo({ top: 0 })
  }, [project])

  useEffect(() => () => lockScroll(false), [])

  const skills = project ? skillsForProject(project.id) : []
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <dialog
      ref={ref}
      className="pdialog"
      aria-labelledby="pd-title"
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {project && (
        <div className="pdialog__panel" ref={body}>
          <button type="button" className="pdialog__close" onClick={onClose} aria-label="Close project details">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <h3 id="pd-title">{project.name}</h3>
          <p className="pdialog__summary">{project.summary}</p>

          <h4>What it does</h4>
          <ul className="pdialog__list">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h4>Built with</h4>
          <ul className="chips">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          {project.hostedOn && <p className="pdialog__host">Hosted on {project.hostedOn}</p>}

          {skills.length > 0 && (
            <>
              <h4>Skills in play</h4>
              <ul className="chips">
                {skills.map((s) => (
                  <li key={s} className="chip chip--soft">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.href && (
            <a className="btn btn--primary pdialog__link" href={project.href} target="_blank" rel="noreferrer noopener">
              Visit project <Arrow />
            </a>
          )}

          <div className="pdialog__nav">
            <button type="button" onClick={() => onNav(prev.id)}>
              <small>Previous</small>
              {prev.name}
            </button>
            <button type="button" onClick={() => onNav(next.id)}>
              <small>Next</small>
              {next.name}
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}

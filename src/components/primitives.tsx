import { createContext, useContext, type CSSProperties, type ElementType, type ReactNode, type PointerEvent } from 'react'
import { useReveal } from '../lib/hooks'

/** Fades/blur-rises its children into view once scrolled to. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': delay } as CSSProperties}>
      {children}
    </Tag>
  )
}

/** Mouse-driven 3D tilt with a light glare that follows the cursor. Touch & keyboard are unaffected. */
export function Tilt({
  children,
  className = '',
  max = 7,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  max?: number
  as?: ElementType
}) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
    el.style.setProperty('--rx', `${-(py - 0.5) * 2 * max}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }
  return (
    <Tag className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </Tag>
  )
}

export function SectionHead({
  index,
  eyebrow,
  children,
  lead,
}: {
  index: string
  eyebrow: string
  children: ReactNode
  lead?: ReactNode
}) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">
        {index} — {eyebrow}
      </span>
      <h2>{children}</h2>
      {lead && <p>{lead}</p>}
    </Reveal>
  )
}

export const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ---- project dialog context ---- */
export const ProjectCtx = createContext<(id: string) => void>(() => {})
export const useOpenProject = () => useContext(ProjectCtx)

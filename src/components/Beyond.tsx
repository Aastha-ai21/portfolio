import { Reveal, SectionHead } from './primitives'
import { profile } from '../data/profile'

const icons = [
  // paper plane
  <path key="a" d="M4 12 20 4l-5 16-3-7-8-1Zm8 1 8-9" />,
  // camera
  <g key="b">
    <rect x="3" y="7" width="18" height="12" rx="3" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8 7l1.5-2.5h5L16 7" />
  </g>,
  // sparkle
  <path key="c" d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Zm7 11c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3Z" />,
]

export default function Beyond() {
  return (
    <section id="beyond" className="section beyond" aria-labelledby="beyond-h">
      <div className="container">
        <SectionHead
          index="05"
          eyebrow="Off-orbit"
          lead="The technical person who builds things — and the person who goes out and explores the world."
        >
          <span id="beyond-h">
            Beyond the <em>code.</em>
          </span>
        </SectionHead>

        <ul className="interests">
          {profile.interests.map((it, i) => (
            <Reveal as="li" key={it.name} delay={i} className="interest glass">
              <span className="interest__planet" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  {icons[i]}
                </svg>
              </span>
              <div className="interest__text">
                <h3>{it.name}</h3>
                <p>{it.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

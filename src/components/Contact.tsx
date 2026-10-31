import { Fragment, type ReactNode } from 'react'
import { Reveal, SectionHead } from './primitives'
import { scrollToId } from '../lib/scroll'
import { profile } from '../data/profile'

const icon = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

/** Lets long values wrap at "@" and "/" instead of mid-word. */
const breakable = (value: string): ReactNode =>
  value.split(/(?=@)|(?<=\/)/).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ))

export default function Contact() {
  const { email, phone, phoneHref, linkedin, linkedinLabel, instagram, instagramLabel } = profile.contact
  const cards = [
    {
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: icon(
        <>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </>,
      ),
    },
    {
      label: 'Phone',
      value: phone,
      href: phoneHref,
      icon: icon(<path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 4.5 6a2 2 0 0 1 2-2Z" />),
    },
    {
      label: 'LinkedIn',
      value: linkedinLabel,
      href: linkedin,
      external: true,
      icon: icon(
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M8 10.5V16M8 7.8v.01M11.5 16v-3a2 2 0 0 1 4 0v3M11.5 10.5V16" />
        </>,
      ),
    },
    {
      label: 'Instagram',
      value: instagramLabel,
      href: instagram,
      external: true,
      icon: icon(
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.2 6.8v.01" />
        </>,
      ),
    },
  ]

  return (
    <>
      <section id="contact" className="section contact" aria-labelledby="contact-h">
        <div className="container">
          <SectionHead
            index="06"
            eyebrow="Contact"
            lead="Got an idea, a project, an opportunity — or just want to swap travel stories? My inbox is always open, and I reply to every message."
          >
            <span id="contact-h">
              Let's build something <em>together.</em>
            </span>
          </SectionHead>

          <ul className="reach">
            {cards.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i}>
                <a
                  className="reach__card glass"
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="reach__icon">{c.icon}</span>
                  <small>{c.label}</small>
                  <span className="reach__value">{breakable(c.value)}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer__inner">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.roleLong}
          </p>
          <button type="button" className="footer__top" onClick={() => scrollToId('hero')}>
            Back to orbit ↑
          </button>
        </div>
      </footer>
    </>
  )
}

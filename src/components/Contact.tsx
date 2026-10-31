import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Arrow, Reveal, SectionHead } from './primitives'
import { scrollToId } from '../lib/scroll'
import { profile } from '../data/profile'

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const icon = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export default function Contact() {
  const { email, phone, phoneHref, linkedin, linkedinLabel } = profile.contact
  const [form, setForm] = useState({ name: '', email: '', message: '', botcheck: false })
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'message', string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const set = (k: 'name' | 'email' | 'message') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const next: typeof errors = {}
    if (!form.name.trim()) next.name = 'Please tell me your name.'
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email so I can reply.'
    if (form.message.trim().length < 10) next.message = 'Please write at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Sent straight to the inbox through Web3Forms — the visitor never leaves the page.
  const send = async (e: FormEvent) => {
    e.preventDefault()
    if (!ACCESS_KEY || status === 'sending' || !validate()) return
    if (form.botcheck) {
      // honeypot tripped: a person never sees this field. Pretend all is well, send nothing.
      setStatus('success')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${form.name.trim()}`,
          from_name: form.name.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          botcheck: form.botcheck,
        }),
      })
      const data = (await res.json()) as { success?: boolean }
      if (!res.ok || !data.success) throw new Error('Web3Forms rejected the message')
      setForm({ name: '', email: '', message: '', botcheck: false })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

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
                  <span className="reach__value">{c.value}</span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal className="contact__card glass">
            <form onSubmit={send} className="form" noValidate>
              <fieldset className="form__fields" disabled={!ACCESS_KEY || status === 'sending'}>
                <label>
                  <span>Your name</span>
                  <input
                    autoComplete="name"
                    value={form.name}
                    onChange={set('name')}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && (
                    <small id="err-name" className="form__err">
                      {errors.name}
                    </small>
                  )}
                </label>
                <label>
                  <span>Your email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set('email')}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && (
                    <small id="err-email" className="form__err">
                      {errors.email}
                    </small>
                  )}
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    required
                    minLength={10}
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && (
                    <small id="err-message" className="form__err">
                      {errors.message}
                    </small>
                  )}
                </label>
                {/* honeypot: hidden from people and assistive tech, bots tend to tick it */}
                <label className="form__hp" aria-hidden="true">
                  <span>Leave this empty</span>
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    checked={form.botcheck}
                    onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked }))}
                  />
                </label>
                <button type="submit" className="btn btn--primary" aria-busy={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <span className="spinner" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Arrow />
                    </>
                  )}
                </button>
              </fieldset>

              <div className="form__status" role="status" aria-live="polite">
                {status === 'success' && <p className="form__ok">Message sent! I'll get back to you soon ✨</p>}
                {status === 'error' && (
                  <p className="form__fail">
                    Something went wrong — email me directly at <a href={`mailto:${email}`}>{email}</a>
                  </p>
                )}
              </div>
              {!ACCESS_KEY &&
                (import.meta.env.DEV ? (
                  <p className="form__note">
                    Dev note: set VITE_WEB3FORMS_KEY in .env to enable this form (see .env.example).
                  </p>
                ) : (
                  <p className="form__note">
                    The form is unavailable right now — email me directly at <a href={`mailto:${email}`}>{email}</a>
                  </p>
                ))}
            </form>
          </Reveal>
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

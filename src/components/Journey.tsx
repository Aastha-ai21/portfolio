import { Reveal, SectionHead } from './primitives'
import { profile } from '../data/profile'

export default function Journey() {
  const { experience: ex, education: ed } = profile
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-h">
      <div className="container">
        <SectionHead index="04" eyebrow="Journey">
          <span id="journey-h">
            Mission <em>log.</em>
          </span>
        </SectionHead>

        <ol className="timeline">
          <Reveal as="li" className="tl tl--now">
            <span className="tl__node" aria-hidden="true" />
            <div className="tl__card glass">
              <p className="tl__when">
                {ex.period} <span className="pill" data-group="live">Current</span>
              </p>
              <h3>{ex.title}</h3>
              <p className="tl__org">{ex.company}</p>
              <p>{ex.summary}</p>
            </div>
          </Reveal>
          <Reveal as="li" delay={1} className="tl">
            <span className="tl__node" aria-hidden="true" />
            <div className="tl__card glass">
              <p className="tl__when">{ed.period}</p>
              <h3>{ed.degree}</h3>
              <p className="tl__org">{ed.school}</p>
            </div>
          </Reveal>
        </ol>

        <div className="creds">
          <Reveal className="creds__col glass">
            <h3>Internships &amp; simulations</h3>
            <ul>
              {profile.internships.map((x) => (
                <li key={x.org + x.title}>
                  <small>{x.org}</small>
                  {x.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className="creds__col glass">
            <h3>Certifications</h3>
            <ul>
              {profile.certifications.map((x) => (
                <li key={x.issuer + x.title}>
                  <small>{x.issuer}</small>
                  {x.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

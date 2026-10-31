import { Reveal, SectionHead, Tilt } from './primitives'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-h">
      <div className="container">
        <SectionHead index="01" eyebrow="About">
          <span id="about-h">
            A builder, and <em>an explorer.</em>
          </span>
        </SectionHead>

        <div className="about__grid">
          <div className="about__text">
            <Reveal as="p" className="about__big">
              Hi, I'm Aastha — an AI engineer from Navi Mumbai who gets genuinely excited about making boring work
              disappear.
            </Reveal>
            <Reveal as="p" delay={1}>
              If a task is repetitive, I want to automate it. I'm happiest building with Python, machine learning, LLMs
              and AI automation tools — taking a rough idea and turning it into something smart, useful and genuinely
              loved by the people who use it.
            </Reveal>
            <Reveal as="p" delay={2}>
              But AI isn't the only thing that pulls me in. Even as an AI engineer, I'm deeply drawn to web development
              and data analysis — turning raw numbers into clear stories, and turning ideas into interfaces people enjoy
              using. I love designing every little detail, and anything creative has my whole heart.
            </Reveal>
            <Reveal as="p" delay={3}>
              Off the keyboard, I'm a total YOLO person. I live in the present and try to enjoy every second to the
              fullest — travelling to new places, creating content, and meeting new people. I love talking to people and
              learning how they see life: their cultures, their stories, their thoughts. Every conversation teaches me
              something no tutorial ever could.
            </Reveal>
            <Reveal as="p" delay={4}>
              So here's my little universe — of things I've built, and things I love.
            </Reveal>
          </div>

          <Reveal delay={2} className="about__side">
            <Tilt className="glass flightlog" max={5}>
              <h3 className="flightlog__title">Flight log</h3>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{profile.roleLong}</dd>
                </div>
                <div>
                  <dt>Currently</dt>
                  <dd>{profile.company}</dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>
                    B.E. Artificial Intelligence &amp; Data Science
                    <br />
                    <span>University of Mumbai · 2022–2026</span>
                  </dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

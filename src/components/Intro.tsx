import { useEffect, useRef, useState } from 'react'
import { cosmos, prefersReducedMotion } from '../lib/cosmos'

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Cinematic opening: a title card, then the camera drops out of warp speed
 * while the planet grows into frame. Drives `cosmos.warp` and flips
 * `html.is-ready` so the hero copy can animate in.
 */
export default function Intro() {
  const [gone, setGone] = useState(false)
  const [fading, setFading] = useState(false)
  const skip = useRef<() => void>(() => {})

  useEffect(() => {
    const root = document.documentElement
    if (prefersReducedMotion()) {
      cosmos.warp = 0
      cosmos.ready = true
      root.classList.add('is-ready')
      setGone(true)
      return
    }
    cosmos.warp = 1
    let raf = 0
    let start = 0
    let skipped = 0 // when set, jump straight toward the end
    let ready = false
    skip.current = () => {
      skipped = performance.now()
    }
    const tick = (now: number) => {
      if (!start) start = now
      let t = (now - start) / 1000
      if (skipped) t = Math.max(t, 2.4 + (now - skipped) / 1000)
      cosmos.warp = t < 1.2 ? 1 : 1 - easeInOut(Math.min(1, (t - 1.2) / 2.1))
      if (t > 1.6) setFading(true)
      if (!ready && t > 2.3) {
        ready = true
        cosmos.ready = true
        root.classList.add('is-ready')
      }
      if (t > 3.4) {
        cosmos.warp = 0
        setGone(true)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null
  return (
    <div className={`intro ${fading ? 'intro--out' : ''}`} role="status" aria-live="polite">
      <div className="intro__core">
        <svg className="intro__orbit" viewBox="0 0 200 200" aria-hidden="true">
          <ellipse cx="100" cy="100" rx="86" ry="26" transform="rotate(-24 100 100)" />
          <circle cx="100" cy="100" r="30" className="intro__planet" />
        </svg>
        <p className="intro__kicker">Entering orbit</p>
        <p className="intro__title">Aastha Bhagat’s universe</p>
      </div>
      <button type="button" className="intro__skip" onClick={() => skip.current()}>
        Skip intro
      </button>
    </div>
  )
}

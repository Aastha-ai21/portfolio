/**
 * Tiny mutable store shared between the DOM layer and the WebGL scene.
 * It's intentionally not React state: the scene reads it every frame
 * without triggering re-renders.
 */
export const cosmos = {
  /** pointer in -1..1 (smoothed by the scene) */
  pointer: { x: 0, y: 0 },
  /** 1 = full warp speed (intro), 0 = calm */
  warp: 1,
  /** accumulated warp travel distance */
  warpTravel: 0,
  /** hero text / UI is allowed to appear */
  ready: false,
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isLowPower = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 760px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4)

export const hasWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

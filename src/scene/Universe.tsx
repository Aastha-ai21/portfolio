import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { cosmos, isLowPower, prefersReducedMotion } from '../lib/cosmos'
import {
  atmoFrag,
  atmoVert,
  nebulaFrag,
  nebulaVert,
  planetFrag,
  planetVert,
  ringFrag,
  ringVert,
  starFrag,
  starVert,
  warpFrag,
  warpVert,
} from './shaders'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'journey', 'beyond', 'contact']
const DEPTH = 200
const PLANET_R = 1.5
const RING_IN = 1.95
const RING_OUT = 3.0

/** Planet placement per section: [x, y (screen-normalised -1..1), diameter / screen height, brightness] */
const KEYS_DESKTOP = [
  [0.46, 0.0, 0.74, 1.0],
  [0.8, -0.05, 0.62, 0.78],
  [-0.88, 0.18, 0.6, 0.6],
  [0.92, -0.25, 0.5, 0.42],
  [-0.92, -0.1, 0.55, 0.48],
  [0.82, 0.25, 0.4, 0.5],
  [0.0, -1.2, 1.9, 0.6],
]
const KEYS_MOBILE = [
  [0.0, 0.36, 0.46, 1.0],
  [0.72, 0.7, 0.34, 0.55],
  [-0.76, 0.76, 0.34, 0.45],
  [0.8, 0.8, 0.3, 0.36],
  [-0.8, 0.8, 0.3, 0.36],
  [0.7, 0.76, 0.3, 0.4],
  [0.0, -1.18, 1.45, 0.5],
]

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ------------------------------------------------------------------ */

function Nebula({ low }: { low: boolean }) {
  const size = useThree((s) => s.size)
  const dpr = useThree((s) => s.viewport.dpr)
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nebulaVert,
        fragmentShader: nebulaFrag,
        defines: { OCTAVES: low ? 3 : 5 },
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(1, 1) },
          uScroll: { value: 0 },
          uPointer: { value: new THREE.Vector2() },
        },
        depthTest: false,
        depthWrite: false,
      }),
    [low],
  )
  useEffect(() => {
    mat.uniforms.uRes.value.set(size.width * dpr, size.height * dpr)
  }, [size, dpr, mat])
  useFrame((state) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uScroll.value = window.scrollY / maxScroll
    mat.uniforms.uPointer.value.set(cosmos.pointer.x, cosmos.pointer.y)
  })
  return (
    <mesh renderOrder={-100} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */

const STAR_COLORS = [
  [1, 1, 1],
  [0.8, 0.76, 1],
  [0.66, 0.82, 1],
  [1, 0.8, 0.92],
  [0.86, 0.88, 0.95],
].map((c) => new THREE.Color(c[0], c[1], c[2]))

function Stars({ count }: { count: number }) {
  const { geometry, material } = useMemo(() => {
    const rnd = mulberry(7)
    const pos = new Float32Array(count * 3)
    const size = new Float32Array(count)
    const phase = new Float32Array(count)
    const color = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() * 2 - 1) * 95
      pos[i * 3 + 1] = (rnd() * 2 - 1) * 58
      pos[i * 3 + 2] = -rnd() * DEPTH
      size[i] = 0.35 + Math.pow(rnd(), 5) * 2.4
      phase[i] = rnd()
      const c = STAR_COLORS[Math.floor(Math.pow(rnd(), 1.6) * STAR_COLORS.length)]
      color.set([c.r, c.g, c.b], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
    g.setAttribute('aColor', new THREE.BufferAttribute(color, 3))
    const m = new THREE.ShaderMaterial({
      vertexShader: starVert,
      fragmentShader: starFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTravel: { value: 0 },
        uTime: { value: 0 },
        uPR: { value: 1 },
        uDepth: { value: DEPTH },
      },
    })
    return { geometry: g, material: m }
  }, [count])

  const dpr = useThree((s) => s.viewport.dpr)
  useFrame((state) => {
    const u = material.uniforms
    u.uTime.value = state.clock.elapsedTime
    u.uPR.value = dpr
    u.uTravel.value = cosmos.warpTravel + window.scrollY * 0.018
  })
  return <points geometry={geometry} material={material} frustumCulled={false} />
}

/* ------------------------------------------------------------------ */

function Warp({ count }: { count: number }) {
  const ref = useRef<THREE.LineSegments>(null)
  const { geometry, material } = useMemo(() => {
    const rnd = mulberry(21)
    const pos = new Float32Array(count * 6)
    const end = new Float32Array(count * 2)
    const seed = new Float32Array(count * 2)
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2
      const r = 0.8 + Math.pow(rnd(), 1.4) * 32
      const x = Math.cos(a) * r * 1.6
      const y = Math.sin(a) * r
      const z = -rnd() * DEPTH
      const s = rnd()
      pos.set([x, y, z, x, y, z], i * 6)
      end[i * 2] = 0
      end[i * 2 + 1] = 1
      seed[i * 2] = s
      seed[i * 2 + 1] = s
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aEnd', new THREE.BufferAttribute(end, 1))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    const m = new THREE.ShaderMaterial({
      vertexShader: warpVert,
      fragmentShader: warpFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTravel: { value: 0 }, uWarp: { value: 1 }, uDepth: { value: DEPTH } },
    })
    return { geometry: g, material: m }
  }, [count])

  useFrame(() => {
    const line = ref.current
    if (!line) return
    line.visible = cosmos.warp > 0.005
    material.uniforms.uWarp.value = cosmos.warp
    material.uniforms.uTravel.value = cosmos.warpTravel
  })
  return <lineSegments ref={ref} geometry={geometry} material={material} frustumCulled={false} />
}

/* ------------------------------------------------------------------ */

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const rnd = mulberry(99)
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [new THREE.Color('#cbbcff'), new THREE.Color('#9fd4ff'), new THREE.Color('#f3b3df')]
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2
      const r = RING_IN - 0.35 + rnd() * (RING_OUT - RING_IN + 1.6)
      pos.set([Math.cos(a) * r, (rnd() - 0.5) * 0.09, Math.sin(a) * r], i * 3)
      const c = palette[Math.floor(rnd() * 3)]
      col.set([c.r, c.g, c.b], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [count])
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05
  })
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */

function Planet({ low, sections }: { low: boolean; sections: React.RefObject<number[]> }) {
  const place = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const sphere = useRef<THREE.Mesh>(null)
  const moonOrbit = useRef<THREE.Group>(null)
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)
  const reduced = prefersReducedMotion()
  const cur = useRef<number[] | null>(null)
  const spin = useRef({ v: 0, lastY: 0 })

  const mats = useMemo(() => {
    const dim = { value: 1 }
    return {
      dim,
      planet: new THREE.ShaderMaterial({
        vertexShader: planetVert,
        fragmentShader: planetFrag,
        uniforms: { uTime: { value: 0 }, uDim: dim },
      }),
      atmo: new THREE.ShaderMaterial({
        vertexShader: atmoVert,
        fragmentShader: atmoFrag,
        uniforms: { uDim: dim },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      ring: new THREE.ShaderMaterial({
        vertexShader: ringVert,
        fragmentShader: ringFrag,
        uniforms: { uDim: dim, uInner: { value: RING_IN }, uOuter: { value: RING_OUT } },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    }
  }, [])

  useFrame((state, dt) => {
    const g = place.current
    if (!g) return
    const mobile = size.width < 760
    const keys = mobile ? KEYS_MOBILE : KEYS_DESKTOP
    const tops = sections.current ?? []

    // which section are we in, and how far toward the next one?
    const y = window.scrollY + window.innerHeight * 0.5
    let i = 0
    for (let k = 0; k < tops.length; k++) if (y >= tops[k]) i = k
    const end = tops[i + 1] ?? document.documentElement.scrollHeight
    const f = tops.length ? (y - tops[i]) / Math.max(1, end - tops[i]) : 0
    const t = Math.min(keys.length - 1, i + smooth(0.5, 1, f))
    const a = keys[Math.floor(t)]
    const b = keys[Math.min(keys.length - 1, Math.ceil(t))]
    const m = t - Math.floor(t)
    const target = a.map((v, idx) => v + (b[idx] - v) * m)

    const k = reduced ? 1 : 1 - Math.exp(-dt * 3.2)
    cur.current = cur.current ? cur.current.map((v, idx) => v + (target[idx] - v) * k) : target
    const [nx, ny, diam, dim] = cur.current

    const D = 14
    const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * D
    const w = h * camera.aspect
    // entrance: the planet grows out of the warp tunnel
    const entrance = reduced ? 1 : smooth(0.85, 0, cosmos.warp)
    const s = ((diam * h) / (PLANET_R * 2)) * (0.0001 + entrance)
    g.position.set((nx * w) / 2, (ny * h) / 2, -D)
    g.scale.setScalar(s)
    mats.dim.value = dim * (0.25 + 0.75 * entrance)

    // gentle response to cursor, scroll velocity adds spin
    const tl = tilt.current
    if (tl) {
      tl.rotation.x += (0.28 + cosmos.pointer.y * -0.18 - tl.rotation.x) * Math.min(1, dt * 2.5)
      tl.rotation.y += (cosmos.pointer.x * 0.28 - tl.rotation.y) * Math.min(1, dt * 2.5)
      tl.rotation.z = -0.32
    }
    const dy = window.scrollY - spin.current.lastY
    spin.current.lastY = window.scrollY
    spin.current.v += (Math.min(Math.abs(dy), 140) * 0.0009 - spin.current.v) * Math.min(1, dt * 4)
    if (sphere.current) sphere.current.rotation.y += dt * (0.05 + spin.current.v * 4)
    if (moonOrbit.current) moonOrbit.current.rotation.y += dt * 0.22
    mats.planet.uniforms.uTime.value = state.clock.elapsedTime
  })

  const segs = low ? 40 : 72
  return (
    <group ref={place}>
      <group ref={tilt}>
        <mesh ref={sphere} material={mats.planet}>
          <sphereGeometry args={[PLANET_R, segs, segs]} />
        </mesh>
        <mesh scale={1.16} material={mats.atmo}>
          <sphereGeometry args={[PLANET_R, 48, 48]} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.ring}>
          <ringGeometry args={[RING_IN, RING_OUT, 128, 1]} />
        </mesh>
        <Dust count={low ? 450 : 1100} />
        <group rotation={[0.18, 0, 0.22]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.78, 3.795, 128]} />
            <meshBasicMaterial color="#b9aaff" transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
          <group ref={moonOrbit}>
            <mesh position={[3.79, 0, 0]}>
              <sphereGeometry args={[0.24, 32, 32]} />
              <meshStandardMaterial color="#d9d3ff" roughness={0.95} emissive="#2a2260" emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */

function Rig({ sections }: { sections: React.RefObject<number[]> }) {
  const invalidate = useThree((s) => s.invalidate)
  const camera = useThree((s) => s.camera)
  const reduced = prefersReducedMotion()

  // section offsets (re-measured on resize / content growth)
  useEffect(() => {
    const measure = () => {
      sections.current = SECTION_IDS.map((id) => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + window.scrollY : 0
      })
      invalidate()
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [sections, invalidate])

  // pointer
  useEffect(() => {
    const target = { x: 0, y: 0 }
    const move = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = -((e.clientY / window.innerHeight) * 2 - 1)
      if (reduced) {
        cosmos.pointer.x = target.x
        cosmos.pointer.y = target.y
        invalidate()
      }
    }
    let raf = 0
    const tick = () => {
      cosmos.pointer.x += (target.x - cosmos.pointer.x) * 0.06
      cosmos.pointer.y += (target.y - cosmos.pointer.y) * 0.06
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move, { passive: true })
    if (!reduced) raf = requestAnimationFrame(tick)
    const onScroll = () => reduced && invalidate()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [invalidate, reduced])

  useFrame((_, dt) => {
    cosmos.warpTravel += cosmos.warp * dt * 170
    // parallax: nearer objects (planet) slide against distant stars
    camera.position.x = cosmos.pointer.x * 0.9
    camera.position.y = cosmos.pointer.y * 0.55
  })
  return null
}

/* ------------------------------------------------------------------ */

export default function Universe() {
  const low = useMemo(() => isLowPower(), [])
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const sections = useRef<number[]>([])
  return (
    <Canvas
      className="universe"
      aria-hidden="true"
      dpr={low ? [1, 1.25] : [1, 1.75]}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: !low, powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 50, near: 0.1, far: 400, position: [0, 0, 0] }}
      onCreated={({ gl }) => gl.setClearColor('#05040f')}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-4, 3, 5]} intensity={2.2} color="#e6e0ff" />
      <Nebula low={low} />
      <Stars count={low ? 1300 : 3200} />
      <Warp count={low ? 160 : 420} />
      <Planet low={low} sections={sections} />
      <Rig sections={sections} />
    </Canvas>
  )
}

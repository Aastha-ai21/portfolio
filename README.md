# Aastha Bhagat — Personal Galaxy Portfolio

An immersive, galaxy-themed portfolio: a real-time WebGL universe (procedural nebula, layered stars,
a shader-built ringed planet with a moon and orbital dust) sits behind the page and reacts to scroll and cursor.

**Stack:** Vite · React 19 · TypeScript · three.js via React Three Fiber · Lenis (smooth scroll). No backend, no API keys.

## Run locally

```bash
npm install        # .npmrc sets legacy-peer-deps (works around an npm peer-resolver bug)
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

Requires Node 20+.

## Make it yours

Everything personal lives in `src/data/`:

| File          | What it controls                                                                  |
| ------------- | --------------------------------------------------------------------------------- |
| `profile.ts`  | Name, role, experience, education, internships, certifications, interests, **contact** |
| `projects.ts` | The 16 projects (status, summary, highlights, tech). Add `href` to show a "Visit project" button |
| `skills.ts`   | The 5 skill constellations and which projects each skill appears in               |

### Contact details
Email, phone and LinkedIn are set in `contact` in `src/data/profile.ts` and shown as three cards. The message form opens the visitor's email app with the message pre-filled (no server involved).

### Also worth doing before launch
- Add a social-share image (e.g. `public/og.png`, 1200×630) and `og:image` / `og:url` / canonical tags in `index.html`.
- Add `sitemap.xml` once you know the domain.

## Deploy

The build output is a static site in `dist/`.

**Cloudflare Pages** — Connect the Git repo → Framework preset *Vite* (or None) → build command `npm run build`, output directory `dist`.

**Vercel** — Import the repo; Vercel detects Vite. Build `npm run build`, output `dist`.

Single-page, hash-based navigation — no rewrite rules needed.

## Design & performance notes
- The 3D scene is a lazily loaded chunk, so text paints first; if WebGL is unavailable the page falls back to a CSS gradient background and remains fully usable.
- Mobile / low-core devices automatically get fewer stars, simpler nebula shader, lower pixel ratio.
- `prefers-reduced-motion`: skips the intro, disables smooth-scroll, tilt, orbits and reveals, and renders the scene on demand instead of continuously.
- Keyboard accessible: skip link, focus rings, native `<dialog>` for project details (focus trap + Esc), skill/orbit controls are real buttons.
- Decorative diagrams are labelled illustrative; no metrics, users or results are invented.

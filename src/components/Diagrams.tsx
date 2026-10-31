/* Decorative, abstract illustrations (aria-hidden). They hint at what each project does without claiming specifics. */

export function PipelineDiagram() {
  return (
    <svg className="dg" viewBox="0 0 280 130" aria-hidden="true">
      {[0, 1, 2].map((c) => (
        <g key={c} transform={`translate(${14 + c * 90} 10)`}>
          <rect width="74" height="110" rx="10" className="dg__panel" />
          <rect x="10" y="10" width="34" height="5" rx="2.5" className="dg__bar" />
          {[0, 1, 2].slice(0, 3 - c).map((r) => (
            <rect key={r} x="9" y={26 + r * 28} width="56" height="20" rx="6" className="dg__card" />
          ))}
        </g>
      ))}
      <g className="dg__hop">
        <circle r="5" className="dg__dot" cx="0" cy="0" />
      </g>
      <path d="M92 66h8M182 66h8" className="dg__arrow" />
    </svg>
  )
}

export function LedgerDiagram() {
  const rows = [78, 54, 92, 66, 84, 48]
  return (
    <svg className="dg" viewBox="0 0 280 130" aria-hidden="true">
      <rect x="14" y="10" width="170" height="110" rx="10" className="dg__panel" />
      {rows.map((w, i) => (
        <g key={i}>
          <rect x="26" y={22 + i * 16} width="34" height="6" rx="3" className="dg__bar" />
          <rect x="70" y={22 + i * 16} width={w} height="6" rx="3" className="dg__card" />
        </g>
      ))}
      <rect x="14" y="10" width="170" height="14" className="dg__scan" />
      <g transform="translate(204 22)">
        <rect width="62" height="84" rx="8" className="dg__panel" />
        <path d="M12 22h38M12 36h38M12 50h24" className="dg__arrow" />
        <circle cx="46" cy="68" r="6" className="dg__dot" />
      </g>
    </svg>
  )
}

export function PortalDiagram() {
  return (
    <svg className="dg" viewBox="0 0 280 130" aria-hidden="true">
      {[2, 1, 0].map((k) => (
        <g key={k} transform={`translate(${24 + k * 16} ${14 + k * 10})`} opacity={1 - k * 0.22}>
          <rect width="150" height="88" rx="10" className="dg__panel" />
          <rect x="14" y="14" width="60" height="6" rx="3" className="dg__bar" />
          <rect x="14" y="32" width="122" height="14" rx="5" className="dg__card" />
          <rect x="14" y="54" width="86" height="14" rx="5" className="dg__card" />
        </g>
      ))}
      <g transform="translate(214 66)">
        <circle r="30" className="dg__ring" />
        <circle r="30" className="dg__ring dg__ring--run" />
        <text textAnchor="middle" y="5" className="dg__text">
          48h
        </text>
      </g>
    </svg>
  )
}

export function KanbanDiagram() {
  return (
    <svg className="dg" viewBox="0 0 280 130" aria-hidden="true">
      {[0, 1, 2].map((c) => (
        <g key={c} transform={`translate(${14 + c * 90} 10)`}>
          <rect width="74" height="110" rx="10" className="dg__panel" />
          <rect x="10" y="10" width="28" height="5" rx="2.5" className="dg__bar" />
        </g>
      ))}
      <rect x="23" y="36" width="56" height="20" rx="6" className="dg__card" />
      <rect x="23" y="62" width="56" height="20" rx="6" className="dg__card" />
      <rect x="113" y="36" width="56" height="20" rx="6" className="dg__card" />
      <rect x="203" y="36" width="56" height="20" rx="6" className="dg__card" />
      <rect x="23" y="88" width="56" height="20" rx="6" className="dg__card dg__move" />
    </svg>
  )
}

/** Conceptual CNN pipeline — layer counts are illustrative, not the project's exact architecture. */
export function CnnDiagram() {
  const stack = (x: number, n: number, w: number, h: number, cls = '') =>
    Array.from({ length: n }, (_, i) => (
      <rect key={`${x}-${i}`} x={x + i * 7} y={70 - h / 2 - i * 5} width={w} height={h} rx="5" className={`cnn__sheet ${cls}`} style={{ '--k': i } as React.CSSProperties} />
    ))
  return (
    <svg className="cnn" viewBox="0 0 560 200" role="img" aria-label="Simplified diagram of a convolutional neural network: image input, convolution, pooling, dense layers, classification.">
      <path d="M62 92 H176 M232 92 H298 M342 92 H420 M464 92 H500" className="cnn__flow" />
      {/* input grid */}
      <g transform="translate(22 52)">
        {Array.from({ length: 25 }, (_, i) => (
          <rect key={i} x={(i % 5) * 9} y={Math.floor(i / 5) * 9} width="7" height="7" rx="1.5" className="cnn__px" style={{ '--k': i } as React.CSSProperties} />
        ))}
      </g>
      {stack(112, 3, 46, 66)}
      {stack(236, 3, 32, 46, 'cnn__sheet--s')}
      {/* dense */}
      <g>
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx="384" cy={46 + i * 20} r="6" className="cnn__node" style={{ '--k': i } as React.CSSProperties} />
        ))}
      </g>
      <rect x="478" y="68" width="62" height="48" rx="24" className="cnn__out" />
      <g className="cnn__labels">
        <text x="45" y="168" textAnchor="middle">Image</text>
        <text x="145" y="168" textAnchor="middle">Convolution</text>
        <text x="260" y="168" textAnchor="middle">Pooling</text>
        <text x="384" y="168" textAnchor="middle">Dense</text>
        <text x="509" y="168" textAnchor="middle">Class</text>
      </g>
    </svg>
  )
}

/* ---- Featured AI Projects: simplified, illustrative pipelines (shared look, one per project) ---- */

const k = (n: number) => ({ '--k': n }) as React.CSSProperties

/** Hand tracking → Gemini → answer. Landmark positions are illustrative, not real model output. */
export function GestureDiagram() {
  const tips = [
    [38, 40],
    [58, 22],
    [80, 16],
    [102, 24],
    [118, 50],
  ]
  return (
    <svg className="cnn" viewBox="0 0 560 200" role="img" aria-label="Simplified diagram of hand-gesture input: hand tracking, an AI model, and a result.">
      <path d="M130 90 H182 M262 90 H312 M368 90 H436" className="cnn__flow" />
      {/* hand landmarks */}
      <g transform="translate(6 20)">
        {tips.map(([x, y], i) => (
          <path key={i} d={`M78 104 L${x} ${y}`} className="sp__bone" />
        ))}
        {tips.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" className="cnn__node" style={k(i)} />
        ))}
        <circle cx="78" cy="104" r="8" className="sp__palm" />
      </g>
      {/* tracking frame */}
      <g transform="translate(190 52)">
        <rect width="64" height="76" rx="10" className="sp__panel" />
        <path d="M10 22v-12h12M54 22v-12H42M10 54v12h12M54 54v12H42" className="sp__corner" />
        <circle cx="32" cy="38" r="5" className="cnn__node" style={k(1)} />
      </g>
      {/* model */}
      <g transform="translate(340 90)">
        <circle r="30" className="sp__core" />
        <circle r="30" className="sp__halo" />
        <text textAnchor="middle" y="5" className="sp__glyph">AI</text>
      </g>
      {/* result */}
      <g transform="translate(444 54)">
        <rect width="94" height="72" rx="12" className="sp__panel" />
        <text x="47" y="46" textAnchor="middle" className="sp__math">+ − × ÷</text>
      </g>
      <g className="cnn__labels">
        <text x="75" y="172" textAnchor="middle">Gesture</text>
        <text x="222" y="172" textAnchor="middle">Tracking</text>
        <text x="340" y="172" textAnchor="middle">Gemini</text>
        <text x="491" y="172" textAnchor="middle">Result</text>
      </g>
    </svg>
  )
}

/** Input data → model → crop + yield recommendations. */
export function CropDiagram() {
  const cols = [
    [66, 100, 134],
    [52, 84, 116, 148],
  ]
  const bars = [46, 66, 38, 78]
  return (
    <svg className="cnn" viewBox="0 0 560 200" role="img" aria-label="Simplified diagram of a crop recommendation model: input data, a machine-learning model, a crop recommendation and a yield estimate.">
      <path d="M118 92 H178 M300 92 H356" className="cnn__flow" />
      {/* data table */}
      <g transform="translate(18 28)">
        <rect width="100" height="128" rx="10" className="sp__panel" />
        {Array.from({ length: 6 }, (_, r) => (
          <g key={r}>
            <rect x="10" y={14 + r * 19} width="26" height="7" rx="3" className="sp__bar" />
            <rect x="44" y={14 + r * 19} width={30 + ((r * 17) % 28)} height="7" rx="3" className="sp__cell" style={k(r)} />
          </g>
        ))}
      </g>
      {/* model */}
      <g>
        {[0, 1].map((c) =>
          cols[c].map((y, i) => (
            <circle key={`${c}-${i}`} cx={198 + c * 78} cy={y} r="7" className="cnn__node" style={k(i + c)} />
          )),
        )}
        {cols[0].flatMap((y1, i) =>
          cols[1].map((y2, j) => <path key={`${i}-${j}`} d={`M198 ${y1} L276 ${y2}`} className="sp__edge" />),
        )}
      </g>
      {/* crop ranking */}
      <g transform="translate(368 38)">
        <rect width="74" height="108" rx="10" className="sp__panel" />
        {[58, 44, 30].map((w, i) => (
          <rect key={i} x="10" y={16 + i * 28} width={w} height="12" rx="6" className={i === 0 ? 'sp__fill sp__fill--hi' : 'sp__fill'} style={k(i)} />
        ))}
      </g>
      {/* yield */}
      <g transform="translate(466 38)">
        <rect width="76" height="108" rx="10" className="sp__panel" />
        {bars.map((h, i) => (
          <rect key={i} x={10 + i * 16} y={96 - h} width="10" height={h} rx="3" className="sp__rise" style={k(i)} />
        ))}
      </g>
      <g className="cnn__labels">
        <text x="68" y="180" textAnchor="middle">Input data</text>
        <text x="237" y="180" textAnchor="middle">Model</text>
        <text x="405" y="180" textAnchor="middle">Crop</text>
        <text x="504" y="180" textAnchor="middle">Yield</text>
      </g>
    </svg>
  )
}

/** Resumes + job description → AI analysis → evidence-backed score → recruiter decision. */
export function RecruitDiagram() {
  return (
    <svg className="cnn" viewBox="0 0 560 200" role="img" aria-label="Simplified diagram of AI candidate analysis: resumes and a job description, AI analysis, an evidence-backed score, and a human recruiter decision.">
      <path d="M118 90 H176 M262 90 H318 M404 90 H452" className="cnn__flow" />
      {/* documents */}
      {[2, 1, 0].map((n) => (
        <g key={n} transform={`translate(${22 + n * 10} ${34 + n * 10})`} opacity={1 - n * 0.2}>
          <rect width="78" height="96" rx="9" className="sp__panel" />
          <rect x="10" y="12" width="30" height="6" rx="3" className="sp__bar" />
          <rect x="10" y="28" width="58" height="5" rx="2.5" className="sp__cell" style={k(n)} />
          <rect x="10" y="40" width="48" height="5" rx="2.5" className="sp__cell" style={k(n + 1)} />
          <rect x="10" y="52" width="54" height="5" rx="2.5" className="sp__cell" style={k(n + 2)} />
        </g>
      ))}
      {/* AI scan */}
      <g transform="translate(180 46)">
        <rect width="78" height="88" rx="14" className="sp__core" />
        <rect x="6" y="6" width="66" height="10" rx="5" className="sp__scan" />
        <text x="39" y="52" textAnchor="middle" className="sp__glyph">AI</text>
      </g>
      {/* score */}
      <g transform="translate(362 90)">
        <circle r="38" className="sp__track" />
        <circle r="38" className="sp__arc" pathLength="100" />
        {[14, 24, 34].map((h, i) => (
          <rect key={i} x={-19 + i * 14} y={16 - h} width="10" height={h} rx="3" className="sp__rise" style={k(i)} />
        ))}
      </g>
      {/* recruiter */}
      <g transform="translate(496 90)">
        <circle r="30" className="sp__panel" />
        <circle cy="-8" r="8" className="sp__palm" />
        <path d="M-15 18c2-12 8-16 15-16s13 4 15 16" className="sp__bone" />
        <circle cx="22" cy="-22" r="9" className="sp__ok" />
        <path d="m17.5 -22 3 3 5-6" className="sp__tick" />
      </g>
      <g className="cnn__labels">
        <text x="72" y="180" textAnchor="middle">Resumes + JD</text>
        <text x="219" y="180" textAnchor="middle">AI analysis</text>
        <text x="362" y="180" textAnchor="middle">Score</text>
        <text x="496" y="180" textAnchor="middle">Recruiter</text>
      </g>
    </svg>
  )
}

/**
 * GLSL for the universe. Colours are authored as display (sRGB) values and
 * written straight to the framebuffer, so no colour-space chunk is included.
 */

const noise3 = /* glsl */ `
float hash31(vec3 p){ p = fract(p*0.3183099+.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vnoise3(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash31(i+vec3(0,0,0)),hash31(i+vec3(1,0,0)),f.x),
                 mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),
                 mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm3(vec3 p){
  float a = .5; float s = 0.;
  for(int i=0;i<4;i++){ s += a*vnoise3(p); p = p*2.03+vec3(1.7,9.2,3.1); a *= .5; }
  return s;
}
`

/* ---------- Nebula (full-screen backdrop) ---------- */
export const nebulaVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }
`
export const nebulaFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime; uniform vec2 uRes; uniform float uScroll; uniform vec2 uPointer;
float hash21(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x), mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x), f.y);
}
float fbm(vec2 p){
  float a=.5, s=0.;
  for(int i=0;i<OCTAVES;i++){ s += a*vnoise(p); p = p*2.02+vec2(5.2,1.3); a*=.5; }
  return s;
}
void main(){
  vec2 uv = vUv*2.0-1.0; uv.x *= uRes.x/uRes.y;
  vec2 p = uv*0.85 + uPointer*0.04 + vec2(0.0, uScroll*1.6);
  float t = uTime*0.010;
  float n1 = fbm(p*1.25 + vec2(t,-t));
  float n2 = fbm(p*2.3 - vec2(t*1.6,0.0) + n1*1.6);
  float ridge = 1.0 - abs(n2*2.0-1.0);
  float pinkAmt = .30 + .18*sin(uScroll*8.0);
  vec3 col = vec3(.012,.010,.036);
  col += vec3(.060,.055,.250) * smoothstep(.28,.85,n1);
  col += vec3(.210,.095,.420) * pow(ridge,3.0) * smoothstep(.30,.80,n1) * .85;
  col += vec3(.450,.160,.400) * pow(ridge,6.0) * smoothstep(.45,.90,n2) * pinkAmt;
  col += vec3(.060,.200,.380) * smoothstep(.55,.92,fbm(p*.7+vec2(5.0,2.0))) * .38;
  float v = smoothstep(1.7,.15,length(uv*vec2(.7,1.0)));
  col *= .50 + .50*v;
  gl_FragColor = vec4(col,1.0);
}
`

/* ---------- Stars ---------- */
export const starVert = /* glsl */ `
attribute float aSize; attribute float aPhase; attribute vec3 aColor;
uniform float uTravel; uniform float uTime; uniform float uPR; uniform float uDepth;
varying float vAlpha; varying vec3 vColor;
void main(){
  vec3 p = position;
  p.z = mod(p.z + uTravel, uDepth) - uDepth;
  vec4 mv = modelViewMatrix * vec4(p,1.0);
  gl_Position = projectionMatrix * mv;
  float tw = .72 + .28*sin(uTime*(.8+aPhase*1.6) + aPhase*40.0);
  float fade = smoothstep(0.0,8.0,-p.z) * smoothstep(uDepth,uDepth*.75,-p.z);
  vAlpha = tw*fade; vColor = aColor;
  gl_PointSize = clamp(aSize*uPR*(46.0/-mv.z), 1.0*uPR, 7.0*uPR);
}
`
export const starFrag = /* glsl */ `
precision mediump float;
varying float vAlpha; varying vec3 vColor;
void main(){
  float d = length(gl_PointCoord-.5);
  float a = pow(smoothstep(.5,.0,d),1.7);
  gl_FragColor = vec4(vColor, a*vAlpha);
}
`

/* ---------- Warp streaks (cinematic intro) ---------- */
export const warpVert = /* glsl */ `
attribute float aEnd; attribute float aSeed;
uniform float uTravel; uniform float uWarp; uniform float uDepth;
varying float vAlpha;
void main(){
  vec3 p = position;
  p.z = mod(p.z + uTravel, uDepth) - uDepth;
  p.z -= aEnd * uWarp * (8.0 + aSeed*34.0);
  vAlpha = uWarp * (1.0 - aEnd*.9) * smoothstep(0.0,14.0,-p.z) * (.35+.65*aSeed);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
}
`
export const warpFrag = /* glsl */ `
precision mediump float;
varying float vAlpha;
void main(){ gl_FragColor = vec4(.74,.78,1.0, vAlpha); }
`

/* ---------- Planet ---------- */
export const planetVert = /* glsl */ `
varying vec3 vObj; varying vec3 vN; varying vec3 vV;
void main(){
  vObj = position;
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vV = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`
export const planetFrag = /* glsl */ `
precision highp float;
varying vec3 vObj; varying vec3 vN; varying vec3 vV;
uniform float uTime; uniform float uDim;
${noise3}
void main(){
  vec3 p = normalize(vObj);
  float w = fbm3(p*2.2 + vec3(0.0,uTime*.015,0.0));
  float lat = p.y*5.0 + w*1.7;
  float b1 = sin(lat*3.1)*.5+.5;
  float b2 = sin(lat*9.0 + w*4.0)*.5+.5;
  float storm = smoothstep(.60,.78,fbm3(p*4.5+3.0));
  float blush = smoothstep(.62,.95,fbm3(p*2.8+7.0));
  vec3 c1 = vec3(.075,.07,.27);
  vec3 c2 = vec3(.36,.24,.76);
  vec3 c3 = vec3(.78,.72,1.0);
  vec3 c4 = vec3(.95,.66,.86);
  vec3 col = mix(c1,c2,b1);
  col = mix(col,c3,b2*.34*smoothstep(.3,.9,b1));
  col = mix(col,c4,storm*.40 + blush*.22);
  vec3 n = normalize(vN);
  vec3 L = normalize(vec3(-.72,.42,.62));
  float ndl = dot(n,L);
  float diff = smoothstep(-.18,.95,ndl);
  float rim = pow(1.0-max(dot(n,normalize(vV)),0.0),3.0);
  vec3 lit = col*(.05 + diff*1.05);
  lit += vec3(.42,.62,1.0)*rim*(.12 + .55*smoothstep(-.35,.6,ndl));
  gl_FragColor = vec4(lit*uDim,1.0);
}
`

export const atmoVert = /* glsl */ `
varying vec3 vN; varying vec3 vV;
void main(){
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vV = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`
export const atmoFrag = /* glsl */ `
precision mediump float;
varying vec3 vN; varying vec3 vV; uniform float uDim;
void main(){
  float f = 1.0 - max(dot(normalize(vN), normalize(vV)), 0.0);
  float a = pow(f, 4.5);
  float lit = smoothstep(-.6,.7,dot(normalize(vN), normalize(vec3(-.72,.42,.62))));
  gl_FragColor = vec4(vec3(.5,.58,1.0)*uDim, a*(.2+.8*lit)*.55);
}
`

export const ringVert = /* glsl */ `
varying vec3 vP;
void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`
export const ringFrag = /* glsl */ `
precision mediump float;
varying vec3 vP; uniform float uDim; uniform float uInner; uniform float uOuter;
float h(float x){ return fract(sin(x*127.1)*43758.5453); }
float n1(float x){ float i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f); return mix(h(i),h(i+1.0),f); }
void main(){
  float r = length(vP.xy);
  float t = (r-uInner)/(uOuter-uInner);
  float bands = n1(r*34.0)*.6 + n1(r*91.0)*.4;
  float gap = smoothstep(.0,.05,abs(t-.63)-.035);
  float a = smoothstep(.0,.07,t)*smoothstep(1.0,.86,t)*(.22+.78*bands)*gap;
  vec3 col = mix(vec3(.58,.5,.88), vec3(.93,.88,1.0), bands);
  gl_FragColor = vec4(col*uDim, a*.72);
}
`

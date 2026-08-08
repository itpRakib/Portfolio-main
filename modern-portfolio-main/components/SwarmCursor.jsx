import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Geometry, Triangle, RenderTarget } from '../lib/ogl';

const FIELD_VERT = `
precision highp float;
attribute vec2 position;
attribute vec2 aLocal;
attribute float aWeight;
uniform vec2 uRes;
varying vec2 vLocal;
varying float vWeight;

void main() {
  vLocal = aLocal;
  vWeight = aWeight;
  vec2 clip = (position / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`;

const FIELD_FRAG = `
precision highp float;
varying vec2 vLocal;
varying float vWeight;

void main() {
  float d = length(vLocal);
  float a = exp(-d * d * 3.6) * vWeight;
  gl_FragColor = vec4(a, a, a, a);
}
`;

const SCREEN_VERT = `
precision highp float;
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const COMP_FRAG = `
precision highp float;
uniform sampler2D tField;
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uMerge;
uniform float uGlow;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  float f = texture2D(tField, vUv).r;

  float edge = uMerge * 0.3;
  float core = smoothstep(uMerge - edge, uMerge + edge, f);
  float halo = smoothstep(uMerge * 0.12, uMerge, f);

  vec3 col = mix(uColor, uAccent, clamp(f / max(uMerge * 2.4, 0.001), 0.0, 1.0));

  float alpha = (core + halo * uGlow * (1.0 - core)) * uOpacity;
  if (alpha <= 0.002) discard;
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
`;

const hexToRgb = hex => {
  let h = (hex || '').replace('#', '').trim();
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  const n = parseInt(h || '000000', 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const buildPerm = () => {
  const src = new Uint8Array(256);
  for (let i = 0; i < 256; i++) src[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const t = src[i];
    src[i] = src[j];
    src[j] = t;
  }
  const perm = new Uint16Array(512);
  for (let i = 0; i < 512; i++) perm[i] = src[i & 255];
  return perm;
};

const smoothFade = t => t * t * t * (t * (t * 6 - 15) + 10);

const gradDot = (h, x, y, z) => {
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
};

const noise3 = (perm, x, y, z) => {
  const fx = Math.floor(x);
  const fy = Math.floor(y);
  const fz = Math.floor(z);
  const X = fx & 255;
  const Y = fy & 255;
  const Z = fz & 255;
  const rx = x - fx;
  const ry = y - fy;
  const rz = z - fz;
  const u = smoothFade(rx);
  const v = smoothFade(ry);
  const w = smoothFade(rz);

  const A = perm[X] + Y;
  const AA = perm[A & 511] + Z;
  const AB = perm[(A + 1) & 511] + Z;
  const B = perm[(X + 1) & 511] + Y;
  const BA = perm[B & 511] + Z;
  const BB = perm[(B + 1) & 511] + Z;

  const g000 = gradDot(perm[AA & 511] & 15, rx, ry, rz);
  const g100 = gradDot(perm[BA & 511] & 15, rx - 1, ry, rz);
  const g010 = gradDot(perm[AB & 511] & 15, rx, ry - 1, rz);
  const g110 = gradDot(perm[BB & 511] & 15, rx - 1, ry - 1, rz);
  const g001 = gradDot(perm[(AA + 1) & 511] & 15, rx, ry, rz - 1);
  const g101 = gradDot(perm[(BA + 1) & 511] & 15, rx - 1, ry, rz - 1);
  const g011 = gradDot(perm[(AB + 1) & 511] & 15, rx, ry - 1, rz - 1);
  const g111 = gradDot(perm[(BB + 1) & 511] & 15, rx - 1, ry - 1, rz - 1);

  const x00 = g000 + u * (g100 - g000);
  const x10 = g010 + u * (g110 - g010);
  const x01 = g001 + u * (g101 - g001);
  const x11 = g011 + u * (g111 - g011);
  const y0 = x00 + v * (x10 - x00);
  const y1 = x01 + v * (x11 - x01);
  return y0 + w * (y1 - y0);
};

// SwarmCursor effect disabled per user request
const SwarmCursor = () => null;

export default SwarmCursor;

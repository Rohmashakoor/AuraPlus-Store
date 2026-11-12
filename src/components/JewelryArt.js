'use client';

import { useId } from 'react';

/**
 * Drawn placeholder shown whenever a product photo is missing.
 * It is driven by `product.placeholder` in src/data/products.js.
 */

const TONES = {
  yellow: ['#FBE5B0', '#E8B25A', '#B8802F'],
  rose: ['#FBDCCF', '#E8AC9A', '#B9705F'],
  silver: ['#FFFFFF', '#CFD0E0', '#8F90A9'],
};

const GEMS = {
  diamond: ['#FFFFFF', '#DCE4F5', '#AEBBDD'],
  ruby: ['#F2909F', '#C94662', '#7E1F3A'],
};

/** A faceted stone, centred on (cx, cy) with half-width s. Returns SVG markup. */
export function gemSvg(cx, cy, s, g) {
  const p = (x, y) => `${(cx + x * s).toFixed(1)},${(cy + y * s).toFixed(1)}`;
  return (
    '<g>' +
    `<polygon points="${p(-1, 0)} ${p(-0.55, -0.6)} ${p(0.55, -0.6)} ${p(1, 0)}" fill="${g[0]}"/>` +
    `<polygon points="${p(-1, 0)} ${p(1, 0)} ${p(0, 0.95)}" fill="${g[1]}"/>` +
    `<polygon points="${p(-1, 0)} ${p(-0.25, 0)} ${p(0, 0.95)}" fill="${g[2]}" opacity=".5"/>` +
    `<polygon points="${p(1, 0)} ${p(0.25, 0)} ${p(0, 0.95)}" fill="${g[2]}" opacity=".32"/>` +
    `<polygon points="${p(-0.55, -0.6)} ${p(-0.25, 0)} ${p(0, -0.6)}" fill="#fff" opacity=".55"/>` +
    `<polyline points="${p(-0.55, -0.6)} ${p(-0.25, 0)} ${p(0, -0.6)} ${p(0.25, 0)} ${p(0.55, -0.6)}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1"/>` +
    `<polygon points="${p(-1, 0)} ${p(-0.55, -0.6)} ${p(0.55, -0.6)} ${p(1, 0)} ${p(0, 0.95)}" fill="none" stroke="${g[2]}" stroke-opacity=".6" stroke-width="1"/>` +
    '</g>'
  );
}

export default function JewelryArt({ kind, gem = 'diamond', tone = 'yellow', label = '', className = '' }) {
  const id = 'g' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const m = TONES[tone] || TONES.yellow;
  const g = GEMS[gem] || GEMS.diamond;
  const F = `url(#${id})`;
  const P = `url(#${id}p)`;
  const line = m[1];

  const defs =
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${m[0]}"/><stop offset=".5" stop-color="${m[1]}"/><stop offset="1" stop-color="${m[2]}"/></linearGradient>` +
    `<radialGradient id="${id}p" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#F3E6E4"/><stop offset="1" stop-color="#CDB8B9"/></radialGradient></defs>`;

  const chain = (sw, dash) =>
    `<path d="M78 70 C 92 300 308 300 322 70" fill="none" stroke="${F}" stroke-width="${sw}" stroke-dasharray="${dash}" stroke-linecap="round"/>` +
    `<circle cx="78" cy="70" r="6" fill="${F}"/><circle cx="322" cy="70" r="6" fill="${F}"/>` +
    `<circle cx="200" cy="247" r="6" fill="none" stroke="${F}" stroke-width="3"/>`;

  const drop = (x) =>
    `<circle cx="${x}" cy="126" r="9" fill="${F}"/>` +
    `<line x1="${x}" y1="134" x2="${x}" y2="176" stroke="${line}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M${x} 170 C ${x - 34} 216 ${x - 36} 286 ${x} 292 C ${x + 36} 286 ${x + 34} 216 ${x} 170Z" fill="${F}"/>` +
    gemSvg(x, 238, 17, g);

  const hoop = (x) =>
    `<circle cx="${x}" cy="212" r="56" fill="none" stroke="${F}" stroke-width="8"/>` +
    `<circle cx="${x}" cy="282" r="19" fill="${P}"/>` +
    `<circle cx="${x - 6}" cy="276" r="4.5" fill="#fff" opacity=".8"/>`;

  const beads = (shape, w1, w2, len) =>
    shape.replace('/>', ` pathLength="${len}" fill="none" stroke="${g[2]}" stroke-width="${w1}" stroke-dasharray="0.01 1" stroke-linecap="round"/>`) +
    shape.replace('/>', ` pathLength="${len}" fill="none" stroke="${g[0]}" stroke-width="${w2}" stroke-dasharray="0.01 1" stroke-linecap="round"/>`);

  let body = '';
  switch (kind) {
    case 'solitaire':
      body =
        `<circle cx="200" cy="305" r="92" fill="none" stroke="${F}" stroke-width="18"/>` +
        `<circle cx="200" cy="305" r="83" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>` +
        `<polygon points="172,196 228,196 214,224 186,224" fill="${F}"/>` +
        gemSvg(200, 176, 40, g);
      break;
    case 'pave':
      body =
        `<circle cx="200" cy="290" r="96" fill="none" stroke="${F}" stroke-width="24"/>` +
        beads('<circle cx="200" cy="290" r="96"/>', 12, 9, 36);
      break;
    case 'drop':
      body =
        chain(5, '9 3.5') +
        `<path d="M200 256 C 172 296 168 346 200 350 C 232 346 228 296 200 256Z" fill="${F}"/>` +
        gemSvg(200, 312, 15, g);
      break;
    case 'coin':
      body =
        chain(4, '5 3') +
        `<circle cx="200" cy="288" r="30" fill="${F}"/>` +
        `<circle cx="200" cy="288" r="23" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/>` +
        gemSvg(200, 284, 10, g);
      break;
    case 'tennis':
      body =
        `<ellipse cx="200" cy="255" rx="140" ry="88" fill="none" stroke="${F}" stroke-width="16"/>` +
        beads('<ellipse cx="200" cy="255" rx="140" ry="88"/>', 13, 10, 40) +
        `<rect x="328" y="239" width="26" height="32" rx="6" fill="${F}"/>`;
      break;
    case 'bangle':
      body =
        `<ellipse cx="200" cy="255" rx="138" ry="96" fill="none" stroke="${F}" stroke-width="26"/>` +
        `<ellipse cx="200" cy="255" rx="132" ry="90" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>` +
        gemSvg(200, 150, 17, g);
      break;
    case 'drops':
      body = drop(125) + drop(275);
      break;
    case 'hoops':
      body = hoop(125) + hoop(275);
      break;
    default:
      body = '';
  }

  return (
    <svg
      className={`block h-full w-full ${className}`}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: `${defs}<g class="obj">${body}</g>` }}
    />
  );
}

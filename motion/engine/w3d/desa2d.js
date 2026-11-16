// Dunia 2D akun Kades Magang Juara (gaya ilustrasi "premium"): peta desa dari atas (sudut miring), SVG berlapis,
// palet kalem (hijau zaitun, sungai teal, tepian cokelat), gradasi + bayangan lembut, tanpa garis tepi tebal.
// Kamera geser + zoom pelan. Tanpa WebGL. Semua id gradien diberi awalan unik per shot.
import { clamp, lerp, seg, E } from './kit.js';

let X, UID = 0;
const PANEL = '#15352A', CREAM = '#F4EBD3', GOLD = '#E8B94A', PALE = '#A9C79A', INK = '#1E3A2B';
const at = (s, rx, fb) => X.C(s, rx, fb);
const rng = seed => () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

// ---------- gradien bersama ----------
function defsFor(p) {
  const lg = (id, a, b, x2 = 0, y2 = 1) => `<linearGradient id="${p}${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const rg = (id, a, b, ao = 1, bo = 0) => `<radialGradient id="${p}${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${a}" stop-opacity="${ao}"/><stop offset="1" stop-color="${b}" stop-opacity="${bo}"/></radialGradient>`;
  return `<defs>${lg('grass', '#98BF55', '#6E9A3B')}${lg('gdark', '#7FA844', '#5B8631')}${lg('river', '#63B2BF', '#3F8497')}${lg('riverL', '#9ED6DA', '#5FB0BE')}
  ${lg('plaza', '#D9BC86', '#BE9A62')}${lg('field', '#A6CD5E', '#86B047')}${lg('wallA', '#F3E8CE', '#D9C9A3')}${lg('wallB', '#DDD8C6', '#B9B4A0')}${lg('wallC', '#EBD7AE', '#CDB486')}
  ${lg('roofA', '#C47A4A', '#8F4B2C')}${lg('roofB', '#8797A3', '#5A6B78')}${lg('roofC', '#A57448', '#744A2E')}${lg('shut', '#4C8C80', '#2F6A66')}${lg('glow', '#FFE9A8', '#F4B95A')}
  ${lg('trunk', '#8B6440', '#5E4128')}${lg('door', '#8A5A35', '#5E3C22')}${lg('khaki', '#E2D2A8', '#BFAE82', 1, 0)}${lg('pants', '#5D6046', '#43452F', 1, 0)}${lg('cap', '#34302E', '#0E0D0D')}${lg('wood', '#9A7248', '#6E4C2E')}
  ${rg('canopy', '#8DC463', '#3F7A32', 1, 1)}${rg('canopy2', '#A5D26E', '#4E8B38', 1, 1)}${rg('shadow', '#000', '#000', .38, 0)}${rg('skin', '#EDB886', '#B67A50', 1, 1)}${rg('bushF', '#E58BA2', '#C9667F', 1, 1)}
  ${rg('sun', '#FFF2C0', '#FFF2C0', .55, 0)}
  <radialGradient id="${p}vig" cx=".5" cy=".46" r=".78"><stop offset=".55" stop-color="#0B1F14" stop-opacity="0"/><stop offset="1" stop-color="#0B1F14" stop-opacity=".62"/></radialGradient>
  <linearGradient id="${p}grade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE3A0" stop-opacity=".16"/><stop offset=".6" stop-color="#FFE3A0" stop-opacity="0"/><stop offset="1" stop-color="#0B2A2A" stop-opacity=".18"/></linearGradient></defs>`;
}
const SH = (p, rx, ry, x = 0, y = 0, o = 1) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${p}shadow)" opacity="${o}"/>`;

// ---------- benda ----------
function house(p, x, y, w, k = 'A', lit = true, extra = '') {
  const wall = { A: 'wallA', B: 'wallB', C: 'wallC' }[k], roof = { A: 'roofA', B: 'roofB', C: 'roofC' }[k], h = w * .46, rh = w * .62, tl = [];
  for (let i = 1; i < 6; i++) tl.push(`<line x1="${-w * .6 + i * 1.6}" y1="${-h - rh * i / 6}" x2="${w * .6 - i * 1.6}" y2="${-h - rh * i / 6}" stroke="#000" stroke-opacity=".14" stroke-width="2"/>`);
  const win = sx => `<g transform="translate(${sx} ${-h * .78})"><rect x="-6" y="-6" width="${w * .26 + 12}" height="${w * .21 + 12}" rx="3" fill="url(#${p}shut)"/><rect width="${w * .26}" height="${w * .21}" fill="url(#${p}${lit ? 'glow' : 'wallB'})"/><line x1="${w * .13}" y1="0" x2="${w * .13}" y2="${w * .21}" stroke="#7A5A32" stroke-width="2"/><line x1="0" y1="${w * .105}" x2="${w * .26}" y2="${w * .105}" stroke="#7A5A32" stroke-width="2"/></g>`;
  return `<g transform="translate(${x} ${y})" ${extra}>
  <polygon points="${-w / 2},0 ${w / 2},0 ${w / 2 + w * .5},${w * .2} ${-w / 2 + w * .5},${w * .2}" fill="#0B1F14" opacity=".24"/>
  <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="url(#${p}${wall})"/><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h * .22}" fill="#000" opacity=".16"/>
  ${win(-w * .38)}${win(w * .12)}<rect x="${-w * .07}" y="${-h * .72}" width="${w * .14}" height="${h * .72}" rx="2" fill="url(#${p}door)"/><circle cx="${w * .045}" cy="${-h * .34}" r="2.4" fill="#E8C766"/>
  <rect x="${-w * .13}" y="0" width="${w * .26}" height="5" fill="#B9B4A0"/>
  <polygon points="${-w * .6},${-h} ${-w * .42},${-h - rh} ${w * .42},${-h - rh} ${w * .6},${-h}" fill="url(#${p}${roof})"/>${tl.join('')}
  <polygon points="${-w * .6},${-h} ${w * .6},${-h} ${w * .6 - 2},${-h + 6} ${-w * .6 + 2},${-h + 6}" fill="#000" opacity=".3"/>
  <line x1="${-w * .42}" y1="${-h - rh}" x2="${w * .42}" y2="${-h - rh}" stroke="#fff" stroke-opacity=".3" stroke-width="3"/></g>`;
}
function fence(x, y, n, s = 1) { let g = `<g transform="translate(${x} ${y}) scale(${s})"><line x1="0" y1="-14" x2="${n * 22}" y2="-14" stroke="#B48A55" stroke-width="3"/><line x1="0" y1="-26" x2="${n * 22}" y2="-26" stroke="#B48A55" stroke-width="3"/>`; for (let i = 0; i <= n; i++) g += `<rect x="${i * 22 - 3}" y="-34" width="6" height="34" rx="2" fill="#C49A62"/>`; return g + '</g>' }
function bush(p, x, y, s = 1, flowers = true) { return `<g transform="translate(${x} ${y}) scale(${s})">${SH(p, 46, 14, 8, 8)}<circle cx="-16" cy="-14" r="24" fill="url(#${p}canopy)"/><circle cx="16" cy="-16" r="26" fill="url(#${p}canopy)"/><circle cx="0" cy="-30" r="22" fill="url(#${p}canopy2)"/>${flowers ? '<circle cx="-18" cy="-26" r="4" fill="#F0A0B4"/><circle cx="12" cy="-36" r="4" fill="#F0A0B4"/><circle cx="20" cy="-14" r="3.5" fill="#F7D0DA"/>' : ''}</g>` }
function tree(p, x, y, s = 1) { return `<g transform="translate(${x} ${y}) scale(${s})">${SH(p, 80, 26, 26, 6, .9)}<rect x="-9" y="-70" width="18" height="72" fill="url(#${p}trunk)"/><circle cx="-34" cy="-96" r="46" fill="url(#${p}canopy)"/><circle cx="38" cy="-98" r="48" fill="url(#${p}canopy)"/><circle cx="0" cy="-128" r="56" fill="url(#${p}canopy2)"/><circle cx="-14" cy="-148" r="24" fill="#B7DB84" opacity=".5"/></g>` }
function palm(p, x, y, s = 1) { let f = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + .2; f += `<path d="M0 -150 Q ${Math.cos(a) * 60} ${-150 - 40 + Math.sin(a) * 18} ${Math.cos(a) * 112} ${-150 + Math.sin(a) * 40 + 20}" fill="none" stroke="${i % 2 ? '#3F7F3A' : '#57934A'}" stroke-width="14" stroke-linecap="round"/>` } return `<g transform="translate(${x} ${y}) scale(${s})">${SH(p, 60, 16, 24, 6)}<path d="M0 0 Q 16 -70 4 -150" fill="none" stroke="url(#${p}trunk)" stroke-width="16" stroke-linecap="round"/>${f}</g>` }
function bamboo(p, x, y) { let g = `<g transform="translate(${x} ${y})">${SH(p, 70, 18, 10, 6)}`; for (let i = 0; i < 9; i++) g += `<rect x="${-44 + i * 11}" y="${-210 + (i % 3) * 14}" width="7" height="${210 - (i % 3) * 14}" fill="#D9B85A"/><rect x="${-44 + i * 11}" y="${-120 + (i % 2) * 20}" width="7" height="3" fill="#8F7A2E"/>`; return g + '</g>' }
function tent(p, x, y, c1, c2) { return `<g transform="translate(${x} ${y})">${SH(p, 90, 22, 22, 8)}<polygon points="-72,0 0,-104 72,0" fill="${c1}"/><polygon points="0,-104 72,0 0,0" fill="${c2}"/><polygon points="-18,0 0,-50 18,0" fill="#241810" opacity=".85"/><line x1="0" y1="-104" x2="0" y2="0" stroke="#000" stroke-opacity=".2" stroke-width="2"/></g>` }
function well(p) { return `<g id="${p}well">${SH(p, 100, 26, 18, 10)}<ellipse cx="0" cy="-8" rx="66" ry="22" fill="#9AA2AA"/><rect x="-66" y="-62" width="132" height="54" fill="#B5BDC4"/><ellipse cx="0" cy="-62" rx="66" ry="22" fill="#C9D0D6"/><ellipse cx="0" cy="-62" rx="50" ry="15" fill="#3F8FB0"/><ellipse cx="-10" cy="-65" rx="20" ry="5" fill="#9ED6DA" opacity=".7"/>
  <rect x="-70" y="-156" width="9" height="96" fill="url(#${p}wood)"/><rect x="61" y="-156" width="9" height="96" fill="url(#${p}wood)"/><polygon points="-92,-150 0,-218 92,-150" fill="url(#${p}roofA)"/><line x1="-80" y1="-154" x2="80" y2="-154" stroke="#000" stroke-opacity=".2" stroke-width="4"/></g>` }
function villager(p, x, y, s, shirt, id = '', extra = '', hat = true) {
  return `<g transform="translate(${x} ${y}) scale(${s})" ${id ? `id="${id}"` : ''}>${SH(p, 40, 10, 6, 4)}<rect x="-17" y="-70" width="13" height="70" rx="6" fill="#3F4A5A"/><rect x="4" y="-70" width="13" height="70" rx="6" fill="#3F4A5A"/>
  <rect x="-24" y="-142" width="48" height="76" rx="18" fill="${shirt}"/><rect x="-24" y="-142" width="48" height="76" rx="18" fill="#000" opacity=".12"/><rect x="-24" y="-142" width="24" height="76" rx="18" fill="#fff" opacity=".1"/>
  <circle cx="0" cy="-166" r="24" fill="url(#${p}skin)"/>${hat ? `<path d="M-38 -172 L0 -206 L38 -172 Q0 -162 -38 -172Z" fill="#D9B85A"/><path d="M-38 -172 Q0 -162 38 -172 L36 -168 Q0 -158 -36 -168Z" fill="#000" opacity=".2"/>` : '<path d="M-24 -170 Q0 -196 24 -170 Q0 -182 -24 -170Z" fill="#2A1A10"/>'}<circle cx="-8" cy="-164" r="2.4" fill="#2A1A10"/><circle cx="8" cy="-164" r="2.4" fill="#2A1A10"/>${extra}</g>`;
}
function kades(p, x, y, s, id) {   // Pak Kades: lengan kanan layar = id+'armR' (melambai)
  const arm = (side, aid) => { const sx = side * 70; return `<g id="${id}${aid}" transform="rotate(${side * -8} ${sx} -300)"><rect x="${sx - 19}" y="-306" width="38" height="92" rx="18" fill="url(#${p}khaki)"/><rect x="${sx - 17}" y="-232" width="34" height="86" rx="15" fill="url(#${p}skin)"/><circle cx="${sx}" cy="-142" r="21" fill="url(#${p}skin)"/><rect x="${sx - 20}" y="-232" width="40" height="8" fill="#000" opacity=".18"/></g>` };
  return `<g id="${id}K" transform="translate(${x} ${y}) scale(${s})">${SH(p, 120, 26, 14, 8)}
  <rect x="-46" y="-176" width="40" height="172" rx="12" fill="url(#${p}pants)"/><rect x="6" y="-176" width="40" height="172" rx="12" fill="url(#${p}pants)"/><line x1="-26" y1="-120" x2="-26" y2="-14" stroke="#000" stroke-opacity=".18" stroke-width="3"/><line x1="26" y1="-120" x2="26" y2="-14" stroke="#000" stroke-opacity=".18" stroke-width="3"/>
  <path d="M-62 -2 Q-26 -22 -4 -4 L-4 8 L-62 8Z" fill="#241810"/><path d="M4 -4 Q26 -22 62 -2 L62 8 L4 8Z" fill="#241810"/><path d="M-54 -8 Q-30 -18 -10 -8" stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none"/>
  ${arm(-1, 'armL')}
  <path d="M-74 -296 Q-74 -334 -40 -338 L40 -338 Q74 -334 74 -296 L68 -150 L-68 -150Z" fill="url(#${p}khaki)"/><path d="M-74 -296 Q-74 -334 -40 -338 L-10 -338 L-14 -150 L-68 -150Z" fill="#fff" opacity=".12"/><path d="M74 -296 Q74 -334 40 -338 L20 -338 L24 -150 L68 -150Z" fill="#000" opacity=".1"/>
  <rect x="-68" y="-164" width="136" height="20" fill="#3B2F25"/><rect x="-12" y="-166" width="24" height="24" rx="4" fill="${GOLD}"/><rect x="-6" y="-160" width="12" height="12" rx="2" fill="#3B2F25"/>
  <line x1="0" y1="-330" x2="0" y2="-166" stroke="#000" stroke-opacity=".22" stroke-width="3"/>${[-290, -250, -210, -180].map(y => `<circle cx="9" cy="${y}" r="4.5" fill="#B49B5A"/>`).join('')}
  <path d="M-62 -300 L-18 -304 L-10 -338 L-40 -338Z" fill="#000" opacity=".12"/><rect x="-60" y="-306" width="30" height="8" rx="3" fill="${GOLD}"/><rect x="30" y="-306" width="30" height="8" rx="3" fill="${GOLD}"/>
  <rect x="-54" y="-268" width="36" height="34" rx="4" fill="#CDBD92"/><rect x="-54" y="-268" width="36" height="9" rx="3" fill="#B7A777"/><rect x="-46" y="-252" width="20" height="9" rx="2" fill="#F5F1E6"/>
  <path d="M-30 -340 L0 -318 L30 -340 L18 -352 L0 -338 L-18 -352Z" fill="#EFE6CC"/><path d="M-30 -340 L0 -318 L-8 -352Z" fill="#000" opacity=".08"/>
  <rect x="-15" y="-362" width="30" height="30" fill="#C48A5E"/>
  ${arm(1, 'armR')}
  <ellipse cx="-54" cy="-402" rx="9" ry="15" fill="#C48A5E"/><ellipse cx="54" cy="-402" rx="9" ry="15" fill="#C48A5E"/>
  <ellipse cx="0" cy="-400" rx="54" ry="62" fill="url(#${p}skin)"/><ellipse cx="-30" cy="-374" rx="14" ry="9" fill="#E58C7C" opacity=".35"/><ellipse cx="30" cy="-374" rx="14" ry="9" fill="#E58C7C" opacity=".35"/>
  <path d="M-58 -428 Q-56 -484 0 -486 Q56 -484 58 -428 Q0 -446 -58 -428Z" fill="url(#${p}cap)"/><rect x="-60" y="-440" width="120" height="17" rx="7" fill="#0E0D0D"/><path d="M-44 -462 Q-16 -480 16 -476" stroke="#fff" stroke-opacity=".28" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M-36 -420 Q-22 -428 -8 -420" stroke="#2A1A10" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8 -420 Q22 -428 36 -420" stroke="#2A1A10" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="-20" cy="-404" rx="8" ry="6" fill="#fff"/><ellipse cx="20" cy="-404" rx="8" ry="6" fill="#fff"/><circle cx="-19" cy="-404" r="4.6" fill="#2A1A10"/><circle cx="21" cy="-404" r="4.6" fill="#2A1A10"/><circle cx="-17.6" cy="-405.6" r="1.5" fill="#fff"/><circle cx="22.4" cy="-405.6" r="1.5" fill="#fff"/>
  <path d="M-3 -402 Q-8 -386 -2 -382" stroke="#9A6240" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M-30 -372 Q-14 -388 0 -378 Q14 -388 30 -372 Q14 -362 0 -366 Q-14 -362 -30 -372Z" fill="#1C120C"/><path d="M-14 -358 Q0 -350 14 -358" stroke="#8A3B2E" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>`;
}

// ---------- dunia ----------
const RIVER = 'M1000 -100 C 880 400, 1260 800, 1060 1300 S 900 2200, 1160 2900';
const ROAD = 'M120 2900 C 240 2400, 700 2120, 560 1560 S 300 900, 120 -100';
function world(p, o = {}) {
  const R = rng(7); let g = defsFor(p) + `<rect x="-300" y="-300" width="2200" height="3500" fill="url(#${p}grass)"/>`;
  for (let i = 0; i < 26; i++) g += `<ellipse cx="${R() * 1600}" cy="${R() * 2800}" rx="${180 + R() * 260}" ry="${120 + R() * 200}" fill="url(#${p}${i % 3 ? 'gdark' : 'grass'})" opacity="${.16 + R() * .16}"/>`;
  for (let i = 0; i < 160; i++) { const x = R() * 1600, y = R() * 2800, h = 10 + R() * 12; g += `<path d="M${x} ${y} l-5 -${h} M${x} ${y} l1 -${h + 4} M${x} ${y} l6 -${h - 2}" stroke="${i % 3 ? '#5B8A33' : '#B7D98A'}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/>` }
  // sawah (kiri atas), pola baris
  [[60, 350, 600, 430], [60, 830, 600, 380]].forEach(([x, y, w, h]) => { g += `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="6" fill="#D2B380"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${p}field)"/>`;
    for (let r = 0; r < h / 36; r++) g += `<rect x="${x}" y="${y + r * 36 + 6}" width="${w}" height="9" fill="#C3E07C" opacity=".5"/><line x1="${x}" y1="${y + r * 36 + 24}" x2="${x + w}" y2="${y + r * 36 + 24}" stroke="#3F6B2A" stroke-opacity=".55" stroke-width="5" stroke-dasharray="3 13"/>` });
  // sungai
  g += `<path d="${RIVER}" fill="none" stroke="#5E4128" stroke-width="316" stroke-linecap="round"/><path d="${RIVER}" fill="none" stroke="#8A6841" stroke-width="288" stroke-linecap="round"/><path d="${RIVER}" fill="none" stroke="url(#${p}river)" stroke-width="250" stroke-linecap="round"/>
  <path d="${RIVER}" fill="none" stroke="url(#${p}riverL)" stroke-opacity=".5" stroke-width="150" stroke-linecap="round"/>
  <path id="${p}rip" d="${RIVER}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-dasharray="34 170" stroke-linecap="round" transform="translate(-46 0)"/><path id="${p}rip2" d="${RIVER}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="4" stroke-dasharray="22 210" stroke-dashoffset="80" stroke-linecap="round" transform="translate(52 0)"/>`;
  for (let i = 0; i < 46; i++) { const y = -60 + i * 64, cx = [1000, 970, 1010, 1100, 1160, 1120, 1080, 1060, 1010, 960, 940, 960, 1010, 1060, 1100][Math.min(14, Math.floor(i / 3.2))] + (i % 2 ? 130 : -130) + R() * 14, rr = 6 + R() * 7; g += `<ellipse cx="${cx}" cy="${y}" rx="${rr * 1.3}" ry="${rr}" fill="#A9AFB2" opacity=".85"/>` }
  // jalan tanah
  g += `<path d="${ROAD}" fill="none" stroke="#6B4A2F" stroke-width="128" stroke-linecap="round"/><path d="${ROAD}" fill="none" stroke="#B88F5B" stroke-width="112" stroke-linecap="round"/><path d="${ROAD}" fill="none" stroke="#D2AC76" stroke-opacity=".6" stroke-width="64" stroke-linecap="round"/><path d="${ROAD}" fill="none" stroke="#8A6841" stroke-opacity=".5" stroke-width="3" stroke-dasharray="22 16" transform="translate(-22 0)"/><path d="${ROAD}" fill="none" stroke="#8A6841" stroke-opacity=".5" stroke-width="3" stroke-dasharray="22 16" transform="translate(22 0)"/>
  <ellipse cx="560" cy="1566" rx="290" ry="176" fill="#5E7F34" opacity=".35"/><ellipse cx="560" cy="1560" rx="262" ry="158" fill="#7A5A38"/><ellipse cx="560" cy="1560" rx="252" ry="150" fill="url(#${p}plaza)"/><ellipse cx="520" cy="1520" rx="150" ry="70" fill="#E9D4A6" opacity=".3"/><path d="M380 1580 q60 -18 120 0 M600 1520 q70 20 130 -4 M440 1630 q80 14 160 -6" stroke="#9A7A4C" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; g += `<ellipse cx="${560 + Math.cos(a) * 262}" cy="${1560 + Math.sin(a) * 158}" rx="7" ry="5" fill="#A9A08E"/>` }
  // benda terurut menurut y (kedalaman)
  const O = [];
  const add = (y, s) => O.push([y, s]);
  [[200, 230, 'A', 150], [470, 235, 'C', 140], [150, 1020, 'B', 150], [1380, 520, 'A', 150], [1430, 1060, 'C', 140], [1330, 1700, 'B', 150], [200, 1260, 'C', 130]].forEach(([x, y, k, w]) => add(y, house(p, x, y, w, k)));
  [[40, 640, 1.0], [700, 160, .8], [750, 700, .9], [1380, 330, .9], [1500, 880, 1.0], [60, 1650, 1.1], [1450, 1450, .9], [1280, 2150, 1.0], [1400, 2500, 1.1], [90, 2300, 1.0], [700, 2520, .9]].forEach(([x, y, s], i) => add(y, i % 3 ? tree(p, x, y, s) : palm(p, x, y, s)));
  [[360, 260], [560, 1000], [1300, 600], [640, 1230], [1260, 1850], [820, 2350]].forEach(([x, y], i) => add(y, bush(p, x, y, .9 + (i % 2) * .3, i % 2 === 0)));
  add(400, bamboo(p, 760, 420)); add(1480, `<g transform="translate(255 1380)"><rect x="-4" y="-260" width="8" height="260" fill="#D8D8D8"/><rect id="${p}flag" x="4" y="-260" width="84" height="26" fill="#D93B3B"/><rect x="4" y="-234" width="84" height="26" fill="#F4F4F4"/></g>`);
  add(235, fence(120, 262, 8)); add(1045, fence(70, 1050, 8));
  if (o.well) add(1470, `<g transform="translate(700 1470)">${well(p)}</g>`);
  if (o.tents) [[300, 1760, '#D9803F', '#B8622A'], [480, 1830, '#3E86B0', '#2C6788'], [650, 1775, '#E2B84D', '#BF9631'], [190, 1890, '#B84E7A', '#923A5E'], [740, 1900, '#6E9A5C', '#527A44']].forEach(([x, y, a, b]) => add(y, tent(p, x, y, a, b)));
  O.sort((a, b) => a[0] - b[0]); g += O.map(o2 => o2[1]).join('');
  g += `<ellipse cx="1240" cy="260" rx="520" ry="420" fill="url(#${p}sun)"/>`;
  if (o.dusk) g += `<rect x="-300" y="-300" width="2200" height="3500" fill="#E88A45" opacity=".26"/><rect x="-300" y="-300" width="2200" height="3500" fill="#2B2A5A" opacity=".08"/>`;
  return g;
}

function stage(root, p, html, cam0) {
  const holder = X.ab({ left: 0, top: 0, width: 1080, height: 1920 }, root);
  holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style="position:absolute;left:0;top:0">${html}</svg>
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style="position:absolute;left:0;top:0"><rect width="1080" height="1920" fill="url(#${p}grade)"/><rect width="1080" height="1920" fill="url(#${p}vig)"/></svg>`;
  const svg = holder.firstChild, $ = id => svg.querySelector('#' + id);
  const cam = (cx, cy, z) => svg.setAttribute('viewBox', `${cx - 540 / z} ${cy - 960 / z} ${1080 / z} ${1920 / z}`);
  cam(...cam0); return { svg, $, cam, p };
}

// ---------- UI ----------
const FONT = 'Poppins,Fredoka,sans-serif';
const card = (root, kick, title, css = {}) => X.ab(Object.assign({ background: 'rgba(21,53,42,.94)', color: CREAM, borderRadius: '18px', padding: '18px 30px 20px', fontFamily: FONT, fontWeight: 700, boxShadow: '0 14px 30px #0000005c', border: '1px solid #ffffff1c', opacity: 0 }, css), root,
  `${kick ? `<div style="font-size:21px;letter-spacing:4px;color:${PALE};font-weight:600;text-transform:uppercase;margin-bottom:6px">${kick}</div>` : ''}<div style="font-size:${css.tsize || 52}px;line-height:1.12">${title}</div><div style="width:54px;height:4px;background:${GOLD};margin-top:12px;border-radius:2px"></div>`);
const cream = (root, html, css = {}) => X.ab(Object.assign({ background: CREAM, color: INK, borderRadius: '18px', padding: '14px 28px', fontFamily: FONT, fontWeight: 700, fontSize: '38px', boxShadow: '0 14px 30px #0000005c', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
const comment = (root, user, text, top, left) => X.ab({ left, top, width: 700, background: '#FBF8F0', borderRadius: '22px', padding: '18px 26px', fontFamily: FONT, color: '#1E1E1E', boxShadow: '0 14px 30px #0000005c', opacity: 0 }, root,
  `<div style="display:flex;align-items:center;gap:16px"><div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(#C9D6E2,#9FB3C4);display:flex;align-items:center;justify-content:center;font-size:30px">👤</div><div><div style="font-size:23px;color:#7C7C7C;font-weight:600">${user} · komentar</div><div style="font-size:38px;font-weight:700;line-height:1.15">${text}</div></div></div>`);
const show = (e, p, rot = 0) => { const q = E.out(clamp(p)); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * 26}px) rotate(${rot * q}deg)` };
const wave = (S, id, t, on) => { const a = on ? 148 + Math.sin(t * 6.5) * 13 : 8; S.$(id + 'armR').setAttribute('transform', `rotate(${-a} 70 -300)`) };
const ambient = (S, t) => { const p = S.p; S.$(p + 'rip').setAttribute('stroke-dashoffset', -t * 70); S.$(p + 'rip2').setAttribute('stroke-dashoffset', 80 - t * 46); S.$(p + 'flag').setAttribute('height', 26 + Math.sin(t * 3.4) * 2.5) };
const ease = (t, dur) => E.inout(clamp(t / dur));
const noRender = { render() { } };

export async function setup(ctx) { X = ctx }

export const SHOTS = {
  K2_HOOK2(s, root) {
    const p = 'h' + (++UID) + '_'; const farmer = villager(p, 330, 700, 1.1, '#8A5A3C', p + 'fm', `<line x1="14" y1="-100" x2="52" y2="-10" stroke="#6E4C2E" stroke-width="5"/><path d="M48 -10 l16 2 l-6 10z" fill="#777"/>`);
    const S = stage(root, p, world(p, { well: true, tents: true }) + farmer + kades(p, 470, 1680, 1.1, p + 'k'), [820, 1150, 1.0]);
    const well = S.$(p + 'well'); const hook = card(root, 'HARI 2 · HASIL VOTING', `Kalian pilih <span style="color:#7FC4E8">B · sumur</span>!<div style="font-size:36px;color:${GOLD};margin-top:8px;font-weight:600">tapi ada masalah baru…</div>`, { left: 50, top: 420, width: 900 });
    return { ...noRender, upd(t, dur) { const q = ease(t, dur); S.cam(lerp(800, 600, q), lerp(1000, 1420, q), lerp(1.0, 1.08, q)); ambient(S, t); wave(S, p + 'k', t, t < 4.5);
      S.$(p + 'fm').setAttribute('transform', `translate(330 ${700 + Math.sin(t * 3) * 3}) scale(1.1)`); well.setAttribute('transform', `scale(${Math.max(.001, E.back(seg(t, .6, 1.3)))})`);
      show(hook, seg(t, .1, .55)); hook.style.opacity = E.out(seg(t, .1, .55)) * (1 - seg(t, 5.4, 5.9)) } };
  },
  K2_COMMENTS(s, root) {
    const p = 'c' + (++UID) + '_'; const S = stage(root, p, world(p, { tents: true }) + kades(p, 440, 1690, 1.5, p + 'k'), [620, 1400, 1.0]); const C = X.TL.vars.komentar;
    const cards = C.map(([u, tx], i) => comment(root, u, `“${tx}”`, 460 + i * 200, i ? 300 : 60));
    const note = cream(root, '📒 dicatat di buku desa', { left: 100, top: 900, fontSize: '34px', background: GOLD });
    return { ...noRender, upd(t, dur) { const q = ease(t, dur); S.cam(lerp(600, 680, q), 1400, lerp(1.0, 1.1, q)); ambient(S, t); wave(S, p + 'k', t, false); S.$(p + 'kK').setAttribute('transform', `translate(440 ${1690 + Math.sin(t * 2.1) * 3}) scale(1.5)`);
      const t1 = at(s, 'air', 1), t2 = at(s, 'rumah', 3.5); show(cards[1], seg(t, t1, t1 + .45), -2); show(cards[0], seg(t, t2, t2 + .45), 2); const tn = at(s, 'catat', dur - 2); show(note, seg(t, tn, tn + .45)) } };
  },
  K2_SUMUR(s, root) {
    const p = 's' + (++UID) + '_'; let q = ''; for (let i = 0; i < 4; i++) q += villager(p, 100, 1660, 1.05, ['#C65B4B', '#3E86B0', '#D8A84A', '#4E8B6A'][i], `${p}q${i}`, `<rect x="26" y="-96" width="24" height="26" rx="5" fill="${['#E5484D', '#3E86B0', '#F2C14E', '#2E9C6A'][i]}"/>`);
    let dr = ''; for (let i = 0; i < 24; i++) dr += `<circle id="${p}d${i}" r="8" fill="#9ED6EE" opacity="0"/>`;
    const rig = `<g id="${p}rig" transform="translate(700 1470)"><polygon points="-70,0 0,-270 70,0" fill="none" stroke="#4A4F55" stroke-width="12"/><rect id="${p}drill" x="-8" y="-250" width="16" height="240" fill="#2B2B2B"/></g>`;
    const S = stage(root, p, world(p, { well: true, tents: true }) + rig + dr + q, [700, 1480, 1.2]); const well = S.$(p + 'well');
    const c1 = card(root, 'SUMUR BOR', `💰 biaya sumur: ${X.TL.vars.juta_sumur} juta`, { left: 50, top: 420, width: 760, tsize: 42 }), c2 = card(root, '', `sisa anggaran: <span style="color:${GOLD}">${X.TL.vars.juta_sisa} juta</span>`, { left: 50, top: 600, width: 760, tsize: 42 }), c3 = card(root, '', '🪣 warga antre air bersih', { left: 50, top: 770, width: 760, tsize: 42 });
    return { ...noRender, upd(t, dur) { const tb = at(s, 'Biayanya', 3), ta = at(s, 'antre', dur - 3), built = seg(t, tb - 1, tb), z = ease(t, dur);
      S.cam(lerp(640, 700, z), 1500, lerp(1.1, 1.3, z)); ambient(S, t); S.$(p + 'rig').style.display = built < 1 ? '' : 'none'; S.$(p + 'drill').setAttribute('y', -250 + (t % 1) * 40);
      well.setAttribute('transform', `scale(${Math.max(.001, E.back(seg(t, tb - .3, tb + .3)))})`);
      for (let i = 0; i < 24; i++) { const k = (t * .9 + i / 24) % 1, d = S.$(p + 'd' + i); d.setAttribute('opacity', t > tb - .2 && t < tb + 2.5 ? .95 : 0); d.setAttribute('cx', 700 + Math.sin(i * 2.3) * k * 150); d.setAttribute('cy', 1400 - k * 230 + k * k * 270) }
      for (let i = 0; i < 4; i++) { const e = S.$(p + 'q' + i), x = lerp(100, 470 + i * 78, E.out(seg(t, ta - .4 + i * .25, ta + 1.2 + i * .25))); e.setAttribute('transform', `translate(${x} ${1660 + Math.sin(t * 3 + i) * 2.5}) scale(1.05)`); e.style.display = t > ta - .4 ? '' : 'none' }
      show(c1, seg(t, tb, tb + .45)); show(c2, seg(t, tb + .8, tb + 1.25)); show(c3, seg(t, ta, ta + .45)) } };
  },
  K2_FAMILIES(s, root) {
    const p = 'f' + (++UID) + '_'; let fam = ''; [[300, 1800], [480, 1870], [650, 1815], [190, 1930], [740, 1940]].forEach(([x, y], i) => fam += villager(p, x + 56, y + 14, 1, ['#3E86B0', '#C65B4B', '#B84E7A', '#6E9A5C', '#D8A84A'][i], `${p}p${i}`, '', false) + villager(p, x - 54, y + 22, .62, ['#C65B4B', '#3E86B0', '#6E9A5C', '#D8A84A', '#B84E7A'][i], '', '', false));
    let gh = ''; for (let i = 0; i < 5; i++) gh += house(p, 180 + i * 150, 1330, 130, 'A', true, `id="${p}g${i}" opacity="0"`);
    const S = stage(root, p, world(p, { well: true, tents: true, dusk: true }) + gh + fam, [560, 1500, 1.05]);
    const c1 = card(root, 'MASALAH BARU', '⛺ 5 keluarga masih di tenda', { left: 50, top: 420, width: 900, tsize: 44 }), c2 = card(root, '', '🏠 desa butuh rumah', { left: 50, top: 600, width: 640, tsize: 44 });
    return { ...noRender, upd(t, dur) { const z = ease(t, dur); S.cam(lerp(560, 600, z), lerp(1500, 1650, z), lerp(1.0, 0.96, z)); ambient(S, t);
      for (let i = 0; i < 5; i++) S.$(p + 'p' + i).style.transform = `translateY(${Math.sin(t * 1.5 + i) * -3}px)`;
      const tr = at(s, 'butuh', dur - 2.5); for (let i = 0; i < 5; i++) S.$(p + 'g' + i).setAttribute('opacity', E.out(seg(t, tr + i * .12, tr + .5 + i * .12)) * .6);
      show(c1, seg(t, at(s, 'tenda', 3), at(s, 'tenda', 3) + .45)); show(c2, seg(t, tr, tr + .45)) } };
  },
  K2_CHOICE(s, root) {
    const A = s.variant === 'A', p = (A ? 'a' : 'b') + (++UID) + '_'; const V = X.TL.vars; let hs = '';
    for (let i = 0; i < 5; i++) { const x = A ? 180 + i * 140 : 150 + i * 170, k = 'ABCAB'[i]; hs += house(p, x, 1330, A ? 140 : 130, k, true, `id="${p}h${i}"`);
      if (!A) hs += `<ellipse cx="${x}" cy="1352" rx="74" ry="20" fill="url(#${p}gdark)" opacity=".8"/>` + bush(p, x + 56, 1360, .55) }
    let fl = ''; if (A) for (let i = 0; i < 5; i++) fl += `<g id="${p}f${i}" transform="translate(${180 + i * 140} 1150)" opacity="0"><path d="M0 0 Q-34 -40 -10 -96 Q0 -60 16 -90 Q42 -40 0 0Z" fill="#E8761F"/><path d="M0 0 Q-18 -26 -2 -58 Q18 -28 0 0Z" fill="#FFD25A"/></g>`;
    const S = stage(root, p, world(p, {}) + hs + fl, [500, 1300, 1.0]);
    const big = X.ab({ left: 820, top: 420, width: 160, height: 160, borderRadius: '50%', background: A ? GOLD : '#3E86B0', color: A ? INK : '#fff', fontSize: '100px', fontFamily: FONT, fontWeight: 700, textAlign: 'center', lineHeight: '160px', boxShadow: '0 14px 30px #0000005c', opacity: 0 }, root, A ? 'A' : 'B');
    const L = A ? [[`💰 ${V.juta_a} juta · sisa ${V.juta_sisa_a} juta`, 'Biayanya', 0], ['📏 lahan hemat, rumah sempit', 'hemat', 0], ['🔥 api gampang merambat', 'merambat', 1]] : [[`💰 ${V.juta_b} juta · sisa ${V.juta_sisa_b} juta`, 'Biayanya', 0], ['🌳 ada halaman, lega & terang', 'lega', 0], ['🛡️ lebih aman', 'aman', 0]];
    const chips = L.map(([tx, cu, bad], i) => ({ cu, e: card(root, '', tx, { left: 50, top: 420 + i * 150, width: 740, tsize: 36, color: bad ? '#FFC2B4' : CREAM }) }));
    return { ...noRender, upd(t, dur) { show(big, seg(t, 0, .45)); const z = ease(t, dur); S.cam(lerp(A ? 440 : 600, A ? 520 : 480, z), 1280, A ? 1.12 : 1.0); ambient(S, t);
      for (let i = 0; i < 5; i++) { const h = S.$(p + 'h' + i); h.setAttribute('opacity', E.out(seg(t, .4 + i * .15, .8 + i * .15))) }
      if (A) { const tm = at(s, 'merambat', dur - 2); for (let i = 0; i < 5; i++) { const f = S.$(p + 'f' + i); f.setAttribute('opacity', t > tm + i * .35 ? 1 : 0); f.setAttribute('transform', `translate(${180 + i * 140} 1150) scale(1 ${1 + Math.sin(t * 14 + i) * .15})`) } }
      chips.forEach(c => { const tc = at(s, c.cu, 99); show(c.e, seg(t, tc, tc + .45)) }) } };
  },
  K2_VOTE(s, root) {
    const p = 'v' + (++UID) + '_'; const S = stage(root, p, world(p, { well: true, tents: true }) + kades(p, 500, 1700, 1.5, p + 'k'), [560, 1450, 1.0]);
    const mk = (l, sub, bg, c) => `<div style="background:${bg};color:${c};font-family:${FONT};font-weight:700;font-size:96px;width:300px;padding:22px 0;border-radius:26px;text-align:center;box-shadow:0 14px 30px #0000005c">${l}<div style="font-size:30px;font-weight:600">${sub}</div></div>`;
    const btn = X.ab({ left: 60, top: 420, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root, mk('A', 'rumah deret', GOLD, INK) + mk('B', 'rumah berjarak', '#3E86B0', '#fff'));
    const c1 = cream(root, '💬 komentar menarik bisa masuk video', { left: 110, top: 780, fontSize: '34px' });
    return { ...noRender, upd(t, dur) { const z = ease(t, dur); S.cam(lerp(560, 600, z), 1450, lerp(1.0, 1.1, z)); ambient(S, t); wave(S, p + 'k', t, true); show(btn, seg(t, .3, .8)); show(c1, seg(t, at(s, 'menarik', 2.5), at(s, 'menarik', 2.5) + .45)) } };
  },
};

// HUD kalem + kartu judul adegan + transisi fade
let hud, label, flash;
export function chrome(ctx) {
  const v = ctx.TL.vars.hud || { hari: 1, penduduk: 5, anggaran: 100 };
  hud = ctx.ab({ left: 36, top: 56, display: 'flex', gap: '12px', zIndex: 8, fontFamily: FONT, fontWeight: 600 }, ctx.ov,
    [`HARI ${v.hari}`, `👥 ${v.penduduk}`, `💰 Rp${v.anggaran} jt`].map(t => `<div style="background:${PANEL};color:${CREAM};font-size:27px;letter-spacing:2px;padding:8px 20px;border-radius:10px;border:1px solid #ffffff22;box-shadow:0 6px 16px #0000004d">${t}</div>`).join(''));
  label = ctx.ab({ left: 36, top: 150, zIndex: 8, fontFamily: FONT }, ctx.ov); flash = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#0B1F14', opacity: 0, zIndex: 9 }, ctx.ov);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const q = seg(t, .1, .5), o = seg(t, 2.8, 3.2);
  label.innerHTML = `<div style="background:rgba(21,53,42,.94);color:${CREAM};border-radius:16px;padding:14px 28px 16px;box-shadow:0 12px 26px #0000005c;border:1px solid #ffffff1c"><div style="font-size:20px;letter-spacing:4px;color:${PALE};font-weight:600">${s.kicker}</div><div style="font-size:44px;font-weight:700;line-height:1.1">${s.sub}</div><div style="width:46px;height:4px;background:${GOLD};margin-top:10px;border-radius:2px"></div></div>`;
  label.style.opacity = E.out(q) * (1 - o); label.style.transform = `translateX(${(1 - E.out(q)) * -50}px)`;
  let f = 0; X.TL.scenes.forEach((x, i) => { if (i) f = Math.max(f, 1 - Math.abs(T - x.start) / .16) }); flash.style.opacity = clamp(f) * .85;
}

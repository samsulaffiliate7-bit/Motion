// Dunia 2D akun Kades Magang Juara (eksperimen gaya ilustrasi): desa digambar SVG berlapis, kamera geser + zoom pelan.
// Tanpa WebGL (shot tidak menggambar apa pun di kanvas 3D), jadi jauh lebih ringan dirender daripada desa3d.
// Bahasa visual: langit + gunung + sawah + sungai, tokoh ilustrasi dengan garis cokelat tua, kartu hijau tua ala papan info.
import { clamp, lerp, seg, E } from './kit.js';

let X, UID = 0;
const INK = '#23411F', PANEL = '#1F3B2A', CREAM = '#FFF6D6', GOLD = '#FFC93C', OUT = '#5A3D2B', PALE = '#BFD8A8';
const at = (s, rx, fb) => X.C(s, rx, fb);
const sh = (rx, ry, x, y) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#0000002a"/>`;
const ST = (w = 4) => `stroke="${OUT}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

function house(x, y, w = 150, wall = '#FFF3D6', roof = '#D9603B', s = 1, extra = '') {
  const h = w * .62, rh = w * .42;
  return `<g transform="translate(${x} ${y}) scale(${s})" ${extra}>${sh(w * .62, w * .09, 0, 4)}<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${wall}" ${ST()}/>
  <polygon points="${-w * .62},${-h} ${-w * .34},${-h - rh} ${w * .34},${-h - rh} ${w * .62},${-h}" fill="${roof}" ${ST()}/>
  <rect x="${-w * .1}" y="${-h * .62}" width="${w * .2}" height="${h * .62}" fill="#8B5A2B" ${ST(3)}/>
  <rect x="${-w * .4}" y="${-h * .7}" width="${w * .2}" height="${w * .17}" fill="#9ED8F5" ${ST(3)}/><rect x="${w * .2}" y="${-h * .7}" width="${w * .2}" height="${w * .17}" fill="#9ED8F5" ${ST(3)}/></g>`;
}
function tree(x, y, s = 1, c = '#4E9A3A') {
  return `<g transform="translate(${x} ${y}) scale(${s})">${sh(60, 11, 0, 4)}<rect x="-12" y="-120" width="24" height="124" fill="#8B5A2B" ${ST()}/>
  <circle cx="-42" cy="-135" r="46" fill="${c}" ${ST()}/><circle cx="44" cy="-140" r="48" fill="${c}" ${ST()}/><circle cx="0" cy="-170" r="62" fill="${c}" ${ST()}/><circle cx="-12" cy="-190" r="30" fill="#8FD06A" opacity=".75"/></g>`;
}
function palm(x, y, s = 1) {
  const f = (a) => `<path d="M0 -190 Q ${Math.cos(a) * 70} ${-190 - 50 + Math.sin(a) * 30} ${Math.cos(a) * 120} ${-190 + 30 + Math.sin(a) * 40}" fill="none" stroke="#3E8F3A" stroke-width="16" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${sh(50, 10, 0, 4)}<path d="M0 0 Q 18 -90 6 -190" fill="none" stroke="#8B5A2B" stroke-width="20" stroke-linecap="round"/>${[0, .6, 1.2, 1.9, 2.5, 3.14].map(f).join('')}<circle cx="6" cy="-190" r="9" fill="#6B4423"/></g>`;
}
function person(x, y, s, shirt, skin = '#D79A6C', id = '', bucket = '') {
  return `<g transform="translate(${x} ${y}) scale(${s})" ${id ? `id="${id}"` : ''}>${sh(34, 8, 0, 3)}
  <rect x="-18" y="-80" width="14" height="80" rx="6" fill="#4A4A4A" ${ST(3)}/><rect x="4" y="-80" width="14" height="80" rx="6" fill="#4A4A4A" ${ST(3)}/>
  <rect x="-26" y="-150" width="52" height="78" rx="18" fill="${shirt}" ${ST(3)}/><circle cx="0" cy="-178" r="26" fill="${skin}" ${ST(3)}/><path d="M-26 -184 Q0 -222 26 -184 Q0 -200 -26 -184Z" fill="#2A1A10" ${ST(3)}/>
  <circle cx="-9" cy="-176" r="3" fill="#2A1A10"/><circle cx="9" cy="-176" r="3" fill="#2A1A10"/>${bucket}</g>`;
}
function kades(x, y, s, p) {   // Pak Kades: peci, kumis, baju khaki. Lengan kanan (layar) = ${p}armR untuk melambai.
  return `<g id="${p}K" transform="translate(${x} ${y}) scale(${s})">${sh(90, 16, 0, 6)}
  <rect x="-44" y="-170" width="36" height="168" rx="10" fill="#6B6A4A" ${ST()}/><rect x="8" y="-170" width="36" height="168" rx="10" fill="#6B6A4A" ${ST()}/>
  <ellipse cx="-28" cy="-2" rx="30" ry="12" fill="#2A1A10" ${ST(3)}/><ellipse cx="28" cy="-2" rx="30" ry="12" fill="#2A1A10" ${ST(3)}/>
  <g id="${p}armL" transform="rotate(10 -72 -282)"><rect x="-92" y="-290" width="34" height="150" rx="16" fill="#E8DBB5" ${ST()}/><circle cx="-75" cy="-136" r="20" fill="#D79A6C" ${ST(3)}/></g>
  <rect x="-70" y="-310" width="140" height="170" rx="40" fill="#E8DBB5" ${ST()}/><rect x="-70" y="-190" width="140" height="48" rx="10" fill="#D8C99B" opacity=".6"/>
  <rect x="-5" y="-300" width="10" height="150" fill="#C9B880" opacity=".7"/><circle cx="30" cy="-250" r="9" fill="${GOLD}" ${ST(3)}/><rect x="-46" y="-252" width="22" height="14" rx="3" fill="#F2F2F2" ${ST(2)}/>
  <rect x="-14" y="-350" width="28" height="48" fill="#D79A6C" ${ST(3)}/><path d="M-30 -312 L0 -296 L30 -312 L22 -300 L0 -286 L-22 -300Z" fill="#F4EAD0" ${ST(3)}/>
  <g id="${p}armR" transform="rotate(-8 72 -282)"><rect x="58" y="-290" width="34" height="150" rx="16" fill="#E8DBB5" ${ST()}/><circle cx="75" cy="-136" r="20" fill="#D79A6C" ${ST(3)}/></g>
  <ellipse cx="-54" cy="-392" rx="9" ry="14" fill="#C98E64" ${ST(3)}/><ellipse cx="54" cy="-392" rx="9" ry="14" fill="#C98E64" ${ST(3)}/>
  <ellipse cx="0" cy="-390" rx="54" ry="60" fill="#D79A6C" ${ST()}/>
  <path d="M-56 -416 Q-52 -470 0 -472 Q52 -470 56 -416 Q0 -436 -56 -416Z" fill="#1E1E1E" ${ST()}/><rect x="-58" y="-430" width="116" height="16" rx="6" fill="#2B2B2B" ${ST(3)}/>
  <circle cx="-20" cy="-392" r="5.5" fill="#2A1A10"/><circle cx="20" cy="-392" r="5.5" fill="#2A1A10"/><path d="M-32 -408 Q-20 -416 -8 -408 M8 -408 Q20 -416 32 -408" stroke="#2A1A10" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M-28 -366 Q-12 -380 0 -372 Q12 -380 28 -366 Q12 -358 0 -362 Q-12 -358 -28 -366Z" fill="#2A1A10"/><path d="M-12 -352 Q0 -344 12 -352" stroke="#7A3B2A" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
}
function tent(x, y, c) { return `<g transform="translate(${x} ${y})">${sh(70, 10, 0, 4)}<polygon points="-70,0 0,-110 70,0" fill="${c}" ${ST()}/><polygon points="-20,0 0,-52 20,0" fill="#2A1A10" opacity=".8"/></g>` }
function well(p) { return `<g id="${p}well">${sh(90, 14, 0, 6)}<rect x="-62" y="-70" width="124" height="70" rx="12" fill="#B8C1CB" ${ST()}/><ellipse cx="0" cy="-70" rx="62" ry="16" fill="#3E8FC4" ${ST()}/>
  <rect x="-62" y="-170" width="10" height="100" fill="#7A4E2C" ${ST(3)}/><rect x="52" y="-170" width="10" height="100" fill="#7A4E2C" ${ST(3)}/><polygon points="-86,-166 0,-230 86,-166" fill="#C9472F" ${ST()}/></g>` }

// dunia: langit, gunung, sawah, sungai, jalan, desa. Semua id diberi awalan p (gradien di svg tersembunyi tidak terbaca bila id bentrok).
function world(p, o = {}) {
  const sky = o.dusk ? ['#F7A860', '#FFE3BC'] : ['#7FC9F2', '#FCEBD0'];
  const river = 'M1000 720 C 880 1000, 1260 1180, 1060 1560 S 900 2280, 1160 2800';
  const road = 'M180 2800 C 240 2300, 640 2060, 560 1580';
  let g = `<defs><linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>
  <linearGradient id="${p}gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8DA6C"/><stop offset="1" stop-color="#6FB04A"/></linearGradient>
  <linearGradient id="${p}m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A9AC8"/><stop offset="1" stop-color="#C9C4DD"/></linearGradient>
  <linearGradient id="${p}m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E9FB5"/><stop offset="1" stop-color="#A9CBD3"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#${p}sky)"/><circle cx="1240" cy="330" r="150" fill="#FFF3B0" opacity=".55"/><circle cx="1240" cy="330" r="86" fill="#FFF7CC"/>
  <g id="${p}clouds" fill="#fff" opacity=".85"><ellipse cx="300" cy="260" rx="130" ry="36"/><ellipse cx="380" cy="236" rx="90" ry="34"/><ellipse cx="760" cy="420" rx="150" ry="38"/><ellipse cx="840" cy="394" rx="90" ry="32"/></g>
  <path d="M0 760 L180 540 L330 680 L520 470 L760 740 L960 560 L1180 720 L1400 520 L1600 700 L1600 900 L0 900Z" fill="url(#${p}m1)"/>
  <path d="M0 820 L220 650 L420 780 L680 620 L900 800 L1160 650 L1380 790 L1600 700 L1600 900 L0 900Z" fill="url(#${p}m2)"/>
  <path d="M0 800 Q 400 740 800 790 T 1600 780 L1600 2800 L0 2800Z" fill="url(#${p}gr)"/>`;
  for (let i = 0; i < 7; i++) g += `<path d="M${-40 + i * 40} ${900 + i * 52} Q 300 ${860 + i * 52} 700 ${900 + i * 52} L700 ${930 + i * 52} Q 300 ${896 + i * 52} ${-40 + i * 40} ${940 + i * 52}Z" fill="${i % 2 ? '#C6E58A' : '#B3D875'}" opacity=".9"/>`;
  g += `<path d="${river}" fill="none" stroke="#C9B57A" stroke-width="270" stroke-linecap="round"/><path d="${river}" fill="none" stroke="#4FA3C7" stroke-width="230" stroke-linecap="round"/><path d="${river}" fill="none" stroke="#7CC8DD" stroke-width="170" stroke-linecap="round"/>
  <path id="${p}rip" d="${river}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="6" stroke-dasharray="40 160" stroke-linecap="round" transform="translate(-30 0)"/><path d="${river}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-dasharray="30 190" stroke-dashoffset="90" stroke-linecap="round" transform="translate(40 0)"/>
  <path d="${road}" fill="none" stroke="${OUT}" stroke-width="136" stroke-linecap="round"/><path d="${road}" fill="none" stroke="#D2A86A" stroke-width="116" stroke-linecap="round"/>
  <ellipse cx="560" cy="1560" rx="290" ry="120" fill="#D7B27A" stroke="${OUT}" stroke-width="5"/>`;
  [[60, 1000, 0], [200, 1060, 1], [400, 980, 0], [610, 1050, 1], [1400, 900, 0], [1500, 1060, 1], [1330, 1200, 0]].forEach(([x, y, k], i) => g += k ? palm(x, y, .7) : tree(x, y, .6));
  [[120, 1220, '#FFF3D6', '#D9603B'], [330, 1200, '#FCE9C8', '#C9472F'], [1300, 1360, '#F5F0E0', '#E07B39'], [1470, 1300, '#FFF6D6', '#B5452B']].forEach(([x, y, w, r]) => g += house(x, y, 130, w, r, .9));
  g += `<g transform="translate(250 1400)"><rect x="-5" y="-300" width="10" height="300" fill="#bbb" ${ST(3)}/><rect id="${p}flag" x="5" y="-300" width="96" height="30" fill="#E5484D" ${ST(3)}/><rect x="5" y="-270" width="96" height="30" fill="#fff" ${ST(3)}/></g>`;
  g += o.well ? `<g transform="translate(880 1500)">${well(p)}</g>` : '';
  if (o.tents) [[330, 1740, '#E07B39'], [520, 1790, '#3E8FC4'], [700, 1750, '#F2C14E'], [210, 1850, '#C2457A'], [880, 1830, '#6B8E5A']].forEach(([x, y, c]) => g += tent(x, y, c));
  return g;
}

function stage(root, html, cam0 = [800, 1400, 1]) {
  const holder = X.ab({ left: 0, top: 0, width: 1080, height: 1920 }, root);
  holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style="position:absolute;left:0;top:0">${html}</svg>`;
  const svg = holder.firstChild, $ = id => svg.querySelector('#' + id);
  const cam = (cx, cy, z) => svg.setAttribute('viewBox', `${cx - 540 / z} ${cy - 960 / z} ${1080 / z} ${1920 / z}`);
  cam(...cam0); return { svg, $, cam };
}

const card = (root, kick, title, css = {}) => { const e = X.ab(Object.assign({ background: PANEL, color: CREAM, borderRadius: '22px', padding: '18px 30px', fontFamily: 'Fredoka', fontWeight: 600, boxShadow: '0 10px 24px #0000004d', border: '3px solid #ffffff22', opacity: 0 }, css), root,
  `${kick ? `<div style="font-size:24px;letter-spacing:3px;color:${PALE};text-transform:uppercase">${kick}</div>` : ''}<div style="font-size:${css.tsize || 54}px;line-height:1.1;font-weight:700">${title}</div>`); return e };
const cream = (root, html, css = {}) => { const e = X.ab(Object.assign({ background: CREAM, color: INK, borderRadius: '26px', padding: '14px 28px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '42px', boxShadow: '0 10px 24px #0000004d', border: `4px solid ${INK}`, opacity: 0, whiteSpace: 'nowrap' }, css), root, html); return e };
const comment = (root, user, text, top, left) => X.ab({ left, top, width: 700, background: '#fff', borderRadius: '28px', padding: '18px 26px', fontFamily: 'Fredoka', color: '#1E1E1E', boxShadow: '0 10px 24px #0000004d', opacity: 0 }, root,
  `<div style="display:flex;align-items:center;gap:14px"><div style="width:58px;height:58px;border-radius:50%;background:#C9D6E2;display:flex;align-items:center;justify-content:center;font-size:30px">👤</div><div><div style="font-size:26px;color:#888">${user} · komentar</div><div style="font-size:42px;font-weight:700">${text}</div></div></div>`);
const slide = (e, p, rot = 0) => { e.style.opacity = p; e.style.transform = `translateY(${(1 - E.out(p)) * 40}px) rotate(${rot}deg)` };
const wave = (K, t, on) => { const a = on ? 150 + Math.sin(t * 7) * 14 : 8; K.armR.setAttribute('transform', `rotate(${-a} 72 -282)`); };
const ambient = (S, t) => { S.$(S.p + 'clouds').setAttribute('transform', `translate(${(t * 12) % 200 - 100} 0)`); S.$(S.p + 'rip').setAttribute('stroke-dashoffset', -t * 60); S.$(S.p + 'flag').setAttribute('height', 30 + Math.sin(t * 4) * 3) };
const kd = (S, p) => ({ armR: S.$(p + 'armR'), armL: S.$(p + 'armL'), body: S.$(p + 'K') });

export async function setup(ctx) { X = ctx }
const noRender = { render() { } };

export const SHOTS = {
  K2_HOOK2(s, root) {
    const p = 'h' + (++UID) + '_'; const S = stage(root, world(p, { well: true, tents: true }) + kades(480, 1640, 1.15, p)); S.p = p; const K = kd(S, p), well = S.$(p + 'well');
    const hook = card(root, 'HARI 2 · HASIL VOTING', `Kalian pilih <span style="color:#7FC4E8">B · sumur</span>!<div style="font-size:40px;color:${GOLD};margin-top:6px">tapi ada masalah baru…</div>`, { left: 50, top: 400, width: 900 });
    return { ...noRender, upd(t, dur) { const q = E.inout(seg(t, 0, dur)); S.cam(lerp(820, 620, q), lerp(1200, 1400, q), lerp(1.0, 1.1, q)); ambient(S, t); wave(K, t, t < 4.5);
      const w = E.back(seg(t, .6, 1.2)); well.setAttribute('transform', `scale(${Math.max(.001, w)})`); slide(hook, seg(t, .1, .5)); hook.style.opacity = seg(t, .1, .5) * (1 - seg(t, 5.4, 5.8)) } };
  },
  K2_COMMENTS(s, root) {
    const p = 'c' + (++UID) + '_'; const S = stage(root, world(p, { tents: true }) + kades(430, 1700, 1.55, p)); S.p = p; const K = kd(S, p); const C = X.TL.vars.komentar;
    const cards = C.map(([u, tx], i) => comment(root, u, `“${tx}”`, 480 + i * 200, i ? 300 : 60));
    const note = cream(root, '📒 dicatat di buku desa', { left: 100, top: 920, fontSize: '36px', background: GOLD });
    return { ...noRender, upd(t, dur) { S.cam(lerp(620, 700, seg(t, 0, dur)), 1400, lerp(1.0, 1.12, seg(t, 0, dur))); ambient(S, t); wave(K, t, false); K.body.setAttribute('transform', `translate(430 ${1700 + Math.sin(t * 2.2) * 4}) scale(1.55)`);
      const t1 = at(s, 'air', 1), t2 = at(s, 'rumah', 3.5); slide(cards[1], seg(t, t1, t1 + .4), -2); slide(cards[0], seg(t, t2, t2 + .4), 2); const tn = at(s, 'catat', dur - 2); X.pop(note, seg(t, tn, tn + .4)) } };
  },
  K2_SUMUR(s, root) {
    const p = 's' + (++UID) + '_';
    let q = ''; [0, 1, 2, 3].forEach(i => q += person(980 - i * 0, 1700 + i * 0, 1, '#fff', '#D79A6C', `${p}q${i}`, `<rect x="30" y="-90" width="26" height="30" rx="5" fill="${['#E5484D', '#3E8FC4', '#F2C14E', '#2E9C6A'][i]}" ${ST(3)}/>`));
    let drops = ''; for (let i = 0; i < 24; i++) drops += `<circle id="${p}d${i}" r="9" fill="#7FC4E8" ${ST(2)} opacity="0"/>`;
    const rig = `<g id="${p}rig" transform="translate(880 1500)"><polygon points="-70,0 0,-260 70,0" fill="none" stroke="#555" stroke-width="12"/><rect id="${p}drill" x="-8" y="-240" width="16" height="230" fill="#333"/></g>`;
    const S = stage(root, world(p, { well: true, tents: true }) + rig + drops + q); S.p = p; const well = S.$(p + 'well');
    const c1 = card(root, 'SUMUR BOR', `💰 biaya sumur: ${X.TL.vars.juta_sumur} juta`, { left: 50, top: 400, width: 700, tsize: 44 }), c2 = card(root, '', `sisa anggaran: <span style="color:${GOLD}">${X.TL.vars.juta_sisa} juta</span>`, { left: 50, top: 540, width: 700, tsize: 44 }), c3 = card(root, '', '🪣 warga antre air bersih', { left: 50, top: 680, width: 700, tsize: 44 });
    return { ...noRender, upd(t, dur) { const tb = at(s, 'Biayanya', 3), ta = at(s, 'antre', dur - 3), built = seg(t, tb - 1, tb);
      S.cam(lerp(780, 860, seg(t, 0, dur)), 1500, lerp(1.2, 1.35, seg(t, 0, dur))); ambient(S, t);
      S.$(p + 'rig').style.display = built < 1 ? '' : 'none'; S.$(p + 'drill').setAttribute('y', -240 + (t % 1) * 40);
      well.setAttribute('transform', `scale(${Math.max(.001, E.back(seg(t, tb - .3, tb + .3)))})`);
      for (let i = 0; i < 24; i++) { const k = (t * .9 + i / 24) % 1, d = S.$(p + 'd' + i); d.setAttribute('opacity', t > tb - .2 && t < tb + 2.5 ? 1 : 0); d.setAttribute('cx', 880 + Math.sin(i * 2.3) * k * 150); d.setAttribute('cy', 1430 - k * 220 + k * k * 260) }
      for (let i = 0; i < 4; i++) { const e = S.$(p + 'q' + i); const x = lerp(1250 + i * 8, 1020 + i * 85, E.out(seg(t, ta - .4 + i * .2, ta + .8 + i * .2))); e.setAttribute('transform', `translate(${x} ${1700 + Math.sin(t * 3 + i) * 3}) scale(1.05)`); e.style.display = t > ta - .4 ? '' : 'none' }
      X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tb + .8, tb + 1.2)); X.pop(c3, seg(t, ta, ta + .4)) } };
  },
  K2_FAMILIES(s, root) {
    const p = 'f' + (++UID) + '_'; let fam = ''; [[330, 1790], [520, 1840], [700, 1800], [210, 1900], [880, 1880]].forEach(([x, y], i) => fam += person(x + 40, y + 24, 1, ['#3E8FC4', '#E07B39', '#C2457A', '#6B8E5A', '#F2C14E'][i], '#D79A6C', `${p}p${i}`) + person(x - 40, y + 30, .65, ['#E07B39', '#3E8FC4', '#6B8E5A', '#F2C14E', '#C2457A'][i], '#C98E64'));
    let ghosts = ''; for (let i = 0; i < 5; i++) ghosts += house(210 + i * 170, 1560, 150, '#FFF3D6', '#D9603B', 1, `id="${p}g${i}" opacity="0"`);
    const dusk = `<rect x="-200" y="500" width="1900" height="2400" fill="#F2894A" opacity=".28"/>`;
    const S = stage(root, world(p, { well: true, tents: true, dusk: true }) + ghosts + fam + dusk); S.p = p;
    const c1 = card(root, 'MASALAH BARU', '⛺ 5 keluarga masih di tenda', { left: 50, top: 400, width: 900, tsize: 46 }), c2 = card(root, '', '🏠 desa butuh rumah', { left: 50, top: 540, width: 620, tsize: 46 });
    return { ...noRender, upd(t, dur) { S.cam(lerp(560, 600, seg(t, 0, dur)), lerp(1500, 1640, seg(t, 0, dur)), lerp(1.05, 1.0, seg(t, 0, dur))); ambient(S, t);
      for (let i = 0; i < 5; i++) { const e = S.$(p + 'p' + i); e.style.transform = `translateY(${Math.sin(t * 1.5 + i) * -3}px)` }
      const tr = at(s, 'butuh', dur - 2.5); for (let i = 0; i < 5; i++) { const g = S.$(p + 'g' + i), q = E.back(seg(t, tr + i * .12, tr + .4 + i * .12)); g.setAttribute('opacity', q > 0 ? .55 : 0) }
      X.pop(c1, seg(t, at(s, 'tenda', 3), at(s, 'tenda', 3) + .4)); X.pop(c2, seg(t, tr, tr + .4)) } };
  },
  K2_CHOICE(s, root) {
    const A = s.variant === 'A', p = (A ? 'a' : 'b') + (++UID) + '_'; const V = X.TL.vars;
    let hs = ''; for (let i = 0; i < 5; i++) { const x = A ? 245 + i * 150 : 150 + i * 195; hs += house(x, 1560, A ? 150 : 140, ['#FFF3D6', '#FCE9C8', '#F5F0E0', '#FFE7C8', '#EDE3D0'][i], ['#D9603B', '#C9472F', '#E07B39', '#B5452B', '#D9603B'][i], 1, `id="${p}h${i}"`);
      if (!A) hs += `<ellipse cx="${x}" cy="1590" rx="90" ry="22" fill="#6FB04A" ${ST(3)}/>` + tree(x + 78, 1590, .38) }
    let fl = ''; if (A) for (let i = 0; i < 5; i++) fl += `<g id="${p}f${i}" transform="translate(${245 + i * 150} 1380)" opacity="0"><path d="M0 0 Q-34 -40 -10 -90 Q0 -60 16 -86 Q40 -40 0 0Z" fill="#F28C28" ${ST(3)}/><path d="M0 0 Q-16 -24 -2 -52 Q18 -26 0 0Z" fill="#FFD54A"/></g>`;
    const S = stage(root, world(p, {}) + hs + fl); S.p = p;
    const big = X.ab({ left: 820, top: 400, width: 170, height: 170, borderRadius: '50%', background: A ? GOLD : '#3E8FC4', border: `8px solid ${INK}`, color: A ? INK : '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px', boxShadow: '0 10px 24px #0000004d' }, root, A ? 'A' : 'B');
    const L = A ? [[`💰 ${V.juta_a} juta · sisa ${V.juta_sisa_a} juta`, 'Biayanya', 0], ['📏 lahan hemat, rumah sempit', 'hemat', 0], ['🔥 api gampang merambat', 'merambat', 1]] : [[`💰 ${V.juta_b} juta · sisa ${V.juta_sisa_b} juta`, 'Biayanya', 0], ['🌳 ada halaman, lega & terang', 'lega', 0], ['🛡️ lebih aman', 'aman', 0]];
    const chips = L.map(([tx, cu, bad], i) => ({ cu, e: card(root, '', tx, { left: 50, top: 400 + i * 125, width: 720, tsize: 38, color: bad ? '#FFB4A8' : CREAM }) }));
    return { ...noRender, upd(t, dur) { X.pop(big, seg(t, 0, .4)); S.cam(lerp(A ? 480 : 640, A ? 620 : 520, seg(t, 0, dur)), 1470, A ? 1.12 : 1.0); ambient(S, t);
      for (let i = 0; i < 5; i++) { const h = S.$(p + 'h' + i); const q = E.back(seg(t, .4 + i * .15, .8 + i * .15)); h.style.transformOrigin = 'bottom center'; h.style.transformBox = 'fill-box'; h.style.opacity = q > 0 ? 1 : 0 }
      if (A) { const tm = at(s, 'merambat', dur - 2); for (let i = 0; i < 5; i++) { const f = S.$(p + 'f' + i); f.setAttribute('opacity', t > tm + i * .35 ? 1 : 0); f.setAttribute('transform', `translate(${245 + i * 150} 1380) scale(1 ${1 + Math.sin(t * 14 + i) * .15})`) } }
      chips.forEach(c => { const tc = at(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) }) } };
  },
  K2_VOTE(s, root) {
    const p = 'v' + (++UID) + '_'; const S = stage(root, world(p, { well: true, tents: true }) + kades(500, 1700, 1.5, p)); S.p = p; const K = kd(S, p);
    const btn = X.ab({ left: 60, top: 400, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:${GOLD};color:${INK};font-family:Fredoka;font-weight:700;font-size:96px;width:300px;padding:20px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 10px 24px #0000004d">A<div style="font-size:34px">rumah deret</div></div><div style="background:#3E8FC4;color:#fff;font-family:Fredoka;font-weight:700;font-size:96px;width:300px;padding:20px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 10px 24px #0000004d">B<div style="font-size:34px">rumah berjarak</div></div>`);
    const c1 = cream(root, '💬 komentar menarik bisa masuk video', { left: 110, top: 760, fontSize: '36px' });
    return { ...noRender, upd(t, dur) { S.cam(lerp(560, 600, seg(t, 0, dur)), 1450, lerp(1.0, 1.1, seg(t, 0, dur))); ambient(S, t); wave(K, t, true); const q = seg(t, .3, .8); btn.style.opacity = q; btn.style.transform = `scale(${E.back(q)})`;
      X.pop(c1, seg(t, at(s, 'menarik', 2.5), at(s, 'menarik', 2.5) + .4)) } };
  },
};

// HUD (chip hijau tua), kartu judul adegan di kiri atas, transisi fade krem
let hud, label, flash;
export function chrome(ctx) {
  const v = ctx.TL.vars.hud || { hari: 1, penduduk: 5, anggaran: 100 };
  hud = ctx.ab({ left: 36, top: 56, display: 'flex', gap: '12px', zIndex: 8, fontFamily: 'Fredoka', fontWeight: 600 }, ctx.ov,
    [`HARI ${v.hari}`, `👥 ${v.penduduk}`, `💰 Rp${v.anggaran} jt`].map(t => `<div style="background:${PANEL};color:${CREAM};font-size:34px;padding:8px 20px;border-radius:14px;border:2px solid #ffffff30">${t}</div>`).join(''));
  label = ctx.ab({ left: 36, top: 160, zIndex: 8, fontFamily: 'Fredoka' }, ctx.ov); flash = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#FFF6D6', opacity: 0, zIndex: 9 }, ctx.ov);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const q = seg(t, .1, .45), o = seg(t, 2.6, 3.0);
  label.innerHTML = `<div style="background:${PANEL};color:${CREAM};border-radius:18px;padding:12px 26px;box-shadow:0 8px 20px #0000004d"><div style="font-size:22px;letter-spacing:3px;color:${PALE}">${s.kicker}</div><div style="font-size:44px;font-weight:700">${s.sub}</div></div>`;
  label.style.opacity = q * (1 - o); label.style.transform = `translateX(${(1 - E.out(q)) * -60}px)`;
  let f = 0; X.TL.scenes.forEach((x, i) => { if (i) f = Math.max(f, 1 - Math.abs(T - x.start) / .14) }); flash.style.opacity = clamp(f) * .9;
}

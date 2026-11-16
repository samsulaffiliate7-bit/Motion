// Dunia 3D akun Dompet Gue Nangis: hidup sehari-hari Nana, cahaya senja hangat.
// Bahasa visual khas: push-in pelan ke benda (struk, dompet, HP), benda keuangan raksasa, koin, Si Dompet berekspresi,
// transisi koin raksasa jatuh menutup layar.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin, tree, rain } from './kit.js';

let X; const BATA = '#C8501E', INK = '#4A2410', GOLD = '#F2B41B', CREAM = '#FFF6E6';
const WARM = o => Object.assign({ sky: ['#F59E5B', '#FFE7C2'], sun: '#FFC58A', sunI: 2.4, sunPos: [-8, 7, 6], hemiSky: '#FFF1DE', hemiGround: '#B07A50', hemi: 1.5, shadow: 10 }, o);
const nana = (p, o = {}) => { const g = person(o.parent, p, Object.assign({ body: BATA, pants: '#7D7D85', hair: '#1E1410', skin: '#E2A97E' }, o)); const H = g.userData.st.head; H.add(mesh(G.sph(.14, 8, 6), '#1E1410', [0, .1, -.42])); H.add(mesh(G.cyl(.06, .03, .35, 6), '#1E1410', [0, -.12, -.5], { rot: [.4, 0, 0] })); return g };
function dompet(parent, p, s = 1) {   // Si Dompet: dompet cokelat berwajah
  const g = group(parent, p); g.scale.setScalar(s);
  g.add(mesh(G.box(1, .7, .25), '#8B5A2B', [0, .35, 0])); const flap = mesh(G.box(1.02, .3, .27), '#A86B35', [0, .62, .01]); g.add(flap); g.add(mesh(G.box(.14, .14, .05), GOLD, [0, .5, .15]));
  const eyes = [-1, 1].map(i => { const e = group(g, [i * .22, .32, .13]); e.add(mesh(G.sph(.1, 10, 8), '#FFFFFF', [0, 0, 0], { cast: false })); e.add(mesh(G.sph(.05, 8, 6), '#1E1E1E', [0, 0, .07], { cast: false })); return e });
  const mouth = mesh(G.box(.2, .04, .03), '#3A1A0A', [0, .14, .14], { cast: false }); g.add(mouth);
  const tears = [-1, 1].map(i => { const t = mesh(G.sph(.05, 8, 6), '#7FC4E8', [i * .22, .2, .16], { cast: false, mat: { emissive: '#7FC4E8', emissiveIntensity: .4 } }); g.add(t); return t });
  g.mood = (t, sad) => { mouth.rotation.z = 0; mouth.scale.set(1, sad ? 2.5 : 1, 1); mouth.position.y = sad ? .12 : .15; eyes.forEach(e => e.scale.y = sad ? .6 : 1 + (Math.sin(t * 3) > .97 ? -.9 : 0));
    tears.forEach((d, i) => { d.visible = sad; const q = (t * 1.2 + i * .5) % 1; d.position.y = .2 - q * .5 }); g.position.y = p[1] + Math.abs(Math.sin(t * (sad ? 9 : 3))) * (sad ? .03 : .06) };
  g.mood(0, false); return g;
}
const ICON = { Film: '▶', Musik: '♪', Drama: '♥', Olahraga: '⚽', Kartun: '★' }, COL = { Film: '#E5484D', Musik: '#2E9C6A', Drama: '#C2457A', Olahraga: '#3E7CB1', Kartun: '#F2A31B' };
function tileTex(name, on, price) { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d'); x.fillStyle = on ? COL[name] : '#9A948C'; x.fillRect(0, 0, 256, 256);
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '800 120px Baloo'; x.fillText(ICON[name], 128, 150); x.font = '800 34px Baloo'; x.fillText(name.toUpperCase(), 128, 200); if (price) { x.fillStyle = '#00000055'; x.fillRect(0, 212, 256, 44); x.fillStyle = '#fff'; x.font = '800 32px Baloo'; x.fillText(price, 128, 246) } const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t }
function appTile(parent, p, name, price) { const g = group(parent, p); const on = new THREE.MeshStandardMaterial({ map: tileTex(name, true, price), roughness: .5 }), off = new THREE.MeshStandardMaterial({ map: tileTex(name, false, price), roughness: .9 });
  const m = new THREE.Mesh(G.box(1, 1, .18), [mat('#DDD'), mat('#DDD'), mat('#DDD'), mat('#DDD'), on, mat('#CCC')]); m.castShadow = true; g.add(m); g.set = v => { m.material[4] = v ? on : off }; return g }
function kos(sc, o = {}) {   // kamar kos: lantai kayu, dinding hangat, jendela senja
  sc.add(mesh(G.box(14, .2, 14), '#B9875A', [0, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), o.wall || '#F3D9B8', [0, 3, -4])); sc.add(mesh(G.box(.2, 6, 14), '#EBCBA4', [-5, 3, 0]));
  sc.add(mesh(G.box(2.6, 2, .05), '#FFB36B', [1.8, 3, -3.88], { mat: { emissive: '#FF9F4A', emissiveIntensity: .8 }, cast: false })); sc.add(mesh(G.box(.08, 2, .08), '#FFF', [1.8, 3, -3.83]));
}
const chip = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CREAM, border: `6px solid ${INK}`, borderRadius: '24px', padding: '12px 26px', fontSize: '42px', fontWeight: 800, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${BATA}`, fontFamily: 'Baloo' }, css), root, html); e.style.opacity = 0; return e };
function tag3(root, html, col = INK) { const w = X.ab({ left: 0, top: 0 }, root); const e = chip(w, html, { position: 'relative', transform: 'translate(-50%,-100%)', fontSize: '30px', padding: '6px 14px' }, col);
  return { at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }
const at = (s, rx, fb) => X.C(s, rx, fb);

export async function setup(ctx) { X = ctx; await document.fonts.load('800 120px Baloo') }

// shot per episode ada di motion/episodes/<akun>/<ep>/shots.js; shot lama (s.d. ep010) di nana_lama.js
export const SHOTS = {};
export { X, BATA, INK, GOLD, CREAM, WARM, nana, dompet, tileTex, appTile, kos, chip, tag3, at };

let title, bigCoin;
export function chrome(ctx) {
  title = ctx.ab({ left: 40, top: 62, zIndex: 8 }, ctx.ov);
  bigCoin = ctx.ab({ left: 0, top: 0, width: 1500, height: 1500, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%,#FFE58A,${GOLD} 55%,#C98A0A)`, border: '40px solid #E0A315', zIndex: 9, display: 'none', fontFamily: 'Baloo', fontWeight: 800, fontSize: '620px', color: '#E0A315', textAlign: 'center', lineHeight: '1400px' }, ctx.ov, 'Rp');
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const q = seg(t, .15, .5);
  title.innerHTML = `<div style="display:inline-block;background:${BATA};color:#fff;font-family:Baloo;font-weight:800;font-size:46px;padding:10px 28px;border-radius:18px;transform:rotate(-2deg);box-shadow:0 8px 0 ${INK}">${s.kicker}</div><div style="font-family:Baloo;font-weight:800;font-size:36px;color:${INK};background:${CREAM};display:inline-block;margin-left:12px;padding:6px 18px;border-radius:14px;border:4px solid ${INK}">${s.sub}</div>`;
  title.style.opacity = q; title.style.transform = `scale(${.8 + .2 * E.back(q)})`; title.style.transformOrigin = '0 50%';
  let w = -1; X.TL.scenes.forEach((x, i) => { if (i) { const p = (T - (x.start - .35)) / .7; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { bigCoin.style.display = 'none'; return }
  bigCoin.style.display = 'block'; bigCoin.style.left = '-210px'; bigCoin.style.top = lerp(-1600, 2000, E.inout(w)) + 'px'; bigCoin.style.transform = `rotate(${w * 120}deg)`;
}

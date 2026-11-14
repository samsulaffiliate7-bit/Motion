// Dunia 3D akun Hewan Berdasi Kotor: fabel kantor bergaya noir.
// Bahasa visual khas: malam biru gelap, cahaya bulan lewat kerai, lampu meja hangat, debu melayang di berkas cahaya,
// kamera dolly menyamping pelan & sudut rendah (kuasa), siluet di pintu, transisi gelap ke hitam, judul gaya mesin tik.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from './kit.js';

let X; const MOON = '#F5D76E', NIGHT = '#0B1026', ORANGE = '#F28C28';
// ===== tokoh hewan =====
function animal(parent, p, kind, o = {}) {
  const base = { cat: { skin: '#9AA0A8', body: '#2B2F3A', pants: '#22252E', tie: '#C0392B', s: 1 }, mouse: { skin: '#B9B6B0', body: '#D9D2C3', pants: '#5A5F6B', s: .78 },
    buffalo: { skin: '#5B5552', body: '#6B8E5A', pants: '#3E3A36', s: 1.22 }, snake: { skin: '#6FA34A', body: '#3A2E4A', pants: '#2A2236', tie: '#E5C04A', s: 1.02 }, owl: { skin: '#8B6B4A', body: '#3A2E2A', pants: '#2A221E', tie: MOON, s: 1.08 },
    parrot: { skin: '#3FAE49', body: '#E5484D', pants: '#2A6B3A', s: .9 }, chameleon: { skin: '#7BC043', body: '#4E8F3A', pants: '#3A6B2A', s: .95 },
    peacock: { skin: '#2E86C1', body: '#1F5FA8', pants: '#16406E', s: .95, tie: '#F2C14E' }, raccoon: { skin: '#8A8A92', body: '#6B4FA0', pants: '#3A3A44', s: .88 } }[kind];
  const g = person(parent, p, Object.assign({}, base, o)); const H = g.userData.st.head, sk = o.skin || base.skin;
  if (kind === 'cat') { [-1, 1].forEach(i => H.add(mesh(G.cone(.14, .3, 4), sk, [i * .22, .36, 0], { rot: [0, 0, -i * .3] }))); H.add(mesh(G.sph(.12, 8, 6), '#E8E4DC', [0, -.1, .3], { s: [1.3, .8, .8] }));
    [-1, 1].forEach(i => [0, 1].forEach(k => H.add(mesh(G.box(.32, .015, .015), '#EEE', [i * .28, -.08 + k * .05, .28], { rot: [0, 0, i * (k ? .15 : -.1)], cast: false }))));
    const tail = group(g, [0, .75, -.3]); for (let i = 0; i < 5; i++) tail.add(mesh(G.cyl(.06, .06, .3, 6), sk, [0, i * .2, -i * .08], { rot: [.4 - i * .15, 0, 0] })); g.userData.tail = tail }
  if (kind === 'mouse') { [-1, 1].forEach(i => { H.add(mesh(G.cyl(.2, .2, .05, 16), sk, [i * .3, .3, -.02], { rot: [Math.PI / 2, 0, 0] })); H.add(mesh(G.cyl(.13, .13, .02, 16), '#E8A9B0', [i * .3, .3, .02], { rot: [Math.PI / 2, 0, 0], cast: false })) });
    H.add(mesh(G.sph(.06, 8, 6), '#E8A9B0', [0, -.08, .36])); const tail = group(g, [0, .6, -.28]); for (let i = 0; i < 6; i++) tail.add(mesh(G.cyl(.025, .025, .25, 5), '#D9A3A8', [0, -.1 + Math.sin(i) * .05, -i * .2], { rot: [Math.PI / 2, 0, 0] })); g.userData.tail = tail }
  if (kind === 'buffalo') { [-1, 1].forEach(i => { const h = mesh(G.cone(.09, .55, 6), '#E8E0CC', [i * .42, .22, 0], { rot: [0, 0, -i * 1.25] }); H.add(h) }); H.add(mesh(G.box(.42, .26, .2), '#7A6F6A', [0, -.12, .3]));
    [-1, 1].forEach(i => H.add(mesh(G.sph(.03, 6, 5), '#222', [i * .1, -.1, .41], { cast: false }))) }
  if (kind === 'owl') { [-1, 1].forEach(i => { H.add(mesh(G.cyl(.15, .15, .03, 18), '#FFF6D8', [i * .15, .05, .33], { rot: [Math.PI / 2, 0, 0], cast: false })); H.add(mesh(G.cone(.08, .2, 4), sk, [i * .22, .38, 0], { rot: [0, 0, -i * .2] })) });
    H.add(mesh(G.cone(.06, .14, 4), ORANGE, [0, -.08, .36], { rot: [Math.PI / 2 + .3, 0, 0] })) }
  if (kind === 'snake') { H.scale.set(1.15, .78, 1.3); [-1, 1].forEach(i => H.add(mesh(G.sph(.07, 8, 6), '#F2D23A', [i * .14, .08, .3], { cast: false, mat: { emissive: '#F2D23A', emissiveIntensity: .6 } })));
    const tg = group(H, [0, -.12, .36]); tg.add(mesh(G.box(.04, .015, .2), '#C0392B', [0, 0, .1], { cast: false })); [-1, 1].forEach(i => tg.add(mesh(G.box(.02, .015, .1), '#C0392B', [i * .03, 0, .23], { rot: [0, i * .4, 0], cast: false })));
    for (let i = 0; i < 6; i++) H.add(mesh(G.box(.12, .03, .12), '#4E7F32', [((i % 3) - 1) * .16, .3, -.1 + Math.floor(i / 3) * .18], { cast: false })); g.userData.tongue = tg }
  if (kind === 'parrot') { H.add(mesh(G.cone(.12, .3, 6), '#F2B233', [0, -.05, .4], { rot: [Math.PI / 2 + .5, 0, 0] })); [0, 1, 2].forEach(i => H.add(mesh(G.box(.06, .26 - i * .05, .14), '#E5484D', [0, .42 - i * .02, -.05 - i * .13], { rot: [-.4 - i * .25, 0, 0] })));
    [-1, 1].forEach(i => H.add(mesh(G.sph(.1, 8, 6), '#FFFFFF', [i * .18, .08, .26], { cast: false }))); const tail = group(g, [0, .7, -.3]); ['#3E8FC4', '#E5484D', '#F2B233'].forEach((c, i) => tail.add(mesh(G.box(.1, .05, .6), c, [(i - 1) * .1, 0, -.3], { rot: [.5, 0, 0] }))); g.userData.tail = tail }
  if (kind === 'raccoon') { H.add(mesh(G.box(.62, .16, .1), '#1E1E22', [0, .05, .28], { cast: false })); [-1, 1].forEach(i => { H.add(mesh(G.cone(.13, .26, 4), sk, [i * .24, .36, 0], { rot: [0, 0, -i * .3] })); H.add(mesh(G.sph(.05, 6, 5), '#FFFFFF', [i * .13, .05, .34], { cast: false })) });
    H.add(mesh(G.sph(.11, 8, 6), '#E8E4DC', [0, -.12, .3], { s: [1.2, .8, .9] })); H.add(mesh(G.sph(.04, 6, 5), '#1E1E22', [0, -.08, .4], { cast: false }));
    const tail = group(g, [0, .6, -.3]); for (let i = 0; i < 6; i++) tail.add(mesh(G.cyl(.11 - i * .008, .11 - i * .008, .16, 8), i % 2 ? '#2A2A30' : '#9A9AA2', [0, i * .1, -.1 - i * .12], { rot: [.9, 0, 0] })); g.userData.tail = tail }
  if (kind === 'peacock') { H.add(mesh(G.cone(.08, .22, 5), '#F2B233', [0, -.06, .38], { rot: [Math.PI / 2 + .3, 0, 0] })); [-1, 1].forEach(i => H.add(mesh(G.sph(.08, 8, 6), '#FFFFFF', [i * .15, .08, .3], { cast: false })));
    for (let i = 0; i < 3; i++) { H.add(mesh(G.cyl(.012, .012, .3, 4), '#1F5FA8', [(i - 1) * .08, .5, 0], { rot: [0, 0, (i - 1) * .25] })); H.add(mesh(G.sph(.05, 6, 5), '#3FAE49', [(i - 1) * .12, .66, 0])) }
    const fan = group(g, [0, 1.05, -.38]); for (let i = 0; i < 9; i++) { const a = (i - 4) * .3; const f = group(fan, [0, 0, 0]); f.rotation.z = a; f.add(mesh(G.box(.16, 1.1, .03), '#2E9E5B', [0, .55, 0])); f.add(mesh(G.cyl(.09, .09, .02, 10), '#1F5FA8', [0, 1, .02], { rot: [Math.PI / 2, 0, 0], cast: false })); f.add(mesh(G.cyl(.04, .04, .025, 8), '#F2C14E', [0, 1, .03], { rot: [Math.PI / 2, 0, 0], cast: false })) }
    g.userData.tail = fan }
  if (kind === 'chameleon') { [-1, 1].forEach(i => { H.add(mesh(G.sph(.13, 10, 8), sk, [i * .3, .08, .12])); H.add(mesh(G.sph(.05, 6, 5), '#1E1E1E', [i * .38, .08, .16], { cast: false })) }); for (let i = 0; i < 4; i++) H.add(mesh(G.cone(.06, .16, 4), sk, [0, .36 - i * .03, .1 - i * .14]));
    const tail = group(g, [0, .55, -.3]); for (let i = 0; i < 9; i++) { const a = i * .7; tail.add(mesh(G.sph(.07 - i * .005, 6, 5), sk, [0, Math.sin(a) * .18 * (1 - i / 12), -.15 - Math.cos(a) * .18 * (1 - i / 12) - i * .02])) } g.userData.tail = tail;
    const list = []; const c1 = mat(sk), c2 = mat(o.body || base.body); g.traverse(m => { if (m.isMesh && (m.material === c1 || m.material === c2)) { m.material = m.material.clone(); m.userData.k = m.material.color.getHexString() === c1.color.getHexString() ? 0 : 1; list.push(m) } });
    g.userData.tint = (a, b) => list.forEach(m => m.material.color.set(m.userData.k ? (b || a) : a)) }
  return g;
}
const cast = {
  kucing: (p, o = {}) => animal(o.parent, p, 'cat', o), tikus: (p, o = {}) => animal(o.parent, p, 'mouse', o),
  kerbau: (p, o = {}) => animal(o.parent, p, 'buffalo', o), hantu: (p, o = {}) => animal(o.parent, p, 'owl', o),
  ular: (p, o = {}) => animal(o.parent, p, 'snake', o), beo: (p, o = {}) => animal(o.parent, p, 'parrot', o), bunglon: (p, o = {}) => animal(o.parent, p, 'chameleon', o), merak: (p, o = {}) => animal(o.parent, p, 'peacock', o), rakun: (p, o = {}) => animal(o.parent, p, 'raccoon', o), ayam: (p, o = {}) => animal(o.parent, p, 'parrot', Object.assign({ skin: '#F4F0E6', body: '#E07B39', pants: '#5A4A3A' }, o)),
};
// ===== set noir =====
function noirRoom(sc, o = {}) {
  sc.add(mesh(G.box(16, .2, 16), o.floor || '#3E465E', [0, -.1, 0])); sc.add(mesh(G.box(16, 7, .2), o.wall || '#46506E', [0, 3.5, -4])); sc.add(mesh(G.box(.2, 7, 16), o.wall2 || '#3E4864', [-5, 3.5, 0]));
  if (o.window !== false) { const wx = o.wx ?? 2; sc.add(mesh(G.box(3.4, 2.6, .05), '#2F4C8A', [wx, 3.6, -3.88], { mat: { emissive: '#3E5FA8', emissiveIntensity: .7 }, cast: false }));
    for (let i = 0; i < 7; i++) sc.add(mesh(G.box(3.5, .12, .08), '#151A2B', [wx, 2.45 + i * .38, -3.82]));
    sc.add(mesh(G.ico(.35, 1), MOON, [wx + .9, 4.4, -3.86], { mat: { emissive: MOON, emissiveIntensity: 1 }, cast: false })) }
}
function lampDesk(sc, p, intensity = 18) { const g = group(sc, p); g.add(mesh(G.cyl(.15, .2, .06, 12), '#333', [0, 0, 0])); g.add(mesh(G.cyl(.02, .02, .6, 6), '#333', [0, .3, 0])); g.add(mesh(G.cone(.22, .25, 12, 1), '#3A3A3A', [0, .65, .1], { rot: [.5, 0, 0] }));
  const L = new THREE.SpotLight('#FFC27A', intensity, 7, .75, .6, 1.4); L.position.set(p[0], p[1] + .6, p[2] + .1); L.target.position.set(p[0], 0, p[2] + .9); L.castShadow = true; L.shadow.mapSize.set(1024, 1024); sc.add(L, L.target); return L }
function deskN(sc, p, w = 2) { const g = group(sc, p); g.add(mesh(G.box(w, .08, 1), '#4A3626', [0, .78, 0])); g.add(mesh(G.box(w - .1, .74, .9), '#3A2A1E', [0, .37, 0])); return g }
function paper(parent, p) { return mesh(G.box(.32, .01, .44), '#F4F0E6', p, { cast: false, mat: { emissive: '#F4F0E6', emissiveIntensity: .25 } }) }
function dust(sc, n = 120, box = [6, 4, 6], c = [0, 2, 0]) { const g = new THREE.BufferGeometry(), a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = ((i * 37) % 100) / 100 - .5; a[i * 3 + 1] = ((i * 61) % 100) / 100; a[i * 3 + 2] = ((i * 17) % 100) / 100 - .5 }
  g.setAttribute('position', new THREE.BufferAttribute(a, 3)); const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: '#FFE7B0', size: 3, sizeAttenuation: false, transparent: true, opacity: .55 })); pts.scale.set(...box); pts.position.set(c[0] - 0, c[1] - box[1] / 2, c[2]); sc.add(pts);
  return t => { pts.position.y = c[1] - box[1] / 2 + Math.sin(t * .3) * .15; pts.rotation.y = t * .03 } }
// v3 (masukan pemilik 6 Nov): tetap malam, tapi jauh lebih terang. Cahaya dikali, kabut dijauhkan, langit biru malam bergradasi.
const NOIR = o => { const m = Object.assign({ bg: NIGHT, hemi: .75, hemiSky: '#7A8FC8', hemiGround: '#1A2040', sun: '#AFC2FF', sunI: 1.4, sunPos: [6, 9, -6], fog: [NIGHT, 9, 26] }, o);
  m.hemi = Math.max(1.35, m.hemi * 2.2); m.sunI = Math.max(2.2, m.sunI * 1.8); m.hemiSky = '#C4D0F2'; m.hemiGround = '#5A5070';
  if (m.fog) m.fog = ['#2A3A6E', m.fog[1] * 2, m.fog[2] * 2.2]; if (m.bg === NIGHT || m.bg === '#0A1030') { delete m.bg; m.sky = ['#1C2C62', '#4A5C9A'] } return m };
const chip = (root, html, css = {}) => { const e = X.ab(Object.assign({ background: '#0B1026E6', border: `4px solid ${MOON}`, borderRadius: '14px', padding: '12px 24px', fontSize: '40px', fontWeight: 800, color: MOON, whiteSpace: 'nowrap', fontFamily: 'Baloo' }, css), root, html); e.style.opacity = 0; return e };
const at = (s, rx, fb) => X.C(s, rx, fb);
function screenTex(txt) { const c = document.createElement('canvas'); c.width = 1024; c.height = 576; const x = c.getContext('2d'); x.fillStyle = '#F4F7FA'; x.fillRect(0, 0, 1024, 576); x.fillStyle = '#C0392B'; x.fillRect(0, 0, 1024, 90);
  x.fillStyle = '#fff'; x.font = '800 56px Baloo'; x.fillText('IDE HEMAT BIAYA', 40, 66); x.fillStyle = '#1B2347'; x.font = '800 64px Baloo'; const w = txt.split(' '); let l = '', y = 220; w.forEach(k => { if (x.measureText(l + k).width > 900) { x.fillText(l, 60, y); l = ''; y += 84 } l += k + ' ' }); x.fillText(l, 60, y);
  x.font = '700 40px Baloo'; x.fillStyle = '#777'; x.fillText('oleh: Kucing Berdasi', 60, 520); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t }

function chatTex(msgs, title, col = '#2E5E8C') { const c = document.createElement('canvas'); c.width = 512; c.height = 1024; const x = c.getContext('2d'); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; let last = -1;
  const draw = n => { if (n === last) return; last = n; x.fillStyle = '#ECE5DA'; x.fillRect(0, 0, 512, 1024); x.fillStyle = col; x.fillRect(0, 0, 512, 110); x.fillStyle = '#fff'; x.font = '800 40px Baloo'; x.textAlign = 'left'; x.fillText(title, 26, 70);
    let y = 150; msgs.slice(0, n).forEach(([who, m]) => { x.font = '800 34px Baloo'; const lines = []; let l = ''; m.split(' ').forEach(w => { if (x.measureText(l + w).width > 380) { lines.push(l); l = '' } l += w + ' ' }); lines.push(l); const h = 62 + lines.length * 40;
      x.fillStyle = '#FFFFFF'; x.beginPath(); x.roundRect(22, y, 440, h, 20); x.fill(); x.fillStyle = col; x.font = '800 28px Baloo'; x.fillText(who, 40, y + 34); x.fillStyle = '#1B2347'; x.font = '800 34px Baloo'; lines.forEach((ln, i) => x.fillText(ln, 40, y + 74 + i * 40)); y += h + 18 }); t.needsUpdate = true };
  draw(0); return { t, draw } }
export async function setup(ctx) { X = ctx; await document.fonts.load('800 56px Baloo') }

export const SHOTS = {
  H_NIGHTDESK(s, root) {
    const sc = newScene(NOIR()); noirRoom(sc); deskN(sc, [0, 0, 0]); lampDesk(sc, [-.6, .82, -.2]); const pp = paper(sc, [.1, .83, .15]);
    const T = cast.tikus([0, 0, .95]); sc.add(T); T.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .55, .6), '#2A2A33', [0, .27, .95]));
    const bulb = group(sc, [0, 2.6, .9]); bulb.add(mesh(G.sph(.22, 14, 10), '#FFE680', [0, 0, 0], { mat: { emissive: '#FFD54A', emissiveIntensity: 2 }, cast: false })); bulb.add(mesh(G.cyl(.09, .09, .14, 10), '#999', [0, -.24, 0])); const bl = new THREE.PointLight('#FFE08A', 0, 5); bulb.add(bl);
    const d = dust(sc, 140, [3, 2.5, 3], [-.3, 1.4, .3]); const cam = camera(40);
    const c1 = chip(root, '💡 ide hemat biaya kantor', { left: 70, top: 300 });
    return { scene: sc, cam, upd(t, dur) {
      const ti = at(s, 'ide', 2); const q = E.back(seg(t, ti, ti + .5)); bulb.scale.setScalar(Math.max(.001, q)); bl.intensity = q * 3; bulb.position.y = 2.6 + Math.sin(t * 3) * .05;
      T.pose(t, { hold: true }); T.userData.st.arms[1].rotation.x = -1 + Math.sin(t * 9) * .15; d(t);
      cam.position.set(lerp(-2.2, 2.2, E.inout(seg(t, 0, dur))), 2.3, -3.1); cam.lookAt(0, 1.7, .9);
      X.pop(c1, seg(t, ti + .3, ti + .7));
    } };
  },
  H_CORRIDOR(s, root) {   // lorong pagi kelabu, Tikus berjalan membawa kertas
    const sc = newScene(NOIR({ bg: '#2A3550', hemi: .7, sunI: .6, fog: ['#2A3550', 6, 24] }));
    sc.add(mesh(G.box(3.2, .1, 30), '#3A4256', [0, 0, -8])); sc.add(mesh(G.box(.2, 4, 30), '#4A536A', [-1.6, 2, -8])); sc.add(mesh(G.box(.2, 4, 30), '#454E64', [1.6, 2, -8])); sc.add(mesh(G.box(3.2, .1, 30), '#2C3346', [0, 4, -8]));
    for (let i = 0; i < 8; i++) { const z = 4 - i * 3.6; sc.add(mesh(G.box(.8, .06, .3), '#FFF2D0', [0, 3.94, z], { mat: { emissive: '#FFE7B0', emissiveIntensity: 1.2 }, cast: false })); const L = new THREE.PointLight('#FFE0A8', i % 2 ? 3 : 8, 7); L.position.set(0, 3.6, z); sc.add(L);
      sc.add(mesh(G.box(.06, 2.2, 1), '#5E4A38', [i % 2 ? 1.5 : -1.5, 1.1, z - 1.6])) }
    const T = cast.tikus([0, 0, 0]); sc.add(T); const pp = paper(T.userData.st.arms[1], [0, -.6, .12]); pp.rotation.x = Math.PI / 2;
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const z = lerp(-14, -2, t / dur); T.position.z = z; T.pose(t, { walk: 1, hold: true }); cam.position.set(.6, 1.6, z + 4.6); cam.lookAt(0, 1.1, z) } };
  },
  H_CATROOM(s, root) {   // sudut rendah dari balik bahu Tikus: Kucing di kursi besar
    const sc = newScene(NOIR()); noirRoom(sc, { wx: -1.5 }); deskN(sc, [0, 0, -1.2], 2.6); lampDesk(sc, [.9, .82, -1.4], 40); const fill = new THREE.PointLight('#FFB070', 6, 6); fill.position.set(1.2, 2.4, -.4); sc.add(fill);
    const ch = group(sc, [0, 0, -2.1]); ch.add(mesh(G.box(1.3, 2.4, .3), '#5A1E1E', [0, 1.6, -.2])); ch.add(mesh(G.box(1.3, .3, 1), '#5A1E1E', [0, .6, .2]));
    const K = cast.kucing([0, .3, -1.9]); sc.add(K); K.scale.setScalar(1.05);
    const T = cast.tikus([.4, 0, 1.2]); sc.add(T); T.rotation.y = Math.PI;
    const pp = paper(sc, [0, .83, -1.0]);
    const cam = camera(40);
    const c1 = chip(root, '😼 "Nanti saya pelajari dulu ya."', { left: 70, top: 300 }), c2 = chip(root, '→ masuk saku jas', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    return { scene: sc, cam, upd(t, dur) {
      const ts = at(s, 'tersenyum', 2), tj = at(s, 'saku jas', dur - 2);
      cam.position.set(2.4, 1.2, 3.6); cam.lookAt(-.2, 1.7, -1.7);   // sudut rendah: Kucing terlihat berkuasa
      K.pose(t, { talk: t > ts && t < tj, nod: t > ts + 1.5 && t < tj }); if (K.userData.tail) K.userData.tail.rotation.z = Math.sin(t * 2) * .3; T.pose(t, { look: Math.sin(t) * .15 });
      const m = E.inout(seg(t, tj, tj + 1)); pp.position.set(lerp(0, .25, m), lerp(.83, 1.25, m), lerp(-1.0, -1.6, m)); pp.scale.setScalar(Math.max(.001, 1 - m * .9));
      X.pop(c1, seg(t, ts + .6, ts + 1)); X.pop(c2, seg(t, tj, tj + .4));
    } };
  },
  H_MEETING(s, root) {   // ruang rapat: Kucing presentasi, Direktur Burung Hantu tepuk tangan
    const sc = newScene(NOIR({ bg: '#1A2238', hemi: 1.6, sunI: 2 })); noirRoom(sc, { window: false, wall: '#34406A' }); [[-2, 3.4, 1], [2, 3.4, -1]].forEach(([x, y, z]) => { const L = new THREE.PointLight('#FFE0B0', 14, 10); L.position.set(x, y, z); sc.add(L) });
    sc.add(mesh(G.box(1.8, .1, 6), '#4A3626', [0, .8, 0])); sc.add(mesh(G.box(1.6, .76, 5.8), '#3A2A1E', [0, .4, 0]));
    const scr = new THREE.Mesh(G.plane(3.2, 1.8), new THREE.MeshBasicMaterial({ map: screenTex(X.TL.vars.ide) })); scr.position.set(0, 2.6, -3.85); sc.add(scr); const sl = new THREE.PointLight('#DDE8FF', 6, 7); sl.position.set(0, 2.4, -2.8); sc.add(sl);
    const K = cast.kucing([-1.6, 0, -2.7]); sc.add(K); K.rotation.y = .5; const O = cast.hantu([0, .35, 3.4]); sc.add(O); O.rotation.y = Math.PI;
    const R = cast.kerbau([1.4, 0, 1.2]); const T = cast.tikus([1.3, 0, -1.5]); [R, T].forEach(a => { sc.add(a); a.rotation.y = -Math.PI / 2 });
    const cam = camera(42);
    const c1 = chip(root, 'kata per kata: <b>sama persis</b>', { left: 70, top: 300 }), c2 = chip(root, '👏 Direktur: tepuk tangan', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      const tsp = at(s, 'sama persis', 4), ttp = at(s, 'tepuk tangan', dur - 2.5);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(4.2, 3, p), lerp(5.6, 4, p), lerp(8.4, 7.2, p)); cam.lookAt(-.4, 1.5, -1.2);
      K.pose(t, { talk: t < ttp, point: (t % 3) < 1.2 }); O.pose(t, { cheer: t > ttp, nod: t < ttp }); R.pose(t, { look: .4 }); T.pose(t, { shake: t > tsp, look: -.3 });
      X.pop(c1, seg(t, tsp, tsp + .4)); X.pop(c2, seg(t, ttp, ttp + .4));
    } };
  },
  H_DOORWAY(s, root) {   // siluet Tikus dan Kerbau di ambang pintu yang terang
    const sc = newScene(NOIR({ bg: '#05070F', hemi: .15, sunI: .2, fog: ['#05070F', 6, 20] }));
    sc.add(mesh(G.box(16, .2, 16), '#11141F', [0, -.1, 0])); sc.add(mesh(G.box(16, 7, .2), '#0E111A', [0, 3.5, -3]));
    const door = mesh(G.box(2.2, 3.4, .05), '#FFE8B8', [0, 1.7, -2.88], { mat: { emissive: '#FFE0A0', emissiveIntensity: 1.6 }, cast: false }); sc.add(door);
    const back = new THREE.SpotLight('#FFE0A0', 30, 12, .6, .5, 1); back.position.set(0, 2.2, -2.7); back.target.position.set(0, 0, 3); back.castShadow = true; sc.add(back, back.target);
    const T = cast.tikus([-.35, 0, -2.2]), R = cast.kerbau([.55, 0, -2.3]); sc.add(T, R);
    const cam = camera(40);
    const DR = X.TL.vars.door || [['"Lain kali, kirim lewat <b>email</b>."', 'email'], ['"Tembuskan ke direktur."', 'tembuskan']]; const c1 = chip(root, DR[0][0], { left: 70, top: 300 }), c2 = chip(root, DR[1][0], { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(Math.sin(t * .2) * .3, 1.2, 3.8 - t * .06); cam.lookAt(0, 1.3, -2.4);
      const tk = at(s, 'menepuk', 3); T.pose(t, { look: -.2 }); R.pose(t, { talk: t > tk + .6 }); R.userData.st.arms[0].rotation.x = t > tk ? -1.2 : 0; R.userData.st.arms[0].rotation.z = t > tk ? .5 : -.08;
      const te = at(s, DR[0][1], 99), td = at(s, DR[1][1], 99); X.pop(c1, seg(t, te, te + .4)); X.pop(c2, seg(t, td, td + .4));
    } };
  },

  H_POSTCARD(s, root) {   // HP Tikus di meja malam: foto liburan Kucing di pantai
    const sc = newScene(NOIR()); noirRoom(sc); deskN(sc, [0, 0, 0]); lampDesk(sc, [-.7, .82, -.2], 22);
    const c = document.createElement('canvas'); c.width = 512; c.height = 900; const x = c.getContext('2d'); const g = x.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#5EC8F2'); g.addColorStop(.55, '#BFEFFF'); g.addColorStop(.56, '#2E9FD6'); g.addColorStop(.75, '#F2D59A'); g.addColorStop(1, '#E8C27A'); x.fillStyle = g; x.fillRect(0, 0, 512, 900);
    x.fillStyle = '#FFE36B'; x.beginPath(); x.arc(390, 140, 60, 0, 7); x.fill(); x.fillStyle = '#3F8A3A'; x.fillRect(60, 380, 18, 230); x.beginPath(); x.ellipse(70, 380, 110, 40, -.3, 0, 7); x.fill();
    x.fillStyle = '#9AA0A8'; x.beginPath(); x.arc(270, 640, 70, 0, 7); x.fill(); x.fillStyle = '#1E1E1E'; x.fillRect(200, 625, 140, 26); x.fillStyle = '#C0392B'; x.fillRect(250, 710, 40, 120);
    x.fillStyle = '#ffffffee'; x.fillRect(0, 0, 512, 90); x.fillStyle = '#1B2347'; x.font = '800 40px Baloo'; x.fillText('Kucing Berdasi', 24, 60); x.fillStyle = '#ffffffee'; x.fillRect(20, 790, 472, 90); x.fillStyle = '#1B2347'; x.font = '800 32px Baloo'; x.fillText('Lagi cuti ya 😎 kerjaan titip ✌️', 36, 845);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; const ph = group(sc, [.1, .84, .25]); ph.add(mesh(G.box(.5, .02, .9), '#111', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(.44, .8), new THREE.MeshBasicMaterial({ map: tex })); scr.rotation.x = -Math.PI / 2; scr.position.y = .012; ph.add(scr);
    const pl = new THREE.PointLight('#BFEFFF', 3, 3); pl.position.set(.1, 1.3, .3); sc.add(pl);
    const T = cast.tikus([-1.3, 0, .9]); sc.add(T); T.rotation.y = Math.PI * .8;
    const cam = camera(40); const c1 = chip(root, '🏖️ cuti 7 hari', { left: 70, top: 300 }), c2 = chip(root, '📦 semua kerjaan → Tikus', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur * .7)); cam.position.set(lerp(.6, .1, p), lerp(3.4, 1.9, p), lerp(2.2, 1.0, p)); cam.lookAt(.1, .84, .2); T.pose(t, { look: .2 });
      const ta = at(s, 'seminggu', 1), tb = at(s, 'Tikus Kecil', 3); X.pop(c1, seg(t, ta, ta + .4)); X.pop(c2, seg(t, tb, tb + .4)) } };
  },
  H_TWODESKS(s, root) {   // Tikus bolak-balik di dua meja, telepon & email menyala bergantian
    const sc = newScene(NOIR({ hemi: 1.3, sunI: 1.8 })); noirRoom(sc, { wx: 0 }); const fl = new THREE.PointLight('#FFD8A0', 10, 9); fl.position.set(0, 3, 2.5); sc.add(fl); const dA = deskN(sc, [-1.6, 0, 0]), dB = deskN(sc, [1.6, 0, 0]); lampDesk(sc, [-2.2, .82, -.2], 16); lampDesk(sc, [2.2, .82, -.2], 16);
    const phone = mesh(G.box(.4, .12, .25), '#222', [-1.2, .88, .1]); sc.add(phone); const scr = mesh(G.box(.9, .6, .05), '#2A2F36', [1.6, 1.15, -.3]); sc.add(scr); const glow = mesh(G.box(.8, .5, .01), '#9CC3E6', [1.6, 1.15, -.27], { mat: { emissive: '#9CC3E6', emissiveIntensity: 1 }, cast: false }); sc.add(glow);
    const ring = group(sc, [-1.2, 1.3, .1]); [0, 1, 2].forEach(i => ring.add(mesh(G.box(.04, .2, .04), MOON, [Math.cos(i) * .25, 0, Math.sin(i) * .1], { mat: { emissive: MOON, emissiveIntensity: 1 }, cast: false })));
    const T = cast.tikus([0, 0, 1]); sc.add(T); const cam = camera(42);
    const c1 = chip(root, '📞 kiri: telepon', { left: 70, top: 300 }), c2 = chip(root, '📧 kanan: email', { left: 70, top: 410 }), c3 = chip(root, 'kerja <b>2 orang</b>, gaji <b>1</b>', { left: 70, top: 520, color: ORANGE, borderColor: ORANGE });
    return { scene: sc, cam, upd(t, dur) { const side = Math.sin(t * 1.4); T.position.x = side * 1.5; T.rotation.y = Math.PI + (Math.cos(t * 1.4) > 0 ? .6 : -.6); T.pose(t, { walk: Math.abs(Math.cos(t * 1.4)), hold: true });
      ring.visible = side < 0 && Math.sin(t * 18) > 0; glow.material.emissiveIntensity = side > 0 ? 1.5 : .4; phone.position.y = .88 + (side < 0 ? Math.abs(Math.sin(t * 30)) * .02 : 0);
      cam.position.set(0, 3.6, 9 - t * .08); cam.lookAt(0, 1, 0); [[c1, 'kiri'], [c2, 'kanan'], [c3, 'dua orang']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) }) } };
  },
  H_CALL(s, root) {   // jam 22.00: Tikus mengantuk, telepon dari pantai, layar terbagi diagonal (pantai malam)
    const sc = newScene(NOIR({ bg: '#05070F', hemi: .5 })); noirRoom(sc); deskN(sc, [0, 0, 0]); lampDesk(sc, [-.6, .82, -.2], 26);
    const T = cast.tikus([0, 0, .95]); sc.add(T); T.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .55, .6), '#2A2A33', [0, .27, .95]));
    const ph = mesh(G.box(.12, .26, .04), '#111', [0, -.62, .1]); T.userData.st.arms[1].add(ph); const scrG = mesh(G.box(.1, .2, .01), '#BFEFFF', [0, -.62, .13], { mat: { emissive: '#BFEFFF', emissiveIntensity: 1.2 }, cast: false }); T.userData.st.arms[1].add(scrG);
    const cam = camera(40);
    const inset = X.ab({ left: 560, top: 300, width: 440, height: 440, borderRadius: '30px', overflow: 'hidden', border: `6px solid ${MOON}`, opacity: 0, background: 'linear-gradient(#0B1F4A 0 55%,#123A6A 55% 70%,#C9A86A 70%)' }, root,
      `<div style="position:absolute;left:300px;top:40px;width:70px;height:70px;border-radius:50%;background:${MOON}"></div><div style="position:absolute;left:150px;top:180px;width:120px;height:120px;border-radius:50%;background:#9AA0A8"></div><div style="position:absolute;left:135px;top:215px;width:150px;height:30px;background:#111"></div><div style="position:absolute;left:20px;bottom:16px;color:#fff;font-family:Baloo;font-weight:800;font-size:34px">📞 Kucing (pantai)</div>`);
    const c1 = chip(root, '"Laporannya kirim <b>malam ini</b> ya."', { left: 40, top: 780 });
    return { scene: sc, cam, upd(t, dur) { cam.position.set(lerp(1.9, 1.2, seg(t, 0, dur)), 2.2, -2.9); cam.lookAt(0, 1.6, .9); T.pose(t, { hold: true, nod: t < 2 }); T.userData.st.arms[1].rotation.x = t > 1.5 ? -2.4 : -.4;
      const tc = at(s, 'menelepon', 1.5), tm = at(s, 'malam ini', 5); const q = seg(t, tc, tc + .5); inset.style.opacity = q; inset.style.transform = `scale(${E.back(q)})`; X.pop(c1, seg(t, tm, tm + .4)) } };
  },
  H_RETURN(s, root) {   // ruang direktur: Kucing gosong pulang liburan, Tikus diberi gantungan kunci
    const sc = newScene(NOIR({ bg: '#1A2238', hemi: 1.4, sunI: 1.8 })); noirRoom(sc, { wall: '#2A3350' }); deskN(sc, [0, 0, -2.2], 2.6); const fl = new THREE.PointLight('#FFD8A0', 12, 9); fl.position.set(0, 3.2, 1); sc.add(fl); lampDesk(sc, [1, .82, -2.4], 24);
    const O = cast.hantu([0, .35, -3]); sc.add(O); const K = cast.kucing([-1.2, 0, -.6], { skin: '#6B5A4A' }); sc.add(K); K.rotation.y = .4; const T = cast.tikus([1.4, 0, .2]); sc.add(T); T.rotation.y = -.5;
    const key = mesh(G.torus ? new THREE.TorusGeometry(.12, .03, 8, 16) : G.ico(.1), MOON, [0, -.62, .12], { mat: { emissive: MOON, emissiveIntensity: .8 } }); T.userData.st.arms[1].add(key);
    const cam = camera(42); const c1 = chip(root, '🔑 oleh-oleh: 1 gantungan kunci', { left: 70, top: 300 }), c2 = chip(root, '😼 "<b>Tim saya</b> luar biasa!"', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3.4, 2.2, p), lerp(3.6, 2.6, p), lerp(5.6, 4.6, p)); cam.lookAt(-.2, 1.4, -1.4);
      const tk = at(s, 'gantungan', 3), tt = at(s, 'tim saya', 6); K.pose(t, { talk: t > tt, point: t > tt && t < tt + 1.5, hold: t < tt }); O.pose(t, { nod: t > tt, cheer: t > tt + 1.2 }); T.pose(t, { shake: t > tt + .5, hold: true });
      key.visible = t > tk; X.pop(c1, seg(t, tk, tk + .4)); X.pop(c2, seg(t, tt, tt + .4)) } };
  },
  H_MORAL(s, root) {   // atap gedung malam, Tikus menatap bulan, kartu moral
    const sc = newScene(NOIR({ bg: '#0A1030', hemi: .5, sunI: 1.1, sun: '#C9D6FF', sunPos: [-6, 8, -10], fog: ['#0A1030', 14, 60] }));
    sc.add(mesh(G.box(8, .3, 6), '#2A2F40', [0, -.15, 0])); sc.add(mesh(G.box(8, .5, .2), '#3A3F52', [0, .25, 2.9]));
    for (let i = 0; i < 18; i++) { const h = 3 + ((i * 53) % 9); const x = -26 + i * 3.1; const b = mesh(G.box(2.4, h, 2.4), '#141A33', [x, h / 2 - 8, -20 - (i % 3) * 3], { cast: false }); sc.add(b);
      for (let k = 0; k < 4; k++) sc.add(mesh(G.box(.3, .3, .05), ((i + k) % 3) ? '#FFD27A' : '#2A3355', [x - .6 + (k % 2) * 1.2, -8 + 1 + k * (h / 5), -20 - (i % 3) * 3 + 1.22], { mat: { emissive: '#FFC86A', emissiveIntensity: ((i + k) % 3) ? 1 : 0 }, cast: false })) }
    const moon = mesh(G.ico(2.2, 2), MOON, [6, 9, -30], { mat: { emissive: MOON, emissiveIntensity: 1.1 }, cast: false }); sc.add(moon);
    const T = cast.tikus([-.6, 0, 1.6]); sc.add(T); T.rotation.y = Math.PI * .85;
    const cam = camera(44);
    const card = X.ab({ left: 70, top: 300, width: 940, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '66px', lineHeight: 1.1, color: '#fff', opacity: 0, textShadow: '0 6px 0 #000' }, root, X.TL.vars.moral_html);
    const q = X.ab({ left: 70, top: 560, width: 940, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '48px', color: MOON, opacity: 0 }, root, X.TL.vars.q_html);
    const steps = chip(root, X.TL.vars.steps || '📝 tanggal · nama · penerima', { left: 540, top: 700, transform: 'translateX(-50%)' }); steps.style.left = '540px';
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(lerp(1.8, .9, seg(t, 0, dur)), lerp(1.6, 2.2, seg(t, 0, dur)), 5.6); cam.lookAt(.6, 1.6, -6); T.pose(t, { look: Math.sin(t * .4) * .2 });
      const a = seg(t, .2, 1); card.style.opacity = a; card.style.transform = `translateY(${(1 - a) * 20}px)`;
      const tq = at(s, 'Pernah', dur - 4), ts = at(s, X.TL.vars.steps_cue || 'Simpan jejaknya', 4); X.pop(steps, seg(t, ts, ts + .4), 'translateX(-50%)'); q.style.opacity = seg(t, tq, tq + .5);
    } };
  },
  // ===== Arisan Rimba (tamu: Ular) =====
  H_GROUPCHAT(s, root) {   // kamar kos Tikus malam: HP di kasur, grup arisan baru
    const sc = newScene(NOIR({ hemi: .6 })); noirRoom(sc, { wall: '#4A5272', wx: -1.6 });
    sc.add(mesh(G.box(3.4, .5, 2), '#3D4F7A', [.8, .25, -1.6])); sc.add(mesh(G.box(3.5, .25, 2.1), '#D9D2C3', [.8, .62, -1.6]));
    const T = cast.tikus([-1.1, 0, -.2]); sc.add(T); T.rotation.y = .6; const ph = group(sc, [.75, 2.35, .4]);
    ph.add(mesh(G.box(1.3, 2.5, .1), '#111', [0, 0, 0])); const tex = chatTex(X.TL.vars.chat1, 'Arisan Rimba Berkah'); const scr = new THREE.Mesh(G.plane(1.2, 2.36), new THREE.MeshBasicMaterial({ map: tex.t })); scr.position.z = .055; ph.add(scr);
    const glow = new THREE.PointLight('#9CC3E6', 5, 6); glow.position.set(.2, 2, 1.4); sc.add(glow);
    const cam = camera(42); const hook = X.ab({ left: 60, top: 1240, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '60px', lineHeight: 1.1, color: '#fff', textShadow: '0 6px 0 #000' }, root, `Arisannya rapi. Adminnya ramah.<br><span style="color:${MOON}">Sampai giliran Tikus.</span>`);
    return { scene: sc, cam, upd(t, dur) { tex.draw(Math.min(X.TL.vars.chat1.length, Math.ceil(seg(t, .2, dur * .7) * X.TL.vars.chat1.length)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.6, .2, p), 2.2, lerp(7.6, 6.6, p)); cam.lookAt(0, 1.6, -.4); ph.rotation.y = -.2; ph.position.y = 2.35 + Math.sin(t * 1.2) * .04; T.pose(t, { look: .4, hold: true });
      hook.style.opacity = seg(t, .1, .5) } };
  },
  H_ARISAN(s, root) {   // teras malam, tikar, hewan melingkar; kaleng dikocok, gulungan nama keluar
    const who = s.variant === 'dua' ? 'KUCING' : 'ULAR'; const sc = newScene(NOIR({ hemi: .55, sunI: .6 })); sc.add(mesh(G.box(16, .2, 16), '#5A4A3E', [0, -.1, 0])); sc.add(mesh(G.box(16, 5, .2), '#6A5670', [0, 2.5, 3.6]));
    sc.add(mesh(G.box(1, 2.2, .08), '#4A3626', [-2.5, 1.1, 3.48])); const bulb = new THREE.PointLight('#FFC27A', 40, 12); bulb.position.set(0, 3.2, -.6); bulb.castShadow = true; sc.add(bulb); sc.add(mesh(G.sph(.12, 8, 6), '#FFE2A0', [0, 3.2, -.6], { mat: { emissive: '#FFC27A', emissiveIntensity: 2 }, cast: false }));
    sc.add(mesh(G.cyl(2.3, 2.3, .03, 24), '#7A5A3A', [0, .02, 0], { cast: false }));
    const ring = [['ular', 0], ['kucing', 1], ['tikus', 2], ['kerbau', 3], ['hantu', 4], ['tikus', 5]].map(([k, i]) => { const a = i / 6 * Math.PI * 2 + .3; const P = cast[k]([Math.sin(a) * 1.8, 0, Math.cos(a) * 1.8], k === 'tikus' && i === 5 ? { body: '#C9B8A0' } : {}); sc.add(P); P.rotation.y = a + Math.PI; return P });
    const can = group(sc, [0, 0, 0]); can.add(mesh(G.cyl(.22, .22, .5, 14), '#B0B7BF', [0, .25, 0], { mat: { metalness: .5, roughness: .3 } }));
    const roll = mesh(G.cyl(.05, .05, .4, 8), '#F4F0E6', [0, .6, 0], { rot: [0, 0, Math.PI / 2], cast: false }); can.add(roll);
    const cam = camera(42); const nm = X.ab({ left: 60, top: 320, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '110px', color: '#fff', WebkitTextStroke: `14px #000`, paintOrder: 'stroke fill', opacity: 0 }, root, `“${who}”`);
    const pot = chip(root, `💰 ${X.TL.vars.pot_txt} per giliran`, { left: 300, top: 520 });
    return { scene: sc, cam, upd(t, dur) { const tw = at(s, who === 'ULAR' ? 'Ular' : 'Kucing', 2.5);
      const shake = t < tw ? Math.sin(t * 30) * .12 * seg(t, .5, 1) : 0; can.position.set(shake, t < tw ? .9 + Math.abs(shake) : lerp(.9, 0, seg(t, tw, tw + .4)), 0); can.rotation.z = shake * 2; can.parent === sc && 0;
      roll.position.y = t > tw ? .6 + E.out(seg(t, tw, tw + .5)) * .9 : .3; roll.visible = t > tw - .2;
      orbit(cam, lerp(165, 200, E.inout(seg(t, 0, dur))), 4.4, 6.6, [0, .9, 0]);
      ring.forEach((P, i) => P.pose(t + i, { nod: t > tw && i !== 2, talk: i === 0 && t < tw, look: i === 2 && t > tw ? .3 : 0, cheer: who === 'ULAR' ? false : (i === 1 && t > tw) }));
      const q = seg(t, tw, tw + .4); nm.style.opacity = q; nm.style.transform = `scale(${E.back(q)})`; X.pop(pot, seg(t, 1, 1.4)) } };
  },
  H_DOOR(s, root) {   // depan rumah Ular, gelap: pintu tertutup, tulisan DIKONTRAKKAN, Tikus memegang HP
    const sc = newScene(NOIR({ fog: [NIGHT, 7, 22] })); sc.add(mesh(G.box(16, .2, 12), '#3E4452', [0, -.1, 0]));
    const hs = group(sc, [0, 0, -2.4]); hs.add(mesh(G.box(5, 3.2, 2.4), '#56607E', [0, 1.6, 0])); hs.add(mesh(G.cone(3.8, 1.4, 4), '#1A1E2C', [0, 3.9, 0], { rot: [0, Math.PI / 4, 0] })); hs.add(mesh(G.box(1, 2, .08), '#3A2A1E', [0, 1, 1.22]));
    [-1.6, 1.6].forEach(x => hs.add(mesh(G.box(.9, .8, .05), '#151A26', [x, 1.8, 1.22])));
    const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d'); x.fillStyle = '#F4F0E6'; x.fillRect(0, 0, 512, 256); x.fillStyle = '#C0392B'; x.font = '800 70px Baloo'; x.textAlign = 'center'; x.fillText('DIKONTRAKKAN', 256, 150); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const sign = new THREE.Mesh(G.plane(1.1, .55), new THREE.MeshStandardMaterial({ map: tex, emissive: '#FFFFFF', emissiveIntensity: .25 })); sign.position.set(0, 1.5, -1.12); sc.add(sign);
    const lamp = new THREE.SpotLight('#FFD9A0', 30, 10, .5, .6, 1.2); lamp.position.set(2.5, 4.5, 2); lamp.target.position.set(0, 1, -1.2); sc.add(lamp, lamp.target);
    const T = cast.tikus([1.0, 0, .6]); sc.add(T); T.rotation.y = Math.PI * 1.15; const cam = camera(42);
    const c1 = chip(root, '📵 “Ular telah keluar dari grup”', { left: 70, top: 300 }), c2 = chip(root, `Tikus: setor ${X.TL.vars.tikus_txt}, narik Rp0`, { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'keluar dari grup', 2), td = at(s, 'dikontrakkan', 4), tt = at(s, 'belum pernah', dur - 2);
      T.pose(t, { walk: t < td ? 1 - seg(t, td - 1, td) : 0, look: t > td ? .2 : 0 }); T.position.z = lerp(2.6, .4, E.out(seg(t, 0, td))); if (t > td && t < td + 1.6) T.userData.st.arms[0].rotation.x = -1.6 + Math.sin(t * 14) * .2;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.6, -.8, p), lerp(1.6, 1.9, p), lerp(6.8, 5.2, p)); cam.lookAt(.5, 1.3, -1); X.pop(c1, seg(t, tk, tk + .4)); X.pop(c2, seg(t, tt, tt + .4)) } };
  },
  H_NEWGROUP(s, root) {   // warung kopi malam: Kucing daftar arisan baru, admin ramah dengan nama baru
    const sc = newScene(NOIR({ hemi: .6 })); sc.add(mesh(G.box(16, .2, 12), '#5A4A3E', [0, -.1, 0])); sc.add(mesh(G.box(16, 5, .2), '#56607E', [0, 2.5, -3]));
    const st = group(sc, [0, 0, -2]); st.add(mesh(G.box(4, 1, .9), '#5E3E22', [0, .5, 0])); st.add(mesh(G.box(4.4, .1, 1.6), '#8A2E2E', [0, 2.6, .3], { rot: [.2, 0, 0] })); [-2, 2].forEach(x => st.add(mesh(G.box(.1, 2.6, .1), '#3A2A1E', [x, 1.3, .7])));
    const neon = new THREE.PointLight('#FF8A5B', 14, 8); neon.position.set(0, 2.2, -1); sc.add(neon); sc.add(mesh(G.cyl(.1, .08, .2, 10), '#F4F0E6', [-.8, 1.1, -1.7]));
    const K = cast.kucing([.2, 0, -.6]); sc.add(K); K.rotation.y = .2; const ph = group(sc, [-.75, 2.3, .8]); ph.add(mesh(G.box(1.3, 2.5, .1), '#111', [0, 0, 0]));
    const tex = chatTex(X.TL.vars.chat2, 'Arisan Rimba Makmur', '#8A2E2E'); const scr = new THREE.Mesh(G.plane(1.2, 2.36), new THREE.MeshBasicMaterial({ map: tex.t })); scr.position.z = .055; ph.add(scr);
    const cam = camera(42); const c1 = chip(root, '🐍 admin: “Ula_Rr” (akun baru)', { left: 70, top: 300 }), c2 = chip(root, '🐱 setor duluan: Kucing', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) { tex.draw(Math.min(X.TL.vars.chat2.length, Math.ceil(seg(t, .3, dur * .7) * X.TL.vars.chat2.length)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.4, 0, p), 2.3, lerp(7.6, 6.6, p)); cam.lookAt(-.2, 1.7, -.6); ph.rotation.y = .2; K.pose(t, { hold: true, look: -.5, nod: t > dur * .6 });
      const ta = at(s, 'Adminnya', 3), tk = at(s, 'setor duluan', dur - 2.5); X.pop(c1, seg(t, ta, ta + .4)); X.pop(c2, seg(t, tk, tk + .4)) } };
  },
  // ===== pasar subuh (timbangan curang) =====
  H_MARKET(s, root) {   // pasar subuh: kios beras Kucing (ramai) di sebelah kios Tikus; varian end: antrean pindah ke Tikus, papan TIMBANGAN JUJUR
    const END = s.variant === 'end'; const sc = newScene(NOIR({ sky: ['#24346E', '#E8A070'], sunPos: [-8, 5, 6], sun: '#FFC89A' })); sc.add(mesh(G.box(24, .2, 14), '#5E5A62', [0, -.1, 0]));
    const stall = (x, roof) => { const g = group(sc, [x, 0, -1.6]); g.add(mesh(G.box(3, .9, 1.2), '#7A5230', [0, .45, 0])); g.add(mesh(G.box(3.4, .1, 1.8), roof, [0, 2.7, .2], { rot: [.18, 0, 0] })); [-1.5, 1.5].forEach(px => g.add(mesh(G.box(.08, 2.7, .08), '#3A2A1E', [px, 1.35, .7])));
      for (let i = 0; i < 4; i++) g.add(mesh(G.cyl(.28, .32, .6, 10), '#E8DCC0', [-1 + i * .55, 1.2, -.2])); const bulb = new THREE.PointLight('#FFC27A', 16, 6); bulb.position.set(0, 2.3, .4); g.add(bulb); g.add(mesh(G.sph(.1, 8, 6), '#FFE2A0', [0, 2.3, .4], { mat: { emissive: '#FFC27A', emissiveIntensity: 2 }, cast: false }));
      const sc2 = group(g, [1, .9, .3]); sc2.add(mesh(G.box(.5, .12, .4), '#C0392B', [0, .06, 0])); sc2.add(mesh(G.cyl(.25, .25, .04, 14), '#DDD', [0, .3, 0])); return g };
    const kc = stall(-2.2, '#8A2E2E'), kt = stall(2.2, '#2E6A8A'); const K = cast.kucing([-2.2, 0, -2.6]), T = cast.tikus([2.2, 0, -2.6]); sc.add(K, T);
    const sign = END ? (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 160; const x = c.getContext('2d'); x.fillStyle = '#F4F0E6'; x.fillRect(0, 0, 512, 160); x.fillStyle = '#2E7D32'; x.font = '800 62px Baloo'; x.textAlign = 'center'; x.fillText('TIMBANGAN JUJUR', 256, 105); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(G.plane(2.4, .75), new THREE.MeshStandardMaterial({ map: t, emissive: '#FFFFFF', emissiveIntensity: .3 })); m.position.set(2.2, 2.25, -.85); sc.add(m); return m })() : null;
    const sealed = END ? (() => { const m = mesh(G.box(.7, .06, .6), '#E5C04A', [-1.2, 1.32, -1.25], { cast: false }); sc.add(m); return m })() : null;
    const buyers = Array.from({ length: 5 }, (_, i) => { const P = (i === 0 ? cast.kerbau : i % 2 ? cast.tikus : cast.hantu)([0, 0, 0], i % 2 ? { body: ['#C9B8A0', '#8FA8C8'][i % 2] } : {}); sc.add(P); P.rotation.y = Math.PI; P.position.set((END ? 2.2 : -2.2) + (i % 2 ? .7 : -.6) + (i > 2 ? (END ? 1 : -1) : 0), 0, .4 + i * .8); return P });
    const cam = camera(42); const hook = END ? null : X.ab({ left: 60, top: 1240, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '60px', lineHeight: 1.1, color: '#fff', textShadow: '0 6px 0 #000' }, root, `Beli sekilo di pasar.<br><span style="color:${MOON}">Sampai rumah: 8 ons.</span>`);
    const card = END ? X.ab({ left: 70, top: 300, width: 940, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '58px', lineHeight: 1.1, color: '#fff', opacity: 0, textShadow: '0 6px 0 #000' }, root, `Yang dikurangi cuma 2 ons.<br><span style="color:${MOON}">Yang hilang: semua pelanggan.</span>`) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(END ? 3 : -3, END ? 1 : -1, p), lerp(6.4, 5.6, p), lerp(10.5, 9.5, p)); cam.lookAt(END ? 1.4 : -1.4, 1.2, -1.6);
      K.pose(t, { talk: !END, hold: !END, look: END ? .5 : 0, shake: END && t > dur * .5 }); T.pose(t, { talk: END, nod: !END }); buyers.forEach((P, i) => P.pose(t + i, { look: Math.sin(t * .7 + i) * .3, hold: i === 0 }));
      if (hook) hook.style.opacity = seg(t, .1, .5); if (card) { const tc = at(s, 'Yang dikurangi', dur * .6); const q = seg(t, tc, tc + .5); card.style.opacity = q; card.style.transform = `translateY(${(1 - q) * 20}px)` } } };
  },
  H_HOME(s, root) {   // dapur Kerbau: timbangan dapur menunjukkan 800 g, ditimbang ulang
    const sc = newScene(NOIR({ hemi: .8 })); noirRoom(sc, { wall: '#5A5070', floor: '#5E4A3E', wx: -2 }); sc.add(mesh(G.box(4, .9, 1), '#E8E2D6', [.6, .45, -3.2])); sc.add(mesh(G.box(4, .08, 1.05), '#8A6A4A', [.6, .94, -3.2]));
    const lamp = new THREE.PointLight('#FFD9A0', 20, 8); lamp.position.set(.6, 3.2, -2); sc.add(lamp);
    const sc2 = group(sc, [.6, .98, -3]); sc2.add(mesh(G.box(.8, .2, .7), '#F4F6F8', [0, .1, 0])); const bag = mesh(G.cyl(.25, .3, .5, 10), '#E8DCC0', [0, .45, 0]); sc2.add(bag);
    const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = g => { if (g === last) return; last = g; x.fillStyle = '#1B2A1B'; x.fillRect(0, 0, 256, 128); x.fillStyle = '#7CFF8A'; x.font = '800 80px Baloo'; x.textAlign = 'center'; x.fillText(`${g} g`, 128, 95); tex.needsUpdate = true };
    const lcd = new THREE.Mesh(G.plane(.5, .25), new THREE.MeshBasicMaterial({ map: tex })); lcd.position.set(0, .12, .36); sc2.add(lcd); draw(0);
    const B = cast.kerbau([-.6, 0, -1.7]); sc.add(B); B.rotation.y = .5; const cam = camera(42);
    const c1 = chip(root, '🧾 beli: 1 kg', { left: 70, top: 300 }), c2 = chip(root, '⚖️ ditimbang: 800 g', { left: 70, top: 410 }), c3 = chip(root, '➖ 2 ons, tiap belanja', { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) { const t8 = at(s, 'Delapan ons', 2.5), t2 = at(s, 'Ditimbang lagi', 5), tk = at(s, 'dua ons', dur - 2);
      const ph = t < t2 ? seg(t, 1, t8) : seg(t, t2, t2 + 1.2); bag.position.y = t > t2 && t < t2 + .5 ? .9 : .45; draw(Math.round(lerp(0, 800, E.out(ph)) / 10) * 10);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.8, 1.2, p), lerp(2.4, 2, p), lerp(3.4, 2.2, p)); cam.lookAt(.5, 1.1, -3); B.pose(t, { look: .6, shake: t > tk });
      X.pop(c1, seg(t, .5, .9)); X.pop(c2, seg(t, t8, t8 + .4)); X.pop(c3, seg(t, tk, tk + .4)) } };
  },
  H_SCALE(s, root) {   // close-up bawah meja kios: magnet kecil di kaki timbangan, sorotan senter
    const sc = newScene(NOIR({ hemi: .9 })); sc.add(mesh(G.box(8, .2, 6), '#4A4048', [0, -.1, 0])); sc.add(mesh(G.box(3, .12, 1.2), '#7A5230', [0, 2.1, -1])); [-1.4, 1.4].forEach(x => sc.add(mesh(G.box(.12, 2.1, .12), '#3A2A1E', [x, 1.05, -.5])));
    const plate = group(sc, [0, 2.25, -.9]); plate.add(mesh(G.box(.9, .2, .7), '#C0392B', [0, 0, 0])); plate.add(mesh(G.cyl(.4, .4, .05, 16), '#DDD', [0, .4, 0]));
    const dial = mesh(G.cyl(.3, .3, .04, 20), '#F4F0E6', [0, 2.25, -.53], { rot: [Math.PI / 2, 0, 0], cast: false }); sc.add(dial); const needle = group(sc, [0, 2.25, -.5]); needle.add(mesh(G.box(.03, .26, .01), '#C0392B', [0, .12, 0], { cast: false }));
    const mag = group(sc, [0, 1.97, -.8]); mag.add(mesh(G.box(.36, .14, .2), '#C0392B', [0, 0, 0])); [-1, 1].forEach(i => mag.add(mesh(G.box(.1, .14, .21), '#DDD', [i * .2, 0, 0])));
    const beam = new THREE.SpotLight('#FFF6D8', 0, 6, .35, .5, 1); beam.position.set(1.6, .6, 2); beam.target.position.set(0, 1.97, -.8); sc.add(beam, beam.target);
    const cam = camera(40); const c1 = chip(root, '🧲 magnet di kaki timbangan', { left: 70, top: 300 }), c2 = chip(root, 'jarum selalu +200 g', { left: 70, top: 410 });
    const big = X.ab({ left: 60, top: 1240, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '56px', color: '#fff', opacity: 0, textShadow: '0 6px 0 #000' }, root, `Murahnya bukan di harga.<br><span style="color:${MOON}">Murahnya di timbangan.</span>`);
    return { scene: sc, cam, upd(t, dur) { const tm = at(s, 'magnet', 2), tb = at(s, 'Murahnya', dur - 3); beam.intensity = t > tm - .3 ? 26 : 0; needle.rotation.z = -.6 - Math.sin(t * 2) * .03;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.4, .6, p), lerp(2.8, 1.1, p), lerp(4.4, 2.6, p)); cam.lookAt(0, lerp(2.3, 1.95, p), -.8); mag.scale.setScalar(1 + (t > tm ? Math.sin(t * 6) * .06 : 0));
      X.pop(c1, seg(t, tm, tm + .4)); X.pop(c2, seg(t, tm + 1.2, tm + 1.6)); big.style.opacity = seg(t, tb, tb + .5) } };
  },
  H_TERA(s, root) {   // subuh: Burung Hantu petugas pasar menera ulang timbangan, antrean pedagang; timbangan Kucing disegel
    const sc = newScene(NOIR({ sky: ['#24346E', '#D99A70'], sunPos: [-8, 5, 6], sun: '#FFC89A' })); sc.add(mesh(G.box(20, .2, 12), '#5E5A62', [0, -.1, 0]));
    const tb = group(sc, [0, 0, -1.5]); tb.add(mesh(G.box(3.4, .9, 1.2), '#4A5A7A', [0, .45, 0])); const ref = mesh(G.box(.5, .4, .4), '#7A7A82', [-.8, 1.1, 0], { mat: { metalness: .6, roughness: .3 } }); tb.add(ref);
    const H = cast.hantu([0, 0, -2.6], { prop: 'clipboard' }); sc.add(H); const line = [cast.kucing([-.3, 0, .2]), cast.tikus([.6, 0, 1.2]), cast.tikus([-.4, 0, 2.2], { body: '#8FA8C8' }), cast.kerbau([1.6, 0, .8])];
    line.forEach((P, i) => { sc.add(P); P.rotation.y = i === 3 ? -.6 : Math.PI });
    const cs = group(sc, [.6, .9, -1.3]); cs.add(mesh(G.box(.5, .12, .4), '#C0392B', [0, .06, 0])); const seal = mesh(G.box(.56, .04, .46), '#E5C04A', [0, .15, 0], { cast: false }); cs.add(seal);
    const cam = camera(42); const c1 = chip(root, '⚖️ tera ulang semua timbangan', { left: 70, top: 300 }), c2 = chip(root, '🔒 timbangan Kucing: DISEGEL', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) { const tt = at(s, 'ditera ulang', 3), ts = at(s, 'disegel', dur - 2); seal.visible = t > ts;
      orbit(cam, lerp(-20, 15, E.inout(seg(t, 0, dur))), 3, 8, [0, 1.1, -.6]); H.pose(t, { hold: true, talk: t > tt, nod: t > ts }); line.forEach((P, i) => P.pose(t + i, { look: i === 0 && t > ts ? .4 : 0, shake: i === 0 && t > ts, nod: i === 3 && t > ts }));
      X.pop(c1, seg(t, tt, tt + .4)); X.pop(c2, seg(t, ts, ts + .4)) } };
  },
};

let title, fade;
export function chrome(ctx) { title = ctx.ab({ left: 50, top: 70, zIndex: 8, fontFamily: 'Baloo', fontWeight: 800 }, ctx.ov); fade = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#000', opacity: 0, zIndex: 9 }, ctx.ov) }
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const full = `${s.kicker} — ${s.sub}`; const n = Math.floor(clamp((t - .2) / 1) * full.length);   // efek mesin tik
  title.innerHTML = `<div style="font-size:48px;color:${MOON};letter-spacing:2px;text-shadow:0 4px 0 #000">${full.slice(0, n)}<span style="opacity:${Math.sin(t * 8) > 0 ? 1 : 0}">▌</span></div>`;
  let f = 0; X.TL.scenes.forEach((x, i) => { if (i) f = Math.max(f, 1 - Math.abs(T - x.start) / .35) }); fade.style.opacity = clamp(f * 1.2);
}

// ===================== 10 Nov 2026: grup chat (Hewan di Sekitarmu), kerja kelompok (Dari Mata Korban), pinjam barang (Pepatah Baru) =====================
const ftag = (root, html, css = {}) => { const w = X.ab({ left: 0, top: 0 }, root); const e = chip(w, html, Object.assign({ position: 'relative', transform: 'translate(-50%,-100%)' }, css));
  return { e, at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = Math.max(170, Math.min(910, x)) + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } };
const bottomHook = (root, html, o = {}) => X.ab(Object.assign({ left: 60, top: 1240, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '60px', lineHeight: 1.1, color: '#fff', textShadow: '0 6px 0 #000' }, o), root, html);
const topCard = (root, html, o = {}) => X.ab(Object.assign({ left: 70, top: 300, width: 940, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '60px', lineHeight: 1.1, color: '#fff', opacity: 0, textShadow: '0 6px 0 #000' }, o), root, html);
const bubble = (root, html, col = '#FFFFFF', ink = '#1B2347', o = {}) => { const e = X.ab(Object.assign({ background: col, color: ink, borderRadius: '34px', padding: '16px 28px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '44px', whiteSpace: 'nowrap', boxShadow: '0 8px 0 #00000055', border: '4px solid #0B1026' }, o), root, html); e.style.opacity = 0; return e };
function txtTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); draw(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t }
function skyline(sc, z = -22) { for (let i = 0; i < 18; i++) { const h = 3 + ((i * 53) % 9); const x = -26 + i * 3.1; sc.add(mesh(G.box(2.4, h, 2.4), '#1C2550', [x, h / 2 - 3, z - (i % 3) * 3], { cast: false }));
  for (let k = 0; k < 4; k++) sc.add(mesh(G.box(.3, .3, .05), ((i + k) % 3) ? '#FFD27A' : '#2A3355', [x - .6 + (k % 2) * 1.2, -2 + k * (h / 5), z - (i % 3) * 3 + 1.22], { mat: { emissive: '#FFC86A', emissiveIntensity: ((i + k) % 3) ? 1 : 0 }, cast: false })) } }
function streetLamp(sc, p, I = 14) { const g = group(sc, p); g.add(mesh(G.cyl(.06, .08, 3.6, 8), '#3A3F52', [0, 1.8, 0])); g.add(mesh(G.box(.6, .1, .25), '#3A3F52', [-.25, 3.6, 0])); g.add(mesh(G.box(.4, .06, .2), '#FFF2C8', [-.4, 3.54, 0], { mat: { emissive: '#FFE2A0', emissiveIntensity: 2 }, cast: false }));
  const L = new THREE.PointLight('#FFE0A8', I, 9); L.position.set(-.4, 3.3, 0); g.add(L); return g }
function phoneMesh(parent, p, s = 1) { const g = group(parent, p); g.scale.setScalar(s); g.add(mesh(G.box(.14, .26, .03), '#111', [0, 0, 0])); g.add(mesh(G.box(.12, .22, .01), '#BFE3FF', [0, 0, .02], { mat: { emissive: '#9CC3E6', emissiveIntensity: 1.2 }, cast: false })); return g }
function nameTent(parent, p, name) { const t = txtTex(256, 96, x => { x.fillStyle = '#F4F0E6'; x.fillRect(0, 0, 256, 96); x.fillStyle = '#1B2347'; x.font = '800 54px Baloo'; x.textAlign = 'center'; x.fillText(name, 128, 68) });
  const m = new THREE.Mesh(G.box(.5, .2, .02), [mat('#F4F0E6'), mat('#F4F0E6'), mat('#F4F0E6'), mat('#F4F0E6'), new THREE.MeshStandardMaterial({ map: t }), mat('#F4F0E6')]); m.position.set(...p); m.rotation.x = -.25; parent.add(m); return m }
function bor(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.32, .2, .12), '#F2B233', [0, 0, 0])); g.add(mesh(G.box(.1, .26, .1), '#2B2B2B', [-.06, -.2, 0])); g.add(mesh(G.cyl(.02, .015, .22, 6), '#AAA', [.26, 0, 0], { rot: [0, 0, Math.PI / 2] })); return g }
function ladder(parent, p, h = 2.4) { const g = group(parent, p); [-.25, .25].forEach(x => g.add(mesh(G.box(.06, h, .06), '#C9C9C9', [x, h / 2, 0]))); for (let i = 1; i < 7; i++) g.add(mesh(G.box(.5, .04, .05), '#C9C9C9', [0, i * h / 7, 0])); return g }
function cart(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.8, .35, .6), '#5A7A9A', [0, .45, 0])); g.add(mesh(G.cyl(.16, .16, .08, 12), '#222', [.4, .16, 0], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.box(.7, .04, .04), '#333', [-.6, .55, .22])); g.add(mesh(G.box(.7, .04, .04), '#333', [-.6, .55, -.22])); return g }
function hoseCoil(parent, p) { const g = group(parent, p); for (let i = 0; i < 4; i++) g.add(mesh(new THREE.TorusGeometry(.26 - i * .03, .035, 6, 18), '#2E9E5B', [0, .05 + i * .06, 0], { rot: [Math.PI / 2, 0, 0] })); return g }
function homeN(sc, p, o = {}) { const g = group(sc, p); if (o.rot) g.rotation.y = o.rot; const w = o.w || 4.4; g.add(mesh(G.box(w, 2.6, 3.2), o.wall || '#56607E', [0, 1.3, 0])); g.add(mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), o.roof || '#2A2F44', [0, 3.2, 0], { s: [(w + .6) * .72, 1.3, 3.8 * .72], rot: [0, Math.PI / 4, 0] }));
  g.add(mesh(G.box(.9, 1.8, .06), '#3A2A1E', [-w / 4, .9, 1.62])); const win = mesh(G.box(1, .8, .05), '#FFD98A', [w / 4, 1.5, 1.62], { mat: { emissive: '#FFC86A', emissiveIntensity: 1 }, cast: false }); g.add(win);
  g.add(mesh(G.box(w + 1.6, .5, .08), '#7A6A5A', [0, .25, 3])); const L = new THREE.PointLight('#FFD9A0', 8, 6); L.position.set(-w / 4, 2.3, 2.2); g.add(L); g.add(mesh(G.sph(.1, 8, 6), '#FFE8B0', [-w / 4, 2.2, 1.7], { mat: { emissive: '#FFD27A', emissiveIntensity: 2 }, cast: false })); return g }

Object.assign(SHOTS, {
  // ---- Hewan di Sekitarmu: 3 tipe di grup chat ----
  H_GCSTAGE(s, root) {   // panggung "dunia grup chat" di atas kota malam: tiga podium bernomor; varian end: podium ke-4 bertanda "lo?"
    const END = s.variant === 'end'; const sc = newScene(NOIR({ hemi: 1, sunI: 1.4 })); skyline(sc);
    sc.add(mesh(G.box(9, .4, 6), '#1B2347', [0, -.2, 0])); for (let i = 0; i < 6; i++) sc.add(mesh(G.box(2.4 + (i % 3) * .6, .05, .7), i % 2 ? '#DCF8C6' : '#FFFFFF', [(i % 2 ? 1 : -1) * 1.6, .02, -2.2 + i * .8], { cast: false, mat: { emissive: '#FFFFFF', emissiveIntensity: .15 } }));
    const xs = END ? [-2.1, -.7, .7, 2.1] : [-1.6, 0, 1.6]; const who = [cast.beo, cast.bunglon, cast.kucing, cast.tikus];
    const peds = xs.map((x, i) => { const g = group(sc, [x, 0, -.4]); g.add(mesh(G.cyl(.55, .62, .8 + (i === 1 ? .3 : 0), 16), ['#E5484D', '#3FAE49', ORANGE, '#5A6B9A'][i], [0, .4, 0]));
      const A = (END && i === 3) ? null : who[i]([0, .8 + (i === 1 ? .3 : 0), 0], { parent: g }); const sp = new THREE.SpotLight('#FFF2D0', 0, 9, .35, .5, 1); sp.position.set(x, 6, 2.5); sp.target.position.set(x, .8, -.4); sc.add(sp, sp.target); return { g, A, sp } });
    const mirror = END ? (() => { const m = mesh(G.box(.8, 1.4, .06), '#BFD7F2', [2.1, 1.6, -.4], { mat: { metalness: .8, roughness: .1, emissive: '#5A7AB0', emissiveIntensity: .4 } }); sc.add(m); return m })() : null;
    const bub = Array.from({ length: 10 }, (_, i) => { const b = mesh(G.box(.9, .4, .08), i % 3 ? '#FFFFFF' : '#DCF8C6', [0, 0, -2.5], { cast: false, mat: { emissive: '#FFFFFF', emissiveIntensity: .2 } }); sc.add(b); return b });
    const nums = peds.map((_, i) => ftag(root, END && i === 3 ? 'lo?' : `#${i + 1}`, { fontSize: '54px' }));
    const cam = camera(42); const hook = END ? null : bottomHook(root, `Di grup chat lo, pasti ada<br><span style="color:${MOON}">3 hewan ini.</span>`);
    const card = END ? topCard(root, `Nggak nemu ketiganya?<br><span style="color:${MOON}">Jangan-jangan lo salah satunya.</span>`, { fontSize: '56px' }) : null;
    return { scene: sc, cam, upd(t, dur) {
      const cues = END ? [0, 0, 0, at(s, 'salah satunya', dur * .6)] : [.2, .9, 1.6]; peds.forEach((P, i) => { const on = t > cues[i]; P.sp.intensity = on ? 40 : 0; if (P.A) P.A.pose(t + i, { talk: i === 0 && on, look: Math.sin(t + i) * .3, nod: i === 2 }); if (P.A && P.A.userData.tint) P.A.userData.tint(['#7BC043', '#E5484D', '#3E8FC4'][Math.floor(t * 1.2) % 3]) });
      bub.forEach((b, i) => { const u = ((t * .25 + i / 10) % 1); b.position.set(((i * 37) % 10) / 10 * 8 - 4, u * 6, -2.6 - (i % 3)); b.rotation.y = Math.sin(i) * .3 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, 1, p), lerp(2.4, 2.9, p), lerp(10.5, 11.5, p)); cam.lookAt(0, 1.6, -.4);
      nums.forEach((n, i) => n.at(peds[i].g, cam, [0, 2.6 + (i === 1 ? .3 : 0), 0], seg(t, cues[i], cues[i] + .4)));
      if (hook) hook.style.opacity = seg(t, 0, .3); if (card) { const q = seg(t, cues[3], cues[3] + .5); card.style.opacity = q; card.style.transform = `translateY(${(1 - q) * 20}px)` }
    } };
  },
  H_GCBEO(s, root) {   // halte malam: Beo meneruskan pesan; gelembung terbang ke 5 grup; lalu "maaf, ternyata salah"
    const sc = newScene(NOIR({ hemi: 1, sunI: 1.4 })); skyline(sc, -18); sc.add(mesh(G.box(20, .2, 12), '#3E4452', [0, -.1, 0])); sc.add(mesh(G.box(20, .05, 2.4), '#2A2F3E', [0, .02, 3]));
    const hal = group(sc, [0, 0, -1]); hal.add(mesh(G.box(4, .1, 1.6), '#5A7A9A', [0, 2.6, 0])); [-1.9, 1.9].forEach(x => hal.add(mesh(G.box(.08, 2.6, .08), '#3A3F52', [x, 1.3, -.6]))); hal.add(mesh(G.box(3, .1, .6), '#8A6A4A', [0, .55, -.4])); hal.add(mesh(G.box(3.6, 1.6, .05), '#BFD7F2', [0, 1.5, -.75], { mat: { transparent: true, opacity: .35 }, cast: false }));
    streetLamp(sc, [3, 0, 1]); const B = cast.beo([0, .1, -.3]); sc.add(B); B.rotation.y = .2; const ph = phoneMesh(B.userData.st.arms[1], [0, -.6, .12], 1.4);
    const groups = ['Grup RT', 'Grup Alumni', 'Grup Kantor', 'Grup Keluarga', 'Grup Arisan']; const G5 = groups.map((nm, i) => { const g = group(sc, [-3.2 + i * 1.6, 3.6 + (i % 2) * .7, -2]); g.add(mesh(G.box(1.2, .5, .1), '#2E5E8C', [0, 0, 0], { mat: { emissive: '#2E5E8C', emissiveIntensity: .4 } })); return g });
    const labels = G5.map((g, i) => ftag(root, groups[i], { fontSize: '30px', padding: '6px 14px' }));
    const flyers = Array.from({ length: 5 }, () => { const m = mesh(G.box(.4, .2, .05), '#DCF8C6', [0, 0, 0], { cast: false, mat: { emissive: '#DCF8C6', emissiveIntensity: .4 } }); sc.add(m); return m });
    const cam = camera(42); const c1 = chip(root, '↪ diteruskan: <b>5 grup</b>', { left: 70, top: 560 }), c2 = chip(root, '💬 “dari grup sebelah”', { left: 70, top: 670 });
    const sorry = bubble(root, 'maaf, ternyata salah 🙏', '#FFDADA', '#8A1C1C', { left: 160, top: 790, fontSize: '54px' });
    return { scene: sc, cam, upd(t, dur) {
      const tf = at(s, 'diteruskan', 1.5), tg = at(s, 'grup sebelah', dur * .45), tm = at(s, 'maaf', dur - 2.5);
      flyers.forEach((f, i) => { const a = tf + i * .35, q = seg(t, a, a + 1); f.visible = q > 0 && q < 1; const P0 = new THREE.Vector3(.3, 1.6, -.1), P1 = G5[i].position; f.position.set(lerp(P0.x, P1.x, q), lerp(P0.y, P1.y, q) + Math.sin(q * Math.PI) * 1, lerp(P0.z, P1.z, q)); f.rotation.z = q * 6 });
      B.pose(t, { hold: true, talk: t > tm, bounce: t > tf && t < tf + 2 }); B.userData.st.arms[1].rotation.x = -1.3;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.5, 1.5, p), lerp(2.3, 2.8, p), lerp(7.2, 8.4, p)); cam.lookAt(0, 2, -1);
      labels.forEach((l, i) => l.at(G5[i], cam, [0, .4, 0], seg(t, tf + i * .35 + .8, tf + i * .35 + 1.1))); X.pop(c1, seg(t, tf + 1, tf + 1.4)); X.pop(c2, seg(t, tg, tg + .4)); X.pop(sorry, seg(t, tm, tm + .4));
    } };
  },
  H_GCBUNGLON(s, root) {   // taman kota malam: Kucing "pantai", Kerbau "gunung"; Bunglon berubah warna mengikuti yang terakhir chat
    const sc = newScene(NOIR({ hemi: 1, sunI: 1.4 })); sc.add(mesh(G.box(20, .2, 14), '#3E5A44', [0, -.1, 0])); sc.add(mesh(G.cyl(2.6, 2.6, .05, 24), '#7A7A82', [0, .02, 0], { cast: false }));
    [[-5, -4], [5, -4.5], [-6, 2], [6, 2.5]].forEach(([x, z], i) => { const g = group(sc, [x, 0, z]); g.add(mesh(G.cyl(.15, .2, 1.4, 6), '#5A3E2A', [0, .7, 0])); g.add(mesh(G.ico(1.1, 0), i % 2 ? '#2E6A3E' : '#3A7A4A', [0, 2, 0])) });
    streetLamp(sc, [-3, 0, -1.5], 16); streetLamp(sc, [3.4, 0, -1.8], 16); sc.add(mesh(G.box(2.2, .1, .6), '#8A6A4A', [0, .5, -1.4]));
    const Bg = cast.bunglon([0, 0, -.6]); sc.add(Bg); const K = cast.kucing([-2.6, 0, .6]); K.rotation.y = .7; const R = cast.kerbau([2.7, 0, .5]); R.rotation.y = -.7; sc.add(K, R); [K, R].forEach(a => phoneMesh(a.userData.st.arms[1], [0, -.6, .12], 1.3));
    const cam = camera(42); const bK = bubble(root, '🏖️ ke pantai!', '#FFD8B0', '#7A3A10', { left: 70, top: 330 }), bR = bubble(root, '⛰️ ke gunung!', '#CDEBFF', '#12406A', { left: 600, top: 330 });
    const bS = bubble(root, 'setuju! 👍', '#FFFFFF', '#1B2347', { left: 380, top: 470 }), bT = bubble(root, 'terserah 😅', '#FFF3B0', '#6A5200', { left: 340, top: 600, fontSize: '60px' });
    return { scene: sc, cam, upd(t, dur) {
      const tp = at(s, 'pantai', 2), tg = at(s, 'gunung', 4.5), tw = at(s, 'Warnanya', dur * .5), tt = at(s, 'terserah', dur - 2);
      const col = t > tt ? ['#E5484D', '#F2B233', '#3FAE49', '#3E8FC4', '#9A5AC8'][Math.floor(t * 6) % 5] : t > tw ? (Math.floor(t * 2) % 2 ? '#F28C28' : '#5AA0D8') : t > tg ? '#5AA0D8' : t > tp ? '#F28C28' : '#7BC043'; Bg.userData.tint(col);
      Bg.pose(t, { nod: (t > tp && t < tp + 1.2) || (t > tg && t < tg + 1.2), shake: t > tt, look: t > tg ? .5 : t > tp ? -.5 : 0 }); K.pose(t, { hold: true, talk: t > tp && t < tg }); R.pose(t, { hold: true, talk: t > tg && t < tw });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(0, .6, p), lerp(2.6, 3, p), lerp(9, 10, p)); cam.lookAt(0, 1.3, -.2);
      X.pop(bK, seg(t, tp, tp + .4)); X.pop(bR, seg(t, tg, tg + .4)); X.pop(bS, (t > tp && t < tp + 1.5) || (t > tg && t < tg + 1.5) ? 1 : 0); X.pop(bT, seg(t, tt, tt + .4));
    } };
  },
  H_GCKUCING(s, root) {   // ruang tamu mewah Kucing malam: rebahan di sofa, grup terus dibaca tanpa balas, lalu minta pinjaman tengah malam
    const sc = newScene(NOIR({ hemi: .9 })); noirRoom(sc, { wall: '#4A3A5A', floor: '#5A4A3E', wx: 2.2 }); const fl = new THREE.PointLight('#FFC8A0', 10, 9); fl.position.set(-1, 3.2, 1.5); sc.add(fl);
    const so = group(sc, [-.6, 0, -1.8]); so.add(mesh(G.box(3, .5, 1.1), '#8A2E4A', [0, .45, 0])); so.add(mesh(G.box(3, .9, .3), '#8A2E4A', [0, .9, -.45])); [-1.5, 1.5].forEach(x => so.add(mesh(G.box(.3, .8, 1.1), '#7A2440', [x, .6, 0])));
    const K = cast.kucing([-.6, .75, -1.7]); sc.add(K); K.rotation.z = -Math.PI / 2 + .3; K.position.set(-1.4, 1.0, -1.7); phoneMesh(K.userData.st.arms[1], [0, -.6, .12], 1.4);
    const tv = mesh(G.box(2, 1.1, .06), '#1B2347', [2.6, 1.6, -3.85], { mat: { emissive: '#5A7AB0', emissiveIntensity: .5 }, cast: false }); sc.add(tv); sc.add(mesh(G.box(1, .35, .5), '#E5C04A', [1.6, .2, -.4], { mat: { metalness: .6, roughness: .3 } }));
    const ph = group(sc, [-1.9, 2.6, -.4]); ph.add(mesh(G.box(1.3, 2.5, .1), '#111', [0, 0, 0])); const tex = chatTex(X.TL.vars.chat3, 'Geng Rimba (24)', '#5A3A8A'); const scr = new THREE.Mesh(G.plane(1.2, 2.36), new THREE.MeshBasicMaterial({ map: tex.t })); scr.position.z = .055; ph.add(scr);
    const cam = camera(42); const c1 = chip(root, '👀 3 bulan: <b>cuma baca</b>', { left: 70, top: 300 }); const clk = chip(root, '🕛 00.12', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    const big = bubble(root, 'guys, ada yang bisa<br>pinjemin 500 ribu? 🙏', '#FFFFFF', '#1B2347', { left: 120, top: 560, fontSize: '54px', whiteSpace: 'normal', width: 760, textAlign: 'center' });
    return { scene: sc, cam, upd(t, dur) {
      const tb = at(s, 'cuma baca', 1.5), tq = at(s, 'tengah malam', dur * .6), tp = at(s, 'guys', dur - 3);
      const n = X.TL.vars.chat3.length; tex.draw(t < tp ? Math.min(n - 1, Math.ceil(seg(t, .3, tq) * (n - 1))) : n);
      K.pose(t, { hold: true, look: .2 }); K.userData.st.arms[1].rotation.x = -1.6; if (K.userData.tail) K.userData.tail.rotation.z = Math.sin(t * 2) * .3;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.4, 1, p), lerp(2.4, 2.2, p), lerp(7.2, 6.4, p)); cam.lookAt(-.5, 1.6, -1); ph.rotation.y = .25; ph.position.y = 2.6 + Math.sin(t * 1.2) * .04;
      X.pop(c1, seg(t, tb, tb + .4)); X.pop(clk, seg(t, tq, tq + .4)); X.pop(big, seg(t, tp, tp + .4)); tv.material.emissiveIntensity = .4 + Math.sin(t * 7) * .1;
    } };
  },
  // ---- Dari Mata Korban: kerja kelompok ----
  H_LIB(s, root) {   // perpustakaan kampus malam: Tikus sendirian, empat kursi kosong bernama; varian chat: alasan muncul di atas kursi
    const CH = s.variant === 'chat'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1, sunI: 1.4, fog: [NIGHT, 12, 30] })); noirRoom(sc, { wall: '#4A5272', floor: '#5A4A3E', wx: -3 });
    const bc = ['#C0392B', '#E5C04A', '#2E6A8A', '#3FAE49', '#9A5AC8', '#F28C28']; for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) sc.add(mesh(G.box(.18, .5 + (i % 3) * .08, .3), bc[(i + r) % 6], [.2 + i * .26, .8 + r * .75, -3.75], { cast: false }));
    for (let r = 0; r < 4; r++) sc.add(mesh(G.box(4.8, .06, .4), '#5E3E22', [2.4, .5 + r * .75, -3.75]));
    [-1.5, 1.5].forEach(x => { const L = new THREE.PointLight('#FFE0A8', 14, 8); L.position.set(x, 3.2, .2); sc.add(L); sc.add(mesh(G.cone(.4, .3, 12, 1), '#3A3A3A', [x, 3.4, .2])); sc.add(mesh(G.sph(.12, 8, 6), '#FFE8B0', [x, 3.25, .2], { mat: { emissive: '#FFD27A', emissiveIntensity: 2 }, cast: false })) });
    sc.add(mesh(G.box(5.4, .1, 1.4), '#7A5230', [0, .8, 0])); sc.add(mesh(G.box(5.2, .76, 1.2), '#5E3E22', [0, .38, 0]));
    const T = cast.tikus([-2, 0, .95]); sc.add(T); T.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .55, .6), '#2A2A33', [-2, .27, .95]));
    const lap = group(sc, [-2, .86, .3]); lap.add(mesh(G.box(.6, .03, .4), '#9AA0A8', [0, 0, 0])); lap.add(mesh(G.box(.6, .4, .03), '#9AA0A8', [0, .2, -.2], { rot: [-.2, 0, 0] })); lap.add(mesh(G.box(.54, .34, .01), '#BFE3FF', [0, .2, -.18], { rot: [-.2, 0, 0], mat: { emissive: '#9CC3E6', emissiveIntensity: 1.2 }, cast: false }));
    const names = ['KUCING', 'BEO', 'BUNGLON', 'ULAR']; const chairs = names.map((nm, i) => { const g = group(sc, [-.8 + i * 1.2, 0, .95]); g.add(mesh(G.box(.6, .55, .6), '#2A2A33', [0, .27, 0])); g.add(mesh(G.box(.6, .8, .08), '#2A2A33', [0, .8, .3])); nameTent(sc, [-.8 + i * 1.2, .92, .5], nm); return g });
    for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.4, .12 + (i % 2) * .04, .3), bc[i], [-2.6 + (i % 2) * .2, .9 + i * .12, -.2], { cast: false }));
    const clock = txtTex(256, 256, x => { x.fillStyle = '#F4F0E6'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.strokeStyle = '#1B2347'; x.lineWidth = 14; x.stroke(); x.lineCap = 'round'; x.beginPath(); x.moveTo(128, 128); x.lineTo(128, 50); x.stroke(); x.beginPath(); x.moveTo(128, 128); x.lineTo(84, 104); x.stroke() });
    const ck = new THREE.Mesh(G.plane(.8, .8), new THREE.MeshBasicMaterial({ map: clock })); ck.position.set(-2.4, 3.2, -3.85); sc.add(ck);
    const cam = camera(42); const hook = CH ? null : bottomHook(root, `Tugas kelompok 5 ekor.<br><span style="color:${MOON}">Yang ngerjain: gue doang.</span>`);
    const c1 = CH ? null : chip(root, '📚 bab 1 → daftar pustaka: <b>Tikus</b>', { left: 70, top: 300 }), c2 = CH ? null : chip(root, '🪑 4 kursi kosong, 4 nama di sampul', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    const bubs = CH ? v.alasan.map(([nm, tx]) => ftag(root, `<span style="color:${ORANGE}">${nm}:</span> ${tx}`, { fontSize: '36px' })) : [];
    return { scene: sc, cam, upd(t, dur) {
      T.pose(t, { hold: true }); T.userData.st.arms.forEach((A, i) => { A.rotation.x = -1.1 + Math.sin(t * 14 + i * 2) * .12 });
      const p = E.inout(seg(t, 0, dur));
      if (CH) { cam.position.set(lerp(-4.3, -3.6, p), 2.9, lerp(4.4, 5.2, p)); cam.lookAt(lerp(-1, 1.2, p), 1.4, .6); const cues = v.alasan_cues.map((c, i) => at(s, c, 1 + i * 2)); bubs.forEach((b, i) => b.at(chairs[i], cam, [0, 1.6 + (i % 2) * .5, 0], seg(t, cues[i], cues[i] + .4))) }
      else { cam.position.set(lerp(-4.4, -3.8, p), lerp(2.3, 2.8, p), lerp(3.2, 4.8, p)); cam.lookAt(-.6, 1.1, .5); hook.style.opacity = seg(t, 0, .3); const tk = at(s, 'kosong', dur * .6); X.pop(c1, seg(t, at(s, 'daftar pustaka', 2), at(s, 'daftar pustaka', 2) + .4)); X.pop(c2, seg(t, tk, tk + .4)) }
    } };
  },
  H_CLASS(s, root) {   // ruang kelas malam terang: Kucing presentasi slide Tikus; varian tanya: dosen Burung Hantu membuka lembar kontribusi
    const Q = s.variant === 'tanya'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.3, sunI: 1.8 })); noirRoom(sc, { window: false, wall: '#56607E', floor: '#4A4048' }); [[-2, 3.4, 1.5], [2, 3.4, 1.5]].forEach(([x, y, z]) => { const L = new THREE.PointLight('#FFF0D0', 14, 10); L.position.set(x, y, z); sc.add(L) });
    const slide = txtTex(1024, 576, x => { x.fillStyle = '#F4F7FA'; x.fillRect(0, 0, 1024, 576); x.fillStyle = '#2E6A8A'; x.fillRect(0, 0, 1024, 100); x.fillStyle = '#fff'; x.font = '800 56px Baloo'; x.fillText('HASIL PENELITIAN', 40, 70); x.fillStyle = '#1B2347'; x.font = '800 46px Baloo';
      ['Data 3 tahun terakhir', 'Analisis per musim', 'Kesimpulan + saran'].forEach((l, i) => x.fillText('• ' + l, 60, 200 + i * 90)); x.fillStyle = '#E5C04A'; [0, 1, 2, 3].forEach(i => x.fillRect(700 + i * 70, 470 - i * 60, 50, 60 + i * 60)); x.fillStyle = '#777'; x.font = '700 34px Baloo'; x.fillText('Kelompok 3', 60, 540) });
    const scr = new THREE.Mesh(G.plane(3.4, 1.9), new THREE.MeshBasicMaterial({ map: slide })); scr.position.set(-.2, 2.7, -3.85); sc.add(scr); const sl = new THREE.PointLight('#DDE8FF', 6, 6); sl.position.set(0, 2.4, -2.6); sc.add(sl);
    const K = cast.kucing([-2, 0, -2.6]); K.rotation.y = .5; const Bo = cast.beo([.1, 0, -2.7]); Bo.rotation.y = -.2; const Bg = cast.bunglon([1, 0, -2.5]); Bg.rotation.y = -.4; const T = cast.tikus([1.9, 0, -2.3]); T.rotation.y = -.6; const U = cast.ular([2.7, 0, -2.4]); U.rotation.y = -.7;
    [K, Bo, Bg, T, U].forEach(a => sc.add(a)); T.userData.st.arms[1].add(mesh(G.box(.08, .2, .05), '#222', [0, -.62, .1]));
    const dsk = group(sc, [-3.2, 0, .6]); dsk.add(mesh(G.box(1.6, .08, .8), '#4A3626', [0, .78, 0])); dsk.add(mesh(G.box(1.5, .74, .7), '#3A2A1E', [0, .37, 0])); const O = cast.hantu([-3.2, 0, 1.3]); sc.add(O); O.rotation.y = Math.PI + .5;
    const sheet = mesh(G.box(.32, .01, .44), '#F4F0E6', [0, -.62, .14], { cast: false, mat: { emissive: '#F4F0E6', emissiveIntensity: .3 } }); O.userData.st.arms[1].add(sheet); sheet.visible = Q;
    const studs = []; for (let r = 0; r < 1; r++) for (let c = 0; c < 4; c++) { const a = [cast.tikus, cast.kerbau, cast.tikus, cast.hantu][(r + c) % 4]([[-3.4, -2.4, 2.8, 3.8][c], 0, 1.4], (r + c) % 2 ? { body: ['#8FA8C8', '#C9B8A0'][r] } : {}); a.rotation.y = Math.PI; sc.add(a); studs.push(a) }
    const cam = camera(42);
    const c1 = Q ? null : chip(root, '🎤 presentasi: <b>Kucing</b>', { left: 70, top: 300 }), c2 = Q ? null : chip(root, '🖱️ pegang remote: <b>Tikus</b>', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    const qb = Q ? bubble(root, '🦉 “Kenapa datanya dari tahun itu?”', '#FFFFFF', '#1B2347', { left: 70, top: 300, fontSize: '42px' }) : null;
    const lk = Q ? X.ab({ left: 120, top: 420, width: 760, padding: '22px 30px', background: '#FDF6E3', border: '6px solid #0B1026', borderRadius: '12px', fontFamily: 'Baloo', fontWeight: 800, color: '#1B2347', fontSize: '38px', lineHeight: 1.25, opacity: 0, boxShadow: '0 12px 0 #00000055' }, root,
      `<div style="font-size:44px;color:#C0392B">LEMBAR KONTRIBUSI</div>${v.kontribusi.map(([n, k]) => `<div>${n}: <span style="color:${n === 'Tikus' ? '#2E7D32' : '#8A1C1C'}">${k}</span></div>`).join('')}`) : null;
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur));
      if (!Q) { const tk = at(s, 'maju', 1.5), tr = at(s, 'pegang remote', dur - 2); K.pose(t, { talk: true, point: (t % 3) < 1.2 }); Bo.pose(t, { nod: true }); Bg.pose(t, { cheer: t > at(s, 'tepuk tangan', dur * .6) }); T.pose(t, { hold: t > tr, look: -.3 }); U.pose(t, { look: .3 });
        cam.position.set(lerp(2.6, 1.4, p), 4.6, lerp(6.6, 5.8, p)); cam.lookAt(.2, 1.3, -2.4); X.pop(c1, seg(t, tk, tk + .4)); X.pop(c2, seg(t, tr, tr + .4)) }
      else { const tq = at(s, 'tahun itu', 2.5), tl = at(s, 'lembar kontribusi', dur - 2.5); K.pose(t, { shake: t > tq, look: .2 }); Bo.pose(t, { look: t > tq + 1 ? .8 : 0 }); Bg.pose(t, { look: t > tq + 2 ? -.8 : 0 }); Bg.userData.tint(t > tq + 2 ? '#C9D86A' : '#7BC043'); T.pose(t, { nod: t > tl }); U.pose(t, { look: .5 });
        O.pose(t, { talk: t < tl, hold: true }); cam.position.set(lerp(-4.6, -3.6, p), 3.8, lerp(5.8, 5, p)); cam.lookAt(.2, 1.3, -2.2); X.pop(qb, t < tl ? seg(t, .4, .8) : 0); X.pop(lk, seg(t, tl, tl + .5)) }
      studs.forEach((a, i) => a.pose(t + i, { look: Math.sin(t * .5 + i) * .2 }));
    } };
  },
  H_BOARD(s, root) {   // koridor kampus malam: papan nilai ditempel; Tikus A, empat lainnya C
    const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.6 })); noirRoom(sc, { window: false, wall: '#4A5272', floor: '#3E465E' });
    for (let i = 0; i < 4; i++) { const L = new THREE.PointLight('#FFE0A8', 8, 7); L.position.set(-4 + i * 2.8, 3.6, 0); sc.add(L); sc.add(mesh(G.box(.9, .06, .3), '#FFF2D0', [-4 + i * 2.8, 3.9, 0], { mat: { emissive: '#FFE7B0', emissiveIntensity: 1.2 }, cast: false })) }
    sc.add(mesh(G.box(3.4, 2.2, .1), '#B98B5E', [0, 2.1, -3.85])); const nil = txtTex(768, 512, x => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 768, 512); x.fillStyle = '#1B2347'; x.font = '800 54px Baloo'; x.textAlign = 'center'; x.fillText('NILAI TUGAS KELOMPOK 3', 384, 70);
      v.nilai.forEach(([n, g], i) => { x.textAlign = 'left'; x.font = '800 48px Baloo'; x.fillStyle = '#1B2347'; x.fillText(n, 120, 150 + i * 72); x.textAlign = 'right'; x.fillStyle = g === 'A' ? '#2E7D32' : '#C0392B'; x.fillText(g, 650, 150 + i * 72) }) });
    const pap = new THREE.Mesh(G.plane(2.4, 1.6), new THREE.MeshStandardMaterial({ map: nil, emissive: '#FFFFFF', emissiveIntensity: .2 })); pap.position.set(0, 2.1, -3.78); sc.add(pap);
    const T = cast.tikus([-.3, 0, -1.6]); T.rotation.y = Math.PI; const back = [cast.kucing([-2.2, 0, .4]), cast.beo([-1.2, 0, 1]), cast.bunglon([1, 0, .9]), cast.ular([2.1, 0, .3])]; back.forEach(a => { a.rotation.y = Math.PI + .2; sc.add(a) }); sc.add(T);
    const cam = camera(42); const card = topCard(root, `Kerja boleh bareng.<br><span style="color:${MOON}">Tapi catat siapa yang kerja.</span>`, { fontSize: '58px' });
    const q = X.ab({ left: 70, top: 470, width: 940, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '46px', color: MOON, opacity: 0, textShadow: '0 4px 0 #000' }, root, 'Pernah jadi Tikus di kelompok?');
    const gA = ftag(root, '<b style="color:#7CFF8A">A</b>', { fontSize: '64px' });
    return { scene: sc, cam, upd(t, dur) {
      const ta = at(s, 'dapat \\*?A', 3), tc = at(s, 'catat siapa', dur * .6), tq = at(s, 'Pernah', dur - 3);
      T.pose(t, { cheer: t > ta && t < ta + 1.6, look: 0 }); back.forEach((a, i) => a.pose(t + i, { shake: t > ta + .8 && i < 2, look: (i - 1.5) * .2 })); if (back[2].userData.tint) back[2].userData.tint('#8FA86A');
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.2, .4, p), lerp(2.8, 3.2, p), lerp(7.6, 8.6, p)); cam.lookAt(0, 1.7, -2.6);
      gA.at(T, cam, [0, 2.4, 0], seg(t, ta, ta + .4)); const qq = seg(t, tc, tc + .5); card.style.opacity = qq; card.style.transform = `translateY(${(1 - qq) * 20}px)`; q.style.opacity = seg(t, tq, tq + .5);
    } };
  },
  // ---- Pepatah Baru: pinjam barang di kompleks ----
  H_LANE(s, root) {   // jalan kompleks malam: rumah Kerbau (kiri) & Kucing (kanan); default: pinjam bor; time: barang lain ikut dipinjam; end: Kerbau menempel label nama + pepatah
    const V = s.variant || 'pinjam'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.6 })); skyline(sc, -26);
    sc.add(mesh(G.box(30, .2, 20), '#3E5A44', [0, -.1, 0])); sc.add(mesh(G.box(30, .05, 3), '#3A3F52', [0, .02, 4])); for (let i = 0; i < 8; i++) sc.add(mesh(G.box(1, .02, .12), '#E8E0C0', [-14 + i * 4, .06, 4], { cast: false }));
    const HK = homeN(sc, [-3.4, 0, -2], { wall: '#6A7A5A' }), HC = homeN(sc, [3.4, 0, -2], { wall: '#7A5A6A', roof: '#3A2433' }); streetLamp(sc, [0, 0, 2.4], 18); streetLamp(sc, [-9, 0, 2.4]); streetLamp(sc, [9, 0, 2.4]);
    const R = cast.kerbau([-4.1, 0, .1]); sc.add(R); const K = cast.kucing([-.6, 0, .8]); sc.add(K); const B = bor(sc, [0, 0, 0]);
    const items = [ladder(sc, [4.6, 0, -.2]), cart(sc, [2.4, 0, .6]), hoseCoil(sc, [5.2, 0, .9])]; items.forEach(o => o.visible = false); items[0].rotation.z = -.15;
    const cam = camera(42); const cal = X.ab({ left: 70, top: 300, background: '#0B1026E6', border: `4px solid ${MOON}`, borderRadius: '16px', width: 230, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, color: MOON, opacity: V === 'end' ? 0 : 1 }, root);
    const hook = V === 'pinjam' ? bottomHook(root, `Pinjam bor “sebentar”.<br><span style="color:${MOON}">Sudah setahun.</span>`) : null;
    const quote = V === 'pinjam' ? bubble(root, '😼 “Pinjam bor sebentar ya.”', '#FFFFFF', '#1B2347', { left: 330, top: 300, fontSize: '40px' }) : null;
    const list = V === 'time' ? v.pinjam.map(([nm, d], i) => chip(root, `${nm} · <span style="color:#FF8A8A">belum kembali</span>`, { left: 330, top: 300 + i * 100, fontSize: '38px' })) : [];
    const card = V === 'end' ? topCard(root, `“Barang pinjaman yang tidak ditagih,<br><span style="color:${MOON}">lama-lama dianggap hadiah.”</span>`, { fontSize: '52px' }) : null;
    const q = V === 'end' ? X.ab({ left: 70, top: 470, width: 940, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '44px', color: '#fff', opacity: 0, textShadow: '0 4px 0 #000' }, root, 'Barang lo pernah nggak balik?') : null;
    const tagN = V === 'end' ? ftag(root, '🏷️ KERBAU', { fontSize: '40px' }) : null;
    const walk = (A, a, b, q) => { A.position.x = lerp(a, b, q); A.position.z = .8; A.rotation.y = b > a ? Math.PI / 2 : -Math.PI / 2 };
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur));
      if (V === 'pinjam') { const tk = .2, tg = at(s, 'mengangguk', 3), tl = at(s, 'terakhir kalinya', dur * .5); let q1 = seg(t, tk, tg - .5), q2 = seg(t, tg + .4, tl + 1);
        if (t < tg + .4) { walk(K, -.6, -3, E.inout(q1)); K.pose(t, { walk: q1 > 0 && q1 < 1 ? 1 : 0, talk: q1 >= 1 }); if (q1 >= 1) K.rotation.y = -Math.PI / 2 } else { walk(K, -3, 4, E.inout(q2)); K.pose(t, { walk: q2 < 1 ? 1 : 0, hold: true }) }
        R.pose(t, { nod: t > tg && t < tg + 1.2, hold: t < tg + .4 }); R.rotation.y = .9; const hb = t < tg + .4 ? R : K; const hp = new THREE.Vector3(); hb.userData.st.arms[1].getWorldPosition(hp); B.position.set(hp.x, hp.y - .5, hp.z + .1);
        cam.position.set(lerp(-1.9, .6, p), lerp(2.4, 3.2, p), lerp(10.5, 12, p)); cam.lookAt(lerp(-2.4, .4, p), 1.3, 0); hook.style.opacity = seg(t, 0, .3); X.pop(quote, t < tg + .8 ? seg(t, .3, .7) : 0);
        const days = Math.round(lerp(1, 365, E.in(seg(t, tl, dur - .5)))); cal.innerHTML = `<div style="font-size:28px">HARI KE-</div><div style="font-size:72px;line-height:1.1">${days}</div>` }
      else if (V === 'time') { const cues = v.pinjam_cues.map((c, i) => at(s, c, 1 + i * 2.5)); let k = -1; cues.forEach((c, i) => { if (t > c - .4) k = i });
        const ph = k < 0 ? 0 : seg(t, cues[k] - .4, (k < 2 ? cues[k + 1] - .4 : dur)); walk(K, -2.6, 4, E.inout(ph)); K.pose(t, { walk: ph < 1 ? 1 : 0, hold: true });
        items.forEach((o, i) => { o.visible = i < k || (i === k && ph > .9) }); R.pose(t, { look: .6, shake: t > dur - 2 }); R.rotation.y = .9;
        cam.position.set(lerp(-6, 6, p), 5.5, 12); cam.lookAt(lerp(-1, 2, p), 1, 0); const d = k < 0 ? 1 : v.pinjam[k][1]; cal.innerHTML = `<div style="font-size:28px">HARI KE-</div><div style="font-size:72px;line-height:1.1">${d}</div>`;
        list.forEach((c, i) => X.pop(c, i <= k ? seg(t, cues[i], cues[i] + .4) : 0)) }
      else { items.forEach(o => o.visible = false); R.position.set(-3.2, 0, 1.4); R.rotation.y = Math.PI * .1; B.position.set(-2.6, .95, 1.6); R.pose(t, { hold: true, nod: true }); K.position.set(3.4, 0, .8); K.rotation.y = -1; K.pose(t, { look: -.5 });
        cam.position.set(lerp(-3, -3.6, p), lerp(2.3, 2.6, p), lerp(6.6, 7.6, p)); cam.lookAt(-3, 1.4, 0); tagN.at(B, cam, [0, .3, 0], seg(t, .6, 1));
        const tc = at(s, 'Pepatah', dur * .4), tq = at(s, 'pernah minjemin', dur - 3); const qq = seg(t, tc, tc + .5); card.style.opacity = qq; card.style.transform = `translateY(${(1 - qq) * 20}px)`; q.style.opacity = seg(t, tq, tq + .5) }
    } };
  },
  H_GARAGE(s, root) {   // garasi Kucing: barang Kerbau berjejer, bekas tempat bor kosong; Kucing garuk kepala
    const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.5 })); noirRoom(sc, { window: false, wall: '#5A5A6A', floor: '#4A4A52' }); const L = new THREE.PointLight('#FFF0D0', 16, 9); L.position.set(0, 3.4, 0); sc.add(L);
    sc.add(mesh(G.box(3, 1.8, .05), '#B98B5E', [0, 2, -3.85])); [[-1, 2.4], [-.3, 2.4], [.6, 2.4], [-.8, 1.6], [.3, 1.6], [1, 1.6]].forEach(([x, y], i) => { if (i === 2) sc.add(mesh(G.box(.42, .3, .02), '#2A2A33', [x, y, -3.8], { cast: false })); else sc.add(mesh(G.box(.3, .2, .08), ['#C0392B', '#E5C04A', '#2E6A8A', '#3FAE49', '#9AA0A8', '#F28C28'][i], [x, y, -3.78])) });
    const holes = ftag(root, 'tempat bor: <b>kosong</b>', { fontSize: '34px' }); const hole = group(sc, [.6, 2.4, -3.8]);
    const lad = ladder(sc, [-3, 0, -3.4]); lad.rotation.x = .12; const ct = cart(sc, [-2.6, 0, -1.6]); const hs = hoseCoil(sc, [-1.6, 0, -2.6]);
    const K = cast.kucing([.8, 0, -.8]); K.rotation.y = -.4; const R = cast.kerbau([2.6, 0, 1.2]); R.rotation.y = -2.4; sc.add(K, R);
    const cam = camera(42); const qk = bubble(root, '😼 “Bor? Kayaknya dipinjam<br>lagi sama Bunglon.”', '#FFFFFF', '#1B2347', { left: 70, top: 300, fontSize: '40px', whiteSpace: 'normal', width: 700 });
    const c2 = chip(root, '📦 barang Kerbau → <b>3 tetangga lain</b>', { left: 70, top: 500, color: ORANGE, borderColor: ORANGE });
    const tL = ftag(root, 'milik Kerbau', { fontSize: '30px' }), tC = ftag(root, 'milik Kerbau', { fontSize: '30px' });
    return { scene: sc, cam, upd(t, dur) {
      const tg = at(s, 'garuk kepala', 2.5), tb = at(s, 'tiga tetangga', dur - 2.5);
      K.pose(t, { talk: t > tg && t < tb }); if (t > tg) { K.userData.st.arms[0].rotation.x = -2.6; K.userData.st.arms[0].rotation.z = -.4 + Math.sin(t * 10) * .15 } R.pose(t, { look: t > tg ? .3 : 0, shake: t > tb });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3.4, 2.6, p), lerp(2.6, 2.4, p), lerp(5.8, 5, p)); cam.lookAt(-.4, 1.4, -1.8);
      X.pop(qk, seg(t, tg + .3, tg + .7)); X.pop(c2, seg(t, tb, tb + .4)); holes.at(hole, cam, [0, .3, 0], seg(t, 1, 1.4)); tL.at(lad, cam, [0, 2.6, 0], t < tg ? seg(t, 1, 1.4) : 0); tC.at(ct, cam, [0, .9, 0], t < tg ? seg(t, 1.4, 1.8) : 0);
    } };
  },
  H_YARDSALE(s, root) {   // bazar kompleks malam: lampu gantung, lapak Kucing menjual bor Kerbau; gagang bertuliskan KERBAU
    const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.4 })); skyline(sc, -20); sc.add(mesh(G.box(24, .2, 16), '#3A3F52', [0, -.1, 0]));
    const bulbs = []; for (let i = 0; i < 22; i++) { const x = -8 + i * .76, y = 3.4 - Math.sin(i / 21 * Math.PI) * .6; const b = mesh(G.sph(.08, 6, 5), ['#FFD27A', '#FF8A8A', '#9CE0FF', '#B8FF9A'][i % 4], [x, y, -1], { cast: false, mat: { emissive: ['#FFD27A', '#FF8A8A', '#9CE0FF', '#B8FF9A'][i % 4], emissiveIntensity: 2 } }); sc.add(b); bulbs.push(b) }
    [-6, 0, 6].forEach(x => { const L = new THREE.PointLight('#FFD9A0', 14, 9); L.position.set(x, 3, 0); sc.add(L) });
    const stall = (x, c) => { const g = group(sc, [x, 0, -1.8]); g.add(mesh(G.box(2.6, .1, 1.1), c, [0, .8, 0])); g.add(mesh(G.box(2.5, .76, 1), '#3A2A1E', [0, .38, 0])); return g };
    const sK = stall(0, '#8A2E4A'); stall(-4.6, '#2E6A8A'); stall(4.6, '#3E7A4A'); for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.3, .25, .3), ['#C0392B', '#E5C04A', '#9AA0A8'][i % 3], [-5.4 + (i % 3) * .6 + (i > 2 ? 9.2 : 0), .98, -1.8], { cast: false }));
    const B = bor(sc, [.2, .95, -1.6]); const tg = txtTex(256, 128, x => { x.fillStyle = '#FFF3B0'; x.fillRect(0, 0, 256, 128); x.fillStyle = '#C0392B'; x.font = '800 52px Baloo'; x.textAlign = 'center'; x.fillText('Rp150rb', 128, 82) });
    const tag = new THREE.Mesh(G.plane(.5, .25), new THREE.MeshStandardMaterial({ map: tg, side: THREE.DoubleSide, emissive: '#FFFFFF', emissiveIntensity: .2 })); tag.position.set(-.4, 1.05, -1.3); tag.rotation.x = -.6; sc.add(tag);
    const K = cast.kucing([0, 0, -2.7]); const R = cast.kerbau([1.3, 0, -.2]); R.rotation.y = Math.PI + .5; const crowd = [cast.tikus([-2.6, 0, .4]), cast.hantu([-1.6, 0, 1.4]), cast.bunglon([2.4, 0, .8]), cast.tikus([3.2, 0, 1.6], { body: '#8FA8C8' })]; [K, R, ...crowd].forEach(a => sc.add(a));
    const cam = camera(42); const pr = chip(root, '🏷️ “dijual: <b>Rp150.000</b>”', { left: 70, top: 300 });
    const inset = X.ab({ left: 560, top: 380, width: 440, height: 300, borderRadius: '26px', overflow: 'hidden', border: `6px solid ${MOON}`, opacity: 0, background: '#2B2B2B' }, root,
      `<div style="position:absolute;left:30px;top:90px;width:380px;height:120px;background:#F2B233;border-radius:20px"></div><div style="position:absolute;left:60px;top:118px;font-family:Baloo;font-weight:800;font-size:62px;color:#5A3A10;letter-spacing:6px;transform:rotate(-3deg)">KERBAU</div><div style="position:absolute;left:18px;bottom:12px;color:#fff;font-family:Baloo;font-weight:800;font-size:30px">gagang bor (tergores)</div>`);
    return { scene: sc, cam, upd(t, dur) {
      const tl = at(s, 'Labelnya', dur * .4), tb = at(s, 'membaliknya', dur * .6), tn = at(s, 'namanya sendiri', dur - 2.5);
      bulbs.forEach((b, i) => b.material.emissiveIntensity = 1.4 + Math.sin(t * 3 + i) * .6);
      const lift = E.inout(seg(t, tb - .3, tb + .6)); B.position.set(lerp(.2, .4, lift), lerp(.95, 1.5, lift), lerp(-1.6, -.4, lift)); B.rotation.z = lift * Math.PI;
      R.pose(t, { hold: t > tb, look: 0 }); K.pose(t, { talk: t < tb, shake: t > tn, look: t > tn ? .5 : 0 }); crowd.forEach((a, i) => { a.rotation.y = t > tn ? Math.atan2(-a.position.x, -2.7 - a.position.z) : Math.PI + Math.sin(t + i) * .4; a.pose(t + i, { nod: t > tn }) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-3.4, -2, p), lerp(3.6, 3.2, p), lerp(6.8, 6, p)); cam.lookAt(.3, 1, -1.6);
      X.pop(pr, seg(t, tl, tl + .4)); const q = seg(t, tn, tn + .5); inset.style.opacity = q; inset.style.transform = `scale(${E.back(q)})`;
    } };
  },
});

// ===================== 11 Nov 2026: promo 11.11 (Hewan di Sekitarmu), paket COD (Dari Mata Korban), label "asli" luntur (Fabel klasik) =====================
function box3(parent, p, s = 1, c = '#C9A36B') { const g = group(parent, p); g.scale.setScalar(s); g.add(mesh(G.box(.6, .45, .5), c, [0, .22, 0])); g.add(mesh(G.box(.62, .05, .1), '#E8DCC0', [0, .45, 0], { cast: false })); return g }
function roomN(sc, o = {}) { noirRoom(sc, Object.assign({ wall: '#4A5272', floor: '#5A4A3E' }, o)); const L = new THREE.PointLight('#FFE0B0', o.L || 16, 10); L.position.set(0, 3.4, 1.5); sc.add(L) }
Object.assign(SHOTS, {
  H_PROMO(s, root) {   // alun-alun rimba malam: layar raksasa hitung mundur 23:59:5x -> 00:00 "11.11"; hewan menatap HP; varian end: label harga coret raksasa
    const END = s.variant === 'end'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.5 })); skyline(sc, -16); sc.add(mesh(G.box(24, .2, 14), '#3A3F52', [0, -.1, 0]));
    const scr = group(sc, [0, 0, -6]); scr.add(mesh(G.box(7.4, 3.8, .3), '#111', [0, 4, 0])); [-3, 3].forEach(x => scr.add(mesh(G.box(.3, 2.2, .3), '#222', [x, 1.1, 0])));
    const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = '';
    const draw = txt => { if (txt === last) return; last = txt; const g = x.createLinearGradient(0, 0, 1024, 512); g.addColorStop(0, '#E5484D'); g.addColorStop(1, '#F28C28'); x.fillStyle = g; x.fillRect(0, 0, 1024, 512); x.fillStyle = '#fff'; x.textAlign = 'center';
      if (txt === 'coret') { x.font = '800 90px Baloo'; x.fillText('Rp400.000', 512, 170); x.fillRect(250, 140, 524, 12); x.fillStyle = '#FFE36B'; x.font = '800 150px Baloo'; x.fillText('-50%', 512, 330); x.fillStyle = '#fff'; x.font = '800 96px Baloo'; x.fillText('= Rp200.000', 512, 450) }
      else { x.font = '800 70px Baloo'; x.fillText(txt === '00:00' ? 'PROMO TANGGAL KEMBAR' : 'PROMO DIMULAI DALAM', 512, 110); x.font = '800 230px Baloo'; x.fillText(txt === '00:00' ? '11.11' : txt, 512, 360) } tex.needsUpdate = true };
    const sm = new THREE.Mesh(G.plane(7, 3.5), new THREE.MeshBasicMaterial({ map: tex })); sm.position.set(0, 4, -5.83); sc.add(sm); const gl = new THREE.PointLight('#FF9A6A', 20, 14); gl.position.set(0, 3.6, -4); sc.add(gl);
    const who = [cast.merak([-2.4, 0, 1]), cast.beo([-.8, 0, 1.8]), cast.kerbau([1, 0, 1.4]), cast.tikus([2.4, 0, 2.2]), cast.kucing([-1.6, 0, 3]), cast.hantu([.4, 0, 3.4])];
    who.forEach((a, i) => { sc.add(a); a.rotation.y = Math.PI + (i % 2 ? .15 : -.15); phoneMesh(a.userData.st.arms[1], [0, -.6, .12], 1.3) });
    const cam = camera(42); const hook = END ? null : bottomHook(root, `Promo 11.11 dimulai.<br><span style="color:${MOON}">Ada 3 tipe hewan. Lo yang mana?</span>`);
    const card = END ? topCard(root, `Yang paling untung malam itu:<br><span style="color:${MOON}">angka coretannya.</span>`) : null; const q = END ? bubble(root, 'Lo tipe nomor berapa? 1, 2, atau 3?', '#FFFFFF', '#1B2347', { left: 140, top: 520, fontSize: '42px' }) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur));
      if (END) draw('coret'); else { const tz = at(s, 'nol nol', 3.5); draw(t < tz ? `23:59:${String(Math.min(59, 56 + Math.floor(t * 3 / tz))).padStart(2, '0')}` : '00:00') }
      const tz2 = END ? 0 : at(s, 'nol nol', 3.5); who.forEach((a, i) => { a.pose(t + i, { hold: true, cheer: !END && t > tz2 && t < tz2 + 1.5 && i < 3, shake: END && i === 2 }); a.userData.st.arms[1].rotation.x = t > tz2 + 1.5 || END ? -1.3 : -.5 });
      cam.position.set(lerp(-1.4, 1.4, p), lerp(2, 2.6, p), lerp(9.5, 10.5, p)); cam.lookAt(0, 2.4, -2);
      if (hook) hook.style.opacity = seg(t, 0, .3); if (card) { const tc = at(s, 'coretan', 2); const qq = seg(t, tc, tc + .5); card.style.opacity = qq; const tq = at(s, 'Lo tipe', dur - 3); X.pop(q, seg(t, tq, tq + .4)) }
    } };
  },
  H_MERAK(s, root) {   // kamar Merak: menara kardus paket, Merak berpose foto
    const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.2, sunI: 1.6 })); roomN(sc, { wall: '#5A3E6A', wx: 2.4, L: 20 });
    const boxes = []; for (let i = 0; i < v.paket; i++) { const b = box3(sc, [-1.4 + (i % 3) * .66 - (Math.floor(i / 3) % 2) * .2, Math.floor(i / 3) * .47, -1.6 + (i % 2) * .1], 1, ['#C9A36B', '#B98B5E', '#D9B97A'][i % 3]); b.visible = false; boxes.push(b) }
    const M = cast.merak([1.2, 0, -.2]); sc.add(M); M.rotation.y = -.5; const ph = phoneMesh(M.userData.st.arms[1], [0, -.6, .12], 1.4);
    const ring = new THREE.PointLight('#FFFFFF', 0, 5); ring.position.set(1, 2, 2); sc.add(ring);
    const cam = camera(42); const cnt = chip(root, '', { left: 70, top: 300 }); const c2 = chip(root, '📸 kardus disusun jadi menara', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE }); const c3 = chip(root, '❓ isinya: belum tentu dipakai', { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) { const tc = at(s, 'empat belas paket', 2.5), tf = at(s, 'difoto', dur * .5), tk = at(s, 'kelihatan', dur - 2);
      const n = Math.round(v.paket * E.out(seg(t, .3, tc + 1))); boxes.forEach((b, i) => b.visible = i < n); cnt.innerHTML = `📦 ${n} paket`; X.pop(cnt, seg(t, .3, .6));
      M.pose(t, { hold: true, cheer: t > tf && t < tf + 1.2, bounce: t > tf }); if (M.userData.tail) M.userData.tail.scale.setScalar(.6 + .4 * E.out(seg(t, tf, tf + .6))); ring.intensity = t > tf && Math.sin(t * 7) > .7 ? 30 : 0;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.6, .6, p), lerp(2.4, 2.8, p), lerp(6.6, 7.4, p)); cam.lookAt(-.2, 1.4, -1);
      X.pop(c2, seg(t, tf, tf + .4)); X.pop(c3, seg(t, tk, tk + .4));
    } };
  },
  H_BEOWARUNG(s, root) {   // warung kopi malam: teman-teman Beo pamer blender di HP; Beo ikut checkout; sisipan: dapur Beo sudah ada 2 blender
    const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.5 })); sc.add(mesh(G.box(16, .2, 12), '#5A4A3E', [0, -.1, 0])); sc.add(mesh(G.box(16, 5, .2), '#56607E', [0, 2.5, -3]));
    const st = group(sc, [0, 0, -2]); st.add(mesh(G.box(4.6, 1, .9), '#5E3E22', [0, .5, 0])); st.add(mesh(G.box(5, .1, 1.6), '#2E6A8A', [0, 2.6, .3], { rot: [.2, 0, 0] })); [-2.3, 2.3].forEach(x => st.add(mesh(G.box(.1, 2.6, .1), '#3A2A1E', [x, 1.3, .7])));
    const neon = new THREE.PointLight('#FFB070', 16, 9); neon.position.set(0, 2.2, -.5); sc.add(neon); sc.add(mesh(G.box(3.4, .08, .8), '#8A6A4A', [0, .55, .6]));
    const B = cast.beo([0, 0, 1.4]); B.rotation.y = Math.PI; sc.add(B); phoneMesh(B.userData.st.arms[1], [0, -.6, .12], 1.4);
    const fr = [cast.kucing([-1.6, 0, .5]), cast.tikus([1.5, 0, .4], { body: '#C9B8A0' }), cast.ayam([2.4, 0, 1.2]), cast.bunglon([-2.5, 0, 1.3])]; fr.forEach((a, i) => { sc.add(a); a.rotation.y = i < 2 ? (i ? -.5 : .5) : (i === 2 ? -1 : 1); phoneMesh(a.userData.st.arms[1], [0, -.6, .12], 1.3) });
    const cam = camera(42); const bubs = ['🛒 udah checkout blender!', 'gue juga 😆', 'promo cuma malam ini!'].map((tx, i) => bubble(root, tx, '#FFFFFF', '#1B2347', { left: [70, 520, 200][i], top: [300, 380, 470][i], fontSize: '38px' }));
    const me = bubble(root, '🦜 “Gue juga deh!”', '#DCF8C6', '#1B4A2A', { left: 300, top: 580, fontSize: '44px' });
    const inset = X.ab({ left: 560, top: 700, width: 440, height: 300, borderRadius: '26px', overflow: 'hidden', border: `6px solid ${MOON}`, opacity: 0, background: '#3A3346' }, root,
      `<div style="position:absolute;left:30px;bottom:60px;width:380px;height:20px;background:#8A6A4A"></div>${[60, 230].map(x => `<div style="position:absolute;left:${x}px;bottom:80px;width:110px;height:150px;background:#9CC3E6;border-radius:16px 16px 6px 6px"></div><div style="position:absolute;left:${x + 10}px;bottom:80px;width:90px;height:40px;background:#555"></div>`).join('')}<div style="position:absolute;left:18px;top:10px;color:#fff;font-family:Baloo;font-weight:800;font-size:32px">dapur Beo: 2 blender</div>`);
    return { scene: sc, cam, upd(t, dur) { const ts = at(s, 'semua temannya', 2.5), tb = at(s, 'ikut beli', dur * .5), td = at(s, 'dua blender', dur - 2.5);
      bubs.forEach((b, i) => X.pop(b, t < td ? seg(t, ts + i * .4, ts + i * .4 + .3) : 0)); X.pop(me, t < td ? seg(t, tb, tb + .4) : 0); const q = seg(t, td, td + .5); inset.style.opacity = q; inset.style.transform = `scale(${E.back(q)})`;
      B.pose(t, { hold: true, look: Math.sin(t * 1.3) * .5, nod: t > tb && t < tb + 1.2, shake: t > td }); B.userData.st.arms[1].rotation.x = -1.3; fr.forEach((a, i) => { a.pose(t + i, { hold: true, talk: t > ts + i * .4 && t < tb }); a.userData.st.arms[1].rotation.x = -1.3 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.8, -.6, p), lerp(2.6, 2.3, p), lerp(7.6, 6.8, p)); cam.lookAt(0, 1.3, .4);
    } };
  },
  H_KERBAU11(s, root) {   // ruang tengah Kerbau: buku catatan harga, label coret raksasa melayang di atas meja
    const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.2, sunI: 1.6 })); roomN(sc, { wall: '#5A5070', wx: -2.2, L: 20 }); deskN(sc, [0, 0, -.8], 2.4); lampDesk(sc, [-.8, .82, -1], 18);
    const R = cast.kerbau([1.5, 0, .2]); R.rotation.y = Math.PI + .6; sc.add(R);
    const book = mesh(G.box(.6, .03, .44), '#F4F0E6', [.3, .84, -.6], { mat: { emissive: '#F4F0E6', emissiveIntensity: .2 } }); sc.add(book);
    const tag = group(sc, [0, 2.4, -1.4]); const tt = txtTex(1024, 512, x => { x.fillStyle = '#FFF3B0'; x.fillRect(0, 0, 1024, 512); x.fillStyle = '#1B2347'; x.textAlign = 'center'; x.font = '800 70px Baloo'; x.fillText('minggu lalu: Rp200.000', 512, 100);
      x.fillStyle = '#C0392B'; x.font = '800 110px Baloo'; x.fillText('Rp400.000', 512, 250); x.fillRect(250, 220, 524, 14); x.fillStyle = '#2E7D32'; x.font = '800 110px Baloo'; x.fillText('-50% = Rp200.000', 512, 420) });
    tag.add(new THREE.Mesh(G.box(2.6, 1.3, .04), [mat('#FFF3B0'), mat('#FFF3B0'), mat('#FFF3B0'), mat('#FFF3B0'), new THREE.MeshStandardMaterial({ map: tt, emissive: '#FFFFFF', emissiveIntensity: .25 }), mat('#FFF3B0')]));
    const cam = camera(42); const c1 = chip(root, `📒 cek harga: <b>Rp${v.harga}rb</b>`, { left: 70, top: 300 }), c2 = chip(root, `🏷️ dicoret: <b>Rp${v.coret}rb</b>`, { left: 70, top: 410, color: '#FF8A8A', borderColor: '#FF8A8A' }), c3 = chip(root, `= tetap <b>Rp${v.akhir}rb</b>`, { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) { const tc = at(s, 'seminggu', 2), td = at(s, 'dicoret', dur * .45), tr = at(s, 'tetap dua ratus', dur - 2);
      tag.scale.setScalar(Math.max(.001, E.back(seg(t, td - .2, td + .4)))); tag.rotation.y = Math.sin(t * .8) * .1; tag.position.y = 2.4 + Math.sin(t * 1.5) * .05;
      R.pose(t, { hold: true, look: t > td ? 0 : .3, shake: t > tr }); const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.4, -.4, p), lerp(2.2, 2.5, p), lerp(5.4, 6.2, p)); cam.lookAt(.2, 1.7, -1);
      X.pop(c1, seg(t, tc, tc + .4)); X.pop(c2, seg(t, td, td + .4)); X.pop(c3, seg(t, tr, tr + .4));
    } };
  },
  H_GATEKOS(s, root) {   // gerbang kos malam: kurir Ayam bawa paket COD; varian lagi: paket menumpuk; end: kertas di pagar "COD a.n. Tikus: TOLAK"
    const V = s.variant || 'awal'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.5 })); skyline(sc, -22); sc.add(mesh(G.box(20, .2, 14), '#3A3F52', [0, -.1, 0]));
    const kos = group(sc, [0, 0, -4]); kos.add(mesh(G.box(8, 4.6, 3), '#6A6A8A', [0, 2.3, 0])); for (let i = 0; i < 6; i++) kos.add(mesh(G.box(.9, .8, .05), i % 2 ? '#FFD98A' : '#2A3355', [-2.8 + (i % 3) * 2.8, 1.4 + Math.floor(i / 3) * 2, 1.52], { mat: { emissive: '#FFC86A', emissiveIntensity: i % 2 ? 1 : 0 }, cast: false }));
    const sign = txtTex(512, 160, x => { x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 512, 160); x.fillStyle = '#fff'; x.font = '800 70px Baloo'; x.textAlign = 'center'; x.fillText('KOS RIMBA', 256, 105) }); const sg = new THREE.Mesh(G.plane(2, .6), new THREE.MeshStandardMaterial({ map: sign, emissive: '#fff', emissiveIntensity: .3 })); sg.position.set(0, 4, -2.48); sc.add(sg);
    for (let i = -4; i <= 4; i++) if (Math.abs(i) > 1) { sc.add(mesh(G.box(.08, 1.4, .08), '#2B2B2B', [i * .9, .7, -.6])); } sc.add(mesh(G.box(5.6, .06, .06), '#2B2B2B', [-2.6, 1.3, -.6])); sc.add(mesh(G.box(5.6, .06, .06), '#2B2B2B', [2.6, 1.3, -.6]));
    streetLamp(sc, [3.6, 0, .6], 18); const T = cast.tikus([-.4, 0, -.2]); sc.add(T); const C = cast.ayam([.9, 0, 1.2], { hat: 'cap', hatC: '#E5484D' }); sc.add(C); C.rotation.y = -2.3;
    const pk = box3(C.userData.st.arms[1], [0, -.75, .2], .7); const motor = group(sc, [2.4, 0, 1.8]); motor.add(mesh(G.box(1.4, .5, .4), '#C0392B', [0, .6, 0])); [-.5, .5].forEach(x => motor.add(mesh(G.cyl(.28, .28, .14, 12), '#222', [x, .28, 0], { rot: [Math.PI / 2, 0, 0] })));
    const pile = V === 'awal' ? [] : Array.from({ length: v.paket.length }, (_, i) => { const b = box3(sc, [-1.6 + i * .4, 0 + (i % 2) * .45, .2], .8); b.visible = false; return b });
    const note = V === 'end' ? (() => { const t = txtTex(512, 300, x => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 512, 300); x.fillStyle = '#C0392B'; x.font = '800 56px Baloo'; x.textAlign = 'center'; x.fillText('COD a.n. TIKUS', 256, 110); x.font = '800 80px Baloo'; x.fillText('TOLAK!', 256, 220) });
      const m = new THREE.Mesh(G.plane(1, .6), new THREE.MeshStandardMaterial({ map: t, emissive: '#fff', emissiveIntensity: .3 })); m.position.set(-1.4, 1.05, -.55); sc.add(m); return m })() : null;
    if (V === 'end') { C.visible = false; motor.visible = false }
    const cam = camera(42); const hook = V === 'awal' ? bottomHook(root, `Paket COD Rp${v.cod1}rb, atas nama gue.<br><span style="color:${MOON}">Gue nggak pernah pesan.</span>`) : null;
    const c1 = V === 'awal' ? bubble(root, `🐔 “COD ya, Rp${v.cod1}.000.”`, '#FFFFFF', '#1B2347', { left: 70, top: 300, fontSize: '42px' }) : null;
    const tot = V === 'lagi' ? chip(root, '', { left: 70, top: 300, fontSize: '46px' }) : null;
    const card = V === 'end' ? topCard(root, `Nama lo bukan<br><span style="color:${MOON}">alamat titipan.</span>`) : null; const q = V === 'end' ? bubble(root, 'Pernah dibegini sama teman?', '#FFFFFF', '#1B2347', { left: 200, top: 520, fontSize: '42px' }) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur));
      T.pose(t, { hold: V !== 'end', shake: V === 'awal' && t > dur * .6, look: V === 'end' ? .3 : 0 }); C.pose(t, { hold: true, talk: (t % 3) < 1.4 });
      if (V === 'awal') { hook.style.opacity = seg(t, 0, .3); X.pop(c1, seg(t, .6, 1)) }
      if (V === 'lagi') { const cues = v.paket_cues.map((c, i) => at(s, c, 1 + i * 2)); let k = 0, sum = 0; cues.forEach((c, i) => { if (t > c) { k = i + 1 } }); pile.forEach((b, i) => b.visible = i < k); sum = v.paket.slice(0, k).reduce((a, b) => a + b, 0); tot.innerHTML = `📦 ${k} paket · Rp${sum}.000 dari kantong Tikus`; X.pop(tot, seg(t, .4, .8)) }
      if (V === 'end') { const tl = at(s, 'Pelajaran', dur * .5); const qq = seg(t, tl, tl + .5); card.style.opacity = qq; const tq = at(s, 'Pernah', dur - 3); X.pop(q, seg(t, tq, tq + .4)); T.position.set(-.6, 0, .3); T.rotation.y = Math.PI * .85 }
      cam.position.set(lerp(-1.6, .6, p), lerp(2.2, 2.6, p), lerp(7.4, 8.2, p)); cam.lookAt(0, 1.2, -.6);
    } };
  },
  H_KUCINGKAMAR(s, root) {   // kamar kos Kucing (sebelah): checkout pakai alamat & nama Tikus
    const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.5 })); roomN(sc, { wall: '#6A4A5A', wx: -1.8, L: 18 });
    sc.add(mesh(G.box(3, .5, 1.8), '#8A2E4A', [1.2, .25, -2])); sc.add(mesh(G.box(3.1, .2, 1.9), '#F4E0E6', [1.2, .6, -2]));
    const K = cast.kucing([-.6, 0, -.4]); sc.add(K); K.rotation.y = .5; phoneMesh(K.userData.st.arms[1], [0, -.6, .12], 1.4);
    const ph = group(sc, [1.4, 2.5, .2]); ph.add(mesh(G.box(1.4, 2.5, .1), '#111', [0, 0, 0])); const t2 = txtTex(512, 920, x => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 512, 920); x.fillStyle = '#E5484D'; x.fillRect(0, 0, 512, 110); x.fillStyle = '#fff'; x.font = '800 44px Baloo'; x.fillText('Checkout', 30, 72);
      x.fillStyle = '#1B2347'; x.font = '800 32px Baloo'; ['Penerima:', '  TIKUS', 'Alamat:', '  Kos Rimba kmr 3', 'Bayar:', '  COD (di tempat)', 'Total: Rp350.000'].forEach((l, i) => { x.fillStyle = i % 2 && i < 6 ? '#C0392B' : '#1B2347'; x.fillText(l, 30, 190 + i * 90) }) });
    const scr = new THREE.Mesh(G.plane(1.3, 2.36), new THREE.MeshBasicMaterial({ map: t2 })); scr.position.z = .055; ph.add(scr);
    const cam = camera(42); const c1 = chip(root, '😼 “biar kurirnya nggak bingung”', { left: 70, top: 300 }), c2 = chip(root, '🚪 Kucing: lagi nggak di kos', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'nggak bingung', dur * .4), tk = at(s, 'nggak di kos', dur * .6); const p = E.inout(seg(t, 0, dur));
      K.pose(t, { hold: true, talk: t > tb && t < tk }); K.userData.st.arms[1].rotation.x = -1.3; if (K.userData.tail) K.userData.tail.rotation.z = Math.sin(t * 2) * .3; ph.rotation.y = -.25; ph.position.y = 2.5 + Math.sin(t) * .04;
      cam.position.set(lerp(.4, 0, p), lerp(2.4, 2.2, p), lerp(7, 6.2, p)); cam.lookAt(.4, 1.6, -.6); X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tk, tk + .4));
    } };
  },
  H_KOSDOOR(s, root) {   // lorong kos: Tikus mengetuk pintu Kucing; "nanti gue ganti"; paket keempat datang
    const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.4, fog: [NIGHT, 6, 22] })); sc.add(mesh(G.box(4, .1, 20), '#4A4048', [0, 0, -5])); sc.add(mesh(G.box(.2, 4, 20), '#5A5A7A', [-2, 2, -5])); sc.add(mesh(G.box(.2, 4, 20), '#55557A', [2, 2, -5])); sc.add(mesh(G.box(4, .1, 20), '#2C3346', [0, 4, -5]));
    for (let i = 0; i < 4; i++) { const z = 1 - i * 3.4; sc.add(mesh(G.box(.06, 2.2, 1), i === 1 ? '#8A2E4A' : '#5E4A38', [1.95, 1.1, z])); const L = new THREE.PointLight('#FFE0A8', 8, 6); L.position.set(0, 3.6, z); sc.add(L); sc.add(mesh(G.box(.6, .06, .3), '#FFF2D0', [0, 3.94, z], { mat: { emissive: '#FFE7B0', emissiveIntensity: 1.2 }, cast: false })) }
    const T = cast.tikus([1.2, 0, -2.2]); T.rotation.y = Math.PI / 2; sc.add(T); const pk = box3(sc, [-1.2, 0, 1.2], .8);
    const cam = camera(42); const b1 = bubble(root, '😼 (dari dalam) “Nanti gue ganti, pas gajian.”', '#FFFFFF', '#1B2347', { left: 60, top: 300, fontSize: '38px' }); const c2 = chip(root, '📅 gajian: sudah lewat <b>2x</b>', { left: 70, top: 420, color: ORANGE, borderColor: ORANGE }); const c3 = chip(root, '📦 paket ke-4 datang', { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'ketuk', 1), tg = at(s, 'nanti gue ganti', 3), tl = at(s, 'lewat dua kali', dur * .6), tp = at(s, 'paket keempat', dur - 2);
      T.pose(t, { look: 0 }); if (t > tk && t < tk + 1.2) { T.userData.st.arms[1].rotation.x = -1.5 + Math.abs(Math.sin(t * 10)) * .4 } pk.visible = t > tp;
      cam.position.set(-.8, 1.6, lerp(3.2, 2.2, seg(t, 0, dur))); cam.lookAt(1.2, 1.1, -2.4); X.pop(b1, seg(t, tg, tg + .4)); X.pop(c2, seg(t, tl, tl + .4)); X.pop(c3, seg(t, tp, tp + .4));
    } };
  },
  H_PASARMALAM(s, root) {   // pasar malam: lapak Ular "JAM ASLI" paling terang; varian balik: Kerbau berdiri memegang kotak luntur; end: lapak Ular sepi
    const V = s.variant || 'awal'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.4 })); skyline(sc, -20); sc.add(mesh(G.box(24, .2, 16), '#3A3F52', [0, -.1, 0]));
    for (let i = 0; i < 24; i++) { const x = -9 + i * .78, y = 3.6 - Math.sin(i / 23 * Math.PI) * .6; sc.add(mesh(G.sph(.08, 6, 5), ['#FFD27A', '#FF8A8A', '#9CE0FF'][i % 3], [x, y, -1.2], { cast: false, mat: { emissive: ['#FFD27A', '#FF8A8A', '#9CE0FF'][i % 3], emissiveIntensity: 2 } })) }
    const stall = (x, c) => { const g = group(sc, [x, 0, -2]); g.add(mesh(G.box(2.6, .1, 1.1), c, [0, .8, 0])); g.add(mesh(G.box(2.5, .76, 1), '#3A2A1E', [0, .38, 0])); g.add(mesh(G.box(2.9, .1, 1.5), c, [0, 2.5, .1], { rot: [.15, 0, 0] })); [-1.3, 1.3].forEach(px => g.add(mesh(G.box(.08, 2.5, .08), '#2A2A2A', [px, 1.25, .5]))); return g };
    const sU = stall(0, '#8A6A2E'); stall(-4.4, '#2E6A8A'); stall(4.4, '#3E7A4A'); const bright = new THREE.PointLight('#FFF0B0', V === 'end' ? 6 : 30, 7); bright.position.set(0, 2.2, -1.2); sc.add(bright);
    const sgn = txtTex(512, 160, x => { x.fillStyle = '#F2C14E'; x.fillRect(0, 0, 512, 160); x.fillStyle = '#1B2347'; x.font = '800 74px Baloo'; x.textAlign = 'center'; x.fillText('JAM ASLI 100rb', 256, 105) }); const sm = new THREE.Mesh(G.plane(2.2, .7), new THREE.MeshStandardMaterial({ map: sgn, emissive: '#fff', emissiveIntensity: .35 })); sm.position.set(0, 2.1, -1.35); sc.add(sm);
    for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.3, .16, .24), '#1B2347', [-1 + i * .4, .9, -1.9]));
    const U = cast.ular([0, 0, -2.9]); sc.add(U); const R = cast.kerbau(V === 'awal' ? [1.4, 0, -.9] : [-1.2, 0, -.4]); sc.add(R); R.rotation.y = V === 'awal' ? Math.PI : .5; const kb = box3(R.userData.st.arms[1], [0, -.7, .2], .5, '#1B2347'); kb.visible = V !== 'awal' || true;
    const buyers = V === 'end' ? [] : [cast.tikus([1.6, 0, .4]), cast.merak([2.4, 0, -.2]), cast.hantu([-2.2, 0, .6], {}), cast.ayam([1, 0, 1.2])]; buyers.forEach(a => { sc.add(a); a.rotation.y = Math.PI });
    const cam = camera(42); const hook = V === 'awal' ? bottomHook(root, `Jam tangan “asli”, Rp100 ribu.<br><span style="color:${MOON}">Labelnya masih basah.</span>`) : null;
    const card = V === 'end' ? topCard(root, `Label bisa ditempel dalam semenit.<br><span style="color:${MOON}">Kepercayaan tidak.</span>`, { fontSize: '54px' }) : null; const q = V === 'end' ? bubble(root, 'Pernah beli barang “asli” yang nggak asli?', '#FFFFFF', '#1B2347', { left: 80, top: 520, fontSize: '38px' }) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); U.pose(t, { talk: V !== 'end', look: V === 'end' ? .5 : 0, shake: V === 'end' && t > dur * .3 }); if (U.userData.tongue) U.userData.tongue.scale.z = 1 + Math.abs(Math.sin(t * 6));
      R.pose(t, { hold: true, look: V === 'balik' ? Math.sin(t * .7) * .5 : 0 }); if (V === 'balik') R.userData.st.arms[1].rotation.x = -1.4;
      buyers.forEach((a, i) => { a.pose(t + i, { look: Math.sin(t * .6 + i) * .3 }); if (V === 'balik') { const tm = at(s, 'menunjukkannya', dur * .6); const q = seg(t, tm + i * .5, tm + i * .5 + 1.2); a.position.z = [.4, -.2, .6, 1.2][i] + q * 4; a.rotation.y = q > 0 ? 0 : Math.PI; a.pose(t + i, { walk: q > 0 && q < 1 ? 1 : 0 }) } });
      cam.position.set(lerp(-1.8, 1.4, p), lerp(2.6, 2.4, p), lerp(8.4, 7.4, p)); cam.lookAt(0, 1.3, -1.4);
      if (hook) hook.style.opacity = seg(t, 0, .3); if (card) { const tc = at(s, 'Label bisa', dur * .4); const qq = seg(t, tc, tc + .5); card.style.opacity = qq; const tq = at(s, 'Pernah', dur - 3); X.pop(q, seg(t, tq, tq + .4)) }
    } };
  },
  H_RAINLABEL(s, root) {   // jalan pulang hujan -> dapur Kerbau: kotak dibuka, stiker "ASLI" luntur; varian close: sisipan tulisan kecil di bawah stiker
    const CL = s.variant === 'close'; const sc = newScene(NOIR({ hemi: 1, sunI: 1.2, fog: ['#2A3A6E', 10, 40] }));
    if (!CL) { sc.add(mesh(G.box(30, .2, 14), '#3A3F52', [0, -.1, 0])); skyline(sc, -14); streetLamp(sc, [2, 0, -.6], 18); streetLamp(sc, [-6, 0, -.6], 14) } else { roomN(sc, { wall: '#5A5070', wx: -2.2, L: 18 }); deskN(sc, [0, 0, -1], 2.4); lampDesk(sc, [-.8, .82, -1.2], 20) }
    const N = 380, geo = G.box(.02, .4, .02), rn = new THREE.InstancedMesh(geo, mat('#9CC9E8', { transparent: true, opacity: .6 }), N); rn.castShadow = false; if (!CL) sc.add(rn); const o = new THREE.Object3D();
    const R = cast.kerbau(CL ? [-1.5, 0, -.1] : [0, 0, 0]); sc.add(R); R.rotation.y = CL ? 2.5 : -Math.PI / 2; const kb = box3(CL ? sc : R.userData.st.arms[1], CL ? [0, .85, -.8] : [0, -.7, .25], CL ? .9 : .5, '#1B2347');
    const cam = camera(42);
    const lab = X.ab({ left: 140, top: 330, width: 800, height: 380, borderRadius: '26px', overflow: 'hidden', border: `6px solid ${MOON}`, opacity: 0, background: '#1B2347' }, root,
      `<div style="position:absolute;left:150px;top:70px;width:500px;height:200px;background:#F2C14E;border-radius:20px;transform:rotate(-3deg)"></div><div class="lb" style="position:absolute;left:210px;top:90px;font-family:Baloo;font-weight:800;font-size:140px;color:#C0392B;letter-spacing:12px">ASLI</div>
       <div class="dr" style="position:absolute;left:260px;top:220px;width:16px;height:0;background:#C0392B;border-radius:8px"></div><div class="dr2" style="position:absolute;left:420px;top:220px;width:12px;height:0;background:#C0392B;border-radius:8px"></div>
       <div class="sm" style="position:absolute;left:0;width:800px;top:300px;text-align:center;font-family:Baloo;font-weight:800;font-size:36px;color:#fff;opacity:0">“barang tiruan, bukan untuk dijual”</div>`);
    const c1 = CL ? chip(root, '⌚ jarumnya: <b>berhenti</b>', { left: 70, top: 760 }) : null, c2 = CL ? chip(root, '⏳ umur: <b>satu malam</b>', { left: 70, top: 870, color: ORANGE, borderColor: ORANGE }) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur));
      if (!CL) { for (let i = 0; i < N; i++) { const a = ((i * 97) % 1000) / 1000, b = ((i * 61) % 1000) / 1000, k = ((i * 37) % 1000) / 1000; o.position.set(a * 20 - 10, 8 - ((t * 1.6 + k) % 1) * 8, b * 10 - 5); o.updateMatrix(); rn.setMatrixAt(i, o.matrix) } rn.instanceMatrix.needsUpdate = true;
        const tr = at(s, 'Sampai rumah', dur * .55); R.position.x = lerp(5, -3, seg(t, 0, tr)); R.pose(t, { walk: t < tr ? 1 : 0, hold: true }); cam.position.set(R.position.x + 2.6, 2.2, 6); cam.lookAt(R.position.x, 1.3, 0);
        const tl = at(s, 'luntur', dur - 2); const q = seg(t, tl - .4, tl + .1); lab.style.opacity = q; const d = seg(t, tl, dur); lab.querySelector('.lb').style.filter = `blur(${d * 6}px)`; lab.querySelector('.lb').style.transform = `translateY(${d * 30}px)`; lab.querySelector('.dr').style.height = d * 140 + 'px'; lab.querySelector('.dr2').style.height = d * 100 + 'px' }
      else { R.pose(t, { look: .3, shake: t > dur * .6 }); cam.position.set(lerp(1.6, .8, p), lerp(2.6, 2.2, p), lerp(3.6, 2.6, p)); cam.lookAt(0, 1, -.9); lab.style.opacity = 1; lab.querySelector('.lb').style.filter = 'blur(6px)'; lab.querySelector('.lb').style.opacity = .35;
        lab.querySelector('.dr').style.height = '140px'; lab.querySelector('.dr2').style.height = '100px'; const ts = at(s, 'tulisan kecil', 1); lab.querySelector('.sm').style.opacity = seg(t, ts, ts + .6); const tj = at(s, 'Jarumnya', dur * .5), tu = at(s, 'satu malam', dur - 2); X.pop(c1, seg(t, tj, tj + .4)); X.pop(c2, seg(t, tu, tu + .4)) }
    } };
  },
});

// ===================== 12 Nov 2026: rapat panitia (Pepatah Baru), Merak live cicilan (Senjata Makan Tuan), patungan (Hewan di Sekitarmu) =====================
Object.assign(SHOTS, {
  H_RAPAT(s, root) {   // aula RT malam: panitia melingkar, jam dinding berputar cepat, gelas kopi bertambah; varian kerbau: Kerbau angkat tangan; end: kursi kosong + pepatah
    const V = s.variant || 'awal'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.2, sunI: 1.6 })); roomN(sc, { wall: '#4A5A7A', wx: 2.6, L: 22 });
    const ban = txtTex(1024, 200, x => { x.fillStyle = '#C0392B'; x.fillRect(0, 0, 1024, 200); x.fillStyle = '#fff'; x.font = '800 84px Baloo'; x.textAlign = 'center'; x.fillText('RAPAT PANITIA 17-AN RIMBA', 512, 130) });
    const bm = new THREE.Mesh(G.plane(4.6, .9), new THREE.MeshStandardMaterial({ map: ban, emissive: '#fff', emissiveIntensity: .25 })); bm.position.set(-.4, 3.7, -3.85); sc.add(bm);
    sc.add(mesh(G.cyl(1.4, 1.4, .08, 20), '#7A5230', [0, .78, -.6])); sc.add(mesh(G.cyl(.2, .3, .76, 8), '#5E3E22', [0, .38, -.6]));
    const who = [['kucing', {}], ['beo', {}], ['bunglon', {}], ['tikus', {}], ['kerbau', {}], ['hantu', {}]]; const ring = who.map(([k, o], i) => { const a = i / 6 * Math.PI * 2 + .5; const P = cast[k]([Math.sin(a) * 2.1, 0, -.6 + Math.cos(a) * 2.1], o); sc.add(P); P.rotation.y = a + Math.PI; return P });
    const cups = Array.from({ length: 24 }, (_, i) => { const a = i / 24 * Math.PI * 2; const m = mesh(G.cyl(.07, .06, .14, 8), '#F4F0E6', [Math.sin(a) * 1.1, .89, -.6 + Math.cos(a) * 1.1]); sc.add(m); m.visible = false; return m });
    const clock = document.createElement('canvas'); clock.width = 256; clock.height = 256; const cx = clock.getContext('2d'); const ct = new THREE.CanvasTexture(clock); ct.colorSpace = THREE.SRGBColorSpace;
    const drawC = h => { cx.fillStyle = '#F4F0E6'; cx.beginPath(); cx.arc(128, 128, 120, 0, 7); cx.fill(); cx.strokeStyle = '#1B2347'; cx.lineWidth = 12; cx.stroke(); cx.lineCap = 'round'; const a = (h % 12) / 12 * Math.PI * 2, m = (h % 1) * Math.PI * 2;
      cx.beginPath(); cx.moveTo(128, 128); cx.lineTo(128 + Math.sin(a) * 60, 128 - Math.cos(a) * 60); cx.stroke(); cx.lineWidth = 7; cx.beginPath(); cx.moveTo(128, 128); cx.lineTo(128 + Math.sin(m) * 95, 128 - Math.cos(m) * 95); cx.stroke(); ct.needsUpdate = true };
    const cm = new THREE.Mesh(G.plane(.9, .9), new THREE.MeshBasicMaterial({ map: ct })); cm.position.set(-3.2, 3.4, -3.84); sc.add(cm);
    const cam = camera(42); const jam = chip(root, '', { left: 70, top: 300, fontSize: '46px' });
    const hook = V === 'awal' ? bottomHook(root, `Agenda rapat cuma satu: tanggal lomba.<br><span style="color:${MOON}">Rapatnya 4 jam.</span>`) : null;
    const topics = V === 'jam' ? v.bahas.map(([tx], i) => bubble(root, tx, '#FFFFFF', '#1B2347', { left: [80, 420, 160][i], top: [420, 520, 620][i], fontSize: '38px' })) : [];
    const qk = V === 'kerbau' ? bubble(root, '🐃 “Jadi tanggal berapa?”', '#FFFFFF', '#1B2347', { left: 80, top: 420, fontSize: '44px' }) : null, ak = V === 'kerbau' ? bubble(root, '😼 “Nanti kita rapatkan lagi.”', '#FFE0E0', '#8A1C1C', { left: 200, top: 540, fontSize: '44px' }) : null;
    const card = V === 'end' ? topCard(root, `“Rapat yang tidak memutuskan apa-apa,<br><span style="color:${MOON}">cuma memutuskan rapat berikutnya.”</span>`, { fontSize: '50px', top: 420 }) : null;
    const q = V === 'end' ? bubble(root, 'Panitia lo begini juga?', '#FFFFFF', '#1B2347', { left: 280, top: 660, fontSize: '42px' }) : null;
    const H0 = { awal: 19, jam: 20, kerbau: 23, end: 23 }[V], H1 = { awal: 19.5, jam: 22.2, kerbau: 23, end: 23.2 }[V];
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); const h = lerp(H0, H1, seg(t, 0, dur)); drawC(h); jam.innerHTML = `🕖 ${String(Math.floor(h)).padStart(2, '0')}.${String(Math.floor((h % 1) * 60)).padStart(2, '0')} · ☕ gelas ke-${Math.max(1, Math.floor(h - 18))}`; X.pop(jam, seg(t, .2, .5));
      cups.forEach((c, i) => c.visible = i < Math.floor((h - 18.5) * 4));
      ring.forEach((P, i) => { P.visible = V !== 'end' || i === 3; P.pose(t + i, { talk: V === 'jam' ? Math.floor(t / 3) % 3 === [0, 1, 2, 9, 9, 9][i] : (V === 'awal' && i === 0), nod: i === 2 || (V === 'awal'), shake: V === 'kerbau' && i === 0 && t > dur * .6 }) });
      if (V === 'kerbau') { const R = ring[4]; R.userData.st.arms[0].rotation.z = -2.8; R.userData.st.arms[0].rotation.x = 0; const tq = at(s, 'tanggal berapa', 2), ta = at(s, 'rapatkan lagi', dur - 2); X.pop(qk, seg(t, tq, tq + .4)); X.pop(ak, seg(t, ta, ta + .4)) }
      if (V === 'jam') { const cs = v.bahas_cues.map((c, i) => at(s, c, 1 + i * 3)); topics.forEach((b, i) => X.pop(b, seg(t, cs[i], cs[i] + .4))) }
      if (V === 'end') { const tp = at(s, 'Pepatah', dur * .3); const qq = seg(t, tp, tp + .5); card.style.opacity = qq; const tq = at(s, 'Panitia lo', dur - 3); X.pop(q, seg(t, tq, tq + .4)); jam.style.opacity = 1 }
      if (hook) hook.style.opacity = seg(t, 0, .3);
      orbit(cam, lerp(V === 'kerbau' ? 75 : -30, V === 'kerbau' ? 100 : 10, p), V === 'end' ? 4.2 : 3.4, V === 'end' ? 7.5 : 6.6, [0, 1, -.6]);
    } };
  },
  H_NOTULEN(s, root) {   // meja Tikus: buku notulen 4 halaman penuh; kolom KEPUTUSAN: "dibahas di rapat berikutnya"
    const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.4 })); roomN(sc, { wall: '#4A5A7A', wx: -2.2, L: 16 }); deskN(sc, [0, 0, -.8], 2.4); lampDesk(sc, [-.8, .82, -1], 22);
    const T = cast.tikus([.9, 0, .2]); T.rotation.y = Math.PI + .5; sc.add(T); for (let i = 0; i < 4; i++) sc.add(mesh(G.box(.5, .01, .66), '#F4F0E6', [-.5 + i * .12, .83 + i * .005, -.7 + i * .03], { rot: [0, (i - 1.5) * .12, 0], mat: { emissive: '#F4F0E6', emissiveIntensity: .25 }, cast: false }));
    const cam = camera(40);
    const page = X.ab({ left: 110, top: 300, width: 800, padding: '24px 34px', background: '#FDF6E3', border: '6px solid #0B1026', borderRadius: '10px', fontFamily: 'Baloo', fontWeight: 800, color: '#1B2347', fontSize: '34px', lineHeight: 1.3, boxShadow: '0 12px 0 #00000055', opacity: 0 }, root,
      `<div style="font-size:42px;color:#C0392B">NOTULEN RAPAT PANITIA · hal. 4/4</div><div>• warna spanduk: dibahas</div><div>• pegang mic: dibahas</div><div>• konsumsi: dibahas</div><div>• hadiah lomba: dibahas</div><div style="height:4px;background:#1B2347;margin:12px 0"></div><div style="font-size:40px">KEPUTUSAN:</div><div class="kp" style="font-size:44px;color:#C0392B;opacity:0">dibahas di rapat berikutnya</div>`);
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'kolom keputusan', dur * .5); page.style.opacity = seg(t, .3, .7); page.querySelector('.kp').style.opacity = seg(t, tk + .6, tk + 1.1);
      T.pose(t, { hold: true }); T.userData.st.arms[1].rotation.x = -1 + Math.sin(t * 12) * .15; const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.8, 1.2, p), lerp(2.6, 2.3, p), lerp(3.2, 2.6, p)); cam.lookAt(-.2, .9, -.7);
    } };
  },
  H_PANTAI(s, root) {   // pantai malam terang: Merak live dengan lampu cincin; varian komen / datang (Kucing penagih mengetuk) / end (kamar kos, tanpa lampu cincin)
    const V = s.variant || 'live'; const v = X.TL.vars; const END = V === 'end'; const sc = newScene(NOIR({ hemi: 1.3, sunI: 1.6, sky: ['#1C3C72', '#5A7AB0'] }));
    if (!END) { sc.add(mesh(G.box(40, .2, 30), '#D9C08A', [0, -.1, 0])); sc.add(mesh(G.box(40, .1, 12), '#2E6A9A', [0, .02, -14], { mat: { emissive: '#1F4A7A', emissiveIntensity: .4 }, cast: false }));
      const moon = mesh(G.ico(1.6, 2), MOON, [6, 7, -26], { mat: { emissive: MOON, emissiveIntensity: 1.1 }, cast: false }); sc.add(moon);
      [[-5, -4], [5.5, -3.5], [-7, 1]].forEach(([x, z]) => { const g = group(sc, [x, 0, z]); g.add(mesh(G.cyl(.12, .18, 3, 6), '#7A4E2C', [0, 1.5, 0], { rot: [0, 0, .15] })); for (let i = 0; i < 5; i++) g.add(mesh(G.box(1.6, .06, .4), '#3F8A3A', [Math.cos(i * 1.26) * .7 + .4, 3, Math.sin(i * 1.26) * .7], { rot: [0, -i * 1.26, -.3] })) });
      const vil = group(sc, [2.6, 0, -2.6]); vil.add(mesh(G.box(3, 2.4, 2.4), '#F4E8D0', [0, 1.2, 0])); vil.add(mesh(G.cone(2.4, 1.2, 4), '#9C5B33', [0, 3, 0], { rot: [0, Math.PI / 4, 0] })); vil.add(mesh(G.box(.9, 1.8, .05), '#5E3E22', [-.6, .9, 1.22]));
      const nm = txtTex(256, 128, x => { x.fillStyle = '#F2C14E'; x.fillRect(0, 0, 256, 128); x.fillStyle = '#1B2347'; x.font = '800 80px Baloo'; x.textAlign = 'center'; x.fillText('12', 128, 95) }); const nmM = new THREE.Mesh(G.plane(.5, .25), new THREE.MeshStandardMaterial({ map: nm, emissive: '#fff', emissiveIntensity: .3 })); nmM.position.set(-.6, 2, 1.24); vil.add(nmM);
      for (let i = 0; i < 10; i++) { const L = mesh(G.sph(.08, 6, 5), '#FFD27A', [-4 + i * .9, 2.6 + Math.sin(i) * .2, -1], { mat: { emissive: '#FFD27A', emissiveIntensity: 2 }, cast: false }); sc.add(L) } [-3, 3].forEach(x => { const L = new THREE.PointLight('#FFD9A0', 16, 10); L.position.set(x, 3, 1); sc.add(L) }) }
    else { roomN(sc, { wall: '#5A5A6A', wx: -2, L: 10 }); sc.add(mesh(G.box(2.6, .45, 1.6), '#3D4F7A', [1.2, .22, -2])) }
    const M = cast.merak(END ? [-.4, 0, -.6] : [-.6, 0, .4]); sc.add(M); M.rotation.y = .3;
    const ringL = !END ? (() => { const g = group(sc, [.6, 0, 2]); g.add(mesh(G.cyl(.02, .02, 1.6, 4), '#222', [0, .8, 0])); g.add(mesh(new THREE.TorusGeometry(.32, .05, 8, 24), '#FFFFFF', [0, 1.7, 0], { mat: { emissive: '#FFFFFF', emissiveIntensity: 2 }, cast: false })); const L = new THREE.PointLight('#FFFFFF', 14, 5); L.position.set(0, 1.7, 0); g.add(L); return g })() : null;
    const K = V === 'datang' ? cast.kucing([4, 0, 1.4], { prop: 'clipboard' }) : null; if (K) sc.add(K);
    const cam = camera(42);
    const live = X.ab({ left: 40, top: 270, width: 1000, height: 1100, border: '6px solid #FFFFFFB0', borderRadius: '30px' }, root, `<div style="position:absolute;left:24px;top:20px;background:#E5484D;color:#fff;font-family:Baloo;font-weight:800;font-size:34px;padding:4px 16px;border-radius:10px">LIVE</div><div class="vw" style="position:absolute;left:150px;top:22px;color:#fff;font-family:Baloo;font-weight:800;font-size:34px;text-shadow:0 3px 0 #000"></div><div style="position:absolute;right:24px;top:22px;color:#fff;font-family:Baloo;font-weight:800;font-size:30px;text-shadow:0 3px 0 #000">${END ? 'jangan pamer yang belum lunas' : 'healing dulu, kerja nanti 🌴'}</div>`);
    const coms = V === 'komen' ? v.komen.map(([w, tx], i) => X.ab({ left: 60, top: 760 + i * 70, fontFamily: 'Baloo', fontWeight: 800, fontSize: '34px', color: '#fff', textShadow: '0 3px 0 #000', opacity: 0 }, root, `<span style="color:${MOON}">${w}</span> ${tx}`)) : [];
    const hook = V === 'live' ? bottomHook(root, `Merak live liburan dari pantai.<br><span style="color:${MOON}">Cicilannya belum lunas.</span>`) : null;
    const c1 = V === 'datang' ? bubble(root, '😼 “Permisi, kamar 12. Soal cicilan.”', '#FFFFFF', '#1B2347', { left: 70, top: 400, fontSize: '40px' }) : null; const c2 = V === 'datang' ? chip(root, '👀 2.000 penonton masih nonton', { left: 70, top: 520, color: ORANGE, borderColor: ORANGE }) : null;
    const q = END ? bubble(root, 'Pernah lihat yang begini di medsos?', '#FFFFFF', '#1B2347', { left: 160, top: 420, fontSize: '40px' }) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); live.querySelector('.vw').innerHTML = `👁 ${END ? 37 : Math.round(lerp(1200, v.penonton, seg(t, 0, dur)))}`;
      M.pose(t, { talk: true, cheer: V === 'live' && (t % 4) < 1, bounce: V !== 'end' && V !== 'datang', shake: V === 'datang' && t > dur * .6 }); if (M.userData.tail) M.userData.tail.scale.setScalar(END ? .4 : V === 'datang' ? lerp(1, .3, seg(t, dur * .5, dur)) : 1);
      if (K) { const ta = at(s, 'diketuk', 2); K.position.x = lerp(4, 1.2, E.out(seg(t, 0, ta))); K.rotation.y = -1.3; K.pose(t, { walk: t < ta ? 1 : 0, hold: true, talk: t > ta }); X.pop(c1, seg(t, ta, ta + .4)); X.pop(c2, seg(t, ta + 1.5, ta + 1.9)) }
      coms.forEach((c, i) => { const tc = at(s, 'komentar', 1) + i * .8; c.style.opacity = seg(t, tc, tc + .3) });
      if (V === 'datang') live.style.filter = `brightness(${1 - seg(t, dur - 2, dur) * .8})`;
      cam.position.set(lerp(.6, .2, p), lerp(1.9, 2, p), lerp(5, 4.4, p) + (END ? -1 : 0)); cam.lookAt(-.4, 1.5, END ? -.6 : .4);
      if (hook) hook.style.opacity = seg(t, 0, .3); if (q) { const tq = at(s, 'Pernah', dur - 3); X.pop(q, seg(t, tq, tq + .4)) }
    } };
  },
  H_HPLIVE(s, root) {   // kantor penagihan malam: Kucing menonton live Merak di laptop, daftar tunggakan di layar kedua
    const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.1, sunI: 1.4 })); roomN(sc, { wall: '#3E4A6A', wx: 2.4, L: 14 }); deskN(sc, [0, 0, -.8], 2.6); lampDesk(sc, [1, .82, -1], 18);
    const K = cast.kucing([0, 0, .3]); K.rotation.y = Math.PI; sc.add(K); sc.add(mesh(G.box(.7, .55, .6), '#2A2A33', [0, .27, .35]));
    const lap = group(sc, [-.5, .86, -.9]); lap.add(mesh(G.box(.9, .03, .6), '#9AA0A8', [0, 0, 0])); const st = txtTex(512, 300, x => { const g = x.createLinearGradient(0, 0, 0, 300); g.addColorStop(0, '#1C3C72'); g.addColorStop(1, '#D9C08A'); x.fillStyle = g; x.fillRect(0, 0, 512, 300); x.fillStyle = '#1F5FA8'; x.beginPath(); x.arc(200, 180, 50, 0, 7); x.fill(); x.fillStyle = '#E5484D'; x.fillRect(16, 14, 80, 36); x.fillStyle = '#fff'; x.font = '800 28px Baloo'; x.fillText('LIVE', 26, 42) });
    const sm = new THREE.Mesh(G.plane(.84, .5), new THREE.MeshBasicMaterial({ map: st })); sm.position.set(-.5, 1.12, -1.18); sm.rotation.x = -.15; sc.add(sm); sc.add(mesh(G.box(.9, .56, .03), '#9AA0A8', [-.5, 1.12, -1.2], { rot: [-.15, 0, 0] }));
    const ls = txtTex(512, 400, x => { x.fillStyle = '#F4F7FA'; x.fillRect(0, 0, 512, 400); x.fillStyle = '#C0392B'; x.fillRect(0, 0, 512, 60); x.fillStyle = '#fff'; x.font = '800 34px Baloo'; x.fillText('DAFTAR TUNGGAKAN', 16, 44); x.fillStyle = '#1B2347'; x.font = '800 30px Baloo';
      [['Musang', '1 bln'], ['MERAK', '3 bln'], ['Ayam', '2 mgg']].forEach(([n, d], i) => { x.fillStyle = n === 'MERAK' ? '#C0392B' : '#1B2347'; x.fillText(n, 20, 120 + i * 70); x.fillText(d, 360, 120 + i * 70) }) });
    const s2 = new THREE.Mesh(G.plane(.8, .62), new THREE.MeshBasicMaterial({ map: ls })); s2.position.set(.5, 1.2, -1.2); sc.add(s2);
    const cam = camera(40); const c1 = chip(root, `📋 cicilan liburan Merak: <b>${v.bulan} bulan nunggak</b>`, { left: 70, top: 300 }), c2 = chip(root, '📍 nama resort: disebut di live', { left: 70, top: 410, color: ORANGE, borderColor: ORANGE });
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'belum dibayar', 2.5), tr = at(s, 'nama resortnya', dur - 2); K.pose(t, { look: Math.sin(t * .8) * .3, nod: t > tr }); if (K.userData.tail) K.userData.tail.rotation.z = Math.sin(t * 2) * .3;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.2, .4, p), lerp(2.2, 1.9, p), lerp(-2.8, -2.4, p)); cam.lookAt(0, 1.3, .2); X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tr, tr + .4));
    } };
  },
  H_WARKOP(s, root) {   // warung tenda malam: 6 hewan nongkrong; varian sorot rakun / bunglon / kerbau (lampu sorot + nomor); end: tagihan + "lo yang mana?"
    const V = s.variant || 'awal'; const v = X.TL.vars; const sc = newScene(NOIR({ hemi: 1.15, sunI: 1.5 })); skyline(sc, -18); sc.add(mesh(G.box(24, .2, 14), '#3A3F52', [0, -.1, 0]));
    const tent = group(sc, [0, 0, -.8]); tent.add(mesh(G.box(7, .1, 4), '#E5484D', [0, 3, 0], { rot: [.08, 0, 0] })); [[-3.4, -1.9], [3.4, -1.9], [-3.4, 1.9], [3.4, 1.9]].forEach(([x, z]) => tent.add(mesh(G.box(.08, 3, .08), '#2A2A2A', [x, 1.5, z])));
    for (let i = 0; i < 12; i++) sc.add(mesh(G.sph(.07, 6, 5), ['#FFD27A', '#9CE0FF'][i % 2], [-3.2 + i * .58, 2.85, 1.1], { mat: { emissive: ['#FFD27A', '#9CE0FF'][i % 2], emissiveIntensity: 2 }, cast: false }));
    const L = new THREE.PointLight('#FFD9A0', 26, 10); L.position.set(0, 2.6, -.6); sc.add(L); sc.add(mesh(G.box(5, .08, 1.2), '#8A6A4A', [0, .78, -.6])); sc.add(mesh(G.box(4.9, .74, 1.1), '#5E3E22', [0, .37, -.6]));
    const plates = Array.from({ length: 10 }, (_, i) => { const m = mesh(G.cyl(.18, .16, .05, 10), '#F4F0E6', [-2 + (i % 5) * 1, .84, -.75 + Math.floor(i / 5) * .4]); sc.add(m); return m });
    const seat = [['rakun', -2.2, .3], ['bunglon', -1, .4], ['kerbau', .4, .4], ['tikus', 1.7, .3], ['beo', -1.6, -1.6], ['kucing', 1, -1.6]];
    const A = Object.fromEntries(seat.map(([k, x, z]) => { const P = cast[k]([x, 0, z]); P.rotation.y = z > 0 ? Math.PI : 0; sc.add(P); return [k, P] }));
    const spot = new THREE.SpotLight('#FFF2D0', 0, 8, .3, .5, 1); spot.position.set(0, 5, 2); sc.add(spot, spot.target);
    const focus = { rakun: A.rakun, bunglon: A.bunglon, kerbau: A.kerbau }[V];
    const cam = camera(42); const hook = V === 'awal' ? bottomHook(root, `Nongkrong patungan.<br><span style="color:${MOON}">Pasti ada 3 hewan ini.</span>`) : null;
    const tag = focus ? ftag(root, { rakun: '#1 Rakun', bunglon: '#2 Bunglon', kerbau: '#3 Kerbau' }[V], { fontSize: '50px' }) : null;
    const lines = { rakun: [['💬 “nanti gue transfer ya”', 'nanti gue transfer'], ['💸 transfer: belum sampai', 'belum sampai']], bunglon: [['🧋 pesan: es teh doang', 'es teh'], [`🧾 bayar rata: Rp${v.per}rb`, 'bagi rata']], kerbau: [[`💳 nalangin: Rp${v.total}rb`, 'nalangin'], ['📅 nagih: seminggu', 'seminggu']] }[V] || [];
    const chips = lines.map(([tx], i) => chip(root, tx, { left: 70, top: 300 + i * 110, fontSize: '42px' }));
    const usul = V === 'rakun' ? chip(root, '💡 usulan penonton', { left: 70, top: 520, color: ORANGE, borderColor: ORANGE }) : null;
    const bill = V === 'end' ? X.ab({ left: 220, top: 300, width: 600, padding: '20px 30px', background: '#FDF6E3', border: '6px solid #0B1026', borderRadius: '10px', fontFamily: 'Baloo', fontWeight: 800, color: '#1B2347', fontSize: '36px', lineHeight: 1.3, opacity: 0 }, root,
      `<div style="font-size:42px;color:#C0392B">TAGIHAN MEJA 3</div><div>6 ekor · total Rp${v.total}.000</div><div>bagi rata: Rp${v.per}.000/ekor</div><div style="color:#C0392B">dibayar dulu oleh: Kerbau</div>`) : null;
    const q = V === 'end' ? bubble(root, 'Tag teman yang paling Rakun 🦝', '#FFFFFF', '#1B2347', { left: 220, top: 600, fontSize: '42px' }) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur));
      Object.entries(A).forEach(([k, P], i) => P.pose(t + i, { talk: !focus && (t + i) % 3 < 1.2, look: Math.sin(t * .6 + i) * .3, shake: k === 'rakun' && V === 'rakun' && t > dur * .4, nod: k === 'kerbau' && V === 'kerbau' }));
      if (V === 'rakun') { const R = A.rakun; const sw = t > dur * .4 ? Math.sin(t * 9) : 0; R.userData.st.arms.forEach((a, i) => { a.rotation.x = -.6 + sw * .4 * (i ? 1 : -1) }) }
      if (V === 'kerbau') A.kerbau.userData.st.arms[1].rotation.x = -1.2;
      plates.forEach((m, i) => m.visible = V === 'awal' ? i < 2 + Math.floor(t * 2) : true);
      if (focus) { spot.intensity = 60; spot.position.set(focus.position.x, 5, focus.position.z + 2); spot.target.position.copy(focus.position); tag.at(focus, cam, [0, 2.5, 0], seg(t, .3, .7));
        cam.position.set(focus.position.x + lerp(.5, .1, p), lerp(2.7, 2.4, p), focus.position.z - lerp(4.6, 4, p)); cam.lookAt(focus.position.x, 1.3, focus.position.z);
        const cs = lines.map(([, c], i) => at(s, c, 2 + i * 3)); chips.forEach((c, i) => X.pop(c, seg(t, cs[i], cs[i] + .4))); if (usul) X.pop(usul, seg(t, .6, 1)) }
      else { cam.position.set(lerp(-2, 2, p), lerp(3, 3.4, p), lerp(7.6, 8.2, p)); cam.lookAt(0, 1.2, -.4) }
      if (hook) hook.style.opacity = seg(t, 0, .3); if (bill) { bill.style.opacity = seg(t, .4, .8); const tq = at(s, 'Tag teman', dur - 3); X.pop(q, seg(t, tq, tq + .4)) }
    } };
  },
});

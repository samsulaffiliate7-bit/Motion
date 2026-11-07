// Dunia 3D akun Hewan Berdasi Kotor: fabel kantor bergaya noir.
// Bahasa visual khas: malam biru gelap, cahaya bulan lewat kerai, lampu meja hangat, debu melayang di berkas cahaya,
// kamera dolly menyamping pelan & sudut rendah (kuasa), siluet di pintu, transisi gelap ke hitam, judul gaya mesin tik.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from './kit.js';

let X; const MOON = '#F5D76E', NIGHT = '#0B1026', ORANGE = '#F28C28';
// ===== tokoh hewan =====
function animal(parent, p, kind, o = {}) {
  const base = { cat: { skin: '#9AA0A8', body: '#2B2F3A', pants: '#22252E', tie: '#C0392B', s: 1 }, mouse: { skin: '#B9B6B0', body: '#D9D2C3', pants: '#5A5F6B', s: .78 },
    buffalo: { skin: '#5B5552', body: '#6B8E5A', pants: '#3E3A36', s: 1.22 }, snake: { skin: '#6FA34A', body: '#3A2E4A', pants: '#2A2236', tie: '#E5C04A', s: 1.02 }, owl: { skin: '#8B6B4A', body: '#3A2E2A', pants: '#2A221E', tie: MOON, s: 1.08 } }[kind];
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
  return g;
}
const cast = {
  kucing: (p, o = {}) => animal(o.parent, p, 'cat', o), tikus: (p, o = {}) => animal(o.parent, p, 'mouse', o),
  kerbau: (p, o = {}) => animal(o.parent, p, 'buffalo', o), hantu: (p, o = {}) => animal(o.parent, p, 'owl', o),
  ular: (p, o = {}) => animal(o.parent, p, 'snake', o),
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

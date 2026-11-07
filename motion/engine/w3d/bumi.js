// Dunia 3D akun Denah Rumah Dunia, serial "Bumi Kita".
// Bahasa visual khas (beda dari akun lain): globe, terbang antar negara, rumah tumbuh, HUD bumi, transisi pesawat kertas.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, cloud, coin, house, person, rain, loadWorld, globe, ll2v } from './kit.js';

let X, TH;
const NAVY = '#13324F', GOLD = '#FFC93C', TERRA = '#D9772B', CREAM = '#FFFBF2';
const juragan = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#8E2F3A', pants: '#2B2B2B', hat: 'bowler', hatC: '#1E1E1E', glasses: true, tie: GOLD, prop: 'suitcase', skin: '#E2A97E' }, o));
const kepala = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#2E7D5B', pants: '#3B4A5A', hat: 'cap', hatC: GOLD, prop: 'clipboard', skin: '#C98E64' }, o));

// kartu DOM bergaya akun
const chip = (root, html, css = {}, col = NAVY) => { const e = X.ab(Object.assign({ background: CREAM, border: `6px solid ${NAVY}`, borderRadius: '26px', padding: '12px 26px', fontSize: '42px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${col === NAVY ? TERRA : col}`, fontFamily: 'Fredoka' }, css), root, html); e.style.opacity = 0; return e };
// label yang menempel ke benda 3D
function tag3(root, html, col = NAVY) { const w = X.ab({ left: 0, top: 0 }, root); const e = chip(w, html, { position: 'relative', transform: 'translate(-50%,-100%)' }, col); e.style.transformOrigin = '50% 100%';
  return { w, e, at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }
const popAt = (s, cueRx, fb) => X.C(s, cueRx, fb), at3 = popAt;

function stars(sc, n = 400) { const g = new THREE.BufferGeometry(), a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const u = (i * 0.618) % 1, v = (i * 0.414) % 1, th = u * Math.PI * 2, ph = Math.acos(2 * v - 1), r = 120; a[i * 3] = r * Math.sin(ph) * Math.cos(th); a[i * 3 + 1] = r * Math.cos(ph); a[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) }
  g.setAttribute('position', new THREE.BufferAttribute(a, 3)); sc.add(new THREE.Points(g, new THREE.PointsMaterial({ color: '#FFFFFF', size: 2.2, sizeAttenuation: false }))) }

function plot(sc, o = {}) {   // kavling kosong di pinggir kota
  const I = island(sc, o.w || 12, o.d || 12, o.grass || '#8CC152', '#8D6E4A');
  sc.add(mesh(G.box(4.2, .05, 4.2), '#D9C9A3', [0, .02, 0]));   // kavling
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => sc.add(mesh(G.cyl(.06, .06, .5, 6), '#B5452B', [x * 2.1, .25, z * 2.1])));
  [[-4.6, -4.4, 1.1], [4.5, -4.2, .9], [-4.7, 3.8, 1], [4.4, 4.2, 1.2]].forEach(([x, z, s], i) => tree(sc, [x, 0, z], s, i % 2 ? '#3F8A3A' : '#4E9A3E', i % 3 ? 'round' : 'palm'));
  if (o.city) for (let i = 0; i < 15; i++) { const h = 3 + ((i * 37) % 6); sc.add(mesh(G.box(2.4, h, 2.4), ['#C7D6E4', '#D5E1EC', '#BACBDB'][i % 3], [-28 + i * 4, h / 2 - .2, -34 - (i % 2) * 3], { cast: false })) }
  return I;
}


// ===== perkakas kota (tata ruang skala kota) =====
const ZC = { hunian: '#F5C542', usaha: '#E5484D', industri: '#8E6CC0', hijau: '#4CAF50', pesisir: '#5FA8D8' };
// blok 7x7 di grid 3x3 (pusat -8, 0, 8); utara = -z (laut di belakang)
const BLOCKS = { hunian: [[-8, 8], [-8, 0]], usaha: [[0, 0], [0, 8]], industri: [[8, 0], [8, -8]], hijau: [[8, 8], [-8, -8]], pesisir: [[0, -8]] };
function cityBoard(sc, o = {}) {
  const g = group(sc);
  g.add(mesh(G.box(26, .6, 26), '#9CCB6A', [0, -.3, 0])); g.add(mesh(G.box(26.4, 2, 26.4), '#8D6E4A', [0, -1.6, 0]));
  const sea = mesh(G.box(40, .3, 12), '#3E8FC4', [0, -.35, -19], { mat: { roughness: .2 } }); g.add(sea); g.add(mesh(G.box(26, .25, 1.2), '#E8D9A8', [0, -.05, -12.6]));
  for (const k of [-4, 4]) { g.add(mesh(G.box(1.2, .06, 26), '#8A8F96', [k, .03, 0])); g.add(mesh(G.box(26, .06, 1.2), '#8A8F96', [0, .03, k])) }
  for (const k of [-4, 4]) for (let i = -12; i < 12; i += 1.6) { g.add(mesh(G.box(.08, .07, .6), '#F2F2F2', [k, .05, i], { cast: false })); g.add(mesh(G.box(.6, .07, .08), '#F2F2F2', [i, .05, k], { cast: false })) }
  const zones = {}; for (const [z, list] of Object.entries(BLOCKS)) zones[z] = list.map(([x, y]) => { const m = mesh(G.box(6.6, .08, 6.6), ZC[z], [x, .05, y], { mat: { transparent: true, opacity: .55 }, cast: false }); m.visible = false; g.add(m); return m });
  [[-12.5, 12.5], [12.5, 12.5], [-12.5, -11.5], [12.5, -11.5], [-12.5, 0], [12.5, 0]].forEach(([x, z], i) => tree(g, [x, 0, z], 1, '#3F8A3A', 'palm'));
  g.userData = { zones, sea }; return g;
}
const CC = ['#F3E1C4', '#E9C9A8', '#DCE7D2', '#F2D7D0', '#FFF3D6'], RC = ['#C9472F', '#B5452B', '#9C5B33', '#2E7D5B'];
function housing(parent, cx, cz, n = 3) { const out = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const h = house(parent, [cx - 2 + i * 2, 0, cz - 2 + j * 2], { w: 1.3, d: 1.2, h: .9, roofH: .6, wall: CC[(i + j) % 5], roofC: RC[(i * 2 + j) % 4] }); out.push(h) } return out }
function park(parent, cx, cz) { const g = group(parent, [cx, 0, cz]); g.add(mesh(G.cyl(1.2, 1.2, .08, 20), '#5FA8D8', [0, .08, 0])); [[-2, -2], [2, -2], [-2, 2], [2, 2], [0, -2.5], [-2.5, 0]].forEach(([x, z], i) => tree(g, [x, 0, z], .8, i % 2 ? '#3F8A3A' : '#4E9A3E')); return g }
function shop(parent, p, o = {}) { const g = group(parent, p); const w = o.w || 2, d = o.d || 1.6, h = o.h || 1.2;
  g.add(mesh(G.box(w, h, d), o.wall || '#FFFFFF', [0, h / 2, 0])); g.add(mesh(G.box(w * .9, h * .45, .05), '#9ED8F5', [0, h * .35, d / 2 + .01]));
  g.add(mesh(G.box(w + .1, .3, .2), o.sign || '#E5484D', [0, h + .15, d / 2 - .05])); if (o.awn) g.add(mesh(G.box(w + .2, .08, .6), o.awn, [0, h * .72, d / 2 + .3], { rot: [.3, 0, 0] })); return g }
function tower(parent, p, h, col = '#B7C9DB') { const g = group(parent, p); g.add(mesh(G.box(1.6, h, 1.6), col, [0, h / 2, 0])); for (let y = .6; y < h - .3; y += .7) g.add(mesh(G.box(1.62, .2, 1.62), '#7FB3D9', [0, y, 0], { cast: false })); return g }
function factory(parent, p) { const g = group(parent, p); g.add(mesh(G.box(3.2, 1.4, 2.2), '#B0B7BF', [0, .7, 0])); g.add(mesh(G.box(3.3, .25, 2.3), '#7D8A94', [0, 1.5, 0]));
  const ch = mesh(G.cyl(.25, .3, 2.6, 10), '#8E6CC0', [1.1, 1.3, -.6]); g.add(ch); const puffs = [0, 1, 2].map(i => { const m = mesh(G.ico(.35, 1), '#E0E0E0', [1.1, 2.8, -.6], { cast: false }); g.add(m); return m });
  g.userData.puffs = puffs; return g }
function cars(parent, n = 8) { const list = Array.from({ length: n }, (_, i) => { const bus = i % 4 === 0; const m = mesh(G.box(bus ? .5 : .4, .35, bus ? 1.3 : .7), bus ? '#2E7D5B' : ['#E5484D', '#3E8FC4', '#F5C542', '#FFFFFF'][i % 4], [0, .2, 0]); parent.add(m); return m });
  return t => list.forEach((m, i) => { const lane = i % 4, k = ((t * .08 + i * .137) % 1) * 26 - 13, off = (i % 2 ? .3 : -.3); if (lane < 2) { m.position.set([-4, 4][lane] + off, .2, k * (i % 2 ? 1 : -1)); m.rotation.y = 0 } else { m.position.set(k * (i % 2 ? 1 : -1), .2, [-4, 4][lane - 2] + off); m.rotation.y = Math.PI / 2 } }) }
const grow = (objs, t, t0, gap = .08) => objs.forEach((o, i) => { const q = E.back(seg(t, t0 + i * gap, t0 + i * gap + .4)); o.scale.setScalar(Math.max(.001, q)); o.visible = q > .001 });

export async function setup(ctx) { X = ctx; TH = ctx.TH; await loadWorld('../assets/geo/world360.json') }

export const SHOTS = {
  // 1. Globe kosong di angkasa + dua penduduk berdiri di puncaknya
  B_GLOBE_HOOK(s, root) {
    const sc = newScene({ sky: ['#071A33', '#1D5C93'], hemi: .7, sunI: 3, sunPos: [12, 8, 10], shadow: 9 }); stars(sc);
    const gl = globe(sc, 5, { highlight: ['Indonesia'] }); gl.face(10, 20);
    const ppl = group(sc, [0, 4.95, 0]); const J = juragan([-.6, 0, 0], { parent: ppl, s: 1.35 }), K = kepala([.6, 0, 0], { parent: ppl, s: 1.35 });
    const cam = camera(40);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#FFFBF2F2', border: `8px solid ${NAVY}`, borderRadius: '40px', padding: '26px 30px', textAlign: 'center', fontSize: '60px', lineHeight: 1.12, color: NAVY, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 14px 0 ${TERRA}` }, root,
      `Bumi masih <b style="color:${TERRA}">kosong</b>.<br>Penduduk: <b>2 orang</b>.<br><span style="font-size:52px">Kalian yang menentukan isinya.</span>`);
    const tJ = tag3(root, 'Jakarta', '#E5484D'); let pin = null;
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); const tj = popAt(s, 'Jakarta', dur - 2.5);
      const a = seg(t, tj - 1.2, tj + .6); gl.face(lerp(10, -6.2, E.inout(a)), lerp(20 + t * 4, 106.8, E.inout(a)));
      orbit(cam, lerp(-12, 10, p), lerp(9, 5, p), lerp(36, 28, p), [0, 4.4, 0]);
      J.pose(t, { wave: true, bounce: true }); K.pose(t + .4, { cheer: t > 2, talk: true });
      X.pop(hook, seg(t, .1, .5)); hook.style.top = (300 - 10 * Math.sin(t * 2)) + 'px';
      if (!pin && t >= tj) pin = gl.pin(-6.2, 106.8);
      if (pin) { const q = seg(t, tj, tj + .5); pin.scale.setScalar(Math.max(.01, E.back(q))); tJ.at(pin, cam, [0, 0, .9], q) } else tJ.at(gl, cam, [0, 0, 0], 0);
    } };
  },
  // 2. Kenalan: kavling kosong, Juragan Modal + Kepala Bumi, koin menyembur dari koper
  B_CHARS(s, root) {
    const sc = newScene({ sky: ['#7EC8F2', '#E7F6FF'], sunPos: [-8, 14, 10], fog: ['#E7F6FF', 30, 70] }); plot(sc, { city: true });
    const J = juragan([-1.1, 0, .6]), K = kepala([1.2, 0, .4]); sc.add(J, K); J.rotation.y = .35; K.rotation.y = -.35;
    const coins = Array.from({ length: 26 }, (_, i) => coin(sc, [0, -5, 0], 1.1));
    const cam = camera(42);
    const tgJ = tag3(root, 'Juragan Modal', '#8E2F3A'), tgK = tag3(root, 'Kepala Bumi', '#2E7D5B');
    const c1 = chip(root, `Modal awal: <b style="color:${TERRA}">1.000 koin</b>`, { left: 150, top: 300, fontSize: '48px' });
    return { scene: sc, cam, upd(t, dur) {
      const tj = popAt(s, 'Juragan Modal', 1.2), tc = popAt(s, 'seribu', 3.5), tk = popAt(s, 'Kepala Bumi', 6.5), tp = popAt(s, 'pusing', dur - 2);
      const focus = t < tk - .3 ? 0 : 1, f = E.inout(seg(t, tk - .8, tk + .2));
      orbit(cam, lerp(-24, 22, f) + Math.sin(t * .4) * 3, 3.2, lerp(11.5, 11, f), [lerp(-.5, .5, f), 1.2, .5]);
      J.pose(t, { talk: t > tj && t < tk, hold: true, nod: t > tp }); K.pose(t, { talk: t > tk, wave: t > tk && t < tk + 1.6, shake: t > tp });
      const sp = seg(t, tc, tc + 2.2); coins.forEach((c, i) => { if (sp <= 0) { c.position.y = -5; return } const a = i * 2.39, v = 2.2 + (i % 5) * .35, tt = Math.min(sp * 2.2, 1.6 + (i % 4) * .1);
        c.position.set(-1.1 + .6 + Math.cos(a) * tt * .9, 1 + v * tt - 2.4 * tt * tt * .9, .9 + Math.sin(a) * tt * .9); if (c.position.y < .05) c.position.y = .05; c.rotation.set(t * 6 + i, t * 4, 0) });
      tgJ.at(J, cam, [0, 2.35, 0], seg(t, tj, tj + .4)); tgK.at(K, cam, [0, 2.35, 0], seg(t, tk, tk + .4)); X.pop(c1, seg(t, tc + .3, tc + .7));
    } };
  },
  // 3. Terbang dari angkasa ke Indonesia lalu Jakarta
  B_FLY(s, root) {
    const sc = newScene({ sky: ['#2C7CC0', '#BFE6FF'], hemi: 1, sunI: 2.6, sunPos: [6, 10, 14], shadow: 8 });
    const gl = globe(sc, 5, { highlight: ['Indonesia'] }); const pin = gl.pin(-6.2, 106.8); pin.scale.setScalar(.01);
    const cl = [[-2, 112], [4, 98], [-9, 120], [1, 104]].map(([la, lo], i) => { const c = cloud(gl, [0, 0, 0], .32); c.position.copy(ll2v(la, lo, 5.55)); c.lookAt(ll2v(la, lo, 9)); return c });
    const cam = camera(36);
    const tI = tag3(root, 'INDONESIA', NAVY), tJ = tag3(root, 'Jakarta', '#E5484D');
    const chips = [['🌡️', 'Tropis: panas & lembap', 'lembap', NAVY], ['☔', 'Musim hujan ± Okt–Mei', 'Oktober', '#3E8FC4'], ['🌊', 'Utara/pesisir rawan banjir', 'banjir', '#E5484D']]
      .map(([ic, tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 112, fontSize: '40px' }, col) }));
    return { scene: sc, cam, upd(t, dur) {
      const tj = popAt(s, 'Jakarta', 1.2), z = E.inout(seg(t, 0, tj + 1.5));
      gl.face(lerp(25, -6.2, z), lerp(40, 106.8, z) + (1 - z) * t * 6);
      const d = lerp(30, 19, z) - seg(t, tj + 1.5, dur) * 1.5; orbit(cam, Math.sin(t * .3) * 4, lerp(4, .3, z), d, [0, lerp(0, -.6, z), 0]);
      pin.scale.setScalar(Math.max(.01, E.back(seg(t, tj, tj + .5)) * 1.2));
      cl.forEach((c, i) => c.position.copy(ll2v([-2, 4, -9, 1][i] + Math.sin(t * .5 + i) * .8, [112, 98, 120, 104][i] + t * .4, 5.55)));
      tI.at(gl, cam, ll2v(-2.5, 118, 5.3).toArray(), seg(t, .6, 1)); tJ.at(pin, cam, [0, 0, .9], seg(t, tj + .2, tj + .6));
      chips.forEach(c => X.pop(c.e, seg(t, popAt(s, c.cu, 99), popAt(s, c.cu, 99) + .4)));
    } };
  },
  // 4. Kavling kosong: panas lalu hujan, genangan membesar
  B_PLOT(s, root) {
    const sc = newScene({ sky: ['#8FD3FF', '#F4FBFF'], sunPos: [6, 16, 6], fog: ['#E8F2F8', 30, 70] }); plot(sc, { city: true });
    const pud = mesh(G.cyl(1, 1, .04, 24), '#5FA8D8', [0, .05, 0], { mat: { roughness: .15, metalness: .1, transparent: true, opacity: .85 } }); sc.add(pud);
    const R = rain(sc, 420, 14, 12); R.visible = false;
    const J = juragan([-1.5, 0, 1.4], { prop: 'umbrella', umbC: '#8E2F3A' }), K = kepala([1.4, 0, 1.6]); sc.add(J, K); J.rotation.y = .5; K.rotation.y = -.4;
    const sunG = mesh(G.ico(1.2, 1), '#FFD54A', [5, 7, -6], { cast: false, mat: { emissive: '#FFB300', emissiveIntensity: .8 } }); sc.add(sunG);
    const cam = camera(44); const sky0 = sc.background, sky1 = new THREE.Color('#7E93A6');
    const c1 = chip(root, '1. Tahan <b style="color:#E07B39">panas</b>', { left: 80, top: 300 }), c2 = chip(root, '2. Tahan <b style="color:#3E8FC4">air</b>', { left: 80, top: 410 }), c3 = chip(root, `Anggaran: <b style="color:${TERRA}">1 rumah</b>`, { left: 80, top: 520 }, '#8E2F3A');
    return { scene: sc, cam, upd(t, dur) {
      const tp = popAt(s, 'panas', 1), ta = popAt(s, 'air', 2.2), ts = popAt(s, 'satu', 4.5), r = seg(t, ta, ta + 1);
      sc.background = r > .5 ? sky1 : sky0; sc.userData.sun.intensity = lerp(2.6, .9, r); sc.userData.hemi.intensity = lerp(1.15, .8, r);
      sunG.visible = r < .6; sunG.scale.setScalar(1 + .08 * Math.sin(t * 5)); R.visible = r > 0; R.tick(t);
      pud.scale.set(lerp(.01, 2.1, seg(t, ta + .3, dur)), 1, lerp(.01, 1.7, seg(t, ta + .3, dur)));
      orbit(cam, lerp(30, 12, E.inout(seg(t, 0, dur))), lerp(13, 4.5, E.out(seg(t, 0, dur * .7))), lerp(22, 15, seg(t, 0, dur)), [0, .8, 0]);
      J.pose(t, { hold: true, look: -.3 }); K.pose(t, { talk: true, point: t > ts && t < ts + 2 });
      X.pop(c1, seg(t, tp, tp + .4)); X.pop(c2, seg(t, ta, ta + .4)); X.pop(c3, seg(t, ts, ts + .4));
    } };
  },
  // 5/6. Bangun rumah: varian panggung (air lewat kolong) atau resapan (air meresap ke sumur)
  B_BUILD(s, root) {
    const P = s.variant === 'panggung';
    const sc = newScene({ sky: P ? ['#9ED8F5', '#EAF8FF'] : ['#B9E3C6', '#F3FBF4'], sunPos: P ? [8, 15, 9] : [-9, 15, 8] });
    const I = plot(sc, { grass: P ? '#8CC152' : '#7FBF4F' });
    const H = house(sc, [0, 0, 0], P ? { stilts: 1.5, wall: '#F6E7C8', roofC: '#B5452B', w: 2.8, d: 2.4 } : { wall: '#FFF3D6', roofC: '#2E7D5B', w: 2.8, d: 2.4, doorX: -.6 });
    const parts = [...H.children]; const K = kepala([2.6, 0, 2.2]); sc.add(K); K.rotation.y = -.7;
    const water = mesh(G.box(12, .1, 12), '#4FA3DB', [0, -.2, 0], { mat: { transparent: true, opacity: .75, roughness: .1 }, cast: false }); if (P) sc.add(water);
    let drops = [], well = null, gut = null;
    if (!P) {   // sumur resapan di halaman depan + talang
      well = group(sc, [1.9, 0, 2.6]); well.add(mesh(G.cyl(.5, .5, .12, 16), '#9AA6B2', [0, .06, 0])); well.add(mesh(G.cyl(.36, .36, .14, 16), '#5C6B73', [0, .07, 0]));
      const shaft = mesh(G.cyl(.45, .45, 1.6, 16), '#7D8A94', [1.9, -1, 2.6], { mat: { transparent: true, opacity: .55 } }); sc.add(shaft);
      gut = mesh(G.cyl(.06, .06, 1.9, 6), '#5C6B73', [1.45, 1, 1.25]); sc.add(gut); sc.add(mesh(G.box(.12, .1, 1.4), '#5C6B73', [1.6, .07, 1.9]));
      drops = Array.from({ length: 18 }, () => { const d = mesh(G.sph(.08, 8, 6), '#3E8FC4', [0, -5, 0], { cast: false }); sc.add(d); return d });
      [[-2.6, 2.6], [-1.6, 3.4], [2.9, -2.8]].forEach(([x, z]) => sc.add(mesh(G.ico(.35, 0), '#5E9B3A', [x, .25, z])));
    }
    const R = rain(sc, 260, 12, 10); R.visible = !P;
    const cam = camera(44);
    const L = P ? [['Lantai di atas <b>tiang</b>', 'tiang', NAVY], ['Air lewat di <b>kolong</b>', 'kolong', '#3E8FC4'], ['Dulu dipakai di pesisir Betawi', 'Betawi', TERRA]]
      : [['Halaman <b>terbuka</b>', 'terbuka', '#2E7D5B'], ['Air atap → <b>sumur resapan</b>', 'sumur', '#3E8FC4'], ['Meresap ke tanah, tak menggenang', 'meresap', NAVY]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 112, fontSize: '40px' }, col) }));
    const big = X.ab({ left: 820, top: 290, width: 170, height: 170, borderRadius: '50%', background: P ? '#E5484D' : '#3E8FC4', border: `8px solid ${NAVY}`, color: '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px', top: 300 }, root, P ? 'A' : 'B');
    const tKol = tag3(root, 'kolong', '#3E8FC4');
    return { scene: sc, cam, upd(t, dur) {
      const b0 = .3, steps = parts.length;
      parts.forEach((m, i) => { const q = E.back(seg(t, b0 + i * .22, b0 + i * .22 + .5)); m.scale.y = Math.max(.001, q) * (m.userData.sy ??= m.scale.y); m.visible = q > 0.001 });
      X.pop(big, seg(t, 0, .4));
      orbit(cam, (P ? 35 : -30) + t * (P ? -3 : 3), lerp(8, 4, E.inout(seg(t, 0, dur))), lerp(18, 13.5, E.inout(seg(t, 0, dur))), [0, 1.6, .5]);
      K.pose(t, { talk: true, point: (t % 6) < 2 });
      if (P) { const ta = popAt(s, 'air naik', 4.5); water.position.y = lerp(-.25, .7, E.inout(seg(t, ta, ta + 2.2))) + Math.sin(t * 2) * .03; water.visible = t > ta - .1;
        const tk = popAt(s, 'kolong', ta + 1); tKol.at(H, cam, [0, .75, 1.6], seg(t, tk, tk + .4) * (t < dur - .3 ? 1 : 0)) }
      else { R.tick(t); const ts = popAt(s, 'sumur', 3); drops.forEach((d, i) => { const q = ((t - ts) * .5 + i / drops.length) % 1; if (t < ts) { d.position.y = -9; return }
          // jalur: tepi atap → talang → sumur → menyebar ke tanah
          if (q < .3) d.position.set(1.45, lerp(2.3, .1, q / .3), 1.25); else if (q < .55) d.position.set(lerp(1.45, 1.9, (q - .3) / .25), .1, lerp(1.25, 2.6, (q - .3) / .25));
          else { const k = (q - .55) / .45; d.position.set(1.9 + Math.cos(i) * k * 1.2, lerp(0, -1.6, k), 2.6 + Math.sin(i) * k * .4) } }) }
      chips.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },

  // 4. Papan kota kosong, zona menyala satu per satu
  B_ZONEMAP(s, root) {
    const sc = newScene({ sky: ['#6FBCEB', '#E4F5FF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc);
    const cam = camera(42); const legend = [['hunian', 'Tempat tinggal', 'tinggal'], ['usaha', 'Tempat usaha', 'usaha'], ['industri', 'Kawasan industri', 'industri'], ['hijau', 'Ruang hijau', 'hijau']]
      .map(([z, tx, cu], i) => ({ z, cu, e: chip(root, `<span style="display:inline-block;width:30px;height:30px;border-radius:8px;background:${ZC[z]};border:4px solid ${NAVY};vertical-align:-4px;margin-right:12px"></span>${tx}`, { left: 70, top: 300 + i * 105, fontSize: '38px' }) }));
    const fac = factory(sc, [8, 0, -1]), hs = housing(sc, -8, 8, 2); fac.visible = false; hs.forEach(h => h.visible = false);
    const tJ = tag3(root, 'jauh dari rumah', ZC.industri);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-20, 12, E.inout(seg(t, 0, dur))), lerp(34, 28, seg(t, 0, dur)), lerp(40, 35, seg(t, 0, dur)), [1.5, 0, 1]);
      legend.forEach(L => { const tc = at3(s, L.cu, 99); X.pop(L.e, seg(t, tc, tc + .4)); B.userData.zones[L.z].forEach(m => { m.visible = t > tc; m.material.opacity = .35 + .25 * Math.abs(Math.sin(t * 3)) }) });
      const tp = at3(s, 'Pabrik', dur - 3); grow([fac], t, tp); grow(hs, t, tp + .2, .05); fac.userData.puffs.forEach((m, i) => { const q = (t * .4 + i / 3) % 1; m.position.y = 2.8 + q * 2; m.scale.setScalar(.6 + q) });
      tJ.at(fac, cam, [0, 4.5, 0], seg(t, tp + .5, tp + .9));
    } };
  },
  // 5/6. Zona dibangun: perumahan (A) atau kawasan usaha (B)
  B_ZONE(s, root) {
    const A = s.variant === 'hunian';
    const sc = newScene({ sky: A ? ['#8FD3FF', '#F2FAFF'] : ['#FFD7A8', '#FFF6EA'], sunPos: A ? [-10, 20, 12] : [12, 18, 10], shadow: 20 }); const B = cityBoard(sc);
    const tick = cars(sc, 10); let items = [], extra = [];
    if (A) { const h1 = housing(sc, -8, 8); sc.remove(h1[4]); h1.splice(4, 1); items = [...h1, ...housing(sc, -8, 0)]; extra = [park(sc, -8, 8)] }
    else { items = [shop(sc, [-2, 0, -1.8], { sign: '#E5484D', awn: '#F5C542' }), shop(sc, [1.8, 0, -1.8], { w: 2.6, sign: '#2E7D5B', wall: '#F4F7FA' }), shop(sc, [-1.8, 0, 2], { awn: '#E5484D', sign: '#F5C542' }),
        tower(sc, [2, 0, 1.6], 3.4), tower(sc, [-1.8, 0, 6.3], 2.6, '#C9D6E2'), shop(sc, [1.8, 0, 6.3], { w: 2.6, h: 1.6, wall: '#FFE9C8', sign: '#3E8FC4' }), shop(sc, [-2, 0, 9.6], { awn: '#3E8FC4' }), tower(sc, [2, 0, 9.6], 4.2, '#A9C2DA')] }
    const zoneList = B.userData.zones[A ? 'hunian' : 'usaha']; zoneList.forEach(m => m.visible = true);
    if (A) B.userData.zones.pesisir.forEach(m => m.visible = true);
    const ppl = Array.from({ length: 6 }, (_, i) => person(sc, [0, 0, 0], { s: .55, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0', '#C9472F'][i] }));
    const coinsF = A ? [] : Array.from({ length: 10 }, (_, i) => coin(sc, [0, -5, 0], 1.4));
    const cam = camera(42);
    const L = A ? [['Tempat tinggal penduduk', 'tinggal', NAVY], ['Jauh dari pesisir rawan banjir', 'banjir', '#E5484D'], ['Sisakan taman', 'taman', '#2E7D32']]
      : [['Pasar · toko swalayan · kantor', 'Pasar', NAVY], ['Ada lapangan kerja', 'lapangan', '#2E7D32'], ['Orang luar tertarik pindah', 'pindah', TERRA]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 105, fontSize: '38px' }, col) }));
    const big = X.ab({ left: 820, top: 300, width: 170, height: 170, borderRadius: '50%', background: A ? '#E5484D' : '#3E8FC4', border: `8px solid ${NAVY}`, color: '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px' }, root, A ? 'A' : 'B');
    const tB = tag3(root, 'rawan banjir', '#E5484D');
    return { scene: sc, cam, upd(t, dur) {
      X.pop(big, seg(t, 0, .4)); tick(t); grow(items, t, .5, A ? .06 : .18); if (extra[0]) { const q = E.back(seg(t, at3(s, 'taman', 5), at3(s, 'taman', 5) + .5)); extra[0].scale.setScalar(Math.max(.001, q * .42)) }
      const ctr = A ? [-8, 0, 4] : [0, 0, 4];
      orbit(cam, (A ? -30 : 30) + t * (A ? 2 : -2), lerp(18, 10, E.inout(seg(t, 0, dur))), lerp(26, 17, E.inout(seg(t, 0, dur))), ctr);
      ppl.forEach((p, i) => { const k = ((t * .05 + i / 6) % 1) * 16 - 8; p.position.set(ctr[0] + (i % 2 ? 2.8 : -2.8), 0, ctr[2] + k); p.rotation.y = 0; p.pose(t + i, { walk: 1 }) });
      coinsF.forEach((c, i) => { const q = (t * .35 + i / 10) % 1; c.position.set(Math.sin(i * 2.1) * 3, 1 + q * 5, 4 + Math.cos(i * 2.1) * 4); c.rotation.set(t * 3, t * 2 + i, 0) });
      chips.forEach(c => { const tc = at3(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
      if (A) tB.at(B.userData.sea, cam, [0, 1, 4], seg(t, at3(s, 'banjir', 99), at3(s, 'banjir', 99) + .4)); else tB.at(B, cam, [0, 0, 0], 0);
    } };
  },

  // Info ruang hijau (slot 2): satu shot berparameter, varian gray/pct/why/real/ask
  B_GREEN(s, root) {
    const v = s.variant; const sc = newScene({ sky: v === 'gray' ? ['#E9B98A', '#FFF1DE'] : v === 'ask' ? ['#0B1F3A', '#264E86'] : ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20, hemi: v === 'ask' ? .8 : 1.15 });
    const B = cityBoard(sc); const tick = cars(sc, 10); const towers = [], greens = [];
    const spots = []; for (const bx of [-8, 0, 8]) for (const bz of [-8, 0, 8]) for (const dx of [-1.8, 1.8]) for (const dz of [-1.8, 1.8]) spots.push([bx + dx, bz + dz]);
    spots.forEach(([x, z], i) => { const h = 1.5 + ((i * 37) % 5); towers.push(tower(sc, [x, 0, z], h, ['#B7C9DB', '#C9D6E2', '#A9C2DA', '#D5DEE8'][i % 4])) });
    const gIdx = [0, 5, 9, 14, 18, 22, 27, 31, 33, 35, 2]; // ±30% kavling jadi hijau
    gIdx.forEach(i => { const [x, z] = spots[i]; const g = group(sc, [x, 0, z]); g.add(mesh(G.box(3.2, .1, 3.2), '#4CAF50', [0, .06, 0], { cast: false })); tree(g, [-.7, 0, -.6], .7); tree(g, [.7, 0, .5], .8, '#3F8A3A'); g.visible = false; greens.push({ g, i }) });
    if (v === 'ask') { towers.forEach(t => t.visible = false) }
    const ppl = Array.from({ length: 5 }, (_, i) => person(sc, [0, 0, 0], { s: .55, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0'][i] }));
    const cam = camera(42); const C = [];
    const donut = X.ab({ left: 660, top: 300, width: 340, height: 340, borderRadius: '50%', opacity: 0, border: `8px solid ${NAVY}`, background: `conic-gradient(#2E7D32 0 ${X.TL.vars.publik || 20}%, #8BD17C 0 ${X.TL.vars.rth || 30}%, #C9D6E2 0 100%)` }, root,
      `<div style="position:absolute;inset:70px;border-radius:50%;background:${CREAM};display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:72px;color:#2E7D32">${X.TL.vars.rth || 30}%</div>`);
    const L = v === 'gray' ? [['🔥 panas', 'panas', '#E07B39'], ['🌊 gampang banjir', 'banjir', '#3E8FC4'], ['🌳 ruang hijau: berapa?', 'berapa', '#2E7D32']]
      : v === 'pct' ? [['minimal 30% luas kota', 'persen', '#2E7D32'], ['20% publik: taman, hutan kota', 'publik', '#2E7D32'], ['10% privat: halaman rumah', 'privat', '#5E9B3A']]
      : v === 'why' ? [['💧 menyerap air hujan', 'menyerap', '#3E8FC4'], ['🌳 meneduhkan', 'meneduhkan', '#2E7D32'], ['🏃 tempat warga bermain', 'bermain', NAVY], ['🏡 halaman rumah = hijau privat', 'privat', '#5E9B3A']]
      : v === 'real' ? [['😓 banyak kota kesulitan', 'kesulitan', '#B5452B'], ['💸 tanah kota mahal', 'mahal', TERRA], ['🌳 tiap taman berharga', 'berharga', '#2E7D32']]
      : [['Jakarta kita masih kosong', 'kosong', NAVY], ['🌳 ruang hijau mau berapa %?', 'persen', '#2E7D32'], ['🗳️ pilih A/B di Hari 1', 'Hari 1|Hari satu', TERRA]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, col) }));
    const signs = v === 'real' ? [1, 7, 12, 20, 26].map(i => { const [x, z] = spots[i]; const g = group(sc, [x, 0, z]); g.add(mesh(G.box(.08, 1.4, .08), '#555', [0, .7, 0])); g.add(mesh(G.box(1.3, .7, .06), '#E5484D', [0, 1.4, 0])); return g }) : [];
    const drops = v === 'why' ? Array.from({ length: 30 }, () => { const m = mesh(G.sph(.08, 8, 6), '#4FA3DB', [0, -5, 0], { cast: false }); sc.add(m); return m }) : [];
    const ask = v === 'ask' ? X.ab({ left: 120, top: 1100, width: 840, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: '#8BD17C', WebkitTextStroke: `10px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, '?%') : null;
    if (v === 'real') { greens.forEach((x, k) => x.g.visible = k < 4); towers.forEach((t, i) => t.visible = !gIdx.slice(0, 4).includes(i)) }
    return { scene: sc, cam, upd(t, dur) {
      tick(t); const p = E.inout(seg(t, 0, dur));
      if (v === 'gray') { orbit(cam, lerp(-25, 10, p), lerp(30, 22, p), lerp(38, 32, p), [0, 0, 2]); sc.userData.sun.intensity = 3 + Math.sin(t * 6) * .2 }
      if (v === 'pct') { orbit(cam, lerp(10, -15, p), 34, 38, [0, 0, 2]); const tp = popAt(s, 'persen', 2); greens.forEach((x, k) => { const q = E.back(seg(t, tp + k * .25, tp + k * .25 + .5)); x.g.visible = q > 0; x.g.scale.setScalar(Math.max(.001, q)); towers[x.i].visible = q <= 0 }); X.pop(donut, seg(t, tp, tp + .5)) }
      if (v === 'why') { greens.forEach(x => { x.g.visible = true; towers[x.i].visible = false }); orbit(cam, 20 + t * 2, 15, 19, [-8, 0, -8]);
        drops.forEach((d, i) => { const q = (t * .5 + i / 30) % 1; d.position.set(-8 + Math.sin(i * 2.3) * 1.6, lerp(6, -.6, q), -8 + Math.cos(i * 1.7) * 1.6) });
        ppl.forEach((x, i) => { x.position.set(-8 + Math.sin(t * .3 + i * 1.2) * 2.4, 0, -8 + Math.cos(t * .3 + i * 1.2) * 2.4); x.rotation.y = -(t * .3 + i * 1.2); x.pose(t + i, { walk: 1 }) }) }
      else ppl.forEach(x => x.visible = false);
      if (v === 'real') { orbit(cam, lerp(-20, 20, p), 26, 32, [0, 0, 2]); signs.forEach((g, i) => g.scale.setScalar(Math.max(.001, E.back(seg(t, popAt(s, 'mahal', 3) + i * .15, popAt(s, 'mahal', 3) + i * .15 + .4))))) }
      if (v === 'ask') { orbit(cam, t * 4, 30, 34, [0, 0, 2]); const q = seg(t, popAt(s, 'berapa persen', 3), popAt(s, 'berapa persen', 3) + .5); ask.style.opacity = q; ask.style.transform = `scale(${E.back(q)})` }
      chips.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  // 7. Perbandingan di atas dua meja putar
  B_COMPARE(s, root) {
    const sc = newScene({ sky: ['#FCE3C4', '#FFF7EC'], hemi: 1.2, sunPos: [0, 14, 10] });
    sc.add(mesh(G.box(30, .2, 30), '#F2D8B0', [0, -.6, 0]));
    const mk = (x, P) => { const g = group(sc, [x, 0, 0]); g.add(mesh(G.cyl(2.6, 2.7, .5, 32), P ? '#E5484D' : '#3E8FC4', [0, -.25, 0])); g.add(mesh(G.cyl(2.4, 2.4, .08, 32), P ? '#9ED8A0' : '#8CC152', [0, .02, 0]));
      const h = house(g, [0, 0, 0], P ? { stilts: 1.4, wall: '#F6E7C8', roofC: '#B5452B', w: 2.2, d: 2 } : { wall: '#FFF3D6', roofC: '#2E7D5B', w: 2.2, d: 2 });
      if (!P) { g.add(mesh(G.cyl(.4, .4, .12, 14), '#7D8A94', [1.5, .07, 1.3])) } else g.add(mesh(G.cyl(2.3, 2.3, .06, 32), '#5FA8D8', [0, .12, 0], { mat: { transparent: true, opacity: .7 } })); return g };
    const ZONA = s.variant === 'zona';
    const mkZ = (x, H) => { const g = group(sc, [x, 0, 0]); g.add(mesh(G.cyl(2.6, 2.7, .5, 32), H ? '#E5484D' : '#3E8FC4', [0, -.25, 0])); g.add(mesh(G.cyl(2.4, 2.4, .08, 32), H ? '#F5D77A' : '#F2A3A3', [0, .02, 0]));
      if (H) { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b], i) => house(g, [a * 1.1, 0, b * 1.1], { w: 1.2, d: 1.1, h: .9, roofH: .6, wall: CC[i], roofC: RC[i] })); tree(g, [0, 0, 0], .6) }
      else { shop(g, [-1, 0, -.8], { w: 1.6, sign: '#E5484D', awn: '#F5C542' }); tower(g, [1, 0, -.6], 2.6); shop(g, [0, 0, 1.2], { w: 2.2, sign: '#2E7D5B' }) } return g };
    const A = ZONA ? mkZ(-2.8, true) : mk(-2.8, true), B = ZONA ? mkZ(2.8, false) : mk(2.8, false);
    const cam = camera(44);
    const bA = tag3(root, '<span style="font-size:70px">A</span>', '#E5484D'), bB = tag3(root, '<span style="font-size:70px">B</span>', '#3E8FC4');
    const pc = (ZONA ? [['+ penduduk punya rumah', 'punya rumah', -1, 0, '#2E7D32'], ['− belum ada tempat kerja', 'kerja', -1, 1, '#B5452B'], ['+ ekonomi jalan', 'ekonomi', 1, 0, '#2E7D32'], ['− pekerja tinggal di mana?', 'tinggal', 1, 1, '#B5452B']] : [['+ aman saat air naik', 'aman', -1, 0, '#2E7D32'], ['− butuh tangga & tiang kuat', 'tangga', -1, 1, '#B5452B'], ['+ gampang diakses', 'gampang', 1, 0, '#2E7D32'], ['− tergantung jenis tanah', 'jenis tanah', 1, 1, '#B5452B']])
      .map(([tx, cu, side, row, col]) => ({ cu, e: chip(root, tx, { left: side < 0 ? 40 : 560, top: 1080 + row * 100, fontSize: '32px', padding: '10px 18px' }, col) }));
    return { scene: sc, cam, upd(t, dur) {
      A.rotation.y = t * .5; B.rotation.y = -t * .5;
      orbit(cam, Math.sin(t * .25) * 6, 9 - t * .08, 25 - t * .12, [0, .6, 0]);
      bA.at(A, cam, [0, 4.6, 0], seg(t, .2, .6)); bB.at(B, cam, [0, 4.1, 0], seg(t, .4, .8));
      pc.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  // 8. Cara main: globe kecil, penduduk baru berdatangan, komentar A/B, paspor negara terkunci
  B_RULES(s, root) {
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: .8, sunI: 2.8, sunPos: [10, 8, 12] }); stars(sc);
    const gl = globe(sc, 3.6, { highlight: ['Indonesia'] }); gl.position.y = -1.2; gl.pin(-6.2, 106.8);
    const ppl = Array.from({ length: 6 }, (_, i) => { const p = person(sc, [0, 0, 0], { s: .5, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0', '#C9472F'][i], hat: i % 2 ? 'cap' : null, hatC: GOLD }); p.visible = false; return p });
    const cam = camera(36);
    const cards = [
      [`<b style="color:#E5484D">A</b> ${X.TL.vars.opsi_a || 'rumah panggung'} / <b style="color:#3E8FC4">B</b> ${X.TL.vars.opsi_b || 'sumur resapan'}`, 'komentar', 300],
      [`❤ <b>${X.TL.vars.like_per} like</b> = +1 penduduk`, 'like', 410],
      ['🌍 Negara berikutnya? Tulis di komentar', 'negara', 520]].map(([h, cu, top]) => ({ cu, e: chip(root, h, { left: 60, top, fontSize: '40px' }) }));
    const sample = (X.TL.vars.contoh || [['@pe***', 'A! biar aman banjir'], ['@ra***', 'B, terus ke Jepang']]).map(([u, tx], i) => X.ab({ left: i ? 470 : 60, top: 1150 + i * 40, width: 520, background: '#FFFFFF', borderRadius: '24px', padding: '14px 20px', fontSize: '30px', color: '#222', fontFamily: 'Fredoka', boxShadow: '0 6px 0 #00000030', opacity: 0 }, root, `<div style="font-size:24px;color:#888">${u} · contoh</div>${tx}`));
    return { scene: sc, cam, upd(t, dur) {
      gl.rotation.y = -106.8 * Math.PI / 180 + Math.sin(t * .3) * .25; gl.rotation.x = -.11;
      orbit(cam, Math.sin(t * .2) * 8, 2.6, 19 - t * .1, [0, .4, 0]);
      const tl = popAt(s, 'like', 3);
      ppl.forEach((p, i) => { const q = seg(t, tl + .4 + i * .35, tl + .8 + i * .35); p.visible = q > 0; const a = (i - 2.5) * .28; p.position.set(Math.sin(a) * 3.6, -1.2 + Math.cos(a) * 3.6 + (1 - E.out(q)) * 2, .4); p.rotation.z = -a; p.pose(t + i, { cheer: true }) });
      cards.forEach(c => { const tc = popAt(s, c.cu, 1); X.pop(c.e, seg(t, tc, tc + .4)) });
      sample.forEach((e, i) => { const q = seg(t, 1.2 + i * .5, 1.6 + i * .5); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * 30}px) rotate(${i ? 2 : -2}deg)` });
    } };
  },
};

// HUD bumi + kartu judul adegan + transisi pesawat kertas
let hud, title, tSub, sweep, plane, hv = {};
export function chrome(ctx) {
  const st = ctx.TL.vars.state;
  hud = ctx.ab({ left: 36, top: 56, height: 104, display: 'flex', gap: '12px', alignItems: 'center', zIndex: 8 }, ctx.ov);
  const pill = (k, html, bg) => { const e = ctx.ab({ position: 'relative', background: bg, border: `5px solid ${NAVY}`, borderRadius: '22px', padding: '10px 20px', fontSize: '38px', fontWeight: 700, color: bg === NAVY ? GOLD : NAVY, fontFamily: 'Fredoka', boxShadow: '0 6px 0 #00000040' }, hud, html); e.style.position = 'relative'; hv[k] = e; return e };
  pill('hari', `HARI ${st.hari}`, NAVY); pill('pend', `👥 ${st.penduduk}`, CREAM); pill('koin', `🪙 ${st.koin.toLocaleString('id-ID')}`, CREAM); pill('neg', `🌍 ${st.negara.length}`, CREAM);
  title = ctx.ab({ left: 0, top: 196, width: 1080, textAlign: 'center', zIndex: 8 }, ctx.ov);
  tSub = null;
  sweep = ctx.ab({ left: -200, top: -200, width: 1600, height: 2400, background: CREAM, zIndex: 9, display: 'none', transform: 'rotate(-18deg)' }, ctx.ov);
  sweep.innerHTML = `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#00000008 0 2px,transparent 2px 60px),repeating-linear-gradient(0deg,#00000008 0 2px,transparent 2px 60px)"></div>`;
  plane = ctx.ab({ left: 0, top: 0, width: 240, height: 240, zIndex: 10, display: 'none' }, ctx.ov, `<svg viewBox="0 0 100 100" width="240" height="240"><path d="M5 50 L95 10 L60 92 L48 58 Z" fill="#fff" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/><path d="M48 58 L95 10" stroke="${NAVY}" stroke-width="3"/></svg>`);
}
export function frame(T, idx, t) {
  const S = X.TL.scenes, s = S[idx];
  const q = seg(t, .15, .55), out = seg(t, 2.6, 3);
  title.innerHTML = `<span style="display:inline-block;background:${NAVY};color:${GOLD};font-family:Fredoka;font-weight:700;font-size:46px;padding:10px 34px;border-radius:999px;border:5px solid ${GOLD};box-shadow:0 8px 0 #00000040">${s.kicker}<span style="color:#fff;font-size:34px;font-weight:600"> · ${s.sub}</span></span>`;
  title.style.opacity = q * (1 - out); title.style.transform = `translateY(${(1 - E.back(q)) * -40}px)`;
  // transisi di batas adegan
  let w = -1; S.forEach((x, i) => { if (i) { const p = (T - (x.start - .32)) / .64; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { sweep.style.display = 'none'; plane.style.display = 'none'; return }
  const x = lerp(-1900, 1500, E.inout(w)); sweep.style.display = 'block'; sweep.style.left = x + 'px';
  plane.style.display = 'block'; plane.style.left = (x + 1550) + 'px'; plane.style.top = (lerp(1500, 300, w)) + 'px'; plane.style.transform = 'rotate(-20deg)';
}

// Dunia 3D akun Meja Seberang Bos: dunia kerja staf (biru dingin) vs bos (oranye hangat).
// Bahasa visual khas: over-the-shoulder, POV layar HP/laptop, lokasi berpindah (kamar, rumah, mobil, kantor, lift),
// layar terbelah HANYA di shot M_SPLIT (sekali per episode), transisi whip pan (geser cepat + blur).
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from './kit.js';

let X; const INK = '#1E2A38', BLUE = '#6C8CB0', ORANGE = '#F28C28', CARD = '#F5F7FA';
const staf = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#9CC3E6', pants: '#3B4A5A', hair: '#2A1A10', skin: '#D9A07A', tie: null }, o));
const bos = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#6E7681', pants: '#3A3F46', hair: '#4A4A4A', glasses: true, tie: ORANGE, skin: '#C98E64' }, o));
const chip = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CARD, border: `5px solid ${INK}`, borderRadius: '20px', padding: '12px 24px', fontSize: '40px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${col === INK ? BLUE : col}`, fontFamily: 'Poppins' }, css), root, html); e.style.opacity = 0; return e };
const at = (s, rx, fb) => X.C(s, rx, fb);

// tekstur layar HP (chat) yang bisa digambar ulang
function phoneTex(msgs, n, opts = {}) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 1024; const x = c.getContext('2d'); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.draw = k => { x.fillStyle = '#ECE5DD'; x.fillRect(0, 0, 512, 1024); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 512, 120); x.fillStyle = '#fff'; x.font = '700 44px Poppins'; x.fillText(opts.title || 'Bos', 40, 80);
    x.font = '600 26px Poppins'; x.fillText(opts.clock || '21.03', 390, 80);
    msgs.slice(0, k).forEach(([who, tx, tm], i) => { const y = 180 + i * 170; x.fillStyle = '#FFFFFF'; x.beginPath(); x.roundRect(30, y, 440, 130, 24); x.fill(); x.fillStyle = '#1E2A38'; x.font = '600 34px Poppins';
      const words = tx.split(' '); let line = '', ly = y + 52; words.forEach(w => { if (x.measureText(line + w).width > 390) { x.fillText(line, 54, ly); line = ''; ly += 42 } line += w + ' ' }); x.fillText(line, 54, ly); x.fillStyle = '#888'; x.font = '500 22px Poppins'; x.fillText(tm, 400, y + 118) });
    t.needsUpdate = true };
  t.draw(n); return t;
}
function phone(parent, p, tex) { const g = group(parent, p); g.add(mesh(G.box(.62, 1.24, .07), '#1B1B1F', [0, 0, 0])); const sc = new THREE.Mesh(G.plane(.56, 1.12), new THREE.MeshBasicMaterial({ map: tex })); sc.position.z = .04; g.add(sc); return g }
function room(sc, o = {}) {   // lantai + dua dinding + jendela
  sc.add(mesh(G.box(14, .2, 14), o.floor || '#8C6E55', [0, -.1, 0]));
  sc.add(mesh(G.box(14, 6, .2), o.wall || '#D8DEE6', [0, 3, -4]));
  sc.add(mesh(G.box(.2, 6, 14), o.wall2 || o.wall || '#CDD5DF', [-5, 3, 0]));
  if (o.window) { sc.add(mesh(G.box(3, 2, .05), o.night ? '#16224A' : '#BFE6FF', [2, 3.2, -3.88], { mat: { emissive: o.night ? '#16224A' : '#BFE6FF', emissiveIntensity: .6 }, cast: false })); sc.add(mesh(G.box(.08, 2, .08), '#EEE', [2, 3.2, -3.83])) }
}
function laptop(parent, p, glow = '#9CC3E6') { const g = group(parent, p); g.add(mesh(G.box(.9, .04, .6), '#B0B7BF', [0, 0, 0])); const s = mesh(G.box(.9, .6, .03), '#2A2F36', [0, .3, -.3], { rot: [-.25, 0, 0] }); g.add(s);
  g.add(mesh(G.box(.82, .52, .01), glow, [0, .3, -.28], { rot: [-.25, 0, 0], mat: { emissive: glow, emissiveIntensity: .9 }, cast: false })); return g }
function desk(parent, p, w = 2.2) { const g = group(parent, p); g.add(mesh(G.box(w, .08, 1.1), '#E7DCCB', [0, .78, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => g.add(mesh(G.box(.06, .78, .06), '#555', [a * (w / 2 - .08), .39, b * .47]))); return g }
function clock3(parent, p) { const g = group(parent, p); g.add(mesh(G.cyl(.55, .55, .08, 32), '#FFFFFF', [0, 0, 0], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.6, .6, .06, 32), INK, [0, 0, -.02], { rot: [Math.PI / 2, 0, 0] }));
  const h = group(g, [0, 0, .06]), m = group(g, [0, 0, .07]); h.add(mesh(G.box(.06, .3, .02), INK, [0, .13, 0], { cast: false })); m.add(mesh(G.box(.04, .45, .02), ORANGE, [0, .2, 0], { cast: false })); g.userData = { h, m }; return g }

export async function setup(ctx) { X = ctx; await document.fonts.load('700 44px Poppins') }

export const SHOTS = {
  // 1. Close-up HP di kasur malam hari, chat masuk
  M_PHONE(s, root) {
    const sc = newScene({ bg: '#0E1626', hemi: .35, hemiSky: '#5A6FA0', sunI: .6, sun: '#8FA8FF', sunPos: [-6, 10, 4] });
    sc.add(mesh(G.box(6, .5, 4), '#3D4F7A', [0, .25, 0])); sc.add(mesh(G.box(6.2, .3, 4.2), '#E7E2D8', [0, .55, 0])); sc.add(mesh(G.box(1.6, .35, .9), '#F4F1EA', [-1.8, .85, -1.2]));
    const tex = phoneTex(X.TL.vars.chat, 0); const P = phone(sc, [0, .75, .4], tex); P.rotation.x = -Math.PI / 2 + .05;
    const glow = new THREE.PointLight('#9CC3E6', 0, 6); glow.position.set(0, 1.6, .4); sc.add(glow);
    const cam = camera(40);
    const tag = chip(root, 'Bos: <b>"Besok pagi ya 🙏"</b>', { left: 120, top: 300 }, ORANGE), z1 = chip(root, '😵 staf: nggak bisa tidur', { left: 120, top: 420 }, BLUE), z2 = chip(root, '😴 bos: sudah tidur', { left: 120, top: 530 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const tc = at(s, 'besok pagi', 2); tex.draw(t > tc - .6 ? 2 : t > .8 ? 1 : 0); glow.intensity = t > .8 ? 2.2 : 0; P.position.y = .75 + (t > .8 && t < 1.6 ? Math.abs(Math.sin(t * 40)) * .03 : 0);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.6, 0, p), lerp(4.2, 2.3, p), lerp(2.6, 1.4, p)); cam.lookAt(0, .75, .35);
      X.pop(tag, seg(t, tc, tc + .4)); const a = at(s, 'nggak bisa tidur', 5), b = at(s, 'tidur duluan', 7); X.pop(z1, seg(t, a, a + .4)); X.pop(z2, seg(t, b, b + .4));
    } };
  },
  // 2. Rumah staf: makan malam ditinggal, laptop dibuka lagi
  M_HOME(s, root) {
    const sc = newScene({ bg: '#1A2238', hemi: .6, hemiSky: '#9CC3E6', sunI: 1.1, sun: '#BFD7FF', sunPos: [4, 9, 6] }); room(sc, { wall: '#4C5F7C', wall2: '#435570', floor: '#6B5A4A', window: true, night: true });
    const tb = desk(sc, [0, 0, 0], 2.4); const L = laptop(sc, [.4, .82, .1]); sc.add(mesh(G.cyl(.32, .3, .06, 16), '#FFFFFF', [-.7, .85, .1])); sc.add(mesh(G.ico(.18, 0), '#E8A33D', [-.7, .95, .1]));
    sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [0, .48, 1.0])); const S = staf([0, 0, 1.05]); sc.add(S); S.rotation.y = Math.PI;
    const lamp = new THREE.PointLight('#9CC3E6', 3, 5); lamp.position.set(.4, 1.6, -.2); sc.add(lamp);
    const cam = camera(42);
    const c1 = chip(root, '🔥 rasanya kayak alarm kebakaran', { left: 70, top: 300 }, BLUE), c2 = chip(root, '🍛 makan malam ditunda', { left: 70, top: 410 }), c3 = chip(root, '🕔 jam kerja selesai: sore', { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(lerp(2.6, 1.9, seg(t, 0, dur)), 2.5, lerp(4.4, 3.6, seg(t, 0, dur))); cam.lookAt(.1, 1.1, 0);   // over-the-shoulder
      S.pose(t, { hold: true, look: Math.sin(t * .8) * .2 }); S.userData.st.arms.forEach(A => { A.rotation.x = -1.1 + Math.sin(t * 14 + A.position.x) * .08 });
      [[c1, 'alarm'], [c2, 'Makan'], [c3, 'sore']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) });
    } };
  },
  // 3. Bos di mobil saat pulang: ketik cepat biar nggak lupa
  M_CAR(s, root) {
    const sc = newScene({ bg: '#2B1E14', hemi: .7, hemiSky: '#FFC48A', sunI: 1.2, sun: '#FFB46B', sunPos: [-4, 6, 4] });
    sc.add(mesh(G.box(3.4, .3, 4), '#2A2A2E', [0, .15, 0])); const seat = mesh(G.box(1, 1.3, .3), '#4A3B30', [0, .95, .9]); sc.add(seat); sc.add(mesh(G.box(1, .25, 1), '#4A3B30', [0, .5, .45]));
    sc.add(mesh(G.box(3.4, .6, .8), '#1F1F22', [0, 1, -1.4])); const wh = mesh(G.cyl(.4, .4, .06, 24), '#111', [-.6, 1.3, -.8], { rot: [1.1, 0, 0] }); sc.add(wh);
    const glass = mesh(G.box(3.4, 1.4, .05), '#1A2B4A', [0, 2, -1.8], { mat: { emissive: '#1A2B4A', emissiveIntensity: .5 }, cast: false }); sc.add(glass);
    const lights = Array.from({ length: 6 }, (_, i) => { const m = mesh(G.sph(.08, 8, 6), ['#FFD27A', '#FF8A5B', '#FFFFFF'][i % 3], [0, 0, -2.2], { mat: { emissive: '#FFD27A', emissiveIntensity: 1.5 }, cast: false }); sc.add(m); return m });
    const B = bos([0, .4, .55]); sc.add(B); B.rotation.y = Math.PI;
    const tex = phoneTex(X.TL.vars.chat, 1); const P = phone(B.userData.st.arms[1], [0, -.6, .15], tex); P.scale.setScalar(.6); P.rotation.x = -.5;
    const cam = camera(42);
    const c1 = chip(root, '🧠 biar nggak lupa', { left: 70, top: 300 }, ORANGE), c2 = chip(root, 'maksudnya: dikerjakan <b>besok</b>', { left: 70, top: 410 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      lights.forEach((m, i) => { const q = (t * .35 + i / 6) % 1; m.position.set(lerp(-2, 2.5, q), 1.6 + (i % 2) * .4, -2.2) });
      tex.draw(t > at(s, 'langsung ketik', 4) ? 2 : 1);
      cam.position.set(1.5 + Math.sin(t * .6) * .1, 2.2, -1.7); cam.lookAt(0, 1.7, .55); B.pose(t, { hold: true, nod: t > dur * .6 }); B.userData.st.arms[1].rotation.x = -1.2;
      [[c1, 'nggak lupa'], [c2, 'besok']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) });
    } };
  },
  // 4. Layar terbelah (sekali per episode): arti "besok pagi" versi bos vs staf
  M_SPLIT(s, root) {
    const mk = (who) => { const B = who === 'bos'; const sc = newScene({ bg: B ? '#FFE3C2' : '#CFE0F5', hemi: 1.1, sunPos: [3, 8, 6] }); room(sc, { wall: B ? '#F7D2A8' : '#B9CFE8', floor: B ? '#B98B5E' : '#7C8DA3' });
      desk(sc, [0, 0, 0]); const L = laptop(sc, [0, .82, 0], B ? '#FFD39A' : '#9CC3E6'); const P = (B ? bos : staf)([0, 0, .95]); sc.add(P); P.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [0, .48, .95]));
      const c = camera(46); c.aspect = 540 / 1920; c.updateProjectionMatrix(); return { sc, c, P } };
    const A = mk('bos'), Bs = mk('staf');
    const SP = X.TL.vars.split || ['mulai besok', 'jadi besok pagi']; const lb = chip(root, `<b style="color:#F28C28">BOS</b>: ${SP[0]}`, { left: 30, top: 300, fontSize: '32px', padding: '10px 16px' }, ORANGE), rb = chip(root, `<b style="color:#6C8CB0">STAF</b>: ${SP[1]}`, { left: 556, top: 300, fontSize: '32px', padding: '10px 16px' }, BLUE);
    const div = X.ab({ left: 534, top: 0, width: 12, height: 1920, background: INK }, root);
    return { scene: A.sc, cam: A.c, render(R) {
        R.setScissorTest(true); R.setScissor(0, 0, 540, 1920); R.setViewport(0, 0, 540, 1920); R.render(A.sc, A.c);
        R.setScissor(540, 0, 540, 1920); R.setViewport(540, 0, 540, 1920); R.render(Bs.sc, Bs.c); R.setScissorTest(false); R.setViewport(0, 0, 1080, 1920) },
      upd(t, dur) {
        A.c.position.set(0, 2.3, -3.4); A.c.lookAt(0, 1.3, .9); Bs.c.position.set(0, 2.3, -3.4); Bs.c.lookAt(0, 1.3, .9);
        A.P.pose(t, { nod: true }); A.P.rotation.y = Math.PI; Bs.P.pose(t, { shake: true }); Bs.P.userData.st.arms.forEach(a => a.rotation.x = -1.1 + Math.sin(t * 16) * .1);
        const tb = at(s, 'Bos maksudnya|bos takut', 2), ts = at(s, 'Staf membacanya|Staf takut', 4.5); X.pop(lb, seg(t, tb, tb + .4)); X.pop(rb, seg(t, ts, ts + .4));
        div.style.transform = `scaleY(${E.out(seg(t, 0, .4))})`;
      } };
  },
  // 5. Timelapse jam dinding: staf begadang, bos buka file jam 10 sambil ngopi
  M_CLOCK(s, root) {
    const sc = newScene({ bg: '#121A2E', hemi: .5, hemiSky: '#9CC3E6', sunI: .8, sun: '#BFD7FF', sunPos: [4, 9, 6] }); room(sc, { wall: '#3E5070', floor: '#5A4A3C', window: true, night: true });
    const C = clock3(sc, [-1.6, 3.4, -3.85]); desk(sc, [.6, 0, -1.6]); laptop(sc, [.6, .82, -1.6]); const S = staf([.6, 0, -.7]); sc.add(S); S.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [.6, .48, -.7]));
    const cam = camera(44); const sky = sc.background, day = new THREE.Color('#BFE6FF');
    const tm = X.ab({ left: 650, top: 300, background: INK, color: '#9CC3E6', fontFamily: 'Poppins', fontWeight: 800, fontSize: '84px', padding: '6px 26px', borderRadius: '18px' }, root);
    const c1 = chip(root, 'Bos buka file: <b>jam 10</b> ☕', { left: 70, top: 440 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const tp = at(s, 'Besok paginya', dur * .55); const hrs = t < tp ? lerp(21.1, 26, E.inout(seg(t, 0, tp))) : lerp(26, 34, E.inout(seg(t, tp, tp + 1.5)));
      C.userData.h.rotation.z = -(hrs % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(hrs % 1) * Math.PI * 2;
      const hh = Math.floor(hrs % 24), mm = Math.floor((hrs % 1) * 60); tm.textContent = `${String(hh).padStart(2, '0')}.${String(mm).padStart(2, '0')}`;
      const morning = t > tp + .8; sc.background = morning ? day : sky; sc.userData.sun.intensity = morning ? 2 : .8; tm.style.color = morning ? ORANGE : '#9CC3E6';
      orbit(cam, lerp(25, 5, seg(t, 0, dur)), 2.6, 6.5, [-.4, 2, -2]); S.pose(t, { nod: t < tp && Math.sin(t * 2) > .6, hold: true }); S.userData.st.head.rotation.x = t < tp ? .25 + Math.sin(t * 1.3) * .15 : 0;
      X.pop(c1, seg(t, at(s, 'sepuluh', tp + 1), at(s, 'sepuluh', tp + 1) + .4));
    } };
  },
  // 6. Papan tulis kantor: solusi dua kalimat
  M_BOARD(s, root) {
    const sc = newScene({ bg: '#E8EEF5', hemi: 1.2, sunPos: [6, 10, 8] }); room(sc, { wall: '#EEF2F7', floor: '#A9B4C2', window: true });
    sc.add(mesh(G.box(4.6, 2.6, .1), '#FFFFFF', [0, 2.7, -3.85])); sc.add(mesh(G.box(4.8, .14, .3), '#9AA6B2', [0, 1.38, -3.75]));
    const B = bos([-1.5, 0, -1.2]), S = staf([1.5, 0, -1.2]); sc.add(B, S); B.rotation.y = .4; S.rotation.y = -.4;
    const cam = camera(42);
    const tips = X.TL.vars.tips.map(([w, tx], i) => X.ab({ left: 150, top: 640 + i * 230, width: 780, fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: INK, opacity: 0, borderLeft: `14px solid ${w === 'Bos' ? ORANGE : BLUE}`, paddingLeft: '20px', background: '#FFFFFFE8', borderRadius: '10px', padding: '14px 20px' }, root, `<div style="color:${w === 'Bos' ? ORANGE : BLUE};font-size:30px">${w.toUpperCase()}</div>${tx}`));
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(Math.sin(t * .2) * .4, 2.6, 7.4 - t * .05); cam.lookAt(0, 2, -2.5);
      const tb = at(s, 'Bos, tulis', 1.5), ts = at(s, 'Staf, kalau', 5.5); B.pose(t, { talk: t > tb && t < ts, point: t > tb && t < tb + 1.5 }); S.pose(t, { talk: t > ts, nod: t < ts });
      [tb, ts].forEach((tc, i) => { const q = seg(t, tc, tc + .5); tips[i].style.opacity = q; tips[i].style.transform = `translateX(${(1 - E.out(q)) * -60}px)` });
    } };
  },

  // ruang rapat panjang: varian long (jam berputar, peserta bosan) / short (rapat berdiri 10 menit)
  M_MEETROOM(s, root) {
    const LONG = s.variant !== 'short'; const sc = newScene({ bg: '#E1E7EF', hemi: 1.1, sunPos: [5, 10, 6] }); room(sc, { wall: '#E9EDF3', floor: '#8E9AA8', window: true });
    sc.add(mesh(G.box(1.6, .08, 5.6), '#C9B79A', [0, .8, -.6])); sc.add(mesh(G.box(1.4, .76, 5.4), '#7A6A55', [0, .38, -.6]));
    const C = clock3(sc, [0, 3.6, -3.85]); const ppl = [];
    for (let i = 0; i < 8; i++) { const side = i % 2 ? 1 : -1, z = -2.6 + Math.floor(i / 2) * 1.3; const P = (i === 0 ? bos : staf)([LONG ? side * 1.25 : side * 1.6, 0, z], i === 0 ? {} : { body: ['#9CC3E6', '#BFD6EA', '#A7C4DC', '#C8DCEF'][i % 4] }); sc.add(P); P.rotation.y = LONG ? -side * Math.PI / 2 : 0; if (LONG) sc.add(mesh(G.box(.5, .5, .5), '#3B4A5A', [side * 1.35, .25, z])); ppl.push(P) }
    const cam = camera(42); const tag = LONG ? chip(root, '⏱️ 60 menit · 👥 8 orang', { left: 70, top: 300 }) : chip(root, '⏱️ 10 menit, berdiri, khusus tanya', { left: 70, top: 300 }, BLUE);
    const two = LONG ? chip(root, 'isinya: <b>2 kalimat</b>', { left: 70, top: 410 }, ORANGE) : chip(root, '📄 info dikirim tertulis dulu', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      const hrs = LONG ? 9 + t / dur : 9 + t / dur * .17; C.userData.h.rotation.z = -(hrs % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(hrs % 1) * Math.PI * 2 * (LONG ? 1 : 1);
      if (LONG) { cam.position.set(lerp(-3.4, 3.4, E.inout(seg(t, 0, dur))), 5.2, 6.6); cam.lookAt(0, 1, -1.2); ppl.forEach((p, i) => p.pose(t + i, { talk: i === 0, nod: i > 0 && (Math.sin(t * .8 + i) > .7), look: i > 0 ? Math.sin(t * .3 + i) * .4 : 0 })) }
      else { orbit(cam, t * 4 - 10, 4.4, 11, [0, 1, -1]); ppl.forEach((p, i) => p.pose(t + i, { talk: i === 0 || (t > dur * .5 && i === 3), nod: i > 0 })) }
      X.pop(tag, seg(t, .5, .9)); const tt = at(s, 'dua kalimat|tertulis', 3); X.pop(two, seg(t, tt, tt + .4));
    } };
  },
  // POV laptop staf: email dua kalimat, tumpukan kerjaan
  M_SCREEN(s, root) {
    const sc = newScene({ bg: '#CFDCEB', hemi: 1.1, sunPos: [4, 9, 6] }); room(sc, { wall: '#D6E2EF', floor: '#7C8DA3' }); desk(sc, [0, 0, 0], 2.6);
    const c = document.createElement('canvas'); c.width = 1024; c.height = 640; const x = c.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 1024, 640); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 1024, 90);
    x.fillStyle = '#fff'; x.font = '700 44px Poppins'; x.fillText('Email baru', 30, 62); x.fillStyle = INK; x.font = '700 40px Poppins'; x.fillText('Perihal: Info laporan', 40, 160); x.font = '700 36px Poppins'; X.TL.vars.email.forEach((l, i) => x.fillText(l, 40, 260 + i * 70));
    x.fillStyle = '#2E7D32'; x.font = '700 34px Poppins'; x.fillText('⏱ dibaca: 1 menit', 40, 560); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const scr = new THREE.Mesh(G.plane(1.6, 1), new THREE.MeshBasicMaterial({ map: tex })); scr.position.set(0, 1.45, -.25); scr.rotation.x = -.12; sc.add(scr); sc.add(mesh(G.box(1.7, 1.08, .05), '#2A2F36', [0, 1.45, -.29], { rot: [-.12, 0, 0] }));
    const pile = Array.from({ length: 9 }, (_, i) => mesh(G.box(.5, .06, .7), ['#FFFFFF', '#F2E8D0', '#E8F0FA'][i % 3], [1.05, .85 + i * .065, .1], { rot: [0, (i % 3 - 1) * .12, 0] })); pile.forEach(m => sc.add(m));
    const cam = camera(40); const c1 = chip(root, '✉️ cukup 1 email', { left: 70, top: 300 }, BLUE), c2 = chip(root, '📚 kerjaan menumpuk', { left: 70, top: 410 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .3) * .1, 1.8, lerp(4.6, 4.1, seg(t, 0, dur))); cam.lookAt(0, 1.35, -.25);
      const tm = at(s, 'menumpuk', 5); pile.forEach((m, i) => m.visible = t > tm - .5 + i * .15); const te = at(s, 'satu email', 1.5); X.pop(c1, seg(t, te, te + .4)); X.pop(c2, seg(t, tm, tm + .4)) } };
  },
  // pantry kantor: bos ngopi menjelaskan sisinya / penutup
  M_PANTRY(s, root) {
    const OUT = s.variant === 'outro'; const sc = newScene({ bg: '#FFE7CC', hemi: 1.1, sun: '#FFD3A0', sunPos: [-6, 9, 6] }); room(sc, { wall: '#F6DDBF', wall2: '#EFCFA8', floor: '#A8835E', window: true });
    sc.add(mesh(G.box(4, .9, .9), '#FFFFFF', [0, .45, -3.4])); sc.add(mesh(G.box(4, .06, .95), '#C9B79A', [0, .92, -3.4])); sc.add(mesh(G.box(.5, .6, .4), '#3A3A40', [-1.2, 1.25, -3.5])); sc.add(mesh(G.cyl(.08, .07, .16, 10), '#FFFFFF', [-.9, 1.03, -3.2]));
    const B = bos([.6, 0, -1.6]); sc.add(B); B.rotation.y = -.3; const S = staf([-1, 0, -1.4]); sc.add(S); S.rotation.y = .5; S.visible = OUT;
    const cup = mesh(G.cyl(.07, .06, .14, 10), '#FFFFFF', [0, -.55, .1]); B.userData.st.arms[1].add(cup);
    const cam = camera(42);
    const L = OUT ? [] : [['👂 biar semua dengar langsung', 'dengar langsung', ORANGE], ['📭 email sering nggak dibaca', 'dibaca', ORANGE]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 110 }, col) }));
    const q = OUT ? X.ab({ left: 90, top: 330, width: 900, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '62px', color: '#fff', opacity: 0 }, root, `<span style="background:${BLUE};padding:6px 18px;border-radius:14px">TIM STAF</span> atau <span style="background:${ORANGE};padding:6px 18px;border-radius:14px">TIM BOS</span>?`) : null;
    return { scene: sc, cam, upd(t, dur) {
      if (OUT) { orbit(cam, lerp(-25, 25, seg(t, 0, dur)), 1.7, 5.2, [-.2, 1.4, -1.5]); B.pose(t, { hold: true, talk: Math.sin(t * 2) > 0 }); S.pose(t, { talk: Math.sin(t * 2) <= 0 }); const tq = at(s, 'tim staf', 3); const p = seg(t, tq, tq + .4); q.style.opacity = p; q.style.transform = `scale(${E.back(p)})` }
      else { cam.position.set(lerp(2.2, 1.4, seg(t, 0, dur)), 1.9, 2.4); cam.lookAt(.5, 1.6, -1.6); B.pose(t, { hold: true, talk: true, nod: t > dur * .6 }) }
      chips.forEach(c => { const tc = at(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  // 7. Lift: staf dan bos berdiri canggung berdampingan, pertanyaan ke penonton
  M_LIFT(s, root) {
    const sc = newScene({ bg: '#2A2F36', hemi: 1, hemiSky: '#FFF1D6', sunI: 1.6, sunPos: [0, 8, 6] });
    sc.add(mesh(G.box(3.2, .1, 3), '#5C5F66', [0, 0, 0])); sc.add(mesh(G.box(3.2, 3.4, .1), '#B8BDC4', [0, 1.7, -1.5], { mat: { metalness: .5, roughness: .3 } }));
    sc.add(mesh(G.box(.1, 3.4, 3), '#AEB4BB', [-1.6, 1.7, 0], { mat: { metalness: .5, roughness: .3 } })); sc.add(mesh(G.box(.1, 3.4, 3), '#AEB4BB', [1.6, 1.7, 0], { mat: { metalness: .5, roughness: .3 } }));
    const S = staf([-.6, 0, -.2]), B = bos([.6, 0, -.2]); sc.add(S, B);
    const doors = [mesh(G.box(1.6, 3.4, .08), '#C9CED4', [-.8, 1.7, 1.5], { mat: { metalness: .6, roughness: .25 } }), mesh(G.box(1.6, 3.4, .08), '#C9CED4', [.8, 1.7, 1.5], { mat: { metalness: .6, roughness: .25 } })]; doors.forEach(d => sc.add(d));
    const cam = camera(44);
    const q = X.ab({ left: 90, top: 330, width: 900, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '62px', color: '#fff', opacity: 0 }, root,
      `<span style="background:${BLUE};padding:6px 18px;border-radius:14px">TIM STAF</span> atau <span style="background:${ORANGE};padding:6px 18px;border-radius:14px">TIM BOS</span>?`);
    return { scene: sc, cam, upd(t, dur) {
      const o = E.inout(seg(t, .2, 1.4)); doors[0].position.x = -.8 - o * 1.5; doors[1].position.x = .8 + o * 1.5;
      cam.position.set(0, 1.7, 4.6 - t * .08); cam.lookAt(0, 1.4, 0);
      S.pose(t, { look: Math.sin(t * 1.5) > .3 ? .5 : 0 }); B.pose(t, { look: Math.sin(t * 1.5 + 1.5) > .3 ? -.5 : 0 });
      const tq = at(s, 'tim staf', 3); const p = seg(t, tq, tq + .4); q.style.opacity = p; q.style.transform = `scale(${E.back(p)})`;
    } };
  },

  // ===== ep006 (Seri Jenis Bos: bos killer yang nggak pernah teriak) =====
  M_LOBBY(s, root) {   // lobi pagi: staf absen jam 08.03, bos berdiri diam, lihat jam, menulis
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.1, sunPos: [-6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#E9EEF4', wall2: '#D8E0EA', floor: '#B8C2CE', window: true });
    sc.add(mesh(G.box(3.6, .1, 1.2), '#2E5E8C', [0, 3.6, -3.7])); const fp = group(sc, [-1.6, 0, -3.3]); fp.add(mesh(G.box(.5, .8, .3), '#2A2F36', [0, 1.3, 0])); fp.add(mesh(G.box(.36, .24, .02), '#7FE0A8', [0, 1.45, .16], { mat: { emissive: '#7FE0A8', emissiveIntensity: .8 }, cast: false })); fp.add(mesh(G.box(.06, 1, .06), '#555', [0, .5, 0]));
    const S = staf([-1.6, 0, 1.6]); sc.add(S); S.rotation.y = Math.PI; const B = bos([1.5, 0, -2.2]); sc.add(B); B.rotation.y = -.5;
    const nb = mesh(G.box(.22, .3, .04), '#111', [0, -.62, .12]); B.userData.st.arms[1].add(nb);
    const cam = camera(42); const tm = X.ab({ left: 640, top: 300, background: INK, color: '#FF6B6B', fontFamily: 'Poppins', fontWeight: 800, fontSize: '80px', padding: '6px 26px', borderRadius: '18px', opacity: 0 }, root, '08.03');
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '54px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Bos killer bukan yang teriak.<br><span style="color:${ORANGE}">Yang ini lebih serem.</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const w = E.inout(seg(t, 0, dur * .55)); S.position.set(-1.6, 0, lerp(1.6, -2.5, w)); S.pose(t, { walk: w < 1 ? 1 : 0 }); if (w >= 1) S.rotation.y = Math.PI * .85;
      const tw = at(s, 'nulis|catat', dur * .6); B.pose(t, { hold: true, look: t > dur * .45 ? -.4 : 0 }); B.userData.st.arms[1].rotation.x = t > tw ? -1.2 : -.3; B.userData.st.arms[0].rotation.x = t > dur * .45 && t < tw ? -1 : 0;
      cam.position.set(lerp(2.6, 1.8, seg(t, 0, dur)), 1.25, lerp(8.6, 7.6, seg(t, 0, dur))); cam.lookAt(0, 1.55, -1.2);   // sudut rendah
      X.pop(tm, seg(t, dur * .5, dur * .5 + .4)); X.pop(hook, seg(t, .1, .5));
    } };
  },
  M_NOTEBOOK(s, root) {   // close-up buku hitam di meja: catatan muncul satu per satu (varian bad / good)
    const GOOD = s.variant === 'good'; const sc = newScene({ bg: GOOD ? '#FFE9CF' : '#1A2030', hemi: GOOD ? 1 : .5, sunI: GOOD ? 2 : 1.2, sun: GOOD ? '#FFE3B8' : '#BFD7FF', sunPos: [-3, 9, 4] });
    sc.add(mesh(G.box(8, .3, 6), GOOD ? '#B9875A' : '#4A3626', [0, -.15, 0])); sc.add(mesh(G.cyl(.05, .05, 1.6, 8), '#222', [2.2, .02, -.6], { rot: [0, 0, Math.PI / 2] }));
    const items = X.TL.vars[GOOD ? 'good' : 'bad']; const c = document.createElement('canvas'); c.width = 700; c.height = 900; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#FBF7EE'; x.fillRect(0, 0, 700, 900); x.strokeStyle = '#C9D6E8'; x.lineWidth = 3; for (let y = 120; y < 900; y += 80) { x.beginPath(); x.moveTo(30, y); x.lineTo(670, y); x.stroke() }
      x.fillStyle = '#E5484D'; x.fillRect(90, 0, 4, 900); x.font = '700 40px Poppins'; items.slice(0, n).forEach((it, i) => { const [d, txt] = it; x.fillStyle = '#7A8594'; x.fillText(d, 110, 105 + (i * 2 + 1) * 80 - 12); x.fillStyle = GOOD && i >= (X.TL.vars.good_from || 0) ? '#2E7D32' : '#1E2A38'; x.fillText(txt, 110, 105 + (i * 2 + 2) * 80 - 12) }); tex.needsUpdate = true };
    draw(0); const bk = group(sc, [-.2, 0, 0]); bk.add(mesh(G.box(3.1, .12, 2.1), '#111', [0, .06, 0])); const pg = new THREE.Mesh(G.plane(1.45, 1.9), new THREE.MeshStandardMaterial({ map: tex, roughness: .9 })); pg.rotation.x = -Math.PI / 2; pg.position.set(.75, .125, 0); bk.add(pg);
    const pg2 = mesh(G.box(1.45, .01, 1.9), '#F4EFE4', [-.75, .125, 0], { cast: false }); bk.add(pg2);
    const pen = group(sc, [1.6, .12, .6]); pen.add(mesh(G.cyl(.04, .04, 1.2, 8), '#1E2A38', [0, 0, 0], { rot: [0, 0, Math.PI / 2] }));
    const cam = camera(40); const cues = X.TL.vars[GOOD ? 'good_cues' : 'bad_cues'];
    return { scene: sc, cam, upd(t, dur) {
      let n = GOOD ? (X.TL.vars.good_from || 0) : 0; cues.forEach((cu, i) => { if (!/^xx/.test(cu) && t > at(s, cu, 1 + i * 2.5) - .2) n = Math.max(n, i + 1) }); draw(n);
      pen.position.set(1.0 + Math.sin(t * 9) * .08 * (n < items.length ? 1 : 0), .2, -.6 + n * .35); pen.rotation.y = .5;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.9, .6, p), lerp(4.2, 3.2, p), lerp(2.4, 1.6, p)); cam.lookAt(.5, 0, .05);
    } };
  },
  M_GLASSROOM(s, root) {   // open space: staf melirik ruang kaca bos, pintu terbuka -> semua pura-pura sibuk
    const sc = newScene({ bg: '#E1E7EF', hemi: 1.05, sunPos: [6, 10, 6] }); sc.add(mesh(G.box(16, .2, 16), '#9AA6B4', [0, -.1, 0])); sc.add(mesh(G.box(16, 5, .2), '#E9EDF3', [0, 2.5, -6]));
    const gr = group(sc, [0, 0, -4]); gr.add(mesh(G.box(5, 3, .06), '#BFE0F5', [0, 1.5, 1.2], { mat: { transparent: true, opacity: .35, roughness: .1 }, cast: false })); gr.add(mesh(G.box(5.2, .12, .12), '#5A6676', [0, 3, 1.2]));
    const door = mesh(G.box(1.1, 2.6, .08), '#BFE0F5', [1.6, 1.3, 1.25], { mat: { transparent: true, opacity: .5, roughness: .1 }, cast: false }); gr.add(door); desk(gr, [0, 0, -.2], 2); const B = bos([0, 0, .5]); gr.add(B); B.rotation.y = 0;
    const ppl = [[-2.4, .8], [-.8, .8], [.8, .8], [2.4, .8], [-1.6, 2.6], [1.6, 2.6]].map(([x, z], i) => { desk(sc, [x, 0, z], 1.3); laptop(sc, [x, .82, z - .1]); const P = staf([x, 0, z + .75], { body: ['#9CC3E6', '#BFD6EA', '#A7C4DC', '#C8DCEF'][i % 4] }); sc.add(P); P.rotation.y = Math.PI; return P });
    const cam = camera(42); const c1 = chip(root, '🫣 semua pura-pura sibuk', { left: 70, top: 300 }, BLUE), c2 = chip(root, 'rapi ✓ · tegang ✓', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      const to = at(s, 'kebuka', dur * .55), open = E.out(seg(t, to - .3, to + .4)); door.position.x = 1.6 + open * 1.05;
      ppl.forEach((P, i) => { const peek = t < to; P.pose(t + i, { look: peek ? (Math.sin(t * .9 + i) > 0 ? .7 : .2) * (P.position.x < 0 ? -1 : 1) * -1 : 0, hold: !peek }); P.userData.st.arms.forEach(A => A.rotation.x = peek ? 0 : -1.1 + Math.sin(t * 16 + i) * .1) });
      B.pose(t, { look: Math.sin(t * .4) * .3 }); cam.position.set(lerp(-1.4, 1.2, seg(t, 0, dur)), 4.6, 8.4); cam.lookAt(0, 1.2, -2.6);
      X.pop(c1, seg(t, to, to + .4)); const tr = at(s, 'super rapi', 1.5); X.pop(c2, seg(t, tr, tr + .4));
    } };
  },
  M_REVIEW(s, root) {   // ruang evaluasi 1-on-1: bos membuka buku, staf menegang (kamera over-the-shoulder bos)
    const sc = newScene({ bg: '#C9D4E2', hemi: .9, sunI: 1.6, sunPos: [-5, 8, 3], sun: '#FFF0D8' }); room(sc, { wall: '#CBD6E3', wall2: '#BFCBDA', floor: '#6B7787', window: true });
    sc.add(mesh(G.box(2.2, .08, 1.2), '#E7DCCB', [0, .8, -.6])); sc.add(mesh(G.box(2, .76, 1), '#7A6A55', [0, .38, -.6]));
    const B = bos([0, 0, .55]); sc.add(B); B.rotation.y = Math.PI; const S = staf([0, 0, -1.8]); sc.add(S);
    const bk = group(sc, [0, .86, -.4]); bk.add(mesh(G.box(.7, .05, .5), '#111', [0, 0, 0])); const pages = mesh(G.box(.64, .02, .46), '#FBF7EE', [0, .04, 0], { cast: false }); bk.add(pages);
    const cl = clock3(sc, [1.8, 3, -3.85]);
    const cam = camera(42); const c1 = chip(root, '📓 "Tanggal 3: telat 3 menit"', { left: 70, top: 300 }, ORANGE), c2 = chip(root, '📓 "Tanggal 9: salah angka"', { left: 70, top: 410 }, ORANGE), c3 = chip(root, '😰 siap kena…', { left: 70, top: 520 }, BLUE);
    return { scene: sc, cam, upd(t, dur) {
      const o = E.out(seg(t, at(s, 'buka', 1.5), at(s, 'buka', 1.5) + .6)); bk.scale.set(1, 1, .5 + o * .5);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.4, 1.0, p), 2.2, lerp(2.8, 2.0, p)); cam.lookAt(-.1, 1.35, -1.8);
      B.pose(t, { talk: t > at(s, 'Tanggal tiga', 3) && t < dur * .85 }); S.pose(t, { shake: t > dur * .8, look: Math.sin(t * .7) * .1 }); S.userData.st.head.rotation.x = t > at(s, 'siap', dur - 2) ? .25 : 0;
      [[c1, 'Tanggal tiga'], [c2, 'Tanggal sembilan'], [c3, 'siap']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) });
    } };
  },
  M_STAIRS(s, root) {   // tangga darurat: staf cerita ke rekan, tiga cara bernomor, pertanyaan penutup
    const sc = newScene({ bg: '#3A4048', hemi: .9, hemiSky: '#FFF1D6', sunI: 1.4, sun: '#FFE7C2', sunPos: [3, 10, 6] });
    for (let i = 0; i < 10; i++) sc.add(mesh(G.box(3, .24, .5), '#8E959E', [0, i * .24 + .12, -i * .5]));
    sc.add(mesh(G.box(.2, 6, 8), '#B5BCC5', [-1.6, 3, -2])); sc.add(mesh(G.box(.2, 6, 8), '#A8AFB8', [1.6, 3, -2])); sc.add(mesh(G.box(.06, .06, 5.4), '#E0B33A', [1.45, 1.5, -2], { rot: [-.45, 0, 0] }));
    sc.add(mesh(G.box(.7, .26, .04), '#2E9C6A', [-1.48, 3.2, -1], { rot: [0, Math.PI / 2, 0], mat: { emissive: '#2E9C6A', emissiveIntensity: .8 }, cast: false }));
    const S = staf([-.5, .48, -1]), F = staf([.5, .72, -1.5], { body: '#C8DCEF', hair: '#1E1410' }); sc.add(S, F); S.rotation.y = .5; F.rotation.y = -.5;
    const cam = camera(42); const tips = X.TL.vars.tips3.map((tx, i) => X.ab({ left: 90, top: 300 + i * 120, width: 900, background: CARD, border: `5px solid ${INK}`, borderRadius: '20px', padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '38px', color: INK, opacity: 0, boxShadow: `0 8px 0 ${BLUE}` }, root, `<b style="color:${ORANGE}">${i + 1}.</b> ${tx}`));
    const q = X.ab({ left: 60, top: 1180, width: 960, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '58px', color: '#fff', opacity: 0 }, root, `<span style="background:${ORANGE};padding:8px 22px;border-radius:16px">Bos lo tipe yang mana?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(10, -4, E.inout(seg(t, 0, dur))), 2.2, 5.2, [0, 1.5, -1.2]); S.pose(t, { talk: true, point: t > at(s, 'Satu', 3) && t < at(s, 'Satu', 3) + 1 }); F.pose(t, { nod: true, look: -.3 });
      X.TL.vars.tips_cues.forEach((cu, i) => { const tc = at(s, cu, 3 + i * 3); X.pop(tips[i], seg(t, tc, tc + .4)) }); const tq = at(s, 'tipe yang mana', dur - 2.5); const pq = seg(t, tq, tq + .4); q.style.opacity = pq; q.style.transform = `scale(${E.back(pq)})`;
    } };
  },
  // ===== ep007 (Kamus HRD) =====
  M_JOBAD(s, root) {   // kamar staf malam: HP raksasa menampilkan lowongan, empat frasa disorot satu per satu
    const sc = newScene({ bg: '#1A2238', hemi: .9, hemiSky: '#9CC3E6', sunI: 1.2, sun: '#BFD7FF', sunPos: [4, 9, 6] }); room(sc, { wall: '#4C5F7C', wall2: '#435570', floor: '#6B5A4A', window: true, night: true });
    sc.add(mesh(G.box(3, .5, 2), '#3D4F7A', [-1.4, .25, -1.8])); const S = staf([-1.5, .5, -1.2]); sc.add(S);
    const ph = X.TL.vars.phr; const c = document.createElement('canvas'); c.width = 600; c.height = 1100; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 600, 1100); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 600, 130); x.fillStyle = '#fff'; x.font = '700 46px Poppins'; x.fillText('LOWONGAN', 30, 85);
      x.fillStyle = INK; x.font = '700 40px Poppins'; x.fillText('Staf Admin', 30, 200); x.font = '600 30px Poppins'; x.fillStyle = '#5A6676'; x.fillText('Kami menawarkan:', 30, 260);
      ph.forEach(([p], i) => { const y = 340 + i * 150; if (i < n) { x.fillStyle = '#FFE680'; x.fillRect(20, y - 50, 560, 80) } x.fillStyle = INK; x.font = '700 36px Poppins'; x.fillText('• ' + p, 34, y) }); tex.needsUpdate = true };
    draw(0); const P = group(sc, [.35, 2.3, .4]); P.add(mesh(G.box(1.5, 2.7, .1), '#1B1B1F', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(1.38, 2.52), new THREE.MeshBasicMaterial({ map: tex })); scr.position.z = .055; P.add(scr);
    const glow = new THREE.PointLight('#9CC3E6', 6, 6); glow.position.set(.9, 2.2, 1.5); sc.add(glow);
    const cam = camera(42); const hook = X.ab({ left: 60, top: 1180, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '16px 24px', textAlign: 'center', fontSize: '52px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${BLUE}` }, root, `Lowongannya sempurna.<br><span style="color:${ORANGE}">Tapi baca 4 kalimat ini dulu.</span>`);
    return { scene: sc, cam, upd(t, dur) { draw(Math.min(4, Math.floor(seg(t, 1, dur * .8) * 4.999)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.2, .5, p), 2.4, lerp(8.6, 7.6, p)); cam.lookAt(-.05, 1.8, -.6); P.rotation.y = -.2; S.pose(t, { hold: true, look: .4 }); X.pop(hook, seg(t, .1, .5)) } };
  },
  M_DICT(s, root) {   // kartu kamus (frasa -> bisa berarti -> tanya ini), lokasi berganti per varian: krl / interview / cafe / wait
    const k = +s.variant, [phr, arti, tanya] = X.TL.vars.phr[k], LOC = ['krl', 'interview', 'cafe', 'wait'][k];
    const sc = newScene(LOC === 'wait' ? { bg: '#1A2238', hemi: .9, hemiSky: '#9CC3E6', sunI: 1.1, sun: '#BFD7FF', sunPos: [4, 9, 6] } : LOC === 'cafe' ? { bg: '#FFE7CC', hemi: 1.1, sun: '#FFD3A0', sunPos: [-6, 9, 6] } : { bg: '#DCE6F2', hemi: 1.1, sunPos: [5, 10, 6] });
    const cam = camera(42); let anim = () => {};
    if (LOC === 'krl') { sc.add(mesh(G.box(3.4, .1, 14), '#8E959E', [0, 0, 0])); sc.add(mesh(G.box(.1, 3, 14), '#C9CED4', [-1.7, 1.5, 0])); sc.add(mesh(G.box(.1, 3, 14), '#C9CED4', [1.7, 1.5, 0]));
      for (let i = -3; i <= 3; i++) { sc.add(mesh(G.box(.05, 1, 1.6), '#9FD3F0', [-1.64, 1.9, i * 2], { mat: { emissive: '#BFE6FF', emissiveIntensity: .5 }, cast: false })); sc.add(mesh(G.box(.05, 1, 1.6), '#9FD3F0', [1.64, 1.9, i * 2], { mat: { emissive: '#BFE6FF', emissiveIntensity: .5 }, cast: false })) }
      sc.add(mesh(G.cyl(.03, .03, 14, 6), '#DDD', [0, 2.7, 0], { rot: [Math.PI / 2, 0, 0] })); const ppl = [0, 1, 2, 3].map(i => { const P = staf([(i % 2 ? .6 : -.6), 0, -1 - i * 1.6], { body: ['#9CC3E6', '#C8DCEF', '#E07B39', '#6B8E5A'][i] }); sc.add(P); P.userData.st.arms[0].rotation.z = -2.8; return P });
      anim = t => { cam.position.set(Math.sin(t * 3) * .02, 2.2, 4.2); cam.lookAt(0, 1.5, -3); ppl.forEach((P, i) => { P.pose(t + i, { look: Math.sin(t + i) * .3 }); P.userData.st.arms[0].rotation.z = -2.8; P.rotation.z = Math.sin(t * 2) * .02 }) } }
    if (LOC === 'interview') { room(sc, { wall: '#E9EDF3', floor: '#A9B4C2', window: true }); desk(sc, [0, 0, -1], 2.4); const H = staf([0, 0, -1.9], { body: '#C2457A', hair: '#2A1A10', glasses: true }); sc.add(H); const S = staf([0, 0, .2]); sc.add(S); S.rotation.y = Math.PI;
      anim = t => { cam.position.set(lerp(2.2, 1.8, seg(t, 0, 10)), 2.4, 4.2); cam.lookAt(-.1, 1.3, -1.2); H.pose(t, { talk: (t % 4) < 2.5 }); S.pose(t, { nod: (t % 4) > 2.5 }) } }
    if (LOC === 'cafe') { room(sc, { wall: '#F6DDBF', wall2: '#EFCFA8', floor: '#A8835E', window: true }); sc.add(mesh(G.cyl(.7, .7, .06, 18), '#F4E4CC', [0, .8, -1])); sc.add(mesh(G.cyl(.06, .1, .8, 8), '#3A2A1E', [0, .4, -1]));
      const A = staf([-.9, 0, -1]), B = staf([.9, 0, -1], { body: '#E07B39', hair: '#1E1410' }); sc.add(A, B); A.rotation.y = Math.PI / 2; B.rotation.y = -Math.PI / 2; sc.add(mesh(G.cyl(.1, .08, .2, 10), '#FFFFFF', [-.3, .93, -1])); laptop(sc, [.3, .83, -1]);
      anim = t => { orbit(cam, lerp(-20, 20, seg(t, 0, 12)), 2.3, 5.4, [0, 1.2, -1]); A.pose(t, { talk: Math.sin(t * 1.5) > 0 }); B.pose(t, { talk: Math.sin(t * 1.5) <= 0, nod: true }) } }
    if (LOC === 'wait') { room(sc, { wall: '#4C5F7C', wall2: '#435570', floor: '#6B5A4A', window: true, night: true }); sc.add(mesh(G.box(3, .5, 2), '#3D4F7A', [0, .25, -1.8])); const S = staf([0, .5, -1.4]); sc.add(S); const C = clock3(sc, [-1.8, 3.2, -3.85]);
      const ph = phone(sc, [1, 1.2, -.6], phoneTex([['HRD', 'Terima kasih, kami akan menghubungi Anda.', '14.02']], 1, { title: 'HRD', clock: '14.02' })); ph.rotation.y = -.4;
      anim = (t, dur) => { const h = 9 + t * 1.6; C.userData.h.rotation.z = -(h % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(h % 1) * Math.PI * 2; cam.position.set(1.6, 2.4, 4.6 - t * .04); cam.lookAt(0, 1.3, -1.2); S.pose(t, { hold: true, look: Math.sin(t * .8) * .4 }) } }
    const card = X.ab({ left: 60, top: 260, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '26px', padding: '18px 26px', fontFamily: 'Poppins', color: INK, boxShadow: `0 10px 0 ${ORANGE}` }, root,
      `<div style="font-size:32px;font-weight:700;color:#7A8594">KAMUS HRD #${k + 1}</div><div style="font-size:52px;font-weight:800;line-height:1.1">“${phr}”</div>`);
    const a1 = X.ab({ left: 60, top: 500, width: 960, fontFamily: 'Poppins', fontWeight: 700, fontSize: '38px', color: '#fff', background: ORANGE, borderRadius: '18px', padding: '12px 22px', opacity: 0 }, root, `bisa berarti: ${arti}`);
    const a2 = X.ab({ left: 60, top: 620, width: 960, fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#fff', background: BLUE, borderRadius: '18px', padding: '12px 22px', opacity: 0 }, root, `tanya ini: ${tanya}`);
    return { scene: sc, cam, upd(t, dur) { anim(t, dur); X.pop(card, seg(t, .1, .5)); const ta = at(s, 'bisa berarti', 2), tq = at(s, 'tanya', dur * .55); X.pop(a1, seg(t, ta, ta + .4)); X.pop(a2, seg(t, tq, tq + .4)) } };
  },
};

// tampilan tetap: judul bergaya gelembung chat, transisi whip pan
let title, gl;
export function chrome(ctx) { title = ctx.ab({ left: 36, top: 60, zIndex: 8 }, ctx.ov); gl = document.getElementById('gl') }
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const side = /BOS/.test(s.kicker) ? ORANGE : /STAF/.test(s.kicker) ? BLUE : INK;
  const q = seg(t, .1, .45);
  title.innerHTML = `<div style="display:inline-block;background:${side};color:#fff;font-family:Poppins;font-weight:800;font-size:44px;padding:12px 28px;border-radius:30px 30px 30px 6px;box-shadow:0 8px 0 #00000035">${s.kicker}</div><div style="margin-top:10px;display:inline-block;background:${CARD};color:${INK};font-family:Poppins;font-weight:700;font-size:32px;padding:8px 22px;border-radius:22px;border:4px solid ${side};margin-left:12px">${s.sub}</div>`;
  title.style.opacity = q; title.style.transform = `translateY(${(1 - E.out(q)) * -30}px)`;
  let w = 0, dir = 1; X.TL.scenes.forEach((x, i) => { if (i) { const d = T - x.start; if (d > -.22 && d < .22) { w = 1 - Math.abs(d) / .22; dir = d < 0 ? -1 : 1 } } });
  gl.style.transform = w ? `translateX(${(dir < 0 ? -1 : 1) * w * 260}px) scale(${1 + w * .55})` : 'none'; gl.style.filter = w > .05 ? `blur(${w * 26}px)` : 'none';
}

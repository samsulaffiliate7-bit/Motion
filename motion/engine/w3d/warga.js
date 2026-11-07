// Dunia 3D akun Balai Desa Bocor (konsep v2): "liputan warga" dari desa rekaan.
// Bahasa visual khas: cahaya sore hangat, kamera dokumenter (goyang ringan hanya saat wawancara), papan judul ala liputan,
// nama narasumber di bawah, transisi surat edaran berstempel.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, tree, house, person, rain } from './kit.js';

let X; const INK = '#3A1F14', RED = '#B5452B', CREAM = '#FFF8EA', GOLD = '#F2C14E';
const SUNSET = { sky: ['#F7B77A', '#FFF0D9'], sun: '#FFD3A0', sunI: 2.7, sunPos: [-14, 9, 6], hemiSky: '#FFE9CF', hemiGround: '#9C8A5A', hemi: 1.05, fog: ['#FFE6C8', 28, 70], shadow: 16 };

const chip = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CREAM, border: `6px solid ${INK}`, borderRadius: '14px', padding: '10px 24px', fontSize: '42px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${RED}`, fontFamily: 'Fredoka' }, css), root, html); e.style.opacity = 0; return e };
function tag3(root, html, col = INK) { const w = X.ab({ left: 0, top: 0 }, root); const e = chip(w, html, { position: 'relative', transform: 'translate(-50%,-100%)' }, col);
  return { at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }
const at = (s, rx, fb) => X.C(s, rx, fb);

// tekstur papan proyek
function boardTex(color = '#1F6FB2') {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 520; const x = c.getContext('2d');
  x.fillStyle = color; x.fillRect(0, 0, 1024, 520); x.strokeStyle = '#FFFFFF'; x.lineWidth = 16; x.strokeRect(20, 20, 984, 480);
  const L = (X && X.TL.vars.board) || ['PAPAN PROYEK', 'Saluran Air Gang Kenanga', 'Panjang: 2 meter', 'Selesai: segera'];
  x.fillStyle = '#FFFFFF'; x.textAlign = 'center'; x.font = '800 92px Fredoka'; x.fillText(L[0], 512, 140);
  x.font = '700 58px Fredoka'; x.fillText(L[1], 512, 250); x.fillText(L[2], 512, 340); x.fillStyle = '#FFD54A'; x.fillText(L[3], 512, 430);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function papan(parent, p, o = {}) {   // papan 3 m x 1.6 m di atas dua tiang
  const g = group(parent, p); const tex = boardTex(o.color);
  g.add(mesh(G.box(.14, 2.6, .14), '#6E6E6E', [-1.3, 1.3, 0])); g.add(mesh(G.box(.14, 2.6, .14), '#6E6E6E', [1.3, 1.3, 0]));
  const board = new THREE.Mesh(G.box(3, 1.6, .08), [mat('#E8E8E8'), mat('#E8E8E8'), mat('#E8E8E8'), mat('#E8E8E8'), new THREE.MeshStandardMaterial({ map: tex, roughness: .6 }), mat('#D8D8D8')]);
  board.position.set(0, 2.2, 0); board.castShadow = true; g.add(board);
  const lamp = group(g, [0, 3.1, .25]); lamp.add(mesh(G.box(.5, .14, .3), '#333', [0, 0, 0])); const glow = mesh(G.box(.42, .06, .26), '#FFF6C0', [0, -.08, .02], { mat: { emissive: '#FFE680', emissiveIntensity: 0 }, cast: false }); lamp.add(glow);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1.5, 1.4, 20, 1, true), new THREE.MeshBasicMaterial({ color: '#FFF3B0', transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })); cone.position.set(0, -.75, .55); cone.rotation.x = -.35; lamp.add(cone);
  g.userData = { board, glow, cone, tex }; return g;
}
function saluran(parent, p, len = 2) { const g = group(parent, p); g.add(mesh(G.box(len, .3, .1), '#A9A9A9', [0, -.05, .3])); g.add(mesh(G.box(len, .3, .1), '#A9A9A9', [0, -.05, -.3])); g.add(mesh(G.box(len, .06, .7), '#7C6A55', [0, -.18, 0])); return g }
function village(sc, o = {}) {   // gang desa: jalan, rumah dua sisi, tiang listrik, pohon
  sc.add(mesh(G.box(60, .4, 60), '#9BB86A', [0, -.2, 0]));
  sc.add(mesh(G.box(60, .05, 3.2), '#C9C1B2', [0, .02, 2]));
  const cols = ['#F3E1C4', '#E9C9A8', '#DCE7D2', '#F2D7D0', '#E6DCC8'], roofs = ['#B5452B', '#9C5B33', '#7A4B3A', '#C9472F'];
  for (let i = -5; i <= 5; i++) { if (o.gapAt != null && Math.abs(i - o.gapAt) < 1) continue; house(sc, [i * 4.2, 0, -3.2], { wall: cols[(i + 5) % 5], roofC: roofs[(i + 7) % 4], w: 3, d: 2.6, h: 1.9 }); if (Math.abs(i * 4.2 + 2) > 13) house(sc, [i * 4.2 + 2, 0, 7.5], { wall: cols[(i + 7) % 5], roofC: roofs[(i + 5) % 4], w: 3, d: 2.6, h: 1.8, rot: Math.PI }) }
  for (let i = -6; i <= 6; i += 2) { sc.add(mesh(G.cyl(.07, .09, 4.2, 6), '#7A6A5A', [i * 4.2 + 1, 2.1, .2])); sc.add(mesh(G.box(.9, .06, .06), '#7A6A5A', [i * 4.2 + 1, 4, .2])) }
  [[-9, -6], [10, -6.5], [-15, 10], [14, 10.5], [3, -7]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.2, '#5E8F3A', i % 2 ? 'palm' : 'round'));
}
function field(parent, p, sc = 1, goals = 0) {   // lapangan bola: rumput belang, garis, gawang opsional (0 tidak ada, 1 sandal, 2 bambu)
  const g = group(parent, p); g.scale.setScalar(sc);
  for (let i = 0; i < 8; i++) g.add(mesh(G.box(2, .06, 9), i % 2 ? '#6DAE4A' : '#78B852', [-7 + i * 2, .03, 0], { cast: false }));
  [[0, 4.4, 16, .1], [0, -4.4, 16, .1], [8, 0, .1, 8.8], [-8, 0, .1, 8.8], [0, 0, .1, 8.8]].forEach(([x, z, w, d]) => g.add(mesh(G.box(w, .07, d), '#FFFFFF', [x, .05, z], { cast: false })));
  g.add(mesh(G.cyl(1.4, 1.4, .07, 32, 1), '#FFFFFF', [0, .04, 0], { cast: false })); g.add(mesh(G.cyl(1.3, 1.3, .08, 32), '#78B852', [0, .05, 0], { cast: false }));
  g.userData.goals = [-1, 1].map(sx => { const k = group(g, [sx * 7.6, 0, 0]);
    if (goals === 1) [-1, 1].forEach(z => k.add(mesh(G.box(.3, .1, .14), ['#3E8FC4', '#E5484D'][z > 0 ? 1 : 0], [0, .05, z * 1.2])));
    if (goals === 2) { [-1, 1].forEach(z => k.add(mesh(G.cyl(.08, .08, 2, 6), '#C9A35A', [0, 1, z * 1.6]))); k.add(mesh(G.cyl(.08, .08, 3.3, 6), '#C9A35A', [0, 2, 0], { rot: [Math.PI / 2, 0, 0] })); k.add(mesh(G.box(.02, 1.9, 3.1), '#FFFFFF', [-sx * .5, 1, 0], { mat: { transparent: true, opacity: .35 }, cast: false })) }
    return k });
  return g;
}
const warga = {   // tokoh tetap (rekaan)
  kades: (p, o = {}) => person(o.parent, p, Object.assign({ body: '#7A4B2A', pants: '#2B2B2B', hat: 'peci', mustache: true, skin: '#C98E64', tie: null }, o)),
  pkk: (p, o = {}) => person(o.parent, p, Object.assign({ body: '#D96C8A', pants: '#6B3A4A', hair: '#2A1A10', skin: '#E2A97E' }, o)),
  pemuda: (p, o = {}) => person(o.parent, p, Object.assign({ body: '#E07B39', pants: '#33506B', hat: 'cap', hatC: '#2E7D5B', skin: '#B97A52' }, o)),
  bapak: (p, o = {}) => person(o.parent, p, Object.assign({ body: '#4F7A9A', pants: '#4A4A4A', skin: '#C98E64' }, o)),
};

export async function setup(ctx) { X = ctx; await document.fonts.load('800 92px Fredoka') }

export const SHOTS = {
  BL_WIDE(s, root) {
    const END = s.variant === 'end'; const sc = newScene(SUNSET); village(sc);
    const P = papan(sc, [-2.2, 0, .9]); const S = saluran(sc, END ? [1.8, 0, 2.4] : [1.4, 0, 2.4], END ? 3 : 2);
    if (END) { P.userData.board.position.set(1.8, .12, 2.4); P.userData.board.rotation.x = -Math.PI / 2; P.children.slice(0, 2).forEach(c => c.visible = false); P.position.set(0, 0, 0); P.userData.board.parent.remove(P.children[3]) }
    const ppl = END ? [warga.pemuda([3.8, 0, 3.6]), warga.pkk([-.4, 0, 3.8]), warga.bapak([4.8, 0, 2.2])] : [warga.bapak([3.2, 0, 3.4]), warga.pkk([4.1, 0, 3.6])]; ppl.forEach(p => { sc.add(p); p.rotation.y = -.5 });
    const cam = camera(42);
    const tP = tag3(root, END ? 'tutup: 3 m' : 'papan: <b>3 m</b>', RED), tS = tag3(root, END ? 'saluran: <b>3 m</b>' : 'proyek: <b>2 m</b>', '#1F6FB2');
    const hook = END ? null : X.ab({ left: 60, top: 300, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '18px', padding: '22px 28px', fontSize: '58px', lineHeight: 1.12, textAlign: 'center', color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${RED}` }, root,
      `Papan namanya <span style="color:${RED}">3 meter</span>.<br>Proyeknya <span style="color:#1F6FB2">2 meter</span>.`);
    return { scene: sc, cam, upd(t, dur) {
      const t3 = at(s, 'tiga meter', 1.5), t2 = at(s, 'Dua meter|dua meter', 3.5);
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(END ? 30 : -35, END ? 5 : -8, p), lerp(9, 4.2, p), lerp(21, 14.5, p), [0, 1.2, 1.6]);
      ppl.forEach((q, i) => q.pose(t + i, { talk: i === 0, look: Math.sin(t + i) * .3, point: !END && i === 1 && t > t2 }));
      tP.at(END ? S : P, cam, END ? [0, .4, 0] : [0, 3.5, 0], seg(t, END ? .5 : t3, (END ? .5 : t3) + .4)); tS.at(S, cam, [0, .4, 0], seg(t, END ? 1 : t2, (END ? 1 : t2) + .4));
      if (hook) X.pop(hook, seg(t, .1, .5));
    } };
  },

  BL_FIELD(s, root) {   // lapangan: resmi (tanpa gawang, pita), kids (gawang sandal, bola), end (gawang bambu, pertandingan)
    const V = s.variant; const sc = newScene(V === 'kids' ? Object.assign({}, SUNSET, { sky: ['#9ED8F5', '#F3FBFF'], sun: '#FFFFFF', sunPos: [8, 16, 6], hemiSky: '#FFFFFF', fog: ['#EAF6FF', 40, 90] }) : SUNSET);
    sc.add(mesh(G.box(60, .4, 60), '#9BB86A', [0, -.2, 0])); const F = field(sc, [0, 0, 0], 1, V === 'kids' ? 1 : V === 'end' ? 2 : 0);
    [[-11, -7], [11, -7], [-12, 6], [12, 7], [0, -9]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.4, '#5E8F3A', i % 2 ? 'palm' : 'round'));
    const P = papan(sc, [-5, 0, -6]); const ball = mesh(G.ico(.25, 1), '#FFFFFF', [0, .25, 0]); sc.add(ball);
    const ppl = []; let K = null;
    if (V === 'resmi') { K = warga.kades([0, 0, 3.4]); sc.add(K); [-1.6, -.8, .8, 1.6].forEach((x, i) => { const w = (i % 2 ? warga.pkk : warga.bapak)([x, 0, 4.2]); sc.add(w); ppl.push(w) }); sc.add(mesh(G.box(3.6, .04, .04), '#E5484D', [0, 1.1, 3.9])) }
    else for (let i = 0; i < (V === 'kids' ? 6 : 8); i++) { const w = (V === 'kids' ? warga.pemuda : (i % 2 ? warga.pemuda : warga.bapak))([0, 0, 0], { s: V === 'kids' ? .7 : 1, body: ['#E07B39', '#3E8FC4', '#E5484D', '#2E7D5B', '#F2C14E', '#6B4FA0', '#D96C8A', '#4F7A9A'][i] }); sc.add(w); ppl.push(w) }
    const cam = camera(42);
    const L = V === 'resmi' ? [['✂️ pita digunting', 'pitanya'], ['🥅 gawang: <b>belum ada</b>', 'gawangnya']] : V === 'kids' ? [['🩴 tiang gawang: sandal', 'sandal'], ['🌧️ hujan = gawang hanyut', 'hanyut']] : [['🎋 bambu + jaring bekas', 'bambu'], ['⏱️ jadi dalam satu sore', 'satu sore']];
    const chips = L.map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 105 }, i ? RED : INK) }));
    const hook = V === 'resmi' ? X.ab({ left: 60, top: 520, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '18px', padding: '18px 24px', fontSize: '54px', textAlign: 'center', color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${RED}`, opacity: 0 }, root, `Lapangannya jadi.<br><span style="color:${RED}">Gawangnya tahun depan.</span>`) : null;
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(V === 'end' ? 30 : -30, V === 'end' ? -10 : 15, p), lerp(9, 6, p), lerp(22, V === 'resmi' ? 17 : 14, p), [V === 'resmi' ? 0 : -4.2, .6, 1]);
      if (K) { K.pose(t, { talk: true, cheer: t > 2 && t < 3.5 }); ppl.forEach((w, i) => w.pose(t + i, { cheer: t > 2 && t < 3.5, nod: true })) }
      else ppl.forEach((w, i) => { const a = t * (V === 'kids' ? .9 : .7) + i * 1.1; w.position.set(Math.sin(a) * (3 + (i % 3)), 0, Math.cos(a * 1.3) * 2.6); w.rotation.y = a + Math.PI / 2; w.pose(t + i, { walk: 1 }) });
      ball.position.set(Math.sin(t * 1.3) * 5, .25 + Math.abs(Math.sin(t * 3)) * .6, Math.sin(t * .9) * 2); ball.rotation.set(t * 4, t * 3, 0);
      if (V === 'kids') { const th = at(s, 'hanyut', 99); if (t > th) F.userData.goals.forEach((k, i) => { k.position.z = (t - th) * (i ? 1.2 : -1.4); k.position.x = (i ? 7.6 : -7.6) + (t - th) * .6 }) }
      if (hook) X.pop(hook, seg(t, at(s, 'gawangnya', 4), at(s, 'gawangnya', 4) + .4));
      chips.forEach(c => { const tc = at(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  BL_WALK(s, root) {   // empat orang mengangkut papan raksasa menyusuri gang
    const sc = newScene(SUNSET); village(sc);
    const crew = group(sc, [0, 0, 2]); const P = papan(crew, [0, -.6, 0]); P.rotation.y = 0;
    const men = [[-1.3, -.35], [1.3, -.35], [-1.3, .35], [1.3, .35]].map(([x, z], i) => { const m = (i % 2 ? warga.pemuda : warga.bapak)([x, 0, z], { parent: crew }); m.rotation.y = -Math.PI / 2; return m });
    saluran(sc, [9, 0, 2.4], 2);
    const cam = camera(44);
    const c1 = chip(root, 'Papan datang <b>duluan</b>', { left: 70, top: 300 }, RED), c2 = chip(root, 'Diangkut <b>4 orang</b> + lampu sorot', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      crew.position.x = lerp(-10, 6, t / dur); men.forEach((m, i) => { m.pose(t + i * .3, { walk: 1, cheer: false }); m.userData.st.arms.forEach(A => { A.rotation.z = (A.position.x < 0 ? -1 : 1) * 2.9; A.rotation.x = 0 }) });
      P.position.y = -.6 + Math.abs(Math.sin(t * 8)) * .04;
      cam.position.set(crew.position.x - 1, 3.4, 13); cam.lookAt(crew.position.x + 1, 1.5, 2);
      const ta = at(s, 'duluan', 3), te = at(s, 'empat orang', 5); X.pop(c1, seg(t, ta, ta + .4)); X.pop(c2, seg(t, te, te + .4));
      P.userData.glow.material.emissiveIntensity = t > te ? 1.5 : 0;
    } };
  },
  BL_INTERVIEW(s, root) {   // narasumber menghadap kamera, kamera genggam
    const sc = newScene(Object.assign({}, SUNSET, { fog: ['#FFE6C8', 12, 40] })); village(sc); const P = papan(sc, [-3, 0, -.6]);
    const IV = X.TL.vars.iv || { who: 'pkk', name: 'Bu Ketua PKK', role: 'Warga Gang Kenanga', q1: '“Papannya bagus sekali, kelihatan dari jalan besar!”', q2: '“Salurannya... belum kelihatan.”', q2cue: 'salurannya' };
    const W = warga[IV.who]([0, 0, 3.3], { s: 1.15 }); sc.add(W);
    const cam = camera(30);
    const lt = X.ab({ left: 60, top: 1240, zIndex: 7, opacity: 0 }, root, `<div style="background:${RED};color:#fff;font-family:Fredoka;font-weight:700;font-size:46px;padding:10px 26px;display:inline-block">${IV.name}</div><div style="background:${CREAM};color:${INK};font-family:Fredoka;font-weight:600;font-size:32px;padding:8px 26px;border-left:12px solid ${RED}">${IV.role}</div>`);
    const q = X.ab({ left: 520, top: 330, width: 500, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: '36px', padding: '20px 26px', fontSize: '44px', fontFamily: 'Fredoka', fontWeight: 700, color: INK, opacity: 0 }, root, IV.q1);
    const q2 = X.ab({ left: 60, top: 520, width: 520, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: '36px', padding: '20px 26px', fontSize: '44px', fontFamily: 'Fredoka', fontWeight: 700, color: RED, opacity: 0 }, root, IV.q2);
    return { scene: sc, cam, upd(t, dur) {
      const sh = [Math.sin(t * 1.7) * .03 + Math.sin(t * 3.1) * .015, Math.sin(t * 2.3) * .02];
      cam.position.set(.6 + sh[0], 2 + sh[1], 10.5 - t * .06); cam.lookAt(-.5, 1.6, 3.3);
      W.pose(t, { talk: true, nod: (t % 4) < 1.5 }); W.rotation.y = .12;
      const ts = at(s, IV.q2cue, dur - 2.5); lt.style.opacity = seg(t, .3, .7); lt.style.transform = `translateX(${(1 - E.out(seg(t, .3, .8))) * -300}px)`;
      X.pop(q, seg(t, 1.2, 1.6)); X.pop(q2, seg(t, ts, ts + .4));
    } };
  },
  BL_PODIUM(s, root) {   // sosialisasi: kades di podium, warga duduk (kamera dari belakang warga)
    const sc = newScene(Object.assign({}, SUNSET, { sky: ['#F4C892', '#FFF4E3'] })); village(sc);
    sc.add(mesh(G.box(9, .25, 4), '#8A5A33', [0, .12, -1]));
    const pod = group(sc, [0, .25, -.6]); pod.add(mesh(G.box(1.1, 1.2, .7), '#6B4226', [0, .6, 0])); pod.add(mesh(G.cyl(.03, .03, .5, 6), '#222', [0, 1.4, .2]));
    const ban = mesh(G.box(7, 1.2, .05), '#B5452B', [0, 3.3, -2.6]); sc.add(ban); sc.add(mesh(G.box(.1, 3.6, .1), '#6E6E6E', [-3.5, 1.8, -2.6])); sc.add(mesh(G.box(.1, 3.6, .1), '#6E6E6E', [3.5, 1.8, -2.6]));
    const K = warga.kades([0, .25, -1.3], { prop: 'mic', s: 1.05 }); sc.add(K);
    const crowd = []; for (let r = 0; r < 2; r++) for (let c = -2; c <= 2; c++) { const ch = group(sc, [c * 1.3, 0, 3 + r * 1.4]); ch.add(mesh(G.box(.7, .45, .7), '#5C6B73', [0, .22, 0])); const w = [warga.bapak, warga.pkk, warga.pemuda][(c + r + 3) % 3]([0, -.1, 0], { parent: ch }); w.rotation.y = Math.PI; crowd.push(w) }
    const cam = camera(40);
    const banT = X.ab({ left: 0, top: 0 }, root); const bt = tag3(root, 'SOSIALISASI PROYEK', RED);
    const big = X.ab({ left: 90, top: 330, width: 900, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '96px', color: '#FFFFFF', WebkitTextStroke: `16px ${RED}`, paintOrder: 'stroke fill', opacity: 0 }, root, X.TL.vars.janji || '“MINGGU DEPAN BERES”');
    return { scene: sc, cam, upd(t, dur) {
      const tb = at(s, X.TL.vars.janji_cue || 'minggu depan', dur - 3); const p = E.inout(seg(t, 0, tb));
      cam.position.set(lerp(-3, 0, p), lerp(7, 6, p), lerp(14, 11, p)); cam.lookAt(0, 1.8, -1.2);
      K.pose(t, { talk: true, hold: true, point: (t % 5) < 1.4 }); crowd.forEach((w, i) => w.pose(t + i, { nod: i % 3 === 0, look: Math.sin(t * .7 + i) * .3 }));
      bt.at(ban, cam, [0, .2, .1], seg(t, .2, .5)); const q = seg(t, tb + .2, tb + .6); big.style.opacity = q; big.style.transform = `scale(${E.back(q)}) rotate(-4deg)`;
    } };
  },
  BL_TIMELAPSE(s, root) {   // kamera diam, hari berganti: papan dicat, lampu diganti, saluran tetap 2 m
    const sc = newScene(SUNSET); village(sc); const P = papan(sc, [-1.6, 0, .9]); const S = X.TL.vars.field ? field(sc, [3, 0, 5], .5) : saluran(sc, [1.9, 0, 2.4], 2);
    const P2 = papan(sc, [-1.6, 0, .9], { color: '#2E8B57' }); P2.visible = false;
    const cam = camera(42); const sun = sc.userData.sun, hemi = sc.userData.hemi, skyD = sc.background, skyN = new THREE.Color('#1B2340');
    const cal = X.ab({ left: 70, top: 300, background: CREAM, border: `6px solid ${INK}`, borderRadius: '18px', width: 300, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, color: INK, boxShadow: `0 8px 0 ${RED}` }, root);
    const notes = (X.TL.vars.tl_notes || [['papan dicat ulang', 'dicat'], ['lampu sorot lebih terang', 'lampu'], ['saluran: masih 2 m', 'masih']]).map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 410, top: 300 + i * 105, fontSize: '38px' }, i === 2 ? '#1F6FB2' : INK) }));
    const tS = tag3(root, X.TL.vars.field ? 'gawang: belum' : '2 m', '#1F6FB2');
    return { scene: sc, cam, upd(t, dur) {
      const NT = X.TL.vars.tl_notes; const td = at(s, NT ? NT[0][1] : 'dicat', 1), tl = at(s, NT ? NT[1][1] : 'lampu', 4), tm = at(s, NT ? NT[2][1] : 'Sebulan|masih', 7);
      const day = Math.floor(t * 1.6), ph = (t * 1.6) % 1, night = Math.max(0, Math.sin(ph * Math.PI * 2 - Math.PI / 2));   // kedip siang-malam
      sun.intensity = lerp(2.7, .15, night); hemi.intensity = lerp(1.05, .25, night); sc.background = night > .5 ? skyN : skyD; sun.position.set(-14 + ph * 28, 9, 6);
      const lampOn = night > .3 ? (t > tl ? 3 : 1.2) : 0; [P, P2].forEach(x => { x.userData.glow.material.emissiveIntensity = lampOn; x.userData.cone.material.opacity = lampOn ? (t > tl ? .35 : .15) : 0 });
      P.visible = t < td + .3; P2.visible = !P.visible;
      orbit(cam, 18, 3.8, 16, [0, 1.4, 1.6]);
      const dd = t < tl ? 7 : t < tm ? 14 : 30; cal.innerHTML = `<div style="background:${RED};color:#fff;font-size:30px;padding:6px">HARI KE-</div><div style="font-size:84px;line-height:1.1">${dd}</div>`;
      notes.forEach(n => { const tc = at(s, n.cu, 99); X.pop(n.e, seg(t, tc, tc + .4)) }); tS.at(S, cam, [0, .4, 0], seg(t, tm, tm + .4));
    } };
  },
  BL_RAIN(s, root) {   // hujan, gang banjir, pemuda menggali, papan rebah jadi tutup saluran
    const sc = newScene(Object.assign({}, SUNSET, { sky: ['#6F7F92', '#B9C4CF'], sunI: 1, hemi: .8, fog: ['#AEB9C5', 20, 60] })); village(sc);
    const R = rain(sc, 500, 26, 12); const fl = mesh(G.box(60, .1, 3.2), '#6E9CC0', [0, .05, 2], { mat: { transparent: true, opacity: .75, roughness: .1 }, cast: false }); sc.add(fl);
    const P = papan(sc, [0, 0, .9]); const S = saluran(sc, [0, 0, 2.4], 3);
    const diggers = [warga.pemuda([-1.6, 0, 3.4]), warga.pemuda([1.7, 0, 3.5], { body: '#3E8FC4' })]; diggers.forEach(d => { sc.add(d); d.rotation.y = Math.PI * .9; const sh = mesh(G.box(.06, 1.2, .06), '#7A4E2C', [0, -.5, .15]); d.userData.st.arms[1].add(sh) });
    const cam = camera(42);
    const c1 = chip(root, 'Banjir <b>sebetis</b>', { left: 70, top: 300 }, '#1F6FB2'), c2 = chip(root, 'Gali <b>sendiri</b>', { left: 70, top: 410 }, RED), c3 = chip(root, 'Papan nama → <b>tutup saluran</b>', { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) {
      R.tick(t); const tb = at(s, 'sebetis', 2), tg = at(s, 'menggali', 4.5), tt = at(s, 'tutup saluran', dur - 2.5);
      fl.position.y = lerp(.03, .32, E.out(seg(t, 0, tb + 1))) * (1 - seg(t, tt, dur) * .7);
      diggers.forEach((d, i) => { d.pose(t, {}); if (t > tg) { const a = Math.sin(t * 6 + i * 1.5); d.userData.st.arms.forEach(A => { A.rotation.x = -1 + a * .6 }); d.userData.st.body.rotation.x = .2 + a * .1 } });
      const fall = E.inout(seg(t, tt - .2, tt + 1)); const B = P.userData.board; B.rotation.x = -fall * Math.PI / 2; B.position.set(0, lerp(2.2, .14, fall), lerp(0, 1.5, fall));
      orbit(cam, lerp(-20, 15, E.inout(seg(t, 0, dur))), lerp(4.5, 6.5, seg(t, tt - 1, dur)), 13.5, [0, 1, 2]);
      X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tg, tg + .4)); X.pop(c3, seg(t, tt, tt + .4));
    } };
  },
  // ===== Jejak Anggaran (jalan desa) =====
  BL_ROAD(s, root) {   // jalan desa: aspal mulus berhenti di depan baliho peresmian, sisanya berlubang (hook / end)
    const END = s.variant === 'end'; const v = X.TL.vars; const sc = newScene(Object.assign({}, SUNSET, { shadow: 22 })); village(sc);
    const L = v.aspal_unit, x0 = -20; sc.add(mesh(G.box(L, .06, 3.1), '#3A3A40', [x0 + L / 2, .06, 2], { cast: false })); for (let i = 0; i < L; i += 2) sc.add(mesh(G.box(1, .02, .12), '#F2F2F2', [x0 + .5 + i, .1, 2], { cast: false }));
    for (let i = 0; i < 26; i++) { const x = x0 + L + 1 + (i * 37 % 100) / 100 * (40 - L - 2), z = 1 + (i * 61 % 100) / 50; sc.add(mesh(G.cyl(.35 + (i % 3) * .15, .3, .05, 10), '#6B5A44', [x, .05, z], { cast: false })) }
    const bal = group(sc, [x0 + L + .6, 0, -.2]); [-1.3, 1.3].forEach(x => bal.add(mesh(G.box(.12, 3.2, .12), '#6E6E6E', [x, 1.6, 0])));
    const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const x = c.getContext('2d'); x.fillStyle = '#1F6FB2'; x.fillRect(0, 0, 1024, 512); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '800 96px Fredoka'; x.fillText('PERESMIAN', 512, 170); x.font = '700 70px Fredoka'; x.fillText('JALAN DESA MULUS', 512, 290); x.fillStyle = '#FFD54A'; x.fillText('Desa Bocor Indah', 512, 410);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; const bb = new THREE.Mesh(G.box(3, 1.5, .08), [mat('#DDD'), mat('#DDD'), mat('#DDD'), mat('#DDD'), new THREE.MeshStandardMaterial({ map: tex }), mat('#DDD')]); bb.position.y = 2.7; bb.castShadow = true; bal.add(bb);
    const ppl = [warga.bapak([x0 + L + 3, 0, 3.2]), warga.pemuda([x0 + L + 4.4, 0, 2.6])]; ppl.forEach(p => { sc.add(p); p.rotation.y = -.8 });
    const cam = camera(42); const tA = tag3(root, `aspal: <b>${v.jalan_m} m</b>`, '#1F6FB2'), tB = tag3(root, 'rencana: <b>1 km</b>', RED);
    const box = (html, o) => X.ab({ left: 60, top: 300, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '18px', padding: '20px 26px', fontSize: '54px', lineHeight: 1.12, textAlign: 'center', color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${RED}`, opacity: o }, root, html);
    const hook = END ? null : box(`Dananya <span style="color:${RED}">Rp${v.dana} juta</span>.<br>Jalannya jadi <span style="color:#1F6FB2">${v.jalan_m} meter</span>.`, 1);
    const q = END ? box(`Di daerah lo, jalan mulusnya<br><span style="color:${RED}">berhenti di mana?</span>`, 0) : null;
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur));
      if (END) { cam.position.set(lerp(x0 + L - 6, x0 + L, p), lerp(14, 22, p), lerp(14, 10, p)); cam.lookAt(x0 + L, 0, 2) }
      else { const cx = lerp(x0 + L - 1, x0 + L + 2, E.inout(seg(t, .5, dur * .8))); cam.position.set(cx - 5, lerp(4.2, 5.2, p), lerp(9, 11, p)); cam.lookAt(cx + 1, 1, 1.2) }
      ppl.forEach((w, i) => w.pose(t + i, { look: Math.sin(t * .6 + i) * .4, point: i === 0 && t > dur * .6 }));
      tA.at(bal, cam, [-L / 2, -2.2, 2.2], seg(t, END ? .4 : dur * .35, (END ? .4 : dur * .35) + .4)); tB.at(bal, cam, [6, -2.2, 2.2], seg(t, END ? .9 : dur * .7, (END ? .9 : dur * .7) + .4));
      if (hook) X.pop(hook, seg(t, .1, .5)); if (q) { const tq = at(s, 'Di daerah', dur - 3); X.pop(q, seg(t, tq, tq + .4)) }
    } };
  },
  BL_RELAY(s, root) {   // estafet koper dana dari meja ke meja; tiap meja ambil "sedikit", penghitung menyusut
    const v = X.TL.vars; const sc = newScene({ bg: '#E9D9BF', hemi: 1.1, hemiSky: '#FFF4E0', hemiGround: '#8A6A4A', sun: '#FFE2B8', sunI: 2, sunPos: [-6, 10, 6], shadow: 16 });
    sc.add(mesh(G.box(40, .2, 10), '#A68A6A', [0, -.1, 0])); sc.add(mesh(G.box(40, 5, .2), '#EFE2CC', [0, 2.5, -3])); for (let i = 0; i < 8; i++) sc.add(mesh(G.box(1.6, 1.1, .05), '#BFE0F5', [-14 + i * 4, 3, -2.88], { cast: false }));
    const n = v.potong.length; const desks = v.potong.map((pp, i) => { const g = group(sc, [-12 + i * 4.8, 0, -.6]); g.add(mesh(G.box(2, .08, 1), '#7A5230', [0, .8, 0])); g.add(mesh(G.box(1.9, .76, .9), '#5E3E22', [0, .38, 0]));
      const P = [warga.bapak, warga.kades, warga.bapak][i % 3]([0, 0, -1], { body: ['#4F7A9A', '#6E7681', '#7A4B2A', '#5A6B4A', '#8A6A9A', '#3E4F66'][i] }); g.add(P);
      const stack = group(g, [.6, .84, .1]); for (let k = 0; k < 4; k++) stack.add(mesh(G.box(.42, .08, .22), '#6FBF73', [0, .04 + k * .085, 0], { cast: false })); stack.visible = false; g.userData = { P, stack }; return g });
    const kop = group(sc, [-12, .9, .3]); kop.add(mesh(G.box(.9, .6, .3), '#7A3B1E', [0, .3, 0])); kop.add(mesh(G.box(.3, .08, .06), GOLD, [0, .64, 0]));
    const cam = camera(42); const cnt = X.ab({ left: 60, top: 300, width: 960, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '104px', color: '#fff', WebkitTextStroke: `16px ${INK}`, paintOrder: 'stroke fill' }, root);
    const tags = v.potong.map(([nm, j]) => tag3(root, `${nm} <b style="color:${RED}">−${j} jt</b>`));
    return { scene: sc, cam, upd(t, dur) {
      const cues = v.potong_cues.map((cu, i) => at(s, cu, 2 + i * 2.2)); let k = -1; cues.forEach((c, i) => { if (t > c) k = i });
      const posX = i => -12 + i * 4.8; let kx;
      if (k < 0) kx = lerp(posX(0) - 3, posX(0), E.inout(seg(t, 0, cues[0])));
      else if (k >= n - 1) kx = posX(n - 1) + E.inout(seg(t, cues[n - 1] + .6, dur)) * 3;
      else kx = lerp(posX(k), posX(k + 1), E.inout(seg(t, cues[k] + .4, cues[k + 1] - .1)));
      kop.position.x = kx; kop.position.y = .9 + Math.abs(Math.sin(t * 6)) * .05;
      desks.forEach((d, i) => { d.userData.stack.visible = i <= k; d.userData.P.pose(t + i, { hold: i === k, nod: i < k, look: i <= k ? .4 : 0 }) });
      const left = v.dana - v.potong.slice(0, k + 1).reduce((a, [, j]) => a + j, 0); cnt.innerHTML = `Rp${left} juta<div style="font-size:44px;-webkit-text-stroke:10px ${INK}">sisa di koper</div>`;
      cam.position.set(kx + 2.4, 3.2, 6.6); cam.lookAt(kx, 1, -.6);
      tags.forEach((g, i) => g.at(desks[i], cam, [0, 2.4, 0], i <= k ? seg(t, cues[i], cues[i] + .3) : 0));
    } };
  },
  BL_TALLY(s, root) {   // papan tulis balai: rekap potongan, jumlah, sisa; Pak RT menunjuk
    const v = X.TL.vars; const sc = newScene(Object.assign({}, SUNSET, { sky: ['#F4C892', '#FFF4E3'] })); sc.add(mesh(G.box(14, .2, 10), '#B98B5E', [0, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), '#F3E1C4', [0, 3, -3]));
    sc.add(mesh(G.box(4.6, 3, .1), '#2F4A3A', [0, 2.6, -2.85])); sc.add(mesh(G.box(4.8, .14, .3), '#8A5A33', [0, 1.05, -2.75]));
    const c = document.createElement('canvas'); c.width = 920; c.height = 600; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1; const NP = v.potong.length;
    const row = (txt, val, y, col, f) => { x.fillStyle = col; x.font = `700 ${f}px Fredoka`; x.textAlign = 'left'; x.fillText(txt, 40, y); x.textAlign = 'right'; x.fillText(val, 880, y) };
    const draw = m => { if (m === last) return; last = m; x.fillStyle = '#2F4A3A'; x.fillRect(0, 0, 920, 600);
      v.potong.forEach(([nm, j], i) => { if (i < m) row(nm, `${j} jt`, 60 + i * 56, '#F4F4EC', 40) });
      if (m > NP) { x.fillStyle = '#F4F4EC'; x.fillRect(40, 60 + NP * 56 - 30, 840, 5); row('Total potongan', `${v.total_potong} jt`, 60 + NP * 56 + 30, '#FF9B8A', 48) }
      if (m > NP + 1) row('Sampai ke jalan', `${v.sisa} jt`, 60 + NP * 56 + 100, '#FFE680', 52); tex.needsUpdate = true };
    draw(0); const bd = new THREE.Mesh(G.plane(4.4, 2.87), new THREE.MeshBasicMaterial({ map: tex })); bd.position.set(0, 2.6, -2.79); sc.add(bd);
    const W = warga.bapak([2.8, 0, -1.6], { prop: 'clipboard' }); sc.add(W); W.rotation.y = -.6; const cam = camera(40);
    const sd = X.ab({ left: 60, top: 1180, width: 960, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '54px', color: '#fff', opacity: 0 }, root, `<span style="background:${RED};padding:8px 20px;border-radius:12px">semua cuma “sedikit-sedikit”</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tt = at(s, 'dijumlah', .8), ts = at(s, 'sampai ke jalan', dur * .45), tq = at(s, 'sedikit-sedikit', dur - 2);
      draw(t < tt ? Math.ceil(NP * seg(t, 0, tt)) : t < ts ? NP + 1 : NP + 2);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-.6, .5, p), 2.5, lerp(9.6, 8.6, p)); cam.lookAt(.3, 2.1, -2.8); W.pose(t, { talk: true, point: (t % 4) < 1.6, look: -.5 }); X.pop(sd, seg(t, tq, tq + .4));
    } };
  },
  // ===== aduan viral (lampu gang) =====
  BL_DARKGANG(s, root) {   // gang malam, 10 lampu jalan mati; varian end: cuma satu lampu menyala di "titik viral"
    const END = s.variant === 'end'; const sc = newScene({ sky: ['#141B3A', '#2E3A6A'], hemi: .9, hemiSky: '#9FB0E0', hemiGround: '#3A3450', sun: '#B9C6FF', sunI: 1.1, sunPos: [-6, 10, 6], fog: ['#1E2648', 18, 60], shadow: 18 }); village(sc);
    const lamps = Array.from({ length: 10 }, (_, i) => { const g = group(sc, [-18 + i * 4, 0, 3.8]); g.add(mesh(G.cyl(.06, .08, 4, 8), '#6E6E6E', [0, 2, 0])); g.add(mesh(G.box(.7, .1, .25), '#555', [-.3, 4, 0])); const b = mesh(G.box(.4, .08, .2), '#556', [-.5, 3.94, 0], { cast: false, mat: { emissive: '#FFE7A0', emissiveIntensity: 0 } }); g.add(b); g.userData.b = b; return g });
    const lit = 5, L = new THREE.PointLight('#FFE2A0', 0, 12); L.position.set(-18 + lit * 4 - .5, 3.8, 3.8); sc.add(L); const glow = new THREE.SpotLight('#FFE2A0', 0, 9, .7, .5, 1); glow.position.copy(L.position); glow.target.position.set(L.position.x, 0, 3); sc.add(glow, glow.target);
    if (END) { lamps[lit].userData.b.material = mat('#FFF6C0', { emissive: '#FFE7A0', emissiveIntensity: 2 }); L.intensity = 30; glow.intensity = 40 }
    const ban = END ? (() => { const g = group(sc, [-18 + lit * 4 + 1.6, 0, -.2]); [-1.2, 1.2].forEach(x => g.add(mesh(G.box(.08, 2.4, .08), '#6E6E6E', [x, 1.2, 0]))); g.add(mesh(G.box(2.6, .7, .05), '#B5452B', [0, 2.2, 0])); return g })() : null;
    const ppl = [warga.pkk([-1.2, 0, 2.2]), warga.bapak([.2, 0, 2.6]), warga.pemuda([1.6, 0, 2.1])]; ppl.forEach(p => sc.add(p)); const torches = ppl.map(p => { const T = new THREE.SpotLight('#E8F4FF', 10, 7, .4, .6, 1); T.position.set(0, 1.2, .3); T.target.position.set(0, 0, 3); p.add(T, T.target); return T });
    const cam = camera(42); const banT = ban ? tag3(root, 'TANGGAP CEPAT ✔', RED) : null; const litT = END ? tag3(root, 'titik video viral', GOLD) : null;
    const hook = END ? null : X.ab({ left: 60, top: 300, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '18px', padding: '20px 26px', fontSize: '52px', lineHeight: 1.15, textAlign: 'center', color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${RED}` }, root, `Lapor 12 kali: dibalas stiker.<br><span style="color:${RED}">Viral sekali: langsung datang.</span>`);
    const q = END ? X.ab({ left: 60, top: 300, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '18px', padding: '20px 26px', fontSize: '48px', lineHeight: 1.15, textAlign: 'center', color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${RED}`, opacity: 0 }, root, `Di tempat lo, harus viral dulu<br><span style="color:${RED}">baru diurus?</span>`) : null;
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur));
      if (END) { cam.position.set(lerp(-6, 4, p), lerp(3, 7, p), lerp(12, 16, p)); cam.lookAt(lerp(-2, 0, p), 1.5, 2) } else { cam.position.set(lerp(-5, -1, p), 3.4, lerp(13, 11.5, p)); cam.lookAt(-1, 1.8, 2) }
      ppl.forEach((w, i) => { w.position.x = [-1.2, .2, 1.6][i] + (END ? 0 : -t * .25); w.pose(t + i, { walk: END ? 0 : 1, hold: true, look: END ? .3 : Math.sin(t + i) * .3 }); torches[i].intensity = 10 + Math.sin(t * 9 + i) * 2 });
      if (banT) banT.at(ban, cam, [0, 2.8, 0], seg(t, .6, 1)); if (litT) litT.at(lamps[lit], cam, [-.5, 4.6, 0], seg(t, at(s, 'cuma satu', 2), at(s, 'cuma satu', 2) + .4));
      if (hook) X.pop(hook, seg(t, .1, .5)); if (q) { const tq = at(s, 'Di tempat lo', dur - 3); X.pop(q, seg(t, tq, tq + .4)) } } };
  },
  BL_WAGROUP(s, root) {   // HP raksasa di meja teras: grup warga, aduan berulang dibalas stiker / dibaca saja
    const sc = newScene(Object.assign({}, SUNSET, { sky: ['#F4C892', '#FFF4E3'] })); sc.add(mesh(G.box(10, .2, 8), '#B98B5E', [0, -.1, 0])); sc.add(mesh(G.box(10, 5, .2), '#F3E1C4', [0, 2.5, -3])); sc.add(mesh(G.box(3, .1, 1.6), '#7A5230', [0, .8, -1])); sc.add(mesh(G.box(.1, .8, .1), '#5A3A20', [-1.3, .4, -1.6]));
    sc.add(mesh(G.cyl(.12, .1, .2, 10), '#FFF', [1, .95, -.8])); const W = warga.pkk([1.8, 0, -1.6]); sc.add(W); W.rotation.y = -.5;
    const msgs = X.TL.vars.wa; const c = document.createElement('canvas'); c.width = 600; c.height = 1100; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#ECE5DA'; x.fillRect(0, 0, 600, 1100); x.fillStyle = '#2E7D5B'; x.fillRect(0, 0, 600, 120); x.fillStyle = '#fff'; x.font = '700 38px Fredoka'; x.fillText('Warga Gang Melati', 26, 58); x.font = '600 26px Fredoka'; x.fillText('+ perangkat desa', 26, 98);
      let y = 150; msgs.slice(0, n).forEach(([who, m, me]) => { x.font = '600 32px Fredoka'; const h = 96; x.fillStyle = me ? '#DCF8C6' : '#FFFFFF'; x.beginPath(); x.roundRect(me ? 120 : 22, y, 450, h, 18); x.fill(); x.fillStyle = me ? '#2E7D5B' : RED; x.font = '700 24px Fredoka'; x.fillText(who, (me ? 140 : 42), y + 30); x.fillStyle = INK; x.font = '600 32px Fredoka'; x.fillText(m, (me ? 140 : 42), y + 72); y += h + 14 }); tex.needsUpdate = true };
    draw(0); const P = group(sc, [.15, 2.3, .2]); P.add(mesh(G.box(1.6, 2.9, .1), '#1B1B1F', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(1.48, 2.72), new THREE.MeshBasicMaterial({ map: tex })); scr.position.z = .055; P.add(scr);
    const cam = camera(42); const cnt = chip(root, '📅 3 bulan · 12 laporan', { left: 70, top: 300 }, RED);
    return { scene: sc, cam, upd(t, dur) { draw(Math.min(msgs.length, Math.ceil(seg(t, .3, dur * .85) * msgs.length))); const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.6, .3, p), 2.4, lerp(8.2, 7.4, p)); cam.lookAt(.2, 1.9, -.4); P.rotation.y = .08; W.pose(t, { look: -.4, shake: t > dur * .7 }); X.pop(cnt, seg(t, 1, 1.4)) } };
  },
  BL_VIRAL(s, root) {   // pagi: penghitung tontonan melonjak, tiga mobil datang, satu lampu diganti dan difoto dari empat sudut
    const sc = newScene(Object.assign({}, SUNSET, { sky: ['#9FD3F0', '#FFF4E3'], sunPos: [8, 12, 6] })); village(sc);
    const cars = [0, 1, 2].map(i => { const g = group(sc, [20, 0, 1.6]); g.add(mesh(G.box(2.2, .7, 1.1), ['#F4F4F4', '#2B2B2B', '#F4F4F4'][i], [0, .55, 0])); g.add(mesh(G.box(1.3, .5, 1), '#9FD3F0', [-.1, 1.1, 0])); [-.7, .7].forEach(x => [-.55, .55].forEach(z => g.add(mesh(G.cyl(.22, .22, .12, 12), '#222', [x, .22, z], { rot: [Math.PI / 2, 0, 0] })))); return g });
    const pole = group(sc, [-2, 0, 3.8]); pole.add(mesh(G.cyl(.06, .08, 4, 8), '#6E6E6E', [0, 2, 0])); pole.add(mesh(G.box(.7, .1, .25), '#555', [-.3, 4, 0])); const lad = mesh(G.box(.5, 3.6, .1), '#C9A35A', [-.3, 1.8, -.4], { rot: [.15, 0, 0] }); pole.add(lad);
    const crew = [warga.bapak([-2.4, 0, 2.6], { body: '#C9B27A' }), warga.bapak([-1, 0, 5.4], { body: '#C9B27A', prop: 'clipboard' }), warga.pemuda([1, 0, 5.2]), warga.bapak([-3.6, 0, 5.2], { body: '#C9B27A' })]; crew.forEach(c => sc.add(c));
    const cam = camera(42); const views = X.ab({ left: 60, top: 300, width: 960, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '96px', color: '#fff', WebkitTextStroke: `14px ${INK}`, paintOrder: 'stroke fill' }, root);
    const flash = X.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#fff', opacity: 0 }, root); const c4 = chip(root, '📸 difoto dari 4 sudut', { left: 70, top: 470 });
    return { scene: sc, cam, upd(t, dur) { const tv = at(s, 'satu juta', 2.5), tm = at(s, 'tiga mobil', dur * .4), tf = at(s, 'difoto', dur * .7);
      views.innerHTML = `👁 ${Math.round(lerp(87, 1000000, E.in(seg(t, .3, tv + .3)))).toLocaleString('id-ID')}<div style="font-size:42px;-webkit-text-stroke:8px ${INK}">kali ditonton</div>`; views.style.opacity = t < tm + 1 ? 1 : 0;
      cars.forEach((g, i) => g.position.x = lerp(20, 3 + i * 2.6, E.out(seg(t, tm + i * .4, tm + i * .4 + 1.6))));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(9, 4, p), lerp(4, 3, p), 13); cam.lookAt(lerp(2, -1.5, p), 1.6, 3);
      crew.forEach((c, i) => { c.visible = t > tm + 1; c.pose(t + i, { point: i === 1, hold: i === 1, look: -.6 }) });
      const fl = t > tf ? Math.max(0, 1 - ((t - tf) % .7) / .15) * (t < tf + 2.8 ? 1 : 0) : 0; flash.style.opacity = fl * .7; X.pop(c4, seg(t, tf, tf + .4)) } };
  },
};

// tampilan tetap: papan "LIPUTAN WARGA", judul berita bawah, transisi surat edaran berstempel
let bug, ticker, sheet;
export function chrome(ctx) {
  bug = ctx.ab({ left: 36, top: 60, zIndex: 8, display: 'flex', alignItems: 'stretch', fontFamily: 'Fredoka', fontWeight: 700, boxShadow: '0 8px 0 #00000040' }, ctx.ov,
    `<div style="background:${RED};color:#fff;font-size:40px;padding:12px 22px">LIPUTAN WARGA</div><div style="background:${CREAM};color:${INK};font-size:34px;padding:16px 20px;border:5px solid ${RED}">Desa Bocor Indah</div>`);
  bug.style.position = 'absolute';
  ticker = ctx.ab({ left: 0, top: 1300, width: 1080, zIndex: 7 }, ctx.ov);
  sheet = ctx.ab({ left: 90, top: 0, width: 900, height: 1300, background: '#FDF6E3', border: `6px solid ${INK}`, zIndex: 9, display: 'none', boxShadow: '0 30px 60px #00000060', fontFamily: 'Fredoka', color: INK }, ctx.ov,
    `<div style="padding:70px 70px;font-size:44px;font-weight:700;text-align:center">SURAT EDARAN<div style="height:6px;background:${INK};margin:20px 0 40px"></div></div>${Array.from({ length: 9 }, (_, i) => `<div style="height:22px;background:#E4D8BF;margin:26px 70px;width:${60 + (i * 13) % 30}%"></div>`).join('')}<div style="position:absolute;right:90px;bottom:120px;border:10px solid ${RED};color:${RED};font-size:70px;font-weight:700;padding:6px 26px;transform:rotate(-14deg);border-radius:12px">DIUMUMKAN</div>`);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const interview = s.type === 'BL_INTERVIEW';
  const q = seg(t, .2, .6);
  ticker.style.display = interview ? 'none' : 'block';
  ticker.innerHTML = `<div style="display:inline-flex;font-family:Fredoka;font-weight:700;transform:translateX(${(1 - E.out(q)) * -1100}px)"><div style="background:${INK};color:${GOLD};font-size:38px;padding:10px 22px">${s.kicker}</div><div style="background:${CREAM};color:${INK};font-size:38px;padding:10px 24px;border:4px solid ${INK}">${s.sub}</div></div>`;
  ticker.style.left = '60px';
  let w = -1; X.TL.scenes.forEach((x, i) => { if (i) { const p = (T - (x.start - .35)) / .7; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { sheet.style.display = 'none'; return }
  sheet.style.display = 'block'; const y = lerp(1950, -1400, E.inout(w)); sheet.style.top = y + 'px'; sheet.style.transform = `rotate(${lerp(-6, 4, w)}deg)`;
}

// Shot Kerajaan Berdasi S1 Ep 1 "Masuk Lubang" (lihat STORYBOARD.md). HUD di-set tiap frame (gold/HP/XP berubah).
import { THREE, lerp, seg, E, mesh, G, group, camera, person, newScene } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { belang, catHead, tikusRaksasa, BIG, POP, show, pulse, ease, tagAt, setHUD, FONT, ORANGE, PARCH, INK, NAVY } from '../_s1/dunia.js';

const V = () => X.TL.vars;
// suasana bawah tanah tetap TERANG: hemi kuat + lentera hangat
const GUA = o => newScene(Object.assign({ bg: '#E9C9A0', hemi: 1.9, hemiSky: '#FFF0D8', hemiGround: '#B07A4A', sun: '#FFE2B0', sunI: 1.6, sunPos: [3, 12, 6], shadow: 14, fog: ['#E9C9A0', 30, 90] }, o));
const WARGA = [['#9AA0A8', '#6E747C', '#3E86B0'], ['#F4F0E6', null, '#D9603B'], ['#3A3A40', null, '#6E9A5C'], ['#E8C89A', '#B8875A', '#B84E7A']];
function netizen(sc, p, i) { const [sk, st, bd] = WARGA[i % 4]; const g = person(sc, p, { body: bd, pants: '#3B3B4F', skin: sk }); catHead(g, { skin: sk, stripe: st }); return g }
function terowongan(sc, len = 70, o = {}) {   // terowongan tanah berlentera (sumbu -z), lantai papan
  const g = group(sc, [0, 0, 0]); const tube = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, len, 18, 1, true), new THREE.MeshStandardMaterial({ color: '#C08A58', roughness: .95, side: THREE.BackSide, flatShading: true }));
  tube.rotation.x = Math.PI / 2; tube.position.set(0, 1.9, -len / 2 + 30); tube.receiveShadow = true; g.add(tube);
  g.add(mesh(G.box(3.4, .2, len), '#9C6B3E', [0, -.1, -len / 2 + 30]));
  for (let z = 28; z > -len + 30; z -= 3.2) { [-1, 1].forEach(sx => { const l = group(g, [sx * 2.2, 2.4, z + (sx > 0 ? 1.6 : 0)]); l.add(mesh(G.box(.1, .5, .1), '#5A3E22', [0, -.3, 0])); l.add(new THREE.Mesh(G.sph(.2, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFD27A' }))) }) }
  for (let k = 0; k < 4; k++) { const L = new THREE.PointLight('#FFC870', 30, 18, 1.2); L.position.set(0, 2.6, 2 - k * 12); g.add(L) }
  return g;
}
function tulangIkan(parent, p, s = 1, rot = 0) {   // duri ikan: tulang belakang + rusuk runcing + kepala
  const g = group(parent, p); g.scale.setScalar(s); g.rotation.set(0, rot, 0); const C = '#F4F0E2';
  g.add(mesh(G.cyl(.04, .04, 1.4, 6), C, [0, .05, 0], { rot: [0, 0, Math.PI / 2] })); for (let i = 0; i < 6; i++) [-1, 1].forEach(sy => g.add(mesh(G.cone(.03, .4, 4), C, [-.5 + i * .2, .05 + sy * .2, 0], { rot: [0, 0, sy > 0 ? 0 : Math.PI] })));
  g.add(mesh(G.cone(.2, .35, 5), C, [.82, .05, 0], { rot: [0, 0, -Math.PI / 2] })); g.add(mesh(G.cone(.18, .25, 3), C, [-.8, .05, 0], { rot: [0, 0, Math.PI / 2] })); return g;
}
function tikusPengawal(sc, p) { const T = tikusRaksasa(sc, p, .55); const hd = T.userData.hd; hd.add(mesh(G.sph(1.05, 16, 10, 0, Math.PI * 2, 0, Math.PI * .45), '#9AA3AC', [0, .35, 0], { mat: { metalness: .6, roughness: .35, flatShading: false } }));
  const sp = group(T, [1.8, 1.4, 1]); sp.add(mesh(G.cyl(.08, .08, 4.4, 6), '#7A5A3A', [0, 0, 0])); sp.add(mesh(G.cone(.22, .6, 4), '#C9CED6', [0, 2.5, 0], { mat: { metalness: .7 } })); T.userData.tombak = sp; return T }
const bossBar = (root, hp) => X.ab({ left: 90, top: 330, width: 900, fontFamily: FONT, fontWeight: 800, opacity: 0 }, root, '');
const drawBoss = (e, hp) => { e.innerHTML = `<div style="text-align:center;color:#FFD3C8;font-size:38px;text-shadow:0 4px 0 ${INK}">👹 TIKUS PENGAWAL <span style="color:${ORANGE}">Lv 3</span></div><div style="height:30px;background:#0008;border:4px solid ${PARCH};border-radius:16px;margin-top:8px;overflow:hidden"><div style="height:100%;width:${Math.round(hp * 100)}%;background:linear-gradient(#FF6B5E,#B5302A)"></div></div>` };
const fly = (root, txt, col = '#FFD45E', top = 520) => X.ab({ left: 0, top, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '90px', color: col, textShadow: `0 6px 0 ${INK}, 0 14px 30px #0008`, opacity: 0 }, root, txt);
const floatUp = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 && q < 1 ? 1 - Math.max(0, q - .7) / .3 : 0; e.style.transform = `translateY(${-q * 120}px) scale(${.8 + .3 * E.back(Math.min(1, q * 3))})` };

export const SHOTS = {
  H1_JATUH(s, root) {   // frame 1: Belang meluncur telentang ke arah kamera di terowongan miring berlentera
    const sc = GUA(); const T = terowongan(sc); const J = belang([0, .35, -6]); sc.add(J); J.rotation.x = -1.1;
    const dust = Array.from({ length: 14 }, (_, i) => { const m = mesh(G.sph(.07, 6, 5), '#F2DDBE', [0, -5, 0], { cast: false, mat: { transparent: true, opacity: .35 } }); sc.add(m); return m });
    const cam = camera(48);
    const q = X.ab({ left: 0, top: 300, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, opacity: 1 }, root,
      `<div style="display:inline-block;background:${PARCH};border:6px solid #8A5A2A;border-radius:18px;padding:8px 34px 14px;box-shadow:0 12px 26px #0008"><div style="font-size:30px;letter-spacing:6px;color:#B5452B">QUEST DITERIMA</div><div style="font-size:92px;line-height:1;color:${INK}">MASUK LUBANG</div></div>`);
    const v = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '50px', color: '#FFFFFF', textShadow: `0 4px 0 ${INK}`, opacity: 0 }, root, '🗳 A <span style="color:#FFD45E">2</span> : <span style="color:#FFD45E">1</span> B');
    const aa = fly(root, 'AAAAAA!', '#FFFFFF', 760);
    return { scene: sc, cam, upd(t, dur) { setHUD(V().hud); const z = -6 + t * 4.2; J.position.z = z; J.position.x = Math.sin(t * 3) * .5; J.rotation.z = Math.sin(t * 6) * .15; J.pose(t, { cheer: true, talk: true }); J.userData.st.legs.forEach((L, i) => L.rotation.x = -.4 + Math.sin(t * 12 + i) * .5);
      dust.forEach((d, i) => { const k = ((t * 1.4 + i / 24) % 1); d.position.set(J.position.x + Math.sin(i * 2.3) * 1.2, .1 + k * .6, z - .8 - k * 3); d.scale.setScalar(.5 + k) });
      const sh = Math.sin(t * 50) * .04; cam.position.set(sh + J.position.x * .4, 1.7, z + 4.6); cam.lookAt(J.position.x * .6, .9, z - 2); cam.rotation.z += Math.sin(t * 4) * .06;
      q.style.transform = `scale(${1 + Math.sin(t * 9) * .02})`; show(v, seg(t, .4, .7)); show(aa, seg(t, .1, .3) * (1 - seg(t, 2.2, 2.6)), 0) } };
  },
  H1_GUILD(s, root) {   // 4 anggota Guild Netizen turun dengan berkas cahaya; koin terbang
    const sc = GUA(); terowongan(sc, 40); const J = belang([0, 0, -2]); J.rotation.y = .2; sc.add(J);
    const N = [0, 1, 2, 3].map(i => { const g = netizen(sc, [-2.4 + i * 1.6 + (i > 1 ? .6 : 0), 0, -4.5 - (i % 2) * .8], i); g.rotation.y = 0; return g });
    const beams = N.map(g => { const b = new THREE.Mesh(new THREE.CylinderGeometry(.6, .8, 8, 16, 1, true), new THREE.MeshBasicMaterial({ color: '#FFF1B8', transparent: true, opacity: .5, depthWrite: false, side: THREE.DoubleSide })); b.position.set(g.position.x, 4, g.position.z); sc.add(b); return b });
    const coins = Array.from({ length: 13 }, (_, i) => { const m = mesh(G.cyl(.16, .16, .04, 14), '#F5C542', [0, -5, 0], { mat: { metalness: .6, roughness: .3 } }); sc.add(m); return m });
    const cam = camera(44); const tg = N.map((g, i) => tagAt(root, `#${i + 1} netizen`, { fontSize: '26px' }));
    const g4 = BIG(root, `+${V().guild} GUILD NETIZEN`, { top: 330, fontSize: '80px' }); const gc = fly(root, `+${V().gold} 🪙`, '#FFD45E', 470);
    return { scene: sc, cam, upd(t, dur) { const tg0 = at(s, 'anggota', 1.4), tgld = at(s, 'gold', dur - 1.6); const pr = { ...V().hud, gold: Math.round(V().gold * seg(t, tgld - .4, tgld + .8)) }; setHUD(pr);
      N.forEach((g, i) => { const t0 = .3 + i * .35, q = seg(t, t0, t0 + .6); g.scale.setScalar(Math.max(.001, E.back(q))); g.pose(t + i, { wave: q >= 1, bounce: true }); beams[i].material.opacity = .5 * (1 - seg(t, t0 + .4, t0 + 1.2)) });
      coins.forEach((c, i) => { const q = seg(t, tgld - .3 + i * .05, tgld + .5 + i * .05); c.visible = q > 0 && q < 1; c.position.set(lerp(Math.sin(i * 2) * 1.5, -2.8, q), lerp(.3 + (i % 3) * .3, 5.5, q), lerp(-3, 1, q)); c.rotation.set(t * 8, t * 5, 0) });
      J.pose(t, { cheer: t > tgld, talk: true }); const p = ease(t, 0, dur); cam.position.set(lerp(1.2, .4, p), 1.9, lerp(4.4, 3.6, p)); cam.lookAt(0, 1.1, -3.4);
      N.forEach((g, i) => tg[i](g, cam, [0, 2.1, 0], seg(t, .9 + i * .35, 1.2 + i * .35))); show(g4, seg(t, tg0 - .2, tg0 + .2)); floatUp(gc, seg(t, tgld, tgld + 1.6)) } };
  },
  H1_DURI(s, root) {   // lorong duri ikan: Belang melompat di antara tulang, tertusuk -2 HP
    const sc = GUA({ bg: '#EED2AE' }); terowongan(sc, 60); const B = []; for (let i = 0; i < 26; i++) { const z = -2 - i * 1.6, x = ((i * 37) % 5) * .7 - 1.4; B.push(tulangIkan(sc, [x, .05, z], .9 + (i % 3) * .2, i * .7)); if (i % 3 === 0) [-1, 1].forEach(sx => { const sp = tulangIkan(sc, [sx * 2.1, 1.6, z], 1, 0); sp.rotation.z = sx * 1.3 }) }
    for (let i = 0; i < 40; i++) sc.add(mesh(G.cone(.08, .5, 4), '#F4F0E2', [((i * 53) % 9) * .4 - 1.6, .25, -3 - i * 1.1], { cast: false }));
    const J = belang([0, 0, 0]); sc.add(J); const N = [0, 1, 2, 3].map(i => netizen(sc, [0, 0, 0], i)); const cam = camera(42);
    const hit = fly(root, '-2 HP', '#FF8A80', 560); const tl = X.ab({ left: 0, top: 330, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '64px', color: PARCH, textShadow: `0 5px 0 ${INK}`, opacity: 0 }, root, '🦴 IKAN RAKYAT = TULANG');
    return { scene: sc, cam, upd(t, dur) { const th = at(s, 'duri', 1.3); setHUD(t > th + .3 ? V().hud_duri : V().hud); const z = -t * 2.6; J.position.set(Math.sin(t * 2) * .5, Math.abs(Math.sin(t * 5)) * .6, z); J.rotation.y = Math.PI; J.pose(t, { walk: 1.5, shake: t > th + .3 && t < th + 1.3 });
      N.forEach((g, i) => { g.position.set(-1 + (i % 2) * 2, 0, z + 6 + i * .9); g.rotation.y = Math.PI; g.pose(t + i, { walk: 1.5 }) });
      const p = ease(t, 0, dur); cam.position.set(lerp(2.0, 1.6, p), lerp(2.4, 1.6, p), z + 4.5); cam.lookAt(J.position.x * .5, .8, z - 2.5); floatUp(hit, seg(t, th + .3, th + 1.7)); const tt = at(s, 'tulangnya', dur - 1.6); show(tl, seg(t, tt - .2, tt + .2)) } };
  },
  H1_BOS(s, root) {   // ruang bundar: tikus pengawal (helm + tombak) muncul; Belang terpental, HP tinggal 3
    const sc = GUA({ bg: '#E6C39A' }); const room = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 9, 24, 1, true), new THREE.MeshStandardMaterial({ color: '#C08A58', side: THREE.BackSide, roughness: .95, flatShading: true })); room.position.y = 4; sc.add(room);
    sc.add(mesh(G.cyl(9, 9, .2, 24), '#A0744A', [0, -.1, 0])); for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; { const m = new THREE.Mesh(G.sph(.25, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFD27A' })); m.position.set(Math.cos(a) * 8.6, 3.2, Math.sin(a) * 8.6); sc.add(m) } }
    [[0, 6, 0], [4, 4, 4], [-4, 4, -2]].forEach(p => { const L = new THREE.PointLight('#FFC870', 40, 22, 1.2); L.position.set(...p); sc.add(L) });
    for (let i = 0; i < 14; i++) tulangIkan(sc, [Math.cos(i) * 6, .05, Math.sin(i * 1.7) * 6], 1.2, i);
    const R = tikusPengawal(sc, [0, 0, -3.6]); R.rotation.y = 0; const J = belang([0, 0, 2.6]); J.rotation.y = Math.PI; sc.add(J); const N = [0, 1, 2, 3].map(i => { const g = netizen(sc, [[-4.2, -2.8, 2.8, 4.2][i], 0, 3.6 + (i % 2) * .8], i); g.rotation.y = Math.PI + (i < 2 ? .4 : -.4); return g });
    const cam = camera(42); const bb = bossBar(root); const vs = POP(root, `Lv <span style="color:#B5452B">3</span> &nbsp;vs&nbsp; Lv <span style="color:#B5452B">1</span> + 🥄`, { top: 470, width: 700, left: 190 }); const ow = fly(root, '-5 HP', '#FF8A80', 640);
    return { scene: sc, cam, upd(t, dur) { const tr = at(s, 'tikus pengawal', .8), ts = at(s, 'sendok', dur - 1.6); const rise = E.out(seg(t, tr - .4, tr + 1)); R.position.y = lerp(-3, 0, rise); R.userData.hd.rotation.x = Math.sin(t * 4) * .1; R.userData.tombak.rotation.x = Math.sin(t * 3) * .3;
      const kb = seg(t, ts - .2, ts + .4); J.position.z = 2.6 + E.out(kb) * 2; J.rotation.x = -kb * .6 * (1 - seg(t, ts + .6, ts + 1.2)); setHUD(t > ts ? V().hud_bos : V().hud_duri); J.pose(t, { hold: t < ts, shake: t > ts });
      N.forEach((g, i) => g.pose(t + i, { shake: t > ts })); drawBoss(bb, 1); show(bb, seg(t, tr, tr + .3));
      const p = ease(t, 0, dur); cam.position.set(lerp(3.6, 2.6, p), lerp(1.2, 1.5, p), lerp(9.5, 8.8, p)); cam.lookAt(0, lerp(1.4, 1.9, rise), -1.5); show(vs, seg(t, at(s, 'Level tiga', 2.4), at(s, 'Level tiga', 2.4) + .3) * (1 - seg(t, ts - .3, ts))); floatUp(ow, seg(t, ts, ts + 1.4)) } };
  },
  H1_MENANG(s, root) {   // guild berteriak, Belang lompat, CRITICAL HIT dengan sendok, tikus roboh, +5 XP
    const sc = GUA({ bg: '#E6C39A' }); const room = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 9, 24, 1, true), new THREE.MeshStandardMaterial({ color: '#C08A58', side: THREE.BackSide, roughness: .95, flatShading: true })); room.position.y = 4; sc.add(room); sc.add(mesh(G.cyl(9, 9, .2, 24), '#A0744A', [0, -.1, 0]));
    [[0, 6, 0], [4, 4, 4], [-4, 4, -2]].forEach(p => { const L = new THREE.PointLight('#FFC870', 40, 22, 1.2); L.position.set(...p); sc.add(L) });
    const R = tikusPengawal(sc, [0, 0, -3.6]); const J = belang([0, 0, 3]); J.rotation.y = Math.PI; sc.add(J); const N = [0, 1, 2, 3].map(i => { const g = netizen(sc, [[-4.2, -2.8, 2.8, 4.2][i], 0, 3.6 + (i % 2) * .8], i); g.rotation.y = Math.PI + (i < 2 ? .4 : -.4); return g });
    const glint = new THREE.Mesh(G.sph(.15, 8, 6), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); J.userData.sendok.add(glint);
    const cam = camera(42); const bb = bossBar(root); const sh = ['GAS BELANG!', 'AYO!!', 'SENDOKIN!', 'GASSS'].map((x, i) => X.ab({ left: 70 + (i % 2) * 520, top: 1040 + Math.floor(i / 2) * 110, background: '#FFFFFF', color: INK, borderRadius: '30px', padding: '10px 24px', fontFamily: FONT, fontWeight: 800, fontSize: '44px', border: `4px solid ${INK}`, boxShadow: '0 8px 0 #0006', opacity: 0 }, root, x));
    const cr = fly(root, 'CRITICAL HIT!', '#FFD45E', 520); const xp = fly(root, `+${V().xp_bos} XP`, '#8EC9FF', 650); const mt = BIG(root, 'MENANG TIPIS!', { top: 470, fontSize: '96px' });
    return { scene: sc, cam, upd(t, dur) { const tg = at(s, 'teriak', 2), tc = at(s, 'titik lemahnya', dur - 2.6), tm = at(s, 'Menang', dur - 1.4);
      setHUD(t > tm ? V().hud_menang : V().hud_bos); N.forEach((g, i) => g.pose(t + i, { cheer: t > tg, bounce: t > tg })); sh.forEach((e, i) => pulse(e, seg(t, tg + i * .15, tg + i * .15 + .3) * (1 - seg(t, tc + .6, tc + 1))));
      const jp = seg(t, tc - .8, tc); J.position.set(0, Math.sin(jp * Math.PI) * 2.2, lerp(3, -.8, jp)); J.pose(t, { cheer: jp > 0 && jp < 1, talk: t < tg }); glint.scale.setScalar(Math.max(.001, Math.sin(seg(t, tc - .1, tc + .4) * Math.PI) * 4));
      const fall = E.in(seg(t, tc + .2, tc + 1)); R.rotation.z = fall * 1.4; R.position.y = -fall * .5; drawBoss(bb, 1 - seg(t, tc, tc + .3) * .99 - .0); show(bb, 1 - seg(t, tc + 1.2, tc + 1.5));
      const a = lerp(-.7, .7, ease(t, 0, dur)); const shk = t > tc && t < tc + .3 ? Math.sin(t * 80) * .1 : 0; cam.position.set(Math.sin(a) * 9.5 + shk, 4.2, Math.cos(a) * 9.5 + 1); cam.lookAt(0, 1.2, 0);
      pulse(cr, seg(t, tc, tc + .2) * (1 - seg(t, tm - .3, tm))); pulse(mt, seg(t, tm, tm + .3)); floatUp(xp, seg(t, tm + .1, tm + 1.6)) } };
  },
  H1_DAPUR(s, root) {   // dapur istana cerah: Belang muncul dari lubang lantai; tumpukan ikan & peti bercap dasi raja
    const sc = newScene({ bg: '#F3E6CC', hemi: 1.8, hemiSky: '#FFF6E6', hemiGround: '#C9A47A', sun: '#FFE8C0', sunI: 2.2, sunPos: [6, 14, 8], shadow: 16 });
    sc.add(mesh(G.box(30, .2, 30), '#C9B48A', [0, -.1, 0])); for (let x = -15; x < 15; x += 1.5) for (let z = -15; z < 15; z += 1.5) if ((x + z) % 3 === 0) sc.add(mesh(G.box(1.45, .02, 1.45), '#BFA77A', [x + .75, .01, z + .75], { cast: false }));
    sc.add(mesh(G.box(30, 9, .4), '#EADFC8', [0, 4.5, -10])); sc.add(mesh(G.box(.4, 9, 30), '#E2D6BC', [-10, 4.5, 0])); sc.add(mesh(G.box(.4, 9, 30), '#E2D6BC', [10, 4.5, 0]));
    const hearth = group(sc, [-6, 0, -9]); hearth.add(mesh(G.box(4, 3, 1.5), '#B8A890', [0, 1.5, 0])); hearth.add(mesh(G.box(2.4, 1.4, .3), '#3A2A1E', [0, 1, .65])); { const m = new THREE.Mesh(G.cone(.6, 1.2, 8), new THREE.MeshBasicMaterial({ color: '#FFA530' })); m.position.set(0, 1.1, .7); hearth.add(m) } const fl = new THREE.PointLight('#FFB060', 40, 18, 1.2); fl.position.set(-6, 2, -7); sc.add(fl);
    const stamp = (c, W, H) => { c.fillStyle = '#B88A52'; c.fillRect(0, 0, W, H); c.strokeStyle = '#7A5230'; c.lineWidth = 10; c.strokeRect(0, 0, W, H); c.fillStyle = '#B5302A'; c.beginPath(); c.moveTo(W / 2 - 30, H * .22); c.lineTo(W / 2 + 30, H * .22); c.lineTo(W / 2 + 12, H * .32); c.lineTo(W / 2 + 34, H * .7); c.lineTo(W / 2, H * .8); c.lineTo(W / 2 - 34, H * .7); c.lineTo(W / 2 - 12, H * .32); c.closePath(); c.fill(); c.fillStyle = '#3E2A18'; c.font = `800 ${H * .14}px Baloo`; c.textAlign = 'center'; c.fillText('MILIK RAJA', W / 2, H * .96) };
    const crates = []; for (let i = 0; i < 12; i++) { const x = -4 + (i % 4) * 2.2, z = -6 + Math.floor(i / 4) * 2.1 - (i % 2) * .3, y = 0; const c = group(sc, [x + 2, y, z]); c.add(mesh(G.box(1.6, 1.3, 1.6), '#A0703E', [0, .65, 0])); const st = canvasPlane(1.4, 1.1, stamp, 256); st.position.set(0, .65, .81); c.add(st); crates.push(c) }
    const fishG = new THREE.SphereGeometry(.25, 10, 8); const fm = new THREE.InstancedMesh(fishG, new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .4, metalness: .2 }), 260); const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), C = new THREE.Color();
    [[5.5, -3, 2.6], [-3, -2, 2.2], [6.5, -7, 2]].forEach(([cx, cz, r], h) => { for (let i = 0; i < 86; i++) { const a = i * 2.39, d = Math.sqrt(i / 86) * r; const y = (1 - d / r) * r * .9 + .2; Q.setFromEuler(new THREE.Euler(0, a, .3)); M.compose(new THREE.Vector3(cx + Math.cos(a) * d, y, cz + Math.sin(a) * d), Q, new THREE.Vector3(1.8, .7, .9)); fm.setMatrixAt(h * 86 + i, M); fm.setColorAt(h * 86 + i, C.set(['#9FB8C8', '#C8D4DC', '#7FA0B8', '#E0B070'][i % 4])) } }); fm.castShadow = true; sc.add(fm);
    const hole = mesh(G.cyl(.9, .9, .05, 18), '#2A1A10', [0, .02, 3.5], { cast: false }); sc.add(hole); const J = belang([0, -1.8, 3.5]); J.rotation.y = Math.PI; sc.add(J);
    const cam = camera(44); const t1 = BIG(root, '🐟 IKAN RAKYAT DI SINI', { top: 330, fontSize: '66px' }); const cap = POP(root, '👔 CAP: <span style="color:#B5302A">MILIK RAJA</span>', { top: 460, width: 640, left: 220, fontSize: '50px' });
    return { scene: sc, cam, upd(t, dur) { setHUD(V().hud_menang); const up = E.out(seg(t, .2, 1.2)); J.position.y = lerp(-1.8, 0, up); J.position.z = 3.5 - seg(t, 1.4, 3) * 1.2; J.pose(t, { walk: t > 1.4 && t < 3 ? 1 : 0, shake: t > at(s, 'dasi raja', dur - 1.5) });
      const p = ease(t, 0, dur); const tn = at(s, 'numpuk', dur * .5); cam.position.set(lerp(1, 4.5, p), lerp(1.3, 4.2, p), lerp(7.5, 9.5, p)); cam.lookAt(lerp(0, 2, p), lerp(.6, 1.2, p), lerp(3, -4, p));
      show(t1, seg(t, tn - .3, tn + .2)); const td = at(s, 'dasi raja', dur - 1.5); pulse(cap, seg(t, td - .1, td + .25)) } };
  },
  H1_AJAK(s, root) {   // Belang mengintip dari balik peti; jendela quest 3 pilihan + pilih kerajaan
    const sc = newScene({ bg: '#F3E6CC', hemi: 1.8, hemiSky: '#FFF6E6', hemiGround: '#C9A47A', sun: '#FFE8C0', sunI: 2.2, sunPos: [6, 14, 8], shadow: 12 });
    sc.add(mesh(G.box(20, .2, 20), '#C9B48A', [0, -.1, 0])); sc.add(mesh(G.box(20, 9, .4), '#EADFC8', [0, 4.5, -6]));
    const cr = group(sc, [.6, 0, 0]); cr.add(mesh(G.box(2, 1.5, 1.6), '#A0703E', [0, .75, 0])); const cr2 = group(sc, [-1.6, 0, -.4]); cr2.add(mesh(G.box(1.6, 1.3, 1.6), '#A0703E', [0, .65, 0]));
    const J = belang([1.9, 0, .2]); J.rotation.y = .4; sc.add(J); const cam = camera(42);
    const chips = X.ab({ left: 30, top: 330, width: 1020, textAlign: 'center', fontFamily: FONT, fontWeight: 800, opacity: 0 }, root,
      `<div style="font-size:30px;color:${PARCH};text-shadow:0 4px 0 ${INK};letter-spacing:3px">KOMEN KERAJAANMU (0 YANG MILIH!)</div><div style="display:flex;gap:10px;justify-content:center;margin-top:10px">` + ['🐱 KUCING', '🦅 BURUNG', '🦎 REPTIL', '🐺 SERIGALA'].map(x => `<div style="background:${NAVY}EE;color:${PARCH};border:3px solid ${ORANGE};border-radius:14px;padding:8px 14px;font-size:32px">${x}</div>`).join('') + '</div>');
    const q = X.ab({ left: 70, top: 1060, width: 940, opacity: 0, fontFamily: FONT, fontWeight: 800, background: PARCH, border: '6px solid #8A5A2A', borderRadius: '20px', padding: '14px 22px', boxShadow: '0 14px 30px #00000070' }, root,
      `<div style="font-size:26px;letter-spacing:5px;color:#B5452B;text-align:center">QUEST BERIKUTNYA · PILIH:</div>` + ['📜 AMBIL BUKTI', '🦉 LAPOR PROF. BURHAN', '👀 SEMBUNYI & NGINTIP'].map((x, i) => `<div style="font-size:38px;color:${INK};margin-top:6px">${['A', 'B', 'C'][i]}. ${x}</div>`).join(''));
    return { scene: sc, cam, upd(t, dur) { setHUD(V().hud_menang); const tq = at(s, 'Sekarang', dur - 5); const peek = Math.sin(t * 1.6) > 0 ? 1 : 0; J.position.x = 1.9 - peek * .3; J.pose(t, { talk: true, look: -.4 + Math.sin(t) * .3, point: t > tq });
      const p = ease(t, 0, dur); cam.position.set(lerp(3.6, 3.2, p), lerp(1.7, 1.5, p), lerp(5.2, 4.5, p)); cam.lookAt(1.2, 1.1, 0); show(chips, seg(t, at(s, 'komen kerajaan', 2.5) - .2, at(s, 'komen kerajaan', 2.5) + .2)); show(q, seg(t, tq - .2, tq + .3)) } };
  },
};

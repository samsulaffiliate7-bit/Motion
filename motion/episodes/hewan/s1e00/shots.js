// Shot Kerajaan Berdasi S1 Ep 0 "New Game" (lihat STORYBOARD.md). Tiap adegan = lokasi/kamera berbeda.
import { THREE, lerp, seg, E, mesh, G, group, camera } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/desa3d.js';
import { CERAH, SORE, belang, prajurit, raja, burhan, benua, SPOT, KP, BIG, POP, show, pulse, ease, tagAt, labelKerajaan, FONT, ORANGE, PARCH, INK, NAVY } from '../_s1/dunia.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
function beam(sc, p) {   // berkas cahaya spawn + cincin partikel
  const g = group(sc, p); const b = new THREE.Mesh(new THREE.CylinderGeometry(.9, 1.3, 26, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#FFF1B8', transparent: true, opacity: .55, depthWrite: false, side: THREE.DoubleSide })); b.position.y = 13; g.add(b);
  const ring = Array.from({ length: 18 }, (_, i) => { const m = new THREE.Mesh(G.sph(.07, 6, 5), new THREE.MeshBasicMaterial({ color: i % 2 ? '#FFD45E' : '#FFFFFF' })); g.add(m); return m });
  return t => { const f = 1 - seg(t, 1.6, 2.6); b.material.opacity = .55 * f; b.scale.set(1 + Math.sin(t * 20) * .04, 1, 1 + Math.sin(t * 20) * .04);
    ring.forEach((m, i) => { const a = i / 18 * Math.PI * 2 + t * 3; const r = 1.1 + Math.sin(t * 2 + i) * .1; m.position.set(Math.cos(a) * r, (t * 1.6 + i * .3) % 3, Math.sin(a) * r); m.visible = f > .05 }) };
}
const barisan = (sc, rows, cols, x0, z0, dx, dz, skip = () => false) => { const L = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { if (skip(r, c)) continue; const p = prajurit([x0 + c * dx, 0, z0 + r * dz], r * cols + c); p.rotation.y = Math.PI; sc.add(p); L.push(p) } return L };

export const SHOTS = {
  H0_SPAWN(s, root) {   // frame 1: berkas cahaya spawn di alun-alun, Belang muncul, angkat sendok
    const sc = CERAH(); const B = benua(sc); const P = SPOT.plaza; const J = belang([P[0], 0, P[2] + 3]); sc.add(J); const bm = beam(sc, [P[0], 0, P[2] + 3]);
    const npc = [[-4, 0], [4.5, -1], [-6, -3], [6, -4]].map(([x, z], i) => { const p = prajurit([P[0] + x, 0, P[2] + z], i + 1); p.rotation.y = x < 0 ? .7 : -.7; sc.add(p); return p });
    const glint = new THREE.Mesh(G.sph(.12, 8, 6), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); J.userData.sendok.add(glint);
    const ng = BIG(root, 'NEW GAME', { top: 330, fontSize: '128px' }); const lv = POP(root, 'Lv 1 &nbsp;·&nbsp; SENJATA: <span style="color:#B5452B">SENDOK 🥄</span>', { top: 520 });
    const hk = POP(root, '⚠ HARI PERTAMA: <span style="color:#B5452B">DIHUKUM</span>', { top: 520, background: '#FFE0D8' }); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { bm(t); const q = E.back(seg(t, .2, 1.1)); J.scale.setScalar(Math.max(.001, q)); J.position.y = (1 - seg(t, .2, 1.1)) * .6;
      const ts = at(s, 'sendok', 2.4); J.pose(t, { cheer: t > ts - .2 && t < ts + 1.6, talk: true, bounce: t < 1.4 }); if (t > ts - .2 && t < ts + 1.6) { J.userData.st.arms[0].rotation.z = -.3 }
      glint.scale.setScalar(Math.max(.001, Math.sin(seg(t, ts, ts + .6) * Math.PI) * 3)); npc.forEach((n, i) => n.pose(t + i, { look: Math.sin(t + i) * .4 }));
      const a = lerp(.5, -.35, ease(t, 0, dur)); cam.position.set(P[0] + Math.sin(a) * 5.6, lerp(1.2, 1.7, ease(t, 0, dur)), P[2] + 3 + Math.cos(a) * 5.6); cam.lookAt(P[0], 1.25, P[2] + 3);
      pulse(ng, seg(t, 0, .3) * (1 - seg(t, 1.6, 1.9)) + (t < .02 ? 1 : 0)); const th = at(s, 'hari pertama', dur - 2.2);
      show(lv, seg(t, ts - .2, ts + .2) * (1 - seg(t, th - .3, th))); pulse(hk, seg(t, th, th + .3)) } };
  },
  H0_PETA(s, root) {   // drone tinggi melintasi benua 4 kerajaan, label menempel
    const sc = CERAH({ fog: ['#D8ECF8', 200, 600] }); const B = benua(sc); const lab = labelKerajaan(root, B); const cam = camera(42);
    const t4 = BIG(root, '4 KERAJAAN', { top: 330, fontSize: '90px' });
    return { scene: sc, cam, upd(t, dur) { const p = ease(t, 0, dur); const a = lerp(.35, -.25, p);
      cam.position.set(Math.sin(a) * 210, lerp(150, 170, p), Math.cos(a) * 210 + 40); cam.lookAt(lerp(0, 0, p), 0, lerp(10, -10, p)); lab(cam, seg(t, .6, 1.1)); show(t4, seg(t, .2, .6) * (1 - seg(t, 2.6, 3))) } };
  },
  H0_UPACARA(s, root) {   // halaman kastel: barisan prajurit berdasi, Raja di balkon dengan dasi kotor + lalat
    const sc = CERAH(); const B = benua(sc); const k = SPOT.kastel; const L = barisan(sc, 4, 6, -4.5, 56, 1.8, 1.9);
    const R = raja([0, 5.33, 52.2]); sc.add(R); const cam = camera(40);
    const tg = POP(root, '👔 DASI RAJA<br><span style="font-size:36px;color:#B5452B">belum dicuci sejak dilantik</span>', { top: 330, width: 760, left: 160 });
    return { scene: sc, cam, upd(t, dur) { L.forEach((p, i) => p.pose(t, { nod: false })); R.pose(t, { talk: t < 3, wave: t > 1 && t < 3 }); R.userData.lalat(t);
      const td = at(s, 'Dasinya', dur - 3.2); const z = ease(t, td - .8, td + .4); const p = ease(t, 0, td);
      cam.position.set(lerp(lerp(9, 6, p), 1.6, z), lerp(lerp(3.2, 4.2, p), 6.5, z), lerp(lerp(74, 70, p), 58.6, z)); cam.lookAt(lerp(0, .1, z), lerp(3.6, 6.5, z), lerp(54, 52.4, z)); show(tg, seg(t, td + .1, td + .4)) } };
  },
  H0_TOLAK(s, root) {   // Belang satu-satunya tanpa dasi; raja menunjuk marah; hukuman jaga lumbung
    const sc = CERAH(); const B = benua(sc); const L = barisan(sc, 3, 6, -4.5, 56, 1.8, 1.9, (r, c) => r === 0 && c === 3); const J = belang([.9, 0, 56]); J.rotation.y = Math.PI; sc.add(J);
    const R = raja([0, 5.33, 52.2]); sc.add(R); const cam = camera(40); const no = tagAt(root, '❌ TANPA DASI');
    const hk = POP(root, '📜 HUKUMAN<br><span style="font-size:52px;color:#B5452B">JAGA LUMBUNG</span>', { top: 1130, width: 700, left: 190 });
    return { scene: sc, cam, upd(t, dur) { const tr = at(s, 'Raja marah', dur * .55), th = at(s, 'Hukumannya', dur - 2.4); L.forEach(p => p.pose(t)); J.pose(t, { talk: t < tr, shake: t > tr && t < th });
      R.pose(t, { point: t > tr - .2, shake: t > tr }); R.userData.lalat(t); const sw = ease(t, tr - .5, tr + .5);
      cam.position.set(lerp(lerp(3.6, 2.2, ease(t, 0, tr)), -1.0, sw), lerp(1.9, 2.7, sw), lerp(lerp(51.5, 52.6, ease(t, 0, tr)), 61.5, sw)); cam.lookAt(lerp(.9, .1, sw), lerp(1.5, 6.3, sw), lerp(56, 52.3, sw));
      no(J, cam, [0, 2.1, 0], seg(t, .5, .8) * (1 - seg(t, tr - .6, tr - .3))); pulse(hk, seg(t, th, th + .3)) } };
  },
  H0_BURHAN(s, root) {   // lapak Prof. Burhan: peta 50 gold, gold Belang 0, rolling door turun
    const sc = CERAH(); const B = benua(sc); const lp = B.kota.lapak; const W = SPOT.lapak; const O = burhan([W[0], 0, W[2] - .02]); sc.add(O);
    const J = belang([W[0] + 2.0, 0, W[2] + 1.7]); J.rotation.y = -2.3; sc.add(J); const cam = camera(42);
    const vs = POP(root, `PETA RAHASIA: <span style="color:#B5452B">${X.TL.vars.harga} 🪙</span> &nbsp;vs&nbsp; GOLD GUE: <span style="color:#B5452B">0 🪙</span>`, { top: 340, fontSize: '40px' });
    const nm = tagAt(root, '🦉 PROF. BURHAN · pelit');
    return { scene: sc, cam, upd(t, dur) { const tt = at(s, 'tutup', dur - 1.4), tn = at(s, 'Nol', dur - 2.6); O.pose(t, { talk: t < tn, nod: t > tn - .3 }); J.pose(t, { talk: t > tn - .5 && t < tn + .6, shake: t > tn });
      lp.userData.tutup(E.out(seg(t, tt - .2, tt + .5))); const p = ease(t, 0, dur);
      cam.position.set(W[0] + lerp(-.4, .2, p), lerp(2.0, 1.8, p), W[2] + lerp(7.4, 6.6, p)); cam.lookAt(W[0] + 1.5, 1.4, W[2] + .7);
      nm(O, cam, [0, 2.1, 0], seg(t, .3, .6) * (1 - seg(t, tn - .8, tn - .5))); const th = at(s, 'Harganya', 3); show(vs, seg(t, th, th + .3)) } };
  },
  H0_LUMBUNG(s, root) {   // pintu lumbung dibuka: kosong; jejak kaki kecil ke lubang gelap; mata merah
    const sc = SORE({ sky: ['#6FA0DE', '#FFE2B8'] }); const B = benua(sc); const L = B.kota.lumbung; sc.updateMatrixWorld(true); const lw = (x, y, z) => L.localToWorld(V(x, y, z));
    const hole = mesh(G.cyl(1, 1, .05, 20), '#140E0A', [1.6, .22, -3.4], { cast: false }); L.add(hole); const eyes = group(L, [1.6, .3, -3.4]); [-1, 1].forEach(i => eyes.add(new THREE.Mesh(G.sph(.08, 10, 8), new THREE.MeshBasicMaterial({ color: '#FF2A1A' })).translateX(i * .16).translateY(.05).translateZ(.1)));
    for (let i = 0; i < 11; i++) { const q = i / 10; L.add(mesh(G.sph(.07, 6, 5), '#4A3424', [lerp(-.6, 1.4, q) + (i % 2 ? .12 : -.12), .21, lerp(2.4, -2.6, q)], { s: [1, .2, 1.4], cast: false })) }
    const lamp = new THREE.PointLight('#FFD8A0', 30, 16, 1.2); lamp.position.copy(lw(0, 4.5, 0)); sc.add(lamp);
    const st = lw(0, 0, 6.2); const J = belang([st.x, 0, st.z]); J.rotation.y = Math.PI / 2; sc.add(J); const cam = camera(42);
    const cnt = POP(root, `🐟 IKAN RAKYAT: <span style="color:#B5452B">0</span> / ${X.TL.vars.kapasitas}`, { top: 340, width: 700, left: 190 });
    return { scene: sc, cam, upd(t, dur) { const to = 1.2; L.userData.open(E.out(seg(t, .2, to)) * 1.7); const tk = at(s, 'kosong', 2.6), tj = at(s, 'jejak', dur - 3);
      const w = ease(t, to, tk + 1); const jp = lw(0, 0, lerp(6.2, 1.4, w)); J.position.set(jp.x, 0, jp.z); J.pose(t, { walk: w > 0 && w < 1 ? 1 : 0, hold: t < to, shake: t > tk && t < tk + 1.2 });
      eyes.visible = t > tj + .6; eyes.scale.setScalar(Math.max(.001, Math.sin(t * 2) > -.9 ? 1 : .2));
      const c0 = lw(0, 2.2, 11), c1 = lw(-1.6, 2.6, 4.2), c2 = lw(-.6, 1.6, 0); const m1 = ease(t, .4, tk), m2 = ease(t, tj - .4, tj + 1);
      const cp = c0.clone().lerp(c1, m1).lerp(c2, m2); cam.position.copy(cp); const l0 = lw(0, 2.2, 0), l1 = lw(1.6, .2, -3.4); cam.lookAt(l0.lerp(l1, m2));
      show(cnt, seg(t, tk, tk + .3) * (1 - seg(t, tj - .4, tj))) } };
  },
  H0_AJAK(s, root) {   // di bibir lubang: Belang menoleh ke kamera, jendela quest 3 pilihan + rumus interaksi
    const sc = SORE({ sky: ['#6FA0DE', '#FFE2B8'] }); const B = benua(sc); const L = B.kota.lumbung; L.userData.open(1.7); sc.updateMatrixWorld(true); const lw = (x, y, z) => L.localToWorld(V(x, y, z));
    L.add(mesh(G.cyl(1, 1, .05, 20), '#140E0A', [1.6, .22, -3.4], { cast: false })); const eyes = group(L, [1.6, .3, -3.4]); [-1, 1].forEach(i => eyes.add(new THREE.Mesh(G.sph(.08, 10, 8), new THREE.MeshBasicMaterial({ color: '#FF2A1A' })).translateX(i * .16).translateY(.05).translateZ(.1)));
    const lamp = new THREE.PointLight('#FFD8A0', 34, 16, 1.2); lamp.position.copy(lw(0, 4.5, 1)); sc.add(lamp);
    const jp = lw(.4, 0, -1.6); const J = belang([jp.x, 0, jp.z]); sc.add(J); const cam = camera(42);
    const camP = lw(-1.2, 2.0, 3.6); const look = lw(.9, 1.1, -2.2); const face = Math.atan2(camP.x - jp.x, camP.z - jp.z);
    const chips = X.ab({ left: 40, top: 330, width: 1000, display: 'flex', gap: '12px', justifyContent: 'center', fontFamily: FONT, fontWeight: 800, opacity: 0 }, root,
      [['FOLLOW', 'Guild Netizen'], ['LIKE', 'gold + XP'], ['KOMEN', 'pilih kerajaan']].map(([a, b]) => `<div style="background:${NAVY}EE;border:3px solid ${ORANGE};border-radius:14px;padding:10px 22px;color:${PARCH};text-align:center"><div style="font-size:44px;color:${ORANGE}">${a}</div><div style="font-size:32px">${b}</div></div>`).join(''));
    const q = X.ab({ left: 70, top: 1080, width: 940, opacity: 0, fontFamily: FONT, fontWeight: 800, background: PARCH, border: '6px solid #8A5A2A', borderRadius: '20px', padding: '16px 22px', boxShadow: '0 14px 30px #00000070' }, root,
      `<div style="font-size:26px;letter-spacing:5px;color:#B5452B;text-align:center">QUEST PERTAMA · PILIH:</div>` + ['🕳 MASUK LUBANG', '👑 LAPOR RAJA', '🦉 NGUTANG PETA'].map((x, i) => `<div style="font-size:38px;color:${INK};margin-top:8px">${['A', 'B', 'C'][i]}. ${x}</div>`).join(''));
    return { scene: sc, cam, upd(t, dur) { const tq = at(s, 'Quest pertama', dur - 6); J.rotation.y = lerp(Math.PI / 2 + 1.2, face, ease(t, .2, 1)); J.pose(t, { talk: true, point: t > at(s, 'masuk lubang', dur - 4) - .2 && t < at(s, 'lapor', dur - 3) });
      eyes.scale.setScalar(Math.sin(t * 2.3) > -.85 ? 1 : .15); const p = ease(t, 0, dur); cam.position.set(camP.x, camP.y - p * .3, camP.z); cam.lookAt(look.x, look.y - p * .3, look.z);
      show(chips, seg(t, at(s, 'Follow', .8) - .2, at(s, 'Follow', .8) + .2)); show(q, seg(t, tq - .2, tq + .3)) } };
  },
};

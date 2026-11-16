// Shot Denah LORE BUMI #4: rumah panggung. Air naik di bawah rumah, desa danau Kamboja, rumah panggung Nusantara, 3 alasan, pesisir utara Bumi Kita.
import { THREE, lerp, seg, E, mesh, mat, G, group, newScene, camera, orbit, island, house, person, tree, globe } from '../../../engine/w3d/kit.js';
import { X, NAVY, GOLD, TERRA, CREAM, kepala, chip, popAt, stars, cityBoard, housing, cars, txtSprite, water, boat } from '../../../engine/w3d/bumi.js';
function stilt(parent, p, o = {}) {   // rumah kayu di atas tiang; o.h = tinggi tiang
  const g = group(parent, p); const h = o.h || 2; const legs = []; [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1], [0, 1]].forEach(([x, z]) => { const l = mesh(G.box(.14, 1, .14), '#6B4226', [x * 1.1, 0, z * .9]); g.add(l); legs.push(l) });
  const top = group(g, [0, h, 0]); top.add(mesh(G.box(2.6, .15, 2.2), '#8E5E34', [0, 0, 0])); top.add(mesh(G.box(2.2, 1.3, 1.8), o.wall || '#C9955A', [0, .75, 0])); top.add(mesh(G.box(.5, .8, .05), '#4A2E18', [0, .55, .91]));
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat(o.roof || '#7A4E2C')); roof.scale.set(2.3, 1.1, 2); roof.rotation.y = Math.PI / 4; roof.position.y = 1.95; roof.castShadow = true; top.add(roof);
  if (o.gonjong) { [-1, 1].forEach(x => top.add(mesh(G.cone(.18, .9, 4), o.roof || '#7A4E2C', [x * 1.2, 2.2, 0], { rot: [0, 0, -x * .6] }))) }
  g.userData = { top, legs, setH(hh) { top.position.y = hh; legs.forEach(l => { l.scale.y = hh; l.position.y = hh / 2 }) } }; g.userData.setH(h); return g;
}
const big = (root, txt, col = NAVY) => X.ab({ left: 0, top: 1000, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '96px', color: '#FFFFFF', WebkitTextStroke: `12px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, txt);
export const SHOTS = {
  D_LORE04_HOOK(s, root) {   // frame 1: air banjir sudah naik, rumah langsung "terangkat" ke atas tiang; kamera berputar dekat
    const sc = newScene({ sky: ['#7FB8E0', '#E8F4FF'], sunPos: [-6, 12, 8], shadow: 10 }); island(sc, 12, 12, '#9CCB6A', '#8D6E4A'); const H = stilt(sc, [0, 0, 0], { h: .05, wall: '#E9C9A8', roof: '#C9472F' });
    const W = water(sc, 12, 12, [0, .05, 0]); W.material.transparent = true; W.material.opacity = .85; const hk = X.ab({ left: 70, top: 300, width: 940, background: '#13305AEE', border: `8px solid ${GOLD}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '58px', color: '#FFFFFF', fontFamily: 'Fredoka', fontWeight: 700, opacity: 0 }, root, `🌊 Air datang, rumah tetap kering!<br><span style="font-size:42px;color:${GOLD}">rahasianya: naik ke atas tiang</span>`);
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, 20 + t * 8, lerp(3, 5.5, seg(t, 0, dur)), lerp(11, 15, seg(t, 0, dur)), [0, 2, 0]); const lv = lerp(.3, 1.3, E.out(seg(t, 0, 2))); W.position.y = lv; W.scale.y = 1; const hh = Math.max(.05, lerp(.05, 2.4, E.back(seg(t, .3, 1.6)))); H.userData.setH(hh); X.pop(hk, seg(t, .1, .45)) } };
  },
  D_LORE04_LAKE(s, root) {   // globe singkat ke Kamboja, lalu desa danau: deretan rumah tiang tinggi, perahu, air naik turun
    const sc = newScene({ sky: ['#FFC58A', '#FFF0D9'], sun: '#FFD9A0', sunPos: [10, 8, 6], shadow: 18 }); const W = water(sc, 40, 30, [0, 0, 0]);
    const houses = Array.from({ length: 8 }, (_, i) => stilt(sc, [-7 + i * 2.2, 0, (i % 2) * 2.4 - 1], { h: 4.2, wall: ['#C9955A', '#B98A55', '#D4A86A'][i % 3], roof: ['#7A4E2C', '#5E3E22', '#9C5B33'][i % 3] }));
    const boats = [0, 1, 2].map(i => boat(sc, [-4 + i * 4, .1, 4 + i * .5], ['#2E7D5B', '#E5484D', GOLD][i])); const gl = globe(sc, 3, { highlight: ['Cambodia'] }); gl.position.set(0, 5, 0); gl.face && gl.face(12, 104);
    const c1 = chip(root, '🇰🇭 Kamboja · Tonle Sap', { left: 200, top: 300, fontSize: '48px' }), c2 = chip(root, '🌧️ musim hujan: air naik jauh', { left: 140, top: 410, fontSize: '42px' }, TERRA); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tg = popAt(s, 'Tonle', 2.5); const on = t < tg; gl.visible = on; houses.forEach(h => h.visible = !on); boats.forEach(b => b.visible = !on); W.visible = !on;
      if (on) { cam.position.set(0, 5, 10); cam.lookAt(0, 5, 0); gl.rotation.y = t * .2 } else { orbit(cam, lerp(-25, 15, seg(t, tg, dur)), 6, 23, [0, 2.6, 0]); const tw = popAt(s, 'membesar', 6); W.position.y = lerp(0, 2.4, E.inout(seg(t, tw, tw + 2.5))); boats.forEach((b, i) => { b.position.y = W.position.y + .1; b.position.x = -4 + i * 4 + Math.sin(t * .5 + i) }) }
      X.pop(c1, seg(t, tg, tg + .4)); X.pop(c2, seg(t, popAt(s, 'membesar', 6), popAt(s, 'membesar', 6) + .4)) } };
  },
  D_LORE04_NUSA(s, root) {   // rumah panggung Nusantara dengan atap melengkung, kolong berisi kambing + karung, kepala bumi menunjuk
    const sc = newScene({ sky: ['#9FD6F5', '#F3FBFF'], sunPos: [-6, 14, 10], shadow: 12 }); island(sc, 14, 12, '#7FB04E', '#8D6E4A'); [[-5, -4], [5, -4], [-5.5, 3], [5.5, 3.5]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, '#3F8A3A', i % 2 ? 'palm' : 'round'));
    const H = stilt(sc, [0, 0, -.5], { h: 1.8, wall: '#8E5E34', roof: '#5E3E22', gonjong: true }); const goat = group(sc, [-.4, 0, -.2]); goat.add(mesh(G.box(.6, .35, .3), '#F4F1EA', [0, .45, 0])); goat.add(mesh(G.box(.25, .25, .22), '#F4F1EA', [.38, .65, 0])); [[-.2, -.1], [-.2, .1], [.2, -.1], [.2, .1]].forEach(([x, z]) => goat.add(mesh(G.box(.07, .3, .07), '#E8DCC2', [x, .15, z])));
    const sacks = [0, 1].map(i => { const m = mesh(G.ico(.3, 1), '#C9A36B', [.6 + i * .4, .3, -.8]); sc.add(m); return m }); const K = kepala([2.6, 0, 1.6]); sc.add(K); K.rotation.y = -.7;
    const c1 = chip(root, '🇮🇩 rumah panggung Nusantara', { left: 140, top: 300, fontSize: '44px' }), c2 = chip(root, '📦 kolong: barang + ternak', { left: 180, top: 410, fontSize: '42px' }, TERRA); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-30, 10, E.inout(seg(t, 0, dur))), 2.4, 10, [0, 1.6, 0]); K.pose(t, { talk: true, point: true }); goat.rotation.y = Math.sin(t) * .3; X.pop(c1, seg(t, .4, .8)); X.pop(c2, seg(t, popAt(s, 'Kolong', 4), popAt(s, 'Kolong', 4) + .4)) } };
  },
  D_LORE04_THREE(s, root) {   // potongan melintang rumah panggung: (1) air di bawah, (2) ular+tikus mentok di tiang, (3) panah angin lewat kolong
    const sc = newScene({ sky: ['#BFE6F7', '#FFFBEA'], sunPos: [-6, 12, 10], shadow: 10 }); island(sc, 12, 8, '#9CCB6A', '#8D6E4A'); const H = stilt(sc, [0, 0, 0], { h: 2, wall: '#E9C9A8', roof: '#C9472F' });
    const W = water(sc, 12, 8, [0, .05, 0]); W.material.transparent = true; W.material.opacity = .8; const snake = group(sc, [-3, .1, 1.4]); for (let i = 0; i < 6; i++) snake.add(mesh(G.sph(.12, 6, 5), '#4E8F3A', [i * .2, Math.sin(i) * .05, Math.sin(i * 1.4) * .1], { cast: false }));
    const arrows = [0, 1, 2].map(i => { const sp = txtSprite('➜', '#FFFFFF', '#3E8FC4', .6); sc.add(sp); return sp }); const C = [['1. 🌊 aman dari banjir', 'banjir'], ['2. 🐍 hewan susah masuk', 'susah masuk'], ['3. 🌬️ lebih sejuk', 'sejuk']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '44px' }) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .2) * 15, 2.6, 11, [0, 1.6, 0]); const t1 = popAt(s, 'banjir', 2), t2 = popAt(s, 'susah masuk', 5), t3 = popAt(s, 'sejuk', 8);
      W.position.y = t > t1 && t < t2 ? lerp(.05, 1, E.out(seg(t, t1, t1 + 1))) : .05; W.visible = t > t1 && t < t2; snake.visible = t > t2 && t < t3; snake.position.x = lerp(-3.5, -1.3, E.out(seg(t, t2, t2 + 1.5))); arrows.forEach((a, i) => { a.visible = t > t3; a.position.set(((t * 1.5 + i * .33) % 1) * 8 - 4, .7 + i * .35, .3) });
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  D_LORE04_BUMI(s, root) {   // papan kota Bumi Kita, zoom ke pesisir utara: genangan rob, rumah-rumah bayangan panggung muncul transparan
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.pesisir.forEach(m => m.visible = true); housing(sc, -8, 8, 3); const tick = cars(sc, 6);
    const flood = mesh(G.box(7, .1, 6.6), '#3E8FC4', [0, .12, -8], { mat: { transparent: true, opacity: .7 }, cast: false }); sc.add(flood);
    const ghosts = [0, 1, 2].map(i => { const h = stilt(sc, [-2.2 + i * 2.2, 0, -8], { h: 1.6, wall: '#FFFFFF', roof: '#9ED8F5' }); h.scale.setScalar(.6); h.traverse(o => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = .55 } }); return h });
    const usul = X.ab({ left: 140, top: 300, width: 800, background: '#FFFFFF', borderRadius: '26px', padding: '14px 22px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${NAVY}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root, `<div style="font-size:24px;color:#888">@Al*** · komentar</div><div style="font-size:38px;font-weight:700">“bikin tiang penghadang banjir”</div>`);
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { tick(t); const p = E.inout(seg(t, 0, dur * .6)); orbit(cam, Math.sin(t * .2) * 6, lerp(26, 13, p), lerp(22, 17, p), [0, 0, lerp(-2, -7, p)]); flood.position.y = .12 + Math.sin(t * 1.5) * .05;
      const tu = popAt(s, 'tiang penghadang', 4); const q = seg(t, tu, tu + .4); usul.style.opacity = q; usul.style.transform = 'rotate(-2deg)'; const tp = popAt(s, 'panggung', 8); ghosts.forEach((g, i) => { const k = E.back(seg(t, tp + i * .2, tp + .6 + i * .2)); g.scale.setScalar(Math.max(.001, k * .6)) }) } };
  },
  D_LORE04_ASK(s, root) {   // layar terbelah: kiri rumah panggung di pesisir, kanan taman hijau di pesisir; kata PANGGUNG / HIJAU menyala bergantian
    const sc = newScene({ sky: ['#FFD9A8', '#FFF7EC'], sun: '#FFE0B0', sunPos: [10, 10, 10], shadow: 12 }); island(sc, 16, 10, '#9CCB6A', '#8D6E4A'); water(sc, 16, 4, [0, .02, -4.5]);
    const L = [0, 1].map(i => stilt(sc, [-5.2 + i * 2.4, 0, -2.6], { h: 1.6, wall: '#E9C9A8', roof: '#C9472F' })); [0, 1, 2, 3].forEach(i => tree(sc, [2 + i * 1.3, 0, -2.5 + (i % 2) * .8], 1, '#3F8A3A', i % 2 ? 'palm' : 'round')); sc.add(mesh(G.box(.1, 3, 6), '#FFFFFF', [0, 1.5, -1], { cast: false }));
    const bp = X.ab({ left: 60, top: 1020, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '64px', color: '#FFFFFF', background: TERRA, border: `7px solid ${NAVY}`, borderRadius: '28px', padding: '8px 26px', opacity: 0 }, root, 'PANGGUNG'), bh = X.ab({ left: 640, top: 1020, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '64px', color: '#FFFFFF', background: '#2E7D5B', border: `7px solid ${NAVY}`, borderRadius: '28px', padding: '8px 26px', opacity: 0 }, root, 'HIJAU');
    const c3 = chip(root, '📜 terbanyak = aturan kota', { left: 200, top: 300, fontSize: '46px' }); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .2) * 1.5, 5.5, 15.5); cam.lookAt(0, 1.2, -2); const ta = popAt(s, 'PANGGUNG', 1), tb = popAt(s, 'HIJAU', 4); X.pop(bp, seg(t, ta, ta + .35)); X.pop(bh, seg(t, tb, tb + .35)); bp.style.transform += t > ta && t < tb ? ' scale(1.08)' : ''; X.pop(c3, seg(t, popAt(s, 'aturan', 8), popAt(s, 'aturan', 8) + .4)) } };
  },
};

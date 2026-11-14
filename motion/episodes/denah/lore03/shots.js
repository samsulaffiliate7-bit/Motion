// Shot Denah LORE BUMI #3: tulou, trulli, rumah gadang + globe jawaban.
import { THREE, lerp, seg, E, mesh, mat, G, group, newScene, camera, orbit, island, tree, globe, ll2v } from '../../../engine/w3d/kit.js';
import { X, NAVY, GOLD, TERRA, CREAM, chip, popAt, stars, txtSprite, countdown, grVillage, swHouse, isHouse } from '../../../engine/w3d/bumi.js';
function tulou(parent, p) { const g = group(parent, p); const wall = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 3, 40, 1, true), mat('#C9A27A', { side: THREE.DoubleSide })); wall.position.y = 1.5; wall.castShadow = true; g.add(wall);
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 4.6, .9, 40, 1, true), mat('#4A4A52', { side: THREE.DoubleSide })); roof.position.y = 3.4; g.add(roof); g.add(mesh(G.cyl(3.2, 3.2, .1, 30), '#B59A6A', [0, .05, 0]));
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; g.add(mesh(G.box(.3, .4, .05), '#3A2A1E', [Math.sin(a) * 4.02, 2.3, Math.cos(a) * 4.02], { rot: [0, a, 0], cast: false })) } g.add(mesh(G.box(1, 1.6, .2), '#5A3A22', [0, .8, 4])); return g }
function trullo(parent, p, s = 1) { const g = group(parent, p); g.scale.setScalar(s); g.add(mesh(G.cyl(1, 1.05, 1.4, 16), '#FAFAF7', [0, .7, 0])); g.add(mesh(G.cone(1.1, 1.8, 16), '#8E8E86', [0, 2.3, 0])); g.add(mesh(G.sph(.15, 8, 6), '#FAFAF7', [0, 3.25, 0])); g.add(mesh(G.box(.45, .8, .05), '#2E4A6A', [0, .4, 1.02])); return g }
function gadang(parent, p) { const g = group(parent, p); [[-2.2, -.8], [2.2, -.8], [-2.2, .8], [2.2, .8], [0, -.8], [0, .8], [-1.1, -.8], [1.1, .8]].forEach(([x, z]) => g.add(mesh(G.box(.16, 1.4, .16), '#5A3A22', [x, .7, z])));
  g.add(mesh(G.box(5, 1.5, 2, ), '#8B4A2B', [0, 2.15, 0])); for (let i = 0; i < 6; i++) g.add(mesh(G.box(.5, .4, .05), '#E8C46A', [-2 + i * .8, 2.3, 1.01], { cast: false }));
  const horn = (x, h, sx) => { const c = new THREE.Mesh(new THREE.ConeGeometry(.35, h, 6), mat('#2E2E2E')); c.position.set(x, 3.3 + h / 2 - .3, 0); c.rotation.z = sx * .45; c.castShadow = true; g.add(c) };
  g.add(mesh(G.box(5.2, .6, 2.4), '#3A3A3A', [0, 3.2, 0])); [[-2.6, 1.6, 1], [-1.2, 1.2, .6], [1.2, 1.2, -.6], [2.6, 1.6, -1]].forEach(([x, h, sx]) => horn(x, h, sx)); return g }
export const SHOTS = {
  D_LORE03_HOOK(s, root) {   // globe malam + tiga tanda tanya + siluet tiga rumah mini berputar
    const sc = newScene({ sky: ['#071A33', '#1D5C93'], hemi: .9, sunI: 3, sunPos: [12, 8, 10] }); stars(sc); const gl = globe(sc, 5, {});
    const minis = [[tulou, .25], [trullo, .7], [gadang, .4]].map(([f, k], i) => { const g = group(sc); f(g, [0, 0, 0]); g.scale.setScalar(k); return g });
    const q = [[25, 117], [41, 17], [-1, 100]].map(([la, lo]) => { const sp = txtSprite('?', GOLD, NAVY, 1.3); sp.position.copy(ll2v(la, lo, 6.3)); gl.add(sp); return sp });
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#FFFBF2F2', border: `8px solid ${NAVY}`, borderRadius: '40px', padding: '22px 28px', textAlign: 'center', fontSize: '58px', lineHeight: 1.12, color: NAVY, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 14px 0 ${TERRA}`, opacity: 0 }, root, `Tebak negara #2 🌍<br><span style="font-size:46px;color:${TERRA}">rumah ketiga paling susah</span>`);
    const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { gl.face(25, 40 + t * 10); orbit(cam, Math.sin(t * .3) * 8, 3, lerp(30, 24, seg(t, 0, dur)), [0, -.5, 0]); X.pop(hook, seg(t, .1, .5));
      minis.forEach((g, i) => { const a = t * .6 + i * 2.09; g.position.set(Math.sin(a) * 7.4, -4 + Math.sin(t * 1.5 + i) * .3, Math.cos(a) * 7.4); g.rotation.y = a }) } };
  },
  D_LORE03_TULOU(s, root) {   // crane dari lembah: tulou bulat besar, kamera masuk ke halaman tengah
    const sc = newScene({ sky: ['#BFD9C8', '#F2F6EE'], sunPos: [-8, 14, 8], shadow: 14, fog: ['#F2F6EE', 25, 70] }); island(sc, 30, 30, '#7FA65A', '#6B5A44'); const T = tulou(sc, [0, 0, 0]);
    [[-8, -6], [8, -7], [-9, 6], [9, 5], [-5, -10]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.4, '#3F7A3A', i % 2 ? 'cone' : 'round')); [[-14, -14, 6], [12, -16, 7]].forEach(([x, z, r]) => sc.add(mesh(G.ico(r, 1), '#6E8F5A', [x, 0, z], { s: [1.4, .7, 1] })));
    const cd = countdown(root); const qq = chip(root, '❓ negara mana?', { left: 330, top: 1130, fontSize: '48px' }, TERRA);
    const L = [['⭕ bentuk bulat raksasa', 'bulat'], ['🧱 dinding tanah padat', 'tanah'], ['👨‍👩‍👧‍👦 banyak keluarga', 'banyak keluarga']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-30, 30, p), lerp(18, 6, p), lerp(22, 12, p), [0, 1.5, 0]); L.forEach(l => { const c = popAt(s, l.cu, 99); X.pop(l.e, seg(t, c, c + .4)) });
      const tq = popAt(s, 'Negara mana', dur - 3); X.pop(qq, seg(t, tq, tq + .4)); cd(t, popAt(s, 'Tiga', dur - 2.2)) } };
  },
  D_LORE03_TRULLO(s, root) {   // dolly rendah di antara pohon zaitun: deretan trulli putih atap kerucut
    const sc = newScene({ sky: ['#9CC7E6', '#FFF6E6'], sunPos: [10, 12, 6], shadow: 16 }); island(sc, 26, 20, '#B8B26A', '#7A6A4A');
    const tr = [[-4, -2, 1], [-1.6, -2.4, .9], [.8, -2, 1.1], [3.2, -2.3, .95], [-2.8, 1, .85], [2, .8, 1]].map(([x, z, k]) => trullo(sc, [x, 0, z], k));
    for (let i = 0; i < 12; i++) { const x = -10 + (i % 6) * 4, z = i < 6 ? 8.5 : -7; const g = group(sc, [x, 0, z]); g.add(mesh(G.cyl(.12, .18, 1.2, 6), '#6A5A4A', [0, .6, 0])); g.add(mesh(G.ico(.9, 0), '#8A9A6A', [0, 1.6, 0], { s: [1.2, .8, 1.2] })) }
    const cd = countdown(root); const qq = chip(root, '❓ negara mana?', { left: 330, top: 1130, fontSize: '48px' }, TERRA);
    const L = [['🔺 atap kerucut batu', 'kerucut'], ['🫒 di antara kebun zaitun', 'zaitun']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-6, 5, p), 3.6, 12); cam.lookAt(lerp(-2.5, 2, p), 1.2, -1.5); L.forEach(l => { const c = popAt(s, l.cu, 99); X.pop(l.e, seg(t, c, c + .4)) });
      const tq = popAt(s, 'Negara mana', dur - 3); X.pop(qq, seg(t, tq, tq + .4)); cd(t, popAt(s, 'Tiga', dur - 2.2)) } };
  },
  D_LORE03_GADANG(s, root) {   // lereng hijau Sumatra, kabut tipis, orbit pelan ke atap bergonjong
    const sc = newScene({ sky: ['#A9CFC0', '#EEF6F2'], sunPos: [-8, 12, 10], shadow: 14, fog: ['#EEF6F2', 22, 60], hemi: 1.25 }); island(sc, 26, 22, '#6FA64A', '#5E4A36'); const Gd = gadang(sc, [0, 0, 0]);
    [[-9, -9, 5], [7, -12, 6]].forEach(([x, z, r]) => sc.add(mesh(G.ico(r, 1), '#4E8A3A', [x, 0, z], { s: [1.3, 1.1, 1] }))); [[-6, 3], [6, 4], [-7, -3], [7, -2]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.2, '#3F7A3A', i % 2 ? 'palm' : 'round'));
    const cd = countdown(root); const qq = chip(root, '❓ negara mana?', { left: 330, top: 1130, fontSize: '48px' }, TERRA);
    const L = [['🪵 rumah panggung panjang', 'panggung'], ['🐃 atap runcing seperti tanduk', 'tanduk']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(35, -10, E.inout(seg(t, 0, dur))), 3.4, 13, [0, 2.2, 0]); L.forEach(l => { const c = popAt(s, l.cu, 99); X.pop(l.e, seg(t, c, c + .4)) });
      const tq = popAt(s, 'Negara mana', dur - 3); X.pop(qq, seg(t, tq, tq + .4)); cd(t, popAt(s, 'Tiga', dur - 2.2)) } };
  },
  D_LORE03_ANS(s, root) {   // globe berputar ke jawaban, pin, nama besar, fakta per varian
    const v = s.variant, C = { cn: ['China', 24.6, 117.0, 'TIONGKOK'], it: ['Italy', 40.8, 17.2, 'ITALIA'], id: ['Indonesia', -.9, 100.4, 'INDONESIA!'] }[v];
    const sc = newScene({ sky: ['#2C7CC0', '#BFE6FF'], hemi: 1, sunI: 2.6, sunPos: [6, 10, 14], shadow: 8 }); const gl = globe(sc, 5, { highlight: [C[0]], hlColor: '#FF7A45' }); const pin = gl.pin(C[1], C[2]); pin.scale.setScalar(.01);
    const name = X.ab({ left: 0, top: 1050, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: '#FFFFFF', WebkitTextStroke: `14px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, C[3]);
    const F = { cn: [['🏯 tulou, Fujian', 'tulou'], ['🛡️ dulu untuk bertahan', 'bertahan'], ['🌍 warisan dunia', 'warisan']], it: [['🏠 trulli', 'trulli'], ['🪨 tanpa semen', 'semen'], ['🔺 atap batu kapur', 'kapur']],
      id: [['🏠 rumah gadang, Minangkabau', 'gadang'], ['🐃 atap gonjong', 'gonjong'], ['✍️ tulis skor + negara tujuan', 'skor']] }[v].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 && v === 'id' ? TERRA : NAVY) }));
    const cam = camera(38); const A0 = { cn: 10, it: -12, id: 4 }[v];
    return { scene: sc, cam, upd(t, dur) { const z = E.inout(seg(t, 0, 1.6)); gl.face(lerp(C[1] - 30, C[1], z), lerp(C[2] + 80, C[2], z)); orbit(cam, A0 + Math.sin(t * .3) * 5, lerp(6, 2, z), lerp(32, 21, z) - seg(t, 1.6, dur) * 1.5, [0, -1.6, 0]);
      pin.scale.setScalar(Math.max(.01, E.back(seg(t, 1.2, 1.7)) * 1.3)); X.pop(name, seg(t, .9, 1.3)); name.style.opacity = seg(t, .9, 1.3) * (1 - seg(t, 3.6, 4.1)); F.forEach(f => { const c = popAt(s, f.cu, 99); X.pop(f.e, seg(t, c, c + .4)) }) } };
  },
};

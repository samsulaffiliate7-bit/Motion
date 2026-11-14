// Shot Denah Hari 7: timbangan seri bus vs kereta, Kepala Bumi memutuskan, like jadi penduduk, usulan, bus pertama, peta rute.
import { THREE, lerp, seg, E, mesh, G, group, newScene, camera, orbit, island, house, person, coin } from '../../../engine/w3d/kit.js';
import { X, NAVY, GOLD, TERRA, CREAM, juragan, kepala, chip, popAt, cityBoard, CC, RC, housing, shop, tower, cars, grow, txtSprite } from '../../../engine/w3d/bumi.js';
const at = popAt;
function bus(parent, p, col = '#2E7D5B') { const g = group(parent, p); g.add(mesh(G.box(1.2, 1.1, 3.2), col, [0, .75, 0])); g.add(mesh(G.box(1.22, .4, 2.6), '#9ED8F5', [0, 1, .1], { cast: false })); g.add(mesh(G.box(1.24, .12, 3.22), '#FFFFFF', [0, .45, 0], { cast: false }));
  [[-.6, -1], [.6, -1], [-.6, 1], [.6, 1]].forEach(([x, z]) => g.add(mesh(G.cyl(.25, .25, .2, 12), '#1E1E1E', [x, .25, z], { rot: [0, 0, Math.PI / 2] }))); return g }
function train(parent, p) { const g = group(parent, p); for (let i = 0; i < 3; i++) { g.add(mesh(G.box(1.1, 1, 2.6), '#E5484D', [0, .8, i * 2.8])); g.add(mesh(G.box(1.12, .35, 2.2), '#9ED8F5', [0, 1, i * 2.8], { cast: false })) } return g }
const comm = (root, u, tx, top, left, w = 800) => X.ab({ left, top, width: w, background: '#FFFFFF', borderRadius: '26px', padding: '14px 22px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${NAVY}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root, `<div style="font-size:24px;color:#888">${u} · komentar</div><div style="font-size:36px;font-weight:700">“${tx}”</div>`);
export const SHOTS = {
  D_H007_HOOK(s, root) {   // frame 1: timbangan raksasa bergoyang lalu berhenti datar, bus di kiri, kereta di kanan, "1 : 1"
    const sc = newScene({ sky: ['#8FD3FF', '#FFF4E0'], sunPos: [-8, 14, 10], shadow: 14 }); island(sc, 16, 10, '#9CCB6A', '#8D6E4A');
    sc.add(mesh(G.cone(.8, 3, 4), '#7D8A94', [0, 1.5, 0])); const beam = group(sc, [0, 3.1, 0]); beam.add(mesh(G.box(5.4, .25, .4), GOLD, [0, 0, 0]));
    const pans = [-1, 1].map(x => { const g = group(beam, [x * 2.5, -.2, 0]); g.add(mesh(G.cyl(1.1, 1.1, .12, 20), '#B0B7BF', [0, -1.2, 0])); [-1, 1].forEach(z => g.add(mesh(G.box(.04, 1.2, .04), '#555', [0, -.6, z * .9]))); return g });
    const B = bus(pans[0], [0, -1.1, 0]); B.scale.setScalar(.5); const T = train(pans[1], [0, -1.1, -1.1]); T.scale.setScalar(.3);
    const big = X.ab({ left: 0, top: 290, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '150px', color: GOLD, WebkitTextStroke: `16px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, '2 : 1');
    const sub = chip(root, '🚌 BUS MENANG!', { left: 300, top: 480, fontSize: '60px' }, '#2E7D5B'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, 2.5)); orbit(cam, lerp(20, 0, p), lerp(5, 3.4, p), lerp(8, 13, p), [0, 2, 0]); const damp = Math.exp(-t * .9); beam.rotation.z = Math.sin(t * 5) * .35 * damp + .22 * (1 - damp);
      pans.forEach(g => g.rotation.z = -beam.rotation.z); X.pop(big, seg(t, .1, .45)); X.pop(sub, seg(t, popAt(s, 'bus', 2.5), popAt(s, 'bus', 2.5) + .4)) } };
  },
  D_H007_DECIDE(s, root) {   // Kepala Bumi mengetuk palu di meja, koper koin 200 vs label harga; komentar monorel menempel lalu dicap "nanti"
    const sc = newScene({ sky: ['#FFE3B8', '#FFF8EE'], sun: '#FFE0B0', sunPos: [8, 10, 10], shadow: 10 }); island(sc, 12, 10, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars;
    sc.add(mesh(G.box(3.2, .2, 1.6), '#8E5E34', [0, 1.2, 0])); [[-1.4, -.6], [1.4, -.6], [-1.4, .6], [1.4, .6]].forEach(([x, z]) => sc.add(mesh(G.box(.18, 1.2, .18), '#6B4226', [x, .6, z])));
    const K = kepala([-1.5, 0, 1.3]); sc.add(K); K.rotation.y = .5; const J = juragan([1.6, 0, 1.4]); sc.add(J); J.rotation.y = -.5; const coins = Array.from({ length: 8 }, (_, i) => coin(sc, [-.2 + (i % 4) * .3, 1.35 + Math.floor(i / 4) * .07, -.2]));
    const hammer = group(sc, [-.9, 1.4, .3]); hammer.add(mesh(G.box(.5, .25, .25), '#5E3E22', [0, .5, 0])); hammer.add(mesh(G.box(.07, .6, .07), '#8E5E34', [0, .2, 0]));
    const C = [[`❤️ ${V.like5} like → +${V.koin_like} koin`, 'like'], [`🧳 koper ${V.koin1} koin`, 'Koper'], [`🚌 bus −${V.bus} ✅`, 'dibeli']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, i === 2 ? TERRA : NAVY) }));
    const mono = comm(root, V.komentar[1][0], V.komentar[1][1], 1000, 140, 760); const stamp = X.ab({ left: 560, top: 960, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '64px', color: '#2E7D5B', border: '8px solid #2E7D5B', borderRadius: '18px', padding: '0 20px', transform: 'rotate(-12deg)', opacity: 0, background: '#FFFFFFCC' }, root, 'DICATAT');
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .25) * 8, 3.4, 9.5, [0, 1.5, .5]); K.pose(t, { talk: true }); J.pose(t, { cheer: t > popAt(s, 'koin', 3) && t < popAt(s, 'dibeli', 8) }); const tb = popAt(s, 'dibeli', 8); hammer.rotation.z = t > tb && t < tb + .6 ? -Math.sin((t - tb) * 10) * .8 : 0;
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }); const tm = popAt(s, 'monorel', 10); const q = seg(t, tm, tm + .4); mono.style.opacity = q; mono.style.transform = 'rotate(-2deg)'; const qs = seg(t, tm + 1.4, tm + 1.7); stamp.style.opacity = qs > 0 ? 1 : 0; stamp.style.transform = `rotate(-12deg) scale(${lerp(2, 1, E.out(qs))})` } };
  },
  D_H007_LIKE(s, root) {   // hati like berjatuhan dari langit, tiap tumpukan 10 berubah jadi orang yang turun ke kota
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true); housing(sc, -8, 8, 3); const V = X.TL.vars; const tick = cars(sc, 6);
    const hearts = Array.from({ length: 30 }, (_, i) => { const sp = txtSprite('❤', '#E5484D', '#fff', .9); sc.add(sp); return sp }); const ppl = Array.from({ length: V.dari_like }, (_, i) => person(sc, [0, 0, 0], { s: 1, body: CC[i % 5] === '#FFF3D6' ? '#6B4FA0' : ['#3E8FC4', '#E07B39', '#C2457A', '#6B8E5A', '#8E44AD'][i % 5] }));
    const big = X.ab({ left: 0, top: 300, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: '#FFFFFF', WebkitTextStroke: `12px #E5484D`, paintOrder: 'stroke fill', opacity: 0 }, root, `❤️ ${V.like}`); const eq = chip(root, `10 ❤️ = 1 👤  →  +${V.dari_like}`, { left: 230, top: 470, fontSize: '46px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { tick(t); orbit(cam, lerp(-10, 12, seg(t, 0, dur)), 16, 22, [-4, 0, 4]); hearts.forEach((h, i) => { const k = ((t * .5) + i * .033) % 1; h.position.set(-8 + Math.sin(i * 2.1) * 5, lerp(14, 0, k), 4 + Math.cos(i * 1.3) * 4); h.visible = t < popAt(s, 'orang', 6) });
      const tp = popAt(s, 'orang', 6); ppl.forEach((p, i) => { const q = E.out(seg(t, tp + i * .12, tp + .8 + i * .12)); p.visible = q > 0; p.position.set(-10 + (i % 5) * 1.1, lerp(8, 0, q), 3 + Math.floor(i / 5) * 1.2); p.pose(t + i, { cheer: q >= 1 }) });
      X.pop(big, seg(t, popAt(s, 'like', 2), popAt(s, 'like', 2) + .4)); X.pop(eq, seg(t, popAt(s, 'sepuluh', 4), popAt(s, 'sepuluh', 4) + .4)) } };
  },
  D_H007_IDEAS(s, root) {   // papan pendatang: kartu profesi menempel, lalu pemain bola menggiring bola di lahan kosong berpatok (calon stadion)
    const sc = newScene({ sky: ['#A6DCF5', '#FFF6E6'], sunPos: [-6, 14, 10], shadow: 12 }); island(sc, 14, 10, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars;
    const ppl = V.profesi.map((pr, i) => { const p = person(sc, [-3.8 + i * .75, 0, -1.2], { s: .9, body: ['#F28C28', '#E5484D', '#3E8FC4', '#2E7D5B', '#8E44AD', '#2E7D5B'][i] }); return p });
    sc.add(mesh(G.box(5, .05, 3.4), '#C9D99A', [3, .03, 1.5], { cast: false })); [[.6, 0], [5.4, 0], [.6, 3], [5.4, 3]].forEach(([x, z]) => sc.add(mesh(G.cyl(.06, .06, .5, 6), '#B5452B', [x, .25, z])));
    const P = person(sc, [3, 0, 1.5], { body: '#2E7D5B', pants: '#FFFFFF' }); const ball = mesh(G.ico(.18, 1), '#FFFFFF', [3, .18, 2], { cast: false }); sc.add(ball);
    const tags = V.profesi.map((pr, i) => chip(root, pr, { left: 60 + (i % 2) * 480, top: 300 + Math.floor(i / 2) * 95, fontSize: '38px', padding: '6px 18px' }));
    const c = comm(root, V.komentar[1][0], V.komentar[1][1], 620, 140); const pd = chip(root, `👥 penduduk ${V.pend}`, { left: 330, top: 1080, fontSize: '50px' }); const st = chip(root, '🏟️ stadion diminta 3x', { left: 260, top: 1180, fontSize: '44px' }, TERRA); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-20, 15, seg(t, 0, dur)), 6, 16, [0, 1, .5]); ppl.forEach((p, i) => { p.pose(t + i, { cheer: t > 1 + i * .4 }) }); tags.forEach((e, i) => X.pop(e, seg(t, .5 + i * .4, .8 + i * .4)));
      const tb = popAt(s, 'pemain bola', 6); P.visible = ball.visible = t > tb; const a = t * 1.5; P.position.set(3 + Math.sin(a) * 1.6, 0, 1.5 + Math.cos(a) * .8); P.rotation.y = a + Math.PI / 2; P.pose(t, { walk: 1 }); ball.position.set(P.position.x + Math.cos(a) * .4, .18, P.position.z - Math.sin(a) * .4);
      const ts = popAt(s, 'stadion', 9); const q = seg(t, ts - .3, ts + .1); c.style.opacity = q; c.style.transform = 'rotate(-2deg)'; X.pop(st, seg(t, ts, ts + .4)); X.pop(pd, seg(t, popAt(s, 'Penduduk sekarang', 11), popAt(s, 'Penduduk sekarang', 11) + .4)) } };
  },
  D_H007_BUS(s, root) {   // kamera menempel di sisi bus hijau melaju dari kawasan tinggal ke pasar; juragan di halte mengelap keringat
    const sc = newScene({ sky: ['#FFD9A8', '#FFF7EC'], sun: '#FFE0B0', sunPos: [10, 8, 10], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true); housing(sc, -8, 8, 3); const V = X.TL.vars;
    [shop(sc, [-1.8, 0, -1.8], { sign: '#E5484D', awn: GOLD }), shop(sc, [1.8, 0, -1.8], { sign: '#2E7D5B' })]; const BS = bus(sc, [-4, 0, 8]); const halte = group(sc, [-2.6, 0, -.6]); halte.add(mesh(G.box(2, .1, 1), '#2E7D5B', [0, 2, 0])); [-.9, .9].forEach(x => halte.add(mesh(G.box(.1, 2, .1), '#555', [x, 1, 0])));
    const J = juragan([-2.6, 0, -.4]); sc.add(J); const sw = txtSprite('💧', '#9ED8F5', NAVY, .5); sc.add(sw); const k = chip(root, `🧳 sisa koin ${V.koin}`, { left: 300, top: 300, fontSize: '50px' }, TERRA); const kl = chip(root, `🏥 klinik ${V.klinik} · kurang ${V.kurang}`, { left: 220, top: 410, fontSize: '46px' }, '#C9472F'); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const q = E.inout(seg(t, 0, dur * .8)); BS.position.set(-4.6, 0, lerp(10, 0, q)); cam.position.set(BS.position.x + 5.5, 3.6, BS.position.z + 7.5); cam.lookAt(BS.position.x - .5, 1, BS.position.z - 3); J.pose(t, { shake: true }); const k2 = (t * .8) % 1; sw.position.set(-2.4, 2.1 - k2 * .6, -.1); sw.material.opacity = 1 - k2;
      X.pop(k, seg(t, popAt(s, 'sisa di koper', 6), popAt(s, 'sisa di koper', 6) + .4)); X.pop(kl, seg(t, popAt(s, 'Kurang', 8), popAt(s, 'Kurang', 8) + .4)) } };
  },
  D_H007_ASK(s, root) {   // peta atas kota: dua garis rute bercahaya (A pesisir biru, B tengah kuning) bergantian menyala
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true); B.userData.zones.pesisir.forEach(m => m.visible = true); housing(sc, -8, 8, 3);
    const rA = mesh(G.box(22, .2, .5), '#3E8FC4', [0, .3, -11.6], { mat: { emissive: '#3E8FC4', emissiveIntensity: .8 }, cast: false }), rB = mesh(G.box(22, .2, .5), GOLD, [0, .3, 0], { mat: { emissive: GOLD, emissiveIntensity: .8 }, cast: false }); sc.add(rA); sc.add(rB);
    const sa = txtSprite('A', '#3E8FC4', '#fff', 2), sb = txtSprite('B', GOLD, NAVY, 2); sa.position.set(-8, 3, -11.6); sb.position.set(-8, 3, 0); sc.add(sa); sc.add(sb); const BS = bus(sc, [0, 0, 0]); BS.rotation.y = Math.PI / 2;
    const ca = chip(root, '🌊 A pesisir: indah, rawan rob', { left: 60, top: 300, fontSize: '40px' }, '#3E8FC4'), cb = chip(root, '🏙️ B tengah: aman, macet', { left: 60, top: 410, fontSize: '40px' }, NAVY), cc = chip(root, '📅 hasil 2 hari lagi', { left: 300, top: 1050, fontSize: '48px' }, TERRA); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .2) * 6, 42, 16, [0, 0, -6]); const ta = popAt(s, 'pesisir', 1), tb = popAt(s, 'tengah', 4); rA.material.emissiveIntensity = t > ta && t < tb ? 1.2 + Math.sin(t * 8) * .4 : .4; rB.material.emissiveIntensity = t > tb ? 1.2 + Math.sin(t * 8) * .4 : .4;
      const k = (t * .12) % 1; const onA = t > ta && t < tb; BS.position.set(lerp(-11, 11, k), 0, onA ? -11.6 : 0); X.pop(ca, seg(t, ta, ta + .4)); X.pop(cb, seg(t, tb, tb + .4)); X.pop(cc, seg(t, popAt(s, 'dua hari', 8), popAt(s, 'dua hari', 8) + .4)) } };
  },
};

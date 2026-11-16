// Shot Denah Hari 5: ketua tukang dari komentar, pendatang, kos dua lantai, aturan like = koin.
import { THREE, lerp, seg, E, mesh, G, group, newScene, camera, orbit, island, house, person, coin } from '../../../engine/w3d/kit.js';
import { X, NAVY, GOLD, TERRA, CREAM, juragan, kepala, chip, tag3, popAt, cityBoard, CC, RC, housing, shop, tower, cars, grow, txtSprite } from '../../../engine/w3d/bumi.js';
const tukang = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#F28C28', pants: '#3B3B4F', hat: 'cap', hatC: '#FFD54A', skin: '#C98E64' }, o));
function kos(parent, p) { const g = group(parent, p); g.add(mesh(G.box(4, 1.2, 2), '#F3E1C4', [0, .6, 0])); g.add(mesh(G.box(4, 1.2, 2), '#E9C9A8', [0, 1.8, 0])); g.add(mesh(G.box(4.3, .15, 2.4), '#B5452B', [0, 2.5, 0]));
  for (let f = 0; f < 2; f++) for (let i = 0; i < 4; i++) { g.add(mesh(G.box(.5, .7, .05), '#6B4226', [-1.5 + i, .45 + f * 1.2, 1.01])); g.add(mesh(G.box(.3, .25, .05), '#9ED8F5', [-1.5 + i + .3, .85 + f * 1.2, 1.01], { cast: false })) }
  g.add(mesh(G.box(4, .08, .5), '#8A8F96', [0, 1.22, 1.25])); return g }
const comm = (root, u, tx, top, left, w = 800) => X.ab({ left, top, width: w, background: '#FFFFFF', borderRadius: '26px', padding: '14px 22px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${NAVY}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root, `<div style="font-size:24px;color:#888">${u} · komentar</div><div style="font-size:38px;font-weight:700">“${tx}”</div>`);
export const SHOTS = {
  D_H005_HOOK(s, root) {   // kamera turun ke helm kuning: tukang dari komentar menerima helm, kartu lamaran
    const sc = newScene({ sky: ['#FFD9A8', '#FFF7EC'], sun: '#FFE0B0', sunPos: [10, 10, 10], shadow: 12 }); island(sc, 14, 12, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars;
    const T = tukang([0, 0, 1]); sc.add(T); const K = kepala([1.6, 0, .6]); sc.add(K); K.rotation.y = -.8; shop(sc, [-3, 0, -2.5], { sign: '#E5484D', awn: '#F5C542' }); tower(sc, [3, 0, -2.6], 3);
    const c = comm(root, V.komentar[0][0], V.komentar[0][1], 300, 140); const st = X.ab({ left: 300, top: 980, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '90px', color: '#2E7D5B', border: '10px solid #2E7D5B', borderRadius: '20px', padding: '0 30px', transform: 'rotate(-10deg)', opacity: 0, background: '#FFFFFFCC' }, root, 'DITERIMA');
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, 3)); orbit(cam, lerp(30, 5, p), lerp(12, 2.6, p), lerp(16, 7, p), [0, 1.3, 1]); T.pose(t, { cheer: t > 2.5 && t < 5, talk: t <= 2.5 }); K.pose(t, { talk: true, nod: true });
      const q = seg(t, .2, .6); c.style.opacity = q; c.style.transform = `rotate(-2deg) scale(${E.back(q)})`; const ta = at(s, 'diterima', 3); const qq = seg(t, ta, ta + .25); st.style.opacity = qq > 0 ? 1 : 0; st.style.transform = `rotate(-10deg) scale(${lerp(2, 1, E.out(qq))})` } };
    function at(s, rx, fb) { return popAt(s, rx, fb) }
  },
  D_H005_ARRIVE(s, root) {   // papan kota: dua orang muncul dari pesawat kertas, penghitung penduduk, pin Sumedang di peta kecil
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true); const V = X.TL.vars;
    housing(sc, 0, 8, 3); [shop(sc, [-2, 0, -1.8], { sign: '#E5484D' }), shop(sc, [1.8, 0, -1.8], { sign: '#2E7D5B' })]; const tick = cars(sc, 6);
    const ppl = [0, 1].map(i => person(sc, [0, 0, 0], { s: .9, body: ['#6B4FA0', '#C9472F'][i] })); const c1 = comm(root, V.komentar[1][0], V.komentar[1][1], 300, 140), c2 = comm(root, V.komentar[3][0], V.komentar[3][1], 470, 220, 640);
    const big = X.ab({ left: 0, top: 1000, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: '#FFFFFF', WebkitTextStroke: `12px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, `👥 ${V.pend}`); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { tick(t); orbit(cam, lerp(-15, 15, E.inout(seg(t, 0, dur))), 18, 24, [0, 0, 3]); ppl.forEach((p, i) => { const q = E.out(seg(t, 1 + i * .6, 2.6 + i * .6)); p.position.set(-4 + i * 1.2, lerp(12, 0, q), 4); p.pose(t + i, { cheer: q >= 1 }) });
      [[c1, 'masukin', .5], [c2, 'Sumedang', 5]].forEach(([e, cu, fb]) => { const q = seg(t, popAt(s, cu, fb), popAt(s, cu, fb) + .4); e.style.opacity = q; e.style.transform = 'rotate(-2deg)' }); X.pop(big, seg(t, popAt(s, 'penduduk', 3), popAt(s, 'penduduk', 3) + .4)) } };
  },
  D_H005_IDEA(s, root) {   // malam di lapak: pekerja lajang tidur sendiri vs bayangan kamar kos menyala
    const sc = newScene({ sky: ['#2A3B5C', '#5E7899'], hemi: 1.1, sunI: 1, sun: '#C8D6FF', sunPos: [-6, 10, 8], shadow: 12 }); island(sc, 14, 12, '#7FA65A', '#5E4A36'); const V = X.TL.vars;
    const ghost = kos(sc, [0, 0, -1.5]); ghost.traverse(o => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = .4; o.material.emissive = new THREE.Color('#FFE7A0'); o.material.emissiveIntensity = .3 } });
    const P = person(sc, [-3.5, 0, 2], { body: '#3E8FC4' }); const zz = txtSprite('?', GOLD, NAVY, .7); sc.add(zz); const c = comm(root, V.komentar[2][0], V.komentar[2][1], 300, 140);
    const C = [['🧍 pekerja masih sendiri', 'sendiri'], ['🛏️ cukup satu kamar', 'satu kamar']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 480 + i * 105, fontSize: '40px' }) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-25, 15, E.inout(seg(t, 0, dur))), 4, 13, [0, 1.2, 0]); grow([ghost], t, popAt(s, 'kos', 1)); P.pose(t, { look: Math.sin(t) * .5 }); zz.position.set(-3.5, 2.6 + Math.sin(t * 3) * .1, 2);
      const q = seg(t, .3, .7); c.style.opacity = q; c.style.transform = 'rotate(-2deg)'; C.forEach(x => { const qq = popAt(s, x.cu, 99); X.pop(x.e, seg(t, qq, qq + .4)) }) } };
  },
  D_H005_BUILD(s, root) {   // timelapse: tukang + perancah, kos naik per lantai di samping pasar, koin keluar koper
    const sc = newScene({ sky: ['#8FD3FF', '#F4FBFF'], sunPos: [-8, 16, 8], shadow: 14 }); island(sc, 16, 14, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars;
    shop(sc, [-3.6, 0, -1], { w: 2.6, sign: '#E5484D', awn: '#F5C542' }); const K = kos(sc, [2, 0, -1]); const T = tukang([2, 0, 2.2]); sc.add(T); const J = juragan([-2, 0, 3]); sc.add(J); J.rotation.y = .5;
    const coins = Array.from({ length: 8 }, () => coin(sc, [0, -5, 0], 1.2));
    const C = [[`🏢 kos 2 lantai, ${V.kamar} kamar`, 'kamar'], [`🪙 −${V.biaya} koin`, 'bayar'], [`💼 sisa ${V.koin}`, 'tinggal']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 1 ? '#E5484D' : NAVY) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-30, 20, E.inout(seg(t, 0, dur))), 5, 15, [0, 1.4, 0]); const q = E.out(seg(t, .5, 4)); K.scale.set(1, Math.max(.001, q), 1); T.pose(t, { hold: true, nod: t < 4, cheer: t > 4.2 && t < 6 });
      const tc = popAt(s, 'bayar', 4); coins.forEach((c, i) => { const k = ((t - tc) * .7 + i / 8) % 1; c.visible = t > tc && t < tc + 2.5; c.position.set(-2 + k * 3, 1 + k * 2 - k * k * 2.6, 3 - k * 2); c.rotation.set(t * 5 + i, 0, 0) }); J.pose(t, { hold: true, shake: t > tc });
      C.forEach(c => { const qq = popAt(s, c.cu, 99); X.pop(c.e, seg(t, qq, qq + .4)) }) } };
  },
  D_H005_WALK(s, root) {   // kamera mengikuti penghuni kos jalan kaki ke pasar, mobil macet di jalan raya belakang
    const sc = newScene({ sky: ['#A9D8F5', '#FFF6E6'], sunPos: [8, 14, 8], shadow: 14 }); island(sc, 12, 22, '#9CCB6A', '#8D6E4A'); sc.add(mesh(G.box(1.6, .05, 22), '#C9C2B0', [0, .03, 0]));
    const K = kos(sc, [-2.6, 0, 6]); K.rotation.y = Math.PI / 2; const sh = shop(sc, [2.6, 0, -6], { w: 2.6, sign: '#E5484D', awn: '#F5C542' }); sh.rotation.y = -Math.PI / 2;
    const road = mesh(G.box(3, .05, 22), '#5A5F66', [5, .03, 0], { cast: false }); sc.add(road); const carsL = Array.from({ length: 8 }, (_, i) => { const m = mesh(G.box(.8, .5, 1.5), ['#E5484D', '#3E8FC4', '#F5C542', '#FFFFFF'][i % 4], [5, .3, -9 + i * 2.2]); sc.add(m); return m });
    const P = person(sc, [0, 0, 6], { body: '#3E8FC4', s: .9 }); const C = [['🚶 jalan kaki ke pasar', 'jalan kaki'], ['🚫 nggak kena macet', 'macet'], ['💰 uang lebih awet', 'awet']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, '#2E7D5B') })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = seg(t, 0, dur); P.position.z = lerp(6, -5, p); P.rotation.y = Math.PI; P.pose(t, { walk: 1 }); cam.position.set(2.6, 3.6, P.position.z + 8); cam.lookAt(-.5, 1, P.position.z - 2); carsL.forEach((c, i) => c.position.z = -9 + i * 2.2 + Math.sin(t * .5 + i) * .1);
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  D_H005_RULE(s, root) {   // koper Juragan terbuka, hati like berubah jadi koin yang terbang masuk
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: 1, sunI: 2.4, sunPos: [8, 10, 10] }); island(sc, 8, 6, '#E8D9B5', '#B5835A'); const V = X.TL.vars;
    const box = group(sc, [0, 0, 0]); box.add(mesh(G.box(2.4, .8, 1.5), '#7A3B1E', [0, .4, 0])); const lid = group(box, [0, .8, -.75]); lid.add(mesh(G.box(2.4, .1, 1.5), '#7A3B1E', [0, 0, .75])); const J = juragan([-2, 0, 1]); sc.add(J); J.rotation.y = .6;
    const hearts = Array.from({ length: 10 }, () => { const sp = txtSprite('❤', '#FFFFFF', '#E5484D', .7); sc.add(sp); return sp }); const coins = Array.from({ length: 10 }, () => coin(sc, [0, -5, 0], 1.3));
    const rule = chip(root, '❤ 10 like = 🪙 10 koin', { left: 200, top: 300, fontSize: '50px' }, '#E5484D'), c2 = chip(root, '🚌/🚆 hasil dua hari lagi', { left: 210, top: 430, fontSize: '42px' });
    const big = X.ab({ left: 0, top: 1000, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '110px', color: GOLD, WebkitTextStroke: `12px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, `🪙 ${V.koin}`); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .3) * 12, 3, 8, [0, .8, 0]); lid.rotation.x = -E.out(seg(t, .3, 1)) * 1.8; X.pop(big, seg(t, .3, .7)); J.pose(t, { hold: true, nod: t > popAt(s, 'aturan baru', 3) });
      const tr = popAt(s, 'sepuluh like', 4); X.pop(rule, seg(t, tr, tr + .4)); X.pop(c2, seg(t, popAt(s, 'dua hari', dur - 2), popAt(s, 'dua hari', dur - 2) + .4));
      hearts.forEach((h, i) => { const k = seg(t, tr + i * .3, tr + i * .3 + 1.2); h.visible = k > 0 && k < .5; coins[i].visible = k >= .5 && k < 1; const x = Math.sin(i * 2.3) * 3 * (1 - k), y = 4 - k * 3.4; h.position.set(x, y, Math.cos(i) * 1.5 * (1 - k)); coins[i].position.set(x, y, Math.cos(i) * 1.5 * (1 - k)); coins[i].rotation.y = t * 5 }) } };
  },
};

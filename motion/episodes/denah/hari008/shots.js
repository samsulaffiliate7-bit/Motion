// Shot Denah Hari 8: koper kosong, pajak lebar rumah (rumah kanal), klinik berdiri, malam pasien pertama, peta jarak klinik, lahan stadion + target like.
import { THREE, lerp, seg, E, mesh, mat, G, group, newScene, camera, orbit, island, house, person, coin } from '../../../engine/w3d/kit.js';
import { X, NAVY, GOLD, TERRA, CREAM, juragan, kepala, chip, popAt, stars, cityBoard, CC, RC, housing, shop, tower, cars, grow, txtSprite, canalRow } from '../../../engine/w3d/bumi.js';
const at = popAt;
function clinic(parent, p) { const g = group(parent, p); g.add(mesh(G.box(3, 1.6, 2), '#FFFFFF', [0, .8, 0])); g.add(mesh(G.box(3.2, .2, 2.2), '#2E7D5B', [0, 1.7, 0])); g.add(mesh(G.box(.6, .18, .05), '#E5484D', [0, 1.2, 1.02])); g.add(mesh(G.box(.18, .6, .05), '#E5484D', [0, 1.2, 1.03]));
  const door = mesh(G.box(.7, 1, .05), '#9ED8F5', [0, .5, 1.02], { mat: { emissive: '#FFF3C4', emissiveIntensity: 0 } }); g.add(door); g.userData.door = door; return g }
const big = (root, txt, col = NAVY, top = 290) => X.ab({ left: 0, top, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '130px', color: GOLD, WebkitTextStroke: `14px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, txt);
export const SHOTS = {
  D_H008_HOOK(s, root) {   // frame 1: koper terbuka kosong close-up, koin terakhir menggelinding; label -30
    const sc = newScene({ sky: ['#FFE3B8', '#FFF8EE'], sun: '#FFE0B0', sunPos: [8, 10, 10], shadow: 8 }); island(sc, 10, 8, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars;
    const cs = group(sc, [0, .3, 0]); cs.add(mesh(G.box(2.2, .6, 1.4), '#7A3B1E', [0, 0, 0])); const lid = mesh(G.box(2.2, .1, 1.4), '#7A3B1E', [0, .35, -.7]); lid.geometry.translate(0, 0, .7); cs.add(lid); lid.rotation.x = -1.2; cs.add(mesh(G.box(2, .05, 1.2), '#3A1E0E', [0, .28, 0], { cast: false }));
    const cn = coin(sc, [0, .7, 0], 1.3); const J = juragan([2.2, 0, .6]); sc.add(J); J.rotation.y = -.8; const K = kepala([-2.2, 0, .6]); sc.add(K); K.rotation.y = .8;
    const minus = big(root, `−${V.kurang}`, '#C9472F'); const pj = chip(root, '💡 jalan keluar: PAJAK', { left: 250, top: 470, fontSize: '50px' }, TERRA); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.5, 0, p), lerp(3, 4, p), lerp(6.5, 9.5, p)); cam.lookAt(0, .9, 0); cn.position.x = lerp(0, -.8, E.out(seg(t, 0, 1.5))); cn.rotation.z = t * 4;
      J.pose(t, { shake: true }); K.pose(t, { point: t > popAt(s, 'pajak', 6), talk: true }); X.pop(minus, seg(t, .1, .45)); X.pop(pj, seg(t, popAt(s, 'pajak', 6), popAt(s, 'pajak', 6) + .4)) } };
  },
  D_H008_TAX(s, root) {   // deretan rumah kanal sempit; petugas mengukur lebar muka rumah dengan pita, koin melayang ke koper
    const sc = newScene({ sky: ['#9FD6F5', '#F3FBFF'], sunPos: [-6, 14, 10], shadow: 14 }); island(sc, 16, 8, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars; const row = canalRow(sc, 7, -1, -6);
    const tape = mesh(G.box(1.4, .05, .05), GOLD, [0, 1, 1.2], { cast: false }); sc.add(tape); const K = kepala([0, 0, 2.2]); sc.add(K);
    const coins = Array.from({ length: 8 }, () => coin(sc, [0, 0, 0], .9)); const ca = chip(root, 'A lebar 1 : 1 C tinggi', { left: 220, top: 300, fontSize: '46px' }), cb = chip(root, '👑 Kepala Bumi pilih: LEBAR', { left: 180, top: 410, fontSize: '46px' }, TERRA), cc = chip(root, `🪙 pajak +${V.pajak} koin`, { left: 300, top: 1080, fontSize: '52px' }, '#2E7D5B'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .2) * 12, 3, 13, [0, 1.6, 0]); const k = (t * .25) % 1; tape.position.x = lerp(-5, 5, k); K.position.x = tape.position.x; K.pose(t, { walk: 1 });
      const tp = popAt(s, 'Pajak pertama', 7); coins.forEach((c, i) => { const q = seg(t, tp + i * .15, tp + .9 + i * .15); c.visible = q > 0 && q < 1; c.position.set(lerp(-4 + i, 0, q), lerp(1.5, 4, Math.sin(q * Math.PI)), lerp(-1, 2, q)) });
      X.pop(ca, seg(t, .3, .7)); X.pop(cb, seg(t, popAt(s, 'memilih', 3), popAt(s, 'memilih', 3) + .4)); X.pop(cc, seg(t, tp, tp + .4)) } };
  },
  D_H008_CLINIC(s, root) {   // drone: klinik putih tumbuh di samping perumahan, angka koin turun 190 -> 10
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true); housing(sc, -8, 8, 3); const V = X.TL.vars; const tick = cars(sc, 6);
    const C = clinic(sc, [-8, 0, 1.6]); const num = big(root, '🪙 ' + V.koin1); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { tick(t); orbit(cam, lerp(-15, 10, seg(t, 0, dur)), 12, 16, [-6, 0, 4]); const tc = popAt(s, 'dibangun', 3); const q = E.back(seg(t, tc, tc + .8)); C.scale.set(1, Math.max(.001, q), 1);
      num.style.opacity = seg(t, .2, .5); const k = E.inout(seg(t, popAt(s, 'Sisa koin', 6) - .3, popAt(s, 'Sisa koin', 6) + .7)); num.textContent = '🪙 ' + Math.round(lerp(V.koin1, V.koin, k)) } };
  },
  D_H008_NIGHT(s, root) {   // malam: tangga proyek, mandor terpeleset (tanda !), dipapah ke klinik yang pintunya menyala hangat
    const sc = newScene({ sky: ['#1B2A4A', '#45608F'], hemi: 1.1, sunI: 1.1, sun: '#C8D6FF', sunPos: [-6, 10, 8], shadow: 12 }); stars(sc, 200); island(sc, 14, 10, '#7FA65A', '#5E4A36');
    const C = clinic(sc, [3, 0, -1.5]); const L = new THREE.PointLight('#FFE7A0', 8, 8); L.position.set(3, 1.2, 0); sc.add(L);
    const scaff = group(sc, [-3.5, 0, -1]); [[-1, 0], [1, 0]].forEach(([x]) => scaff.add(mesh(G.box(.1, 3, .1), '#B0B7BF', [x, 1.5, 0]))); [.8, 1.6, 2.4].forEach(y => scaff.add(mesh(G.box(2.2, .08, .4), '#9C6B3E', [0, y, 0])));
    const M = person(sc, [-3.5, 1.65, -.8], { body: '#F28C28', hat: 'cap', hatC: '#FFD54A' }); const H = person(sc, [-2.8, 0, 0], { body: '#2E7D5B' }); const ex = txtSprite('!', '#E5484D', '#fff', .8); sc.add(ex);
    const c1 = chip(root, '🩹 pasien pertama', { left: 320, top: 300, fontSize: '50px' }, '#C9472F'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-25, 10, seg(t, 0, dur)), 3.5, 12, [0, 1.2, -.5]); const tf = popAt(s, 'terpeleset', 1.5); const fall = E.inout(seg(t, tf, tf + .6)); const walk = seg(t, popAt(s, 'ditangani', 6) - 3, popAt(s, 'ditangani', 6));
      M.position.set(lerp(-3.5, 2.6, walk), lerp(1.65, 0, fall), lerp(-.8, .2, walk)); M.rotation.z = fall < 1 ? fall * .6 : (walk > 0 ? 0 : .6); M.pose(t, { walk: walk > 0 && walk < 1 ? .5 : 0 }); H.position.set(M.position.x + .7, 0, M.position.z + .3); H.pose(t, { walk: walk > 0 && walk < 1 ? 1 : 0 });
      ex.visible = t > tf && t < tf + 2; ex.position.set(-3.2, 2.6, -.8); C.userData.door.material.emissiveIntensity = 1 + Math.sin(t * 3) * .2; X.pop(c1, seg(t, popAt(s, 'klinik baru', 3), popAt(s, 'klinik baru', 3) + .4)) } };
  },
  D_H008_LESSON(s, root) {   // peta atas: lingkaran jarak dari klinik menyapu perumahan, garis jalan pendek vs panjang
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); housing(sc, -8, 8, 3); housing(sc, -8, 0, 2); const C = clinic(sc, [-8, 0, 4.4]); C.scale.setScalar(.8);
    const ring = mesh(new THREE.RingGeometry(1, 1.2, 48), '#2E7D5B', [-8, .15, 4.4], { rot: [-Math.PI / 2, 0, 0], mat: { transparent: true, opacity: .7, side: THREE.DoubleSide }, cast: false }); sc.add(ring);
    const c1 = chip(root, '🏥 dekat permukiman', { left: 290, top: 300, fontSize: '48px' }, '#2E7D5B'), c2 = chip(root, '⏱️ makin cepat ditolong', { left: 250, top: 410, fontSize: '46px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .2) * 8, 24, 14, [-6, 0, 3]); const k = (t * .4) % 1; ring.scale.setScalar(1 + k * 6); ring.material.opacity = .7 * (1 - k);
      X.pop(c1, seg(t, popAt(s, 'dekat permukiman', 2), popAt(s, 'dekat permukiman', 2) + .4)); X.pop(c2, seg(t, popAt(s, 'cepat', 4), popAt(s, 'cepat', 4) + .4)) } };
  },
  D_H008_ASK(s, root) {   // lahan kosong berpatok berubah jadi bayangan stadion mini transparan; meter like 0/200; pemain bola menunggu
    const sc = newScene({ sky: ['#FFD9A8', '#FFF7EC'], sun: '#FFE0B0', sunPos: [10, 10, 10], shadow: 14 }); island(sc, 16, 12, '#9CCB6A', '#8D6E4A'); const V = X.TL.vars;
    const field = mesh(G.box(8, .06, 5), '#5FAE4E', [0, .04, 0], { cast: false }); sc.add(field); [[-4, 0], [4, 0]].forEach(([x]) => { const g = group(sc, [x, 0, 0]); g.add(mesh(G.box(.1, 1.2, .1), '#FFFFFF', [0, .6, -.9])); g.add(mesh(G.box(.1, 1.2, .1), '#FFFFFF', [0, .6, .9])); g.add(mesh(G.box(.1, .1, 1.9), '#FFFFFF', [0, 1.2, 0])) });
    const stands = [-1, 1].map(z => { const m = mesh(G.box(8.6, 1.4, 1.4), '#B7C9DB', [0, .7, z * 3.4], { mat: { transparent: true, opacity: .35 } }); sc.add(m); return m });
    const ppl = [0, 1, 2].map(i => person(sc, [-1.5 + i * 1.5, 0, 1], { body: ['#2E7D5B', '#E5484D', '#3E8FC4'][i], pants: '#FFFFFF' }));
    const meter = X.ab({ left: 90, top: 1060, width: 900, height: 70, background: '#FFFFFF', border: `6px solid ${NAVY}`, borderRadius: '40px', overflow: 'hidden', opacity: 0 }, root, `<div style="height:100%;width:6%;background:#E5484D"></div>`);
    const c1 = chip(root, `🏟️ ${V.target} like = stadion mini`, { left: 190, top: 300, fontSize: '48px' }), c2 = chip(root, '📅 hasil 2 hari lagi', { left: 300, top: 1160, fontSize: '46px' }, TERRA); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .25) * 14, 6, 15, [0, .8, 0]); ppl.forEach((p, i) => p.pose(t + i, { cheer: (t + i) % 3 < 1 })); stands.forEach(m => m.material.opacity = .25 + Math.sin(t * 2) * .1);
      X.pop(c1, seg(t, popAt(s, 'Deal', 2), popAt(s, 'Deal', 2) + .4)); meter.style.opacity = seg(t, popAt(s, 'like', 3), popAt(s, 'like', 3) + .3); X.pop(c2, seg(t, popAt(s, 'dua hari', 6), popAt(s, 'dua hari', 6) + .4)) } };
  },
};

// Shot ep015 (Ini yang Gue Lakuin: Raka hitung untung bersih freelance)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin } from '../../../engine/w3d/kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, kos, chip, tag3, at } from '../../../engine/w3d/nana.js';
const raka = (parent, p, o = {}) => { const g = person(parent, p, Object.assign({ body: '#4A6FA5', pants: '#2F3540', hair: '#16100C', skin: '#C98E64' }, o)); g.add(mesh(G.box(.06, .7, .04), '#3A2A1E', [0, 1.05, .28], { rot: [0, 0, .7], cast: false })); g.add(mesh(G.box(.3, .22, .1), '#3A2A1E', [.3, .78, .2])); return g };
const big = (root, html, top, col = BATA, fs = 92) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `16px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };
const lap = (parent, p, glow = '#9CC3E6') => { const g = group(parent, p); g.add(mesh(G.box(.9, .04, .6), '#B0B7BF', [0, 0, 0])); g.add(mesh(G.box(.9, .6, .03), '#2A2F36', [0, .3, -.3], { rot: [-.25, 0, 0] })); g.add(mesh(G.box(.82, .52, .01), glow, [0, .3, -.28], { rot: [-.25, 0, 0], mat: { emissive: glow, emissiveIntensity: .9 }, cast: false })); return g };

export const SHOTS = {
  D3_E015_TRANSFER(s, root) {   // kamar Raka malam: notifikasi transfer 2 juta muncul, koin menyembur, lalu angka "bersih?" bergoyang
    const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: 1.3, hemi: 1.3, sun: '#FFE2C2', sunPos: [-5, 9, 7] })); kos(sc, { wall: '#C9D6E6' });
    const L = new THREE.PointLight('#FFD9A8', 14, 10); L.position.set(0, 3.4, 0); sc.add(L);
    sc.add(mesh(G.box(2.6, .1, 1.2), '#9C6B3E', [0, .8, -2.4])); [[-1.2, -.5], [1.2, -.5], [-1.2, .5], [1.2, .5]].forEach(([x, z]) => sc.add(mesh(G.box(.08, .8, .08), '#5E3E22', [x, .4, -2.4 + z])));
    lap(sc, [0, .86, -2.4], '#7FE0A8'); const R = raka(sc, [.4, 0, -1.2]); R.rotation.y = Math.PI * .9;
    const coins = Array.from({ length: 16 }, () => coin(sc, [0, -5, 0], 1.6)); const cam = camera(42);
    const nt = X.ab({ left: 120, top: 300, width: 840, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: '26px', padding: '14px 24px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '46px', color: INK, boxShadow: `0 10px 0 #2E7D32`, opacity: 0 }, root, `🔔 Transfer masuk <span style="color:#2E7D32">Rp2.000.000</span><div style="font-size:30px;color:#7A6A5A">bayaran proyek freelance</div>`);
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root, `Freelance dapat <span style="color:#2E7D32">2 juta</span>.<br>Bersihnya ternyata <span style="color:${BATA}">segini</span>.`);
    return { scene: sc, cam, upd(t, dur) {
      coins.forEach((c, i) => { const q = (t * .5 + i / 16) % 1; c.visible = t > .6 && t < 5; c.position.set(Math.sin(i * 2.4) * q * 2, 1.2 + Math.sin(q * Math.PI) * 2.4, -2.2 + Math.cos(i * 2.4) * q); c.rotation.set(t * 3 + i, 0, 0) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3.4, 2.6, p), lerp(3, 2.8, p), lerp(1.2, .4, p)); cam.lookAt(0, 1.3, -2);
      R.pose(t, { cheer: t < 4, shake: t > at(s, 'bersihnya', 6) }); X.pop(nt, seg(t, .3, .7)); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5 ? 'none' : 'block';
    } };
  },
  D3_E015_KAFE(s, root) {   // kafe kerja siang: tumpukan uang di meja, empat potongan terbang keluar satu per satu, sisa 1,4 juta
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#FFD9A0', '#FFF6E6'], sunPos: [-7, 9, 8], hemi: 1.5 })); sc.add(mesh(G.box(16, .2, 14), '#8A5A3A', [0, -.1, 0])); sc.add(mesh(G.box(16, 6, .2), '#E9C49A', [0, 3, -4]));
    [-3.4, 3.4].forEach(x => sc.add(mesh(G.box(2.6, 2.4, .05), '#BFE6F5', [x, 3.1, -3.88], { mat: { emissive: '#DDF3FF', emissiveIntensity: .5 }, cast: false })));
    for (let i = 0; i < 4; i++) sc.add(mesh(G.cyl(.18, .18, .02, 12), '#FFE8B0', [-3 + i * 2, 5.4, -1], { mat: { emissive: '#FFD27A', emissiveIntensity: 1.2 }, cast: false }));
    sc.add(mesh(G.cyl(1.1, 1.1, .08, 24), '#F4E4CC', [0, .82, -1])); sc.add(mesh(G.cyl(.08, .12, .8, 8), '#3A2A1E', [0, .4, -1])); lap(sc, [-.4, .86, -1.2]); sc.add(mesh(G.cyl(.12, .1, .22, 12), '#FFFFFF', [.6, .97, -.8]));
    const R = raka(sc, [-.4, 0, -2.4]); R.userData.st.legs.forEach(l => l.rotation.x = -1.3);
    const notes = Array.from({ length: 20 }, (_, i) => { const m = mesh(G.box(.5, .02, .26), '#9AD4A8', [.5, .88 + i * .025, -1.3]); sc.add(m); return m });
    const cam = camera(42); const list = X.ab({ left: 90, top: 300, width: 900, background: CREAM, border: `6px solid ${INK}`, borderRadius: '24px', padding: '12px 24px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 10px 0 ${BATA}` }, root);
    const rest = big(root, `bersih ${v.bersih_rp}`, 1150, '#2E7D32', 84);
    return { scene: sc, cam, upd(t, dur) {
      const tc = [at(s, 'Potongan', .5), at(s, 'Kuota', 4), at(s, 'Kopi', 7), at(s, 'Langganan', 10)], ts = at(s, 'Sisanya', dur - 3);
      let k = 0; tc.forEach((x, i) => { if (t >= x) k = i + 1 });
      list.innerHTML = `<div>💰 bayaran: Rp2.000.000</div>` + v.cuts.slice(0, k).map(([a, b]) => `<div style="color:#C0392B">− ${a}: ${b}</div>`).join('');
      const left = Math.round(lerp(20, 14, k / 4)); notes.forEach((m, i) => { const out = i >= left; const q = out ? seg(t, tc[Math.min(3, Math.floor((19 - i) / 1.5))], tc[Math.min(3, Math.floor((19 - i) / 1.5))] + .8) : 0; m.position.set(.5 + q * 3, .88 + i * .025 + Math.sin(q * Math.PI) * 1.4, -1.3 + q); m.rotation.z = q * 4; m.visible = q < .98 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, 1.2, p), lerp(3.2, 3, p), lerp(4.6, 3.8, p)); cam.lookAt(0, 1, -1.2);
      R.pose(t, { hold: true, shake: k > 2 }); R.userData.st.legs.forEach(l => l.rotation.x = -1.3); show(rest, seg(t, ts, ts + .5));
    } };
  },
  D3_E015_HALTE(s, root) {   // halte bus pagi: jam raksasa berputar 20 jam, dua papan tarif per jam (freelance vs kantor)
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#9FD3F0', '#FFF1D6'], sun: '#FFF4E0', sunPos: [-8, 10, 8], hemi: 1.5, shadow: 16 })); sc.add(mesh(G.box(30, .2, 14), '#7A7A84', [0, -.1, 2])); sc.add(mesh(G.box(30, .25, 3), '#B5BCC5', [0, .02, -2]));
    const st = group(sc, [-1, 0, -2.4]); st.add(mesh(G.box(4.4, .12, 1.8), '#3E8FC4', [0, 2.6, 0])); [-2.1, 2.1].forEach(x => st.add(mesh(G.box(.1, 2.6, .1), '#DDD', [x, 1.3, .7]))); st.add(mesh(G.box(3.6, .1, .5), '#7A5230', [0, .5, -.4]));
    for (let i = 0; i < 8; i++) { const h = 4 + (i * 37 % 6); sc.add(mesh(G.box(2.6, h, 2), ['#D9C2A8', '#C6D2DC', '#E3CFC0'][i % 3], [-12 + i * 3.4, h / 2, -7], { cast: false })) }
    const ck = group(sc, [2.6, 3.2, -2]); ck.add(mesh(G.cyl(.9, .9, .1, 32), '#FFFFFF', [0, 0, 0], { rot: [Math.PI / 2, 0, 0] })); ck.add(mesh(G.cyl(.98, .98, .08, 32), INK, [0, 0, -.04], { rot: [Math.PI / 2, 0, 0] })); ck.add(mesh(G.cyl(.06, .08, 3.2, 8), '#555', [0, -1.6, -.1]));
    const hand = group(ck, [0, 0, .07]); hand.add(mesh(G.box(.07, .7, .02), BATA, [0, .3, 0], { cast: false }));
    const R = raka(sc, [-.4, 0, -1.1]); const cam = camera(42);
    const hrs = X.ab({ left: 330, top: 300, background: INK, color: GOLD, fontFamily: 'Baloo', fontWeight: 800, fontSize: '64px', padding: '4px 28px', borderRadius: '18px' }, root);
    const two = X.ab({ left: 60, top: 420, width: 960, display: 'flex', gap: '20px', justifyContent: 'center', opacity: 0 }, root, `<div style="background:#2E7D32;color:#fff;font-family:Baloo;font-weight:800;font-size:40px;padding:14px 22px;border-radius:22px;border:6px solid ${INK};text-align:center">freelance<br>${v.per_jam}/jam</div><div style="background:#7A8594;color:#fff;font-family:Baloo;font-weight:800;font-size:40px;padding:14px 22px;border-radius:22px;border:6px solid ${INK};text-align:center">gaji kantor<br>±${v.kantor}/jam</div>`);
    return { scene: sc, cam, upd(t, dur) {
      const th = at(s, 'dua puluh jam', 1.5), tp = at(s, 'per jamnya', 5); const g = seg(t, th, th + 3); hand.rotation.z = -g * Math.PI * 2 * 20 / 12 * 3; hrs.textContent = `⏱ ${Math.round(g * 20)} jam`;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-.4, 1.2, p), lerp(3, 3.4, p), lerp(10, 9.4, p)); cam.lookAt(1.2, 1.8, -2);
      R.pose(t, { talk: true, look: .6, nod: t > tp + 2 }); X.pop(two, seg(t, tp, tp + .4));
    } };
  },
  D3_E015_AMPLOP(s, root) {   // meja Raka tampak atas: bayaran dibagi ke tiga amplop (biaya, cadangan 20%, boleh dipakai), sepatu baru menunggu bulan depan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#FFE0B0', '#FFF6E6'], sunPos: [-6, 12, 5], hemi: 1.5 })); sc.add(mesh(G.box(9, .3, 6), '#B98A5E', [0, -.15, 0]));
    const envs = [['BIAYA', '#E5484D'], ['CADANGAN 20%', '#3E8FC4'], ['BOLEH DIPAKAI', '#2E9C6A']].map(([lb, c], i) => { const cc = document.createElement('canvas'); cc.width = 400; cc.height = 260; const x = cc.getContext('2d'); x.fillStyle = '#F4E9D2'; x.fillRect(0, 0, 400, 260); x.fillStyle = c; x.fillRect(0, 0, 400, 70); x.fillStyle = '#fff'; x.font = '800 40px Baloo'; x.textAlign = 'center'; x.fillText(lb, 200, 50);
      const t = new THREE.CanvasTexture(cc); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(G.box(2, .06, 1.3), [mat('#EEE'), mat('#EEE'), new THREE.MeshStandardMaterial({ map: t }), mat('#EEE'), mat('#EEE'), mat('#EEE')]); m.castShadow = true; m.position.set(-2.4 + i * 2.4, .03, -.4); sc.add(m); return m });
    const notes = Array.from({ length: 14 }, () => { const m = mesh(G.box(.5, .02, .26), '#9AD4A8', [0, 0, 0]); sc.add(m); return m });
    const shoe = group(sc, [2.4, 0, 1.8]); shoe.add(mesh(G.box(.9, .3, .4), '#E5484D', [0, .15, 0])); shoe.add(mesh(G.box(.4, .3, .4), '#E5484D', [-.25, .4, 0])); shoe.add(mesh(G.box(.95, .08, .45), '#FFFFFF', [0, .02, 0]));
    const cam = camera(42); const cd = chip(root, `🛟 cadangan: <span style="color:#3E7CB1">${v.cad_rp}</span>`, { left: 200, top: 300, fontSize: '46px' }), sh = chip(root, '👟 sepatu: bulan depan', { left: 250, top: 410, fontSize: '42px' }, BATA);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '46px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Punya kerjaan sampingan?<br><span style="color:${BATA}">Bersihnya berapa?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tc = at(s, 'dua puluh persen', 4), tsh = at(s, 'sepatunya', dur * .7), tq = at(s, 'Lo punya', dur - 3);
      notes.forEach((m, i) => { const tgt = i < 4 ? 0 : i < 7 ? 1 : 2; const q2 = E.inout(seg(t, 1 + i * .15, 1.6 + i * .15)); m.position.set(lerp(0, -2.4 + tgt * 2.4 + Math.sin(i) * .2, q2), .1 + i * .01 + Math.sin(q2 * Math.PI) * .6, lerp(1.6, -.4 + Math.cos(i) * .15, q2)); m.rotation.y = i * .7 });
      envs[1].scale.setScalar(t > tc && t < tc + 1.5 ? 1.08 : 1); shoe.rotation.y = t * .6; shoe.position.y = Math.sin(t * 2) * .05;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(Math.sin(t * .2) * .4, lerp(9, 9.6, p), lerp(7, 6.4, p)); cam.lookAt(0, 0, .4);
      X.pop(cd, seg(t, tc, tc + .4)); X.pop(sh, seg(t, tsh, tsh + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

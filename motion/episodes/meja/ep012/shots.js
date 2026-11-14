// Shot ep012 (Seri Jenis Staf: si paling siap pak)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from '../../../engine/w3d/kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, room, laptop, desk, clock3 } from '../../../engine/w3d/kantor.js';
const bub = (root, html, col, css = {}) => X.ab(Object.assign({ background: col, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '42px', padding: '10px 24px', borderRadius: '26px 26px 6px 26px', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
const folder = (parent, p, c) => mesh(G.box(.7, .08, .5), c, p, { rot: [0, Math.random() * .3 - .15, 0] });

export const SHOTS = {
  M_E012_SIAP(s, root) {   // meja bos pagi terang: tiga map melayang ke staf satu per satu, tiap kali gelembung "Siap, Pak!"
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.3, sunPos: [-6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#E9EEF4', wall2: '#D8E0EA', floor: '#B8C2CE', window: true });
    desk(sc, [0, 0, -1.6], 2.6); laptop(sc, [.5, .82, -1.7], '#F2C58A'); const B = bos([0, 0, -2.4]); sc.add(B); const S = staf([0, 0, .6]); sc.add(S); S.rotation.y = Math.PI;
    const maps = [0, 1, 2].map(i => { const m = mesh(G.box(.6, .07, .45), ['#E5484D', '#F2B41B', '#3E8FC4'][i], [0, 0, 0]); sc.add(m); return m });
    const cam = camera(42); const b = [0, 1, 2].map(i => bub(root, 'Siap, Pak! 👍', BLUE, { left: 300 + (i - 1) * 60, top: 380 + i * 110 }));
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Jawabnya selalu <span style="color:${BLUE}">"siap, Pak"</span>.<br>Hasilnya nggak pernah siap.`);
    return { scene: sc, cam, upd(t, dur) {
      const tc = [at(s, 'Tugas pertama', 1.5), at(s, 'Tugas kedua', 3), at(s, 'Tugas ketiga', 4.5)];
      maps.forEach((m, i) => { const q = E.inout(seg(t, tc[i], tc[i] + .8)); m.position.set(lerp(0, .5 - i * .05, q), lerp(.9, 1.1 + i * .08, q) + Math.sin(q * Math.PI) * .8, lerp(-1.6, .9, q)); m.visible = t > tc[i] - .2 });
      b.forEach((e, i) => X.pop(e, seg(t, tc[i] + .6, tc[i] + 1)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3.4, 2.6, p), lerp(3, 2.8, p), lerp(5.6, 4.6, p)); cam.lookAt(0, 1.3, -.6);
      B.pose(t, { talk: t < tc[2] + 1, point: tc.some(x => t > x && t < x + .8) }); S.pose(t, { nod: t > tc[0], hold: t > tc[0] }); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > tc[0] + .2 ? 'none' : 'block';
    } };
  },
  M_E012_TUMPUK(s, root) {   // meja staf Kamis sore (cahaya oranye): tumpukan map tumbuh setinggi kepala, jam dinding berputar cepat
    const sc = newScene({ bg: '#F2D6B8', hemi: 1.2, hemiSky: '#FFE9D2', sun: '#FFC58A', sunI: 2, sunPos: [-8, 5, 6] }); room(sc, { wall: '#F2DCC2', wall2: '#E8CFB2', floor: '#9C8A72', window: true });
    desk(sc, [0, 0, -1.6], 3); laptop(sc, [.8, .82, -1.7]); const C = clock3(sc, [-2, 3.4, -3.85]); const S = staf([.4, 0, -.6]); sc.add(S); S.rotation.y = Math.PI * .9;
    const stack = Array.from({ length: 22 }, (_, i) => { const m = folder(sc, [-.7, .86 + i * .085, -1.6], ['#E5484D', '#F2B41B', '#3E8FC4', '#FFFFFF'][i % 4]); sc.add(m); return m });
    const B = bos([3.6, 0, 0]); sc.add(B); B.rotation.y = -1.4; const cam = camera(42);
    const q1 = bub(root, '"Yang laporan gimana?"', ORANGE, { left: 120, top: 300, borderRadius: '26px 26px 26px 6px' }), a1 = bub(root, '"Lagi dikerjain, Pak!"', BLUE, { left: 380, top: 410 });
    const tr = chip(root, '🔒 kepercayaan bos turun', { left: 200, top: 530, fontSize: '40px' }, '#C0392B');
    return { scene: sc, cam, upd(t, dur) {
      const h = 16 + t * .8; C.userData.h.rotation.z = -(h % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(h % 1) * Math.PI * 2 * 4;
      const n = Math.round(lerp(6, 22, seg(t, 0, dur * .5))); stack.forEach((m, i) => m.visible = i < n);
      const tb = at(s, 'Bos nanyain', 3), tp = at(s, 'percaya', dur * .6); const wb = E.inout(seg(t, tb - 1, tb)); B.position.x = lerp(3.6, 1.8, wb); B.pose(t, { walk: wb > 0 && wb < 1 ? 1 : 0, talk: t > tb && t < tb + 2, shake: t > tp });
      S.pose(t, { shake: t > tb + 1.5 }); const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2, -1, p), lerp(2.8, 3, p), lerp(5.4, 4.8, p)); cam.lookAt(0, 1.6, -1.4);
      X.pop(q1, seg(t, tb, tb + .4) * (t < tp ? 1 : 0)); X.pop(a1, seg(t, tb + 1.2, tb + 1.6) * (t < tp ? 1 : 0)); X.pop(tr, seg(t, tp, tp + .4));
    } };
  },
  M_E012_BALKON(s, root) {   // balkon kantor malam (lampu kota terang): staf curhat ke rekan, tiga alasan muncul sebagai kartu
    const v = X.TL.vars; const sc = newScene({ bg: '#2E3A5C', hemi: 1.3, hemiSky: '#E0E8FF', hemiGround: '#5A6A8A', sunI: 1.4, sun: '#DCE6FF', sunPos: [5, 9, 6], fog: ['#3A4670', 16, 50] });
    sc.add(mesh(G.box(8, .2, 4), '#8A8A92', [0, -.1, 0])); sc.add(mesh(G.box(8, .9, .08), '#BFE6F5', [0, .45, 1.9], { mat: { transparent: true, opacity: .4 } })); sc.add(mesh(G.box(8, .06, .1), '#DDD', [0, .92, 1.9]));
    for (let i = 0; i < 16; i++) { const h = 5 + (i * 41 % 12); sc.add(mesh(G.box(2.2, h, 2), '#3A4664', [-18 + i * 2.6, h / 2 - 8, 14 + (i % 3) * 3], { cast: false })); for (let k = 0; k < 6; k++) sc.add(mesh(G.box(.4, .35, .05), '#FFD27A', [-18.6 + i * 2.6 + (k % 2) * .9, h - 9 - Math.floor(k / 2) * 1.4, 12.95 + (i % 3) * 3], { mat: { emissive: '#FFC27A', emissiveIntensity: 1.2 }, cast: false })) }
    const L = new THREE.PointLight('#FFE2B0', 14, 10); L.position.set(0, 3, 0); sc.add(L);
    const S = staf([-.6, 0, .6]); sc.add(S); S.rotation.y = Math.PI - .9; const R = staf([.8, 0, .4], { body: '#E3B6C2', hair: '#1E1410' }); sc.add(R); R.rotation.y = Math.PI + .9;
    const cam = camera(42); const cards = v.why.map(([ic, h], i) => X.ab({ left: 70, top: 300 + i * 120, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '38px', color: INK, boxShadow: `0 8px 0 ${[BLUE, ORANGE, '#5E9C4A'][i]}`, opacity: 0 }, root, `${ic} ${i + 1}. ${h}`));
    const sum = chip(root, '"siap" = minta tolong, bunyinya beda', { left: 140, top: 680, fontSize: '38px' }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.4, .8, p), lerp(3, 3.2, p), lerp(-7, -6.2, p)); cam.lookAt(0, 1.2, .8);
      S.pose(t, { talk: Math.sin(t * 1.3) > -.3, look: .3 }); R.pose(t, { nod: true, look: -.3 });
      v.why_cues.forEach((cu, i) => { const tc = at(s, cu, 2 + i * 3); X.pop(cards[i], seg(t, tc, tc + .4)) }); const ts = at(s, 'minta tolong', dur - 2); X.pop(sum, seg(t, ts, ts + .4));
    } };
  },
  M_E012_RUMUS(s, root) {   // ruang rapat kecil pagi: papan tulis menulis rumus "Siap, tapi..." untuk staf dan "kapan?" untuk bos; pertanyaan
    const sc = newScene({ bg: '#E4EEF7', hemi: 1.3, sunPos: [-6, 12, 8], sun: '#FFF4E0' }); room(sc, { wall: '#EEF3F8', wall2: '#DDE6EF', floor: '#A9B4C2', window: true });
    const wb = group(sc, [0, 0, -3.8]); wb.add(mesh(G.box(4.6, 2.6, .08), '#FFFFFF', [0, 2.6, 0])); wb.add(mesh(G.box(4.8, .12, .2), '#7A8594', [0, 1.25, .05]));
    sc.add(mesh(G.box(3, .1, 1.2), '#E7DCCB', [0, .78, -1])); const S = staf([-1, 0, 0]); sc.add(S); S.rotation.y = Math.PI * .9; const B = bos([1.2, 0, 0]); sc.add(B); B.rotation.y = -Math.PI * .9;
    const cam = camera(42);
    const st = X.ab({ left: 60, top: 300, width: 960, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '34px', color: INK, boxShadow: `0 8px 0 ${BLUE}`, opacity: 0 }, root,
      `<div style="font-weight:800;color:${BLUE};font-size:36px">STAF: siap + tanggal + yang mundur</div>"Siap Pak, selesai <b>Kamis</b>. Tapi laporan bulanan mundur ke <b>Jumat</b>, aman?"`);
    const bs = X.ab({ left: 60, top: 520, width: 960, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '34px', color: INK, boxShadow: `0 8px 0 ${ORANGE}`, opacity: 0 }, root,
      `<div style="font-weight:800;color:${ORANGE};font-size:36px">BOS: ganti pertanyaannya</div>❌ "Bisa nggak?" → ✅ "<b>Kapan</b> bisa selesai?"`);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Lo pernah jadi<br><span style="color:${BLUE}">si paling siap pak?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const ts = at(s, 'Rumusnya', .5), tb = at(s, 'Buat bos', dur * .55), tq = at(s, 'Lo pernah', dur - 3);
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-18, 18, p), 3, lerp(8.6, 7.8, p), [0, 1.4, -1.2]);
      S.pose(t, { talk: t < tb, nod: t > tb }); B.pose(t, { talk: t > tb && t < tq, nod: t < tb && t > ts + 2 });
      X.pop(st, seg(t, ts, ts + .4)); X.pop(bs, seg(t, tb, tb + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

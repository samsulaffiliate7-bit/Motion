// Shot ep013 (Mitos vs Fakta: nabung di lemari pasti aman?)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin, tree } from '../../../engine/w3d/kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, nana, kos, chip, tag3, at } from '../../../engine/w3d/nana.js';
const big = (root, html, top, col = BATA, fs = 92) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `16px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };
const ibu = (parent, p) => { const g = person(parent, p, { body: '#7A4E8A', skin: '#D9A07A', hair: '#E8E2D8', pants: '#5A4A3A' }); return g };

export const SHOTS = {
  D3_E013_LEMARI(s, root) {   // kamar ibu siang terang: lemari kayu terbuka, amplop tebal di bawah baju, kartu mitos + stempel
    const sc = newScene(WARM({ sky: ['#FFE0B8', '#FFF6E6'], sunPos: [-6, 9, 8], hemi: 1.6 })); kos(sc, { wall: '#EED9BE' });
    const lm = group(sc, [-1.2, 0, -3.2]); [[-1.25, 0], [1.25, 0]].forEach(([x]) => lm.add(mesh(G.box(.1, 3.6, 1), '#8A5A32', [x, 1.8, 0]))); lm.add(mesh(G.box(2.6, .1, 1), '#8A5A32', [0, 3.6, 0])); lm.add(mesh(G.box(2.6, .1, 1), '#8A5A32', [0, .05, 0])); lm.add(mesh(G.box(2.4, 3.3, .05), '#5E3A1E', [0, 1.8, -.48]));
    const door = group(lm, [1.3, 1.8, .52]); door.add(mesh(G.box(1.25, 3.3, .08), '#9C6B3E', [-.62, 0, 0])); door.rotation.y = -1.6;
    for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) lm.add(mesh(G.box(.7, .22, .7), ['#E5484D', '#3E8FC4', '#F2B41B', '#FFFFFF'][(k + j) % 4], [-.8 + j * .8, .5 + k * .8, .1]));
    const env = mesh(G.box(.8, .18, .45), '#E8D8B0', [0, .82, .3]); lm.add(env); env.add(mesh(G.box(.82, .04, .2), BATA, [0, .1, 0], { cast: false }));
    const I = ibu(sc, [1.2, 0, -1.6]); I.rotation.y = -.7; const N = nana([2.4, 0, -.4]); sc.add(N); N.rotation.y = -.9; const cam = camera(42);
    const card = X.ab({ left: 90, top: 300, width: 900, background: CREAM, border: `8px solid ${INK}`, borderRadius: '30px', padding: '20px', textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '56px', lineHeight: 1.1, color: INK, boxShadow: `0 12px 0 ${BATA}`, opacity: 0 }, root, `"Nabung di lemari<br>paling aman."`);
    const stamp = X.ab({ left: 270, top: 450, padding: '6px 34px', border: '12px solid #D63B2F', color: '#D63B2F', fontFamily: 'Baloo', fontWeight: 800, fontSize: '100px', borderRadius: '18px', opacity: 0, background: '#FFFFFFCC' }, root, 'MITOS');
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root, `Rp10 juta di lemari.<br>10 tahun lagi: <span style="color:#D63B2F">±Rp${X.TL.vars.riil_jt} juta</span>.`);
    return { scene: sc, cam, upd(t, dur) {
      const tt = at(s, 'tujuh koma', 5); env.position.y = .82 + Math.sin(t * 2) * .02;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, 1.2, p), lerp(3, 2.8, p), lerp(9, 7.6, p)); cam.lookAt(lerp(-.6, -.8, p), 1.6, -2.6);
      I.pose(t, { talk: t < tt, point: t < 2.5 }); N.pose(t, { look: -.4, talk: t > tt });
      X.pop(hook, seg(t, .05, .4)); hook.style.display = t > tt + 1.5 ? 'none' : 'block'; X.pop(card, seg(t, 1.5, 1.9)); const q = seg(t, tt, tt + .3); stamp.style.opacity = q > 0 ? 1 : 0; stamp.style.transform = `rotate(-12deg) scale(${lerp(2.2, 1, E.out(q))})`;
    } };
  },
  D3_E013_WARTEG(s, root) {   // warung nasi siang: papan harga naik tahun ke tahun, piring nasi di meja, penghitung tahun
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#FFD27A', '#FFF6DE'], sunPos: [4, 14, 6], sunI: 2.6, hemi: 1.5 })); sc.add(mesh(G.box(16, .2, 12), '#C9B79A', [0, -.1, 0])); sc.add(mesh(G.box(16, 6, .2), '#F2E6C8', [0, 3, -3.6]));
    const ct = group(sc, [0, 0, -2.4]); ct.add(mesh(G.box(6, 1, 1.2), '#2E7D5B', [0, .5, 0])); ct.add(mesh(new THREE.BoxGeometry(5.8, .5, 1), new THREE.MeshStandardMaterial({ color: '#DDF3FF', transparent: true, opacity: .5 })), ); ct.children[1].position.y = 1.25;
    for (let i = 0; i < 6; i++) ct.add(mesh(G.cyl(.32, .28, .14, 12), ['#E8A33D', '#5E9C3A', '#C2457A', '#E07B39', '#F2B41B', '#8A5A32'][i], [-2.3 + i * .92, 1.08, 0]));
    const c = document.createElement('canvas'); c.width = 512; c.height = 300; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = k => { if (k === last) return; last = k; x.fillStyle = '#FFF6E6'; x.fillRect(0, 0, 512, 300); x.fillStyle = INK; x.font = '800 46px Baloo'; x.textAlign = 'center'; x.fillText(`NASI + LAUK · ${2026 + k}`, 256, 80); x.fillStyle = k > 6 ? '#D63B2F' : BATA; x.font = '800 120px Baloo'; x.fillText(`Rp${String(v.nasi_series[k]).replace('.', ',')}rb`, 256, 230); tex.needsUpdate = true };
    draw(0); const board = new THREE.Mesh(G.plane(3, 1.75), new THREE.MeshStandardMaterial({ map: tex })); board.position.set(0, 3.4, -3.48); sc.add(board);
    sc.add(mesh(G.box(2.4, .1, 1.2), '#9C6B3E', [1.6, .8, 1])); const plate = group(sc, [1.6, .86, 1]); plate.add(mesh(G.cyl(.4, .35, .06, 18), '#FFFFFF', [0, 0, 0])); plate.add(mesh(G.ico(.25, 1), '#FFFDF2', [0, .15, 0], { s: [1, .6, 1] }));
    const N = nana([.2, 0, 1.2]); sc.add(N); N.rotation.y = .4; const cam = camera(42); const asm = chip(root, '*asumsi: harga naik 3%/tahun', { left: 250, top: 300, fontSize: '34px', padding: '6px 18px' });
    return { scene: sc, cam, upd(t, dur) {
      const t1 = at(s, 'sepuluh tahun', 4); const g = E.inout(seg(t, t1 - 1.5, t1 + 1.5)); draw(Math.round(g * 10));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, .6, p), lerp(2.8, 3, p), lerp(8.4, 7.4, p)); cam.lookAt(.4, 2, -1.4);
      N.pose(t, { look: .8, shake: t > t1 + 1.5 }); X.pop(asm, seg(t, .5, .9));
    } };
  },
  D3_E013_SKOR(s, root) {   // lapangan sore: papan skor raksasa menghitung "nilai riil" turun, tumpukan uang mengecil di tengah lapangan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#F59E5B', '#FFE7C2'], sunPos: [-10, 6, 4], shadow: 18 })); sc.add(mesh(G.box(30, .2, 24), '#5E9C4A', [0, -.1, -4]));
    for (let i = -2; i <= 2; i++) sc.add(mesh(G.box(.1, .03, 20), '#FFFFFF', [i * 3, .02, -4], { cast: false }));
    const sb = group(sc, [0, 0, -12]); sb.add(mesh(G.box(.4, 6, .4), '#555', [-3, 3, 0])); sb.add(mesh(G.box(.4, 6, .4), '#555', [3, 3, 0])); sb.add(mesh(G.box(7, 3.4, .4), '#1E1E24', [0, 6.6, 0]));
    const c = document.createElement('canvas'); c.width = 700; c.height = 340; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = k => { if (k === last) return; last = k; x.fillStyle = '#1E1E24'; x.fillRect(0, 0, 700, 340); x.fillStyle = '#FFD27A'; x.font = '800 50px Baloo'; x.textAlign = 'center'; x.fillText(`DAYA BELI · TAHUN ${k}`, 350, 70); x.fillStyle = k > 6 ? '#FF6B6B' : '#7FE0A8'; x.font = '800 150px Baloo'; x.fillText(`${String(v.riil_series[k].toFixed(1)).replace('.', ',')} jt`, 350, 250); tex.needsUpdate = true };
    draw(0); const scr = new THREE.Mesh(G.plane(6.6, 3.2), new THREE.MeshBasicMaterial({ map: tex })); scr.position.set(0, 6.6, .21); sb.add(scr);
    const pile = group(sc, [0, 0, -2]); const notes = Array.from({ length: 20 }, (_, i) => { const m = mesh(G.box(1.4, .08, .7), i % 2 ? '#C9A6E0' : '#B48FD0', [Math.sin(i) * .05, .04 + i * .09, Math.cos(i) * .05]); pile.add(m); return m });
    const N = nana([2.4, 0, .6]); sc.add(N); N.rotation.y = -.7; const cam = camera(44);
    const fin = big(root, `Rp10 jt terasa ±Rp${v.riil_jt} jt`, 1150, '#D63B2F', 76);
    return { scene: sc, cam, upd(t, dur) {
      const g = E.inout(seg(t, 1, dur * .8)); const k = Math.round(g * 10); draw(k); const n = Math.round(20 * v.riil_series[k] / 10); notes.forEach((m, i) => m.visible = i < n);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-3, 2, p), lerp(3, 4.4, p), lerp(9, 10, p)); cam.lookAt(0, lerp(2, 4, p), -6);
      N.pose(t, { look: .3, shake: k > 6 }); show(fin, seg(t, dur * .8, dur * .8 + .5));
    } };
  },
  D3_E013_PERPUS(s, root) {   // perpustakaan kota terang: Nana di meja baca, dua kotak (dana darurat / belajar tumbuh), kalimat risiko, pertanyaan
    const sc = newScene(WARM({ sky: ['#E8EEF2', '#FFFFFF'], sun: '#FFF4E0', hemiSky: '#FFFFFF', sunPos: [-6, 12, 8], hemi: 1.6 })); sc.add(mesh(G.box(16, .2, 14), '#B98A5E', [0, -.1, 0])); sc.add(mesh(G.box(16, 7, .2), '#F2EADC', [0, 3.5, -4]));
    for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) sc.add(mesh(G.box(.4, .9, .5), ['#E5484D', '#3E8FC4', '#F2B41B', '#2E9C6A', '#C2457A', '#8A5A32'][(i + r * 2) % 6], [-5.2 + i * 1.3 + (r % 2) * .3, .6 + r * 1.3, -3.6]));
    for (let r = 0; r < 4; r++) sc.add(mesh(G.box(12.4, .08, .7), '#7A5230', [0, .12 + r * 1.3, -3.6]));
    sc.add(mesh(G.box(3.4, .1, 1.6), '#C9935E', [0, .8, -.4])); [[-1.6, -1.1], [1.6, -1.1], [-1.6, .3], [1.6, .3]].forEach(([x, z]) => sc.add(mesh(G.box(.08, .8, .08), '#5E3E22', [x, .4, z])));
    sc.add(mesh(G.box(.8, .08, .6), '#FFFFFF', [-.6, .88, -.3])); sc.add(mesh(G.box(.6, .08, .5), '#3E8FC4', [.6, .88, -.3]));
    const N = nana([0, 0, -1.6]); sc.add(N); const cam = camera(42);
    const two = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '24px', justifyContent: 'center' }, root);
    const bx = [['🛟', 'Dana darurat', 'tetap di tabungan', '#3E8FC4'], ['🌱', 'Sisanya', 'pelajari cara tumbuh', '#2E7D32']].map(([ic, h, d, c]) => X.ab({ position: 'relative', background: c, color: '#fff', fontFamily: 'Baloo', fontWeight: 800, fontSize: '40px', padding: '14px 22px', borderRadius: '24px', border: `6px solid ${INK}`, textAlign: 'center', opacity: 0 }, two, `${ic} ${h}<br><span style="font-size:30px">${d}</span>`));
    const risk = chip(root, '⚠️ nilainya bisa naik turun, pelajari dulu', { left: 120, top: 500, fontSize: '36px' }, BATA);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '46px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Di rumah lo, masih ada yang<br><span style="color:${BATA}">nyimpen uang di lemari?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const t1 = at(s, 'dana darurat', 2), t2 = at(s, 'Sisanya', 5), tr = at(s, 'naik turun', dur * .65), tq = at(s, 'Di rumah', dur - 3);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2, 1.4, p), lerp(3.4, 3, p), lerp(6.4, 5.6, p)); cam.lookAt(0, 1.2, -1.4);
      N.pose(t, { hold: true, talk: true, nod: t > t2 }); X.pop(bx[0], seg(t, t1, t1 + .4)); X.pop(bx[1], seg(t, t2, t2 + .4)); X.pop(risk, seg(t, tr, tr + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

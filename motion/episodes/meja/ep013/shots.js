// Shot ep013 (Full POV Bos: manajer baru dijepit target dan tim)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, tree } from '../../../engine/w3d/kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, room, laptop, desk } from '../../../engine/w3d/kantor.js';
const bu = p => { const g = bos(p, { body: '#9A4A6A', hair: '#2A1A10', tie: null, glasses: true, skin: '#D9A07A' }); const H = g.userData.st.head; H.add(mesh(G.sph(.17, 8, 6), '#2A1A10', [0, .05, -.4])); H.add(mesh(G.cyl(.08, .04, .45, 6), '#2A1A10', [0, -.2, -.48], { rot: [.3, 0, 0] })); return g };
const big = (root, html, top, col, fs = 84) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `14px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };

export const SHOTS = {
  M_E013_RUANG(s, root) {   // ruang manajer baru pagi (oranye hangat): papan nama di pintu kaca, dua batang naik (gaji kecil vs beban besar)
    const sc = newScene({ sky: ['#F7B06A', '#FFE9C8'], hemi: 1.3, hemiSky: '#FFE9D2', sun: '#FFC58A', sunI: 2.2, sunPos: [-7, 7, 6] }); room(sc, { wall: '#F2DCC2', wall2: '#E8CFB2', floor: '#8C6E55', window: true });
    sc.add(mesh(G.box(3, 3, .06), '#BFE6FF', [2.6, 1.5, -2], { mat: { transparent: true, opacity: .35 }, rot: [0, -.4, 0], cast: false }));
    const c = document.createElement('canvas'); c.width = 512; c.height = 128; const x = c.getContext('2d'); x.fillStyle = INK; x.fillRect(0, 0, 512, 128); x.fillStyle = '#F2C14E'; x.font = '800 64px Poppins'; x.textAlign = 'center'; x.fillText('MANAJER', 256, 88); const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace;
    const plate = new THREE.Mesh(G.plane(1.4, .35), new THREE.MeshBasicMaterial({ map: tx })); plate.position.set(2.5, 2.4, -1.94); plate.rotation.y = -.4; sc.add(plate);
    desk(sc, [-.6, 0, -2], 2.6); laptop(sc, [-.4, .82, -2.1], '#F2C58A'); const B = bu([-.6, 0, -.8]); sc.add(B); B.rotation.y = .2;
    const bars = [[-2.6, '#7FA8D0', .25], [-3.6, ORANGE, .75]].map(([x0, col, h]) => { const g = group(sc, [x0, 0, -1]); const m = mesh(G.box(.7, 4, .7), col, [0, 2, 0]); g.add(m); g.userData.h = h; return g });
    const cam = camera(42); const lg = chip(root, 'gaji <span style="color:#3E7CB1">+10%</span>', { left: 80, top: 300, fontSize: '50px' }), lb = chip(root, 'beban <span style="color:#E07B39">×3</span>', { left: 80, top: 410, fontSize: '50px' }, ORANGE);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Jadi manajer: gaji naik dikit,<br><span style="color:${ORANGE}">beban naik 3×.</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tg = at(s, 'Gaji naik', 2), tb = at(s, 'Bebannya', 4);
      bars.forEach((g, i) => { const q = E.out(seg(t, i ? tb : tg, (i ? tb : tg) + 1)); g.scale.y = Math.max(.01, q * g.userData.h) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.6, .6, p), lerp(3, 2.8, p), lerp(7.6, 6.6, p)); cam.lookAt(-1.4, 1.6, -1.6);
      B.pose(t, { talk: true, look: -.3 }); X.pop(lg, seg(t, tg, tg + .4)); X.pop(lb, seg(t, tb, tb + .4)); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > tg ? 'none' : 'block';
    } };
  },
  M_E013_ATRIUM(s, root) {   // atrium kantor bertingkat terang: kotak TARGET turun dari lantai atas, gelembung permintaan tim naik dari bawah, bos di tengah jembatan
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.4, sunPos: [4, 16, 6], sun: '#FFF4E0', shadow: 16 }); sc.add(mesh(G.box(20, .2, 14), '#B8C2CE', [0, -.1, 0]));
    [3.2, 6.4].forEach(y => { sc.add(mesh(G.box(20, .3, 3), '#E9EEF4', [0, y, -5.5])); sc.add(mesh(G.box(20, .9, .08), '#BFE6F5', [0, y + .6, -4], { mat: { transparent: true, opacity: .4 } })) });
    sc.add(mesh(G.box(3, .25, 9), '#E9EEF4', [0, 3.2, -1])); [-1.5, 1.5].forEach(x => sc.add(mesh(G.box(.06, .8, 9), '#BFE6F5', [x, 3.7, -1], { mat: { transparent: true, opacity: .4 } })));
    const B = bu([0, 3.32, -.4]); sc.add(B);
    const top = bos([0, 6.55, -5]); sc.add(top); const tgt = group(sc, [0, 9, -.4]); tgt.add(mesh(G.box(1.6, 1, 1), ORANGE, [0, 0, 0]));
    const c = document.createElement('canvas'); c.width = 256; c.height = 160; const x = c.getContext('2d'); x.fillStyle = ORANGE; x.fillRect(0, 0, 256, 160); x.fillStyle = '#fff'; x.font = '800 54px Poppins'; x.textAlign = 'center'; x.fillText('TARGET', 128, 70); x.fillText('Q4 ↑', 128, 135); const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const lab = new THREE.Mesh(G.plane(1.5, .94), new THREE.MeshBasicMaterial({ map: tx })); lab.position.z = .51; tgt.add(lab);
    const team = [-2, -.7, .7, 2].map((xx, i) => { const P = staf([xx, 0, 2.4], { body: ['#9CC3E6', '#E3B6C2', '#A9C7A4', '#F2C14E'][i] }); sc.add(P); P.rotation.y = Math.PI; return P });
    const cam = camera(44);
    const asks = ['cuti 🏖️', '+1 orang 🙋', 'lembur ↓ 😮‍💨'].map((h, i) => X.ab({ left: 120 + i * 270, top: 1150, background: BLUE, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '36px', padding: '8px 18px', borderRadius: '20px', border: `4px solid ${INK}`, opacity: 0 }, root, h));
    const both = big(root, 'dua-duanya benar', 300, INK, 76);
    return { scene: sc, cam, upd(t, dur) {
      const ta = at(s, 'Dari atas', .5), tb = at(s, 'Dari bawah', 4), tc = at(s, 'benar', dur * .6);
      tgt.position.z = -1.2; tgt.position.y = lerp(9, 5.3, E.out(seg(t, ta, ta + 1.4))) + (t > ta + 1.4 ? Math.sin(t * 3) * .04 : 0); tgt.rotation.y = Math.sin(t) * .1;
      asks.forEach((e, i) => { const q = seg(t, tb + i * .6, tb + i * .6 + .4); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * 60 - Math.min(1, Math.max(0, t - tb - i * .6)) * 30}px)` });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(5, 3.6, p), lerp(4.4, 5, p), lerp(11, 10, p)); cam.lookAt(0, 3.6, -.6);
      B.pose(t, { look: t < tb ? 0 : Math.sin(t * 2) * .6, shake: t > tc }); top.pose(t, { point: t > ta && t < ta + 2 }); team.forEach((P, i) => P.pose(t + i, { wave: t > tb + i * .6 && t < tb + i * .6 + 2 }));
      show(both, seg(t, tc, tc + .5));
    } };
  },
  M_E013_RUMAH(s, root) {   // ruang kerja rumah malam (lampu meja terang): bos sendirian di laptop, catatan "ditolak", rencana disusun ulang
    const sc = newScene({ bg: '#3A3A5A', hemi: 1.2, hemiSky: '#FFE9D2', hemiGround: '#5A4A6A', sunI: 1.2, sun: '#FFD9A8', sunPos: [-4, 8, 6] }); room(sc, { wall: '#5A5470', wall2: '#4E4A64', floor: '#6B5A4A', window: true, night: true });
    const L = new THREE.PointLight('#FFD9A0', 16, 8); L.position.set(.6, 2.6, -1); sc.add(L); sc.add(mesh(G.cyl(.04, .04, 1, 6), '#333', [.9, 1.3, -1.9])); sc.add(mesh(G.cone(.3, .3, 10), '#F2C14E', [.9, 1.85, -1.8], { rot: [.4, 0, 0], mat: { emissive: '#F2C14E', emissiveIntensity: .8 } }));
    desk(sc, [0, 0, -1.8], 2.6); laptop(sc, [-.2, .82, -1.9], '#9CC3E6'); const B = bu([-.2, 0, -.9]); sc.add(B); B.rotation.y = Math.PI; B.userData.st.legs.forEach(l => l.rotation.x = -1.3); sc.add(mesh(G.box(.8, .5, .8), '#3E4A5A', [-.2, .25, -.6]));
    const mug = mesh(G.cyl(.1, .09, .2, 10), '#FFFFFF', [-.9, .92, -1.7]); sc.add(mug);
    const cam = camera(42);
    const notes = [['🙋 minta tambahan orang', '#C0392B', 'DITOLAK'], ['🛡️ bela tim di rapat', '#2E7D32', ''], ['🗂️ rencana dibuat ulang', '#3E7CB1', '']].map(([h, c, st], i) => X.ab({ left: 70, top: 300 + i * 115, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '38px', color: INK, boxShadow: `0 8px 0 ${c}`, opacity: 0 }, root, `${h}${st ? ` <span style="color:${c};border:4px solid ${c};border-radius:10px;padding:0 10px;margin-left:10px">${st}</span>` : ''}`));
    return { scene: sc, cam, upd(t, dur) {
      const tc = [at(s, 'ditolak', 3), at(s, 'bela', 6), at(s, 'rencana', 9)];
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.8, 2.2, p), lerp(2.9, 2.8, p), lerp(2.6, 2, p)); cam.lookAt(-.4, 1.1, -1.5);
      B.pose(t, { look: Math.sin(t * .5) * .2 }); B.userData.st.legs.forEach(l => l.rotation.x = -1.3); B.userData.st.arms.forEach((a, i) => a.rotation.x = -1.1 + Math.sin(t * 9 + i) * .08);
      notes.forEach((e, i) => X.pop(e, seg(t, tc[i], tc[i] + .4)));
    } };
  },
  M_E013_TIM(s, root) {   // ruang tim pagi terang: bos di depan papan tiga prioritas, tim mengangguk; pertanyaan penutup
    const v = X.TL.vars; const sc = newScene({ bg: '#E4EEF7', hemi: 1.3, sunPos: [-6, 12, 8], sun: '#FFF4E0' }); room(sc, { wall: '#EEF3F8', wall2: '#DDE6EF', floor: '#A9B4C2', window: true });
    const wb = group(sc, [0, 0, -3.8]); wb.add(mesh(G.box(4.6, 2.6, .08), '#FFFFFF', [0, 2.6, 0]));
    const cards = v.pri.map(([n, h, d], i) => { const c = document.createElement('canvas'); c.width = 600; c.height = 140; const x = c.getContext('2d'); x.fillStyle = ['#B9D8FF', '#FFE680', '#E0E0E0'][i]; x.fillRect(0, 0, 600, 140); x.fillStyle = INK; x.font = '800 52px Poppins'; x.fillText(`${n}. ${h}`, 24, 70); x.font = '600 36px Poppins'; x.fillText(d, 24, 120);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(G.plane(3.6, .84), new THREE.MeshStandardMaterial({ map: t })); m.position.set(0, 3.5 - i * .9, -3.75); sc.add(m); return m });
    const B = bu([2.2, 0, -2.6]); sc.add(B); B.rotation.y = -.6;
    const team = [[-1.6, 0], [-.4, .3], [.8, .2]].map(([x, z], i) => { const P = staf([x, 0, z], { body: ['#9CC3E6', '#E3B6C2', '#A9C7A4'][i] }); sc.add(P); P.rotation.y = Math.PI; return P });
    const cam = camera(42); const cl = chip(root, '🎯 kejelasan > semangat', { left: 260, top: 300, fontSize: '44px' }, ORANGE);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Pernah punya bos yang<br><span style="color:${ORANGE}">baru naik jabatan?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tp = at(s, 'tiga prioritas', 4), tj = at(s, 'kejelasan', dur * .65), tq = at(s, 'Lo pernah', dur - 3);
      cards.forEach((m, i) => m.scale.setScalar(Math.max(.001, E.back(seg(t, tp + i * .5, tp + i * .5 + .4)))));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, .6, p), lerp(3.8, 3.6, p), lerp(8.4, 7.6, p)); cam.lookAt(.3, 2.1, -2.6);
      B.pose(t, { talk: t < tq, point: t > tp && t < tp + 2 }); team.forEach((P, i) => P.pose(t + i, { nod: t > tj, look: Math.sin(t * .4 + i) * .2 }));
      X.pop(cl, seg(t, tj, tj + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

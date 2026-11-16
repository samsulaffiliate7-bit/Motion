// Shot ep011 (Seri Jenis Bos: bos yang cuma ingat kesalahan)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, tree } from '../../../engine/w3d/kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, phone, phoneTex, room, laptop, desk } from '../../../engine/w3d/kantor.js';
const GREEN = '#3FA66B', RED = '#E5484D';
const say = (root, html, col, css = {}) => X.ab(Object.assign({ background: col, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '10px 24px', borderRadius: '26px 26px 26px 6px', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
function screenTex(draw) { const c = document.createElement('canvas'); c.width = 1024; c.height = 576; const x = c.getContext('2d'); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.redraw = a => { draw(x, a); t.needsUpdate = true }; t.redraw(0); return t }

export const SHOTS = {
  M_E011_EVAL(s, root) {   // ruang evaluasi: layar presentasi raksasa, 11 kotak hijau mengecil, 1 kotak merah membesar memenuhi layar
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.3, sunPos: [-6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#E9EEF4', wall2: '#D8E0EA', floor: '#9AA6B4' });
    const tex = screenTex((x, k) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 1024, 576); x.fillStyle = INK; x.font = '700 44px Poppins'; x.fillText('EVALUASI 2026', 40, 70);
      for (let i = 0; i < 12; i++) { const r = i === 6; const sz = r ? 70 + k * 330 : 70 * (1 - k * .8); x.fillStyle = r ? RED : GREEN; const cx = 70 + (i % 6) * 150, cy = 140 + Math.floor(i / 6) * 180; if (r) { x.fillRect(512 - sz / 2 * 1.6, 330 - sz / 2, sz * 1.6, sz) } else x.fillRect(cx, cy, sz, sz) }
      if (k > .9) { x.fillStyle = '#fff'; x.font = '800 70px Poppins'; x.textAlign = 'center'; x.fillText('JULI: 1 KESALAHAN', 512, 350); x.textAlign = 'left' } });
    const scr = group(sc, [0, 2.8, -3.85]); scr.add(mesh(G.box(5, 2.9, .1), '#222', [0, 0, 0])); const sm = new THREE.Mesh(G.plane(4.8, 2.7), new THREE.MeshBasicMaterial({ map: tex })); sm.position.z = .06; scr.add(sm);
    desk(sc, [0, 0, -1], 3.4); const B = bos([1.2, 0, -1.8]); sc.add(B); const S = staf([-1, 0, .2]); sc.add(S); S.rotation.y = Math.PI * .85;
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `11 bulan kerja bagus.<br><span style="color:${RED}">Yang dibahas cuma 1 kesalahan.</span>`);
    const qt = X.ab({ left: 60, top: 300, width: 960, background: '#FFFFFF', border: `5px solid ${INK}`, borderRadius: '24px', padding: '14px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: INK, opacity: 0 }, root, `💬 <i>"Kalo bos gw mah yg jelek doang yg selalu diungkit"</i><div style="font-size:26px;color:#7A8594;margin-top:6px">komentar penonton YouTube</div>`);
    return { scene: sc, cam, upd(t, dur) {
      const k = E.inout(seg(t, 1, 3.5)); tex.redraw(k);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-3.2, -2.4, p), lerp(3.2, 3, p), lerp(7, 6, p)); cam.lookAt(lerp(.2, 0, p), 2, -3);
      B.pose(t, { point: t > 2 && t < 5, talk: t > 2 }); S.pose(t, { shake: t > 4 }); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5.5 ? 'none' : 'block';
      const tq = at(s, 'penonton', dur * .6); X.pop(qt, seg(t, tq, tq + .4));
    } };
  },
  M_E011_KORIDOR(s, root) {   // koridor kantor: dinding kalender 12 kotak 3D, kamera menyusuri; kotak merah menyala terus
    const v = X.TL.vars; const sc = newScene({ bg: '#E4E9EF', hemi: 1.3, sunPos: [6, 12, 6], sun: '#FFF4E0', shadow: 14 }); sc.add(mesh(G.box(30, .2, 6), '#B8C2CE', [6, -.1, 0])); sc.add(mesh(G.box(30, 6, .2), '#EEF3F8', [6, 3, -2]));
    for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.8, .06, .3), '#FFFFFF', [-2 + i * 4, 4.6, 0], { mat: { emissive: '#FFFFFF', emissiveIntensity: 1 }, cast: false }));
    const tiles = v.bulan.map((m, i) => { const r = i === v.salah - 1; const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d'); x.fillStyle = r ? RED : GREEN; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff'; x.font = '800 70px Poppins'; x.textAlign = 'center'; x.fillText(m, 128, 120); x.font = '800 90px Poppins'; x.fillText(r ? '✗' : '✓', 128, 220);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const g = new THREE.Mesh(G.box(1.5, 1.5, .2), [mat('#DDD'), mat('#DDD'), mat('#DDD'), mat('#DDD'), new THREE.MeshStandardMaterial({ map: t, emissive: r ? RED : '#000', emissiveIntensity: r ? .4 : 0 }), mat('#DDD')]); g.castShadow = true; g.position.set(-2.7 + (i % 4) * 1.8, 4.1 - Math.floor(i / 4) * 1.7, -1.85); g.scale.setScalar(.95); sc.add(g); return g });
    const S = staf([0, 0, .8]); sc.add(S); const cam = camera(42); const cnt = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '20px', justifyContent: 'center' }, root, `<div style="background:${GREEN};color:#fff;font-family:Poppins;font-weight:800;font-size:44px;padding:10px 24px;border-radius:20px;border:5px solid ${INK}">11 ✓</div><div style="background:${RED};color:#fff;font-family:Poppins;font-weight:800;font-size:44px;padding:10px 24px;border-radius:20px;border:5px solid ${INK}">1 ✗</div>`);
    const fx = chip(root, '😮‍💨 lama-lama males berusaha', { left: 200, top: 420, fontSize: '40px' }, RED);
    return { scene: sc, cam, upd(t, dur) {
      const g = E.inout(seg(t, 0, dur * .5)); S.position.set(lerp(-4, -.6, g), 0, 1.2); S.rotation.y = g < 1 ? Math.PI / 2 : Math.PI; S.pose(t, { walk: g < 1 ? .8 : 0 });
      const tm = at(s, 'merahnya', dur * .5); tiles.forEach((m, i) => { const r = i === v.salah - 1; m.scale.setScalar(r && t > tm ? 1 + Math.sin(t * 6) * .08 + .25 : 1) });
      const pp = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.4, .5, pp), lerp(3.2, 3.2, pp), lerp(13.5, 12, pp)); cam.lookAt(0, 2.6, -1.8); X.pop(cnt, seg(t, 1, 1.4)); const tl = at(s, 'males', dur - 2); X.pop(fx, seg(t, tl, tl + .4));
    } };
  },
  M_E011_PARKIR(s, root) {   // parkiran basement terang (lampu neon): bos di samping mobil, telepon atasan, gelembung "target?" berjatuhan
    const sc = newScene({ bg: '#9AA4B2', hemi: 1.3, hemiSky: '#F4F8FF', sunI: 1.2, sun: '#FFFFFF', sunPos: [2, 10, 4] }); sc.add(mesh(G.box(24, .2, 18), '#8A8E96', [0, -.1, 0])); sc.add(mesh(G.box(24, .3, 18), '#B5BCC5', [0, 4.2, 0]));
    for (let i = -2; i <= 2; i++) { sc.add(mesh(G.box(.06, .02, 4), '#F2D24A', [i * 3, .01, -2], { cast: false })); sc.add(mesh(G.box(.5, 4, .5), '#C9CED6', [i * 6, 2, -6])) }
    for (let i = 0; i < 6; i++) { sc.add(mesh(G.box(2.4, .06, .2), '#FFFFFF', [-7.5 + i * 3, 4, -1 + (i % 2) * 3], { mat: { emissive: '#FFFFFF', emissiveIntensity: 1.6 }, cast: false })) }
    const L = new THREE.PointLight('#FFFFFF', 18, 14); L.position.set(0, 3.6, 0); sc.add(L);
    const car = group(sc, [-1.6, 0, -2]); car.add(mesh(G.box(2, .8, 4), '#3E4A5A', [0, .7, 0])); car.add(mesh(G.box(1.8, .7, 2.2), '#2A3340', [0, 1.4, -.2])); [[-1, -1.3], [1, -1.3], [-1, 1.3], [1, 1.3]].forEach(([x, z]) => car.add(mesh(G.cyl(.35, .35, .3, 12), '#111', [x, .35, z], { rot: [0, 0, Math.PI / 2] })));
    const B = bos([.6, 0, 0]); sc.add(B); B.rotation.y = -.4; const ph = mesh(G.box(.12, .24, .02), '#111', [0, -.62, .1]); B.userData.st.arms[1].add(ph);
    const cam = camera(42);
    const bubbles = ['"Target minggu ini?"', '"Kenapa Juli meleset?"', '"Kok bisa salah?"'].map((h, i) => say(root, h, '#7A8594', { left: 140 + (i % 2) * 260, top: 300 + i * 110, fontSize: '36px' }));
    const memo = chip(root, '🧠 yang bikin ditegur = yang nyangkut', { left: 70, top: 640, fontSize: '36px' }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3.6, 2.6, p), lerp(2.6, 2.8, p), lerp(6.6, 5.6, p)); cam.lookAt(-.2, 1.3, -.8);
      B.pose(t, { hold: true, nod: Math.sin(t * 2) > .5 }); B.userData.st.arms[1].rotation.x = -2.6; bubbles.forEach((e, i) => X.pop(e, seg(t, 1.5 + i * 1.4, 1.9 + i * 1.4)));
      const tn = at(s, 'nyangkut', dur * .55); X.pop(memo, seg(t, tn, tn + .4));
    } };
  },
  M_E011_ATAP(s, root) {   // taman atap kantor siang: staf menulis buku catatan di bangku, tiga kartu tip muncul, papan angka
    const v = X.TL.vars; const sc = newScene({ sky: ['#9FD3F0', '#EAF6FF'], hemi: 1.3, sun: '#FFF4E0', sunPos: [-8, 12, 6], shadow: 12 }); sc.add(mesh(G.box(14, .3, 10), '#C9C4BA', [0, -.15, 0]));
    sc.add(mesh(G.box(6, .2, 4), '#7FAF52', [-2, .05, -2])); [[-4, -3], [0, -3.4], [3.6, -2.6]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, ['#4E8F3A', '#6BA34A'][i % 2]));
    for (let i = 0; i < 14; i++) sc.add(mesh(G.box(2, 6 + (i * 37 % 8), 2), '#B5C3D2', [-16 + i * 2.6, -1, -14 - (i % 3) * 3], { cast: false }));
    sc.add(mesh(G.box(2.6, .1, .7), '#9C6B3E', [.6, .5, .4])); sc.add(mesh(G.box(2.6, .6, .08), '#9C6B3E', [.6, .85, .08]));
    const S = staf([.4, .05, .5]); sc.add(S); S.userData.st.legs.forEach(l => l.rotation.x = -1.4); const bk = mesh(G.box(.32, .03, .24), '#FFFFFF', [0, -.6, .2]); S.userData.st.arms[1].add(bk);
    const cam = camera(42); const cards = v.tips.map(([ic, h, d], i) => X.ab({ left: 70, top: 300 + i * 120, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 8px 0 ${[BLUE, ORANGE, GREEN][i]}`, opacity: 0 }, root, `${ic} ${i + 1}. ${h} <span style="font-weight:600;font-size:30px;color:#6B7684">· ${d}</span>`));
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-25, 15, p), 2.4, lerp(7, 6, p), [.4, 1.2, 0]);
      S.pose(t, { hold: true, nod: Math.sin(t * 3) > .6 }); S.userData.st.legs.forEach(l => l.rotation.x = -1.4); S.userData.st.arms[0].rotation.x = -1 + Math.sin(t * 10) * .1;
      v.tip_cues.forEach((cu, i) => { const tc = at(s, cu, 2 + i * 4); X.pop(cards[i], seg(t, tc, tc + .4)) });
    } };
  },
  M_E011_EVAL2(s, root) {   // ruang evaluasi tahun berikutnya, sore hangat: bos membaca ringkasan, layar 12 kotak seimbang, staf lega; pertanyaan
    const sc = newScene({ sky: ['#F7A35C', '#FFE2B8'], hemi: 1.3, hemiSky: '#FFE9D2', sun: '#FFC58A', sunI: 2, sunPos: [-7, 6, 6] }); room(sc, { wall: '#F2DCC2', wall2: '#E8CFB2', floor: '#8C6E55', window: true });
    const tex = screenTex(x => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 1024, 576); x.fillStyle = INK; x.font = '700 44px Poppins'; x.fillText('EVALUASI 2027 · ringkasan staf', 40, 70); for (let i = 0; i < 12; i++) { x.fillStyle = i === 6 ? RED : GREEN; x.fillRect(70 + (i % 6) * 150, 140 + Math.floor(i / 6) * 180, 110, 110) } });
    const scr = group(sc, [-1, 2.8, -3.85]); scr.add(mesh(G.box(4.4, 2.6, .1), '#222', [0, 0, 0])); const sm = new THREE.Mesh(G.plane(4.2, 2.4), new THREE.MeshBasicMaterial({ map: tex })); sm.position.z = .06; scr.add(sm);
    desk(sc, [0, 0, -1], 3.4); const B = bos([1.2, 0, -1.8]); sc.add(B); const pp = mesh(G.box(.3, .4, .01), '#FFFFFF', [0, -.6, .15], { rot: [-.6, 0, 0] }); B.userData.st.arms[1].add(pp);
    const S = staf([-1, 0, .2]); sc.add(S); S.rotation.y = Math.PI * .85; const cam = camera(42);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Bos lo pernah cuma<br><span style="color:${RED}">ngungkit yang jelek?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, 1.2, p), lerp(3.2, 3, p), lerp(7, 6, p)); cam.lookAt(-.3, 1.6, -2.2);
      B.pose(t, { hold: true, nod: t > 3, talk: t > 3 && t < 7 }); S.pose(t, { nod: t > 6 }); const tq = at(s, 'Bos lo', dur - 3); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

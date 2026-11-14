// Shot Kades Hari 8: malam purnama di kebun, tikus serombongan, oyen mengejar, rumah burung hantu, sapi tidur, quest nama sapi.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, house } from '../../../engine/w3d/kit.js';
import { X, DG, YEL, CREAM, INK, SUNNY, kades, warga, card, at, rowHouses, commentCard, txtSprite, canvasPlane, signText, cat, crop } from '../../../engine/w3d/desa3d.js';
const NIGHT = o => newScene(Object.assign({ sky: ['#13204A', '#3A4E8A'], hemi: 1.0, sunI: 1.4, sun: '#B8C8FF', sunPos: [-6, 12, 8], shadow: 12 }, o));
function moon(sc) { const m = mesh(G.sph(1.4, 16, 12), '#FFF6D6', [-8, 14, -20], { mat: { emissive: '#FFF6D6', emissiveIntensity: 1.2 }, cast: false }); sc.add(m); return m }
function farm(sc, missing = 0) { island(sc, 18, 14, '#6E9A4A', '#5E4A36'); const out = [];
  for (let r = 0; r < 4; r++) { sc.add(mesh(G.box(9, .18, .8), '#5E3E22', [0, .09, -2 + r * 1.3], { cast: false })); for (let i = 0; i < 12; i++) { const gone = ((i * 7 + r * 3) % 10) < missing * 10; if (gone) { sc.add(mesh(G.cyl(.12, .12, .02, 8), '#2E1E10', [-4 + i * .72, .19, -2 + r * 1.3], { cast: false })); continue }
    const c = crop(sc, -4 + i * .72, -2 + r * 1.3, ['#E5484D', '#F2C14E', '#8E44AD'][r % 3]); c.position.y = .12; out.push(c) } }
  [[-7.5, 4], [7.5, 4.5], [-7, -5], [7, -5.5]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, '#2F5F2A', i % 2 ? 'round' : 'palm')); return out }
function lamps(sc) { [[-5.5, -3.5], [5.5, -3.5], [-5.5, 4], [5.5, 4], [0, 5.5], [-7, .5], [7, .5]].forEach(([x, z]) => { const g = group(sc, [x, 0, z]); g.add(mesh(G.box(.08, 2, .08), '#4A4F56', [0, 1, 0])); g.add(mesh(G.box(.5, .04, .3), '#1E3A5F', [.1, 2.05, 0], { rot: [0, 0, .2] })); g.add(mesh(G.sph(.22, 10, 8), '#FFF3B0', [0, 1.85, .05], { mat: { emissive: '#FFE38A', emissiveIntensity: 2.2 }, cast: false })); const L = new THREE.PointLight('#FFE38A', 4, 6); L.position.set(x, 1.8, z); sc.add(L) }) }
function rat(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.32, .16, .16), '#7A7A82', [0, .1, 0])); g.add(mesh(G.cone(.08, .16, 4), '#7A7A82', [.22, .1, 0], { rot: [0, 0, -Math.PI / 2] }));
  [-1, 1].forEach(z => g.add(mesh(G.sph(.05, 6, 4), '#9A9AA2', [.08, .2, z * .07]))); g.add(mesh(G.box(.3, .02, .02), '#B89A9A', [-.3, .08, 0], { cast: false }));
  const eye = mesh(G.sph(.025, 6, 4), '#FFF3A0', [.26, .14, .05], { mat: { emissive: '#FFF3A0', emissiveIntensity: 2 }, cast: false }); g.add(eye); return g }
function owlHouse(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.14, 4, .14), '#7A4E2C', [0, 2, 0])); g.add(mesh(G.box(1, .8, .8), '#9C6B3E', [0, 4.3, 0])); g.add(mesh(G.cone(.8, .5, 4), '#C9472F', [0, 4.95, 0], { rot: [0, Math.PI / 4, 0] })); g.add(mesh(G.cyl(.18, .18, .05, 10), '#1E1E1E', [0, 4.3, .41], { rot: [Math.PI / 2, 0, 0], cast: false }));
  const owl = group(g, [0, 4.85, .5]); owl.add(mesh(G.ico(.28, 0), '#E8D5B0', [0, 0, 0])); owl.add(mesh(G.sph(.2, 10, 8), '#FFFFFF', [0, .25, .05])); [-1, 1].forEach(x => owl.add(mesh(G.sph(.05, 6, 4), '#1E1E1E', [x * .08, .28, .22], { cast: false }))); g.userData.owl = owl; return g }
function sapi(parent, p) { const g = group(parent, p); g.add(mesh(G.box(1.3, .6, .6), '#F4F1EA', [0, .75, 0])); g.add(mesh(G.box(.45, .32, .62), '#3A2E28', [.15, .9, 0], { cast: false }));
  const hd = group(g, [.8, 1, 0]); hd.add(mesh(G.box(.42, .38, .4), '#F4F1EA', [0, 0, 0])); hd.add(mesh(G.box(.2, .18, .34), '#F2B8A0', [.24, -.08, 0])); [-1, 1].forEach(z => hd.add(mesh(G.cone(.05, .2, 4), '#E8DCC2', [-.05, .26, z * .14])));
  [[-.5, -.2], [-.5, .2], [.5, -.2], [.5, .2]].forEach(([x, z]) => g.add(mesh(G.box(.14, .45, .14), '#F4F1EA', [x, .22, z]))); g.userData = { hd }; return g }
function torch(sc) { const L = new THREE.SpotLight('#FFF1B0', 40, 14, .32, .4); sc.add(L); sc.add(L.target); const beam = mesh(G.cone(.9, 6, 16), '#FFF1B0', [0, 0, 0], { mat: { transparent: true, opacity: .12, emissive: '#FFF1B0' }, cast: false }); sc.add(beam); return { L, beam } }
export const SHOTS = {
  K_H008_HOOK(s, root) {   // frame 1: close-up lubang bekas bibit + jejak kaki mungil disorot bulan, kamera naik memperlihatkan kebun bolong-bolong
    const sc = NIGHT(); moon(sc); farm(sc, .5); lamps(sc); const steps = []; for (let i = 0; i < 14; i++) { const m = mesh(G.box(.07, .02, .1), '#2E1E10', [-1 + i * .25, .2, .6 + Math.sin(i) * .15], { cast: false }); sc.add(m); steps.push(m) }
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#13204AEE', border: `8px solid ${YEL}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '58px', color: '#FFFFFF', fontFamily: 'Fredoka', fontWeight: 700, opacity: 0 }, root, `💡 Desa terang, tapi...<br><span style="font-size:46px;color:${YEL}">separuh bibit hilang!</span>`);
    const half = card(root, '🌱 50% lenyap', { left: 330, top: 520, fontSize: '48px' }, '#C9472F'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.4, 3, p), lerp(1.6, 10, p), lerp(3.6, 13, p)); cam.lookAt(lerp(0, 0, p), 0, lerp(.6, -.5, p)); X.pop(hook, seg(t, .15, .5)); X.pop(half, seg(t, at(s, 'separuh', 1.5), at(s, 'separuh', 1.5) + .4)) } };
  },
  K_H008_WATCH(s, root) {   // POV senter: sorot cahaya menyapu bedeng, mata tikus berkilat, lalu serombongan muncul
    const sc = NIGHT({ hemi: .85 }); moon(sc); farm(sc, .5); lamps(sc); const T = torch(sc); const P = warga([2.2, 0, 3.4], 2); sc.add(P); P.rotation.y = Math.PI * .85;
    const rats = Array.from({ length: 9 }, (_, i) => { const r = rat(sc, [-4.5 + (i % 3) * .5, 0, -2.5 + Math.floor(i / 3) * .5]); r.rotation.y = .3; return r }); const cam = camera(42);
    const c1 = card(root, '🔦 ronda kebun', { left: 330, top: 300, fontSize: '46px' }), c2 = card(root, '🐀 tikus serombongan!', { left: 220, top: 420, fontSize: '50px' }, '#C9472F');
    return { scene: sc, cam, upd(t, dur) { cam.position.set(5.5, 4.2, 10.5); cam.lookAt(-1.2, .3, -.8); P.pose(t, { walk: .3 }); const tr = at(s, 'tikus', 6); const a = lerp(.8, -.6, E.inout(seg(t, 0, tr))) + Math.sin(t * 1.3) * .05;
      const tx = 3 + Math.sin(a + Math.PI) * 7, tz = 5 - Math.cos(a) * 7.5; T.L.position.set(2.4, 1.4, 3.4); T.L.target.position.set(lerp(2, -4, seg(t, 0, tr)), 0, lerp(1, -1.6, seg(t, 0, tr))); T.beam.position.copy(T.L.position).lerp(T.L.target.position, .5); T.beam.lookAt(T.L.target.position); T.beam.rotateX(-Math.PI / 2);
      const tg = at(s, 'serombongan', 8); rats.forEach((r, i) => { r.visible = i === 4 ? t > tr - 1.4 : t > tg - .2 + i * .05; r.position.x = -4.5 + (i % 3) * .5 + Math.sin(t * 6 + i) * .08 }); X.pop(c1, seg(t, .3, .7)); X.pop(c2, seg(t, tg, tg + .4)) } };
  },
  K_H008_OYEN(s, root) {   // kamera rendah setinggi kucing: oyen melesat melewati bedeng, tikus berhamburan ke semak, warga bersorak
    const sc = NIGHT({ hemi: 1.1 }); moon(sc); farm(sc, .5); const O = cat(sc, [5, .2, .6]); O.scale.setScalar(1.6); O.rotation.y = Math.PI;
    const rats = Array.from({ length: 9 }, (_, i) => rat(sc, [0, 0, 0])); const bush = [[-7, .4], [-7.4, 1.6], [-6.6, -1]].map(([x, z]) => { const m = mesh(G.ico(.9, 0), '#2F5F2A', [x, .6, z]); sc.add(m); return m });
    const W = [0, 1, 2].map(i => { const w = warga([4 + i * 1.1, 0, 4], i); sc.add(w); w.rotation.y = Math.PI * 1.1; return w }); const badge = card(root, '🐈 oyen = satpam kebun!', { left: 190, top: 300, fontSize: '52px' }, '#E07B39'); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const tr = at(s, 'oyen', 2); const q = E.inout(seg(t, tr, tr + 3)); O.position.set(lerp(6, -5, q), .2 + Math.abs(Math.sin(t * 10)) * .2 * (q < 1 ? 1 : 0), 3); O.userData.tail.rotation.z = .6 + Math.sin(t * 12) * .3;
      cam.position.set(lerp(7, -1, q), 1.5, 7); cam.lookAt(O.position.x - 1, .5, 2); const tk = at(s, 'kabur', tr + 2); rats.forEach((r, i) => { const k = E.out(seg(t, tk - .8 + i * .05, tk + 1.2 + i * .05)); r.position.set(lerp(-3 + (i % 3) * .6, -7, k), 0, lerp(2.4 + Math.floor(i / 3) * .4, .4, k)); r.rotation.y = Math.PI; r.visible = k < .98 });
      W.forEach((w, i) => w.pose(t + i, { cheer: t > tk })); X.pop(badge, seg(t, at(s, 'satpam', 8), at(s, 'satpam', 8) + .4)) } };
  },
  K_H008_LESSON(s, root) {   // pagi: semak dibabat, toples tertutup, tiang rumah burung hantu berdiri, burung hantu menoleh
    const sc = newScene(SUNNY({ sky: ['#9ED8F5', '#FFF3D6'] })); farm(sc, .5); const OH = owlHouse(sc, [5, 0, -3]); const jars = [0, 1, 2].map(i => { const m = mesh(G.cyl(.35, .35, .7, 12), '#CFE8F5', [-6 + i * .8, .35, 4.4], { mat: { transparent: true, opacity: .85 } }); sc.add(m); sc.add(mesh(G.cyl(.37, .37, .12, 12), '#C9472F', [-6 + i * .8, .76, 4.4])); return m });
    const C = [['🌿 bersihkan semak', 'semak'], ['🫙 bibit di wadah tertutup', 'tertutup'], ['🦉 rumah burung hantu', 'burung hantu']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, DG) }));
    const tB = at(s, 'rumah burung', 8); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-20, 30, seg(t, 0, dur)), 5, 17, [1, 2, 0]); const q = E.back(seg(t, tB, tB + .8)); OH.scale.set(1, Math.max(.001, q), 1); OH.userData.owl.rotation.y = Math.sin(t * 1.5) * .8; C.forEach(c => { const qq = at(s, c.cu, 99); X.pop(c.e, seg(t, qq, qq + .4)) }) } };
  },
  K_H008_COW(s, root) {   // malam di kandang beratap rumbia: sapi tidur, label nama kosong berkedip "???"
    const sc = NIGHT({ hemi: 1.15 }); moon(sc); island(sc, 12, 10, '#6E9A4A', '#5E4A36'); const S = sapi(sc, [0, -.25, 0]); S.rotation.y = .3; S.userData.hd.rotation.z = -.5;
    [[-2, -1.5], [2, -1.5], [-2, 1.5], [2, 1.5]].forEach(([x, z]) => sc.add(mesh(G.box(.16, 2.6, .16), '#7A4E2C', [x, 1.3, z]))); const roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#B8954E')); roof.scale.set(3.4, 1.2, 2.8); roof.rotation.y = Math.PI / 4; roof.position.y = 3.1; sc.add(roof);
    for (let i = 0; i < 20; i++) sc.add(mesh(G.box(.4, .05, .1), '#D9B66B', [Math.sin(i * 3) * 1.5, .03, Math.cos(i * 2) * 1.2], { rot: [0, i, 0], cast: false }));
    const plate = canvasPlane(1.6, .5, signText('???', CREAM)); plate.position.set(0, 2.2, 1.6); sc.add(plate); const zz = txtSprite('z', '#FFFFFF', INK, .5); sc.add(zz);
    const c1 = card(root, '🐄 nama: ???', { left: 340, top: 300, fontSize: '54px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-15, 15, seg(t, 0, dur)), 2.6, 7.5, [0, 1.1, 0]); const q = (t * .45) % 1; zz.position.set(.9 + q * .4, 1.6 + q, .2); zz.material.opacity = 1 - q; plate.visible = (t % 1) < .7;
      X.pop(c1, seg(t, at(s, 'belum punya', 4), at(s, 'belum punya', 4) + .4)) } };
  },
  K_H008_ASK(s, root) {   // papan nama kandang kosong + contoh komentar nama, jempol like menumpuk
    const sc = newScene(SUNNY({ sky: ['#FFC58A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-10, 6, 8] })); island(sc, 12, 10, '#8BC34A', '#8D6E4A'); const S = sapi(sc, [-1.4, 0, 0]); S.rotation.y = .5; const K = kades([1.8, 0, 1]); sc.add(K); K.rotation.y = -.5;
    const board = canvasPlane(2.4, .7, signText('SAPI: ?', YEL)); board.position.set(-1.2, 2.5, .6); sc.add(board);
    const ex = [['@contoh', '“Si Belang”'], ['@contoh', '“Mbak Sapi Juara”']].map(([u, tx], i) => commentCard(root, u, tx, 1000 + i * 150, 140 + i * 60));
    const c1 = card(root, '🐄 kasih nama sapi!', { left: 240, top: 300, fontSize: '54px' }), c2 = card(root, '👍 like terbanyak menang', { left: 190, top: 420, fontSize: '46px' }, DG), c3 = card(root, '📅 hasil 2 hari lagi', { left: 300, top: 540, fontSize: '44px' }, '#C9472F'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .3) * 10, 3, 10.5, [-.3, 1.4, 0]); K.pose(t, { talk: true, point: true }); S.userData.hd.rotation.z = Math.sin(t * 2) * .1; ex.forEach((e, i) => { const q = seg(t, 1 + i * .6, 1.4 + i * .6); e.style.opacity = q; e.style.transform = `rotate(${i ? 2 : -2}deg)` });
      X.pop(c1, seg(t, .3, .7)); X.pop(c2, seg(t, at(s, 'like paling', 3), at(s, 'like paling', 3) + .4)); X.pop(c3, seg(t, at(s, 'dua hari', 6), at(s, 'dua hari', 6) + .4)) } };
  },
};

// Shot Kades Hari 6: hujan pertama, aliran air ke tenda, gotong royong, potongan jalan, oyen di lemari.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, house, rain } from '../../../engine/w3d/kit.js';
import { X, DG, YEL, CREAM, INK, SUNNY, kades, warga, card, at, tag3, village, lahan, rowHouses, commentCard, txtSprite, roadSection, cat } from '../../../engine/w3d/desa3d.js';
const STORM = o => SUNNY(Object.assign({ sky: ['#3A4A66', '#7A8CA8'], hemi: 1.05, sunI: 1.1, sun: '#C8D6FF', sunPos: [-8, 12, 6] }, o));
const tent = (sc, p, c) => { const t = group(sc, p); t.add(mesh(G.cone(.9, 1.2, 4), c, [0, .6, 0], { rot: [0, Math.PI / 4, 0] })); return t };
const TC = ['#E07B39', '#3E8FC4', '#F2C14E', '#C2457A', '#6B8E5A'];
export const SHOTS = {
  K_H006_STORM(s, root) {   // kamera turun dari awan badai ke desa, kilat
    const sc = newScene(STORM()); village(sc); const R = rain(sc, 400, 18, 14); const flash = X.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#FFFFFF', opacity: 0 }, root);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#1E2A40EE', border: `8px solid ${YEL}`, borderRadius: '36px', padding: '20px 26px', textAlign: 'center', fontSize: '58px', color: '#FFFFFF', fontFamily: 'Fredoka', fontWeight: 700, opacity: 0 }, root, `🌧️ Hujan pertama!<br><span style="font-size:44px;color:${YEL}">desa langsung ketahuan lemahnya</span>`);
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { R.tick(t); const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(70, 20, p), lerp(26, 8, p), lerp(26, 18, p), [0, 0, 0]); X.pop(hook, seg(t, .2, .6)); flash.style.opacity = (t % 2.9 < .1 && t > .8) ? .55 : 0 } };
  },
  K_H006_FLOW(s, root) {   // tampak atas: aliran air biru merayap dari jalan ke perkemahan tenda
    const sc = newScene(STORM()); lahan(sc, { well: true }); rowHouses(sc, -6.4, -5, 1.6); const R = rain(sc, 300, 18, 12);
    const tents = TC.map((c, i) => tent(sc, [-4 + i * 2, 0, 4.5], c)); const flow = mesh(G.box(1, .06, 1), '#4F7FA8', [0, .05, 0], { mat: { transparent: true, opacity: .75, roughness: .1 }, cast: false }); sc.add(flow);
    const mud = mesh(G.box(2, .07, 18), '#6B4E2E', [0, .04, 0], { cast: false }); sc.add(mud);
    const C = [['⬇️ air ke tempat rendah', 'rendah'], ['🟫 jalan jadi lumpur', 'lumpur'], ['❌ belum ada selokan', 'selokan']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, i === 2 ? '#C9472F' : INK) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { R.tick(t); cam.position.set(Math.sin(t * .2) * 2, 22, 9); cam.lookAt(0, 0, 1.5); const q = E.out(seg(t, .5, dur - 1)); flow.scale.set(lerp(1, 12, q), 1, lerp(1, 5, q)); flow.position.set(0, .05, lerp(0, 4, q)); mud.visible = t > at(s, 'lumpur', 3);
      tents.forEach((tn, i) => tn.position.y = -q * .2 * (i % 2 + 1)); C.forEach(c => { const qq = at(s, c.cu, 99); X.pop(c.e, seg(t, qq, qq + .4)) }) } };
  },
  K_H006_HELP(s, root) {   // malam hujan, cahaya senter: warga mengangkat tenda ke bukit kecil, pintu rumah kades terbuka bercahaya
    const sc = newScene(STORM({ hemi: 1.15 })); island(sc, 18, 16, '#7FA65A', '#5E4A36'); const R = rain(sc, 260, 16, 12); const hill = mesh(G.ico(4, 1), '#8BC34A', [4, -2.6, -3], { s: [1.4, .9, 1.2] }); sc.add(hill);
    const H = house(sc, [-4, 0, -2], { wall: '#FFF3D6', roofC: '#D9603B' }); const L = new THREE.PointLight('#FFD86B', 10, 8); L.position.set(-4, 1.2, -.4); sc.add(L);
    const carry = [0, 1, 2, 3].map(i => { const g = group(sc, [0, 0, 0]); const w1 = warga([-.6, 0, 0], i, { parent: g }), w2 = warga([.6, 0, 0], i + 1, { parent: g }); const tn = mesh(G.cone(.8, 1, 4), TC[i], [0, 2.2, 0], { rot: [Math.PI, Math.PI / 4, 0] }); g.add(tn); g.userData = { w1, w2 }; return g });
    const K = kades([-4, 0, .2]); sc.add(K); const kids = [0, 1].map(i => { const w = warga([-2.6 + i * .5, 0, 1.5], i + 2, { s: .7 }); sc.add(w); return w }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { R.tick(t); orbit(cam, lerp(25, -10, E.inout(seg(t, 0, dur))), 5, 15, [0, 1, 0]); carry.forEach((g, i) => { const q = ((t * .12) + i * .25) % 1; g.position.set(lerp(-1, 4, q), q * 1.6, lerp(4, -2, q)); g.rotation.y = -.8; g.userData.w1.pose(t + i, { walk: 1, cheer: true }); g.userData.w2.pose(t + i + .3, { walk: 1, cheer: true }) });
      K.pose(t, { wave: true, talk: true }); kids.forEach((w, i) => { const q = seg(t, at(s, 'rumahnya', 4) + i * .4, at(s, 'rumahnya', 4) + 2 + i * .4); w.position.set(lerp(-2.6 + i * .5, -4, q), 0, lerp(1.5, -.8, q)); w.visible = q < 1; w.pose(t + i, { walk: 1 }) }) } };
  },
  K_H006_LESSON(s, root) {   // potongan melintang jalan cembung + selokan, butiran air mengalir benar
    const sc = newScene(SUNNY({ sky: ['#9DB4C6', '#E2EBF2'] })); const RS = roadSection(sc, { len: 6 }); const R = rain(sc, 200, 12, 8);
    const tent0 = tent(sc, [6.2, -1.1, 0], '#E07B39'); const xs = txtSprite('✗', '#E5484D', '#fff', .9); xs.position.set(6.2, 1, 0); sc.add(xs);
    const C = [['✅ selokan kiri kanan', 'selokan'], ['✅ jalan sedikit cembung', 'cembung'], ['❌ jangan di tanah paling rendah', 'rendah']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? '#C9472F' : DG) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { R.tick(t); orbit(cam, lerp(-15, 20, seg(t, 0, dur)), 4, 22, [1, -.4, 0]); const tr = at(s, 'rendah', 99); tent0.visible = xs.visible = t > tr; C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K_H006_OYEN(s, root) {   // dalam rumah kades, lampu hangat: oyen tidur di atas lemari, kamera close-up pelan
    const sc = newScene(SUNNY({ sky: ['#4A3A2A', '#7A5A3A'], hemi: 1.1, sunI: .8, sun: '#FFD9A0', sunPos: [2, 8, 6] })); sc.add(mesh(G.box(8, .2, 8), '#B5835A', [0, -.1, 0])); sc.add(mesh(G.box(8, 4, .2), '#F3E1C4', [0, 2, -2.5]));
    const lem = mesh(G.box(2, 2.6, 1), '#8E6A4A', [1.5, 1.3, -1.8]); sc.add(lem); const O = cat(sc, [1.5, 2.6, -1.8]); O.rotation.y = .4; O.userData.hd.position.y -= .08;
    const L = new THREE.PointLight('#FFD58A', 9, 9); L.position.set(-1, 3, 1); sc.add(L); sc.add(mesh(G.sph(.2, 10, 8), '#FFE7A0', [-1, 3.2, 1], { mat: { emissive: '#FFE7A0', emissiveIntensity: 1.5 } }));
    const kids = [0, 1].map(i => { const w = warga([-1.4 + i * .8, 0, .4], i + 2, { s: .7 }); sc.add(w); w.rotation.z = Math.PI / 2; w.position.y = .3; return w }); const zz = txtSprite('z', '#FFFFFF', INK, .5); sc.add(zz);
    const c1 = card(root, '🐈 aman di atas lemari', { left: 200, top: 300, fontSize: '44px' }, '#E07B39'); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { const p = seg(t, 0, dur); cam.position.set(lerp(-1, .6, p), lerp(2.4, 2.8, p), lerp(6, 3.6, p)); cam.lookAt(1.2, 2.2, -1.8); O.userData.tail.rotation.z = .2 + Math.sin(t * 1.5) * .1; const q = (t * .4) % 1; zz.position.set(1.7 + q * .4, 3 + q, -1.6); zz.material.opacity = 1 - q;
      X.pop(c1, seg(t, at(s, 'lemari', 2), at(s, 'lemari', 2) + .4)) } };
  },
  K_H006_ASK(s, root) {   // pagi sesudah hujan: genangan memantulkan langit, kartu komentar contoh, ajakan cerita
    const sc = newScene(SUNNY({ sky: ['#A9D8F5', '#FFF6E6'] })); village(sc); [[-3, 2, 1.4], [2.5, -1, 1], [0, 5, 1.2]].forEach(([x, z, r]) => sc.add(mesh(G.cyl(r, r, .03, 16), '#8FC7EA', [x, .06, z], { cast: false, mat: { roughness: .05 } })));
    const K = kades([0, 0, 3]); sc.add(K); const sample = commentCard(root, 'contoh', '“depan rumahku kalau hujan jadi kolam lele 😭”', 1040, 120); sample.style.width = '820px';
    const c1 = card(root, '💬 cerita banjir lo?', { left: 260, top: 300, fontSize: '48px' }), c2 = card(root, '🎬 terbaik masuk video', { left: 240, top: 420, fontSize: '44px' }, DG); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, t * 4 - 10, 3.6, 10, [0, 1.2, 3]); K.pose(t, { talk: true, point: (t % 4) < 1.5 }); X.pop(c1, seg(t, .5, .9)); X.pop(c2, seg(t, at(s, 'muncul', 3), at(s, 'muncul', 3) + .4)); const q = seg(t, 1.5, 1.9); sample.style.opacity = q; sample.style.transform = 'rotate(-2deg)' } };
  },
};

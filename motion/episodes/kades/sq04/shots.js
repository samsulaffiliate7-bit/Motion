// Shot Kades Side Quest #4: tebak benda desa. Studio gelap + lampu sorot, kamera makro zoom-out pelan (beda dari diorama biasa).
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera } from '../../../engine/w3d/kit.js';
import { X, DG, YEL, CREAM, INK, kades, card, at, txtSprite } from '../../../engine/w3d/desa3d.js';
const STUDIO = (c = '#2A2238') => newScene({ sky: [c, '#120E1A'], hemi: .55, sunI: 2.4, sun: '#FFE7B8', sunPos: [3, 9, 6], shadow: 6 });
function stage(sc, col) { sc.add(mesh(G.cyl(3.2, 3.4, .4, 32), col, [0, -.2, 0])); const L = new THREE.SpotLight('#FFF1CC', 60, 20, .5, .5); L.position.set(0, 9, 2); L.target.position.set(0, 0, 0); sc.add(L); sc.add(L.target); }
function kentongan(p) { const g = group(null, p); g.add(mesh(G.cyl(.35, .35, 2.6, 14), '#C9A36B', [0, 0, 0])); g.add(mesh(G.box(.12, 1.6, .2), '#3A2A18', [0, 0, .33], { cast: false })); [-1.1, 1.1].forEach(y => g.add(mesh(G.cyl(.37, .37, .08, 14), '#A88754', [0, y, 0])));
  g.add(mesh(G.cyl(.03, .03, .8, 4), '#5E4A36', [0, 1.6, 0])); const st = mesh(G.cyl(.06, .06, 1.2, 6), '#7A4E2C', [.9, -.2, .5], { rot: [0, 0, 1] }); g.add(st); g.userData.stick = st; return g }
function caping(p) { const g = group(null, p); const c = mesh(G.cone(1.8, .9, 24), '#D9B66B', [0, .45, 0]); g.add(c); for (let i = 0; i < 6; i++) g.add(mesh(G.cyl(1.8 - i * .3, 1.8 - i * .3, .02, 24, 1, true), '#B8954E', [0, .02 + i * .15, 0], { cast: false })); return g }
function lesung(p) { const g = group(null, p); g.add(mesh(G.box(3.4, .8, 1), '#8E5E34', [0, .4, 0])); g.add(mesh(G.box(2.6, .1, .6), '#4A2E18', [0, .81, 0], { cast: false }));
  const alu = mesh(G.cyl(.12, .12, 2.6, 8), '#B58A5A', [.6, 1.8, 0], { rot: [0, 0, .25] }); g.add(alu); g.userData.alu = alu; for (let i = 0; i < 14; i++) g.add(mesh(G.sph(.05, 5, 4), '#F2E6C8', [-.8 + (i % 7) * .25, .86, -.1 + Math.floor(i / 7) * .2], { cast: false })); return g }
function tampah(p) { const g = group(null, p); g.add(mesh(G.cyl(1.7, 1.6, .2, 32), '#1A1424', [0, 0, 0])); g.add(mesh(G.cyl(1.75, 1.75, .25, 32, 1, true), '#1A1424', [0, 0, 0])); return g }
function reveal(root, txt, col = DG) { return X.ab({ left: 0, top: 1040, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '96px', color: '#FFFFFF', WebkitTextStroke: `12px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, txt) }
function num(root, n) { return X.ab({ left: 60, top: 300, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '64px', color: INK, background: YEL, border: `7px solid ${INK}`, borderRadius: '28px', padding: '6px 26px', opacity: 0 }, root, `#${n}`) }
const blur = (el, q) => { el.style.filter = `blur(${(1 - q) * 18}px)` };
function zoomObj(s, root, obj, n, word, ans, col, cueAns) {   // zoom makro -> mundur pelan -> jawaban
  const sc = STUDIO(col); stage(sc, '#3A3046'); sc.add(obj); const nb = num(root, n), rv = reveal(root, ans); const q3 = card(root, '❓ benda apa?', { left: 300, top: 420, fontSize: '50px' }); const cam = camera(40);
  return { scene: sc, cam, upd(t, dur) { const ta = at(s, cueAns, dur * .55); const p = E.inout(seg(t, 0, ta)); const d = lerp(1.6, 7.5, p); cam.position.set(Math.sin(t * .3) * d * .3, lerp(1.3, 2.6, p), d); cam.lookAt(0, lerp(.6, .9, p), 0); obj.rotation.y = t * .25;
    X.pop(nb, seg(t, .1, .4)); q3.style.opacity = seg(t, .3, .6) * (1 - seg(t, ta - .3, ta)); X.pop(rv, seg(t, ta, ta + .35)); if (obj.userData.stick) obj.userData.stick.rotation.z = 1 + Math.max(0, Math.sin(t * 9)) * .4 * (t > ta ? 1 : 0); if (obj.userData.alu) obj.userData.alu.position.y = 1.8 + Math.abs(Math.sin(t * 4)) * .5 * (t > ta ? 1 : 0) } };
}
export const SHOTS = {
  K_SQ04_HOOK(s, root) {   // frame 1: makro super dekat tekstur bambu berputar + 4 kotak tanda tanya; kades muncul dengan kaca pembesar
    const sc = STUDIO(); stage(sc, '#3A3046'); const k = kentongan([0, 1, 0]); sc.add(k); k.rotation.z = Math.PI / 2;
    const boxes = [0, 1, 2, 3].map(i => { const sp = txtSprite('?', [YEL, '#3E8FC4', '#E07B39', '#C2457A'][i], '#fff', 1); sc.add(sp); return sp });
    const K = kades([2.6, 0, .8]); sc.add(K); K.rotation.y = -.6; const mg = group(K.userData.st.arms[0], [0, -.6, .1]); mg.add(mesh(G.cyl(.25, .25, .04, 16), '#9ED8F5', [0, -.25, 0], { rot: [Math.PI / 2, 0, 0], cast: false })); mg.add(mesh(G.box(.06, .3, .06), '#3A2A18', [0, 0, 0]));
    const h1 = X.ab({ left: 70, top: 300, width: 940, background: '#1E1830EE', border: `8px solid ${YEL}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '60px', color: '#FFFFFF', fontFamily: 'Fredoka', fontWeight: 700, opacity: 0 }, root, `🔍 Tebak benda desa!<br><span style="font-size:42px;color:${YEL}">zoom sampai mentok</span>`);
    const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); const d = lerp(2.4, 10, p); cam.position.set(lerp(.3, 1, p), lerp(1.2, 2.6, p), d); cam.lookAt(lerp(0, .8, p), lerp(1, 1.7, p), 0); k.rotation.y = t * .5;
      boxes.forEach((b, i) => { const q = E.back(seg(t, 1.5 + i * .3, 1.9 + i * .3)); b.scale.setScalar(Math.max(.001, q)); b.position.set(-1.6 + i * 1.05, 2.25 + Math.sin(t * 2 + i) * .1, -.8) }); K.pose(t, { talk: true, point: true }); X.pop(h1, seg(t, .15, .5)) } };
  },
  K_SQ04_ONE(s, root) { return zoomObj(s, root, (() => { const k = kentongan([0, 1.4, 0]); return k })(), 1, 'bambu', 'KENTONGAN', '#2A3A2A', 'kentongan') },
  K_SQ04_TWO(s, root) { return zoomObj(s, root, caping([0, .1, 0]), 2, 'kerucut', 'CAPING', '#3A2A1E', 'caping') },
  K_SQ04_THREE(s, root) { return zoomObj(s, root, lesung([0, 0, 0]), 3, 'kayu', 'LESUNG + ALU', '#1E2A3A', 'lesung') },
  K_SQ04_MYSTERY(s, root) {   // siluet hitam berputar di balik tirai cahaya merah, tanda tanya besar, petunjuk muncul satu-satu
    const sc = STUDIO('#3A1420'); stage(sc, '#2A1A22'); const o = tampah([0, 1.5, 0]); sc.add(o); o.rotation.x = 1.1; o.scale.setScalar(.6); const back = mesh(G.box(8, 6, .2), '#E5484D', [0, 2.5, -2.5], { mat: { emissive: '#E5484D', emissiveIntensity: .8 } }); sc.add(back);
    const nb = num(root, 4); const Q = txtSprite('?', '#FFFFFF', INK, 1.6); Q.position.set(0, 3.6, 0); sc.add(Q);
    const C = [['⭕ bundar', 'bundar'], ['🫓 pipih', 'pipih'], ['🎋 anyaman bambu', 'anyaman'], ['🍳 di dapur', 'dapur'], ['〰️ digoyang-goyang', 'digoyang']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60 + (i % 2) * 480, top: 1060 + Math.floor(i / 2) * 105, fontSize: '42px' }) })); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .2) * 1.5, 2.4, 10.5); cam.lookAt(0, 2.2, 0); o.rotation.z = t * .6; Q.position.y = 3.8 + Math.sin(t * 3) * .1; X.pop(nb, seg(t, .1, .4)); C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .35)) }) } };
  },
  K_SQ04_QUEST(s, root) {   // empat kotak di rak: tiga terbuka (ikon jawaban), satu tertutup gembok; kades menunjuk kolom komentar
    const sc = STUDIO('#20304A'); stage(sc, '#2E3A50'); const shelf = mesh(G.box(6, .2, 1.4), '#8E5E34', [0, 1.4, 0]); sc.add(shelf);
    const items = [['🎋', YEL], ['👒', '#3E8FC4'], ['🪵', '#E07B39'], ['🔒', '#C2457A']].map(([e, c], i) => { const sp = txtSprite(e, c, '#fff', .9); sp.position.set(-1.65 + i * 1.1, 2.1, 0); sc.add(sp); return sp });
    const K = kades([0, 0, 1.6]); sc.add(K); const c1 = card(root, '💬 tebak benda #4', { left: 250, top: 300, fontSize: '54px' }), c2 = card(root, '🥇 benar pertama = disebut', { left: 160, top: 420, fontSize: '44px' }, DG), c3 = card(root, '🎯 skor lo ?/4', { left: 330, top: 540, fontSize: '46px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .25) * 2, 3, 11.5); cam.lookAt(0, 1.9, 0); K.pose(t, { talk: true, wave: (t % 4) < 1 }); items.forEach((sp, i) => { const q = E.back(seg(t, .3 + i * .3, .7 + i * .3)); sp.scale.setScalar(Math.max(.001, q * .9)) });
      X.pop(c1, seg(t, .3, .7)); X.pop(c2, seg(t, at(s, 'pertama', 2), at(s, 'pertama', 2) + .4)); X.pop(c3, seg(t, at(s, 'Skor', 5), at(s, 'Skor', 5) + .4)) } };
  },
};

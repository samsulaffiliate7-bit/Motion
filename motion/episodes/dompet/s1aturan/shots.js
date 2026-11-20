// Shot Dompet S1 video ATURAN MAIN (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SORE, SIANG, SENJA, nana, ratna, siDompet, kota, krl, peron, kerumunan, trotoar, lampu, gangKos, canvasPlane, papanTeks,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const V = new THREE.Vector3();
function pegang(P, D, off = [0, 0, 0]) { P.updateMatrixWorld(true); V.set(0, -.36, .02); P.userData.st.arms[1].userData.elbow.localToWorld(V); D.position.set(V.x + off[0], V.y + off[1], V.z + off[2]) }
function atap(sc, p, w = 9, h = 7) {   // atap gedung: lantai, pagar, toren, antena, jemuran
  const g = group(sc, p); g.add(mesh(G.box(w, h, w), '#F2E3C6', [0, h / 2, 0])); g.add(mesh(G.box(w + .2, .2, w + .2), '#C9C2B6', [0, h + .1, 0]));
  [-1, 1].forEach(s => { g.add(mesh(G.box(w, .6, .12), '#8A8A8A', [0, h + .5, s * w / 2])); g.add(mesh(G.box(.12, .6, w), '#8A8A8A', [s * w / 2, h + .5, 0])) });
  g.add(mesh(G.cyl(.7, .7, 1.4, 14), '#2E6FB0', [-w / 2 + 1.4, h + 1.2, -w / 2 + 1.4])); g.add(mesh(G.box(1.6, .3, 1.6), '#8A8A8A', [-w / 2 + 1.4, h + .35, -w / 2 + 1.4]));
  g.add(mesh(G.cyl(.03, .03, 3, 4), '#555', [w / 2 - 1, h + 1.7, -w / 2 + 1]));
  ['#E5484D', '#F2C14E', '#FFFFFF', '#2E9C6A'].forEach((c, i) => g.add(mesh(G.box(.6, .7, .04), c, [-1.2 + i * .8, h + 1.3, -w / 2 + 2.6], { cast: false }))); g.add(mesh(G.cyl(.01, .01, 4, 4), '#333', [0, h + 1.68, -w / 2 + 2.6], { rot: [0, 0, Math.PI / 2], cast: false }));
  return h + .2;
}

export const SHOTS = {
  DA_HOOK(s, root) {   // drone menukik dari langit Jakarta ke atap gedung, Nana melambai sambil angkat Si Dompet
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 8 && Math.abs(z) < 8, rail: -44 }); const y = atap(sc, [0, 0, 0]);
    const N = nana([0, y, 1]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .32); const cam = camera(42); const h = BIG(root, 'ATURAN MAIN', { top: 330, fontSize: '128px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { wave: true, hold: true, talk: t > 1 }); pegang(N, D, [0, .05, .06]); D.mood(t, 'senyum');
      const p = E.out(seg(t, 0, dur * .8)); cam.position.set(lerp(18, 2.2, p), lerp(70, y + 2.3, p), lerp(60, 6.6, p)); cam.lookAt(0, lerp(0, y + 1.4, p), lerp(-10, 1, p)); pulse(h, seg(t, .1, .5)) } };
  },
  DA_PREMIS(s, root) {   // trotoar kota: Nana berjalan ke arah kamera, gedung tinggi di kiri-kanan
    const sc = SIANG(); const K = kota(sc, { hole: (x, z) => x > 2 && x < 12 && Math.abs(z) < 60 }); const tr = group(sc, [6, 0, 0]); tr.rotation.y = Math.PI / 2; trotoar(tr, 0, 120);
    [-24, -8, 8, 24].forEach(z => { const l = lampu(sc, [7.6, .25, z]); l.rotation.y = Math.PI });
    const N = nana([6, .25, 0]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .3); const cam = camera(40);
    const l1 = KARTU(root, '30 EPISODE · 1 BULAN', '', { top: 330 }), l2 = KARTU(root, 'GAJIAN PERTAMA', 'targetnya', { top: 470 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const z = lerp(-6, 4, seg(t, 0, dur)); N.position.z = z; N.pose(t, { walk: 1, hold: true, talk: true }); pegang(N, D); D.mood(t, 'senyum');
      cam.position.set(5.2, 1.8, z + 6.2); cam.lookAt(6.2, 1.5, z - 2); show(l1, seg(t, .2, .6)); const tg = at(s, 'gajian', dur - 2); show(l2, seg(t, tg - .2, tg + .3)) } };
  },
  DA_FOLLOW(s, root) {   // atap kos: notif HP "+Rp1.000", koin jatuh masuk ke Si Dompet yang tersenyum
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 8 && Math.abs(z) < 8 }); const y = atap(sc, [0, 0, 0]);
    const N = nana([-.6, y, 1.2]); sc.add(N); N.rotation.y = .35; const D = siDompet(sc, [.75, y + .9, 1.6], .5); D.rotation.y = -.3; sc.add(mesh(G.box(1, .9, .8), '#8A8A8A', [.75, y + .45, 1.6]));
    const coins = Array.from({ length: 8 }, () => coin(sc, [0, -9, 0], 1.3)); const cam = camera(42); const l = KARTU(root, 'FOLLOW', '= +Rp1.000 masuk ke HP Nana', { top: 330 });
    const notif = X.ab({ left: 170, top: 560, width: 740, opacity: 0, fontFamily: 'Poppins,sans-serif' }, root, `<div style="display:flex;align-items:center;gap:20px;background:#FFFDF6;border-radius:28px;padding:20px 28px;box-shadow:0 18px 36px #00000055">
      <div style="width:76px;height:76px;border-radius:20px;background:#C8501E;color:#fff;font-size:44px;display:flex;align-items:center;justify-content:center">Rp</div><div><div style="font-size:24px;color:#9A7A60;font-weight:700">FOLLOWER BARU · sekarang</div><div style="font-size:44px;color:#2E9C6A;font-weight:800">+Rp1.000 masuk</div></div></div>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tf = at(s, 'seribu', 2); N.pose(t, { hold: true, talk: true, cheer: t > tf + .6 }); D.mood(t, t > tf + .3 ? 'senyum' : 'kecut', t > tf ? 1.6 : 1);
      coins.forEach((c, i) => { const q = seg(t, tf + i * .22, tf + .7 + i * .22); c.visible = q > 0 && q < 1; c.position.set(.75 + Math.sin(i * 2) * .15, y + 3.4 - E.in(q) * 2.2, 1.6); c.rotation.x = Math.PI / 2 + t * 6 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.4, .9, p), lerp(y + 2.1, y + 1.9, p), lerp(6.6, 5.4, p)); cam.lookAt(-.1, y + 1.2, 1.3);
      show(l, seg(t, .2, .6)); const tn = at(s, 'bunyi', 1.4); show(notif, seg(t, tn - .1, tn + .3) * (1 - seg(t, dur - .8, dur - .3)), -40) } };
  },
  DA_LIKE(s, root) {   // atap kos: papan skill 4 bar terisi, Nana menunjuk
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 8 && Math.abs(z) < 8 }); const y = atap(sc, [0, 0, 0]);
    const N = nana([-1.6, y, 1.4]); sc.add(N); N.rotation.y = .7; const cam = camera(42);
    const pp = canvasPlane(3.6, 2.6, () => { }, 720); pp.position.set(1, y + 1.9, .2); pp.rotation.y = -.2; sc.add(pp); [-1, 1].forEach(sx => sc.add(mesh(G.box(.12, 1.4, .12), '#5A3A1A', [1 + sx * 1.6, y + .7, .3])));
    const SK = [['JUALAN', '#E5484D'], ['KOMPUTER', '#2E6FB0'], ['MASAK', '#F2A31B'], ['NGOMONG', '#2E9C6A']];
    const draw = q => pp.userData.redraw((x, W, H) => { x.fillStyle = '#2A1810'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFC86B'; x.font = `800 ${H * .12}px Baloo`; x.textAlign = 'center'; x.fillText('SKILL NANA', W / 2, H * .15);
      SK.forEach(([n, c], i) => { const yy = H * (.27 + i * .18), lv = Math.min(1, q * (1.3 - i * .18)); x.textAlign = 'left'; x.fillStyle = '#FFF1D2'; x.font = `800 ${H * .075}px Poppins`; x.fillText(n, W * .06, yy + H * .07);
        x.fillStyle = '#4A3428'; x.fillRect(W * .44, yy, W * .5, H * .09); x.fillStyle = c; x.fillRect(W * .44, yy, W * .5 * lv, H * .09); x.fillStyle = '#FFF1D2'; x.font = `800 ${H * .06}px Poppins`; x.fillText('Lv ' + (1 + Math.floor(lv * 4)), W * .46, yy + H * .068) }) });
    const l = KARTU(root, '10 LIKE', '= +1 XP skill', { top: 330 }); let last = -1;
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const q = Math.round(seg(t, .8, dur - .8) * 20) / 20; if (q !== last) { draw(q); last = q } N.pose(t, { point: true, talk: true, bounce: t > dur - 2 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.4, -.8, p), lerp(y + 2.6, y + 2.3, p), lerp(13.5, 12, p)); cam.lookAt(.15, y + 1.4, .4); show(l, seg(t, .2, .6)) } };
  },
  DA_KOMEN(s, root) {   // perempatan: tiga papan arah, gelembung komen beterbangan ke Nana
    const sc = SIANG(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 13 && Math.abs(z) < 13 }); const N = nana([0, 0, .6]); sc.add(N); N.rotation.y = .2;
    const tiang = group(sc, [-1.2, 0, -.4]); tiang.add(mesh(G.cyl(.07, .07, 3.6, 8), '#4E5A66', [0, 1.8, 0]));
    const arah = [['KERJA', '#2E6FB0', .5], ['MAKAN', '#E5484D', -.6], ['TIDUR', '#2E9C6A', 2.6]].map(([tx, c, r], i) => { const g = group(tiang, [0, 3.1 - i * .55, 0]); g.rotation.y = r; const b = canvasPlane(1.7, .42, papanTeks(tx + ' ›', c, '#FFFFFF'), 300); b.position.x = .85; g.add(b); return g });
    const bub = Array.from({ length: 12 }, (_, i) => { const g = group(sc, [0, -9, 0]); g.add(mesh(G.sph(.36, 14, 10), '#FFFFFF', [0, 0, 0], { s: [1.3, .9, .4], mat: { flatShading: false } })); g.add(mesh(G.cone(.12, .22, 6), '#FFFFFF', [-.28, -.32, 0], { rot: [0, 0, .7] }));
      [-1, 0, 1].forEach(k => g.add(mesh(G.sph(.05, 8, 6), ['#C8501E', '#2E6FB0', '#2E9C6A'][i % 3], [k * .16, 0, .15], { cast: false }))); return g });
    const cam = camera(42); const l = KARTU(root, 'KOMEN', '= kalian yang mutusin langkah Nana', { top: 330 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { talk: true, look: Math.sin(t * 1.5) * .5, cheer: t > dur - 1.8 });
      bub.forEach((g, i) => { const q = seg(t, .4 + i * .3, 1.8 + i * .3), a = i * 2.4; g.visible = q > 0 && q < 1; g.position.set(lerp(Math.cos(a) * 7, 0, E.in(q)), lerp(3 + (i % 3), 2.1, q) + Math.sin(q * Math.PI) * 1.5, lerp(Math.sin(a) * 5 + 1, .6, E.in(q))); g.lookAt(cam.position); g.scale.setScalar(1 - q * .6) });
      const p = ease(t, 0, dur); cam.position.set(lerp(6, 3.4, p), lerp(4.5, 2.5, p), lerp(9, 6.4, p)); cam.lookAt(-.3, 1.7, 0); show(l, seg(t, .2, .6)) } };
  },
  DA_SABTU(s, root) {   // gang kos: Bu Ratna menunjuk kalender raksasa SABTU
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -46 && z < 24 }); const Gk = gangKos(sc); const z0 = Gk.kosZ;
    const B = ratna([-.5, 0, z0 + 1.4]); sc.add(B); B.rotation.y = 1.0; const cam = camera(42);
    const kal = canvasPlane(1.9, 2.2, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#D9342B'; x.fillRect(0, 0, W, H * .26); x.fillStyle = '#FFFFFF'; x.font = `800 ${H * .17}px Baloo`; x.textAlign = 'center'; x.fillText('SABTU', W / 2, H * .2);
      x.fillStyle = '#D9342B'; x.font = `800 ${H * .27}px Baloo`; x.fillText('BAYAR', W / 2, H * .62); x.fillStyle = '#4A2410'; x.font = `800 ${H * .14}px Baloo`; x.fillText('KOS!', W / 2, H * .88) }, 512); kal.position.set(.55, 2.35, z0 - .9); kal.rotation.y = -.15; sc.add(kal);
    const l = KARTU(root, 'TIAP AKHIR PEKAN', 'ada ujian besar', { top: 330 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const ts = at(s, 'Sabtu', dur - 1.6); B.pose(t, { talk: true, point: t > ts - .5, shake: t > ts + .6 }); kal.scale.setScalar(1 + .12 * Math.sin(Math.PI * seg(t, ts - .1, ts + .4)));
      const p = ease(t, 0, dur); cam.position.set(lerp(.1, .2, p), lerp(1.75, 1.6, p), lerp(z0 + 9.2, z0 + 7.6, p)); cam.lookAt(0, 1.8, z0); show(l, seg(t, .2, .6)) } };
  },
  DA_MULAI(s, root) {   // peron: KRL datang dan berhenti, pintu terbuka, Nana menunjuk
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(z) < 16 && Math.abs(x) < 40 }); peron(sc, [0, 0, 0]); const T = krl(sc, [-40, .25, -2]); const crowd = kerumunan(sc, 20, [4, 2.2, 19, 5.4], { y: 1.1, s: 1.75 });
    const N = nana([-3, 1.1, 2.4]); sc.add(N); N.rotation.y = -.6; const D = siDompet(sc, [0, 0, 0], .3); const cam = camera(42);
    const h = BIG(root, 'MULAI DARI<br>EPISODE 0', { top: 330, fontSize: '108px', lineHeight: 1.05 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); crowd(t); T.position.x = lerp(-60, -12, E.out(seg(t, 0, 2.4))); T.userData.buka(E.inout(seg(t, 2.6, 3.2))); N.pose(t, { point: true, hold: true, talk: t < dur - 1.5 }); pegang(N, D); D.mood(t, 'senyum');
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .2, p), lerp(2.7, 2.6, p), lerp(9.6, 8.8, p)); cam.lookAt(-3, 2.4, .4); pulse(h, seg(t, .2, .6)) } };
  },
};

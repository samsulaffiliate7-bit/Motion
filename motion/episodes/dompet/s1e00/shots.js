// Shot Dompet S1 Ep 0 "Rp100 Ribu Terakhir" (lihat STORYBOARD.md). Tiap adegan = lokasi/kamera berbeda; kota Jakarta padat di latar.
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SORE, SENJA, nana, raka, ratna, siDompet, kota, krl, peron, kerumunan, jpo, lampu, trotoar, warteg, gangKos, bangku, duduk, canvasPlane, papanTeks,
  BIG, KARTU, show, pulse, ease, tag, hpBesar, at, X } from '../_s1/dunia.js';

const V = new THREE.Vector3();
function pegang(P, D, off = [0, 0, 0]) { P.updateMatrixWorld(true); V.set(0, -.36, .02); P.userData.st.arms[1].userData.elbow.localToWorld(V); D.position.set(V.x + off[0], V.y + off[1], V.z + off[2]) }
const rp = n => 'Rp' + n.toLocaleString('id-ID');

export const SHOTS = {
  D0_TIBA(s, root) {   // frame 1 aksi: pintu KRL terbuka, Nana melompat ke peron mengangkat Si Dompet
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(z) < 16 && Math.abs(x) < 40 }); peron(sc, [0, 0, 0]); const T = krl(sc, [-12, .25, -2]);
    const N = nana([-4.4, 1.1, -.6]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .32); const c1 = kerumunan(sc, 22, [-19, 2.2, -9, 5.4], { y: 1.1, s: 1.75 }), c2 = kerumunan(sc, 22, [3, 2.2, 19, 5.4], { y: 1.1, s: 1.75, seed: 9 }), crowd = t => { c1(t); c2(t) };
    const h = BIG(root, rp(X.TL.vars.hud.saldo), { top: 330, fontSize: '170px' }), sub = BIG(root, 'uang terakhir gue', { top: 520, fontSize: '62px', fontWeight: 700 }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); crowd(t); T.userData.buka(.55 + .45 * E.out(seg(t, 0, .4)));
      const j = seg(t, 0, .75); N.position.set(-4.4 + j * .5, 1.1 + Math.sin(j * Math.PI) * .55, lerp(-.7, 1.7, E.out(j))); N.rotation.y = lerp(.2, .55, seg(t, .7, 1.6));
      N.pose(t, { hold: true, cheer: t < .75, talk: t > 1.2 }); pegang(N, D, [0, .05, .08]); D.rotation.y = N.rotation.y; D.mood(t, 'senyum');
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.4, -2.2, p), lerp(3.1, 3.2, p), lerp(8.4, 7.2, p)); cam.lookAt(-4.0, 2.75, .3);
      pulse(h, seg(t, .15, .55)); const tc = at(s, 'terakhir', 1.2); show(sub, seg(t, tc - .2, tc + .3)) } };
  },
  D0_KOTA(s, root) {   // JPO di atas jalan raya: drone mundur & naik, Nana kecil di tengah kota luas
    const sc = SORE(); const K = kota(sc, { rail: -44 }); const J = jpo(sc, [0, 0, 0], 16); J.rotation.y = Math.PI / 2;
    const N = nana([.2, 5.15, .6]); sc.add(N); N.rotation.y = .5; const D = siDompet(sc, [0, 0, 0], .3); const cam = camera(42);
    const k = KARTU(root, 'KENALAN: 0', '', { top: 380 }); const lb = BIG(root, `${Math.floor(K.gedung / 100) * 100}+ gedung`, { top: 560, fontSize: '64px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { hold: true, look: Math.sin(t * .8) * .7 }); pegang(N, D); D.mood(t, 'senyum');
      const a = E.inout(seg(t, .2, dur - .6)), ay = E.out(seg(t, .2, dur - 1.2)); cam.position.set(lerp(2.4, 6, a), lerp(6.7, 58, ay), lerp(4.2, 74, a)); cam.lookAt(lerp(.2, 0, a), lerp(6, 4, a), lerp(.4, -40, a));
      show(lb, seg(t, 1.6, 2.1) * (1 - seg(t, dur - 2.2, dur - 1.8))); const tc = at(s, 'siapa', dur - 2); pulse(k, seg(t, tc - .1, tc + .3)) } };
  },
  D0_DOMPET(s, root) {   // close-up Si Dompet di tangan Nana: berkedip, senyum lebar; kota buram di belakang
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => z > -8 && z < 12 && Math.abs(x) < 30 }); trotoar(sc, 0, 80);
    const N = nana([0, .25, 0]); sc.add(N); N.rotation.y = .25; const D = siDompet(sc, [0, 0, 0], .44); const cam = camera(40);
    const tg = tag(root, 'SI DOMPET'); const tg2 = tag(root, 'mood = saldo');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { hold: true, talk: true, look: .2 }); pegang(N, D, [-.05, -.2, .22]); D.rotation.y = .25; D.mood(t, 'senyum', 1.4);
      const p = ease(t, 0, dur); cam.position.set(lerp(1.3, .9, p), lerp(1.45, 1.35, p), lerp(3.6, 2.9, p)); cam.lookAt(.1, 1.55, .3);
      const td = at(s, 'Dompet', .6); tg(D, cam, [0, 1.05, 0], seg(t, td, td + .3)); const tm = at(s, 'saldo', 3); tg2(D, cam, [0, -.15, 0], seg(t, tm - .2, tm + .2)) } };
  },
  D0_JALAN(s, root) {   // trotoar jalan raya: Nana jalan, struk kereta muncul, Si Dompet cemberut
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => z > 2 && z < 12 && Math.abs(x) < 50 }); trotoar(sc, 5.5, 100); [-14, 0, 14].forEach(x => lampu(sc, [x, .25, 7.2]).rotation.y = Math.PI / 2 * 0);
    const N = nana([0, .25, 5.6]); sc.add(N); N.rotation.y = Math.PI / 2; const D = siDompet(sc, [0, 0, 0], .32); const cam = camera(42);
    const struk = canvasPlane(.6, .9, (x, W, H) => { x.fillStyle = '#FFFDF4'; x.fillRect(0, 0, W, H); x.fillStyle = '#4A2410'; x.textAlign = 'center'; x.font = `800 ${H * .1}px Poppins`; x.fillText('TIKET KERETA', W / 2, H * .2);
      x.fillStyle = '#C8501E'; x.font = `800 ${H * .17}px Baloo`; x.fillText('Rp5.000', W / 2, H * .5); x.fillStyle = '#9A8A7A'; for (let i = 0; i < 4; i++) x.fillRect(W * .15, H * (.66 + i * .07), W * .7, 4) }, 256); sc.add(struk);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const nx = lerp(-3, 3.5, seg(t, 0, dur)); N.position.x = nx; N.pose(t, { walk: 1, hold: true }); pegang(N, D, [0, .02, .05]); D.rotation.y = .9;
      const tk = at(s, 'kecut', dur - 1.5); D.mood(t, t > tk ? 'kecut' : 'senyum'); const ps = E.back(seg(t, .3, .8)); struk.position.set(D.position.x + .1, D.position.y + .75, D.position.z + .1); struk.scale.setScalar(Math.max(.001, ps)); struk.rotation.y = .4;
      cam.position.set(nx + 2.4, 1.7, 9.6); cam.lookAt(nx + .2, 1.25, 4.6) } };
  },
  D0_WARTEG(s, root) {   // warteg: etalase lauk warna-warni, Nana makan, Si Dompet di meja menangis
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -12 && z < 14 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60);
    const N = nana([.1, 0, .7]); sc.add(N); duduk(N, -.33); sc.add(mesh(G.box(.5, .45, .5), '#5A3A1A', [.1, .22, .6]));
    const piring = group(sc, [.1, 1.02, 1.35]); piring.add(mesh(G.cyl(.3, .25, .04, 16), '#FFFFFF', [0, 0, 0])); piring.add(mesh(G.sph(.17, 12, 8), '#FAF6EC', [-.05, .06, 0], { s: [1, .55, 1] })); piring.add(mesh(G.sph(.09, 10, 8), '#F2C14E', [.13, .05, .05], { s: [1, .4, 1] })); piring.add(mesh(G.sph(.1, 8, 6), '#6E9A3A', [.05, .05, -.14], { s: [1, .4, 1] }));
    const D = siDompet(sc, [.95, 1.01, 1.45], .38); D.rotation.y = -.4; const cam = camera(42); const harga = KARTU(root, '−Rp15.000', 'nasi · sayur · telor', { top: 360 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.33); const tn = at(s, 'nangis', dur - 2); N.pose(t, { hold: t < tn, nod: t < tn - .5, talk: t > tn }); duduk(N, -.33); D.mood(t, t > tn ? 'nangis' : t > at(s, 'Lima', 2) ? 'kecut' : 'senyum');
      const p = ease(t, 0, dur); cam.position.set(lerp(3.4, 2.1, p), lerp(2.7, 2.1, p), lerp(7.4, 5.4, p)); cam.lookAt(.2, 1.45, .2); const tl = at(s, 'Lima', 2); show(harga, seg(t, tl - .2, tl + .3) * (1 - seg(t, tn - .4, tn))) } };
  },
  D0_RAKA(s, root) {   // Raka (helm, jaket ojol) duduk di sebelah; tiga es teh muncul satu-satu
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -12 && z < 14 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60);
    const N = nana([.1, 0, .7]); sc.add(N); const Rk = raka([-1.2, 0, .7]); sc.add(Rk); [[.1, .6], [-1.2, .6]].forEach(([x, z]) => sc.add(mesh(G.box(.5, .45, .5), '#5A3A1A', [x, .22, z])));
    const D = siDompet(sc, [.95, 1.01, 1.45], .38); D.rotation.y = -.4; const gelas = [0, 1, 2].map(i => { const g = group(sc, [-1.5 + i * .32, 1.01, 1.4]); g.add(mesh(G.cyl(.09, .07, .3, 12), '#E8A050', [0, .15, 0], { mat: { transparent: true, opacity: .85 } })); g.add(mesh(G.cyl(.012, .012, .34, 4), '#E5484D', [.03, .3, 0], { rot: [0, 0, .2] })); g.scale.setScalar(.001); return g });
    const cam = camera(42); const tgR = tag(root, 'RAKA · paling hemat (katanya)'); const n3 = BIG(root, '3×', { top: 420, fontSize: '140px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.33); duduk(Rk, -.33); const t3 = at(s, 'tiga', dur - 2);
      Rk.pose(t, { talk: t < t3, cheer: t > t3 + .9, look: -.2 }); duduk(Rk, -.33); N.pose(t, { look: -.6, shake: t > t3 + .6 }); duduk(N, -.33); D.mood(t, t > t3 + .4 ? 'kaget' : 'nangis');
      gelas.forEach((g, i) => g.scale.setScalar(Math.max(.001, E.back(seg(t, t3 + i * .3, t3 + .3 + i * .3)))));
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.9, -1.4, p), lerp(2.0, 1.8, p), lerp(5.6, 4.6, p)); cam.lookAt(-.55, 1.3, .9); tgR(Rk, cam, [0, 2.15, 0], seg(t, .3, .7) * (1 - seg(t, t3 - .4, t3))); pulse(n3, seg(t, t3 + .5, t3 + .8)) } };
  },
  D0_KOS(s, root) {   // gang kos padat di bawah gedung tinggi: menyusuri gang ke gerbang Bu Ratna, papan KAMAR KOSONG: SABTU
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -46 && z < 24 }); const Gk = gangKos(sc); const z0 = Gk.kosZ;
    const B = ratna([-1.05, 0, z0 + .2]); sc.add(B); B.rotation.y = .9; const N = nana([.5, 0, z0 + 5]); sc.add(N); N.rotation.y = Math.PI; const Rk = raka([1, 0, z0 + 6.2]); sc.add(Rk); Rk.rotation.y = Math.PI + .3;
    const cam = camera(42); const harga = KARTU(root, 'Rp200.000', 'per minggu · bayar di muka', { top: 360 }); const tgB = tag(root, 'BU RATNA');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = seg(t, 0, dur * .45); N.position.z = lerp(z0 + 7, z0 + 2.2, w); N.pose(t, { walk: w < 1 ? 1 : 0, look: w >= 1 ? .5 : 0 }); Rk.position.z = lerp(z0 + 8.4, z0 + 3.4, w); Rk.pose(t, { walk: w < 1 ? 1 : 0, point: w < .6 });
      const ts = at(s, 'Sabtu', dur - 4), td = at(s, 'dua ratus', dur - 2); B.pose(t, { talk: t > at(s, 'Bu Ratna', 3), point: t > ts && t < ts + 1.6, shake: t > td });
      const a = ease(t, 0, dur * .7), z2 = ease(t, ts - .4, ts + .8); cam.position.set(lerp(.6, .9, a) - z2 * .1, lerp(2.4, 1.9, a), lerp(z0 + 14, z0 + 7.6, a) - z2 * .8); cam.lookAt(lerp(0, -.9, a) - z2 * .5, lerp(2.2, 1.6, a) + z2 * .5, lerp(z0 - 4, z0, a));
      tgB(B, cam, [0, 2.15, 0], seg(t, at(s, 'Bu Ratna', 3), at(s, 'Bu Ratna', 3) + .3) * (1 - seg(t, ts - .3, ts))); show(harga, seg(t, td - .2, td + .3)) } };
  },
  D0_MALAM(s, root) {   // senja: Nana duduk di bangku bawah lampu jalan, Si Dompet menangis, kota menyala
    const sc = SENJA({ sunI: 1.9, hemi: 1.05 }); const K = kota(sc, { hole: (x, z) => z > 2 && z < 14 && Math.abs(x) < 40, rail: -44, lit: .5 }); trotoar(sc, 5.5, 100); const L = lampu(sc, [2.2, .25, 4.4], 1.6);
    bangku(sc, [0, .25, 6.2]); const N = nana([-.4, .25, 6.3]); sc.add(N); const D = siDompet(sc, [.55, .91, 6.3], .34); D.rotation.y = -.3;
    const glow = new THREE.PointLight('#FFC97A', 6, 9, 1.6); glow.position.set(3.3, 4.6, 4.4); sc.add(glow); const cam = camera(42);
    const card = X.ab({ left: 120, top: 330, width: 840, textAlign: 'center', opacity: 0, fontFamily: 'Baloo' }, root,
      `<div style="display:inline-block;background:rgba(40,20,10,.88);border-radius:26px;padding:16px 40px 20px;box-shadow:0 14px 30px #0000005c;border:2px solid #ffffff22">
       <div style="font-size:40px;color:#FFF1D2;font-weight:700">saldo <b style="color:#FFC86B;font-size:64px">${rp(X.TL.vars.sisa)}</b></div>
       <div style="font-size:40px;color:#FFF1D2;font-weight:700">Sabtu butuh <b style="color:#FF8A7A;font-size:64px">${rp(X.TL.vars.kos)}</b></div></div>`);
    const zz = BIG(root, 'tidur di mana?', { top: 560, fontSize: '84px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.12); N.pose(t, { look: Math.sin(t * .6) * .4, nod: false }); duduk(N, -.12); N.userData.st.arms.forEach(A => { A.rotation.x = -.9; A.userData.elbow.rotation.x = -1.2 }); D.mood(t, 'nangis');
      const p = ease(t, 0, dur); cam.position.set(lerp(4.2, 1.9, p), lerp(2.9, 1.7, p), lerp(13.5, 9.8, p)); cam.lookAt(lerp(-.2, 0, p), lerp(2.6, 1.55, p), lerp(4, 6.2, p));
      show(card, seg(t, .4, .9)); const tt = at(s, 'tempat tidur', dur - 1.5); pulse(zz, seg(t, tt, tt + .35)) } };
  },
  D0_AJAK(s, root) {   // HP Nana besar di atas kota senja: rumus + 3 pilihan
    const sc = SENJA({ sky: ['#7A7FD0', '#FFB27E'], sunI: 1.9, hemi: 1.05 }); const K = kota(sc, { hole: (x, z) => z > 2 && z < 14 && Math.abs(x) < 40, rail: -44, lit: .5 }); trotoar(sc, 5.5, 100); bangku(sc, [0, .25, 6.2]);
    const N = nana([-.2, .25, 6.3]); sc.add(N); const D = siDompet(sc, [.65, .91, 6.3], .34); const cam = camera(42);
    const hp = hpBesar(root, [['👤', 'FOLLOW', '+Rp1.000 masuk'], ['❤', '10 LIKE', '+1 XP skill'], ['💬', 'KOMEN', 'kalian yang mutusin']], 'Malam ini Nana tidur di mana?', ['🛋<br>TERAS KOS', '🖥<br>WARNET', '🚉<br>STASIUN'], { top: 250 });
    const rows = [0, 1, 2].map(i => hp.querySelector('.r' + i)), q = hp.querySelector('.q'), o = hp.querySelector('.o');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.12); N.pose(t, { hold: true, talk: true, look: .3 }); duduk(N, -.12); const tq = at(s, 'Teras', dur - 3); D.mood(t, t > tq ? 'kaget' : 'kecut');
      const p = ease(t, 0, dur); cam.position.set(lerp(-2.6, -1.6, p), lerp(3.2, 2.6, p), lerp(13.5, 12.2, p)); cam.lookAt(0, 3.6, 4);
      show(hp, seg(t, .1, .5), 60); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = .25 + .75 * seg(t, tc - .1, tc + .2); rows[i].style.transform = `scale(${1 + .06 * Math.sin(Math.PI * seg(t, tc - .1, tc + .5))})` });
      const tw = at(s, 'tidur', dur - 4); q.style.opacity = seg(t, tw - .3, tw); o.style.opacity = seg(t, tq - .3, tq) } };
  },
};

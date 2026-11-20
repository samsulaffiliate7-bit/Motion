// Shot Meja S1 video ATURAN MAIN (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera, coin, person } from '../../../engine/w3d/kit.js';
import { SIANG, MENDUNG, bima, rudi, kucing, kampung, gang, mejaLipat, kardus, bungkus, papan, kursi, canvasPlane, papanTeks,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE = (x, z) => Math.abs(x) < 9 && z > -34 && z < 22;
function dunia(o = {}) { const sc = (o.sky || SIANG)(); const K = kampung(sc, { hole: HOLE }); const Gg = gang(sc, o); return { sc, K, Gg } }
function warung(sc, kd = true) { const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; if (kd) { const KD = kardus(sc, [-2.5, .79, 3.4]); KD.rotation.y = Math.PI / 2 }
  for (let i = 0; i < 9; i++) bungkus(sc, [-2.62 + (i % 3) * .19, .8 + Math.floor(i / 3) * .045, 2.35]); return M }
function palu(sc, p) { const g = group(sc, p); g.add(mesh(G.cyl(.02, .02, .3, 6), '#7A4A2A', [0, .05, .12], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.05, .05, .16, 10), '#5A3A1A', [0, .05, 0], { rot: [0, 0, Math.PI / 2] })); return g }
function papanPelanggan(sc, n0) { const P = papan(sc, [-2.0, 2.3, 3.7], 1.1, .62, () => { }, Math.PI / 2 - .3);
  P.set = n => P.userData.c.userData.redraw((x, W, H) => { x.fillStyle = '#1E3A5F'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.textAlign = 'center'; x.font = `800 ${H * .2}px Poppins`; x.fillText('PELANGGAN TETAP', W / 2, H * .3); x.fillStyle = '#FFFFFF'; x.font = `800 ${H * .5}px Poppins`; x.fillText(String(n), W / 2, H * .82) }); P.set(n0); return P }

export const SHOTS = {
  MA_HOOK(s, root) {   // teras warung: Bima mengetuk palu di meja lipat seperti rapat direksi
    const { sc, K } = dunia(); warung(sc); const B = bima([-3.05, 0, 2.9]); sc.add(B); B.rotation.y = Math.PI / 2 - .2; const P = palu(sc, [-2.6, .8, 2.75]); const cam = camera(42);
    const h = BIG(root, 'ATURAN MAIN', { top: 330, fontSize: '118px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const k = Math.abs(Math.sin(t * 7)) * (t < 1.4 || t > dur - 1.4 ? 1 : 0); P.position.y = .8 + k * .16; P.rotation.z = k * .5; B.pose(t, { talk: true, hold: true });
      const p = ease(t, 0, dur); cam.position.set(lerp(.3, .9, p), lerp(1.7, 1.75, p), lerp(4.4, 5.4, p)); cam.lookAt(-2.6, 1.5, 2.8); pulse(h, seg(t, .1, .5)) } };
  },
  MA_PREMIS(s, root) {   // drone naik tinggi di atas kampung kota; pin cabang bermunculan
    const { sc, K } = dunia(); warung(sc); const B = bima([-3.05, 0, 2.9]); sc.add(B); B.rotation.y = Math.PI / 2; const cam = camera(42);
    let r = 7; const R = () => (r = (r * 16807) % 2147483647) / 2147483647;
    const pins = Array.from({ length: 60 }, (_, i) => { const g = group(sc, i ? [(R() - .5) * 200, 0, (R() - .5) * 180 - 10] : [-2.5, 0, 2.8]); g.add(mesh(G.cone(1.2, 4, 10), '#F28C28', [0, 6, 0], { rot: [Math.PI, 0, 0] })); g.add(mesh(G.sph(1.6, 14, 10), '#F28C28', [0, 8.6, 0], { mat: { emissive: '#F28C28', emissiveIntensity: .3, flatShading: false } })); g.add(mesh(G.sph(.6, 10, 8), '#FFFFFF', [0, 8.6, 1.2])); g.scale.setScalar(.001); return g });
    const l1 = KARTU(root, '1 MEJA LIPAT', '', { top: 330 }), l2 = KARTU(root, '→ 100+ CABANG', 'target jangka panjang', { top: 470 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); B.pose(t, { cheer: t > 1 }); const a = E.inout(seg(t, 0, dur * .75));
      cam.position.set(lerp(1, -10, a), lerp(2.2, 150, a), lerp(6.5, 120, a)); cam.lookAt(lerp(-2.5, 0, a), lerp(1.2, 0, a), lerp(2.8, -20, a));
      const tc = at(s, 'ratusan', 3); pins.forEach((g, i) => g.scale.setScalar(Math.max(.001, i === 0 ? E.back(seg(t, .8, 1.2)) * (.25 + 2.5 * a) : 2.6 * E.back(seg(t, tc + i * .04, tc + .35 + i * .04)))));
      show(l1, seg(t, .3, .7)); show(l2, seg(t, tc - .2, tc + .3)) } };
  },
  MA_FOLLOW(s, root) {   // papan PELANGGAN TETAP 0 -> 1, tetangga datang ke warung
    const { sc, K } = dunia(); warung(sc); const B = bima([-3.05, 0, 2.9]); sc.add(B); B.rotation.y = Math.PI / 2; const P = papanPelanggan(sc, 0);
    const W = person(sc, [-1.2, 0, -5], { body: '#E5484D', pants: '#3B3B3B', skin: '#C98E64', hair: '#2A1A10', hat: 'cap', hatC: '#2E6FB0' }); W.rotation.y = 0; const cam = camera(42);
    const l = KARTU(root, 'FOLLOW', '= +1 pelanggan tetap', { top: 330 }); let shown = 0;
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = E.out(seg(t, .2, 2.2)); W.position.z = lerp(-4, 2.3, w); W.rotation.y = lerp(0, -Math.PI / 2, seg(t, 2, 2.4)); W.pose(t, { walk: w < 1 ? 1 : 0, wave: t > 2.4 });
      const n = t > 2.5 ? 1 : 0; if (n !== shown) { P.set(n); shown = n } P.scale.setScalar(1 + .15 * Math.sin(Math.PI * seg(t, 2.5, 2.9))); B.pose(t, { talk: true, cheer: t > 2.6 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.3, 1.0, p), lerp(1.8, 2.0, p), lerp(7, 6.2, p)); cam.lookAt(-2.1, 1.6, 3.2); show(l, seg(t, .2, .6)) } };
  },
  MA_LIKE(s, root) {   // buku kas di meja: angka modal naik Rp5.000 tiap like, koin berjatuhan
    const { sc, K } = dunia(); warung(sc, false); const B = bima([-3.1, 0, 2.9]); sc.add(B); B.rotation.y = Math.PI / 2;
    const buku = canvasPlane(.9, .62, () => { }, 720); buku.rotation.x = -Math.PI / 2; buku.rotation.z = Math.PI / 2; buku.position.set(-2.45, .81, 2.85); sc.add(buku);
    const coins = Array.from({ length: 10 }, () => coin(sc, [0, -9, 0], .7)); const cam = camera(42); const l = KARTU(root, 'LIKE', '= +Rp5.000 modal warung', { top: 330 }); let last = -1;
    const draw = v => buku.userData.redraw((x, W, H) => { x.fillStyle = '#FBF8EE'; x.fillRect(0, 0, W, H); x.strokeStyle = '#9DB8D8'; x.lineWidth = 3; for (let y = H * .3; y < H; y += H * .14) { x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke() }
      x.strokeStyle = '#D9534F'; x.beginPath(); x.moveTo(W * .1, 0); x.lineTo(W * .1, H); x.stroke(); x.fillStyle = '#1E3A5F'; x.font = `800 ${H * .13}px Poppins`; x.fillText('BUKU KAS', W * .14, H * .2);
      x.fillStyle = '#5A6B7E'; x.font = `700 ${H * .1}px Poppins`; x.fillText(`like × ${rp(X.TL.vars.kurs_like)}`, W * .14, H * .5); x.fillStyle = '#2E9C6A'; x.font = `800 ${H * .2}px Poppins`; x.fillText('+' + rp(v), W * .14, H * .8) });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const v = Math.floor(seg(t, .8, dur - .8) * 10) * X.TL.vars.kurs_like; if (v !== last) { draw(v); last = v } B.pose(t, { talk: true, nod: true });
      coins.forEach((c, i) => { const q = seg(t, .8 + i * .4, 1.4 + i * .4); c.visible = q > 0 && q < 1; c.position.set(-2.2 + Math.sin(i * 3) * .1, 2.6 - E.in(q) * 1.75, 3.35 + Math.cos(i * 2) * .1); c.rotation.x = Math.PI / 2 + t * 6 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-.9, -1.2, p), lerp(2.9, 2.6, p), lerp(3.6, 3.4, p)); cam.lookAt(-2.5, .95, 2.85); show(l, seg(t, .2, .6)) } };
  },
  MA_KOMEN(s, root) {   // papan rapat di dinding: kertas tempel (komen) beterbangan menempel, Bima menunjuk
    const { sc, K } = dunia(); warung(sc, false); const B = bima([-2.95, 0, 2.0]); sc.add(B); B.rotation.y = 1.1; const P = papan(sc, [-3.36, 1.75, 3.6], 1.5, 1.05, papanTeks('RAPAT: SUARA KALIAN', '#FFFFFF', '#1E3A5F'), Math.PI / 2);
    const C = ['#FFE27A', '#B3E5FC', '#FFCCBC', '#C8E6C9']; const notes = Array.from({ length: 10 }, (_, i) => { const m = mesh(G.box(.02, .22, .22), C[i % 4], [0, -9, 0], { cast: false }); sc.add(m); m.userData.to = [-3.3, 1.45 + Math.floor(i / 5) * -.27 + .2, 3.0 + (i % 5) * .27]; return m });
    const cam = camera(48); const l = KARTU(root, 'KOMEN', '= suara rapat · terbanyak dijalanin', { top: 330 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); B.pose(t, { point: true, talk: true });
      notes.forEach((m, i) => { const q = seg(t, .5 + i * .35, 1.3 + i * .35), [x, y, z] = m.userData.to; m.visible = q > 0; m.position.set(lerp(1.5, x, E.out(q)), y + Math.sin(q * Math.PI) * .8, lerp(5 + i % 3, z, E.out(q))); m.rotation.set(0, 0, (1 - q) * 6 + (i % 3 - 1) * .1) });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.4, 1.2, p), lerp(1.8, 1.75, p), lerp(4.6, 4.2, p)); cam.lookAt(-3.1, 1.4, 2.9); show(l, seg(t, .2, .6)) } };
  },
  MA_KRISIS(s, root) {   // ujung gang mendung: toko Bang Rudi, spanduk BANTING HARGA, Rudi bersedekap
    const { sc, K } = dunia({ sky: MENDUNG, spanduk: 'BANTING HARGA!', spanduk2: 'toko rudi · semua lebih murah', banner: 'BANTING HARGA!' }); const R = rudi([0, 0, -21.6]); sc.add(R); const cam = camera(42);
    const l = KARTU(root, 'TIAP AKHIR PEKAN', 'ada krisis', { top: 330 }); const tg = tag(root, 'BANG RUDI');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); R.pose(t, {}); R.sedekap(); R.userData.st.head.rotation.z = Math.sin(t * 1.4) * .06;
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .3, p), lerp(1.1, 1.3, p), lerp(-4.5, -7, p)); cam.lookAt(0, 3.3, -23); show(l, seg(t, .2, .6)); const tr = at(s, 'Bang Rudi', dur - 2); tg(R, cam, [0, 2.3, 0], seg(t, tr - .1, tr + .3)) } };
  },
  MA_MULAI(s, root) {   // teras: Bima menunjuk ke kamera, palu diketuk, MULAI DARI EPISODE 0
    const { sc, K } = dunia(); warung(sc); const B = bima([-3.05, 0, 2.6]); sc.add(B); B.rotation.y = Math.PI / 2 - .35; const P = palu(sc, [-2.6, .8, 2.75]); const cam = camera(42);
    const h = BIG(root, 'MULAI DARI<br>EPISODE 0', { top: 330, fontSize: '104px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const td = at(s, 'ditutup', dur - 1.5); B.pose(t, { point: t < td - .4, talk: t < td + .5, hold: t > td - .4 }); const k = t > td - .2 && t < td + .5 ? Math.abs(Math.sin((t - td) * 14)) : 0; P.position.y = .8 + k * .16; P.rotation.z = k * .5;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.2, .6, p), lerp(1.8, 1.7, p), lerp(6, 4.8, p)); cam.lookAt(-2.7, 1.5, 2.8); pulse(h, seg(t, .2, .6)) } };
  },
};

// Shot Meja S1 Ep 2 "Kopi Susu" (lihat STORYBOARD.md). Hook = dua lapak berhadapan; lokasi baru: meja resep, pikap Tono masuk gang.
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SIANG, PAGI, bima, ijah, rudi, kucing, kampung, gang, mejaLipat, papan, kursi, duduk, canvasPlane, papanTeks, ojol, tukang, termos, gelas, renceng, tono, anakSekolah, kopiSusu, pikap,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE = (x, z) => Math.abs(x) < 9 && z > -34 && z < 22;
const SORE = o => SIANG(Object.assign({ sky: ['#4F8FD8', '#FFD9A8'], sun: '#FFD6A6', sunPos: [-14, 9, 14], hemi: 1.4, sunI: 2.5, fog: ['#F2DCC0', 90, 380] }, o));
function dunia(o = {}) { const sc = (o.sky || SIANG)(); const K = kampung(sc, { hole: HOLE }); const Gg = gang(sc, o); return { sc, K, Gg } }
function warung(sc) { const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; termos(sc, [-2.5, .79, 3.35], 1.1); const P = papan(sc, [-3.36, 1.75, 2.8], .9, .45, papanTeks('KOPI SUSU 5RB', '#F28C28', '#FFFFFF'), Math.PI / 2); return M }
function papanPelanggan(sc, n0) { const P = papan(sc, [-2.0, 2.3, 3.9], 1.1, .62, () => { }, Math.PI / 2 - .3);
  P.set = n => P.userData.c.userData.redraw((x, W, H) => { x.fillStyle = '#1E3A5F'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.textAlign = 'center'; x.font = `800 ${H * .2}px Poppins`; x.fillText('PELANGGAN TETAP', W / 2, H * .3); x.fillStyle = '#FFFFFF'; x.font = `800 ${H * .5}px Poppins`; x.fillText(String(n), W / 2, H * .82) }); P.set(n0); return P }
function palu(sc, p) { const g = group(sc, p); g.add(mesh(G.cyl(.02, .02, .3, 6), '#7A4A2A', [0, .05, .12], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.05, .05, .16, 10), '#5A3A1A', [0, .05, 0], { rot: [0, 0, Math.PI / 2] })); return g }
const spandukGratis = (x, W, H) => { x.fillStyle = '#C8302A'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.font = `800 ${H * .5}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('KOPI GRATIS!', W / 2, H * .44);
  x.fillStyle = '#FFFFFF'; x.font = `700 ${H * .22}px Poppins`; x.fillText('pakai es · toko rudi', W / 2, H * .84) };
const nota = (root, html, css = {}) => X.ab(Object.assign({ left: 130, top: 300, width: 820, opacity: 0, fontFamily: 'Poppins' }, css), root, `<div style="background:#FBF8EE;border-radius:14px;padding:20px 34px;box-shadow:0 14px 30px #00000050;border-left:10px solid #F28C28;color:#1E2A38">${html}</div>`);
const baris = (a, b, k = '') => `<div class="${k}" style="font-size:40px;font-weight:700;display:flex;justify-content:space-between;gap:20px"><span>${a}</span><b>${b}</b></div>`;
function antrean(sc, n, z0 = 2.4) {   // antrean campur ojol + anak sekolah di gang, menghadap meja Bima
  return Array.from({ length: n }, (_, i) => { const o = i % 3 === 1 ? anakSekolah([0, 0, 0], { tas: ['#2E6FB0', '#E5484D', '#2E9C6A'][i % 3] }) : ojol([0, 0, 0], { skin: ['#C98E64', '#B97A52', '#D9A07A'][i % 3], c: i % 2 ? '#1F8A84' : '#2E8B57' });
    sc.add(o); o.position.set(-1.0 + Math.sin(i * 2.1) * .12, 0, z0 - i * .82); o.rotation.y = 0; return o });
}

export const SHOTS = {
  M2_HOOK(s, root) {   // frame 1: antrean panjang di teras Bima, lapak kopi gratis Rudi di ujung gang tanpa pembeli
    const { sc, K, Gg } = dunia(); Gg.spanduk.userData.redraw(spandukGratis); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2;
    const Q = antrean(sc, 12); const mr = mejaLipat(sc, [0, 0, -20.4]); termos(sc, [.3, .79, -20.4], 1.2); const R = rudi([1.3, 0, -20.6]); sc.add(R); R.rotation.y = -.3;
    const cam = camera(42); const tq = tag(root, 'ANTRE: 12'), tr = tag(root, 'GRATIS: 0 antre'); const kok = BIG(root, 'KOK BISA?', { top: 1020, fontSize: '120px', color: '#FFC46B' });
    const vs = X.ab({ left: 0, top: 980, width: 1080, textAlign: 'center', opacity: 1, fontFamily: 'Poppins', fontWeight: 800, color: '#FFFFFF', textShadow: '0 6px 0 #1E3A5F, 0 16px 36px rgba(10,20,40,.55)' }, root,
      `<div style="font-size:76px;line-height:1.05">KOPI <span style="color:#FFC46B">GRATIS</span></div><div style="font-size:52px">kalah sama</div><div style="font-size:76px;line-height:1.05">KOPI <span style="color:#FFC46B">Rp5.000</span>?</div>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); Q.forEach((o, i) => o.pose(t + i * .7, { hold: i < 4, talk: i % 3 === 0, look: Math.sin(t + i) * .3 })); B.pose(t, { hold: true, talk: true }); R.pose(t, {}); R.sedekap(); R.userData.st.head.rotation.y = Math.sin(t * .9) * .4;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.3, .9, p), lerp(3.4, 2.6, p), lerp(8.6, 6.0, p)); cam.lookAt(lerp(-.7, -.4, p), lerp(1.2, 1.9, p), lerp(-6, -12, p));
      tq(Q[3], cam, [0, 2.1, 0], seg(t, .3, .6)); tr(R, cam, [0, 2.3, 0], seg(t, .6, .9)); const tk = at(s, 'Kok bisa', dur - 1); vs.style.opacity = 1 - seg(t, tk - .3, tk); pulse(kok, seg(t, tk, tk + .3)) } };
  },
  M2_RAPAT(s, root) {   // rapat: papan voting, kertas usul "TUTUP AJA" dicoret DITOLAK RAPAT, palu
    const { sc, K } = dunia({ sky: PAGI }); const M = mejaLipat(sc, [-2.5, 0, 2.6]); M.rotation.y = Math.PI / 2; kursi(sc, [-3.05, 0, 2.6], Math.PI / 2); kursi(sc, [-1.85, 0, 2.6], -Math.PI / 2, '#F28C28');
    const B = bima([-3.05, 0, 2.6]); sc.add(B); B.rotation.y = Math.PI / 2; const C = kucing(sc, [-1.75, .53, 2.6]); C.rotation.y = Math.PI; const P = palu(sc, [-2.55, .8, 2.3]);
    const wb = papan(sc, [-3.36, 1.95, 4.1], 1.4, 1.0, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#1E3A5F'; x.textAlign = 'center'; x.font = `800 ${H * .12}px Poppins`; x.fillText('HASIL VOTING EP 1', W / 2, H * .16);
      [['KOPI SUSU', 1, '#2E9C6A'], ['GORENGAN', 0, '#9AA0A8'], ['DATENGIN RUDI', 0, '#9AA0A8']].forEach(([a, n, c], i) => { const y = H * (.38 + i * .2); x.textAlign = 'left'; x.fillStyle = '#1E2A38'; x.font = `800 ${H * .085}px Poppins`; x.fillText(a, W * .05, y);
        x.fillStyle = c; x.fillRect(W * .6, y - H * .07, W * .26 * (n ? 1 : .03), H * .08); x.textAlign = 'right'; x.fillStyle = '#1E2A38'; x.fillText(String(n), W * .96, y) }) }, Math.PI / 2);
    const cam = camera(44); const sah = BIG(root, 'SAH!', { top: 360, fontSize: '140px', color: '#FFC46B' });
    const usul = X.ab({ left: 170, top: 1020, width: 740, textAlign: 'center', opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#FFE27A;padding:18px 34px;box-shadow:0 12px 26px #00000045;transform:rotate(3deg);color:#1E2A38;position:relative">
      <div style="font-size:26px;font-weight:700">usul penonton:</div><div style="font-size:64px;font-weight:800">"TUTUP AJA"</div>
      <div class="x" style="position:absolute;left:-10px;right:-10px;top:50%;height:10px;background:#D9534F;transform:rotate(-8deg) scaleX(0);transform-origin:left"></div></div>
      <div class="t" style="margin-top:14px;font-size:58px;font-weight:800;color:#D9534F;opacity:0;text-shadow:0 4px 0 #FFFFFF">DITOLAK RAPAT</div>`); const cx = usul.querySelector('.x'), ct = usul.querySelector('.t');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(B, -.36); const tm = at(s, 'menang', 2), tt = at(s, 'tutup aja', dur * .6), td = at(s, 'ditolak', dur - 1);
      B.pose(t, { talk: true, point: t > .5 && t < tm, shake: t > td - .2, hold: t > tm && t < tm + 1 }); duduk(B, -.36);
      const k = (t > tm - .1 && t < tm + .6) || t > td ? Math.abs(Math.sin((t - tm) * 14)) * (t < td || t < td + .6 ? 1 : 0) : 0; P.position.y = .8 + k * .18; P.rotation.z = k * .5;
      C.userData.hd.rotation.z = t > td ? Math.sin(t * 10) * .25 : Math.sin(t * 2) * .08; C.userData.tail.rotation.z = .6 + Math.sin(t * 5) * .3;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.5, 1.1, p), lerp(2.0, 1.85, p), lerp(7.4, 6.4, p)); cam.lookAt(-2.9, 1.4, 3.4);
      pulse(sah, seg(t, tm, tm + .3)); sah.style.opacity = seg(t, tm, tm + .05) * (1 - seg(t, tt - .5, tt - .2)); show(usul, seg(t, tt - .2, tt + .2)); cx.style.transform = `rotate(-8deg) scaleX(${E.out(seg(t, td - .1, td + .3))})`; ct.style.opacity = seg(t, td, td + .2) } };
  },
  M2_MODAL(s, root) {   // buku kas modal dari like, papan pelanggan 3 -> 17, koin berjatuhan
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const V = X.TL.vars; const P = papanPelanggan(sc, V.pel0); const B = bima([-2.95, 0, 2.0]); sc.add(B); B.rotation.y = 1.0;
    const coins = Array.from({ length: 12 }, () => coin(sc, [0, -5, 0], .5)); const cam = camera(44);
    const N = nota(root, baris(`${V.like} like × ${rp(V.kurs_like)}`, `+${rp(V.modal)}`, 'a') + baris(`${V.follow} follow`, `+${V.follow} pelanggan`, 'b') +
      `<div class="c" style="font-size:56px;font-weight:800;display:flex;justify-content:space-between;border-top:4px solid #1E3A5F;margin-top:10px;padding-top:6px;color:#2E9C6A"><span>KAS</span><b>${rp(V.kas1)}</b></div>`, { top: 1020 });
    const [ra, rb, rc] = ['.a', '.b', '.c'].map(k => N.querySelector(k)); let last = -1;
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tl = at(s, 'like', .6), tf = at(s, 'follow', dur * .5); B.pose(t, { point: t > tf, cheer: t > dur - 1, talk: true });
      const n = Math.round(V.pel0 + V.follow * E.out(seg(t, tf + .3, dur - .5))); if (n !== last) { last = n; P.set(n) }
      coins.forEach((c, i) => { const q = seg(t, tl + i * .1, tl + .8 + i * .1); c.visible = q > 0 && q < 1; c.position.set(-2.5 + Math.sin(i * 2.3) * .3, 3 - q * 2.1, 2.8 + Math.cos(i * 1.7) * .3); c.rotation.y = t * 7 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.1, p), lerp(1.9, 1.85, p), lerp(6.6, 5.6, p)); cam.lookAt(-2.4, 1.7, 3.2);
      show(N, seg(t, tl - .3, tl + .1)); ra.style.opacity = seg(t, tl - .2, tl + .2); rb.style.opacity = seg(t, tf - .2, tf + .2); rc.style.opacity = seg(t, tf + .5, tf + .9) } };
  },
  M2_RESEP(s, root) {   // meja resep: tiga gelas percobaan, Bima mencicip satu per satu
    const { sc, K } = dunia({ sky: PAGI }); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2;
    const cups = [0, 1, 2].map(i => kopiSusu(sc, [-2.3, .79, 2.4 + i * .4])); const bahan = group(sc, [-2.75, .79, 3.4]); [0, 1, 2].forEach(i => bahan.add(mesh(G.cyl(.06, .06, .12, 12), ['#F2F2EE', '#C9A36B', '#5A3220'][i], [i * .14, .06, 0])));
    const V = X.TL.vars; const cam = camera(40); const L = [['#1 kemanisan 🤢', '#D9534F'], ['#2 kepaitan 😖', '#D9534F'], ['#3 PAS! 😋', '#2E9C6A']].map(([a]) => tag(root, a));
    const nb = nota(root, baris('susu, gula aren, kopi, cup', `−${rp(V.belanja)}`), { top: 300 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const T = [at(s, 'satu', 2.4), at(s, 'Dua', 3.6), at(s, 'pas', dur - .8)];
      const k = T.filter(x => t > x - .4).length - 1; B.pose(t, { hold: k >= 0, shake: k === 0 || k === 1, cheer: k === 2 && t > T[2] + .2, talk: k < 0 });
      cups.forEach((c, i) => { const q = i === k ? Math.sin(Math.PI * seg(t, T[i] - .4, T[i] + .5)) : 0; c.position.set(lerp(-2.3, -2.85, q), .79 + q * .75, lerp(2.4 + i * .4, 2.8, q)) });
      const p = ease(t, 0, dur); cam.position.set(lerp(.9, .5, p), lerp(1.8, 1.7, p), lerp(5.4, 4.8, p)); cam.lookAt(-2.5, 1.2, 2.9);
      L.forEach((l, i) => l(cups[i], cam, [0, .35, 0], seg(t, T[i] - .1, T[i] + .2))); show(nb, seg(t, .1, .4) * (1 - seg(t, T[0] - .5, T[0] - .2))) } };
  },
  M2_LAKU(s, root) {   // warung ramai: antrean ojol & anak sekolah, penghitung gelas 0 -> 60
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const V = X.TL.vars; const Q = antrean(sc, 10, 2.6);
    const cups = Array.from({ length: 12 }, (_, i) => kopiSusu(sc, [-2.75 + (i % 4) * .15, .79, 2.25 + Math.floor(i / 4) * .16])); const cam = camera(44);
    const cnt = X.ab({ left: 140, top: 320, width: 800, textAlign: 'center', opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#1E3A5F;color:#FFFFFF;border-radius:16px;padding:14px 40px;box-shadow:0 14px 30px #00000055">
      <div style="font-size:30px;letter-spacing:4px;color:#FFE27A;font-weight:800">KOPI SUSU TERJUAL</div><div class="n" style="font-size:110px;font-weight:800;line-height:1">0</div></div>`); const num = cnt.querySelector('.n');
    const jam = KARTU(root, '⏰ belum jam 10', '', { top: 560 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const n = Math.round(V.gelas * seg(t, .6, dur - .8)); num.textContent = n; cups.forEach((c, i) => c.visible = i < 12 - Math.floor(n / 6) % 12);
      Q.forEach((o, i) => { const step = Math.floor(seg(t, .6, dur - .8) * 6); o.position.z = 2.6 - Math.max(0, i - step) * .82; o.pose(t + i, { hold: i <= step, talk: i % 2 === 0, walk: 0 }); o.visible = i >= step - 1 });
      B.pose(t, { hold: true, talk: true, cheer: t > dur - 1 });
      const a = ease(t, 0, dur); cam.position.set(lerp(1.3, 1.0, a), lerp(2.5, 2.2, a), lerp(9.4, 7.6, a)); cam.lookAt(-1.6, 1.1, 1.6);
      show(cnt, seg(t, .3, .7)); const tj = at(s, 'jam sepuluh', dur - 1); show(jam, seg(t, tj - .3, tj + .1)) } };
  },
  M2_IJAH(s, root) {   // Mak Ijah ambil dua kopi susu, utang naik 15.000 -> 25.000
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const V = X.TL.vars;
    const dua = [0, 1].map(i => kopiSusu(sc, [-2.25, .79, 2.4 + i * .2])); const I = ijah([-1.2, 0, 7]); sc.add(I); I.rotation.y = Math.PI; const cam = camera(42);
    const note = X.ab({ left: 150, top: 330, width: 780, opacity: 0, textAlign: 'center', fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#FBF8EE;border-radius:10px;padding:14px 30px;box-shadow:0 14px 30px #00000050;border-left:10px solid #D9534F;color:#1E2A38;transform:rotate(-2deg)">
      <div style="font-size:30px;color:#5A6B7E;font-weight:700">BUKU KAS · utang Mak Ijah</div><div style="font-size:44px;font-weight:700;color:#9AA0A8;text-decoration:line-through">${rp(V.utang0)}</div><div style="font-size:60px;font-weight:800;color:#D9534F">${rp(V.utang)}</div></div>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = E.out(seg(t, 0, 1.4)); I.position.z = lerp(7, 2.8, w); I.rotation.y = lerp(Math.PI, -Math.PI / 2, seg(t, 1.1, 1.6)); const tu = at(s, 'Utangnya', dur * .45);
      I.pose(t, { walk: w < 1 ? 1 : 0, talk: t > 1.6, hold: t > 2 }); dua.forEach((g, i) => { const q = seg(t, 1.7 + i * .25, 2.2 + i * .25); g.position.set(lerp(-2.25, -1.45, q), .79 + Math.sin(q * Math.PI) * .25 + q * .2, lerp(2.4 + i * .2, 2.7, q)); g.visible = q < 1 });
      B.pose(t, { talk: t < tu, shake: t > tu + .3, hold: t > tu });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.1, p), lerp(1.8, 1.7, p), lerp(6.4, 5.4, p)); cam.lookAt(-2.0, 1.35, 2.85); show(note, seg(t, tu - .2, tu + .2)) } };
  },
  M2_TONO(s, root) {   // pikap Tono masuk gang, Tono turun menawarkan stok bayar belakangan; whip ke Bang Rudi yang mengintip
    const { sc, K } = dunia({ sky: SORE }); warung(sc); const B = bima([-2.4, 0, 2.2]); sc.add(B); B.rotation.y = .4; const PK = pikap(sc, [.4, 0, 16]); PK.rotation.y = Math.PI;
    const T = tono([1.3, 0, 7]); sc.add(T); const R = rudi([1.55, 0, -7.2]); sc.add(R); R.rotation.y = Math.PI + .2; const V = X.TL.vars; const cam = camera(42);
    const tgT = tag(root, 'TONO · sales grosir'), tgR = tag(root, 'BANG RUDI... ngintip 👀');
    const k = KARTU(root, '📦 STOK SEBULAN', `${rp(V.stok)} · bayar belakangan`, { top: 330 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tt = at(s, 'Tono', .8), ts = at(s, 'Stok', dur * .5), tn = at(s, 'ngintip', dur - .8);
      PK.position.z = lerp(16, 6.2, E.out(seg(t, 0, tt + .8))); const w = E.out(seg(t, tt + .6, ts)); T.position.set(lerp(1.3, -.9, w), 0, lerp(5.6, 3.0, w)); T.rotation.y = w < 1 ? -2.4 : -1.6;
      T.pose(t, { walk: w > 0 && w < 1 ? 1 : 0, wave: t < tt + .6 && t > tt, talk: t > ts - .3, point: t > ts && t < ts + 1.2 }); B.pose(t, { look: .3, nod: t > ts + .4 && t < tn - .5 });
      R.position.x = 1.55 + Math.sin(Math.PI * seg(t, tn - .6, dur)) * -.35; R.pose(t, {}); R.sedekap();
      const wp = E.inout(seg(t, tn - .5, tn)); const p = ease(t, 0, tn - .5); cam.position.set(lerp(-1.2, -1.0, p), lerp(2.0, 1.9, p), lerp(-.4, .4, p)); cam.lookAt(lerp(lerp(.4, -.4, p), 1.5, wp), lerp(1.4, 1.6, wp), lerp(lerp(8, 4, p), -7.2, wp));
      tgT(T, cam, [0, 2.2, 0], seg(t, tt, tt + .3) * (1 - seg(t, ts - .4, ts - .1))); show(k, seg(t, ts - .2, ts + .3) * (1 - seg(t, tn - .6, tn - .3))); tgR(R, cam, [0, 2.3, 0], seg(t, tn - .1, tn + .2)) } };
  },
  M2_AJAK(s, root) {   // teras: papan pelanggan 17, notulen: rumus + 3 pilihan stok
    const { sc, K } = dunia({ sky: SORE }); warung(sc); const P = papanPelanggan(sc, X.TL.vars.pel); const B = bima([-2.95, 0, 2.1]); sc.add(B); B.rotation.y = 1.2; const cam = camera(42);
    const N = X.ab({ left: 120, top: 280, width: 840, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="background:#FBF8EE;border-radius:12px;padding:22px 30px 26px;box-shadow:0 18px 40px #00000055;border-left:12px solid #F28C28;color:#1E2A38">
      <div style="font-size:26px;letter-spacing:4px;color:#F28C28;font-weight:800">NOTULEN RAPAT · DEWAN DIREKSI = KALIAN</div>` +
      [['👥', 'FOLLOW', '+1 pelanggan tetap'], ['❤', 'LIKE', `+${rp(X.TL.vars.kurs_like)} modal`], ['💬', 'KOMEN', 'keputusan rapat']].map(([ic, a, b], i) => `<div class="r${i}" style="display:flex;align-items:center;gap:16px;border-bottom:3px solid #9DB8D8;padding:10px 0"><span style="font-size:44px">${ic}</span><b style="font-size:30px;color:#F28C28;width:150px">${a}</b><span style="font-size:38px;font-weight:800">${b}</span></div>`).join('') +
      `<div class="q" style="font-size:44px;font-weight:800;text-align:center;margin:20px 0 14px;line-height:1.1;color:#1E3A5F">Stok buat besok gimana?</div><div class="o" style="display:flex;gap:12px;justify-content:center">` +
      ['📦<br>AMBIL<br>STOK TONO', '💵<br>BELI SEDIKIT<br>TUNAI', '🤝<br>PATUNGAN<br>MAK IJAH'].map(x => `<div style="background:#1E3A5F;color:#FFFFFF;font-size:30px;font-weight:800;padding:12px 16px;border-radius:12px;text-align:center;line-height:1.15">${x}</div>`).join('') + `</div></div>`);
    const rows = [0, 1, 2].map(i => N.querySelector('.r' + i)), q = N.querySelector('.q'), o = N.querySelector('.o');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tq = at(s, 'Stok Tono', dur - 3.5); B.pose(t, { point: t < tq, talk: true, cheer: t > tq + 2 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.0, p), lerp(1.4, 1.3, p), lerp(6.8, 5.6, p)); cam.lookAt(-2.5, 1.9, 2.9);
      show(N, seg(t, .1, .5), 50); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = .25 + .75 * seg(t, tc - .1, tc + .2) });
      const tw = at(s, 'yang mana', dur - 4.5); q.style.opacity = seg(t, tw - .3, tw); o.style.opacity = seg(t, tq - .3, tq) } };
  },
};

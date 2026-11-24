// Shot Meja S1 Ep 3 "Utang Nol" (lihat STORYBOARD.md). Lokasi: gang dari atas (lapak Bima vs toko Rudi), teras rapat, warung jam 10, toko Rudi sore; akhir kembali ke frame awal (loop).
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SIANG, PAGI, bima, rudi, kucing, kampung, gang, mejaLipat, papan, kursi, duduk, papanTeks, ojol, termos, tono, anakSekolah, kopiSusu, pikap,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE = (x, z) => Math.abs(x) < 9 && z > -34 && z < 22;
const SORE = o => SIANG(Object.assign({ sky: ['#4F8FD8', '#FFD9A8'], sun: '#FFD6A6', sunPos: [-14, 9, 14], hemi: 1.4, sunI: 2.5, fog: ['#F2DCC0', 90, 380] }, o));
function dunia(o = {}) { const sc = (o.sky || SIANG)(); const K = kampung(sc, { hole: HOLE }); const Gg = gang(sc, o); return { sc, K, Gg } }
function warung(sc) { const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const T = termos(sc, [-2.5, .79, 3.35], 1.1); papan(sc, [-3.36, 1.75, 2.8], .9, .45, papanTeks('KOPI SUSU 5RB', '#F28C28', '#FFFFFF'), Math.PI / 2); return M }
function papanPelanggan(sc, n0) { const P = papan(sc, [-2.0, 2.3, 3.9], 1.1, .62, () => { }, Math.PI / 2 - .3);
  P.set = n => P.userData.c.userData.redraw((x, W, H) => { x.fillStyle = '#1E3A5F'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.textAlign = 'center'; x.font = `800 ${H * .2}px Poppins`; x.fillText('PELANGGAN TETAP', W / 2, H * .3); x.fillStyle = '#FFFFFF'; x.font = `800 ${H * .5}px Poppins`; x.fillText(String(n), W / 2, H * .82) }); P.set(n0); return P }
function palu(sc, p) { const g = group(sc, p); g.add(mesh(G.cyl(.02, .02, .3, 6), '#7A4A2A', [0, .05, .12], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.05, .05, .16, 10), '#5A3A1A', [0, .05, 0], { rot: [0, 0, Math.PI / 2] })); return g }
function tumpukDus(sc, p, n, c = ['#C9A36B', '#B8915A', '#D9B67E']) { const g = group(sc, p); for (let i = 0; i < n; i++) g.add(mesh(G.box(.5, .4, .45), c[i % 3], [(i % 4) * .52 - .78, .2 + Math.floor(i / 8) * .41, Math.floor(i / 4) % 2 * .47])); return g }
const center = (root, html, top, css = {}) => X.ab(Object.assign({ left: 0, top, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins', fontWeight: 800 }, css), root, html);
const chipEp = (root, top = 300) => center(root, `<span style="display:inline-block;background:#F28C28;color:#FFFFFF;font-size:44px;letter-spacing:6px;padding:8px 34px 10px;border-radius:14px;box-shadow:0 10px 24px #0006">EPISODE 3</span>`, top);
function penghitung(root, top, hari) {   // penghitung besar ala riset: HARI · KAS · UTANG
  const e = X.ab({ left: 110, top, width: 860, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="background:#1E3A5F;border-radius:22px;padding:18px 30px 22px;box-shadow:0 18px 40px #0007;color:#FFFFFF;border:4px solid #FFE27A">
    <div class="h" style="font-size:40px;letter-spacing:6px;color:#FFE27A;font-weight:800;text-align:center">${hari}</div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:6px"><span style="font-size:40px;font-weight:700">KAS</span><b class="k" style="font-size:78px">Rp0</b></div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;border-top:3px dashed #9DB8D8;margin-top:6px;padding-top:4px"><span style="font-size:40px;font-weight:700">UTANG</span><b class="u" style="font-size:78px;color:#7CE3A6">Rp0</b></div></div>`);
  return { e, h: e.querySelector('.h'), k: e.querySelector('.k'), u: e.querySelector('.u') };
}
function antrean(sc, n, z0 = 2.4) {
  return Array.from({ length: n }, (_, i) => { const o = i % 3 === 1 ? anakSekolah([0, 0, 0], { tas: ['#2E6FB0', '#E5484D', '#2E9C6A'][i % 3] }) : ojol([0, 0, 0], { skin: ['#C98E64', '#B97A52', '#D9A07A'][i % 3], c: i % 2 ? '#1F8A84' : '#2E8B57' });
    sc.add(o); o.position.set(-1.0 + Math.sin(i * 2.1) * .12, 0, z0 - i * .82); o.rotation.y = 0; return o });
}
function gangAtas(o = {}) {   // frame detik 0 = frame akhir: lapak Bima di depan, toko Rudi + pikap Tono penuh dus di ujung
  const { sc, K, Gg } = dunia(o); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; tumpukDus(sc, [-2.2, 0, 4.4], 2);
  const PK = pikap(sc, [2.2, 0, -19.5]); PK.rotation.y = Math.PI; const R = rudi([0, 0, -20.6]); sc.add(R); const T = tono([1.0, 0, -20.2]); sc.add(T); T.rotation.y = -.6;
  tumpukDus(sc, [-2.4, 0, -21.4], 24); return { sc, K, Gg, B, R, T };
}
const kamAtas = (cam, p) => { cam.position.set(lerp(1.3, .9, p), lerp(3.4, 2.8, p), lerp(8.6, 6.4, p)); cam.lookAt(lerp(-.7, -.4, p), lerp(1.4, 1.9, p), lerp(-6, -12, p)) };

export const SHOTS = {
  M3_HOOK(s, root) {   // detik 0: penghitung besar HARI 4 · KAS · UTANG Rp0 + EPISODE 3; Rudi di ujung gang: UTANG Rp3 JUTA
    const { sc, K, B, R, T } = gangAtas(); const V = X.TL.vars; const cam = camera(42); const ep = chipEp(root); const P = penghitung(root, 380, 'HARI 4');
    const tR = tag(root, `BANG RUDI · UTANG ${rp(V.stok)}`); const tB = tag(root, 'BIMA');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); B.pose(t, { hold: true, talk: true }); R.pose(t, {}); R.sedekap(); T.pose(t, { talk: true, point: true });
      kamAtas(cam, ease(t, 0, dur)); pulse(ep, seg(t, 0, .25)); show(P.e, seg(t, 0, .25), 20); P.k.textContent = rp(Math.round(V.kas0 * E.out(seg(t, 0, 1.0)) / 1000) * 1000);
      const tn = at(s, 'nol', 1.6), tr = at(s, 'Rudi', dur * .55); P.u.style.transform = `scale(${1 + .25 * Math.sin(Math.PI * seg(t, tn - .1, tn + .5))})`;
      tB(B, cam, [0, 2.2, 0], seg(t, .4, .7) * (1 - seg(t, tr - .4, tr - .1))); tR(R, cam, [0, 2.4, 0], seg(t, tr - .1, tr + .2)) } };
  },
  M3_RAPAT(s, root) {   // rapat sendirian + kucing: papan voting Ep 2, palu, SAH
    const { sc, K } = dunia({ sky: PAGI }); const M = mejaLipat(sc, [-2.5, 0, 2.6]); M.rotation.y = Math.PI / 2; kursi(sc, [-3.05, 0, 2.6], Math.PI / 2); kursi(sc, [-1.85, 0, 2.6], -Math.PI / 2, '#F28C28');
    const B = bima([-3.05, 0, 2.6]); sc.add(B); B.rotation.y = Math.PI / 2; const C = kucing(sc, [-1.75, .53, 2.6]); C.rotation.y = Math.PI; const P = palu(sc, [-2.55, .8, 2.3]);
    papan(sc, [-3.36, 1.95, 4.1], 1.4, 1.0, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#1E3A5F'; x.textAlign = 'center'; x.font = `800 ${H * .12}px Poppins`; x.fillText('HASIL VOTING EP 2', W / 2, H * .16);
      [['BELI TUNAI', 1, '#2E9C6A'], ['STOK TONO', 0, '#9AA0A8'], ['PATUNGAN', 0, '#9AA0A8']].forEach(([a, n, c], i) => { const y = H * (.38 + i * .2); x.textAlign = 'left'; x.fillStyle = '#1E2A38'; x.font = `800 ${H * .085}px Poppins`; x.fillText(a, W * .05, y);
        x.fillStyle = c; x.fillRect(W * .6, y - H * .07, W * .26 * (n ? 1 : .03), H * .08); x.textAlign = 'right'; x.fillStyle = '#1E2A38'; x.fillText(String(n), W * .96, y) }) }, Math.PI / 2);
    const cam = camera(44); const sah = BIG(root, 'SAH!', { top: 360, fontSize: '150px', color: '#FFC46B' });
    const kom = X.ab({ left: 110, top: 1010, width: 860, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:flex;gap:18px;align-items:center;background:#FFFFFF;border-radius:30px;padding:16px 26px;box-shadow:0 16px 34px #00000055">
      <div style="width:66px;height:66px;border-radius:50%;background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF);flex:none"></div><div><div style="font-size:24px;color:#8A8A8A;font-weight:700">komen penonton</div>
      <div style="font-size:42px;color:#1E1E1E;font-weight:800;line-height:1.1">"beli sedikit tunai, biar gaada utang"</div></div></div>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(B, -.36); const tv = at(s, 'tunai', 2.2), tsah = at(s, 'Sah', dur - .8);
      B.pose(t, { talk: true, point: t > .5 && t < tv + .5, hold: t > tsah - .4 }); duduk(B, -.36);
      const k = t > tsah - .15 && t < tsah + .5 ? Math.abs(Math.sin((t - tsah) * 14)) : 0; P.position.y = .8 + k * .18; P.rotation.z = k * .5;
      C.userData.hd.rotation.z = Math.sin(t * 2) * .08 + (t > tsah ? .3 : 0); C.userData.tail.rotation.z = .6 + Math.sin(t * 5) * .3;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.5, 1.1, p), lerp(2.0, 1.85, p), lerp(7.4, 6.4, p)); cam.lookAt(-2.9, 1.4, 3.4);
      show(kom, seg(t, tv - .3, tv + .1) * (1 - seg(t, tsah - .5, tsah - .2))); pulse(sah, seg(t, tsah - .05, tsah + .3)) } };
  },
  M3_MODAL(s, root) {   // nota modal: like gabungan per platform, follow -> papan pelanggan 17 -> 21, koin berjatuhan
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const V = X.TL.vars; const P = papanPelanggan(sc, V.pel0); const B = bima([-2.95, 0, 2.0]); sc.add(B); B.rotation.y = 1.0;
    const coins = Array.from({ length: 12 }, () => coin(sc, [0, -5, 0], .5)); const cam = camera(44);
    const L = (a, b, k = '') => `<div class="${k}" style="font-size:40px;font-weight:700;display:flex;justify-content:space-between;gap:20px;opacity:0"><span>${a}</span><b>${b}</b></div>`;
    const N = X.ab({ left: 110, top: 1000, width: 860, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="background:#FBF8EE;border-radius:14px;padding:18px 30px;box-shadow:0 14px 30px #00000050;border-left:10px solid #F28C28;color:#1E2A38">
      <div style="font-size:26px;letter-spacing:3px;color:#F28C28;font-weight:800">LIKE GABUNGAN TIKTOK + IG + YOUTUBE</div>` + L(`${V.lk.tiktok} + ${V.lk.ig} + ${V.lk.youtube} = ${V.like} like`, `+${rp(V.modal)}`, 'a') + L(`${V.follow} follow`, `+${V.follow} pelanggan`, 'b') +
      `<div class="c" style="opacity:0;font-size:54px;font-weight:800;display:flex;justify-content:space-between;border-top:4px solid #1E3A5F;margin-top:8px;padding-top:6px;color:#2E9C6A"><span>KAS</span><b>${rp(V.kas1)}</b></div></div>`);
    const [ra, rb, rc] = ['.a', '.b', '.c'].map(k => N.querySelector(k)); let last = -1;
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tl = at(s, 'like', .6), tf = at(s, 'follow', dur * .5); B.pose(t, { point: t > tf, cheer: t > dur - 1, talk: true });
      const n = Math.round(V.pel0 + V.follow * E.out(seg(t, tf + .3, dur - .5))); if (n !== last) { last = n; P.set(n) }
      coins.forEach((c, i) => { const q = seg(t, tl + i * .1, tl + .8 + i * .1); c.visible = q > 0 && q < 1; c.position.set(-2.5 + Math.sin(i * 2.3) * .3, 3 - q * 2.1, 2.8 + Math.cos(i * 1.7) * .3); c.rotation.y = t * 7 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.1, p), lerp(1.9, 1.85, p), lerp(6.6, 5.6, p)); cam.lookAt(-2.4, 1.7, 3.2);
      show(N, seg(t, tl - .3, tl + .1)); ra.style.opacity = seg(t, tl - .2, tl + .2); rb.style.opacity = seg(t, tf - .2, tf + .2); rc.style.opacity = seg(t, tf + .5, tf + .9) } };
  },
  M3_SPLIT(s, root) {   // layar dibelah: kiri Bima bayar tunai sedikit, kanan Rudi borong stok Tono pakai utang (dua kamera, scissor)
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const B = bima([-2.2, 0, 3.0]); sc.add(B); B.rotation.y = -.4; tumpukDus(sc, [-2.0, 0, 4.4], 2);
    const PK = pikap(sc, [2.4, 0, -19.4]); PK.rotation.y = Math.PI; const R = rudi([.2, 0, -20.4]); sc.add(R); R.rotation.y = .3; const T2 = tono([1.2, 0, -19.6]); sc.add(T2); T2.rotation.y = -.9; const D = tumpukDus(sc, [-2.4, 0, -21.4], 0);
    const V = X.TL.vars; const cam = camera(40); const cam2 = camera(40);
    const half = (left, html, c) => X.ab({ left, top: 300, width: 540, textAlign: 'center', opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:${c};border-radius:20px;padding:12px 20px 16px;color:#FFF;box-shadow:0 12px 26px #0007;min-width:420px">${html}</div>`);
    const kb = half(0, `<div style="font-size:34px;letter-spacing:4px;font-weight:800">BIMA</div><div style="font-size:60px;font-weight:800">${rp(V.belanja)}</div><div style="font-size:40px;font-weight:800;color:#7CE3A6">LUNAS ✔ utang Rp0</div>`, '#1E3A5F');
    const kr = half(540, `<div style="font-size:34px;letter-spacing:4px;font-weight:800">BANG RUDI</div><div style="font-size:60px;font-weight:800">${rp(V.stok)}</div><div style="font-size:40px;font-weight:800;color:#FFD0C8">BAYAR NANTI ✖</div>`, '#C8302A');
    const garis = X.ab({ left: 536, top: 0, width: 8, height: 1920, background: '#FFE27A', opacity: 0, boxShadow: '0 0 20px #0006' }, root, '');
    let dusN = -1, w = 1;
    return { scene: sc, cam, render(Rn) { const W = Math.round(1080 * w); Rn.setScissorTest(true);
      Rn.setViewport(0, 0, W, 1920); Rn.setScissor(0, 0, W, 1920); cam.aspect = W / 1920; cam.updateProjectionMatrix(); Rn.render(sc, cam);
      if (W < 1080) { Rn.setViewport(W, 0, 1080 - W, 1920); Rn.setScissor(W, 0, 1080 - W, 1920); cam2.aspect = (1080 - W) / 1920; cam2.updateProjectionMatrix(); Rn.render(sc, cam2) }
      Rn.setScissorTest(false); cam.aspect = 1080 / 1920; cam.updateProjectionMatrix() }, upd(t, dur) { K.tick(t); const tn = at(s, 'nanti', dur - .8), tr = at(s, 'Rudi', dur * .45); const sp = seg(t, tr - .4, tr);
      B.pose(t, { hold: t < tr, talk: true, nod: t > 1 && t < tr }); R.pose(t, { cheer: t > tn - .3, talk: t > tr }); T2.pose(t, { point: true, talk: true });
      const n = Math.round(24 * E.out(seg(t, tr, tn))); if (n !== dusN) { dusN = n; D.clear(); for (let i = 0; i < n; i++) D.add(mesh(G.box(.5, .4, .45), ['#C9A36B', '#B8915A', '#D9B67E'][i % 3], [(i % 4) * .52 - .78, .2 + Math.floor(i / 8) * .41, Math.floor(i / 4) % 2 * .47])) }
      cam.position.set(-.8, 2.0, 7.4); cam.lookAt(-2.0, 1.2, 3.0); cam2.position.set(1.4, 2.6, -13.6); cam2.lookAt(.2, 1.2, -20.4);
      w = lerp(1, .5, E.inout(sp)); show(kb, seg(t, .2, .6)); show(kr, seg(t, tr, tr + .3)); garis.style.opacity = sp; garis.style.left = (1080 * w - 4) + 'px' } };
  },
  M3_HABIS(s, root) {   // GAGAL LUCU: jam 10 stok habis, termos kosong; pelanggan ojol dapat "kopi ampas"
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const O = ojol([-1.4, 0, -3], { c: '#1F8A84' }); sc.add(O);
    const cup = kopiSusu(sc, [-2.3, .79, 2.8]); const cam = camera(42);
    const jam = KARTU(root, '⏰ 10.00 · STOK HABIS', '', { top: 320 }); const amp = tag(root, '☕ KOPI AMPAS');
    const ojk = X.ab({ left: 0, top: 1030, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins', fontWeight: 800, fontSize: '64px', color: '#FFFFFF', textShadow: '0 6px 0 #1E3A5F' }, root, '"...ampas, Bang?" 😐');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const th = at(s, 'habis', .8), ta = at(s, 'ampas', dur - 1.2); const w = E.out(seg(t, th, ta - .6));
      O.position.z = lerp(-3, 2.0, w); O.rotation.y = lerp(0, -Math.PI / 2, seg(t, ta - .8, ta - .4)); O.pose(t, { walk: w > 0 && w < 1 ? 1 : 0, shake: t > ta + .3 });
      B.pose(t, { shake: t > th && t < ta - .6, hold: t > ta - .5, talk: t > ta - .6 }); const q = seg(t, ta - .4, ta); cup.position.set(lerp(-2.3, -1.75, q), .79 + q * .2, lerp(2.8, 2.2, q));
      const p = ease(t, 0, dur); cam.position.set(lerp(1.0, .8, p), lerp(1.9, 1.8, p), lerp(6.4, 5.8, p)); cam.lookAt(-2.0, 1.2, 3.0);
      pulse(jam, seg(t, th - .1, th + .3)); amp(cup, cam, [0, .3, 0], seg(t, ta - .1, ta + .2)); show(ojk, seg(t, ta + .5, ta + .8)) } };
  },
  M3_LAKU(s, root) {   // SUKSES: penghitung gelas 0 -> 70, kas naik, papan pelanggan tetap 21, antrean tetap datang
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const V = X.TL.vars; const P = papanPelanggan(sc, V.pel); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const Q = antrean(sc, 9, 2.6);
    const cups = Array.from({ length: 12 }, (_, i) => kopiSusu(sc, [-2.75 + (i % 4) * .15, .79, 2.25 + Math.floor(i / 4) * .16])); const cam = camera(44);
    const cnt = X.ab({ left: 140, top: 320, width: 800, textAlign: 'center', opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#1E3A5F;color:#FFFFFF;border-radius:16px;padding:14px 40px;box-shadow:0 14px 30px #00000055">
      <div style="font-size:30px;letter-spacing:4px;color:#FFE27A;font-weight:800">KOPI SUSU TERJUAL</div><div class="n" style="font-size:110px;font-weight:800;line-height:1">0</div><div class="k" style="font-size:44px;font-weight:800;color:#7CE3A6;opacity:0">KAS ${rp(V.kas)}</div></div>`);
    const num = cnt.querySelector('.n'), kk = cnt.querySelector('.k'); const tt = center(root, `<span style="display:inline-block;background:#FFE27A;color:#1E3A5F;font-size:56px;padding:8px 30px;border-radius:16px;box-shadow:0 12px 26px #0006">👥 ${V.pel} PELANGGAN TETAP DATANG</span>`, 1040);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tk = at(s, 'Kas', dur * .45), td = at(s, 'dateng', dur - .6); const n = Math.round(V.gelas * E.out(seg(t, .2, tk))); num.textContent = n; cups.forEach((c, i) => c.visible = i < 12 - Math.floor(n / 6) % 12);
      Q.forEach((o, i) => { const step = Math.floor(seg(t, .2, dur - .4) * 5); o.position.z = 2.6 - Math.max(0, i - step) * .82; o.pose(t + i, { hold: i <= step, talk: i % 2 === 0, cheer: t > td && i % 2 === 1 }); o.visible = i >= step - 1 });
      B.pose(t, { hold: true, talk: true, cheer: t > td }); const a = ease(t, 0, dur); cam.position.set(lerp(1.3, 1.0, a), lerp(2.5, 2.2, a), lerp(9.4, 7.6, a)); cam.lookAt(-1.6, 1.3, 1.6);
      show(cnt, seg(t, .05, .35)); kk.style.opacity = seg(t, tk - .1, tk + .2); pulse(tt, seg(t, td - .1, td + .3)) } };
  },
  M3_SPANDUK(s, root) {   // sore: toko Rudi, spanduk lama berganti KOPI Rp2.000!, Rudi bersedekap senyum
    const { sc, K, Gg } = dunia({ sky: SORE }); const R = rudi([0, 0, -20.8]); sc.add(R); const B = bima([-2.4, 0, 2.2]); sc.add(B); B.rotation.y = Math.PI; const V = X.TL.vars; const cam = camera(42);
    let ganti = false; const kaget = BIG(root, 'KOPI Rp2.000?!', { top: 1020, fontSize: '110px', color: '#FFC46B' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tk = at(s, 'kopi', dur - 1.2);
      if (!ganti && t > tk - .1) { ganti = true; Gg.spanduk.userData.redraw((x, W, H) => { x.fillStyle = '#FFE27A'; x.fillRect(0, 0, W, H); x.fillStyle = '#C8302A'; x.font = `800 ${H * .56}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`KOPI ${rp(V.harga_rudi)}!`, W / 2, H * .44);
        x.fillStyle = '#1E2A38'; x.font = `700 ${H * .2}px Poppins`; x.fillText('toko rudi · mulai besok', W / 2, H * .84) }) }
      if (ganti === true && t < tk - .1) { ganti = false; Gg.spanduk.userData.redraw((x, W, H) => { x.fillStyle = '#C8302A'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.font = `800 ${H * .44}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TOKO RUDI', W / 2, H * .45) }) }
      R.pose(t, { talk: t < tk, cheer: t > tk && t < tk + .8 }); if (t > tk + .8 || t < tk) R.sedekap(); B.pose(t, { shake: t > tk + .3 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.0, -.4, p), lerp(2.2, 3.0, p), lerp(2, -6, p)); cam.lookAt(0, lerp(2.4, 4.0, p), -22); pulse(kaget, seg(t, tk + .2, tk + .5)) } };
  },
  M3_AJAK(s, root) {   // A/B besar; kembali ke frame detik 0 (gang dari atas + penghitung UTANG Rp0) = loop
    const { sc, K, B, R, T } = gangAtas({ spanduk: `KOPI Rp2.000!`, spanduk2: 'toko rudi · mulai besok' }); const V = X.TL.vars; const cam = camera(42);
    const card = (k, ic, tx, sub, c, top) => center(root, `<span style="display:inline-flex;align-items:center;gap:22px;background:${c};color:#FFF;font-size:58px;padding:14px 40px 16px;border-radius:24px;border:5px solid #FFFFFFAA;box-shadow:0 14px 30px #0007;min-width:760px;justify-content:center;line-height:1.05">
      <span style="background:#FFF;color:${c};border-radius:14px;padding:0 22px;font-size:74px">${k}</span><span style="text-align:left">${ic} ${tx}<br><small style="font-size:34px;opacity:.9">${sub}</small></span></span>`, top);
    const q = center(root, `<span style="font-size:42px;color:#FFFFFF;text-shadow:0 4px 14px #000">RUDI JUAL KOPI ${rp(V.harga_rudi)}. GUE GIMANA?</span>`, 250);
    const A = card('A', '📉', 'IKUT TURUN HARGA', 'perang harga sama Rudi', '#C8302A', 320), Bc = card('B', '✨', 'MENU BARU', 'yang Rudi nggak punya', '#2E9C6A', 520);
    const f = center(root, `<span style="display:inline-block;background:#1E3A5F;color:#FFE27A;font-size:38px;padding:10px 28px;border-radius:14px">👥 FOLLOW = +1 pelanggan · ❤ LIKE = +Rp5.000 modal</span>`, 730);
    const P = penghitung(root, 380, 'HARI 5'); P.k.textContent = rp(V.kas); P.u.textContent = 'Rp0?';
    return { scene: sc, cam, upd(t, dur) { K.tick(t); B.pose(t, { talk: true, point: t > at(s, '^A', 1) && t < at(s, '^B', 2.5) + 1 }); R.pose(t, {}); R.sedekap(); T.pose(t, { talk: true });
      const ta = at(s, '^A', 1.2), tb = at(s, '^B', 2.6), tf = at(s, 'Follow', dur - 3.4), tz = at(s, 'Besok', dur - 1.6); const off = 1 - seg(t, tz - .4, tz);
      kamAtas(cam, 1 - E.inout(seg(t, 0, dur))); show(q, seg(t, 0, .3) * off); pulse(A, seg(t, ta - .3, ta)); pulse(Bc, seg(t, tb - .3, tb)); A.style.opacity *= off; Bc.style.opacity *= off; show(f, seg(t, tf - .2, tf + .2) * off);
      show(P.e, seg(t, tz - .2, tz + .2), 20); const tn = at(s, 'nol', dur - .5); P.u.style.transform = `scale(${1 + .25 * Math.sin(Math.PI * seg(t, tn - .1, tn + .5))})` } };
  },
};

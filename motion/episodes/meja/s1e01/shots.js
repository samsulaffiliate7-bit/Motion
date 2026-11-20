// Shot Meja S1 Ep 1 "Kopi Sachet" (lihat STORYBOARD.md). Hook = flash-forward konflik; lokasi baru: lapak grosir, warung ramai ojol & tukang.
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SIANG, PAGI, bima, ijah, rudi, kucing, kampung, gang, mejaLipat, papan, kursi, duduk, canvasPlane, papanTeks, ojol, tukang, termos, gelas, renceng, lapakGrosir,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE = (x, z) => Math.abs(x) < 9 && z > -34 && z < 22;
const SORE = o => SIANG(Object.assign({ sky: ['#4F8FD8', '#FFD9A8'], sun: '#FFD6A6', sunPos: [-14, 9, 14], hemi: 1.4, sunI: 2.5, fog: ['#F2DCC0', 90, 380] }, o));
function dunia(o = {}) { const sc = (o.sky || SIANG)(); const K = kampung(sc, { hole: HOLE }); const Gg = gang(sc, o); return { sc, K, Gg } }
function warung(sc) { const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const T = termos(sc, [-2.5, .79, 3.35], 1.1); for (let i = 0; i < 3; i++) renceng(sc, [-2.0, 2.45, 2.2 + i * .25]); return { M, T } }
function papanPelanggan(sc, n0) { const P = papan(sc, [-2.0, 2.3, 3.9], 1.1, .62, () => { }, Math.PI / 2 - .3);
  P.set = n => P.userData.c.userData.redraw((x, W, H) => { x.fillStyle = '#1E3A5F'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.textAlign = 'center'; x.font = `800 ${H * .2}px Poppins`; x.fillText('PELANGGAN TETAP', W / 2, H * .3); x.fillStyle = '#FFFFFF'; x.font = `800 ${H * .5}px Poppins`; x.fillText(String(n), W / 2, H * .82) }); P.set(n0); return P }
function palu(sc, p) { const g = group(sc, p); g.add(mesh(G.cyl(.02, .02, .3, 6), '#7A4A2A', [0, .05, .12], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.05, .05, .16, 10), '#5A3A1A', [0, .05, 0], { rot: [0, 0, Math.PI / 2] })); return g }
function motor(sc, p, c = '#E5484D', ry = 0) { const m = group(sc, p); m.rotation.y = ry; m.add(mesh(G.box(.3, .5, 1.4), c, [0, .55, 0])); m.add(mesh(G.box(.28, .12, .6), '#2A2A2A', [0, .86, -.15])); [-.55, .55].forEach(dz => m.add(mesh(G.cyl(.27, .27, .12, 12), '#1E1E1E', [0, .27, dz], { rot: [0, 0, Math.PI / 2] }))); m.add(mesh(G.box(.6, .04, .04), '#3A3A3A', [0, 1.05, .6])); return m }
const spandukGratis = (x, W, H) => { x.fillStyle = '#C8302A'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.font = `800 ${H * .5}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('KOPI GRATIS!', W / 2, H * .44);
  x.fillStyle = '#FFFFFF'; x.font = `700 ${H * .22}px Poppins`; x.fillText('pakai es · toko rudi', W / 2, H * .84) };
const nota = (root, html, css = {}) => X.ab(Object.assign({ left: 130, top: 300, width: 820, opacity: 0, fontFamily: 'Poppins' }, css), root, `<div style="background:#FBF8EE;border-radius:14px;padding:20px 34px;box-shadow:0 14px 30px #00000050;border-left:10px solid #F28C28;color:#1E2A38">${html}</div>`);
const baris = (a, b, k = '') => `<div class="${k}" style="font-size:40px;font-weight:700;display:flex;justify-content:space-between;gap:20px"><span>${a}</span><b>${b}</b></div>`;

export const SHOTS = {
  M1_HOOK(s, root) {   // flash-forward: spanduk KOPI GRATIS sudah terpasang, Bima berbalik melongo; lalu efek mundur ke pagi
    const { sc, K, Gg } = dunia({ sky: SORE }); Gg.spanduk.userData.redraw(spandukGratis); const R = rudi([1.4, 0, -21.4]); sc.add(R); R.rotation.y = -.2;
    const B = bima([-.8, 0, -14.2]); sc.add(B); B.rotation.y = Math.PI; const cam = camera(42);
    const h = BIG(root, 'HARI KE-2', { top: 330, fontSize: '96px' }), kotor = BIG(root, 'MAIN KOTOR?!', { top: 470, fontSize: '112px', color: '#FFC46B' });
    const rw = X.ab({ left: 0, top: 0, width: 1080, height: 1920, opacity: 0, background: 'repeating-linear-gradient(0deg,#ffffff10 0 6px,#00000018 6px 12px)', fontFamily: 'Poppins', fontWeight: 800, color: '#FFFFFF', fontSize: '96px', textAlign: 'center', paddingTop: '820px', boxSizing: 'border-box', textShadow: '0 6px 0 #1E3A5F' }, root, '⏪ TADI PAGI');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); R.pose(t, {}); R.sedekap(); const tk = at(s, 'main kotor', 1.6), tm = at(s, 'mundur', dur - 2.2);
      const turn = E.inout(seg(t, tk - .3, tk + .3)); B.rotation.y = lerp(Math.PI, .25, turn); B.pose(t, { shake: t > tk + .2 && t < tm, point: t < tk - .3 });
      const p = E.out(seg(t, 0, tk)), b = ease(t, tk, tm); cam.position.set(lerp(1.3, .7, p) + lerp(0, -.2, b), lerp(1.5, 1.8, p), lerp(-7.5, -10.4, p) + lerp(0, .4, b)); cam.lookAt(lerp(0, -.6, b), lerp(4.6, 1.8, b), lerp(-23, -14.2, b));
      pulse(h, seg(t, .05, .35)); h.style.opacity = 1 - seg(t, tk - .3, tk); pulse(kotor, seg(t, tk, tk + .3)); kotor.style.opacity = seg(t, tk, tk + .05) * (1 - seg(t, tm - .3, tm)); rw.style.opacity = seg(t, tm - .1, tm + .2) } };
  },
  M1_RAPAT(s, root) {   // rapat pagi: papan hasil voting di dinding, kucing peserta, palu diketuk SAH
    const { sc, K } = dunia({ sky: PAGI }); const M = mejaLipat(sc, [-2.5, 0, 2.6]); M.rotation.y = Math.PI / 2; kursi(sc, [-3.05, 0, 2.6], Math.PI / 2); kursi(sc, [-1.85, 0, 2.6], -Math.PI / 2, '#F28C28');
    const B = bima([-3.05, 0, 2.6]); sc.add(B); B.rotation.y = Math.PI / 2; const C = kucing(sc, [-1.75, .53, 2.6]); C.rotation.y = Math.PI; const P = palu(sc, [-2.55, .8, 2.3]);
    const wb = papan(sc, [-3.36, 1.95, 4.1], 1.4, 1.0, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#1E3A5F'; x.textAlign = 'center'; x.font = `800 ${H * .12}px Poppins`; x.fillText('HASIL VOTING EP 0', W / 2, H * .16);
      [['KOPI SACHET', 1, '#2E9C6A'], ['TELUR', 0, '#9AA0A8'], ['ES BATU', 0, '#9AA0A8']].forEach(([a, n, c], i) => { const y = H * (.38 + i * .2); x.textAlign = 'left'; x.fillStyle = '#1E2A38'; x.font = `800 ${H * .09}px Poppins`; x.fillText(a, W * .06, y);
        x.fillStyle = c; x.fillRect(W * .55, y - H * .07, W * .3 * (n ? 1 : .03), H * .08); x.textAlign = 'right'; x.fillStyle = '#1E2A38'; x.fillText(String(n), W * .96, y) }) }, Math.PI / 2);
    const cam = camera(44); const sah = BIG(root, 'SAH!', { top: 360, fontSize: '150px', color: '#FFC46B' }); const tg = tag(root, '1 komen = 1 suara');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(B, -.36); const ts = at(s, 'Sah', dur - 1); B.pose(t, { talk: t < ts, point: t > at(s, 'kopi', 2) && t < ts - .5, hold: t > ts - .3 }); duduk(B, -.36);
      const k = t > ts - .2 && t < ts + .6 ? Math.abs(Math.sin((t - ts) * 14)) : 0; P.position.y = .8 + k * .18; P.rotation.z = k * .5; C.userData.hd.rotation.z = t > ts ? Math.sin(t * 10) * .25 : Math.sin(t * 2) * .08; C.userData.tail.rotation.z = .6 + Math.sin(t * 5) * .3;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.5, 1.1, p), lerp(2.0, 1.85, p), lerp(7.4, 6.4, p)); cam.lookAt(-2.9, 1.4, 3.4);
      const tk = at(s, 'kopi', 2); tg(wb, cam, [0, .7, 0], seg(t, tk - .1, tk + .2) * (1 - seg(t, ts - .4, ts))); pulse(sah, seg(t, ts, ts + .3)) } };
  },
  M1_MODAL(s, root) {   // dinding teras: buku kas modal dari like, papan PELANGGAN TETAP 0 -> 3, koin berjatuhan ke kas
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const P = papanPelanggan(sc, 0); const B = bima([-2.95, 0, 2.0]); sc.add(B); B.rotation.y = 1.0; const V = X.TL.vars;
    const coins = Array.from({ length: 10 }, (_, i) => coin(sc, [0, -5, 0], .5)); const cam = camera(44);
    const N = nota(root, baris(`${V.like} like × ${rp(V.kurs_like)}`, `+${rp(V.modal)}`, 'a') + baris(`${V.follow} follow`, `+${V.follow} pelanggan`, 'b') +
      `<div class="c" style="font-size:56px;font-weight:800;display:flex;justify-content:space-between;border-top:4px solid #1E3A5F;margin-top:10px;padding-top:6px;color:#2E9C6A"><span>KAS</span><b>${rp(V.kas1)}</b></div>`, { top: 1020 });
    const [ra, rb, rc] = ['.a', '.b', '.c'].map(k => N.querySelector(k)); let last = -1;
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tl = at(s, 'like', .6), tf = at(s, 'follow', 2.6), tk = at(s, 'Kas', dur - 2); B.pose(t, { point: t > tf && t < tk, cheer: t > tk + .4, talk: true });
      const n = Math.round(V.follow * E.out(seg(t, tf + .3, tf + 1.3))); if (n !== last) { last = n; P.set(n) }
      coins.forEach((c, i) => { const q = seg(t, tl + i * .1, tl + .8 + i * .1); c.visible = q > 0 && q < 1; c.position.set(-2.5 + Math.sin(i * 2.3) * .3, 3 - q * 2.1, 2.8 + Math.cos(i * 1.7) * .3); c.rotation.y = t * 7 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.1, p), lerp(1.9, 1.85, p), lerp(6.6, 5.6, p)); cam.lookAt(-2.4, 1.7, 3.2);
      show(N, seg(t, tl - .3, tl + .1)); ra.style.opacity = seg(t, tl - .2, tl + .2); rb.style.opacity = seg(t, tf - .2, tf + .2); rc.style.opacity = seg(t, tk - .2, tk + .2) } };
  },
  M1_BELANJA(s, root) {   // lapak grosir pinggir jalan: renceng kopi bergantungan, Bima menenteng termos bekas yang tutupnya seret
    const sc = PAGI(); const K = kampung(sc, { hole: (x, z) => Math.abs(x) < 12 && z > -10 && z < 12 }); sc.add(mesh(G.box(40, .06, 6), '#8F8A80', [0, .03, 4.5], { cast: false })); lapakGrosir(sc, [0, 0, -1.5]);
    const B = bima([.9, 0, 1.6]); sc.add(B); B.rotation.y = -.5; const T = termos(sc, [0, 0, 0], 1); const V = X.TL.vars, r = V.rincian; const cam = camera(42);
    const N = nota(root, `<div style="font-size:28px;letter-spacing:4px;color:#F28C28;font-weight:800">NOTA BELANJA</div>` + baris('4 renceng kopi', rp(r.renceng), 'a') + baris('gelas plastik', rp(r.gelas), 'b') + baris('termos bekas', rp(r.termos), 'c') +
      `<div class="d" style="font-size:54px;font-weight:800;display:flex;justify-content:space-between;border-top:4px solid #1E3A5F;margin-top:10px;padding-top:6px;color:#D9534F"><span>TOTAL</span><b>−${rp(V.belanja)}</b></div>`, { top: 290 });
    const rows = ['.a', '.b', '.c', '.d'].map(k => N.querySelector(k)); const tg = tag(root, 'tutupnya seret');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const ts = at(s, 'seret', dur - 2.2); B.pose(t, { hold: true, talk: t < ts, shake: t > ts && t < ts + 1.2 });
      B.updateMatrixWorld(true); const v = new THREE.Vector3(0, -.36, .05); B.userData.st.arms[1].userData.elbow.localToWorld(v); T.position.set(v.x, v.y - .2, v.z + .08); T.rotation.z = t > ts && t < ts + 1.2 ? Math.sin(t * 30) * .12 : 0;
      const p = ease(t, 0, dur); cam.position.set(lerp(2.6, 2.0, p), lerp(2.0, 1.8, p), lerp(8.4, 6.6, p)); cam.lookAt(lerp(0, .5, p), lerp(1.9, 1.5, p), 0);
      show(N, seg(t, .2, .6)); [at(s, 'renceng', .8), at(s, 'gelas', 2), at(s, 'termos', 3), at(s, 'Total', dur - 1.2)].forEach((x, i) => rows[i].style.opacity = .2 + .8 * seg(t, x - .2, x + .1));
      tg(T, cam, [0, .7, 0], seg(t, ts - .1, ts + .2) * (1 - seg(t, ts + 1.4, ts + 1.7))) } };
  },
  M1_LAKU(s, root) {   // warung ramai: ojol & tukang berdatangan, gelas kopi bermunculan, penghitung 0 -> 32
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const V = X.TL.vars;
    [[.9, 9.2, '#E5484D'], [.9, 11.2, '#2E6FB0'], [-.9, 11.8, '#2E2E2E']].forEach(([x, z, c]) => motor(sc, [x, 0, z], c, .1));
    const oj = [[-1.2, 2.2], [-.7, 3.2], [-1.3, 4.1]].map(([x, z], i) => { const o = ojol([0, 0, 0], { skin: ['#C98E64', '#B97A52', '#D9A07A'][i] }); sc.add(o); o.userData.to = [x, z]; return o });
    const tk = [[.2, 1.8], [.5, 2.9], [.1, 4.0], [.8, 3.6]].map(([x, z], i) => { const o = tukang([0, 0, 0], { c: ['#8A8F96', '#6E7F96', '#9A8070', '#7E8A70'][i] }); sc.add(o); o.userData.to = [x, z]; return o });
    const cups = Array.from({ length: 16 }, (_, i) => gelas(sc, [-2.75 + (i % 4) * .14, .8, 2.3 + Math.floor(i / 4) * .14])); const cam = camera(44);
    const cnt = X.ab({ left: 140, top: 320, width: 800, textAlign: 'center', opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#1E3A5F;color:#FFFFFF;border-radius:16px;padding:14px 40px;box-shadow:0 14px 30px #00000055">
      <div style="font-size:30px;letter-spacing:4px;color:#FFE27A;font-weight:800">GELAS TERJUAL</div><div class="n" style="font-size:110px;font-weight:800;line-height:1">0</div></div>`); const num = cnt.querySelector('.n');
    const ludes = BIG(root, 'LUDES!', { top: 560, fontSize: '120px', color: '#FFC46B' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const t6 = at(s, 'Jam enam', .3), t9 = at(s, 'Jam sembilan', dur * .4), tl = at(s, 'ludes', dur - 1);
      const walk = (o, t0, i) => { const q = E.out(seg(t, t0 + i * .35, t0 + 1.4 + i * .35)); const [x, z] = o.userData.to; o.position.set(lerp(x + .4, x, q), 0, lerp(z + 7, z, q)); o.rotation.y = q < 1 ? Math.PI : -Math.PI / 2; o.pose(t + i, { walk: q < 1 ? 1 : 0, hold: q >= 1, talk: q >= 1 && i % 2 === 0 }) };
      oj.forEach((o, i) => walk(o, t6, i)); tk.forEach((o, i) => walk(o, t9, i)); B.pose(t, { hold: true, talk: true, cheer: t > tl });
      const n = Math.round(V.gelas * seg(t, t6 + .8, tl)); num.textContent = n; cups.forEach((c, i) => c.visible = i < Math.min(16, n) && t < tl + .3);
      const a = ease(t, 0, dur); const ang = lerp(.75, .3, a), r = lerp(7.4, 6.6, a); cam.position.set(-1.6 + Math.sin(ang) * r, lerp(2.6, 2.3, a), 3 + Math.cos(ang) * r); cam.lookAt(-1.4, 1.1, 3.0);
      show(cnt, seg(t, t6 + .4, t6 + .8)); pulse(ludes, seg(t, tl - .1, tl + .3)) } };
  },
  M1_IJAH(s, root) {   // Mak Ijah ambil dua gelas kopi, Bima menulis UTANG lagi (7.000 -> 15.000)
    const { sc, K } = dunia({ sky: PAGI }); warung(sc); const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const V = X.TL.vars;
    const dua = [0, 1].map(i => gelas(sc, [-2.25, .8, 2.6 + i * .2])); const buku = group(sc, [-2.75, .8, 3.0]); buku.add(mesh(G.box(.36, .03, .26), '#1E3A5F', [0, 0, 0])); buku.add(mesh(G.box(.34, .032, .24), '#FBF8EE', [0, .005, 0], { cast: false }));
    const I = ijah([-1.2, 0, 7]); sc.add(I); I.rotation.y = Math.PI; const cam = camera(42); const tg = tag(root, 'MAK IJAH · pelanggan tetap #1');
    const note = X.ab({ left: 150, top: 330, width: 780, opacity: 0, textAlign: 'center', fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#FBF8EE;border-radius:10px;padding:14px 30px;box-shadow:0 14px 30px #00000050;border-left:10px solid #D9534F;color:#1E2A38;transform:rotate(-2deg)">
      <div style="font-size:30px;color:#5A6B7E;font-weight:700">BUKU KAS · utang Mak Ijah</div><div style="font-size:44px;font-weight:700;color:#9AA0A8;text-decoration:line-through">${rp(V.utang0)}</div><div style="font-size:60px;font-weight:800;color:#D9534F">${rp(V.utang)}</div></div>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = E.out(seg(t, 0, 1.6)); I.position.z = lerp(7, 2.8, w); I.rotation.y = lerp(Math.PI, -Math.PI / 2, seg(t, 1.3, 1.8)); const tu = at(s, 'masuk utang', dur - 1.6);
      I.pose(t, { walk: w < 1 ? 1 : 0, talk: t > tu - .4, hold: t > 2.2 }); const tn = at(s, 'Ngopi', 2.4);
      dua.forEach((g, i) => { const q = seg(t, tn + i * .25, tn + .5 + i * .25); g.position.set(lerp(-2.25, -1.45, q), .8 + Math.sin(q * Math.PI) * .25 + q * .2, lerp(2.6 + i * .2, 2.7, q)); g.visible = q < 1 });
      B.pose(t, { talk: t < tn, nod: t > tu, hold: t > tu - .2 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.1, p), lerp(1.8, 1.7, p), lerp(6.4, 5.4, p)); cam.lookAt(-2.0, 1.35, 2.85);
      const ti = at(s, 'Mak Ijah', 1.2); tg(I, cam, [0, 2.2, 0], seg(t, ti - .1, ti + .3) * (1 - seg(t, tu - .5, tu - .2))); show(note, seg(t, tu - .2, tu + .2)) } };
  },
  M1_RUDI(s, root) {   // sore: dari teras Bima ke ujung gang, Bang Rudi di tangga memasang spanduk KOPI GRATIS, banner "+ ES" muncul
    const { sc, K, Gg } = dunia({ sky: SORE }); const R = rudi([2.6, 2.6, -21.2]); sc.add(R); R.rotation.y = -.3;
    const tg2 = group(sc, [2.6, 0, -21.6]); [-.25, .25].forEach(x => tg2.add(mesh(G.box(.06, 3.2, .06), '#9AA0A8', [x, 1.6, 0], { rot: [.12, 0, 0] }))); for (let i = 0; i < 8; i++) tg2.add(mesh(G.box(.5, .04, .05), '#9AA0A8', [0, .3 + i * .38, -.04 + i * .045]));
    const bn = canvasPlane(3.4, .8, papanTeks('+ ES! GRATIS!', '#F2C14E', '#C8302A'), 600); bn.position.set(0, 3.8, -15.5); sc.add(bn); [-1, 1].forEach(sx => sc.add(mesh(G.cyl(.012, .012, 1, 4), '#333', [sx * 1.6, 4.3, -15.5], { cast: false })));
    const B = bima([-.7, 0, -.5]); sc.add(B); B.rotation.y = Math.PI; let sw = false; const cam = camera(42); const tg = tag(root, 'BANG RUDI');
    const k = BIG(root, 'KOPI GRATIS?!', { top: 1160, fontSize: '100px', color: '#FFC46B' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tk = at(s, 'Kopi gratis', dur * .55), te = at(s, 'es', dur - .9); if (!sw && t > tk - .1) { sw = true; Gg.spanduk.userData.redraw(spandukGratis) } if (sw && t < tk - .1) { sw = false; Gg.spanduk.userData.redraw((x, W, H) => { x.fillStyle = '#C8302A'; x.fillRect(0, 0, W, H) }) }
      R.pose(t, { point: t < tk, cheer: t > tk && t < te, talk: false }); if (t > te) R.sedekap(); B.pose(t, { look: 0, shake: t > te });
      const sq = E.back(seg(t, te - .1, te + .3)); bn.scale.setScalar(Math.max(.001, sq));
      const a = E.inout(seg(t, 0, dur * .8)); cam.position.set(lerp(.6, .5, a), lerp(1.8, 2.0, a), lerp(2.8, -6, a)); cam.lookAt(lerp(-.2, .8, a), lerp(1.8, 3.9, a), lerp(-12, -22, a));
      const tr = at(s, 'Bang Rudi', 1); tg(R, cam, [0, 2.3, 0], seg(t, tr - .1, tr + .3) * (1 - seg(t, tk - .5, tk - .2))); pulse(k, seg(t, tk, tk + .3)) } };
  },
  M1_AJAK(s, root) {   // teras: papan pelanggan 3, notulen rapat: rumus + 3 strategi melawan
    const { sc, K } = dunia({ sky: SORE }); warung(sc); const P = papanPelanggan(sc, X.TL.vars.hud5 ? X.TL.vars.hud5.pelanggan : 3); const B = bima([-2.95, 0, 2.1]); sc.add(B); B.rotation.y = 1.2; const cam = camera(42);
    const N = X.ab({ left: 120, top: 280, width: 840, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="background:#FBF8EE;border-radius:12px;padding:22px 30px 26px;box-shadow:0 18px 40px #00000055;border-left:12px solid #F28C28;color:#1E2A38">
      <div style="font-size:26px;letter-spacing:4px;color:#F28C28;font-weight:800">NOTULEN RAPAT · DEWAN DIREKSI = KALIAN</div>` +
      [['👥', 'FOLLOW', '+1 pelanggan tetap'], ['❤', 'LIKE', `+${rp(X.TL.vars.kurs_like)} modal`], ['💬', 'KOMEN', 'keputusan rapat']].map(([ic, a, b], i) => `<div class="r${i}" style="display:flex;align-items:center;gap:16px;border-bottom:3px solid #9DB8D8;padding:10px 0"><span style="font-size:44px">${ic}</span><b style="font-size:30px;color:#F28C28;width:150px">${a}</b><span style="font-size:38px;font-weight:800">${b}</span></div>`).join('') +
      `<div class="q" style="font-size:44px;font-weight:800;text-align:center;margin:20px 0 14px;line-height:1.1;color:#1E3A5F">Lawan kopi gratis pakai apa?</div><div class="o" style="display:flex;gap:12px;justify-content:center">` +
      ['🥤<br>KOPI SUSU<br>KEKINIAN', '🍌<br>BONUS<br>GORENGAN', '🤝<br>DATENGIN<br>BANG RUDI'].map(x => `<div style="background:#1E3A5F;color:#FFFFFF;font-size:30px;font-weight:800;padding:12px 16px;border-radius:12px;text-align:center;line-height:1.15">${x}</div>`).join('') + `</div></div>`);
    const rows = [0, 1, 2].map(i => N.querySelector('.r' + i)), q = N.querySelector('.q'), o = N.querySelector('.o');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tq = at(s, 'Kopi susu', dur - 3.5); B.pose(t, { point: t < tq, talk: true, cheer: t > tq + 2 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.0, p), lerp(1.4, 1.3, p), lerp(6.8, 5.6, p)); cam.lookAt(-2.5, 1.9, 2.9);
      show(N, seg(t, .1, .5), 50); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = .25 + .75 * seg(t, tc - .1, tc + .2) });
      const tw = at(s, 'lawan', dur - 4.5); q.style.opacity = seg(t, tw - .3, tw); o.style.opacity = seg(t, tq - .3, tq) } };
  },
};

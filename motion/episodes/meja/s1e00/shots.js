// Shot Meja S1 Ep 0 "Kemarin PHK, Hari Ini Bos" (lihat STORYBOARD.md). Kamera Ep 0 setinggi orang; kampung kota padat di sekeliling.
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SIANG, PAGI, bima, ijah, rudi, kucing, kampung, kantorKaca, gang, mejaLipat, kardus, bungkus, papan, kursi, duduk, canvasPlane, papanTeks,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE = (x, z) => Math.abs(x) < 9 && z > -34 && z < 22;
function dunia(o = {}) { const sc = (o.sky || SIANG)(); const K = kampung(sc, { hole: HOLE }); const Gg = gang(sc, o); return { sc, K, Gg } }
function debu(sc, n = 16, col = '#CDBFA6') { const d = Array.from({ length: n }, (_, i) => { const m = mesh(G.sph(.1, 8, 6), col, [0, -5, 0], { cast: false, mat: { transparent: true, opacity: .55 } }); sc.add(m); return m });
  return (t, t0, p) => d.forEach((m, i) => { const q = seg(t, t0, t0 + 1.1); m.visible = q > 0 && q < 1; const a = i / n * Math.PI * 2; m.position.set(p[0] + Math.cos(a) * q * 1.1, p[1] + Math.sin(i) * .1 + q * .4, p[2] + Math.sin(a) * q * 1.1); m.scale.setScalar(.5 + q * 1.4) }) }
function papanStruktur(draw) { return (x, W, H) => { x.fillStyle = '#FBF8EE'; x.fillRect(0, 0, W, H); x.fillStyle = '#1E3A5F'; x.font = `800 ${H * .1}px Poppins`; x.textAlign = 'center'; x.fillText('STRUKTUR ORGANISASI', W / 2, H * .14); draw(x, W, H) } }
const kotak = (x, W, H, cx, cy, jab, nama) => { const w = W * .4, h = H * .2; x.fillStyle = '#FFFFFF'; x.strokeStyle = '#1E3A5F'; x.lineWidth = 5; x.fillRect(cx - w / 2, cy, w, h); x.strokeRect(cx - w / 2, cy, w, h);
  x.fillStyle = '#F28C28'; x.font = `800 ${H * .06}px Poppins`; x.fillText(jab, cx, cy + h * .38); if (nama) { x.fillStyle = '#1E2A38'; x.font = `800 ${H * .085}px Poppins`; x.fillText(nama, cx, cy + h * .85) } };

export const SHOTS = {
  M0_HOOK(s, root) {   // frame 1 aksi: Bima membanting meja lipat sampai terbuka, kardus mi mendarat, debu
    const { sc, K } = dunia(); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const B = bima([-3.05, 0, 2.6]); sc.add(B); B.rotation.y = Math.PI / 2 - .3;
    const KD = kardus(sc, [-2.5, .79, 2.9]); KD.rotation.y = Math.PI / 2; const dust = debu(sc); const cam = camera(42);
    const a = BIG(root, 'KEMARIN:<br>DI-PHK', { top: 330, fontSize: '112px' }), b = BIG(root, 'HARI INI:<br><span style="color:#FFC46B">BOS</span>', { top: 330, fontSize: '112px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const q = E.out(seg(t, 0, .35)); M.userData.buka(.4 + .6 * q); const kq = seg(t, .35, .75); KD.position.y = .79 + (1 - E.in(kq)) * 2.6; KD.rotation.z = (1 - kq) * .6; dust(t, .3, [-2.5, .4, 2.8]); dust(t, .72, [-2.5, .8, 2.8]);
      const th = at(s, 'Hari ini', 1.8); B.pose(t, { hold: t < .4, talk: t > .8, cheer: t > th + .3 }); const sh = (t > .3 && t < .5) || (t > .72 && t < .9) ? Math.sin(t * 90) * .05 : 0;
      const p = ease(t, 0, dur); cam.position.set(lerp(.4, .2, p) + sh, lerp(1.7, 1.8, p), lerp(5.4, 4.9, p)); cam.lookAt(-2.6, 1.55, 2.75);
      pulse(a, seg(t, .05, .4) * (t < th ? 1 : 0)); if (t >= th) a.style.opacity = 0; pulse(b, seg(t, th, th + .35)) } };
  },
  M0_PHK(s, root) {   // gedung kantor kaca: Bima keluar pintu putar membawa kardus barang kantor
    const sc = PAGI(); const K = kampung(sc, { hole: (x, z) => Math.abs(x) < 40 && Math.abs(z) < 40 }); kantorKaca(sc, [0, 0, -4]);
    [[-22, -10, 70], [22, -14, 54], [-30, -40, 80], [34, -36, 66]].forEach(([x, z, h], i) => { const m = mesh(G.box(12, h, 12), ['#A9D4E6', '#C8D3E8', '#B9DCCB', '#EFE6D6'][i], [x, h / 2, z]); sc.add(m) });
    const B = bima([0, 0, .2]); sc.add(B); const box = group(sc, [0, 0, 0]); box.add(mesh(G.box(.62, .42, .45), '#C9A36B', [0, 0, 0])); box.add(mesh(G.cyl(.06, .06, .25, 8), '#4E8F3A', [-.15, .3, 0])); box.add(mesh(G.ico(.12, 0), '#5FAA4A', [-.15, .48, 0])); box.add(mesh(G.box(.2, .26, .03), '#2A3A48', [.15, .3, 0], { rot: [0, 0, .2] }));
    const cam = camera(42); const k = KARTU(root, '5 TAHUN → 1 KARDUS', '', { top: 360 }); const tg = tag(root, 'BIMA · 27 · eks staf');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = seg(t, .2, dur); B.position.z = lerp(.2, 5.2, w); B.pose(t, { walk: 1 }); B.userData.st.arms.forEach(A => { A.rotation.x = -.9; A.userData.elbow.rotation.x = -.7 });
      box.position.set(0, 1.12 + Math.abs(Math.sin(t * 8)) * .04, B.position.z + .45); B.userData.st.head.rotation.x = .25; X.TL && 0;
      const p = ease(t, 0, dur); cam.position.set(lerp(2.6, 1.6, p), lerp(.7, .9, p), lerp(10.5, 9.6, p)); cam.lookAt(0, lerp(5, 2.4, p), lerp(-2, 3, p));
      tg(B, cam, [0, 2.2, 0], seg(t, .6, 1) * (1 - seg(t, dur - 2.6, dur - 2.2))); const tc = at(s, 'kardus', dur - 1.6); pulse(k, seg(t, tc - .1, tc + .3)) } };
  },
  M0_GANG(s, root) {   // drone dari atas ribuan atap kampung kota turun ke gang sempit, mendarat di teras Bima
    const { sc, K, Gg } = dunia(); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const KD = kardus(sc, [-2.5, .79, 2.9]); KD.rotation.y = Math.PI / 2;
    const B = bima([-3.05, 0, 2.4]); sc.add(B); B.rotation.y = Math.PI / 2; const cam = camera(42);
    const lb = BIG(root, `${Math.floor(K.rumah / 1000) * 1000}+ rumah`, { top: 360, fontSize: '76px' }); const tg = tag(root, 'KANTOR PUSAT'); const k2 = KARTU(root, 'MODAL', '1 meja lipat + 1 kardus mi', { top: 330 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); B.pose(t, { talk: true, point: t > at(s, 'Modal', dur - 3) }); const a = seg(t, 0, dur * .72);
      cam.position.set(lerp(-6, 1.3, E.inout(a)), lerp(78, 1.9, E.inout(a)), lerp(70, 6.6, E.out(a))); cam.lookAt(lerp(0, -2.6, E.inout(a)), lerp(0, 1.2, E.inout(a)), lerp(-14, 2.8, E.out(a)));
      show(lb, seg(t, .3, .7) * (1 - seg(t, dur * .4, dur * .48))); tg(Gg.teras, cam, [2, 3.4, 0], seg(t, dur * .55, dur * .62) * (1 - seg(t, dur * .78, dur * .82))); const tm = at(s, 'Modal', dur - 3); show(k2, seg(t, tm - .2, tm + .3)) } };
  },
  M0_STRUKTUR(s, root) {   // papan STRUKTUR ORGANISASI di dinding teras: semua jabatan diisi "BIMA"
    const { sc, K } = dunia(); const P = papan(sc, [-3.36, 1.7, 3.55], 1.5, 1.15, () => { }, Math.PI / 2); const c = P.userData.c;
    const B = bima([-2.9, 0, 2.1]); sc.add(B); B.rotation.y = 1.2; const cam = camera(46); let last = '';
    const ok = BIG(root, 'BIMA.', { top: 1180, fontSize: '120px', color: '#FFC46B' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const n = [at(s, 'Direktur', 1.5), at(s, 'Kasir', 3), at(s, 'Office', 4.5)].filter(x => t > x + .5).length, key = 'n' + n;
      if (key !== last) { last = key; c.userData.redraw(papanStruktur((x, W, H) => { x.strokeStyle = '#1E3A5F'; x.lineWidth = 5; x.beginPath(); x.moveTo(W / 2, H * .44); x.lineTo(W / 2, H * .55); x.moveTo(W * .25, H * .55); x.lineTo(W * .75, H * .55); x.moveTo(W * .25, H * .55); x.lineTo(W * .25, H * .62); x.moveTo(W * .75, H * .55); x.lineTo(W * .75, H * .62); x.stroke();
        kotak(x, W, H, W / 2, H * .22, 'DIREKTUR', n > 0 && 'BIMA'); kotak(x, W, H, W * .25, H * .62, 'KASIR', n > 1 && 'BIMA'); kotak(x, W, H, W * .75, H * .62, 'OFFICE BOY', n > 2 && 'BIMA');
        x.fillStyle = '#9A8A7A'; x.font = `700 ${H * .045}px Poppins`; x.fillText('lowongan: satpam (gaji: belum ada)', W / 2, H * .94) })) }
      B.pose(t, { point: true, talk: true, shake: t > dur - 1.4 }); const p = ease(t, 0, dur); cam.position.set(lerp(1.4, 1.2, p), lerp(1.8, 1.75, p), lerp(4.6, 4.1, p)); cam.lookAt(-3.2, 1.45, 3.35);
      const tb = at(s, 'Office', 4.5) + .9; pulse(ok, seg(t, tb, tb + .3)) } };
  },
  M0_RAPAT(s, root) {   // rapat perdana: Bima di meja lipat, kucing di kursi seberang, palu diketuk
    const { sc, K } = dunia(); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; kursi(sc, [-3.05, 0, 2.8], Math.PI / 2); kursi(sc, [-1.85, 0, 2.8], -Math.PI / 2, '#F28C28');
    const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const C = kucing(sc, [-1.75, .53, 2.8]); C.rotation.y = Math.PI; const KD = kardus(sc, [-2.5, .79, 3.3]); KD.rotation.y = Math.PI / 2;
    const palu = group(sc, [-2.55, .8, 2.45]); palu.add(mesh(G.cyl(.02, .02, .3, 6), '#7A4A2A', [0, .05, .12], { rot: [Math.PI / 2, 0, 0] })); palu.add(mesh(G.cyl(.05, .05, .16, 10), '#5A3A1A', [0, .05, 0], { rot: [0, 0, Math.PI / 2] }));
    const wb = papan(sc, [-3.36, 1.9, 4.1], 1.3, .9, papanTeks('RAPAT PERDANA', '#FFFFFF', '#1E3A5F'), Math.PI / 2);
    const cam = camera(42); const tg = tag(root, 'PESERTA RAPAT'); const ok = BIG(root, 'SETUJU!', { top: 380, fontSize: '128px', color: '#FFC46B' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(B, -.36); const ts = at(s, 'setuju', dur - 1.5); B.pose(t, { talk: t < ts, hold: t > ts - .3 }); duduk(B, -.36);
      const ket = t > ts - .2 && t < ts + .6 ? Math.abs(Math.sin((t - ts) * 14)) : 0; palu.position.y = .8 + ket * .18; palu.rotation.z = ket * .5;
      C.userData.hd.rotation.z = t > ts ? Math.sin(t * 10) * .25 : Math.sin(t * 2) * .08; C.userData.tail.rotation.z = .6 + Math.sin(t * 5) * .3;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.4, 1.0, p), lerp(2.0, 1.7, p), lerp(6.2, 5.4, p)); cam.lookAt(-2.45, .95, 2.85);
      const tk = at(s, 'kucing', 3); tg(C, cam, [0, .9, 0], seg(t, tk - .1, tk + .2) * (1 - seg(t, ts - .4, ts))); pulse(ok, seg(t, ts, ts + .3)) } };
  },
  M0_HITUNG(s, root) {   // tampak atas meja: kardus terbuka, 40 bungkus melompat tersusun, hitungan modal-jual-untung
    const { sc, K } = dunia(); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const KD = kardus(sc, [-2.5, .79, 2.8]); KD.rotation.y = Math.PI / 2;
    const B = bima([-3.15, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2; const V = X.TL.vars;
    const bks = Array.from({ length: V.isi }, (_, i) => { const b = bungkus(sc, [0, -5, 0]); b.userData.to = [-2.5 - .28 + (i % 5) * .14, .8, 2.8 - .63 + Math.floor(i / 5) * .18]; return b });
    const cam = camera(42); const card = X.ab({ left: 110, top: 300, width: 860, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="background:#FBF8EE;border-radius:14px;padding:20px 34px;box-shadow:0 14px 30px #00000050;border-left:10px solid #F28C28;color:#1E2A38">
      <div class="a" style="font-size:40px;font-weight:700;display:flex;justify-content:space-between"><span>modal 1 kardus</span><b>${rp(V.harga)}</b></div>
      <div class="b" style="font-size:40px;font-weight:700;display:flex;justify-content:space-between"><span>${V.isi} × ${rp(V.jual)}</span><b>${rp(V.omzet)}</b></div>
      <div class="c" style="font-size:54px;font-weight:800;display:flex;justify-content:space-between;border-top:4px solid #1E3A5F;margin-top:8px;padding-top:6px;color:#2E9C6A"><span>UNTUNG</span><b>${rp(V.untung)}</b></div></div>`);
    const [ra, rb, rc] = ['.a', '.b', '.c'].map(k => card.querySelector(k));
    return { scene: sc, cam, upd(t, dur) { K.tick(t); KD.userData.buka(E.out(seg(t, .1, .6))); B.pose(t, { talk: true, nod: t > dur - 2 });
      bks.forEach((b, i) => { const q = seg(t, .5 + i * .05, 1.0 + i * .05), [x, y, z] = b.userData.to; b.position.set(lerp(-2.5, x, q), y + Math.sin(q * Math.PI) * .7 + (q === 0 ? -5 : 0), lerp(2.8, z, q)); b.rotation.y = (1 - q) * 6 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-.6, -1.1, p), lerp(3.4, 2.7, p), lerp(3.2, 3.0, p)); cam.lookAt(-2.5, .8, 2.85);
      show(card, seg(t, .3, .7)); const tu = at(s, 'untungnya', 3); ra.style.opacity = 1; rb.style.opacity = seg(t, tu - 1.2, tu - .9); rc.style.opacity = seg(t, tu + .5, tu + .8) } };
  },
  M0_IJAH(s, root) {   // Mak Ijah datang, ambil dua bungkus, "ngutang dulu ya"; Bima menulis di buku kas
    const { sc, K } = dunia(); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const B = bima([-3.05, 0, 2.8]); sc.add(B); B.rotation.y = Math.PI / 2;
    const tumpuk = Array.from({ length: 12 }, (_, i) => bungkus(sc, [-2.6 + (i % 3) * .2, .8 + Math.floor(i / 6) * .045, 2.5 + Math.floor(i / 3) % 2 * .16]));
    const dua = [0, 1].map(i => bungkus(sc, [-2.25, .8, 2.9 + i * .2])); const buku = group(sc, [-2.75, .8, 3.25]); buku.add(mesh(G.box(.36, .03, .26), '#1E3A5F', [0, 0, 0])); buku.add(mesh(G.box(.34, .032, .24), '#FBF8EE', [0, .005, 0], { cast: false }));
    const I = ijah([-1.2, 0, 7]); sc.add(I); I.rotation.y = Math.PI; const cam = camera(42); const tg = tag(root, 'MAK IJAH · pembeli pertama');
    const note = X.ab({ left: 150, top: 330, width: 780, opacity: 0, textAlign: 'center', fontFamily: 'Poppins' }, root, `<div style="display:inline-block;background:#FBF8EE;border-radius:10px;padding:14px 30px;box-shadow:0 14px 30px #00000050;border-left:10px solid #D9534F;color:#1E2A38;transform:rotate(-2deg)">
      <div style="font-size:30px;color:#5A6B7E;font-weight:700">BUKU KAS · hari 1</div><div style="font-size:52px;font-weight:800;color:#D9534F">UTANG Mak Ijah ${rp(X.TL.vars.utang)}</div></div>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = E.out(seg(t, 0, 1.8)); I.position.z = lerp(7, 2.9, w); I.rotation.y = lerp(Math.PI, -Math.PI / 2, seg(t, 1.5, 2)); I.pose(t, { walk: w < 1 ? 1 : 0, talk: t > at(s, 'ngutang', dur - 2) - .2, hold: t > 2.2 });
      const ta = at(s, 'Ambil', 2.6); dua.forEach((b, i) => { const q = seg(t, ta + i * .25, ta + .5 + i * .25); b.position.set(lerp(-2.25, -1.45, q), .8 + Math.sin(q * Math.PI) * .25 + q * .2, lerp(2.9 + i * .2, 2.75, q)); b.visible = q < 1 });
      const tn = at(s, 'ngutang', dur - 2); B.pose(t, { talk: t < tn - .3, shake: t > tn + .3, hold: t > tn + .6 }); B.userData.st.head.rotation.x = t > tn + .6 ? .35 : 0;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.3, .9, p), lerp(1.9, 1.75, p), lerp(6.4, 5.4, p)); cam.lookAt(-2.0, 1.2, 2.9);
      const ti = at(s, 'Mak Ijah', .8); tg(I, cam, [0, 2.2, 0], seg(t, ti, ti + .3) * (1 - seg(t, tn - .5, tn - .2))); show(note, seg(t, tn + .5, tn + .9)) } };
  },
  M0_RUDI(s, root) {   // ujung gang: toko Bang Rudi penuh barang, Rudi bersedekap & tersenyum
    const { sc, K, Gg } = dunia(); const R = rudi([0, 0, -21.6]); sc.add(R); const cam = camera(42); const tg = tag(root, 'BANG RUDI · toko paling gede');
    const B = bima([.9, 0, -1]); sc.add(B); B.rotation.y = Math.PI;
    return { scene: sc, cam, upd(t, dur) { K.tick(t); R.pose(t, { talk: false }); R.sedekap(); R.userData.st.head.rotation.z = Math.sin(t * 1.4) * .06; B.pose(t, {});
      const a = E.inout(seg(t, 0, dur * .7)); cam.position.set(lerp(1.4, .4, a), lerp(1.7, 1.8, a), lerp(1.8, -10.5, a)); cam.lookAt(lerp(.9, 0, a), lerp(1.6, 3.0, a), lerp(-8, -23, a));
      const tr = at(s, 'Bang Rudi', dur - 2.6); tg(R, cam, [0, 2.3, 0], seg(t, tr - .1, tr + .3)) } };
  },
  M0_AJAK(s, root) {   // teras: papan PELANGGAN TETAP (0), notulen rapat: rumus + tiga pilihan barang
    const { sc, K } = dunia(); const M = mejaLipat(sc, [-2.5, 0, 2.8]); M.rotation.y = Math.PI / 2; const B = bima([-2.95, 0, 2.1]); sc.add(B); B.rotation.y = 1.2;
    const KD = kardus(sc, [-2.5, .79, 3.1]); KD.rotation.y = Math.PI / 2; const P = papan(sc, [-2.0, 2.3, 3.7], 1.1, .62, (x, W, H) => { x.fillStyle = '#1E3A5F'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.textAlign = 'center'; x.font = `800 ${H * .2}px Poppins`; x.fillText('PELANGGAN TETAP', W / 2, H * .3); x.fillStyle = '#FFFFFF'; x.font = `800 ${H * .5}px Poppins`; x.fillText('0', W / 2, H * .82) }, Math.PI / 2 - .3);
    const cam = camera(42);
    const N = X.ab({ left: 120, top: 280, width: 840, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="background:#FBF8EE;border-radius:12px;padding:22px 30px 26px;box-shadow:0 18px 40px #00000055;border-left:12px solid #F28C28;color:#1E2A38">
      <div style="font-size:26px;letter-spacing:4px;color:#F28C28;font-weight:800">NOTULEN RAPAT · DEWAN DIREKSI = KALIAN</div>` +
      [['👥', 'FOLLOW', '+1 pelanggan tetap'], ['❤', 'LIKE', `+${rp(X.TL.vars.kurs_like)} modal`], ['💬', 'KOMEN', 'keputusan rapat']].map(([ic, a, b], i) => `<div class="r${i}" style="display:flex;align-items:center;gap:16px;border-bottom:3px solid #9DB8D8;padding:10px 0"><span style="font-size:44px">${ic}</span><b style="font-size:40px;color:#1E3A5F;width:190px">${a}</b><span style="font-size:38px;font-weight:700">${b}</span></div>`).join('') +
      `<div class="q" style="font-size:44px;font-weight:800;text-align:center;margin:20px 0 14px;line-height:1.1;color:#1E3A5F">Besok nambah jualan apa?</div><div class="o" style="display:flex;gap:14px;justify-content:center">` +
      ['☕<br>KOPI SACHET', '🥚<br>TELUR', '🧊<br>ES BATU'].map(x => `<div style="background:#1E3A5F;color:#FFFFFF;font-size:32px;font-weight:800;padding:12px 18px;border-radius:12px;text-align:center;line-height:1.15">${x}</div>`).join('') + `</div></div>`);
    const rows = [0, 1, 2].map(i => N.querySelector('.r' + i)), q = N.querySelector('.q'), o = N.querySelector('.o');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tq = at(s, 'Kopi', dur - 3); B.pose(t, { point: t < tq, talk: true, cheer: t > tq + 1.5 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.0, p), lerp(1.4, 1.3, p), lerp(6.8, 5.6, p)); cam.lookAt(-2.5, 1.9, 2.9);
      show(N, seg(t, .1, .5), 50); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = .25 + .75 * seg(t, tc - .1, tc + .2) });
      const tw = at(s, 'besok', dur - 4); q.style.opacity = seg(t, tw - .3, tw); o.style.opacity = seg(t, tq - .3, tq) } };
  },
};

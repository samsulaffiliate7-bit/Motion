// Shot Dompet S1 Ep 3 "Teras Masjid Lagi" (lihat STORYBOARD.md). Lokasi: teras masjid malam/subuh, dapur warteg, bangku warteg; akhir kembali ke frame awal (loop).
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SORE, SIANG, MALAM, SUBUH, nana, raka, siDompet, jamaah, kota, warteg, trotoar, bangku, duduk, dapur, menaraPiring, masjid,
  BIG, KARTU, show, pulse, ease, tag, at, X } from '../_s1/dunia.js';

const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE_M = (x, z) => Math.abs(x) < 24 && z > -22 && z < 18;
const HOLE_D = (x, z) => Math.abs(x) < 16 && z > -14 && z < 14;
function rebah(N, x, z, y = .64) { N.rotation.set(0, 0, Math.PI / 2); N.position.set(x, y, z) }   // telentang sepanjang sumbu x (kepala di -x)
function kepala(N) { N.updateMatrixWorld(true); return N.userData.st.head.getWorldPosition(new THREE.Vector3()) }
function tangan(P, i = 1) { P.updateMatrixWorld(true); const v = new THREE.Vector3(0, -.36, .05); P.userData.st.arms[i].userData.elbow.localToWorld(v); return v }
const kartuGelap = (root, html, css = {}) => X.ab(Object.assign({ left: 90, top: 320, width: 900, textAlign: 'center', opacity: 0, fontFamily: 'Baloo' }, css), root,
  `<div style="display:inline-block;background:rgba(40,20,10,.9);border-radius:26px;padding:18px 40px 22px;box-shadow:0 14px 30px #0000005c;border:2px solid #ffffff22;color:#FFF1D2">${html}</div>`);
const center = (root, html, top, css = {}) => X.ab(Object.assign({ left: 0, top, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Baloo', fontWeight: 800 }, css), root, html);
const chipEp = root => center(root, `<span style="display:inline-block;background:#C8501E;color:#FFF1D2;font-size:46px;letter-spacing:6px;padding:8px 34px 10px;border-radius:18px;box-shadow:0 10px 24px #0006;border:3px solid #FFF1D299">EPISODE 3</span>`, 300);
function hpLayar(root, rows, top = 560) {   // HP besar: baris angka (label, nilai, warna)
  return X.ab({ left: 190, top, width: 700, opacity: 0, fontFamily: 'Baloo' }, root, `<div style="background:#1C120E;border-radius:56px;padding:26px 22px;box-shadow:0 22px 46px #0008;border:4px solid #4A3020">
    <div style="width:120px;height:14px;border-radius:7px;background:#3A2A20;margin:0 auto 16px"></div><div style="background:linear-gradient(180deg,#FFF6E6,#FCE3BC);border-radius:34px;padding:20px 30px">` +
    rows.map(([a, b, c], i) => `<div class="r${i}" style="display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;${i ? 'border-top:3px dashed #E2C49A' : ''}"><span style="font-size:36px;font-weight:800;color:#8A5A3A;letter-spacing:2px">${a}</span><b style="font-size:60px;color:${c}">${b}</b></div>`).join('') + `</div></div>`);
}
function kucing(parent, p) {   // kucing masjid oranye belang: badan, kepala, telinga, ekor; userData.hd, tail
  const g = group(parent, p); const c = '#E8A04E', d = '#B86A26';
  g.add(mesh(G.box(.46, .2, .24), c, [0, .14, 0])); [-.14, 0, .14].forEach(x => g.add(mesh(G.box(.04, .205, .245), d, [x, .14, 0], { cast: false })));
  const hd = group(g, [.27, .24, 0]); hd.add(mesh(G.box(.2, .17, .2), c, [0, 0, 0])); [-.06, .06].forEach(z => hd.add(mesh(G.cone(.045, .09, 4), c, [0, .12, z])));
  [-.05, .05].forEach(z => hd.add(mesh(G.box(.01, .016, .04), '#2A1A10', [.101, .02, z], { cast: false }))); hd.add(mesh(G.box(.01, .02, .02), '#E86A7A', [.101, -.02, 0], { cast: false }));
  const tail = group(g, [-.23, .16, 0]); tail.add(mesh(G.box(.3, .05, .05), c, [-.15, 0, 0])); g.userData.hd = hd; g.userData.tail = tail; return g;
}
function teras(o = {}) {   // teras masjid: scene + kota + masjid
  const sc = (o.sky || MALAM)(o.skyOpt); const K = kota(sc, { hole: HOLE_M, lit: o.lit ?? .7, rail: -46 }); masjid(sc, [0, 0, 0], { lampu: o.lampu ?? 1 });
  const glow = new THREE.PointLight('#FFD9A0', o.glow ?? 7, 10, 1.4); glow.position.set(1.2, 3.0, 2.0); sc.add(glow); return { sc, K };
}

export const SHOTS = {
  D3_HOOK(s, root) {   // detik 0: teras masjid malam, Nana rebahan memegang HP; teks besar hasil + HP saldo/DP/sisa hari
    const { sc, K } = teras(); const N = nana([0, 0, 0]); sc.add(N); rebah(N, 1.6, 1.4); const D = siDompet(sc, [0, 0, 0], .5); D.rotation.set(-Math.PI / 2 + .5, 0, 0);
    const hp = mesh(G.box(.3, .04, .16), '#1C120E', [0, 0, 0]); sc.add(hp); const ly = mesh(G.box(.26, .045, .13), '#FFE6A8', [0, 0, 0], { cast: false, mat: { emissive: '#FFD98A', emissiveIntensity: .8 } }); sc.add(ly);
    const V = X.TL.vars; const cam = camera(42); const ep = chipEp(root);
    const big = center(root, `<div style="font-size:112px;line-height:.95;color:#FFF1D2;text-shadow:0 8px 0 #7A2E10,0 18px 40px #000a">TERAS MASJID<br><span style="color:#FFC86B">LAGI!</span></div>`, 380);
    const ph = hpLayar(root, [['SALDO', rp(V.saldo0), '#2E7D4F'], ['DP KOS', rp(V.dp), '#C8501E'], ['SISA', `${V.hari} HARI`, '#C8302A']], 640);
    const rows = [0, 1, 2].map(i => ph.querySelector('.r' + i));
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, {}); rebah(N, 1.6, 1.4); const h = kepala(N); D.position.set(h.x - .5, .53, h.z - .1); D.mood(t, t > 2 ? 'kecut' : 'senyum', .3);
      N.userData.st.arms.forEach((A, i) => { A.rotation.x = -.3 - (i ? 1.2 : 0); A.rotation.z = i ? -.3 : .15 }); const th = tangan(N); hp.position.set(th.x, th.y + .18, th.z); ly.position.copy(hp.position).add(new THREE.Vector3(0, .005, 0));
      ly.material.emissiveIntensity = .6 + .4 * Math.abs(Math.sin(t * 6)) * (t < .8 ? 1 : 0);
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.4, p), lerp(2.4, 2.0, p), lerp(5.8, 5.0, p)); cam.lookAt(.55, .8, 1.4);
      pulse(ep, seg(t, 0, .25)); pulse(big, seg(t, 0, .3)); const ts = at(s, 'Saldo', 2.2); big.style.opacity = 1 - seg(t, ts - .4, ts - .1);
      show(ph, seg(t, ts - .5, ts - .1)); const T = [ts, at(s, 'DP', ts + 1.4), at(s, 'sisa', dur - 1.2)]; rows.forEach((r, i) => { r.style.opacity = .2 + .8 * seg(t, T[i] - .15, T[i] + .1); r.style.transform = `scale(${1 + .08 * Math.sin(Math.PI * seg(t, T[i] - .1, T[i] + .4))})` }) } };
  },
  D3_REZEKI(s, root) {   // Nana duduk di teras, HP bunyi: koin meletup; kartu gabungan like + follow -> saldo baru
    const { sc, K } = teras(); const N = nana([1.3, 0, 1.6]); sc.add(N); N.rotation.y = -.4; const D = siDompet(sc, [1.95, .52, 1.95], .32); D.rotation.y = -.5;
    const hp = mesh(G.box(.16, .3, .02), '#1C120E', [0, 0, 0]); sc.add(hp); const ly = mesh(G.box(.14, .26, .022), '#FFE6A8', [0, 0, 0], { cast: false, mat: { emissive: '#FFD98A', emissiveIntensity: .7 } }); sc.add(ly);
    const coins = Array.from({ length: 10 }, () => coin(sc, [0, -5, 0], .5)); const V = X.TL.vars; const cam = camera(42);
    const kr = kartuGelap(root, `<div style="font-size:28px;letter-spacing:3px;color:#FFC86B;font-weight:800">LIKE GABUNGAN TIKTOK + IG + YOUTUBE</div>
      <div style="font-size:44px;font-weight:700">${V.lk.tiktok} + ${V.lk.ig} + ${V.lk.youtube} = <b style="font-size:64px;color:#FFC86B">${V.like}</b></div>
      <div style="font-size:46px;font-weight:800">🧽 skill naik <span style="color:#9BE59B">+${V.xp_tambah} XP</span></div>
      <div class="f" style="font-size:46px;font-weight:800;opacity:0;border-top:3px solid #ffffff33;margin-top:8px;padding-top:6px">👤 +${V.follow} follower = <span style="color:#9BE59B">+${rp(V.uangf)}</span></div>`, { top: 300 });
    const kf = kr.querySelector('.f'); const sal = BIG(root, rp(V.saldo), { top: 1040, fontSize: '120px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.46); N.pose(t, { hold: true, look: .1, cheer: t > at(s, 'masuk', dur - .8) }); duduk(N, -.46);
      const h = tangan(N); hp.position.set(h.x + .05, h.y + .12, h.z + .1); ly.position.copy(hp.position).add(new THREE.Vector3(0, 0, .012)); hp.rotation.x = ly.rotation.x = -.5;
      const tf = at(s, 'follower', dur * .5), tm = at(s, 'masuk', dur - .8); ly.material.emissiveIntensity = .5 + .5 * Math.abs(Math.sin(t * 9)) * (t > tf - .3 && t < tm + .4 ? 1 : 0);
      coins.forEach((c, i) => { const q = seg(t, tm - .2 + i * .08, tm + .7 + i * .08); c.visible = q > 0 && q < 1; c.position.set(hp.position.x + (i - 4.5) * .1, hp.position.y + .1 + q * 1.1, hp.position.z + .1); c.rotation.y = t * 6 });
      D.mood(t, t > tm ? 'senyum' : 'kecut', 1.3); const p = ease(t, 0, dur); cam.position.set(lerp(2.6, 2.3, p), lerp(1.7, 1.6, p), lerp(5.2, 4.4, p)); cam.lookAt(1.4, 1.0, 1.6);
      show(kr, seg(t, .1, .45)); kf.style.opacity = seg(t, tf - .2, tf + .2); pulse(sal, seg(t, tm - .1, tm + .3)) } };
  },
  D3_KUCING(s, root) {   // GAGAL LUCU: subuh, kucing masjid tidur di atas Si Dompet (bantal Nana); jam berlari 04.30 -> 05.30
    const { sc, K } = teras({ sky: SUBUH, lit: .45, lampu: .8, glow: 3 }); const N = nana([0, 0, 0]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .5); D.rotation.set(-Math.PI / 2 + .5, 0, 0);
    const C = kucing(sc, [0, 0, 0]); C.rotation.y = Math.PI / 2; const cam = camera(40); const tgK = tag(root, '🐈 kucing masjid · zzz');
    const jam = kartuGelap(root, `<div style="font-size:30px;letter-spacing:4px;color:#FFC86B;font-weight:800">JAM DINDING</div><div class="n" style="font-size:120px;font-weight:800;line-height:1">04.30</div>`, { top: 300 }); const num = jam.querySelector('.n');
    const tel = center(root, `<span style="display:inline-block;border:9px solid #C8302A;color:#C8302A;border-radius:22px;padding:0 30px;background:#FFF6E6ee;font-size:92px;transform:rotate(-6deg)">TELAT 30 MENIT!</span>`, 1030);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tk = at(s, 'kucing', 1), tt = at(s, 'telat', dur - 1.2);
      const up = E.inout(seg(t, tt - .3, tt + .3)); N.pose(t, { look: up > .5 ? .6 : 0, shake: t > tt + .3 });
      if (up < 1) { rebah(N, 1.6, 1.4); N.rotation.z = Math.PI / 2 * (1 - up); N.position.y = .64 - up * .12 } else { N.rotation.set(0, -.5, 0); N.position.set(1.5, .52, 1.4) }
      N.userData.st.arms.forEach((A, i) => { A.rotation.x = up < 1 ? -.3 : -1.4 + Math.sin(t * 16 + i) * .4; A.rotation.z = .15 });
      const hk = kepala(N); const dx = up < 1 ? hk.x - .5 : .3, dz = up < 1 ? hk.z - .1 : 1.3; D.position.set(dx, .53, dz); D.mood(t, 'kecut', .3); C.position.set(dx, .7 + Math.sin(t * 2.2) * .012, dz); C.userData.tail.rotation.y = Math.sin(t * 2) * .4; C.userData.hd.rotation.z = -.25 + Math.sin(t * 1.3) * .05;
      const m = Math.round(60 * E.inout(seg(t, tk + .6, tt))); num.textContent = (m < 30 ? '04.' + String(30 + m).padStart(2, '0') : '05.' + String(m - 30).padStart(2, '0'));
      const p = ease(t, 0, dur); cam.position.set(lerp(-.7, -.5, p), lerp(1.8, 1.9, p), lerp(4.8, 4.4, p)); cam.lookAt(-.15, .72, 1.3);
      show(jam, seg(t, .1, .4)); tgK(C, cam, [0, .55, 0], seg(t, tk - .1, tk + .2) * (1 - seg(t, tt - .5, tt - .2))); pulse(tel, seg(t, tt - .05, tt + .3)) } };
  },
  D3_KERJA(s, root) {   // SUKSES: dapur warteg, 300 piring habis sebelum jam 2, Ibu warteg acungkan jempol, stempel makan tidak dipotong
    const sc = SIANG(); const K = kota(sc, { hole: HOLE_D }); dapur(sc); const M = menaraPiring(sc, [-1.3, .08, -2.3], 34); const M2 = menaraPiring(sc, [1.5, .08, -2.6], 34);
    const N = nana([0, .08, -1.75]); sc.add(N); N.rotation.y = Math.PI; const I = jamaah([2.4, .08, -.2], { c: '#E56B8A', skin: '#C98E64' }); sc.add(I); I.rotation.y = -1.2;
    I.userData.st.body.add(mesh(G.box(.3, .4, .03), '#FFFFFF', [0, .05, .15], { cast: false })); const cam = camera(44);
    const cnt = kartuGelap(root, `<div style="display:flex;gap:40px;justify-content:center"><div><div style="font-size:28px;letter-spacing:3px;color:#FFC86B;font-weight:800">PIRING</div><div class="n" style="font-size:96px;font-weight:800;line-height:1">300</div></div>
      <div><div style="font-size:28px;letter-spacing:3px;color:#FFC86B;font-weight:800">JAM</div><div class="j" style="font-size:96px;font-weight:800;line-height:1">08.00</div></div></div>`, { top: 300 }); const num = cnt.querySelector('.n'), jm = cnt.querySelector('.j');
    const ok = center(root, `<span style="display:inline-block;border:9px solid #2E9C6A;color:#2E9C6A;border-radius:22px;padding:4px 30px;background:#FFF6E6ee;font-size:70px;line-height:1.05;transform:rotate(-5deg)">MAKAN HARI INI<br>NGGAK DIPOTONG ✔</span>`, 1010);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const td = at(s, 'dipotong', dur - .8), tj = at(s, 'sebelum', 2); const q = E.inout(seg(t, .1, tj + .6));
      M.userData.set(Math.round(34 * (1 - q))); M2.userData.set(Math.round(4 + 30 * q)); num.textContent = Math.round(300 * (1 - q)); const mm = Math.round(8 * 60 + q * (13 * 60 + 52 - 8 * 60)); jm.textContent = String(Math.floor(mm / 60)).padStart(2, '0') + '.' + String(mm % 60).padStart(2, '0');
      const kerja = t < tj + .6; N.pose(t, { hold: kerja, cheer: !kerja && t > tj + .8 }); if (kerja) N.userData.st.arms.forEach((A, i) => { A.rotation.x = -1.1 + Math.sin(t * 14 + i * 3) * .25; A.rotation.z = (i ? -1 : 1) * Math.sin(t * 11 + i) * .2 });
      N.rotation.y = kerja ? Math.PI : lerp(Math.PI, Math.PI * .35, E.out(seg(t, tj + .6, tj + 1.2)));
      I.pose(t, { talk: t > td - 1.2, wave: t > td - .2 }); const a = ease(t, 0, dur); const ang = lerp(-.6, .5, a); cam.position.set(Math.sin(ang) * 4.6 + .4, lerp(2.4, 2.0, a), -1.6 + Math.cos(ang) * 4.6); cam.lookAt(.4, 1.0, -1.6);
      show(cnt, seg(t, .05, .35)); pulse(ok, seg(t, td - .1, td + .3)) } };
  },
  D3_HITUNG(s, root) {   // bangku depan warteg sore: kartu hitung jujur saldo - DP = sisa / 4 hari; KRL Rp3.000 sekali jalan
    const sc = SORE({ sunPos: [-10, 15, 14] }); const K = kota(sc, { hole: (x, z) => z > -14 && z < 14 && Math.abs(x) < 30 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60); bangku(sc, [-1.2, .25, 6.4]);
    const N = nana([-1.5, .25, 6.5]); sc.add(N); const D = siDompet(sc, [-.55, .91, 6.5], .32); const V = X.TL.vars; const cam = camera(42);
    const L = (a, b, c = '#FFF1D2', k = '') => `<div class="${k}" style="display:flex;justify-content:space-between;gap:30px;font-size:52px;font-weight:800;opacity:0"><span>${a}</span><span style="color:${c}">${b}</span></div>`;
    const nota = kartuGelap(root, `<div style="text-align:left;min-width:700px"><div style="font-size:30px;letter-spacing:4px;color:#FFC86B;font-weight:800;text-align:center">HITUNG JUJUR</div>` +
      L('saldo', rp(V.saldo), '#9BE59B', 'a') + L('DP kos', '− ' + rp(V.dp), '#FF8A7A', 'b') + `<div class="c" style="opacity:0;border-top:4px solid #FFC86B;margin-top:6px;padding-top:6px;display:flex;justify-content:space-between;font-size:60px;font-weight:800"><span>sisa</span><span style="color:#FFC86B">${rp(V.sisa)}</span></div>` +
      L(`÷ ${V.hari} hari`, rp(V.per) + '/hari', '#FFF1D2', 'd') + `</div>`, { top: 300 });
    const [ra, rb, rc, rd] = ['.a', '.b', '.c', '.d'].map(k => nota.querySelector(k));
    const krl = center(root, `<span style="display:inline-block;background:#FFF6E6;color:#4A2410;border-radius:22px;padding:12px 30px;font-size:54px;box-shadow:0 12px 26px #0006">🚆 KRL sekali jalan <b style="color:#C8501E">Rp3.000</b></span>`, 1060);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.12); N.pose(t, { hold: true, talk: true, look: .3, shake: t > dur - 1 }); duduk(N, -.12); D.mood(t, t > at(s, 'hari', 2) ? 'nangis' : 'kecut');
      const p = ease(t, 0, dur); cam.position.set(lerp(-2.4, -2.0, p), lerp(2.7, 2.5, p), lerp(11.0, 10.2, p)); cam.lookAt(-1.2, 2.2, 5);
      show(nota, seg(t, .05, .4)); const tdp = at(s, 'DP', .4), ts = at(s, 'sisa', 1.4), te = at(s, 'hari', 2.6), tk = at(s, 'KRL', dur - 1.4);
      ra.style.opacity = seg(t, .1, .4); rb.style.opacity = seg(t, tdp - .1, tdp + .2); rc.style.opacity = seg(t, ts - .1, ts + .2); rd.style.opacity = seg(t, te - .1, te + .2); show(krl, seg(t, tk - .2, tk + .2)) } };
  },
  D3_RAKA(s, root) {   // malam di teras: Raka datang dengan helm, kabar kamar diincar, DP besok pagi, tawaran pinjam Rp100 ribu
    const { sc, K } = teras(); const N = nana([1.6, 0, 1.6]); sc.add(N); N.rotation.y = .6; const D = siDompet(sc, [2.2, .52, 1.95], .32); D.rotation.y = -.3;
    const Rk = raka([5, 0, 5.2], { helm: true }); sc.add(Rk); const V = X.TL.vars; const cam = camera(42); const tg = tag(root, 'RAKA');
    const k1 = KARTU(root, '🔑 KAMAR DIINCAR ORANG', 'DP harus masuk BESOK PAGI', { top: 330 });
    const k2 = kartuGelap(root, `<div style="font-size:30px;color:#FFC86B;font-weight:800;letter-spacing:3px">RAKA NAWARIN</div><div style="font-size:66px;font-weight:800">"Gue pinjemin ${rp(V.dp)}"</div>`, { top: 1040 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.46); const w = E.out(seg(t, 0, 1.6)); Rk.position.set(lerp(5.0, 2.4, w), 0, lerp(4.6, 3.6, w)); Rk.rotation.y = w < 1 ? -1.9 : -2.7;
      const ti = at(s, 'diincar', 1.6), tb = at(s, 'besok', dur * .55), tp = at(s, 'minjemin', dur - 1.2);
      Rk.pose(t, { walk: w < 1 ? 1 : 0, talk: t > 1.4, point: t > ti && t < tb + .6, wave: t > tp }); N.pose(t, { look: .5, shake: t > tb && t < tp - .3, nod: t > tp }); duduk(N, -.46); D.mood(t, t > tb ? 'kaget' : 'kecut', 1);
      const p = ease(t, 0, dur); cam.position.set(lerp(2.4, 2.0, p), lerp(2.1, 2.0, p), lerp(8.4, 7.6, p)); cam.lookAt(2.0, 1.1, 2.6);
      tg(Rk, cam, [0, 2.3, 0], seg(t, .6, 1) * (1 - seg(t, ti - .5, ti - .2))); show(k1, seg(t, ti - .2, ti + .2) * (1 - seg(t, tp - .6, tp - .3))); show(k2, seg(t, tp - .2, tp + .2)) } };
  },
  D3_AJAK(s, root) {   // A/B besar; Nana kembali rebahan dengan HP = frame detik 0 (loop)
    const { sc, K } = teras(); const N = nana([0, 0, 0]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .5); D.rotation.set(-Math.PI / 2 + .5, 0, 0);
    const hp = mesh(G.box(.3, .04, .16), '#1C120E', [0, 0, 0]); sc.add(hp); const ly = mesh(G.box(.26, .045, .13), '#FFE6A8', [0, 0, 0], { cast: false, mat: { emissive: '#FFD98A', emissiveIntensity: .8 } }); sc.add(ly);
    const cam = camera(42); const V = X.TL.vars;
    const card = (k, ic, tx, sub, c, top) => center(root, `<span style="display:inline-flex;align-items:center;gap:22px;background:${c};color:#FFF;font-size:60px;padding:14px 40px 16px;border-radius:26px;border:5px solid #FFFFFFAA;box-shadow:0 14px 30px #0007;min-width:760px;justify-content:center;line-height:1.05">
      <span style="background:#FFF;color:${c};border-radius:16px;padding:0 22px;font-size:76px">${k}</span><span style="text-align:left">${ic} ${tx}<br><small style="font-size:36px;opacity:.9">${sub}</small></span></span>`, top);
    const q = center(root, `<span style="font-size:44px;color:#FFF1D2;text-shadow:0 4px 14px #000">DP BESOK PAGI. GIMANA?</span>`, 250);
    const A = card('A', '🤝', 'PINJAM RAKA', `${rp(V.dp)} · jadi utang`, '#2E6FB0', 320), B = card('B', '🍽', 'LEMBUR CUCI PIRING', 'malam ini · nggak tidur', '#C8501E', 520);
    const f = center(root, `<span style="display:inline-block;background:rgba(40,20,10,.9);color:#FFC86B;font-size:40px;padding:10px 28px;border-radius:16px">👤 FOLLOW = +Rp1.000 · ❤ 10 LIKE = +1 XP</span>`, 730);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const ta = at(s, '^A', 1.2), tb = at(s, '^B', 2.6), tf = at(s, 'Follow', dur - 3.4), tl = at(s, 'teras', dur - 1);
      N.pose(t, { talk: true }); rebah(N, 1.6, 1.4); const h = kepala(N); D.position.set(h.x - .5, .53, h.z - .1); D.mood(t, t > tf ? 'senyum' : 'kecut', .3);
      N.userData.st.arms.forEach((A2, i) => { A2.rotation.x = -.3 - (i ? 1.2 : 0); A2.rotation.z = i ? -.3 : .15 }); const th = tangan(N); hp.position.set(th.x, th.y + .18, th.z); ly.position.copy(hp.position).add(new THREE.Vector3(0, .005, 0));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.6, 1.6, p), lerp(3.4, 2.4, p), lerp(8.0, 5.8, p)); cam.lookAt(.55, lerp(1.2, .8, p), 1.4);
      const off = 1 - seg(t, tl - .4, tl); show(q, seg(t, 0, .3) * off); pulse(A, seg(t, ta - .3, ta)); pulse(B, seg(t, tb - .3, tb)); A.style.opacity *= off; B.style.opacity *= off; show(f, seg(t, tf - .2, tf + .2) * off) } };
  },
};

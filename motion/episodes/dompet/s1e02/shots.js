// Shot Dompet S1 Ep 2 "Cuci Piring" (lihat STORYBOARD.md). Lokasi baru: dapur belakang warteg; kembali ke warteg, gang kos, bangku malam.
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SORE, SENJA, SIANG, MALAM, nana, raka, ratna, siDompet, jamaah, kota, warteg, trotoar, gangKos, bangku, duduk, canvasPlane, dapur, menaraPiring,
  BIG, KARTU, show, pulse, ease, tag, hpBesar, at, X } from '../_s1/dunia.js';

const V = new THREE.Vector3();
function pegang(P, D, off = [0, 0, 0]) { P.updateMatrixWorld(true); V.set(0, -.36, .02); P.userData.st.arms[1].userData.elbow.localToWorld(V); D.position.set(V.x + off[0], V.y + off[1], V.z + off[2]) }
function tangan(P, i = 1) { P.updateMatrixWorld(true); const v = new THREE.Vector3(0, -.36, .05); P.userData.st.arms[i].userData.elbow.localToWorld(v); return v }
const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE_D = (x, z) => Math.abs(x) < 16 && z > -14 && z < 14;
const kartuGelap = (root, html, css = {}) => X.ab(Object.assign({ left: 90, top: 320, width: 900, textAlign: 'center', opacity: 0, fontFamily: 'Baloo' }, css), root,
  `<div style="display:inline-block;background:rgba(40,20,10,.9);border-radius:26px;padding:18px 40px 22px;box-shadow:0 14px 30px #0000005c;border:2px solid #ffffff22;color:#FFF1D2">${html}</div>`);
const piring = (parent) => { const m = mesh(G.cyl(.26, .22, .05, 14), '#FFFFFF', [0, 0, 0]); parent.add(m); return m };
const ibuWarteg = p => { const j = jamaah(p, { c: '#E56B8A', skin: '#C98E64' }); j.userData.st.body.add(mesh(G.box(.3, .4, .03), '#FFFFFF', [0, .05, .15], { cast: false })); return j };

export const SHOTS = {
  D2_HOOK(s, root) {   // frame 1 aksi: menara piring setinggi Nana condong ke kamera, Nana menangkap satu piring yang jatuh
    const sc = SIANG(); const K = kota(sc, { hole: HOLE_D }); dapur(sc); const M = menaraPiring(sc, [.6, .08, -.6], 34);
    const N = nana([-.5, .08, .1]); sc.add(N); N.rotation.y = .4; const D = siDompet(sc, [-1.25, .08, .5], .3); D.rotation.y = .4; const P = piring(sc);
    const cam = camera(42); const big = BIG(root, `${X.TL.vars.piring} PIRING`, { top: 330, fontSize: '140px' }); const hr = KARTU(root, 'HARI KE-3', '', { top: 540 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const c = E.out(seg(t, 0, .9)) * .26 + Math.sin(t * 9) * .02 * (1 - seg(t, .9, 1.6)); M.rotation.x = c; M.rotation.z = -c * .3;
      const f = seg(t, .25, 1.05); const h = tangan(N); P.position.set(lerp(.9, h.x, E.in(f)), lerp(2.1, h.y + .05, E.in(f)), lerp(.3, h.z + .1, E.in(f))); P.rotation.set(lerp(1.2, 0, f), 0, lerp(.8, 0, f));
      N.pose(t, { hold: t > 1, cheer: t > .7 && t < 1, talk: t > 1.3 }); D.mood(t, t > .4 ? 'kaget' : 'senyum');
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, 1.2, p), lerp(1.4, 1.5, p), lerp(4.6, 4.0, p)); cam.lookAt(.1, 1.3, -.3);
      pulse(hr, seg(t, .05, .4)); const tt = at(s, 'tiga ratus', dur - 1.2); pulse(big, seg(t, tt - .1, tt + .3)); hr.style.opacity = 1 - seg(t, tt - .3, tt) } };
  },
  D2_REKAP(s, root) {   // depan warteg: papan seri 1-1-1, komen "potong gaji" diterima, Nana salaman dengan Ibu warteg
    const sc = SORE({ sunPos: [-10, 15, 14] }); const K = kota(sc, { hole: HOLE_D }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60);
    const N = nana([.5, .26, 2.4]); sc.add(N); N.rotation.y = -.9; const I = ibuWarteg([-.6, .26, 2.0]); sc.add(I); I.rotation.y = .9; const D = siDompet(sc, [0, 0, 0], .28); const cam = camera(42);
    const rows = [['🍽 CUCI PIRING', 1], ['🍤 GORENGAN', 1], ['🧍 JASA ANTRE', 1]];
    const board = X.ab({ left: 140, top: 290, width: 800, opacity: 0, fontFamily: 'Baloo' }, root, `<div style="background:rgba(40,20,10,.9);border-radius:28px;padding:18px 34px 22px;box-shadow:0 16px 34px #00000060;color:#FFF1D2">
      <div style="font-size:30px;letter-spacing:4px;color:#FFC86B;font-weight:800;text-align:center">HASIL KOMEN EP 1</div>` + rows.map(([a, n], i) => `<div style="display:flex;align-items:center;gap:16px;margin-top:8px">
      <div style="width:350px;font-size:42px;font-weight:800">${a}</div><div style="flex:1;height:30px;background:#ffffff1c;border-radius:15px;overflow:hidden"><div class="b" style="height:100%;width:0;background:#F2C14E;border-radius:15px"></div></div><div style="width:44px;font-size:44px;font-weight:800;text-align:right">${n}</div></div>`).join('') + `</div>`);
    const bars = [...board.querySelectorAll('.b')];
    const pilih = X.ab({ left: 0, top: 640, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '58px', color: '#FFF1D2' }, root, `<span style="display:inline-block;background:#C8501E;border-radius:22px;padding:8px 34px 12px;box-shadow:0 12px 26px #00000055">SERI → Nana pilih: 🍽 CUCI PIRING</span>`);
    const komen = X.ab({ left: 110, top: 330, width: 860, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:flex;gap:18px;align-items:center;background:#FFFFFF;border-radius:30px;padding:18px 26px;box-shadow:0 16px 34px #00000055">
      <div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF);flex:none"></div><div><div style="font-size:24px;color:#8A8A8A;font-weight:700">usul penonton</div>
      <div style="font-size:44px;color:#1E1E1E;font-weight:800;line-height:1.1">"uang makan potong gaji aja"</div></div></div>`);
    const ok = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '96px', color: '#2E9C6A' }, root, `<span style="display:inline-block;border:9px solid #2E9C6A;border-radius:22px;padding:0 34px;background:#FFF6E6e8;transform:rotate(-6deg)">DITERIMA ✔</span>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tu = at(s, 'usul', dur * .55), ts = at(s, 'setuju', dur - 1);
      N.pose(t, { hold: true, talk: t < tu, point: t > tu && t < ts, cheer: t > ts + .2 }); pegang(N, D, [0, .02, .06]); D.mood(t, 'senyum'); I.pose(t, { talk: t > tu, nod: t > ts - .3, wave: t > ts + .2 });
      const p = ease(t, 0, dur); cam.position.set(lerp(1.4, .5, p), lerp(2.2, 2.0, p), lerp(8.6, 6.8, p)); cam.lookAt(0, 1.5, 2.1);
      const tp = at(s, 'cuci piring', 2.6); show(board, seg(t, .05, .4) * (1 - seg(t, tu - .5, tu - .2))); bars.forEach((b, i) => b.style.width = (100 * E.out(seg(t, .3 + i * .15, 1 + i * .15))) + '%');
      pulse(pilih, seg(t, tp - .1, tp + .3)); pilih.style.opacity = seg(t, tp - .1, tp) * (1 - seg(t, tu - .5, tu - .2)); show(komen, seg(t, tu - .2, tu + .2)); pulse(ok, seg(t, ts - .1, ts + .3)) } };
  },
  D2_KERJA(s, root) {   // montase kerja di bak cuci: menara menyusut 300 -> 0, Si Dompet mengelap, bar XP naik
    const sc = SIANG(); const K = kota(sc, { hole: HOLE_D }); dapur(sc); const M = menaraPiring(sc, [-1.3, .08, -2.3], 34); const M2 = menaraPiring(sc, [1.5, .08, -2.6], 34);
    const N = nana([0, .08, -1.75]); sc.add(N); N.rotation.y = Math.PI; const D = siDompet(sc, [1.05, .9, -2.15], .26); D.rotation.y = 2.6; const lap = mesh(G.box(.2, .02, .16), '#E5484D', [0, 0, 0]); sc.add(lap);
    const V2 = X.TL.vars; const cam = camera(44);
    const cnt = kartuGelap(root, `<div style="font-size:30px;letter-spacing:4px;color:#FFC86B;font-weight:800">PIRING KOTOR</div><div class="n" style="font-size:110px;font-weight:800;line-height:1">300</div>`, { top: 300 }); const num = cnt.querySelector('.n');
    const xp = X.ab({ left: 140, top: 1040, width: 800, opacity: 0, fontFamily: 'Baloo' }, root, `<div style="background:#FFFFFFF0;border-radius:24px;padding:14px 26px;box-shadow:0 14px 30px #00000050;color:#4A2410">
      <div style="display:flex;justify-content:space-between;font-size:36px;font-weight:800"><span>🧽 skill CUCI CEPAT</span><span style="color:#C8501E">+${V2.xp_tambah} XP</span></div>
      <div style="height:30px;background:#F2E2C8;border-radius:15px;overflow:hidden;margin-top:8px"><div class="b" style="height:100%;width:0;background:linear-gradient(90deg,#F2C14E,#C8501E);border-radius:15px"></div></div>
      <div style="font-size:28px;font-weight:700;text-align:right;margin-top:4px">${V2.like} like ÷ 10</div></div>`); const bar = xp.querySelector('.b');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const q = seg(t, .2, dur - .8); M.userData.set(Math.round(34 * (1 - q))); M2.userData.set(Math.round(4 + 30 * q)); num.textContent = Math.round(300 * (1 - q));
      N.pose(t, { hold: true }); N.userData.st.arms.forEach((A, i) => { A.rotation.x = -1.1 + Math.sin(t * 12 + i * 3) * .25; A.rotation.z = (i ? -1 : 1) * Math.sin(t * 9 + i) * .2 });
      D.mood(t, 'senyum', .6); D.rotation.z = Math.sin(t * 8) * .15; lap.position.set(D.position.x + Math.sin(t * 8) * .12, D.position.y + .25, D.position.z + .1);
      const a = ease(t, 0, dur); const ang = lerp(-.7, .55, a); cam.position.set(Math.sin(ang) * 4.2, lerp(2.4, 2.0, a), -1.8 + Math.cos(ang) * 4.2); cam.lookAt(0, 1.0, -2.2);
      show(cnt, seg(t, .05, .4)); const tl = at(s, 'like', dur * .5); show(xp, seg(t, tl - .3, tl + .1)); bar.style.width = (100 * E.out(seg(t, tl, dur - .5))) + '%' } };
  },
  D2_REZEKI(s, root) {   // dapur, duduk di peti: HP bunyi, koin meletup, notif +51 follower = +Rp51.000
    const sc = SIANG(); const K = kota(sc, { hole: HOLE_D }); dapur(sc); menaraPiring(sc, [1.5, .08, -2.6], 34);
    const N = nana([-2.8, 0, -1.6]); sc.add(N); N.rotation.y = .6; const D = siDompet(sc, [-2.1, .08, -1.3], .3); D.rotation.y = -.2;
    const hp = mesh(G.box(.16, .3, .02), '#1C120E', [0, 0, 0]); sc.add(hp); const layar = mesh(G.box(.14, .26, .022), '#FFE6A8', [0, 0, 0], { cast: false, mat: { emissive: '#FFD98A', emissiveIntensity: .7 } }); sc.add(layar);
    const coins = Array.from({ length: 8 }, () => coin(sc, [0, -5, 0], .55)); const V2 = X.TL.vars; const cam = camera(42);
    const n1 = X.ab({ left: 120, top: 330, width: 840, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:flex;gap:18px;align-items:center;background:#FFFFFFF2;border-radius:28px;padding:18px 26px;box-shadow:0 16px 34px #00000050">
      <div style="font-size:60px">👤</div><div><div style="font-size:26px;color:#A8401A;font-weight:800;letter-spacing:2px">+${V2.follow} FOLLOWER</div><div style="font-size:52px;color:#4A2410;font-weight:800;line-height:1.1">+${rp(V2.uangf)} masuk</div></div></div>`);
    const wow = BIG(root, rp(V2.saldo), { top: 560, fontSize: '120px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { hold: true, look: .1, cheer: t > at(s, 'masuk', dur - .8) }); duduk(N, -.98 + .5);
      const h = tangan(N); hp.position.set(h.x + .05, h.y + .12, h.z + .1); layar.position.copy(hp.position).add(new THREE.Vector3(0, 0, .012)); hp.rotation.x = layar.rotation.x = -.5; hp.rotation.y = layar.rotation.y = .6;
      const tf = at(s, 'follower', 1.2); layar.material.emissiveIntensity = .5 + .5 * Math.abs(Math.sin(t * 9)) * (t < tf ? 1 : 0);
      coins.forEach((c, i) => { const q = seg(t, tf + i * .1, tf + .9 + i * .1); c.visible = q > 0 && q < 1; c.position.set(hp.position.x + (i - 3.5) * .12, hp.position.y + .1 + q * 1.2, hp.position.z); c.rotation.y = t * 6 });
      D.mood(t, t > tf ? 'senyum' : 'kecut', 1.3); const p = ease(t, 0, dur); cam.position.set(lerp(-.6, -1.0, p), lerp(1.9, 1.7, p), lerp(2.8, 2.0, p)); cam.lookAt(-2.5, 1.0, -1.5);
      show(n1, seg(t, tf - .2, tf + .25)); const tm = at(s, 'masuk', dur - .8); pulse(wow, seg(t, tm - .1, tm + .3)) } };
  },
  D2_RAKA(s, root) {   // depan warteg siang: Raka makan, kabar kamar Bu Ratna bisa dipesan pakai DP
    const sc = SORE({ sunPos: [-10, 15, 14] }); const K = kota(sc, { hole: HOLE_D }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60);
    const N = nana([.5, 0, .7]); sc.add(N); const Rk = raka([-.8, 0, .7], { helm: false }); sc.add(Rk); [[.5, .6], [-.8, .6]].forEach(([x, z]) => sc.add(mesh(G.box(.5, .45, .5), '#5A3A1A', [x, .22, z])));
    const D = siDompet(sc, [1.25, 1.01, 1.45], .34); D.rotation.y = -.4; const pr = group(sc, [-.8, 1.02, 1.35]); pr.add(mesh(G.cyl(.3, .25, .04, 16), '#FFFFFF', [0, 0, 0])); pr.add(mesh(G.sph(.17, 12, 8), '#FAF6EC', [0, .06, 0], { s: [1, .55, 1] }));
    const cam = camera(42); const tg = tag(root, 'RAKA · tetangga kos'); const k = KARTU(root, '🔑 KAMAR BU RATNA', 'bisa dipesan duluan... pakai DP', { top: 340 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.33); duduk(Rk, -.33); const tk = at(s, 'kamar', dur * .5);
      Rk.pose(t, { talk: t > tk - .6, hold: t < tk - .6, look: -.3, point: t > tk && t < tk + 1.2 }); duduk(Rk, -.33); N.pose(t, { look: -.6, nod: t > tk + .4 }); duduk(N, -.33); D.mood(t, t > tk ? 'kaget' : 'senyum');
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.2, -.6, p), lerp(2.0, 1.8, p), lerp(6.4, 5.4, p)); cam.lookAt(-.25, 1.3, .9);
      tg(Rk, cam, [0, 2.0, 0], seg(t, .2, .6) * (1 - seg(t, tk - .5, tk - .2))); show(k, seg(t, tk - .2, tk + .3)) } };
  },
  D2_RATNA(s, root) {   // gang kos: Bu Ratna di gerbang menunjuk papan, kartu DP vs saldo vs gaji Jumat
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -46 && z < 24 }); const Gk = gangKos(sc); const z0 = Gk.kosZ;
    const B = ratna([-1.05, 0, z0 + .2]); sc.add(B); B.rotation.y = .9; const N = nana([.9, 0, z0 + 1.5]); sc.add(N); N.rotation.y = Math.PI + .7; const D = siDompet(sc, [0, 0, 0], .3);
    const V2 = X.TL.vars; const cam = camera(42); const tg = tag(root, 'BU RATNA');
    const dp = kartuGelap(root, `<div style="font-size:34px;letter-spacing:3px;color:#FFC86B;font-weight:800">DP KAMAR</div><div style="font-size:84px;font-weight:800;line-height:1">${rp(V2.dp)}</div><div style="font-size:40px;font-weight:700">lewat <b style="color:#FF8A7A">SABTU</b> = kamar hangus</div>`, { top: 300 });
    const sal = kartuGelap(root, `<div style="font-size:42px;font-weight:700">saldo <b style="color:#FFC86B;font-size:58px">${rp(V2.saldo)}</b></div><div style="font-size:42px;font-weight:700">gaji warteg: <b style="color:#FF8A7A;font-size:58px">JUMAT</b></div>`, { top: 1040 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const td = at(s, 'seratus', 1.6), tsb = at(s, 'Sabtu', dur * .5), tj = at(s, 'Jumat', dur - .8);
      B.pose(t, { talk: true, point: t > tsb - .2 && t < tsb + 1.4, shake: t > tsb + 1.4 }); N.pose(t, { hold: true, look: -.3, shake: t > tj }); pegang(N, D, [0, .02, .06]); D.rotation.y = N.rotation.y; D.mood(t, t > tj ? 'nangis' : t > tsb ? 'kaget' : 'kecut');
      const p = ease(t, 0, dur); cam.position.set(lerp(1.4, 1.1, p), lerp(2.0, 1.8, p), lerp(z0 + 8.4, z0 + 6.2, p)); cam.lookAt(lerp(-.5, -.3, p), 1.6, z0 + .6);
      tg(B, cam, [0, 2.15, 0], seg(t, .1, .5) * (1 - seg(t, td - .4, td - .1))); show(dp, seg(t, td - .2, td + .2)); show(sal, seg(t, tj - .3, tj + .1)) } };
  },
  D2_AJAK(s, root) {   // bangku depan warteg malam (terang): HP besar rumus + 3 pilihan tempat tidur
    const sc = MALAM({ hemi: 1.35, sunI: 1.7 }); const K = kota(sc, { hole: (x, z) => z > -14 && z < 14 && Math.abs(x) < 30, lit: .7 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60); bangku(sc, [-1.2, .25, 6.4]);
    const glow = new THREE.PointLight('#FFD9A0', 6, 12, 1.4); glow.position.set(0, 3.6, 2.4); sc.add(glow);
    const N = nana([-1.5, .25, 6.5]); sc.add(N); const D = siDompet(sc, [-.55, .91, 6.5], .32); const cam = camera(42);
    const hp = hpBesar(root, [['👤', 'FOLLOW', '+Rp1.000 masuk'], ['❤', '10 LIKE', '+1 XP skill'], ['💬', 'KOMEN', 'kalian yang mutusin']], 'Malam ini Nana tidur di mana?', ['🕌<br>TERAS<br><small>masjid lagi</small>', '🍳<br>DAPUR<br><small>warteg</small>', '🔑<br>NEKAT<br><small>DP kos</small>'], { top: 250 });
    const rows = [0, 1, 2].map(i => hp.querySelector('.r' + i)), q = hp.querySelector('.q'), o = hp.querySelector('.o');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.12); N.pose(t, { hold: true, talk: true, look: .3 }); duduk(N, -.12); const tq = at(s, 'Teras', dur - 3); D.mood(t, t > tq ? 'kaget' : 'kecut');
      const p = ease(t, 0, dur); cam.position.set(lerp(-3.4, -2.4, p), lerp(3.2, 2.7, p), lerp(14, 12.4, p)); cam.lookAt(-1, 3.4, 4);
      show(hp, seg(t, .1, .5), 60); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = .25 + .75 * seg(t, tc - .1, tc + .2); rows[i].style.transform = `scale(${1 + .06 * Math.sin(Math.PI * seg(t, tc - .1, tc + .5))})` });
      const tw = at(s, 'tidur', dur - 4); q.style.opacity = seg(t, tw - .3, tw); o.style.opacity = seg(t, tq - .3, tq) } };
  },
};

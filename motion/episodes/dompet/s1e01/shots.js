// Shot Dompet S1 Ep 1 "Tidur di Masjid" (lihat STORYBOARD.md). Lokasi baru: masjid dekat stasiun (malam terang & subuh), pelataran, warteg.
import { THREE, lerp, seg, E, mesh, G, group, camera, coin } from '../../../engine/w3d/kit.js';
import { SORE, SENJA, SIANG, MALAM, SUBUH, nana, siDompet, marbot, jamaah, masjid, kota, krl, peron, kerumunan, lampu, trotoar, warteg, bangku, duduk, canvasPlane,
  BIG, KARTU, show, pulse, ease, tag, hpBesar, at, X } from '../_s1/dunia.js';

const V = new THREE.Vector3();
function pegang(P, D, off = [0, 0, 0]) { P.updateMatrixWorld(true); V.set(0, -.36, .02); P.userData.st.arms[1].userData.elbow.localToWorld(V); D.position.set(V.x + off[0], V.y + off[1], V.z + off[2]) }
const rp = n => 'Rp' + n.toLocaleString('id-ID');
const HOLE_M = (x, z) => Math.abs(x) < 24 && z > -22 && z < 18;
const kartuGelap = (root, html, css = {}) => X.ab(Object.assign({ left: 90, top: 320, width: 900, textAlign: 'center', opacity: 0, fontFamily: 'Baloo' }, css), root,
  `<div style="display:inline-block;background:rgba(40,20,10,.9);border-radius:26px;padding:18px 40px 22px;box-shadow:0 14px 30px #0000005c;border:2px solid #ffffff22;color:#FFF1D2">${html}</div>`);
function rebah(N, x, z, y = .64) { N.rotation.set(0, 0, Math.PI / 2); N.position.set(x, y, z) }   // tidur telentang sepanjang sumbu x (kepala di -x)
function kepala(N) { N.updateMatrixWorld(true); return N.userData.st.head.getWorldPosition(new THREE.Vector3()) }

export const SHOTS = {
  D1_HOOK(s, root) {   // frame 1: komentar penonton sudah tampil, Nana mengangkat struk Rp5.000 di peron
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(z) < 16 && Math.abs(x) < 40 }); peron(sc, [0, 0, 0]); const T = krl(sc, [-14, .25, -2]); T.userData.buka(0);
    const N = nana([-3, 1.1, 2.4]); sc.add(N); N.rotation.y = .2; const D = siDompet(sc, [0, 0, 0], .3);
    const c1 = kerumunan(sc, 14, [-19, 1.8, -8, 4.2], { y: 1.1, s: 1.75, seed: 4 }), c2 = kerumunan(sc, 14, [3, 1.8, 19, 4.2], { y: 1.1, s: 1.75, seed: 8 });
    const struk = canvasPlane(.7, 1.05, (x, W, H) => { x.fillStyle = '#FFFDF4'; x.fillRect(0, 0, W, H); x.fillStyle = '#4A2410'; x.textAlign = 'center'; x.font = `800 ${H * .1}px Poppins`; x.fillText('TIKET KERETA', W / 2, H * .18);
      x.fillStyle = '#C8501E'; x.font = `800 ${H * .17}px Baloo`; x.fillText('Rp5.000', W / 2, H * .45); x.fillStyle = '#4A2410'; x.font = `700 ${H * .07}px Poppins`; x.fillText('±45 km', W / 2, H * .58);
      x.fillStyle = '#9A8A7A'; for (let i = 0; i < 3; i++) x.fillRect(W * .15, H * (.68 + i * .08), W * .7, 4) }, 256); sc.add(struk);
    const komen = X.ab({ left: 110, top: 300, width: 860, opacity: 1, fontFamily: 'Poppins' }, root, `<div style="display:flex;gap:18px;align-items:center;background:#FFFFFF;border-radius:30px;padding:20px 26px;box-shadow:0 16px 34px #00000055">
      <div style="width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF);flex:none"></div><div><div style="font-size:24px;color:#8A8A8A;font-weight:700">komentar penonton</div>
      <div style="font-size:46px;color:#1E1E1E;font-weight:800;line-height:1.1">"mana ada tiket kereta 5k" 🤨</div></div></div>`);
    const tarif = kartuGelap(root, `<div style="font-size:30px;font-weight:700;letter-spacing:3px;color:#FFC86B">TARIF KRL</div><div style="font-size:58px;font-weight:800;line-height:1.1">Rp3.000 · 25 km pertama</div>
      <div style="font-size:50px;font-weight:800;color:#9FE3A0">+Rp1.000 tiap 10 km</div>`, { top: 520 });
    const hasil = BIG(root, `45 km = ${rp(X.TL.vars.tiket)}`, { top: 1040, fontSize: '96px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); c1(t); c2(t); N.pose(t, { hold: true, cheer: t > at(s, 'Ada', .9) && t < at(s, 'Ada', .9) + 1, talk: true, look: .15 }); pegang(N, D, [0, .02, .06]); D.rotation.y = .2; D.mood(t, 'senyum');
      const tl = at(s, 'Tiga', 2.2), tp = at(s, 'pas', dur - 1.6), up = E.back(seg(t, .1, .6)); struk.position.set(-3.45, 2.55 + up * .25, 2.95); struk.rotation.set(0, .2, Math.sin(t * 2) * .05); struk.scale.setScalar(.85 + .25 * seg(t, tp - .2, tp + .2));
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.6, -2.6, p), lerp(2.8, 2.6, p), lerp(9.2, 7.4, p)); cam.lookAt(-3.1, 2.45, 2.4);
      komen.style.opacity = 1 - seg(t, tl - .3, tl) * .65; komen.style.transform = `scale(${1 + .04 * Math.sin(Math.PI * seg(t, 0, .5))})`; show(tarif, seg(t, tl - .2, tl + .3)); pulse(hasil, seg(t, tp - .1, tp + .3)) } };
  },
  D1_SERI(s, root) {   // trotoar senja, kubah masjid di belakang: papan skor voting, stempel SERI lalu MASJID
    const sc = SENJA({ sunI: 2.1 }); const K = kota(sc, { hole: (x, z) => z > -24 && z < 12 && x > -40 && x < 30, lit: .35 }); trotoar(sc, 5.5, 100); const M = masjid(sc, [9, 0, -10], { lampu: .6 }); M.rotation.y = -.35;
    const N = nana([-.6, .25, 5.6]); sc.add(N); N.rotation.y = .6; const D = siDompet(sc, [0, 0, 0], .3); const cam = camera(42); const v = X.TL.vars.vote;
    const rows = [['🚉 STASIUN', v.stasiun], ['🕌 MASJID', v.masjid], ['🖥 WARNET', v.warnet], ['🗑 PINGGIR TPA', v.tpa]];
    const board = X.ab({ left: 130, top: 290, width: 820, opacity: 0, fontFamily: 'Baloo' }, root, `<div style="background:rgba(40,20,10,.9);border-radius:28px;padding:20px 34px 24px;box-shadow:0 16px 34px #00000060;color:#FFF1D2">
      <div style="font-size:30px;letter-spacing:4px;color:#FFC86B;font-weight:800;text-align:center">HASIL KOMEN EP 0</div>` + rows.map(([a, n], i) => `<div class="r${i}" style="display:flex;align-items:center;gap:16px;margin-top:10px">
      <div style="width:330px;font-size:42px;font-weight:800">${a}</div><div style="flex:1;height:34px;background:#ffffff1c;border-radius:17px;overflow:hidden"><div class="b" style="height:100%;width:0;background:${i < 2 ? '#F2C14E' : '#C8501E'};border-radius:17px"></div></div>
      <div style="width:50px;font-size:46px;font-weight:800;text-align:right">${n}</div></div>`).join('') + `</div>`);
    const bars = rows.map((r, i) => board.querySelector(`.r${i} .b`));
    const st1 = X.ab({ left: 0, top: 1150, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '120px', color: '#E5484D' }, root, `<span style="display:inline-block;border:10px solid #E5484D;border-radius:24px;padding:0 40px;background:#FFF6E6e0;transform:rotate(-8deg)">SERI!</span>`);
    const st2 = X.ab({ left: 0, top: 900, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '62px', color: '#FFF1D2' }, root, `<span style="display:inline-block;background:#2E8B57;border-radius:22px;padding:8px 34px 12px;box-shadow:0 12px 26px #00000055">Nana yang mutusin: 🕌 MASJID</span>`);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { hold: true, look: t > at(s, 'deket', dur - 1.5) ? .8 : -.2, talk: true }); pegang(N, D, [0, .02, .06]); D.rotation.y = .6;
      const ts = at(s, 'seri', 1.2), tm = at(s, 'deket', dur - 1.5) - .5; D.mood(t, t > tm ? 'senyum' : t > ts ? 'kaget' : 'kecut');
      const a = ease(t, tm - 1, dur); cam.position.set(lerp(.4, 3.2, a), lerp(2.2, 3.6, a), lerp(11.5, 13, a)); cam.lookAt(lerp(-.4, 5.5, a), lerp(1.7, 4.5, a), lerp(5.4, -6, a));
      show(board, seg(t, .1, .5) * (1 - seg(t, tm - .5, tm - .1))); rows.forEach((r, i) => bars[i].style.width = (r[1] / 2 * 100 * E.out(seg(t, .4 + i * .15, 1.2 + i * .15))) + '%');
      pulse(st1, seg(t, ts - .05, ts + .3)); st1.style.opacity = seg(t, ts - .05, ts) * (1 - seg(t, tm - .5, tm - .1)); pulse(st2, seg(t, tm - .1, tm + .3)) } };
  },
  D1_TIDUR(s, root) {   // malam (tetap terang): drone turun dari kubah ke teras, Nana rebahan, Si Dompet jadi bantal
    const sc = MALAM(); const K = kota(sc, { hole: HOLE_M, lit: .7, rail: -46 }); const M = masjid(sc, [0, 0, 0], { lampu: 1 });
    const N = nana([0, 0, 0]); sc.add(N); rebah(N, 1.6, 1.4); const D = siDompet(sc, [0, 0, 0], .5); D.rotation.set(-Math.PI / 2 + .5, 0, 0);
    const moon = mesh(G.sph(2.2, 20, 14), '#FFF6D8', [-30, 46, -80], { cast: false, mat: { emissive: '#FFF0C0', emissiveIntensity: .9 } }); sc.add(moon);
    const cam = camera(42); const lb = tag(root, 'MALAM 1 · teras masjid'); const zz = BIG(root, 'z z z', { top: 560, fontSize: '90px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, {}); rebah(N, 1.6, 1.4); N.userData.st.arms.forEach(A => { A.rotation.x = -.3; A.rotation.z = .15 }); const h = kepala(N); D.position.set(h.x - .5, .53, h.z - .1);
      const tp = at(s, 'protes', dur - 1.2); D.mood(t, t > tp - .3 ? 'kecut' : 'senyum', .3);
      const a = E.inout(seg(t, 0, dur * .72)); cam.position.set(lerp(-2, 2.6, a), lerp(24, 2.0, a), lerp(32, 5.4, a)); cam.lookAt(lerp(0, .4, a), lerp(6, .7, a), lerp(-4, 1.4, a));
      lb(N, cam, [0, 1.1, 0], seg(t, 1.2, 1.6) * (1 - seg(t, dur - 1, dur - .6))); const tb = at(s, 'bantal', dur - 2.4); pulse(zz, seg(t, tb, tb + .3)); zz.style.transform += ` translateY(${-Math.sin(t * 2) * 8}px)` } };
  },
  D1_SUBUH(s, root) {   // subuh pink-biru: Pak Marbot datang menepuk, Nana bangun kaget lalu duduk
    const sc = SUBUH(); const K = kota(sc, { hole: HOLE_M, lit: .45, rail: -46 }); masjid(sc, [0, 0, 0], { lampu: .8 });
    const N = nana([0, 0, 0]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .3); const P = marbot([-4, .52, 1.0]); sc.add(P); P.rotation.y = Math.PI / 2;
    const cam = camera(42); const jam = BIG(root, '04.30', { top: 330, fontSize: '150px' }); const tg = tag(root, 'PAK MARBOT'); const ajak = BIG(root, '"subuhan, Neng"', { top: 560, fontSize: '76px' });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tb = at(s, 'bangunin', 2), tu = at(s, 'subuhan', dur - 1.2); const w = E.out(seg(t, 0, tb));
      P.position.x = lerp(-4, -.2, w); P.pose(t, { walk: w < 1 ? 1 : 0, point: t > tb && t < tu, wave: t > tu, talk: t > tb });
      const up = E.inout(seg(t, tb + .5, tb + 1.3)); N.pose(t, { look: up > .5 ? .6 : 0, talk: false });
      if (up < 1) { N.rotation.set(0, 0, Math.PI / 2 * (1 - up)); N.position.set(1.6 + up * .2, .64 - up * .12, 1.4) } else { N.rotation.set(0, -Math.PI / 2 + .6, 0); duduk(N, -.46); N.position.x = 1.1 }
      const h = kepala(N); if (up < .3) { D.rotation.set(-Math.PI / 2 + .35, 0, 0); D.position.set(h.x - .32, .53, h.z - .12) } else { D.rotation.set(0, .2, 0); D.position.set(1.7, .52, 1.9) } D.mood(t, up > .3 ? 'kaget' : 'senyum', .3);
      const p = ease(t, 0, dur); cam.position.set(lerp(1.8, 1.4, p), lerp(1.9, 1.7, p), lerp(8.4, 7.0, p)); cam.lookAt(lerp(.8, .8, p), 1.05, 1.2);
      pulse(jam, seg(t, .1, .4)); jam.style.opacity = 1 - seg(t, tu - .6, tu - .2); tg(P, cam, [0, 2.2, 0], seg(t, tb - .4, tb) * (1 - seg(t, tu - .5, tu - .2))); pulse(ajak, seg(t, tu - .1, tu + .3)) } };
  },
  D1_JAMAAH(s, root) {   // pelataran pagi: ibu-ibu jamaah bermukena mengerubungi Nana, gelembung pertanyaan, "CARI KERJA" menyebar
    const sc = SIANG({ sunPos: [-14, 12, 14] }); const K = kota(sc, { hole: HOLE_M, rail: -46 }); masjid(sc, [0, 0, 0]);
    const N = nana([0, .4, 5.3]); sc.add(N); const D = siDompet(sc, [0, 0, 0], .28);
    const J = [[-1.3, 4.6, '#F7F5EE'], [1.3, 4.7, '#EAF2FA'], [-.9, 6.4, '#FBEFF2'], [1.1, 6.3, '#F7F5EE']].map(([x, z, c], i) => { const j = jamaah([x, .4, z], { c, skin: ['#D9A07A', '#C98E64', '#E2A97E', '#B97A52'][i] }); sc.add(j); j.lookAt(0, .4, 5.4); return j });
    const crowd = kerumunan(sc, 24, [-7, -.5, 7, 2.6], { y: .5, s: 1.6, seed: 12 });
    const Q = ['dari mana, Neng?', 'udah makan?', 'kerjanya apa?', 'ngekos di mana?'].map(q => tag(root, q)); const cam = camera(44);
    const kerja = BIG(root, '📣 NANA CARI KERJA', { top: 340, fontSize: '84px' }); const lima = KARTU(root, '5 menit kemudian', '', { top: 520 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); crowd(t); const tk = at(s, 'cari kerja', dur - 1.4), t5 = at(s, 'Lima', dur - 3);
      N.pose(t, { hold: true, talk: t > 1 && t < t5, nod: t > tk, look: Math.sin(t * 1.3) * .6 }); pegang(N, D, [0, .02, .06]); D.mood(t, t > tk ? 'kaget' : 'senyum');
      J.forEach((j, i) => j.pose(t + i, { talk: t > .5 + i * .5, point: i === 2 && t > tk, cheer: i === 1 && t > tk + .3 }));
      const a = ease(t, 0, dur); const ang = lerp(-.55, .5, a), r = lerp(7.4, 6.2, a); cam.position.set(Math.sin(ang) * r, lerp(2.6, 3.0, a), 5.4 + Math.cos(ang) * r); cam.lookAt(0, 1.5, 5.4);
      Q.forEach((q, i) => q(J[i], cam, [0, 2.25, 0], seg(t, .4 + i * .7, .7 + i * .7) * (1 - seg(t, t5 - .5, t5 - .2)))); show(lima, seg(t, t5 - .2, t5 + .2) * (1 - seg(t, tk - .4, tk - .1))); pulse(kerja, seg(t, tk - .1, tk + .3)) } };
  },
  D1_REZEKI(s, root) {   // anak tangga masjid: HP berbunyi, notif follow (+Rp6.000) & like (+16 XP), koin & bintang meletup
    const sc = SIANG({ sunPos: [-14, 12, 14] }); const K = kota(sc, { hole: HOLE_M, rail: -46 }); masjid(sc, [0, 0, 0]);
    const N = nana([0, 0, 3.25]); sc.add(N); N.rotation.y = 0; const D = siDompet(sc, [.75, .52, 3.05], .3); D.rotation.y = -.3;
    const hp = mesh(G.box(.16, .3, .02), '#1C120E', [0, 0, 0]); sc.add(hp); const layar = mesh(G.box(.14, .26, .022), '#FFE6A8', [0, 0, 0], { cast: false, mat: { emissive: '#FFD98A', emissiveIntensity: .7 } }); sc.add(layar);
    const coins = Array.from({ length: 6 }, () => { const c = coin(sc, [0, -5, 0], .55); return c });
    const V2 = X.TL.vars; const cam = camera(40);
    const notif = (ic, a, b, top) => X.ab({ left: 120, top, width: 840, opacity: 0, fontFamily: 'Poppins' }, root, `<div style="display:flex;gap:18px;align-items:center;background:#FFFFFFF2;border-radius:28px;padding:18px 26px;box-shadow:0 16px 34px #00000050">
      <div style="font-size:60px">${ic}</div><div><div style="font-size:26px;color:#A8401A;font-weight:800;letter-spacing:2px">${a}</div><div style="font-size:46px;color:#4A2410;font-weight:800;line-height:1.1">${b}</div></div></div>`);
    const n1 = notif('👤', `+${V2.follow} FOLLOWER`, `+${rp(V2.uangf)} masuk`, 330), n2 = notif('❤', `${V2.like} LIKE`, `skill +${V2.xp} XP`, 520);
    return { scene: sc, cam, upd(t, dur) { K.tick(t); N.pose(t, { hold: true, look: .1, cheer: t > at(s, 'XP', dur - .8) }); duduk(N, -.46);
      N.updateMatrixWorld(true); V.set(0, -.36, .1); N.userData.st.arms[1].userData.elbow.localToWorld(V); hp.position.set(V.x - .1, V.y + .12, V.z + .12); layar.position.copy(hp.position).add(new THREE.Vector3(0, 0, .012)); hp.rotation.x = layar.rotation.x = -.5;
      const tf = at(s, 'follower', 1.6), tl = at(s, 'like', dur - 2.4); layar.material.emissiveIntensity = .5 + .5 * Math.abs(Math.sin(t * 9)) * (t > .3 && t < 1.2 ? 1 : 0);
      coins.forEach((c, i) => { const q = seg(t, tf + i * .12, tf + .9 + i * .12); c.visible = q > 0 && q < 1; c.position.set(hp.position.x + (i - 2.5) * .12, hp.position.y + .1 + q * 1.1, hp.position.z); c.rotation.y = t * 6 });
      D.mood(t, t > tf ? 'senyum' : 'kecut', 1.3); const p = ease(t, 0, dur); cam.position.set(lerp(2.4, 1.7, p), lerp(2.1, 1.9, p), lerp(8.8, 7.6, p)); cam.lookAt(.2, 1.0, 3.2);
      show(n1, seg(t, tf - .2, tf + .25)); show(n2, seg(t, tl - .2, tl + .25)) } };
  },
  D1_INFO(s, root) {   // warteg ujung jalan: papan DICARI TUKANG CUCI PIRING, menara piring kotor bergoyang
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -12 && z < 14 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60);
    const papan = canvasPlane(1.7, 1.25, (x, W, H) => { x.fillStyle = '#FFF6E6'; x.fillRect(0, 0, W, H); x.strokeStyle = '#2E6FB0'; x.lineWidth = 14; x.strokeRect(7, 7, W - 14, H - 14); x.textAlign = 'center'; x.fillStyle = '#E5484D';
      x.font = `800 ${H * .17}px Baloo`; x.fillText('DICARI!', W / 2, H * .24); x.fillStyle = '#1F4E79'; x.font = `800 ${H * .13}px Baloo`; x.fillText('TUKANG CUCI PIRING', W / 2, H * .46); x.fillStyle = '#C8501E'; x.font = `800 ${H * .17}px Baloo`; x.fillText('Rp50.000/hari', W / 2, H * .72) }, 512);
    papan.position.set(2.6, 2.1, .25); sc.add(papan);
    const tumpuk = group(sc, [2.2, .26, -1.3]); for (let i = 0; i < 26; i++) tumpuk.add(mesh(G.cyl(.26, .22, .05, 14), i % 5 === 2 ? '#F2E6C8' : '#FFFFFF', [Math.sin(i * 1.7) * .04, .03 + i * .06, Math.cos(i * 1.3) * .04]));
    const N = nana([-.4, .25, 5.6]); sc.add(N); const Jm = jamaah([-1.3, .25, 5.4]); sc.add(Jm); Jm.rotation.y = .5; const D = siDompet(sc, [0, 0, 0], .28); const cam = camera(42);
    const gaji = KARTU(root, rp(X.TL.vars.cuci), 'sehari', { top: 340 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const w = E.out(seg(t, 0, dur * .5)); N.position.z = lerp(6.2, 3.4, w); Jm.position.z = lerp(6, 3.6, w); N.pose(t, { walk: w < 1 ? 1 : 0, hold: true, cheer: t > at(s, 'lima puluh', dur - 1.4) + .3 });
      Jm.pose(t, { walk: w < 1 ? 1 : 0, point: w > .6, talk: true }); pegang(N, D, [0, .02, .06]); D.mood(t, t > at(s, 'lima puluh', dur - 1.4) ? 'senyum' : 'kecut');
      tumpuk.rotation.z = Math.sin(t * 2.4) * .04; tumpuk.rotation.x = Math.cos(t * 1.9) * .03;
      const p = ease(t, 0, dur); cam.position.set(lerp(-1.2, .6, p), lerp(2.4, 2.1, p), lerp(11.5, 7.4, p)); cam.lookAt(lerp(.4, 1.6, p), lerp(1.7, 1.8, p), 0);
      const tl = at(s, 'lima puluh', dur - 1.4); pulse(gaji, seg(t, tl - .1, tl + .3)) } };
  },
  D1_JUMAT(s, root) {   // warteg close-up: pemilik menunjuk kalender BAYAR JUMAT, Si Dompet kaget, kartu saldo vs kos Sabtu
    const sc = SORE(); const K = kota(sc, { hole: (x, z) => Math.abs(x) < 16 && z > -12 && z < 14 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60);
    const Pw = jamaah([2.0, .26, -.4], { c: '#E56B8A', skin: '#C98E64' }); sc.add(Pw); Pw.rotation.y = -.5; Pw.userData.st.body.add(mesh(G.box(.3, .4, .03), '#FFFFFF', [0, .05, .15], { cast: false }));
    const kal = canvasPlane(1.1, 1.3, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#E5484D'; x.fillRect(0, 0, W, H * .2); x.fillStyle = '#FFFFFF'; x.textAlign = 'center'; x.font = `800 ${H * .12}px Baloo`; x.fillText('GAJIAN', W / 2, H * .14);
      const d = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN']; d.forEach((n, i) => { const cx = W * (.12 + (i % 4) * .25), cy = H * (.4 + Math.floor(i / 4) * .3); x.fillStyle = n === 'JUM' ? '#E5484D' : '#4A2410'; x.font = `800 ${H * .09}px Baloo`; x.fillText(n, cx, cy);
        if (n === 'JUM') { x.strokeStyle = '#E5484D'; x.lineWidth = 9; x.beginPath(); x.arc(cx, cy - H * .03, W * .12, 0, 7); x.stroke() } }) }, 512); kal.position.set(1.9, 2.5, -2.05); sc.add(kal);
    const N = nana([.6, .26, .9]); sc.add(N); N.rotation.y = .55; const D = siDompet(sc, [0, 0, 0], .3); const cam = camera(42); const V2 = X.TL.vars;
    const jm = BIG(root, 'BAYAR: JUMAT', { top: 330, fontSize: '110px' });
    const card = kartuGelap(root, `<div style="font-size:42px;font-weight:700">saldo <b style="color:#FFC86B;font-size:60px">${rp(V2.saldo)}</b></div><div style="font-size:42px;font-weight:700">Sabtu kos <b style="color:#FF8A7A;font-size:60px">${rp(V2.kos)}</b></div>
      <div style="font-size:42px;font-weight:700">makan: <b style="color:#FF8A7A;font-size:60px">HARI INI</b></div>`, { top: 1020 });
    return { scene: sc, cam, upd(t, dur) { K.tick(t); const tj = at(s, 'Jumat', 1.4), ts = at(s, 'Sabtu', dur - 3); Pw.pose(t, { point: t > tj - .3 && t < tj + 1.4, talk: true }); N.pose(t, { hold: true, shake: t > ts, look: t > tj ? -.5 : 0 }); pegang(N, D, [0, .02, .06]);
      D.rotation.y = .55; D.mood(t, t > tj ? (t > ts ? 'nangis' : 'kaget') : 'senyum');
      const p = ease(t, 0, dur); cam.position.set(lerp(-.6, -.2, p), lerp(2.2, 2.0, p), lerp(6.4, 5.2, p)); cam.lookAt(lerp(1.4, 1.2, p), lerp(1.9, 1.7, p), -.4);
      pulse(jm, seg(t, tj - .1, tj + .3)); jm.style.opacity = seg(t, tj - .1, tj) * (1 - seg(t, dur - .6, dur - .2)); show(card, seg(t, ts - .3, ts + .2)) } };
  },
  D1_AJAK(s, root) {   // bangku depan warteg, senja: HP besar rumus + 3 pilihan kerja
    const sc = SENJA({ sky: ['#7A7FD0', '#FFB27E'], sunI: 1.9, hemi: 1.1 }); const K = kota(sc, { hole: (x, z) => z > -14 && z < 14 && Math.abs(x) < 30, lit: .5 }); warteg(sc, [0, 0, 0]); trotoar(sc, 7, 60); bangku(sc, [-1.2, .25, 6.4]);
    const N = nana([-1.5, .25, 6.5]); sc.add(N); const D = siDompet(sc, [-.55, .91, 6.5], .32); const cam = camera(42);
    const hp = hpBesar(root, [['👤', 'FOLLOW', '+Rp1.000 masuk'], ['❤', '10 LIKE', '+1 XP skill'], ['💬', 'KOMEN', 'kalian yang mutusin']], 'Nana ambil kerja yang mana?', ['🍽<br>CUCI PIRING<br><small>dibayar Jumat</small>', '🍤<br>GORENGAN<br><small>titipan</small>', '🧍<br>JASA<br><small>antre</small>'], { top: 250 });
    const rows = [0, 1, 2].map(i => hp.querySelector('.r' + i)), q = hp.querySelector('.q'), o = hp.querySelector('.o');
    return { scene: sc, cam, upd(t, dur) { K.tick(t); duduk(N, -.12); N.pose(t, { hold: true, talk: true, look: .3 }); duduk(N, -.12); const tq = at(s, 'Cuci', dur - 3); D.mood(t, t > tq ? 'kaget' : 'kecut');
      const p = ease(t, 0, dur); cam.position.set(lerp(-3.4, -2.4, p), lerp(3.2, 2.7, p), lerp(14, 12.4, p)); cam.lookAt(-1, 3.4, 4);
      show(hp, seg(t, .1, .5), 60); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = .25 + .75 * seg(t, tc - .1, tc + .2); rows[i].style.transform = `scale(${1 + .06 * Math.sin(Math.PI * seg(t, tc - .1, tc + .5))})` });
      const tw = at(s, 'mana', dur - 4); q.style.opacity = seg(t, tw - .3, tw); o.style.opacity = seg(t, tq - .3, tq) } };
  },
};

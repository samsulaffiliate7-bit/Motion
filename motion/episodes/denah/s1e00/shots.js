// Shot Denah S1 Ep 0 "Rumah Nol" (lihat STORYBOARD.md). Bumi -> Jawa; kamera khas tampak atas (denah) lalu menukik.
import { THREE, mesh, G, group, camera, newScene, ll2v } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/rumahdunia.js';
import { PAGI, SIANG, SORE, dena, mandor, lokasiProyek, rumahMini, bumi, JAWA_LL, gridDenah, BIG, LABEL, tagNama, tempel, show, pulse, ease, lumpur, lerp, seg, E } from '../_s1/dunia.js';

const UP = new THREE.Vector3(), U0 = new THREE.Vector3(0, 0, -1), U1 = new THREE.Vector3(0, 1, 0);
const papanDOM = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%)', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '40px', color: '#12344F', background: '#FFF6E2', padding: '8px 22px', borderRadius: '12px', boxShadow: '0 8px 20px #0006', whiteSpace: 'nowrap' }, css), root, html);

export const SHOTS = {
  D0_BUMI(s, root) {   // frame 1 aksi: globe berputar cepat, berhenti di Indonesia, dorong masuk ke Jawa; pin kuning; RUMAH: 0
    const sc = newScene({ sky: ['#2E6FC0', '#BFE0F6'], sunPos: [-10, 8, 14], hemi: 1.2, sunI: 2.4 }); const gl = bumi(sc, 5); const pin = gl.pin(...JAWA_LL, '#FF7A3A'); pin.scale.setScalar(.01);
    const cam = camera(40); const h = BIG(root, 'BUMI DI-RESET', { top: 320, fontSize: '104px' });
    const cnt = X.ab({ left: 0, top: 470, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', opacity: 0 }, root,
      `<div style="display:inline-block;background:rgba(18,52,86,.93);border-radius:18px;padding:12px 34px;border:2px solid #FF9F45;box-shadow:0 12px 28px #0006"><span style="font-size:34px;font-weight:700;color:#9FE0B0;letter-spacing:4px">RUMAH DI BUMI: </span><span style="font-size:64px;font-weight:800;color:#FFF6E2">0</span></div>`);
    const jawa = BIG(root, 'PULAU JAWA', { top: 1230, fontSize: '72px', color: '#FFD9A8', letterSpacing: '6px' });
    return { scene: sc, cam, upd(t, dur) { const tj = at(s, 'Pulau Jawa', dur - 2.2); const sp = E.out(seg(t, 0, 2.6));
      gl.face(lerp(25, JAWA_LL[0], sp), JAWA_LL[1] + (1 - sp) * 260); gl.rotation.z = (1 - sp) * .3;
      const z = E.inout(seg(t, 2.4, dur)); cam.position.set(0, lerp(.6, 0, z), lerp(17, 12.5, z)); cam.lookAt(0, lerp(.4, 0, z), 0);
      pin.scale.setScalar(Math.max(.01, E.back(seg(t, tj - .5, tj)) * .55)); pulse(h, seg(t, .05, .4)); show(cnt, seg(t, .6, 1)); if (t > tj - 1) { h.style.opacity = 1 - seg(t, tj - 1, tj - .6); cnt.style.opacity = 1 - seg(t, tj - 1, tj - .6) }
      pulse(jawa, seg(t, tj - .2, tj + .2)) } };
  },
  D0_LAHAN(s, root) {   // KHAS: tampak atas lurus + grid cetak biru, lalu menukik ke Dena yang berjalan membawa gulungan denah
    const sc = PAGI(); const L = lokasiProyek(sc); const D = dena([1.2, 0, 3.4]); sc.add(D); D.rotation.y = Math.PI * .85;
    const grid = gridDenah(root); const nol = BIG(root, '0 RUMAH', { top: 560, fontSize: '128px' }); const cam = camera(44); const tD = tagNama(root, 'DENA', 'arsitek baru lulus');
    return { scene: sc, cam, upd(t, dur) { const w = seg(t, 0, dur * .7); D.position.set(lerp(1.2, .6, w), 0, lerp(3.6, 2.4, w)); D.pose(t, { walk: w < 1 ? 1 : 0, talk: w >= 1, look: Math.sin(t * .8) * .4 }); if (w >= 1) D.rotation.y = lerp(Math.PI * .85, .25, E.inout(seg(t, dur * .7, dur * .7 + .5))); L.J.angin(t);
      const sw = E.inout(seg(t, .4, dur * .72)); cam.position.set(lerp(.6, 2.2, sw), lerp(110, 2.3, sw), lerp(1.5, 9.4, sw)); UP.copy(U0).lerp(U1, E.out(seg(sw, 0, .5))).normalize(); cam.up.copy(UP);
      cam.lookAt(lerp(.6, .3, sw), lerp(0, 1.4, sw), lerp(1.5, 1.4, sw)); grid(.85 * (1 - seg(t, 1.6, 3.4)));
      tempel(tD, D, cam, [0, 2.2, 0], seg(t, at(s, 'Dena', 1) + .2, at(s, 'Dena', 1) + .6) * (1 - seg(t, at(s, 'lahannya', 3), at(s, 'lahannya', 3) + .4)));
      const tn = at(s, 'Nol', dur - 1.6); pulse(nol, seg(t, tn - .1, tn + .3)) } };
  },
  D0_MANDOR(s, root) {   // Pak Mandor ngopi di bale bawah terpal biru, berdiri dan melambai santai
    const sc = SIANG(); const L = lokasiProyek(sc); const M = mandor([-5.4, 0, -.9], { kopi: true }); sc.add(M); const D = dena([-2.6, 0, 1.4]); sc.add(D); D.rotation.y = -1.1; const cam = camera(42);
    const tM = tagNama(root, 'PAK MANDOR', 'tukang paling senior'), satu = papanDOM(root, '(satu-satunya)', { fontSize: '34px', background: '#FF9F45', color: '#12344F' });
    return { scene: sc, cam, upd(t, dur) { const tp = at(s, 'Pak Mandor', 1.5), ts = at(s, 'soalnya', dur - 2); const up = seg(t, tp, tp + .6);
      M.position.y = lerp(-.32, 0, up); M.userData.st.legs.forEach(Lg => { Lg.rotation.x = lerp(-1.45, 0, up); Lg.userData.knee.rotation.x = lerp(1.45, 0, up) }); M.rotation.y = lerp(.3, .6, up);
      M.pose(t, { wave: t > tp + .6 && t < ts, talk: t > ts, nod: t > ts + .4 }); if (up < 1) { M.userData.st.legs.forEach(Lg => { Lg.rotation.x = lerp(-1.45, 0, up); Lg.userData.knee.rotation.x = lerp(1.45, 0, up) }) }
      D.pose(t, { talk: t < tp, look: .3 }); L.J.angin(t);
      const p = ease(t, 0, dur); const z = seg(t, tp - .3, tp + .8); cam.position.set(lerp(-1.4, -2.6, z), lerp(2.2, 1.8, z), lerp(7.8, 4.4, z) + (1 - p) * .4); cam.lookAt(lerp(-4.2, -5.2, z), 1.2, lerp(-.6, -1, z));
      tempel(tM, M, cam, [0, 2.2, 0], seg(t, tp + .3, tp + .7)); tempel(satu, M, cam, [0, 2.95, 0], seg(t, ts, ts + .3)) } };
  },
  D0_UKUR(s, root) {   // denah milimeter (overlay cetak biru) vs Pak Mandor ngukur pakai langkah kaki; Dena panik
    const sc = SIANG(); const L = lokasiProyek(sc); const D = dena([-.5, 0, 3.0]); sc.add(D); D.rotation.y = .4; const M = mandor([-1.2, 0, .6]); sc.add(M); M.rotation.y = Math.PI / 2; const cam = camera(42);
    const V = X.TL.vars; const bp = X.ab({ left: 110, top: 300, width: 860, height: 600, opacity: 0, background: '#1F5FAF', borderRadius: '10px', boxShadow: '0 18px 40px #0007', border: '6px solid #FFF6E2', overflow: 'hidden', fontFamily: 'Poppins,sans-serif' }, root,
      `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffffff22 0 1px,transparent 1px 30px),repeating-linear-gradient(0deg,#ffffff22 0 1px,transparent 1px 30px)"></div>
       <div style="position:absolute;left:150px;top:140px;width:560px;height:330px;border:6px solid #fff"></div><div style="position:absolute;left:150px;top:300px;width:300px;height:6px;background:#fff"></div><div style="position:absolute;left:450px;top:140px;width:6px;height:166px;background:#fff"></div>
       <div style="position:absolute;left:150px;top:80px;width:560px;text-align:center;color:#fff;font-size:44px;font-weight:800">|← ${V.mm.toLocaleString('id-ID')} mm →|</div>
       <div style="position:absolute;left:24px;top:24px;color:#9FE0B0;font-size:24px;letter-spacing:4px;font-weight:700">DENAH RUMAH 01 · SKALA 1:50</div>`);
    const lk = X.ab({ left: 0, top: 960, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '84px', color: '#FFF6E2', textShadow: '0 6px 0 #12344F, 0 14px 30px #0008', opacity: 0 }, root, '');
    const kira = papanDOM(root, '"kira-kira lima meter"', { fontSize: '36px', fontStyle: 'italic' });
    return { scene: sc, cam, upd(t, dur) { const tm = at(s, 'milimeter', 2.2), tl = at(s, 'langkah', 4.5), tt = at(s, 'teori', dur - 3.5);
      const w = seg(t, tl - .2, tl + 2.4); M.position.x = lerp(-1.2, 1.5, w); M.pose(t, { langkah: w > 0 && w < 1, talk: t > tt, point: t > tt + 1.2 && t < tt + 2.2 }); if (w >= 1) M.rotation.y = lerp(Math.PI / 2, -.4, seg(t, tl + 2.4, tl + 2.9));
      D.pose(t, { hold: t < tl, panik: t > tt + .2, talk: t < tl }); L.J.angin(t);
      const n = w > 0 ? Math.min(V.langkah, 1 + Math.floor(w * V.langkah)) : 0; lk.innerHTML = n ? `👣 ${n} langkah` : ''; lk.style.opacity = w > 0 ? 1 - seg(t, tt + 1.4, tt + 1.8) : 0;
      const p = ease(t, 0, dur), z = seg(t, tt - .2, tt + .6); cam.position.set(lerp(.8, .4, p), lerp(2.4, 2.2, p), lerp(11.2, 10.4, p) - z * 1.2); cam.lookAt(.3, 1.15, lerp(1.4, 2, z));
      show(bp, seg(t, tm - .6, tm - .2) * (1 - seg(t, tl - .4, tl))); tempel(kira, M, cam, [0, 2.3, 0], seg(t, tt - .1, tt + .2) * (1 - seg(t, tt + 2.6, tt + 3))) } };
  },
  D0_HUJAN(s, root) {   // awan hujan datang dari arah gunung; hitung mundur hujan pertama; beberapa tetes air
    const sc = SORE({ sky: ['#6F96D0', '#F6DDBA'] }); const L = lokasiProyek(sc); const D = dena([.4, 0, 2.2]); sc.add(D); D.rotation.y = Math.PI * .9; const M = mandor([-1.4, 0, 1.4]); sc.add(M); M.rotation.y = Math.PI * 1.1; const cam = camera(42);
    const mendung = Array.from({ length: 14 }, (_, i) => { const g = group(sc, [0, 0, 0]); [[0, 0, 0, 6], [5, -1, 1, 4.5], [-5, -1.2, 0, 4.2], [2, 2.2, -1, 4]].forEach(([x, y, z, r]) => g.add(mesh(G.ico(r, 1), i % 2 ? '#8A93A6' : '#9AA2B2', [x, y, z], { cast: false, mat: { flatShading: false } }))); return g });
    const tetes = Array.from({ length: 30 }, () => { const m = mesh(G.box(.03, .3, .03), '#B8DCF2', [0, -5, 0], { cast: false }); sc.add(m); return m });
    const V = X.TL.vars; const cd = X.ab({ left: 0, top: 320, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', opacity: 0 }, root,
      `<div style="display:inline-block;background:rgba(18,52,86,.93);border:3px solid #9FE0B0;border-radius:22px;padding:20px 44px;box-shadow:0 14px 30px #0006"><div style="font-size:30px;font-weight:700;color:#9FE0B0;letter-spacing:5px">🌧️ HUJAN PERTAMA</div><div style="font-size:92px;font-weight:800;color:#FFF6E2;line-height:1.05">${V.hujan} HARI LAGI</div></div>`);
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'kehujanan', dur - 1.6); mendung.forEach((g, i) => g.position.set(-60 + (i % 7) * 20 + Math.sin(i) * 6, 30 + (i % 3) * 4, lerp(-160, -70, seg(t, 0, dur)) + Math.floor(i / 7) * 22));
      tetes.forEach((m, i) => { const q = (t * 1.3 + i / 30) % 1; m.visible = t > tk - .3; m.position.set(-3 + (i * 37 % 60) / 10, 6 - q * 6, -1 + (i * 61 % 50) / 10) });
      D.pose(t, { look: 0, talk: t < tk, shake: t > tk }); D.userData.st.head.rotation.x = -.35 * seg(t, .5, 1.5); M.pose(t, { look: -.2 }); M.userData.st.head.rotation.x = -.3 * seg(t, .8, 1.8); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(.8, .4, p), lerp(1.0, .9, p), lerp(7.6, 6.6, p)); cam.lookAt(-.3, lerp(2.2, 3.2, p), -2);
      show(cd, seg(t, at(s, 'Tiga hari', 3) - .3, at(s, 'Tiga hari', 3) + .2)) } };
  },
  D0_SAWAH(s, root) {   // papan PENDUDUK 2, bata 0 -> geser ke sawah: Pak Mandor mencangkul fondasi di tengah sawah; Dena tepuk jidat
    const sc = SIANG(); const L = lokasiProyek(sc); const M = mandor([3.2, 0, -9.6], { cangkul: true }); sc.add(M); M.rotation.y = -.5; const D = dena([1.5, 0, -7.8]); sc.add(D); D.rotation.y = 2.4;
    const mud = lumpur(sc); sc.add(mesh(G.cyl(.7, .7, .03, 14), '#6A4A2A', [3.6, .03, -9.2], { cast: false })); const cam = camera(42);
    const st = LABEL(root, '👥 2 · 🏠 0', 'penduduk dua, rumah nol', 330); const sw = papanDOM(root, 'FONDASI?! 😱', { fontSize: '44px', background: '#FF9F45' });
    return { scene: sc, cam, upd(t, dur) { const tw = at(s, 'Pak Mandor', 2.8), tg = at(s, 'tengah sawah', dur - 1.6); const pan = ease(t, tw - .6, tw + .8);
      M.pose(t, { gali: true }); mud(t, [3.6, .05, -9.2], true); D.pose(t, { facepalm: t > tg - .1, talk: t < tg }); L.J.angin(t);
      cam.position.set(lerp(.2, -.2, pan), lerp(2.4, 2.4, pan), lerp(7.2, -2.4, pan)); cam.lookAt(lerp(3.6, 2.6, pan), lerp(1.9, 1, pan), lerp(-4.2, -9, pan));
      show(st, seg(t, .2, .6) * (1 - seg(t, tw - .4, tw))); tempel(sw, M, cam, [0, 2.4, 0], seg(t, tg - .1, tg + .3)) } };
  },
  D0_AJAK(s, root) {   // meja kayu dengan 3 maket rumah Jawa; aturan main; pertanyaan rumah pertama
    const sc = SORE(); const L = lokasiProyek(sc); const meja = group(sc, [.5, 0, .4]); meja.add(mesh(G.box(4.6, .12, 1.6), '#A8743E', [0, .9, 0])); [[-2.1, -.6], [2.1, -.6], [-2.1, .6], [2.1, .6]].forEach(([x, z]) => meja.add(mesh(G.box(.12, .9, .12), '#7A4E2C', [x, .45, z])));
    const K = ['joglo', 'limasan', 'kampung'].map((k, i) => { const r = rumahMini(meja, [(i - 1) * 1.45, .96, 0], k); r.scale.setScalar(.01); return r });
    const D = dena([-1.7, 0, 1.2]); sc.add(D); D.rotation.y = .6; const M = mandor([2.7, 0, 1.2], { kopi: true }); sc.add(M); M.rotation.y = -.6; const cam = camera(50);
    const NM = ['JOGLO', 'LIMASAN', 'KAMPUNG'].map(n => papanDOM(root, n, { fontSize: '36px', background: 'rgba(18,52,86,.95)', color: '#FFF6E2', border: '2px solid #FF9F45' }));
    const at3 = X.ab({ left: 60, top: 300, width: 960, opacity: 0, fontFamily: 'Poppins,sans-serif' }, root, ['FOLLOW|= 1 penduduk baru', 'LIKE|= 1 tempat tinggal', 'KOMEN|= rumah berikutnya'].map(x => { const [a, b] = x.split('|');
      return `<div class="r" style="display:flex;justify-content:space-between;align-items:center;background:rgba(18,52,86,.93);border:1px solid #ffffff2a;border-radius:14px;padding:12px 30px;margin-bottom:12px;box-shadow:0 10px 22px #0005;opacity:0"><span style="font-size:48px;font-weight:800;color:#FF9F45">${a}</span><span style="font-size:36px;font-weight:700;color:#FFF6E2">${b}</span></div>` }).join(''));
    const q = X.ab({ left: 40, top: 1250, width: 1000, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif', fontSize: '40px', fontWeight: 800, color: '#FFF6E2', textShadow: '0 4px 14px #000' }, root, 'RUMAH PERTAMA DI DUNIA? 👇');
    return { scene: sc, cam, upd(t, dur) { const rows = at3.querySelectorAll('.r'); ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); rows[i].style.opacity = E.out(seg(t, tc - .1, tc + .3)) });
      at3.style.opacity = 1 - seg(t, at(s, 'Joglo', dur - 4) - .8, at(s, 'Joglo', dur - 4) - .4);
      const tk = ['Joglo', 'Limasan', 'Kampung'].map((w, i) => at(s, w, dur - 4 + i)); K.forEach((r, i) => { r.scale.setScalar(Math.max(.01, E.back(seg(t, tk[i] - .2, tk[i] + .25)) * 1)); r.rotation.y = Math.sin(t * .8 + i) * .25 });
      D.pose(t, { point: t > tk[0] - .2 && t < tk[2] + 1, talk: true, cheer: t > tk[2] + 1.2 }); M.pose(t, { nod: t > tk[2], look: -.3 }); L.J.angin(t);
      const p = ease(t, 0, dur), z = seg(t, tk[0] - .8, tk[0]); cam.position.set(lerp(.4, .5, p), lerp(3.4, 2.8, z), lerp(12, 10.5, z)); cam.lookAt(.5, lerp(2.4, 1.5, z), .4);
      K.forEach((r, i) => tempel(NM[i], r, cam, [0, 1.5, 0], seg(t, tk[i], tk[i] + .3))); show(q, seg(t, tk[0] - .4, tk[0])) } };
  },
};

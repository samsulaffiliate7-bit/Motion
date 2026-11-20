// Shot Desa Terakhir S1 video ATURAN MAIN (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SIANG, SENJA, MALAM, gilang, yati, kardi, sinta, warga, zombie, desaTerakhir, SPOT, RF, karung, ikatBambu, kabut, BIG, show, pulse, ease, FONT, BONE, AMBER, RUST } from '../_s1/dunia.js';

const LABEL = (root, a, b) => X.ab({ left: 60, top: 330, width: 960, textAlign: 'center', opacity: 0, fontFamily: FONT }, root,
  `<div style="display:inline-block;background:rgba(30,42,28,.94);color:${BONE};border-radius:12px;padding:14px 34px 18px;box-shadow:0 12px 28px #0000005c;border-bottom:8px solid ${AMBER}">
   <div style="font-size:64px;font-weight:800;color:${AMBER};letter-spacing:3px">${a}</div><div style="font-size:40px;font-weight:700">${b}</div></div>`);
const obor = D => D.obor(1);
const gerombolan = (sc, n, z0, spread, seed = 0) => Array.from({ length: n }, (_, i) => { const k = i + seed; const z = zombie([((k * 37) % (spread * 2)) - spread, 0, z0 + ((k * 53) % 30)], k); z.rotation.y = Math.PI + ((k * 7) % 5 - 2) * .05; sc.add(z); z.userData.z0 = z.position.z; return z });

export const SHOTS = {
  BA_HOOK(s, root) {   // malam terang: drone menukik ke cincin obor, gerombolan zombie di sawah menuju pagar
    const sc = MALAM({ fog: ['#3E4882', 130, 420] }); const D = desaTerakhir(sc); obor(D); const Z = gerombolan(sc, 30, 56, 34);
    sc.userData.warm.position.set(0, 6, RF); sc.userData.warm.intensity = 40; const cam = camera(42); const h = BIG(root, 'ATURAN MAIN', { top: 340, fontSize: '112px' });
    const sub = BIG(root, 'DESA TERAKHIR · SEASON 1', { top: 480, fontSize: '44px', fontWeight: 700, color: AMBER, letterSpacing: '6px', textShadow: '0 4px 14px rgba(0,0,0,.7)' });
    return { scene: sc, cam, upd(t, dur) { Z.forEach(z => { z.shamble(t); z.position.z = z.userData.z0 - t * .5 }); const p = ease(t, 0, dur);
      cam.position.set(lerp(36, 7, p), lerp(70, 7.5, p), lerp(150, 70, p)); cam.lookAt(lerp(0, 0, p), lerp(0, 2.2, p), lerp(0, 50, p)); pulse(h, seg(t, .1, .5)); show(sub, seg(t, .5, .9)) } };
  },
  BA_PREMIS(s, root) {   // siang: Gilang berdiri di menara gerbang, tim di bawah
    const sc = SIANG(); const D = desaTerakhir(sc); D.gate.userData.set(Math.PI / 2 * .95);
    const J = gilang([3.7, 3.37, RF + .2]); J.rotation.y = -.3; sc.add(J); const Y = yati([1.6, 0, RF + 2.6]); Y.rotation.y = .5; const K = kardi([6.8, 0, RF + 2.4]); K.rotation.y = -.9; const S = sinta([3, 0, RF + 3.4]); S.rotation.y = .1; [Y, K, S].forEach(p => sc.add(p));
    const cam = camera(42); const l = LABEL(root, 'TUGAS: BERTAHAN', 'kades kabur · Gilang yang mimpin');
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { talk: true, point: t > at(s, 'mimpin', 2) && t < at(s, 'Tugas', dur - 2) }); Y.pose(t); K.pose(t, { cheer: t > at(s, 'bertahan', dur - 1) }); S.pose(t, { look: .3, bounce: true });
      const p = ease(t, 0, dur); cam.position.set(lerp(5.2, 4.8, p), lerp(1.4, 1.7, p), lerp(55, 53.5, p)); cam.lookAt(3.5, lerp(3.6, 3.3, p), RF); show(l, seg(t, at(s, 'Tugas', 3) - .2, at(s, 'Tugas', 3) + .3)) } };
  },
  BA_FOLLOW(s, root) {   // penyintas baru masuk gerbang, papan posko 37 -> 38
    const sc = SIANG(); const D = desaTerakhir(sc, { hole: (x, z) => z > 22 && Math.abs(x) < 16 }); D.gate.userData.set(Math.PI / 2 * .95); const P = D.posko;
    const N = warga([0, 0, RF + 7], 1); N.rotation.y = Math.PI; sc.add(N); N.userData.st.arms[1].userData.elbow.add(mesh(G.box(.4, .45, .2), '#6E5A9A', [0, -.4, .05]));
    const J = gilang([3.2, 0, RF - 8.5]); J.rotation.y = .2; sc.add(J); const cam = camera(42); const l = LABEL(root, 'FOLLOW', '= 1 penyintas baru datang'); let shown = 37;
    return { scene: sc, cam, upd(t, dur) { const w = seg(t, .3, 3.4); N.position.set(lerp(0, 1.4, w), 0, lerp(RF + 7, RF - 7, w)); N.pose(t, { walk: w < 1 ? 1 : 0, wave: w >= 1 });
      const n = t > 3.6 ? 38 : 37; if (n !== shown) { P.userData.setN(n); shown = n } J.pose(t, { wave: t > 3.6, talk: t < 3.6 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-2.5, -1.2, p), lerp(2.6, 2.3, p), lerp(RF - 17, RF - 15.5, p)); cam.lookAt(lerp(1.5, 4.5, p), 1.6, RF - 3); show(l, seg(t, .2, .6)) } };
  },
  BA_LIKE(s, root) {   // gudang: karung beras & ikat bambu muncul bertumpuk, penghitung like
    const sc = SIANG(); const D = desaTerakhir(sc); const gp = SPOT.gudang;
    const items = Array.from({ length: 10 }, (_, i) => { const r = i % 5, c = Math.floor(i / 5); const it = i % 2 ? ikatBambu(sc, [gp[0] + 3.4 + c * 1.6, 0, gp[2] - 2.4 + r * 1.2], .85) : karung(sc, [gp[0] + 3.4 + c * 1.6, 0, gp[2] - 2.4 + r * 1.2], 1); it.scale.setScalar(.001); return it });
    const J = gilang([gp[0] + 7.2, 0, gp[2] + 3.4]); J.rotation.y = -2.4; sc.add(J); const K = kardi([gp[0] + 4.2, 0, gp[2] + 3.6]); K.rotation.y = -2.9; sc.add(K); const cam = camera(42);
    const l = LABEL(root, '10 LIKE', '= 1 karung beras / 1 ikat bambu');
    const c = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '54px', color: BONE, textShadow: '0 4px 14px rgba(0,0,0,.8)', opacity: 0 }, root, '');
    return { scene: sc, cam, upd(t, dur) { let n = 0; items.forEach((it, i) => { const t0 = .9 + i * (dur - 2.4) / 10; const q = seg(t, t0, t0 + .35); it.scale.setScalar(Math.max(.001, E.back(q)) * (i % 2 ? .85 : 1)); if (q > 0) n = i + 1 });
      c.innerHTML = `❤️ ${n * 10} like → 🌾 ${Math.ceil(n / 2)} karung · 🎋 ${Math.floor(n / 2)} ikat`; show(c, seg(t, .8, 1.1)); J.pose(t, { point: true, talk: true }); K.pose(t, { cheer: n >= 6 });
      const p = ease(t, 0, dur); cam.position.set(gp[0] + lerp(14, 12.5, p), lerp(3.2, 2.8, p), gp[2] + lerp(6.5, 5.6, p)); cam.lookAt(gp[0] + 4, 1, gp[2] - .2); show(l, seg(t, .2, .6)) } };
  },
  BA_KOMEN(s, root) {   // meja peta di depan balai: kertas komentar terbang jatuh ke peta jadi pin
    const sc = SIANG(); const D = desaTerakhir(sc); const bp = SPOT.balai; const tb = group(sc, [bp[0], 0, bp[2] + 11.5]);
    tb.add(mesh(G.box(3.4, .12, 2.2), '#8A5A33', [0, .95, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => tb.add(mesh(G.box(.1, .95, .1), '#6E4A2C', [x * 1.55, .47, z * .95])));
    const map = canvasPlane(3.1, 1.95, (x, W, H) => { x.fillStyle = '#EFE3C2'; x.fillRect(0, 0, W, H); x.strokeStyle = '#8A6E3A'; x.lineWidth = 10; x.beginPath(); x.arc(W / 2, H * .46, H * .38, 0, 7); x.stroke();
      x.strokeStyle = '#B9A274'; x.lineWidth = 8; x.beginPath(); x.moveTo(W / 2, H * .08); x.lineTo(W / 2, H); x.moveTo(W / 2 - H * .38, H * .46); x.lineTo(W / 2 + H * .38, H * .46); x.stroke(); x.fillStyle = '#B5452B'; x.fillRect(W / 2 - 22, H * .8, 44, 18);
      x.fillStyle = '#2A1E10'; x.font = '700 30px Poppins'; x.fillText('GERBANG', W / 2 + 30, H * .9); x.fillText('BUKIT', W / 2 - 40, 36); x.fillStyle = '#7FA34E'; x.fillRect(30, H * .7, 120, 80); x.fillRect(W - 150, H * .72, 120, 80) }, 900);
    map.rotation.x = -Math.PI / 2; map.position.set(0, 1.02, 0); tb.add(map);
    const pins = Array.from({ length: 6 }, (_, i) => { const g = group(tb, [((i * 37) % 10) / 10 * 2.2 - 1.1, 1.02, ((i * 53) % 10) / 10 * 1.3 - .65]); g.add(mesh(G.cyl(.015, .015, .25, 5), '#555', [0, .12, 0])); g.add(mesh(G.sph(.06, 8, 6), ['#C8372D', '#3E86B0', '#F2B33D'][i % 3], [0, .26, 0])); g.scale.setScalar(.001); return g });
    const kertas = Array.from({ length: 6 }, () => { const m = mesh(G.box(.3, .01, .2), '#FFFFFF', [0, -5, 0], { cast: false }); sc.add(m); return m });
    const J = gilang([bp[0] - 2.4, 0, bp[2] + 11.2]); J.rotation.y = 1.5; const Y = yati([bp[0] + 2.4, 0, bp[2] + 11.6]); Y.rotation.y = -1.5; const S = sinta([bp[0] + .3, 0, bp[2] + 10.1]); S.rotation.y = 0; [J, Y, S].forEach(p => sc.add(p));
    const cam = camera(42); const l = LABEL(root, 'KOMEN', '= rencana bertahan · paling rame dijalanin');
    return { scene: sc, cam, upd(t, dur) { pins.forEach((pn, i) => { const t0 = .8 + i * .55; const q = seg(t, t0, t0 + .7); const k = kertas[i]; k.visible = q > 0 && q < 1; const a = i * 2.1;
        const end = new THREE.Vector3(); pn.getWorldPosition(end); k.position.set(lerp(end.x + Math.cos(a) * 5, end.x, q), lerp(5, end.y + .3, q) + Math.sin(q * Math.PI), lerp(end.z + Math.sin(a) * 4, end.z, q)); k.rotation.set(t * 5 + i, t * 3, 0); pn.scale.setScalar(Math.max(.001, E.back(seg(t, t0 + .65, t0 + .9)))) });
      J.pose(t, { talk: true, point: t > 2 }); Y.pose(t, { nod: true }); S.pose(t, { look: Math.sin(t) * .4 });
      const p = ease(t, 0, dur); cam.position.set(bp[0] + lerp(.8, .3, p), lerp(6.4, 5.6, p), bp[2] + lerp(18.8, 17.5, p)); cam.lookAt(bp[0], .9, bp[2] + 11.4); show(l, seg(t, .2, .6)) } };
  },
  BA_SERANG(s, root) {   // malam: zombie mendorong pagar di gerbang, obor, Kardi memukul kentongan; kamera orbit
    const sc = MALAM(); const D = desaTerakhir(sc); obor(D); D.gate.userData.set(.6); sc.userData.warm.position.set(0, 5, RF - 2); sc.userData.warm.intensity = 40;
    const Z = gerombolan(sc, 22, RF + 1.2, 9, 3); const J = gilang([-1, 0, RF - 2.6]); J.rotation.y = .1; const K = kardi([2.2, 0, RF - 3.4]); K.rotation.y = .4; [J, K].forEach(p => sc.add(p));
    const fog = kabut(sc, 8, [40, 14], [0, 0, RF + 12], '#C8D0F0', .35); const cam = camera(42); const l = LABEL(root, 'TIAP AKHIR PEKAN', 'SERANGAN BESAR');
    return { scene: sc, cam, upd(t, dur) { Z.forEach((z, i) => { z.shamble(t * 1.4); z.position.z = Math.max(RF + .9 + (i % 3) * .6, z.userData.z0 - t * .8) }); D.gate.userData.set(.6 + Math.sin(t * 6) * .03);
      J.pose(t, { shake: true }); J.userData.st.arms.forEach(A => { A.rotation.x = -1.3; A.userData.elbow.rotation.x = -.3 }); K.pose(t, { cheer: true, shake: true }); sc.userData.warm.intensity = 40 + Math.sin(t * 13) * 5; fog(t, cam);
      const p = ease(t, 0, dur); cam.position.set(lerp(-4, 4, p), 8.5, RF - 13); cam.lookAt(0, .6, RF + 3); show(l, seg(t, .2, .6)) } };
  },
  BA_MULAI(s, root) {   // senja: Gilang menunjuk ke gerbang, MULAI DARI HARI KE-0
    const sc = SENJA(); const D = desaTerakhir(sc); obor(D); D.gate.userData.set(Math.PI / 2 * .95); const J = gilang([1.3, 0, RF + 7.5]); J.rotation.y = -.5; sc.add(J); const S = sinta([-1.2, 0, RF + 6.6]); S.rotation.y = .5; sc.add(S);
    const cam = camera(42); const h = BIG(root, 'MULAI DARI<br>HARI KE-0', { top: 330, fontSize: '100px', lineHeight: 1.05 });
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { point: true, talk: t < dur - 1.5 }); S.pose(t, { wave: true }); const p = ease(t, 0, dur); cam.position.set(lerp(2.8, 2.2, p), lerp(1.5, 1.7, p), lerp(RF + 15, RF + 14, p)); cam.lookAt(0, 3.0, RF); pulse(h, seg(t, .2, .6)) } };
  },
};

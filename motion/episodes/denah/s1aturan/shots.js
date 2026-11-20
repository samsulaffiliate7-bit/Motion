// Shot Denah S1 video ATURAN MAIN (lihat STORYBOARD.md). Bumi -> Jawa; kamera khas tampak atas lalu menukik.
import { THREE, mesh, G, group, camera, newScene } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/rumahdunia.js';
import { PAGI, SIANG, SORE, dena, mandor, warga, lokasiProyek, rumahMini, bumi, JAWA_LL, gridDenah, BIG, LABEL, tagNama, tempel, show, pulse, ease, lerp, seg, E } from '../_s1/dunia.js';

const UP = new THREE.Vector3(), U0 = new THREE.Vector3(0, 0, -1), U1 = new THREE.Vector3(0, 1, 0);

export const SHOTS = {
  DA_BUMI(s, root) {   // globe berputar ke Indonesia, pin Jawa; ATURAN MAIN
    const sc = newScene({ sky: ['#2E6FC0', '#BFE0F6'], sunPos: [-10, 8, 14], hemi: 1.2, sunI: 2.4 }); const gl = bumi(sc, 5); const pin = gl.pin(...JAWA_LL, '#FF7A3A'); pin.scale.setScalar(.01); const cam = camera(40);
    const h = BIG(root, 'ATURAN MAIN', { top: 320, fontSize: '110px' }), sub = BIG(root, 'DENAH RUMAH DUNIA · SEASON 1', { top: 460, fontSize: '40px', fontWeight: 700, color: '#FFD9A8', letterSpacing: '5px' });
    return { scene: sc, cam, upd(t, dur) { const sp = E.out(seg(t, 0, dur * .7)); gl.face(lerp(20, JAWA_LL[0], sp), JAWA_LL[1] + (1 - sp) * 200); cam.position.set(0, 0, lerp(17, 13, ease(t, 0, dur))); cam.lookAt(0, 0, 0);
      pin.scale.setScalar(Math.max(.01, E.back(seg(t, dur * .6, dur * .75)) * .55)); pulse(h, seg(t, .05, .4)); show(sub, seg(t, .4, .8)) } };
  },
  DA_PREMIS(s, root) {   // tampak atas (grid) lalu menukik ke Dena + Pak Mandor yang melambai
    const sc = PAGI(); const L = lokasiProyek(sc); const D = dena([-.3, 0, 2.6]); sc.add(D); D.rotation.y = .2; const M = mandor([1.1, 0, 2.4]); sc.add(M); M.rotation.y = -.2;
    const grid = gridDenah(root); const cam = camera(44); const l = LABEL(root, 'MULAI DARI PULAU JAWA', 'tiap episode 1 rumah asli');
    return { scene: sc, cam, upd(t, dur) { D.pose(t, { wave: t > dur * .45, talk: true }); M.pose(t, { wave: t > dur * .5 }); L.J.angin(t);
      const sw = E.inout(seg(t, .3, dur * .6)); cam.position.set(lerp(.4, .5, sw), lerp(100, 2.2, sw), lerp(1.5, 9.5, sw)); UP.copy(U0).lerp(U1, E.out(seg(sw, 0, .5))).normalize(); cam.up.copy(UP);
      cam.lookAt(.4, lerp(0, 1.3, sw), lerp(1.5, 1.6, sw)); grid(.85 * (1 - seg(t, 1.4, 3))); const tl = at(s, 'Pulau Jawa', 3); show(l, seg(t, tl - .3, tl + .2)) } };
  },
  DA_FOLLOW(s, root) {   // satu penduduk baru berjalan masuk ke lokasi, papan PENDUDUK BUMI 2 -> 3
    const sc = SIANG(); const L = lokasiProyek(sc); const P = warga(sc, [-1, 0, 6], 1); const D = dena([2.2, 0, -1.6]); sc.add(D); D.rotation.y = -.3; const cam = camera(42);
    const l = LABEL(root, 'FOLLOW', '= 1 penduduk baru datang'); let shown = -1;
    return { scene: sc, cam, upd(t, dur) { const w = seg(t, .2, dur * .6); P.position.set(lerp(-1, 2.4, w), 0, lerp(6, -2.6, w)); P.rotation.y = Math.PI - .4; P.pose(t, { walk: w < 1 ? 1 : 0, wave: w >= 1 }); if (w >= 1) P.rotation.y = .3;
      const n = w >= 1 ? 3 : 2; if (n !== shown) { L.pap.userData.set(n); shown = n } D.pose(t, { cheer: w >= 1, talk: w < 1 }); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(-.6, .4, p), lerp(2.6, 2.4, p), lerp(9.5, 7.6, p)); cam.lookAt(2.4, 1.6, -2.6); show(l, seg(t, .2, .6)) } };
  },
  DA_LIKE(s, root) {   // palet bata menumpuk lapis demi lapis; penghitung bata naik 10 per like
    const sc = PAGI(); const L = lokasiProyek(sc); const M = mandor([4.4, 0, -.4]); sc.add(M); M.rotation.y = -.5; const D = dena([6.9, 0, -.6]); sc.add(D); D.rotation.y = -.7; const cam = camera(42);
    const l = LABEL(root, 'LIKE', '= 10 bata'); const cnt = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '84px', color: '#FFF6E2', textShadow: '0 6px 0 #12344F, 0 14px 30px #0008', opacity: 0 }, root, '');
    return { scene: sc, cam, upd(t, dur) { const n = Math.floor(seg(t, .5, dur - .8) * 24) * X.TL.vars.kurs_bata; L.bata.userData.setN(n / 2); cnt.innerHTML = `🧱 ${n} bata`; cnt.style.opacity = seg(t, .4, .7);
      M.pose(t, { nod: true }); D.pose(t, { cheer: t > dur - 1.4, talk: true }); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(5.4, 5.6, p), lerp(2.6, 2.2, p), lerp(6.8, 5.6, p)); cam.lookAt(5.6, 1.1, -1.4); show(l, seg(t, .2, .6)) } };
  },
  DA_KOMEN(s, root) {   // gelembung komen terbang ke tiga maket rumah; satu menang
    const sc = SORE(); const L = lokasiProyek(sc); const meja = group(sc, [.5, 0, .4]); meja.add(mesh(G.box(4.6, .12, 1.6), '#A8743E', [0, .9, 0])); [[-2.1, -.6], [2.1, -.6], [-2.1, .6], [2.1, .6]].forEach(([x, z]) => meja.add(mesh(G.box(.12, .9, .12), '#7A4E2C', [x, .45, z])));
    const K = ['joglo', 'limasan', 'kampung'].map((k, i) => rumahMini(meja, [(i - 1) * 1.45, .96, 0], k)); const cam = camera(48);
    const bub = Array.from({ length: 14 }, (_, i) => { const g = group(sc, [0, -5, 0]); g.add(mesh(G.box(.5, .32, .06), '#FFFFFF', [0, 0, 0], { cast: false })); g.add(mesh(G.cone(.08, .14, 3), '#FFFFFF', [-.12, -.2, 0], { rot: [0, 0, Math.PI], cast: false }));
      [-1, 0, 1].forEach(k => g.add(mesh(G.sph(.035, 6, 5), '#12344F', [k * .1, 0, .04], { cast: false }))); return g });
    const l = LABEL(root, 'KOMEN', '= rumah / negara berikutnya'); const win = X.ab({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%)', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '36px', color: '#12344F', background: '#FF9F45', padding: '8px 20px', borderRadius: '12px', whiteSpace: 'nowrap' }, root, 'PALING RAME ✓');
    return { scene: sc, cam, upd(t, dur) { bub.forEach((b, i) => { const q = seg(t, .4 + i * .25, 1.6 + i * .25), tx = (i % 3 - 1) * 1.45 + .5; b.visible = q > 0 && q < 1; const a = i * 2.3; b.position.set(lerp(Math.cos(a) * 5, tx, q), lerp(2 + (i % 3), 2.2, q) + Math.sin(q * Math.PI), lerp(4 + Math.sin(a) * 2, .4, q)) });
      K[1].scale.setScalar(t > dur - 2.2 ? 1.12 + .05 * Math.sin(t * 8) : 1); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(.5, lerp(3.2, 2.6, p), lerp(9.5, 8, p)); cam.lookAt(.5, 1.4, .4); show(l, seg(t, .2, .6)); tempel(win, K[1], cam, [0, 1.6, 0], seg(t, dur - 2.2, dur - 1.9)) } };
  },
  DA_UJIAN(s, root) {   // hujan badai di lokasi (tetap terang), kelapa bergoyang; Dena memegang helm
    const sc = SORE({ sky: ['#7F9CC8', '#D8D2C8'], fog: ['#C8CCD2', 40, 180] }); const L = lokasiProyek(sc); const D = dena([-.4, 0, 1.6]); sc.add(D); D.rotation.y = .5; const M = mandor([1, 0, 1.2]); sc.add(M); M.rotation.y = -.3; const cam = camera(42);
    const N = 500, hj = new THREE.InstancedMesh(new THREE.BoxGeometry(.025, .5, .025), new THREE.MeshBasicMaterial({ color: '#D6ECFA', transparent: true, opacity: .7 }), N); sc.add(hj); const O = new THREE.Object3D();
    const l = LABEL(root, 'TIAP AKHIR PEKAN', 'ujian: hujan badai · gempa · topan');
    return { scene: sc, cam, upd(t, dur) { for (let i = 0; i < N; i++) { const q = (t * 1.6 + i / N * 7) % 1; O.position.set(-8 + (i * 37 % 160) / 10 + q * 1.5, 9 - q * 9, -6 + (i * 61 % 140) / 10); O.rotation.z = .2; O.updateMatrix(); hj.setMatrixAt(i, O.matrix) } hj.instanceMatrix.needsUpdate = true;
      D.pose(t, { hold: true, shake: true }); M.pose(t, { shake: true }); L.J.angin(t * 3);
      const A = (t * 6 - 15) * Math.PI / 180; cam.position.set(Math.sin(A) * 8.5 + .3, 2.4, 1.4 + Math.cos(A) * 8.5); cam.lookAt(.3, 1.3, 1.4); show(l, seg(t, .2, .6)) } };
  },
  DA_MULAI(s, root) {   // lahan berpatok: Dena menunjuk, Pak Mandor jempol; MULAI DARI EPISODE 0
    const sc = PAGI(); const L = lokasiProyek(sc); const D = dena([-.7, 0, 2.8]); sc.add(D); D.rotation.y = .3; const M = mandor([1.1, 0, 2.6]); sc.add(M); M.rotation.y = -.3; const cam = camera(42);
    const h = BIG(root, 'MULAI DARI<br>EPISODE 0', { top: 330, fontSize: '100px', lineHeight: 1.05 });
    return { scene: sc, cam, upd(t, dur) { D.pose(t, { point: true, talk: t < dur - 1.5 }); M.pose(t, { cheer: t > 1, nod: true }); L.J.angin(t); const p = ease(t, 0, dur); cam.position.set(lerp(.6, .3, p), lerp(1.8, 2.0, p), lerp(11.5, 10.5, p)); cam.lookAt(.2, 1.6, 1.4); pulse(h, seg(t, .2, .6)) } };
  },
};

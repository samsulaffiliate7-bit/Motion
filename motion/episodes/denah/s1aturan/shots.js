// Shot Denah S1 video ATURAN MAIN (lihat STORYBOARD.md). Kamera khas tampak atas cetak biru -> menukik.
import { THREE, mesh, G, group, camera } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/planet.js';
import { PAGI, SIANG, SORE, bulan, planet, dena, penggaris, pendatang, kapsul, kawah, papanPenduduk, tumpukanBata, garisDenah, hologram, gridDenah, BIG, LABEL, show, pulse, ease, debu, api, lerp, seg, E } from '../_s1/dunia.js';

const UP = new THREE.Vector3(), U0 = new THREE.Vector3(0, 0, -1), U1 = new THREE.Vector3(0, 1, 0);
function kapsulMiring(sc, p = [0, 0, 0]) { kawah(sc, [p[0] + .3, 0, p[2]], 3.2); const K = kapsul(sc, [p[0], -.35, p[2]]); K.rotation.set(0, -.25, -.42); return K }

export const SHOTS = {
  DA_HOOK(s, root) {   // tampak atas seperti denah (grid) lalu menukik ke Dena + PENGGARIS yang melambai
    const sc = SIANG(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 6 && Math.abs(z) < 6 }); kapsulMiring(sc, [-3.4, 0, -2.6]); garisDenah(sc, [2.2, 0, -1.6], 5, 4, { lw: '? m', ld: '? m' });
    const D = dena([-.3, 0, 1.6]); sc.add(D); D.rotation.y = .25; const R = penggaris(sc, [1.1, 0, 1.4]); R.rotation.y = -.25; const grid = gridDenah(root); const cam = camera(44);
    const h = BIG(root, 'ATURAN MAIN', { top: 340, fontSize: '112px' }), sub = BIG(root, 'PLANET DENAH · SEASON 1', { top: 480, fontSize: '46px', fontWeight: 700, color: '#FFD9A8', letterSpacing: '6px' });
    return { scene: sc, cam, upd(t, dur) { D.pose(t, { wave: true, talk: t > 1.2 }); R.pose(t, { wave: true, senang: true });
      const sw = E.inout(seg(t, 0, dur * .8)); cam.position.set(lerp(.4, .8, sw), lerp(26, 2.2, sw), 1.4 + lerp(0, 7, sw)); UP.copy(U0).lerp(U1, E.out(seg(sw, 0, .5))).normalize(); cam.up.copy(UP);
      cam.lookAt(lerp(.4, .4, sw), lerp(0, 1.35, sw), lerp(1.4, 0, sw)); grid(.9 * (1 - seg(t, .8, 2.4))); pulse(h, seg(t, .05, .4)); show(sub, seg(t, .4, .8)) } };
  },
  DA_PREMIS(s, root) {   // kamera rendah menyapu garis denah; PENGGARIS mengukur, Dena memeriksa
    const sc = PAGI(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 8 && Math.abs(z) < 7 }); garisDenah(sc, [0, 0, 0], 6, 4); garisDenah(sc, [7.5, 0, -3], 4, 4, { ukur: false });
    const D = dena([-1.6, 0, 2.6]); sc.add(D); D.rotation.y = .4; const R = penggaris(sc, [1.6, 0, 2.05]); R.rotation.y = -Math.PI / 2; const cam = camera(42);
    const l = LABEL(root, '1 EPISODE · 1 RUMAH', 'rumah asli dari 1 negara');
    return { scene: sc, cam, upd(t, dur) { const q = seg(t, 0, dur); R.position.x = lerp(2.4, -1, q); R.pose(t, { roll: 1, ukur: true }); D.pose(t, { talk: true, look: -.3 });
      const p = ease(t, 0, dur); cam.position.set(lerp(.8, -.2, p), lerp(2.0, 2.2, p), lerp(11.5, 11, p)); cam.lookAt(lerp(.2, -.2, p), 1.1, 1.2);
      const tl = at(s, 'satu rumah', 4); show(l, seg(t, tl - .3, tl + .2)) } };
  },
  DA_FOLLOW(s, root) {   // kapsul kecil turun, pintu terbuka, satu pendatang keluar, papan PENDUDUK 0 -> 1
    const sc = SIANG(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 7 }); const B = papanPenduduk(sc, [1.9, 0, -1.8], 0); B.rotation.y = -.3;
    const K = kapsul(sc, [-1.2, 30, -.6], { s: .6, label: 'PENDATANG' }); const fire = api(sc); const dust = debu(sc, 16); const P = pendatang(sc, [-1.2, .35, .1], 1); P.visible = false; const cam = camera(42);
    const l = LABEL(root, 'FOLLOW', '= 1 pendatang turun dari kapsul'); let shown = -1;
    return { scene: sc, cam, upd(t, dur) { const tl = 1.6; const y = lerp(30, 0, E.out(seg(t, 0, tl))); K.position.y = y; fire(t, K.position, [0, -1, 0], t < tl - .1); dust(t, tl - .2, [-1.2, 0, -.6], 2.4);
      K.userData.pintu.rotation.x = E.out(seg(t, tl + .4, tl + .9)) * 1.6; const tp = tl + 1; P.visible = t > tp; const w = seg(t, tp, tp + 1.8); P.position.set(lerp(-1.2, .2, w), w < .15 ? .35 : 0, lerp(.1, 1.9, w)); P.rotation.y = .4; P.pose(t, { walk: w > 0 && w < 1 ? 1 : 0, wave: w >= 1 });
      const n = t > tp + 1.6 ? 1 : 0; if (n !== shown) { B.userData.set(n); shown = n }
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .9, p), lerp(2.6, 2.1, p), lerp(11.5, 10, p)); cam.lookAt(.4, lerp(3.2, 1.5, seg(t, 0, tl + .4)), 0); show(l, seg(t, .2, .6)) } };
  },
  DA_LIKE(s, root) {   // palet bata menumpuk lapis demi lapis; penghitung bata naik 10 per like
    const sc = PAGI(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 6 && Math.abs(z) < 6 }); const T = tumpukanBata(sc, [.6, 0, -.4]); sc.add(mesh(G.box(1.5, .14, 1.1), '#B08A5A', [.6, .07, -.4]));
    const D = dena([-1.0, 0, 1.6]); sc.add(D); D.rotation.y = .5; const R = penggaris(sc, [1.9, 0, .9]); R.rotation.y = -.6; const cam = camera(42);
    const l = LABEL(root, 'LIKE', '= 10 bata'); const cnt = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '84px', color: '#FFF3E2', textShadow: '0 6px 0 #2A1E56, 0 14px 30px #0008', opacity: 0 }, root, '');
    return { scene: sc, cam, upd(t, dur) { const n = Math.floor(seg(t, .6, dur - .8) * 24) * X.TL.vars.kurs_bata; T.userData.setN(n); cnt.innerHTML = `🧱 ${n} bata`; cnt.style.opacity = seg(t, .4, .7);
      D.pose(t, { point: true, talk: true, cheer: t > dur - 1.2 }); R.pose(t, { kerja: true, senang: true });
      const p = ease(t, 0, dur); cam.position.set(lerp(.2, .4, p), lerp(2.5, 2.2, p), lerp(9.6, 8.4, p)); cam.lookAt(.4, 1.2, 0); show(l, seg(t, .2, .6)) } };
  },
  DA_KOMEN(s, root) {   // gelembung komen terbang masuk hologram; negara paling rame menyala
    const sc = SORE(); bulan(sc, { p1: [-30, 26, -150], p2: [34, 38, -160], r1: 18 }); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 6 });
    const H = hologram(sc, [0, 0, -1], [['NEGARA A?', 'komen'], ['NEGARA B?', 'PALING RAME ✓'], ['NEGARA C?', 'komen']]); const D = dena([-1.1, 0, 2.8]); sc.add(D); D.rotation.y = .5; const cam = camera(42);
    const bub = Array.from({ length: 14 }, (_, i) => { const g = group(sc, [0, -5, 0]); g.add(mesh(G.box(.5, .32, .06), '#FFFFFF', [0, 0, 0], { cast: false })); g.add(mesh(G.cone(.08, .14, 3), '#FFFFFF', [-.12, -.2, 0], { rot: [0, 0, Math.PI], cast: false }));
      [-1, 0, 1].forEach(k => g.add(mesh(G.sph(.035, 6, 5), '#2A1E56', [k * .1, 0, .04], { cast: false }))); return g });
    const l = LABEL(root, 'KOMEN', '= negara rumah berikutnya');
    return { scene: sc, cam, upd(t, dur) { H.userData.plates.forEach((m, i) => m.scale.setScalar(Math.max(.001, E.back(seg(t, .3 + i * .3, .7 + i * .3))) * (i === 1 && t > dur - 2.4 ? 1.06 + .04 * Math.sin(t * 8) : 1)));
      bub.forEach((b, i) => { const q = seg(t, .6 + i * .3, 1.9 + i * .3); b.visible = q > 0 && q < 1; const a = i * 2.3; b.position.set(lerp(Math.cos(a) * 5, 0, q), lerp(1 + (i % 3), 2.4, q) + Math.sin(q * Math.PI) * 1.2, lerp(3 + Math.sin(a) * 2, -1, q)); b.rotation.y = Math.sin(t + i) * .4 });
      D.pose(t, { talk: true, point: t < dur - 2.5, cheer: t > dur - 2 }); const p = ease(t, 0, dur); cam.position.set(lerp(-.4, 0, p), lerp(2.5, 2.3, p), lerp(12, 10.6, p)); cam.lookAt(0, 2.2, -.6); show(l, seg(t, .2, .6)) } };
  },
  DA_UJIAN(s, root) {   // badai pasir ungu menyapu planet (tetap terang); Dena memegang helm, PENGGARIS miring tertiup
    const sc = SORE({ sky: ['#9A7AB8', '#FFB27A'], fog: ['#E8A88A', 30, 140] }); bulan(sc, { p1: [-30, 26, -150], p2: [34, 38, -160], r1: 18 }); planet(sc, { hole: (x, z) => Math.abs(x) < 6 && Math.abs(z) < 6 }); kapsulMiring(sc, [3.4, 0, -3]);
    const D = dena([-.6, 0, 1.4]); sc.add(D); D.rotation.y = .9; const R = penggaris(sc, [.9, 0, 1.1]); R.rotation.y = .6; const cam = camera(42);
    const N = 260, pas = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.12, 0), new THREE.MeshBasicMaterial({ color: '#E7A07A', transparent: true, opacity: .75 }), N); sc.add(pas); const M = new THREE.Matrix4(), V = new THREE.Vector3(), Q = new THREE.Quaternion(), S3 = new THREE.Vector3();
    const l = LABEL(root, 'TIAP AKHIR PEKAN', 'ujian: badai · banjir · gempa');
    return { scene: sc, cam, upd(t, dur) { for (let i = 0; i < N; i++) { const q = (t * (.35 + (i % 7) * .05) + i / N) % 1; V.set(lerp(-16, 16, q), .2 + ((i * 37) % 100) / 100 * 5, -8 + ((i * 61) % 100) / 100 * 14); S3.setScalar(.6 + (i % 5) * .4); M.compose(V, Q, S3); pas.setMatrixAt(i, M) } pas.instanceMatrix.needsUpdate = true;
      D.pose(t, { hold: true, shake: true, walk: .3 }); R.pose(t, { lean: Math.sin(t * 3) * .12 - .1, bingung: true }); R.position.x = .9 + Math.sin(t * 2) * .15;
      const a = t * 6 - 20, A = a * Math.PI / 180; cam.position.set(Math.sin(A) * 8.5, 2.6, 1.2 + Math.cos(A) * 8.5); cam.lookAt(0, 1.3, 1.2); show(l, seg(t, .2, .6)) } };
  },
  DA_MULAI(s, root) {   // kapsul miring: Dena menunjuk, MULAI DARI EPISODE 0
    const sc = PAGI(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 7 }); kapsulMiring(sc, [0, 0, -1]);
    const D = dena([1.15, 0, 2.8]); sc.add(D); D.rotation.y = -.7; const R = penggaris(sc, [-1.25, 0, 2.5]); R.rotation.y = .6; const cam = camera(42);
    const h = BIG(root, 'MULAI DARI<br>EPISODE 0', { top: 330, fontSize: '100px', lineHeight: 1.05 });
    return { scene: sc, cam, upd(t, dur) { D.pose(t, { point: true, talk: t < dur - 1.5 }); R.pose(t, { wave: true, senang: true }); const p = ease(t, 0, dur); cam.position.set(lerp(1.2, .6, p), lerp(1.8, 2.0, p), lerp(13.4, 12.6, p)); cam.lookAt(0, 1.9, 0); pulse(h, seg(t, .2, .6)) } };
  },
};

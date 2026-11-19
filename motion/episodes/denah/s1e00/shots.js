// Shot Denah S1 Ep 0 "Pendaratan" (lihat STORYBOARD.md). Tiap adegan = lokasi/kamera berbeda; kamera khas tampak atas -> menukik.
import { THREE, mesh, G, camera } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/planet.js';
import { PAGI, SIANG, SORE, bulan, planet, dena, penggaris, kapsul, kawah, papanPenduduk, tumpukanBata, pintuSaja, garisDenah, hologram, gridDenah, BIG, LABEL, show, pulse, ease, debu, api, lerp, seg, E } from '../_s1/dunia.js';

const UP = new THREE.Vector3(), U0 = new THREE.Vector3(0, 0, -1), U1 = new THREE.Vector3(0, 1, 0);
const TILT = -.42;   // kapsul jatuh miring
function kapsulMiring(sc, p = [0, 0, 0]) { kawah(sc, [p[0] + .3, 0, p[2]], 3.2); const K = kapsul(sc, [p[0], -.35, p[2]]); K.rotation.set(0, -.25, TILT); return K }
const tagNama = (root, a, b) => X.ab({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%)', fontFamily: 'Poppins,sans-serif', textAlign: 'center', whiteSpace: 'nowrap' }, root,
  `<div style="background:rgba(42,30,86,.93);color:#FFF3E2;border-radius:14px;padding:8px 22px;box-shadow:0 10px 24px #0000005c;border:1px solid #ffffff22"><div style="font-size:40px;font-weight:800;color:#FF9F45;letter-spacing:2px">${a}</div><div style="font-size:26px;font-weight:600">${b}</div></div>`);
function tempel(e, obj, cam, off, op) { const [x, y, z] = X.proj(obj, cam, off); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = z < 1 ? op : 0 }

export const SHOTS = {
  D0_JATUH(s, root) {   // frame 1 aksi: kapsul membara jatuh miring dari langit, menghantam padang, debu ungu
    const sc = PAGI(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && z > -6 && z < 16 }); const K = kapsul(sc, [0, 0, 0]); const kw = kawah(sc, [.3, 0, 0], 3.2); kw.visible = false;
    const fire = api(sc); const dust = debu(sc, 26); const cam = camera(44);
    const h = BIG(root, 'EPISODE 0', { top: 330, fontSize: '120px' }), sub = BIG(root, 'PLANET DENAH', { top: 480, fontSize: '64px', fontWeight: 700, color: '#FFD9A8', letterSpacing: '8px' });
    const A = new THREE.Vector3(-11, 19, -12), B = new THREE.Vector3(0, -.35, 0), dir = B.clone().sub(A).normalize(), TI = 1.5;
    return { scene: sc, cam, upd(t, dur) { const f = E.in(seg(t, 0, TI) * .75 + .25); const P = A.clone().lerp(B, Math.min(1, f));
      K.position.copy(P); const hit = t >= TI; kw.visible = hit;
      if (!hit) K.rotation.set(Math.sin(t * 3) * .1, t * 2, -.9 + seg(t, 0, TI) * .3); else { const k = E.out(seg(t, TI, TI + .5)); K.rotation.set(0, -.25, lerp(-.6, TILT, k) + Math.sin(seg(t, TI, TI + .9) * Math.PI * 3) * .05 * (1 - seg(t, TI, TI + .9))) }
      fire(t, P, [dir.x, dir.y, dir.z], !hit); dust(t, TI, [0, 0, 0], 4.5);
      const sh = hit && t < TI + .5 ? Math.sin(t * 80) * .25 * (1 - seg(t, TI, TI + .5)) : 0;
      const p = ease(t, 0, dur); cam.position.set(lerp(6.5, 5.6, p) + sh, lerp(1.4, 2.2, p) + sh * .6, lerp(12, 11.5, p));
      const lk = new THREE.Vector3(0, 1.6, 0).lerp(P, hit ? 0 : 1 - seg(t, .6, TI)); cam.lookAt(lk.x, Math.max(1.2, lk.y), lk.z);
      pulse(h, seg(t, .05, .4)); show(sub, seg(t, .5, .9)); if (t > 4) { h.style.opacity = sub.style.opacity = 1 - seg(t, 4, 4.5) } } };
  },
  D0_KELUAR(s, root) {   // pintu kapsul terbuka, Dena terguling keluar; PENGGARIS menggelinding keluar dan menyapa
    const sc = PAGI(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 8 }); const K = kapsulMiring(sc);
    const D = dena([.7, 1.2, 1.4]); sc.add(D); const R = penggaris(sc, [.5, .9, 1.2]); R.visible = false; const cam = camera(42);
    const tD = tagNama(root, 'DENA', 'arsitek · perfeksionis'), tR = tagNama(root, 'PENGGARIS', 'robot ukur · polos');
    return { scene: sc, cam, upd(t, dur) { const po = E.out(seg(t, .2, .7)); K.userData.pintu.rotation.x = po * 1.9;
      const j = seg(t, .6, 1.5); const jy = Math.max(0, 1.2 * (1 - j) + Math.sin(j * Math.PI) * .6); D.position.set(lerp(.9, 1.7, j), j < 1 ? jy : 0, lerp(1.6, 3.1, j)); D.rotation.x = j < 1 ? j * Math.PI * 2 : 0;
      const tg = seg(t, 1.5, 2.2); if (j >= 1) { D.rotation.x = 0; D.rotation.y = lerp(.6, .25, tg) } D.pose(t, { talk: t > 2.3, panik: t > at(s, 'panik', 3.5) - .1 && t < at(s, 'panik', 3.5) + 1.2, bounce: t > 2.2 && t < 3 });
      const tr = at(s, 'Ini', 5); R.visible = t > tr - 1; const rq = seg(t, tr - 1, tr + .4); R.position.set(lerp(.8, -1.2, rq), lerp(1, 0, Math.min(1, rq * 1.6)), lerp(1.4, 3, rq)); R.rotation.y = .35;
      R.pose(t, { roll: rq > 0 && rq < 1 ? 1 : 0, wave: t > tr + .4 && t < tr + 2.5, bingung: t > at(s, 'polos', dur - 1.5) - .2, senang: t > tr + .4 });
      const p = ease(t, 0, dur); const foc = seg(t, tr - .5, tr + .8); cam.position.set(lerp(2.4, 1.2, p) - foc * .7, lerp(1.7, 1.8, p), lerp(12.5, 11.6, p)); cam.lookAt(lerp(.9, .35, foc), 1.5, 1.8);
      tempel(tD, D, cam, [0, 2.15, 0], seg(t, 2.2, 2.6) * (1 - seg(t, tr - .6, tr - .2))); tempel(tR, R, cam, [0, 2.25, 0], seg(t, tr + .2, tr + .6) * (1 - seg(t, dur - .8, dur - .4))) } };
  },
  D0_DENAH(s, root) {   // KHAS: tampak atas lurus seperti denah (grid cetak biru) lalu menukik ke Dena di padang luas
    const sc = SIANG(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 6 && Math.abs(z) < 6 }); kapsulMiring(sc, [-3.2, 0, -2.4]);
    const D = dena([1, 0, 1.6]); sc.add(D); D.rotation.y = .3; const R = penggaris(sc, [2.2, 0, 1.1]); R.rotation.y = -.3; const lot = garisDenah(sc, [2, 0, -1.5], 6, 4, { lw: '? m', ld: '? m' });
    const grid = gridDenah(root); const nol = BIG(root, '0 RUMAH', { top: 560, fontSize: '128px' }); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { D.pose(t, { talk: true, look: Math.sin(t * .8) * .5 }); R.pose(t, { bingung: true, look: -.4 });
      const sw = E.inout(seg(t, 1.6, dur * .75)); const h = lerp(150, 2.1, sw), r = lerp(0, 7.4, sw);
      cam.position.set(lerp(1.4, 2.6, sw), h, 1.4 + r); UP.copy(U0).lerp(U1, E.out(seg(sw, 0, .5))).normalize(); cam.up.copy(UP); cam.lookAt(lerp(1.4, 1.3, sw), lerp(0, 1.4, sw), lerp(1.4, 0, sw));
      grid(.9 * (1 - seg(t, 2.2, 4))); const tn = at(s, 'Nol', dur - 1.6); pulse(nol, seg(t, tn - .1, tn + .3)) } };
  },
  D0_MALAM(s, root) {   // jam hologram: malam 30 jam datang 2 hari lagi; Dena menggigil membayangkan beku
    const sc = SORE(); bulan(sc, { p1: [-34, 30, -150], p2: [30, 42, -160], r1: 18 }); planet(sc, { hole: (x, z) => Math.abs(x) < 6 && Math.abs(z) < 6 }); kapsulMiring(sc, [2.6, 0, -2.2]);
    const D = dena([-.4, 0, 1.2]); sc.add(D); D.rotation.y = .35; const R = penggaris(sc, [-2, 0, .6]); R.rotation.y = .5; const cam = camera(42);
    const V = X.TL.vars; const jam = X.ab({ left: 140, top: 300, width: 800, textAlign: 'center', fontFamily: 'Poppins,sans-serif', opacity: 0 }, root,
      `<div style="display:inline-block;background:rgba(20,40,90,.82);border:3px solid #5FE0D0;border-radius:22px;padding:22px 46px;box-shadow:0 0 40px #5FE0D066">
       <div style="font-size:32px;font-weight:700;color:#5FE0D0;letter-spacing:6px">🌙 MALAM PLANET</div><div style="font-size:96px;font-weight:800;color:#FFF3E2;line-height:1.05">${V.malam} JAM</div></div>`);
    const sisa = X.ab({ left: 0, top: 540, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '70px', color: '#FF9F45', textShadow: '0 6px 0 #2A1E56, 0 14px 30px #0008', opacity: 0 }, root, `DATANG ${V.sisa} HARI LAGI`);
    const es = X.ab({ left: 0, top: 0, width: 1080, height: 1920, pointerEvents: 'none', opacity: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,240,255,0) 35%, rgba(215,245,255,.75) 100%)' }, root);
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'beku', dur - 1.4); D.pose(t, { talk: t < tb, shake: t > tb - .1, look: -.2 }); R.pose(t, { look: .6, bingung: t > tb });
      const tj = at(s, 'tiga puluh', 1.5), td = at(s, 'dua hari', 4); const p = ease(t, 0, dur); cam.position.set(lerp(1.0, .4, p), lerp(1.9, 1.7, p), lerp(8.6, 7.2, p)); cam.lookAt(-.7, 1.6, .8);
      show(jam, seg(t, tj - .3, tj + .2)); pulse(sisa, seg(t, td - .1, td + .3)); es.style.opacity = .9 * seg(t, tb - .1, tb + .5) } };
  },
  D0_PINTU(s, root) {   // lelucon: perintah "bangun rumah", PENGGARIS kerja kilat, hasilnya PINTU SAJA; Dena lewat pintu dan tetap di luar
    const sc = SIANG(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 7 }); const P = pintuSaja(sc, [0, 0, 0]); garisDenah(sc, [0, 0, -1.6], 5, 4, { ukur: false, c: '#FFF3E2' });
    const D = dena([1.1, 0, 2.6]); sc.add(D); D.rotation.y = -.5; const R = penggaris(sc, [-1.25, 0, 1.5]); R.rotation.y = .5; const cam = camera(42);
    const spark = Array.from({ length: 16 }, (_, i) => { const m = mesh(G.box(.12, .12, .12), i % 2 ? '#FFD23F' : '#5FE0D0', [0, -5, 0], { cast: false, mat: { emissive: i % 2 ? '#FFD23F' : '#5FE0D0', emissiveIntensity: 1 } }); sc.add(m); return m });
    const pres = X.ab({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%) rotate(-4deg)', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '40px', color: '#1C1838', background: '#FFD23F', padding: '8px 22px', borderRadius: '12px', boxShadow: '0 8px 20px #0006', whiteSpace: 'nowrap' }, root, '✓ PRESISI 100%');
    const luar = BIG(root, 'tetap di luar.', { top: 400, fontSize: '96px', fontStyle: 'italic' }); const cmd = BIG(root, '"BANGUN RUMAH!"', { top: 380, fontSize: '84px', color: '#FFD9A8' });
    return { scene: sc, cam, upd(t, dur) { const tc = at(s, 'bangun rumah', 1.2), tk = at(s, 'kilat', 2.6), tp = at(s, 'Pintu doang', 4.6), tl = at(s, 'di luar', dur - 1.8);
      const build = seg(t, tk - .2, tk + 1.1); P.visible = build > .05; P.scale.set(1, Math.max(.01, E.back(build)), 1);
      spark.forEach((m, i) => { const q = (t * 2.2 + i / 16) % 1; m.visible = build > 0 && build < 1; m.position.set(Math.sin(i * 2.4) * (1 + q), .3 + q * 2.4, Math.cos(i * 2.4) * .8 + .4); m.rotation.set(t * 6, t * 5, 0) });
      R.pose(t, { kerja: build > 0 && build < 1, roll: build > 0 && build < 1 ? 1 : 0, senang: t > tk + 1.2, wave: t > tp && t < tp + 1.2 }); R.position.x = -1.25 + (build > 0 && build < 1 ? Math.sin(t * 10) * .5 : 0);
      // Dena: memerintah -> jalan ke pintu -> buka -> lewat -> berbalik, tetap di luar
      const tw = tp + 1.4; const w1 = seg(t, tw, tw + 1.2), op = seg(t, tw + 1.1, tw + 1.5), w2 = seg(t, tw + 1.5, tw + 2.6);
      P.userData.daun.rotation.y = -op * 1.6 * (1 - seg(t, tw + 2.8, tw + 3.3));
      D.position.set(lerp(lerp(1.1, 0, w1), 0, w2), 0, lerp(lerp(2.6, 1.1, w1), -1.4, w2)); D.rotation.y = w1 > 0 ? Math.PI : -.5;
      if (w2 >= 1) D.rotation.y = lerp(Math.PI, 2 * Math.PI, seg(t, tw + 2.6, tw + 3.1));
      D.pose(t, { walk: (w1 > 0 && w1 < 1) || (w2 > 0 && w2 < 1) ? 1 : 0, point: t > tc - .2 && t < tc + 1, talk: t < tk + .5, panik: t > tl + .4, hold: op > 0 && op < 1 });
      const p = ease(t, 0, dur); const z = seg(t, tl - .4, tl + .4); cam.position.set(lerp(1.6, 1.0, p) - z * .6, lerp(2.2, 2.0, p), lerp(9.4, 8.4, p) - z * 1.8); cam.lookAt(lerp(.1, 0, z), 1.25, lerp(.4, -.6, z));
      tempel(pres, R, cam, [0, 2.3, 0], seg(t, tp - .2, tp + .2) * (1 - seg(t, tw + 1, tw + 1.4))); show(cmd, seg(t, tc - .2, tc + .2) * (1 - seg(t, tk - .2, tk + .2))); pulse(luar, seg(t, tl, tl + .35)) } };
  },
  D0_PAPAN(s, root) {   // papan PENDUDUK = 1, PENGGARIS mengangkat kertas "PERABOT", palet bata kosong
    const sc = SIANG(); bulan(sc); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 6 }); kapsulMiring(sc, [-6, 0, -4.5]);
    const B = papanPenduduk(sc, [-2.2, 0, -1.6], 1); B.rotation.y = .25; const T = tumpukanBata(sc, [2.6, 0, -.4]); T.userData.setN(0); sc.add(mesh(G.box(1.5, .14, 1.1), '#B08A5A', [2.6, .07, -.4]));
    const D = dena([-.6, 0, 1.0]); sc.add(D); D.rotation.y = -.3; const R = penggaris(sc, [.9, 0, 1.3]); R.rotation.y = -.4; const cam = camera(42);
    const kertas = mesh(G.box(.5, .32, .02), '#FFFFFF', [0, -.5, .1], { cast: false }); R.userData.arms[0].add(kertas);
    const perabot = X.ab({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%)', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '40px', color: '#1C1838', background: '#FFF3E2', padding: '8px 22px', borderRadius: '10px', boxShadow: '0 8px 20px #0006', whiteSpace: 'nowrap' }, root, 'SAYA PERABOT');
    const bata = LABEL(root, '🧱 BATA: 0', 'palet masih kosong', 330);
    return { scene: sc, cam, upd(t, dur) { const tp = at(s, 'perabot', 3), tb = at(s, 'Bata', dur - 1.6);
      D.pose(t, { talk: true, point: t < 1.6, shake: t > tb + .3 }); R.pose(t, { ukur: t > tp - .4 && t < tb, senang: true, look: .3 });
      const p = ease(t, 0, dur), pan = ease(t, tb - .8, tb + .2); cam.position.set(lerp(-1.2, 1.0, pan), lerp(2.3, 2.4, pan), lerp(10.8, 10, p)); cam.lookAt(lerp(-1.0, 1.1, pan), 1.5, -.3);
      tempel(perabot, R, cam, [0, 2.35, 0], seg(t, tp - .3, tp + .1) * (1 - seg(t, tb - .6, tb - .2))); show(bata, seg(t, tb - .1, tb + .3)) } };
  },
  D0_AJAK(s, root) {   // hologram dari kapsul: tiga aturan menyala satu-satu; pertanyaan negara rumah pertama
    const sc = SORE({ sky: ['#6E7CD0', '#FFB088'] }); bulan(sc, { p1: [-30, 26, -150], p2: [34, 38, -160], r1: 18 }); planet(sc, { hole: (x, z) => Math.abs(x) < 7 && Math.abs(z) < 6 }); kapsulMiring(sc, [4.6, 0, -3.2]);
    const H = hologram(sc, [0, 0, -1.2], [['FOLLOW', '= 1 pendatang turun'], ['LIKE', '= 10 bata'], ['KOMEN', '= negara berikutnya']]); const D = dena([-1.5, 0, 2.6]); sc.add(D); D.rotation.y = .5;
    const R = penggaris(sc, [1.6, 0, 2.2]); R.rotation.y = -.5; const cam = camera(42);
    const q = X.ab({ left: 40, top: 1295, width: 1000, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<div style="font-size:34px;font-weight:700;color:#FFF3E2;letter-spacing:3px;text-shadow:0 4px 14px #000">RUMAH PERTAMA TIRU NEGARA MANA?</div><div style="display:flex;gap:16px;justify-content:center;margin-top:16px">` +
      ['❄️ ISLANDIA', '⛺ MONGOLIA', '🍁 KANADA'].map(x => `<div style="background:rgba(42,30,86,.95);color:#FFF3E2;font-size:40px;font-weight:800;padding:14px 22px;border-radius:16px;border:2px solid #FF9F45;box-shadow:0 10px 24px #0000005c">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); H.userData.plates[i].scale.setScalar(Math.max(.001, E.back(seg(t, tc - .1, tc + .35)))) });
      const ti = at(s, 'Islandia', dur - 3.5); D.pose(t, { point: t > at(s, 'Follow', 1) - .2 && t < ti, talk: true, cheer: t > ti + 1.6 }); R.pose(t, { senang: true, cheer: t > ti + 1.6, look: .4 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-.3, 0, p), lerp(2.6, 2.4, p), lerp(13.4, 12.4, p)); cam.lookAt(0, 2.2, -.6); show(q, seg(t, ti - .5, ti)) } };
  },
};

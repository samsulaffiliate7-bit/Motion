// Shot Kades S1 video ATURAN MAIN (lihat STORYBOARD.md).
import { lerp, seg, E, mesh, G, group, camera, island, tree, person } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SORE, SENJA, juara, desaSepi, gapuraTua, balai, stasiun, BIG, show, pulse } from '../_s1/dunia.js';

const ease = (t, a, b) => E.inout(seg(t, a, b));
const LABEL = (root, a, b) => X.ab({ left: 60, top: 330, width: 960, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
  `<div style="display:inline-block;background:rgba(21,53,42,.94);color:#F4EBD3;border-radius:18px;padding:16px 34px;box-shadow:0 12px 28px #0000005c;border:1px solid #ffffff22">
   <div style="font-size:66px;font-weight:800;color:#E8B94A;letter-spacing:2px">${a}</div><div style="font-size:42px;font-weight:700">${b}</div></div>`);

export const SHOTS = {
  KA_HOOK(s, root) {   // drone turun dari langit ke desa, Juara melambai
    const sc = SORE(); const D = desaSepi(sc); gapuraTua(sc, [0, 0, 13.5]); const J = juara([0, 0, 10]); sc.add(J); const cam = camera(42);
    const h = BIG(root, 'ATURAN MAIN', { top: 340, fontSize: '110px' });
    return { scene: sc, cam, upd(t, dur) { const p = ease(t, 0, dur); cam.position.set(lerp(6, 2, p), lerp(22, 2.4, p), lerp(30, 16, p)); cam.lookAt(0, lerp(0, 1.4, p), lerp(2, 10, p)); J.pose(t, { wave: true, talk: t > 1 }); D.angin(t); pulse(h, seg(t, .1, .5)) } };
  },
  KA_PREMIS(s, root) {   // tracking di jalan desa yang dipaku
    const sc = SORE({ sky: ['#E3A062', '#F9E2C0'] }); const D = desaSepi(sc); const J = juara([0, 0, 10]); sc.add(J); J.rotation.y = Math.PI; const cam = camera(42);
    const l = LABEL(root, '30 HARI · 100 WARGA', 'gagal = dipecat');
    return { scene: sc, cam, upd(t, dur) { const q = seg(t, 0, dur); const jz = lerp(10, 0, q); J.position.z = jz; J.pose(t, { walk: 1, look: Math.sin(t) * .5 }); D.angin(t);
      cam.position.set(3, 2.1, jz + 4.4); cam.lookAt(-1.2, 1.2, jz - 1.5); show(l, seg(t, at(s, 'tiga puluh', 1.5) - .2, at(s, 'tiga puluh', 1.5) + .3)) } };
  },
  KA_FOLLOW(s, root) {   // kereta berhenti, satu perantau turun, papan 0 -> 1
    const sc = SENJA({ sky: ['#8A6A92', '#F2A86E'] }); island(sc, 30, 14, '#7FA34E', '#6B5440'); const S = stasiun(sc, [0, 0, 0]); const cam = camera(42);
    const P = person(sc, [-2.8, .5, -1.6], { body: '#3E86B0', pants: '#3B3B3B', skin: '#C98E64', hair: '#2A1A10' }); P.visible = false; const l = LABEL(root, 'FOLLOW', '= 1 perantau pulang kampung');
    let shown = 0;
    return { scene: sc, cam, upd(t, dur) { S.userData.kereta.position.x = lerp(-26, -5.3, E.out(seg(t, 0, 2))); const tp = 2.4; P.visible = t > tp; const w = seg(t, tp, tp + 1.6); P.position.z = lerp(-1.6, .6, w); P.rotation.y = 0; P.pose(t, { walk: w < 1 ? 1 : 0, wave: w >= 1 });
      const n = t > tp + 1.4 ? 1 : 0; if (n !== shown) { S.userData.setPulang(n); shown = n } const p = ease(t, 0, dur); cam.position.set(lerp(-6.5, -5, p), 1.8, lerp(9, 7.5, p)); cam.lookAt(-1.8, 1.3, -.4); show(l, seg(t, .2, .6)) } };
  },
  KA_LIKE(s, root) {   // papan dana desa di balai, angka naik tiap like
    const sc = SORE(); island(sc, 16, 12, '#8FB45A', '#7A5C3E'); balai(sc, [0, 0, -2]); const J = juara([-1.4, 0, 1.4]); sc.add(J); J.rotation.y = .6; const cam = camera(42);
    const papan = canvasPlane(2.6, 1.4, () => { }, 600); papan.position.set(.9, 1.5, 1.2); papan.rotation.y = -.15; sc.add(papan); [-1, 1].forEach(x => sc.add(mesh(G.box(.1, 1.6, .1), '#6E4A2C', [.9 + x * 1.2, .8, 1.15])));
    const draw = v => papan.userData.redraw((x, W, H) => { x.fillStyle = '#2E4A3A'; x.fillRect(0, 0, W, H); x.strokeStyle = '#8A6A3A'; x.lineWidth = 14; x.strokeRect(0, 0, W, H); x.fillStyle = '#E9DFC2'; x.textAlign = 'center';
      x.font = `700 ${Math.round(H * .14)}px Poppins`; x.fillText('DANA DESA', W / 2, H * .3); x.fillStyle = '#E8B94A'; x.font = `800 ${Math.round(H * .26)}px Poppins`; x.fillText('Rp' + v.toLocaleString('id-ID'), W / 2, H * .7) });
    const l = LABEL(root, 'LIKE', '= dana desa +Rp10.000'); let last = -1;
    return { scene: sc, cam, upd(t, dur) { const v = Math.floor(seg(t, .8, dur - 1) * 25) * X.TL.vars.kurs_like; if (v !== last) { draw(v); last = v } J.pose(t, { point: true, talk: true });
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .2, p), lerp(2.0, 1.8, p), lerp(10.5, 9, p)); cam.lookAt(.2, 1.4, .3); show(l, seg(t, .2, .6)) } };
  },
  KA_KOMEN(s, root) {   // kertas aduan beterbangan masuk kotak aduan
    const sc = SORE({ sky: ['#E09A5C', '#F8DDB8'] }); island(sc, 14, 12, '#8FB45A', '#7A5C3E'); tree(sc, [-4, 0, -3], 1.3, '#5E8F3A'); tree(sc, [4.5, 0, -2.5], 1.1, '#5E8F3A', 'palm');
    const kotak = group(sc, [0, 0, 0]); kotak.add(mesh(G.box(.12, 1.1, .12), '#6E4A2C', [0, .55, 0])); kotak.add(mesh(G.box(1.1, .8, .8), '#B5302A', [0, 1.5, 0])); kotak.add(mesh(G.box(.6, .05, .1), '#1E1E1E', [0, 1.91, .1], { cast: false }));
    const lbl = canvasPlane(1.0, .28, (x, W, H) => { x.fillStyle = '#F4EBD3'; x.fillRect(0, 0, W, H); x.fillStyle = '#B5302A'; x.font = `800 ${Math.round(H * .6)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADUAN', W / 2, H / 2 + 2) }, 300); lbl.position.set(0, 1.5, .41); kotak.add(lbl);
    const kertas = Array.from({ length: 12 }, () => { const m = mesh(G.box(.26, .01, .18), '#FFFFFF', [0, -5, 0], { cast: false }); sc.add(m); return m }); const J = juara([1.8, 0, .8]); sc.add(J); J.rotation.y = -.7; const cam = camera(42);
    const l = LABEL(root, 'KOMEN', '= aduan warga · paling rame dikerjain');
    return { scene: sc, cam, upd(t, dur) { kertas.forEach((k, i) => { const q = seg(t, .5 + i * .35, 1.7 + i * .35); k.visible = q > 0 && q < 1; const a = i * 2.1; k.position.set(lerp(Math.cos(a) * 5, 0, q), lerp(3 + Math.sin(i) * 1.5, 1.95, q) + Math.sin(q * Math.PI) * 1.2, lerp(Math.sin(a) * 4 + 2, .1, q)); k.rotation.set(t * 5 + i, t * 3, 0) });
      J.pose(t, { talk: true, nod: t > dur - 2 }); const p = ease(t, 0, dur); cam.position.set(lerp(-1.6, -.6, p), lerp(2.2, 1.9, p), lerp(6.8, 5.4, p)); cam.lookAt(.3, 1.4, 0); show(l, seg(t, .2, .6)) } };
  },
  KA_MINGGU(s, root) {   // langit menggelap di atas desa: tiap akhir pekan kejadian besar
    const sc = SENJA({ sky: ['#2E2E4A', '#7A5A6A'], sunI: 1.3, hemi: .8 }); const D = desaSepi(sc); const awan = Array.from({ length: 10 }, (_, i) => { const m = mesh(G.ico(1.6 + (i % 3) * .5, 1), '#4A4A5A', [0, 9, 0], { cast: false, mat: { flatShading: false } }); sc.add(m); return m });
    const cam = camera(42); const l = LABEL(root, 'TIAP AKHIR PEKAN', 'ada kejadian besar');
    return { scene: sc, cam, upd(t, dur) { awan.forEach((a, i) => a.position.set(-14 + ((t * 1.5 + i * 3.4) % 28), 8 + (i % 3), -10 + (i * 2.6) % 22)); D.angin(t * 2.5);
      orbit(cam, t * 8 - 20, 8, 22, [0, 1, 0]); show(l, seg(t, .2, .6)) } };
  },
  KA_MULAI(s, root) {   // gapura: Juara menunjuk ke jalan masuk, MULAI DARI HARI 0
    const sc = SORE({ sky: ['#E9A866', '#FCE7C6'] }); const D = desaSepi(sc); gapuraTua(sc, [0, 0, 13.5]); const J = juara([1.6, 0, 14.6]); sc.add(J); J.rotation.y = -.8; const cam = camera(42);
    const h = BIG(root, 'MULAI DARI<br>HARI 0', { top: 560, fontSize: '104px', lineHeight: 1.05 });
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { point: true, talk: t < dur - 1.5 }); D.angin(t); const p = ease(t, 0, dur); cam.position.set(lerp(3.6, 2.6, p), lerp(1.4, 1.7, p), lerp(21, 19.5, p)); cam.lookAt(0, 1.9, 13); pulse(h, seg(t, .2, .6)) } };
  },
};
function orbit(cam, ang, h, dist, tgt) { const a = ang * Math.PI / 180; cam.position.set(tgt[0] + Math.sin(a) * dist, tgt[1] + h, tgt[2] + Math.cos(a) * dist); cam.lookAt(...tgt) }

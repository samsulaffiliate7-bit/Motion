// Shot Kerajaan Berdasi S1 video ATURAN MAIN (lihat STORYBOARD.md). HUD di-set ulang tiap frame (render paralel per frame).
import { THREE, lerp, seg, E, mesh, G, group, camera, person } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { CERAH, SORE, belang, catHead, prajurit, tikusRaksasa, benua, SPOT, BIG, POP, show, pulse, ease, labelKerajaan, setHUD, FONT, ORANGE, PARCH, INK, NAVY } from '../_s1/dunia.js';

const base = () => X.TL.vars.hud;
const LABEL = (root, a, b) => X.ab({ left: 60, top: 330, width: 960, textAlign: 'center', opacity: 0, fontFamily: FONT, fontWeight: 800 }, root,
  `<div style="display:inline-block;background:${PARCH};border:6px solid #8A5A2A;border-radius:18px;padding:10px 34px 14px;box-shadow:0 12px 28px #00000066">
   <div style="font-size:64px;color:#B5452B;letter-spacing:2px;line-height:1.1">${a}</div><div style="font-size:40px;color:${INK}">${b}</div></div>`);
const WARGA = [['#9AA0A8', '#6E747C', '#3E86B0'], ['#F4F0E6', null, '#D9603B'], ['#3A3A40', null, '#6E9A5C'], ['#E8C89A', '#B8875A', '#B84E7A'], ['#C9772E', '#8A4A1A', '#E8B94A'], ['#B8B8BE', '#7A7A82', '#5E6FAE']];
function kucingWarga(sc, p, i) { const [sk, st, bd] = WARGA[i % 6]; const g = person(sc, p, { body: bd, pants: '#3B3B4F', skin: sk }); catHead(g, { skin: sk, stripe: st }); return g }

export const SHOTS = {
  HA_TITLE(s, root) {   // layar judul di atas benua: logo + PRESS START berkedip
    const sc = CERAH({ fog: ['#D8ECF8', 200, 600] }); const B = benua(sc); const cam = camera(42);
    const logo = X.ab({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, opacity: 0 }, root,
      `<div style="font-size:40px;color:${PARCH};letter-spacing:12px;text-shadow:0 4px 12px #000">✦ SEASON 1 ✦</div><div style="font-size:128px;line-height:.95;color:${PARCH};text-shadow:0 6px 0 ${ORANGE},0 12px 0 ${INK},0 20px 40px rgba(0,0,0,.5)">KERAJAAN<br>BERDASI</div>`);
    const ps = X.ab({ left: 0, top: 1180, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '54px', color: '#FFFFFF', textShadow: `0 4px 0 ${INK}`, letterSpacing: '6px' }, root, '▶ PRESS START');
    return { scene: sc, cam, upd(t, dur) { setHUD(base()); const a = t * .05 + .3; cam.position.set(Math.sin(a) * 170, 130, Math.cos(a) * 170 + 20); cam.lookAt(0, 0, 10); pulse(logo, seg(t, .1, .5)); ps.style.opacity = Math.sin(t * 6) > -.3 ? 1 : .15 } };
  },
  HA_KARAKTER(s, root) {   // pilih karakter: Belang berputar di alas, kartu status
    const sc = CERAH(); const B = benua(sc); const P = SPOT.plaza; const ped = group(sc, [P[0], 0, P[2] + 4]); ped.add(mesh(G.cyl(1.2, 1.35, .5, 28), '#2E3A5E', [0, .25, 0], { mat: { flatShading: false } })); ped.add(mesh(G.cyl(1.25, 1.25, .06, 28), ORANGE, [0, .52, 0], { mat: { flatShading: false } }));
    const J = belang([0, .53, 0], { parent: ped }); const cam = camera(36);
    const card = X.ab({ left: 590, top: 980, width: 440, fontFamily: FONT, fontWeight: 800, background: `${NAVY}EE`, border: `4px solid ${ORANGE}`, borderRadius: '18px', padding: '18px 24px', color: PARCH, boxShadow: '0 14px 30px #00000070', opacity: 0 }, root,
      `<div style="font-size:52px;color:${ORANGE}">BELANG</div><div style="font-size:30px;line-height:1.5">Kelas: Prajurit<br>Level: 1<br>HP: 10 / 10<br>Senjata: Sendok 🥄<br>Dasi: <span style="color:#FF8A80">❌ MENOLAK</span></div>`);
    return { scene: sc, cam, upd(t, dur) { setHUD(base()); ped.rotation.y = t * .9; J.pose(t, { talk: true, cheer: t > at(s, 'Sendok', dur - 1.5) - .2 }); cam.position.set(P[0] - 1.2, 2.0, P[2] + 11); cam.lookAt(P[0] + .55, 1.4, P[2] + 4); show(card, seg(t, .4, .8), 0) } };
  },
  HA_FOLLOW(s, root) {   // papan Guild Netizen: rekrutan kucing berlari masuk, daftar party bertambah
    const sc = CERAH(); const B = benua(sc); const P = SPOT.plaza; const bd = group(sc, [P[0] - 3, 0, P[2] + 1]); bd.rotation.y = .35; [-1, 1].forEach(x => bd.add(mesh(G.box(.2, 3.6, .2), '#6E4A2C', [x * 1.7, 1.8, 0])));
    const board = canvasPlane(3.2, 2.6, () => { }, 520); board.position.set(0, 2.3, .12); bd.add(board); bd.add(mesh(G.box(3.4, 2.8, .12), '#8A5A33', [0, 2.3, 0]));
    const draw = n => board.userData.redraw((c, W, H) => { c.fillStyle = '#F6E7C1'; c.fillRect(0, 0, W, H); c.fillStyle = '#B5452B'; c.font = `800 ${H * .1}px Baloo`; c.textAlign = 'center'; c.fillText('🛡 GUILD NETIZEN', W / 2, H * .14);
      c.textAlign = 'left'; c.fillStyle = '#2A1A10'; c.font = `800 ${H * .075}px Baloo`; c.fillText('1. Belang (ketua)', W * .1, H * .3); for (let i = 0; i < n; i++) c.fillText(`${i + 2}. Anggota baru #${i + 1}`, W * .1, H * (.41 + i * .11)) });
    const R = Array.from({ length: 5 }, (_, i) => { const g = kucingWarga(sc, [P[0] + 6 + i, 0, P[2] + 9 + i], i); return g }); const J = belang([P[0] - .2, 0, P[2] + 3.4]); J.rotation.y = .2; sc.add(J); const cam = camera(42);
    const l = LABEL(root, 'FOLLOW', '= masuk Guild Netizen (party Belang)'); let last = -1;
    return { scene: sc, cam, upd(t, dur) { setHUD(base()); let n = 0; R.forEach((g, i) => { const t0 = .6 + i * .7, q = seg(t, t0, t0 + 1.4); if (q >= 1) n = i + 1; g.position.set(lerp(P[0] + 7 + i, P[0] + .6 + (i % 3) * 1.1, E.out(q)), 0, lerp(P[2] + 10, P[2] + 4.6 + Math.floor(i / 3) * 1.1, E.out(q)));
        g.rotation.y = q < 1 ? -2.4 : .4; g.pose(t + i, { walk: q > 0 && q < 1 ? 1.4 : 0, cheer: q >= 1 }) }); if (n !== last) { draw(n); last = n } J.pose(t, { wave: true, talk: true });
      const p = ease(t, 0, dur); cam.position.set(P[0] + lerp(-1.2, -1.6, p), lerp(2.6, 2.3, p), P[2] + lerp(14, 12.5, p)); cam.lookAt(P[0] - 2.2, 1.7, P[2] + 2.5); show(l, seg(t, .2, .6)) } };
  },
  HA_LIKE(s, root) {   // hujan koin emas, gold & XP naik di HUD, LEVEL UP
    const sc = CERAH(); const B = benua(sc); const P = SPOT.plaza; const J = belang([P[0], 0, P[2] + 4]); sc.add(J); const cam = camera(40); const V = X.TL.vars;
    const coins = Array.from({ length: 40 }, (_, i) => { const m = mesh(G.cyl(.18, .18, .05, 16), '#F5C542', [0, -5, 0], { mat: { metalness: .6, roughness: .3 } }); sc.add(m); return m });
    const l = LABEL(root, '1 LIKE = 1 GOLD', '10 LIKE = +1 XP'); const up = BIG(root, 'LEVEL UP! Lv 2', { top: 600, fontSize: '96px' });
    return { scene: sc, cam, upd(t, dur) { const q = seg(t, .6, dur - 1.6); const g = Math.round(q * V.demo), xp = Math.floor(g / V.kurs); const lv = xp >= 10 ? 2 : 1;
      setHUD(Object.assign({}, base(), { gold: g, lv, xp: [lv > 1 ? xp - 10 : xp, lv > 1 ? 20 : 10] }));
      coins.forEach((c, i) => { const k = ((t * .9 + i / 40) % 1); c.visible = t > .5; c.position.set(P[0] + Math.sin(i * 2.3) * 1.6, lerp(6, .1, k), P[2] + 4 + Math.cos(i * 1.7) * 1.2); c.rotation.set(t * 6 + i, t * 4, 0) });
      J.pose(t, { cheer: true, bounce: true }); const p = ease(t, 0, dur); cam.position.set(P[0] + lerp(1.4, .8, p), lerp(1.4, 1.6, p), P[2] + lerp(10.5, 9, p)); cam.lookAt(P[0], 1.7, P[2] + 4); show(l, seg(t, .2, .6)); pulse(up, seg(t, dur - 1.6, dur - 1.3)) } };
  },
  HA_KOMEN(s, root) {   // peta benua: 4 kerajaan menyala satu-satu saat disebut
    const sc = CERAH({ fog: ['#D8ECF8', 200, 600] }); const B = benua(sc); const lab = labelKerajaan(root, B); const cam = camera(42);
    const l = LABEL(root, 'KOMEN', '= pilih kerajaan + tentukan quest');
    const chips = X.ab({ left: 40, top: 540, width: 1000, display: 'flex', gap: '10px', justifyContent: 'center', fontFamily: FONT, fontWeight: 800 }, root, '');
    return { scene: sc, cam, upd(t, dur) { setHUD(base()); const K = [['🐱 KUCING', 'Kucing'], ['🦅 BURUNG', 'Burung'], ['🦎 REPTIL', 'Reptil'], ['🐺 SERIGALA', 'Serigala']];
      chips.innerHTML = K.map(([x, w], i) => { const on = t > at(s, w, 1 + i) - .1; return `<div style="background:${on ? PARCH : NAVY + 'AA'};color:${on ? INK : '#FFFFFF66'};border:4px solid ${on ? ORANGE : '#FFFFFF33'};border-radius:14px;padding:10px 14px;font-size:32px;transform:scale(${on ? 1.06 : .94})">${x}</div>` }).join('');
      const p = ease(t, 0, dur); const a = lerp(-.2, .25, p); cam.position.set(Math.sin(a) * 190, 160, Math.cos(a) * 190 + 30); cam.lookAt(0, 0, 0); lab(cam, seg(t, .5, 1)); show(l, seg(t, .2, .6)) } };
  },
  HA_BOS(s, root) {   // tikus raksasa bangkit di belakang lumbung, mata merah; Belang kecil dengan sendok
    const sc = SORE({ sky: ['#5A6FB0', '#F2B08A'] }); const B = benua(sc); const Lp = SPOT.lumbung; const T = tikusRaksasa(sc, [Lp[0] + 3, -8, Lp[2] - 16], 2.5); T.rotation.y = -.69;
    const J = belang([Lp[0] - 9, 0, Lp[2] + 2]); J.rotation.y = 2.3; sc.add(J); const cam = camera(42);
    const l = LABEL(root, 'TIAP AKHIR PEKAN', '👹 BOS BESAR'); const cp = BIG(root, 'ULANG DARI CHECKPOINT', { top: 1240, fontSize: '56px', color: '#FFD3C8' });
    return { scene: sc, cam, upd(t, dur) { setHUD(base()); const r = E.out(seg(t, .3, 2.4)); T.position.y = lerp(-10, 1.5, r); T.userData.hd.rotation.x = Math.sin(t * 3) * .08; J.pose(t, { shake: t > 2, hold: true });
      const sh = t > 1 && t < 2.6 ? Math.sin(t * 60) * .05 : 0; cam.position.set(Lp[0] - 14 + sh, 1.3, Lp[2] + 7.5); cam.lookAt(Lp[0] - 1, lerp(3, 8.5, r), Lp[2] - 9); show(l, seg(t, .2, .6)); pulse(cp, seg(t, at(s, 'ulang', dur - 1.6), at(s, 'ulang', dur - 1.6) + .3)) } };
  },
  HA_MULAI(s, root) {   // gerbang kota: Belang berlari ke kamera, tombol NEW GAME
    const sc = CERAH(); const B = benua(sc, { hole: (x, z) => z > 78 && Math.abs(x) < 14 }); const G0 = SPOT.gerbang; const J = belang([G0[0], 0, G0[2] - 4]); sc.add(J); const cam = camera(42);
    const h = BIG(root, 'MULAI DARI<br>EPISODE 0', { top: 330, fontSize: '104px', lineHeight: 1.0 });
    const btn = X.ab({ left: 290, top: 1180, width: 500, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '56px', color: INK, background: `linear-gradient(${'#FFD45E'},${ORANGE})`, border: `5px solid ${INK}`, borderRadius: '22px', padding: '12px 0', boxShadow: `0 10px 0 ${INK}`, opacity: 0 }, root, '▶ NEW GAME');
    return { scene: sc, cam, upd(t, dur) { setHUD(base()); const q = seg(t, .3, dur - 1); J.position.z = lerp(G0[2] - 4, G0[2] + 5, q); J.pose(t, { walk: q < 1 ? 1.6 : 0, wave: q >= 1 });
      cam.position.set(1.4, 1.6, G0[2] + 11); cam.lookAt(0, 2.6, G0[2] - 2); pulse(h, seg(t, .2, .6)); pulse(btn, seg(t, 1, 1.3)); btn.style.transform += ` scale(${1 + Math.sin(t * 5) * .03})` } };
  },
};

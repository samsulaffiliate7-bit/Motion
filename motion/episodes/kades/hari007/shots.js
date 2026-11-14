// Shot Kades Hari 7: 1.200 warga baru, profesi + sapi, gapura Banyusegara, papan suara + tandon, 94 lampu surya, pilihan rumah susun / perumahan.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, house } from '../../../engine/w3d/kit.js';
import { X, DG, YEL, CREAM, INK, SUNNY, kades, warga, card, at, village, lahan, rowHouses, commentCard, txtSprite, gapura, canvasPlane, signText, cat, crop } from '../../../engine/w3d/desa3d.js';
function sapi(parent, p) {   // sapi low-poly putih belang
  const g = group(parent, p); g.add(mesh(G.box(1.3, .6, .6), '#F4F1EA', [0, .75, 0])); g.add(mesh(G.box(.45, .32, .62), '#3A2E28', [.15, .9, 0], { cast: false }));
  const hd = group(g, [.8, 1, 0]); hd.add(mesh(G.box(.42, .38, .4), '#F4F1EA', [0, 0, 0])); hd.add(mesh(G.box(.2, .18, .34), '#F2B8A0', [.24, -.08, 0]));
  [-1, 1].forEach(z => { hd.add(mesh(G.cone(.05, .2, 4), '#E8DCC2', [-.05, .26, z * .14])); hd.add(mesh(G.sph(.03, 6, 4), '#1E1E1E', [.2, .06, z * .12], { cast: false })) });
  [[-.5, -.2], [-.5, .2], [.5, -.2], [.5, .2]].forEach(([x, z]) => g.add(mesh(G.box(.14, .45, .14), '#F4F1EA', [x, .22, z])));
  const tail = mesh(G.box(.05, .5, .05), '#3A2E28', [-.68, .7, 0], { rot: [0, 0, .3] }); g.add(tail); g.userData = { hd, tail }; return g;
}
function bedeng(parent, x0, z0, rows = 4, len = 6, grow = 0) {   // bedeng tanah + tanaman
  const out = []; for (let r = 0; r < rows; r++) { parent.add(mesh(G.box(len, .18, .8), '#7A5230', [x0 + len / 2, .09, z0 + r * 1.3], { cast: false }));
    for (let i = 0; i < len / .7 - 1; i++) { const c = crop(parent, x0 + .5 + i * .7, z0 + r * 1.3, ['#E5484D', '#F2C14E', '#8E44AD'][r % 3]); c.position.y = .12; out.push(c) } } return out;
}
const grow = (objs, t, t0, gap = .04) => objs.forEach((o, i) => { const q = E.back(seg(t, t0 + i * gap, t0 + i * gap + .4)); o.scale.setScalar(Math.max(.001, q)) });
const popAt = (s, rx, fb) => at(s, rx, fb);

const NIGHT = o => newScene(Object.assign({ sky: ['#13204A', '#3A4E8A'], hemi: 1.0, sunI: 1.2, sun: '#B8C8FF', sunPos: [-6, 12, 8], shadow: 14 }, o));
function crowd(sc, n, x0, z0, cols = 14, gap = .55) { const g = group(sc, [0, 0, 0]); const C = ['#3E8FC4', '#E07B39', '#C2457A', '#6B8E5A', '#8E44AD', '#F2C14E', '#2E7D5B'];
  const geo = G.cyl(.16, .2, .55, 6), hg = G.sph(.15, 6, 5); const list = [];
  for (let i = 0; i < n; i++) { const p = group(g, [x0 + (i % cols) * gap + ((Math.floor(i / cols)) % 2) * gap / 2, 0, z0 + Math.floor(i / cols) * gap]); p.add(mesh(geo, C[i % 7], [0, .3, 0], { cast: false })); p.add(mesh(hg, '#C98E64', [0, .7, 0], { cast: false })); list.push(p) } return list }
function lampPost(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.08, 2, .08), '#4A4F56', [0, 1, 0])); g.add(mesh(G.box(.5, .04, .3), '#1E3A5F', [.1, 2.05, 0], { rot: [0, 0, .2] }));
  const bulb = mesh(G.sph(.22, 10, 8), '#FFF3B0', [0, 1.85, .05], { mat: { emissive: '#FFE38A', emissiveIntensity: 0 }, cast: false }); g.add(bulb); g.userData.bulb = bulb; return g }
function tandon(parent, p) { const g = group(parent, p); [[-.6, -.6], [.6, -.6], [-.6, .6], [.6, .6]].forEach(([x, z]) => g.add(mesh(G.box(.12, 2.4, .12), '#7A8A9A', [x, 1.2, z])));
  g.add(mesh(G.box(1.5, .12, 1.5), '#7A8A9A', [0, 2.4, 0])); g.add(mesh(G.cyl(.7, .7, 1.4, 16), '#3E8FC4', [0, 3.2, 0])); g.add(mesh(G.cyl(.72, .72, .1, 16), '#2E6F9E', [0, 3.95, 0])); return g }
export const SHOTS = {
  K_H007_HOOK(s, root) {   // frame 1: lautan orang di jalan desa menuju gapura, kamera menukik dari atas, angka +1.200 meledak
    const sc = newScene(SUNNY({ sky: ['#8FD3F5', '#FFF6E0'] })); village(sc); const g = gapura(sc, [0, 0, 6.2]); const V = X.TL.vars;
    const ppl = crowd(sc, 420, -3.4, 7.4, 14, .5); const big = X.ab({ left: 0, top: 290, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '160px', color: YEL, WebkitTextStroke: `16px ${INK}`, paintOrder: 'stroke fill', opacity: 0 }, root, '+1.200');
    const sub = card(root, '👥 komen WARGA semua!', { left: 240, top: 500, fontSize: '50px' }); const K = kades([0, 0, 4.4]); sc.add(K); K.rotation.y = 0; const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3, 1, p), lerp(16, 6, p), lerp(30, 14, p)); cam.lookAt(0, 0, lerp(12, 7, p));
      ppl.forEach((m, i) => { m.position.y = Math.abs(Math.sin(t * 6 + i)) * .08 }); K.pose(t, { shake: t < 2, cheer: t > popAt(s, 'resmi', 6) }); X.pop(big, seg(t, .1, .45)); X.pop(sub, seg(t, .5, .9)) } };
  },
  K_H007_WARGA(s, root) {   // kartu profesi menempel satu-satu di papan balai, orang dengan atribut berbaris; sapi menyusul
    const sc = newScene(SUNNY({ sky: ['#7CC6F2', '#FFF3D6'] })); village(sc); const V = X.TL.vars;
    const ppl = V.profil.map((pr, i) => { const w = warga([0, 0, 12], i); sc.add(w); return w }); const S = sapi(sc, [0, 0, 14]); S.rotation.y = -Math.PI / 2;
    const tags = V.profil.map(([u, job], i) => card(root, `${u} · ${job}`, { left: 60 + (i % 2) * 490, top: 300 + Math.floor(i / 2) * 92, fontSize: '34px', padding: '6px 16px' }));
    const big = card(root, `👥 penduduk ${V.pend.toLocaleString('id-ID')}`, { left: 260, top: 1120, fontSize: '54px' }, DG); const cw = card(root, '🐄 +1 sapi!', { left: 360, top: 1220, fontSize: '54px' }, '#C9472F'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(30, -15, seg(t, 0, dur)), 5, 16, [0, 1, 3]); ppl.forEach((w, i) => { const q = seg(t, .3 + i * .45, .3 + i * .45 + 3.5); w.position.set((i % 2 ? .6 : -.6), 0, lerp(12, 4 - i * .9, q)); w.rotation.y = Math.PI; w.pose(t + i, { walk: q < 1 ? 1 : 0, cheer: q >= 1 }) });
      tags.forEach((e, i) => X.pop(e, seg(t, .4 + i * .45, .7 + i * .45))); const ts = popAt(s, 'sapi', 7); const q = seg(t, ts, ts + 3); S.position.set(0, 0, lerp(13, -2, q)); S.userData.tail.rotation.z = .3 + Math.sin(t * 6) * .3;
      X.pop(cw, seg(t, ts + .3, ts + .7)); X.pop(big, seg(t, popAt(s, 'Penduduk', 9), popAt(s, 'Penduduk', 9) + .4)) } };
  },
  K_H007_GAPURA(s, root) {   // papan nama naik ke gapura, warga di balik gapura bersorak, kartu usulan pemenang
    const sc = newScene(SUNNY({ sky: ['#6FB7E8', '#FFE9C2'], sun: '#FFD9A0' })); village(sc); const g = gapura(sc, [0, 0, 6]); const V = X.TL.vars;
    const sign = canvasPlane(3.8, .6, signText('DESA ' + V.nama_desa, YEL)); sign.position.set(0, 3.3, .27); g.add(sign);
    const win = commentCard(root, '@Bi*** · like terbanyak', 'Banyusegara', 300, 180); const mean = card(root, '💧 banyu = air', { left: 330, top: 1000, fontSize: '50px' }, '#3E8FC4');
    const W = [0, 1, 2].map(i => { const w = warga([-1.6 + i * 1.6, 0, 4.2], i); sc.add(w); return w }); const ppl = crowd(sc, 120, -3, -1, 12, .5); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.5, -.8, p), lerp(1.6, 3, p), lerp(20, 17.5, p)); cam.lookAt(0, 2.9, 6);
      const tj = popAt(s, 'Banyusegara', 4); const q = E.back(seg(t, tj - .2, tj + .5)); sign.scale.set(Math.max(.001, q), Math.max(.001, q), 1); const qc = seg(t, .4, .8); win.style.opacity = qc; win.style.transform = 'rotate(-2deg)';
      X.pop(mean, seg(t, popAt(s, 'Banyu artinya', 7), popAt(s, 'Banyu artinya', 7) + .4)); W.forEach((w, i) => w.pose(t + i, { cheer: t > tj })) } };
  },
  K_H007_TALLY(s, root) {   // papan tulis: turus A/B kebun, meter like 38/100, lalu tandon biru naik di sebelah kebun
    const sc = newScene(SUNNY({ sky: ['#BFE6F7', '#FFFBEA'] })); island(sc, 16, 10, '#8BC34A', '#8D6E4A'); const V = X.TL.vars;
    const board = canvasPlane(6, 3.6, (x, W, H) => { x.fillStyle = '#2F4F3A'; x.fillRect(0, 0, W, H); x.strokeStyle = '#9C6B3E'; x.lineWidth = 22; x.strokeRect(0, 0, W, H); x.font = '700 44px Fredoka'; x.textAlign = 'left';
      [['TikTok', 3, 2], ['Instagram', 1, 0], ['YouTube', 3, 2]].forEach(([n, a, b], i) => { x.fillStyle = '#FFFFFF'; x.fillText(n, 30, 80 + i * 72); x.fillStyle = YEL; x.fillText('A ' + '|'.repeat(a), 260, 80 + i * 72); x.fillStyle = '#9ED8F5'; x.fillText('B ' + '|'.repeat(b), 400, 80 + i * 72) });
      x.font = '700 48px Fredoka'; x.fillStyle = YEL; x.fillText(`🥬 A ${V.a}  vs  B ${V.b}`, 30, 320) }); board.position.set(-2.4, 2.6, 0); sc.add(board); [-5.2, .4].forEach(px => sc.add(mesh(G.box(.22, 4.6, .22), '#7A4E2C', [px, 2.3, -.1])));
    const T = tandon(sc, [4, 0, .5]); const crops = bedeng(sc, 2, 2.6, 2, 4);
    const meter = X.ab({ left: 90, top: 300, width: 900, height: 66, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: '40px', overflow: 'hidden', opacity: 0 }, root, `<div style="height:100%;width:0%;background:#E5484D"></div>`);
    const ml = card(root, `❤️ ${V.like} / ${V.target} like · pos ronda ditunda`, { left: 150, top: 385, fontSize: '38px' }, '#C9472F'); const tc = card(root, '💧 TANDON menang telak', { left: 230, top: 1060, fontSize: '48px' }, '#3E8FC4');
    const ac = card(root, `🏦 sisa ${V.juta_ang} juta`, { left: 330, top: 1160, fontSize: '46px' }); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const tt = popAt(s, 'tandon', 7); const p = E.inout(seg(t, tt - .5, tt + 1.5)); cam.position.set(lerp(-2, 2.5, p), 3.4, 15); cam.lookAt(lerp(-2.2, 2, p), 2.4, 0);
      const tl = popAt(s, 'seratus like', 3); meter.style.opacity = seg(t, tl, tl + .3) * (1 - seg(t, tt - .5, tt)); meter.firstChild.style.width = (E.out(seg(t, tl + .2, tl + 1.4)) * V.like) + '%'; ml.style.opacity = seg(t, tl + .6, tl + 1) * (1 - seg(t, tt - .5, tt));
      const qT = E.back(seg(t, tt, tt + .8)); T.scale.set(1, Math.max(.001, qT), 1); X.pop(tc, seg(t, tt + .2, tt + .6)); X.pop(ac, seg(t, popAt(s, 'Anggaran', 10), popAt(s, 'Anggaran', 10) + .4)); grow(crops, t, .5, .03) } };
  },
  K_H007_LAMP(s, root) {   // senja -> malam: 94 tiang lampu surya menyala berurutan di sepanjang jalan, penghitung follower
    const sc = NIGHT({ hemi: 1.1 }); village(sc); const V = X.TL.vars; const lamps = []; for (let i = 0; i < 24; i++) { const side = i % 2 ? 1 : -1; lamps.push(lampPost(sc, [side * 2.1, 0, -7.5 + Math.floor(i / 2) * 1.35])) }
    const extra = []; for (let i = 0; i < 18; i++) extra.push(lampPost(sc, [-7 + (i % 6) * 2.8, 0, -7 + Math.floor(i / 6) * 7]));
    const all = lamps.concat(extra); const cnt = X.ab({ left: 0, top: 300, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: '#FFE38A', WebkitTextStroke: `12px ${INK}`, paintOrder: 'stroke fill', opacity: 0 }, root, '0');
    const fc = card(root, `👤 +${V.follow} follower`, { left: 290, top: 470, fontSize: '50px' }); const eq = card(root, '10 follower = 1 lampu 💡', { left: 240, top: 570, fontSize: '44px' }, DG); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-20, 25, seg(t, 0, dur)), 9, 18, [0, 0, 0]); const tl = popAt(s, 'lampu jalan', 4); const k = E.inout(seg(t, tl - .5, tl + 3));
      all.forEach((L, i) => { const on = k * all.length > i; L.userData.bulb.material.emissiveIntensity = on ? 2.2 : 0 }); cnt.style.opacity = seg(t, tl - .5, tl); cnt.textContent = '💡 ' + Math.round(k * V.lampu);
      X.pop(fc, seg(t, popAt(s, 'follower baru', 1.5), popAt(s, 'follower baru', 1.5) + .4)); X.pop(eq, seg(t, popAt(s, 'Tiap sepuluh', 3), popAt(s, 'Tiap sepuluh', 3) + .4)) } };
  },
  K_H007_ASK(s, root) {   // dua lahan: kiri rumah susun 4 lantai naik, kanan kavling perumahan di lahan timur menggeser kebun; huruf A/B melayang
    const sc = newScene(SUNNY({ sky: ['#FFD9A0', '#FFF6E6'], sun: '#FFC58A' })); island(sc, 20, 12, '#8BC34A', '#8D6E4A'); rowHouses(sc, -2.6, -4.5, .6);
    const rs = group(sc, [-5, 0, 1]); const floors = [0, 1, 2, 3].map(i => { const f = group(rs, [0, i * 1.1, 0]); f.add(mesh(G.box(3.4, 1, 2.2), ['#F3E1C4', '#E9C9A8'][i % 2], [0, .5, 0])); for (let k = 0; k < 4; k++) f.add(mesh(G.box(.45, .4, .05), '#9ED8F5', [-1.2 + k * .8, .55, 1.11], { cast: false })); return f });
    rs.add(mesh(G.box(3.6, .2, 2.4), '#C9472F', [0, 4.5, 0])); const plots = []; for (let i = 0; i < 12; i++) { const m = mesh(G.box(1.1, .06, 1.1), '#D9C9A3', [3 + (i % 4) * 1.4, .04, -.5 + Math.floor(i / 4) * 1.4], { cast: false }); sc.add(m); plots.push(m) }
    const crops = bedeng(sc, 3, 4.2, 1, 5); const sa = txtSprite('A', YEL, INK, 1.6), sb = txtSprite('B', '#3E8FC4', '#fff', 1.6); sa.position.set(-5, 6, 1); sb.position.set(5, 3, 1); sc.add(sa); sc.add(sb);
    const ca = card(root, '🏢 A rumah susun · hemat lahan', { left: 60, top: 300, fontSize: '40px' }), cb = card(root, '🏡 B perumahan timur · kebun geser', { left: 60, top: 410, fontSize: '40px' }, '#3E8FC4'), cc = card(root, '📅 hasil 2 hari lagi', { left: 300, top: 1100, fontSize: '48px' }, '#C9472F'); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .25) * 8, 7, 23, [-.3, 1.8, 0]); const ta = popAt(s, 'rumah susun', 2), tb = popAt(s, 'perumahan baru', 5);
      floors.forEach((f, i) => { const q = E.back(seg(t, ta + i * .25, ta + .5 + i * .25)); f.scale.set(1, Math.max(.001, q), 1) }); plots.forEach((m, i) => m.visible = t > tb + i * .05); crops.forEach(c => c.position.x += 0);
      sa.position.y = 6 + Math.sin(t * 2) * .2; sb.position.y = 3 + Math.sin(t * 2 + 1) * .2; X.pop(ca, seg(t, ta, ta + .4)); X.pop(cb, seg(t, tb, tb + .4)); X.pop(cc, seg(t, popAt(s, 'dua hari', 8), popAt(s, 'dua hari', 8) + .4)) } };
  },
};

// Shot Kades Hari 5: warga baru dari quest WARGA, tenda, antre sumur, pilihan sumur kedua / tandon.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, house } from '../../../engine/w3d/kit.js';
import { X, DG, YEL, CREAM, INK, SUNNY, kades, warga, card, at, tag3, village, lahan, rowHouses, commentCard, txtSprite, gapura, canvasPlane, signText, cat } from '../../../engine/w3d/desa3d.js';
const tent = (sc, p, c) => { const t = group(sc, p); t.add(mesh(G.cone(.9, 1.2, 4), c, [0, .6, 0], { rot: [0, Math.PI / 4, 0] })); t.add(mesh(G.box(.3, .5, .05), '#2A2A2A', [0, .25, .62])); return t };
const TC = ['#E07B39', '#3E8FC4', '#F2C14E', '#C2457A', '#6B8E5A', '#8E44AD'];
export const SHOTS = {
  K_H005_HOOK(s, root) {   // kamera menukik ke gapura: barisan panjang warga baru, angka besar 13
    const sc = newScene(SUNNY({ sky: ['#7CC6F2', '#FFF3D6'] })); village(sc); gapura(sc, [0, 0, 5.6]); const V = X.TL.vars;
    const ppl = Array.from({ length: V.baru }, (_, i) => { const w = warga([0, 0, 12], i); sc.add(w); return w });
    const big = X.ab({ left: 0, top: 300, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '170px', color: YEL, WebkitTextStroke: `16px ${INK}`, paintOrder: 'stroke fill', opacity: 0 }, root, '+13');
    const sub = card(root, '👥 warga baru sekaligus!', { left: 230, top: 520, fontSize: '44px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, 3)); orbit(cam, lerp(40, 8, p), lerp(20, 4, p), lerp(26, 17, p), [0, 1, 5]);
      ppl.forEach((w, i) => { const q = seg(t, .3 + i * .25, .3 + i * .25 + 3); w.visible = q > 0; w.position.set((i % 3 - 1) * .8, 0, lerp(13, 1 - Math.floor(i / 3) * .9, q)); w.rotation.y = Math.PI; w.pose(t + i, { walk: q < 1 ? 1 : 0, cheer: q >= 1 }) });
      X.pop(big, seg(t, .2, .6)); X.pop(sub, seg(t, .8, 1.2)) } };
  },
  K_H005_LIST(s, root) {   // papan nama warga di balai: nama samaran menempel per platform
    const sc = newScene(SUNNY({ sky: ['#9ED8F5', '#F2FAFF'] })); island(sc, 14, 10, '#8BC34A', '#8D6E4A'); const V = X.TL.vars;
    const board = group(sc, [0, 0, -1]); board.add(mesh(G.box(7, 4, .25), '#9C6B3E', [0, 2.6, 0])); board.add(mesh(G.box(6.6, 3.6, .05), '#F3E3BE', [0, 2.6, .14])); [-3.3, 3.3].forEach(x => board.add(mesh(G.box(.25, 4.6, .25), '#7A4E2C', [x, 2.3, 0])));
    const cols = [['YouTube', '#E5484D', V.yt], ['TikTok', '#1E1E1E', V.tt], ['IG', '#C2457A', V.ig]]; let k = 0;
    const tags = []; cols.forEach(([pf, c, n], ci) => { for (let i = 0; i < n; i++) { const pl = canvasPlane(1.9, .42, signText(V.nama[k++], CREAM)); pl.position.set(-2.2 + ci * 2.2, 3.9 - i * .48, .2); board.add(pl); tags.push(pl) } });
    const hd = cols.map(([pf, c, n], i) => card(root, `${pf}: ${n}`, { left: 60 + i * 330, top: 300, fontSize: '38px' }, c));
    const K = kades([3.9, 0, 1.2]); sc.add(K); K.rotation.y = -.7; const q = commentCard(root, '@A.***', '“pak saya mau gabung gimana caranya”', 1060, 120);
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(lerp(-.6, .6, seg(t, 0, dur)), 2.8, 15.5); cam.lookAt(0, 2.5, -1); tags.forEach((m, i) => { const qq = E.back(seg(t, .3 + i * .18, .6 + i * .18)); m.scale.setScalar(Math.max(.001, qq)) });
      hd.forEach((e, i) => X.pop(e, seg(t, .4 + i * .5, .8 + i * .5))); K.pose(t, { point: true, talk: true }); const tg = at(s, 'gimana caranya', 5); const qq = seg(t, tg, tg + .4); q.style.opacity = qq; q.style.transform = 'rotate(-2deg)' } };
  },
  K_H005_TENTS(s, root) {   // senja: lima rumah + perkemahan tenda warna-warni, uang dana tahap dua jatuh ke kotak
    const sc = newScene(SUNNY({ sky: ['#F7B77A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-12, 8, 6] })); lahan(sc, { well: true }); rowHouses(sc, -6.4, -3, 1.6); const V = X.TL.vars;
    const tents = Array.from({ length: 10 }, (_, i) => tent(sc, [-5 + (i % 5) * 2.4, 0, 3 + Math.floor(i / 5) * 2], TC[i % 6]));
    const fire = mesh(G.cone(.3, .6, 6), '#F28C28', [0, .3, 4], { mat: { emissive: '#F28C28', emissiveIntensity: 1 } }); sc.add(fire);
    const C = [[`👥 ${V.pend} penduduk`, 'Penduduk'], [`🏠 rumah cuma ${V.rumah}`, 'rumahnya'], [`💰 dana tahap 2: ${V.juta_ang} juta`, 'cair'], ['⛺ sementara di tenda', 'tenda']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? DG : INK) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-25, 20, E.inout(seg(t, 0, dur))), 10, 22, [0, .5, 1]); fire.scale.y = 1 + Math.sin(t * 15) * .2;
      tents.forEach((tn, i) => { const q = E.back(seg(t, at(s, 'tenda', 6) + i * .1, at(s, 'tenda', 6) + .4 + i * .1)); tn.scale.setScalar(Math.max(.001, q)) });
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K_H005_QUEUE(s, root) {   // kamera rendah menyusuri antrean ember panjang ke sumur
    const sc = newScene(SUNNY({ sky: ['#BFE6F7', '#FFFBEA'] })); const L = lahan(sc, { well: true }); const w0 = L.well.position;
    const q = Array.from({ length: 12 }, (_, i) => { const w = warga([w0.x, 0, w0.z + 1.4 + i * .8], i); sc.add(w); w.rotation.y = Math.PI; w.userData.st.arms[1].add(mesh(G.cyl(.15, .12, .25, 10), TC[i % 6], [0, -.6, .1])); return w });
    const ex = txtSprite('!', '#E5484D', '#fff', .8); sc.add(ex);
    const C = [['💧 sumur cuma 1', 'satu'], ['🪣 antre sampai jalan', 'jalan'], ['😤 mulai rebutan', 'rebutan']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, i === 2 ? '#C9472F' : INK) }));
    const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const p = seg(t, 0, dur); cam.position.set(w0.x + 3, 1.6, lerp(w0.z + 12, w0.z + 4, p)); cam.lookAt(w0.x, 1, w0.z);
      q.forEach((w, i) => w.pose(t + i, { look: Math.sin(t + i) * .4, shake: t > at(s, 'rebutan', 99) && i < 2 })); const tr = at(s, 'rebutan', 99); ex.visible = t > tr; ex.position.set(w0.x, 2.8, w0.z + 2);
      C.forEach(c => { const qq = at(s, c.cu, 99); X.pop(c.e, seg(t, qq, qq + .4)) }) } };
  },
  K_H005_CHOICE(s, root) {   // layar terbagi lewat dua kamera: kiri sumur kedua, kanan tandon + pipa
    const sc = newScene(SUNNY({ sky: ['#A7DDF7', '#F4FBFF'] })); lahan(sc, {}); rowHouses(sc, -6.4, -3, 1.6); const V = X.TL.vars;
    const w2 = group(sc, [5.6, 0, 4.5]); w2.add(mesh(G.cyl(.7, .7, .7, 14), '#B8C1CB', [0, .35, 0])); w2.add(mesh(G.cyl(.55, .55, .72, 14), '#3E8FC4', [0, .37, 0])); w2.add(mesh(G.cone(.95, .5, 4), '#C9472F', [0, 1.6, 0], { rot: [0, Math.PI / 4, 0] }));
    const tower = group(sc, [-1, 0, 2]); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => tower.add(mesh(G.box(.15, 3, .15), '#7D8A94', [x * .6, 1.5, z * .6]))); tower.add(mesh(G.cyl(.9, .9, 1.2, 14), '#3E8FC4', [0, 3.6, 0]));
    const pipes = [-6.4, -3.2, 0, 3.2].map(x => { const m = mesh(G.box(.12, .12, 1), '#7D8A94', [x, .1, -1.4], { cast: false }); sc.add(m); return m }); const main = mesh(G.box(11, .12, .12), '#7D8A94', [-1.6, .1, -.9], { cast: false }); sc.add(main);
    const ca = camera(42), cb = camera(42); const big = (l, c, x) => X.ab({ left: x, top: 300, width: 140, height: 140, borderRadius: '50%', background: c, border: `7px solid ${INK}`, color: l === 'A' ? INK : '#fff', fontSize: '90px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '130px', opacity: 0 }, root, l);
    const A = big('A', YEL, 200), B = big('B', '#3E8FC4', 740); const la = card(root, `sumur kedua · ${V.juta_sumur} jt`, { left: 30, top: 470, fontSize: '32px' }), lb = card(root, `tandon + pipa · ${V.juta_tandon} jt`, { left: 560, top: 470, fontSize: '32px' }, '#3E8FC4');
    const div = X.ab({ left: 534, top: 0, width: 12, height: 1920, background: INK, opacity: 0 }, root);
    return { scene: sc, cam: ca, render(R) { R.setScissorTest(true); R.setScissor(0, 0, 540, 1920); R.setViewport(0, 0, 540, 1920); R.render(sc, ca); R.setScissor(540, 0, 540, 1920); R.setViewport(540, 0, 540, 1920); R.render(sc, cb); R.setScissorTest(false) },
      upd(t, dur) { ca.aspect = cb.aspect = 540 / 1920; ca.updateProjectionMatrix(); cb.updateProjectionMatrix(); orbit(ca, 20 + t * 3, 4, 9, [5.6, .6, 4.5]); orbit(cb, -20 - t * 3, 6, 13, [-1, 1.8, 1]);
        const ta = at(s, 'Pilihan \\*?A', .3), tb = at(s, 'Pilihan \\*?B', 4); X.pop(A, seg(t, ta, ta + .4)); X.pop(la, seg(t, ta + .3, ta + .7)); X.pop(B, seg(t, tb, tb + .4)); X.pop(lb, seg(t, tb + .3, tb + .7)); div.style.opacity = 1;
        w2.scale.setScalar(Math.max(.001, E.back(seg(t, ta, ta + .6)))); tower.scale.setScalar(Math.max(.001, E.back(seg(t, tb, tb + .6)))); pipes.forEach((m, i) => m.visible = t > tb + .5 + i * .2); main.visible = t > tb + .4 } };
  },
  K_H005_VOTE(s, root) {   // pagi cerah ke awan mendung: tombol A/B, awan hujan datang dari kejauhan
    const sc = newScene(SUNNY({ sky: ['#8FA6BA', '#D8E3EC'], hemi: 1.1 })); village(sc); const K = kades([0, 0, 3]); sc.add(K); const O = cat(sc, [1.1, 0, 3.4]); O.rotation.y = -.5;
    const clouds = [0, 1, 2].map(i => { const g = group(sc, [-12 + i * 3, 8 + i * .5, -8]); [[0, 0, 0, 1.2], [1, -.2, 0, .9], [-1, -.2, 0, .8]].forEach(([x, y, z, r]) => g.add(mesh(G.ico(r, 1), '#7D8A94', [x, y, z], { cast: false }))); return g });
    const btn = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:#FFC93C;color:${INK};font-family:Fredoka;font-weight:700;font-size:90px;width:300px;padding:16px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">A<div style="font-size:32px">💧 sumur kedua</div></div><div style="background:#3E8FC4;color:#fff;font-family:Fredoka;font-weight:700;font-size:90px;width:300px;padding:16px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">B<div style="font-size:32px">🚰 tandon + pipa</div></div>`);
    const c1 = card(root, '📅 hasil dua hari lagi', { left: 250, top: 640, fontSize: '40px' }), c2 = card(root, '🌧️ nanti malam: hujan pertama', { left: 170, top: 745, fontSize: '40px' }, '#3E8FC4'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, t * 4 - 10, 3.4, 10, [0, 1.2, 3]); K.pose(t, { wave: true, talk: true }); O.userData.tail.rotation.z = .6 + Math.sin(t * 8) * .3;
      clouds.forEach((g, i) => g.position.x = -12 + i * 3 + t * .9); const q = seg(t, .3, .8); btn.style.opacity = q; btn.style.transform = `scale(${E.back(q)})`;
      X.pop(c1, seg(t, at(s, 'dua hari', 2), at(s, 'dua hari', 2) + .4)); X.pop(c2, seg(t, at(s, 'hujan pertama', dur - 2), at(s, 'hujan pertama', dur - 2) + .4)) } };
  },
};

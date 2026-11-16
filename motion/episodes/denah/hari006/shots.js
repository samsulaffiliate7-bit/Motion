// Shot Denah Hari 6: komentar Jepang, 3 faktor pindah ke kota, cek kota, keluarga ragu, sekolah vs klinik.
import { THREE, lerp, seg, E, mesh, mat, G, group, newScene, camera, orbit, island, house, person, globe } from '../../../engine/w3d/kit.js';
import { X, NAVY, GOLD, TERRA, CREAM, juragan, kepala, chip, tag3, popAt, stars, cityBoard, CC, RC, housing, shop, tower, cars, grow, txtSprite } from '../../../engine/w3d/bumi.js';
function school(parent, p) { const g = group(parent, p); g.add(mesh(G.box(4, 1.6, 2), '#F5E6C8', [0, .8, 0])); g.add(mesh(G.box(4.3, .2, 2.3), '#C9472F', [0, 1.7, 0])); for (let i = 0; i < 4; i++) g.add(mesh(G.box(.6, .5, .05), '#9ED8F5', [-1.5 + i, 1, 1.01], { cast: false }));
  g.add(mesh(G.box(.06, 2.6, .06), '#888', [2.6, 1.3, 1.2])); g.add(mesh(G.box(.7, .45, .03), '#E5484D', [2.95, 2.35, 1.2])); g.add(mesh(G.box(.7, .22, .035), '#FFFFFF', [2.95, 2.24, 1.21])); return g }
function clinic(parent, p) { const g = group(parent, p); g.add(mesh(G.box(3, 1.6, 2), '#FFFFFF', [0, .8, 0])); g.add(mesh(G.box(3.2, .2, 2.2), '#2E7D5B', [0, 1.7, 0])); g.add(mesh(G.box(.6, .18, .05), '#E5484D', [0, 1.2, 1.02])); g.add(mesh(G.box(.18, .6, .05), '#E5484D', [0, 1.2, 1.03])); g.add(mesh(G.box(.7, 1, .05), '#9ED8F5', [0, .5, 1.02])); return g }
export const SHOTS = {
  D_H006_HOOK(s, root) {   // globe malam: garis busur dari Jepang ke Jakarta, kartu komentar Jepang + terjemahan
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: .9, sunI: 2.6, sunPos: [8, 10, 12] }); stars(sc); const gl = globe(sc, 5, { highlight: ['Japan', 'Indonesia'] }); gl.face(15, 125); const V = X.TL.vars;
    const pts = []; for (let i = 0; i <= 30; i++) { const k = i / 30, la = lerp(36, -6.2, k), lo = lerp(139, 106.8, k); pts.push(gl.localToWorld ? new THREE.Vector3() : null) }
    const dots = Array.from({ length: 24 }, () => { const m = mesh(G.sph(.08, 6, 5), GOLD, [0, 0, 0], { mat: { emissive: GOLD, emissiveIntensity: 1 }, cast: false }); gl.add(m); return m });
    const jp = X.ab({ left: 90, top: 300, width: 900, background: '#FFFFFF', borderRadius: '26px', padding: '16px 24px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${NAVY}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root, `<div style="font-size:24px;color:#888">${V.komentar[0][0]} · komentar</div><div style="font-size:34px;font-weight:700">${V.komentar[0][1]}</div>`);
    const tr = chip(root, '🇯🇵→🇮🇩 “gimana bikin kota ramai?”', { left: 90, top: 520, fontSize: '38px' }, TERRA); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .2) * 6, 2, 18, [0, 0, 0]); dots.forEach((m, i) => { const k = (i / 24 + t * .15) % 1; const v = gl.userData.ll ? null : null; const la = lerp(36, -6.2, k), lo = lerp(139, 106.8, k), h = 5.3 + Math.sin(k * Math.PI) * 1.2; const a = la * Math.PI / 180, b = lo * Math.PI / 180; m.position.set(Math.cos(a) * Math.sin(b) * h, Math.sin(a) * h, Math.cos(a) * Math.cos(b) * h) });
      const q = seg(t, .3, .7); jp.style.opacity = q; jp.style.transform = 'rotate(-1deg)'; X.pop(tr, seg(t, popAt(s, 'gimana', 3), popAt(s, 'gimana', 3) + .4)) } };
  },
  D_H006_THREE(s, root) {   // tiga pilar 3D tumbuh: kerja (koper), tinggal (rumah), layanan (salib + buku)
    const sc = newScene({ sky: ['#9FD6F5', '#F3FBFF'], sunPos: [-6, 14, 10], shadow: 12 }); island(sc, 14, 8, '#9CCB6A', '#8D6E4A');
    const cols = [['#E5484D', -3.6], ['#F5C542', 0], ['#2E7D5B', 3.6]].map(([c, x]) => { const m = mesh(G.box(2, 1, 2), c, [x, .5, 0]); sc.add(m); return m });
    const icons = ['💼', '🏠', '🏫'].map((e, i) => { const sp = txtSprite(e, '#FFFFFF', NAVY, 1.4); sc.add(sp); return sp });
    const C = [['1. ada kerja', 'kerja'], ['2. ada tempat tinggal', 'tempat tinggal'], ['3. ada layanan', 'layanan']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '44px' }) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .3) * 10, 4, 15, [0, 1.6, 0]); C.forEach((c, i) => { const tc = popAt(s, c.cu, 1 + i); X.pop(c.e, seg(t, tc, tc + .4)); const h = 1 + 2.6 * E.out(seg(t, tc, tc + 1)); cols[i].scale.y = h; cols[i].position.y = h / 2; icons[i].position.set(cols[i].position.x, h + .9, 0); icons[i].visible = t > tc }) } };
  },
  D_H006_CHECK(s, root) {   // drone atas kota: centang hijau di pasar & rumah, silang merah di lahan kosong layanan
    const sc = newScene({ sky: ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true); const tick = cars(sc, 8);
    const mk = [shop(sc, [-2, 0, -1.8], { sign: '#E5484D', awn: '#F5C542' }), tower(sc, [2, 0, 1.6], 3)]; const hs = housing(sc, 0, 8, 3); const empty = mesh(G.box(6, .08, 6), '#D9C9A3', [8, .06, 8], { cast: false }); sc.add(empty);
    const t1 = tag3(root, '✅ kerja', '#2E7D5B'), t2 = tag3(root, '✅ tinggal', '#2E7D5B'), t3 = tag3(root, '❌ layanan', '#E5484D'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { tick(t); orbit(cam, lerp(-20, 15, E.inout(seg(t, 0, dur))), 26, 30, [1, 0, 3]); t1.at(mk[0], cam, [0, 2.5, 0], seg(t, popAt(s, 'pasar', 2), popAt(s, 'pasar', 2) + .4)); t2.at(hs[4], cam, [0, 2, 0], seg(t, popAt(s, 'rumah', 4), popAt(s, 'rumah', 4) + .4));
      t3.at(empty, cam, [0, 1.5, 0], seg(t, popAt(s, 'belum ada', 6), popAt(s, 'belum ada', 6) + .4)) } };
  },
  D_H006_GATE(s, root) {   // keluarga (ortu + anak + kakek) berhenti di gerbang kota, gelembung pikiran sekolah/klinik
    const sc = newScene({ sky: ['#F7B77A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-12, 7, 6], shadow: 12 }); island(sc, 16, 14, '#9CCB6A', '#8D6E4A'); sc.add(mesh(G.box(2, .05, 14), '#8A8F96', [0, .03, 0]));
    const gate = group(sc, [0, 0, -1]); [-1.6, 1.6].forEach(x => gate.add(mesh(G.box(.5, 3, .5), '#D9C9A3', [x, 1.5, 0]))); gate.add(mesh(G.box(3.8, .5, .6), TERRA, [0, 3.2, 0]));
    const fam = [[-.6, 1, '#3E8FC4'], [.6, 1, '#C2457A'], [0, .6, '#F5C542'], [1.4, .95, '#8E8E86']].map(([x, s, c], i) => { const p = person(sc, [x, 0, 3], { s, body: c }); p.rotation.y = Math.PI; return p });
    const th = ['🏫?', '🏥?'].map(e => { const sp = txtSprite(e, '#FFFFFF', NAVY, 1); sc.add(sp); return sp }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(150, 200, seg(t, 0, dur)), 2.4, 9, [0, 1.2, 1.5]); fam.forEach((p, i) => p.pose(t + i, { look: Math.sin(t + i) * .5, shake: t > 3 })); th.forEach((sp, i) => { sp.visible = t > popAt(s, i ? 'klinik' : 'sekolah', 3) - .2; sp.position.set(-.8 + i * 1.6, 2.8 + Math.sin(t * 2 + i) * .1, 3) }) } };
  },
  D_H006_CHOICE(s, root) {   // meja putar: sekolah (A) dan klinik (B) bergantian menghadap kamera
    const sc = newScene({ sky: ['#9FD6F5', '#F3FBFF'], sunPos: [-6, 14, 10], shadow: 12 }); const tt = group(sc); tt.add(mesh(G.cyl(5, 5, .4, 40), '#E8D9B5', [0, -.2, 0])); const V = X.TL.vars;
    const S = school(tt, [0, 0, -2.4]), Kl = clinic(tt, [0, 0, 2.4]); Kl.rotation.y = Math.PI;
    const a = chip(root, `A 🏫 sekolah · ${V.sekolah} koin`, { left: 60, top: 300, fontSize: '42px' }), b = chip(root, `B 🏥 klinik · ${V.klinik} koin`, { left: 60, top: 405, fontSize: '42px' }), c = chip(root, '🪙 cuma cukup satu… kecuali like', { left: 60, top: 510, fontSize: '40px' }, TERRA); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tb = popAt(s, 'Pilihan \\*?B', 5); tt.rotation.y = Math.PI + (t > tb ? lerp(0, Math.PI, E.inout(seg(t, tb, tb + 1))) : 0); orbit(cam, 0, 4, 12, [0, 1, 0]);
      X.pop(a, seg(t, popAt(s, 'Pilihan \\*?A', .5), popAt(s, 'Pilihan \\*?A', .5) + .4)); X.pop(b, seg(t, tb, tb + .4)); X.pop(c, seg(t, popAt(s, 'cukup', dur - 3), popAt(s, 'cukup', dur - 3) + .4)) } };
  },
  D_H006_ASK(s, root) {   // tombol A/B di atas kota senja + "arigatou" melambai, kepala bumi melambai
    const sc = newScene({ sky: ['#F4A27A', '#FFE7D2'], sun: '#FFB27A', sunPos: [-12, 6, 8], shadow: 20 }); cityBoard(sc); const tick = cars(sc, 8); const K = kepala([0, 0, 6]); sc.add(K);
    const btn = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:#F5C542;color:${NAVY};font-family:Fredoka;font-weight:700;font-size:90px;width:300px;padding:16px 0;border-radius:30px;border:8px solid ${NAVY};text-align:center;box-shadow:0 12px 0 ${TERRA}">A<div style="font-size:32px">🏫 sekolah</div></div><div style="background:#2E7D5B;color:#fff;font-family:Fredoka;font-weight:700;font-size:90px;width:300px;padding:16px 0;border-radius:30px;border:8px solid ${NAVY};text-align:center;box-shadow:0 12px 0 ${TERRA}">B<div style="font-size:32px">🏥 klinik</div></div>`);
    const c1 = chip(root, '📅 hasil dua hari lagi', { left: 250, top: 640, fontSize: '40px' }), ar = X.ab({ left: 0, top: 1030, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '110px', color: '#FFFFFF', WebkitTextStroke: `12px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, 'arigatou! 🙏'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { tick(t); orbit(cam, t * 3, 7, 16, [0, 1, 4]); K.pose(t, { wave: true, talk: true }); const q = seg(t, .3, .8); btn.style.opacity = q; btn.style.transform = `scale(${E.back(q)})`;
      X.pop(c1, seg(t, popAt(s, 'dua hari', 2), popAt(s, 'dua hari', 2) + .4)); X.pop(ar, seg(t, popAt(s, 'arigatou', dur - 2), popAt(s, 'arigatou', dur - 2) + .4)) } };
  },
};

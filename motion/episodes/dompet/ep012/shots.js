// Shot ep012 (Dua Timeline: Raka motor baru vs bekas + nabung)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin, tree } from '../../../engine/w3d/kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, chip, tag3, at } from '../../../engine/w3d/nana.js';
const A_COL = '#E07B39', B_COL = '#2E9C6A';
const raka = (parent, p, o = {}) => { const g = person(parent, p, Object.assign({ body: '#4A6FA5', pants: '#2F3540', hair: '#16100C', skin: '#C98E64' }, o)); g.add(mesh(G.box(.06, .7, .04), '#3A2A1E', [0, 1.05, .28], { rot: [0, 0, .7], cast: false })); g.add(mesh(G.box(.3, .22, .1), '#3A2A1E', [.3, .78, .2])); return g };
function motor(parent, p, body = '#3E7CB1', shiny = false) { const g = group(parent, p); [-.75, .75].forEach(x => { g.add(mesh(G.cyl(.38, .38, .16, 16), '#1E1E1E', [x, .38, 0], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.16, .16, .18, 10), '#AAA', [x, .38, 0], { rot: [Math.PI / 2, 0, 0] })) });
  g.add(mesh(G.box(1.3, .35, .34), body, [0, .72, 0], { mat: shiny ? { metalness: .5, roughness: .2 } : {} })); g.add(mesh(G.box(.7, .14, .36), '#222', [-.2, .95, 0])); g.add(mesh(G.box(.08, .6, .08), '#555', [.7, 1, 0], { rot: [0, 0, -.3] })); g.add(mesh(G.box(.06, .06, .7), '#333', [.8, 1.3, 0])); return g }
const badge = (root, txt, col, css) => X.ab(Object.assign({ background: col, color: '#fff', fontFamily: 'Baloo', fontWeight: 800, fontSize: '54px', padding: '6px 26px', borderRadius: '20px', border: `5px solid ${INK}`, opacity: 0 }, css), root, txt);
const big = (root, html, top, col, fs = 92) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `16px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };

export const SHOTS = {
  D3_E012_SIMPANG(s, root) {   // persimpangan pagi: dua Raka berdiri di depan dua jalan (dealer kiri, garasi kanan), papan selisih
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#9FD3F0', '#FFF1D6'], sun: '#FFF4E0', sunPos: [-8, 10, 8], hemi: 1.5, shadow: 16 })); sc.add(mesh(G.box(40, .2, 30), '#7FAF52', [0, -.1, 0]));
    [-1, 1].forEach(sx => { const r = mesh(G.box(3, .05, 20), '#5E6470', [sx * 2.6, .02, -9], { rot: [0, sx * -.35, 0], cast: false }); sc.add(r) });
    const dl = group(sc, [-6, 0, -12]); dl.add(mesh(G.box(5, 3.4, 3), '#F4F6F8', [0, 1.7, 0])); dl.add(mesh(G.box(5.2, .7, 3.2), A_COL, [0, 3.6, 0])); dl.add(mesh(G.box(4, 2, .05), '#BFE6F5', [0, 1.4, 1.52], { mat: { emissive: '#DDF3FF', emissiveIntensity: .5 }, cast: false }));
    const gr = group(sc, [6, 0, -12]); gr.add(mesh(G.box(4, 2.8, 3), '#E8D2B5', [0, 1.4, 0])); gr.add(mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), B_COL, [0, 3.4, 0], { s: [3.4, 1.2, 2.6], rot: [0, Math.PI / 4, 0] }));
    [[-9, -6], [9, -5], [-11, -16], [11, -15]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.6, ['#4E8F3A', '#6BA34A'][i % 2]));
    const A = raka(sc, [-1, 0, 1]), B = raka(sc, [1, 0, 1]); A.rotation.y = .3; B.rotation.y = -.3; const cam = camera(42);
    const ba = badge(root, 'A', A_COL, { left: 0, top: 0 }), bb = badge(root, 'B', B_COL, { left: 0, top: 0 });
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '54px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Gaji sama, umur sama.<br>3 tahun lagi saldo beda <span style="color:${B_COL}">Rp${v.beda_jt} juta</span>.`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(0, lerp(3.2, 3.8, p), lerp(10, 11, p)); cam.lookAt(0, lerp(1.2, 1.6, p), -4);
      A.pose(t, { look: -.6 }); B.pose(t + 1, { look: .6 });
      [[ba, A], [bb, B]].forEach(([e, P]) => { const [x, y] = X.proj(P, cam, [0, 2.4, 0]); e.style.left = (x - 40) + 'px'; e.style.top = (y - 90) + 'px'; X.pop(e, seg(t, .3, .7)) });
      X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5.5 ? 'none' : 'block';
    } };
  },
  D3_E012_DEALER(s, root) {   // ruang pamer motor terang: Raka A di samping motor baru mengkilap, papan cicilan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#F4F6F8', '#FFFFFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [4, 12, 8], hemi: 1.7 })); sc.add(mesh(G.box(16, .2, 14), '#E8E4DC', [0, -.1, 0], { mat: { roughness: .3 } })); sc.add(mesh(G.box(16, 6, .2), '#F7F3EC', [0, 3, -4]));
    for (let i = 0; i < 3; i++) { sc.add(mesh(G.cyl(.9, .9, .12, 24), '#DDD', [-4 + i * 4, .06, -2])); motor(sc, [-4 + i * 4, .12, -2], ['#E5484D', A_COL, '#3E8FC4'][i], true).rotation.y = .4 }
    for (let i = 0; i < 4; i++) sc.add(mesh(G.box(.8, .08, .3), '#FFF8E8', [-4.5 + i * 3, 5.4, 0], { mat: { emissive: '#FFF8E8', emissiveIntensity: 1.5 }, cast: false }));
    const A = raka(sc, [1.6, 0, .2]); A.rotation.y = -.5; const cam = camera(42);
    const card = X.ab({ left: 90, top: 300, width: 900, background: CREAM, border: `6px solid ${INK}`, borderRadius: '26px', padding: '14px 24px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '44px', color: INK, boxShadow: `0 10px 0 ${A_COL}`, opacity: 0 }, root,
      `<div style="color:${A_COL}">RAKA A · motor baru</div><div>uang muka Rp4 jt</div><div>cicilan Rp${v.cicil_jt} jt × 36 bulan</div>`);
    const tot = big(root, `total ≈ Rp${v.a_bayar_jt} juta<div style="font-size:42px">tabungan sisa Rp8 jt, nggak nambah</div>`, 1130, A_COL, 80);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-20, 15, p), 2.6, lerp(9, 8, p), [0, 1.2, -1.4]);
      A.pose(t, { talk: true, point: t < 3 }); const tc = at(s, 'uang muka', 2), tt = at(s, 'Total', dur * .6); X.pop(card, seg(t, tc, tc + .4)); show(tot, seg(t, tt, tt + .5));
    } };
  },
  D3_E012_GARASI(s, root) {   // garasi rumah siang: Raka B dengan motor bekas, celengan kaca terisi koin tiap bulan, kotak servis
    const sc = newScene(WARM({ sky: ['#FFD9A0', '#FFF6E6'], sunPos: [-6, 9, 8], hemi: 1.5 })); sc.add(mesh(G.box(14, .2, 12), '#8A8A92', [0, -.1, 0])); sc.add(mesh(G.box(14, 5, .2), '#E8D2B5', [0, 2.5, -3.5])); sc.add(mesh(G.box(.2, 5, 12), '#DCC4A4', [-5, 2.5, 0]));
    for (let i = 0; i < 5; i++) sc.add(mesh(G.box(.5, .08, .3), '#555', [-4 + i * .5, 2.4, -3.35])); sc.add(mesh(G.box(2.6, .1, .8), '#7A5230', [-3.4, 1.5, -3]));
    const mt = motor(sc, [-.8, 0, -1], '#7A8A6A'); mt.rotation.y = .3; mt.add(mesh(G.box(.3, .2, .02), '#9A948C', [-.1, .78, .18], { cast: false }));
    const B = raka(sc, [1.6, 0, -.2]); B.rotation.y = -.6;
    const jar = new THREE.Mesh(G.cyl(.55, .55, 1.3, 20), new THREE.MeshStandardMaterial({ color: '#DDF3FF', transparent: true, opacity: .35, roughness: .1 })); jar.position.set(-3.4, 2.2, -3); sc.add(jar);
    const coins = Array.from({ length: 18 }, () => coin(sc, [0, -5, 0], 1.4)); const kit = group(sc, [-2.6, 1.55, -2.9]); kit.add(mesh(G.box(.6, .35, .35), '#E5484D', [0, .17, 0]));
    const cam = camera(42); const c1 = chip(root, `tabungan: <span style="color:#E5484D">Rp0</span>`, { left: 90, top: 300, fontSize: '50px' }), c2 = chip(root, `+ Rp1,1 jt/bulan ke tabungan`, { left: 90, top: 410, fontSize: '46px' }, B_COL), c3 = chip(root, `🔧 servis Rp1,5 jt/tahun`, { left: 90, top: 520, fontSize: '44px' });
    return { scene: sc, cam, upd(t, dur) {
      const t0 = at(s, 'nol', 3), ts = at(s, 'setor', 6), tv = at(s, 'servis', dur * .7);
      coins.forEach((c, i) => { const q = seg(t, ts + i * .2, ts + i * .2 + .4); c.visible = q > 0; c.position.set(-3.4 + Math.sin(i * 2.4) * .25, lerp(3.4, 1.65 + Math.floor(i / 3) * .1, E.out(q)), -3 + Math.cos(i * 2.4) * .25); c.rotation.set(Math.PI / 2 * (1 - q), 0, 0) });
      kit.scale.setScalar(Math.max(.001, E.back(seg(t, tv, tv + .4))));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(3, 1.4, p), lerp(3, 3.2, p), lerp(8, 7.4, p)); cam.lookAt(-1, 1.5, -2);
      B.pose(t, { talk: true, nod: t > ts }); X.pop(c1, seg(t, t0, t0 + .4)); X.pop(c2, seg(t, ts, ts + .4)); X.pop(c3, seg(t, tv, tv + .4));
    } };
  },
  D3_E012_LAJUR(s, root) {   // jalan raya dua lajur: dua Raka naik motor berdampingan, penghitung bulan, dua menara saldo di tepi jalan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#F59E5B', '#FFE7C2'], sunPos: [-10, 6, 4], shadow: 20, fog: ['#FFE0C0', 25, 80] })); sc.add(mesh(G.box(30, .2, 400), '#7FAF52', [0, -.1, -150]));
    sc.add(mesh(G.box(6, .05, 400), '#4A4A55', [0, .02, -150], { cast: false })); const dash = []; for (let i = 0; i < 40; i++) { const m = mesh(G.box(.12, .06, 1.6), '#FFF', [0, .05, -i * 6], { cast: false }); sc.add(m); dash.push(m) }
    const trees = []; for (let i = 0; i < 24; i++) trees.push(tree(sc, [(i % 2 ? 1 : -1) * (5 + (i % 3)), 0, -i * 9], 1.4, ['#4E8F3A', '#6BA34A'][i % 2]));
    const rides = [[-1.4, A_COL], [1.4, B_COL]].map(([x, c]) => { const g = group(sc, [x, 0, 0]); const m = motor(g, [0, 0, 0], c, x < 0); m.rotation.y = Math.PI / 2; const r = person(g, [0, .55, .15], { body: '#4A6FA5', pants: '#2F3540', hair: '#16100C', skin: '#C98E64', s: .9 }); r.rotation.y = Math.PI; r.userData.st.legs.forEach(l => l.rotation.x = -1.2); return { g, r } });
    const cam = camera(44); const mo = X.ab({ left: 330, top: 290, background: INK, color: GOLD, fontFamily: 'Baloo', fontWeight: 800, fontSize: '64px', padding: '4px 28px', borderRadius: '18px' }, root);
    const bars = X.ab({ left: 90, top: 400, width: 900, display: 'flex', gap: '20px', alignItems: 'flex-end', height: '420px' }, root);
    const mk = (c, lb) => { const w = X.ab({ position: 'relative', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }, bars); const val = X.ab({ position: 'relative', fontFamily: 'Baloo', fontWeight: 800, fontSize: '50px', color: c, WebkitTextStroke: '8px #fff', paintOrder: 'stroke fill' }, w); const b = X.ab({ position: 'relative', width: '70%', background: c, border: `5px solid ${INK}`, borderRadius: '16px 16px 0 0' }, w); X.ab({ position: 'relative', fontFamily: 'Baloo', fontWeight: 800, fontSize: '40px', color: INK, background: CREAM, padding: '0 16px', borderRadius: '12px' }, w, lb); return { val, b } };
    const BA = mk(A_COL, 'Raka A'), BB = mk(B_COL, 'Raka B');
    return { scene: sc, cam, upd(t, dur) {
      const tr = at(s, 'Tiga tahun', 3); const g = seg(t, .3, tr + 1); const m = Math.round(g * 36);
      const sa = v.sa[m], sb = v.sb[m]; mo.textContent = `bulan ${m}`; [[BA, sa], [BB, sb]].forEach(([B, x]) => { B.b.style.height = Math.max(4, x / 36 * 300) + 'px'; B.val.textContent = `Rp${String(x.toFixed(1)).replace('.', ',')} jt` });
      const z = -t * 6; dash.forEach((d, i) => d.position.z = ((i * 6 + t * 12) % 240) - 200); trees.forEach((tr2, i) => tr2.position.z = ((i * 9 + t * 12) % 216) - 200);
      rides.forEach(({ g, r }, i) => { g.position.y = Math.abs(Math.sin(t * 8 + i)) * .03; r.pose(t, {}); r.userData.st.legs.forEach(l => l.rotation.x = -1.2) });
      cam.position.set(Math.sin(t * .3) * .8, 3.8, 7.5); cam.lookAt(0, .2, -3);
    } };
  },
  D3_E012_WARKOP(s, root) {   // warung kopi pinggir jalan senja: dua Raka duduk berhadapan, dua motor parkir, pertanyaan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#F27D52', '#FFD59E'], sunPos: [-8, 4, -6], hemi: 1.4 })); sc.add(mesh(G.box(20, .2, 14), '#B9A88E', [0, -.1, 0]));
    const st = group(sc, [0, 0, -3]); st.add(mesh(G.box(5, 1, 1.2), '#5E9C4A', [0, .5, 0])); st.add(mesh(G.box(5.4, .12, 2), '#C8501E', [0, 2.8, .3], { rot: [.18, 0, 0] })); [-2.4, 2.4].forEach(x => st.add(mesh(G.box(.1, 2.8, .1), '#5A3A20', [x, 1.4, .8])));
    const lamp = new THREE.PointLight('#FFD9A0', 10, 10); lamp.position.set(0, 2.5, -1); sc.add(lamp); sc.add(mesh(G.sph(.15, 10, 8), '#FFE8B0', [0, 2.6, -1.8], { mat: { emissive: '#FFD27A', emissiveIntensity: 2 }, cast: false }));
    sc.add(mesh(G.box(2.4, .1, 1), '#9C6B3E', [0, .75, 0])); [-.4, .4].forEach(x => sc.add(mesh(G.cyl(.1, .08, .2, 10), '#FFFFFF', [x, .9, 0])));
    const A = raka(sc, [-.9, 0, 0]), B = raka(sc, [.9, 0, 0]); A.rotation.y = Math.PI / 2; B.rotation.y = -Math.PI / 2;
    motor(sc, [-3.4, 0, 1.4], A_COL, true).rotation.y = .2; motor(sc, [3.4, 0, 1.4], '#7A8A6A').rotation.y = -.2;
    const cam = camera(42); const ab = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:${A_COL};color:#fff;font-family:Baloo;font-weight:800;font-size:40px;padding:16px 24px;border-radius:24px;border:6px solid ${INK};text-align:center">A<br><span style="font-size:30px">motor baru</span><br><span style="font-size:34px">Rp${v.a_saldo_jt} jt</span></div><div style="background:${B_COL};color:#fff;font-family:Baloo;font-weight:800;font-size:40px;padding:16px 24px;border-radius:24px;border:6px solid ${INK};text-align:center">B<br><span style="font-size:30px">bekas + nabung</span><br><span style="font-size:34px">Rp${v.b_saldo_jt} jt</span></div>`);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Lo tim <span style="color:${A_COL}">A</span> atau tim <span style="color:${B_COL}">B</span>?`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(25, -15, p), 2.8, lerp(8.6, 7.6, p), [0, 1.1, 0]);
      A.pose(t, { talk: Math.sin(t * 1.2) > 0, hold: true }); B.pose(t, { talk: Math.sin(t * 1.2) <= 0, hold: true, nod: true });
      X.pop(ab, seg(t, .4, .9)); const tq = at(s, 'Lo tim', dur - 3); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

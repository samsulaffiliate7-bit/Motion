// Shot Kades S1 Ep 2 "Matahari" (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera, island, tree, person, house, miniStick, newScene } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SORE, SIANG, juara, darmo, wati, bejo, desaSepi, desaBesar, balai, bale, stasiun, BIG, show, pulse } from '../_s1/dunia.js';

const ease = (t, a, b) => E.inout(seg(t, a, b));
const MALAM = o => newScene(Object.assign({ sky: ['#1B2D5E', '#4F6AA8'], sun: '#A9BCFF', sunPos: [-8, 12, 6], hemi: .75, sunI: .9, shadow: 18, fog: ['#2E427A', 60, 220] }, o));
const PANEL = 'rgba(21,53,42,.94)';
const chip = (root, html, css = {}) => X.ab(Object.assign({ left: 60, top: 360, background: PANEL, color: '#F4EBD3', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '44px', padding: '12px 28px', borderRadius: '16px', border: '1px solid #ffffff2a', boxShadow: '0 12px 28px #0000005c', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
const BAJU = ['#3E86B0', '#C65B4B', '#D8A84A', '#4E8B6A', '#8E44AD', '#2E7D5B', '#E07B39'], KULIT = ['#C98E64', '#E2A97E', '#B97A52'];
const kerumunan = (sc, n, f) => Array.from({ length: n }, (_, i) => { const g = group(sc, f(i)); miniStick(g, [0, 0, 0], BAJU[i % 7], KULIT[i % 3]); return g });
function panelSurya(parent, p, rotX = -.5) { const g = group(parent, p); g.userData.s = 2.2; g.add(mesh(G.box(1.1, .05, .7), '#1F3A6E', [0, 0, 0], { rot: [rotX, 0, 0], mat: { roughness: .3, metalness: .3 } })); g.add(mesh(G.box(1.12, .02, .02), '#C9CED6', [0, .03, 0], { rot: [rotX, 0, 0], cast: false })); return g }

export const SHOTS = {
  K2_KERETA(s, root) {   // frame 1: kereta penuh sampai atap masuk stasiun, papan PULANG KAMPUNG meloncat 48 -> 810
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => z > -12 }); island(sc, 30, 14, '#8FB45A', '#7A5C3E'); const S = stasiun(sc, [0, 0, 0]); const V = X.TL.vars;
    const atap = kerumunan(S.userData.kereta, 24, i => [(i % 8) * .55 - 1.9 + Math.floor(i / 8) * 4.8, 2.2, (i % 2) * .4 - .2]);
    const turun = kerumunan(sc, 40, () => [0, -9, 0]); const J = juara([3.4, .5, .9]); sc.add(J); J.rotation.y = -1.2; const cam = camera(42); let shown = -1;
    const big = BIG(root, `+${V.pulang - V.prev} PULANG`, { top: 330, fontSize: '112px' });
    return { scene: sc, cam, upd(t, dur) { S.userData.kereta.position.x = lerp(-13, -5.3, E.out(seg(t, 0, 1.6))); atap.forEach((g, i) => { g.rotation.y = Math.sin(t * 6 + i) * .3; g.children[0].rotation.z = t < 1.6 ? Math.sin(t * 9 + i) * .15 : 0 });
      turun.forEach((g, i) => { const t0 = 1.6 + i * .05, q = seg(t, t0, t0 + 1.3); g.position.set(-6 + (i % 10) * 1.2 + (i % 3) * .2, q > 0 ? .5 : -9, lerp(-1.9, .1 + (i % 4) * .3, E.out(q))) });
      const n = Math.round(lerp(V.prev, V.pulang, E.out(seg(t, 1.6, 3.6)))); if (n !== shown) { S.userData.setPulang(n); shown = n }
      J.pose(t, { cheer: t > 3.3, wave: t <= 3.3 }); const p = ease(t, 0, dur); cam.position.set(lerp(8.5, 6.8, p), lerp(2.2, 2.4, p), lerp(11.5, 10, p)); cam.lookAt(lerp(-2.4, -1.2, p), 1.4, -1.4); pulse(big, seg(t, 3.4, 3.8)) } };
  },
  K2_REKAP(s, root) {   // papan dana desa naik + voting matahari
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); island(sc, 16, 12, '#8FB45A', '#7A5C3E'); balai(sc, [0, 0, -2]); const V = X.TL.vars;
    const J = juara([-1.4, 0, 1.4]); sc.add(J); J.rotation.y = .6; const cam = camera(42);
    const papan = canvasPlane(2.6, 1.4, () => { }, 600); papan.position.set(.9, 1.5, 1.2); papan.rotation.y = -.15; sc.add(papan); [-1, 1].forEach(x => sc.add(mesh(G.box(.1, 1.6, .1), '#6E4A2C', [.9 + x * 1.2, .8, 1.15])));
    const draw = v => papan.userData.redraw((x, W, H) => { x.fillStyle = '#2E4A3A'; x.fillRect(0, 0, W, H); x.strokeStyle = '#8A6A3A'; x.lineWidth = 14; x.strokeRect(0, 0, W, H); x.fillStyle = '#E9DFC2'; x.textAlign = 'center';
      x.font = `700 ${Math.round(H * .14)}px Poppins`; x.fillText('DANA DESA', W / 2, H * .3); x.fillStyle = '#E8B94A'; x.font = `800 ${Math.round(H * .2)}px Poppins`; x.fillText('Rp' + v.toLocaleString('id-ID'), W / 2, H * .7) });
    const vote = chip(root, `☀️ MATAHARI ${V.vote.matahari} · 🌬️ ANGIN ${V.vote.angin} · 🌊 SUNGAI ${V.vote.sungai}`, { top: 340, fontSize: '36px' }); let last = -1;
    return { scene: sc, cam, upd(t, dur) { const td = at(s, 'Dari like', dur * .45); const v = Math.floor(E.out(seg(t, td, td + 2.4)) * (V.dana - 1330000) / 10000) * 10000 + 1330000; if (v !== last) { draw(v); last = v }
      J.pose(t, { point: t > td, talk: true, cheer: t > dur - 1.2 }); const tm = at(s, 'matahari', 2); show(vote, seg(t, tm - .2, tm + .2));
      const p = ease(t, 0, dur); cam.position.set(lerp(-.4, -.6, p), lerp(2.0, 1.8, p), lerp(11, 9.8, p)); cam.lookAt(-.2, 1.4, .3) } };
  },
  K2_TUGAS(s, root) {   // halaman balai penuh perantau; papan PEMBAGIAN TUGAS (profesi dari komen)
    const sc = SIANG(); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 12 && Math.abs(z) < 10 }); island(sc, 22, 16, '#8FB45A', '#7A5C3E'); balai(sc, [0, 0, -4]); const V = X.TL.vars;
    const crowd = kerumunan(sc, 90, i => [-7 + (i % 15) * 1.0 + Math.sin(i) * .2, 0, 1.5 + Math.floor(i / 15) * .9]); const J = juara([2.6, 0, -.6]); sc.add(J); J.rotation.y = -.5; const cam = camera(42);
    const pap = X.ab({ left: 90, top: 330, width: 900, opacity: 0, fontFamily: 'Poppins,sans-serif', background: '#F2EAD6', borderRadius: '18px', padding: '22px 30px', boxShadow: '0 16px 36px #0007', border: '8px solid #7A5A3A' }, root,
      `<div style="font-size:34px;font-weight:800;color:#1F3B2A;letter-spacing:3px;text-align:center">📋 PEMBAGIAN TUGAS</div><div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:16px">` +
      V.profesi.map(p => `<div class="pf" style="background:#1F3B2A;color:#F4EBD3;font-size:32px;font-weight:700;padding:8px 18px;border-radius:12px;opacity:0">${p}</div>`).join('') + '</div>');
    const rt = X.ab({ left: 0, top: 820, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<span style="display:inline-block;background:#FFF6E2;color:#8A2E1E;font-size:46px;font-weight:800;padding:10px 28px;border-radius:14px;box-shadow:0 10px 24px #0006"><s>PRESIDEN</s> → KETUA RT</span>`);
    return { scene: sc, cam, upd(t, dur) { const tp = at(s, 'profesi', 1.5); const pf = pap.querySelectorAll('.pf'); pf.forEach((e, i) => e.style.opacity = seg(t, tp + i * .35, tp + i * .35 + .25)); show(pap, seg(t, tp - .4, tp));
      crowd.forEach((g, i) => g.position.y = Math.abs(Math.sin(t * 5 + i)) * .08); J.pose(t, { talk: true, point: t > tp }); const tr = at(s, 'ketua RT', dur - 1.5); pulse(rt, seg(t, tr - .1, tr + .3));
      const p = ease(t, 0, dur); cam.position.set(lerp(-2, 1, p), lerp(4.5, 3.6, p), lerp(14, 11.5, p)); cam.lookAt(0, 1.2, 1) } };
  },
  K2_BEJO(s, root) {   // lelucon: warga berkartu BEBAN ditugaskan menemani Bejo
    const sc = SORE(); island(sc, 16, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); tree(sc, [-3.5, 0, -2.5], 1.3, '#5E8F3A');
    const kandang = group(sc, [1.2, 0, -1]); [[-1.2, -1], [1.2, -1], [-1.2, 1], [1.2, 1]].forEach(([x, z]) => kandang.add(mesh(G.box(.12, 1.2, .12), '#7A5A3A', [x, .6, z]))); [-1, 1].forEach(z => kandang.add(mesh(G.box(2.5, .08, .06), '#8A6A4A', [0, .8, z])));
    const B = bejo(sc, [1.2, 0, -.6]); B.rotation.y = -2.4; const W = person(sc, [-.5, 0, 1.2], { body: '#9A9A9A', pants: '#3B3B3B', skin: '#C98E64', hair: '#2A1A10' }); W.rotation.y = .5;
    const kartu = mesh(G.box(.3, .2, .02), '#FFFFFF', [0, -.3, .08], { cast: false }); W.userData.st.arms[1].userData.elbow?.add(kartu); const cam = camera(42);
    const tag = X.ab({ left: 0, top: 360, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<span style="display:inline-block;background:${PANEL};color:#F4EBD3;font-size:44px;font-weight:800;padding:12px 30px;border-radius:16px">TUGAS: <span style="color:#E8B94A">NEMENIN BEJO</span> 🐐</span>`);
    return { scene: sc, cam, upd(t, dur) { const tn = at(s, 'nemenin', dur - 1.2); W.pose(t, { hold: t < tn, shake: t > tn + .2 }); B.userData.hd.rotation.z = Math.sin(t * 7) * .12; B.rotation.y = -2.4 + Math.sin(t * 2) * .3;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.4, .8, p), lerp(1.8, 1.6, p), lerp(7.5, 6.2, p)); cam.lookAt(.3, 1, .2); pulse(tag, seg(t, tn - .1, tn + .3)) } };
  },
  K2_PANEL(s, root) {   // drone timelapse: panel surya muncul di atap balai & rumah
    const sc = SIANG(); island(sc, 30, 24, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 14 && Math.abs(z) < 12 }); const Bl = balai(sc, [0, 0, -1]); const V = X.TL.vars;
    const rumah = []; for (let i = 0; i < 10; i++) { const x = -10 + (i % 5) * 5, z = i < 5 ? -8 : 6; rumah.push([house(sc, [x, 0, z], { w: 2.4, d: 2.2, h: 1.6, wall: ['#EFE4CC', '#E6D7B8', '#F2EBDD'][i % 3], roofC: ['#B5452B', '#9C4A2E', '#C25A34'][i % 3] }), x, z]) }
    const P = [...rumah.map(([h, x, z]) => panelSurya(sc, [x, 2.55, z + .35], -.55)), panelSurya(sc, [-.8, 3.3, -.2], -.6), panelSurya(sc, [.8, 3.3, -.2], -.6)]; P.forEach(p => p.scale.setScalar(.01));
    const cost = chip(root, `🧾 panel surya: ${V.biaya_rp}`, { top: 340, fontSize: '38px' }), sisa = chip(root, `💰 sisa: ${V.sisa_rp}`, { top: 440, fontSize: '38px', color: '#E8B94A' }); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { P.forEach((p, i) => p.scale.setScalar(Math.max(.01, 1.8 * E.back(seg(t, .4 + i * .3, .7 + i * .3))))); const th = at(s, 'Habis', dur * .5), ts = at(s, 'Sisa', dur * .75);
      show(cost, seg(t, th - .2, th + .2)); show(sisa, seg(t, ts - .2, ts + .2)); const a = lerp(-.7, .5, ease(t, 0, dur)); cam.position.set(Math.sin(a) * 22, 15, Math.cos(a) * 22); cam.lookAt(0, 1, -1) } };
  },
  K2_MALAM(s, root) {   // malam: lampu rumah menyala satu-satu dari udara; Mbah Darmo terharu
    const sc = MALAM(); desaBesar(sc, { hole: (x, z) => Math.abs(x - 4) < 5 && Math.abs(z - 4) < 5 }); const V = X.TL.vars; const N = 260, R = (k => () => (k = (k * 16807) % 2147483647) / 2147483647)(9);
    const lamp = new THREE.InstancedMesh(new THREE.SphereGeometry(.9, 8, 6), new THREE.MeshBasicMaterial({ color: '#FFE08A', fog: false }), N); sc.add(lamp); const O = new THREE.Object3D(); const pos = Array.from({ length: N }, () => [(R() - .5) * 130, 2.2 + R() * .4, (R() - .5) * 130]);
    const glow = new THREE.PointLight('#FFC36A', 0, 200); glow.position.set(0, 30, 0); sc.add(glow);
    const M = darmo([0, 0, 0]); sc.add(M); M.visible = false; const cam = camera(44);
    const big = BIG(root, 'DESA MENYALA', { top: 330, fontSize: '100px', color: '#FFE2A0' }), nangis = chip(root, 'Mbah Darmo: 😭', { top: 470, left: 300, fontSize: '46px' });
    return { scene: sc, cam, upd(t, dur) { const tn = at(s, 'menyala', 2.4), td = at(s, 'Nangis', dur - 1.4); let k = 0; pos.forEach((p, i) => { const q = seg(t, tn - 1 + i * .008, tn - .6 + i * .008); O.position.set(...p); O.scale.setScalar(Math.max(.001, q)); O.updateMatrix(); lamp.setMatrixAt(i, O.matrix); if (q > 0) k++ }); lamp.instanceMatrix.needsUpdate = true;
      glow.intensity = 2.2 * seg(t, tn - 1, tn + 1); pulse(big, seg(t, tn, tn + .4)); const close = seg(t, td - 1, td - .4); M.visible = close > 0; M.position.set(4, 0, 4); M.rotation.y = .4; M.pose(t, { shake: true, nod: true });
      if (close <= 0) { const p = ease(t, 0, td - 1); cam.position.set(lerp(30, 18, p), lerp(60, 34, p), lerp(60, 40, p)); cam.lookAt(0, 0, 0) } else { cam.position.set(5.6, 1.7, 7.4); cam.lookAt(4, 1.3, 4) }
      show(nangis, seg(t, td - .2, td + .2)); if (close > 0) big.style.opacity = 0 } };
  },
  K2_SUMUR(s, root) {   // pagi: antrean ratusan orang di satu sumur, ember kosong; Bu Wati datang: rapor 4 hari lagi
    const sc = SORE({ sky: ['#86BEDD', '#FCE7C6'] }); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && z > -75 && z < 14 }); sc.add(mesh(G.box(12, .03, 40), '#B9A274', [0, .015, -10], { cast: false })); const V = X.TL.vars;
    const sumur = group(sc, [0, 0, 4]); sumur.add(mesh(G.cyl(.9, .9, .8, 16), '#A8A49A', [0, .4, 0])); sumur.add(mesh(G.cyl(.7, .7, .82, 16), '#2A4A6A', [0, .42, 0], { cast: false })); [-1, 1].forEach(x => sumur.add(mesh(G.box(.12, 2, .12), '#7A5A3A', [x * .9, 1.2, 0]))); sumur.add(mesh(G.box(2, .12, .12), '#7A5A3A', [0, 2.2, 0]));
    const antre = kerumunan(sc, 160, i => [(i % 2) * .7 - .35 + Math.sin(i) * .15, 0, 2.6 - i * .45]); antre.forEach((g, i) => { if (i % 3 === 0) g.add(mesh(G.cyl(.12, .1, .2, 8), '#3E86B0', [.15, .45, .1], { cast: false })) });
    const J = juara([1.8, 0, 5.2]); sc.add(J); J.rotation.y = -.8; const W = wati([7, 0, 5.6]); sc.add(W); W.rotation.y = -Math.PI / 2; const cam = camera(42);
    const ember = chip(root, '🪣 ember kosong', { top: 340, left: 340, fontSize: '40px' });
    const rapor = X.ab({ left: 130, top: 330, width: 820, background: '#FBF7EC', borderRadius: '14px', padding: '26px 40px', fontFamily: 'Poppins,sans-serif', color: '#2A2A2A', boxShadow: '0 18px 40px rgba(0,0,0,.5)', opacity: 0, textAlign: 'center' }, root,
      `<div style="font-size:24px;letter-spacing:4px;color:#8A4B32;font-weight:700">KECAMATAN · MASA PERCOBAAN</div><div style="height:3px;background:#B5302A;margin:12px 0 16px"></div><div style="font-size:60px;font-weight:800">RAPOR PERTAMA</div><div style="font-size:56px;font-weight:800;color:#B5302A">${V.rapor} HARI LAGI</div>`);
    return { scene: sc, cam, upd(t, dur) { const tw = at(s, 'Bu Wati', dur * .55), tr = at(s, 'Rapor', dur - 2.2); const q = ease(t, tw, tw + 1.8); W.position.x = lerp(7, 2.9, q); W.pose(t, { walk: q > 0 && q < 1 ? 1 : 0 });
      J.pose(t, { shake: t > tr + .3, look: q > 0 ? -.6 : 0 }); antre.forEach((g, i) => g.rotation.y = Math.sin(t + i) * .2); show(ember, seg(t, 1.2, 1.6) * (1 - seg(t, tw - .5, tw))); show(rapor, seg(t, tr - .2, tr + .2));
      const along = ease(t, 0, tw); cam.position.set(lerp(6, 6.5, along), lerp(5, 2.6, along), lerp(-30, 11, along)); cam.lookAt(lerp(0, 1.5, along), 1, lerp(-10, 4.5, along)) } };
  },
  K2_AJAK(s, root) {   // pertanyaan: air dari mana
    const sc = SORE(); desaSepi(sc); const J = juara([0, 0, 9]); sc.add(J); const cam = camera(42);
    const q = X.ab({ left: 60, top: 360, width: 960, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<div style="font-size:38px;font-weight:800;color:#F4EBD3;letter-spacing:2px;text-shadow:0 4px 14px #000">AIR DESA DARI MANA?</div><div style="display:flex;flex-direction:column;gap:16px;align-items:center;margin-top:20px">` +
      ['🕳️ SUMUR BOR', '🌧️ TANDON AIR HUJAN', '⛰️ PIPA MATA AIR BUKIT'].map(x => `<div style="background:${PANEL};color:#F4EBD3;font-size:48px;font-weight:800;padding:14px 36px;border-radius:18px;border:1px solid #ffffff2a;box-shadow:0 10px 24px #0000005c;min-width:560px">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { talk: true, point: t > 1 && t < dur - 1.5, wave: t >= dur - 1.5 }); show(q, seg(t, at(s, 'Sumur bor', 1) - .3, at(s, 'Sumur bor', 1) + .2));
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .2, p), lerp(1.9, 1.7, p), lerp(14.5, 12.5, p)); cam.lookAt(0, 1.3, 9) } };
  },
};

// Dunia 3D akun Kades Magang Juara: diorama desa ala game, siang cerah.
// Bahasa visual khas: kamera terbang tinggi lalu menukik, benda "pop" dari tanah, HUD game (hari/penduduk/anggaran),
// label kuning, transisi kilat putih.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, house, person, rain } from './kit.js';

let X; const GREEN = '#8BC34A', DG = '#5E9B2F', YEL = '#FFC93C', CREAM = '#FFF6D6', INK = '#23411F';
const SUNNY = o => Object.assign({ sky: ['#7CC6F2', '#E6F6FF'], sunPos: [10, 18, 8], hemi: 1.2, shadow: 14 }, o);
const kades = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#F3E6C4', pants: '#4A5A3A', hat: 'peci', skin: '#C98E64', tie: YEL }, o));
const warga = (p, i, o = {}) => person(o.parent, p, Object.assign({ body: ['#3E8FC4', '#E07B39', '#C2457A', '#6B8E5A'][i % 4], pants: '#4A4A4A', skin: ['#E2A97E', '#C98E64', '#B97A52'][i % 3], hair: '#2A1A10' }, o));
const card = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CREAM, border: `7px solid ${INK}`, borderRadius: '30px', padding: '12px 26px', fontSize: '42px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 10px 0 ${DG}`, fontFamily: 'Fredoka' }, css), root, html); e.style.opacity = 0; return e };
const at = (s, rx, fb) => X.C(s, rx, fb);
function tag3(root, html, col = INK) { const w = X.ab({ left: 0, top: 0 }, root); const e = card(w, html, { position: 'relative', transform: 'translate(-50%,-100%)', fontSize: '34px', padding: '6px 18px' }, col);
  return { at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }

// potongan jalan: profil cembung (tinggi dilebihkan supaya terlihat), lapisan aspal + fondasi + tanah
function roadSection(parent, o = {}) {
  const w = o.w || 6, h = o.crown ?? .35, len = o.len || 6, g = group(parent, o.p || [0, 0, 0]);
  const shape = new THREE.Shape(); shape.moveTo(-w / 2, 0); for (let i = 1; i <= 20; i++) { const x = -w / 2 + w * i / 20; shape.lineTo(x, h * (1 - Math.pow(2 * x / w, 2))) } shape.lineTo(w / 2, -.25); shape.lineTo(-w / 2, -.25); shape.lineTo(-w / 2, 0);
  const asp = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: len, bevelEnabled: false }), mat('#3B3F45')); asp.position.z = -len / 2; asp.castShadow = asp.receiveShadow = true; g.add(asp);
  if (o.flat) asp.scale.y = .02 / Math.max(h, .01) * 0 + (h ? .05 : 1);
  g.add(mesh(G.box(w, .6, len), '#B7A27A', [0, -.55, 0])); g.add(mesh(G.box(w + 4, 1.2, len), '#8D6E4A', [0, -1.45, 0]));
  [-1, 1].forEach(sx => { const d = group(g, [sx * (w / 2 + .55), 0, 0]); d.add(mesh(G.box(.12, .7, len), '#A9A9A9', [-.4, -.3, 0])); d.add(mesh(G.box(.12, .7, len), '#A9A9A9', [.4, -.3, 0])); d.add(mesh(G.box(.9, .1, len), '#8C8C8C', [0, -.62, 0]));
    g.add(mesh(G.box(1.4, .5, len), GREEN, [sx * (w / 2 + 1.75), -.25, 0])) });
  for (let z = -len / 2 + .6; z < len / 2; z += 1.2) g.add(mesh(G.box(.12, .03, .6), '#F2F2F2', [0, h + .01, z], { cast: false }));
  g.userData = { w, h, len }; return g;
}
function drops(parent, n, w, h, flat) {   // butiran air: jatuh, lalu meluncur ke pinggir (cembung) atau diam di tengah (rata)
  const list = Array.from({ length: n }, (_, i) => { const m = mesh(G.sph(.07, 8, 6), '#4FA3DB', [0, -5, 0], { cast: false, mat: { emissive: '#4FA3DB', emissiveIntensity: .3 } }); parent.add(m); return m });
  return t => list.forEach((m, i) => { const q = ((t * .45) + i / n) % 1, x0 = (((i * 37) % 100) / 100 - .5) * w * .9, z = (((i * 61) % 100) / 100 - .5) * 5;
    if (q < .35) { m.position.set(x0, lerp(4, h * (1 - Math.pow(2 * x0 / w, 2)) + .06, q / .35), z) }
    else if (flat) { const k = (q - .35) / .65; m.position.set(x0 * (1 - k * .7), .08, z * (1 - k * .5)) }
    else { const k = E.in((q - .35) / .65), sx = x0 < 0 ? -1 : 1, x = lerp(x0, sx * (w / 2 + .55), k); m.position.set(x, Math.max(-.5, h * (1 - Math.pow(2 * x / w, 2)) + .06 - (Math.abs(x) > w / 2 ? (Math.abs(x) - w / 2) * 1.2 : 0)), z) } });
}
function village(sc) {   // diorama desa (low-poly ala game)
  island(sc, 16, 16, GREEN, '#8D6E4A'); sc.add(mesh(G.box(2.4, .1, 16), '#4A4F56', [0, .05, 0]));
  [-1, 1].forEach(s => sc.add(mesh(G.box(.4, .06, 16), '#7A8A9A', [s * 1.45, .03, 0])));
  [[-3.6, -4, '#FFF3D6', '#D9603B', .15], [3.8, -3, '#FCE9C8', '#C9472F', -.2], [-3.8, 3, '#F5F0E0', '#E07B39', .1], [4, 4, '#FFF6D6', '#B5452B', -.1]].forEach(([x, z, w, r, rot]) => house(sc, [x, 0, z], { wall: w, roofC: r, rot: rot + (x > 0 ? -Math.PI / 2 : Math.PI / 2) }));
  [[-6.5, -6.5], [6.5, -6.6], [6.6, 6], [-6.5, 6.4], [6.2, 0], [-6.8, .5], [-2.8, 7]].forEach(([x, z], i) => tree(sc, [x, 0, z], .9 + (i % 3) * .2, '#4E8F3A', i % 2 ? 'palm' : 'round'));
}


// lahan Hari N: tanah kosong + jalan setapak, opsi sumur, tenda, rumah
function lahan(sc, o = {}) {
  island(sc, 18, 18, GREEN, '#8D6E4A'); sc.add(mesh(G.box(2, .06, 18), '#C9A36B', [0, .03, 0]));
  [[-7.5, -7.5], [7.4, -7.6], [7.6, 7], [-7.5, 7.4], [7.2, 0], [-7.8, .5]].forEach(([x, z], i) => tree(sc, [x, 0, z], .9 + (i % 3) * .2, '#4E8F3A', i % 2 ? 'palm' : 'round'));
  const out = {};
  if (o.well) { const w = group(sc, [2.2, 0, -1.5]); w.add(mesh(G.cyl(.7, .7, .7, 14), '#B8C1CB', [0, .35, 0])); w.add(mesh(G.cyl(.55, .55, .72, 14), '#3E8FC4', [0, .37, 0])); w.add(mesh(G.box(.1, 1.4, .1), '#7A4E2C', [-.6, .9, 0])); w.add(mesh(G.box(.1, 1.4, .1), '#7A4E2C', [.6, .9, 0])); w.add(mesh(G.cone(.95, .5, 4), '#C9472F', [0, 1.85, 0], { rot: [0, Math.PI / 4, 0] })); out.well = w }
  if (o.tents) out.tents = [-5, -2.6, 2.6, 5, -5].map((x, i) => { const t = group(sc, [x, 0, i === 4 ? 4.5 : 3]); t.add(mesh(G.cone(.9, 1.2, 4), ['#E07B39', '#3E8FC4', '#F2C14E', '#C2457A', '#6B8E5A'][i], [0, .6, 0], { rot: [0, Math.PI / 4, 0] })); t.add(mesh(G.box(.3, .5, .05), '#2A2A2A', [0, .25, .62])); return t });
  return out;
}
function rowHouses(parent, x0, z, gap, n = 5, cols) { return Array.from({ length: n }, (_, i) => house(parent, [x0 + i * (1.6 + gap), 0, z], { w: 1.6, d: 1.8, h: 1.3, roofH: .7, wall: (cols || ['#FFF3D6', '#FCE9C8', '#F5F0E0', '#FFE7C8', '#EDE3D0'])[i % 5], roofC: ['#D9603B', '#C9472F', '#E07B39', '#B5452B', '#D9603B'][i % 5] })) }
function commentCard(root, user, text, top, left) { return X.ab({ left, top, width: 720, background: '#FFFFFF', borderRadius: '30px', padding: '18px 26px', fontFamily: 'Fredoka', color: '#1E1E1E', boxShadow: '0 10px 0 #00000030', opacity: 0, border: `5px solid ${INK}` }, root,
  `<div style="display:flex;align-items:center;gap:14px"><div style="width:58px;height:58px;border-radius:50%;background:#C9D6E2;display:flex;align-items:center;justify-content:center;font-size:30px">👤</div><div><div style="font-size:28px;color:#888">${user} · komentar</div><div style="font-size:44px;font-weight:700">${text}</div></div></div>`) }

export async function setup(ctx) { X = ctx }

export const SHOTS = {
  K3_HOOK(s, root) {
    const sc = newScene(SUNNY()); village(sc); const K = kades([0, 0, 5]); sc.add(K); const ws = [0, 1, 2].map(i => { const w = warga([-1 + i, 0, -5], i); sc.add(w); return w });
    const cam = camera(42); const tc = tag3(root, 'tengahnya lebih tinggi!', '#C9472F');
    const hook = X.ab({ left: 70, top: 300, width: 940, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '22px 26px', textAlign: 'center', fontSize: '54px', lineHeight: 1.12, color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${DG}` }, root,
      `Sementara itu di desa:<br><span style="color:#C98A00">kenapa jalan dibuat cembung?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-40, 20, p), lerp(24, 8, p), lerp(30, 16, p), [0, 0, 1]);
      K.position.z = lerp(5, -2, t / dur); K.rotation.y = Math.PI; K.pose(t, { walk: 1 }); ws.forEach((w, i) => { w.position.z = -5 + ((t * .6 + i * 3) % 10); w.pose(t + i, { walk: 1 }) });
      X.pop(hook, seg(t, .1, .5)); const tt = at(s, 'lebih tinggi', 4); tc.at(K, cam, [0, 2.6, 0], seg(t, tt, tt + .4));
    } };
  },

  K3_HOOK2(s, root) {
    const sc = newScene(SUNNY()); const L = lahan(sc, { well: true, tents: true }); const K = kades([0, 0, 1]); sc.add(K);
    const conf = Array.from({ length: 40 }, (_, i) => { const m = mesh(G.box(.12, .02, .2), ['#FFC93C', '#3E8FC4', '#E5484D', '#8BC34A'][i % 4], [0, -5, 0], { cast: false }); sc.add(m); return m });
    const cam = camera(42);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '22px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${DG}` }, root,
      `Hari 2: kalian pilih <span style="color:#3E8FC4">B · sumur</span>!<br><span style="font-size:44px;color:#C9472F">tapi ada masalah baru...</span>`);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-30, 25, p), lerp(20, 9, p), lerp(30, 18, p), [0, .5, .5]);
      K.pose(t, { cheer: t < 4, talk: t >= 4 }); L.well.scale.setScalar(Math.max(.001, E.back(seg(t, .6, 1.2))));
      conf.forEach((c, i) => { const q = (t * .35 + i / 40) % 1; c.position.set(Math.sin(i * 2.1) * 5, lerp(9, 0, q), Math.cos(i * 1.7) * 5); c.rotation.set(t * 3 + i, t * 2, 0); c.visible = t < 5 });
      X.pop(hook, seg(t, .1, .5)) } };
  },
  K3_COMMENTS(s, root) {
    const sc = newScene(SUNNY({ sky: ['#9ED8F5', '#F2FAFF'] })); lahan(sc, { tents: true }); const K = kades([0, 0, 2]); sc.add(K); K.rotation.y = .3;
    const book = mesh(G.box(.4, .5, .08), '#8B5A2B', [0, -.55, .15]); K.userData.st.arms[1].add(book);
    const cam = camera(40); const C = X.TL.vars.komentar; const cards = C.map(([u, tx], i) => commentCard(root, u, `“${tx}”`, 300 + i * 190, i ? 290 : 70));
    const note = X.ab({ left: 70, top: 720, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '36px', color: INK, background: YEL, padding: '8px 20px', borderRadius: '14px', border: `5px solid ${INK}`, opacity: 0 }, root, '📒 dicatat di buku desa');
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .3) * 1.2, 2.6, 7.5 - t * .1); cam.lookAt(0, 1.6, 2); K.pose(t, { hold: true, nod: true });
      const t1 = at(s, 'air', 1), t2 = at(s, 'rumah', 3.5); [[cards[1], t1], [cards[0], t2]].forEach(([e, tc]) => { const q = seg(t, tc, tc + .4); e.style.opacity = q; e.style.transform = `translateY(${(1 - E.out(q)) * 40}px) rotate(${e === cards[0] ? 2 : -2}deg)` });
      X.pop(note, seg(t, at(s, 'catat', dur - 2), at(s, 'catat', dur - 2) + .4)) } };
  },
  K3_SUMUR(s, root) {
    const sc = newScene(SUNNY()); const L = lahan(sc, { well: true, tents: true });
    const rig = group(sc, [2.2, 0, -1.5]); [0, 1, 2].forEach(i => rig.add(mesh(G.cyl(.05, .05, 3.4, 6), '#555', [Math.cos(i * 2.1) * .8, 1.6, Math.sin(i * 2.1) * .8], { rot: [Math.sin(i * 2.1) * .25, 0, -Math.cos(i * 2.1) * .25] })));
    const drill = mesh(G.cyl(.08, .08, 2.6, 8), '#333', [0, 1.3, 0]); rig.add(drill);
    const spray = Array.from({ length: 30 }, () => { const m = mesh(G.sph(.08, 6, 5), '#7FC4E8', [0, -5, 0], { cast: false, mat: { emissive: '#7FC4E8', emissiveIntensity: .4 } }); sc.add(m); return m });
    const q = [0, 1, 2, 3].map(i => { const w = warga([2.2, 0, .2 + i * .9], i); sc.add(w); w.rotation.y = Math.PI; const b = mesh(G.cyl(.15, .12, .25, 10), ['#E5484D', '#3E8FC4', '#F2C14E', '#2E9C6A'][i], [0, -.6, .1]); w.userData.st.arms[1].add(b); return w });
    const cam = camera(42); const c1 = card(root, `💰 biaya sumur: ${X.TL.vars.juta_sumur} juta`, { left: 70, top: 300 }), c2 = card(root, `sisa anggaran: <span style="color:${DG}">${X.TL.vars.juta_sisa} juta</span>`, { left: 70, top: 410 }), c3 = card(root, '🪣 warga antre air bersih', { left: 70, top: 520 }, '#3E8FC4');
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'Biayanya', 3), ta = at(s, 'antre', dur - 3); const built = seg(t, tb - 1, tb);
      drill.rotation.y = t * 8; drill.position.y = 1.3 - (t % 1) * .3; rig.visible = built < 1; L.well.scale.setScalar(Math.max(.001, E.back(seg(t, tb - .3, tb + .3))));
      spray.forEach((d, i) => { const k = (t * .8 + i / 30) % 1; d.visible = t > tb - .2 && t < tb + 2.5; d.position.set(2.2 + Math.sin(i * 2.3) * k * 1.4, .8 + k * 3 - k * k * 3.6, -1.5 + Math.cos(i * 1.9) * k * 1.4) });
      q.forEach((w, i) => { w.visible = t > ta - .4; w.pose(t + i, { hold: true, look: Math.sin(t + i) * .3 }) });
      orbit(cam, lerp(30, 5, seg(t, 0, dur)), 8, 19, [1.6, .8, .5]); X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tb + .8, tb + 1.2)); X.pop(c3, seg(t, ta, ta + .4)) } };
  },
  K3_FAMILIES(s, root) {
    const sc = newScene(SUNNY({ sky: ['#F7B77A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-12, 7, 6] })); const L = lahan(sc, { well: true, tents: true });
    const fam = []; L.tents.forEach((tn, i) => { [0, 1].forEach(k => { const w = warga([tn.position.x + (k ? .6 : -.6), 0, tn.position.z + 1], i + k, { s: k ? .7 : 1 }); sc.add(w); fam.push(w) }) });
    const ghosts = rowHouses(sc, -5.6, -4.5, 1.3); ghosts.forEach(h => h.traverse(o => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = .35 } }));
    const fire = mesh(G.cone(.25, .5, 6), '#F28C28', [0, .25, 5.6], { mat: { emissive: '#F28C28', emissiveIntensity: 1 } }); sc.add(fire);
    const cam = camera(42); const c1 = card(root, '⛺ 5 keluarga masih di tenda', { left: 70, top: 300 }, '#C9472F'), c2 = card(root, '🏠 desa butuh rumah', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-20, 15, seg(t, 0, dur)), 10, 21, [0, .6, .5]); fam.forEach((w, i) => w.pose(t + i, { look: Math.sin(t * .5 + i) * .4 })); fire.scale.y = 1 + Math.sin(t * 15) * .2;
      const tr = at(s, 'butuh', dur - 2.5); ghosts.forEach((h, i) => { const q = E.back(seg(t, tr + i * .12, tr + .4 + i * .12)); h.visible = q > 0; h.scale.setScalar(Math.max(.001, q)) });
      X.pop(c1, seg(t, at(s, 'tenda', 3), at(s, 'tenda', 3) + .4)); X.pop(c2, seg(t, tr, tr + .4)) } };
  },
  K3_CHOICE(s, root) {
    const A = s.variant === 'A'; const sc = newScene(SUNNY(A ? {} : { sky: ['#9ED8A0', '#F2FBF4'] })); const L = lahan(sc, {});
    const hs = A ? rowHouses(sc, -3.2, -3, 0) : rowHouses(sc, -6.4, -3, 1.6);
    const yards = A ? [] : hs.map(h => { const y = mesh(G.box(2.6, .05, 2.4), '#6FB04A', [h.position.x, .04, -2.6], { cast: false }); sc.add(y); tree(sc, [h.position.x + 1, 0, -1.6], .5); return y });
    const flames = A ? hs.map(h => { const f = group(sc, [h.position.x, 2.2, -3]); f.add(mesh(G.cone(.4, 1, 6), '#F28C28', [0, 0, 0], { mat: { emissive: '#F28C28', emissiveIntensity: 1.2 } })); f.add(mesh(G.cone(.25, .7, 6), '#FFD54A', [0, -.1, .1], { mat: { emissive: '#FFD54A', emissiveIntensity: 1.2 } })); f.visible = false; return f }) : [];
    const cam = camera(42); const V = X.TL.vars;
    const big = X.ab({ left: 820, top: 300, width: 170, height: 170, borderRadius: '50%', background: A ? '#FFC93C' : '#3E8FC4', border: `8px solid ${INK}`, color: A ? INK : '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px' }, root, A ? 'A' : 'B');
    const L1 = A ? [[`💰 ${V.juta_a} juta · sisa ${V.juta_sisa_a} juta`, 'Biayanya', INK], ['📏 lahan hemat, rumah sempit', 'hemat', INK], ['🔥 api gampang merambat', 'merambat', '#C9472F']]
      : [[`💰 ${V.juta_b} juta · sisa ${V.juta_sisa_b} juta`, 'Biayanya', INK], ['🌳 ada halaman, lega & terang', 'lega', DG], ['🛡️ lebih aman', 'aman', DG]];
    const chips = L1.map(([tx, cu, col], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, col) }));
    return { scene: sc, cam, upd(t, dur) { X.pop(big, seg(t, 0, .4)); hs.forEach((h, i) => { const q = E.back(seg(t, .4 + i * .15, .8 + i * .15)); h.scale.setScalar(Math.max(.001, q)) });
      orbit(cam, lerp(A ? -25 : 25, A ? 10 : -10, seg(t, 0, dur)), 9, A ? 19 : 27, [0, .8, -2.5]);
      if (A) { const tm = at(s, 'merambat', dur - 2); flames.forEach((f, i) => { f.visible = t > tm + i * .35; f.scale.set(1, 1 + Math.sin(t * 14 + i) * .2, 1) }) }
      chips.forEach(c => { const tc = at(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) }) } };
  },
  K3_VOTE(s, root) {
    const sc = newScene(SUNNY()); lahan(sc, { well: true, tents: true }); const K = kades([0, 0, 2.4]); sc.add(K);
    const cam = camera(42);
    const btn = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:#FFC93C;color:${INK};font-family:Fredoka;font-weight:700;font-size:96px;width:300px;padding:20px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">A<div style="font-size:34px">rumah deret</div></div><div style="background:#3E8FC4;color:#fff;font-family:Fredoka;font-weight:700;font-size:96px;width:300px;padding:20px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">B<div style="font-size:34px">rumah berjarak</div></div>`);
    const c1 = card(root, '💬 komentar menarik bisa masuk video', { left: 120, top: 640, fontSize: '36px' });
    return { scene: sc, cam, upd(t, dur) { orbit(cam, t * 6 - 15, 4, 10, [0, 1.2, 2]); K.pose(t, { wave: true, talk: true }); const q = seg(t, .3, .8); btn.style.opacity = q; btn.style.transform = `scale(${E.back(q)})`;
      X.pop(c1, seg(t, at(s, 'menarik', 2.5), at(s, 'menarik', 2.5) + .4)) } };
  },
  K3_SECTION(s, root) {
    const sc = newScene(SUNNY({ sky: ['#8FA6BA', '#D8E3EC'], hemi: 1 })); const R = roadSection(sc, {}); const dr = drops(sc, 60, 6, R.userData.h, false); const rn = rain(sc, 260, 12, 8);
    const cam = camera(40); const t1 = card(root, '💧 air mengalir ke pinggir', { left: 70, top: 300 }, '#3E8FC4'), t2 = card(root, '➜ masuk selokan', { left: 70, top: 410 }), t3 = card(root, '☀️ jalan cepat kering', { left: 70, top: 520 }, DG);
    return { scene: sc, cam, upd(t, dur) { dr(t); rn.tick(t); orbit(cam, lerp(-12, 12, seg(t, 0, dur)), 5, 25, [0, -.6, 0]);
      [[t1, 'pinggir'], [t2, 'selokan'], [t3, 'kering']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) }) } };
  },
  K3_COMPARE(s, root) {   // jalan rata: genangan, lubang, nyamuk
    const sc = newScene(SUNNY({ sky: ['#9DB4C6', '#E2EBF2'] })); const R = roadSection(sc, { crown: 0 });
    const pud = mesh(G.cyl(1.8, 1.8, .03, 28), '#5FA8D8', [0, .02, 0], { mat: { transparent: true, opacity: .8, roughness: .1 }, cast: false }); sc.add(pud);
    const hole = mesh(G.cyl(.5, .45, .2, 10), '#1E1E1E', [1, -.05, 1.6], { cast: false }); sc.add(hole);
    const mos = Array.from({ length: 10 }, () => { const m = mesh(G.box(.08, .05, .14), '#1E1E1E', [0, 0, 0], { cast: false }); sc.add(m); return m });
    const cam = camera(40); const t1 = card(root, '🚫 air menggenang di tengah', { left: 70, top: 300 }, '#C9472F'), t2 = card(root, '🕳️ aspal rusak, jadi lubang', { left: 70, top: 410 }), t3 = card(root, '🦟 tempat nyamuk bertelur', { left: 70, top: 520 }, '#C9472F');
    return { scene: sc, cam, upd(t, dur) {
      const tg = at(s, 'menggenang', 1), tl = at(s, 'lubang', 5), tn = at(s, 'nyamuk', 8);
      pud.scale.setScalar(Math.max(.01, E.out(seg(t, tg, tg + 2)))); hole.scale.setScalar(Math.max(.01, E.back(seg(t, tl, tl + .5)))); hole.visible = t > tl;
      mos.forEach((m, i) => { m.visible = t > tn; m.position.set(Math.sin(t * 3 + i) * 1.2, .6 + Math.sin(t * 7 + i * 2) * .3 + (i % 3) * .2, Math.cos(t * 2.5 + i * 1.7) * 1.2) });
      orbit(cam, lerp(25, 5, seg(t, 0, dur)), 8, 21, [0, -.3, .5]);
      [[t1, tg], [t2, tl], [t3, tn]].forEach(([e, tc]) => X.pop(e, seg(t, tc, tc + .4)));
    } };
  },
  K3_NUMBERS(s, root) {   // ukuran: lebar 5 m, tengah ±5 cm, kemiringan 2%
    const sc = newScene(SUNNY({ sky: ['#BFE6C8', '#F2FBF4'] })); const R = roadSection(sc, { crown: .6, len: 3 });
    const cam = camera(40); const V = X.TL.vars;
    const dimW = tag3(root, `lebar ${V.lebar} m`, INK), dimH = tag3(root, `± ${V.tinggi_cm} cm`, '#C9472F'), sl = [tag3(root, `${V.miring}%`, '#3E8FC4'), tag3(root, `${V.miring}%`, '#3E8FC4')];
    const ar = group(sc, [0, 0, 1.6]); ar.add(mesh(G.box(6, .04, .04), '#C9472F', [0, -.05, 0], { cast: false })); ar.add(mesh(G.box(.04, .65, .04), '#C9472F', [0, .3, 0], { cast: false }));
    const note = card(root, '(digambar dilebihkan biar kelihatan)', { left: 150, top: 1150, fontSize: '30px' }), soil = card(root, 'jalan tanah: lebih miring', { left: 70, top: 300 }, '#8D6E4A');
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(0, 1.6, 24); cam.lookAt(0, -.3, 0);
      const tm = at(s, 'persen', 1), tw = at(s, 'meter', 4), tc = at(s, 'senti', 6), ts = at(s, 'Jalan tanah', dur - 2.5);
      sl[0].at(R, cam, [-1.6, .55, 1.5], seg(t, tm, tm + .4)); sl[1].at(R, cam, [1.6, .55, 1.5], seg(t, tm, tm + .4)); dimW.at(ar, cam, [0, -.15, 0], seg(t, tw, tw + .4)); dimH.at(ar, cam, [0, .75, 0], seg(t, tc, tc + .4));
      ar.visible = t > tw; X.pop(note, seg(t, tc + .5, tc + .9)); X.pop(soil, seg(t, ts, ts + .4));
    } };
  },
  K3_TIPS(s, root) {   // jalan desa yang benar: cembung, selokan, selokan bersih; jangan timbun pasir di pinggir
    const sc = newScene(SUNNY()); const R = roadSection(sc, { len: 10 }); const K = kades([4.2, .0, 1]); sc.add(K); K.rotation.y = -Math.PI / 2;
    const trash = [0, 1, 2, 3].map(i => { const m = mesh(G.box(.3, .2, .3), ['#E5484D', '#F5C542', '#FFFFFF', '#3E8FC4'][i], [-3.55, -.3, -1 + i * .7]); sc.add(m); return m });
    const sand = mesh(G.cone(.9, .7, 10), '#E0C48A', [3.6, .1, -2.5]); sc.add(sand);
    const cam = camera(42);
    const L = [['✅ tengah sedikit cembung', 'cembung'], ['✅ selokan kiri dan kanan', 'selokan'], ['✅ selokan tidak tersumbat', 'tersumbat'], ['❌ jangan timbun tanah di pinggir', 'menimbun']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, i === 3 ? '#C9472F' : INK) }));
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-30, 30, E.inout(seg(t, 0, dur))), 10, 24, [0, -.5, 0]); K.pose(t, { point: (t % 4) < 1.6, talk: true });
      const tt = at(s, 'tersumbat', 8); trash.forEach((m, i) => { const q = seg(t, tt + .6 + i * .15, tt + 1 + i * .15); m.position.y = -.3 + E.in(q) * 3; m.visible = q < 1 });
      const tm = at(s, 'menimbun', dur - 6); sand.visible = t > tm - .1; sand.scale.setScalar(Math.max(.01, E.back(seg(t, tm, tm + .5))));
      L.forEach(l => { const tc = at(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
    } };
  },
};

// HUD game + label kuning + kilat putih
let hud, label, flash;
export function chrome(ctx) {
  const v = ctx.TL.vars.hud || { hari: 1, penduduk: 5, anggaran: 100 };
  hud = ctx.ab({ left: 36, top: 56, display: 'flex', gap: '12px', zIndex: 8, fontFamily: 'Fredoka', fontWeight: 700 }, ctx.ov,
    [[`HARI ${v.hari}`, YEL, INK], [`👥 ${v.penduduk}`, CREAM, INK], [`💰 Rp${v.anggaran} jt`, CREAM, INK]].map(([t, bg, c]) => `<div style="background:${bg};color:${c};font-size:38px;padding:8px 20px;border-radius:18px;border:5px solid ${INK};box-shadow:0 6px 0 ${DG}">${t}</div>`).join(''));
  label = ctx.ab({ left: 0, top: 1240, width: 1080, textAlign: 'center', zIndex: 8 }, ctx.ov); flash = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#fff', opacity: 0, zIndex: 9 }, ctx.ov);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const q = seg(t, .1, .4), o = seg(t, 2.4, 2.8);
  label.innerHTML = `<span style="display:inline-block;background:${YEL};color:${INK};font-family:Fredoka;font-weight:700;font-size:48px;padding:10px 30px;border-radius:16px;border:6px solid ${INK};transform:rotate(-2deg)">${s.kicker}<span style="font-size:34px"> · ${s.sub}</span></span>`;
  label.style.opacity = q * (1 - o); label.style.transform = `scale(${E.back(q)})`;
  let f = 0; X.TL.scenes.forEach((x, i) => { if (i) f = Math.max(f, 1 - Math.abs(T - x.start) / .18) }); flash.style.opacity = clamp(f);
}

// Shot ep011 (Bongkar Jebakan promo 11.11)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin } from '../../../engine/w3d/kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, nana, dompet, kos, chip, tag3, at } from '../../../engine/w3d/nana.js';
const big = (root, html, top, col = BATA, fs = 96) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `16px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };
const canvasTex = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.redraw = a => { draw(x, a); t.needsUpdate = true }; t.redraw(0); return t };

export const SHOTS = {
  D3_E011_CHECKOUT(s, root) {   // kamar kos 23.59 (lampu meja terang): HP raksasa hitung mundur + tombol checkout berkedip
    const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: 1.3, hemi: 1.3, sun: '#FFE2C2', sunPos: [-5, 9, 7] })); kos(sc, { wall: '#E6C9AE' });
    const L = new THREE.PointLight('#FFD9A8', 16, 12); L.position.set(1, 4, 2); sc.add(L);
    sc.add(mesh(G.box(3, .5, 2), '#C2457A', [-2, .25, -2])); sc.add(mesh(G.box(3.1, .22, 2.1), '#FFF1E0', [-2, .6, -2]));
    const N = nana([-1.2, .62, -1.6]); sc.add(N); N.rotation.y = .5; N.userData.st.legs.forEach(l => l.rotation.x = -1.4);
    const tex = canvasTex(512, 900, (x, k) => { x.fillStyle = '#FFF6EE'; x.fillRect(0, 0, 512, 900); x.fillStyle = '#E5484D'; x.fillRect(0, 0, 512, 140); x.fillStyle = '#fff'; x.font = '800 70px Baloo'; x.textAlign = 'center'; x.fillText('PROMO 11.11', 256, 98);
      x.fillStyle = INK; x.font = '800 44px Baloo'; x.fillText('berakhir dalam', 256, 220); x.fillStyle = '#E5484D'; x.font = '800 110px Baloo'; x.fillText(`00:00:${String(Math.max(0, 59 - k)).padStart(2, '0')}`, 256, 340);
      x.fillStyle = '#F2B41B'; x.fillRect(60, 400, 392, 200); x.fillStyle = INK; x.font = '800 120px Baloo'; x.fillText('-40%', 256, 550);
      x.fillStyle = k % 2 ? '#2E9C6A' : '#3FBF84'; x.beginPath(); x.roundRect(60, 700, 392, 120, 30); x.fill(); x.fillStyle = '#fff'; x.font = '800 64px Baloo'; x.fillText('CHECKOUT', 256, 782) });
    const ph = group(sc, [1.2, 2.6, -.6]); ph.add(mesh(G.box(1.7, 3, .12), '#1B1B1F', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(1.56, 2.74), new THREE.MeshBasicMaterial({ map: tex })); scr.position.z = .065; ph.add(scr);
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Diskon <span style="color:#E5484D">40%</span>.<br>Hematnya cuma <span style="color:${BATA}">Rp8.000</span>.`);
    return { scene: sc, cam, upd(t, dur) {
      tex.redraw(Math.floor(t)); ph.rotation.y = -.25 + Math.sin(t) * .04; ph.position.y = 2.6 + Math.sin(t * 1.4) * .05;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, .2, p), lerp(3, 2.8, p), lerp(8.6, 7.2, p)); cam.lookAt(lerp(.2, .6, p), 1.9, -1);
      N.pose(t, { hold: true, look: .6, talk: t > 4 }); N.userData.st.legs.forEach(l => l.rotation.x = -1.4); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5 ? 'none' : 'block';
    } };
  },
  D3_E011_LABEL(s, root) {   // lorong gudang toko terang: label harga raksasa berganti 200rb -> 320rb -> coret 192rb
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#E8EEF2', '#FFFFFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [4, 14, 8], hemi: 1.6, shadow: 14 })); sc.add(mesh(G.box(14, .2, 30), '#C9C4BA', [0, -.1, -6]));
    for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) { const r = group(sc, [sx * 3, 0, -2 - i * 4]); r.add(mesh(G.box(1, 4.6, 3.6), '#4A5A6A', [0, 2.3, 0])); for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) r.add(mesh(G.box(.8, .8, .9), ['#C9935E', '#B9875A', '#E8B78A'][(i + j + k) % 3], [sx * -.1, .5 + k * 1.1, -1.1 + j * 1.1])) }
    const tagT = canvasTex(512, 320, (x, st) => { x.fillStyle = '#FFF6E6'; x.fillRect(0, 0, 512, 320); x.fillStyle = INK; x.font = '800 44px Baloo'; x.textAlign = 'center'; x.fillText(['MINGGU LALU', 'SEMINGGU SEBELUM PROMO', 'PROMO 11.11'][st], 256, 70);
      if (st < 2) { x.fillStyle = st ? '#E5484D' : INK; x.font = '800 92px Baloo'; x.fillText(st ? v.naik_rp : v.normal_rp, 256, 220) } else { x.fillStyle = '#9A948C'; x.font = '800 60px Baloo'; x.fillText(v.naik_rp, 256, 150); x.strokeStyle = '#E5484D'; x.lineWidth = 10; x.beginPath(); x.moveTo(110, 132); x.lineTo(402, 132); x.stroke(); x.fillStyle = '#2E9C6A'; x.font = '800 100px Baloo'; x.fillText(v.coret_rp, 256, 270) } });
    const tag = group(sc, [0, 3, -3]); tag.add(mesh(G.box(3.2, 2, .1), '#E5484D', [0, 0, -.06])); const tm = new THREE.Mesh(G.plane(3, 1.88), new THREE.MeshBasicMaterial({ map: tagT })); tm.position.z = .01; tag.add(tm); tag.add(mesh(G.cyl(.03, .03, 1.4, 6), '#555', [0, 1.6, -.05]));
    const N = nana([1, 0, .6]); sc.add(N); N.rotation.y = -.4; const cam = camera(42); let last = -1;
    const res = big(root, `hemat cuma ${v.hemat_rp}<div style="font-size:44px">(${v.hemat_pct}% dari harga normal)</div>`, 1150, BATA, 84);
    return { scene: sc, cam, upd(t, dur) {
      const t1 = at(s, 'naik jadi', 4), t2 = at(s, 'didiskon', 8), t3 = at(s, 'Hemat beneran', dur - 3); const st = t < t1 ? 0 : t < t2 ? 1 : 2; if (st !== last) { tagT.redraw(st); last = st }
      tag.rotation.y = Math.sin(t * 1.5) * .08 + (t > t1 && t < t1 + .4 ? Math.sin((t - t1) * 40) * .2 : 0);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.4, .6, p), lerp(2.2, 3, p), lerp(9, 7.6, p)); cam.lookAt(0, 2.4, -3);
      N.pose(t, { look: .3, shake: t > t3 }); show(res, seg(t, t3, t3 + .5));
    } };
  },
  D3_E011_ONGKIR(s, root) {   // dok bongkar muat ekspedisi siang: truk, dua tumpukan (barang tambahan vs ongkir), neraca selisih
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#BFE3F5', '#FFF6E6'], sun: '#FFF4E0', sunPos: [-6, 12, 8], hemi: 1.5, shadow: 16 })); sc.add(mesh(G.box(30, .2, 20), '#9A948C', [0, -.1, 0])); sc.add(mesh(G.box(16, 1.2, 4), '#B9B2A6', [0, .6, -5]));
    const truck = group(sc, [-3.5, 1.2, -5.5]); truck.add(mesh(G.box(4.6, 2.6, 2.4), '#F4F1EA', [0, 1.3, 0])); truck.add(mesh(G.box(1.6, 1.8, 2.2), BATA, [3.1, .9, 0])); [-1.4, 1.4, 3.1].forEach(x => truck.add(mesh(G.cyl(.45, .45, 2.5, 14), '#222', [x, -.2, 0], { rot: [Math.PI / 2, 0, 0] })));
    const cart = group(sc, [-.8, 0, 0]); [0, 1, 2].forEach(i => cart.add(mesh(G.box(.8, .6, .6), ['#3E8FC4', '#C9935E', '#2E9C6A'][i], [0, .3 + i * .62, 0])));
    const extra = mesh(G.box(.9, .7, .7), '#E5484D', [-.8, 6, 0]); sc.add(extra);
    const ong = group(sc, [1.8, 0, 0]); ong.add(mesh(G.box(1.2, .5, .7), '#F2B41B', [0, .25, 0]));
    const N = nana([.2, 0, 1.6]); sc.add(N); const cam = camera(42);
    const t1 = tag3(root, `belanjaan ${v.butuh_rp}`), t2 = tag3(root, `+ ${v.tambah_rp} biar gratis ongkir`, '#E5484D'), t3 = tag3(root, `ongkir cuma ${v.ongkir_rp}`, '#2E7D32');
    const r = big(root, `rugi ${v.rugi_rp}`, 330, '#E5484D', 100);
    return { scene: sc, cam, upd(t, dur) {
      const ta = at(s, 'nambah', 4), tb = at(s, 'ongkirnya', dur * .6), tc = at(s, 'rugi', dur - 3);
      extra.position.y = lerp(6, 2.17, E.out(seg(t, ta, ta + .6))); extra.rotation.y = seg(t, ta, ta + .6) * 3;
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-14, 12, p), 3.2, lerp(11, 10, p), [0, 1.5, 0]);
      t1.at(cart, cam, [0, 2.3, 0], seg(t, 1, 1.4)); t2.at(extra, cam, [0, .8, 0], seg(t, ta + .4, ta + .8)); t3.at(ong, cam, [0, 1, 0], seg(t, tb, tb + .4));
      N.pose(t, { talk: true, point: t > tb && t < tb + 1.5, shake: t > tc }); show(r, seg(t, tc, tc + .5));
    } };
  },
  D3_E011_TIMER(s, root) {   // alun-alun malam terang: menara jam raksasa berdetak, Nana menaruh barang di keranjang dan menunggu
    const sc = newScene(WARM({ sky: ['#2E3A6A', '#7A6A9A'], sunI: 1.4, hemi: 1.4, sun: '#FFE9C8', sunPos: [5, 9, 6], fog: ['#4A4A7A', 18, 55] })); sc.add(mesh(G.box(40, .2, 30), '#8A8A92', [0, -.1, 0])); sc.add(mesh(G.cyl(5, 5, .25, 32), '#B9B2A6', [0, .1, -4]));
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; const g = group(sc, [Math.sin(a) * 9, 0, -4 + Math.cos(a) * 9]); g.add(mesh(G.cyl(.08, .1, 3.6, 8), '#555', [0, 1.8, 0])); g.add(mesh(G.sph(.3, 10, 8), '#FFE8B0', [0, 3.7, 0], { mat: { emissive: '#FFD27A', emissiveIntensity: 1.6 }, cast: false })) }
    const L = new THREE.PointLight('#FFE2B0', 30, 20); L.position.set(0, 6, 2); sc.add(L);
    const tw = group(sc, [0, 0, -4]); tw.add(mesh(G.box(2.4, 9, 2.4), '#C9A27A', [0, 4.5, 0])); tw.add(mesh(G.cone(2, 2, 4), BATA, [0, 10, 0], { rot: [0, Math.PI / 4, 0] }));
    const face = mesh(G.cyl(.95, .95, .1, 32), '#FFF6E6', [0, 7.4, 1.25], { rot: [Math.PI / 2, 0, 0], mat: { emissive: '#FFF6E6', emissiveIntensity: .5 } }); tw.add(face);
    const hand = group(tw, [0, 7.4, 1.32]); hand.add(mesh(G.box(.08, .8, .04), INK, [0, .35, 0], { cast: false }));
    const N = nana([2.4, 0, 2]); sc.add(N); N.rotation.y = -.6; const box = mesh(G.box(.4, .3, .3), '#3E8FC4', [0, -.6, .2]); N.userData.st.arms[1].add(box);
    const cam = camera(44); const rule = X.ab({ left: 60, top: 300, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 #2E7D32`, opacity: 0 }, root, `🛒 masuk keranjang → <span style="color:#2E7D32">tunggu 24 jam</span>`);
    return { scene: sc, cam, upd(t, dur) {
      hand.rotation.z = -Math.floor(t * 2) * Math.PI / 30; const tr = at(s, 'tunggu', dur * .6);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(6, 4, p), lerp(2.6, 5, p), lerp(12, 10, p)); cam.lookAt(lerp(1, 0, p), lerp(3, 5.5, p), -2);
      N.pose(t, { hold: true, look: -.4, nod: t > tr }); X.pop(rule, seg(t, tr, tr + .4));
    } };
  },
  D3_E011_TERAS(s, root) {   // teras kos pagi: lima kotak barang keranjang, empat melayang hilang, satu tersisa; papan 3 trik + pertanyaan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#A8DCF2', '#FFF3DE'], sun: '#FFF4E0', sunPos: [-7, 9, 8], hemi: 1.5 })); sc.add(mesh(G.box(12, .3, 8), '#C9935E', [0, -.15, 0])); sc.add(mesh(G.box(12, 5, .2), '#F4E9D2', [0, 2.5, -3.5]));
    [-3.5, 3.5].forEach(x => { sc.add(mesh(G.cyl(.35, .3, .6, 10), '#C2457A', [x, .3, -2.6])); sc.add(mesh(G.ico(.6, 0), '#4E8F3A', [x, 1.1, -2.6])) });
    const boxes = [0, 1, 2, 3, 4].map(i => { const m = mesh(G.box(.6, .5, .5), ['#3E8FC4', '#E5484D', '#F2B41B', '#C2457A', '#2E9C6A'][i], [-1.6 + i * .8, 1.6, -1.6]); sc.add(m); return m });
    const N = nana([1.1, 0, .6]); sc.add(N); N.rotation.y = -.5; const D = dompet(sc, [-2.8, 0, .6], .7); const cam = camera(42);
    const list = X.ab({ left: 140, top: 300, width: 800, background: CREAM, border: `6px solid ${INK}`, borderRadius: '26px', padding: '12px 26px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, v.tips.map(([ic, h, d]) => `<div>${ic} ${h} <span style="font-size:30px;color:#7A6A5A">· ${d}</span></div>`).join(''));
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '50px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Lo semalam <span style="color:${BATA}">checkout apa?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tg = at(s, 'cuma', 3), tq = at(s, 'Lo semalam', dur - 2.5);
      boxes.forEach((b, i) => { if (i === 2) { b.position.y = 1.6 + Math.sin(t * 2) * .05; return } const k = E.in(seg(t, tg + i * .15, tg + i * .15 + .6)); b.position.y = 1.6 + k * 4; b.rotation.z = k * 2; b.visible = k < .99 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, .6, p), lerp(3, 3.4, p), lerp(8.4, 9.4, p)); cam.lookAt(0, 1.3, -1);
      N.pose(t, { talk: true, nod: t > tg }); D.mood(t, false); X.pop(list, seg(t, .4, .8)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

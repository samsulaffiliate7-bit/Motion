// Shot ep016 (Cerita Keputusan A/B: adik minta HP 3 juta)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from '../../../engine/w3d/kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, nana, dompet, kos, chip, tag3, at } from '../../../engine/w3d/nana.js';
const adik = (parent, p) => person(parent, p, { body: '#FFFFFF', pants: '#4A6FA5', hair: '#1E1410', skin: '#D9A07A', s: .85 });
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };
const AB = (root, html, top = 300) => X.ab({ left: 60, top, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', opacity: 0 }, root, html);

export const SHOTS = {
  D3_E016_CHAT(s, root) {   // ruang tamu rumah ortu sore: adik memegang HP retak, gelembung chat raksasa "beliin yang 3 juta?"
    const sc = newScene(WARM({ sky: ['#FFC98A', '#FFF3DE'], sunPos: [-6, 7, 8], hemi: 1.5 })); sc.add(mesh(G.box(14, .2, 14), '#C9A27A', [0, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), '#F4E2C8', [0, 3, -3.6])); sc.add(mesh(G.box(.2, 6, 14), '#EBD4B4', [-5, 3, 0]));
    sc.add(mesh(G.box(3.4, .5, 1.1), '#5E8A6A', [-1.4, .25, -2.6])); sc.add(mesh(G.box(3.4, .9, .3), '#5E8A6A', [-1.4, .7, -3.1])); sc.add(mesh(G.box(1.2, 1.6, .1), '#7A5230', [2.4, 2.6, -3.5]));
    const A = adik(sc, [-.8, .3, -2.4]); const ph = group(A.userData.st.arms[1], [0, -.6, .12]); ph.add(mesh(G.box(.14, .26, .02), '#111', [0, 0, 0])); ph.add(mesh(G.box(.12, .02, .021), '#FFFFFF', [0, .03, .01], { rot: [0, 0, .6], cast: false }));
    const N = nana([1.4, 0, -.6]); sc.add(N); N.rotation.y = -.6; const cam = camera(42);
    const bub = X.ab({ left: 60, top: 300, width: 960, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: '28px 28px 28px 8px', padding: '16px 24px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '46px', color: INK, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `📱 <b>Adik</b>: "Kak, HP aku rusak 😭 bisa beliin yang <span style="color:${BATA}">3 juta</span>?"`);
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root, `Adik minta HP <span style="color:${BATA}">3 juta</span>.<br>Gaji gue 5 juta.`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.8, .6, p), lerp(3, 2.8, p), lerp(8, 6.8, p)); cam.lookAt(0, 1.3, -1.6);
      A.pose(t, { hold: true, look: .6, bounce: t < 3 }); N.pose(t, { talk: t > 3, look: -.6, nod: t > 6 }); X.pop(bub, seg(t, .2, .6)); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5 ? 'none' : 'block';
    } };
  },
  D3_E016_HITUNG(s, root) {   // kamar kos malam: lima blok pos gaji tersusun, sisa 500 ribu kecil di ujung; kalender 6 bulan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: 1.3, hemi: 1.3, sun: '#FFE2C2', sunPos: [-5, 9, 7] })); kos(sc, { wall: '#E8D2B8' });
    const L = new THREE.PointLight('#FFD9A8', 14, 10); L.position.set(0, 4, 1); sc.add(L);
    const H = [1.2, 1.5, .5, .8, .5, .5], C = ['#3E8FC4', '#E8A33D', '#7A8594', '#C2457A', '#2E9C6A', GOLD];
    const blocks = H.map((h, i) => { const m = mesh(G.box(.8, h * 1.4, .8), C[i], [-2.5 + i * 1, h * .7, -2]); sc.add(m); return m });
    const N = nana([2.8, 0, -.4]); sc.add(N); N.rotation.y = -.8; const cam = camera(42);
    const labs = v.pos.map(([a]) => tag3(root, a)); const sl = tag3(root, `sisa ${v.sisa_rp}`, '#2E7D32');
    const six = chip(root, `📅 HP Rp3 juta = <span style="color:${BATA}">6 bulan</span> sisa gaji`, { left: 90, top: 300, fontSize: '46px' });
    return { scene: sc, cam, upd(t, dur) {
      const ts = at(s, 'Sisanya', 4), t6 = at(s, 'enam bulan', 8);
      blocks.forEach((m, i) => { const q = E.back(seg(t, .3 + i * .5, .7 + i * .5)); m.scale.y = Math.max(.01, q); m.position.y = H[i] * .7 * Math.max(.01, q) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-.6, .4, p), lerp(3.4, 3.6, p), lerp(10.6, 9.8, p)); cam.lookAt(0, 1.1, -2);
      labs.forEach((g, i) => g.at(blocks[i], cam, [0, H[i] * .7 + .25, 0], seg(t, .6 + i * .5, 1 + i * .5))); sl.at(blocks[5], cam, [0, .6, 0], seg(t, ts, ts + .4));
      N.pose(t, { talk: true, shake: t > t6 }); X.pop(six, seg(t, t6, t6 + .4));
    } };
  },
  D3_E016_PINTU(s, root) {   // lorong dua pintu terang: pintu A oranye (beli penuh, dana darurat setengah), pintu B hijau (patungan, cicil 3 bulan)
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#F4EEF8', '#FFFFFF'], sun: '#FFF4E0', hemiSky: '#FFFFFF', sunPos: [-6, 12, 8], hemi: 1.6 })); sc.add(mesh(G.box(12, .2, 14), '#E0D8CC', [0, -.1, 0])); sc.add(mesh(G.box(12, 6, .2), '#F4EEE6', [0, 3, -3.6]));
    const doors = [[-1.8, '#E07B39', 'A'], [1.8, '#2E9C6A', 'B']].map(([x, c, l]) => { const g = group(sc, [x, 0, -3.4]); g.add(mesh(G.box(2, 3.6, .2), '#7A5230', [0, 1.8, 0])); const d = group(g, [-.9, 1.75, .12]); d.add(mesh(G.box(1.8, 3.4, .1), c, [.9, 0, 0])); d.add(mesh(G.sph(.08, 8, 6), GOLD, [1.6, 0, .08]));
      const cc = document.createElement('canvas'); cc.width = 128; cc.height = 128; const x2 = cc.getContext('2d'); x2.fillStyle = '#fff'; x2.font = '800 110px Baloo'; x2.textAlign = 'center'; x2.fillText(l, 64, 100); const tx = new THREE.CanvasTexture(cc); tx.colorSpace = THREE.SRGBColorSpace; const lb = new THREE.Mesh(G.plane(.8, .8), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); lb.position.set(.9, .8, .06); d.add(lb); g.userData.d = d; return g });
    const N = nana([0, 0, 0]); sc.add(N); N.rotation.y = Math.PI; const cam = camera(42);
    const ab = AB(root, `<div style="background:#E07B39;color:#fff;font-family:Baloo;font-weight:800;font-size:36px;padding:14px 20px;border-radius:22px;border:6px solid ${INK};text-align:center;width:420px">A · beliin penuh<br><span style="font-size:28px">pakai dana darurat<br>sisa ${v.a_darurat_rp} (setengah)</span></div><div style="background:#2E9C6A;color:#fff;font-family:Baloo;font-weight:800;font-size:36px;padding:14px 20px;border-radius:22px;border:6px solid ${INK};text-align:center;width:420px">B · HP 2 juta<br><span style="font-size:28px">gue ${v.b_nana_rp}, cicil ${v.b_bulan} bulan<br>adik nambah Rp500 rb</span></div>`);
    return { scene: sc, cam, upd(t, dur) {
      const ta = at(s, 'Pilihan A', .5), tb = at(s, 'Pilihan B', dur * .5);
      doors[0].userData.d.rotation.y = -E.out(seg(t, ta, ta + 1)) * 1.2; doors[1].userData.d.rotation.y = -E.out(seg(t, tb, tb + 1)) * 1.2;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(0, lerp(3, 3.3, p), lerp(9.6, 8.8, p)); cam.lookAt(0, 1.7, -3);
      N.pose(t, { look: t < tb ? -.6 : .6 }); X.pop(ab, seg(t, ta, ta + .4)); [...ab.children].forEach((e, i) => e.style.opacity = (i === 0 ? t > ta : t > tb) ? 1 : .15);
    } };
  },
  D3_E016_TERAS(s, root) {   // teras rumah malam terang: Nana duduk di tangga memegang HP, belum membalas; kartu A/B + pertanyaan
    const sc = newScene(WARM({ sky: ['#2E3A6A', '#7A6A9A'], sunI: 1.3, hemi: 1.4, sun: '#FFE9C8', sunPos: [5, 9, 6] })); sc.add(mesh(G.box(14, .2, 10), '#7A8A6A', [0, -.1, 0]));
    const hs = group(sc, [0, 0, -2.6]); hs.add(mesh(G.box(6, 3.4, .3), '#F4E2C8', [0, 1.9, -.6])); hs.add(mesh(G.box(6.4, .3, 2.4), '#C8501E', [0, 3.7, .2])); for (let i = 0; i < 3; i++) hs.add(mesh(G.box(3, .2, .5), '#B9B2A6', [0, .1 + i * .2, 1.2 - i * .5]));
    hs.add(mesh(G.box(1, .7, .05), '#FFE2A0', [1.8, 2, -.44], { mat: { emissive: '#FFD27A', emissiveIntensity: 1.2 }, cast: false })); const L = new THREE.PointLight('#FFE2B0', 14, 10); L.position.set(0, 3.2, 0); sc.add(L);
    const N = nana([0, .45, -1.6]); sc.add(N); N.userData.st.legs.forEach(l => l.rotation.x = -1.4); const ph = mesh(G.box(.14, .26, .02), '#111', [0, -.6, .12]); N.userData.st.arms[1].add(ph);
    const cam = camera(42); const ab = AB(root, `<div style="background:#E07B39;color:#fff;font-family:Baloo;font-weight:800;font-size:56px;padding:10px 40px;border-radius:22px;border:6px solid ${INK}">A</div><div style="background:#2E9C6A;color:#fff;font-family:Baloo;font-weight:800;font-size:56px;padding:10px 40px;border-radius:22px;border:6px solid ${INK}">B</div>`);
    const typing = chip(root, '💬 Nana sedang mengetik…', { left: 280, top: 440, fontSize: '36px' });
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Kalau lo jadi gue,<br>pilih <span style="color:#E07B39">A</span> atau <span style="color:#2E9C6A">B</span>?`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.4, .4, p), lerp(2.4, 2.6, p), lerp(5.4, 4.6, p)); cam.lookAt(0, 1.2, -1.6);
      N.pose(t, { hold: true, look: Math.sin(t * .6) * .3 }); N.userData.st.legs.forEach(l => l.rotation.x = -1.4); X.pop(ab, seg(t, 1, 1.4)); typing.style.opacity = (Math.floor(t * 2) % 2) ? 1 : .5; typing.style.transform = 'none';
      const tq = at(s, 'Kalau lo', dur - 3.5); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

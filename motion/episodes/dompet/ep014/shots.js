// Shot ep014 (Mesin Waktu: mi instan 3.500 di masa depan, balasan komentar)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from '../../../engine/w3d/kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, nana, dompet, kos, chip, tag3, at } from '../../../engine/w3d/nana.js';
const big = (root, html, top, col = BATA, fs = 92) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `16px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };
const pack = (parent, p, s = 1) => { const g = group(parent, p); g.scale.setScalar(s); g.add(mesh(G.box(.5, .1, .38), '#F2B41B', [0, 0, 0])); g.add(mesh(G.box(.3, .102, .2), '#E5484D', [.04, 0, 0], { cast: false })); return g };

export const SHOTS = {
  D3_E014_KOMEN(s, root) {   // warung kelontong malam terang: gelembung komentar penonton melayang, Nana memegang bungkus mi
    const sc = newScene(WARM({ sky: ['#2B2A4A', '#6A5A8A'], sunI: 1.3, hemi: 1.3, sun: '#FFE2C2', sunPos: [5, 8, 6] })); sc.add(mesh(G.box(20, .2, 14), '#8A8A92', [0, -.1, 0]));
    const w = group(sc, [0, 0, -3]); w.add(mesh(G.box(7, 3.4, 1.2), '#E9C49A', [0, 1.7, -.4])); w.add(mesh(G.box(7.4, .3, 2), '#2E9C6A', [0, 3.5, .2], { rot: [.15, 0, 0] }));
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) pack(w, [-2.8 + i * .7, .8 + r * .7, .3], .9);
    const L = new THREE.PointLight('#FFF1D6', 18, 12); L.position.set(0, 3.2, 1.4); sc.add(L);
    const N = nana([1.4, 0, .4]); sc.add(N); N.rotation.y = -.5; const pk = pack(N.userData.st.arms[1], [0, -.6, .15], .8);
    const cam = camera(42);
    const cmt = X.ab({ left: 60, top: 300, width: 960, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: '28px 28px 28px 8px', padding: '16px 24px', fontFamily: 'Baloo', fontWeight: 700, fontSize: '42px', color: INK, boxShadow: `0 10px 0 ${BATA}` }, root, `💬 <b>penonton</b>: "kalo mi instan skrng <span style="color:${BATA}">3.500</span>, di masa depan jadi berapa bg? (bales pake vt)"`);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root, `Mi instan <span style="color:${BATA}">Rp3.500</span>.<br>20 tahun lagi berapa?`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, 1, p), lerp(2.8, 2.6, p), lerp(8.4, 7.2, p)); cam.lookAt(lerp(.2, .6, p), 1.6, -1.6);
      N.pose(t, { hold: true, look: -.5, talk: t > 2 }); pk.rotation.y = t; X.pop(cmt, seg(t, .1, .5)); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5 ? 'none' : 'block';
    } };
  },
  D3_E014_RAK(s, root) {   // lorong rak minimarket lintas waktu: label tahun di atas kepala berganti, harga naik, rambut Nana memutih pelan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#E8F2F8', '#FFFFFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [4, 14, 8], hemi: 1.7, shadow: 14 })); sc.add(mesh(G.box(12, .2, 24), '#E0DCD4', [0, -.1, -6], { mat: { roughness: .3 } }));
    for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { const r = group(sc, [sx * 2.4, 0, -1 - i * 3.4]); r.add(mesh(G.box(.9, 3, 3), '#D9DEE4', [0, 1.5, 0])); for (let k = 0; k < 4; k++) for (let j = 0; j < 5; j++) pack(r, [sx * -.5, .4 + k * .7, -1.2 + j * .6], .8).rotation.y = Math.PI / 2 }
    for (let i = 0; i < 4; i++) sc.add(mesh(G.box(1.4, .06, .3), '#FFFFFF', [0, 4, -1 - i * 3.4], { mat: { emissive: '#FFFFFF', emissiveIntensity: 1 }, cast: false }));
    const N = nana([0, 0, .6]); sc.add(N); const hairM = N.userData.st.head.children.filter(c => c.material && c.material.color && c.material.color.getHexString() === '1e1410');
    const cam = camera(42); const yr = X.ab({ left: 330, top: 300, background: INK, color: GOLD, fontFamily: 'Baloo', fontWeight: 800, fontSize: '70px', padding: '4px 30px', borderRadius: '18px' }, root);
    const pr = X.ab({ left: 0, top: 1130, width: 1080, textAlign: 'center' }, root); const asm = chip(root, '*asumsi: harga naik 3%/tahun', { left: 250, top: 420, fontSize: '34px', padding: '6px 18px' });
    const steps = [[0, '3,5'], [10, v.h10], [20, v.h20], [30, v.h30]];
    return { scene: sc, cam, upd(t, dur) {
      const tc = [0, at(s, 'Sepuluh tahun', 4), at(s, 'Dua puluh tahun', 8), at(s, 'Tiga puluh', 12)]; let k = 0; tc.forEach((x, i) => { if (t >= x) k = i });
      const [n, h] = steps[k]; yr.textContent = String(2026 + n); pr.innerHTML = `<span style="display:inline-block;background:${CREAM};border:8px solid ${INK};border-radius:30px;padding:10px 40px;font-family:Baloo;font-weight:800;font-size:100px;color:${k > 1 ? '#D63B2F' : INK};box-shadow:0 12px 0 ${BATA}">Rp${h} rb</span>`;
      const g = k / 3; hairM.forEach(m => m.material = mat(g > .6 ? '#9A948C' : g > .3 ? '#5A4A40' : '#1E1410'));
      const w = seg(t, 0, dur); N.position.z = lerp(.6, -6, w); N.pose(t, { walk: 1 }); N.rotation.y = Math.PI;
      cam.position.set(Math.sin(t * .3) * .5, 2.8, N.position.z + 6); cam.lookAt(0, 1.4, N.position.z - 2); X.pop(asm, seg(t, .5, .9));
    } };
  },
  D3_E014_DAPUR(s, root) {   // dapur kos siang: dua tumpukan bungkus (28 sekarang vs 15 dua puluh tahun lagi), uang 100 ribu di tengah
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#FFD9A0', '#FFF6E6'], sunPos: [-6, 10, 6], hemi: 1.5 })); kos(sc, { wall: '#FFE7C8' });
    sc.add(mesh(G.box(5, .9, 1.4), '#FFFFFF', [0, .45, -2.6])); sc.add(mesh(G.box(5.1, .08, 1.5), '#D9B48A', [0, .94, -2.6]));
    const note = mesh(G.box(1, .02, .5), '#E5484D', [0, 1, -2.2], { cast: false }); sc.add(note);
    const A = Array.from({ length: 28 }, (_, i) => pack(sc, [-1.2 + (i % 2) * .55, 1.04 + Math.floor(i / 2) * .1, -2.7], .9)), B = Array.from({ length: 15 }, (_, i) => pack(sc, [.5 + (i % 2) * .55, 1.04 + Math.floor(i / 2) * .1, -2.7], .9));
    const N = nana([2.8, 0, -1.2]); sc.add(N); N.rotation.y = -.8; const cam = camera(42);
    const ta = tag3(root, `2026: ${v.now_n} bungkus`), tb = tag3(root, `2046: ${v.f20_n} bungkus`, '#D63B2F'); const c1 = chip(root, '💵 uang sama: Rp100.000', { left: 230, top: 300, fontSize: '48px' });
    const kos2 = chip(root, '🍜 anak kos tanggal tua, kerasa banget', { left: 90, top: 410, fontSize: '40px' }, BATA);
    return { scene: sc, cam, upd(t, dur) {
      const t1 = at(s, 'dua puluh delapan', 3), t2 = at(s, 'lima belas', 7), tk = at(s, 'anak kos', dur - 3);
      A.forEach((m, i) => m.visible = t > t1 - 1 + i * .04); B.forEach((m, i) => m.visible = t > t2 - .6 + i * .05);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-.6, .4, p), lerp(3.2, 3.4, p), lerp(7, 6.4, p)); cam.lookAt(0, 1.6, -2.6);
      N.pose(t, { talk: true, point: t > t2 && t < t2 + 1.5 }); X.pop(c1, seg(t, .4, .8)); ta.at(A[27], cam, [0, .4, 0], seg(t, t1, t1 + .4)); tb.at(B[14], cam, [0, .4, 0], seg(t, t2, t2 + .4)); X.pop(kos2, seg(t, tk, tk + .4));
    } };
  },
  D3_E014_JEMBATAN(s, root) {   // jembatan penyeberangan malam terang: lampu kendaraan mengalir di bawah, Nana di pagar, dua garis (harga 3% vs tabungan diam)
    const sc = newScene(WARM({ sky: ['#24264A', '#5C4A7A'], sunI: 1.2, hemi: 1.3, sun: '#FFE2C2', sunPos: [4, 9, 6], fog: ['#3A3460', 16, 60] })); sc.add(mesh(G.box(60, .2, 30), '#3A3F4A', [0, -6, 0]));
    sc.add(mesh(G.box(3, .3, 30), '#9AA0AA', [0, 0, 0])); [-1.4, 1.4].forEach(x => sc.add(mesh(G.box(.08, 1, 30), '#DDD', [x, .6, 0])));
    const cars = Array.from({ length: 24 }, (_, i) => { const m = mesh(G.box(.8, .5, 1.6), i % 2 ? '#FFE8B0' : '#FF6B6B', [0, -5.6, 0], { mat: { emissive: i % 2 ? '#FFD27A' : '#FF3B30', emissiveIntensity: 1.6 }, cast: false }); sc.add(m); return m });
    for (let i = 0; i < 14; i++) { const h = 6 + (i * 41 % 10); sc.add(mesh(G.box(2.2, h, 2), '#3A4664', [-18 + i * 2.8, h / 2 - 6, -14], { cast: false })); for (let k = 0; k < 6; k++) sc.add(mesh(G.box(.4, .35, .05), '#FFD27A', [-18.6 + i * 2.8 + (k % 2) * .9, h - 7 - Math.floor(k / 2) * 1.4, -12.95], { mat: { emissive: '#FFC27A', emissiveIntensity: 1.2 }, cast: false })) }
    const L = new THREE.PointLight('#FFE2B0', 14, 10); L.position.set(0, 3, 0); sc.add(L);
    const N = nana([.6, .15, 0]); sc.add(N); N.rotation.y = -Math.PI / 2; const cam = camera(42);
    const graph = X.ab({ left: 90, top: 300, width: 900, height: 360, background: '#FFFFFFEE', border: `6px solid ${INK}`, borderRadius: '24px', opacity: 0 }, root, `<svg viewBox="0 0 900 360" width="900" height="360"><line x1="60" y1="300" x2="860" y2="300" stroke="${INK}" stroke-width="4"/><path id="pa" d="M60 300 C 400 260, 700 160, 860 70" fill="none" stroke="#D63B2F" stroke-width="10"/><path d="M60 300 L 860 300" fill="none" stroke="#7FA8D0" stroke-width="10" stroke-dasharray="20 14"/><text x="560" y="110" font-family="Baloo" font-weight="800" font-size="40" fill="#D63B2F">harga +3%/th</text><text x="420" y="345" font-family="Baloo" font-weight="800" font-size="36" fill="#3E7CB1">tabungan diam = menyusut</text></svg>`);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Lo makan mi instan<br><span style="color:${BATA}">seminggu berapa kali?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      cars.forEach((m, i) => { const lane = i % 4; const dir = lane < 2 ? 1 : -1; m.position.set(-6 + lane * 4, -5.6, (((i * 7 + t * 10 * dir) % 60) + 60) % 60 - 30) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(5.4, 4.4, p), lerp(3, 3.2, p), lerp(7, 5.6, p)); cam.lookAt(0, .6, -1.6);
      N.pose(t, { talk: true, look: .4 }); const tg = at(s, 'lebih cepat', 3), tq = at(s, 'Lo makan', dur - 3); X.pop(graph, seg(t, tg, tg + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

// Shot Desa Terakhir S1 Ep 1 "Malam Pertama" (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera, person, miniStick } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/desa3d.js';
import { SIANG, SENJA, MALAM, gilang, yati, kardi, sinta, warga, zombie, desaTerakhir, SPOT, RF, karung, ikatBambu, gerobak, kabut,
  BIG, TAG, show, pulse, ease, FONT, BONE, AMBER, RUST } from '../_s1/dunia.js';

const W = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
function tagAt(root, html, css = {}) { const w = X.ab({ left: 0, top: 0 }, root); const e = TAG(w, html, Object.assign({ position: 'relative', left: 0, top: 0, transform: 'translate(-50%,-100%)', fontSize: '32px' }, css));
  return (obj, cam, off, p) => { const [x, y] = X.proj(obj, cam, off); w.style.left = Math.max(240, Math.min(840, x)) + 'px'; w.style.top = y + 'px'; e.style.opacity = Math.max(0, Math.min(1, p)) } }
// penyintas baru membawa barang (kotak di tangan)
function penyintas(sc, p, i, bawa) { const g = warga(p, i + 2); sc.add(g); if (bawa) g.userData.st.arms[1].userData.elbow.add(mesh(G.box(.42, .32, .3), bawa, [0, -.42, .1])); return g }
function truk(parent, p) {   // truk bantuan: kabin + bak terpal + roda
  const g = group(parent, p); g.add(mesh(G.box(1.9, 1.7, 2.1), '#C9472F', [2.2, 1.35, 0])); g.add(mesh(G.box(.05, .7, 1.7), '#2B3A44', [3.16, 1.7, 0], { cast: false }));
  g.add(mesh(G.box(4.2, .3, 2.2), '#3A3A40', [-.6, .7, 0])); g.add(mesh(G.box(4, 1.6, 2.1), '#6E8A4A', [-.6, 1.65, 0]));
  const sp = mesh(G.box(2.4, .5, .03), '#F3E9D2', [-.6, 1.8, 1.07], { cast: false }); g.add(sp);
  [[-2, 1], [-2, -1], [1.2, 1], [1.2, -1], [2.4, 1], [2.4, -1]].forEach(([x, z]) => { const w = mesh(G.cyl(.45, .45, .3, 14), '#1E1E1E', [x, .45, z * 1.05], { rot: [Math.PI / 2, 0, 0] }); g.add(w) });
  return g;
}
function besiDuri(parent, p) { const g = group(parent, p); for (let i = 0; i < 3; i++) g.add(mesh(new THREE.TorusGeometry(.38, .05, 6, 18), '#8A9096', [0, .4, (i - 1) * .14], { mat: { metalness: .6, roughness: .4 } })); for (let i = 0; i < 10; i++) g.add(mesh(G.cone(.03, .12, 4), '#B8BEC4', [Math.cos(i) * .38, .4 + Math.sin(i) * .38, (i % 3 - 1) * .14], { rot: [0, 0, i] })); return g }
function petiAlat(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.9, .45, .5), '#C8372D', [0, .23, 0])); g.add(mesh(G.box(.5, .08, .08), '#2A2A2A', [0, .52, 0])); g.add(mesh(G.box(.06, .06, .7), '#9AA3AC', [.2, .5, 0], { rot: [0, .4, 0] })); return g }
function pramuka(sc, p, i) {   // anak pramuka: seragam cokelat, setangan leher merah-putih, topi
  const g = person(sc, p, { s: .72, body: '#A0784A', pants: '#5A4630', skin: ['#E2A97E', '#C98E64', '#B97A52'][i % 3], hair: '#1E1612' });
  g.userData.st.body.add(mesh(G.cone(.12, .14, 3), '#C8372D', [0, .48, .07], { rot: [Math.PI, 0, 0], cast: false })); g.userData.st.head.add(mesh(G.cyl(.26, .27, .1, 14), '#7A5A3A', [0, .14, 0])); return g;
}

export const SHOTS = {
  B1_DATANG(s, root) {   // frame 1: rombongan penyintas berlari masuk gerbang, papan posko 37 -> 72
    const sc = SENJA({ sky: ['#6C86C2', '#F6B884'] }); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(Math.PI / 2 * .95); const V = X.TL.vars;
    const C = ['#8A5A33', '#3E86B0', '#C9A86A', null, '#6E9A5C']; const P = Array.from({ length: 16 }, (_, i) => { const g = penyintas(sc, [((i * 37) % 9) - 4.5, 0, RF + 5 + Math.floor(i / 4) * 2.4], i, C[i % 5]); g.rotation.y = Math.PI; g.userData.z0 = g.position.z; return g });
    const J = gilang([3.4, 0, RF - 8]); J.rotation.y = .3; sc.add(J); const cam = camera(42);
    const big = BIG(root, `+${V.follow} PENYINTAS`, { top: 330, fontSize: '104px' }); const cnt = BIG(root, '', { top: 470, fontSize: '56px', color: AMBER });
    return { scene: sc, cam, upd(t, dur) { P.forEach((g, i) => { const z = g.userData.z0 - t * 3.2; g.position.z = Math.max(RF - 9 - (i % 4), z); g.pose(t + i, { walk: z > g.position.z ? 0 : 1.6, wave: z < RF - 8 }) }); J.pose(t, { wave: true, talk: t > 1 });
      const n = Math.round(lerp(V.pen0, V.pen, E.out(seg(t, .5, dur - 1)))); D.posko.userData.setN(n); cnt.innerHTML = `🧍 ${V.pen0} → <b>${n}</b> penyintas`;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.2, 2.2, p), lerp(1.3, 2.2, p), lerp(RF - 13, RF - 15, p)); cam.lookAt(0, 1.4, RF + 2); pulse(big, seg(t, 0, .3) + (t < .02 ? 1 : 0)); show(cnt, seg(t, .6, 1)) } };
  },
  B1_BARANG(s, root) {   // barang bawaan: engsel baru, peti alat tukang, besi duri, truk bantuan
    const sc = SIANG({ sky: ['#7DB8E0', '#F6D8B0'] }); const D = desaTerakhir(sc, { hole: (x, z) => z > 26 && Math.abs(x) < 14 }); D.gate.userData.set(Math.PI / 2 * .95);
    const T = truk(sc, [6, 0, RF - 9]); T.rotation.y = Math.PI / 2; const pt = petiAlat(sc, [-3.2, 0, RF - 9]); const bd = besiDuri(sc, [-.6, 0, RF - 9.5]); bd.scale.setScalar(1.3);
    const en = mesh(G.cyl(.12, .12, .45, 12), '#C9CED6', [-2.95, 1.55, RF + .05], { mat: { metalness: .8, roughness: .25, emissive: '#FFF4C0', emissiveIntensity: .25 } }); sc.add(en);
    const tk = warga([-2.3, 0, RF - 1.2], 3); tk.rotation.y = -2.4; sc.add(tk); const J = gilang([1.2, 0, RF - 9]); J.rotation.y = Math.PI * .1; sc.add(J);
    const cam = camera(42); const L = [tagAt(root, '⚙ engsel baru'), tagAt(root, '🧰 tukang kota sebelah'), tagAt(root, '📌 paku + besi duri'), tagAt(root, '🚚 1 truk bantuan')];
    return { scene: sc, cam, upd(t, dur) { const c = ['engsel', 'tukang', 'paku', 'truk'].map((w, i) => at(s, w, .4 + i * 1.6)); const tq = c[3];
      T.position.x = lerp(14, 4, E.out(seg(t, tq - 1, tq + .8))); T.position.z = RF - 10; tk.pose(t, { hold: true }); en.rotation.y = t * 2; J.pose(t, { talk: true, point: t > c[0] });
      const p = ease(t, 0, dur); cam.position.set(lerp(-5, 5, p), 4.2, RF - 21); cam.lookAt(lerp(-2.5, 2.5, p), 1.0, RF - 7);
      L[0](en, cam, [0, .5, 0], seg(t, c[0], c[0] + .3)); L[1](pt, cam, [0, 1.2, 0], seg(t, c[1], c[1] + .3)); L[2](bd, cam, [0, 1.4, 0], seg(t, c[2], c[2] + .3)); L[3](T, cam, [0, 3.2, 0], seg(t, tq + .3, tq + .6)) } };
  },
  B1_PRAMUKA(s, root) {   // "20 pasukan militer" = 20 anak pramuka; Pak Kardi minta tembok baja 25 m, dikasih bambu
    const sc = SIANG(); const D = desaTerakhir(sc, { hole: (x, z) => Math.abs(x) < 15 && z > -14 && z < 26 }); const bp = SPOT.balai; const K = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const k = pramuka(sc, [bp[0] - 3.2 + c * 1.6, 0, bp[2] + 10 + r * 1.3], r * 5 + c); K.push(k) }
    const KD = kardi([bp[0] + 5.5, 0, bp[2] + 13]); KD.rotation.y = -.8; sc.add(KD); const J = gilang([bp[0] + 6.6, 0, bp[2] + 14.2]); J.rotation.y = -1.6; sc.add(J); const bb = ikatBambu(sc, [bp[0] + 5.6, 0, bp[2] + 14.3], .7); bb.visible = false;
    const cam = camera(42);
    const m1 = X.ab({ left: 90, top: 330, width: 900, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '64px', color: BONE, textShadow: '0 4px 14px #000', opacity: 0 }, root, '<s style="text-decoration-color:#C8372D;text-decoration-thickness:8px">20 PASUKAN MILITER</s>');
    const m2 = BIG(root, '20 ANAK PRAMUKA 🫡', { top: 430, fontSize: '70px', color: AMBER }); const m3 = TAG(root, '🧱 tembok baja 25 m → 🎋 bambu', { left: 210, top: 330, fontSize: '42px' });
    return { scene: sc, cam, upd(t, dur) { const tp = at(s, 'pramuka', 3.2), tk = at(s, 'Pak Kardi', dur * .55), tb = at(s, 'Dikasih', dur - 1.4);
      K.forEach((k, i) => { k.pose(t + i * .1, { walk: t < tp ? 1 : 0 }); if (t > tp) { const A = k.userData.st.arms[1]; A.rotation.x = -2.2; A.rotation.z = .9; A.userData.elbow.rotation.x = -1.6 } k.position.z = bp[2] + 10 + Math.floor(i / 5) * 1.3 + Math.max(0, 2.2 - t * 1.2) });
      KD.pose(t, { talk: t > tk && t < tb, point: t > tk && t < tb, shake: t > tb + .3 }); J.pose(t, { nod: t > tb }); bb.visible = t > tb; if (t > tb) bb.position.x = bp[0] + lerp(6.4, 5.6, seg(t, tb, tb + .5));
      const z = ease(t, tk - .5, tk + .5); cam.position.set(lerp(bp[0] + 1, bp[0] + 2.6, z), lerp(6.2, 2.0, z), lerp(bp[2] + 23, bp[2] + 19.5, z)); cam.lookAt(lerp(bp[0], bp[0] + 5.6, z), lerp(.2, 1.4, z), lerp(bp[2] + 11.5, bp[2] + 13.5, z));
      show(m1, seg(t, .2, .5) * (1 - seg(t, tk - .4, tk))); pulse(m2, seg(t, tp, tp + .3) * (1 - seg(t, tk - .4, tk))); show(m3, seg(t, tk + .2, tk + .5)) } };
  },
  B1_GUDANG(s, root) {   // gudang terisi: karung & ikat bambu bertumpuk sesuai like
    const sc = SIANG(); const D = desaTerakhir(sc); const gp = SPOT.gudang; const V = X.TL.vars; const N = 16;
    const items = Array.from({ length: N }, (_, i) => { const r = i % 4, c = Math.floor(i / 4) % 2, h = Math.floor(i / 8); const p = [gp[0] + 3.2 + c * 1.5 + h * .3, h * .7, gp[2] - 2.4 + r * 1.2]; const it = i % 2 ? ikatBambu(sc, p, .8) : karung(sc, p, 1); it.scale.setScalar(.001); return it });
    const Y = yati([gp[0] + 8.8, 0, gp[2] + .6]); Y.rotation.y = -1.6; sc.add(Y); const S = sinta([gp[0] + 6, 0, gp[2] + 4]); S.rotation.y = -2.6; sc.add(S); const cam = camera(42);
    const c = X.ab({ left: 0, top: 340, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, color: BONE, textShadow: '0 4px 14px rgba(0,0,0,.85)', opacity: 0 }, root, '');
    return { scene: sc, cam, upd(t, dur) { let n = 0; items.forEach((it, i) => { const t0 = .5 + i * (dur - 2) / N, q = seg(t, t0, t0 + .3); it.scale.setScalar(Math.max(.001, E.back(q)) * (i % 2 ? .8 : 1)); if (q > 0) n = i + 1 });
      const u = Math.round(V.unit * n / N); c.innerHTML = `<div style="font-size:54px">❤️ ${Math.round(V.like * n / N)} like</div><div style="font-size:70px;color:${AMBER}">= ${u} karung & ikat</div>`; show(c, seg(t, .3, .6));
      Y.pose(t, { nod: true }); S.pose(t, { cheer: n > N / 2, bounce: true }); const p = ease(t, 0, dur); cam.position.set(gp[0] + lerp(13.5, 11.5, p), lerp(3.4, 2.8, p), gp[2] + lerp(6.5, 5.2, p)); cam.lookAt(gp[0] + 3.8, .9, gp[2] - .4) } };
  },
  B1_RENCANA(s, root) {   // suara seri: gerobak mengganjal gerbang + warga berjalan ke balai (kamera atas)
    const sc = SENJA({ sky: ['#5E6FAE', '#F0A07E'], fog: ['#EBC3A6', 120, 420] }); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(.02);
    const gb = gerobak(sc, [0, 0, RF - 6]); gb.rotation.y = Math.PI / 2; const J = gilang([0, 0, RF - 7.5]); J.rotation.y = Math.PI; sc.add(J);
    const M = Array.from({ length: 34 }, (_, i) => { const m = miniStick(sc, [((i * 37) % 7) - 3.5, 0, RF - 10 - (i % 12) * 2.2], ['#B5452B', '#3E86B0', '#E8B94A', '#6E9A5C', '#F2EFE6'][i % 5]); m.scale.setScalar(1.4); m.rotation.y = Math.PI; m.userData.z0 = m.position.z; return m });
    const cam = camera(42); const sr = X.ab({ left: 0, top: 340, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, opacity: 0 }, root,
      `<div style="display:inline-flex;gap:14px;font-size:44px"><span style="background:rgba(30,42,28,.92);color:${BONE};padding:10px 22px;border-radius:12px">🛒 GEROBAK 2</span><span style="background:rgba(30,42,28,.92);color:${BONE};padding:10px 22px;border-radius:12px">🏛 BALAI 2</span></div><div style="font-size:60px;color:${AMBER};margin-top:16px;text-shadow:0 4px 14px #000">SERI → DUA-DUANYA</div>`);
    return { scene: sc, cam, upd(t, dur) { const tg = at(s, 'diganjal', dur * .55); const q = E.inout(seg(t, tg - .4, tg + 1.2)); gb.position.z = lerp(RF - 6, RF - 1.2, q); J.position.z = gb.position.z - 1.5; J.pose(t, { walk: q > 0 && q < 1 ? 1 : 0, hold: true }); J.userData.st.arms.forEach(A => { A.rotation.x = -1.3 });
      M.forEach((m, i) => { m.position.z = m.userData.z0 - Math.max(0, t - at(s, 'naik', dur - 1.6) + 1) * 2.2; m.position.y = Math.abs(Math.sin(t * 8 + i)) * .05 });
      const p = ease(t, 0, dur); cam.position.set(lerp(9, 6, p), lerp(16, 12, p), lerp(RF + 4, RF + 2, p)); cam.lookAt(0, 0, lerp(RF - 6, RF - 14, p)); show(sr, seg(t, .2, .6)) } };
  },
  B1_SERANG(s, root) {   // malam terang: zombie menghantam pagar & gerbang, gerobak menahan, warga di balai dengan obor
    const sc = MALAM(); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(.02); sc.userData.warm.position.set(0, 5, RF - 3); sc.userData.warm.intensity = 40;
    const gb = gerobak(sc, [0, 0, RF - 1.2]); gb.rotation.y = Math.PI / 2;
    const Z = Array.from({ length: 26 }, (_, i) => { const a = Math.PI / 2 + ((i * 37) % 100 / 100 - .5) * .5; const r = RF + 1.1 + (i % 3) * .7; const z = zombie([Math.cos(a) * r, 0, Math.sin(a) * r], i); z.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a)); sc.add(z); z.userData.r = r; z.userData.a = a; return z });
    const J = gilang([-1.5, 0, RF - 4]); J.rotation.y = 0; const K = kardi([2.2, 0, RF - 5]); K.rotation.y = -.3; [J, K].forEach(p => sc.add(p)); const fog = kabut(sc, 8, [40, 14], [0, 0, RF + 10], '#C8D0F0', .3); const cam = camera(42);
    const lbl = BIG(root, 'MALAM PERTAMA', { top: 330, fontSize: '96px' }); const ok = BIG(root, '✅ SELAMAT', { top: 460, fontSize: '80px', color: '#B8F0A0' });
    return { scene: sc, cam, upd(t, dur) { Z.forEach((z, i) => { z.shamble(t * 1.5); const k = Math.max(0, Math.sin(t * 5 + i)); z.position.set(Math.cos(z.userData.a) * (z.userData.r + k * .3), 0, Math.sin(z.userData.a) * (z.userData.r + k * .3)) });
      const hit = Math.max(0, Math.sin(t * 5)); D.gate.userData.set(.02 + hit * .05); gb.position.z = RF - 1.2 - hit * .08; J.pose(t, { shake: true }); J.userData.st.arms.forEach(A => A.rotation.x = -1.3); K.pose(t, { cheer: t > at(s, 'selamat', dur - 1.2), shake: true });
      sc.userData.warm.intensity = 40 + Math.sin(t * 13) * 6; fog(t, cam); const sh = hit > .9 ? Math.sin(t * 70) * .06 : 0; const a = lerp(-.6, .5, ease(t, 0, dur));
      cam.position.set(Math.sin(a) * 12 + sh, 10.5, RF - 10); cam.lookAt(0, .4, RF + 3); show(lbl, seg(t, .2, .6) * (1 - seg(t, dur - 2, dur - 1.6))); pulse(ok, seg(t, at(s, 'selamat', dur - 1.2), at(s, 'selamat', dur - 1.2) + .3)) } };
  },
  B1_AJAK(s, root) {   // teras balai malam: penyintas baru menggaruk luka hijau di lengan, Sinta melihat; pilihan terarah
    const sc = MALAM(); const D = desaTerakhir(sc); D.obor(1); const bp = SPOT.balai; D.balai.userData.spanduk.visible = false; sc.userData.warm.position.set(bp[0] + 1, 4, bp[2] + 7); sc.userData.warm.intensity = 45;
    const N = warga([bp[0] + 1.2, 0, bp[2] + 7.4], 4); N.rotation.y = .5; sc.add(N); const arm = N.userData.st.arms[0]; const luka = mesh(G.sph(.07, 10, 8), '#7FBF4A', [0, -.12, .05], { s: [1, 1.6, .5], mat: { emissive: '#5E9A2E', emissiveIntensity: .4, flatShading: false } }); arm.userData.elbow.add(luka);
    const S = sinta([bp[0] - 1.6, 0, bp[2] + 8.6]); S.rotation.y = 1.9; const J = gilang([bp[0] - .4, 0, bp[2] + 10.2]); J.rotation.y = .3; const Y = yati([bp[0] + 3.2, 0, bp[2] + 8.2]); Y.rotation.y = -1.2; [S, J, Y].forEach(p => sc.add(p));
    const crowd = Array.from({ length: 12 }, (_, i) => { const m = warga([bp[0] - 4 + (i % 6) * 1.6, 0, bp[2] + 4.2 + Math.floor(i / 6) * 1.2], i); m.rotation.y = .1; sc.add(m); return m });
    const cam = camera(42); const sk = TAG(root, '⚠ garuk-garuk lengan...', { left: 300, top: 330, fontSize: '42px' });
    const q = X.ab({ left: 40, top: 1150, width: 1000, textAlign: 'center', opacity: 0, fontFamily: FONT }, root,
      `<div style="font-size:32px;font-weight:800;color:${BONE};letter-spacing:3px;text-shadow:0 4px 14px #000">BESOK (HARI KE-2) KITA:</div><div style="display:flex;gap:10px;justify-content:center;margin-top:14px">` +
      ['🔩 PAGAR BESI DURI', '🍚 CARI MAKAN KE PASAR', '🩺 PERIKSA PENYINTAS'].map(x => `<div style="background:rgba(30,42,28,.95);color:${BONE};font-size:28px;font-weight:800;padding:12px 14px;border-radius:12px;border-bottom:6px solid ${AMBER};white-space:nowrap">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { const tq = at(s, 'Besok', dur - 5); N.pose(t); arm.rotation.x = -.9; arm.rotation.z = .9; arm.userData.elbow.rotation.x = -1.7; const sr = N.userData.st.arms[1]; sr.rotation.x = -1 + Math.sin(t * 14) * .15; sr.rotation.z = -.5; sr.userData.elbow.rotation.x = -1.6;
      S.pose(t, { look: .3 }); J.pose(t, { talk: t > 2 }); Y.pose(t); crowd.forEach((m, i) => m.pose(t + i)); sc.userData.warm.intensity = 45 + Math.sin(t * 11) * 5;
      const z = ease(t, .2, 2.4) * (1 - ease(t, tq - 1.4, tq)); const n = W(bp, [1.1, 1.25, 7.6]);
      cam.position.set(lerp(bp[0] - .5, n[0] - 1.4, z), lerp(2.6, 1.6, z), lerp(bp[2] + 17, n[2] + 2.6, z)); cam.lookAt(lerp(bp[0] + .5, n[0], z), lerp(1.3, 1.25, z), lerp(bp[2] + 7.5, n[2], z));
      show(sk, seg(t, .8, 1.2) * (1 - seg(t, tq - 1.2, tq - .8))); show(q, seg(t, tq - .2, tq + .3)) } };
  },
};

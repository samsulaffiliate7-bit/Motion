// Shot ep015 (Full POV Staf: anak rantau, gaji kota sisa kampung)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, tree } from '../../../engine/w3d/kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, room, laptop, desk } from '../../../engine/w3d/kantor.js';
const big = (root, html, top, col, fs = 84) => X.ab({ left: 60, top, width: 960, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: fs + 'px', color: '#fff', WebkitTextStroke: `14px ${col}`, paintOrder: 'stroke fill', opacity: 0 }, root, html);
const show = (e, q) => { e.style.opacity = q; e.style.transform = `scale(${E.back(Math.min(1, q))})` };

export const SHOTS = {
  M_E015_STASIUN(s, root) {   // stasiun kota besar pagi: staf turun dengan koper, gedung tinggi di kejauhan, gelembung ibu bangga
    const sc = newScene({ sky: ['#9FD3F0', '#EAF6FF'], hemi: 1.4, sun: '#FFF4E0', sunPos: [-8, 12, 8], shadow: 16, fog: ['#DCEBF5', 25, 80] }); sc.add(mesh(G.box(40, .2, 20), '#9AA0AA', [0, -.1, 0])); sc.add(mesh(G.box(40, .6, 3), '#C9CED6', [0, .3, -2]));
    sc.add(mesh(G.box(30, .3, 8), '#E8DCC8', [0, 4.2, -1])); for (let i = -3; i <= 3; i++) sc.add(mesh(G.cyl(.18, .18, 4, 8), '#7A8594', [i * 4, 2, -3.5]));
    for (let i = 0; i < 14; i++) { const h = 8 + (i * 47 % 14); sc.add(mesh(G.box(3, h, 3), ['#B5C3D2', '#C9D6E2', '#A9B8C8'][i % 3], [-24 + i * 3.8, h / 2, -22], { cast: false })) }
    const tr = group(sc, [-4, .6, -5]); tr.add(mesh(G.box(14, 2.2, 2.4), '#F4F1EA', [0, 1.1, 0])); tr.add(mesh(G.box(14, .4, 2.5), '#E5484D', [0, .4, 0])); for (let i = 0; i < 6; i++) tr.add(mesh(G.box(1.2, .8, .05), '#BFE6F5', [-5.5 + i * 2.2, 1.5, 1.22], { cast: false }));
    const S = staf([3, .6, -2.4]); sc.add(S); const suit = mesh(G.box(.5, .7, .3), '#3E7CB1', [0, -.5, .1]); S.userData.st.arms[1].add(suit); const cam = camera(44);
    const bub = X.ab({ left: 120, top: 300, width: 840, background: '#FFFFFF', border: `5px solid ${INK}`, borderRadius: '26px 26px 26px 6px', padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '34px', color: INK, opacity: 0 }, root, `👩‍🦳 Ibu ke tetangga: "Anak saya kerja di <b>gedung tinggi</b>, gajinya <b>5,4 juta</b>!"`);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Gaji kota besar.<br><span style="color:${ORANGE}">Sisanya kok kayak gaji kampung?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const w = seg(t, 0, dur); S.position.x = lerp(3, .4, w); S.pose(t, { walk: 1, hold: true }); S.rotation.y = -Math.PI / 2; tr.position.x = -4 - t * .6;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(6, 4, p), lerp(2.4, 2.8, p), lerp(11, 9.5, p)); cam.lookAt(lerp(1.5, .5, p), 1.8, -3);
      X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 5 ? 'none' : 'block'; const tb = at(s, 'Ibu', dur * .6); X.pop(bub, seg(t, tb, tb + .4));
    } };
  },
  M_E015_KOS(s, root) {   // kamar kos 3x3 sempit: lima kotak pengeluaran turun dari atas memenuhi kamar, sisa kecil di lantai
    const v = X.TL.vars; const sc = newScene({ bg: '#E9D8C4', hemi: 1.3, hemiSky: '#FFF4E6', sun: '#FFE2C2', sunPos: [-5, 9, 6] }); room(sc, { wall: '#E8D4BC', wall2: '#DCC4A8', floor: '#9C8A72', window: true });
    sc.add(mesh(G.box(1.6, .4, 3), '#3E8FC4', [-3.4, .2, -1.6])); sc.add(mesh(G.box(1.6, .15, 3), '#FFFFFF', [-3.4, .45, -1.6]));
    const H = [1.6, 1.8, .6, .8, .2], C = ['#3E8FC4', '#E8A33D', '#7A8594', '#C2457A', '#5E9C4A'];
    const box = H.map((h, i) => { const m = mesh(G.box(.9, h * 1.2, .9), C[i], [-1.4 + i * 1.05, 0, -2.6]); sc.add(m); return m });
    const S = staf([-1.5, 0, .6]); sc.add(S); S.rotation.y = .3; const cam = camera(42);
    const labs = v.pos.map(([a, b], i) => X.ab({ left: 0, top: 0, background: CARD, border: `4px solid ${INK}`, borderRadius: '14px', padding: '4px 12px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: INK, opacity: 0, whiteSpace: 'nowrap' }, root, `${a}<br>${b}`));
    const rest = big(root, `sisa ${v.sisa_rp}`, 330, '#C0392B', 84);
    return { scene: sc, cam, upd(t, dur) {
      const tc = [at(s, 'Kos', 2), at(s, 'makan', 4), at(s, 'transport', 6), at(s, 'kirim', 8), at(s, 'pulsa', 10)], ts = at(s, 'Empat ratus', dur * .7);
      box.forEach((m, i) => { const q = E.out(seg(t, tc[i], tc[i] + .6)); m.position.y = lerp(6, H[i] * .6, q); m.visible = t > tc[i] - .1 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1, .7, p), lerp(3.8, 4, p), lerp(13.6, 12.8, p)); cam.lookAt(.7, 1.4, -2.2);
      labs.forEach((e, i) => { const [x, y] = X.proj(box[i], cam, [0, H[i] * .6 + .2, 0]); e.style.left = (x - 60) + 'px'; e.style.top = (y - 70) + 'px'; e.style.opacity = t > tc[i] + .6 ? 1 : 0 });
      S.pose(t, { shake: t > ts }); show(rest, seg(t, ts, ts + .5));
    } };
  },
  M_E015_VIDCALL(s, root) {   // kamar kos malam: laptop menampilkan video call ibu di rumah kampung (dirender ke tekstur), mi instan di meja
    const sc = newScene({ bg: '#3A3A5A', hemi: 1.3, hemiSky: '#FFE9D2', hemiGround: '#5A4A6A', sunI: 1.2, sun: '#FFD9A8', sunPos: [-4, 8, 6] }); room(sc, { wall: '#5A5470', wall2: '#4E4A64', floor: '#6B5A4A', window: true, night: true });
    const L = new THREE.PointLight('#FFD9A0', 12, 8); L.position.set(0, 2.6, -.6); sc.add(L);
    desk(sc, [0, 0, -1.8], 2.2); const lp = group(sc, [0, .82, -1.9]); lp.add(mesh(G.box(1.4, .05, .9), '#B0B7BF', [0, 0, 0])); lp.add(mesh(G.box(1.4, .9, .05), '#2A2F36', [0, .48, -.45], { rot: [-.15, 0, 0] }));
    const rt = new THREE.WebGLRenderTarget(512, 320); rt.texture.colorSpace = THREE.SRGBColorSpace; const scr = new THREE.Mesh(G.plane(1.3, .8), new THREE.MeshBasicMaterial({ map: rt.texture })); scr.position.set(0, .48, -.42); scr.rotation.x = -.15; lp.add(scr);
    const home = newScene({ bg: '#FFE7C8', hemi: 1.4, sun: '#FFE2C2', sunPos: [-4, 8, 6] }); room(home, { wall: '#F2D6B8', floor: '#9C7A5A' }); const ibu = person(home, [0, 0, -1], { body: '#5E9C4A', hair: '#E8E2D8', skin: '#D9A07A' }); const hc = camera(40); hc.aspect = 512 / 320; hc.updateProjectionMatrix(); hc.position.set(0, 1.7, 1.6); hc.lookAt(0, 1.6, -1);
    const bowl = group(sc, [-.8, .86, -1.5]); bowl.add(mesh(G.cyl(.22, .16, .16, 14), '#FFFFFF', [0, .08, 0])); bowl.add(mesh(G.cyl(.2, .2, .03, 14), '#E8C27A', [0, .15, 0], { cast: false }));
    const S = staf([.2, 0, -.6]); sc.add(S); S.rotation.y = Math.PI; S.userData.st.legs.forEach(l => l.rotation.x = -1.3); sc.add(mesh(G.box(.8, .5, .8), '#3E4A5A', [.2, .25, -.4]));
    const cam = camera(42); const q1 = X.ab({ left: 80, top: 300, background: '#5E9C4A', color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '10px 22px', borderRadius: '26px 26px 26px 6px', opacity: 0 }, root, '👩‍🦳 "Makannya cukup, Nak?"'), a1 = X.ab({ left: 420, top: 410, background: BLUE, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '10px 22px', borderRadius: '26px 26px 6px 26px', opacity: 0 }, root, '"Cukup, Bu." 🙂');
    return { scene: sc, cam, render(R) { ibu.pose(performance.now() / 1000, { talk: true, wave: false }); R.setRenderTarget(rt); R.render(home, hc); R.setRenderTarget(null); R.setScissorTest(false); R.setViewport(0, 0, 1080, 1920); R.render(sc, cam) },
      upd(t, dur) { ibu.pose(t, { talk: Math.sin(t * 1.4) > 0, nod: true });
        const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.6, 2.1, p), lerp(2.5, 2.3, p), lerp(2.2, 1.7, p)); cam.lookAt(-.3, 1.1, -1.7);
        S.pose(t, { look: t > dur * .5 ? .8 : 0 }); S.userData.st.legs.forEach(l => l.rotation.x = -1.3); const tq = at(s, 'Nanya', 2), ta = at(s, 'Gue jawab', 4); X.pop(q1, seg(t, tq, tq + .4)); X.pop(a1, seg(t, ta, ta + .4)) } };
  },
  M_E015_DAPUR(s, root) {   // dapur bersama kos pagi: tiga anak kos masak bareng, tiga kartu perubahan, pertanyaan penutup
    const v = X.TL.vars; const sc = newScene({ bg: '#FFE9D2', hemi: 1.4, sun: '#FFE2C2', sunPos: [-6, 9, 6] }); room(sc, { wall: '#FFF1DE', wall2: '#F8E4CC', floor: '#B08A64', window: true });
    sc.add(mesh(G.box(5, .9, 1), '#FFFFFF', [0, .45, -3.2])); sc.add(mesh(G.box(5.1, .08, 1.05), '#D9B48A', [0, .94, -3.2]));
    const pan = group(sc, [-.6, 1, -3.1]); pan.add(mesh(G.cyl(.4, .35, .12, 16), '#333', [0, 0, 0])); pan.add(mesh(G.cyl(.32, .32, .05, 16), '#E8A33D', [0, .06, 0], { cast: false }));
    const steam = [0, 1, 2].map(() => { const m = mesh(G.ico(.12, 1), '#FFFFFF', [0, 0, 0], { cast: false, mat: { transparent: true, opacity: .6 } }); sc.add(m); return m });
    const ppl = [[-.6, '#9CC3E6'], [.6, '#E3B6C2'], [1.6, '#A9C7A4']].map(([x, c]) => { const P = staf([x, 0, -2.2], { body: c }); sc.add(P); P.rotation.y = Math.PI; return P });
    const cam = camera(42); const cards = v.tips.map(([ic, h, d], i) => X.ab({ left: 70, top: 300 + i * 120, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '38px', color: INK, boxShadow: `0 8px 0 ${[ORANGE, BLUE, '#5E9C4A'][i]}`, opacity: 0 }, root, `${ic} ${h} <span style="font-weight:600;font-size:28px;color:#6B7684">· ${d}</span>`));
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Anak rantau juga?<br><span style="color:${ORANGE}">Gaji paling banyak habis buat apa?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      steam.forEach((m, i) => { const qq = (t * .5 + i / 3) % 1; m.position.set(-.6 + Math.sin(t + i) * .1, 1.2 + qq * 1.2, -3.1); m.scale.setScalar(.5 + qq) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.6, 1.4, p), lerp(3, 3.2, p), lerp(4.4, 3.8, p)); cam.lookAt(0, 1.3, -2.6);
      ppl.forEach((P, i) => P.pose(t + i, { talk: Math.sin(t * 1.3 + i) > .3, hold: i === 0 })); v.tip_cues.forEach((cu, i) => { const tc = at(s, cu, 2 + i * 4); X.pop(cards[i], seg(t, tc, tc + .4)) }); const tq = at(s, 'Lo anak rantau', dur - 3); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

// Shot ep014 (Kamus HRD jilid 2): tiap kalimat di lokasi berbeda, kartu kamus + "bisa berarti" + "tanya ini"
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, tree } from '../../../engine/w3d/kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, room, laptop, desk } from '../../../engine/w3d/kantor.js';
function kamus(root, s, k) { const [phr, arti, tanya] = X.TL.vars.phr[k];
  const card = X.ab({ left: 60, top: 260, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '26px', padding: '16px 26px', fontFamily: 'Poppins', color: INK, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `<div style="font-size:30px;font-weight:700;color:#7A8594">KAMUS HRD #${k + 1}</div><div style="font-size:48px;font-weight:800;line-height:1.1">“${phr}”</div>`);
  const a1 = X.ab({ left: 60, top: 500, width: 960, fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#fff', background: ORANGE, borderRadius: '18px', padding: '12px 22px', opacity: 0 }, root, `bisa berarti: ${arti}`);
  const a2 = X.ab({ left: 60, top: 650, width: 960, fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#fff', background: BLUE, borderRadius: '18px', padding: '12px 22px', opacity: 0 }, root, `tanya ini: ${tanya}`);
  return (t, dur) => { X.pop(card, seg(t, .1, .5)); const ta = at(s, 'Bisa berarti', 2.5), tq = at(s, 'Tanya', dur * .55); X.pop(a1, seg(t, ta, ta + .4)); X.pop(a2, seg(t, tq, tq + .4)) } }

export const SHOTS = {
  M_E014_PAPAN(s, root) {   // papan lowongan di stasiun pagi: kertas-kertas lowongan menempel, pelamar membaca; empat kalimat disorot
    const v = X.TL.vars; const sc = newScene({ bg: '#DCE8F2', hemi: 1.3, sunPos: [-6, 10, 8], sun: '#FFF4E0', shadow: 14 }); sc.add(mesh(G.box(24, .2, 14), '#B5BCC5', [0, -.1, 0])); sc.add(mesh(G.box(24, .4, 2), '#E5484D', [0, 4.8, -3]));
    [-6, 6].forEach(x => sc.add(mesh(G.box(.4, 5, .4), '#7A8594', [x, 2.5, -3])));
    const bd = group(sc, [0, 0, -3.4]); bd.add(mesh(G.box(6, 3, .2), '#C9935E', [0, 2.2, 0]));
    const papers = Array.from({ length: 10 }, (_, i) => { const m = mesh(G.box(.9, 1.1, .02), ['#FFFFFF', '#FFE680', '#B9D8FF', '#FFC9D6'][i % 4], [-2.4 + (i % 5) * 1.2, 2.8 - Math.floor(i / 5) * 1.3, .12], { rot: [0, 0, (i % 3 - 1) * .08], cast: false }); bd.add(m); return m });
    const S = staf([.4, 0, -1.4]); sc.add(S); S.rotation.y = Math.PI; const P2 = staf([-2.4, 0, -1], { body: '#E3B6C2', hair: '#1E1410' }); sc.add(P2); P2.rotation.y = Math.PI * .9;
    const cam = camera(42); const lst = X.ab({ left: 70, top: 300, width: 940, background: CARD, border: `6px solid ${INK}`, borderRadius: '24px', padding: '14px 24px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '36px', color: INK, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, v.phr.map((p, i) => `<div>${i + 1}. “${p[0]}”</div>`).join(''));
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `“Dibutuhkan segera.”<br><span style="color:${ORANGE}">Artinya apa sih?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      papers.forEach((m, i) => m.scale.setScalar(1 + (Math.floor(t * 1.5) % 10 === i ? .12 : 0)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.6, 1.2, p), lerp(3, 3.2, p), lerp(9.4, 8.4, p)); cam.lookAt(0, 1.8, -3.2);
      S.pose(t, { look: Math.sin(t) * .4 }); P2.pose(t + 1, { look: .3 }); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 4 ? 'none' : 'block'; X.pop(lst, seg(t, 4, 4.4));
    } };
  },
  M_E014_KOSONG(s, root) {   // kantor dengan satu meja kosong: map menumpuk tinggi di kursi kosong, sticky note "segera!" berkedip
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.3, sunPos: [6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#E9EEF4', wall2: '#D8E0EA', floor: '#B8C2CE', window: true });
    for (let i = 0; i < 3; i++) { desk(sc, [-2.8 + i * 2.8, 0, -1.8]); laptop(sc, [-2.8 + i * 2.8, .82, -1.9]); if (i !== 1) { const P = staf([-2.8 + i * 2.8, 0, -2.6], { body: ['#9CC3E6', '', '#A9C7A4'][i] }); sc.add(P) } }
    const pile = Array.from({ length: 16 }, (_, i) => { const m = mesh(G.box(.7, .08, .5), ['#E5484D', '#F2B41B', '#3E8FC4', '#FFFFFF'][i % 4], [(i % 2) * .05, .88 + i * .085, -1.8], { rot: [0, (i % 3) * .2, 0] }); sc.add(m); return m });
    const note = mesh(G.box(.4, .4, .02), '#FFE680', [0, 2.4, -1.7], { mat: { emissive: '#FFE680', emissiveIntensity: .4 }, cast: false }); sc.add(note);
    const cam = camera(42); const step = kamus(root, s, 0);
    return { scene: sc, cam, upd(t, dur) { pile.forEach((m, i) => m.visible = i < 6 + Math.floor(seg(t, 1, dur * .6) * 10)); note.scale.setScalar(1 + Math.abs(Math.sin(t * 4)) * .1);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.4, 1.2, p), lerp(3, 3.2, p), lerp(5.6, 5, p)); cam.lookAt(0, 1.4, -1.8); step(t, dur) } };
  },
  M_E014_WISUDA(s, root) {   // taman kampus saat wisuda: lulusan bertoga, papan "pengalaman min. 2 tahun" yang tak masuk akal
    const sc = newScene({ sky: ['#9FD3F0', '#EAF6FF'], hemi: 1.3, sun: '#FFF4E0', sunPos: [-8, 12, 6], shadow: 14 }); sc.add(mesh(G.box(30, .2, 20), '#7FAF52', [0, -.1, 0]));
    sc.add(mesh(G.box(10, 5, 1.2), '#E8DCC8', [0, 2.5, -7])); for (let i = 0; i < 6; i++) sc.add(mesh(G.cyl(.35, .35, 5, 10), '#F4EEE6', [-4 + i * 1.6, 2.5, -6.2]));
    [[-6, -3], [6, -3], [-7, 2], [7, 1]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.6, ['#4E8F3A', '#6BA34A'][i % 2]));
    const grads = [-1.2, 0, 1.2].map((x, i) => { const P = staf([x, 0, -1 + (i % 2) * .5], { body: '#2A2F3A', pants: '#2A2F3A' }); sc.add(P); const cap = group(P.userData.st.head, [0, .38, 0]); cap.add(mesh(G.box(.7, .05, .7), '#1E1E24', [0, 0, 0])); cap.add(mesh(G.cyl(.25, .3, .2, 10), '#1E1E24', [0, -.1, 0])); return P });
    const cam = camera(42); const step = kamus(root, s, 1);
    return { scene: sc, cam, upd(t, dur) { grads.forEach((P, i) => P.pose(t + i, { cheer: t < 3, nod: t > 3, look: Math.sin(t + i) * .3 }));
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-20, 15, p), 2.4, lerp(8, 7, p), [0, 1.4, -1]); step(t, dur) } };
  },
  M_E014_GRAFIK(s, root) {   // ruang rapat: dinding grafik batang tanpa angka (sumbu kosong), lalu angka muncul saat "tanya ini"
    const sc = newScene({ bg: '#E4EEF7', hemi: 1.3, sunPos: [-6, 12, 8], sun: '#FFF4E0' }); room(sc, { wall: '#EEF3F8', wall2: '#DDE6EF', floor: '#A9B4C2', window: true });
    const wall = group(sc, [0, 0, -3.8]); wall.add(mesh(G.box(5, 3, .08), '#FFFFFF', [0, 2.6, 0])); wall.add(mesh(G.box(.06, 2.4, .1), INK, [-2.1, 2.6, .05])); wall.add(mesh(G.box(4.2, .06, .1), INK, [0, 1.4, .05]));
    const bars = [.8, 1.4, 1.1, 2].map((h, i) => { const m = mesh(G.box(.6, 1, .1), [BLUE, ORANGE, '#5E9C4A', '#C2457A'][i], [-1.4 + i * 1, 1.4, .1]); wall.add(m); m.userData.h = h; return m });
    sc.add(mesh(G.box(3.4, .1, 1.4), '#E7DCCB', [0, .78, -.8])); const H = person(sc, [1.4, 0, -1.6], { body: '#C2457A', hair: '#1E1410', skin: '#D9A07A' }); H.rotation.y = -.4; const S = staf([-1.2, 0, .2]); sc.add(S); S.rotation.y = Math.PI * .85;
    const cam = camera(42); const step = kamus(root, s, 2); const nums = X.ab({ left: 0, top: 0, opacity: 0, fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', color: '#2E7D32' }, root, '');
    return { scene: sc, cam, upd(t, dur) { bars.forEach((m, i) => { const q = E.out(seg(t, .5 + i * .3, 1.1 + i * .3)); m.scale.y = Math.max(.01, q * m.userData.h); m.position.y = 1.4 + q * m.userData.h / 2 });
      const tq = at(s, 'Tanya', dur * .55); nums.style.opacity = 0;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2, -.6, p), lerp(3, 2.8, p), lerp(6.4, 5.6, p)); cam.lookAt(0, 2, -3); H.pose(t, { talk: t < tq, point: t < 3 }); S.pose(t, { nod: t > tq }); step(t, dur) } };
  },
  M_E014_LOBI(s, root) {   // lobi ruang tunggu interview: kursi berjajar, pelamar memegang map, papan "benefit menarik" + pertanyaan penutup
    const sc = newScene({ bg: '#E9F2F8', hemi: 1.4, sunPos: [5, 12, 8], sun: '#FFF4E0' }); room(sc, { wall: '#EAF2F8', wall2: '#DCE8F0', floor: '#C2CCD6', window: true });
    for (let i = 0; i < 5; i++) { const c = group(sc, [-3.2 + i * 1.3, 0, -2.4]); c.add(mesh(G.box(.9, .1, .8), '#2E5E8C', [0, .5, 0])); c.add(mesh(G.box(.9, .8, .1), '#2E5E8C', [0, .9, -.35])) }
    const S = staf([-.6, .05, -2.3]); sc.add(S); S.userData.st.legs.forEach(l => l.rotation.x = -1.4); const mp = mesh(G.box(.4, .5, .04), '#F2B41B', [0, -.55, .15], { rot: [-.4, 0, 0] }); S.userData.st.arms[1].add(mp);
    const O = staf([1.4, .05, -2.3], { body: '#E3B6C2', hair: '#1E1410' }); sc.add(O); O.userData.st.legs.forEach(l => l.rotation.x = -1.4);
    sc.add(mesh(G.box(2.4, 1.1, 1), '#FFFFFF', [3, .55, -.6])); const cam = camera(42); const step = kamus(root, s, 3);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Kalimat lowongan apa<br><span style="color:${ORANGE}">yang paling ajaib?</span>`);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2, .6, p), lerp(2.6, 2.8, p), lerp(5.4, 4.6, p)); cam.lookAt(-.2, 1.1, -2.2);
      S.pose(t, { hold: true, look: Math.sin(t * .6) * .4 }); S.userData.st.legs.forEach(l => l.rotation.x = -1.4); O.pose(t, { hold: true }); O.userData.st.legs.forEach(l => l.rotation.x = -1.4); step(t, dur); const tq = at(s, 'Kalimat lowongan', dur - 3); X.pop(q, seg(t, tq, tq + .4)) } };
  },
};

// Shot ep016 (Split Staf vs Bos: cuti mendadak sehari sebelum presentasi klien)
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person } from '../../../engine/w3d/kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, phoneTex, phone, room, laptop, desk } from '../../../engine/w3d/kantor.js';
const card = (root, html, css, col) => X.ab(Object.assign({ background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 20px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '36px', color: INK, boxShadow: `0 8px 0 ${col}`, opacity: 0, whiteSpace: 'nowrap' }, css), root, html);

export const SHOTS = {
  M_E016_CHAT(s, root) {   // layar terbelah ATAS-BAWAH: atas bos di ruang tamu bikin slide, bawah staf di kamar gelap ngetik chat
    const v = X.TL.vars;
    const mk = (B) => { const sc = newScene({ bg: B ? '#5A4636' : '#1E2840', hemi: B ? 1.3 : 1.1, hemiSky: B ? '#FFE3C2' : '#BFD7FF', sunI: 1, sun: B ? '#FFD39A' : '#9CC3E6', sunPos: [3, 8, 6] });
      room(sc, { wall: B ? '#E8C9A2' : '#3E5070', wall2: B ? '#DDB98E' : '#34445E', floor: B ? '#9C7A5A' : '#4A4A5A', window: true, night: true });
      const Lt = new THREE.PointLight(B ? '#FFD39A' : '#9CC3E6', 10, 7); Lt.position.set(0, 2.4, .4); sc.add(Lt);
      let P;
      if (B) { sc.add(mesh(G.box(2.6, .5, 1), '#B5643A', [-.8, .25, -2.6])); sc.add(mesh(G.box(2.6, .9, .3), '#A65A32', [-.8, .7, -3])); desk(sc, [.9, 0, -1.2], 1.6); laptop(sc, [.9, .82, -1.3], '#FFD39A'); P = bos([.9, 0, -.4]); sc.add(P); P.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [.9, .48, -.4])) }
      else { sc.add(mesh(G.box(1.8, .45, 3), '#5E6A8A', [-.6, .22, -1.8])); sc.add(mesh(G.box(1.8, .12, 3), '#E8E8F0', [-.6, .5, -1.8])); P = staf([.6, 0, -.6]); sc.add(P); P.rotation.y = -.5 }
      const c = camera(40); c.aspect = 1080 / 960; c.updateProjectionMatrix(); return { sc, c, P } };
    const A = mk(true), S = mk(false); const tex = phoneTex([['S', 'Pak, besok saya cuti ya. Maaf mendadak.', '21.03']], 0, { title: 'Pak Bos', clock: '21.03' }); const ph = phone(S.sc, [0, 0, 0], tex); ph.scale.setScalar(.45); S.P.userData.st.arms[1].add(ph); ph.position.set(0, -.55, .25); ph.rotation.x = -1;
    const div = X.ab({ left: 0, top: 954, width: 1080, height: 12, background: INK, zIndex: 3 }, root);
    const lb = card(root, `<b style="color:${ORANGE}">BOS</b> ${v.split[0]}`, { left: 40, top: 760 }, ORANGE), rb = card(root, `<b style="color:${BLUE}">STAF</b> ${v.split[1]}`, { left: 40, top: 1000 }, BLUE);
    const jam = X.ab({ left: 700, top: 270, background: INK, color: '#FFD39A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '64px', padding: '4px 22px', borderRadius: '16px', opacity: 0 }, root, '21.03');
    const tag = X.ab({ left: 60, top: 1210, width: 960, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '80px', color: '#fff', WebkitTextStroke: `14px #C0392B`, paintOrder: 'stroke fill', opacity: 0 }, root, `jarak ${v.selisih} jam`);
    return { scene: A.sc, cam: A.c, render(R) {
        R.setScissorTest(true); R.setScissor(0, 960, 1080, 960); R.setViewport(0, 960, 1080, 960); R.render(A.sc, A.c);
        R.setScissor(0, 0, 1080, 960); R.setViewport(0, 0, 1080, 960); R.render(S.sc, S.c); R.setScissorTest(false); R.setViewport(0, 0, 1080, 1920) },
      upd(t, dur) { const p = E.inout(seg(t, 0, dur));
        A.c.position.set(lerp(3.2, 2.6, p), 2.4, lerp(2.4, 1.8, p)); A.c.lookAt(.4, 1.1, -1.4); S.c.position.set(lerp(-2.6, -2, p), 2.2, lerp(2.4, 1.9, p)); S.c.lookAt(.4, 1.1, -.8);
        A.P.pose(t, { nod: Math.sin(t * 2) > .5 }); A.P.rotation.y = Math.PI; A.P.userData.st.legs.forEach(l => l.rotation.x = -1.3); S.P.pose(t, {}); S.P.userData.st.arms[1].rotation.x = -1.2; S.P.userData.st.head.rotation.x = .35;
        const tc = at(s, 'besok cuti', .8); tex.draw(t > tc ? 1 : 0); X.pop(jam, seg(t, .1, .4)); X.pop(rb, seg(t, tc, tc + .4)); const tb = at(s, 'Di seberang', 4); X.pop(lb, seg(t, tb, tb + .4));
        const tj = at(s, 'Jaraknya', dur - 2.5); X.pop(tag, seg(t, tj, tj + .4)); div.style.transform = `scaleX(${E.out(seg(t, 0, .4))})` } };
  },
  M_E016_PAGI(s, root) {   // whip pan: ruang rapat kosong pagi (bos sendirian) -> lorong rumah sakit (staf duduk nunggu)
    const v = X.TL.vars; const sc = newScene({ bg: '#DCEAF2', hemi: 1.4, sun: '#FFF4E0', sunPos: [-6, 10, 6], shadow: 22 });
    sc.add(mesh(G.box(60, .2, 14), '#9C8C7A', [12, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), '#E9DDCB', [0, 3, -4])); sc.add(mesh(G.box(3, 2, .05), '#BFE6FF', [2.5, 3.2, -3.88], { mat: { emissive: '#BFE6FF', emissiveIntensity: .5 }, cast: false }));
    sc.add(mesh(G.box(4, .1, 1.6), '#7A5A3E', [0, .8, -1.6])); for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.5, .9, .5), '#3B4A5A', [-1.5 + (i % 3) * 1.5, .45, i < 3 ? -2.8 : -.4]));
    const scr = mesh(G.box(2.6, 1.5, .08), '#2A2F36', [0, 2.6, -3.85]); sc.add(scr); sc.add(mesh(G.box(2.4, 1.3, .02), '#FFD39A', [0, 2.6, -3.8], { mat: { emissive: '#FFD39A', emissiveIntensity: .7 }, cast: false }));
    const B = bos([2.4, 0, -1.4]); sc.add(B); B.rotation.y = -.9;
    const H = 24; sc.add(mesh(G.box(14, 6, .2), '#E4F1EC', [H, 3, -4])); sc.add(mesh(G.box(14, .9, .22), '#7FB8A4', [H, .45, -3.9])); sc.add(mesh(G.box(14, .1, 14), '#F4F4F2', [H, 5.6, 0], { cast: false }));
    for (let i = 0; i < 4; i++) sc.add(mesh(G.box(.6, .1, .6), '#5E9C8A', [H - 1.8 + i * .9, .48, -3.2])); sc.add(mesh(G.box(1.2, 2.4, .1), '#FFFFFF', [H + 2.8, 1.2, -3.85])); const sign = mesh(G.box(1.4, .5, .05), '#C0392B', [H + 1.2, 3.2, -3.82], { mat: { emissive: '#C0392B', emissiveIntensity: .5 } }); sc.add(sign);
    const St = staf([H - .9, 0, -3.1]); sc.add(St); St.userData.st.legs.forEach(l => l.rotation.x = -1.3);
    const cam = camera(42); const lb = card(root, `<b style="color:${ORANGE}">BOS</b> ${v.split2[0]}`, { left: 40, top: 300 }, ORANGE), rb = card(root, `<b style="color:${BLUE}">STAF</b> ${v.split2[1]}`, { left: 40, top: 300 }, BLUE);
    const lab = X.ab({ left: 0, top: 0, background: '#C0392B', color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '4px 18px', borderRadius: '10px', opacity: 0 }, root, 'IGD');
    return { scene: sc, cam, upd(t, dur) {
      const tw = at(s, 'Staf mikirnya', dur * .4); const w = E.inout(seg(t, tw - .2, tw + .4)); const p1 = seg(t, 0, tw), p2 = seg(t, tw, dur);
      const x = lerp(lerp(.6, 1.2, p1), H + lerp(.2, -.4, p2), w); cam.position.set(x, lerp(2.6, 2.2, w), lerp(6.4, 5.6, p2 * w + p1 * (1 - w))); cam.lookAt(x + lerp(.6, -.4, w), 1.4, -2.4);
      B.pose(t, { shake: Math.sin(t * 1.5) > .3 }); B.rotation.y = -.9; St.pose(t, { hold: true }); St.userData.st.legs.forEach(l => l.rotation.x = -1.3); St.userData.st.head.rotation.x = .3 + Math.sin(t) * .05;
      const tb = at(s, 'nggak peduli', 1); X.pop(lb, seg(t, tb, tb + .4)); lb.style.display = w > .5 ? 'none' : 'block'; const ti = at(s, 'IGD', tw + 1.5); X.pop(rb, seg(t, ti, ti + .4)); rb.style.display = w > .5 ? 'block' : 'none';
      const [lx, ly] = X.proj(sign, cam, [0, .1, 0]); lab.style.left = (lx - 50) + 'px'; lab.style.top = (ly - 32) + 'px'; lab.style.opacity = w > .9 ? 1 : 0;
    } };
  },
  M_E016_LORONG(s, root) {   // lorong kantor panjang, dua orang jalan berhadapan lalu berhenti; kamera rendah dari samping
    const sc = newScene({ bg: '#EEF2F6', hemi: 1.4, sun: '#FFFFFF', sunPos: [4, 10, 8], shadow: 18 }); sc.add(mesh(G.box(30, .2, 6), '#B8C2CC', [0, -.1, 0])); sc.add(mesh(G.box(30, 5, .2), '#DDE3EA', [0, 2.5, -2.2]));
    for (let i = -6; i <= 6; i++) { sc.add(mesh(G.box(1.2, 2.3, .1), i % 2 ? '#8FA6BF' : '#C9A27A', [i * 2.4, 1.15, -2.08])); sc.add(mesh(G.box(1.6, .1, .8), '#FFFFFF', [i * 2.4, 4.6, 0], { mat: { emissive: '#FFFFFF', emissiveIntensity: .8 }, cast: false })) }
    sc.add(mesh(G.box(.6, 1.2, .6), '#5E9C4A', [-3.6, .6, -1.6]));
    const B = bos([-5, 0, 0]), S = staf([5, 0, 0]); sc.add(B); sc.add(S); const cam = camera(42);
    const c1 = card(root, '😤 siap negur', { left: 60, top: 330 }, ORANGE), c2 = card(root, '😞 siap minta maaf', { left: 560, top: 330 }, BLUE);
    const k = X.ab({ left: 60, top: 1010, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '50px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Kurangnya cuma<br><span style="color:${ORANGE}">satu kalimat alasan</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const ts = at(s, 'papasan', 2.5) + .6; const q = E.out(seg(t, 0, ts)); B.position.x = lerp(-5, -.75, q); S.position.x = lerp(5, .75, q); B.rotation.y = Math.PI / 2; S.rotation.y = -Math.PI / 2;
      B.pose(t, { walk: q < .98 ? 1 : 0 }); S.pose(t, { walk: q < .98 ? 1 : 0, look: t > ts ? .3 : 0 }); B.rotation.y = Math.PI / 2; S.rotation.y = -Math.PI / 2;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.5, 1, p), lerp(1.2, 1.6, p), lerp(7.5, 6.6, p)); cam.lookAt(0, 1.4, 0);
      const t1 = at(s, 'siap negur', 4), t2 = at(s, 'siap minta maaf', 6), tk = at(s, 'satu kalimat', dur * .7); X.pop(c1, seg(t, t1, t1 + .4)); X.pop(c2, seg(t, t2, t2 + .4)); X.pop(k, seg(t, tk, tk + .4));
    } };
  },
  M_E016_TUTUP(s, root) {   // kantor siang: meja bos dan meja staf berhadapan dari atas, kamera turun berputar; dua janji + pertanyaan
    const v = X.TL.vars; const sc = newScene({ bg: '#FFF1DE', hemi: 1.4, sun: '#FFE9C8', sunPos: [-5, 10, 5] }); room(sc, { wall: '#F4E6D2', wall2: '#EAD8C0', floor: '#A08468', window: true });
    desk(sc, [-1.3, 0, -.6], 1.8); desk(sc, [1.3, 0, -.6], 1.8); laptop(sc, [-1.3, .82, -.7], '#FFD39A'); laptop(sc, [1.3, .82, -.7], '#9CC3E6');
    const B = bos([-1.3, 0, .3]), S = staf([1.3, 0, .3]); sc.add(B); sc.add(S); sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [-1.3, .48, .3])); sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [1.3, .48, .3]));
    const ph = mesh(G.box(.3, .55, .05), '#1B1B1F', [1.3, 1.3, .7]); sc.add(ph); const cam = camera(42);
    const lb = card(root, `<b style="color:${ORANGE}">BOS</b> ${v.split3[0]}`, { left: 40, top: 300 }, ORANGE), rb = card(root, `<b style="color:${BLUE}">STAF</b> ${v.split3[1]}`, { left: 40, top: 410 }, BLUE);
    const q = X.ab({ left: 60, top: 1240, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Lo pernah di posisi mana?<br><span style="color:${ORANGE}">Yang cuti, atau yang ditinggal?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-30, 25, p), lerp(5, 3.4, p), lerp(8, 7, p), [0, 1, -.4]);
      B.pose(t, { talk: Math.sin(t * 1.6) > 0 }); S.pose(t, { nod: Math.sin(t * 1.3) > .4 }); B.rotation.y = Math.PI * .9; S.rotation.y = -Math.PI * .9; ph.visible = t > at(s, 'telepon', 6);
      const tb = at(s, 'kabari aku', 1.5), ts = at(s, 'lain kali', 6), tq = at(s, 'pernah di posisi', dur - 4); X.pop(lb, seg(t, tb, tb + .4)); X.pop(rb, seg(t, ts, ts + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

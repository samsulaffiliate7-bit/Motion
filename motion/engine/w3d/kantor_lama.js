// Arsip shot lama kantor (dipakai untuk render ulang episode lama). Episode baru: shots.js di folder episode.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, tree } from './kit.js';
import { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, phoneTex, phone, room, laptop, desk, clock3 } from './kantor.js';

export const SHOTS = {
  // 1. Close-up HP di kasur malam hari, chat masuk
  M_PHONE(s, root) {
    const sc = newScene({ bg: '#0E1626', hemi: .35, hemiSky: '#5A6FA0', sunI: .6, sun: '#8FA8FF', sunPos: [-6, 10, 4] });
    sc.add(mesh(G.box(6, .5, 4), '#3D4F7A', [0, .25, 0])); sc.add(mesh(G.box(6.2, .3, 4.2), '#E7E2D8', [0, .55, 0])); sc.add(mesh(G.box(1.6, .35, .9), '#F4F1EA', [-1.8, .85, -1.2]));
    const tex = phoneTex(X.TL.vars.chat, 0); const P = phone(sc, [0, .75, .4], tex); P.rotation.x = -Math.PI / 2 + .05;
    const glow = new THREE.PointLight('#9CC3E6', 0, 6); glow.position.set(0, 1.6, .4); sc.add(glow);
    const cam = camera(40);
    const tag = chip(root, 'Bos: <b>"Besok pagi ya 🙏"</b>', { left: 120, top: 300 }, ORANGE), z1 = chip(root, '😵 staf: nggak bisa tidur', { left: 120, top: 420 }, BLUE), z2 = chip(root, '😴 bos: sudah tidur', { left: 120, top: 530 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const tc = at(s, 'besok pagi', 2); tex.draw(t > tc - .6 ? 2 : t > .8 ? 1 : 0); glow.intensity = t > .8 ? 2.2 : 0; P.position.y = .75 + (t > .8 && t < 1.6 ? Math.abs(Math.sin(t * 40)) * .03 : 0);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.6, 0, p), lerp(4.2, 2.3, p), lerp(2.6, 1.4, p)); cam.lookAt(0, .75, .35);
      X.pop(tag, seg(t, tc, tc + .4)); const a = at(s, 'nggak bisa tidur', 5), b = at(s, 'tidur duluan', 7); X.pop(z1, seg(t, a, a + .4)); X.pop(z2, seg(t, b, b + .4));
    } };
  },
  // 2. Rumah staf: makan malam ditinggal, laptop dibuka lagi
  M_HOME(s, root) {
    const sc = newScene({ bg: '#1A2238', hemi: .6, hemiSky: '#9CC3E6', sunI: 1.1, sun: '#BFD7FF', sunPos: [4, 9, 6] }); room(sc, { wall: '#4C5F7C', wall2: '#435570', floor: '#6B5A4A', window: true, night: true });
    const tb = desk(sc, [0, 0, 0], 2.4); const L = laptop(sc, [.4, .82, .1]); sc.add(mesh(G.cyl(.32, .3, .06, 16), '#FFFFFF', [-.7, .85, .1])); sc.add(mesh(G.ico(.18, 0), '#E8A33D', [-.7, .95, .1]));
    sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [0, .48, 1.0])); const S = staf([0, 0, 1.05]); sc.add(S); S.rotation.y = Math.PI;
    const lamp = new THREE.PointLight('#9CC3E6', 3, 5); lamp.position.set(.4, 1.6, -.2); sc.add(lamp);
    const cam = camera(42);
    const c1 = chip(root, '🔥 rasanya kayak alarm kebakaran', { left: 70, top: 300 }, BLUE), c2 = chip(root, '🍛 makan malam ditunda', { left: 70, top: 410 }), c3 = chip(root, '🕔 jam kerja selesai: sore', { left: 70, top: 520 });
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(lerp(2.6, 1.9, seg(t, 0, dur)), 2.5, lerp(4.4, 3.6, seg(t, 0, dur))); cam.lookAt(.1, 1.1, 0);   // over-the-shoulder
      S.pose(t, { hold: true, look: Math.sin(t * .8) * .2 }); S.userData.st.arms.forEach(A => { A.rotation.x = -1.1 + Math.sin(t * 14 + A.position.x) * .08 });
      [[c1, 'alarm'], [c2, 'Makan'], [c3, 'sore']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) });
    } };
  },
  // 3. Bos di mobil saat pulang: ketik cepat biar nggak lupa
  M_CAR(s, root) {
    const sc = newScene({ bg: '#2B1E14', hemi: .7, hemiSky: '#FFC48A', sunI: 1.2, sun: '#FFB46B', sunPos: [-4, 6, 4] });
    sc.add(mesh(G.box(3.4, .3, 4), '#2A2A2E', [0, .15, 0])); const seat = mesh(G.box(1, 1.3, .3), '#4A3B30', [0, .95, .9]); sc.add(seat); sc.add(mesh(G.box(1, .25, 1), '#4A3B30', [0, .5, .45]));
    sc.add(mesh(G.box(3.4, .6, .8), '#1F1F22', [0, 1, -1.4])); const wh = mesh(G.cyl(.4, .4, .06, 24), '#111', [-.6, 1.3, -.8], { rot: [1.1, 0, 0] }); sc.add(wh);
    const glass = mesh(G.box(3.4, 1.4, .05), '#1A2B4A', [0, 2, -1.8], { mat: { emissive: '#1A2B4A', emissiveIntensity: .5 }, cast: false }); sc.add(glass);
    const lights = Array.from({ length: 6 }, (_, i) => { const m = mesh(G.sph(.08, 8, 6), ['#FFD27A', '#FF8A5B', '#FFFFFF'][i % 3], [0, 0, -2.2], { mat: { emissive: '#FFD27A', emissiveIntensity: 1.5 }, cast: false }); sc.add(m); return m });
    const B = bos([0, .4, .55]); sc.add(B); B.rotation.y = Math.PI;
    const tex = phoneTex(X.TL.vars.chat, 1); const P = phone(B.userData.st.arms[1], [0, -.6, .15], tex); P.scale.setScalar(.6); P.rotation.x = -.5;
    const cam = camera(42);
    const c1 = chip(root, '🧠 biar nggak lupa', { left: 70, top: 300 }, ORANGE), c2 = chip(root, 'maksudnya: dikerjakan <b>besok</b>', { left: 70, top: 410 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      lights.forEach((m, i) => { const q = (t * .35 + i / 6) % 1; m.position.set(lerp(-2, 2.5, q), 1.6 + (i % 2) * .4, -2.2) });
      tex.draw(t > at(s, 'langsung ketik', 4) ? 2 : 1);
      cam.position.set(1.5 + Math.sin(t * .6) * .1, 2.2, -1.7); cam.lookAt(0, 1.7, .55); B.pose(t, { hold: true, nod: t > dur * .6 }); B.userData.st.arms[1].rotation.x = -1.2;
      [[c1, 'nggak lupa'], [c2, 'besok']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) });
    } };
  },
  // 4. Layar terbelah (sekali per episode): arti "besok pagi" versi bos vs staf
  M_SPLIT(s, root) {
    const mk = (who) => { const B = who === 'bos'; const sc = newScene({ bg: B ? '#FFE3C2' : '#CFE0F5', hemi: 1.1, sunPos: [3, 8, 6] }); room(sc, { wall: B ? '#F7D2A8' : '#B9CFE8', floor: B ? '#B98B5E' : '#7C8DA3' });
      desk(sc, [0, 0, 0]); const L = laptop(sc, [0, .82, 0], B ? '#FFD39A' : '#9CC3E6'); const P = (B ? bos : staf)([0, 0, .95]); sc.add(P); P.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [0, .48, .95]));
      const c = camera(46); c.aspect = 540 / 1920; c.updateProjectionMatrix(); return { sc, c, P } };
    const A = mk('bos'), Bs = mk('staf');
    const SP = X.TL.vars.split || ['mulai besok', 'jadi besok pagi']; const lb = chip(root, `<b style="color:#F28C28">BOS</b>: ${SP[0]}`, { left: 30, top: 300, fontSize: '32px', padding: '10px 16px' }, ORANGE), rb = chip(root, `<b style="color:#6C8CB0">STAF</b>: ${SP[1]}`, { left: 556, top: 300, fontSize: '32px', padding: '10px 16px' }, BLUE);
    const div = X.ab({ left: 534, top: 0, width: 12, height: 1920, background: INK }, root);
    return { scene: A.sc, cam: A.c, render(R) {
        R.setScissorTest(true); R.setScissor(0, 0, 540, 1920); R.setViewport(0, 0, 540, 1920); R.render(A.sc, A.c);
        R.setScissor(540, 0, 540, 1920); R.setViewport(540, 0, 540, 1920); R.render(Bs.sc, Bs.c); R.setScissorTest(false); R.setViewport(0, 0, 1080, 1920) },
      upd(t, dur) {
        A.c.position.set(0, 2.3, -3.4); A.c.lookAt(0, 1.3, .9); Bs.c.position.set(0, 2.3, -3.4); Bs.c.lookAt(0, 1.3, .9);
        A.P.pose(t, { nod: true }); A.P.rotation.y = Math.PI; Bs.P.pose(t, { shake: true }); Bs.P.userData.st.arms.forEach(a => a.rotation.x = -1.1 + Math.sin(t * 16) * .1);
        const tb = at(s, 'Bos maksudnya|bos takut', 2), ts = at(s, 'Staf membacanya|Staf takut', 4.5); X.pop(lb, seg(t, tb, tb + .4)); X.pop(rb, seg(t, ts, ts + .4));
        div.style.transform = `scaleY(${E.out(seg(t, 0, .4))})`;
      } };
  },
  // 5. Timelapse jam dinding: staf begadang, bos buka file jam 10 sambil ngopi
  M_CLOCK(s, root) {
    const sc = newScene({ bg: '#121A2E', hemi: .5, hemiSky: '#9CC3E6', sunI: .8, sun: '#BFD7FF', sunPos: [4, 9, 6] }); room(sc, { wall: '#3E5070', floor: '#5A4A3C', window: true, night: true });
    const C = clock3(sc, [-1.6, 3.4, -3.85]); desk(sc, [.6, 0, -1.6]); laptop(sc, [.6, .82, -1.6]); const S = staf([.6, 0, -.7]); sc.add(S); S.rotation.y = Math.PI; sc.add(mesh(G.box(.6, .1, .6), '#3B4A5A', [.6, .48, -.7]));
    const cam = camera(44); const sky = sc.background, day = new THREE.Color('#BFE6FF');
    const tm = X.ab({ left: 650, top: 300, background: INK, color: '#9CC3E6', fontFamily: 'Poppins', fontWeight: 800, fontSize: '84px', padding: '6px 26px', borderRadius: '18px' }, root);
    const c1 = chip(root, 'Bos buka file: <b>jam 10</b> ☕', { left: 70, top: 440 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const tp = at(s, 'Besok paginya', dur * .55); const hrs = t < tp ? lerp(21.1, 26, E.inout(seg(t, 0, tp))) : lerp(26, 34, E.inout(seg(t, tp, tp + 1.5)));
      C.userData.h.rotation.z = -(hrs % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(hrs % 1) * Math.PI * 2;
      const hh = Math.floor(hrs % 24), mm = Math.floor((hrs % 1) * 60); tm.textContent = `${String(hh).padStart(2, '0')}.${String(mm).padStart(2, '0')}`;
      const morning = t > tp + .8; sc.background = morning ? day : sky; sc.userData.sun.intensity = morning ? 2 : .8; tm.style.color = morning ? ORANGE : '#9CC3E6';
      orbit(cam, lerp(25, 5, seg(t, 0, dur)), 2.6, 6.5, [-.4, 2, -2]); S.pose(t, { nod: t < tp && Math.sin(t * 2) > .6, hold: true }); S.userData.st.head.rotation.x = t < tp ? .25 + Math.sin(t * 1.3) * .15 : 0;
      X.pop(c1, seg(t, at(s, 'sepuluh', tp + 1), at(s, 'sepuluh', tp + 1) + .4));
    } };
  },
  // 6. Papan tulis kantor: solusi dua kalimat
  M_BOARD(s, root) {
    const sc = newScene({ bg: '#E8EEF5', hemi: 1.2, sunPos: [6, 10, 8] }); room(sc, { wall: '#EEF2F7', floor: '#A9B4C2', window: true });
    sc.add(mesh(G.box(4.6, 2.6, .1), '#FFFFFF', [0, 2.7, -3.85])); sc.add(mesh(G.box(4.8, .14, .3), '#9AA6B2', [0, 1.38, -3.75]));
    const B = bos([-1.5, 0, -1.2]), S = staf([1.5, 0, -1.2]); sc.add(B, S); B.rotation.y = .4; S.rotation.y = -.4;
    const cam = camera(42);
    const tips = X.TL.vars.tips.map(([w, tx], i) => X.ab({ left: 150, top: 640 + i * 230, width: 780, fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: INK, opacity: 0, borderLeft: `14px solid ${w === 'Bos' ? ORANGE : BLUE}`, paddingLeft: '20px', background: '#FFFFFFE8', borderRadius: '10px', padding: '14px 20px' }, root, `<div style="color:${w === 'Bos' ? ORANGE : BLUE};font-size:30px">${w.toUpperCase()}</div>${tx}`));
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(Math.sin(t * .2) * .4, 2.6, 7.4 - t * .05); cam.lookAt(0, 2, -2.5);
      const tb = at(s, 'Bos, tulis', 1.5), ts = at(s, 'Staf, kalau', 5.5); B.pose(t, { talk: t > tb && t < ts, point: t > tb && t < tb + 1.5 }); S.pose(t, { talk: t > ts, nod: t < ts });
      [tb, ts].forEach((tc, i) => { const q = seg(t, tc, tc + .5); tips[i].style.opacity = q; tips[i].style.transform = `translateX(${(1 - E.out(q)) * -60}px)` });
    } };
  },

  // ruang rapat panjang: varian long (jam berputar, peserta bosan) / short (rapat berdiri 10 menit)
  M_MEETROOM(s, root) {
    const LONG = s.variant !== 'short'; const sc = newScene({ bg: '#E1E7EF', hemi: 1.1, sunPos: [5, 10, 6] }); room(sc, { wall: '#E9EDF3', floor: '#8E9AA8', window: true });
    sc.add(mesh(G.box(1.6, .08, 5.6), '#C9B79A', [0, .8, -.6])); sc.add(mesh(G.box(1.4, .76, 5.4), '#7A6A55', [0, .38, -.6]));
    const C = clock3(sc, [0, 3.6, -3.85]); const ppl = [];
    for (let i = 0; i < 8; i++) { const side = i % 2 ? 1 : -1, z = -2.6 + Math.floor(i / 2) * 1.3; const P = (i === 0 ? bos : staf)([LONG ? side * 1.25 : side * 1.6, 0, z], i === 0 ? {} : { body: ['#9CC3E6', '#BFD6EA', '#A7C4DC', '#C8DCEF'][i % 4] }); sc.add(P); P.rotation.y = LONG ? -side * Math.PI / 2 : 0; if (LONG) sc.add(mesh(G.box(.5, .5, .5), '#3B4A5A', [side * 1.35, .25, z])); ppl.push(P) }
    const cam = camera(42); const tag = LONG ? chip(root, '⏱️ 60 menit · 👥 8 orang', { left: 70, top: 300 }) : chip(root, '⏱️ 10 menit, berdiri, khusus tanya', { left: 70, top: 300 }, BLUE);
    const two = LONG ? chip(root, 'isinya: <b>2 kalimat</b>', { left: 70, top: 410 }, ORANGE) : chip(root, '📄 info dikirim tertulis dulu', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      const hrs = LONG ? 9 + t / dur : 9 + t / dur * .17; C.userData.h.rotation.z = -(hrs % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(hrs % 1) * Math.PI * 2 * (LONG ? 1 : 1);
      if (LONG) { cam.position.set(lerp(-3.4, 3.4, E.inout(seg(t, 0, dur))), 5.2, 6.6); cam.lookAt(0, 1, -1.2); ppl.forEach((p, i) => p.pose(t + i, { talk: i === 0, nod: i > 0 && (Math.sin(t * .8 + i) > .7), look: i > 0 ? Math.sin(t * .3 + i) * .4 : 0 })) }
      else { orbit(cam, t * 4 - 10, 4.4, 11, [0, 1, -1]); ppl.forEach((p, i) => p.pose(t + i, { talk: i === 0 || (t > dur * .5 && i === 3), nod: i > 0 })) }
      X.pop(tag, seg(t, .5, .9)); const tt = at(s, 'dua kalimat|tertulis', 3); X.pop(two, seg(t, tt, tt + .4));
    } };
  },
  // POV laptop staf: email dua kalimat, tumpukan kerjaan
  M_SCREEN(s, root) {
    const sc = newScene({ bg: '#CFDCEB', hemi: 1.1, sunPos: [4, 9, 6] }); room(sc, { wall: '#D6E2EF', floor: '#7C8DA3' }); desk(sc, [0, 0, 0], 2.6);
    const c = document.createElement('canvas'); c.width = 1024; c.height = 640; const x = c.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 1024, 640); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 1024, 90);
    x.fillStyle = '#fff'; x.font = '700 44px Poppins'; x.fillText('Email baru', 30, 62); x.fillStyle = INK; x.font = '700 40px Poppins'; x.fillText('Perihal: Info laporan', 40, 160); x.font = '700 36px Poppins'; X.TL.vars.email.forEach((l, i) => x.fillText(l, 40, 260 + i * 70));
    x.fillStyle = '#2E7D32'; x.font = '700 34px Poppins'; x.fillText('⏱ dibaca: 1 menit', 40, 560); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const scr = new THREE.Mesh(G.plane(1.6, 1), new THREE.MeshBasicMaterial({ map: tex })); scr.position.set(0, 1.45, -.25); scr.rotation.x = -.12; sc.add(scr); sc.add(mesh(G.box(1.7, 1.08, .05), '#2A2F36', [0, 1.45, -.29], { rot: [-.12, 0, 0] }));
    const pile = Array.from({ length: 9 }, (_, i) => mesh(G.box(.5, .06, .7), ['#FFFFFF', '#F2E8D0', '#E8F0FA'][i % 3], [1.05, .85 + i * .065, .1], { rot: [0, (i % 3 - 1) * .12, 0] })); pile.forEach(m => sc.add(m));
    const cam = camera(40); const c1 = chip(root, '✉️ cukup 1 email', { left: 70, top: 300 }, BLUE), c2 = chip(root, '📚 kerjaan menumpuk', { left: 70, top: 410 }, ORANGE);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .3) * .1, 1.8, lerp(4.6, 4.1, seg(t, 0, dur))); cam.lookAt(0, 1.35, -.25);
      const tm = at(s, 'menumpuk', 5); pile.forEach((m, i) => m.visible = t > tm - .5 + i * .15); const te = at(s, 'satu email', 1.5); X.pop(c1, seg(t, te, te + .4)); X.pop(c2, seg(t, tm, tm + .4)) } };
  },
  // pantry kantor: bos ngopi menjelaskan sisinya / penutup
  M_PANTRY(s, root) {
    const OUT = s.variant === 'outro'; const sc = newScene({ bg: '#FFE7CC', hemi: 1.1, sun: '#FFD3A0', sunPos: [-6, 9, 6] }); room(sc, { wall: '#F6DDBF', wall2: '#EFCFA8', floor: '#A8835E', window: true });
    sc.add(mesh(G.box(4, .9, .9), '#FFFFFF', [0, .45, -3.4])); sc.add(mesh(G.box(4, .06, .95), '#C9B79A', [0, .92, -3.4])); sc.add(mesh(G.box(.5, .6, .4), '#3A3A40', [-1.2, 1.25, -3.5])); sc.add(mesh(G.cyl(.08, .07, .16, 10), '#FFFFFF', [-.9, 1.03, -3.2]));
    const B = bos([.6, 0, -1.6]); sc.add(B); B.rotation.y = -.3; const S = staf([-1, 0, -1.4]); sc.add(S); S.rotation.y = .5; S.visible = OUT;
    const cup = mesh(G.cyl(.07, .06, .14, 10), '#FFFFFF', [0, -.55, .1]); B.userData.st.arms[1].add(cup);
    const cam = camera(42);
    const L = OUT ? [] : [['👂 biar semua dengar langsung', 'dengar langsung', ORANGE], ['📭 email sering nggak dibaca', 'dibaca', ORANGE]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 110 }, col) }));
    const q = OUT ? X.ab({ left: 90, top: 330, width: 900, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '62px', color: '#fff', opacity: 0 }, root, `<span style="background:${BLUE};padding:6px 18px;border-radius:14px">TIM STAF</span> atau <span style="background:${ORANGE};padding:6px 18px;border-radius:14px">TIM BOS</span>?`) : null;
    return { scene: sc, cam, upd(t, dur) {
      if (OUT) { orbit(cam, lerp(-25, 25, seg(t, 0, dur)), 1.7, 5.2, [-.2, 1.4, -1.5]); B.pose(t, { hold: true, talk: Math.sin(t * 2) > 0 }); S.pose(t, { talk: Math.sin(t * 2) <= 0 }); const tq = at(s, 'tim staf', 3); const p = seg(t, tq, tq + .4); q.style.opacity = p; q.style.transform = `scale(${E.back(p)})` }
      else { cam.position.set(lerp(2.2, 1.4, seg(t, 0, dur)), 1.9, 2.4); cam.lookAt(.5, 1.6, -1.6); B.pose(t, { hold: true, talk: true, nod: t > dur * .6 }) }
      chips.forEach(c => { const tc = at(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  // 7. Lift: staf dan bos berdiri canggung berdampingan, pertanyaan ke penonton
  M_LIFT(s, root) {
    const sc = newScene({ bg: '#2A2F36', hemi: 1, hemiSky: '#FFF1D6', sunI: 1.6, sunPos: [0, 8, 6] });
    sc.add(mesh(G.box(3.2, .1, 3), '#5C5F66', [0, 0, 0])); sc.add(mesh(G.box(3.2, 3.4, .1), '#B8BDC4', [0, 1.7, -1.5], { mat: { metalness: .5, roughness: .3 } }));
    sc.add(mesh(G.box(.1, 3.4, 3), '#AEB4BB', [-1.6, 1.7, 0], { mat: { metalness: .5, roughness: .3 } })); sc.add(mesh(G.box(.1, 3.4, 3), '#AEB4BB', [1.6, 1.7, 0], { mat: { metalness: .5, roughness: .3 } }));
    const S = staf([-.6, 0, -.2]), B = bos([.6, 0, -.2]); sc.add(S, B);
    const doors = [mesh(G.box(1.6, 3.4, .08), '#C9CED4', [-.8, 1.7, 1.5], { mat: { metalness: .6, roughness: .25 } }), mesh(G.box(1.6, 3.4, .08), '#C9CED4', [.8, 1.7, 1.5], { mat: { metalness: .6, roughness: .25 } })]; doors.forEach(d => sc.add(d));
    const cam = camera(44);
    const q = X.ab({ left: 90, top: 330, width: 900, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '62px', color: '#fff', opacity: 0 }, root,
      `<span style="background:${BLUE};padding:6px 18px;border-radius:14px">TIM STAF</span> atau <span style="background:${ORANGE};padding:6px 18px;border-radius:14px">TIM BOS</span>?`);
    return { scene: sc, cam, upd(t, dur) {
      const o = E.inout(seg(t, .2, 1.4)); doors[0].position.x = -.8 - o * 1.5; doors[1].position.x = .8 + o * 1.5;
      cam.position.set(0, 1.7, 4.6 - t * .08); cam.lookAt(0, 1.4, 0);
      S.pose(t, { look: Math.sin(t * 1.5) > .3 ? .5 : 0 }); B.pose(t, { look: Math.sin(t * 1.5 + 1.5) > .3 ? -.5 : 0 });
      const tq = at(s, 'tim staf', 3); const p = seg(t, tq, tq + .4); q.style.opacity = p; q.style.transform = `scale(${E.back(p)})`;
    } };
  },

  // ===== ep006 (Seri Jenis Bos: bos killer yang nggak pernah teriak) =====
  M_LOBBY(s, root) {   // lobi pagi: staf absen jam 08.03, bos berdiri diam, lihat jam, menulis
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.1, sunPos: [-6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#E9EEF4', wall2: '#D8E0EA', floor: '#B8C2CE', window: true });
    sc.add(mesh(G.box(3.6, .1, 1.2), '#2E5E8C', [0, 3.6, -3.7])); const fp = group(sc, [-1.6, 0, -3.3]); fp.add(mesh(G.box(.5, .8, .3), '#2A2F36', [0, 1.3, 0])); fp.add(mesh(G.box(.36, .24, .02), '#7FE0A8', [0, 1.45, .16], { mat: { emissive: '#7FE0A8', emissiveIntensity: .8 }, cast: false })); fp.add(mesh(G.box(.06, 1, .06), '#555', [0, .5, 0]));
    const S = staf([-1.6, 0, 1.6]); sc.add(S); S.rotation.y = Math.PI; const B = bos([1.5, 0, -2.2]); sc.add(B); B.rotation.y = -.5;
    const nb = mesh(G.box(.22, .3, .04), '#111', [0, -.62, .12]); B.userData.st.arms[1].add(nb);
    const cam = camera(42); const tm = X.ab({ left: 640, top: 300, background: INK, color: '#FF6B6B', fontFamily: 'Poppins', fontWeight: 800, fontSize: '80px', padding: '6px 26px', borderRadius: '18px', opacity: 0 }, root, '08.03');
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '54px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Bos killer bukan yang teriak.<br><span style="color:${ORANGE}">Yang ini lebih serem.</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const w = E.inout(seg(t, 0, dur * .55)); S.position.set(-1.6, 0, lerp(1.6, -2.5, w)); S.pose(t, { walk: w < 1 ? 1 : 0 }); if (w >= 1) S.rotation.y = Math.PI * .85;
      const tw = at(s, 'nulis|catat', dur * .6); B.pose(t, { hold: true, look: t > dur * .45 ? -.4 : 0 }); B.userData.st.arms[1].rotation.x = t > tw ? -1.2 : -.3; B.userData.st.arms[0].rotation.x = t > dur * .45 && t < tw ? -1 : 0;
      cam.position.set(lerp(2.6, 1.8, seg(t, 0, dur)), 1.25, lerp(8.6, 7.6, seg(t, 0, dur))); cam.lookAt(0, 1.55, -1.2);   // sudut rendah
      X.pop(tm, seg(t, dur * .5, dur * .5 + .4)); X.pop(hook, seg(t, .1, .5));
    } };
  },
  M_NOTEBOOK(s, root) {   // close-up buku hitam di meja: catatan muncul satu per satu (varian bad / good)
    const GOOD = s.variant === 'good'; const sc = newScene({ bg: GOOD ? '#FFE9CF' : '#1A2030', hemi: GOOD ? 1 : .5, sunI: GOOD ? 2 : 1.2, sun: GOOD ? '#FFE3B8' : '#BFD7FF', sunPos: [-3, 9, 4] });
    sc.add(mesh(G.box(8, .3, 6), GOOD ? '#B9875A' : '#4A3626', [0, -.15, 0])); sc.add(mesh(G.cyl(.05, .05, 1.6, 8), '#222', [2.2, .02, -.6], { rot: [0, 0, Math.PI / 2] }));
    const items = X.TL.vars[GOOD ? 'good' : 'bad']; const c = document.createElement('canvas'); c.width = 700; c.height = 900; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#FBF7EE'; x.fillRect(0, 0, 700, 900); x.strokeStyle = '#C9D6E8'; x.lineWidth = 3; for (let y = 120; y < 900; y += 80) { x.beginPath(); x.moveTo(30, y); x.lineTo(670, y); x.stroke() }
      x.fillStyle = '#E5484D'; x.fillRect(90, 0, 4, 900); x.font = '700 40px Poppins'; items.slice(0, n).forEach((it, i) => { const [d, txt] = it; x.fillStyle = '#7A8594'; x.fillText(d, 110, 105 + (i * 2 + 1) * 80 - 12); x.fillStyle = GOOD && i >= (X.TL.vars.good_from || 0) ? '#2E7D32' : '#1E2A38'; x.fillText(txt, 110, 105 + (i * 2 + 2) * 80 - 12) }); tex.needsUpdate = true };
    draw(0); const bk = group(sc, [-.2, 0, 0]); bk.add(mesh(G.box(3.1, .12, 2.1), '#111', [0, .06, 0])); const pg = new THREE.Mesh(G.plane(1.45, 1.9), new THREE.MeshStandardMaterial({ map: tex, roughness: .9 })); pg.rotation.x = -Math.PI / 2; pg.position.set(.75, .125, 0); bk.add(pg);
    const pg2 = mesh(G.box(1.45, .01, 1.9), '#F4EFE4', [-.75, .125, 0], { cast: false }); bk.add(pg2);
    const pen = group(sc, [1.6, .12, .6]); pen.add(mesh(G.cyl(.04, .04, 1.2, 8), '#1E2A38', [0, 0, 0], { rot: [0, 0, Math.PI / 2] }));
    const cam = camera(40); const cues = X.TL.vars[GOOD ? 'good_cues' : 'bad_cues'];
    return { scene: sc, cam, upd(t, dur) {
      let n = GOOD ? (X.TL.vars.good_from || 0) : 0; cues.forEach((cu, i) => { if (!/^xx/.test(cu) && t > at(s, cu, 1 + i * 2.5) - .2) n = Math.max(n, i + 1) }); draw(n);
      pen.position.set(1.0 + Math.sin(t * 9) * .08 * (n < items.length ? 1 : 0), .2, -.6 + n * .35); pen.rotation.y = .5;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.9, .6, p), lerp(4.2, 3.2, p), lerp(2.4, 1.6, p)); cam.lookAt(.5, 0, .05);
    } };
  },
  M_GLASSROOM(s, root) {   // open space: staf melirik ruang kaca bos, pintu terbuka -> semua pura-pura sibuk
    const sc = newScene({ bg: '#E1E7EF', hemi: 1.05, sunPos: [6, 10, 6] }); sc.add(mesh(G.box(16, .2, 16), '#9AA6B4', [0, -.1, 0])); sc.add(mesh(G.box(16, 5, .2), '#E9EDF3', [0, 2.5, -6]));
    const gr = group(sc, [0, 0, -4]); gr.add(mesh(G.box(5, 3, .06), '#BFE0F5', [0, 1.5, 1.2], { mat: { transparent: true, opacity: .35, roughness: .1 }, cast: false })); gr.add(mesh(G.box(5.2, .12, .12), '#5A6676', [0, 3, 1.2]));
    const door = mesh(G.box(1.1, 2.6, .08), '#BFE0F5', [1.6, 1.3, 1.25], { mat: { transparent: true, opacity: .5, roughness: .1 }, cast: false }); gr.add(door); desk(gr, [0, 0, -.2], 2); const B = bos([0, 0, .5]); gr.add(B); B.rotation.y = 0;
    const ppl = [[-2.4, .8], [-.8, .8], [.8, .8], [2.4, .8], [-1.6, 2.6], [1.6, 2.6]].map(([x, z], i) => { desk(sc, [x, 0, z], 1.3); laptop(sc, [x, .82, z - .1]); const P = staf([x, 0, z + .75], { body: ['#9CC3E6', '#BFD6EA', '#A7C4DC', '#C8DCEF'][i % 4] }); sc.add(P); P.rotation.y = Math.PI; return P });
    const cam = camera(42); const c1 = chip(root, '🫣 semua pura-pura sibuk', { left: 70, top: 300 }, BLUE), c2 = chip(root, 'rapi ✓ · tegang ✓', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      const to = at(s, 'kebuka', dur * .55), open = E.out(seg(t, to - .3, to + .4)); door.position.x = 1.6 + open * 1.05;
      ppl.forEach((P, i) => { const peek = t < to; P.pose(t + i, { look: peek ? (Math.sin(t * .9 + i) > 0 ? .7 : .2) * (P.position.x < 0 ? -1 : 1) * -1 : 0, hold: !peek }); P.userData.st.arms.forEach(A => A.rotation.x = peek ? 0 : -1.1 + Math.sin(t * 16 + i) * .1) });
      B.pose(t, { look: Math.sin(t * .4) * .3 }); cam.position.set(lerp(-1.4, 1.2, seg(t, 0, dur)), 4.6, 8.4); cam.lookAt(0, 1.2, -2.6);
      X.pop(c1, seg(t, to, to + .4)); const tr = at(s, 'super rapi', 1.5); X.pop(c2, seg(t, tr, tr + .4));
    } };
  },
  M_REVIEW(s, root) {   // ruang evaluasi 1-on-1: bos membuka buku, staf menegang (kamera over-the-shoulder bos)
    const sc = newScene({ bg: '#C9D4E2', hemi: .9, sunI: 1.6, sunPos: [-5, 8, 3], sun: '#FFF0D8' }); room(sc, { wall: '#CBD6E3', wall2: '#BFCBDA', floor: '#6B7787', window: true });
    sc.add(mesh(G.box(2.2, .08, 1.2), '#E7DCCB', [0, .8, -.6])); sc.add(mesh(G.box(2, .76, 1), '#7A6A55', [0, .38, -.6]));
    const B = bos([0, 0, .55]); sc.add(B); B.rotation.y = Math.PI; const S = staf([0, 0, -1.8]); sc.add(S);
    const bk = group(sc, [0, .86, -.4]); bk.add(mesh(G.box(.7, .05, .5), '#111', [0, 0, 0])); const pages = mesh(G.box(.64, .02, .46), '#FBF7EE', [0, .04, 0], { cast: false }); bk.add(pages);
    const cl = clock3(sc, [1.8, 3, -3.85]);
    const cam = camera(42); const c1 = chip(root, '📓 "Tanggal 3: telat 3 menit"', { left: 70, top: 300 }, ORANGE), c2 = chip(root, '📓 "Tanggal 9: salah angka"', { left: 70, top: 410 }, ORANGE), c3 = chip(root, '😰 siap kena…', { left: 70, top: 520 }, BLUE);
    return { scene: sc, cam, upd(t, dur) {
      const o = E.out(seg(t, at(s, 'buka', 1.5), at(s, 'buka', 1.5) + .6)); bk.scale.set(1, 1, .5 + o * .5);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.4, 1.0, p), 2.2, lerp(2.8, 2.0, p)); cam.lookAt(-.1, 1.35, -1.8);
      B.pose(t, { talk: t > at(s, 'Tanggal tiga', 3) && t < dur * .85 }); S.pose(t, { shake: t > dur * .8, look: Math.sin(t * .7) * .1 }); S.userData.st.head.rotation.x = t > at(s, 'siap', dur - 2) ? .25 : 0;
      [[c1, 'Tanggal tiga'], [c2, 'Tanggal sembilan'], [c3, 'siap']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) });
    } };
  },
  M_STAIRS(s, root) {   // tangga darurat: staf cerita ke rekan, tiga cara bernomor, pertanyaan penutup
    const sc = newScene({ bg: '#3A4048', hemi: .9, hemiSky: '#FFF1D6', sunI: 1.4, sun: '#FFE7C2', sunPos: [3, 10, 6] });
    for (let i = 0; i < 10; i++) sc.add(mesh(G.box(3, .24, .5), '#8E959E', [0, i * .24 + .12, -i * .5]));
    sc.add(mesh(G.box(.2, 6, 8), '#B5BCC5', [-1.6, 3, -2])); sc.add(mesh(G.box(.2, 6, 8), '#A8AFB8', [1.6, 3, -2])); sc.add(mesh(G.box(.06, .06, 5.4), '#E0B33A', [1.45, 1.5, -2], { rot: [-.45, 0, 0] }));
    sc.add(mesh(G.box(.7, .26, .04), '#2E9C6A', [-1.48, 3.2, -1], { rot: [0, Math.PI / 2, 0], mat: { emissive: '#2E9C6A', emissiveIntensity: .8 }, cast: false }));
    const S = staf([-.5, .48, -1]), F = staf([.5, .72, -1.5], { body: '#C8DCEF', hair: '#1E1410' }); sc.add(S, F); S.rotation.y = .5; F.rotation.y = -.5;
    const cam = camera(42); const tips = X.TL.vars.tips3.map((tx, i) => X.ab({ left: 90, top: 300 + i * 120, width: 900, background: CARD, border: `5px solid ${INK}`, borderRadius: '20px', padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '38px', color: INK, opacity: 0, boxShadow: `0 8px 0 ${BLUE}` }, root, `<b style="color:${ORANGE}">${i + 1}.</b> ${tx}`));
    const q = X.ab({ left: 60, top: 1180, width: 960, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '58px', color: '#fff', opacity: 0 }, root, `<span style="background:${ORANGE};padding:8px 22px;border-radius:16px">Bos lo tipe yang mana?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(10, -4, E.inout(seg(t, 0, dur))), 2.2, 5.2, [0, 1.5, -1.2]); S.pose(t, { talk: true, point: t > at(s, 'Satu', 3) && t < at(s, 'Satu', 3) + 1 }); F.pose(t, { nod: true, look: -.3 });
      X.TL.vars.tips_cues.forEach((cu, i) => { const tc = at(s, cu, 3 + i * 3); X.pop(tips[i], seg(t, tc, tc + .4)) }); const tq = at(s, 'tipe yang mana', dur - 2.5); const pq = seg(t, tq, tq + .4); q.style.opacity = pq; q.style.transform = `scale(${E.back(pq)})`;
    } };
  },
  // ===== ep007 (Kamus HRD) =====
  M_JOBAD(s, root) {   // kamar staf malam: HP raksasa menampilkan lowongan, empat frasa disorot satu per satu
    const sc = newScene({ bg: '#1A2238', hemi: .9, hemiSky: '#9CC3E6', sunI: 1.2, sun: '#BFD7FF', sunPos: [4, 9, 6] }); room(sc, { wall: '#4C5F7C', wall2: '#435570', floor: '#6B5A4A', window: true, night: true });
    sc.add(mesh(G.box(3, .5, 2), '#3D4F7A', [-1.4, .25, -1.8])); const S = staf([-1.5, .5, -1.2]); sc.add(S);
    const ph = X.TL.vars.phr; const c = document.createElement('canvas'); c.width = 600; c.height = 1100; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 600, 1100); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 600, 130); x.fillStyle = '#fff'; x.font = '700 46px Poppins'; x.fillText('LOWONGAN', 30, 85);
      x.fillStyle = INK; x.font = '700 40px Poppins'; x.fillText('Staf Admin', 30, 200); x.font = '600 30px Poppins'; x.fillStyle = '#5A6676'; x.fillText('Kami menawarkan:', 30, 260);
      ph.forEach(([p], i) => { const y = 340 + i * 150; if (i < n) { x.fillStyle = '#FFE680'; x.fillRect(20, y - 50, 560, 80) } x.fillStyle = INK; x.font = '700 36px Poppins'; x.fillText('• ' + p, 34, y) }); tex.needsUpdate = true };
    draw(0); const P = group(sc, [.35, 2.3, .4]); P.add(mesh(G.box(1.5, 2.7, .1), '#1B1B1F', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(1.38, 2.52), new THREE.MeshBasicMaterial({ map: tex })); scr.position.z = .055; P.add(scr);
    const glow = new THREE.PointLight('#9CC3E6', 6, 6); glow.position.set(.9, 2.2, 1.5); sc.add(glow);
    const cam = camera(42); const hook = X.ab({ left: 60, top: 1180, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '16px 24px', textAlign: 'center', fontSize: '52px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${BLUE}` }, root, `Lowongannya sempurna.<br><span style="color:${ORANGE}">Tapi baca 4 kalimat ini dulu.</span>`);
    return { scene: sc, cam, upd(t, dur) { draw(Math.min(4, Math.floor(seg(t, 1, dur * .8) * 4.999)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.2, .5, p), 2.4, lerp(8.6, 7.6, p)); cam.lookAt(-.05, 1.8, -.6); P.rotation.y = -.2; S.pose(t, { hold: true, look: .4 }); X.pop(hook, seg(t, .1, .5)) } };
  },
  M_DICT(s, root) {   // kartu kamus (frasa -> bisa berarti -> tanya ini), lokasi berganti per varian: krl / interview / cafe / wait
    const k = +s.variant, [phr, arti, tanya] = X.TL.vars.phr[k], LOC = ['krl', 'interview', 'cafe', 'wait'][k];
    const sc = newScene(LOC === 'wait' ? { bg: '#1A2238', hemi: .9, hemiSky: '#9CC3E6', sunI: 1.1, sun: '#BFD7FF', sunPos: [4, 9, 6] } : LOC === 'cafe' ? { bg: '#FFE7CC', hemi: 1.1, sun: '#FFD3A0', sunPos: [-6, 9, 6] } : { bg: '#DCE6F2', hemi: 1.1, sunPos: [5, 10, 6] });
    const cam = camera(42); let anim = () => {};
    if (LOC === 'krl') { sc.add(mesh(G.box(3.4, .1, 14), '#8E959E', [0, 0, 0])); sc.add(mesh(G.box(.1, 3, 14), '#C9CED4', [-1.7, 1.5, 0])); sc.add(mesh(G.box(.1, 3, 14), '#C9CED4', [1.7, 1.5, 0]));
      for (let i = -3; i <= 3; i++) { sc.add(mesh(G.box(.05, 1, 1.6), '#9FD3F0', [-1.64, 1.9, i * 2], { mat: { emissive: '#BFE6FF', emissiveIntensity: .5 }, cast: false })); sc.add(mesh(G.box(.05, 1, 1.6), '#9FD3F0', [1.64, 1.9, i * 2], { mat: { emissive: '#BFE6FF', emissiveIntensity: .5 }, cast: false })) }
      sc.add(mesh(G.cyl(.03, .03, 14, 6), '#DDD', [0, 2.7, 0], { rot: [Math.PI / 2, 0, 0] })); const ppl = [0, 1, 2, 3].map(i => { const P = staf([(i % 2 ? .6 : -.6), 0, -1 - i * 1.6], { body: ['#9CC3E6', '#C8DCEF', '#E07B39', '#6B8E5A'][i] }); sc.add(P); P.userData.st.arms[0].rotation.z = -2.8; return P });
      anim = t => { cam.position.set(Math.sin(t * 3) * .02, 2.2, 4.2); cam.lookAt(0, 1.5, -3); ppl.forEach((P, i) => { P.pose(t + i, { look: Math.sin(t + i) * .3 }); P.userData.st.arms[0].rotation.z = -2.8; P.rotation.z = Math.sin(t * 2) * .02 }) } }
    if (LOC === 'interview') { room(sc, { wall: '#E9EDF3', floor: '#A9B4C2', window: true }); desk(sc, [0, 0, -1], 2.4); const H = staf([0, 0, -1.9], { body: '#C2457A', hair: '#2A1A10', glasses: true }); sc.add(H); const S = staf([0, 0, .2]); sc.add(S); S.rotation.y = Math.PI;
      anim = t => { cam.position.set(lerp(2.2, 1.8, seg(t, 0, 10)), 2.4, 4.2); cam.lookAt(-.1, 1.3, -1.2); H.pose(t, { talk: (t % 4) < 2.5 }); S.pose(t, { nod: (t % 4) > 2.5 }) } }
    if (LOC === 'cafe') { room(sc, { wall: '#F6DDBF', wall2: '#EFCFA8', floor: '#A8835E', window: true }); sc.add(mesh(G.cyl(.7, .7, .06, 18), '#F4E4CC', [0, .8, -1])); sc.add(mesh(G.cyl(.06, .1, .8, 8), '#3A2A1E', [0, .4, -1]));
      const A = staf([-.9, 0, -1]), B = staf([.9, 0, -1], { body: '#E07B39', hair: '#1E1410' }); sc.add(A, B); A.rotation.y = Math.PI / 2; B.rotation.y = -Math.PI / 2; sc.add(mesh(G.cyl(.1, .08, .2, 10), '#FFFFFF', [-.3, .93, -1])); laptop(sc, [.3, .83, -1]);
      anim = t => { orbit(cam, lerp(-20, 20, seg(t, 0, 12)), 2.3, 5.4, [0, 1.2, -1]); A.pose(t, { talk: Math.sin(t * 1.5) > 0 }); B.pose(t, { talk: Math.sin(t * 1.5) <= 0, nod: true }) } }
    if (LOC === 'wait') { room(sc, { wall: '#4C5F7C', wall2: '#435570', floor: '#6B5A4A', window: true, night: true }); sc.add(mesh(G.box(3, .5, 2), '#3D4F7A', [0, .25, -1.8])); const S = staf([0, .5, -1.4]); sc.add(S); const C = clock3(sc, [-1.8, 3.2, -3.85]);
      const ph = phone(sc, [1, 1.2, -.6], phoneTex([['HRD', 'Terima kasih, kami akan menghubungi Anda.', '14.02']], 1, { title: 'HRD', clock: '14.02' })); ph.rotation.y = -.4;
      anim = (t, dur) => { const h = 9 + t * 1.6; C.userData.h.rotation.z = -(h % 12) / 12 * Math.PI * 2; C.userData.m.rotation.z = -(h % 1) * Math.PI * 2; cam.position.set(1.6, 2.4, 4.6 - t * .04); cam.lookAt(0, 1.3, -1.2); S.pose(t, { hold: true, look: Math.sin(t * .8) * .4 }) } }
    const card = X.ab({ left: 60, top: 260, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '26px', padding: '18px 26px', fontFamily: 'Poppins', color: INK, boxShadow: `0 10px 0 ${ORANGE}` }, root,
      `<div style="font-size:32px;font-weight:700;color:#7A8594">KAMUS HRD #${k + 1}</div><div style="font-size:52px;font-weight:800;line-height:1.1">“${phr}”</div>`);
    const a1 = X.ab({ left: 60, top: 500, width: 960, fontFamily: 'Poppins', fontWeight: 700, fontSize: '38px', color: '#fff', background: ORANGE, borderRadius: '18px', padding: '12px 22px', opacity: 0 }, root, `bisa berarti: ${arti}`);
    const a2 = X.ab({ left: 60, top: 620, width: 960, fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#fff', background: BLUE, borderRadius: '18px', padding: '12px 22px', opacity: 0 }, root, `tanya ini: ${tanya}`);
    return { scene: sc, cam, upd(t, dur) { anim(t, dur); X.pop(card, seg(t, .1, .5)); const ta = at(s, 'bisa berarti', 2), tq = at(s, 'tanya', dur * .55); X.pop(a1, seg(t, ta, ta + .4)); X.pop(a2, seg(t, tq, tq + .4)) } };
  },
  // ===== ep008 (Full POV Staf: hari pertama "pelajari sendiri ya") =====
  M_DAY1(s, root) {   // open space pagi: bos melintas cepat ke ruang meeting, staf mematung di depan meja kosong (over-the-shoulder)
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.2, sunPos: [-6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#E9EEF4', wall2: '#D8E0EA', floor: '#B8C2CE', window: true });
    const glass = group(sc, [3.2, 0, -2.4]); glass.add(mesh(G.box(3, 3, .06), '#BFE6FF', [0, 1.5, 1.4], { mat: { transparent: true, opacity: .35 }, cast: false })); glass.add(mesh(G.box(2.6, .08, 1.1), '#E7DCCB', [0, .78, 0]));
    for (let i = 0; i < 3; i++) { const d = desk(sc, [-2.6 + i * 2.4, 0, -2.6]); if (i !== 1) { laptop(sc, [-2.6 + i * 2.4, .82, -2.6]); const P = staf([-2.6 + i * 2.4, 0, -3.3], { body: ['#B9C6D4', '#A9C7A4', '#E3B6C2'][i] }); sc.add(P) } }
    const S = staf([-.2, 0, 1.4]); sc.add(S); S.rotation.y = Math.PI; const B = bos([-4, 0, -.6]); sc.add(B); B.rotation.y = Math.PI / 2;
    const ph = mesh(G.box(.12, .22, .02), '#111', [0, -.6, .1]); B.userData.st.arms[1].add(ph);
    const cam = camera(42);
    const bub = X.ab({ left: 0, top: 0, background: ORANGE, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '10px 22px', borderRadius: '26px 26px 26px 6px', opacity: 0, whiteSpace: 'nowrap' }, root, '"Pelajari sendiri ya!"');
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '52px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Hari pertama kerja.<br><span style="color:${ORANGE}">"Pelajari sendiri ya."</span> Udah.`);
    return { scene: sc, cam, upd(t, dur) {
      const w = seg(t, 0, 3.2); B.position.set(lerp(-4, 3.2, w), 0, lerp(-.6, -1.6, w)); B.pose(t, { walk: w < 1 ? 1.4 : 0, hold: true, talk: t < 2.4, look: t < 2 ? .9 : 0 }); B.visible = w < .98;
      bub.style.left = '330px'; bub.style.top = '300px'; X.pop(bub, t < 3.2 ? seg(t, .1, .4) : 0);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.6, -.8, p), lerp(3.6, 3.2, p), lerp(7.6, 6.4, p)); cam.lookAt(lerp(.4, 0, p), lerp(1.1, .9, p), -2.2);
      S.pose(t, { look: t < 2.8 ? Math.sin(t * .8) * .5 : 0, shake: t > dur * .7 }); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 4.5 ? 'none' : 'block';
    } };
  },
  M_FOLDER(s, root) {   // POV laptop: jendela folder, ikon file berjatuhan sampai 200, kamera dorong masuk ke layar
    const sc = newScene({ bg: '#C9D4E2', hemi: 1.1, sunPos: [-5, 10, 6], sun: '#FFF4E0' }); room(sc, { wall: '#DDE4EC', floor: '#9AA6B4' }); desk(sc, [0, 0, -1.2], 3);
    const lp = group(sc, [0, .82, -1.2]); lp.add(mesh(G.box(2.2, .06, 1.4), '#B0B7BF', [0, 0, 0])); lp.add(mesh(G.box(2.2, 1.4, .06), '#2A2F36', [0, .72, -.68]));
    const c = document.createElement('canvas'); c.width = 1024; c.height = 640; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const names = ['panduan_2024', 'laporan_Q3', 'FINAL_revisi3', 'SOP_lama', 'notulen', 'data_mentah', 'jangan_dihapus', 'final_FINAL', 'template_v2', 'arsip'];
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#F4F6F9'; x.fillRect(0, 0, 1024, 640); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 1024, 70); x.fillStyle = '#fff'; x.font = '700 38px Poppins'; x.fillText(`📁 Bahan_Pelajari  (${n} file)`, 24, 48);
      for (let i = 0; i < Math.min(n, 60); i++) { const cx = 30 + (i % 10) * 99, cy = 100 + Math.floor(i / 10) * 88; x.fillStyle = ['#E8C547', '#6C8CB0', '#E07B39', '#8DBF7A'][i % 4]; x.fillRect(cx, cy, 56, 46); x.fillStyle = '#1E2A38'; x.font = '500 13px Poppins'; x.fillText(names[i % 10].slice(0, 12), cx - 4, cy + 66) } tex.needsUpdate = true };
    draw(0); const scr = new THREE.Mesh(G.plane(2.06, 1.28), new THREE.MeshBasicMaterial({ map: tex })); scr.position.set(0, .72, -.64); lp.add(scr);
    const mug = mesh(G.cyl(.14, .12, .3, 12), '#FFFFFF', [1.3, 1, -.9]); sc.add(mug); const S = staf([0, 0, .6]); sc.add(S); S.rotation.y = Math.PI;
    const cam = camera(42); const cnt = X.ab({ left: 0, top: 300, width: 1080, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '110px', color: '#fff', WebkitTextStroke: `14px ${INK}`, paintOrder: 'stroke fill', opacity: 0 }, root);
    const c2 = chip(root, '📄 final_revisi3 (yang mana??)', { left: 140, top: 470, fontSize: '40px' }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const td = at(s, 'dua ratus', 1.5); const n = Math.round(200 * E.inout(seg(t, td, td + 2.2))); draw(n); cnt.textContent = `${n} file`; cnt.style.opacity = t > td ? 1 : 0;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.4, .3, p), lerp(2.6, 2.1, p), lerp(2.8, 1.3, p)); cam.lookAt(0, 1.45, -1.9);
      S.pose(t, { shake: t > dur * .75 }); const tf = at(s, 'final revisi', dur * .6); X.pop(c2, seg(t, tf, tf + .4));
    } };
  },
  M_BANGKU(s, root) {   // taman kantor siang: staf makan sendirian di bangku, senior ber-headset sibuk di HP
    const sc = newScene({ sky: ['#9FD3F0', '#EAF6FF'], hemi: 1.3, sun: '#FFF4E0', sunPos: [-8, 12, 6], shadow: 12 }); sc.add(mesh(G.box(30, .2, 20), '#8BC34A', [0, -.1, 0]));
    sc.add(mesh(G.box(30, 8, 1), '#D8DEE6', [0, 4, -7])); for (let r = 0; r < 3; r++) for (let i = 0; i < 8; i++) sc.add(mesh(G.box(1.6, 1.2, .05), '#BFE6FF', [-12 + i * 3.4, 1.8 + r * 2, -6.47], { mat: { emissive: '#DFF2FF', emissiveIntensity: .4 }, cast: false }));
    [[-5, -3], [4.5, -3.5], [-3, 3], [6, 2]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.4 + i * .1, ['#4E8F3A', '#6BA34A'][i % 2]));
    const bn = group(sc, [0, 0, -1]); bn.add(mesh(G.box(3.4, .1, .7), '#9C6B3E', [0, .5, 0])); bn.add(mesh(G.box(3.4, .6, .08), '#9C6B3E', [0, .85, -.32])); [-1.5, 1.5].forEach(x => bn.add(mesh(G.box(.1, .5, .6), '#555', [x, .25, 0])));
    const S = staf([-.8, .05, -.85]); sc.add(S); const box = mesh(G.box(.4, .12, .3), '#E8A33D', [0, -.45, .28]); S.userData.st.arms[1].add(box);
    const R = staf([.9, .05, -.85], { body: '#5A6B7C', hair: '#1E1410' }); sc.add(R); const hs = group(R.userData.st.head, [0, 0, 0]); hs.add(mesh(G.box(.86, .08, .1), '#222', [0, .36, 0])); [-1, 1].forEach(i => hs.add(mesh(G.box(.1, .26, .24), '#222', [i * .4, 0, 0])));
    const rp = mesh(G.box(.12, .22, .02), '#111', [0, -.6, .12]); R.userData.st.arms[1].add(rp);
    [S, R].forEach(P => P.userData.st.legs.forEach(L => L.rotation.x = -1.4));
    const cam = camera(42); const th = X.ab({ left: 0, top: 0, background: CARD, border: `5px solid ${INK}`, borderRadius: '30px', padding: '8px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: INK, opacity: 0, whiteSpace: 'nowrap' }, root, '💭 mau nanya… takut ganggu');
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-28, 12, p), 2.2, lerp(7.4, 6.2, p), [0, 1.1, -1]);
      S.pose(t, { hold: true, look: t > dur * .5 ? -1 : 0 }); S.userData.st.legs.forEach(L => L.rotation.x = -1.4); R.pose(t, { hold: true, nod: true }); R.userData.st.legs.forEach(L => L.rotation.x = -1.4);
      const tg = at(s, 'takut', dur - 2.5); const [x, y] = X.proj(S, cam, [0, 2.4, 0]); th.style.left = (x - 180) + 'px'; th.style.top = (y - 70) + 'px'; X.pop(th, seg(t, tg - .6, tg - .2));
    } };
  },
  M_ARSIP(s, root) {   // lorong rak arsip: tiga kartu cara muncul di rak, admin lantai menunjuk arah
    const v = X.TL.vars; const sc = newScene({ bg: '#E4E9EF', hemi: 1.2, sunPos: [3, 12, 6], sun: '#FFF4E0', shadow: 12 }); sc.add(mesh(G.box(12, .2, 16), '#A9B4C2', [0, -.1, 0]));
    for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 4; i++) { const sh = group(sc, [side * 2.2, 0, -5 + i * 2.4]); sh.add(mesh(G.box(.8, 3.4, 2), '#7A8594', [0, 1.7, 0])); for (let k = 0; k < 4; k++) for (let j = 0; j < 5; j++) sh.add(mesh(G.box(.5, .6, .3), ['#E8C547', '#6C8CB0', '#E07B39', '#8DBF7A', '#D9DEE4'][(i + j + k) % 5], [side * -.2, .5 + k * .8, -.75 + j * .38])) }
    for (let i = 0; i < 4; i++) sc.add(mesh(G.box(1.2, .06, .3), '#FFFFFF', [0, 4, -5 + i * 2.4], { mat: { emissive: '#FFFFFF', emissiveIntensity: 1 }, cast: false }));
    const S = staf([-.3, 0, 2.6]); sc.add(S); S.rotation.y = Math.PI; const A = staf([.6, 0, -1.4], { body: '#C2457A', hair: '#1E1410', glasses: true }); sc.add(A);
    const cards = v.tips.map(([ic, h, d], i) => X.ab({ left: 70, top: 300 + i * 130, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '12px 24px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 8px 0 ${[BLUE, ORANGE, '#5E9C4A'][i]}`, opacity: 0 }, root, `${ic} ${i + 1}. ${h} <span style="font-weight:600;font-size:32px;color:#6B7684">· ${d}</span>`));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, .2, p), lerp(3, 3.2, p), lerp(9.4, 7.2, p)); cam.lookAt(lerp(0, .3, p), 1.2, -1.4);
      const tl = at(s, 'paling lama', dur * .5); S.pose(t, { walk: t < tl ? .6 : 0, talk: t > tl }); S.position.z = lerp(2.6, 1, seg(t, 0, tl)); A.pose(t, { point: t > tl && t < tl + 2, talk: t > tl, look: t > tl ? .3 : 0 });
      v.tip_cues.forEach((cu, i) => { const tc = at(s, cu, 2 + i * 4); X.pop(cards[i], seg(t, tc, tc + .4)) });
    } };
  },
  M_BOSROOM(s, root) {   // ruang bos sore (oranye hangat): staf menyerahkan satu lembar, bos membaca, mengangguk; tumpukan kerja bos terlihat
    const sc = newScene({ sky: ['#F7A35C', '#FFE2B8'], hemi: 1.2, hemiSky: '#FFE9D2', sun: '#FFC58A', sunI: 2.2, sunPos: [-7, 6, 6] }); room(sc, { wall: '#F2DCC2', wall2: '#E8CFB2', floor: '#8C6E55' });
    sc.add(mesh(G.box(3.4, 2.2, .05), '#FFB36B', [1.6, 3.2, -3.88], { mat: { emissive: '#FF9F4A', emissiveIntensity: .8 }, cast: false }));
    desk(sc, [0, 0, -1.6], 3); laptop(sc, [.6, .82, -1.7], '#F2C58A'); for (let i = 0; i < 7; i++) sc.add(mesh(G.box(.5, .1, .7), ['#FFFFFF', '#F4E9D8'][i % 2], [-1, .87 + i * .1, -1.6], { rot: [0, (i % 3) * .1, 0] }));
    const B = bos([0, 0, -2.5]); sc.add(B); const S = staf([-.9, 0, -.3]); sc.add(S); S.rotation.y = Math.PI * .85;
    const paper = mesh(G.box(.3, .4, .01), '#FFFFFF', [0, 0, 0], { cast: false }); sc.add(paper);
    const cam = camera(42); const q1 = chip(root, '📄 ringkasan 1 halaman + 5 pertanyaan', { left: 80, top: 300, fontSize: '38px' }, BLUE);
    const say = X.ab({ left: 0, top: 0, background: ORANGE, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '42px', padding: '10px 24px', borderRadius: '26px 26px 6px 26px', opacity: 0, whiteSpace: 'nowrap' }, root, '"Ini yang saya butuh."');
    const c3 = chip(root, 'ternyata bos juga kewalahan 😮‍💨', { left: 160, top: 410, fontSize: '38px' }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const tk = at(s, 'ringkasan', 2.5), tb = at(s, 'ini yang', dur * .65), tw = at(s, 'kewalahan', dur - 1.5); const g = E.inout(seg(t, tk, tk + 1.2));
      paper.position.set(lerp(-.6, 0, g), lerp(1.2, 1.4, g), lerp(-.6, -2.1, g)); paper.rotation.set(-.4, 0, 0);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(4.6, 3.8, p), lerp(3.4, 3, p), lerp(5, 4.2, p)); cam.lookAt(lerp(-.5, -.6, p), 1.1, -1.6);
      S.pose(t, { hold: g > 0 && g < 1, talk: t > tk && t < tk + 2 }); B.pose(t, { hold: g >= 1, nod: t > tb, talk: t > tb && t < tb + 1.5, look: t < tb ? -.2 : 0 });
      say.style.left = '250px'; say.style.top = '520px'; X.pop(say, seg(t, tb, tb + .4));
      X.pop(q1, t < tb ? seg(t, tk, tk + .4) : 0); X.pop(c3, seg(t, tw, tw + .4));
    } };
  },
  M_NEWBIE(s, root) {   // lobi bulan kedua: anak baru bawa kardus, bos lewat, staf menghampiri; pertanyaan penutup
    const sc = newScene({ bg: '#DFF0F8', hemi: 1.3, sunPos: [6, 10, 8], sun: '#FFF4E0' }); room(sc, { wall: '#EAF2F8', wall2: '#DCE8F0', floor: '#C2CCD6', window: true });
    sc.add(mesh(G.box(3, .9, 1), '#2E5E8C', [-2.6, .45, -2.6])); sc.add(mesh(G.box(3.1, .08, 1.1), '#E7DCCB', [-2.6, .94, -2.6])); [[3.6, -3], [-4.2, 1]].forEach(([x, z]) => { sc.add(mesh(G.cyl(.3, .25, .5, 10), '#C9935E', [x, .25, z])); sc.add(mesh(G.ico(.55, 0), '#5E9C4A', [x, 1, z])) });
    const Nw = staf([1.2, 0, -.4], { body: '#F2C14E', hair: '#3A2410' }); sc.add(Nw); const bx = mesh(G.box(.6, .45, .45), '#C9935E', [0, -.2, .35]); Nw.userData.st.arms[1].add(bx); Nw.rotation.y = -.3;
    const S = staf([-3, 0, 1.2]); sc.add(S); const B = bos([4, 0, -1.8]); sc.add(B); B.rotation.y = -Math.PI / 2;
    const cam = camera(42); const bb = X.ab({ left: 0, top: 0, background: ORANGE, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '36px', padding: '8px 20px', borderRadius: '26px 26px 26px 6px', opacity: 0, whiteSpace: 'nowrap' }, root, '"Pelajari sendiri ya!"');
    const sb = X.ab({ left: 0, top: 0, background: BLUE, color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '10px 22px', borderRadius: '26px 26px 6px 26px', opacity: 0, whiteSpace: 'nowrap' }, root, '"Sini, gue temenin."');
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '46px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Hari pertama lo dulu <span style="color:${ORANGE}">gimana?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tb = at(s, 'Bos lewat', 3), ts = at(s, 'sini', dur * .5), tq = at(s, 'Hari pertama', dur - 3);
      const wb = seg(t, tb, tb + 2.6); B.position.set(lerp(4, -4, wb), 0, -1.8); B.pose(t, { walk: wb > 0 && wb < 1 ? 1.4 : 0, talk: wb > 0 && wb < .6 }); B.visible = wb < .98;
      const ws = E.inout(seg(t, ts - 1.6, ts)); S.position.set(lerp(-3, .2, ws), 0, lerp(1.2, .1, ws)); S.rotation.y = Math.atan2(1.2 - S.position.x, -.4 - S.position.z); S.pose(t, { walk: ws > 0 && ws < 1 ? 1 : 0, wave: t > ts && t < ts + 1.2, talk: t > ts });
      Nw.pose(t, { hold: true, look: t > ts - .5 ? -.8 : Math.sin(t) * .3, nod: t > ts + .8 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.8, .8, p), lerp(3, 2.6, p), lerp(8.6, 7.2, p)); cam.lookAt(lerp(.6, .6, p), 1.2, -.4);
      let [x, y] = X.proj(B, cam, [0, 2.3, 0]); bb.style.left = (x - 180) + 'px'; bb.style.top = (y - 70) + 'px'; X.pop(bb, wb > 0 && wb < .7 ? 1 : 0);
      [x, y] = X.proj(S, cam, [0, 2.3, 0]); sb.style.left = (x - 200) + 'px'; sb.style.top = (y - 80) + 'px'; X.pop(sb, seg(t, ts, ts + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
  // ===== ep009 (Full POV Bos: grup tim ngomongin bos) =====
  M_CARCHAT(s, root) {   // mobil macet malam (lampu kota terang): HP di dasbor, chat grup masuk satu per satu
    const v = X.TL.vars; const sc = newScene({ bg: '#2A3550', hemi: 1.2, hemiSky: '#FFE9D2', hemiGround: '#4A5A7A', sunI: 1.2, sun: '#FFD9A8', sunPos: [4, 8, 6] });
    sc.add(mesh(G.box(40, .2, 40), '#3A3F4A', [0, -.1, 0])); for (let i = 0; i < 10; i++) { const h = 4 + (i * 37 % 6); sc.add(mesh(G.box(2.6, h, 2), '#3A4664', [-14 + i * 3.2, h / 2, -12], { cast: false })); for (let k = 0; k < 4; k++) sc.add(mesh(G.box(.5, .4, .05), '#FFD27A', [-14.6 + i * 3.2 + (k % 2) * .9, 1.5 + Math.floor(k / 2) * 1.5, -10.95], { mat: { emissive: '#FFC27A', emissiveIntensity: 1.2 }, cast: false })) }
    const tails = [-2, 2.6].map(x => { const g = group(sc, [x, 0, -6]); g.add(mesh(G.box(1.8, .9, 3.6), ['#7A8594', '#9CC3E6'][x > 0 ? 1 : 0], [0, .7, 0])); [-.7, .7].forEach(z => g.add(mesh(G.box(.4, .2, .05), '#FF3B30', [z, .9, 1.82], { mat: { emissive: '#FF3B30', emissiveIntensity: 2 }, cast: false }))); return g });
    const car = group(sc, [0, 0, 0]); car.add(mesh(G.box(2.4, .1, 3), '#2A2F36', [0, .9, 0])); car.add(mesh(G.box(2.4, .9, .2), '#3A3F46', [0, 1.3, -1.2])); car.add(mesh(G.box(2.3, .9, .05), '#9FC8F0', [0, 2.1, -1.4], { rot: [-.5, 0, 0], mat: { transparent: true, opacity: .25 }, cast: false }));
    car.add(mesh(G.cyl(.3, .3, .06, 16), '#222', [-.55, 1.6, -.8], { rot: [1.1, 0, 0] }));
    const B = bos([-.55, .45, .2]); car.add(B); B.rotation.y = Math.PI; B.scale.setScalar(.9);
    const tex = phoneTex(v.chat, 0, { title: 'Tim Kreatif 🔥', clock: '21.04' }); const ph = phone(car, [.4, 1.75, -1.1], tex); ph.scale.setScalar(1.4); ph.rotation.set(-.2, Math.PI + .25, 0); ph.rotation.y = .25;
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Grup tim lagi ngomongin gue.<br><span style="color:${ORANGE}">Mereka lupa gue di situ.</span>`);
    const big = X.ab({ left: 0, top: 0, width: 520, opacity: 0 }, root);
    return { scene: sc, cam, upd(t, dur) {
      tex.draw(Math.min(v.chat.length, Math.floor(seg(t, .2, at(s, 'lupa', dur - 3)) * v.chat.length + .999)));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-.2, -.3, p), lerp(2.4, 2.3, p), lerp(1.6, .7, p)); cam.lookAt(lerp(.2, .4, p), lerp(1.6, 1.75, p), -1.1);
      tails.forEach((g, i) => g.children.slice(1).forEach(l => l.material.emissiveIntensity = 1.4 + Math.sin(t * 3 + i) * .6));
      B.pose(t, { look: .4, shake: t > at(s, 'lupa', dur - 3) }); X.pop(hook, seg(t, .05, .4)); hook.style.display = t > 4.2 ? 'none' : 'block';
    } };
  },
  M_DINNER(s, root) {   // ruang makan rumah bos (oranye hangat): bos mengetik marah, istri menatap layar dan bertanya
    const sc = newScene({ bg: '#FFE7CC', hemi: 1.2, hemiSky: '#FFF1DE', sun: '#FFD3A0', sunPos: [-6, 9, 6] }); room(sc, { wall: '#F2D6B8', wall2: '#E9C9A6', floor: '#9C7A5A', window: true, night: true });
    const L = new THREE.PointLight('#FFD9A8', 14, 10); L.position.set(0, 3.6, -1); sc.add(L); sc.add(mesh(G.cone(.6, .5, 12), '#F28C28', [0, 3.8, -1], { cast: false }));
    sc.add(mesh(G.box(2.8, .1, 1.4), '#7A5230', [0, .82, -1])); [[-1.3, -.6], [1.3, -.6], [-1.3, .6], [1.3, .6]].forEach(([x, z]) => sc.add(mesh(G.box(.08, .82, .08), '#5E3E22', [x, .41, -1 + z])));
    [[-.6, '#FFFFFF'], [.6, '#FFFFFF']].forEach(([x, c]) => { sc.add(mesh(G.cyl(.3, .3, .04, 16), c, [x, .89, -1])); sc.add(mesh(G.ico(.15, 0), '#E8A33D', [x, .98, -1])) });
    const B = bos([-.6, 0, -1.9]); sc.add(B); const W = person(sc, [.6, 0, -1.9], { body: '#C2457A', hair: '#2A1A10', skin: '#D9A07A' });
    const ph = mesh(G.box(.14, .26, .02), '#111', [0, -.62, .12]); B.userData.st.arms[1].add(ph);
    const cam = camera(42); const typ = X.ab({ left: 70, top: 300, width: 940, background: '#FFFFFF', border: `5px solid ${INK}`, borderRadius: '22px', padding: '14px 22px', fontFamily: 'Poppins', fontWeight: 600, fontSize: '34px', color: INK, opacity: 0 }, root);
    const ask = X.ab({ left: 0, top: 0, background: '#C2457A', color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', padding: '10px 22px', borderRadius: '26px 26px 6px 26px', opacity: 0, whiteSpace: 'nowrap' }, root, '"Mereka salah nggak?"');
    const msg = 'Saya kerja sampai malam juga ya, kalian pikir saya santai? Mulai besok semua laporan masuk jam 7 pagi, dan';
    return { scene: sc, cam, upd(t, dur) {
      const tt = at(s, 'ngetik', 4), ta = at(s, 'nanya pelan', dur - 2.4); const n = Math.floor(msg.length * seg(t, tt - .5, ta)); typ.innerHTML = `✏️ ${msg.slice(0, n)}<span style="color:${ORANGE}">|</span>`; typ.style.opacity = t > tt - .5 ? 1 : 0;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.2, .3, p), lerp(2.7, 2.5, p), lerp(4.6, 3.8, p)); cam.lookAt(0, 1.2, -1.4);
      B.pose(t, { hold: true, shake: t > at(s, 'tersinggung', 1) && t < tt, look: t > ta ? .6 : 0 }); B.userData.st.arms[0].rotation.x = t > tt && t < ta ? -1 + Math.sin(t * 20) * .1 : 0; W.pose(t, { look: -.6, talk: t > ta });
      ask.style.left = '330px'; ask.style.top = '500px'; X.pop(ask, seg(t, ta, ta + .4));
    } };
  },
  M_BALCONY(s, root) {   // balkon apartemen malam (kota terang): bos menghapus balasan, bubble chat lama melayang dengan sebabnya
    const sc = newScene({ bg: '#2E3A5C', hemi: 1.3, hemiSky: '#E0E8FF', hemiGround: '#5A6A8A', sunI: 1.4, sun: '#DCE6FF', sunPos: [5, 9, 6], fog: ['#3A4670', 16, 50] });
    sc.add(mesh(G.box(6, .2, 3), '#8A8A92', [0, -.1, 0])); sc.add(mesh(G.box(6, .9, .08), '#BFE6F5', [0, .45, 1.45], { mat: { transparent: true, opacity: .4 } })); sc.add(mesh(G.box(6, .06, .1), '#DDD', [0, .92, 1.45]));
    for (let i = 0; i < 16; i++) { const h = 5 + (i * 41 % 12); sc.add(mesh(G.box(2.2, h, 2), '#3A4664', [-18 + i * 2.6, h / 2 - 8, -14 - (i % 3) * 3], { cast: false })); for (let k = 0; k < 6; k++) sc.add(mesh(G.box(.4, .35, .05), '#FFD27A', [-18.6 + i * 2.6 + (k % 2) * .9, h - 9 - Math.floor(k / 2) * 1.4, -12.95 - (i % 3) * 3], { mat: { emissive: '#FFC27A', emissiveIntensity: 1.2 }, cast: false })) }
    sc.add(mesh(G.ico(1.2, 2), '#FFF6D8', [5, 8, -20], { mat: { emissive: '#FFF1C2', emissiveIntensity: 1.3 }, cast: false }));
    const B = bos([0, 0, .4], { body: '#8A93A0', tie: null }); sc.add(B); B.rotation.y = Math.PI; const ph = mesh(G.box(.14, .26, .02), '#111', [0, -.62, .12]); B.userData.st.arms[1].add(ph);
    const cam = camera(42);
    const del = chip(root, '⌫ balasan dihapus', { left: 300, top: 300, fontSize: '40px' }, '#C0392B');
    const rows = [['"Revisi lagi?? udah yg ke-5"', 'briefing gue cuma 2 kalimat'], ['"chat urgent jam 9 malem"', 'gue sendiri telat dikasih tahu']].map(([a, b], i) => X.ab({ left: 60, top: 420 + i * 200, width: 960, opacity: 0 }, root,
      `<div style="display:inline-block;background:#FFFFFF;border:5px solid ${INK};border-radius:22px 22px 22px 6px;padding:10px 20px;font-family:Poppins;font-weight:700;font-size:34px;color:${INK}">${a}</div><div style="margin:8px 0 0 60px;display:inline-block;background:${ORANGE};color:#fff;border-radius:18px;padding:8px 18px;font-family:Poppins;font-weight:800;font-size:34px">↳ karena ${b}</div>`));
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, 3, p), lerp(2.2, 2.8, p), lerp(-4.6, -4, p)); cam.lookAt(lerp(-.2, -.8, p), lerp(1.2, 1, p), lerp(1, 3, p));
      B.pose(t, { hold: true, look: t > dur * .6 ? -.3 : 0, nod: t > dur * .8 }); X.pop(del, seg(t, .3, .7));
      const t1 = at(s, 'Revisi lima', 3), t2 = at(s, 'urgent', dur * .6); X.pop(rows[0], seg(t, t1, t1 + .4)); X.pop(rows[1], seg(t, t2, t2 + .4));
    } };
  },
  M_MEETING2(s, root) {   // ruang rapat pagi terang: bos berdiri di depan papan, tiga kartu perubahan ditempel, tim mengangguk
    const v = X.TL.vars; const sc = newScene({ bg: '#E4EEF7', hemi: 1.3, sunPos: [-6, 12, 8], sun: '#FFF4E0' }); room(sc, { wall: '#EEF3F8', wall2: '#DDE6EF', floor: '#A9B4C2', window: true });
    const wb = group(sc, [0, 0, -3.8]); wb.add(mesh(G.box(4.4, 2.4, .08), '#FFFFFF', [0, 2.6, 0])); wb.add(mesh(G.box(4.6, .12, .2), '#7A8594', [0, 1.35, .05]));
    const notes = v.fixes.map(([ic, h], i) => { const c = document.createElement('canvas'); c.width = 320; c.height = 320; const x = c.getContext('2d'); x.fillStyle = ['#FFE680', '#B9D8FF', '#9DE0B8'][i]; x.fillRect(0, 0, 320, 320); x.fillStyle = INK; x.textAlign = 'center'; x.font = '800 80px Poppins'; x.fillText(String(i + 1), 160, 100); x.font = '700 34px Poppins'; const ws = h.split(' '); let l = '', y = 180; ws.forEach(w => { if (x.measureText(l + w).width > 270) { x.fillText(l, 160, y); l = ''; y += 44 } l += w + ' ' }); x.fillText(l, 160, y);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(G.plane(1.15, 1.15), new THREE.MeshStandardMaterial({ map: t })); m.position.set(-1.4 + i * 1.4, 2.6, -3.74); m.rotation.z = (i - 1) * .05; sc.add(m); return m });
    sc.add(mesh(G.box(3.6, .1, 1.4), '#E7DCCB', [0, .78, -.4])); [[-1.7, -.6], [1.7, -.6], [-1.7, .6], [1.7, .6]].forEach(([x, z]) => sc.add(mesh(G.box(.06, .78, .06), '#555', [x, .39, -.4 + z * .9])));
    const team = [[-1.2, '#9CC3E6'], [0, '#E3B6C2'], [1.2, '#A9C7A4']].map(([x, c]) => { const P = staf([x, 0, .8], { body: c }); sc.add(P); P.rotation.y = Math.PI; return P });
    const B = bos([2.4, 0, -2.6]); sc.add(B); B.rotation.y = -.6;
    const cam = camera(42); const cards = v.fixes.map(([ic, h, d], i) => X.ab({ left: 70, top: 1180, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '38px', color: INK, boxShadow: `0 8px 0 ${ORANGE}`, opacity: 0 }, root, `${ic} ${h} <span style="font-weight:600;font-size:30px;color:#6B7684">· ${d}</span>`));
    return { scene: sc, cam, upd(t, dur) {
      const tc = v.fix_cues.map((cu, i) => at(s, cu, 2 + i * 4));
      notes.forEach((m, i) => m.scale.setScalar(Math.max(.001, E.back(seg(t, tc[i], tc[i] + .4)))));
      cards.forEach((e, i) => X.pop(e, t >= tc[i] && (i === 2 || t < tc[i + 1]) ? seg(t, tc[i], tc[i] + .4) : 0));
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.6, 1.2, p), lerp(4.2, 3.8, p), lerp(8.4, 7.6, p)); cam.lookAt(lerp(-.2, .5, p), 1.7, -2.6);
      B.pose(t, { talk: true, point: tc.some(x => t > x && t < x + 1) }); team.forEach((P, i) => P.pose(t + i, { nod: t > tc[2] + 1, look: Math.sin(t * .4 + i) * .2 }));
    } };
  },
  M_PANTRY2(s, root) {   // pantry sore sebulan kemudian: tim ketawa bareng bos, HP grup soal makan siang; pertanyaan penutup
    const sc = newScene({ bg: '#FFE9D2', hemi: 1.3, sun: '#FFD3A0', sunPos: [-6, 8, 6] }); room(sc, { wall: '#F8E4CC', wall2: '#F0D6B6', floor: '#B08A64', window: true });
    sc.add(mesh(G.box(5, .9, .9), '#2E5E8C', [0, .45, -3.4])); sc.add(mesh(G.box(5, .06, .95), '#E7DCCB', [0, .92, -3.4])); sc.add(mesh(G.box(.6, .7, .45), '#3A3A40', [-1.6, 1.3, -3.5]));
    sc.add(mesh(G.cyl(1, 1, .08, 20), '#F4E4CC', [0, .82, -.9])); sc.add(mesh(G.cyl(.08, .12, .8, 8), '#3A2A1E', [0, .4, -.9])); [-.4, .3, .1].forEach((x, i) => sc.add(mesh(G.box(.5, .12, .35), ['#E8A33D', '#E5484D', '#2E9C6A'][i], [x, .92, -.9 + (i - 1) * .3])));
    const B = bos([1.3, 0, -.4], { tie: null }); sc.add(B); B.rotation.y = -1.6; const team = [[-1.3, -.4, '#9CC3E6'], [-.4, .6, '#E3B6C2'], [.6, .7, '#A9C7A4']].map(([x, z, c], i) => { const P = staf([x, 0, z], { body: c }); sc.add(P); P.rotation.y = Math.atan2(-x, -.9 - z); return P });
    const tex = phoneTex([['Rani', 'siang ini makan apa? 🍜', '11.58'], ['Bos', 'saya traktir, pilih ya', '11.59'], ['Dodi', 'BOS TERBAIK 🙌', '11.59']], 3, { title: 'Tim Kreatif 🔥', clock: '11.59' });
    const cam = camera(42); const ph = phone(sc, [-1.9, 2.3, .6], tex); ph.scale.setScalar(1.3); ph.rotation.y = .5;
    const c1 = chip(root, 'revisi: 5× → <span style="color:#2E7D32">1×</span>', { left: 300, top: 300, fontSize: '50px' });
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Pernah ngomongin bos<br><span style="color:${ORANGE}">di grup yang ada bosnya?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-30, 12, p), 2.4, lerp(8.4, 7.4, p), [-.4, 1.4, -.4]); ph.position.y = 2.2 + Math.sin(t * 1.4) * .06;
      B.pose(t, { talk: Math.sin(t * 1.2) > 0, cheer: t > dur * .45 && t < dur * .45 + 1 }); team.forEach((P, i) => P.pose(t + i, { bounce: true, talk: Math.sin(t * 1.2 + i) < 0 }));
      X.pop(c1, seg(t, .6, 1)); const tq = at(s, 'Lo pernah', dur - 3); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
  // ===== ep010 (Hari 1 vs Bulan ke-6) =====
  M_ALARM(s, root) {   // kamar kos subuh: Hari 1 staf rapi berdiri sebelum alarm -> Bulan 6 tergulung selimut, alarm bergetar
    const sc = newScene({ bg: '#DCE6F2', hemi: 1.2, hemiSky: '#FFF1DE', sun: '#FFE2C2', sunI: 1.8, sunPos: [-6, 8, 6] }); room(sc, { wall: '#C9D6E6', wall2: '#BCCADC', floor: '#8C6E55', window: true });
    sc.add(mesh(G.box(3, .5, 2), '#3D4F7A', [-1.4, .25, -2.2])); sc.add(mesh(G.box(3.1, .22, 2.1), '#F4F1EA', [-1.4, .6, -2.2])); sc.add(mesh(G.box(.8, .25, 1.6), '#FFFFFF', [-2.6, .8, -2.2]));
    const blanket = mesh(G.box(1.9, .5, 1.6), '#6C8CB0', [-.8, .9, -2.2]); sc.add(blanket); blanket.visible = false;
    sc.add(mesh(G.box(.8, .6, .6), '#9C6B3E', [.6, .3, -3])); const al = group(sc, [.6, .75, -2.9]); al.add(mesh(G.cyl(.22, .22, .14, 16), '#E5484D', [0, .2, 0], { rot: [Math.PI / 2, 0, 0] })); al.add(mesh(G.cyl(.17, .17, .02, 16), '#FFFFFF', [0, .2, .08], { rot: [Math.PI / 2, 0, 0], cast: false })); [-1, 1].forEach(i => al.add(mesh(G.sph(.07, 8, 6), '#C0392B', [i * .15, .38, 0])));
    const S = staf([1.1, 0, -1], { body: '#FFFFFF', tie: '#2E5E8C' }); sc.add(S); S.rotation.y = -.4; const sleep = group(sc, [-2.3, 1.05, -2.2]); sleep.add(mesh(G.ico(.36, 1), '#D9A07A', [0, 0, 0])); sleep.add(mesh(G.ico(.38, 1), '#2A1A10', [-.08, .1, 0], { s: [1, .8, 1] })); sleep.visible = false;
    const cam = camera(42);
    const lab = X.ab({ left: 330, top: 300, padding: '8px 30px', borderRadius: '20px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '64px', color: '#fff' }, root);
    const clk = X.ab({ left: 330, top: 410, padding: '4px 26px', borderRadius: '16px', background: INK, fontFamily: 'Poppins', fontWeight: 800, fontSize: '60px', color: '#7FE0A8' }, root);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontSize: '50px', lineHeight: 1.12, color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}` }, root, `Hari 1: bangun sebelum alarm.<br><span style="color:${ORANGE}">Bulan ke-6: ...</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const t6 = at(s, 'Bulan keenam', dur * .45); const six = t > t6;
      lab.textContent = six ? 'BULAN KE-6' : 'HARI 1'; lab.style.background = six ? ORANGE : BLUE; clk.textContent = six ? '07.12 ⏰×3' : '05.30'; clk.style.color = six ? '#FF6B6B' : '#7FE0A8';
      S.visible = !six; blanket.visible = six; sleep.visible = six; blanket.scale.y = 1 + Math.sin(t * 2) * .05; al.rotation.z = six ? Math.sin(t * 40) * .15 : 0; al.position.y = .75 + (six ? Math.abs(Math.sin(t * 30)) * .04 : 0);
      sc.background.set(six ? '#B9C6D8' : '#DCE6F2'); S.pose(t, { cheer: t < 1.6, nod: t > 1.6 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.8, 1.6, p), lerp(3.2, 2.8, p), lerp(6.6, 5.4, p)); cam.lookAt(lerp(.2, -.4, p), 1, -2.2);
      X.pop(hook, seg(t, .05, .4)); hook.style.display = t > t6 - .3 ? 'none' : 'block';
    } };
  },
  M_DESK6(s, root) {   // meja kerja dari atas serong: rapi + tanaman segar -> berantakan, gelas kopi menumpuk, tanaman layu, notifikasi menumpuk
    const sc = newScene({ bg: '#DCE3EC', hemi: 1.2, sunPos: [-4, 12, 6], sun: '#FFF4E0' }); sc.add(mesh(G.box(8, .3, 5), '#E7DCCB', [0, -.15, 0]));
    const lp = group(sc, [0, 0, -.8]); lp.add(mesh(G.box(1.6, .06, 1.1), '#B0B7BF', [0, .03, 0])); lp.add(mesh(G.box(1.6, 1, .05), '#2A2F36', [0, .55, -.55], { rot: [-.2, 0, 0] })); const scr = mesh(G.box(1.5, .9, .01), '#9CC3E6', [0, .55, -.52], { rot: [-.2, 0, 0], mat: { emissive: '#9CC3E6', emissiveIntensity: .8 }, cast: false }); lp.add(scr);
    const pot = group(sc, [-1.25, 0, -.5]); pot.add(mesh(G.cyl(.25, .2, .35, 12), '#C9935E', [0, .17, 0])); const leaf = group(pot, [0, .35, 0]); [0, 1, 2, 3, 4].forEach(i => leaf.add(mesh(G.box(.08, .5, .2), '#4E8F3A', [Math.sin(i * 1.3) * .1, .25, Math.cos(i * 1.3) * .1], { rot: [Math.cos(i * 1.3) * .4, 0, Math.sin(i * 1.3) * .4] })));
    const mess = []; for (let i = 0; i < 9; i++) { const m = i < 4 ? mesh(G.cyl(.12, .1, .3, 10), '#FFFFFF', [1.2 + (i % 2) * .3, .15, -.4 + Math.floor(i / 2) * .3]) : mesh(G.box(.5, .02, .7), ['#FFFFFF', '#F4E9D8', '#FFE680'][i % 3], [-1 + (i - 4) * .35, .02 + (i - 4) * .02, .8], { rot: [0, i, 0] }); sc.add(m); mess.push(m) }
    const pen = group(sc, [1.4, 0, .6]); pen.add(mesh(G.box(.5, .02, .7), '#FFFFFF', [0, .01, 0])); [0, 1, 2].forEach(i => pen.add(mesh(G.box(.4, .01, .04), INK, [0, .03, -.2 + i * .15], { cast: false })));
    const cam = camera(42); const lab = X.ab({ left: 330, top: 300, padding: '8px 30px', borderRadius: '20px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '64px', color: '#fff' }, root);
    const n1 = chip(root, '💬 dibales < 5 menit', { left: 220, top: 420, fontSize: '42px' }, BLUE), n6 = chip(root, '💬 47 chat belum dibales', { left: 200, top: 420, fontSize: '42px' }, '#C0392B');
    return { scene: sc, cam, upd(t, dur) {
      const t6 = at(s, 'Bulan keenam', dur * .5); const six = t > t6, q = E.inout(seg(t, t6, t6 + 1.2));
      lab.textContent = six ? 'BULAN KE-6' : 'HARI 1'; lab.style.background = six ? ORANGE : BLUE;
      leaf.rotation.z = q * .9; leaf.children.forEach(l => l.material = mat(q > .5 ? '#9A8A4A' : '#4E8F3A')); leaf.scale.y = 1 - q * .4;
      mess.forEach((m, i) => { const k = E.back(seg(t, t6 + i * .1, t6 + i * .1 + .3)); m.visible = k > 0; m.scale.setScalar(Math.max(.001, k)) }); pen.visible = !six;
      scr.material = mat(six ? '#F28C28' : '#9CC3E6', { emissive: six ? '#F28C28' : '#9CC3E6', emissiveIntensity: .8 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(Math.sin(t * .2) * .6, lerp(5.6, 6, p), lerp(5.2, 4.6, p)); cam.lookAt(0, .2, -.1);
      X.pop(n1, !six ? seg(t, 1.5, 1.9) : 0); X.pop(n6, seg(t, t6 + 1, t6 + 1.4));
    } };
  },
  M_ONLINE(s, root) {   // ruang tamu kos: laptop rapat online, kotak wajah; Hari 1 angkat tangan + nyatet -> Bulan 6 kotak hitam, rebahan di sofa
    const sc = newScene({ bg: '#E9E2D8', hemi: 1.2, hemiSky: '#FFF4E6', sun: '#FFE2C2', sunPos: [-6, 9, 6] }); room(sc, { wall: '#EAD9C6', wall2: '#E0CCB4', floor: '#A8835E', window: true });
    sc.add(mesh(G.box(3.4, .5, 1.2), '#6C8CB0', [-1.8, .25, -2.8])); sc.add(mesh(G.box(3.4, 1, .3), '#6C8CB0', [-1.8, .75, -3.3]));
    sc.add(mesh(G.box(1.8, .08, 1), '#9C6B3E', [1.4, .7, -1.4])); [[-.8, -.4], [.8, -.4], [-.8, .4], [.8, .4]].forEach(([x, z]) => sc.add(mesh(G.box(.06, .7, .06), '#5E3E22', [1.4 + x, .35, -1.4 + z])));
    const c = document.createElement('canvas'); c.width = 512; c.height = 320; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = six => { if (six === last) return; last = six; x.fillStyle = '#1E2A38'; x.fillRect(0, 0, 512, 320); for (let i = 0; i < 6; i++) { const cx = 10 + (i % 3) * 167, cy = 10 + Math.floor(i / 3) * 150; const me = i === 4; x.fillStyle = me && six ? '#111' : ['#9CC3E6', '#E3B6C2', '#A9C7A4', '#F2C14E', '#6C8CB0', '#C9935E'][i]; x.fillRect(cx, cy, 157, 140);
      if (me) { x.fillStyle = '#fff'; x.font = '700 22px Poppins'; x.fillText(six ? '🔇 📷✖ Kamu' : '✋ Kamu', cx + 8, cy + 128) } else { x.fillStyle = '#E9B98F'; x.beginPath(); x.arc(cx + 78, cy + 62, 34, 0, 7); x.fill() } } tex.needsUpdate = true };
    draw(false); const lp = group(sc, [1.4, .74, -1.5]); lp.add(mesh(G.box(1.1, .04, .7), '#B0B7BF', [0, 0, 0])); lp.add(mesh(G.box(1.1, .72, .04), '#2A2F36', [0, .38, -.35])); const scr = new THREE.Mesh(G.plane(1.02, .64), new THREE.MeshBasicMaterial({ map: tex })); scr.position.set(0, .38, -.32); lp.add(scr);
    const S = staf([1.4, 0, -.5]); sc.add(S); S.rotation.y = Math.PI; const book = mesh(G.box(.5, .03, .35), '#FFFFFF', [1.1, .76, -1.1]); sc.add(book);
    const cam = camera(42); const lab = X.ab({ left: 330, top: 300, padding: '8px 30px', borderRadius: '20px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '64px', color: '#fff' }, root);
    const off = chip(root, '🔇 📷 💤 semua mati', { left: 250, top: 420, fontSize: '44px' }, '#C0392B');
    return { scene: sc, cam, upd(t, dur) {
      const t6 = at(s, 'Bulan keenam', dur * .55); const six = t > t6; draw(six); lab.textContent = six ? 'BULAN KE-6' : 'HARI 1'; lab.style.background = six ? ORANGE : BLUE;
      if (six) { S.position.set(-.6, .9, -2.75); S.rotation.set(0, 0, Math.PI / 2 - .1); book.visible = false } else { S.position.set(1.4, 0, -.5); S.rotation.set(0, Math.PI, 0); book.visible = true }
      S.pose(t, { wave: !six && t > 2 && t < 4, hold: !six }); if (!six && t < 2) S.userData.st.arms[1].rotation.x = -1 + Math.sin(t * 16) * .15;
      const p = E.inout(seg(t, 0, t6)); if (!six) { cam.position.set(lerp(-1.2, -.6, p), lerp(2.8, 3, p), lerp(3.8, 4.2, p)); cam.lookAt(1.2, 1.1, -1.8) } else { const k = seg(t, t6, dur); cam.position.set(lerp(1.6, 1, k), 2.8, lerp(3.6, 3, k)); cam.lookAt(-1.4, .8, -2.8) }
      X.pop(off, seg(t, t6 + .8, t6 + 1.2));
    } };
  },
  M_ROOFTOP(s, root) {   // atap gedung sore: staf duduk di tepi, tiga beban (kotak) jatuh ke pundaknya satu per satu sesuai penyebab
    const v = X.TL.vars; const sc = newScene({ sky: ['#F7A35C', '#FFE2B8'], hemi: 1.3, hemiSky: '#FFE9D2', sun: '#FFC58A', sunI: 2.2, sunPos: [-9, 5, 4], fog: ['#FFD9B0', 20, 60] }); sc.add(mesh(G.box(10, .3, 7), '#9AA0AA', [0, -.15, 0]));
    for (let i = 0; i < 18; i++) { const h = 3 + (i * 37 % 9); sc.add(mesh(G.box(2.4, h, 2.2), ['#D9A57A', '#C98E64', '#E8B78A', '#B9876A'][i % 4], [-20 + i * 2.6, h / 2 - 9, -14 - (i % 3) * 3], { cast: false })) }
    sc.add(mesh(G.box(1.4, 1.2, 1.2), '#7A8594', [-3, .6, -2])); sc.add(mesh(G.cyl(.5, .5, 1.6, 12), '#B5BCC5', [3.2, .8, -2.4]));
    const S = staf([0, .05, .2]); sc.add(S); S.rotation.y = Math.PI * .1; S.userData.st.legs.forEach(L => L.rotation.x = -1.4);
    sc.add(mesh(G.box(3, .5, .8), '#B5BCC5', [0, .25, .3]));
    const boxes = v.why.map(([ic], i) => { const g = group(sc, [0, 10, 0]); g.add(mesh(G.box(.6, .4, .5), ['#E8C547', '#6C8CB0', '#E07B39'][i], [0, 0, 0])); return g });
    const cam = camera(42); const cards = v.why.map(([ic, h], i) => X.ab({ left: 70, top: 300 + i * 120, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 8px 0 ${['#E8C547', BLUE, '#E07B39'][i]}`, opacity: 0 }, root, `${ic} ${i + 1}. ${h}`));
    const nl = chip(root, 'bukan karena malas', { left: 280, top: 300, fontSize: '46px' }, ORANGE);
    return { scene: sc, cam, upd(t, dur) {
      const tc = v.why_cues.map((cu, i) => at(s, cu, 3 + i * 4));
      boxes.forEach((g, i) => { const q = E.out(seg(t, tc[i], tc[i] + .5)); g.position.set(Math.sin(i * 2) * .1, lerp(8, 2.25 + i * .42, q) + .5 * 0, .2); g.rotation.y = i * .3; g.visible = t > tc[i] - .1 });
      S.pose(t, { look: .2 }); S.userData.st.legs.forEach(L => L.rotation.x = -1.4); S.position.y = .05 - (t > tc[2] ? .05 : 0); S.userData.st.head.rotation.x = t > tc[1] ? .3 : 0;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-3.4, 2.4, p), lerp(2.6, 3, p), lerp(6.4, 6.8, p)); cam.lookAt(0, 1.6, 0);
      X.pop(nl, t < tc[0] ? seg(t, .3, .7) : 0); cards.forEach((e, i) => X.pop(e, seg(t, tc[i], tc[i] + .4)));
    } };
  },
  M_WARKOP(s, root) {   // warung kopi dekat kantor pagi: staf dan bos ngobrol 15 menit, papan tiga langkah, pertanyaan penutup
    const v = X.TL.vars; const sc = newScene({ sky: ['#FFD9A0', '#FFF6E6'], hemi: 1.3, sun: '#FFF4E0', sunPos: [-7, 10, 7], shadow: 12 }); sc.add(mesh(G.box(20, .2, 14), '#B9A88E', [0, -.1, 0]));
    const st = group(sc, [0, 0, -2.6]); st.add(mesh(G.box(4.4, 1, 1.2), '#5E9C4A', [0, .5, 0])); st.add(mesh(G.box(4.8, .12, 2), '#F28C28', [0, 2.7, .3], { rot: [.18, 0, 0] })); [-2.2, 2.2].forEach(x => st.add(mesh(G.box(.1, 2.7, .1), '#5A3A20', [x, 1.35, .7])));
    for (let i = 0; i < 6; i++) st.add(mesh(G.box(.3, .4, .05), ['#E5484D', '#F2B41B', '#3E8FC4'][i % 3], [-1.8 + i * .7, 2.2, .76], { cast: false }));
    sc.add(mesh(G.box(2.6, .1, 1), '#9C6B3E', [0, .75, 0])); [[-1.2, -.4], [1.2, -.4], [-1.2, .4], [1.2, .4]].forEach(([x, z]) => sc.add(mesh(G.box(.06, .75, .06), '#5E3E22', [x, .37, z])));
    [-.5, .5].forEach(x => { sc.add(mesh(G.cyl(.1, .08, .2, 10), '#FFFFFF', [x, .9, 0])); sc.add(mesh(G.cyl(.09, .09, .02, 10), '#5A3A20', [x, 1, 0], { cast: false })) });
    const S = staf([-.9, 0, .1]); sc.add(S); S.rotation.y = Math.PI / 2; const B = bos([.9, 0, .1], { tie: null }); sc.add(B); B.rotation.y = -Math.PI / 2;
    const cam = camera(42); const tm = X.ab({ left: 380, top: 300, background: INK, color: '#7FE0A8', fontFamily: 'Poppins', fontWeight: 800, fontSize: '58px', padding: '4px 24px', borderRadius: '16px' }, root);
    const cards = v.fix.map(([ic, h], i) => X.ab({ left: 70, top: 400 + i * 116, width: 940, background: CARD, border: `5px solid ${INK}`, borderRadius: '22px', padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 8px 0 ${['#7FA8D0', ORANGE, '#E5484D'][i]}`, opacity: 0 }, root, `${ic} ${h}`));
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CARD, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '44px', color: INK, fontFamily: 'Poppins', fontWeight: 800, boxShadow: `0 10px 0 ${ORANGE}`, opacity: 0 }, root, `Lo masih <span style="color:${BLUE}">hari pertama</span>,<br>atau udah <span style="color:${ORANGE}">bulan keenam?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tc = v.fix_cues.map((cu, i) => at(s, cu, 3 + i * 4)), tq = at(s, 'Lo sekarang', dur - 3.5);
      const mm = Math.min(15, Math.floor(seg(t, tc[0], tc[0] + 3) * 15)); tm.textContent = `⏱ ${String(mm).padStart(2, '0')}:00`; tm.style.opacity = t > tc[0] && t < tq ? 1 : 0;
      cards.forEach((e, i) => X.pop(e, t < tq ? seg(t, tc[i], tc[i] + .4) : 0));
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(30, -15, p), 2.6, lerp(7.6, 6.6, p), [0, 1.2, -.3]);
      S.pose(t, { talk: Math.sin(t * 1.3) > 0, hold: true }); B.pose(t, { talk: Math.sin(t * 1.3) <= 0, nod: t > tc[2] + 2, hold: true }); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

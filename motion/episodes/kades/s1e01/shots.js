// Shot Kades S1 Ep 1 "Sinyal" (lihat STORYBOARD.md).
import { lerp, seg, E, mesh, G, group, camera, island, tree, person, miniStick, newScene } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SORE, juara, darmo, desaSepi, desaBesar, balai, bale, stasiun, BIG, show, pulse } from '../_s1/dunia.js';

const ease = (t, a, b) => E.inout(seg(t, a, b));
const MALAM = o => newScene(Object.assign({ sky: ['#0E1A3A', '#34497E'], sun: '#9FB4FF', sunPos: [-8, 12, 6], hemi: .55, sunI: .7, shadow: 18, fog: ['#22325E', 50, 200] }, o));
const PANEL = 'rgba(21,53,42,.94)';
const chip = (root, html, css = {}) => X.ab(Object.assign({ left: 60, top: 360, background: PANEL, color: '#F4EBD3', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '44px', padding: '12px 28px', borderRadius: '16px', border: '1px solid #ffffff2a', boxShadow: '0 12px 28px #0000005c', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
function bars(root, css = {}) {   // indikator sinyal HP (0-4 bar)
  const e = X.ab(Object.assign({ left: 380, top: 360, display: 'flex', alignItems: 'flex-end', gap: '10px', background: PANEL, padding: '16px 26px', borderRadius: '18px', opacity: 0, boxShadow: '0 12px 28px #0000005c' }, css), root,
    [1, 2, 3, 4].map(i => `<div style="width:26px;height:${i * 22}px;border-radius:5px;background:#55606A"></div>`).join('') + `<div style="color:#F4EBD3;font:800 40px Poppins,sans-serif;margin-left:14px">SINYAL</div>`);
  return { el: e, set: n => [...e.children].slice(0, 4).forEach((b, i) => b.style.background = i < n ? '#E8B94A' : '#55606A') };
}
const hy = (x, z) => Math.sqrt(Math.max(0, 81 - x * x - z * z)) * .42 - 1.2;   // tinggi permukaan bukit
const at3 = (x, z) => [x, hy(x, z), z];
function duduk(p, y) { p.userData.st.legs.forEach(L => { L.rotation.x = -1.45; L.userData.knee && (L.userData.knee.rotation.x = 1.45) }); p.position.y = y }
function bukit(sc) {   // bukit kelapa di pinggir desa
  const h = mesh(G.sph(9, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#7FA84E', [0, -1.2, 0], { s: [1, .42, 1], mat: { flatShading: false } }); sc.add(h);
  const kelapa = tree(sc, [0, 2.4, 0], 2.4, '#4E8F3A', 'palm'); return { kelapa };
}
function menara(parent, p) {   // menara bambu + antena bekas (tumbuh lewat scale)
  const g = group(parent, p); const B = '#C9A35A';
  [[-.7, -.7], [.7, -.7], [-.7, .7], [.7, .7]].forEach(([x, z]) => g.add(mesh(G.cyl(.07, .09, 7, 8), B, [x * (1 - .25), 3.5, z * (1 - .25)], { rot: [z * .05, 0, -x * .05] })));
  for (let y = 1; y < 7; y += 1.2) g.add(mesh(G.box(1.3, .06, .06), B, [0, y, .55])), g.add(mesh(G.box(.06, .06, 1.3), B, [.55, y, 0]));
  const ant = group(g, [0, 7.2, 0]); ant.add(mesh(G.cyl(.04, .04, 1.2, 6), '#8C9196', [0, .5, 0])); ant.add(mesh(G.sph(.45, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.2), '#D9DDE0', [0, 1.1, 0], { rot: [-.9, 0, 0], mat: { flatShading: false } }));
  const lamp = mesh(G.sph(.12, 10, 8), '#7CFF8A', [0, .9, .2], { cast: false, mat: { emissive: '#3BE060', emissiveIntensity: 1.6 } }); ant.add(lamp);
  g.userData = { ant, lamp }; return g;
}
const hp = (p, col = '#2B2B2B') => { const m = mesh(G.box(.16, .28, .03), col, [0, -.3, .1], { cast: false }); p.userData.st.arms[1].userData.elbow?.add(m); return m };

export const SHOTS = {
  K1_STASIUN(s, root) {   // frame 1: kereta mengerem masuk stasiun, perantau turun, papan 0 -> 48
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => z > -12 }); island(sc, 30, 14, '#8FB45A', '#7A5C3E'); const S = stasiun(sc, [0, 0, 0]); const V = X.TL.vars;
    const ppl = Array.from({ length: 30 }, (_, i) => { const g = group(sc, [0, -9, 0]); miniStick(g, [0, 0, 0], ['#3E86B0', '#C65B4B', '#D8A84A', '#4E8B6A', '#8E44AD', '#2E7D5B'][i % 6], ['#C98E64', '#E2A97E', '#B97A52'][i % 3]); return g });
    const J = juara([3.4, .5, .9]); sc.add(J); J.rotation.y = -1.2; const cam = camera(42); let shown = -1;
    const big = BIG(root, `+${V.pulang} PULANG`, { top: 330, fontSize: '112px' });
    return { scene: sc, cam, upd(t, dur) { S.userData.kereta.position.x = lerp(-20, -5.3, E.out(seg(t, 0, 1.3)));
      ppl.forEach((g, i) => { const d = i % 3, t0 = 1.2 + i * .07, q = seg(t, t0, t0 + 1.4); g.position.set(-4.6 + d * 4.8 + (i % 5) * .35 - .7, q > 0 ? .5 : -9, lerp(-1.9, .2 + (i % 4) * .35, E.out(q))); g.rotation.y = 0 });
      const n = Math.round(V.pulang * E.out(seg(t, 1.3, 3.6))); if (n !== shown) { S.userData.setPulang(n); shown = n }
      J.pose(t, { cheer: t > 3.4, wave: t <= 3.4 }); const p = ease(t, 0, dur); cam.position.set(lerp(7.5, 5.6, p), lerp(1.5, 1.9, p), lerp(8.5, 7.2, p)); cam.lookAt(lerp(-1, -.4, p), 1.5, -.6);
      pulse(big, seg(t, 3.4, 3.8)) } };
  },
  K1_HASIL(s, root) {   // papan dana desa naik + kartu komen
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); island(sc, 16, 12, '#8FB45A', '#7A5C3E'); balai(sc, [0, 0, -2]); const V = X.TL.vars;
    const J = juara([-1.4, 0, 1.4]); sc.add(J); J.rotation.y = .6; const cam = camera(42);
    const papan = canvasPlane(2.6, 1.4, () => { }, 600); papan.position.set(.9, 1.5, 1.2); papan.rotation.y = -.15; sc.add(papan); [-1, 1].forEach(x => sc.add(mesh(G.box(.1, 1.6, .1), '#6E4A2C', [.9 + x * 1.2, .8, 1.15])));
    const draw = v => papan.userData.redraw((x, W, H) => { x.fillStyle = '#2E4A3A'; x.fillRect(0, 0, W, H); x.strokeStyle = '#8A6A3A'; x.lineWidth = 14; x.strokeRect(0, 0, W, H); x.fillStyle = '#E9DFC2'; x.textAlign = 'center';
      x.font = `700 ${Math.round(H * .14)}px Poppins`; x.fillText('DANA DESA', W / 2, H * .3); x.fillStyle = '#E8B94A'; x.font = `800 ${Math.round(H * .22)}px Poppins`; x.fillText('Rp' + v.toLocaleString('id-ID'), W / 2, H * .7) });
    const cards = V.komen.map(([u, tx], i) => X.ab({ left: i ? 230 : 60, top: 330 + i * 190, width: 760, background: '#FBF8F0', borderRadius: '22px', padding: '16px 24px', fontFamily: 'Poppins,sans-serif', color: '#1E1E1E', boxShadow: '0 14px 30px #0000005c', opacity: 0 }, root,
      `<div style="font-size:22px;color:#7C7C7C;font-weight:600">${u} · komentar</div><div style="font-size:34px;font-weight:700;line-height:1.2">${tx}</div>`));
    const vote = chip(root, `📶 SINYAL ${V.suara.sinyal} · 💧 AIR ${V.suara.air} · ⚡ LISTRIK ${V.suara.listrik}`, { top: 1290, fontSize: '36px' }); let last = -1;
    return { scene: sc, cam, upd(t, dur) { const v = Math.floor(E.out(seg(t, .3, 3.2)) * 218) * 10000; if (v !== last) { draw(v); last = v } J.pose(t, { point: t < 3.5, talk: true });
      const ts = at(s, 'Sinyal', 4.5); show(vote, seg(t, ts - .2, ts + .2)); cards.forEach((c, i) => show(c, seg(t, at(s, 'turnamen', 6) - .2 + i * .5, at(s, 'turnamen', 6) + .2 + i * .5), 30));
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .2, p), lerp(2.0, 1.8, p), lerp(10.5, 9, p)); cam.lookAt(.2, 1.4, .3) } };
  },
  K1_BUKIT(s, root) {   // bukit kelapa: HP 0 bar, Mbah menunjuk pucuk kelapa
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => Math.hypot(x, z) < 10 }); bukit(sc); const J = juara(at3(1.6, 3.2)); sc.add(J); J.rotation.y = -.4; hp(J);
    const M = darmo(at3(-1.4, 3)); sc.add(M); M.rotation.y = .5; const B = bars(root); B.set(0); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'pucuk', dur - 2); J.pose(t, { hold: true, look: Math.sin(t * 1.5) * .4 }); M.pose(t, { point: t > tk - .5, talk: t > tk - 1 }); show(B.el, seg(t, .3, .7));
      const p = ease(t, 0, dur), up = ease(t, tk - .4, tk + 1.2); cam.position.set(lerp(1.5, .8, p), lerp(4.2, 3.9, p) + up * 1.2, lerp(15, 13.5, p)); cam.lookAt(0, lerp(3.4, 5.6, up), lerp(2.6, 0, up)) } };
  },
  K1_MENARA(s, root) {   // timelapse menara bambu tumbuh, perantau membantu
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => Math.hypot(x, z) < 10 }); bukit(sc); const T = menara(sc, at3(2.6, 1.4)); const J = juara(at3(.4, 3.4)); sc.add(J); J.rotation.y = .7;
    const helpers = [0, 1, 2, 3].map(i => { const w = person(sc, at3(3.6 + (i % 2) * .8, 2.6 + i * .5), { body: ['#3E86B0', '#C65B4B', '#D8A84A', '#4E8B6A'][i], pants: '#3B3B3B', skin: ['#C98E64', '#E2A97E', '#B97A52'][i % 3], hair: '#2A1A10' }); w.rotation.y = -1.6; return w });
    const clock = chip(root, '07:00', { left: 60, top: 330, fontSize: '54px' }), cost = chip(root, `🧾 menara + antena bekas: ${X.TL.vars.biaya_rp}`, { top: 450, fontSize: '36px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const g = E.out(seg(t, .4, dur - 1)); T.scale.set(1, Math.max(.02, g), 1); T.userData.ant.visible = g > .95; J.pose(t, { point: true, talk: true }); helpers.forEach((w, i) => w.pose(t + i, { hold: true, nod: true }));
      const h = Math.floor(7 + g * 9); clock.innerHTML = `${String(h).padStart(2, '0')}:${String(Math.floor((t * 97) % 60)).padStart(2, '0')}`; show(clock, seg(t, .1, .4)); show(cost, seg(t, at(s, 'Habis', 3) - .2, at(s, 'Habis', 3) + .2));
      const a = lerp(-.6, .5, ease(t, 0, dur)); cam.position.set(2.6 + Math.sin(a) * 17, 6.5, 1.4 + Math.cos(a) * 17); cam.lookAt(2.4, 4.6, 1.4) } };
  },
  K1_NYALA(s, root) {   // drone di atas desa: bar sinyal naik, notifikasi bermunculan, anak-anak bersorak
    const sc = SORE(); const D = desaSepi(sc); const T = menara(sc, [-7, 0, -14]); const kids = [0, 1, 2, 3, 4].map(i => { const k = person(sc, [-1.2 + i * .6, 0, 9 + (i % 2) * .4], { s: .72, body: ['#E5484D', '#3E86B0', '#F2C14E', '#2E9C6A', '#B84E7A'][i], pants: '#3B3B3B', skin: '#C98E64', hair: '#2A1A10' }); return k });
    const B = bars(root, { left: 360, top: 330 }); const bel = Array.from({ length: 14 }, (_, i) => X.ab({ left: 90 + (i * 137) % 860, top: 520 + (i * 211) % 620, fontSize: '54px', opacity: 0, filter: 'drop-shadow(0 6px 10px #0006)' }, root, ['🔔', '💬', '📲'][i % 3])); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tb = [at(s, 'Satu bar', .3), at(s, 'dua bar', 1.2), at(s, 'empat', 2.2)]; const n = t > tb[2] ? 4 : t > tb[1] ? 2 : t > tb[0] ? 1 : 0; B.set(n); show(B.el, seg(t, 0, .3));
      const tn = at(s, 'barengan', tb[2] + .8); bel.forEach((b, i) => { const q = seg(t, tn - .4 + i * .07, tn + i * .07); b.style.opacity = q * (1 - seg(t, dur - .6, dur)); b.style.transform = `scale(${.6 + .4 * E.back(Math.min(1, q))}) translateY(${(1 - q) * 20}px)` });
      kids.forEach((k, i) => k.pose(t + i, { cheer: t > tn, bounce: t > tn })); const p = ease(t, 0, dur); cam.position.set(lerp(10, 3.4, p), lerp(30, 3.2, p), lerp(36, 15.5, p)); cam.lookAt(lerp(-2, 0, p), lerp(0, 1.2, p), lerp(-4, 9, p)) } };
  },
  K1_HARU(s, root) {   // Mbah Darmo video call, cahaya HP di wajah
    const sc = SORE({ sky: ['#E9A866', '#FCE7C6'], sunPos: [-12, 6, 8] }); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); island(sc, 16, 14, '#8FB45A', '#7A5C3E'); balai(sc, [1.5, 0, -3.5]); bale(sc, [-1.4, 0, 0]);
    const M = darmo([-1.6, 0, 0]); sc.add(M); duduk(M, -.29);
    const el = M.userData.st.arms[1].userData.elbow; el.children[el.children.length - 1].visible = false;
    const layar = mesh(G.box(.17, .3, .02), '#BFE6FF', [0, -.35, .14], { cast: false, rot: [1.3, 0, 0], mat: { emissive: '#9FD8FF', emissiveIntensity: 1.2 } }); M.userData.st.arms[1].userData.elbow?.add(layar);
    const call = chip(root, '📹 video call · anak Mbah (Jakarta)', { top: 360, fontSize: '34px' }); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { M.pose(t, { hold: true, nod: t > 1.5, talk: t > 2 }); duduk(M, -.29); show(call, seg(t, .5, .9));
      const p = ease(t, 0, dur); cam.position.set(lerp(1.2, .1, p), lerp(1.7, 1.45, p), lerp(5.2, 3.4, p)); cam.lookAt(-1.5, 1.2, 0) } };
  },
  K1_GELAP(s, root) {   // malam: lampu router mati, desa gelap
    const sc = MALAM(); const D = desaSepi(sc); const T = menara(sc, [-7, 0, -14]); const J = juara([.6, 0, 6]); sc.add(J); J.rotation.y = Math.PI; hp(J, '#1A1A1A');
    const jam = chip(root, '🕘 21:00', { top: 330, fontSize: '54px' }); const fade = X.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#05081A', opacity: 0 }, root); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tm = at(s, 'mati', dur * .5); T.userData.lamp.visible = t < tm || (t < tm + .5 && Math.sin(t * 40) > 0); J.pose(t, { shake: t > tm + .3 }); show(jam, seg(t, .2, .6));
      fade.style.opacity = .45 * seg(t, tm, tm + 1.2); const p = ease(t, 0, dur); cam.position.set(lerp(4, 2.4, p), lerp(2.6, 2.1, p), lerp(13, 10.5, p)); cam.lookAt(-2, 2.6, -2) } };
  },
  K1_AJAK(s, root) {   // pertanyaan: listrik dari sungai / angin / matahari
    const sc = MALAM({ sky: ['#1A2A55', '#4A5F9A'], hemi: .7, sunI: 1 }); desaSepi(sc); const J = juara([0, 0, 9]); sc.add(J); J.rotation.y = 0; const cam = camera(42);
    const q = X.ab({ left: 60, top: 360, width: 960, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<div style="font-size:38px;font-weight:800;color:#F4EBD3;letter-spacing:2px;text-shadow:0 4px 14px #000">LISTRIK DESA DARI MANA?</div><div style="display:flex;flex-direction:column;gap:16px;align-items:center;margin-top:20px">` +
      ['🌊 SUNGAI', '🌬️ ANGIN', '☀️ MATAHARI'].map(x => `<div style="background:${PANEL};color:#F4EBD3;font-size:52px;font-weight:800;padding:14px 40px;border-radius:18px;border:1px solid #ffffff2a;box-shadow:0 10px 24px #0000005c;min-width:440px">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { talk: true, point: t > 1 && t < dur - 1.5, wave: t >= dur - 1.5 }); show(q, seg(t, at(s, 'Sungai', 1) - .3, at(s, 'Sungai', 1) + .2));
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .2, p), lerp(1.9, 1.7, p), lerp(14.5, 12.5, p)); cam.lookAt(0, 1.3, 9) } };
  },
};

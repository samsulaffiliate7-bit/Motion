// Shot Denah S1 Ep 1 "Rumah Kampung, Bukan Vila!" (lihat STORYBOARD.md).
import { THREE, mesh, G, group, camera } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/rumahdunia.js';
import { PAGI, SIANG, SORE, dena, mandor, warga, jawa, awan, lokasiProyek, rumahKampung, kampungBanyak, hujan, rumahMini, gridDenah, BIG, LABEL, tagNama, tempel, show, pulse, ease, lerp, seg, E } from '../_s1/dunia.js';

const UP = new THREE.Vector3(), U0 = new THREE.Vector3(0, 0, -1), U1 = new THREE.Vector3(0, 1, 0);
const papanDOM = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%)', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '40px', color: '#12344F', background: '#FFF6E2', padding: '8px 22px', borderRadius: '12px', boxShadow: '0 8px 20px #0006', whiteSpace: 'nowrap' }, css), root, html);
function papanVila(sc, p) {   // papan proyek vila (lelucon) + galian kolam renang
  const g = group(sc, p); [-1, 1].forEach(x => g.add(mesh(G.cyl(.07, .08, 2.6, 8), '#C9A85A', [x * 1.2, 1.3, 0])));
  const pap = canvasPlane(2.8, 1.2, (x, W, H) => { const gr = x.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#FF7AB6'); gr.addColorStop(1, '#8A5AF0'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    x.fillStyle = '#FFFFFF'; x.textAlign = 'center'; x.font = `800 ${Math.round(H * .3)}px Poppins`; x.fillText('PROYEK VILA ✨', W / 2, H * .45); x.font = `700 ${Math.round(H * .15)}px Poppins`; x.fillText('kolam renang · rooftop · jacuzzi', W / 2, H * .75) }, 600);
  pap.position.set(0, 2.1, .06); g.add(pap); g.userData.pap = pap; return g;
}

export const SHOTS = {
  D1_VILA(s, root) {   // frame 1 aksi: Pak Mandor memaku papan PROYEK VILA, kolam sudah digali; Dena berlari masuk menunjuk
    const sc = SIANG(); const L = lokasiProyek(sc); const V = papanVila(sc, [.2, 0, -2.2]); sc.add(mesh(G.box(3.4, .05, 2), '#5AB8E0', [-1.8, .04, -.6], { cast: false, mat: { roughness: .2 } }));
    const M = mandor([1.6, 0, .9], { cangkul: true }); sc.add(M); M.rotation.y = -.6; const D = dena([-3.5, 0, 2.6]); sc.add(D); const cam = camera(42);
    const h = BIG(root, 'EPISODE 1', { top: 320, fontSize: '110px' }), no = BIG(root, 'BUKAN VILA!', { top: 470, fontSize: '92px', color: '#FFB27A' });
    return { scene: sc, cam, upd(t, dur) { const r = seg(t, .3, 1.8); D.position.set(lerp(-2.3, -.6, E.out(r)), 0, lerp(2.6, 2.2, r)); D.rotation.y = r < 1 ? Math.PI / 2 : lerp(Math.PI / 2, .4, seg(t, 1.8, 2.2));
      D.pose(t, { walk: r < 1 ? 1.4 : 0, point: r >= 1, panik: t > 2.4 && t < 3.6 }); M.pose(t, { gali: t < 1.6, nod: t > 1.6, cheer: t > 3.8 && t < 5 }); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(.4, .6, p), lerp(2.4, 2.1, p), lerp(10.5, 8.6, p)); cam.lookAt(.4, 1.4, .4); pulse(h, seg(t, 0, .35)); pulse(no, seg(t, .9, 1.3)) } };
  },
  D1_NETIZEN(s, root) {   // "kata netizen, Mbak!": gelembung komen VILA x3, KAMPUNG x1 melayang di atas Pak Mandor
    const sc = SIANG(); const L = lokasiProyek(sc); papanVila(sc, [1.2, 0, -.6]); const M = mandor([1.4, 0, 1.4]); sc.add(M); M.rotation.y = -.3; const D = dena([-.6, 0, 1.8]); sc.add(D); D.rotation.y = .5; const cam = camera(42);
    const hp = mesh(G.box(.18, .32, .03), '#1E1E1E', [0, -.32, .08]); M.userData.st.arms[0].userData.elbow?.add(hp);
    const V = X.TL.vars; const bub = [['💬 vila', '#FF7AB6'], ['💬 vila', '#FF7AB6'], ['💬 villa ka biar nyaman', '#FF7AB6'], ['💬 kampung kak', '#9FE0B0'], ['💬 rumah betang kak', '#FFD27A'], ['💬 rumah adat pliss', '#FFD27A']].map(([t, c], i) => X.ab({ left: [80, 600, 300, 640, 100, 560][i], top: [290, 300, 380, 460, 470, 540][i], opacity: 0, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '36px', color: '#12344F', background: '#FFFFFF', borderLeft: `10px solid ${c}`, padding: '10px 22px', borderRadius: '16px', boxShadow: '0 8px 20px #0005', whiteSpace: 'nowrap' }, root, t));
    const skor = X.ab({ left: 0, top: 640, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<span style="display:inline-block;background:rgba(18,52,86,.93);color:#FFF6E2;border-radius:16px;padding:12px 30px;font-size:44px;font-weight:800">VILA ${V.vila} · <span style="color:#9FE0B0">KAMPUNG ${V.kampung}</span> · JOGLO ${V.joglo} · LIMASAN ${V.limasan}</span>`);
    const kata = papanDOM(root, '"Kata netizen, Mbak!"', { fontStyle: 'italic' });
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'Kampung', dur - 3); bub.forEach((b, i) => { show(b, seg(t, .3 + i * .35, .6 + i * .35)); b.style.transform += ` translateY(${Math.sin(t * 2 + i) * 6}px)` });
      M.pose(t, { talk: t < 2.2, point: t > .6 && t < 2.4, nod: t > 2.4 }); D.pose(t, { talk: t > 2.2, shake: t > 2.4 && t < 3.4 }); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(.6, .4, p), lerp(2.0, 1.9, p), lerp(8.4, 7.6, p)); cam.lookAt(.4, 1.5, 1); tempel(kata, M, cam, [0, 2.3, 0], seg(t, .2, .5) * (1 - seg(t, 2.2, 2.5))); show(skor, seg(t, tk - .4, tk)) } };
  },
  D1_PUTUS(s, root) {   // Dena merobohkan papan vila; awan kelabu di gunung; HUJAN: 2 HARI
    const sc = PAGI(); const L = lokasiProyek(sc); const V = papanVila(sc, [1.6, 0, -.8]); const D = dena([-.2, 0, 2]); sc.add(D); D.rotation.y = .3; const M = mandor([2.8, 0, 1.4]); sc.add(M); M.rotation.y = -.4; const cam = camera(42);
    const mendung = Array.from({ length: 8 }, (_, i) => { const g = group(sc, [-50 + i * 14, 34 + (i % 3) * 3, -110]); [[0, 0, 0, 6], [5, -1, 1, 4.5], [-5, -1, 0, 4.2]].forEach(([x, y, z, r]) => g.add(mesh(G.ico(r, 1), '#9AA2B2', [x, y, z], { cast: false, mat: { flatShading: false } }))); return g });
    const V2 = X.TL.vars; const cd = X.ab({ left: 0, top: 320, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', opacity: 0 }, root,
      `<div style="display:inline-block;background:rgba(18,52,86,.93);border:3px solid #9FE0B0;border-radius:22px;padding:18px 44px"><div style="font-size:30px;font-weight:700;color:#9FE0B0;letter-spacing:5px">🌧️ HUJAN PERTAMA</div><div style="font-size:84px;font-weight:800;color:#FFF6E2;line-height:1.05">${V2.hujan} HARI LAGI</div></div>`);
    const pilih = BIG(root, 'RUMAH KAMPUNG', { top: 600, fontSize: '88px', color: '#9FE0B0' });
    return { scene: sc, cam, upd(t, dur) { const tr = at(s, 'rumah kampung', dur - 2); const f = E.in(seg(t, tr - 1.6, tr - 1)); V.rotation.x = -f * 1.5; mendung.forEach((g, i) => g.position.z = -110 + t * 2);
      D.pose(t, { talk: true, point: t > tr - .3, cheer: t > tr + .6 }); M.pose(t, { shake: t > tr - 1 && t < tr }); L.J.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(.2, .6, p), lerp(1.6, 1.8, p), lerp(9, 8, p)); cam.lookAt(.6, lerp(2.6, 1.6, p), 0); show(cd, seg(t, .3, .7) * (1 - seg(t, tr - .8, tr - .4))); pulse(pilih, seg(t, tr - .1, tr + .3)) } };
  },
  D1_BEDAH(s, root) {   // KHAS: tampak atas (grid) 8 tiang muncul satu-satu -> menukik ke rumah kampung; label fakta
    const sc = SIANG(); const L = lokasiProyek(sc); const R = rumahKampung(sc, [.5, 0, .2], { jadi: false }); const cam = camera(44); const grid = gridDenah(root);
    const D = dena([-3.6, 0, 3.4]); sc.add(D); D.rotation.y = .6; const M = mandor([4.4, 0, 3.2]); sc.add(M); M.rotation.y = -.6;
    const F = X.TL.vars.fakta; const lab = F.map((f, i) => LABEL(root, f[0], f[1], 300));
    const cnt = X.ab({ left: 0, top: 1240, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '70px', color: '#FFF6E2', textShadow: '0 6px 0 #12344F' }, root, '');
    return { scene: sc, cam, upd(t, dur) { const ts = F.map((f, i) => at(s, f[2], 1 + i * (dur / (F.length + 1)))); const b = seg(t, .3, dur * .85); R.userData.set(b);
      const nT = R.userData.tiang.filter(x => x.visible).length; cnt.innerHTML = nT && b < .4 ? `${nT} / 8 TIANG` : ''; cnt.style.opacity = nT && b < .4 ? 1 : 0;
      D.pose(t, { talk: true, point: t > ts[0] }); M.pose(t, { nod: true }); L.J.angin(t);
      const sw = E.inout(seg(t, dur * .32, dur * .62)); cam.position.set(lerp(.5, 5, sw), lerp(28, 6.4, sw), lerp(.6, 17.5, sw)); UP.copy(U0).lerp(U1, E.out(seg(sw, 0, .5))).normalize(); cam.up.copy(UP); cam.lookAt(.5, lerp(0, 2, sw), .2);
      grid(.7 * (1 - seg(t, dur * .3, dur * .4))); lab.forEach((e, i) => show(e, seg(t, ts[i] - .2, ts[i] + .2) * (1 - seg(t, (ts[i + 1] ?? dur + 1) - .3, ts[i + 1] ?? dur + 1)))) } };
  },
  D1_HUJAN(s, root) {   // rumah naik cepat; atap jadi pas hujan pertama turun; keduanya berteduh di emper
    const sc = SORE({ sky: ['#7F9CC8', '#E6D8C2'] }); const L = lokasiProyek(sc); const R = rumahKampung(sc, [.5, 0, .2], { jadi: false }); const rain = hujan(sc, 700); const cam = camera(42);
    const D = dena([-2.4, 0, 4.2]); sc.add(D); D.rotation.y = .4; const M = mandor([3.6, 0, 4]); sc.add(M); M.rotation.y = -.4;
    const ok = BIG(root, 'ATAP JADI ✓', { top: 340, fontSize: '96px', color: '#9FE0B0' });
    return { scene: sc, cam, upd(t, dur) { const th = at(s, 'hujan', dur * .5); R.userData.set(.62 + .38 * seg(t, 0, th) * 0 + Math.min(1, .62 + seg(t, 0, th - .2) * .38)); const wet = t > th;
      rain(t, wet); const run = seg(t, th + .2, th + 1.4); D.position.set(lerp(-2.4, -.6, run), 0, lerp(4.2, 3.2, run)); M.position.set(lerp(3.6, 1.8, run), 0, lerp(4, 3.2, run)); if (run >= 1) { D.rotation.y = 0; M.rotation.y = 0 }
      D.pose(t, { walk: run > 0 && run < 1 ? 1.3 : 0, cheer: run >= 1 && t > th + 1.8, talk: true }); M.pose(t, { walk: run > 0 && run < 1 ? 1.3 : 0, hold: run > 0 }); L.J.angin(t * (wet ? 3 : 1));
      const p = ease(t, 0, dur); cam.position.set(lerp(-3, -1.6, p), lerp(3.2, 2.8, p), lerp(18, 16.5, p)); cam.lookAt(.5, 2.2, .6); pulse(ok, seg(t, th - .1, th + .3)) } };
  },
  D1_LIKE(s, root) {   // like = tempat tinggal: 98 rumah kampung bermunculan di lahan sekitar; penduduk cuma 6
    const V = X.TL.vars; const sc = PAGI(); const J = jawa(sc, { hole: (x, z) => Math.abs(x) < 30 && z < 10 && z > -50 }); awan(sc); sc.add(mesh(G.box(62, .03, 62), '#9ACD4A', [0, 0, -20], { cast: false }));
    const R = rumahKampung(sc, [0, 0, 3], {}); const K = kampungBanyak(sc, V.hunian - 1, { cz: -6, cols: 12 }); const cam = camera(44);
    const WG = Array.from({ length: V.penduduk }, (_, i) => { const w = i === 0 ? dena([-2 + i * .8, 0, 7]) : i === 1 ? mandor([-2 + i * .8, 0, 7]) : warga(null, [-2 + i * .8, 0, 7], i); sc.add(w); return w });
    const cnt = X.ab({ left: 0, top: 320, width: 1080, textAlign: 'center', fontFamily: 'Poppins,sans-serif', opacity: 0 }, root, '');
    return { scene: sc, cam, upd(t, dur) { const tp = at(s, 'penduduknya', dur * .55); K.tampil(t, .4, (tp - 1) / V.hunian); let n = 1; K.pos.forEach((_, i) => { if (t > .4 + i * (tp - 1) / V.hunian) n++ });
      cnt.innerHTML = `<span style="display:inline-block;background:rgba(18,52,86,.93);border-radius:16px;padding:12px 32px;font-size:64px;font-weight:800;color:#FFF6E2">🏠 ${n} · <span style="color:${t > tp ? '#FF9F45' : '#FFF6E2'}">👥 ${t > tp ? V.penduduk : '?'}</span></span>`; show(cnt, seg(t, .2, .5));
      WG.forEach((w, i) => { w.visible = t > tp; w.pose(t + i, { wave: t > tp + .5 }) }); J.angin(t);
      const u = ease(t, 0, tp); const b = E.inout(seg(t, tp, tp + 1.2)); cam.position.set(0, lerp(lerp(9, 34, u), 3.2, b), lerp(lerp(20, 30, u), 15.5, b)); cam.lookAt(0, lerp(lerp(2, 0, u), 2, b), lerp(lerp(0, -16, u), 2, b)) } };
  },
  D1_AJAK(s, root) {   // komen betang & rumah adat -> rumah panjang banyak keluarga; 3 maket BETANG / GADANG / HONAI
    const sc = SORE(); const L = lokasiProyek(sc); const R = rumahKampung(sc, [.5, 0, -3.4], {}); const meja = group(sc, [.5, 0, 2.2]); meja.add(mesh(G.box(4.6, .12, 1.6), '#A8743E', [0, .9, 0])); [[-2.1, -.6], [2.1, -.6], [-2.1, .6], [2.1, .6]].forEach(([x, z]) => meja.add(mesh(G.box(.12, .9, .12), '#7A4E2C', [x, .45, z])));
    const K = ['betang', 'gadang', 'honai'].map((k, i) => { const r = rumahMini(meja, [(i - 1) * 1.45, .96, 0], k); r.scale.setScalar(.01); return r });
    const D = dena([-1.7, 0, 3.2]); sc.add(D); D.rotation.y = .6; const M = mandor([2.7, 0, 3.2]); sc.add(M); M.rotation.y = -.6; const cam = camera(50);
    const NM = ['BETANG', 'GADANG', 'HONAI'].map(n => papanDOM(root, n, { fontSize: '36px', background: 'rgba(18,52,86,.95)', color: '#FFF6E2', border: '2px solid #FF9F45' }));
    const kom = X.ab({ left: 120, top: 330, width: 840, opacity: 0, fontFamily: 'Poppins,sans-serif' }, root, ['💬 rumah betang kak', '💬 rumah adat pliss'].map(t => `<div style="background:#FFFFFF;border-left:10px solid #FFD27A;border-radius:16px;padding:10px 22px;margin-bottom:12px;font-size:38px;font-weight:700;color:#12344F;display:inline-block;margin-right:12px">${t}</div>`).join(''));
    const q = X.ab({ left: 40, top: 1250, width: 1000, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif', fontSize: '40px', fontWeight: 800, color: '#FFF6E2', textShadow: '0 4px 14px #000' }, root, 'RUMAH KEDUA? 👇');
    return { scene: sc, cam, upd(t, dur) { const tk = ['Betang', 'Gadang', 'Honai'].map((w, i) => at(s, w, dur - 4 + i)); K.forEach((r, i) => { r.scale.setScalar(Math.max(.01, E.back(seg(t, tk[i] - .2, tk[i] + .25)))); r.rotation.y = Math.sin(t * .8 + i) * .25 });
      D.pose(t, { talk: true, point: t > tk[0] - .2 && t < tk[2] + 1, cheer: t > tk[2] + 1.2 }); M.pose(t, { nod: t > tk[2], look: -.3 }); L.J.angin(t);
      const z = seg(t, tk[0] - .8, tk[0]); cam.position.set(.5, lerp(3.6, 3.0, z), lerp(15.5, 13.6, z)); cam.lookAt(.5, lerp(2.2, 1.6, z), 1.6);
      show(kom, seg(t, .3, .7) * (1 - seg(t, tk[0] - .8, tk[0] - .4))); K.forEach((r, i) => tempel(NM[i], r, cam, [0, 1.5, 0], seg(t, tk[i], tk[i] + .3))); show(q, seg(t, tk[0] - .4, tk[0])) } };
  },
};

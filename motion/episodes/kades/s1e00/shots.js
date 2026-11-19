// Shot Kades S1 Ep 0 "Hari Nol" (lihat STORYBOARD.md). Tiap adegan = lokasi/kamera berbeda.
import { lerp, seg, E, mesh, G, group, camera, island, tree } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/desa3d.js';
import { SORE, SENJA, juara, darmo, wati, bejo, desaSepi, desaBesar, labelFasum, gapuraTua, angkot, balai, bale, stasiun, papanAturan, BIG, show, pulse } from '../_s1/dunia.js';

const ease = (t, a, b) => E.inout(seg(t, a, b));
function debu(sc, n = 16, col = '#CDB892') { const d = Array.from({ length: n }, (_, i) => { const m = mesh(G.sph(.14, 8, 6), col, [0, -5, 0], { cast: false, mat: { transparent: true, opacity: .55 } }); sc.add(m); return m });
  return (t, t0, p) => d.forEach((m, i) => { const q = seg(t, t0, t0 + 1.4); m.visible = q > 0 && q < 1; const a = i / n * Math.PI * 2; m.position.set(p[0] + Math.cos(a) * q * 1.6, p[1] + .1 + Math.sin(i) * .2 + q * .5, p[2] + Math.sin(a) * q * .9); m.scale.setScalar(.5 + q * 1.5) }) }
function duduk(p, y) { p.userData.st.legs.forEach(L => { L.rotation.x = -1.45; L.userData.knee && (L.userData.knee.rotation.x = 1.45) }); p.position.y = y }

export const SHOTS = {
  K0_TIBA(s, root) {   // frame 1 aksi: angkot melaju, Juara melompat turun di depan gapura berkarat
    const sc = SORE(); const D = desaSepi(sc); gapuraTua(sc, [0, 0, 13.5]); const A = angkot(sc, [0, 0, 14.7]); const J = juara([.4, 0, 15.4]); sc.add(J);
    const koper = mesh(G.box(.45, .55, .2), '#8A4B32', [.25, -.75, .05]); J.userData.st.arms[1].userData.elbow?.add(koper); const dust = debu(sc);
    const h = BIG(root, 'HARI 0', { top: 330 }), sub = BIG(root, 'dari 30 hari', { top: 500, fontSize: '54px', fontWeight: 700 }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const ax = 1 + Math.pow(Math.max(0, t), 1.6) * 3; A.position.x = ax; A.userData.wheels.forEach(w => w.rotation.y = -t * 9);
      const jq = seg(t, 0, .6); J.position.set(lerp(-.4, .4, jq), Math.max(0, Math.sin(jq * Math.PI) * .45), lerp(15.6, 16.6, jq)); J.rotation.y = lerp(-.6, .25, seg(t, .6, 1.4));
      J.pose(t, { wave: t > 1.4 && t < 3.2, talk: t > 3.2 }); dust(t, .05, [ax - 1.8, 0, 14.7]); D.angin(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(4.6, 3.2, p), lerp(1.5, 1.7, p), lerp(25.5, 22.5, p)); cam.lookAt(0, lerp(2.3, 1.8, p), 14.6);
      pulse(h, seg(t, .25, .65)); show(sub, seg(t, at(s, 'dipecat', 4) - .2, at(s, 'dipecat', 4) + .3)) } };
  },
  K0_SEPI(s, root) {   // tracking samping: Juara menyusuri jalan desa, rumah-rumah dipaku papan, daun kering beterbangan
    const sc = SORE(); const D = desaSepi(sc); const J = juara([0, 0, 12]); sc.add(J); J.rotation.y = Math.PI; const cam = camera(42);
    const lbl = BIG(root, 'dipaku semua', { top: 420, fontSize: '70px' }); const lab = labelFasum(root, D.big); const luas = BIG(root, `${Math.floor(D.big.rumah / 100) * 100}+ rumah`, { top: 330, fontSize: '84px' });
    return { scene: sc, cam, upd(t, dur) { const q = seg(t, 0, dur); const jz = lerp(12, -2, q); J.position.z = jz; J.pose(t, { walk: 1, look: Math.sin(t * .9) * .6 }); D.angin(t);
      const a = E.inout(seg(t, .4, dur * .55)); const tx = lerp(3.2, 2.6, q), ty = 2.1, tz = jz + 4.4;
      cam.position.set(lerp(38, tx, a), lerp(58, ty, a), lerp(78, tz, a)); cam.lookAt(lerp(0, lerp(-1.4, -.8, q), a), lerp(0, 1.2, a), lerp(-6, jz - 1.5, a));
      lab(cam, 1 - seg(t, dur * .3, dur * .42)); show(luas, seg(t, .2, .6) * (1 - seg(t, dur * .38, dur * .46))); const tp = at(s, 'dipaku', 2.5); show(lbl, seg(t, tp, tp + .4) * (1 - seg(t, tp + 2.4, tp + 2.8))) } };
  },
  K0_BALAI(s, root) {   // pintu kantor kades copot jatuh rata, debu mengepul, kamera bergetar
    const sc = SORE(); island(sc, 16, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); const B = balai(sc, [0, 0, -1]); tree(sc, [-5, 0, -2], 1.3, '#5E8F3A'); tree(sc, [5.2, 0, -1], 1.1, '#5E8F3A', 'palm');
    const J = juara([-.9, 0, 2.2]); sc.add(J); J.rotation.y = Math.PI - .5; const dust = debu(sc, 22, '#BFAE8C'); const cam = camera(42);
    const brak = BIG(root, 'BRAK!', { top: 420, fontSize: '120px', color: '#FFE2A0' });
    return { scene: sc, cam, upd(t, dur) { const tc = at(s, 'copot', 3.2) - .5; const f = E.in(seg(t, tc, tc + .55)); B.userData.door.rotation.x = f * Math.PI / 2; dust(t, tc + .5, [0, 0, 1.6]);
      const push = seg(t, tc - 1.2, tc - .2); J.position.z = lerp(2.2, 1.95, push) + seg(t, tc + .5, tc + .8) * .5; J.pose(t, { shake: t > tc + .6, hold: push > 0 && t < tc + .5 });
      const sh = t > tc + .5 && t < tc + .9 ? Math.sin(t * 90) * .06 : 0; const p = ease(t, 0, dur); cam.position.set(lerp(4.6, 3.8, p) + sh, lerp(2.2, 1.9, p), lerp(7.8, 6.8, p)); cam.lookAt(-.3, 1.2, .9);
      pulse(brak, seg(t, tc + .5, tc + .8)); if (t > tc + 1.6) brak.style.opacity = 1 - seg(t, tc + 1.6, tc + 2) } };
  },
  K0_DARMO(s, root) {   // Mbah Darmo ngopi di bale, Bejo makan kertas, satu kata: kabur
    const sc = SORE(); island(sc, 16, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); balai(sc, [1.5, 0, -3.5]); bale(sc, [-1.4, 0, 0]);
    const M = darmo([-1.6, 0, 0]); sc.add(M); duduk(M, -.29); const kopi = mesh(G.cyl(.08, .07, .16, 10), '#F2EFE6', [-.7, .65, .2]); sc.add(kopi);
    const J = juara([2.3, 0, -.3]); sc.add(J); J.rotation.y = -1.3; const BJ = bejo(sc, [1.9, 0, 2.2]); BJ.scale.setScalar(.75); BJ.rotation.y = -2.2; const kertas = mesh(G.box(.2, .02, .26), '#FFFFFF', [.68, .7, 0], { cast: false }); BJ.add(kertas);
    const kb = BIG(root, 'kabur.', { top: 400, fontSize: '130px', fontStyle: 'italic' }); const nama = BIG(root, 'MBAH DARMO · warga terakhir', { top: 1180, fontSize: '40px', fontWeight: 700, color: '#F4EBD3' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'Kabur', dur - 2); M.pose(t, { talk: t > tk - .2 && t < tk + .5, nod: t < tk - 1 }); duduk(M, -.29); J.pose(t, { talk: t < tk - 1, shake: t > tk + .5 });
      BJ.userData.hd.rotation.z = Math.sin(t * 7) * .12; kertas.scale.x = Math.max(.1, 1 - seg(t, 0, dur) * .9);
      const p = ease(t, 0, dur); const zoom = seg(t, tk - .3, tk + .4); cam.position.set(lerp(.5, -.1, p) - zoom * 1.1, lerp(1.9, 1.6, p) - zoom * .2, lerp(7.8, 6.8, p) - zoom * 2.4); cam.lookAt(lerp(-.6, -1.6, zoom), 1.05, 0);
      show(nama, seg(t, .6, 1.1) * (1 - seg(t, 3.4, 3.8))); pulse(kb, seg(t, tk, tk + .35)) } };
  },
  K0_WATI(s, root) {   // Bu Wati datang membawa map merah; dokumen target muncul, cap GAGAL = DIPECAT
    const sc = SORE(); island(sc, 18, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); balai(sc, [0, 0, -3.5]); tree(sc, [-5.5, 0, -3], 1.3, '#5E8F3A');
    const J = juara([-1, 0, .8]); sc.add(J); J.rotation.y = .9; const W = wati([5, 0, .6]); sc.add(W); W.rotation.y = -Math.PI / 2; const cam = camera(42);
    const V = X.TL.vars; const doc = X.ab({ left: 120, top: 330, width: 840, background: '#FBF7EC', borderRadius: '14px', padding: '34px 44px', fontFamily: 'Poppins,sans-serif', color: '#2A2A2A', boxShadow: '0 18px 40px rgba(0,0,0,.5)', opacity: 0 }, root,
      `<div style="font-size:24px;letter-spacing:4px;color:#8A4B32;font-weight:700">SURAT TUGAS · MASA PERCOBAAN</div><div style="height:3px;background:#B5302A;margin:12px 0 20px"></div>
       <div style="font-size:34px;font-weight:600">Kades Magang: <b>JUARA</b></div><div style="font-size:52px;font-weight:800;margin-top:14px">TARGET: ${V.target} WARGA</div><div style="font-size:52px;font-weight:800">WAKTU: ${V.hari_total} HARI</div>`);
    const cap = X.ab({ left: 520, top: 610, border: '8px solid #B5302A', color: '#B5302A', borderRadius: '12px', padding: '6px 20px', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '50px', transform: 'rotate(-12deg)', opacity: 0 }, root, 'GAGAL = DIPECAT');
    return { scene: sc, cam, upd(t, dur) { const tw = at(s, 'Bu Wati', .3); const q = ease(t, tw, tw + 2.2); W.position.x = lerp(5, 1.1, q); W.pose(t, { walk: q < 1 ? 1 : 0 }); J.pose(t, { look: .3, shake: t > at(s, 'dipecat', dur - 2) });
      const tm = at(s, 'Isinya', 4); const td = at(s, 'dipecat', dur - 2); const p = ease(t, 0, dur); cam.position.set(lerp(.6, .1, p), lerp(1.8, 1.6, p), lerp(9.4, 8.2, p)); cam.lookAt(.05, 1.2, .5);
      show(doc, seg(t, tm - .3, tm + .2)); const c = seg(t, td - .1, td + .25); cap.style.opacity = c > 0 ? 1 : 0; cap.style.transform = `rotate(-12deg) scale(${c > 0 ? 1.8 - .8 * E.out(c) : 1.8})` } };
  },
  K0_STASIUN(s, root) {   // stasiun senja: kereta lewat tanpa berhenti, papan PULANG KAMPUNG masih 0
    const sc = SENJA(); island(sc, 30, 14, '#7FA34E', '#6B5440'); desaBesar(sc, { hole: (x, z) => z > -12 }); const S = stasiun(sc, [0, 0, 0]); [[-9, 3], [9, 3.5], [-12, -5], [12, -6]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.2, '#4E7A34', i % 2 ? 'palm' : 'round'));
    const J = juara([1.2, .5, .5]); sc.add(J); J.rotation.y = Math.PI + .3; const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tk = 1.2; S.userData.kereta.position.x = lerp(-34, 30, seg(t, tk, tk + 2.6)); J.pose(t, { wave: t > tk - .6 && t < tk + 2.6, shake: t > tk + 3 });
      const tn = at(s, 'papannya', dur - 3); const z = ease(t, tn - .3, tn + 1.2); const p = ease(t, 0, dur);
      cam.position.set(lerp(6, 4, p) - z * 3.4, lerp(2.4, 2.0, p) + z * .3, lerp(10, 8.5, p) - z * 3.6); cam.lookAt(lerp(.4, 0, z), lerp(1.4, 2.3, z), lerp(-1, .98, z)) } };
  },
  K0_AJAK(s, root) {   // papan pengumuman desa: tiga aturan menyala satu-satu; pertanyaan besok
    const sc = SENJA({ sky: ['#6E5A8E', '#E9A070'] }); island(sc, 16, 12, '#7FA34E', '#6B5440'); tree(sc, [-5.5, 0, -2], 1.3, '#4E7A34'); tree(sc, [5.5, 0, -2], 1.2, '#4E7A34', 'palm');
    const P = papanAturan(sc, [1.1, 0, -1], [['FOLLOW', '', '= 1 perantau pulang'], ['LIKE', '', '= dana desa +Rp10rb'], ['KOMEN', '', '= aduan warga']]); const J = juara([-2.6, 0, .6]); sc.add(J); J.rotation.y = .7; const cam = camera(42);
    const q = X.ab({ left: 60, top: 1210, width: 960, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, root,
      `<div style="font-size:34px;font-weight:700;color:#F4EBD3;letter-spacing:3px;text-shadow:0 4px 14px #000">BESOK HARI 1, BERESIN APA DULU?</div><div style="display:flex;gap:18px;justify-content:center;margin-top:16px">` +
      ['💧 AIR', '⚡ LISTRIK', '📶 SINYAL'].map(x => `<div style="background:rgba(21,53,42,.94);color:#F4EBD3;font-size:44px;font-weight:800;padding:14px 26px;border-radius:16px;border:1px solid #ffffff2a;box-shadow:0 10px 24px #0000005c">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); P.userData.plates[i].scale.setScalar(Math.max(.001, E.back(seg(t, tc - .1, tc + .35)))) });
      J.pose(t, { point: t > at(s, 'Follow', 1) - .2 && t < at(s, 'Air', dur - 3), talk: true, cheer: t > at(s, 'Air', dur - 3) + 1.2 });
      const p = ease(t, 0, dur); cam.position.set(lerp(.2, .5, p), lerp(2.5, 2.3, p), lerp(15.5, 14, p)); cam.lookAt(.5, 1.7, -.5); show(q, seg(t, at(s, 'Air', dur - 3) - .3, at(s, 'Air', dur - 3) + .2)) } };
  },
};

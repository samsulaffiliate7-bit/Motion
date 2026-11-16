// Shot Kades SIDE QUEST #3: kurir 11.11 nyasar, alamat lengkap, nomor rumah, papan jalan.
import { THREE, lerp, seg, E, mesh, G, group, newScene, camera, orbit, island, house, person } from '../../../engine/w3d/kit.js';
import { X, DG, YEL, CREAM, INK, SUNNY, kades, warga, card, at, tag3, village, lahan, rowHouses, txtSprite, gapura, canvasPlane, signText } from '../../../engine/w3d/desa3d.js';
function motor(sc, p) { const g = group(sc, p); g.add(mesh(G.box(.3, .3, 1.3), '#E5484D', [0, .5, 0])); [-.55, .55].forEach(z => g.add(mesh(G.cyl(.28, .28, .12, 12), '#222', [0, .28, z], { rot: [0, 0, Math.PI / 2] })));
  const box = mesh(G.box(.8, .6, .7), '#C9A36B', [0, 1, -.5]); g.add(box); const r = person(g, [0, .3, 0], { body: '#F28C28', hat: 'cap', hatC: '#F28C28' }); r.scale.setScalar(.8); g.userData = { r, box }; return g }
const pkgs = (sc, n, p) => Array.from({ length: n }, (_, i) => { const m = mesh(G.box(.35, .25, .3), ['#C9A36B', '#B5835A', '#D9B98A'][i % 3], [p[0] + (i % 3) * .38 - .38, .13 + Math.floor(i / 3) * .26, p[2]]); sc.add(m); return m });
export const SHOTS = {
  K_SQ03_HOOK(s, root) {   // kurir motor muter-muter di depan gapura, tanda tanya, banner 11.11
    const sc = newScene(SUNNY({ sky: ['#7CC6F2', '#FFE7F0'] })); village(sc); gapura(sc, [0, 0, 5.6]); const M = motor(sc, [0, 0, 8]); const q = txtSprite('?', CREAM, INK, .9); sc.add(q);
    const hook = X.ab({ left: 70, top: 290, width: 940, background: INK, border: `8px solid ${YEL}`, borderRadius: '30px', padding: '16px 24px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, color: YEL, fontSize: '70px', opacity: 0 }, root,
      `❗ SIDE QUEST <span style="color:#FF7AA2">11.11</span><div style="font-size:42px;color:${CREAM}">paketnya nyasar terus!</div>`); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-30, 15, E.inout(seg(t, 0, dur))), 5, 15, [0, 1, 6]); const a = t * 1.4; M.position.set(Math.sin(a) * 3, 0, 8 + Math.cos(a) * 1.6); M.rotation.y = a + Math.PI / 2; M.userData.r.pose(t, { look: Math.sin(t * 3) * .7 });
      q.visible = t > at(s, 'nggak jelas', 4); q.position.set(M.position.x, 2.6 + Math.sin(t * 4) * .1, M.position.z); X.pop(hook, seg(t, .1, .5)) } };
  },
  K_SQ03_ADDR(s, root) {   // tampak atas paket di meja: label alamat lima baris terisi satu per satu
    const sc = newScene(SUNNY({ sky: ['#E9D4B0', '#FFF6E6'], hemi: 1.3 })); sc.add(mesh(G.box(12, .4, 10), '#8B5A2B', [0, -.2, 0])); const bx = mesh(G.box(5, 1.6, 4), '#C9A36B', [0, .8, 0]); sc.add(bx); sc.add(mesh(G.box(5.02, .2, .6), '#D9B98A', [0, 1.62, 0], { cast: false }));
    const V = X.TL.vars; const lab = canvasPlane(3.6, 2.6, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.strokeStyle = INK; x.lineWidth = 8; x.strokeRect(4, 4, W - 8, H - 8) }, 512); lab.rotation.x = -Math.PI / 2; lab.position.set(0, 1.62, .2); sc.add(lab);
    const rows = V.unsur.map((u, i) => card(root, `${i + 1}. ${u}`, { left: 290, top: 760 + i * 92, fontSize: '40px', background: '#FFFFFF' }, i === 4 ? '#C9472F' : INK)); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .2) * .5, 12, 6); cam.lookAt(0, 1, .3); const cues = ['nama jalan', 'nomor rumah', 'RT', 'kode pos', 'patokan']; rows.forEach((e, i) => { const c = at(s, cues[i], 1 + i); X.pop(e, seg(t, c, c + .35)) }) } };
  },
  K_SQ03_NOSIGN(s, root) {   // orbit desa: tiang papan jalan kosong, label "dekat sumur" muncul di atas SEMUA rumah
    const sc = newScene(SUNNY()); const L = lahan(sc, { well: true }); const hs = rowHouses(sc, -6.4, -3, 1.6); const post = group(sc, [1.6, 0, 6]); post.add(mesh(G.box(.12, 2.4, .12), '#7D8A94', [0, 1.2, 0])); post.add(mesh(G.box(1.8, .5, .06), '#DDDDDD', [0, 2.3, 0]));
    const tags = hs.map(() => tag3(root, '📍 dekat sumur', '#C9472F')); const qq = tag3(root, '❓', INK); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-35, 25, E.inout(seg(t, 0, dur))), 9, 20, [0, .5, -1]); qq.at(post, cam, [0, 2.9, 0], seg(t, .5, .9)); const tp = at(s, 'dekat sumur', 5); hs.forEach((h, i) => tags[i].at(h, cam, [0, 2.4, 0], seg(t, tp + i * .25, tp + .35 + i * .25))) } };
  },
  K_SQ03_TIPS(s, root) {   // tiga masjid kecil berjajar (patokan ambigu) lalu pin lokasi + HP
    const sc = newScene(SUNNY({ sky: ['#9FD6F5', '#F3FBFF'] })); island(sc, 18, 10, '#8BC34A', '#8D6E4A');
    const ms = [-5, 0, 5].map(x => { const g = group(sc, [x, 0, -1]); g.add(mesh(G.box(2.2, 1.6, 2), '#FFFFFF', [0, .8, 0])); g.add(mesh(G.sph(.8, 12, 8), '#2E7D5B', [0, 1.9, 0], { s: [1, .8, 1] })); g.add(mesh(G.cyl(.15, .15, 2.6, 8), '#FFFFFF', [1.2, 1.3, .8])); return g });
    const xs = ms.map(() => tag3(root, '🕌 yang mana?', '#C9472F')); const pin = txtSprite('📍', '#FFFFFF', INK, 1.2); sc.add(pin);
    const C = [['✅ patokan unik', 'unik'], ['📱 nomor HP aktif', 'aktif'], ['📍 kirim titik lokasi', 'lokasi']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, DG) })); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(8, -8, seg(t, 0, dur)), 5, 25, [0, 1, -1]); const tm = at(s, 'masjidnya', 2.5); ms.forEach((m, i) => xs[i].at(m, cam, [0, 3.4, 0], seg(t, tm + i * .3, tm + .4 + i * .3) * (t < at(s, 'lokasi', 99) ? 1 : 0)));
      const tl = at(s, 'lokasi', 99); pin.visible = t > tl; pin.position.set(0, 3.4 + Math.abs(Math.sin(t * 4)) * .4, -1); C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K_SQ03_NUMBER(s, root) {   // kades memasang plat nomor satu per satu, kamera mengikuti dari samping
    const sc = newScene(SUNNY({ sky: ['#F7D9A8', '#FFF6E6'], sun: '#FFE0B0', sunPos: [-12, 12, 8] })); lahan(sc, {}); const hs = rowHouses(sc, -6.4, -3, 1.6);
    const plates = hs.map((h, i) => { const pl = canvasPlane(.7, .45, signText(String(i + 1), '#2E7D5B')); pl.position.set(h.position.x + .55, 1.1, -3 + .91); sc.add(pl); return pl });
    const tents = 'ABCDE'.split('').map((l, i) => { const t = group(sc, [-5 + i * 2.5, 0, 3]); t.add(mesh(G.cone(.9, 1.2, 4), ['#E07B39', '#3E8FC4', '#F2C14E', '#C2457A', '#6B8E5A'][i], [0, .6, 0], { rot: [0, Math.PI / 4, 0] })); const sp = txtSprite(l, CREAM, INK, .6); sp.position.set(0, 1.6, 0); t.add(sp); t.visible = false; return t });
    const K = kades([0, 0, -1.4]); sc.add(K); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tn = at(s, 'nomor', 1.5), te = at(s, 'huruf', dur - 3); const k = Math.min(4, Math.floor(Math.max(0, t - tn) / .9)); K.position.x = lerp(K.position.x, hs[k].position.x + .3, .1); K.pose(t, { walk: .5, point: true });
      plates.forEach((p, i) => p.scale.setScalar(Math.max(.001, E.back(seg(t, tn + i * .9, tn + .4 + i * .9))))); tents.forEach((x, i) => x.visible = t > te + i * .2);
      cam.position.set(K.position.x + 1, 2.6, 7); cam.lookAt(K.position.x, 1, -1.5) } };
  },
  K_SQ03_QUEST(s, root) {   // papan jalan kosong berputar menampilkan contoh nama; kartu like
    const sc = newScene(SUNNY({ sky: ['#86CBEF', '#FFF0D9'] })); village(sc); const post = group(sc, [1.8, 0, 5]); post.add(mesh(G.box(.14, 3, .14), '#7D8A94', [0, 1.5, 0])); const sign = canvasPlane(2.6, .6, signText('JL. ???', '#2E7D5B')); sign.position.set(0, 2.8, .1); post.add(sign);
    const K = kades([0, 0, 5.6]); sc.add(K); const ex = ['Jl. Sumur Raya', 'Jl. Oyen', 'Jl. Juara']; let last = -1;
    const c1 = card(root, '✍️ usul nama jalan utama', { left: 170, top: 300, fontSize: '44px' }), c2 = card(root, '❤ like terbanyak = resmi', { left: 200, top: 410, fontSize: '44px' }, '#C9472F'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, Math.sin(t * .3) * 15, 3, 9, [1, 2, 5]); K.pose(t, { wave: true, talk: true }); X.pop(c1, seg(t, .5, .9)); X.pop(c2, seg(t, at(s, 'like', 4), at(s, 'like', 4) + .4));
      const k = t < 1.5 ? -1 : Math.floor((t - 1.5) / 1.8) % 3; if (k !== last) { last = k; sign.userData.redraw(signText(k < 0 ? 'JL. ???' : ex[k] + '?', '#2E7D5B')) } post.rotation.y = Math.sin(t * .8) * .25 } };
  },
};

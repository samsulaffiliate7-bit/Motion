// Arsip shot lama nana (dipakai untuk render ulang episode lama). Episode baru: shots.js di folder episode.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin, tree, rain } from './kit.js';
import { X, BATA, INK, GOLD, CREAM, WARM, nana, dompet, tileTex, appTile, kos, chip, tag3, at } from './nana.js';

export const SHOTS = {
  D3_HOOK(s, root) {   // kamar kos senja: Nana di kasur, lima ubin aplikasi melayang
    const sc = newScene(WARM()); kos(sc);
    sc.add(mesh(G.box(3, .5, 2), '#E07B5A', [-1.4, .25, -1.8])); sc.add(mesh(G.box(3.1, .25, 2.1), '#FFF1E0', [-1.4, .62, -1.8]));
    const N = nana([-1.2, .55, -1.4]); sc.add(N); const D = dompet(sc, [.6, 0, -.8], .7);
    const apps = X.TL.vars.apps; const tiles = apps.map(([n, harga, on], i) => appTile(sc, [0, 0, 0], n, harga)); const tags = [];
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1160, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '20px 28px', textAlign: 'center', fontSize: '58px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Langganan <span style="color:${BATA}">5 aplikasi</span>.<br>Yang dibuka cuma <span style="color:${BATA}">1</span>.`);
    return { scene: sc, cam, upd(t, dur) {
      const tc = at(s, 'Cuma|cuma', 3);
      tiles.forEach((g, i) => { const a = (i - 2) * .42 + Math.sin(t * .5) * .05; g.position.set(-.6 + Math.sin(a) * 2.6, 3.1 + Math.cos(a) * .5 + Math.sin(t * 2 + i) * .08, -1 + Math.cos(a) * .4); g.rotation.y = -a * .6; g.scale.setScalar(Math.max(.001, E.back(seg(t, .4 + i * .15, .8 + i * .15)))); g.set(t < tc || apps[i][2]) });
      tags.forEach((g, i) => g.at(tiles[i], cam, [0, -.62, 0], seg(t, 1.2 + i * .15, 1.6 + i * .15)));
      orbit(cam, lerp(18, 4, E.inout(seg(t, 0, dur))), 2.4, lerp(12, 10, seg(t, 0, dur)), [-.5, 1.5, -1.2]);
      N.pose(t, { hold: true, look: -.2, talk: true }); D.mood(t, t > tc);
      X.pop(hook, seg(t, .1, .5));
    } };
  },
  D3_TV(s, root) {   // ruang TV malam: satu aplikasi menyala, empat nganggur berdebu di rak
    const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: .9, hemi: .6, sun: '#C9B4FF' })); kos(sc, { wall: '#C9A98A' });
    sc.add(mesh(G.box(2.6, .55, 1), '#6B4A8A', [0, .28, 1.4])); sc.add(mesh(G.box(2.6, .9, .3), '#6B4A8A', [0, .7, 1.85]));
    const N = nana([0, .3, 1.35]); sc.add(N); N.rotation.y = Math.PI;
    sc.add(mesh(G.box(2.8, 1.6, .12), '#111', [0, 2.2, -3.8])); const scr = mesh(G.box(2.6, 1.42, .02), '#E5484D', [0, 2.2, -3.73], { mat: { emissive: '#E5484D', emissiveIntensity: 1.2 }, cast: false }); sc.add(scr);
    const tvL = new THREE.PointLight('#FF8080', 4, 7); tvL.position.set(0, 2, -2.8); sc.add(tvL);
    sc.add(mesh(G.box(1.2, .08, 3.4), '#7A5230', [-4.3, 2.6, -1])); const idle = X.TL.vars.apps.filter(a => !a[2]).map(([n], i) => { const g = appTile(sc, [-4.3, 3.05, -2.4 + i * .95], n); g.set(false); g.rotation.y = Math.PI / 2; g.scale.setScalar(.7); return g });
    const web = mesh(G.box(.02, .9, 3), '#DDDDDD', [-4.1, 3.2, -1], { mat: { transparent: true, opacity: .35 }, cast: false }); sc.add(web);
    const cam = camera(42);
    const c1 = chip(root, '▶ yang dibuka: <b>Film</b>', { left: 70, top: 300 }, '#E5484D'), c2 = chip(root, '😴 4 aplikasi nganggur, tetap ditagih', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) {
      const tn = at(s, 'Nganggur|nganggur', 4); const p = E.inout(seg(t, tn - 1, tn + 1.2));
      cam.position.set(lerp(1.6, -1.6, p), lerp(2.8, 3.2, p), lerp(6.8, 2.4, p)); cam.lookAt(lerp(0, -4.3, p), lerp(1.8, 3, p), lerp(-1.5, -1, p));
      scr.material.emissive.setHSL(((t * .05) % 1), .7, .5); N.pose(t, { hold: true });
      X.pop(c1, seg(t, 1, 1.4)); X.pop(c2, seg(t, tn, tn + .4));
    } };
  },
  D3_RECEIPT(s, root) {   // printer di meja mencetak struk panjang berisi lima tagihan
    const sc = newScene(WARM()); kos(sc); sc.add(mesh(G.box(3.2, .1, 1.6), '#E7D2B5', [0, .9, -1])); [[-1.5, -.7], [1.5, -.7], [-1.5, .7], [1.5, .7]].forEach(([x, z]) => sc.add(mesh(G.box(.08, .9, .08), '#6B4A2A', [x, .45, -1 + z * .9])));
    const pr = group(sc, [0, .95, -1.3]); pr.add(mesh(G.box(1.2, .5, .7), '#3A3A40', [0, .25, 0])); pr.add(mesh(G.box(.9, .04, .1), '#111', [0, .4, .36]));
    const c = document.createElement('canvas'); c.width = 400; c.height = 1100; const x = c.getContext('2d'); x.fillStyle = '#FFFDF7'; x.fillRect(0, 0, 400, 1100); x.fillStyle = INK; x.font = '800 44px Baloo'; x.textAlign = 'center'; x.fillText('TAGIHAN BULANAN', 200, 70);
    x.textAlign = 'left'; x.font = '700 36px Baloo'; X.TL.vars.apps.forEach(([n, h, on], i) => { x.fillStyle = on ? '#2E7D32' : INK; x.fillText(n, 30, 170 + i * 110); x.textAlign = 'right'; x.fillText(h, 370, 170 + i * 110); x.textAlign = 'left'; if (!on) { x.fillStyle = '#C8501E'; x.font = '700 24px Baloo'; x.fillText('nggak dibuka', 30, 205 + i * 110); x.font = '700 36px Baloo' } });
    x.setLineDash([12, 10]); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(20, 760); x.lineTo(380, 760); x.stroke(); x.font = '800 46px Baloo'; x.fillStyle = BATA; x.fillText('TOTAL', 30, 840); x.textAlign = 'right'; x.fillText(X.TL.vars.total_rp, 370, 840);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const rcpt = new THREE.Mesh(G.plane(.8, 2.2), new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: .8 })); sc.add(rcpt);
    const D = dompet(sc, [1.1, .95, -.6], .5);
    const cam = camera(40);
    const big = chip(root, `Total: <span style="color:${BATA}">${X.TL.vars.total_rp}</span>/bulan`, { left: 140, top: 300, fontSize: '54px' }), small = chip(root, 'yang kepakai: <b style="color:#2E7D32">Rp65.000</b>', { left: 190, top: 430 });
    return { scene: sc, cam, upd(t, dur) {
      const L = E.out(seg(t, .3, dur * .55)); // struk keluar: tekstur dipotong sesuai panjang
      rcpt.scale.y = Math.max(.01, L); rcpt.position.set(0, 1.35 - 1.1 * L * 0 + .02, -.95 + L * 1.1); rcpt.rotation.x = -Math.PI / 2 + .25; rcpt.position.y = 1.0; rcpt.position.z = -.95 + 1.1 * L;
      tex.offset.y = 1 - L; tex.repeat.y = L;
      cam.position.set(Math.sin(t * .3) * .5, lerp(3.6, 2.6, seg(t, 0, dur)), lerp(2.4, 1.6, seg(t, 0, dur))); cam.lookAt(0, .95, -.2);
      D.mood(t, t > at(s, 'Padahal', 5)); const tt = at(s, 'totalnya', 1.5), tp = at(s, 'Padahal', 5); X.pop(big, seg(t, tt, tt + .4)); X.pop(small, seg(t, tp, tp + .4));
    } };
  },
  D3_CALENDAR(s, root) {   // kalender dinding membalik 12 bulan, koin menumpuk, Si Dompet menangis
    const sc = newScene(WARM({ sky: ['#E98C5A', '#FFD9B0'] })); kos(sc);
    const cal = group(sc, [-1.6, 3, -3.85]); const cc = document.createElement('canvas'); cc.width = 320; cc.height = 380; const cx = cc.getContext('2d'); const ctex = new THREE.CanvasTexture(cc); ctex.colorSpace = THREE.SRGBColorSpace; let lastK = -1;
    const drawCal = k => { if (k === lastK) return; lastK = k; cx.fillStyle = '#FFFFFF'; cx.fillRect(0, 0, 320, 380); cx.fillStyle = BATA; cx.fillRect(0, 0, 320, 80); cx.fillStyle = '#fff'; cx.font = '800 50px Baloo'; cx.textAlign = 'center'; cx.fillText('BULAN', 160, 58);
      cx.fillStyle = INK; cx.font = '800 120px Baloo'; cx.fillText(['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'][Math.max(0, k - 1)], 160, 230); cx.font = '800 54px Baloo'; cx.fillStyle = BATA; cx.fillText(`ke-${Math.max(1, k)}`, 160, 320); ctex.needsUpdate = true };
    drawCal(0); cal.add(new THREE.Mesh(G.box(1.6, 1.9, .05), [mat('#EEE'), mat('#EEE'), mat('#EEE'), mat('#EEE'), new THREE.MeshStandardMaterial({ map: ctex }), mat('#EEE')]));
    const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
    const D = dompet(sc, [1.3, 0, -1.2], 1.2); const coins = Array.from({ length: 12 }, (_, i) => coin(sc, [-.2, -3, -1], 2.2));
    const cam = camera(42);
    const mon = X.ab({ left: 0, top: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '64px', color: INK }, root); const calTag = tag3(root, '');
    const b1 = chip(root, `kebuang: <span style="color:${BATA}">${X.TL.vars.buang_rp}</span>/bulan`, { left: 90, top: 300 }), b2 = X.ab({ left: 60, top: 420, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '96px', color: '#fff', WebkitTextStroke: `16px ${BATA}`, paintOrder: 'stroke fill', opacity: 0 }, root, `${X.TL.vars.tahun_rp}<div style="font-size:48px">setahun</div>`);
    return { scene: sc, cam, upd(t, dur) {
      const t12 = at(s, 'dua belas', 3), ty = at(s, 'setahun', dur - 4), tn = at(s, 'nangis', dur - 2);
      const k = Math.min(12, Math.floor(seg(t, t12, t12 + 2.4) * 12)); [...cal.children].forEach(() => 0);
      coins.forEach((c, i) => { const q = seg(t, t12 + i * .2, t12 + i * .2 + .3); c.visible = q > 0; c.rotation.set(0, 0, 0); c.position.set(-.2 + (i % 3) * .55, lerp(4, .07 + Math.floor(i / 3) * .14, E.out(q)), -.8 + (i % 2) * .3) });
      drawCal(k);
      orbit(cam, lerp(-10, 10, seg(t, 0, dur)), 2.6, lerp(12, 10.5, E.inout(seg(t, 0, dur))), [0, 1.7, -1.8]);
      D.mood(t, t > tn - .5); X.pop(b1, seg(t, .3, .7)); const q = seg(t, ty, ty + .5); b2.style.opacity = q; b2.style.transform = `scale(${E.back(q)})`;
    } };
  },
  D3_TIPS(s, root) {   // tampak atas meja: tiga catatan tempel + HP pengingat
    const sc = newScene(WARM({ sunPos: [-3, 12, 4] })); sc.add(mesh(G.box(8, .3, 6), '#D9B48A', [0, -.15, 0]));
    const notes = X.TL.vars.tips.map(([ic, h, d], i) => { const c = document.createElement('canvas'); c.width = 400; c.height = 400; const x = c.getContext('2d'); x.fillStyle = ['#FFE680', '#FFB3C1', '#9DE0B8'][i]; x.fillRect(0, 0, 400, 400);
      x.fillStyle = INK; x.textAlign = 'center'; x.font = '800 90px Baloo'; x.fillText(String(i + 1), 200, 110); x.font = '800 52px Baloo'; x.fillText(h, 200, 210); x.font = '700 30px Baloo'; const w = d.split(' '); let l = '', y = 280; w.forEach(k => { if (x.measureText(l + k).width > 340) { x.fillText(l, 200, y); l = ''; y += 40 } l += k + ' ' }); x.fillText(l, 200, y);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(G.box(1.7, .02, 1.7), [mat('#EEE'), mat('#EEE'), new THREE.MeshStandardMaterial({ map: t }), mat('#EEE'), mat('#EEE'), mat('#EEE')]); m.castShadow = true; sc.add(m); m.position.set((i % 2 ? .35 : -.35), .02, -2.3 + i * 2.15); m.rotation.y = (i - 1) * .12; return m });
    const ph = group(sc, [1.6, .05, 3.6]); ph.add(mesh(G.box(.8, .05, 1.5), '#1B1B1F', [0, 0, 0])); ph.add(mesh(G.box(.7, .01, 1.3), '#FFF6E6', [0, .03, 0], { mat: { emissive: '#FFF6E6', emissiveIntensity: .4 }, cast: false }));
    const D = dompet(sc, [-1.5, .02, 3.7], .6); const cam = camera(40);
    return { scene: sc, cam, upd(t, dur) {
      (X.TL.vars.tip_cues || ['cek', 'rotasi', 'tanggal']).forEach((cu, i) => { const tc = at(s, cu, 2 + i * 4); const q = E.back(seg(t, tc, tc + .5)); notes[i].scale.setScalar(Math.max(.001, q)); notes[i].position.y = .02 + (1 - Math.min(1, q)) * 1.5 });
      cam.position.set(Math.sin(t * .15) * .3, 10.5, 3.2); cam.lookAt(0, 0, .6); D.mood(t, false);
    } };
  },

  D3_KITCHEN(s, root) {   // dapur kos jam 6 pagi: Nana masak, kotak bekal terisi
    const sc = newScene(WARM({ sky: ['#FFC98A', '#FFF3DE'], sunPos: [-6, 6, 8] })); kos(sc, { wall: '#FFE7C8' });
    sc.add(mesh(G.box(4, .9, 1), '#FFFFFF', [0, .45, -3.3])); sc.add(mesh(G.box(4, .08, 1.05), '#D9B48A', [0, .94, -3.3]));
    const pan = group(sc, [-.8, 1, -3.2]); pan.add(mesh(G.cyl(.35, .3, .1, 16), '#333', [0, 0, 0])); pan.add(mesh(G.box(.5, .04, .06), '#333', [.55, .02, 0])); const food = mesh(G.cyl(.28, .28, .05, 12), '#E8A33D', [0, .06, 0], { cast: false }); pan.add(food);
    const steam = [0, 1, 2].map(i => { const m = mesh(G.ico(.12, 1), '#FFFFFF', [-.8, 1.2, -3.2], { cast: false, mat: { transparent: true, opacity: .6 } }); sc.add(m); return m });
    const boxes = [0, 1, 2].map(i => { const g = group(sc, [.5 + i * .55, .98, -3.1]); g.add(mesh(G.box(.45, .16, .32), ['#3E8FC4', '#E5484D', '#2E9C6A'][i], [0, .08, 0])); const lid = mesh(G.box(.47, .04, .34), '#FFFFFF', [0, .18, 0]); g.add(lid); g.userData.lid = lid; return g });
    const N = nana([-.3, 0, -2.1]); sc.add(N); N.rotation.y = Math.PI; const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '54px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root, `Eksperimen sebulan: <span style="color:${BATA}">bawa bekal</span>.<br>Hematnya berapa?`);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(lerp(3.8, 2.6, seg(t, 0, dur)), 3, 3.6); cam.lookAt(0, 1.1, -2.8);
      steam.forEach((m, i) => { const q = (t * .5 + i / 3) % 1; m.position.set(-.8 + Math.sin(t + i) * .1, 1.2 + q * 1.2, -3.2); m.scale.setScalar(.5 + q) });
      N.pose(t, { hold: true }); N.userData.st.arms[1].rotation.x = -1.2 + Math.sin(t * 6) * .3; boxes.forEach((b, i) => b.userData.lid.position.y = t > 3 + i * .8 ? .18 : .5); X.pop(hook, seg(t, .2, .6)) } };
  },
  D3_WARUNG(s, root) {   // antre warung makan siang: papan harga, struk harian
    const sc = newScene(WARM({ sky: ['#FFD27A', '#FFF6DE'], sunPos: [4, 14, 6], sunI: 2.8 })); sc.add(mesh(G.box(20, .2, 14), '#C9B79A', [0, -.1, 0]));
    const stall = group(sc, [0, 0, -2.5]); stall.add(mesh(G.box(4, 1, 1.2), '#7A5230', [0, .5, 0])); stall.add(mesh(G.box(4.4, .12, 1.8), '#E5484D', [0, 2.6, .2], { rot: [.2, 0, 0] })); [-2, 2].forEach(x => stall.add(mesh(G.box(.1, 2.6, .1), '#5A3A20', [x, 1.3, .5])));
    const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d'); x.fillStyle = '#FFF6E6'; x.fillRect(0, 0, 512, 256); x.fillStyle = INK; x.font = '800 56px Baloo'; x.textAlign = 'center'; x.fillText('NASI + LAUK', 256, 100); x.fillStyle = BATA; x.font = '800 80px Baloo'; x.fillText(X.TL.vars.beli_rp, 256, 200);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; const board = new THREE.Mesh(G.plane(1.8, .9), new THREE.MeshStandardMaterial({ map: tex })); board.position.set(1.2, 1.8, -1.85); sc.add(board);
    const q = [0, 1, 2, 3].map(i => { const P = person(sc, [-.4, 0, .2 + i * .9], { body: ['#3E8FC4', '#6B8E5A', '#C2457A', '#E07B39'][i], hair: '#2A1A10', skin: '#D9A07A' }); P.rotation.y = Math.PI; return P }); const N = nana([-.4, 0, 3.8]); sc.add(N); N.rotation.y = Math.PI;
    const cam = camera(42); const c1 = chip(root, `${X.TL.vars.beli_rp} × ${X.TL.vars.hari} hari kerja`, { left: 70, top: 300 }), c2 = chip(root, `= <span style="color:${BATA}">${X.TL.vars.beli_bln_rp}</span>/bulan`, { left: 70, top: 410, fontSize: '50px' });
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(40, 20, seg(t, 0, dur)), 4.4, 16, [0, 1.2, .6]); q.forEach((p, i) => p.pose(t + i, { look: Math.sin(t * .5 + i) * .3 })); N.pose(t, { look: .3, hold: true });
      const ta = at(s, 'rupiah sekali', 2), tb = at(s, 'sebulan', 5); X.pop(c1, seg(t, ta, ta + .4)); X.pop(c2, seg(t, tb, tb + .4)) } };
  },
  D3_SCALE(s, root) {   // timbangan raksasa: beli vs bekal
    const sc = newScene(WARM({ sky: ['#F7B06A', '#FFE9C8'] })); kos(sc); const base = group(sc, [0, 0, -1]); base.add(mesh(G.cyl(.5, .7, .3, 16), '#8B5A2B', [0, .15, 0])); base.add(mesh(G.cyl(.08, .08, 2.4, 8), '#6B4226', [0, 1.4, 0]));
    const beam = group(base, [0, 2.6, 0]); beam.add(mesh(G.box(4, .1, .1), '#6B4226', [0, 0, 0]));
    const pans = [-1, 1].map(sx => { const p = group(beam, [sx * 1.9, -.6, 0]); p.add(mesh(G.cyl(.7, .6, .1, 20), '#C9A27A', [0, 0, 0])); p.add(mesh(G.cyl(.01, .01, .6, 4), '#555', [0, .3, 0])); return p });
    const A = group(pans[0], [0, .1, 0]); A.add(mesh(G.box(.8, .25, .5), '#E5484D', [0, .12, 0])); const B = group(pans[1], [0, .1, 0]); B.add(mesh(G.box(.6, .2, .4), '#2E9C6A', [0, .1, 0]));
    const cam = camera(42); const D = dompet(sc, [2.4, 0, .6], .8);
    const tl = tag3(root, `beli: ${X.TL.vars.beli_bln_rp}`, BATA), tr = tag3(root, `bekal: ${X.TL.vars.bekal_bln_rp}`, '#2E7D32'); const big = chip(root, `hemat <span style="color:#2E7D32">${X.TL.vars.hemat_rp}</span>/bulan`, { left: 140, top: 300, fontSize: '52px' });
    return { scene: sc, cam, upd(t, dur) { const th = at(s, 'Selisihnya', 5); beam.rotation.z = lerp(0, .22, E.out(seg(t, 1, 3))) + Math.sin(t * 2) * .02;
      cam.position.set(0, 2.6, 11.5 - t * .06); cam.lookAt(0, 1.7, -1); tl.at(pans[0], cam, [0, .8, 0], seg(t, .8, 1.2)); tr.at(pans[1], cam, [0, .8, 0], seg(t, at(s, 'bekal', 1.5), at(s, 'bekal', 1.5) + .4)); X.pop(big, seg(t, th, th + .4)); D.mood(t, false) } };
  },
  D3_JAR(s, root) {   // toples tabungan terisi koin, Si Dompet akhirnya senyum
    const sc = newScene(WARM()); kos(sc); sc.add(mesh(G.box(3, .1, 1.6), '#E7D2B5', [0, .9, -1])); sc.add(mesh(G.box(2.8, .85, 1.4), '#A86B35', [0, .45, -1]));
    const jar = new THREE.Mesh(G.cyl(.6, .6, 1.4, 24), new THREE.MeshStandardMaterial({ color: '#DDF3FF', transparent: true, opacity: .35, roughness: .1 })); jar.position.set(-.4, 1.65, -1); sc.add(jar);
    const coins = Array.from({ length: 24 }, (_, i) => coin(sc, [0, -5, 0], 1.6)); const D = dompet(sc, [.9, .95, -.8], .55); const cam = camera(40);
    const big = X.ab({ left: 60, top: 330, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '96px', color: '#fff', WebkitTextStroke: `16px #2E7D32`, paintOrder: 'stroke fill', opacity: 0 }, root, `${X.TL.vars.tahun_rp}<div style="font-size:46px">setahun</div>`);
    const c1 = chip(root, '≈ 6 bulan makan siang beli', { left: 200, top: 560 }, '#2E7D32');
    return { scene: sc, cam, upd(t, dur) { const t0 = at(s, 'dua belas', 1); coins.forEach((c, i) => { const q = seg(t, t0 + i * .12, t0 + i * .12 + .4); c.visible = q > 0; c.position.set(-.4 + Math.sin(i * 2.4) * .3, lerp(3.2, 1.0 + Math.floor(i / 4) * .1, E.out(q)), -1 + Math.cos(i * 2.4) * .3); c.rotation.set(Math.PI / 2 * (1 - q), 0, 0) });
      cam.position.set(Math.sin(t * .3) * .4, 2.4, 5.4 - t * .05); cam.lookAt(0, 1.3, -1); const ty = at(s, 'rupiah', 3); const q = seg(t, ty, ty + .5); big.style.opacity = q; big.style.transform = `scale(${E.back(q)})`; X.pop(c1, seg(t, at(s, 'enam bulan', 5), at(s, 'enam bulan', 5) + .4)); D.mood(t, false) } };
  },
  D3_OFFICE(s, root) {   // kantor siang: Nana makan bekal bareng teman, pilihan A/B
    const sc = newScene(WARM({ sky: ['#BFE3F5', '#F4FBFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [6, 12, 6] })); sc.add(mesh(G.box(14, .2, 14), '#A9B4C2', [0, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), '#EEF2F7', [0, 3, 3.5]));
    sc.add(mesh(G.box(3, .08, 1.4), '#E7DCCB', [0, .78, -1])); const N = nana([-.6, 0, -.1]), F = person(sc, [.7, 0, -.1], { body: '#6B8E5A', hair: '#2A1A10', skin: '#C98E64' }); sc.add(N); N.rotation.y = Math.PI; F.rotation.y = Math.PI;
    [[-.6, '#2E9C6A'], [.7, '#E5484D']].forEach(([x, c]) => sc.add(mesh(G.box(.45, .16, .32), c, [x, .9, -.8])));
    const cam = camera(42); const ab = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:${BATA};color:#fff;font-family:Baloo;font-weight:800;font-size:44px;padding:18px 26px;border-radius:24px;border:6px solid ${INK};text-align:center">A<br><span style="font-size:32px">beli makan siang</span></div><div style="background:#2E7D32;color:#fff;font-family:Baloo;font-weight:800;font-size:44px;padding:18px 26px;border-radius:24px;border:6px solid ${INK};text-align:center">B<br><span style="font-size:32px">bawa bekal</span></div>`);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(0, 2, -4 + .1); cam.position.set(Math.sin(t * .3) * .5, 2.4, -6); cam.lookAt(0, 1.2, -.1); N.pose(t, { talk: true, hold: true }); F.pose(t, { nod: true }); const q = seg(t, .4, .9); ab.style.opacity = q; ab.style.transform = `scale(${E.back(q)})` } };
  },
  D3_OUTRO(s, root) {   // balkon senja: Nana dan Si Dompet melambai, pilihan A/B
    const sc = newScene(WARM({ sky: ['#F27D52', '#FFD59E'], sunPos: [-6, 4, -8] })); sc.add(mesh(G.box(6, .2, 3), '#C9A27A', [0, -.1, 0])); sc.add(mesh(G.box(6, .9, .1), '#7A5230', [0, .45, 1.45]));
    for (let i = 0; i < 14; i++) { const h = 2 + ((i * 41) % 6); sc.add(mesh(G.box(1.8, h, 1.8), ['#D9A57A', '#C98E64', '#E8B78A'][i % 3], [-14 + i * 2.2, h / 2 - 3, -12 - (i % 2) * 2], { cast: false })) }
    sc.add(mesh(G.ico(1.6, 2), '#FFD27A', [3, 2.5, -20], { mat: { emissive: '#FFB347', emissiveIntensity: 1 }, cast: false }));
    const N = nana([-.6, 0, .3]), D = dompet(sc, [.7, .9, 1.4], .5); sc.add(N);
    const cam = camera(42);
    const ab = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:${BATA};color:#fff;font-family:Baloo;font-weight:800;font-size:44px;padding:18px 26px;border-radius:24px;border:6px solid ${INK};text-align:center">A<br><span style="font-size:32px">langganan banyak</span></div><div style="background:#2E7D32;color:#fff;font-family:Baloo;font-weight:800;font-size:44px;padding:18px 26px;border-radius:24px;border:6px solid ${INK};text-align:center">B<br><span style="font-size:32px">rotasi satu-satu</span></div>`);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .3) * .4, 2.2, 7.2 - t * .06); cam.lookAt(0, 1.2, 0); N.pose(t, { wave: true, talk: true }); D.mood(t, false); const q = seg(t, .4, .9); ab.style.opacity = q; ab.style.transform = `scale(${E.back(q)})` } };
  },
  // ===== ep006 (Bongkar Jebakan: titip dana 10%/bulan) =====
  D3_CHATHOOK(s, root) {   // kafe sore: tawaran "titip dana" masuk di HP raksasa
    const sc = newScene(WARM({ sky: ['#F0905A', '#FFE2B8'], sunPos: [-9, 5, 4] })); sc.add(mesh(G.box(16, .2, 14), '#8A5A3A', [0, -.1, 0])); sc.add(mesh(G.box(16, 6, .2), '#E9C49A', [0, 3, -4]));
    [-3.6, 3.6].forEach(x => { sc.add(mesh(G.box(2.6, 2.4, .05), '#FFB36B', [x, 3.1, -3.88], { mat: { emissive: '#FF9F4A', emissiveIntensity: .7 }, cast: false })); sc.add(mesh(G.box(2.7, .1, .1), '#5A3A20', [x, 1.85, -3.8])) });
    for (let i = 0; i < 5; i++) sc.add(mesh(G.cyl(.18, .18, .02, 12), '#FFE8B0', [-4 + i * 2, 5.4, -1], { mat: { emissive: '#FFD27A', emissiveIntensity: 1.2 }, cast: false }));
    const tb = group(sc, [0, 0, -.6]); tb.add(mesh(G.cyl(.9, .9, .08, 20), '#F4E4CC', [0, .82, 0])); tb.add(mesh(G.cyl(.08, .12, .8, 8), '#3A2A1E', [0, .4, 0]));
    [[-.35, '#FFFFFF'], [.4, '#E9D2B0']].forEach(([x, c]) => { tb.add(mesh(G.cyl(.13, .1, .22, 12), c, [x, .97, .2])) });
    const N = nana([.9, 0, -1.5]); sc.add(N); const D = dompet(sc, [.45, .86, .05], .32);
    const msgs = X.TL.vars.chat; const c = document.createElement('canvas'); c.width = 512; c.height = 1024; const x = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; let last = -1;
    const draw = n => { if (n === last) return; last = n; x.fillStyle = '#F3EDE4'; x.fillRect(0, 0, 512, 1024); x.fillStyle = '#2E7D5B'; x.fillRect(0, 0, 512, 110); x.fillStyle = '#fff'; x.font = '800 44px Baloo'; x.textAlign = 'left'; x.fillText('Dita (temen SMA)', 30, 72);
      let y = 170; msgs.slice(0, n).forEach(m => { x.font = '800 38px Baloo'; const lines = []; let l = ''; m.split(' ').forEach(w => { if (x.measureText(l + w).width > 360) { lines.push(l); l = '' } l += w + ' ' }); lines.push(l); const h = 30 + lines.length * 46;
        x.fillStyle = '#FFFFFF'; x.beginPath(); x.roundRect(28, y, 420, h, 22); x.fill(); x.fillStyle = INK; lines.forEach((ln, i) => x.fillText(ln, 50, y + 50 + i * 46)); y += h + 26 }); tex.needsUpdate = true };
    draw(0); const ph = group(sc, [-.75, 2.75, 1.2]); ph.add(mesh(G.box(1.5, 2.9, .12), '#1B1B1F', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(1.36, 2.72), new THREE.MeshBasicMaterial({ map: tex })); scr.position.z = .065; ph.add(scr);
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1150, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Untung <span style="color:${BATA}">10% sebulan</span>, "dijamin".<br>Gue hitung dulu.`);
    return { scene: sc, cam, upd(t, dur) {
      draw(Math.min(msgs.length, Math.floor(seg(t, .2, 3.2) * msgs.length + .999)));
      ph.rotation.y = .18 + Math.sin(t * .8) * .05; ph.position.y = 2.75 + Math.sin(t * 1.3) * .06; ph.scale.setScalar(E.back(seg(t, 0, .5)) || .001);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(.9, .2, p), lerp(2.5, 2.3, p), lerp(9.2, 7.6, p)); cam.lookAt(-.35, 2.15, -.4);
      N.pose(t, { look: -.5, talk: t > at(s, 'Ini cara', 4) }); D.mood(t, t > 2.5); X.pop(hook, seg(t, .1, .5));
    } };
  },
  D3_TOWER(s, root) {   // kamar malam: 12 tumpukan koin, tiap bulan tumbuh 10% dari bulan sebelumnya
    const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: 1, hemi: .8, sun: '#FFD9A8', sunPos: [-4, 8, 6] })); kos(sc, { wall: '#C9A98A' });
    sc.add(mesh(G.box(9, .12, 2), '#7A5230', [0, .9, -2])); sc.add(mesh(G.box(8.8, .85, 1.8), '#5E3E22', [0, .44, -2]));
    const lamp = new THREE.PointLight('#FFC27A', 9, 9); lamp.position.set(-2, 3, -.5); sc.add(lamp);
    const cols = Array.from({ length: 12 }, (_, i) => { const g = group(sc, [-3.85 + i * .7, .96, -2]); g.add(mesh(G.cyl(.24, .24, 1, 16), '#F5C542', [0, .5, 0], { mat: { metalness: .45, roughness: .35 } })); for (let k = 0; k < 10; k++) g.add(mesh(G.cyl(.255, .255, .02, 16), '#C9921A', [0, .05 + k * .1, 0], { cast: false })); return g });
    const H = i => .25 * Math.pow(1.1, i + 1) / 1.1;   // tinggi sebanding nilai bulan ke-(i+1)
    const cam = camera(42); const tags = [tag3(root, 'bulan 1'), tag3(root, 'bulan 12', BATA)];
    const big = X.ab({ left: 60, top: 300, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '92px', color: '#fff', WebkitTextStroke: `16px ${BATA}`, paintOrder: 'stroke fill', opacity: 0 }, root, `Rp${X.TL.vars.t1jt} juta+<div style="font-size:46px">dari Rp10 juta, setahun</div>`);
    const c3 = chip(root, '≈ 3× lipat', { left: 380, top: 560, fontSize: '52px' }, BATA);
    return { scene: sc, cam, upd(t, dur) {
      const t0 = at(s, 'diputar', 2), tr = at(s, 'rupiah', dur * .55), t3 = at(s, 'tiga kali', dur * .75);
      cols.forEach((g, i) => { const q = E.out(seg(t, t0 + i * .22, t0 + i * .22 + .5)); g.scale.set(1, Math.max(.001, q * H(i) * 1.6), 1) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2.6, 2.2, p), lerp(2.2, 2.8, p), lerp(6.4, 7.4, p)); cam.lookAt(lerp(-1.4, 1.2, p), 1.6, -2);
      tags[0].at(cols[0], cam, [0, H(0) * 1.6 + .5, 0], seg(t, t0, t0 + .4)); tags[1].at(cols[11], cam, [0, H(11) * 1.6 + .3, 0], seg(t, t0 + 2.6, t0 + 3));
      const q = seg(t, tr, tr + .5); big.style.opacity = q; big.style.transform = `scale(${E.back(q)})`; X.pop(c3, seg(t, t3, t3 + .4));
    } };
  },
  D3_SKYLINE(s, root) {   // atap kota senja: menara koin menembus awan, kamera crane naik
    const sc = newScene(WARM({ sky: ['#E8704A', '#FFD49A'], sunPos: [-10, 4, -6], fog: ['#FFD9B0', 30, 90], shadow: 18 })); sc.add(mesh(G.box(60, .2, 60), '#9C7A5A', [0, -.1, 0]));
    for (let i = 0; i < 40; i++) { const a = i * 2.39, r = 7 + (i % 7) * 2.6, h = 2 + ((i * 53) % 9); sc.add(mesh(G.box(2, h, 2), ['#D9A57A', '#C98E64', '#E8B78A', '#B9876A'][i % 4], [Math.sin(a) * r, h / 2, Math.cos(a) * r - 6], { cast: i % 2 === 0 })) }
    const tower = group(sc, [0, 0, -4]); const rings = Array.from({ length: 60 }, (_, i) => { const m = mesh(G.cyl(1.2, 1.2, .5, 20), i % 2 ? '#F5C542' : '#E6B230', [0, .25 + i * .5, 0], { mat: { metalness: .45, roughness: .35 } }); tower.add(m); return m });
    const clouds = [[-6, 18, -8], [5, 22, -6], [-2, 26, -2]].map(p => { const g = group(sc, p); [[0, 0, 0, 1.6], [1.4, -.2, .2, 1.1], [-1.4, -.3, 0, 1]].forEach(([x, y, z, r]) => g.add(mesh(G.ico(r, 1), '#FFF4E6', [x, y, z], { cast: false }))); return g });
    const N = nana([3.2, 0, 2]); sc.add(N); N.rotation.y = -.6;
    const cam = camera(44); const v = X.TL.vars;
    const c1 = chip(root, `3 tahun ≈ <span style="color:${BATA}">Rp${v.t3jt} juta</span>`, { left: 70, top: 300 }), c2 = chip(root, `5 tahun ≈ <span style="color:${BATA}">Rp3 miliar</span>`, { left: 70, top: 410, fontSize: '52px' });
    const c3 = chip(root, '…tapi yang nawarin masih pinjem duit buat bayar kos 🤔', { left: 50, top: 560, fontSize: '34px', whiteSpace: 'normal', width: '900px' });
    return { scene: sc, cam, upd(t, dur) {
      const ta = at(s, 'tiga tahun', 1), tb = at(s, 'Lima tahun', 4), tc = at(s, 'pinjem', dur - 3);
      const nOn = Math.floor(lerp(14, 60, E.inout(seg(t, ta - .5, tb + 1.5)))); rings.forEach((r, i) => r.visible = i < nOn);
      const top = nOn * .5; cam.position.set(9 + Math.sin(t * .2), lerp(3, Math.min(top + 2, 30), E.inout(seg(t, ta - .3, tb + 1.8))), 12); cam.lookAt(0, lerp(4, Math.min(top, 28), E.inout(seg(t, ta - .3, tb + 1.8))), -4);
      if (t > tc - 1.4) { const q = E.inout(seg(t, tc - 1.4, tc + .2)); cam.position.set(lerp(9, 6, q), lerp(Math.min(top + 2, 30), 2.6, q), lerp(12, 7, q)); cam.lookAt(lerp(0, 3.2, q), lerp(Math.min(top, 28), 1.6, q), lerp(-4, 2, q)) }
      clouds.forEach((g, i) => g.position.x += Math.sin(t + i) * .002); N.pose(t, { look: .4, shake: t > tc });
      X.pop(c1, seg(t, ta, ta + .4)); X.pop(c2, seg(t, tb, tb + .4)); X.pop(c3, seg(t, tc, tc + .4));
    } };
  },
  D3_PYRAMID(s, root) {   // diorama meja: piramida peserta, koin mengalir dari bawah ke atas, lalu dasar runtuh
    const sc = newScene(WARM({ sky: ['#F6A86A', '#FFEBD0'], sunPos: [-5, 10, 6] })); sc.add(mesh(G.box(12, .3, 9), '#D9B48A', [0, -.15, 0]));
    const tiers = [1, 3, 5, 7].map((n, r) => { const y = (3 - r) * .9; const row = group(sc, [0, y, 0]); row.add(mesh(G.box(n * .8 + .4, .12, 1.4), r === 3 ? '#B9875A' : '#E7D2B5', [0, -.06, 0]));
      const ps = Array.from({ length: n }, (_, i) => { const P = person(row, [(i - (n - 1) / 2) * .8, 0, 0], { s: .45, body: r === 0 ? '#F2B41B' : ['#3E8FC4', '#6B8E5A', '#C2457A', '#E07B39'][(i + r) % 4], hair: '#2A1A10', skin: '#D9A07A' }); return P });
      if (r < 3) [-1, 1].forEach(sx => row.add(mesh(G.box(.12, .9, .12), '#8B5A2B', [sx * (n * .4), -.5, .5]))); return { row, ps, y } });
    const coins = Array.from({ length: 18 }, () => coin(sc, [0, -5, 0], 1.3));
    const cam = camera(42); const tTop = tag3(root, 'peserta lama: untung', '#2E7D32'), tBot = tag3(root, 'peserta baru: setor', BATA);
    const warn = chip(root, 'yang baru berhenti masuk → yang di bawah hilang semua', { left: 60, top: 300, fontSize: '36px', whiteSpace: 'normal', width: '900px' }, BATA);
    return { scene: sc, cam, upd(t, dur) {
      const tf = at(s, 'uang peserta baru', 2.5), tst = at(s, 'berhenti', dur * .7);
      const crash = E.in(seg(t, tst, tst + 1.4));
      coins.forEach((c, i) => { const q = ((t - tf) * .45 + i / 18) % 1; c.visible = t > tf && t < tst + .3; const k = Math.min(3, Math.floor(q * 4)); c.position.set(Math.sin(i * 3.1) * (3 - k) * .7, lerp(0, 2.9, q) + .4, .6); c.rotation.z = t * 4 + i });
      tiers.forEach((T, r) => T.ps.forEach((P, i) => { P.pose(t + i, { cheer: r === 0 && t > tf && t < tst, bounce: r === 0 && t < tst, shake: r === 3 && t > tst }) }));
      tiers[3].row.position.y = tiers[3].y - crash * 1.2; tiers[3].row.rotation.z = crash * .25; tiers[2].row.rotation.z = -crash * .12;
      orbit(cam, lerp(-25, 20, E.inout(seg(t, 0, dur))), 3.6, 10.5, [0, 1.6, 0]);
      tTop.at(tiers[0].ps[0], cam, [0, 2.4, 0], seg(t, tf, tf + .4) * (t < tst ? 1 : 1)); tBot.at(tiers[3].ps[3], cam, [0, 2.4, 0], seg(t, tf + .5, tf + .9) * (t < tst + .6 ? 1 : 0));
      X.pop(warn, seg(t, tst, tst + .4));
    } };
  },
  D3_BUSSTOP(s, root) {   // halte malam: Nana membalas "nggak dulu ya"
    const sc = newScene(WARM({ sky: ['#1F2340', '#4A3F66'], sunI: .7, hemi: .7, sun: '#B9C2FF', sunPos: [6, 9, 4], fog: ['#2E2A4A', 14, 40] })); sc.add(mesh(G.box(30, .2, 14), '#4A4A55', [0, -.1, 2])); sc.add(mesh(G.box(30, .25, 3), '#8A8A92', [0, .02, -2]));
    const st = group(sc, [-.5, 0, -2.4]); st.add(mesh(G.box(4, .12, 1.8), '#2E9C6A', [0, 2.6, 0])); [-1.9, 1.9].forEach(x => st.add(mesh(G.box(.1, 2.6, .1), '#DDD', [x, 1.3, .7]))); st.add(mesh(G.box(3.4, .1, .5), '#7A5230', [0, .5, -.4]));
    const pole = group(sc, [3.2, 0, -1.2]); pole.add(mesh(G.cyl(.06, .08, 4.4, 8), '#555', [0, 2.2, 0])); pole.add(mesh(G.box(.8, .12, .3), '#555', [-.35, 4.4, 0])); const bulb = new THREE.PointLight('#FFD9A0', 14, 10); bulb.position.set(-.7, 4.2, 0); pole.add(bulb);
    for (let i = 0; i < 6; i++) { const h = 3 + (i * 37 % 5); sc.add(mesh(G.box(2.4, h, 1.6), '#2B2F4A', [-8 + i * 3.2, h / 2, -7], { cast: false })); for (let k = 0; k < 3; k++) sc.add(mesh(G.box(.4, .4, .05), '#FFD27A', [-8.6 + i * 3.2 + k * .6, h - 1, -6.18], { mat: { emissive: '#FFC27A', emissiveIntensity: 1 }, cast: false })) }
    const N = nana([.6, 0, -1.5]); sc.add(N);
    const c = document.createElement('canvas'); c.width = 512; c.height = 1024; const x = c.getContext('2d'); x.fillStyle = '#F3EDE4'; x.fillRect(0, 0, 512, 1024); x.fillStyle = '#2E7D5B'; x.fillRect(0, 0, 512, 110); x.fillStyle = '#fff'; x.font = '800 44px Baloo'; x.fillText('Dita (temen SMA)', 30, 72);
    x.fillStyle = '#DCF8C6'; x.beginPath(); x.roundRect(90, 700, 400, 110, 22); x.fill(); x.fillStyle = INK; x.font = '800 44px Baloo'; x.fillText('Nggak dulu ya 🙏', 115, 770);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; const ph = group(sc, [-.55, 2.5, .3]); ph.add(mesh(G.box(1.3, 2.5, .1), '#1B1B1F', [0, 0, 0])); const scr = new THREE.Mesh(G.plane(1.18, 2.34), new THREE.MeshBasicMaterial({ map: tex })); scr.position.z = .055; ph.add(scr);
    const cam = camera(42); const q1 = X.ab({ left: 60, top: 300, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '16px 24px', textAlign: 'center', fontSize: '50px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, 'Pernah ditawarin begini?<br><span style="color:' + BATA + '">Ceritain di komentar</span>');
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.2, 1.2, p), 2.3, lerp(8.6, 7.4, p)); cam.lookAt(.1, 1.9, -1.2); ph.rotation.y = .2; ph.position.y = 2.4 + Math.sin(t * 1.2) * .05; ph.scale.setScalar(E.back(seg(t, .2, .7)) || .001);
      N.pose(t, { hold: true, look: -.4, talk: true }); X.pop(q1, seg(t, at(s, 'pernah', 3), at(s, 'pernah', 3) + .4)) } };
  },
  // ===== ep007 (Mitos vs Fakta: investasi harus nunggu kaya?) =====
  D3_MYTH(s, root) {   // depan minimarket malam: Nana di ATM, kartu mitos raksasa lalu stempel MITOS
    const sc = newScene(WARM({ sky: ['#2B2A4A', '#6A5A8A'], sunI: 1.2, hemi: 1.1, sun: '#FFE2C2', sunPos: [5, 8, 6] })); sc.add(mesh(G.box(20, .2, 14), '#8A8A92', [0, -.1, 0]));
    const shop = group(sc, [0, 0, -3]); shop.add(mesh(G.box(9, 3.6, 1), '#F4F1EA', [0, 1.8, 0])); shop.add(mesh(G.box(9.2, .7, 1.2), BATA, [0, 3.7, .1])); shop.add(mesh(G.box(4, 2.4, .05), '#BFE6F5', [1.8, 1.4, .52], { mat: { emissive: '#DDF3FF', emissiveIntensity: .6 }, cast: false }));
    const atm = group(sc, [-2.4, 0, -2.3]); atm.add(mesh(G.box(1.1, 2.1, .7), '#3A6EA5', [0, 1.05, 0])); atm.add(mesh(G.box(.6, .4, .02), '#9FE0FF', [0, 1.55, .36], { mat: { emissive: '#9FE0FF', emissiveIntensity: 1 }, cast: false }));
    const lamp = new THREE.PointLight('#FFF1D6', 16, 12); lamp.position.set(0, 4.5, 1); sc.add(lamp);
    const N = nana([-2.4, 0, -1.1]); sc.add(N); N.rotation.y = Math.PI * .9;
    const card = X.ab({ left: 90, top: 300, width: 900, background: CREAM, border: `8px solid ${INK}`, borderRadius: '30px', padding: '24px', textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '60px', lineHeight: 1.1, color: INK, boxShadow: `0 12px 0 ${BATA}` }, root, `"Investasi itu<br>buat yang udah kaya."`);
    const stamp = X.ab({ left: 260, top: 470, padding: '6px 34px', border: '12px solid #D63B2F', color: '#D63B2F', fontFamily: 'Baloo', fontWeight: 800, fontSize: '110px', borderRadius: '18px', opacity: 0, background: '#FFFFFFCC' }, root, 'MITOS');
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const ts = at(s, 'Salah', 3); const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, .6, p), 2.4, lerp(8, 6.4, p)); cam.lookAt(-1.2, 1.5, -1.8);
      N.pose(t, { hold: true, look: Math.sin(t) * .2, talk: t > ts }); X.pop(card, seg(t, .1, .5)); const q = seg(t, ts, ts + .3); stamp.style.opacity = q > 0 ? 1 : 0; stamp.style.transform = `rotate(-12deg) scale(${lerp(2.2, 1, E.out(q))})` } };
  },
  D3_GROW(s, root) {   // balkon pagi: dua pot, "nabung biasa" vs "diinvestasikan (ilustrasi)"; pohon koin tumbuh per tahun
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#9FD3F0', '#FFF1D6'], sun: '#FFF4E0', sunPos: [-6, 10, 6] })); sc.add(mesh(G.box(9, .2, 4), '#C9A27A', [0, -.1, 0])); sc.add(mesh(G.box(9, .9, .1), '#7A5230', [0, .45, 1.9]));
    for (let i = 0; i < 10; i++) { const h = 3 + ((i * 41) % 7); sc.add(mesh(G.box(2, h, 2), ['#D9C2A8', '#C9B29A', '#E8D6C2'][i % 3], [-12 + i * 2.6, h / 2 - 4, -12], { cast: false })) }
    const pots = [-1.6, 1.6].map((x, k) => { const g = group(sc, [x, 0, -.4]); g.add(mesh(G.cyl(.55, .4, .7, 12), k ? '#2E9C6A' : '#9A948C', [0, .35, 0])); const stem = mesh(G.cyl(.07, .09, 1, 6), '#6B4A2A', [0, .7, 0]); g.add(stem); const cs = Array.from({ length: 14 }, (_, i) => coin(g, [Math.sin(i * 2.4) * .6, 1.2 + (i % 5) * .3, Math.cos(i * 2.4) * .4], 1.5)); return { g, stem, cs } });
    const cam = camera(42); const yr = X.ab({ left: 380, top: 300, background: INK, color: GOLD, fontFamily: 'Baloo', fontWeight: 800, fontSize: '80px', padding: '4px 30px', borderRadius: '18px' }, root);
    const lt = tag3(root, `nabung biasa: <b>${v.setor10}</b>`), rt = tag3(root, `ilustrasi 6%/th: <b style="color:#2E7D32">${v.hasil10}</b>`, '#2E7D32');
    const as = chip(root, '*asumsi contoh, bukan janji hasil', { left: 230, top: 1240, fontSize: '30px', padding: '6px 16px' });
    return { scene: sc, cam, upd(t, dur) { const g = E.inout(seg(t, .5, dur * .75)); yr.textContent = `tahun ${Math.round(g * 10)}`;
      pots.forEach((P, k) => { const h = k ? g * 1.45 : g; P.stem.scale.y = .2 + h * 1.6; P.stem.position.y = .7 + (.2 + h * 1.6) * .5 - .5; P.cs.forEach((c, i) => { c.visible = i < Math.round(h * 9.5); c.position.y = .9 + (.2 + h * 1.6) * .9 + (i % 5) * .22 - .3; c.rotation.z = t + i }) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(Math.sin(t * .2) * .6, lerp(2.8, 3.2, p), lerp(12, 11, p)); cam.lookAt(0, 1.9, -.4);
      const te = at(s, 'enam persen', dur * .5); lt.at(pots[0].g, cam, [0, 3.6, 0], seg(t, te, te + .4)); rt.at(pots[1].g, cam, [0, 4.2, 0], seg(t, te + .6, te + 1)); X.pop(as, seg(t, te, te + .4)) } };
  },
  D3_RACE(s, root) {   // jalan pagi: dua lintasan, Nana-22 mulai duluan, Nana-32 menyusul; tumpukan koin di garis umur 50
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#FFC98A', '#FFF3DE'], sunPos: [-10, 6, 4], shadow: 20 })); sc.add(mesh(G.box(40, .2, 16), '#7FAF52', [0, -.1, 0]));
    [-1, 1].forEach((z, k) => { sc.add(mesh(G.box(36, .05, 1.6), '#C8501E', [0, .03, z * 1.1], { cast: false })); for (let i = -17; i < 18; i += 3) sc.add(mesh(G.box(.08, .06, 1.6), '#FFF', [i, .06, z * 1.1], { cast: false })) });
    sc.add(mesh(G.box(.3, 3, .3), '#FFF', [14, 1.5, -2.4])); sc.add(mesh(G.box(.3, 3, .3), '#FFF', [14, 1.5, 2.4])); sc.add(mesh(G.box(.3, .6, 5), GOLD, [14, 3, 0]));
    const A = nana([-16, 0, -1.1]), B = nana([-16, 0, 1.1], { body: '#3E8FC4' }); sc.add(A, B); A.rotation.y = B.rotation.y = Math.PI / 2;
    const piles = [-1, 1].map(z => { const g = group(sc, [15.4, 0, z * 1.1]); for (let i = 0; i < 16; i++) coin(g, [0, .05 + i * .14, 0], 2.2); return g });
    const cam = camera(44); const ta = tag3(root, `mulai umur 22: <b style="color:#2E7D32">${v.hasilA}</b>`, '#2E7D32'), tb = tag3(root, `mulai umur 32: <b>${v.hasilB}</b>`, '#3E7CB1');
    const fin = tag3(root, 'umur 50', BATA);
    return { scene: sc, cam, upd(t, dur) { const t2 = at(s, 'tiga puluh dua', dur * .3); const a = E.inout(seg(t, .3, dur * .8)), b = E.inout(seg(t, t2, dur * .8));
      A.position.x = lerp(-16, 13, a); B.position.x = lerp(-16, 13, b); A.pose(t, { walk: a > 0 && a < 1 ? 1 : 0 }); B.pose(t, { walk: b > 0 && b < 1 ? 1 : 0 });
      piles[0].scale.y = Math.max(.02, a); piles[1].scale.y = Math.max(.02, b * .45);
      const cx = Math.min(A.position.x, 7); cam.position.set(cx - 7, 4.6, 2.2); cam.lookAt(cx + 5, .4, 0);
      const tr = at(s, 'hasilnya', dur * .75); ta.at(piles[0], cam, [0, 2.6, 0], seg(t, tr, tr + .4)); tb.at(piles[1], cam, [0, 1.4, 0], seg(t, tr + .5, tr + .9)); fin.at(piles[0], cam, [-1.4, 3.6, 1.1], seg(t, 1, 1.4)) } };
  },
  D3_FRIDGE(s, root) {   // dapur malam: tiga catatan ditempel di kulkas, lalu pertanyaan penutup
    const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: 1.2, hemi: 1.1, sun: '#FFE2C2', sunPos: [4, 8, 6] })); kos(sc, { wall: '#E8D2B8' });
    const fr = group(sc, [0, 0, -3.2]); fr.add(mesh(G.box(2.2, 4, 1.2), '#F4F6F8', [0, 2, 0], { mat: { roughness: .4 } })); fr.add(mesh(G.box(.08, 1.2, .1), '#AAB', [.9, 2.6, .62]));
    const lamp = new THREE.PointLight('#FFD9A8', 10, 8); lamp.position.set(1.5, 4.5, 0); sc.add(lamp);
    const notes = X.TL.vars.steps.map(([h, d], i) => { const c = document.createElement('canvas'); c.width = 400; c.height = 300; const x = c.getContext('2d'); x.fillStyle = ['#FFE680', '#FFB3C1', '#9DE0B8'][i]; x.fillRect(0, 0, 400, 300);
      x.fillStyle = INK; x.textAlign = 'center'; x.font = '800 60px Baloo'; x.fillText(`${i + 1}. ${h}`, 200, 120); x.font = '700 34px Baloo'; x.fillText(d, 200, 200); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
      const m = new THREE.Mesh(G.plane(1.7, 1.27), new THREE.MeshStandardMaterial({ map: t })); m.position.set((i % 2 ? .1 : -.1), 3.2 - i * 1.15, -2.58); m.rotation.z = (i - 1) * .06; sc.add(m); return m });
    const N = nana([1.8, 0, -1.6]); sc.add(N); N.rotation.y = -.7; const cam = camera(42);
    const risk = chip(root, '⚠️ nilainya bisa naik turun, pelajari dulu', { left: 120, top: 300, fontSize: '36px' }, BATA);
    const q = X.ab({ left: 60, top: 1300, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Lo udah mulai, atau <span style="color:${BATA}">masih nunggu kaya?</span>`);
    return { scene: sc, cam, upd(t, dur) { X.TL.vars.step_cues.forEach((cu, i) => { const tc = at(s, cu, 2 + i * 3); notes[i].scale.setScalar(Math.max(.001, E.back(seg(t, tc, tc + .4)))) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.6, .8, p), 2.4, lerp(6.4, 5.4, p)); cam.lookAt(0, 2.2, -2.6); N.pose(t, { talk: true, point: (t % 5) < 1.2 });
      const tr = at(s, 'naik turun', dur * .7), tq = at(s, 'Lo udah', dur - 2.5); X.pop(risk, seg(t, tr, tr + .4)); X.pop(q, seg(t, tq, tq + .4)) } };
  },
  // ===== ep008 (Ini yang Gue Lakuin: dana darurat dari 200 ribu) =====
  D3_BENGKEL(s, root) {   // bengkel malam terang: motor mogok berasap, montir, struk servis
    const sc = newScene(WARM({ sky: ['#1E2238', '#3E3A5C'], sunI: 1.3, hemi: 1.2, sun: '#FFE9C8', sunPos: [6, 9, 7] })); sc.add(mesh(G.box(18, .2, 14), '#6E6E78', [0, -.1, 0])); sc.add(mesh(G.box(18, 6, .2), '#D8C9A8', [0, 3, -3.6]));
    sc.add(mesh(G.box(6, .5, .1), BATA, [0, 4.6, -3.45])); for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.5, .08, .3), '#555', [-4 + i * .5, 2.6, -3.35]));
    [[-3.4, 2.2], [-2.6, 2.6], [3.2, 2.3]].forEach(([x, y]) => sc.add(mesh(G.cyl(.35, .35, .12, 12), '#2A2A2A', [x, y, -3.4], { rot: [Math.PI / 2, 0, 0] })));
    const lamp = new THREE.PointLight('#FFF1D6', 22, 14); lamp.position.set(0, 4.6, 1); sc.add(lamp); sc.add(mesh(G.box(2.4, .08, .3), '#FFF8E8', [0, 5.2, 0], { mat: { emissive: '#FFF8E8', emissiveIntensity: 1.5 }, cast: false }));
    const bike = group(sc, [-.3, 0, -.6]); [-.75, .75].forEach(x => { bike.add(mesh(G.cyl(.38, .38, .16, 16), '#1E1E1E', [x, .38, 0], { rot: [Math.PI / 2, 0, 0] })); bike.add(mesh(G.cyl(.16, .16, .18, 10), '#AAA', [x, .38, 0], { rot: [Math.PI / 2, 0, 0] })) });
    bike.add(mesh(G.box(1.3, .35, .34), '#3E7CB1', [0, .72, 0])); bike.add(mesh(G.box(.7, .14, .36), '#222', [-.2, .95, 0])); bike.add(mesh(G.box(.08, .6, .08), '#555', [.7, 1, 0], { rot: [0, 0, -.3] })); bike.add(mesh(G.box(.06, .06, .7), '#333', [.8, 1.3, 0]));
    const smoke = [0, 1, 2, 3, 4].map(() => { const m = mesh(G.ico(.22, 1), '#CFCFD6', [0, 0, 0], { cast: false, mat: { transparent: true, opacity: .55 } }); sc.add(m); return m });
    const M = person(sc, [1.2, 0, .2], { body: '#4A5A6A', hat: 'cap', hatC: '#E07B39', skin: '#C98E64', hair: '#2A1A10' }); M.rotation.y = -1.2;
    const N = nana([-1.9, 0, .6]); sc.add(N); N.rotation.y = .7;
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '58px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Servis <span style="color:${BATA}">1,5 juta</span>.<br>Tabungan gue: <span style="color:#D63B2F">Rp0</span>.`);
    const bill = chip(root, `🧾 servis: <span style="color:${BATA}">${X.TL.vars.servis}</span>`, { left: 90, top: 300, fontSize: '50px' }), start = chip(root, 'mulai dari <span style="color:#2E7D32">Rp200.000</span>', { left: 180, top: 420, fontSize: '48px' });
    return { scene: sc, cam, upd(t, dur) {
      smoke.forEach((m, i) => { const q = (t * .6 + i / 5) % 1; m.position.set(-.1 + Math.sin(t * 2 + i) * .15 + q * .4, .9 + q * 2.2, -.6 + Math.cos(i) * .1); m.scale.setScalar(.6 + q * 1.6); m.material.opacity = .6 * (1 - q) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(4.2, 2.4, p), lerp(3.6, 3.2, p), lerp(10.5, 9, p)); cam.lookAt(lerp(-.2, -.6, p), .7, -.4);
      M.pose(t, { point: t < 3, talk: t < 3, shake: t > 2 && t < 3.5 }); N.pose(t, { shake: t < at(s, 'Dari situ', 4), talk: t > at(s, 'Dari situ', 4), look: -.3 });
      X.pop(hook, seg(t, .05, .4)); X.pop(bill, seg(t, .6, 1)); const ts = at(s, 'dua ratus', 5); X.pop(start, seg(t, ts, ts + .4));
    } };
  },
  D3_TANK(s, root) {   // meja kamar kos malam: tangki kaca raksasa bertanda target, isinya baru setipis koin
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#2B2340', '#5A4A6A'], sunI: 1.2, hemi: 1.2, sun: '#FFE2C2', sunPos: [-5, 9, 7] })); kos(sc, { wall: '#E9CFAE' });
    const lamp = new THREE.PointLight('#FFD9A8', 14, 12); lamp.position.set(2, 5, 2); sc.add(lamp);
    sc.add(mesh(G.box(6, .12, 2.4), '#9C6B3E', [0, .9, -1.6])); [[-2.8, -.6], [2.8, -.6], [-2.8, -2.6], [2.8, -2.6]].forEach(([x, z]) => sc.add(mesh(G.box(.1, .9, .1), '#6B4A2A', [x, .45, z])));
    const tk = group(sc, [-.6, .96, -1.6]); tk.add(new THREE.Mesh(G.cyl(.95, .95, 3.4, 28, 1, true), new THREE.MeshStandardMaterial({ color: '#DDF3FF', transparent: true, opacity: .3, roughness: .1, side: THREE.DoubleSide }))); tk.children[0].position.y = 1.7;
    tk.add(mesh(G.cyl(1.02, 1.02, .14, 28), '#5E3E22', [0, .07, 0])); tk.add(mesh(G.cyl(1.02, 1.02, .1, 28), '#5E3E22', [0, 3.42, 0]));
    for (let i = 1; i < 6; i++) tk.add(mesh(G.box(.3, .03, .02), INK, [.75, .14 + i * .55, .65], { cast: false }));
    const liq = mesh(G.cyl(.9, .9, 1, 28), GOLD, [0, .14, 0], { mat: { metalness: .4, roughness: .35 } }); tk.add(liq);
    const N = nana([1.8, .96, -1.2], { s: .7 }); sc.add(N); N.rotation.y = -.5;
    const cam = camera(42); const top = chip(root, `🎯 target: <span style="color:${BATA}">${v.target_rp}</span>`, { left: 110, top: 420, fontSize: '54px' }), now = tag3(root, 'isi sekarang: Rp200.000', '#2E7D32');
    const box = X.ab({ left: 60, top: 1240, width: 960, display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }, root);
    const steps = v.steps.map(([h], i) => X.ab({ position: 'relative', background: ['#FFE680', '#FFB3C1', '#9DE0B8', '#B9D8FF'][i], border: `5px solid ${INK}`, borderRadius: '20px', padding: '8px 18px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '36px', color: INK, opacity: 0 }, box, `${i + 1}. ${h}`));
    return { scene: sc, cam, upd(t, dur) {
      const tt = at(s, 'targetnya', 3), t4 = at(s, 'empat langkah', dur - 2.5);
      liq.scale.y = Math.max(.001, .04 * E.out(seg(t, tt + 1.4, tt + 2.2))); liq.position.y = .14 + liq.scale.y * .5;
      orbit(cam, lerp(-24, 16, E.inout(seg(t, 0, dur))), 2.6, lerp(13, 11.5, seg(t, 0, dur)), [.3, 2, -1.6]);
      X.pop(top, seg(t, tt, tt + .4)); now.at(tk, cam, [0, .3, 1], seg(t, tt + 1.4, tt + 1.8));
      steps.forEach((e, i) => X.pop(e, seg(t, t4 + i * .25, t4 + i * .25 + .35))); N.pose(t, { talk: true, look: -.6, shake: t > tt + 1 && t < tt + 3 });
    } };
  },
  D3_PAYDAY(s, root) {   // lobi kantor terang tanggal gajian: aliran koin dari kotak GAJI, sebagian dibelokkan ke brankas
    const sc = newScene(WARM({ sky: ['#BFE3F5', '#F4FBFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [6, 12, 8], hemi: 1.6 })); sc.add(mesh(G.box(20, .2, 14), '#D9D4CA', [0, -.1, 0])); sc.add(mesh(G.box(20, 7, .2), '#EEF2F7', [0, 3.5, -4]));
    for (let i = 0; i < 4; i++) sc.add(mesh(G.box(2.2, 4, .05), '#BFE6F5', [-6 + i * 4, 3.4, -3.88], { mat: { emissive: '#E8F7FF', emissiveIntensity: .5 }, cast: false }));
    const mk = (txt, bg) => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, 256, 128); x.fillStyle = '#fff'; x.font = '800 64px Baloo'; x.textAlign = 'center'; x.fillText(txt, 128, 88); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return new THREE.MeshStandardMaterial({ map: t }) };
    const gaji = group(sc, [-3.6, 0, -1]); gaji.add(new THREE.Mesh(G.box(1.8, 1.6, 1.4), [mat('#2E7D5B'), mat('#2E7D5B'), mat('#2E7D5B'), mat('#2E7D5B'), mk('GAJI', '#2E7D5B'), mat('#2E7D5B')])); gaji.children[0].position.y = 1.6; gaji.children[0].castShadow = true;
    gaji.add(mesh(G.box(1.8, .8, 1.4), '#5E3E22', [0, .4, 0]));
    sc.add(mesh(G.box(6.6, .14, .8), '#4A4A55', [.2, .95, -1])); [-2, 0, 2].forEach(x => sc.add(mesh(G.box(.12, .9, .6), '#777', [x, .45, -1])));
    const safe = group(sc, [-.8, 0, 1.2]); safe.add(new THREE.Mesh(G.box(1.2, 1.3, 1), [mat('#3A6EA5'), mat('#3A6EA5'), mat('#3A6EA5'), mat('#3A6EA5'), mk('DARURAT', '#3A6EA5'), mat('#3A6EA5')])); safe.children[0].position.y = .65; safe.children[0].castShadow = true;
    const D = dompet(sc, [3.6, .95, -1], .8); const coins = Array.from({ length: 20 }, () => coin(sc, [0, -5, 0], 1.4));
    const N = nana([1.6, 0, 1.8]); sc.add(N); N.rotation.y = -.5;
    const cam = camera(42); const c1 = chip(root, `Rp200.000 → <span style="color:#3A6EA5">rekening terpisah</span>`, { left: 90, top: 300, fontSize: '46px' }), c2 = chip(root, 'nggak kelihatan = nggak kepakai', { left: 150, top: 410, fontSize: '42px' }, '#2E7D32');
    return { scene: sc, cam, upd(t, dur) {
      coins.forEach((c, i) => { const q = (t * .35 + i / 20) % 1; const div = i % 5 === 0; c.visible = t > .3; c.rotation.set(0, t * 3 + i, 0);
        if (div && q > .3) { const r = seg(q, .3, .6); c.position.set(lerp(-1.6, -.8, r), lerp(1.1, 1.4, r) + Math.sin(r * Math.PI) * 1.2 - (r >= 1 ? 9 : 0), lerp(-1, 1.2, r)) }
        else c.position.set(lerp(-2.7, 3.2, q), 1.12, -1) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.6, 1.4, p), lerp(5, 4.2, p), 12.5); cam.lookAt(lerp(-.8, .6, p), .6, -.3);
      N.pose(t, { talk: true, point: t > at(s, 'pindah', 2) && t < at(s, 'pindah', 2) + 1.6 }); D.mood(t, false);
      const tp = at(s, 'pindah', 2), tn = at(s, 'nggak kelihatan', dur - 2.5); X.pop(c1, seg(t, tp, tp + .4)); X.pop(c2, seg(t, tn, tn + .4));
    } };
  },
  D3_STAIRS(s, root) {   // tangga taman sore: delapan anak tangga tumpukan koin makin tinggi, Nana naik tiap 3 bulan
    const sc = newScene(WARM({ sky: ['#F59E5B', '#FFE7C2'], sunPos: [-10, 6, 6], shadow: 16 })); sc.add(mesh(G.box(40, .2, 20), '#7FAF52', [0, -.1, 0]));
    for (let i = 0; i < 9; i++) tree(sc, [-12 + i * 3.2, 0, -6 - (i % 2) * 2], 1.3 + (i % 3) * .2, ['#4E8F3A', '#6BA34A', '#3F7F32'][i % 3]);
    const vals = [2, 3, 4, 5, 6, 7, 8, 9]; const steps = vals.map((v, i) => { const g = group(sc, [-5.6 + i * 1.6, 0, 0]); const h = .35 + i * .45; g.add(mesh(G.box(1.6, h, 2.4), ['#E7D2B5', '#D9C2A8'][i % 2], [0, h / 2, 0]));
      const st = group(g, [.3, h, .85]); for (let k = 0; k < v; k++) coin(st, [0, .04 + k * .07, 0], 1.6).rotation.set(0, 0, 0); g.userData = { h, st }; return g });
    const N = nana([-5.6, .35, 0]); sc.add(N); N.rotation.y = Math.PI / 2;
    const cam = camera(42); const lo = tag3(root, 'Rp200rb'), hi = tag3(root, 'Rp900rb', '#2E7D32'), mo = X.ab({ left: 330, top: 300, background: INK, color: GOLD, fontFamily: 'Baloo', fontWeight: 800, fontSize: '64px', padding: '4px 28px', borderRadius: '18px' }, root);
    const c3 = chip(root, '+ sisa belanja ≈ <span style="color:#2E7D32">Rp150.000</span>', { left: 110, top: 420, fontSize: '46px' });
    return { scene: sc, cam, upd(t, dur) {
      const t3 = at(s, 'Langkah tiga', dur * .6); const g = E.inout(seg(t, .6, t3 - .3)); const k = Math.min(7, Math.floor(g * 8)); const fr = g * 8 - k;
      const S = steps[k], nx = S.position.x - .4 + Math.min(1, fr * 1.4) * .4; N.position.set(nx, S.userData.h, -.5); N.pose(t, { walk: g < 1 ? 1 : 0, cheer: g >= 1 });
      mo.textContent = `bulan ${Math.min(22, k * 3 + 1)}`; mo.style.opacity = t < t3 ? 1 : 0;
      cam.position.set(N.position.x + 2, N.position.y + 3.2, 13); cam.lookAt(N.position.x + 1.4, N.position.y + .2, 0);
      lo.at(steps[0].userData.st, cam, [0, .9, 0], seg(t, .8, 1.2)); hi.at(steps[7].userData.st, cam, [0, .9, 0], seg(t, at(s, 'sembilan ratus', t3 - 1), at(s, 'sembilan ratus', t3 - 1) + .4));
      X.pop(c3, seg(t, t3, t3 + .4));
    } };
  },
  D3_LEBARAN(s, root) {   // ruang tamu ibu saat Lebaran: amplop THR terbelah, separuh terbang ke brankas kecil
    const sc = newScene(WARM({ sky: ['#BFE8C8', '#FFF6DE'], sun: '#FFF4E0', sunPos: [-6, 10, 8], hemi: 1.6 })); sc.add(mesh(G.box(14, .2, 14), '#C9A27A', [0, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), '#F4E9D2', [0, 3, -3.6])); sc.add(mesh(G.box(.2, 6, 14), '#EBDDC0', [-5, 3, 0]));
    for (let i = 0; i < 5; i++) { const k = group(sc, [-3 + i * 1.5, 4.4 - (i % 2) * .3, -3.2]); k.add(mesh(G.cyl(.005, .005, .8, 3), '#5A3A20', [0, .5, 0])); k.add(mesh(new THREE.OctahedronGeometry(.32), '#5E9C3A', [0, 0, 0], { s: [1, 1.2, .5] })) }
    sc.add(mesh(G.box(3.4, .5, 1.1), '#8A3A3A', [-1.6, .25, -2.4])); sc.add(mesh(G.box(3.4, .9, .3), '#8A3A3A', [-1.6, .7, -2.9]));
    sc.add(mesh(G.box(1.8, .1, 1), '#7A5230', [.4, .6, -.6])); sc.add(mesh(G.box(1.6, .5, .8), '#5E3E22', [.4, .3, -.6]));
    [[-.1, '#F2B41B'], [.4, '#E5484D'], [.9, '#2E9C6A']].forEach(([x, c]) => { sc.add(mesh(G.cyl(.16, .16, .3, 12), '#EAF6FF', [x, .82, -.6], { mat: { transparent: true, opacity: .6 } })); sc.add(mesh(G.cyl(.13, .13, .14, 12), c, [x, .74, -.6])) });
    const ibu = person(sc, [-2.2, .3, -2.2], { body: '#2E9C6A', skin: '#D9A07A', hair: '#F4F1EA' }); const N = nana([1.5, 0, .2]); sc.add(N); N.rotation.y = -.9;
    const env = [0, 1].map(i => { const m = mesh(G.box(.5, .3, .03), '#E8F2D8', [1.6, 1.5, 0], { cast: false }); sc.add(m); return m }); const safe = mesh(G.box(.6, .6, .5), '#3A6EA5', [3.1, .3, .9]); sc.add(safe);
    const cam = camera(42); const c1 = chip(root, `separuh THR: <span style="color:#3A6EA5">${X.TL.vars.thr_half}</span> → dana darurat`, { left: 50, top: 300, fontSize: '40px' }), c2 = chip(root, 'sisanya baru buat Lebaran 🎉', { left: 170, top: 400, fontSize: '42px' }, '#2E7D32');
    return { scene: sc, cam, upd(t, dur) {
      const ts = at(s, 'separuhnya', 2), tb = at(s, 'bangga', dur - 1.2); const q = E.inout(seg(t, ts, ts + 1.2));
      env[0].position.set(lerp(1.6, 3.1, q), lerp(1.5, .7, q) + Math.sin(q * Math.PI) * .8, lerp(0, .9, q)); env[0].rotation.z = q * 3; env[0].visible = q < .98;
      env[1].position.set(lerp(1.6, .4, q), lerp(1.5, .7, q) + Math.sin(q * Math.PI) * .5, lerp(0, -.6, q)); env[1].rotation.z = -q * 2;
      safe.scale.setScalar(1 + Math.max(0, Math.sin(seg(t, ts + 1.1, ts + 1.5) * Math.PI)) * .2);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(4.6, 3, p), lerp(3.4, 3, p), lerp(9.4, 8, p)); cam.lookAt(lerp(.6, 0, p), 1, -1);
      ibu.pose(t, { nod: t > tb - .3, cheer: t > tb, talk: t > tb }); N.pose(t, { hold: t < ts, talk: true });
      X.pop(c1, seg(t, ts, ts + .4)); const tl = at(s, 'Sisanya', ts + 2); X.pop(c2, seg(t, tl, tl + .4));
    } };
  },
  D3_ROOFTOP(s, root) {   // rooftop kos malam terang: lampu gantung, tangki penuh mengikuti hitungan 23 bulan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#24264A', '#5C4A7A'], sunI: 1.1, hemi: 1.2, sun: '#FFE2C2', sunPos: [5, 9, 6], fog: ['#3A3460', 18, 50] })); sc.add(mesh(G.box(12, .2, 9), '#8A8A92', [0, -.1, 0]));
    [-6, 6].forEach(x => sc.add(mesh(G.box(.1, 1, 9), '#DDD', [x, .5, 0]))); sc.add(mesh(G.box(12, 1, .1), '#DDD', [0, .5, -4.5]));
    for (let i = 0; i < 12; i++) { const h = 4 + ((i * 37) % 8); sc.add(mesh(G.box(2.4, h, 2), '#2B2F4A', [-14 + i * 2.6, h / 2 - 3, -14], { cast: false })); for (let k = 0; k < 2; k++) sc.add(mesh(G.box(.5, .5, .05), '#FFD27A', [-14.5 + i * 2.6 + k * .9, h - 4, -12.95], { mat: { emissive: '#FFC27A', emissiveIntensity: 1 }, cast: false })) }
    for (let i = 0; i < 14; i++) { const b = mesh(G.sph(.1, 8, 6), ['#FFE08A', '#FFB3C1', '#9DE0B8'][i % 3], [-5.5 + i * .85, 3.2 - Math.sin(i / 13 * Math.PI) * .6, -1], { cast: false, mat: { emissive: ['#FFD27A', '#FF9FB0', '#7FE0A8'][i % 3], emissiveIntensity: 1.6 } }); sc.add(b) }
    const L = new THREE.PointLight('#FFE2B0', 18, 14); L.position.set(0, 3.4, 1); sc.add(L);
    const tk = group(sc, [-1, 0, -1.4]); tk.add(new THREE.Mesh(G.cyl(.95, .95, 3.4, 28, 1, true), new THREE.MeshStandardMaterial({ color: '#DDF3FF', transparent: true, opacity: .3, roughness: .1, side: THREE.DoubleSide }))); tk.children[0].position.y = 1.7;
    tk.add(mesh(G.cyl(1.02, 1.02, .14, 28), '#5E3E22', [0, .07, 0])); const liq = mesh(G.cyl(.9, .9, 1, 28), GOLD, [0, .14, 0], { mat: { metalness: .4, roughness: .35, emissive: '#7A5200', emissiveIntensity: .3 } }); tk.add(liq);
    const N = nana([1.4, 0, -.6]); sc.add(N); N.rotation.y = -.4;
    const cam = camera(42); const mo = X.ab({ left: 330, top: 300, background: INK, color: GOLD, fontFamily: 'Baloo', fontWeight: 800, fontSize: '64px', padding: '4px 28px', borderRadius: '18px' }, root);
    const big = X.ab({ left: 60, top: 400, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '96px', color: '#fff', WebkitTextStroke: `16px #2E7D32`, paintOrder: 'stroke fill', opacity: 0 }, root, `${v.target_rp} ✓`);
    const ok = chip(root, '🛵 mogok lagi? <span style="color:#2E7D32">oke.</span>', { left: 250, top: 560, fontSize: '48px' });
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Dana darurat lo<br><span style="color:${BATA}">udah berapa bulan pengeluaran?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const tf = at(s, 'penuh', 4), tm = at(s, 'mogok lagi', dur * .55), tq = at(s, 'Dana darurat lo', dur - 3); const g = seg(t, .3, tf); const m = Math.max(1, Math.ceil(g * v.bulan));
      const lvl = v.hist[m - 1] * (g > 0 ? 1 : 0); liq.scale.y = Math.max(.001, lvl * 3.2); liq.position.y = .14 + liq.scale.y * .5; mo.textContent = `bulan ${m}`;
      const tt = seg(t, tf, tf + .5); big.style.opacity = tt; big.style.transform = `scale(${E.back(tt)})`;
      orbit(cam, lerp(-30, 10, E.inout(seg(t, 0, dur))), lerp(2.6, 3.6, seg(t, 0, dur)), 12.5, [.2, 1.3, -1]); N.pose(t, { cheer: t > tf && t < tm, talk: t > tm, nod: t > tm && t < tq });
      X.pop(ok, seg(t, tm, tm + .4)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
  // ===== ep009 (Mesin Waktu: kopi 25 ribu, 20 tahun) =====
  D3_KEDAI(s, root) {   // kedai kopi pagi terang: Nana pegang gelas, cincin mesin waktu berputar di belakang
    const sc = newScene(WARM({ sky: ['#FFD9A0', '#FFF6E6'], sun: '#FFF4E0', sunPos: [-7, 9, 8], hemi: 1.6 })); sc.add(mesh(G.box(16, .2, 14), '#B98A5E', [0, -.1, 0])); sc.add(mesh(G.box(16, 7, .2), '#F2E2C8', [0, 3.5, -4]));
    const ctr = group(sc, [1.4, 0, -2.6]); ctr.add(mesh(G.box(4.4, 1.1, 1), '#6B4A2A', [0, .55, 0])); ctr.add(mesh(G.box(4.6, .1, 1.1), '#E9D2B0', [0, 1.15, 0]));
    ctr.add(mesh(G.box(1, .8, .6), '#C9CDD2', [-1.2, 1.6, -.1], { mat: { metalness: .5, roughness: .3 } })); ctr.add(mesh(G.cyl(.08, .08, .3, 8), '#333', [-1.2, 1.3, .15]));
    const c = document.createElement('canvas'); c.width = 512; c.height = 320; const x = c.getContext('2d'); x.fillStyle = '#2B2B30'; x.fillRect(0, 0, 512, 320); x.fillStyle = '#fff'; x.font = '800 54px Baloo'; x.textAlign = 'center'; x.fillText('KOPI SUSU', 256, 110); x.fillStyle = GOLD; x.font = '800 92px Baloo'; x.fillText('Rp25.000', 256, 230);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const board = new THREE.Mesh(G.plane(2.4, 1.5), new THREE.MeshStandardMaterial({ map: tx })); board.position.set(1.4, 4.3, -3.88); sc.add(board);
    const ring = group(sc, [-1.4, 2.6, -3.2]); ring.add(new THREE.Mesh(new THREE.TorusGeometry(2.1, .16, 8, 40), mat('#7FD0F0', { emissive: '#5FC8F0', emissiveIntensity: 1.3 }))); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ring.add(mesh(G.box(.08, .3, .05), '#2B6E8A', [Math.sin(a) * 1.8, Math.cos(a) * 1.8, 0], { rot: [0, 0, -a], cast: false })) }
    const hands = [1.4, 1.0].map((l, i) => { const h = mesh(G.box(.1, l, .05), INK, [0, l / 2, .05], { cast: false }); const g = group(ring); g.add(h); return g });
    const N = nana([-1.2, 0, -.2]); sc.add(N); N.rotation.y = .3; const cup = group(N.userData.st.arms[1], [0, -.6, .12]); cup.add(mesh(G.cyl(.12, .09, .28, 12), '#FFFFFF', [0, 0, 0])); cup.add(mesh(G.cyl(.125, .125, .06, 12), '#8B5A2B', [0, .1, 0]));
    const steam = [0, 1, 2].map(() => { const m = mesh(G.ico(.07, 1), '#FFFFFF', [0, 0, 0], { cast: false, mat: { transparent: true, opacity: .6 } }); sc.add(m); return m });
    const cam = camera(42);
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '58px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Kopi <span style="color:${BATA}">Rp25.000</span> ini.<br>20 tahun lagi: <span style="color:#D63B2F">${X.TL.vars.nanti_rp}</span>`);
    return { scene: sc, cam, upd(t, dur) {
      ring.rotation.z = t * .4; hands[0].rotation.z = -t * 3; hands[1].rotation.z = -t * .5; const cp = new THREE.Vector3(); cup.getWorldPosition(cp);
      steam.forEach((m, i) => { const q = (t * .7 + i / 3) % 1; m.position.set(cp.x + Math.sin(t * 3 + i) * .05, cp.y + .2 + q * .6, cp.z); m.scale.setScalar(.6 + q * 1.4); m.material.opacity = .6 * (1 - q) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.4, 1, p), lerp(3.6, 3.3, p), lerp(13.5, 12, p)); cam.lookAt(lerp(-.1, -.4, p), .5, -1.6);
      N.pose(t, { hold: true, talk: t > 3, look: .2 }); X.pop(hook, seg(t, .05, .4));
    } };
  },
  D3_PORTAL(s, root) {   // lorong mesin waktu: cincin cahaya melesat, gelas melayang, tahun dan harga naik bareng
    const v = X.TL.vars; const sc = newScene({ bg: '#3B2E6A', hemi: 1.4, hemiSky: '#FFE9FF', hemiGround: '#6A4AA0', sunI: 1.6, sun: '#FFF1D6', sunPos: [3, 6, 8], fog: ['#3B2E6A', 10, 46] });
    const rings = Array.from({ length: 16 }, (_, i) => { const r = new THREE.Mesh(new THREE.TorusGeometry(3.2, .12, 6, 36), mat(['#FFB36B', '#7FD0F0', '#FF8FB0', '#9DE0B8'][i % 4], { emissive: ['#FF9F4A', '#5FC8F0', '#FF6F98', '#6FD8A0'][i % 4], emissiveIntensity: 1.4 })); r.castShadow = false; sc.add(r); return r });
    const cup = group(sc, [0, 0, 0]); cup.add(mesh(G.cyl(.55, .42, 1.2, 16), '#FFFFFF', [0, 0, 0])); cup.add(mesh(G.cyl(.56, .56, .25, 16), '#8B5A2B', [0, .45, 0])); cup.add(mesh(G.cyl(.57, .57, .3, 16), BATA, [0, -.05, 0]));
    const L = new THREE.PointLight('#FFFFFF', 10, 10); L.position.set(1.5, 1.5, 3); sc.add(L);
    const cam = camera(44); cam.position.set(0, 0, 6); cam.lookAt(0, 0, 0);
    const yr = X.ab({ left: 0, top: 330, width: 1080, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '120px', color: '#fff', WebkitTextStroke: `14px ${INK}`, paintOrder: 'stroke fill' }, root);
    const pr = X.ab({ left: 0, top: 1150, width: 1080, textAlign: 'center' }, root); const asm = chip(root, '*asumsi: harga naik 3%/tahun', { left: 250, top: 520, fontSize: '34px', padding: '6px 18px' });
    return { scene: sc, cam, upd(t, dur) {
      rings.forEach((r, i) => { const z = ((i * 3 + t * 9) % 48); r.position.set(Math.sin(z * .2) * .5, Math.cos(z * .17) * .4, 6 - z); r.rotation.z = z * .1 });
      const g = E.inout(seg(t, at(s, 'dua puluh tahun', 6) - 3, at(s, 'dua puluh tahun', 6) + 1.2)); const k = Math.round(g * 20);
      cup.rotation.y = t * 1.2; cup.position.y = Math.sin(t * 2) * .15; cup.scale.setScalar(1 + g * .35); cam.position.set(Math.sin(t * .6) * .4, Math.cos(t * .5) * .3, 6); cam.lookAt(0, 0, 0);
      yr.textContent = String(2026 + k); pr.innerHTML = `<span style="display:inline-block;background:${CREAM};border:8px solid ${INK};border-radius:30px;padding:10px 40px;font-family:Baloo;font-weight:800;font-size:96px;color:${k > 15 ? '#D63B2F' : INK};box-shadow:0 12px 0 ${BATA}">Rp${v.prices[k]}.000</span>`;
      X.pop(asm, seg(t, .5, .9));
    } };
  },
  D3_CUPTOWER(s, root) {   // gudang terang: 20 menara gelas (satu per tahun) makin tinggi, kamera crane naik
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#DCEBF5', '#FFF6E6'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [-8, 16, 10], hemi: 1.5, shadow: 16 })); sc.add(mesh(G.box(30, .2, 20), '#C9C2B4', [0, -.1, 0])); sc.add(mesh(G.box(30, 14, .2), '#E6DED0', [0, 7, -6]));
    for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.3, 14, .3), '#9A8E7A', [-12.5 + i * 5, 7, -5.8]));
    const cupG = G.cyl(.22, .17, .4, 10); const cupM = mat('#FFFFFF'); const capM = mat(BATA);
    const cols = v.prices.slice(0, 20).map((pz, i) => { const g = group(sc, [-6.65 + i * .7, 0, -1 + (i % 2) * .5]); const n = Math.round(pz / 25 * 8); for (let k = 0; k < n; k++) { const m = new THREE.Mesh(cupG, k % 2 ? capM : cupM); m.position.y = .2 + k * .42; m.castShadow = true; g.add(m) } g.userData.n = n; return g });
    const N = nana([2.6, 0, 3]); sc.add(N); N.rotation.y = -.5;
    const cam = camera(44); const c1 = chip(root, `setahun: <span style="color:${BATA}">${v.setahun_rp}</span>`, { left: 90, top: 300, fontSize: '50px' });
    const big = X.ab({ left: 60, top: 420, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '104px', color: '#fff', WebkitTextStroke: `16px ${BATA}`, paintOrder: 'stroke fill', opacity: 0 }, root, `≈ Rp${v.total_jt} juta<div style="font-size:46px">20 tahun, cuma kopi</div>`);
    return { scene: sc, cam, upd(t, dur) {
      const ts = at(s, 'enam koma', 3), tt = at(s, 'totalnya', dur * .6); const g = seg(t, ts - .5, tt + .8);
      cols.forEach((c, i) => { const q = seg(g, i / 24, i / 24 + .2); c.children.forEach((m, k) => m.visible = k < Math.round(q * c.userData.n)) });
      const h = E.inout(seg(t, 0, dur)); cam.position.set(lerp(6, 3, h), lerp(1.8, 6.5, h), lerp(11, 13, h)); cam.lookAt(lerp(1.4, 0, h), lerp(1.6, 2.4, h), -.8);
      N.pose(t, { look: .8, shake: t > tt + .5 }); N.userData.st.head.rotation.x = -.35 * h;
      X.pop(c1, seg(t, ts, ts + .4)); const q = seg(t, tt, tt + .5); big.style.opacity = q; big.style.transform = `scale(${E.back(q)})`;
    } };
  },
  D3_TUBRUK(s, root) {   // meja kos pagi tampak serong atas: teko, toples kopi, papan minggu 2 beli + 5 bikin sendiri
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#FFE0B0', '#FFF6E6'], sunPos: [-6, 12, 5], hemi: 1.5 })); sc.add(mesh(G.box(10, .3, 7), '#C9935E', [0, -.15, 0]));
    const ket = group(sc, [-2.6, 0, -1.8]); ket.add(mesh(G.sph(.6, 14, 10), '#D7DCE2', [0, .5, 0], { s: [1, .8, 1], mat: { metalness: .5, roughness: .3 } })); ket.add(mesh(G.cyl(.06, .1, .7, 8), '#D7DCE2', [.65, .6, 0], { rot: [0, 0, -.8] })); ket.add(mesh(G.box(.1, .5, .5), '#333', [-.55, .8, 0]));
    const jar = mesh(G.cyl(.4, .4, .9, 14), '#EAF6FF', [-1.2, .45, -2.2], { mat: { transparent: true, opacity: .6 } }); sc.add(jar); sc.add(mesh(G.cyl(.36, .36, .6, 14), '#5A3A20', [-1.2, .32, -2.2]));
    const mug = group(sc, [-1.9, 0, -.4]); mug.add(mesh(G.cyl(.3, .26, .55, 14), '#3E8FC4', [0, .28, 0])); mug.add(mesh(G.cyl(.27, .27, .05, 14), '#5A3A20', [0, .54, 0], { cast: false }));
    const days = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'], buy = [1, 4];
    const tiles = days.map((d, i) => { const cc = document.createElement('canvas'); cc.width = 200; cc.height = 260; const x = cc.getContext('2d'); const b = buy.includes(i); x.fillStyle = b ? BATA : '#2E7D32'; x.fillRect(0, 0, 200, 260); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '800 44px Baloo'; x.fillText(d, 100, 56); x.font = '800 96px Baloo'; x.fillText(b ? '☕' : '🏠', 100, 170); x.font = '800 36px Baloo'; x.fillText(b ? 'beli' : 'bikin', 100, 236);
      const t = new THREE.CanvasTexture(cc); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(G.box(.62, .04, .8), [mat('#EEE'), mat('#EEE'), new THREE.MeshStandardMaterial({ map: t }), mat('#EEE'), mat('#EEE'), mat('#EEE')]); m.castShadow = true; m.position.set(-.5 + (i % 4) * .78 + (i >= 4 ? .4 : 0), .03, .6 + Math.floor(i / 4) * 1); sc.add(m); return m });
    const N = { pose() { } };
    const cam = camera(42); const c1 = chip(root, `bikin sendiri ≈ <span style="color:#2E7D32">${v.bikin_rp}</span>/gelas`, { left: 120, top: 300, fontSize: '46px' }), c2 = chip(root, `selisih <span style="color:#2E7D32">${v.hemat_rp}</span>/bulan → tabungan`, { left: 60, top: 410, fontSize: '44px' });
    return { scene: sc, cam, upd(t, dur) {
      const t2 = at(s, 'dua kali', 3); tiles.forEach((m, i) => { const q = E.back(seg(t, t2 + i * .22, t2 + i * .22 + .4)); m.scale.setScalar(Math.max(.001, q)); m.position.y = .03 + (1 - Math.min(1, q)) * 1.2 });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.5, .4, p), lerp(6.4, 7.6, p), lerp(7.4, 6.2, p)); cam.lookAt(lerp(.2, .6, p), 0, lerp(-.4, .3, p));
      ket.rotation.z = t > t2 + 2 && t < t2 + 4 ? -.3 : 0; N.pose(t, { talk: true, point: t > t2 && t < t2 + 1.5 });
      const tb = at(s, 'tiga ribu', dur * .5), th = at(s, 'Selisihnya', dur * .7); X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, th, th + .4));
    } };
  },
  D3_KOTA2046(s, root) {   // kota tahun 2046 terang: menara pastel membulat, pod melayang, Nana umur 46 dengan toples tabungan
    const v = X.TL.vars; const sc = newScene(WARM({ sky: ['#9FD8F5', '#FFEFD8'], sun: '#FFF4E0', sunPos: [-8, 12, 8], hemi: 1.5, fog: ['#FFE9D6', 24, 70], shadow: 14 })); sc.add(mesh(G.box(60, .2, 60), '#B9C8C2', [0, -.1, 0]));
    for (let i = 0; i < 18; i++) { const a = i * 2.2, r = 13 + (i % 5) * 3, h = 5 + ((i * 47) % 10), col = ['#F4C6D6', '#C6E6F4', '#FFE4B8', '#CDEFD6'][i % 4]; const g = group(sc, [Math.sin(a) * r, 0, -9 - Math.abs(Math.cos(a)) * r * .6]); g.add(mesh(G.cyl(1.2, 1.4, h, 12), col, [0, h / 2, 0], { cast: i % 2 === 0 })); g.add(mesh(G.sph(1.2, 12, 8), col, [0, h, 0], { s: [1, .6, 1], cast: false })); for (let k = 1; k < h; k += 1.5) g.add(mesh(G.cyl(1.22, 1.22, .12, 12), '#FFFFFF', [0, k, 0], { cast: false, mat: { emissive: '#FFFFFF', emissiveIntensity: .3 } })) }
    const pods = Array.from({ length: 5 }, (_, i) => { const g = group(sc, [0, 0, 0]); g.add(mesh(G.sph(.6, 12, 8), ['#E5484D', '#3E8FC4', '#F2B41B', '#2E9C6A', '#C2457A'][i], [0, 0, 0], { s: [1.6, .7, 1] })); g.add(mesh(G.sph(.4, 10, 8), '#BFE6F5', [0, .3, 0], { s: [1.2, .7, 1] })); return g });
    const N = nana([.6, 0, .4], { hair: '#8A8580' }); sc.add(N); N.rotation.y = -.3;
    const jar = group(sc, [-1.2, 0, .2]); jar.add(new THREE.Mesh(G.cyl(.8, .8, 2, 24), new THREE.MeshStandardMaterial({ color: '#DDF3FF', transparent: true, opacity: .35, roughness: .1 }))); jar.children[0].position.y = 1; const fill = mesh(G.cyl(.72, .72, 1, 24), GOLD, [0, .05, 0], { mat: { metalness: .4, roughness: .35 } }); jar.add(fill);
    const cam = camera(44); const big = X.ab({ left: 60, top: 320, width: 960, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '100px', color: '#fff', WebkitTextStroke: `16px #2E7D32`, paintOrder: 'stroke fill', opacity: 0 }, root, `≈ Rp${v.hemat_jt} juta<div style="font-size:44px">dari selisih kopi, belum dihitung bunga</div>`);
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Lo ngopi beli<br><span style="color:${BATA}">berapa kali seminggu?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      pods.forEach((g, i) => { const a = t * (.2 + i * .05) + i * 1.3; g.position.set(Math.sin(a) * (6 + i), 5 + i * 1.2 + Math.sin(t + i) * .3, -6 + Math.cos(a) * (4 + i)); g.rotation.y = -a });
      const tj = at(s, 'juta', 3), tq = at(s, 'Lo ngopi', dur - 3); const f = E.out(seg(t, .4, tj)); fill.scale.y = Math.max(.001, f * 1.8); fill.position.y = .05 + fill.scale.y * .5;
      orbit(cam, lerp(25, -10, E.inout(seg(t, 0, dur))), lerp(2.4, 3.4, seg(t, 0, dur)), lerp(10, 11.5, seg(t, 0, dur)), [-.2, 2.2, 0]); N.pose(t, { hold: true, talk: true, nod: t > tj && t < tq });
      const qq = seg(t, tj, tj + .5); big.style.opacity = qq; big.style.transform = `scale(${E.back(qq)})`; X.pop(q, seg(t, tq, tq + .4));
    } };
  },
  // ===== ep010 (Checklist Sebelum 30: 5 hal, hitung mundur) =====
  D3_ULTAH(s, root) {   // kamar malam terang: kue lilin 26, lilin "30" bayangan melayang, daftar 5 kotak kosong
    const sc = newScene(WARM({ sky: ['#3A2E5A', '#7A5A8A'], sunI: 1.3, hemi: 1.3, sun: '#FFE2C2', sunPos: [-5, 9, 7] })); kos(sc, { wall: '#F0C9B0' });
    for (let i = 0; i < 16; i++) sc.add(mesh(G.sph(.09, 8, 6), ['#FFE08A', '#FFB3C1', '#9DE0B8', '#B9D8FF'][i % 4], [-4.6 + i * .6, 4.6 - Math.sin(i / 15 * Math.PI) * .7, -3.8], { cast: false, mat: { emissive: ['#FFD27A', '#FF9FB0', '#7FE0A8', '#9FC8FF'][i % 4], emissiveIntensity: 1.6 } }));
    const L = new THREE.PointLight('#FFD9A8', 16, 12); L.position.set(0, 4, 2); sc.add(L);
    sc.add(mesh(G.cyl(1.4, 1.4, .1, 20), '#E7D2B5', [0, .9, -1.2])); sc.add(mesh(G.cyl(.12, .2, .9, 8), '#6B4A2A', [0, .45, -1.2]));
    const cake = group(sc, [0, .95, -1.2]); cake.add(mesh(G.cyl(.8, .8, .5, 20), '#FFF1E0', [0, .25, 0])); cake.add(mesh(G.cyl(.82, .82, .1, 20), '#E5484D', [0, .5, 0])); cake.add(mesh(G.cyl(.55, .55, .35, 20), '#FFB3C1', [0, .72, 0]));
    const flames = [-.2, .2].map(x => { cake.add(mesh(G.cyl(.04, .04, .4, 6), '#7FC4E8', [x, 1.08, 0])); const f = mesh(G.sph(.07, 8, 6), '#FFC24A', [x, 1.33, 0], { cast: false, mat: { emissive: '#FFB020', emissiveIntensity: 2 } }); cake.add(f); return f });
    const ghost = group(sc, [0, 3.4, -1.2]); const gm = mat('#FFFFFF', { transparent: true, opacity: .35, emissive: '#FFFFFF', emissiveIntensity: .4 });
    [-.45, .45].forEach(x => { const m = new THREE.Mesh(G.cyl(.18, .18, 1.1, 12), gm); m.position.x = x; ghost.add(m) });
    const N = nana([1.4, 0, -.4]); sc.add(N); N.rotation.y = -.7;
    const cam = camera(42);
    const n3 = X.ab({ left: 0, top: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '110px', color: '#fff', WebkitTextStroke: `12px ${BATA}`, paintOrder: 'stroke fill', opacity: 0 }, root, '30?');
    const hook = X.ab({ left: 60, top: 1130, width: 960, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '18px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 12px 0 ${BATA}` }, root,
      `Umur 26. Tinggal <span style="color:${BATA}">4 tahun</span>.<br><span style="color:${BATA}">5 hal</span> ini harus beres.`);
    const list = X.ab({ left: 140, top: 300, width: 800, background: CREAM, border: `6px solid ${INK}`, borderRadius: '26px', padding: '14px 26px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '40px', color: INK, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root,
      X.TL.vars.items.map(([n, h]) => `<div>☐ ${n}. ${h}</div>`).join(''));
    return { scene: sc, cam, upd(t, dur) {
      flames.forEach((f, i) => f.scale.setScalar(1 + Math.sin(t * 14 + i) * .2)); ghost.rotation.y = t * .6; ghost.position.y = 3.4 + Math.sin(t * 1.5) * .12;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2.4, -.6, p), lerp(3.2, 3.6, p), lerp(10.5, 9.4, p)); cam.lookAt(.2, 1.7, -1.2);
      const [x, y] = X.proj(ghost, cam, [0, .9, 0]); n3.style.left = (x - 90) + 'px'; n3.style.top = (y - 130) + 'px'; n3.style.opacity = t < at(s, 'lima hal', 5) ? seg(t, .8, 1.3) : 0;
      N.pose(t, { talk: true, look: -.4 }); X.pop(hook, seg(t, .05, .4)); const tl = at(s, 'lima hal', 5); X.pop(list, seg(t, tl, tl + .4)); hook.style.display = t > tl ? 'none' : 'block';
    } };
  },
  D3_KASIR(s, root) {   // kasir minimarket siang: struk-struk kecil terbang memutar, tumpukan jajan makin tinggi
    const sc = newScene(WARM({ sky: ['#CDEBF7', '#FFFFFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [5, 12, 8], hemi: 1.6 })); sc.add(mesh(G.box(16, .2, 14), '#E8E4DC', [0, -.1, 0])); sc.add(mesh(G.box(16, 7, .2), '#F6F2EA', [0, 3.5, -4]));
    for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) sc.add(mesh(G.box(.6, .5, .4), ['#E5484D', '#F2B41B', '#2E9C6A', '#3E8FC4', '#C2457A'][(i + r) % 5], [-4.5 + i * .7, 1.2 + r * .9, -3.6]));
    [0, 1, 2].forEach(r => sc.add(mesh(G.box(4.6, .08, .6), '#BBB', [-2.75, .92 + r * .9, -3.6])));
    const ctr = group(sc, [1.6, 0, -1.4]); ctr.add(mesh(G.box(3, 1, 1.2), '#3E8FC4', [0, .5, 0])); ctr.add(mesh(G.box(3.1, .08, 1.3), '#EEE', [0, 1.04, 0])); ctr.add(mesh(G.box(.7, .5, .5), '#333', [.8, 1.33, 0])); ctr.add(mesh(G.box(.5, .3, .02), '#9FE0FF', [.8, 1.6, .2], { mat: { emissive: '#9FE0FF', emissiveIntensity: .8 }, cast: false }));
    const snacks = Array.from({ length: 14 }, (_, i) => { const m = mesh(G.box(.32, .4, .18), ['#E5484D', '#F2B41B', '#2E9C6A', '#C2457A'][i % 4], [0, 0, 0]); sc.add(m); return m });
    const slips = Array.from({ length: 22 }, () => { const m = mesh(G.plane(.3, .5), '#FFFFFF', [0, 0, 0], { cast: false, mat: { side: THREE.DoubleSide } }); sc.add(m); return m });
    const N = nana([-.4, 0, .2]); sc.add(N); N.rotation.y = .5;
    const cam = camera(42); const c1 = chip(root, '📝 dicatat 3 bulan penuh', { left: 90, top: 300, fontSize: '46px' }), c2 = chip(root, `jajan kecil = <span style="color:${BATA}">paling gede</span>`, { left: 150, top: 410, fontSize: '48px' });
    return { scene: sc, cam, upd(t, dur) {
      const tc = at(s, 'dicatat', 3), tj = at(s, 'jajan', dur - 3);
      slips.forEach((m, i) => { const q = (t * .25 + i / 22) % 1, a = q * Math.PI * 4 + i; m.visible = t > tc; m.position.set(-.4 + Math.sin(a) * (1 + q * .8), .6 + q * 3.8, .2 + Math.cos(a) * (1 + q * .8)); m.rotation.set(a, a * .7, 0) });
      snacks.forEach((m, i) => { const q = E.back(seg(t, tj - .5 + i * .08, tj + i * .08)); m.visible = q > 0; m.position.set(.9 + (i % 3) * .36, 1.3 + Math.floor(i / 3) * .42, -1.3 + (i % 2) * .1); m.scale.setScalar(Math.max(.001, q)) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-3, -1, p), lerp(3, 3.6, p), lerp(9, 10.5, p)); cam.lookAt(.2, 1.6, -1);
      N.pose(t, { hold: true, talk: true, shake: t > tj }); X.pop(c1, seg(t, tc, tc + .4)); X.pop(c2, seg(t, tj, tj + .4));
    } };
  },
  D3_HUJAN(s, root) {   // trotoar hujan sore (tetap terang): Nana berpayung, tetesan besar berlabel PHK/sakit/motor mogok
    const sc = newScene(WARM({ sky: ['#7A8AA6', '#C9D3DE'], sun: '#E8EEF6', sunI: 1.6, hemi: 1.5, hemiSky: '#EEF4FF', sunPos: [-6, 10, 6], fog: ['#B8C4D2', 14, 40] })); sc.add(mesh(G.box(30, .2, 14), '#5E6470', [0, -.1, 0])); sc.add(mesh(G.box(30, .3, 3), '#9AA0AA', [0, .05, -1.5]));
    for (let i = 0; i < 8; i++) { const h = 4 + (i * 37 % 4); sc.add(mesh(G.box(3, h, 2), ['#D9C2A8', '#C6D2DC', '#E3CFC0'][i % 3], [-12 + i * 3.4, h / 2, -5], { cast: false })); sc.add(mesh(G.box(1, .8, .05), '#FFE2A0', [-12 + i * 3.4, 1.4, -3.97], { mat: { emissive: '#FFD27A', emissiveIntensity: 1 }, cast: false })) }
    const R = rain(sc, 420, 16, 9, '#E2EEFA'); const puddles = [[-1, 1], [2, .4], [3.5, 1.6]].map(([x, z]) => { const m = mesh(G.cyl(.6, .6, .02, 16), '#8FA4BC', [x, .01, z], { cast: false, mat: { roughness: .1, metalness: .3 } }); sc.add(m); return m });
    const N = nana([0, .2, -1.2], { prop: 'umbrella', umbC: '#F2B41B' }); sc.add(N); N.rotation.y = .3;
    const P = person(sc, [-5, .2, -2.4], { body: '#6B8E5A', hair: '#2A1A10', skin: '#C98E64' }); P.rotation.y = Math.PI / 2;
    const cam = camera(42); const tags = [['💼 PHK', 'PHK'], ['🤒 sakit', 'sakit'], ['🛵 motor mogok', 'motor']].map(([h, cu], i) => ({ e: chip(root, h, { left: [80, 420, 600][i], top: [520, 420, 560][i], fontSize: '42px' }, BATA), cu }));
    const c1 = chip(root, 'patokan: <span style="color:#2E7D32">3-6× pengeluaran</span>', { left: 90, top: 300, fontSize: '46px' });
    return { scene: sc, cam, upd(t, dur) {
      R.tick(t); puddles.forEach((m, i) => m.scale.setScalar(1 + Math.sin(t * 5 + i) * .05));
      P.position.x = lerp(-5, 5, seg(t, 0, dur)); P.pose(t, { walk: 1.6 }); N.pose(t, { hold: true, talk: true });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(2.2, -1.2, p), lerp(2.6, 3, p), lerp(8.4, 9, p)); cam.lookAt(0, 1.6, -1);
      const tp = at(s, 'Patokan', 2); X.pop(c1, seg(t, tp, tp + .4)); tags.forEach((g, i) => { const tc = at(s, g.cu, dur - 3 + i * .5); X.pop(g.e, seg(t, tc, tc + .4)) });
    } };
  },
  D3_ESKALATOR(s, root) {   // mal terang: Nana naik eskalator menyeret bola rantai, tas belanja di tangan
    const sc = newScene(WARM({ sky: ['#F4EEF8', '#FFFFFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', sunPos: [4, 14, 8], hemi: 1.7, shadow: 14 })); sc.add(mesh(G.box(24, .2, 16), '#E9E2D8', [0, -.1, 0])); sc.add(mesh(G.box(24, .3, 6), '#D9D0C4', [4, 4, -3]));
    for (let i = 0; i < 5; i++) { sc.add(mesh(G.box(3, 2.6, .1), ['#FFB3C1', '#B9D8FF', '#FFE680', '#9DE0B8', '#E0C8FF'][i], [-8 + i * 4, 1.3, -6], { mat: { emissive: ['#FFB3C1', '#B9D8FF', '#FFE680', '#9DE0B8', '#E0C8FF'][i], emissiveIntensity: .3 }, cast: false })); sc.add(mesh(G.box(3.2, .5, .3), '#4A2410', [-8 + i * 4, 2.85, -5.9])) }
    const esc = group(sc, [-2, 0, 0]); const ang = Math.atan2(4, 6); esc.add(mesh(G.box(7.2, .4, 1.4), '#8A8A92', [3, 2, 0], { rot: [0, 0, ang] }));
    [-1, 1].forEach(z => esc.add(mesh(G.box(7.4, .9, .08), '#BFE6F5', [3, 2.6, z * .72], { rot: [0, 0, ang], mat: { transparent: true, opacity: .5 } })));
    const steps = Array.from({ length: 14 }, (_, i) => { const m = mesh(G.box(.5, .3, 1.3), '#5A5A64', [0, 0, 0]); esc.add(m); return m });
    const N = nana([0, 0, 0]); esc.add(N); N.rotation.y = Math.PI / 2 - .3;
    const bags = [0, 1].map(i => { const b = mesh(G.box(.35, .4, .15), ['#E5484D', '#F2B41B'][i], [0, -.25 - i * .05, i * .2]); N.userData.st.arms[i].add(b); return b });
    const chain = Array.from({ length: 6 }, () => { const m = mesh(G.sph(.08, 8, 6), '#3A3A40', [0, 0, 0], { mat: { metalness: .6, roughness: .4 } }); esc.add(m); return m }); const ball = mesh(G.sph(.35, 14, 10), '#2A2A30', [0, 0, 0], { mat: { metalness: .6, roughness: .4 } }); esc.add(ball);
    const cam = camera(42); const c1 = chip(root, 'cicilan barang yang nilainya turun', { left: 90, top: 300, fontSize: '42px' }, BATA), c2 = chip(root, `+ bunga tinggi = <span style="color:${BATA}">rantai di kaki</span>`, { left: 120, top: 400, fontSize: '44px' });
    return { scene: sc, cam, upd(t, dur) {
      steps.forEach((m, i) => { const q = ((i / 14) + t * .03) % 1; m.position.set(q * 6, q * 4 + .25, 0) });
      const q = .1 + seg(t, 0, dur) * .55; N.position.set(q * 6, q * 4 + .4, 0); N.pose(t, { walk: .5, hold: true });
      chain.forEach((m, i) => { const k = (i + 1) / 7, qq = q - k * .12; m.position.set(qq * 6, qq * 4 + .45 + Math.sin(t * 3 + i) * .02, .1) }); const qb = q - .14; ball.position.set(qb * 6, qb * 4 + .7, .1);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(N.position.x - 1 + p, N.position.y + 2.2, 10); cam.lookAt(N.position.x - 1.3, N.position.y + .7, 0);
      const tc = at(s, 'Cicilan', 2), tr = at(s, 'rantai', dur - 3); X.pop(c1, seg(t, tc, tc + .4)); X.pop(c2, seg(t, tr, tr + .4));
    } };
  },
  D3_KLINIK(s, root) {   // ruang tunggu klinik terang: tagihan panjang menggulung, lalu perisai hijau melindungi Nana
    const sc = newScene(WARM({ sky: ['#DFF2EC', '#FFFFFF'], sun: '#FFFFFF', hemiSky: '#FFFFFF', hemiGround: '#A8C8BC', sunPos: [5, 12, 8], hemi: 1.6 })); sc.add(mesh(G.box(16, .2, 14), '#DDE7E4', [0, -.1, 0])); sc.add(mesh(G.box(16, 7, .2), '#F2F8F6', [0, 3.5, -4]));
    const sign = group(sc, [2.6, 4.2, -3.85]); sign.add(mesh(G.box(1.4, .4, .05), '#2E9C6A', [0, 0, 0], { cast: false })); sign.add(mesh(G.box(.4, 1.4, .05), '#2E9C6A', [0, 0, 0], { cast: false }));
    sc.add(mesh(G.box(3.4, 1.1, 1), '#FFFFFF', [2.6, .55, -2.8])); sc.add(mesh(G.box(3.5, .08, 1.1), '#7FC4B0', [2.6, 1.12, -2.8]));
    for (let i = 0; i < 4; i++) { const ch = group(sc, [-4 + i * 1, 0, -1.6]); ch.add(mesh(G.box(.8, .1, .8), '#3E8FC4', [0, .55, 0])); ch.add(mesh(G.box(.8, .8, .1), '#3E8FC4', [0, .95, -.35])); [-.3, .3].forEach(x => ch.add(mesh(G.box(.06, .55, .06), '#888', [x, .27, 0]))) }
    const W = person(sc, [-3, .1, -1.6], { body: '#C2457A', hair: '#2A1A10', skin: '#D9A07A' }); W.scale.setScalar(.9);
    const N = nana([0, 0, .2]); sc.add(N); N.rotation.y = .2;
    const c = document.createElement('canvas'); c.width = 300; c.height = 900; const x = c.getContext('2d'); x.fillStyle = '#FFFDF7'; x.fillRect(0, 0, 300, 900); x.fillStyle = INK; x.font = '800 40px Baloo'; x.textAlign = 'center'; x.fillText('TAGIHAN', 150, 60); x.font = '700 26px Baloo'; ['kamar', 'obat', 'dokter', 'tindakan', 'lab', 'kamar', 'obat', 'perawat', 'alat', 'lain-lain'].forEach((k, i) => { x.textAlign = 'left'; x.fillText(k, 24, 120 + i * 62); x.textAlign = 'right'; x.fillText('Rp•••', 276, 120 + i * 62) });
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; const bill = new THREE.Mesh(G.plane(1.1, 3.3), new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide })); sc.add(bill);
    const shield = new THREE.Mesh(G.sph(1.3, 20, 14), new THREE.MeshStandardMaterial({ color: '#7FE0A8', transparent: true, opacity: .25, emissive: '#5FD08F', emissiveIntensity: .5 })); shield.position.set(0, 1.1, .2); sc.add(shield);
    const cam = camera(42); const c1 = chip(root, 'sekali dirawat = <span style="color:#D63B2F">tabungan bertahun-tahun</span>', { left: 50, top: 300, fontSize: '40px' }), c2 = chip(root, '🛡️ jaminan kesehatan aktif, iuran nggak telat', { left: 50, top: 400, fontSize: '38px' }, '#2E7D32');
    return { scene: sc, cam, upd(t, dur) {
      const tb = at(s, 'dirawat', 2), tj = at(s, 'jaminan', dur - 3.5); const L = E.out(seg(t, tb, tb + 2));
      bill.scale.y = Math.max(.01, L); bill.position.set(1.4, .2 + 3.3 * L / 2 + .6, .8); tex.repeat.y = Math.max(.01, L); tex.offset.y = 1 - L; bill.rotation.y = -.3;
      const sh = E.back(seg(t, tj, tj + .6)); shield.scale.setScalar(Math.max(.001, sh)); bill.position.x = 1.4 + seg(t, tj, tj + .6) * 1.2;
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1.2, .6, p), lerp(2.8, 3.2, p), lerp(9.6, 8.6, p)); cam.lookAt(.4, 1.6, -.6);
      N.pose(t, { shake: t > tb + .5 && t < tj, talk: true, nod: t > tj + .6 }); W.pose(t, { look: .4 }); X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tj, tj + .4));
    } };
  },
  D3_BIBIT(s, root) {   // kebun bibit pagi: deretan bibit tumbuh jadi pohon berbuah koin, checklist lengkap + pertanyaan
    const sc = newScene(WARM({ sky: ['#A8DCF2', '#FFF3DE'], sun: '#FFF4E0', sunPos: [-8, 9, 8], hemi: 1.5, shadow: 14 })); sc.add(mesh(G.box(30, .2, 20), '#7FAF52', [0, -.1, 0]));
    const rows = []; for (let r = 0; r < 3; r++) { sc.add(mesh(G.box(9, .16, .9), '#8D6E4A', [0, .02, -2 + r * 1.6])); for (let i = 0; i < 6; i++) { const g = group(sc, [-3.6 + i * 1.45, .1, -2 + r * 1.6]); const trunk = mesh(G.cyl(.05, .08, 1, 6), '#7A4E2C', [0, .5, 0]); g.add(trunk); const leaf = mesh(G.ico(.45, 0), '#4E8F3A', [0, 1.1, 0]); g.add(leaf); const cs = [0, 1, 2].map(k => coin(g, [Math.sin(k * 2.1) * .35, 1.1 + Math.cos(k * 2.1) * .2, .3], 1.1)); rows.push({ g, trunk, leaf, cs, d: (r * 6 + i) * .05 }) } }
    const N = nana([2.8, 0, 2.4]); sc.add(N); N.rotation.y = -.8; const can = group(N.userData.st.arms[1], [0, -.6, .15]); can.add(mesh(G.box(.3, .25, .2), '#3E8FC4', [0, 0, 0])); can.add(mesh(G.cyl(.02, .03, .35, 6), '#3E8FC4', [0, .05, .25], { rot: [1, 0, 0] }));
    const cam = camera(44); const risk = chip(root, '⚠️ nilainya bisa naik turun, pelajari dulu', { left: 120, top: 300, fontSize: '36px' }, BATA);
    const list = X.ab({ left: 140, top: 390, width: 800, background: CREAM, border: `6px solid ${INK}`, borderRadius: '26px', padding: '12px 26px', fontFamily: 'Baloo', fontWeight: 800, fontSize: '36px', color: INK, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, X.TL.vars.items.map(([n, h]) => `<div>✅ ${n}. ${h}</div>`).join(''));
    const q = X.ab({ left: 60, top: 1250, width: 960, background: CREAM, border: `6px solid ${INK}`, borderRadius: '28px', padding: '14px 22px', textAlign: 'center', fontSize: '48px', color: INK, fontFamily: 'Baloo', fontWeight: 800, boxShadow: `0 10px 0 ${BATA}`, opacity: 0 }, root, `Dari 5 ini, lo udah beres <span style="color:${BATA}">berapa?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const g = seg(t, .3, dur * .55); rows.forEach(R => { const h = E.out(seg(g, R.d, R.d + .4)); R.trunk.scale.y = .2 + h; R.trunk.position.y = (.2 + h) * .5; R.leaf.position.y = (.2 + h) + .15; R.leaf.scale.setScalar(.3 + h * .8); R.cs.forEach((c, k) => { c.visible = h > .9; c.position.y = (.2 + h) + .1 + Math.cos(k * 2.1) * .2; c.rotation.y = t * 2 + k }) });
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(6, 2, p), lerp(3.2, 5.2, p), lerp(9, 11, p)); cam.lookAt(lerp(1.6, 0, p), .9, -.4);
      can.rotation.x = Math.sin(t * 2) * .3; N.pose(t, { hold: true, talk: true });
      const tr = at(s, 'naik turun', dur * .55), tq = at(s, 'Dari lima', dur - 3); X.pop(risk, seg(t, tr, tr + .4)); X.pop(list, seg(t, tq - .6, tq - .2)); X.pop(q, seg(t, tq, tq + .4));
    } };
  },
};

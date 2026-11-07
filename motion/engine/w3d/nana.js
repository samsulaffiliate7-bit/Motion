// Dunia 3D akun Dompet Gue Nangis: hidup sehari-hari Nana, cahaya senja hangat.
// Bahasa visual khas: push-in pelan ke benda (struk, dompet, HP), benda keuangan raksasa, koin, Si Dompet berekspresi,
// transisi koin raksasa jatuh menutup layar.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, coin } from './kit.js';

let X; const BATA = '#C8501E', INK = '#4A2410', GOLD = '#F2B41B', CREAM = '#FFF6E6';
const WARM = o => Object.assign({ sky: ['#F59E5B', '#FFE7C2'], sun: '#FFC58A', sunI: 2.4, sunPos: [-8, 7, 6], hemiSky: '#FFF1DE', hemiGround: '#B07A50', hemi: 1.5, shadow: 10 }, o);
const nana = (p, o = {}) => { const g = person(o.parent, p, Object.assign({ body: BATA, pants: '#7D7D85', hair: '#1E1410', skin: '#E2A97E' }, o)); const H = g.userData.st.head; H.add(mesh(G.sph(.14, 8, 6), '#1E1410', [0, .1, -.42])); H.add(mesh(G.cyl(.06, .03, .35, 6), '#1E1410', [0, -.12, -.5], { rot: [.4, 0, 0] })); return g };
function dompet(parent, p, s = 1) {   // Si Dompet: dompet cokelat berwajah
  const g = group(parent, p); g.scale.setScalar(s);
  g.add(mesh(G.box(1, .7, .25), '#8B5A2B', [0, .35, 0])); const flap = mesh(G.box(1.02, .3, .27), '#A86B35', [0, .62, .01]); g.add(flap); g.add(mesh(G.box(.14, .14, .05), GOLD, [0, .5, .15]));
  const eyes = [-1, 1].map(i => { const e = group(g, [i * .22, .32, .13]); e.add(mesh(G.sph(.1, 10, 8), '#FFFFFF', [0, 0, 0], { cast: false })); e.add(mesh(G.sph(.05, 8, 6), '#1E1E1E', [0, 0, .07], { cast: false })); return e });
  const mouth = mesh(G.box(.2, .04, .03), '#3A1A0A', [0, .14, .14], { cast: false }); g.add(mouth);
  const tears = [-1, 1].map(i => { const t = mesh(G.sph(.05, 8, 6), '#7FC4E8', [i * .22, .2, .16], { cast: false, mat: { emissive: '#7FC4E8', emissiveIntensity: .4 } }); g.add(t); return t });
  g.mood = (t, sad) => { mouth.rotation.z = 0; mouth.scale.set(1, sad ? 2.5 : 1, 1); mouth.position.y = sad ? .12 : .15; eyes.forEach(e => e.scale.y = sad ? .6 : 1 + (Math.sin(t * 3) > .97 ? -.9 : 0));
    tears.forEach((d, i) => { d.visible = sad; const q = (t * 1.2 + i * .5) % 1; d.position.y = .2 - q * .5 }); g.position.y = p[1] + Math.abs(Math.sin(t * (sad ? 9 : 3))) * (sad ? .03 : .06) };
  g.mood(0, false); return g;
}
const ICON = { Film: '▶', Musik: '♪', Drama: '♥', Olahraga: '⚽', Kartun: '★' }, COL = { Film: '#E5484D', Musik: '#2E9C6A', Drama: '#C2457A', Olahraga: '#3E7CB1', Kartun: '#F2A31B' };
function tileTex(name, on, price) { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d'); x.fillStyle = on ? COL[name] : '#9A948C'; x.fillRect(0, 0, 256, 256);
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '800 120px Baloo'; x.fillText(ICON[name], 128, 150); x.font = '800 34px Baloo'; x.fillText(name.toUpperCase(), 128, 200); if (price) { x.fillStyle = '#00000055'; x.fillRect(0, 212, 256, 44); x.fillStyle = '#fff'; x.font = '800 32px Baloo'; x.fillText(price, 128, 246) } const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t }
function appTile(parent, p, name, price) { const g = group(parent, p); const on = new THREE.MeshStandardMaterial({ map: tileTex(name, true, price), roughness: .5 }), off = new THREE.MeshStandardMaterial({ map: tileTex(name, false, price), roughness: .9 });
  const m = new THREE.Mesh(G.box(1, 1, .18), [mat('#DDD'), mat('#DDD'), mat('#DDD'), mat('#DDD'), on, mat('#CCC')]); m.castShadow = true; g.add(m); g.set = v => { m.material[4] = v ? on : off }; return g }
function kos(sc, o = {}) {   // kamar kos: lantai kayu, dinding hangat, jendela senja
  sc.add(mesh(G.box(14, .2, 14), '#B9875A', [0, -.1, 0])); sc.add(mesh(G.box(14, 6, .2), o.wall || '#F3D9B8', [0, 3, -4])); sc.add(mesh(G.box(.2, 6, 14), '#EBCBA4', [-5, 3, 0]));
  sc.add(mesh(G.box(2.6, 2, .05), '#FFB36B', [1.8, 3, -3.88], { mat: { emissive: '#FF9F4A', emissiveIntensity: .8 }, cast: false })); sc.add(mesh(G.box(.08, 2, .08), '#FFF', [1.8, 3, -3.83]));
}
const chip = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CREAM, border: `6px solid ${INK}`, borderRadius: '24px', padding: '12px 26px', fontSize: '42px', fontWeight: 800, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${BATA}`, fontFamily: 'Baloo' }, css), root, html); e.style.opacity = 0; return e };
function tag3(root, html, col = INK) { const w = X.ab({ left: 0, top: 0 }, root); const e = chip(w, html, { position: 'relative', transform: 'translate(-50%,-100%)', fontSize: '30px', padding: '6px 14px' }, col);
  return { at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }
const at = (s, rx, fb) => X.C(s, rx, fb);

export async function setup(ctx) { X = ctx; await document.fonts.load('800 120px Baloo') }

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
};

let title, bigCoin;
export function chrome(ctx) {
  title = ctx.ab({ left: 40, top: 62, zIndex: 8 }, ctx.ov);
  bigCoin = ctx.ab({ left: 0, top: 0, width: 1500, height: 1500, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%,#FFE58A,${GOLD} 55%,#C98A0A)`, border: '40px solid #E0A315', zIndex: 9, display: 'none', fontFamily: 'Baloo', fontWeight: 800, fontSize: '620px', color: '#E0A315', textAlign: 'center', lineHeight: '1400px' }, ctx.ov, 'Rp');
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const q = seg(t, .15, .5);
  title.innerHTML = `<div style="display:inline-block;background:${BATA};color:#fff;font-family:Baloo;font-weight:800;font-size:46px;padding:10px 28px;border-radius:18px;transform:rotate(-2deg);box-shadow:0 8px 0 ${INK}">${s.kicker}</div><div style="font-family:Baloo;font-weight:800;font-size:36px;color:${INK};background:${CREAM};display:inline-block;margin-left:12px;padding:6px 18px;border-radius:14px;border:4px solid ${INK}">${s.sub}</div>`;
  title.style.opacity = q; title.style.transform = `scale(${.8 + .2 * E.back(q)})`; title.style.transformOrigin = '0 50%';
  let w = -1; X.TL.scenes.forEach((x, i) => { if (i) { const p = (T - (x.start - .35)) / .7; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { bigCoin.style.display = 'none'; return }
  bigCoin.style.display = 'block'; bigCoin.style.left = '-210px'; bigCoin.style.top = lerp(-1600, 2000, E.inout(w)) + 'px'; bigCoin.style.transform = `rotate(${w * 120}deg)`;
}

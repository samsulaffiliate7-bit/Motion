// Gaya "planet" (Denah Rumah Dunia Season 1 "Planet Denah"): look premium, HUD panel ungu tua, label adegan,
// transisi khas = lembar cetak biru (blueprint) menyapu layar dengan garis ukur. Shot ada di episodes/denah/<ep>/shots.js,
// dunia season di episodes/denah/_s1/dunia.js. Helper teks/papan diambil dari desa3d.js (setup-nya ikut dipanggil).
import { clamp, lerp, seg, E, setLook } from './kit.js';
import * as D3 from './desa3d.js';

let X; export const PANEL = 'rgba(42,30,86,.93)', PCREAM = '#FFF3E2', PORANGE = '#FF9F45', PTEAL = '#5FE0D0', PFONT = 'Poppins,Fredoka,sans-serif', BLUE = '#1F5FAF';
export async function setup(ctx) { X = ctx; await D3.setup(ctx); setLook(ctx.TH.look, ctx.TH.figure) }
export const SHOTS = {};
export const at = (s, rx, fb) => X.C(s, rx, fb);
export const canvasPlane = D3.canvasPlane;

let hud, label, sweep, P;
export function chrome(ctx) {
  const v = ctx.TL.vars.hud || { items: [] };
  ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 7, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 64% at 50% 46%, rgba(40,20,70,0) 66%, rgba(40,20,70,.26) 100%), linear-gradient(170deg, rgba(255,214,170,.10), rgba(255,214,170,0) 50%)' }, ctx.ov);
  hud = ctx.ab({ left: 36, top: 56, display: 'flex', gap: '12px', zIndex: 8, fontFamily: PFONT, fontWeight: 600 }, ctx.ov,
    v.items.map((t, i) => `<div style="background:${i ? PANEL : PORANGE};color:${i ? PCREAM : '#2A1E56'};font-size:28px;letter-spacing:2px;padding:9px 20px;border-radius:10px;border:1px solid #ffffff2a;box-shadow:0 6px 16px #0000004d;font-weight:${i ? 600 : 800}">${t}</div>`).join(''));
  label = ctx.ab({ left: 36, top: 150, zIndex: 8, fontFamily: PFONT }, ctx.ov);
  sweep = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 9, display: 'none', background: BLUE }, ctx.ov,
    `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffffff22 0 2px,transparent 2px 54px),repeating-linear-gradient(0deg,#ffffff22 0 2px,transparent 2px 54px)"></div>
     <div style="position:absolute;right:0;top:0;bottom:0;width:10px;background:${PCREAM}"></div>
     <div style="position:absolute;right:26px;top:0;bottom:0;width:3px;background:repeating-linear-gradient(0deg,${PCREAM} 0 3px,transparent 3px 36px)"></div>`);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx];
  const q = E.out(seg(t, .1, .5)), o = seg(t, 2.8, 3.2);
  if (!s.kicker) label.style.opacity = 0; else {
    label.innerHTML = `<div style="background:${PANEL};color:${PCREAM};border-radius:16px;padding:14px 28px 16px;box-shadow:0 12px 26px #0000005c;border:1px solid #ffffff1c"><div style="font-size:20px;letter-spacing:4px;color:${PTEAL};font-weight:600">${s.kicker}</div><div style="font-size:44px;font-weight:700;line-height:1.1">${s.sub}</div><div style="width:46px;height:4px;background:${PORANGE};margin-top:10px;border-radius:2px"></div></div>`;
    label.style.opacity = q * (1 - o); label.style.transform = `translateX(${(1 - q) * -50}px)` }
  // transisi: lembar cetak biru menyapu dari kiri ke kanan di batas adegan
  let w = -1; X.TL.scenes.forEach((x, i) => { if (i) { const p = (T - (x.start - .22)) / .44; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { sweep.style.display = 'none'; return }
  sweep.style.display = 'block'; const a = E.inout(clamp(w * 2)), b = E.inout(clamp(w * 2 - 1));
  sweep.style.clipPath = `inset(0 ${(1 - a) * 100}% 0 ${b * 100}%)`;
}
export { X };

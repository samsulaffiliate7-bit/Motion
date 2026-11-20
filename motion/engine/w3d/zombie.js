// Gaya layar akun Balai Desa Bocor Season 1 "Desa Terakhir" (zombie, bertahan berkelompok).
// Pembeda dari Kades: HUD papan posko (hari ke-N merah bata + penyintas + gudang), label pita "WASPADA" miring,
// transisi kabut putih-hijau yang menyapu dari kiri, vignette hijau lumut tipis. Dunia & tokoh: episodes/balai/_s1/dunia.js.
import { clamp, lerp, seg, E } from './kit.js';
import * as D from './desa3d.js';

let X, hud, label, fog, P = { };
export const FONT = 'Poppins,Fredoka,sans-serif', RUST = '#B5452B', BONE = '#F3E9D2', MOSS = '#1E2A1C', AMBER = '#F2B33D';
export async function setup(ctx) { X = ctx; await D.setup(ctx) }   // desa3d.setup -> X untuk canvasPlane/at + look premium & stickman
export const SHOTS = {};

export function chrome(ctx) {
  const v = ctx.TL.vars.hud || {};
  ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 7, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 64% at 50% 46%, rgba(20,34,18,0) 62%, rgba(20,34,18,.34) 100%), linear-gradient(180deg, rgba(255,214,150,.08), rgba(255,214,150,0) 40%)' }, ctx.ov);
  const chip = t => `<div style="background:rgba(30,42,28,.9);color:${BONE};font-size:27px;letter-spacing:1.5px;padding:8px 18px;border-radius:8px;border:1px solid #ffffff26;box-shadow:0 6px 14px #00000055">${t}</div>`;
  hud = ctx.ab({ left: 36, top: 52, zIndex: 8, fontFamily: FONT, fontWeight: 700 }, ctx.ov,
    `<div style="display:inline-flex;align-items:stretch;box-shadow:0 8px 18px #00000060;border-radius:10px;overflow:hidden">
      <div style="background:${RUST};color:${BONE};font-size:22px;letter-spacing:4px;padding:12px 16px;writing-mode:horizontal-tb">${v.judul || 'DESA TERAKHIR'}</div>
      <div style="background:${BONE};color:${MOSS};font-size:34px;font-weight:800;padding:6px 18px;letter-spacing:1px">${v.hari || ''}</div></div>
     <div style="display:flex;gap:10px;margin-top:10px">${(v.items || []).map(chip).join('')}</div>`);
  label = ctx.ab({ left: 0, top: 236, zIndex: 8, fontFamily: FONT }, ctx.ov);
  fog = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 9, pointerEvents: 'none', opacity: 0 }, ctx.ov);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx];
  if (s.kicker) {
    const q = E.out(seg(t, .15, .55)), o = seg(t, 3, 3.4);
    label.innerHTML = `<div style="transform:rotate(-2.5deg);display:inline-flex;align-items:center;gap:14px;background:${AMBER};color:#2A1E10;padding:10px 26px 10px 22px;box-shadow:0 10px 22px #0000005e;
      background-image:repeating-linear-gradient(135deg, rgba(0,0,0,.0) 0 26px, rgba(0,0,0,.09) 26px 40px)"><span style="font-size:30px;font-weight:800;letter-spacing:5px">⚠ ${s.kicker}</span><span style="font-size:30px;font-weight:600">${s.sub}</span></div>`;
    label.style.opacity = q * (1 - o); label.style.left = lerp(-500, 36, q) + 'px';
  } else label.style.opacity = 0;
  // kabut menyapu di pergantian adegan
  let w = -1; X.TL.scenes.forEach((x, i) => { if (i) { const p = (T - (x.start - .22)) / .44; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { fog.style.opacity = 0; return }
  const c = lerp(-60, 160, w); fog.style.opacity = 1;
  fog.style.background = `linear-gradient(100deg, rgba(232,240,226,0) ${c - 70}%, rgba(232,240,226,.96) ${c - 30}%, rgba(214,228,206,.96) ${c}%, rgba(232,240,226,0) ${c + 40}%)`;
}

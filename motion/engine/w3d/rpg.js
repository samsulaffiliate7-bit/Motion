// Gaya layar akun Hewan Berdasi Kotor Season 1 "Kerajaan Berdasi" (MMORPG fantasi).
// Pembeda: UI game (bingkai potret + Lv + bar HP merah + bar XP biru + gold), spanduk QUEST perkamen di tengah,
// transisi "loading" garis diagonal oranye. Dunia & tokoh: episodes/hewan/_s1/dunia.js.
import { clamp, lerp, seg, E } from './kit.js';
import * as D from './desa3d.js';

let X, ui, quest, wipe;
export const FONT = 'Baloo,Poppins,sans-serif', ORANGE = '#F28C28', PARCH = '#F6E7C1', INK = '#2A1A10', NAVY = '#16213E';
export async function setup(ctx) { X = ctx; await D.setup(ctx) }
export const SHOTS = {};

const bar = (v, max, col, w = 250) => `<div style="width:${w}px;height:18px;background:#0008;border-radius:9px;border:2px solid #FFFFFF55;overflow:hidden"><div style="width:${Math.round(100 * v / max)}%;height:100%;background:${col};border-radius:7px"></div></div>`;
export function hudHTML(v) {
  if (!v || v.mode === 'title') return `<div style="background:${NAVY}E6;color:${PARCH};font-size:30px;padding:8px 20px;border-radius:12px;border:3px solid ${ORANGE};letter-spacing:2px">${(v && v.items || []).join('  ·  ')}</div>`;
  return `<div style="display:flex;align-items:center;gap:14px;background:${NAVY}E0;padding:10px 20px 10px 10px;border-radius:60px 18px 18px 60px;border:3px solid ${ORANGE};box-shadow:0 8px 18px #00000066">
    <div style="width:88px;height:88px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#FFB766,${ORANGE});border:4px solid ${PARCH};display:flex;align-items:center;justify-content:center;font-size:52px">🐱</div>
    <div><div style="color:${PARCH};font-size:30px;line-height:1;letter-spacing:1px">${v.nama} <span style="color:${ORANGE}">Lv ${v.lv}</span></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:6px"><span style="color:#FF8A80;font-size:20px;width:30px">HP</span>${bar(v.hp[0], v.hp[1], 'linear-gradient(#FF6B5E,#D7372B)')}<span style="color:${PARCH};font-size:20px">${v.hp[0]}/${v.hp[1]}</span></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:4px"><span style="color:#8EC9FF;font-size:20px;width:30px">XP</span>${bar(v.xp[0], v.xp[1], 'linear-gradient(#7CC4FF,#2F7FD8)')}<span style="color:${PARCH};font-size:20px">${v.xp[0]}/${v.xp[1]}</span></div></div>
    <div style="color:#FFD45E;font-size:32px;margin-left:6px">🪙 ${v.gold}</div></div>`;
}
export function chrome(ctx) {
  ui = ctx.ab({ left: 30, top: 48, zIndex: 8, fontFamily: FONT, fontWeight: 800 }, ctx.ov, hudHTML(ctx.TL.vars.hud));
  quest = ctx.ab({ left: 0, top: 250, width: 1080, textAlign: 'center', zIndex: 8, fontFamily: FONT, fontWeight: 800 }, ctx.ov);
  wipe = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 9, pointerEvents: 'none', opacity: 0 }, ctx.ov);
  ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 7, pointerEvents: 'none', background: 'radial-gradient(ellipse 82% 66% at 50% 46%, rgba(22,33,62,0) 64%, rgba(22,33,62,.28) 100%)' }, ctx.ov);
}
export function setHUD(v) { ui.innerHTML = hudHTML(v) }   // dipanggil shot bila gold/XP berubah
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx];
  if (s.kicker) { const q = seg(t, .15, .5), o = seg(t, 3, 3.4);
    quest.innerHTML = `<div style="display:inline-block;background:${PARCH};color:${INK};border:5px solid #8A5A2A;border-radius:14px;padding:8px 34px 12px;box-shadow:0 10px 22px #00000066;transform:scale(${E.back(q)})">
      <div style="font-size:22px;letter-spacing:6px;color:#B5452B">${s.kicker}</div><div style="font-size:44px;line-height:1">${s.sub}</div></div>`;
    quest.style.opacity = q > 0 ? 1 - o : 0 } else quest.style.opacity = 0;
  let w = -1; X.TL.scenes.forEach((x, i) => { if (i) { const p = (T - (x.start - .2)) / .4; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { wipe.style.opacity = 0; return }
  const c = lerp(-40, 140, E.inout(w)); wipe.style.opacity = 1;
  wipe.style.background = `linear-gradient(120deg, transparent ${c - 45}%, ${ORANGE} ${c - 40}%, ${ORANGE} ${c - 22}%, ${NAVY} ${c - 22}%, ${NAVY} ${c}%, transparent ${c}%)`;
}

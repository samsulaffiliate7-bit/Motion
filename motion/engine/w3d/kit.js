// Perkakas 3D bersama (three.js low-poly). Dipakai oleh dunia tiap akun (w3d/<style>.js).
// Semua bentuk dibuat dari primitif, tanpa aset luar.
import * as THREE from '../vendor/three-0.170.0.module.min.js';
export { THREE };

export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const E = {
  out: t => 1 - Math.pow(1 - t, 3), in: t => t * t * t,
  inout: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  back: t => { const c = 1.70158, c3 = c + 1; return 1 + c3 * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) },
};
const MC = new Map();
export function mat(color, o = {}) {
  const k = color + JSON.stringify(o);
  if (!MC.has(k)) MC.set(k, new THREE.MeshStandardMaterial(Object.assign({ color, roughness: .85, metalness: 0, flatShading: true }, o)));
  return MC.get(k);
}
export function mesh(geo, color, p = [0, 0, 0], o = {}) {
  const m = new THREE.Mesh(geo, typeof color === 'string' ? mat(color, o.mat) : color);
  m.position.set(...p); if (o.rot) m.rotation.set(...o.rot); if (o.s) (Array.isArray(o.s) ? m.scale.set(...o.s) : m.scale.setScalar(o.s));
  m.castShadow = o.cast !== false; m.receiveShadow = o.recv !== false; return m;
}
export const G = {
  box: (w, h, d) => new THREE.BoxGeometry(w, h, d), cyl: (rt, rb, h, n = 10) => new THREE.CylinderGeometry(rt, rb, h, n),
  cone: (r, h, n = 4) => new THREE.ConeGeometry(r, h, n), sph: (r, w = 12, h = 10) => new THREE.SphereGeometry(r, w, h),
  ico: (r, d = 0) => new THREE.IcosahedronGeometry(r, d), plane: (w, h) => new THREE.PlaneGeometry(w, h),
};
export function group(parent, p = [0, 0, 0]) { const g = new THREE.Group(); g.position.set(...p); if (parent) parent.add(g); return g }

// latar langit gradasi
export function skyTex(top, bottom) {
  const c = document.createElement('canvas'); c.width = 4; c.height = 256; const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, top); g.addColorStop(1, bottom); x.fillStyle = g; x.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function newScene(o = {}) {
  const sc = new THREE.Scene(); sc.background = o.sky ? skyTex(...o.sky) : new THREE.Color(o.bg || '#BFE6F7');
  if (o.fog) sc.fog = new THREE.Fog(...o.fog);
  const hemi = new THREE.HemisphereLight(o.hemiSky || '#FFFFFF', o.hemiGround || '#8BA06A', o.hemi ?? 1.15); sc.add(hemi);
  const sun = new THREE.DirectionalLight(o.sun || '#FFF1D6', o.sunI ?? 2.4); sun.position.set(...(o.sunPos || [10, 18, 8]));
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); const S = o.shadow || 14;
  Object.assign(sun.shadow.camera, { left: -S, right: S, top: S, bottom: -S, near: .5, far: 80 }); sun.shadow.bias = -.0005; sc.add(sun);
  sc.userData = { hemi, sun }; return sc;
}
export function camera(fov = 38) { return new THREE.PerspectiveCamera(fov, 1080 / 1920, .1, 400) }
// orbit kamera: sudut (deg), tinggi, jarak, target
export function orbit(cam, ang, h, dist, tgt = [0, 0, 0]) {
  const a = ang * Math.PI / 180; cam.position.set(tgt[0] + Math.sin(a) * dist, tgt[1] + h, tgt[2] + Math.cos(a) * dist); cam.lookAt(...tgt);
}

// ===== benda =====
export function island(parent, w = 14, d = 14, top = '#8BC34A', soil = '#8D6E4A') {
  const g = group(parent); g.add(mesh(G.box(w, .6, d), top, [0, -.3, 0])); g.add(mesh(G.box(w + .3, 1.6, d + .3), soil, [0, -1.4, 0])); return g;
}
export function tree(parent, p, s = 1, leaf = '#4E8F3A', kind = 'round') {
  const g = group(parent, p); g.scale.setScalar(s);
  g.add(mesh(G.cyl(.12, .18, 1, 6), '#7A4E2C', [0, .5, 0]));
  if (kind === 'palm') { for (let i = 0; i < 5; i++) { const l = mesh(G.box(1.3, .06, .35), leaf, [Math.cos(i * 1.26) * .6, 1.55, Math.sin(i * 1.26) * .6], { rot: [0, -i * 1.26, -.35] }); g.add(l) } g.children[0].scale.set(1, 1.6, 1); g.children[0].position.y = .8 }
  else if (kind === 'cone') g.add(mesh(G.cone(.7, 1.6, 7), leaf, [0, 1.6, 0]));
  else g.add(mesh(G.ico(.8, 0), leaf, [0, 1.45, 0]));
  return g;
}
export function cloud(parent, p, s = 1) {
  const g = group(parent, p); g.scale.setScalar(s);
  [[0, 0, 0, .9], [.8, -.1, .1, .65], [-.8, -.15, 0, .6], [.3, .35, -.1, .6]].forEach(([x, y, z, r]) => g.add(mesh(G.ico(r, 1), '#FFFFFF', [x, y, z], { cast: false })));
  return g;
}
export function coin(parent, p, s = 1) { const m = mesh(G.cyl(.22, .22, .06, 14), '#F5C542', p, { s, rot: [Math.PI / 2, 0, 0], mat: { metalness: .4, roughness: .4 } }); parent.add(m); return m }

// rumah sederhana berparameter
export function house(parent, p, o = {}) {
  const w = o.w || 2.4, d = o.d || 2.2, h = o.h || 1.7, st = o.stilts || 0;
  const g = group(parent, p); if (o.rot) g.rotation.y = o.rot;
  const parts = {};
  if (st) { parts.stilts = group(g); [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1], [0, 1]].forEach(([x, z]) => parts.stilts.add(mesh(G.box(.16, st, .16), o.wood || '#7A4E2C', [x * (w / 2 - .1), st / 2, z * (d / 2 - .1)])));
    parts.floor = mesh(G.box(w + .3, .14, d + .5), o.wood || '#9C6B3E', [0, st, .1]); g.add(parts.floor);
    parts.stair = group(g, [w / 2 - .45, 0, d / 2 + .25]); for (let i = 0; i < 5; i++) parts.stair.add(mesh(G.box(.5, .08, .26), '#8A5A33', [0, (i + .5) * st / 5, .7 - i * .17]));
  }
  parts.body = mesh(G.box(w, h, d), o.wall || '#FFF3D6', [0, st + h / 2 + .07, 0]); g.add(parts.body);
  const rh = o.roofH || 1.1;
  if (o.roof === 'flat') parts.roof = mesh(G.box(w + .3, .18, d + .3), o.roofC || '#C9472F', [0, st + h + .16, 0]);
  else { const geo = new THREE.CylinderGeometry(0, 1, 1, 4, 1); parts.roof = mesh(geo, o.roofC || '#C9472F', [0, st + h + rh / 2 + .07, 0], { s: [(w + .6) * .72, rh, (d + .6) * .72], rot: [0, Math.PI / 4, 0] }) }
  g.add(parts.roof);
  g.add(mesh(G.box(.55, .95, .05), '#6B4226', [o.doorX ?? 0, st + .55, d / 2 + .01]));
  [-1, 1].forEach(sx => { if (Math.abs(sx * .75 - (o.doorX ?? 0)) > .5) g.add(mesh(G.box(.5, .45, .05), '#9ED8F5', [sx * .75, st + 1.05, d / 2 + .01])) });
  g.userData.parts = parts; return g;
}

// tokoh low-poly (chibi): pose(t, {walk, wave, talk, look})
export function person(parent, p, o = {}) {
  const g = group(parent, p); const s = o.s || 1; g.scale.setScalar(s);
  const legs = [-1, 1].map(i => { const L = group(g, [i * .14, .55, 0]); L.add(mesh(G.box(.17, .55, .2), o.pants || '#3B3B4F', [0, -.27, 0])); L.add(mesh(G.box(.2, .1, .3), '#2A2A2A', [0, -.55, .05])); return L });
  const body = mesh(G.cyl(.27, .33, .7, 8), o.body || '#2E7D5B', [0, .92, 0]); g.add(body);
  const arms = [-1, 1].map(i => { const A = group(g, [i * .38, 1.2, 0]); A.add(mesh(G.box(.14, .5, .16), o.body || '#2E7D5B', [0, -.22, 0])); A.add(mesh(G.sph(.09, 8, 6), o.skin || '#E9B98F', [0, -.5, 0])); return A });
  const head = group(g, [0, 1.62, 0]); head.add(mesh(G.ico(.36, 1), o.skin || '#E9B98F', [0, 0, 0]));
  [-1, 1].forEach(i => head.add(mesh(G.sph(.05, 8, 6), '#1E1E1E', [i * .13, .03, .32], { cast: false })));
  const mouth = mesh(G.box(.14, .03, .02), '#5A2A1A', [0, -.12, .33], { cast: false }); head.add(mouth);
  if (o.hair) { head.add(mesh(G.ico(.38, 1), o.hair, [0, .12, -.07], { s: [1.04, .72, 1.02] })); head.add(mesh(G.sph(.16, 8, 6), o.hair, [0, .2, -.34])) }
  if (o.hat === 'peci') head.add(mesh(G.cyl(.3, .32, .2, 12), '#1E1E1E', [0, .32, 0]));
  if (o.hat === 'cap') { head.add(mesh(G.sph(.37, 12, 8), o.hatC || '#D9772B', [0, .1, 0], { s: [1, .6, 1] })); head.add(mesh(G.box(.4, .04, .3), o.hatC || '#D9772B', [0, .12, .38])) }
  if (o.hat === 'bowler') { head.add(mesh(G.cyl(.25, .28, .28, 12), o.hatC || '#2B2B2B', [0, .42, 0])); head.add(mesh(G.cyl(.45, .45, .04, 14), o.hatC || '#2B2B2B', [0, .29, 0])) }
  if (o.glasses) [-1, 1].forEach(i => head.add(mesh(G.cyl(.08, .08, .02, 12), '#1E1E1E', [i * .13, .03, .35], { rot: [Math.PI / 2, 0, 0], cast: false })));
  if (o.mustache) head.add(mesh(G.box(.24, .05, .04), '#2A1A10', [0, -.06, .34], { cast: false }));
  if (o.tie) g.add(mesh(G.box(.08, .35, .03), o.tie, [0, 1.05, .3], { cast: false }));
  const hand = group(arms[1], [0, -.55, 0]);
  if (o.prop === 'suitcase') { hand.add(mesh(G.box(.55, .4, .16), '#7A3B1E', [0, -.2, 0])); hand.add(mesh(G.box(.2, .06, .05), '#F5C542', [0, .02, 0])) }
  if (o.prop === 'clipboard') { hand.add(mesh(G.box(.32, .42, .03), '#C9A36B', [0, -.1, .1], { rot: [-.6, 0, 0] })); hand.add(mesh(G.box(.26, .3, .01), '#FFFFFF', [0, -.08, .12], { rot: [-.6, 0, 0] })) }
  if (o.prop === 'umbrella') { hand.add(mesh(G.cyl(.02, .02, 1.3, 6), '#333', [0, .6, 0])); hand.add(mesh(G.cone(.8, .35, 8), o.umbC || '#E5484D', [0, 1.3, 0], { recv: false })) }
  if (o.prop === 'mic') { hand.add(mesh(G.cyl(.04, .03, .3, 6), '#222', [0, .05, .08])); hand.add(mesh(G.sph(.07, 8, 6), '#555', [0, .22, .08])) }
  const st = { legs, arms, head, mouth, body };
  g.pose = (t, q = {}) => {
    const w = q.walk || 0, ph = t * 8;
    legs.forEach((L, i) => L.rotation.x = Math.sin(ph + i * Math.PI) * .55 * w);
    arms[0].rotation.x = Math.sin(ph + Math.PI) * .5 * w; arms[0].rotation.z = -.08;
    arms[1].rotation.x = q.hold ? -.35 : Math.sin(ph) * .5 * w; arms[1].rotation.z = .08;
    if (q.wave) { arms[0].rotation.z = -2.4 - Math.sin(t * 10) * .35; arms[0].rotation.x = 0 }
    if (q.point) { arms[0].rotation.x = -1.4; arms[0].rotation.z = -.2 }
    if (q.cheer) { arms.forEach((A, i) => { A.rotation.z = (i ? 1 : -1) * (2.5 + Math.sin(t * 12) * .2); A.rotation.x = 0 }) }
    body.position.y = .92 + Math.abs(Math.sin(ph)) * .05 * w + (q.bounce ? Math.abs(Math.sin(t * 6)) * .08 : 0);
    head.position.y = body.position.y + .7; head.rotation.y = q.look || 0; head.rotation.x = q.nod ? Math.sin(t * 7) * .15 : 0;
    head.rotation.z = q.shake ? Math.sin(t * 9) * .15 : 0;
    mouth.scale.y = q.talk ? 1 + 3 * Math.abs(Math.sin(t * 13)) : 1;
  };
  g.pose(0); g.userData.st = st; return g;
}

// partikel hujan (instanced)
export function rain(parent, n = 300, area = 12, h = 10, color = '#9CC9E8') {
  const geo = G.box(.03, .5, .03), m = new THREE.InstancedMesh(geo, mat(color, { transparent: true, opacity: .7 }), n); m.castShadow = false;
  const seeds = Array.from({ length: n }, (_, i) => [((i * 97) % 1000) / 1000 - .5, ((i * 61) % 1000) / 1000 - .5, ((i * 37) % 1000) / 1000]);
  const o = new THREE.Object3D(); parent.add(m);
  m.tick = t => { seeds.forEach(([x, z, k], i) => { o.position.set(x * area, h - ((t * 1.4 + k) % 1) * h, z * area); o.rotation.z = .15; o.updateMatrix(); m.setMatrixAt(i, o.matrix) }); m.instanceMatrix.needsUpdate = true };
  m.tick(0); return m;
}

// ===== bola bumi =====
let WORLD = null;
export async function loadWorld(url) { if (!WORLD) WORLD = await (await fetch(url)).json(); return WORLD }
export function countryAt(lat, lon) {
  const r = Math.min(WORLD.h - 1, Math.max(0, Math.floor(90 - lat))), c = ((Math.floor(lon + 180) % 360) + 360) % 360;
  const rl = WORLD.rows[r]; let x = 0; for (let i = 0; i < rl.length; i += 2) { x += rl[i + 1]; if (c < x) return rl[i] } return 0;
}
export const countryIdx = name => WORLD.names.indexOf(name);
export function ll2v(lat, lon, r) { const a = lat * Math.PI / 180, b = lon * Math.PI / 180; return new THREE.Vector3(Math.cos(a) * Math.sin(b) * r, Math.sin(a) * r, Math.cos(a) * Math.cos(b) * r) }
export function globe(parent, r = 5, o = {}) {
  const geo = new THREE.IcosahedronGeometry(r, 36).toNonIndexed(); const pos = geo.attributes.position, n = pos.count;
  const col = new Float32Array(n * 3), C = new THREE.Color(), v = new THREE.Vector3();
  const hl = new Set((o.highlight || []).map(countryIdx));
  for (let i = 0; i < n; i += 3) {
    v.set(0, 0, 0); for (let k = 0; k < 3; k++) v.add(new THREE.Vector3(pos.getX(i + k), pos.getY(i + k), pos.getZ(i + k))); v.divideScalar(3).normalize();
    const lat = Math.asin(v.y) * 180 / Math.PI, lon = Math.atan2(v.x, v.z) * 180 / Math.PI; const ci = countryAt(lat, lon);
    const j = ((i * 7919) % 100) / 100;
    if (Math.abs(lat) > 72) C.set(ci ? '#F4F7FA' : '#DCEBF5');
    else if (ci) C.set(hl.has(ci) ? (o.hlColor || '#F5C542') : (Math.abs(lat) < 23 ? (j < .5 ? '#6FB04A' : '#78B852') : (Math.abs(lat) < 35 ? (j < .5 ? '#C9B26B' : '#BFA862') : (j < .5 ? '#7FAF52' : '#88B85A'))));
    else C.set(j < .5 ? '#3E8FC4' : '#4596CB');
    for (let k = 0; k < 3; k++) { col[(i + k) * 3] = C.r; col[(i + k) * 3 + 1] = C.g; col[(i + k) * 3 + 2] = C.b }
    if (ci) for (let k = 0; k < 3; k++) { v.set(pos.getX(i + k), pos.getY(i + k), pos.getZ(i + k)).multiplyScalar(1.006); pos.setXYZ(i + k, v.x, v.y, v.z) }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.computeVertexNormals();
  const g = group(parent); const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: .9 })); m.castShadow = true; m.receiveShadow = true; g.add(m);
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r * 1.035, 48, 32), new THREE.MeshBasicMaterial({ color: '#BFE6FF', transparent: true, opacity: .16, side: THREE.BackSide })));
  g.rotation.order = 'XYZ';
  g.face = (lat, lon) => { g.rotation.y = -lon * Math.PI / 180; g.rotation.x = lat * Math.PI / 180 };   // titik lat/lon menghadap +Z
  g.pin = (lat, lon, color = '#E5484D') => { const P = group(g); const v = ll2v(lat, lon, r); P.position.copy(v); P.lookAt(v.clone().multiplyScalar(2)); P.add(mesh(G.cone(.12, .5, 10), color, [0, 0, .25], { rot: [-Math.PI / 2, 0, 0] })); P.add(mesh(G.sph(.17, 12, 10), color, [0, 0, .55])); return P };
  return g;
}

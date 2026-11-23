"""Efek suara prosedural (tanpa file luar, tanpa musik). Dipakai build.py lewat daftar SFX di episode.py:
SFX = [("s1", 0.0, "air"), ("s3", 1.2, "gedebuk", 0.8), ...]  -> (id adegan, detik sesudah adegan mulai, jenis, [gain]).
Jenis: air (semburan air), cipratan, kentongan, ding, pop, gedebuk, sorak (riuh orang), whoosh."""
import math, random, re

KINDS = ("air", "cipratan", "kentongan", "ding", "pop", "gedebuk", "sorak", "whoosh")


def _lp(x, a):   # low-pass satu kutub
    y, out = 0.0, []
    for v in x: y += a * (v - y); out.append(y)
    return out


def _bp(x, lo, hi):   # band-pass kasar = lp(hi) - lp(lo)
    return [a - b for a, b in zip(_lp(x, hi), _lp(x, lo))]


def gen(kind, sr=24000, seed=1):
    R = random.Random(seed); n = lambda s: int(s * sr)
    if kind == "air":   # semburan air: noise menyala cepat, desis panjang, sedikit gemericik
        N = n(1.6); x = [R.uniform(-1, 1) for _ in range(N)]; x = _bp(x, .02, .35)
        out = [v * min(1, i / n(.05)) * math.exp(-i / n(1.0)) * (1 + .35 * math.sin(i / sr * 2 * math.pi * 9 + R.random() * .2)) for i, v in enumerate(x)]
        return _norm(out, .55)
    if kind == "cipratan":   # cipratan pendek
        N = n(.5); x = _bp([R.uniform(-1, 1) for _ in range(N)], .05, .6)
        return _norm([v * math.exp(-i / n(.12)) for i, v in enumerate(x)], .6)
    if kind == "kentongan":   # kayu dipukul 3x: dua sinus cepat redup + klik
        N = n(1.3); out = [0.0] * N
        for k, t0 in enumerate((0, .28, .56)):
            s = n(t0)
            for i in range(n(.3)):
                if s + i >= N: break
                t = i / sr; e = math.exp(-t * 22)
                out[s + i] += e * (math.sin(2 * math.pi * 520 * t) + .5 * math.sin(2 * math.pi * 1240 * t)) + (R.uniform(-1, 1) * math.exp(-t * 400))
        return _norm(out, .6)
    if kind == "ding":   # notif: dua nada lonceng
        N = n(1.0); out = []
        for i in range(N):
            t = i / sr; f = 1318 if t < .12 else 1760; t2 = t if t < .12 else t - .12
            out.append(math.exp(-t2 * 5) * (math.sin(2 * math.pi * f * t) + .3 * math.sin(2 * math.pi * f * 2.01 * t)))
        return _norm(out, .45)
    if kind == "pop":
        N = n(.15); return _norm([math.exp(-i / n(.03)) * math.sin(2 * math.pi * (900 - 5000 * i / sr) * i / sr) for i in range(N)], .5)
    if kind == "gedebuk":   # jatuh/tabrak: nada rendah turun + noise
        N = n(.5); out = []
        for i in range(N):
            t = i / sr; out.append(math.exp(-t * 9) * math.sin(2 * math.pi * (110 - 60 * t) * t) + .25 * R.uniform(-1, 1) * math.exp(-t * 60))
        return _norm(out, .8)
    if kind == "sorak":   # riuh orang: banyak "suara" berformant pendek acak + noise lembut
        N = n(1.8); out = [0.0] * N
        for _ in range(70):
            s = R.randrange(0, n(1.2)); L = R.randrange(n(.15), n(.5)); f0 = R.uniform(160, 330); f1 = R.uniform(600, 1100)
            for i in range(L):
                if s + i >= N: break
                t = i / sr; e = math.sin(math.pi * i / L)
                out[s + i] += e * (math.sin(2 * math.pi * f0 * t) * .5 + math.sin(2 * math.pi * f1 * t + 2 * math.sin(2 * math.pi * f0 * t)) * .3)
        nz = _bp([R.uniform(-1, 1) for _ in range(N)], .03, .25)
        out = [(v + .6 * z) * min(1, i / n(.1)) * min(1, (N - i) / n(.5)) for i, (v, z) in enumerate(zip(out, nz))]
        return _norm(out, .4)
    if kind == "whoosh":
        N = n(.7); x = _bp([R.uniform(-1, 1) for _ in range(N)], .01, .15)
        return _norm([v * math.sin(math.pi * i / N) ** 2 for i, v in enumerate(x)], .5)
    raise ValueError(f"SFX tidak dikenal: {kind} (pilih {KINDS})")


def _norm(x, peak):
    m = max(1e-9, max(abs(v) for v in x)); return [v / m * peak for v in x]


def mix(buf, scenes, sfx, sr=24000, caps=()):
    """Campur SFX ke buf (int16 list) di tempat. scenes = adegan timeline (id, start, dur).
    Posisi: angka = detik sesudah adegan mulai; teks = regex kata di narasi adegan itu (bunyi tepat saat kata diucapkan)."""
    sc = {s["id"]: s for s in scenes}
    for k, item in enumerate(sfx):
        sid, off, kind = item[:3]; g = item[3] if len(item) > 3 else 1.0; s0 = sc[sid]["start"]
        if isinstance(off, str):
            ws = [tw for c in caps if s0 - .01 <= c["t0"] < s0 + sc[sid]["dur"] for w, _, tw in c["words"] if re.search(off, w, re.I)]
            if not ws: raise ValueError(f"SFX {kind}: kata '{off}' tidak ada di adegan {sid}")
            at = ws[0]
        else: at = s0 + off
        i0 = int(at * sr)
        for j, v in enumerate(gen(kind, sr, seed=k + 1)):
            if 0 <= i0 + j < len(buf): buf[i0 + j] = max(-32768, min(32767, int(buf[i0 + j] + v * g * 32767 * .5)))

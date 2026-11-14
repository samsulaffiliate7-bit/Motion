#!/usr/bin/env python3
"""Pilih jam tayang (UJI JAM TAYANG, keputusan pemilik 9 Nov 2026) dari docs/JAM-TAYANG-<pasangan>.md (BH/KD/DM).

Pakai: python3 motion/engine/jam_tayang.py <akun> <YYYY-MM-DD> <ep1> <ep2> <ep3>
Cetak 9 slot (3 video x TikTok/IG/YouTube): blok yang paling jarang dipakai platform itu (akun ini) 14 hari terakhir,
menit acak tidak bulat, satu video beda blok di tiap platform (jarak >= 40 menit). Kalau tiap blok platform itu sudah
>= 6 posting dan kolom view48 terisi: 70% ke 2 blok terbaik (view48 / median akun), 30% eksplorasi.
Keluaran: baris siap tempel ke JAM-TAYANG-<pasangan>.md (ID jadwal diisi setelah create_schedule) + waktu UTC untuk Repliz.
"""
import datetime as dt, random, re, statistics, sys
BL = {"A": (420, 539), "B": (540, 719), "C": (720, 839), "D": (840, 1019), "E": (1020, 1199), "F": (1200, 1335)}
PL = ["TikTok", "IG", "YouTube"]
acc, tgl, eps = sys.argv[1], sys.argv[2], sys.argv[3:6]
d0 = dt.date.fromisoformat(tgl); rnd = random.Random(f"{acc}{tgl}")
PAIR = {"balai": "BH", "hewan": "BH", "kades": "KD", "denah": "KD", "dompet": "DM", "meja": "DM"}[acc]
JT = f"docs/JAM-TAYANG-{PAIR}.md"   # satu file per pasangan supaya sesi lain tidak bentrok
rows = [l.split("|")[1:-1] for l in open(JT) if re.match(r"\| 20\d\d-", l)]
rows = [[c.strip() for c in r] for r in rows]
use = {p: {b: 0 for b in BL} for p in PL}; v48 = {p: {b: [] for b in BL} for p in PL}; allv = []
for d, a, e, p, j, b, i, v in rows:
    if a != acc or b not in BL: continue
    if (d0 - dt.date.fromisoformat(d)).days <= 14: use[p][b] += 1
    if v: v48[p][b].append(float(v)); allv.append(float(v))
med = statistics.median(allv) if allv else None
def pick(p, taken):
    cand = [b for b in BL if b not in taken]
    full = all(sum(1 for r in rows if r[1] == acc and r[3] == p and r[5] == b) >= 6 for b in BL) and med
    if full and rnd.random() < .7:
        score = {b: statistics.median(v48[p][b]) / med for b in cand if v48[p][b]}
        best = sorted(score, key=score.get, reverse=True)[:2]
        if best: return rnd.choice(best)
    m = min(use[p][b] for b in cand); return rnd.choice([b for b in cand if use[p][b] == m])
out = []; semua = []
for ep in eps:
    taken, times = set(), []
    for p in rnd.sample(PL, 3):
        for _ in range(50):
            b = pick(p, taken); a, z = BL[b]; t = rnd.randint(a, z)
            if t % 15 and all(abs(t - x) >= 40 for x in times) and all(abs(t - x) >= 10 for x in semua): break
        taken.add(b); times.append(t); semua.append(t); use[p][b] += 1
        wib = dt.datetime.combine(d0, dt.time(t // 60, t % 60)); utc = wib - dt.timedelta(hours=7)
        out.append((wib, ep, p, b, utc))
for wib, ep, p, b, utc in sorted(out):
    print(f"| {tgl} | {acc} | {ep} | {p} | {wib:%H:%M} | {b} | <id> | |   UTC {utc:%Y-%m-%dT%H:%M}:00.000Z")

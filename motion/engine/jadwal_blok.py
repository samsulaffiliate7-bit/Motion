#!/usr/bin/env python3
"""UJI JAM TAYANG: rencanakan jam posting per blok untuk satu akun di satu tanggal.
Pakai: python3 motion/engine/jadwal_blok.py <akun> <YYYY-MM-DD> <ep_pagi> <ep_siang> <ep_malam>
Membaca docs/JAM-TAYANG-KD.md (14 hari terakhir), memilih per platform 3 blok yang paling jarang dipakai akun itu,
urutan blok naik dipasang ke ep_pagi < ep_siang < ep_malam (Hari N tetap sebelum Hari N+1), menit acak tidak bulat,
satu video tidak tayang di dua platform dalam selisih < 20 menit. Cetak JSON: [{ep, platform, jam, blok, utc}]."""
import sys, re, json, random, datetime as dt
BLOK = {'A': (7*60, 8*60+59), 'B': (9*60, 11*60+59), 'C': (12*60, 13*60+59), 'D': (14*60, 16*60+59), 'E': (17*60, 19*60+59), 'F': (20*60, 22*60+15)}
PF = ['TikTok', 'IG', 'YouTube']
akun, tgl, eps = sys.argv[1], sys.argv[2], sys.argv[3:6]
d0 = dt.date.fromisoformat(tgl); cnt = {p: {b: 0 for b in BLOK} for p in PF}
for ln in open('docs/JAM-TAYANG-KD.md'):
    m = re.match(r'\| (\d{4}-\d\d-\d\d) \| (\w+) \| (\w+) \| (\w+) \| (\d\d:\d\d) \| ([A-F]) \|', ln)
    if m and m[2] == akun and m[4] in cnt and 0 <= (d0 - dt.date.fromisoformat(m[1])).days <= 14: cnt[m[4]][m[6]] += 1
rnd = random.Random(sum(map(ord, akun + tgl)))
for _ in range(200):
    plan, ok = [], True
    for p in PF:
        bl = sorted(BLOK, key=lambda b: (cnt[p][b], rnd.random()))[:3]; bl.sort()
        for ep, b in zip(eps, bl):
            a, z = BLOK[b]; m = rnd.randint(a, z)
            while m % 5 == 0 or m % 60 in (0, 30): m = rnd.randint(a, z)
            plan.append(dict(ep=ep, platform=p, menit=m, blok=b))
    for ep in eps:
        ms = sorted(x['menit'] for x in plan if x['ep'] == ep)
        if any(b - a < 20 for a, b in zip(ms, ms[1:])): ok = False
    if ok: break
out = []
for x in sorted(plan, key=lambda x: x['menit']):
    h, mi = divmod(x['menit'], 60); wib = dt.datetime(d0.year, d0.month, d0.day, h, mi); utc = wib - dt.timedelta(hours=7)
    out.append(dict(ep=x['ep'], platform=x['platform'], jam=f"{h:02d}:{mi:02d}", blok=x['blok'], utc=utc.strftime('%Y-%m-%dT%H:%M:00.000Z')))
print(json.dumps(out, ensure_ascii=False, indent=0))

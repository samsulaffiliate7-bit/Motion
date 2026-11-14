#!/usr/bin/env python3
"""Bangun timeline + audio narasi untuk satu episode.

Pakai:  GOOGLE_API_KEY=dummy python3 engine/build.py <akun> <ep>   (proxy sesi menyisipkan kunci asli)
Draf tanpa TTS (cek visual dulu): python3 engine/build.py <akun> <ep> --draft
Output: out/<akun>-<ep>/timeline.json + narration.wav; audio TTS di-cache di episodes/<akun>/<ep>/audio_<akun>/full.wav
Kunci API hanya dibaca dari environment, tidak pernah ditulis ke file.
"""
import base64, importlib.util, json, os, re, struct, sys, time, urllib.request, urllib.error, wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 24000
LEAD, TAIL, GAP = 0.22, 0.28, 0.10  # detik: jeda sebelum narasi, setelah narasi, antar adegan (~0,7 dtk antar suara; disetujui pemilik)


def terbilang(n):
    s = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"]
    if n < 12: return s[n]
    if n < 20: return terbilang(n - 10) + " belas"
    if n < 100: return terbilang(n // 10) + " puluh" + (" " + terbilang(n % 10) if n % 10 else "")
    if n < 200: return "seratus" + (" " + terbilang(n - 100) if n > 100 else "")
    if n < 1000: return terbilang(n // 100) + " ratus" + (" " + terbilang(n % 100) if n % 100 else "")
    if n < 2000: return "seribu" + (" " + terbilang(n - 1000) if n > 1000 else "")
    if n < 10**6: return terbilang(n // 1000) + " ribu" + (" " + terbilang(n % 1000) if n % 1000 else "")
    if n < 10**9: return terbilang(n // 10**6) + " juta" + (" " + terbilang(n % 10**6) if n % 10**6 else "")
    raise ValueError(n)


def fill(text, v):
    return re.sub(r"\{(\w+)\|w\}", lambda m: terbilang(v[m.group(1)]), text)


def tts(text, cfg, key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{cfg['model']}:generateContent"
    body = json.dumps({
        "contents": [{"parts": [{"text": text}]}],
        "generationConfig": {"responseModalities": ["AUDIO"],
                             "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": cfg["voice"]}}}},
    }).encode()
    for attempt in range(5):
        req = urllib.request.Request(url, body, {"Content-Type": "application/json", "x-goog-api-key": key})
        try:
            d = json.load(urllib.request.urlopen(req, timeout=120))
            raw = base64.b64decode(d["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
            return raw
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code in (429, 500, 503) and attempt < 4:
                time.sleep(5 * (attempt + 1)); continue
            sys.exit(f"TTS gagal {e.code}: {msg}")
    sys.exit("TTS gagal")


def pcm_of(wav_bytes):
    import io
    if not wav_bytes.startswith(b"RIFF"):   # beberapa model mengirim PCM 16-bit 24 kHz mentah
        n = len(wav_bytes) // 2
        return struct.unpack("<%dh" % n, wav_bytes[:n * 2])
    w = wave.open(io.BytesIO(wav_bytes))
    assert w.getframerate() == SR and w.getnchannels() == 1 and w.getsampwidth() == 2
    return struct.unpack("<%dh" % w.getnframes(), w.readframes(w.getnframes()))


def trim(samples, thr=350, pad=0.06):
    a = 0
    while a < len(samples) and abs(samples[a]) < thr: a += 1
    b = len(samples) - 1
    while b > a and abs(samples[b]) < thr: b -= 1
    p = int(pad * SR)
    return samples[max(0, a - p): min(len(samples), b + p)]


def split_full(pcm, texts, shift=None):
    """Potong audio satu panggilan jadi per adegan.
    Semua batas kalimat diperkirakan dari posisi huruf lalu dicocokkan berurutan ke jeda (diam) di audio."""
    win = int(.02 * SR)
    env = [max(abs(x) for x in pcm[i:i + win]) for i in range(0, len(pcm) - win, win)]
    srt = sorted(env); thr = max(300, srt[int(len(srt) * .95)] * .06)
    sil = [e < thr for e in env]
    runs, i = [], 0
    while i < len(sil):
        if sil[i]:
            j = i
            while j < len(sil) and sil[j]: j += 1
            if j - i >= 6: runs.append((i, j))
            i = j
        else: i += 1
    first = next(k for k, x in enumerate(sil) if not x)
    last = len(sil) - 1 - next(k for k, x in enumerate(reversed(sil)) if not x)
    # semua batas kalimat dicocokkan berurutan ke jeda (DP), batas adegan = batas kalimat terakhir tiap adegan
    sents, scene_end = [], []
    for t in texts:
        ss = [x for x in re.split(r"(?<=[.?!])\s+", t.strip()) if x]
        sents += ss; scene_end.append(len(sents) - 1)
    lens = [len(x) + 6 for x in sents]; tot = sum(lens)
    R = [r for r in runs if r[0] > first and r[1] < last]
    nb, nr = len(sents) - 1, len(R)
    if nr < nb: sys.exit("gagal memotong audio per adegan (jeda terlalu sedikit)")
    mid = [(r[0] + r[1]) / 2 for r in R]; rl = [r[1] - r[0] for r in R]
    k = (last - first) / tot   # frame per huruf
    # DP: panjang tiap kalimat (dari jumlah huruf) dicocokkan dengan jarak antar jeda yang dipilih
    INF = float("inf"); dp = [[INF] * nr for _ in range(nb)]; bk = [[-1] * nr for _ in range(nb)]
    for j in range(nr): dp[0][j] = abs(mid[j] - first - k * lens[0]) - .5 * rl[j]
    for bi in range(1, nb):
        for j in range(bi, nr):
            for jp in range(bi - 1, j):
                c = dp[bi - 1][jp] + abs(mid[j] - mid[jp] - k * lens[bi]) - .5 * rl[j]
                if c < dp[bi][j]: dp[bi][j] = c; bk[bi][j] = jp
    j = min(range(nr), key=lambda x: dp[nb - 1][x] + abs(last - mid[x] - k * lens[-1])); pick = [0] * nb
    for bi in range(nb - 1, -1, -1): pick[bi] = j; j = bk[bi][j]
    # koreksi manual: shift {indeks_batas: geser_jeda}, mis. {1: -1} = batas adegan 2->3 digeser ke jeda sebelumnya
    idx = [pick[e] for e in scene_end[:-1]]
    for k, d in (shift or {}).items():
        idx[int(k)] = max(0, min(nr - 1, idx[int(k)] + d))
    cuts = [int(mid[j]) for j in idx]
    bounds = [0] + [c * win for c in cuts] + [len(pcm)]
    segs = [pcm[bounds[i]:bounds[i + 1]] for i in range(len(texts))]
    rate = (len(pcm) / SR) / sum(len(t) for t in texts)
    for i, (sg, t) in enumerate(zip(segs, texts)):
        ratio = (len(sg) / SR) / (rate * len(t))
        if not .65 < ratio < 1.5:
            print(f"PERINGATAN: adegan ke-{i + 1} durasinya {ratio:.2f}x dari perkiraan, cek potongan suaranya")
    return segs


def tokens(marked):
    """'a *b c* d' -> [(a,False),(b,True),(c,True),(d,False)]; tanda baca yang menempel ikut kata di depannya"""
    out, hl, space = [], False, True
    for part in re.split(r"(\*)", marked):
        if part == "*": hl = not hl; continue
        if not part: continue
        ws = part.split()
        if ws and out and not space and not part[0].isspace():
            out[-1] = (out[-1][0] + ws.pop(0), out[-1][1])
        out += [(w, hl) for w in ws]
        space = part[-1].isspace()
    return out


def chunks(sentence, size=4):
    out, i = [], 0
    while i < len(sentence):
        n = size if len(sentence) - i > size + 1 else len(sentence) - i  # hindari sisa 1 kata
        out.append(sentence[i:i + n]); i += n
    return out


def main():
    acc, ep = sys.argv[1], sys.argv[2]
    key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
    cfg = json.load(open(f"{ROOT}/accounts/{acc}/config.json"))
    epdir = f"{ROOT}/episodes/{acc}/{ep}"
    spec = importlib.util.spec_from_file_location("episode", f"{epdir}/episode.py")
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for k, v in getattr(mod, "CONFIG_OVERRIDE", {}).items():   # mis. {"tts": {"voice": ...}} untuk tokoh dengan suara lain
        cfg[k] = {**cfg[k], **v} if isinstance(v, dict) and isinstance(cfg.get(k), dict) else v
    # rotasi suara (keputusan pemilik 9 Nov): META["suara"] memilih suara dari kolam config tts.pool; model tetap
    sv = getattr(mod, "META", {}).get("suara")
    if sv:
        pool = cfg["tts"].get("pool", [cfg["tts"]["voice"]])
        if sv not in pool: sys.exit(f"META suara {sv} tidak ada di kolam {pool} (accounts/{acc}/config.json)")
        cfg["tts"] = {**cfg["tts"], "voice": sv}
    v = mod.compute()
    cache = f"{epdir}/audio_{acc}"; os.makedirs(cache, exist_ok=True)
    outdir = f"{ROOT}/out/{acc}-{ep}"; os.makedirs(outdir, exist_ok=True)

    tcfg = cfg["tts"]
    items = []
    for sc in mod.SCENES:
        marked = fill(sc["say"], v)
        items.append((sc, marked, marked.replace("*", "")))

    draft = "--draft" in sys.argv   # tanpa TTS: durasi diperkirakan dari jumlah huruf, narasi diam (untuk cek visual/stills saja)
    if draft:
        rate = float(sys.argv[sys.argv.index("--rate") + 1]) if "--rate" in sys.argv else 0.068
        pcms = [[0] * int(len(say) * rate * SR) for _, _, say in items]
        print("MODE DRAF: tanpa TTS, durasi perkiraan, JANGAN dirender jadi video final")
    else:
        # default 1 panggilan TTS per video (opsi --calls 2 kalau potongan bermasalah), lalu dipotong per adegan
        n_calls = int(sys.argv[sys.argv.index("--calls") + 1]) if "--calls" in sys.argv else 1
        says = [say for _, _, say in items]
        tot = sum(len(x) for x in says); groups, cur, acc_len = [], [], 0
        for i, x in enumerate(says):
            cur.append(i); acc_len += len(x)
            if len(groups) < n_calls - 1 and acc_len >= tot * (len(groups) + 1) / n_calls and i < len(says) - 1:
                groups.append(cur); cur = []
        groups.append(cur)
        pcms = []
        for gi, g in enumerate(groups):
            full_text = "\n\n".join(says[i] for i in g)
            name = "full.wav" if len(groups) == 1 else f"full{gi + 1}of{len(groups)}.wav"
            f = f"{cache}/{name}"; m = f + ".txt"; mkey = full_text + "|" + tcfg["voice"] + "|" + tcfg["model"]
            if not (os.path.exists(f) and os.path.exists(m) and open(m).read() == mkey):
                if not key: sys.exit("GOOGLE_API_KEY belum ada di environment dan audio belum di-cache")
                print(f"TTS panggilan {gi + 1}/{len(groups)} ({tcfg['model']}, {tcfg['voice']}): {len(full_text)} huruf")
                open(f, "wb").write(tts(full_text, tcfg, key)); open(m, "w").write(mkey)
            seg = split_full(pcm_of(open(f, "rb").read()), [says[i] for i in g], getattr(mod, "SPLIT_SHIFT", None) if len(groups) == 1 else None) if len(g) > 1 else [pcm_of(open(f, "rb").read())]
            pcms += [trim(p) for p in seg]

    scenes, caps, t, clips = [], [], 0.0, []
    for (sc, marked, say), pcm in zip(items, pcms):
        dur_a = len(pcm) / SR
        dur = LEAD + dur_a + TAIL
        clips.append((t + LEAD, pcm))
        # caption: bagi per kalimat lalu per 3-4 kata, waktu sebanding jumlah huruf
        parts, cur_s = [], []
        for tok in tokens(marked):
            cur_s.append(tok)
            if re.search(r"[.?!]$", tok[0]): parts += chunks(cur_s); cur_s = []
        if cur_s: parts += chunks(cur_s)
        lens = [sum(len(w) + 1 for w, _ in p) + 3 for p in parts]
        total_len = sum(lens); cur = t + LEAD
        for p, ln in zip(parts, lens):
            d = dur_a * ln / total_len
            # waktu tiap kata di dalam potongan, sebanding panjang kata (untuk teks muncul mengikuti suara)
            wl = [len(w) + 1.5 for w, _ in p]; wsum = sum(wl); wt, acc_t = [], cur
            for x in wl: wt.append(round(acc_t, 3)); acc_t += d * x / wsum
            caps.append(dict(t0=round(cur, 3), t1=round(cur + d, 3), text=" ".join(w for w, _ in p),
                             words=[[w, h, tw] for (w, h), tw in zip(p, wt)])); cur += d
        scenes.append(dict(id=sc["id"], type=sc["type"], variant=sc.get("variant"), kicker=sc["kicker"], sub=sc["sub"],
                           start=round(t, 3), dur=round(dur, 3), data={k: v[k] for k in sc["data"]}, say=say))
        t += dur + GAP
    pad = getattr(mod, "END_PAD", 0)   # tahan adegan terakhir tanpa suara (untuk memenuhi durasi minimal)
    if pad:
        scenes[-1]["dur"] = round(scenes[-1]["dur"] + pad, 3); t += pad
    total = round(t + 0.5, 3)

    buf = [0] * int(total * SR)
    for at, pcm in clips:
        i = int(at * SR)
        for j, s in enumerate(pcm):
            buf[i + j] = max(-32768, min(32767, buf[i + j] + s))
    w = wave.open(f"{outdir}/narration.wav", "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(struct.pack("<%dh" % len(buf), *buf)); w.close()

    tl = dict(w=1080, h=1920, fps=30, duration=total, theme=cfg["theme"], style=cfg["style"], engine="3d",
              brand=dict(name=cfg["name"], handle=cfg["handle"], tagline=cfg["tagline"], disclaimer=cfg["disclaimer"], logo=cfg.get("logo")),
              scenes=scenes, caps=caps, vars=v, draft=draft)
    json.dump(tl, open(f"{outdir}/timeline.json", "w"), ensure_ascii=False, indent=1)
    print(f"timeline ok: {len(scenes)} adegan, {total}s -> {outdir}")
    if total < 60 or total > 120:
        print(f"PERINGATAN: durasi {total:.0f} detik di luar rentang 60-120 detik (tambah/kurangi adegan)")


if __name__ == "__main__":
    main()

"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 4 "Panah Peringatan" (tayang 25 Nov 2026, sesudah 12.00 WIB). Storyboard: STORYBOARD.md; konsep: docs/konsep/S1-EP4-BALAI.md.
Data Ep 3 (docs/data/2026-11-25-balai.md + tarik ulang Repliz 25 Nov ±09:20 WIB):
- TikTok Ep 3: 65 like, +12 follower. IG Ep 3 (Reels): 530 like; follower 3.992 -> 4.081 = +89. YouTube Ep 3 (jhSujyMrg8Y): 12 like; subscriber 43 -> 54 = +11.
- FOLLOW = 12 + 89 + 11 = 112 -> penyintas 861 + 112 = 973. LIKE = 65 + 530 + 12 = 607 -> 60 = 30 karung + 30 ikat (gudang 177 karung, 173 bambu).
- Pilihan Ep 3 (komentar dibaca langsung sesi kontrol, satu akun satu suara): B. tembak panah peringatan ±35 vs A. buka gerbang 1.
- Usul prosedur penonton IG dipakai (tanya luka, tiarap tangan di belakang, pemanah siaga, tim medis buka perban, lecet = karantina). Usul "anak PMR" dipakai.
- WARGA DARI KOMEN (segmen tetap baru): peran dari komentar, nama disamarkan (@ca*** army, @ii*** anak PMR, @yu*** pemanah).
Semua tokoh, tempat, angka = fiksi. Tanpa komentar pertama otomatis."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Bu Yati, anak PMR, Pak Kardi, pemanah, orang berperban, warga dari komen",
            lokasi="depan gerbang malam, atas menara gerbang, barak karantina, pagar utara + bukit, halaman balai",
            hook="KEBANYAKAN KALIAN PILIH B · 35 LAWAN 1", variasi="segmen tetap WARGA DARI KOMEN + hitung mundur", interaksi="A kirim pengintai ke utara / B tutup semua perkuat gerbang",
            sindiran="panah peringatan Pak Kardi nancap di sandal sendiri", suara="Charon", season=1, episode=4, babak=1, riset="vidIQ")
DATA = dict(like=dict(tt=65, ig=530, yt=12), follow=dict(tt=12, ig=4081 - 3992, yt=54 - 43), vote=dict(B=35, A=1))
STATE0 = dict(penyintas=861, beras=147, bambu=143)
WARGA = [("ARMY", "@ca***"), ("ANAK PMR", "@ii***"), ("PEMANAH", "@yu***")]


def compute():
    d, s = DATA, STATE0
    follow = sum(d["follow"].values()); like = sum(d["like"].values()); unit = like // 10; karung, ikat = unit - unit // 2, unit // 2
    assert follow == 112 and like == 607 and unit == 60 and (karung, ikat) == (30, 30) and d["vote"]["B"] > d["vote"]["A"]
    pen = s["penyintas"] + follow
    return dict(hud=dict(judul="DESA TERAKHIR", hari="HARI KE-4", items=[f"🧍 {pen} PENYINTAS", f"🌾 {s['beras'] + karung} KARUNG", f"🎋 {s['bambu'] + ikat} BAMBU"]),
                follow=follow, like=like, unit=unit, pen=pen, vB=d["vote"]["B"], vA=d["vote"]["A"], lk=d["like"], warga=WARGA)


SCENES = [
    dict(id="c1", type="B4_HOOK", kicker="", sub="", data=["hud", "vB", "vA"], sfx=[(0.0, "wus", 1), (0.42, "tancap", 1), (1.0, "kentongan", .6)],
         say="Tiga puluh lima lawan satu. Kalian pilih *tembak panah peringatan*. Panahnya nancap *sejengkal* dari kakinya."),
    dict(id="c2", type="B4_TIARAP", kicker="", sub="", data=["hud"],
         say="Kami pakai *usul warga di komen*: tanya lukanya, suruh *tiarap*, tangan di belakang. Pemanah siaga di menara."),
    dict(id="c3", type="B4_PERBAN", kicker="", sub="", data=["hud"],
         say="Bu Yati sama *anak PMR* buka perbannya. Bukan gigitan... cuma *cakaran*. Dia masuk karantina sampai pagi."),
    dict(id="c4", type="B4_KABAR", kicker="", sub="", data=["hud"], sfx=[("gerombolan", "kentongan", .5)],
         say="Tapi dia bawa kabar. *Gerombolan dari utara*. Ratusan. *Dua malam lagi*."),
    dict(id="c5", type="B4_LUCU", kicker="", sub="", data=["hud"], sfx=[("nancap", "wus", .9), ("sandalnya", "tancap", 1)],
         say="Pak Kardi nembak peringatan kedua. Panahnya nancap... *di sandalnya sendiri*."),
    dict(id="c6", type="B4_WARGA", kicker="", sub="", data=["hud", "warga", "follow", "like", "unit", "lk"],
         say="Warga dari komen hari ini: ada *army*, *anak PMR*, sama *pemanah*. Follow kalian nambah *{follow|w}* penyintas, like gabungan jadi *{unit|w}* karung dan ikat bambu."),
    dict(id="c7", type="B4_AJAK", kicker="", sub="", data=["hud"],
         say="Dua malam lagi mereka datang. A, *kirim pengintai ke utara*. B, *tutup semua, perkuat gerbang*. Kali ini... *berapa lawan berapa*?"),
]
END_PAD = 1.0
TEMPO = 1.05   # 57,4 -> ~55 dtk, tanpa TTS baru
SPLIT_SHIFT = {}
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}

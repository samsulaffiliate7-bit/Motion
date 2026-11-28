"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · Episode 6 "Ransel di Depan Gerbang" (tayang 28 Nov 2026, siang-sore). Storyboard: STORYBOARD.md.
Referensi naskah: rekap AI YouTube Studio dari pemilik (28 Nov): buka langsung konsekuensi pilihan (lampu mati), tanpa rekap panjang; durasi padat ~40 dtk;
pembawa obor = manusia, lempar ransel ke depan gerbang lalu kabur; dilema A ambil ransel / B panah api; kalimat akhir menggantung "sebelum..." nyambung ke detik 0 (loop).
Yang TIDAK dipakai dari referensi: musik latar (aturan pemilik: tanpa musik), komentar sematan otomatis (firstComment harus kosong; pemilik pasang sendiri).
Hook tetap ikut aturan 26 Nov: kata "zombie" + "Kalau lo..." di detik awal.
Data Ep 5 (tayang 26 Nov; Repliz 28 Nov ±09:30 WIB):
- TikTok 7712408035754249478: 437 view, 22 like, +7 follower, tonton habis 12,2% (Ep 4: 5,4%), tahan detik 3 = 57%.
- IG 18402625471206961: 5.554 view, 198 like; follower 4.132 -> 4.189 = +57.
- YouTube fjF0dJU3yqk: 3.451 view (Ep 4: 1.593), 53 like; subscriber 74 -> 100 = +26 (tembus 100).
- FOLLOW = 7 + 57 + 26 = 90 -> penyintas 1.044 + 90 = 1.134. LIKE = 22 + 198 + 53 = 273 -> 27 = 14 karung + 13 ikat (gudang 204 karung, 199 bambu).
- Voting (komentar dibaca langsung, satu akun satu suara): B. matiin semua lampu = IG 20 + TikTok 5 + YouTube 7 = 32; A. nyalain obor = IG 3 + TikTok 1 = 4.
- Usul penonton: siaga di atap/menara dengan panah, bambu runcing serangan balik, "Pak Kardi jadi umpan" (11 like), menara sniper, tentara/jenderal.
Semua tokoh, tempat, angka = fiksi. Tanpa komentar pertama otomatis."""

META = dict(format="serial Season 1", pilar="bertahan hidup", tokoh="Gilang, Pak Kardi, Bu Yati, pembawa obor misterius, ratusan zombie",
            lokasi="balik pagar gelap, menara gerbang, depan gerbang (ransel), posko gelap, atas menara (dilema)",
            hook="Semua lampu mati. Kalau lo bersuara sedikit aja, ratusan zombie denger", variasi="loop kalimat menggantung + hitung mundur",
            interaksi="A buka gerbang ambil ransel / B panah api bakar dari jauh", sindiran="Pak Kardi bersin pas semua nahan napas", suara="Charon", season=1, episode=6, babak=1,
            referensi="naskah AI YouTube Studio (pemilik 28 Nov)")
DATA = dict(like=dict(tt=22, ig=198, yt=53), follow=dict(tt=7, ig=4189 - 4132, yt=100 - 74), vote=dict(B=20 + 5 + 7, A=3 + 1), subs=100)
STATE0 = dict(penyintas=1044, beras=190, bambu=186)


def compute():
    d, s = DATA, STATE0
    follow = sum(d["follow"].values()); like = sum(d["like"].values()); unit = like // 10; karung, ikat = unit - unit // 2, unit // 2
    assert follow == 90 and like == 273 and unit == 27 and (karung, ikat) == (14, 13) and d["vote"]["B"] == 32 > d["vote"]["A"] == 4
    pen = s["penyintas"] + follow
    return dict(hud=dict(judul="DESA TERAKHIR", hari="HARI KE-6", items=[f"🧍 {pen} PENYINTAS", f"🌾 {s['beras'] + karung} KARUNG", f"🎋 {s['bambu'] + ikat} BAMBU"]),
                follow=follow, like=like, unit=unit, pen=pen, vB=d["vote"]["B"], vA=d["vote"]["A"], lk=d["like"], subs=d["subs"])


SCENES = [
    dict(id="c1", type="B6_HOOK", kicker="", sub="", data=["hud"], sfx=[(0.0, "detak", .9)],
         say="Malam ini semua lampu desa mati. Kalau lo bersuara sedikit aja... *ratusan zombie* di luar pagar bakal denger."),
    dict(id="c2", type="B6_OBOR", kicker="", sub="", data=["hud", "vB", "vA"],
         say="Tau nggak sih, yang jalan paling depan... *bawa obor*, pakai jaket. Dia *manusia*."),
    dict(id="c3", type="B6_RANSEL", kicker="", sub="", data=["hud"], sfx=[("ngelempar", "wus", .9), ("gerbang", "tancap", 1)],
         say="Tiba-tiba dia *ngelempar ransel* ke depan gerbang, terus *kabur* ke semak. Ratusan zombie langsung *noleh*."),
    dict(id="c4", type="B6_LUCU", kicker="", sub="", data=["hud"],
         say="Semua nahan napas. Pak Kardi nutup mulut... terus *bersin*."),
    dict(id="c5", type="B6_ANGKA", kicker="", sub="", data=["hud", "follow", "like", "unit", "lk", "pen", "subs"],
         say="Follow kalian nambah *{follow|w}* penyintas. YouTube kita tembus *seratus* subscriber!"),
    dict(id="c6", type="B6_DILEMA", kicker="", sub="", data=["hud"], sfx=[("meter", "tik", .7)],
         say="Ranselnya cuma lima langkah dari gerbang, zombie tinggal *dua puluh meter*. A, *buka gerbang, ambil ranselnya*. B, *panah api, bakar dari jauh*. Tulis pilihan lo di komen, sebelum..."),
]
END_PAD = 0.2
SPLIT_SHIFT = {}
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}

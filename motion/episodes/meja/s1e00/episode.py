"""Meja Seberang Bos · Season 1 "Dari Warung Lipat" · Episode 0 "Kemarin PHK, Hari Ini Bos" (konsep baru 19 Nov 2026).
Storyboard: STORYBOARD.md. Narator Bima (suara Puck, model flash).

Sumber angka (kisaran harga 2025-2026, tanpa merek):
- Mi instan 1 dus isi 40 bungkus di toko grosir: ±Rp110.000-120.000 (pantauan harga grosir daring & pasar 2025) -> Rp115.000.
- Harga eceran warung mi instan: ±Rp3.000-4.000 per bungkus -> Rp3.500.
- Laba kotor sedus jika habis = 40 x 3.500 - 115.000 = Rp25.000 (dihitung di compute()).
Uang Bima sebelum belanja Rp150.000 (fiksi). Interaksi (fiksi, rumus season): follow = +1 pelanggan tetap, like = +Rp5.000 modal, komen = keputusan.
"""

META = dict(format="serial Season 1", pilar="bangun usaha dari nol", tokoh="Bima, Mak Ijah, Bang Rudi, kucing", lokasi="teras kontrakan, kantor kaca, kampung kota dari udara, papan struktur, meja lipat, toko Rudi",
            hook="kemarin PHK, hari ini bos", variasi="episode 0", interaksi="komen: kopi sachet / telur / es batu", suara="Puck", season=1, episode=0, babak=1)
UANG0 = 150_000
DUS = dict(harga=115_000, isi=40, jual=3_500)
UTANG_IJAH = 2 * DUS["jual"]
KURS = dict(follow="1 pelanggan tetap", like=5_000)


def compute():
    omzet = DUS["isi"] * DUS["jual"]
    untung = omzet - DUS["harga"]
    kas = UANG0 - DUS["harga"]
    assert omzet == 140_000 and untung == 25_000 and kas == 35_000 and UTANG_IJAH == 7_000
    top = "EP 0 · HARI 1"
    return dict(hud=dict(top=top, pelanggan=0, kas=UANG0), hud6=dict(top=top, pelanggan=0, kas=kas),
                harga=DUS["harga"], isi=DUS["isi"], jual=DUS["jual"], omzet=omzet, untung=untung, utang=UTANG_IJAH, kurs_like=KURS["like"])


SCENES = [
    dict(id="s1", type="M0_HOOK", kicker="", sub="", data=["hud"],
         say="Kemarin gue *di-PHK*. Hari ini... gue jadi *bos*."),
    dict(id="s2", type="M0_PHK", kicker="", sub="", data=["hud"],
         say="Gue Bima, dua puluh tujuh. Lima tahun kerja kantoran, berakhir di *satu kardus*."),
    dict(id="s3", type="M0_GANG", kicker="", sub="", data=["hud"],
         say="Kantor baru gue: teras kontrakan, di gang yang *sempit banget*. Modalnya satu meja lipat, sama satu *kardus mi*."),
    dict(id="s4", type="M0_STRUKTUR", kicker="", sub="", data=["hud"],
         say="Tapi gue tetep profesional. Direktur: Bima. Kasir: Bima. Office boy... *Bima*."),
    dict(id="s5", type="M0_RAPAT", kicker="", sub="", data=["hud"],
         say="Rapat perdana dimulai. Pesertanya gue, sama *satu kucing*. Keputusan rapat: *setuju semua*."),
    dict(id="s6", type="M0_HITUNG", kicker="", sub="", data=["hud6", "harga", "isi", "jual", "omzet", "untung"],
         say="Satu kardus, *{isi|w}* bungkus. Kalau laku semua, untungnya... *{untung|w}*. Ratusan cabang masih *jauh*."),
    dict(id="s7", type="M0_IJAH", kicker="", sub="", data=["hud6", "utang"],
         say="Pembeli pertama: *Mak Ijah*. Ambil dua bungkus, terus bilang... *ngutang dulu ya*."),
    dict(id="s8", type="M0_RUDI", kicker="", sub="", data=["hud6"],
         say="Dan di ujung gang, ada toko yang jauh lebih gede. Pemiliknya, *Bang Rudi*, cuma *senyum*."),
    dict(id="s9", type="M0_AJAK", kicker="", sub="", data=["hud6", "kurs_like"],
         say="*Follow*, jadi pelanggan tetap. *Like*, modal nambah lima ribu. *Komen*: besok gue nambah jualan apa? *Kopi sachet*, *telur*, atau *es batu*?"),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}

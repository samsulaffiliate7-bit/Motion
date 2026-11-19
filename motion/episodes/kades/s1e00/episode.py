"""Kades Magang Juara · Season 1 · Episode 0 "Hari Nol" (konsep baru 19 Nov 2026: 30 hari masa percobaan).
Storyboard: STORYBOARD.md. Angka cerita fiksi (dana desa = like x Rp10.000)."""

META = dict(format="serial Season 1", pilar="bangun desa", tokoh="Juara, Mbah Darmo, Bu Wati, Bejo", lokasi="gapura berkarat, jalan desa, balai, bale, stasiun, papan pengumuman",
            hook="30 hari sebelum dipecat", variasi="episode 0", interaksi="komen: air / listrik / sinyal", suara="Achird", season=1, episode=0, babak=1)
STATE = dict(hari=0, target_hari=30, target_warga=100, pulang=0, dana=0)
KURS = dict(follow="1 perantau pulang", like=10_000)


def compute():
    s = STATE; assert s["pulang"] == 0 and s["target_warga"] == 100
    return dict(hud=dict(items=[f"HARI {s['hari']} / {s['target_hari']}", f"🚉 PULANG {s['pulang']}", f"💰 DANA Rp{s['dana']}"]),
                target=s["target_warga"], hari_total=s["target_hari"], kurs_like=KURS["like"])


SCENES = [
    dict(id="s1", type="K0_TIBA", kicker="", sub="", data=["hud"],
         say="Nama gue Juara. Dua puluh tiga tahun. Dan gue cuma punya *tiga puluh hari*, sebelum *dipecat*."),
    dict(id="s2", type="K0_SEPI", kicker="DESA HANTU", sub="hari nol", data=["hud"],
         say="Ini desa yang harus gue selamatin. Rumahnya banyak. Tapi pintunya *dipaku* semua. Warganya pada *merantau*."),
    dict(id="s3", type="K0_BALAI", kicker="", sub="", data=["hud"],
         say="Ini kantor gue. Hari pertama kerja, pintunya... *copot*."),
    dict(id="s4", type="K0_DARMO", kicker="", sub="", data=["hud"],
         say="Ternyata masih ada satu warga. *Mbah Darmo*. Gue tanya, kades yang lama ke mana? Jawabannya cuma satu kata. *Kabur*."),
    dict(id="s5", type="K0_WATI", kicker="", sub="", data=["hud", "target", "hari_total"],
         say="Terus datang *Bu Wati* dari kecamatan, bawa map merah. Isinya: *seratus warga*, dalam *tiga puluh hari*. Kalau gagal, gue *dipecat*."),
    dict(id="s6", type="K0_STASIUN", kicker="", sub="", data=["hud"],
         say="Harapan gue cuma stasiun ini. Tiap perantau yang pulang, turun di sini. Sekarang papannya masih *nol*."),
    dict(id="s7", type="K0_AJAK", kicker="", sub="", data=["hud", "kurs_like"],
         say="Kalian bisa bantu. *Follow*, satu perantau pulang. *Like*, dana desa nambah. *Komen*, apa yang gue beresin duluan. Besok hari pertama. *Air*, *listrik*, atau *sinyal*?"),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick"}}

"""Dompet Gue Nangis · Season 1 · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md. Narator Nana (Kore).
Rumus season (fiksi): follow = +Rp1.000, 10 like = +1 XP, komen = keputusan Nana."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Nana, Si Dompet, Bu Ratna", lokasi="udara Jakarta, atap gedung, trotoar, atap kos, perempatan, gang kos, peron KRL",
            hook="hidup gue kalian yang atur", variasi="pin", interaksi="follow/like/komen", suara="Kore", season=1, episode=-1)
KURS = dict(follow=1_000, like_per_xp=10)


def compute():
    assert KURS["follow"] == 1_000 and KURS["like_per_xp"] == 10
    return dict(hud=dict(top="ATURAN MAIN", saldo=100_000), hud3=dict(top="ATURAN MAIN", saldo=101_000), follow=KURS["follow"])


SCENES = [
    dict(id="r1", type="DA_HOOK", kicker="", sub="", data=["hud"], say="Gue Nana. Gue ke Jakarta cuma bawa *seratus ribu*. Dan hidup gue di sini... *kalian* yang atur."),
    dict(id="r2", type="DA_PREMIS", kicker="", sub="", data=["hud"], say="Tiga puluh episode, satu bulan. Targetnya: bertahan, dapet kerja, sampai *gajian pertama*."),
    dict(id="r3", type="DA_FOLLOW", kicker="", sub="", data=["hud3", "follow"], say="Tiap kalian *follow*, HP gue bunyi: *seribu rupiah* masuk. Rezeki tambahan."),
    dict(id="r4", type="DA_LIKE", kicker="", sub="", data=["hud3"], say="Tiap *sepuluh like*, satu *XP*. Skill gue naik level, kerjaan yang kebuka makin *bagus*."),
    dict(id="r5", type="DA_KOMEN", kicker="", sub="", data=["hud3"], say="Tiap *komen*, kalian yang mutusin langkah gue. Pilihan paling *rame*, gue jalanin."),
    dict(id="r6", type="DA_SABTU", kicker="", sub="", data=["hud3"], say="Tiap akhir pekan ada *ujian besar*. Yang pertama: Bu Ratna nagih kos hari *Sabtu*. Telat sehari... *tidur di luar*."),
    dict(id="r7", type="DA_MULAI", kicker="", sub="", data=["hud3"], say="Mulai dari *Episode Nol*. Tonton berurutan, dan *jangan lompat*."),
]
END_PAD = 2.0
CONFIG_OVERRIDE = {"theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}

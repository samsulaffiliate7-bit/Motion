"""Denah Rumah Dunia · Season 1 "Bumi Dimulai dari Jawa" · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Dena, Pak Mandor", lokasi="bola Bumi, lahan Jawa, jalan tanah, palet bata, meja maket, badai, patok",
            hook="Bumi di-reset, yang ngisi kalian", variasi="pin", interaksi="follow/like/komen", suara="Sulafat", season=1, episode=-1)


def compute():
    return dict(hud=dict(items=["ATURAN MAIN", "SEASON 1"]), kurs_bata=10)


SCENES = [
    dict(id="r1", type="DA_BUMI", kicker="", sub="", data=["hud"], say="Bumi ini di-*reset*. Rumahnya *nol*. Dan yang ngisi Bumi lagi... *kalian*."),
    dict(id="r2", type="DA_PREMIS", kicker="", sub="", data=["hud"], say="Gue Dena, arsitek, sama Pak Mandor. Kita mulai dari *Pulau Jawa*. Tiap episode, kita bangun *satu rumah asli*, terus pelan-pelan ke seluruh dunia."),
    dict(id="r3", type="DA_FOLLOW", kicker="", sub="", data=["hud"], say="Tiap kalian *follow*, satu *penduduk baru* datang. Papan penduduk nambah."),
    dict(id="r4", type="DA_LIKE", kicker="", sub="", data=["hud", "kurs_bata"], say="Tiap *like*, kita dapat *sepuluh bata*. Bata kurang, rumahnya nggak jadi."),
    dict(id="r5", type="DA_KOMEN", kicker="", sub="", data=["hud"], say="Tiap *komen*, kalian milih rumah atau *negara* berikutnya. Yang paling rame, kita bangun."),
    dict(id="r6", type="DA_UJIAN", kicker="", sub="", data=["hud"], say="Tiap akhir pekan ada *ujian*. Hujan badai, gempa, angin topan. Rumahnya harus *kuat*."),
    dict(id="r7", type="DA_MULAI", kicker="", sub="", data=["hud"], say="Mulai dari *Episode Nol*. Tonton berurutan, dan *jangan lompat*."),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"style": "rumahdunia", "theme": {"look": "premium", "figure": "stick", "exposure": 1.15}}

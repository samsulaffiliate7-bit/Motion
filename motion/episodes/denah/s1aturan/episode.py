"""Denah Rumah Dunia · Season 1 "Planet Denah" · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Dena, PENGGARIS", lokasi="planet dari udara, garis denah, kapsul kecil, palet bata, hologram, badai pasir, kapsul miring",
            hook="planet ini kosong, yang ngisi kalian", variasi="pin", interaksi="follow/like/komen", suara="Sulafat", season=1, episode=-1)


def compute():
    return dict(hud=dict(items=["ATURAN MAIN", "SEASON 1"]), kurs_bata=10)


SCENES = [
    dict(id="r1", type="DA_HOOK", kicker="", sub="", data=["hud"], say="Planet ini masih *kosong*. Belum ada satu rumah pun. Yang ngisi planet ini... *kalian*."),
    dict(id="r2", type="DA_PREMIS", kicker="", sub="", data=["hud"], say="Bumi udah penuh. Gue Dena, arsitek, sama robot gue, Penggaris. Tiap episode, kita bangun *satu rumah asli* dari *satu negara*, di planet ini."),
    dict(id="r3", type="DA_FOLLOW", kicker="", sub="", data=["hud"], say="Tiap kalian *follow*, satu *pendatang* turun dari kapsul. Papan penduduk nambah."),
    dict(id="r4", type="DA_LIKE", kicker="", sub="", data=["hud", "kurs_bata"], say="Tiap *like*, kita dapat *sepuluh bata*. Bata habis, rumah nggak jadi."),
    dict(id="r5", type="DA_KOMEN", kicker="", sub="", data=["hud"], say="Tiap *komen*, kalian milih *negara* rumah berikutnya. Yang paling rame, gue bangun."),
    dict(id="r6", type="DA_UJIAN", kicker="", sub="", data=["hud"], say="Tiap akhir pekan, planet ini ngasih *ujian*. Badai pasir, banjir, gempa. Rumahnya harus *kuat*."),
    dict(id="r7", type="DA_MULAI", kicker="", sub="", data=["hud"], say="Mulai dari *Episode Nol*. Tonton berurutan, dan *jangan lompat*."),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"style": "planet", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}

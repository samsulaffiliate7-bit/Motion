"""Desa Terakhir (akun Balai Desa Bocor) · Season 1 · video ATURAN MAIN (dipin di profil bersama Ep 0). Storyboard: STORYBOARD.md."""

META = dict(format="aturan main (pin)", pilar="cara main", tokoh="Gilang, Bu Yati, Pak Kardi, Sinta", lokasi="udara desa malam, menara gerbang, posko, gudang, balai (meja peta), pagar malam, gerbang",
            hook="desa terakhir, nasibnya di tangan kalian", variasi="pin", interaksi="follow/like/komen", suara="Charon", season=1, episode=-1)


def compute():
    return dict(hud=dict(judul="DESA TERAKHIR", hari="ATURAN MAIN", items=["SEASON 1", "30 HARI"]), penyintas=37, kurs=10)


SCENES = [
    dict(id="a1", type="BA_HOOK", kicker="", sub="", data=["hud"], say="Ini desa terakhir yang masih aman dari zombie. Dan nasibnya... ada di tangan *kalian*."),
    dict(id="a2", type="BA_PREMIS", kicker="", sub="", data=["hud"], say="Gue Gilang. Kades kabur duluan, jadi sekarang gue yang mimpin. Tugas kita cuma satu: *bertahan*."),
    dict(id="a3", type="BA_FOLLOW", kicker="", sub="", data=["hud", "penyintas"], say="Tiap kalian *follow*, satu *penyintas baru* datang ke gerbang. Makin banyak orang, makin kuat jaga malam."),
    dict(id="a4", type="BA_LIKE", kicker="", sub="", data=["hud", "kurs"], say="Tiap *sepuluh like*, gudang dapat *satu karung beras*, atau *satu ikat bambu* buat pagar."),
    dict(id="a5", type="BA_KOMEN", kicker="", sub="", data=["hud"], say="Tiap *komen*, jadi *rencana bertahan*. Rencana paling rame, besoknya kita jalanin."),
    dict(id="a6", type="BA_SERANG", kicker="", sub="", data=["hud"], say="Tiap akhir pekan, ada *serangan besar*. Dan tiap pilihan kalian, ada *akibatnya*."),
    dict(id="a7", type="BA_MULAI", kicker="", sub="", data=["hud"], say="Mulai dari *Hari ke-nol*. Tonton berurutan, dan *jangan lompat episode*."),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"style": "zombie", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}

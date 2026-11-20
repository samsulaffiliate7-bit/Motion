"""Kerajaan Berdasi (akun Hewan Berdasi Kotor) · Season 1 · Episode 0 "New Game" (konsep baru 19 Nov 2026, docs/KONSEP-S1.md bag. 6).
Storyboard: STORYBOARD.md. Semua tokoh, kerajaan, angka = fiksi. Rumus: follow = anggota Guild Netizen, 1 like = 1 gold, 10 like = +1 XP, komen = pilih kerajaan + quest."""

META = dict(format="serial Season 1", pilar="petualangan MMORPG", tokoh="Belang, Raja Kucing Berdasi, Prof. Burhan, prajurit kucing",
            lokasi="alun-alun Kota Pura, benua 4 kerajaan, halaman kastel, lapak Prof. Burhan, lumbung ikan",
            hook="new game, level 1, senjata sendok, langsung dihukum", variasi="episode 0", interaksi="komen: kerajaan + quest (masuk lubang / lapor raja / ngutang peta)",
            sindiran="dasi raja kotor (benih 'pajak ikan')", suara="Algenib", season=1, episode=0, babak=1)
STATE = dict(lv=1, hp=10, xp=0, xp_next=10, gold=0, harga_peta=50, ikan=0, ikan_kapasitas=1000)


def compute():
    s = STATE; assert s["gold"] < s["harga_peta"] and s["ikan"] == 0
    return dict(hud=dict(nama="BELANG", lv=s["lv"], hp=[s["hp"], s["hp"]], xp=[s["xp"], s["xp_next"]], gold=s["gold"]),
                harga=s["harga_peta"], kapasitas=s["ikan_kapasitas"])


SCENES = [
    dict(id="h1", type="H0_SPAWN", kicker="", sub="", data=["hud"],
         say="New game. Level satu. Senjata gue... *sendok*. Dan di hari pertama, gue udah *dihukum*."),
    dict(id="h2", type="H0_PETA", kicker="", sub="", data=["hud"],
         say="Ini benua Kerajaan Berdasi. Empat kerajaan: *Kucing*, *Burung*, *Reptil*, dan *Serigala* di utara, musuh bebuyutan kami."),
    dict(id="h3", type="H0_UPACARA", kicker="", sub="", data=["hud"],
         say="Di Kerajaan Kucing, semua prajurit *wajib pakai dasi*. Rajanya juga. Dasinya... *belum dicuci sejak dilantik*."),
    dict(id="h4", type="H0_TOLAK", kicker="", sub="", data=["hud"],
         say="Gue satu-satunya yang *nolak pakai dasi*. Perang kok pakai dasi? Raja marah. Hukumannya: *jaga lumbung*."),
    dict(id="h5", type="H0_BURHAN", kicker="", sub="", data=["hud", "harga"],
         say="Di jalan, ketemu *Prof. Burhan*, burung hantu penjual peta. Harganya *{harga|w} gold*. Gold gue? *Nol*. Lapaknya langsung *tutup*."),
    dict(id="h6", type="H0_LUMBUNG", kicker="", sub="", data=["hud", "kapasitas"],
         say="Gue buka lumbungnya. Isinya... *kosong*. Ikan rakyat sekerajaan *hilang*. Cuma ada *jejak kaki kecil*, menuju lubang gelap."),
    dict(id="h7", type="H0_AJAK", kicker="", sub="", data=["hud"],
         say="Kalian bisa bantu. *Follow*, masuk *Guild Netizen*. *Like*, jadi gold dan XP. *Komen*, pilih kerajaan kalian. Quest pertama gue: *masuk lubang*, *lapor raja*, atau *ngutang peta Prof. Burhan*?"),
]
END_PAD = 1.2
CONFIG_OVERRIDE = {"style": "rpg", "theme": {"look": "premium", "figure": "stick", "exposure": 1.16}}

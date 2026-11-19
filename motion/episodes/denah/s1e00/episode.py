"""Denah Rumah Dunia · Season 1 "Planet Denah" · Episode 0 "Pendaratan" (konsep baru 19 Nov 2026, docs/KONSEP-S1.md bagian 2).
Storyboard: STORYBOARD.md. Episode 0 belum memakai fakta rumah negara; angka cerita fiksi (like x 10 bata, follow = 1 pendatang).
Mulai Ep 1 tiap rumah asli wajib bersumber (simpan sumber di episode.py)."""

META = dict(format="serial Season 1", pilar="rumah dunia", tokoh="Dena, PENGGARIS", lokasi="langit planet, kapsul miring, planet dari udara, padang, papan penduduk, hologram",
            hook="bumi penuh, planet kosong, kapsul jatuh miring", variasi="episode 0", interaksi="komen: Islandia / Mongolia / Kanada", suara="Sulafat", season=1, episode=0, babak=1)
STATE = dict(episode=0, penduduk=1, bata=0, rumah=0, malam_jam=30, sisa_hari=2)
KURS = dict(follow="1 pendatang turun dari kapsul", like_bata=10)


def compute():
    s = STATE; assert s["penduduk"] == 1 and s["bata"] == 0 and s["rumah"] == 0 and s["malam_jam"] == 30 and s["sisa_hari"] == 2
    return dict(hud=dict(items=[f"EPISODE {s['episode']}", f"👥 {s['penduduk']}", f"🧱 {s['bata']}", f"🌙 {s['sisa_hari']} HARI"]),
                malam=s["malam_jam"], sisa=s["sisa_hari"], kurs_bata=KURS["like_bata"])


SCENES = [
    dict(id="s1", type="D0_JATUH", kicker="", sub="", data=["hud"],
         say="Bumi udah *penuh*. Jadi gue dikirim ke *planet kosong*, buat bangun rumah pertama. Dan kapsul gue... jatuh *miring*."),
    dict(id="s2", type="D0_KELUAR", kicker="", sub="", data=["hud"],
         say="Gue Dena, arsitek. Ukuran meleset satu senti aja, gue *panik*. Ini *Penggaris*, robot asisten gue. Tugasnya ngukur. Masalahnya, dia *polos banget*."),
    dict(id="s3", type="D0_DENAH", kicker="PLANET DENAH", sub="hari nol", data=["hud"],
         say="Lihat deh. Planetnya luas banget. Tanahnya *ungu oranye*, bulannya *dua*. Batu ada, kristal ada, tanaman aneh ada. Rumah? *Nol*."),
    dict(id="s4", type="D0_MALAM", kicker="", sub="", data=["hud", "malam", "sisa"],
         say="Masalahnya, malam di sini panjangnya *tiga puluh jam*. Dingin banget. Dan malam pertama datang *dua hari lagi*. Nggak ada rumah, kita *beku*."),
    dict(id="s5", type="D0_PINTU", kicker="", sub="", data=["hud"],
         say="Oke. Gue suruh Penggaris, *bangun rumah*! Dia kerja kilat... terus jadinya ini. *Pintu doang*. Ukurannya pas sih, presisi. Tapi gue tetap... *di luar*."),
    dict(id="s6", type="D0_PAPAN", kicker="", sub="", data=["hud"],
         say="Penduduk planet: *satu*. Penggaris nggak mau dihitung, katanya dia *perabot*. Bata: *nol*."),
    dict(id="s7", type="D0_AJAK", kicker="", sub="", data=["hud", "kurs_bata"],
         say="Kalian bisa bantu. *Follow*, satu pendatang turun dari kapsul. *Like*, sepuluh bata. *Komen*, negara rumah berikutnya. Rumah pertama harus tahan dingin. Kita tiru rumah *Islandia*, *Mongolia*, atau *Kanada*?"),
]
END_PAD = 1.5
CONFIG_OVERRIDE = {"style": "planet", "theme": {"look": "premium", "figure": "stick", "exposure": 1.18}}

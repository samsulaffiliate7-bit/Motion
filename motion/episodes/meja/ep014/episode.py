"""Meja Seberang Bos ep014 (3D, v3): Kamus HRD jilid 2, empat kalimat lowongan baru + pertanyaan aman saat interview. Tayang 12 Nov 2026.
Cerita fiksi, tanpa nama perusahaan. Nada adil: "bisa berarti", bukan menuduh semua HRD. Tidak menyebut aturan hukum kerja."""
CONFIG_OVERRIDE = {"tts": {"voice": "Laomedeia"}}
META = {"format": "Kamus HRD", "pilar": "cari kerja dan interview", "tokoh": ["Si Staf (pelamar)", "HRD"], "suara": "Laomedeia",
        "lokasi": ["papan lowongan stasiun pagi", "kantor dengan meja kosong", "taman kampus saat wisuda", "ruang rapat dinding grafik", "lobi ruang tunggu interview"],
        "hook": "pertanyaan", "variasi": [2, 3]}


def compute():
    return dict(phr=[["Dibutuhkan segera", "yang lama baru keluar, kerjaannya numpuk", "kenapa posisi ini kosong?"],
                     ["Fresh graduate welcome, pengalaman min. 2 tahun", "mereka sendiri belum yakin cari siapa", "apa target 3 bulan pertama?"],
                     ["Siap bekerja dengan target", "targetnya belum tentu jelas angkanya", "targetnya berapa, dihitung gimana?"],
                     ["Benefit menarik", "belum tentu tertulis di kontrak", "benefitnya apa saja, tertulis di mana?"]])


SCENES = [
    dict(id="s1", type="M_E014_PAPAN", kicker="KAMUS HRD", sub="jilid 2", say="Kamus HRD balik lagi, jilid dua. Empat kalimat lowongan yang kedengarannya biasa aja, tapi artinya *bisa* beda. Plus pertanyaan aman buat ditanyain pas interview, biar lo nggak kaget di bulan pertama.", data=["phr"]),
    dict(id="s2", type="M_E014_KOSONG", kicker="KAMUS HRD #1", sub="meja kosong", say="Satu: *dibutuhkan segera*. Bisa berarti yang lama baru keluar, dan kerjaannya udah numpuk. Tanya aja dengan sopan: kenapa posisi ini kosong? Jawabannya sering kasih gambaran beban kerja lo nanti.", data=["phr"]),
    dict(id="s3", type="M_E014_WISUDA", kicker="KAMUS HRD #2", sub="taman kampus", say="Dua: *fresh graduate welcome*, tapi pengalaman minimal dua tahun. Bisa berarti mereka sendiri belum yakin cari siapa. Tanya: apa target tiga bulan pertama buat posisi ini?", data=["phr"]),
    dict(id="s4", type="M_E014_GRAFIK", kicker="KAMUS HRD #3", sub="ruang rapat", say="Tiga: *siap bekerja dengan target*. Wajar, semua kerjaan ada target. Tapi bisa berarti targetnya belum jelas angkanya. Tanya: targetnya berapa, dan dihitungnya gimana?", data=["phr"]),
    dict(id="s5", type="M_E014_LOBI", kicker="KAMUS HRD #4", sub="ruang tunggu interview", say="Empat: *benefit menarik*. Bisa berarti bagus, bisa juga belum tertulis di mana-mana. Tanya: benefitnya apa saja, dan tertulis di kontrak atau nggak? Kalimat lowongan apa yang menurut lo paling ajaib? Tulis di komentar.", data=["phr"]),
]
END_PAD = 1.5

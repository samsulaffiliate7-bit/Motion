"""Meja Seberang Bos ep013 (3D, v3): Full POV Bos "manajer baru, dijepit target atas dan tim bawah". Tayang 11 Nov 2026.
Musiman: target akhir tahun. Cerita fiksi, tanpa nama perusahaan. Narator bos perempuan (suara Laomedeia, kolam suara Meja).
Tidak menyebut aturan hukum kerja."""
CONFIG_OVERRIDE = {"tts": {"voice": "Laomedeia"}}
META = {"format": "Full POV Bos", "pilar": "jadi atasan baru", "tokoh": ["Si Bos (manajer baru, perempuan)", "atasan", "tim"], "suara": "Laomedeia",
        "lokasi": ["ruang manajer baru pagi", "atrium kantor bertingkat", "ruang kerja rumah malam", "ruang tim pagi"],
        "hook": "angka spesifik", "variasi": [1, 5], "musiman": "target akhir tahun"}


def compute():
    pri = [["1", "Proyek klien besar", "dikejar"], ["2", "Laporan rutin", "dirampingkan"], ["3", "Ide baru", "ditunda ke Januari"]]
    return dict(naik_gaji=10, naik_beban=3, pri=pri)


SCENES = [
    dict(id="s1", type="M_E013_RUANG", kicker="POV BOS", sub="hari pertama jadi manajer", say="Tiga bulan lalu gue naik jadi manajer. Gaji naik *sepuluh persen*. Bebannya? Rasanya naik *tiga kali lipat*. Dan nggak ada yang ngajarin caranya. Kemarin gue masih duduk di meja seberang, sekarang gue yang ditunggu jawabannya.", data=[]),
    dict(id="s2", type="M_E013_ATRIUM", kicker="POV BOS", sub="dijepit dari dua arah", say="Dari atas, atasan nurunin *target akhir tahun* yang naik lagi. Dari bawah, tim gue minta cuti, minta tambahan orang, minta lembur dikurangi. Gue berdiri di tengah, dan dua-duanya *benar*. Kalau gue bilang iya ke atas, tim gue kelelahan. Kalau gue bilang iya ke bawah, target lewat.", data=[]),
    dict(id="s3", type="M_E013_RUMAH", kicker="POV BOS", sub="jam 10 malam", say="Yang tim gue nggak lihat: gue udah minta tambahan orang di rapat, dan *ditolak*. Gue bela mereka waktu ada yang salah. Malamnya gue sendirian, bikin ulang rencana supaya target tetap masuk akal.", data=[]),
    dict(id="s4", type="M_E013_TIM", kicker="POV BOS", sub="besok paginya", say="Besok paginya gue jujur ke tim. Ini targetnya, ini yang udah gue coba, dan ini *tiga prioritas* kita sampai Desember. Yang lain kita tunda. Ternyata tim lebih tenang dikasih kejelasan, daripada dikasih semangat. Lo pernah punya bos yang baru naik? Gimana rasanya?", data=["pri"]),
]
END_PAD = 1.5

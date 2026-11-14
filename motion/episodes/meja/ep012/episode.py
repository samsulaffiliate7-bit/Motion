"""Meja Seberang Bos ep012 (3D, v3): Seri Jenis Staf "si paling siap pak" (dua sisi adil). Tayang 11 Nov 2026.
Cerita fiksi, tanpa nama perusahaan. Tidak menyebut aturan hukum kerja."""
CONFIG_OVERRIDE = {"tts": {"voice": "Sadachbia"}}
META = {"format": "Seri Jenis Staf", "pilar": "komunikasi kerja", "tokoh": ["Si Staf (tipe siap pak)", "Si Bos", "rekan kerja"], "suara": "Sadachbia",
        "lokasi": ["meja bos pagi", "meja staf sore (map menumpuk)", "balkon kantor malam", "ruang rapat kecil pagi"],
        "hook": "kontras", "variasi": [3, 5]}


def compute():
    why = [["😰", "Takut dianggap nggak mampu"], ["🤔", "Nggak paham tugasnya, malu nanya"], ["📚", "Kerjaan udah numpuk, nggak berani bilang"]]
    return dict(why=why, why_cues=["dianggap", "nggak paham", "numpuk"])


SCENES = [
    dict(id="s1", type="M_E012_SIAP", kicker="JENIS STAF", sub="si paling siap pak", say="Tiap dikasih kerjaan, jawabannya selalu sama: *siap, Pak*. Tugas pertama, siap. Tugas kedua, siap. Tugas ketiga, siap juga, sambil senyum. Bos lega, merasa timnya bisa diandalkan. Hasilnya? Nggak ada yang *siap*.", data=[]),
    dict(id="s2", type="M_E012_TUMPUK", kicker="JENIS STAF", sub="jam 5 sore, hari Kamis", say="Kamis sore, mapnya numpuk setinggi kepala. Bos nanyain satu, dia jawab lagi dikerjain. Padahal belum dibuka sama sekali. Ujung-ujungnya lembur, dan bos makin *nggak percaya*. Kata siap yang tadinya bikin tenang, sekarang malah bikin was-was.", data=[]),
    dict(id="s3", type="M_E012_BALKON", kicker="KENAPA BEGITU?", sub="balkon kantor, malam", say="Tapi coba tanya kenapa. Biasanya ada tiga alasan. Takut *dianggap* nggak mampu. *Nggak paham* tugasnya, tapi malu nanya. Atau kerjaannya udah *numpuk*, dan nggak berani bilang. Jadi siap itu sebenarnya minta tolong, cuma bunyinya beda.", data=["why", "why_cues"]),
    dict(id="s4", type="M_E012_RUMUS", kicker="RUMUSNYA", sub="dua sisi", say="Rumusnya buat staf: siap, *tapi* sebut tanggalnya, dan apa yang harus mundur. Siap Pak, selesai Kamis, tapi laporan bulanan mundur ke Jumat, aman? Buat bos: jangan tanya bisa nggak, tanya *kapan* bisa selesai. Lo pernah jadi si paling siap pak? Ngaku di komentar.", data=[]),
]
END_PAD = 1.8

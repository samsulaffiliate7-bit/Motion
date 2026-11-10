"""Meja Seberang Bos ep016 (3D, v3): Split Staf vs Bos "cuti mendadak sehari sebelum presentasi klien". Tayang 12 Nov 2026.
Cerita fiksi, tanpa nama perusahaan/klien. Tidak menyebut aturan hukum cuti; angka cuma hitungan hari/jam cerita."""
META = {"format": "Split Staf vs Bos", "pilar": "komunikasi kerja", "tokoh": ["Si Staf", "Si Bos"], "suara": "Sadachbia",
        "lokasi": ["layar split chat malam (kamar staf / ruang tamu bos)", "split pagi: rumah sakit kecil vs ruang rapat kosong", "lorong kantor hari berikutnya", "split penutup dua meja"], "hook": "kejadian", "variasi": [5]}
PARAMS = dict(jam_chat=21, jam_presentasi=9, hari_kabar=3)


def compute(p=PARAMS):
    selisih = 24 - p["jam_chat"] + p["jam_presentasi"]; assert selisih == 12   # chat jam 9 malam, presentasi jam 9 pagi
    return dict(selisih=selisih, split=["\"Besok presentasi klien!\"", "\"Besok cuti ya, Pak.\""], split2=["mikir: dia nggak peduli tim", "mikir: ayah masuk IGD"],
                split3=["\"Kabari aku duluan ya.\"", "\"Lain kali gue kabarin langsung.\""])


SCENES = [
    dict(id="s1", type="M_E016_CHAT", kicker="STAF vs BOS", sub="jam 9 malam", say="Jam sembilan malam, staf kirim chat: *besok cuti ya, Pak*. Di seberang, bos baru selesai bikin slide buat presentasi klien jam sembilan pagi. Jaraknya cuma {selisih|w} jam.", data=["split", "selisih"]),
    dict(id="s2", type="M_E016_PAGI", kicker="STAF vs BOS", sub="besok paginya", say="Bos mikirnya, *nggak peduli tim*. Pilih cuti pas hari paling penting. Staf mikirnya lain. Ayahnya masuk IGD tengah malam, dan dia cuma sempat ngetik satu kalimat itu sambil nunggu di lorong rumah sakit.", data=["split2"]),
    dict(id="s3", type="M_E016_LORONG", kicker="DUA HARI KEMUDIAN", sub="lorong kantor", say="Dua hari kemudian, ayahnya sudah pulang, dan mereka papasan di lorong. Bos sudah siap negur, kalimatnya sudah disusun dari kemarin. Staf sudah siap minta maaf, takut dicap nggak profesional. Ternyata yang kurang cuma *satu kalimat alasan*, dan satu orang yang mau nanya duluan.", data=[]),
    dict(id="s4", type="M_E016_TUTUP", kicker="STAF vs BOS", sub="yang mereka ubah", say="Sekarang bos bilang, kalau darurat, kabari aku duluan, alasan singkat juga cukup. Staf bilang, lain kali gue telepon, bukan cuma chat, biar bos nggak nebak-nebak sendiri. Presentasinya? Tetap jalan, bos bawain sendiri, dan ternyata aman. Lo pernah di posisi yang mana? Yang cuti mendadak, atau yang ditinggal *presentasi*?", data=["split3"]),
]
END_PAD = 2.5
CONFIG_OVERRIDE = {"tts": {"voice": "Sadachbia"}}

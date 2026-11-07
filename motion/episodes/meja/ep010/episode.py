"""Meja Seberang Bos ep010 (3D, konsep v3): Hari 1 vs Bulan ke-6 "semangat kerja yang pelan-pelan hambar".
Cerita fiksi, tanpa nama perusahaan atau aplikasi. Adil dua sisi: bukan karena malas, dan bos juga perlu tahu.
Tidak menyebut aturan hukum kerja (tidak perlu sumber). Tiap lokasi berubah dari keadaan Hari 1 ke Bulan ke-6 di tengah adegan."""
META = {"format": "Hari 1 vs Bulan ke-6", "pilar": "performa dan promosi", "tokoh": ["Si Staf", "Si Bos"],
        "lokasi": ["kamar kos subuh", "meja kerja", "rapat online di ruang tamu", "atap gedung sore", "warung kopi dekat kantor"],
        "hook": "kontras", "variasi": [1, 5, 6]}


def compute():
    why = [["🎯", "Target nggak jelas"], ["🔇", "Kerja bagus nggak dibahas"], ["📦", "Kerjaan nambah, nggak ada yang nanya"]]
    fix = [["☕", "Ngobrol 15 menit sebulan sekali"], ["✅", "Target kecil mingguan"], ["❤️", "Pegang satu proyek yang disuka"]]
    return dict(why=why, why_cues=["target", "dibahas", "nambah"], fix=fix, fix_cues=["lima belas", "mingguan", "suka"])


SCENES = [
    dict(id="s1", type="M_ALARM", kicker="HARI 1 vs BULAN 6", sub="kamar kos, subuh", say="Hari pertama kerja, gue bangun *sebelum alarm*, setengah enam udah rapi. Bulan keenam? Alarm bunyi tiga kali, dan gue masih *nego sama kasur*.", data=[]),
    dict(id="s2", type="M_DESK6", kicker="HARI 1 vs BULAN 6", sub="meja kerja", say="Hari pertama, meja rapi, ada tanaman kecil, semua chat gue bales dalam lima menit. Bulan keenam, tanamannya *layu*, dan chat dibales pas inget aja.", data=[]),
    dict(id="s3", type="M_ONLINE", kicker="HARI 1 vs BULAN 6", sub="rapat online", say="Hari pertama, tiap rapat gue catat semua, sampai tulisannya miring, dan selalu yang pertama angkat tangan. Bulan keenam, kamera mati, mikrofon mati, *semangat juga ikut mati*.", data=[]),
    dict(id="s4", type="M_ROOFTOP", kicker="POV STAF", sub="atap kantor, sore", say="Tapi ini bukan karena gue malas. Setelah gue pikir, ada tiga penyebab. *Target* yang nggak pernah jelas. Kerja bagus yang nggak pernah *dibahas*. Dan kerjaan yang terus *nambah*, tanpa ada yang nanya gue sanggup atau nggak.", data=["why", "why_cues"]),
    dict(id="s5", type="M_WARKOP", kicker="YANG GUE LAKUIN", sub="warung kopi, pagi", say="Yang bikin gue balik lagi: gue minta ngobrol *lima belas menit* sebulan sekali sama bos, gue bikin target kecil *mingguan* sendiri, dan gue pegang satu proyek yang gue *suka*. Ternyata bos gue nggak sadar sama sekali, dan dia malah senang ditanya. Lo sekarang masih hari pertama, atau udah bulan keenam?", data=["fix", "fix_cues"]),
]
END_PAD = 1.5

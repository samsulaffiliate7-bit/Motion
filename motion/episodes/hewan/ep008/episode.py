"""Hewan Berdasi Kotor ep008 (3D, konsep v3): 3 tipe hewan di grup chat; format Hewan di Sekitarmu (daftar bernomor + twist "jangan-jangan lo").
Fabel fiksi; menyindir perilaku umum di grup chat, tanpa platform/orang/kejadian nyata."""
META = {"format": "Hewan di Sekitarmu", "pilar": "media sosial", "tokoh": ["Beo (tamu)", "Bunglon (tamu)", "Kucing Berdasi", "Kerbau"],
        "lokasi": ["panggung grup chat di atas kota", "halte malam", "taman kota malam", "ruang tamu Kucing", "panggung grup chat (podium ke-4)"],
        "hook": "pertanyaan", "variasi": [3, 5, 6], "suara": "Algenib"}


def compute():
    return dict(grup=5, pinjam=500_000,
                chat3=[["Kerbau", "Minggu ini kumpul yuk?"], ["Tikus", "Gas! Kucing ikut?"], ["Kerbau", "Kucing apa kabar?"], ["Tikus", "Kucing... 👀"],
                       ["Kucing", "guys, ada yang bisa pinjemin 500 ribu? 🙏"]])


SCENES = [
    dict(id="s1", type="H_GCSTAGE", kicker="HEWAN DI SEKITARMU", sub="grup chat", say="Di setiap grup chat, pasti ada *tiga hewan* ini. Kalau lo nggak nemu satu pun, tunggu sampai akhir. Nomor tiga paling sering bikin grup mendadak *sepi*.", data=[]),
    dict(id="s2", type="H_GCBEO", kicker="NOMOR SATU", sub="Si Beo", say="Nomor satu: *Si Beo*. Belum baca isinya, sudah diteruskan ke lima grup lain. Kalimat andalannya: dari grup sebelah. Tiga jam kemudian, dia kirim lagi: *maaf, ternyata salah*.", data=[]),
    dict(id="s3", type="H_GCBUNGLON", kicker="NOMOR DUA", sub="Si Bunglon", say="Nomor dua: *Si Bunglon*. Kucing bilang liburan ke pantai, dia setuju. Kerbau bilang ke gunung, dia juga setuju. Warnanya ganti mengikuti siapa yang terakhir chat. Pas ditanya pilih yang mana, jawabnya: *terserah*.", data=[]),
    dict(id="s4", type="H_GCKUCING", kicker="NOMOR TIGA", sub="Si Kucing", say="Nomor tiga: *Si Kucing*. Tiga bulan cuma baca, tidak pernah balas. Diajak kumpul, diam. Ditanya kabar, diam. Lalu tengah malam, tiba-tiba dia muncul: *guys, ada yang bisa pinjemin lima ratus ribu?*", data=[]),
    dict(id="s5", type="H_GCSTAGE", variant="end", kicker="DAN TERAKHIR", sub="lo sendiri", say="Grup yang tadinya ramai, langsung sepi. Nah, kalau di grup lo nggak ada Beo, Bunglon, atau Kucing, coba cek lagi. Jangan-jangan *lo salah satunya*. Tag teman yang paling mirip nomor tiga.", data=[]),
]
END_PAD = 2.5

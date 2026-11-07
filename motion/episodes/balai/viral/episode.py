"""Balai Desa Bocor (konsep v3, Liputan Warga): aduan lampu gang dibalas stiker, baru ditangani setelah video viral.
Cerita fiksi: desa, gang, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, platform, atau daerah nyata."""
META = {"format": "Liputan Warga", "pilar": "suara warga tidak didengar", "tokoh": ["Dimas (pemuda)", "Bu Ketua PKK", "warga"],
        "lokasi": ["gang gelap malam", "teras (HP grup warga)", "gang (wawancara)", "gang pagi (mobil datang)", "gang malam dari atas"], "hook": "kontras", "variasi": [1, 4, 5]}
PARAMS = dict(laporan=12, bulan=3, lampu=10, diganti=1, detik=15)


def compute(p=PARAMS):
    assert p["diganti"] < p["lampu"] and p["laporan"] == 12
    return dict(laporan=p["laporan"], bulan=p["bulan"], sisa=p["lampu"] - p["diganti"], detik=p["detik"],
                wa=[["Bu Ratna", "Lampu gang mati, Pak 🙏", True], ["Balai Desa", "👍", False], ["Pak Darto", "Masih gelap, Pak", True], ["Balai Desa", "🙏🙏", False],
                    ["Bu Ratna", "Laporan ke-7: masih mati", True], ["Balai Desa", "(dibaca)", False], ["Pak Darto", "Laporan ke-12 🙏", True], ["Balai Desa", "Sedang diproses", False]],
                iv=dict(who="pemuda", name="Dimas", role="Karang Taruna", q1="“Saya cuma rekam jalan pulang.”", q2="“Besoknya, tiga mobil datang.”", q2cue="sebelum tidur"),
                board=["PAPAN INFO", "Gang Melati", "Lampu jalan: 10 titik", "Status: diproses"])


SCENES = [
    dict(id="s1", type="BL_DARKGANG", kicker="LIPUTAN WARGA", sub="Gang Melati", say="Lampu jalan di Gang Melati mati *{bulan|w} bulan*. Warga sudah lapor *{laporan|w} kali*. Yang akhirnya berhasil, bukan laporan berikutnya. Tapi satu video *{detik|w} detik*.", data=[]),
    dict(id="s2", type="BL_WAGROUP", kicker="GRUP WARGA", sub="tiga bulan terakhir", say="Laporan pertama, dibalas stiker *jempol*. Laporan kedua, stiker *doa*. Laporan ketiga sampai kedua belas, dibaca, tidak dibalas. Jawaban terakhir dari balai: *sedang diproses*.", data=[]),
    dict(id="s3", type="BL_INTERVIEW", kicker="KATA WARGA", sub="Dimas, karang taruna", say="Lalu Dimas, pemuda karang taruna, merekam jalan pulangnya yang *gelap gulita*. Lima belas detik, diunggah iseng sebelum tidur. Judulnya cuma satu kata: *gelap*.", data=[]),
    dict(id="s4", type="BL_VIRAL", kicker="KEESOKAN HARINYA", sub="Gang Melati, pagi", say="Pagi harinya, videonya ditonton *satu juta* kali. Siangnya, tiga mobil datang. Lampu diganti, lalu difoto dari *empat sudut*, lengkap dengan spanduk tanggap cepat.", data=[]),
    dict(id="s5", type="BL_DARKGANG", variant="end", kicker="MALAMNYA", sub="dicek warga", say="Malamnya warga mengecek. Lampu yang diganti *cuma satu*, persis di titik video itu direkam. *{sisa|w}* lainnya masih gelap. Di tempat lo, harus viral dulu baru diurus? Tulis di komentar.", data=[]),
]
END_PAD = 2.5

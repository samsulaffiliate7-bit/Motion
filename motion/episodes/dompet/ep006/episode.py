"""Dompet Gue Nangis ep006 (3D, konsep v3): Bongkar Jebakan "titip dana untung 10% per bulan, dijamin".
Cerita fiksi. Hitungan murni matematika bunga berbunga (tidak butuh sumber luar); tidak menyebut produk/perusahaan/lembaga nyata."""
META = {"format": "Bongkar Jebakan", "pilar": "jebakan", "tokoh": ["Nana", "Dita (teman, lewat chat)"],
        "lokasi": ["kafe sore", "kamar kos malam", "atap kota senja", "diorama meja", "meja tampak atas", "halte malam"],
        "hook": "angka spesifik", "variasi": [1, 3, 5]}
PARAMS = dict(modal=10_000_000, bunga=0.10)


def compute(p=PARAMS):
    v = lambda bln: p["modal"] * (1 + p["bunga"]) ** bln
    t1, t3, t5 = v(12), v(36), v(60)
    t1jt, t3jt = int(t1 // 1e6), int(round(t3 / 1e6))
    assert t1jt == 31 and t3jt == 309 and round(t5 / 1e9) == 3 and 3 < t1 / p["modal"] < 3.2
    return dict(t1jt=t1jt, t3jt=t3jt,
                chat=["Na, mau titip dana nggak?", "Minimal 10 juta, untung 10% tiap bulan", "DIJAMIN aman 👍 slot terbatas ya", "Kalau ajak temen, bonus lagi"],
                tip_cues=["pasti", "buru-buru", "ajak orang"],
                tips=[["⚠️", "Untung pasti", "dan tinggi tiap bulan"], ["⏰", "Buru-buru", "katanya slot terbatas"], ["👥", "Ajak orang", "baru dapat untung lebih"]])


SCENES = [
    dict(id="s1", type="D3_CHATHOOK", kicker="TAWARAN MASUK", sub="kafe, jam 5 sore", say="Temen gue nawarin: *titip sepuluh juta*, untungnya *sepuluh persen* tiap bulan, katanya dijamin. Ini cara gue ngecek, bukan nasihat keuangan ya. Tapi hitungan ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_TOWER", kicker="HITUNG DULU", sub="12 bulan", say="Sepuluh persen sebulan kedengarannya kecil. Tapi kalau untungnya diputar lagi tiap bulan, setahun sepuluh juta jadi *{t1jt|w} juta* lebih. Itu *tiga kali lipat* cuma dalam dua belas bulan.", data=["t1jt"]),
    dict(id="s3", type="D3_SKYLINE", kicker="KALAU DITERUSIN", sub="5 tahun", say="Lanjut tiga tahun, jadi sekitar *{t3jt|w} juta*. Lima tahun, hampir *tiga miliar*. Kalau beneran semudah itu, kenapa yang nawarin masih *pinjem duit* buat bayar kos?", data=["t3jt"]),
    dict(id="s4", type="D3_PYRAMID", kicker="UANGNYA DARI MANA?", sub="cara kerja skema", say="Terus untungnya dari mana? Di skema kayak gini, biasanya untung peserta lama dibayar pakai *uang peserta baru*. Selama yang baru terus masuk, semua kelihatan lancar. Begitu yang baru berhenti, yang di bawah *kehilangan semuanya*.", data=[]),
    dict(id="s5", type="D3_TIPS", kicker="3 TANDA BAHAYA", sub="catat ini", say="Sejak itu gue pegang tiga tanda bahaya. Satu, untungnya *pasti* dan tinggi. Dua, disuruh *buru-buru*, katanya slot terbatas. Tiga, untung lebih gede kalau lo *ajak orang*. Ketemu satu aja, cek dulu izinnya di lembaga resmi.", data=["tips", "tip_cues"]),
    dict(id="s6", type="D3_BUSSTOP", kicker="JAWABAN GUE", sub="halte, malam", say="Akhirnya gue bales, *nggak dulu ya*. Lo pernah ditawarin yang kayak gini? Ceritain di komentar, biar yang lain nggak kena.", data=[]),
]
END_PAD = 1.5

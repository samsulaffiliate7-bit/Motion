"""Dompet Gue Nangis ep016 (3D, v3): Cerita Keputusan A/B "adik minta HP 3 juta". Tayang 12 Nov 2026.
Cerita fiksi, angka ilustrasi (aritmetika). Tanpa merek HP/toko. Format A/B lama (maks 1-2x seminggu; pertama minggu ini)."""
META = {"format": "Cerita Keputusan A/B", "pilar": "duit dan keluarga", "tokoh": ["Nana", "adik (SMA)"], "suara": "Kore",
        "lokasi": ["ruang tamu rumah ortu sore", "kamar kos Nana malam (hitung gaji)", "lorong dua pintu A/B", "teras rumah malam"], "hook": "angka spesifik", "variasi": [1, 5]}
PARAMS = dict(gaji=5_000_000, kos=1_200_000, makan=1_500_000, transport=500_000, ortu=800_000, nabung=500_000, hp=3_000_000, darurat=6_000_000, hp_b=2_000_000, adik_b=500_000)


def rp(x):
    return "Rp" + f"{int(x):,}".replace(",", ".")


def compute(p=PARAMS):
    sisa = p["gaji"] - p["kos"] - p["makan"] - p["transport"] - p["ortu"] - p["nabung"]
    a_darurat = p["darurat"] - p["hp"]; b_nana = p["hp_b"] - p["adik_b"]; b_bulan = b_nana // sisa
    assert sisa == 500_000 and p["hp"] // sisa == 6 and a_darurat == 3_000_000 and b_nana == 1_500_000 and b_bulan == 3
    return dict(sisa_rp=rp(sisa), a_darurat_rp=rp(a_darurat), b_nana_rp=rp(b_nana), b_bulan=b_bulan,
                pos=[["kos", rp(p["kos"])], ["makan", rp(p["makan"])], ["transport", rp(p["transport"])], ["kirim ortu", rp(p["ortu"])], ["tabungan", rp(p["nabung"])]])


SCENES = [
    dict(id="s1", type="D3_E016_CHAT", kicker="KEPUTUSAN", sub="ruang tamu, sore", say="Adik gue chat: kak, HP aku rusak, bisa beliin yang *tiga juta*? Gaji gue lima juta. Gue sayang adik gue, tapi gue juga harus hitung. Ini cara gue mikir, bukan nasihat keuangan ya. Tapi angka ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_E016_HITUNG", kicker="HITUNG DULU", sub="kamar kos, malam", say="Gaji lima juta dipotong kos, makan, transport, kirim ke orang tua, dan tabungan rutin. Sisanya cuma *lima ratus ribu* sebulan. Artinya tiga juta itu sama dengan *enam bulan* sisa gaji gue. Enam bulan nggak jajan, nggak nongkrong, nggak ada cadangan.", data=["pos", "sisa_rp"]),
    dict(id="s3", type="D3_E016_PINTU", kicker="PILIHAN A ATAU B", sub="dua jalan", say="Pilihan A: beliin penuh pakai dana darurat. Adik senang, tapi dana darurat gue tinggal *tiga juta*, setengahnya. Pilihan B: cari HP yang dua juta. Gue bayar satu setengah juta, dicicil dari sisa gaji *tiga bulan*, dan adik nambah lima ratus ribu dari tabungannya.", data=["a_darurat_rp", "b_nana_rp", "b_bulan"]),
    dict(id="s4", type="D3_E016_TERAS", kicker="LO PILIH MANA?", sub="teras, malam", say="Dua-duanya sayang, cuma beda cara. A bikin adik senang sekarang, B bikin gue tetap aman kalau tiba-tiba ada yang darurat. Gue belum bales chatnya. Kalau lo jadi gue, pilih *A* atau *B*? Pernah di posisi ini juga? Tulis di komentar.", data=[]),
]
END_PAD = 1.5

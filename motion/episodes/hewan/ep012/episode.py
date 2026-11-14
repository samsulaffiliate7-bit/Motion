"""Hewan Berdasi Kotor ep012 (3D, konsep v3): paket COD pesanan Kucing atas nama Tikus; format Dari Mata Korban (Tikus bercerita).
Fabel fiksi; kos, kurir, dan angka rekaan, tanpa nama toko/aplikasi."""
META = {"format": "Dari Mata Korban", "pilar": "kos dan pertemanan", "tokoh": ["Tikus Kecil (narator)", "Kucing Berdasi", "Ayam (kurir, tamu)"],
        "lokasi": ["gerbang kos malam", "kamar kos Kucing", "gerbang kos (paket menumpuk)", "lorong kos", "pagar kos (kertas tolak)"],
        "hook": "kontras", "variasi": [1, 5], "suara": "Achird"}
PAKET = [350, 300, 250]   # ribu rupiah (rekaan)


def compute():
    tot = sum(PAKET); assert tot == 900
    return dict(cod1=PAKET[0], paket=PAKET, total=tot, paket_cues=["datang lagi", "Lalu lagi", "Tiga paket"])


SCENES = [
    dict(id="s1", type="H_GATEKOS", kicker="DARI MATA TIKUS", sub="kos, 21.00", say="Gue Tikus. Jam sembilan malam, kurir datang ke kos. Paket COD, *tiga ratus lima puluh ribu*, atas nama gue. Masalahnya: gue *nggak pernah pesan* apa-apa.", data=[]),
    dict(id="s2", type="H_KUCINGKAMAR", kicker="TERNYATA", sub="kamar sebelah", say="Yang pesan ternyata Kucing, tetangga kamar. Alamatnya pakai nama gue, katanya biar kurirnya nggak bingung. Dia sendiri lagi nggak di kos. Kurirnya nunggu. Ya udah, gue *bayar dulu*.", data=[]),
    dict(id="s3", type="H_GATEKOS", variant="lagi", kicker="MINGGU DEPANNYA", sub="gerbang kos", say="Minggu depannya, paket datang lagi. Lalu lagi. Tiga paket, semuanya atas nama gue. Totalnya *sembilan ratus ribu*. Itu uang makan gue *sebulan*.", data=[]),
    dict(id="s4", type="H_KOSDOOR", kicker="DITAGIH", sub="lorong kos", say="Gue ketuk kamar Kucing. Jawabannya selalu sama: *nanti gue ganti*, pas gajian. Gajiannya sudah lewat dua kali. Yang datang malah *paket keempat*.", data=[]),
    dict(id="s5", type="H_GATEKOS", variant="end", kicker="MALAM ITU", sub="pagar kos", say="Malam itu gue tempel kertas di pagar kos: COD atas nama Tikus, *tolak saja*. Pelajaran dari gue: nama lo bukan *alamat titipan*. Pernah dibegini sama teman? Cerita di komentar.", data=[]),
]
END_PAD = 4

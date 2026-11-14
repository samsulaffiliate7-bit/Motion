"""Dompet Gue Nangis ep010 (3D, konsep v3): Checklist Sebelum 30 "5 hal yang harus beres sebelum umur 30".
Cerita fiksi. Isi = patokan umum perencanaan keuangan pribadi (catat pengeluaran, dana darurat 3-6x pengeluaran,
hindari utang konsumtif berbunga tinggi, perlindungan kesehatan, investasi rutin sejak dini). Tanpa angka imbal hasil,
tanpa nama produk, aplikasi, asuransi, atau lembaga nyata. Kalimat risiko di poin investasi (keputusan pemilik, KONSEP-V3)."""
META = {"format": "Checklist Sebelum 30", "pilar": "target umur", "tokoh": ["Nana"],
        "lokasi": ["pesta ulang tahun kecil di kamar", "kasir minimarket (struk terbang)", "trotoar hujan sore", "eskalator mal", "ruang tunggu klinik", "kebun bibit pagi"],
        "hook": "angka spesifik", "variasi": [1, 3, 5]}
PARAMS = dict(umur=26, batas=30)


def compute(p=PARAMS):
    sisa = p["batas"] - p["umur"]; assert sisa == 4
    items = [["5", "Tahu pengeluaran sebulan"], ["4", "Dana darurat 3-6x"], ["3", "Bebas utang konsumtif"], ["2", "Perlindungan kesehatan"], ["1", "Investasi rutin"]]
    return dict(umur=p["umur"], sisa=sisa, items=items)


SCENES = [
    dict(id="s1", type="D3_ULTAH", kicker="SEBELUM 30", sub="5 hal, hitung mundur", say="Umur gue dua puluh enam. Tinggal *empat tahun* lagi ke tiga puluh. Ada *lima hal* yang gue kejar sebelum lilin angka tiga puluh nyala. Ini yang gue lakuin, bukan nasihat keuangan ya. Tapi daftar ini penting banget lo tahu.", data=["items"]),
    dict(id="s2", type="D3_KASIR", kicker="NOMOR 5", sub="tahu duit lari ke mana", say="Nomor lima, *tahu pengeluaran sebulan*. Bukan kira-kira, tapi dicatat. Gue catat tiga bulan penuh, dan ternyata jajan kecil-kecil itu yang paling gede.", data=[]),
    dict(id="s3", type="D3_HUJAN", kicker="NOMOR 4", sub="payung sebelum hujan", say="Nomor empat, *dana darurat*. Patokan umumnya tiga sampai enam kali pengeluaran. Ini payung lo. Hujannya nggak bilang-bilang, bisa kena PHK, sakit, atau motor mogok.", data=[]),
    dict(id="s4", type="D3_ESKALATOR", kicker="NOMOR 3", sub="rantai yang nggak kelihatan", say="Nomor tiga, *bebas utang konsumtif*. Cicilan barang yang nilainya turun, apalagi bunganya tinggi, itu kayak rantai di kaki. Lo jalan, tapi berat terus.", data=[]),
    dict(id="s5", type="D3_KLINIK", kicker="NOMOR 2", sub="sakit itu mahal", say="Nomor dua, *perlindungan kesehatan*. Satu kali dirawat bisa ngabisin tabungan bertahun-tahun. Pastikan lo punya jaminan kesehatan yang aktif, dan iurannya nggak telat.", data=[]),
    dict(id="s6", type="D3_BIBIT", kicker="NOMOR 1", sub="tanam dari sekarang", say="Nomor satu, *mulai investasi rutin*, sekecil apa pun. Waktu adalah pupuk paling murah. Inget, nilainya bisa naik turun, pelajari dulu sebelum ikut. Dari lima ini, lo udah beres berapa? Jawab pakai angka.", data=["items"]),
]
END_PAD = 1.2

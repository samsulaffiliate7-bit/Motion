"""Dompet Gue Nangis ep011 (3D, v3): Bongkar Jebakan "promo tanggal kembar 11.11". Tayang 11 Nov 2026.
Cerita fiksi. Angka murni ilustrasi aritmetika (tidak butuh sumber). Tidak menyebut toko, aplikasi, platform belanja, atau merek nyata."""
META = {"format": "Bongkar Jebakan", "pilar": "bocor halus", "tokoh": ["Nana"], "suara": "Kore",
        "lokasi": ["kamar kos 23.59", "lorong gudang toko", "dok bongkar muat ekspedisi", "menara jam alun-alun malam", "teras kos pagi"],
        "hook": "angka spesifik", "variasi": [1, 3, 4], "musiman": "11.11"}
PARAMS = dict(normal=200_000, naik=320_000, diskon=0.40, butuh=120_000, min_gratis=150_000, tambah=35_000, ongkir=15_000)


def rp(x):
    return "Rp" + f"{int(round(x)):,}".replace(",", ".")


def compute(p=PARAMS):
    coret = p["naik"] * (1 - p["diskon"]); hemat = p["normal"] - coret
    total_tambah = p["butuh"] + p["tambah"]; rugi = p["tambah"] - p["ongkir"]
    assert coret == 192_000 and hemat == 8_000 and round(hemat / p["normal"] * 100) == 4
    assert total_tambah >= p["min_gratis"] and p["butuh"] < p["min_gratis"] and rugi == 20_000
    return dict(normal_rp=rp(p["normal"]), naik_rp=rp(p["naik"]), coret_rp=rp(coret), hemat_rp=rp(hemat), hemat_pct=4,
                butuh_rp=rp(p["butuh"]), min_rp=rp(p["min_gratis"]), tambah_rp=rp(p["tambah"]), ongkir_rp=rp(p["ongkir"]), rugi_rp=rp(rugi),
                tips=[["🏷️", "Harga coret", "cek harga seminggu lalu"], ["🚚", "Gratis ongkir", "hitung barang tambahan"], ["⏰", "Hitung mundur", "tunggu 24 jam"]],
                tip_cues=["harga coret", "gratis ongkir", "hitung mundur"])


SCENES = [
    dict(id="s1", type="D3_E011_CHECKOUT", kicker="PROMO 11.11", sub="jam 23.59", say="Diskon *empat puluh persen*, tinggal satu menit lagi. Gue hampir checkout. Ternyata hematnya cuma *delapan ribu*. Ini cara gue ngecek, bukan nasihat keuangan ya. Tapi trik ini penting banget lo tahu.", data=[]),
    dict(id="s2", type="D3_E011_LABEL", kicker="TRIK 1", sub="harga coret", say="Trik pertama, *harga coret*. Minggu lalu barang ini dua ratus ribu. Seminggu sebelum promo, harganya naik jadi tiga ratus dua puluh ribu. Lalu didiskon empat puluh persen, jadi seratus sembilan puluh dua ribu. Hemat beneran? Cuma *delapan ribu*.", data=["normal_rp", "naik_rp", "coret_rp"]),
    dict(id="s3", type="D3_E011_ONGKIR", kicker="TRIK 2", sub="minimal belanja", say="Trik kedua, *gratis ongkir* minimal seratus lima puluh ribu. Belanjaan gue cuma seratus dua puluh ribu, jadi gue nambah barang tiga puluh lima ribu. Padahal ongkirnya cuma lima belas ribu. Gue malah *rugi dua puluh ribu* buat barang yang nggak gue butuh.", data=["butuh_rp", "tambah_rp", "ongkir_rp"]),
    dict(id="s4", type="D3_E011_TIMER", kicker="TRIK 3", sub="hitung mundur", say="Trik ketiga, *hitung mundur*. Jam yang terus jalan bikin otak lupa nanya, gue butuh nggak sih? Sekarang aturan gue simpel: masuk keranjang dulu, tunggu *dua puluh empat jam*. Kalau besok masih butuh, baru beli.", data=[]),
    dict(id="s5", type="D3_E011_TERAS", kicker="PAGINYA", sub="keranjang dicek ulang", say="Paginya gue buka keranjang lagi. Dari lima barang, yang masih gue butuh cuma *satu*. Lo semalam checkout apa? Ngaku di komentar.", data=["tips", "tip_cues"]),
]
END_PAD = 1.2

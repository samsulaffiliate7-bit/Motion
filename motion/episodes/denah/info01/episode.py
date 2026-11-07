"""Denah Rumah Dunia, serial "Bumi Kita" slot 2 (info, tanpa voting): kota wajib punya ruang terbuka hijau 30%.

Sumber (dicek 6 Nov 2026):
- UU No. 26 Tahun 2007 tentang Penataan Ruang, Pasal 29: RTH kota paling sedikit 30% luas wilayah kota, RTH publik paling sedikit 20%
  (sisanya 10% privat): https://fhukum.unpatti.ac.id/jurnal/tatohi/article/download/1217/681 , https://ugm.ac.id/id/berita/8566-ugm-sumbang-ruang-terbuka-luas-bagi-daerah/
- Kendala: lahan terbatas, dana, dan harga tanah mahal membuat banyak daerah sulit mencapainya: https://ugm.ac.id/id/berita/8566-ugm-sumbang-ruang-terbuka-luas-bagi-daerah/
- Fungsi resapan air hujan dan peneduh: https://core.ac.uk/download/230824635.pdf
Narasi menyebut undang-undang (aturan), bukan lembaga."""
PARAMS = dict(rth=30, publik=20)


def compute(p=PARAMS):
    privat = p["rth"] - p["publik"]; assert privat == 10
    return dict(state=dict(hari=1, penduduk=2, koin=1000, negara=["Indonesia"], kota="Jakarta"), rth=p["rth"], publik=p["publik"], privat=privat)


SCENES = [
    dict(id="s1", type="B_GREEN", variant="gray", kicker="INFO TATA RUANG", sub="kota tanpa pohon",
         say="Kota yang isinya cuma gedung dan jalan, rasanya *panas*, dan gampang *banjir*. Makanya di Indonesia ada aturannya: kota wajib menyisakan ruang hijau. Kira-kira berapa banyak?", data=["state"]),
    dict(id="s2", type="B_GREEN", variant="pct", kicker="ATURANNYA", sub="minimal 30 persen",
         say="Menurut undang-undang penataan ruang, ruang terbuka hijau di kota minimal *{rth|w} persen* dari luas wilayahnya. *{publik|w} persen* untuk publik, seperti taman dan hutan kota, dan *{privat|w} persen* privat, seperti halaman rumah.", data=["state", "rth", "publik", "privat"]),
    dict(id="s3", type="B_GREEN", variant="why", kicker="GUNANYA", sub="lebih dari sekadar hijau",
         say="Ruang hijau *menyerap* air hujan ke tanah, *meneduhkan* jalan dan rumah, dan jadi tempat warga jalan pagi dan anak-anak bermain. Halaman rumah yang ditanami juga ikut dihitung sebagai ruang hijau *privat*.", data=["state"]),
    dict(id="s4", type="B_GREEN", variant="real", kicker="KENYATAANNYA", sub="nggak gampang",
         say="Kenyataannya, banyak kota masih *kesulitan* mencapai angka itu. Lahannya terbatas, dan harga tanah di kota sudah *mahal*. Jadi setiap taman, jalur hijau, dan pohon di pinggir jalan itu *berharga*, dan sebaiknya dijaga.", data=["state"]),
    dict(id="s5", type="B_GREEN", variant="ask", kicker="BUMI KITA", sub="kalian yang menentukan",
         say="Di Bumi Kita, Jakarta kita masih kosong. Mau kita sisakan berapa persen buat ruang hijau? Tulis di komentar. Dan jangan lupa pilih *A* atau *B* di video Hari 1.", data=["state"]),
]
END_PAD = 2.5

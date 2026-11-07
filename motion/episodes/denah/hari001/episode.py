"""Denah Rumah Dunia, serial "Bumi Kita" Hari 1: bumi kosong, 2 penduduk, zona kota pertama di Jakarta (tata ruang).

Sumber fakta (dicek 6 Nov 2026):
- Iklim Jakarta tropis (musim hujan kira-kira Oktober-Mei, puncak Januari-Februari); wilayah utara/pesisir rawan banjir
  (hujan lokal, luapan sungai, banjir rob): https://www.thejakartapost.com/news/2015/02/21/jakarta-s-floods-and-changing-climate ,
  https://whatsnewindonesia.com/jakarta/feature/news/jakarta-and-floods-undeniable-blend
- Zonasi kota: lahan dibagi zona hunian, komersial/usaha, industri, dan ruang terbuka hijau; industri biasanya dijauhkan dari hunian
  karena bising, bau, dan lalu lintas truk: https://www.wikiwand.com/en/articles/Zoning ,
  https://www.designingbuildings.co.uk/wiki/Zoning_in_the_United_States
Koin = mata uang rekaan serial (bukan harga nyata)."""

STATE = dict(hari=1, penduduk=2, koin=1000, negara=["Indonesia"], kota="Jakarta")
RULES = dict(like_per_penduduk=10, follower_per_paspor=50)


def compute(p=None):
    s = STATE
    assert s["penduduk"] == 2 and s["koin"] == 1000 and s["hari"] == 1
    return dict(state=s, rules=RULES, penduduk=s["penduduk"], koin=s["koin"], like_per=RULES["like_per_penduduk"],
                opsi_a="kawasan perumahan", opsi_b="kawasan usaha", contoh=[["@pe***", "A, rumah dulu dong"], ["@ra***", "B! terus ke Jepang"]])


SCENES = [
    dict(id="s1", type="B_GLOBE_HOOK", kicker="HARI 1", sub="bumi masih kosong",
         say="Bumi ini masih *kosong*. Penduduknya cuma *dua orang*. Mau dibangun apa? Perumahan, mall, pabrik, sampai bandara, *kalian* yang menentukan lewat komentar dan like. Kita mulai dari *Jakarta*.", data=["state"]),
    dict(id="s2", type="B_CHARS", kicker="PENDUDUK PERTAMA", sub="cuma berdua",
         say="Kenalan dulu. Ini *Juragan Modal*. Dia bawa satu koper berisi *seribu koin*. Dan saya, *Kepala Bumi*, yang mengatur tata ruangnya. Juragan yang bayar, saya yang pusing.", data=["state"]),
    dict(id="s3", type="B_FLY", kicker="LOKASI PERTAMA", sub="Jakarta, Indonesia",
         say="Lokasi pertama: *Jakarta*. Iklimnya tropis, panas dan *lembap*. Musim hujannya panjang, kira-kira dari Oktober sampai Mei. Beberapa kawasan, terutama di utara dekat pantai, rawan *banjir*.", data=["state"]),
    dict(id="s4", type="B_ZONEMAP", kicker="TATA RUANG", sub="kota dibagi zona",
         say="Kota yang rapi tidak dibangun asal-asalan. Lahannya dibagi jadi *zona*: tempat *tinggal*, tempat *usaha*, kawasan *industri*, dan *ruang hijau*. Pabrik biasanya dijauhkan dari rumah, karena bising dan banyak truk.", data=["state"]),
    dict(id="s5", type="B_ZONE", variant="hunian", kicker="PILIHAN A", sub="kawasan perumahan",
         say="Pilihan *A*: bangun *kawasan perumahan* dulu. Penduduk baru butuh tempat tinggal. Lokasinya kita jauhkan dari pesisir utara yang rawan *banjir*, dan sisakan *taman* di tengahnya.", data=["state"]),
    dict(id="s6", type="B_ZONE", variant="usaha", kicker="PILIHAN B", sub="kawasan usaha",
         say="Pilihan *B*: bangun *kawasan usaha* dulu. Pasar, toko swalayan, dan kantor kecil. Ada *lapangan kerja*, uang mulai berputar, dan orang dari luar jadi tertarik pindah ke sini.", data=["state"]),
    dict(id="s7", type="B_COMPARE", variant="zona", kicker="A ATAU B?", sub="plus minus",
         say="Perumahan dulu: penduduk punya rumah, tapi belum ada tempat *kerja*. Usaha dulu: ekonomi jalan, tapi pekerjanya mau *tinggal* di mana? Dua-duanya ada risikonya.", data=["state"]),
    dict(id="s8", type="B_RULES", kicker="CARA MAIN", sub="kalian yang menentukan",
         say="Tulis *A* atau *B* di komentar. Tiap *sepuluh like*, kota kedatangan satu penduduk baru. Makin ramai, makin banyak yang harus dibangun: jalan, kereta, sampai *bandara*. Tulis juga *negara* yang harus kita kunjungi nanti. Sampai jumpa di Hari 2!", data=["state", "rules"]),
]
END_PAD = 1.5

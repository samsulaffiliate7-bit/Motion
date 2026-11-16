"""Kades Magang Juara, SIDE QUEST #2 (3D, sampingan tanpa voting A/B): desa belum punya nama.

Interaksi (variasi mekanik, keputusan pemilik 7 Nov): penonton menulis usulan nama desa; nama dengan LIKE komentar terbanyak
(tiga platform digabung) resmi dipasang di gapura. Sepi: kades memilih sendiri.
Sumber toponimi (dicek 7 Nov 2026):
- Awalan Sunda "ci" = air/sungai; Citarum: ci = air, tarum = tanaman (nila/pewarna); pola nama berunsur air seperti Ci, Ranca, Rawa;
  nama tempat Sunda berkaitan dengan alam dan lingkungan: https://ejournal.upi.edu/index.php/BS_JPBSP/article/download/9661/pdf ,
  https://jurnal.isbi.ac.id/index.php/Prosiding/article/download/4486/2299/11129 , https://mojok.co/terminal/nama-tempat-di-bandung-diambil-dari-nama-tumbuhan/
Contoh nama desa di video rekaan (bukan desa nyata yang disebut sebagai fakta)."""

META = dict(format="side quest", pilar="info + interaksi", tokoh="Kades Juara", lokasi="gapura kosong, peta, sungai, rawa, desa, gapura",
            hook="desa ini belum punya nama", variasi="komentar jadi keputusan", interaksi="usulan nama, like terbanyak menang")


def compute():
    return dict(hud=dict(hari=2, penduduk=5, anggaran=75), contoh=["Desa Sumur Biru", "Desa Lima Kelapa", "Desa Juara Jaya"])


SCENES = [
    dict(id="s1", type="K3_SQ_NONAME", kicker="SIDE QUEST", sub="desa tanpa nama",
         say="*Side quest!* Desa kita udah punya sumur, warga, dan sebentar lagi rumah. Tapi ada yang kelupaan dari Hari 1: desa ini *belum punya nama*.", data=["hud"]),
    dict(id="s2", type="K3_SQ_MAP", kicker="NAMA TEMPAT", sub="dari mana asalnya?",
         say="Di Indonesia, banyak nama tempat diambil dari *alam* di sekitarnya. Dari *air*, dari *tumbuhan*, sampai dari bentuk tanahnya.", data=["hud"]),
    dict(id="s3", type="K3_SQ_RIVER", kicker="CONTOH 1", sub="awalan Ci",
         say="Contohnya di tanah Sunda, awalan *Ci* artinya *air* atau sungai. Citarum misalnya: Ci berarti air, dan *tarum* itu nama tanaman yang dipakai jadi pewarna biru.", data=["hud"]),
    dict(id="s4", type="K3_SQ_SWAMP", kicker="CONTOH 2", sub="Ranca dan Rawa",
         say="Ada juga awalan *Ranca* dan *Rawa*, tanda tanahnya basah dan berair. Jadi nama tempat itu semacam *petunjuk*: dari namanya, orang bisa nebak alamnya.", data=["hud"]),
    dict(id="s5", type="K3_SQ_CLUES", kicker="DESA KITA", sub="petunjuknya apa?",
         say="Desa kita punya *sumur* air bersih, deretan pohon *kelapa*, dan tanah datar yang luas. Dari situ aja udah banyak ide nama. Misalnya *Desa Sumur Biru*, atau *Desa Lima Kelapa*.", data=["hud", "contoh"]),
    dict(id="s6", type="K3_SQ_NAMEVOTE", kicker="QUEST KALIAN", sub="kasih nama desa",
         say="Quest buat lo: tulis *nama desa* di komentar. Nama dengan *like* paling banyak, resmi dipasang di *gapura*. Kalau sepi, kades yang kasih nama sendiri.", data=["hud", "contoh"]),
]
END_PAD = 3.5

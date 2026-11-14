"""Denah Rumah Dunia, serial "Bumi Kita" sampingan LORE BUMI #1 (tanpa voting): tebak negara dari bentuk rumah.

Interaksi: penonton menulis skor tebakan (mis. "3/3") + negara yang ingin dikunjungi (masuk hitungan negara tujuan / paspor).
Sumber (dicek 7 Nov 2026):
- Yunani (Kepulauan Cyclades, mis. Santorini): dinding putih memantulkan sinar matahari sehingga rumah lebih sejuk; dulu dilabur kapur
  (campuran kapur, garam, air) yang murah dan bersifat disinfektan, termasuk untuk air hujan yang ditampung di atap:
  https://theculturetrip.com/europe/greece/articles/why-are-buildings-in-the-cyclades-painted-blue-and-white ,
  https://greekcitytimes.com/2023/11/26/the-practical-and-historical-reasons-behind-the-blue-and-white-colors-of-greek-island-houses/
- Swedia: cat merah Falu dari sisa tambang tembaga Falun (pigmen oksida besi), dicampur air, tepung gandum hitam, minyak biji rami;
  melindungi kayu dari cuaca dan membiarkan kayu "bernapas": https://en.wikipedia.org/wiki/Falun_red ,
  https://www.smithsonianmag.com/travel/why-are-all-swedish-cottages-painted-red-180975914/
- Islandia: rumah rumput (turf) karena kayu langka, tanah berumput melimpah dan dinding tebalnya menahan dingin:
  https://en.wikipedia.org/wiki/Architecture_of_Iceland , https://guidetoiceland.is/history-culture/the-ultimate-guide-to-turf-houses-in-iceland
Narasi tidak menyebut lembaga/perusahaan."""

META = dict(format="lore bumi: tebak negara", pilar="arsitektur dunia", tokoh="Kepala Bumi (narator)", lokasi="tebing Yunani, hutan Swedia, bukit Islandia, globe",
            hook="tiga rumah, tiga negara, bisa tebak?", variasi="daftar bernomor + tebakan", interaksi="komentar skor + negara tujuan")
STATE = dict(hari=1, penduduk=2, koin=1000, negara=["Indonesia"], kota="Jakarta")
RUMAH = [dict(no=1, negara="Greece"), dict(no=2, negara="Sweden"), dict(no=3, negara="Iceland")]


def compute():
    assert len(RUMAH) == 3 and [r["no"] for r in RUMAH] == [1, 2, 3]
    return dict(state=STATE, jumlah=len(RUMAH))


SCENES = [
    dict(id="s1", type="B_LORE_HOOK", kicker="LORE BUMI", sub="tebak negara",
         say="*Lore Bumi!* Ada *{jumlah|w} rumah* dari tiga negara. Tebak dari bentuknya aja, jawabannya muncul setelah hitungan ketiga. Siap? Kita mulai.", data=["state", "jumlah"]),
    dict(id="s2", type="B_HOUSE_GR", kicker="RUMAH 1", sub="tebak negaranya",
         say="Rumah nomor satu. Dindingnya *putih* semua, ada kubah warna *biru*, berderet di tebing pinggir laut. Negara mana? Tiga, dua, satu.", data=["state"]),
    dict(id="s3", type="B_REVEAL", variant="gr", kicker="JAWABAN 1", sub="Yunani",
         say="Jawabannya *Yunani*, di pulau-pulau Laut Aegea. Dinding putih *memantulkan* panas matahari, jadi rumahnya lebih adem. Dulu dilabur *kapur* yang murah, dan bisa membantu membersihkan air hujan yang ditampung di atap.", data=["state"]),
    dict(id="s4", type="B_HOUSE_SW", kicker="RUMAH 2", sub="tebak negaranya",
         say="Rumah nomor dua. Rumah *kayu* warna *merah tua*, sudutnya putih, di tengah hutan pinus dekat danau. Negara mana? Tiga, dua, satu.", data=["state"]),
    dict(id="s5", type="B_REVEAL", variant="sw", kicker="JAWABAN 2", sub="Swedia",
         say="Ini *Swedia*. Warna merahnya berasal dari sisa *tambang tembaga*, dicampur tepung dan minyak jadi cat. Murah, dan bikin kayu lebih *awet* menghadapi cuaca dingin.", data=["state"]),
    dict(id="s6", type="B_HOUSE_IS", kicker="RUMAH 3", sub="tebak negaranya",
         say="Rumah nomor tiga, paling unik. Atap dan dindingnya ditumbuhi *rumput*. Negara mana? Tiga, dua, satu.", data=["state"]),
    dict(id="s7", type="B_REVEAL", variant="is", kicker="JAWABAN 3", sub="Islandia",
         say="Ini *Islandia*. Dulu pohon di sana sedikit, jadi *kayu* susah dicari. Yang banyak justru tanah berumput, lalu ditumpuk tebal jadi *penahan dingin* alami.", data=["state"]),
    dict(id="s8", type="B_LORE_ASK", kicker="SKOR LO?", sub="tulis di komentar",
         say="Lo dapat berapa? Tulis skor lo di komentar, misalnya *tiga dari tiga*. Tulis juga *negara* yang mau kita kunjungi di Bumi Kita. Negara yang paling banyak disebut, rumahnya kita bangun nanti.", data=["state"]),
]
END_PAD = 2.0
SPLIT_SHIFT = {1: 2, 3: 1, 5: 1}

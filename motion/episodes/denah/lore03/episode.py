"""Denah Rumah Dunia LORE BUMI #3 (tayang 11 Nov 2026 siang): tebak negara seri 2 (Tiongkok tulou, Italia trulli, Indonesia rumah gadang).

Interaksi: skor tebakan + negara tujuan (sama seperti Lore #1; hasil Lore #1 belum ada komentar negara, dicatat 9 Nov).
Sumber (dicek 9 Nov 2026):
- Tulou Fujian (Tiongkok): rumah tanah besar berbentuk bulat (banyak juga persegi), dinding tanah padat tebal, dihuni banyak keluarga satu marga,
  dibangun juga untuk pertahanan; Situs Warisan Dunia UNESCO 2008: https://whc.unesco.org/en/list/1113 , https://en.wikipedia.org/wiki/Fujian_tulou
- Trulli Alberobello (Italia): rumah batu kering tanpa semen/adukan, atap kerucut dari lempengan batu kapur; Warisan Dunia UNESCO:
  https://whc.unesco.org/en/list/787
- Rumah gadang (Minangkabau, Sumatera Barat, Indonesia): rumah panggung, atap gonjong melengkung runcing seperti tanduk kerbau, dulu beratap ijuk:
  https://rri.co.id/en/hiburan/2528392/mengenal-rumah-gadang-mahakarya-arsitektur-dan-kedalaman-filosofi-budaya-minang ,
  https://www.goodnewsfromindonesia.id/2023/11/01/membongkar-rahasia-rumah-gadang-rumah-tradisional-minangkabau-di-sumatera-barat
Narasi tidak menyebut lembaga."""

META = dict(format="lore bumi: tebak negara", pilar="arsitektur dunia", tokoh="Kepala Bumi (narator)", lokasi="lembah Fujian, kebun zaitun Puglia, lereng Sumatra, globe",
            hook="3 rumah unik, tebak negaranya", variasi="daftar bernomor + tebakan", interaksi="skor + negara tujuan", suara="Sulafat")


def compute():
    return dict(state=dict(hari=5, penduduk=12, koin=200, negara=["Indonesia"], kota="Jakarta"))


SCENES = [
    dict(id="s1", type="D_LORE03_HOOK", kicker="LORE BUMI", sub="tebak negara #2",
         say="*Lore Bumi* balik lagi! Tiga rumah paling unik di dunia. Tebak negaranya sebelum hitungan habis. Rumah ketiga paling *susah*.", data=["state"]),
    dict(id="s2", type="D_LORE03_TULOU", kicker="RUMAH 1", sub="tebak negaranya",
         say="Rumah nomor satu: bentuknya *bulat* raksasa, dindingnya dari *tanah* yang dipadatkan, dan satu rumah dihuni *banyak keluarga* sekaligus. Negara mana? Tiga, dua, satu.", data=["state"]),
    dict(id="s3", type="D_LORE03_ANS", variant="cn", kicker="JAWABAN 1", sub="Tiongkok",
         say="Ini *Tiongkok*, namanya *tulou* di Fujian. Dindingnya tebal, dulu juga dipakai untuk *bertahan*. Sekarang jadi warisan dunia.", data=["state"]),
    dict(id="s4", type="D_LORE03_TRULLO", kicker="RUMAH 2", sub="tebak negaranya",
         say="Rumah nomor dua: putih kecil dengan atap *kerucut* dari batu, berderet di antara kebun *zaitun*. Negara mana? Tiga, dua, satu.", data=["state"]),
    dict(id="s5", type="D_LORE03_ANS", variant="it", kicker="JAWABAN 2", sub="Italia",
         say="Ini *Italia*, namanya *trulli*. Batunya disusun tanpa semen sama sekali, dan atapnya dari lempengan batu kapur. Kuat sampai sekarang.", data=["state"]),
    dict(id="s6", type="D_LORE03_GADANG", kicker="RUMAH 3", sub="tebak negaranya",
         say="Rumah nomor tiga: rumah panggung panjang, atapnya melengkung *runcing* seperti *tanduk*. Negara mana? Tiga, dua, satu.", data=["state"]),
    dict(id="s7", type="D_LORE03_ANS", variant="id", kicker="JAWABAN 3", sub="Indonesia!",
         say="Ini *Indonesia*! *Rumah gadang* dari Minangkabau, Sumatera Barat. Atapnya disebut *gonjong*, dulu ditutup ijuk. Tulis skor lo di komentar, dan negara yang mau kita kunjungi.", data=["state"]),
]
END_PAD = 2.0

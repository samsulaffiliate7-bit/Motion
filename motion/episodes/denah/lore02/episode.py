"""Denah Rumah Dunia, serial "Bumi Kita" sampingan LORE BUMI #2 (tanpa voting utama): rumah yang bentuknya diatur pajak.

Interaksi: komentar A/B/C = cara menghitung pajak rumah di Bumi Kita (lebar / jendela / tinggi); terbanyak jadi aturan kota.
Sumber (dicek 7 Nov 2026):
- Rumah kanal Amsterdam: sempit dan dalam, salah satu penjelasan populer pajak dihitung dari lebar muka (ada yang meragukan urutan sebab-akibatnya,
  jadi narasi memakai "salah satu penjelasannya"); tangga sempit, barang diangkat dengan katrol di puncak atap lewat jendela;
  sengaja dibuat sedikit condong ke depan supaya barang tidak membentur fasad:
  https://dutchreview.com/culture/amsterdam-canal-houses/ , https://www.expatica.com/nl/about/culture-history/the-history-of-crooked-amsterdam-houses-are-they-safe-1126943/
- Pajak jendela Inggris dan Wales mulai 1696, dicabut 1851; banyak pemilik menutup jendela (bata) untuk mengurangi pajak:
  https://en.wikipedia.org/wiki/Window_tax , https://www.designingbuildings.co.uk/wiki/Window_tax
Narasi tidak menyebut lembaga."""

META = dict(format="lore bumi: fakta aneh", pilar="arsitektur dunia + aturan", tokoh="Kepala Bumi (narator), Juragan Modal", lokasi="kanal Amsterdam, katrol atap, rumah Inggris, globe, balai kota Bumi",
            hook="rumah aneh gara-gara pajak", variasi="hook angka + pilihan ABC", interaksi="komentar A/B/C aturan pajak Bumi Kita")
STATE = dict(hari=1, penduduk=2, koin=1000, negara=["Indonesia"], kota="Jakarta")
PARAMS = dict(tahun_mulai=1696, tahun_cabut=1851)


def compute(p=PARAMS):
    lama = p["tahun_cabut"] - p["tahun_mulai"]; assert lama == 155
    return dict(state=STATE, tahun=p["tahun_mulai"], lama=lama)


SCENES = [
    dict(id="s1", type="B_TAX_HOOK", kicker="LORE BUMI", sub="rumah vs pajak",
         say="*Lore Bumi!* Ada rumah yang bentuknya aneh gara-gara satu hal: *pajak*. Ada yang sempit banget, ada yang miring, sampai jendelanya ditutup *bata*.", data=["state"]),
    dict(id="s2", type="B_REVEAL", variant="nl", kicker="NEGARA 1", sub="Belanda",
         say="Pertama, kita terbang ke *Belanda*.", data=["state"]),
    dict(id="s3", type="B_CANAL", kicker="RUMAH KANAL", sub="sempit tapi panjang",
         say="Rumah di tepi kanal Amsterdam itu *sempit*, tapi memanjang jauh ke belakang. Salah satu penjelasannya: dulu pajaknya dihitung dari *lebar* muka rumah. Makin lebar, makin mahal.", data=["state"]),
    dict(id="s4", type="B_HOIST", kicker="KATROL ATAP", sub="pindahan lewat jendela",
         say="Karena sempit, tangganya *curam* dan kecil. Jadi barang besar diangkat pakai *katrol* di puncak atap, masuk lewat jendela. Rumahnya sengaja dibuat sedikit *condong* ke depan, biar barang nggak membentur dinding.", data=["state"]),
    dict(id="s5", type="B_REVEAL", variant="uk", kicker="NEGARA 2", sub="Inggris",
         say="Sekarang ke *Inggris*.", data=["state"]),
    dict(id="s6", type="B_WINDOWS", kicker="PAJAK JENDELA", sub="mulai 1696",
         say="Mulai tahun *{tahun|w}*, ada *pajak jendela*. Makin banyak jendela, makin mahal pajaknya. Banyak pemilik rumah akhirnya *menutup* jendelanya pakai bata. Aturan ini bertahan sampai *{lama|w} tahun*.", data=["state", "tahun", "lama"]),
    dict(id="s7", type="B_TAX_ASK", kicker="BUMI KITA", sub="pilih aturan pajak",
         say="Kalau Bumi Kita bikin pajak rumah, enaknya dihitung dari apa? *A* lebar rumah, *B* jumlah jendela, atau *C* tinggi rumah. Tulis di komentar. Pilihan terbanyak jadi *aturan* di kota kita.", data=["state"]),
]
END_PAD = 2.5

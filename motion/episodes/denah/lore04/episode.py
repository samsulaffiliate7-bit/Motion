"""Denah Rumah Dunia LORE BUMI #4 (tayang 15 Nov 2026 siang): kenapa rumah dibuat panggung? (Kamboja danau Tonle Sap, rumah panggung Nusantara) -> pesisir utara Bumi Kita.

Topik dari docs/KALENDER-KD.md (LORE: rumah panggung dunia) + menyambung banjir rob Hari 4 dan usulan "tiang penghadang banjir" (YouTube Hari 3, @Al***).
Sumber (dicek 10 Nov 2026):
- Rumah panggung (stilt house): ditinggikan di atas tiang untuk melindungi dari banjir/air pasang, menjauhkan hewan (ular, tikus), dan memberi aliran udara di bawah lantai:
  https://en.wikipedia.org/wiki/Stilt_house , https://id.wikipedia.org/wiki/Rumah_panggung
- Desa-desa di danau Tonle Sap, Kamboja: rumah panggung tinggi karena muka air danau naik-turun besar antara musim kemarau dan musim hujan:
  https://en.wikipedia.org/wiki/Tonl%C3%A9_Sap (bagian ekologi: danau membesar di musim hujan), https://en.wikipedia.org/wiki/Kampong_Phluk
- Rumah adat Nusantara banyak berbentuk panggung (contoh rumah Bugis/Melayu), kolong dipakai menyimpan barang/ternak: https://id.wikipedia.org/wiki/Rumah_panggung
Tanpa angka ketinggian (sumber berbeda-beda). Narasi tidak menyebut lembaga.
Interaksi (variasi): komentar PANGGUNG (pesisir utara Bumi Kita boleh dibangun rumah panggung) atau HIJAU (pesisir jadi ruang hijau saja); terbanyak jadi aturan."""

META = dict(format="lore bumi: kenapa?", pilar="arsitektur dunia + tata ruang", tokoh="Kepala Bumi (narator)", lokasi="rumah naik ke atas tiang saat air datang, desa danau Kamboja, rumah panggung Nusantara + kolong, pesisir utara Bumi Kita",
            hook="rumah yang 'kabur' dari banjir", variasi="daftar 3 alasan + pilihan kata", interaksi="komentar PANGGUNG atau HIJAU untuk pesisir utara", suara="Sulafat")


def compute():
    return dict(state=dict(hari=7, penduduk=47, koin=150, negara=["Indonesia"], kota="Jakarta"))


SCENES = [
    dict(id="s1", type="D_LORE04_HOOK", kicker="LORE BUMI", sub="rumah kabur dari banjir",
         say="*Lore Bumi!* Air datang, tapi rumahnya tetap *kering*. Rahasianya cuma satu: rumahnya *naik ke atas tiang*. Kenapa banyak rumah di dunia dibuat begini?", data=["state"]),
    dict(id="s2", type="D_LORE04_LAKE", kicker="KAMBOJA", sub="danau naik turun",
         say="Kita terbang ke *Kamboja*, ke danau besar bernama *Tonle Sap*. Di musim hujan, danaunya *membesar* dan airnya naik jauh. Makanya rumah di desa-desa sekitarnya berdiri di atas tiang yang *tinggi banget*.", data=["state"]),
    dict(id="s3", type="D_LORE04_NUSA", kicker="INDONESIA", sub="rumah panggung",
         say="Di Indonesia juga banyak. Rumah adat di berbagai daerah dibuat *panggung*. Kolong di bawahnya dipakai buat menyimpan barang, bahkan buat *ternak*.", data=["state"]),
    dict(id="s4", type="D_LORE04_THREE", kicker="3 ALASAN", sub="kenapa panggung?",
         say="Jadi ada tiga alasan. Satu, aman dari *banjir* dan air pasang. Dua, hewan seperti ular dan tikus *susah masuk*. Tiga, angin bisa lewat di bawah lantai, rumah jadi lebih *sejuk*.", data=["state"]),
    dict(id="s5", type="D_LORE04_BUMI", kicker="BUMI KITA", sub="pesisir utara",
         say="Sekarang lihat kota kita. Pesisir utara Jakarta di Bumi Kita kemarin kena *banjir rob*. Ada yang usul bikin *tiang penghadang banjir*. Gimana kalau rumahnya sekalian dibikin *panggung*?", data=["state"]),
    dict(id="s6", type="D_LORE04_ASK", kicker="KALIAN PILIH", sub="PANGGUNG atau HIJAU",
         say="Tulis *PANGGUNG* kalau pesisir utara boleh dibangun rumah panggung. Tulis *HIJAU* kalau pesisir itu dijadikan ruang hijau saja, tanpa rumah. Pilihan terbanyak jadi *aturan kota*.", data=["state"]),
]
END_PAD = 2.5

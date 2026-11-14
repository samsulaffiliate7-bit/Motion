"""Kades Magang Juara Hari 8 (tayang 15 Nov 2026 malam): malam pertama 94 lampu surya menyala, lalu kejadian: tikus menyerbu kebun baru, oyen jadi pahlawan, pelajaran hama, quest nama sapi.

Lanjutan Hari 7 (1.227 penduduk, 94 lampu surya dari follower, kebun + sapi dari komentar @Ra*** "daftar jadi sapi"). Kejadian = keputusan cerita (fiksi).
Sumber pengendalian tikus (dicek 10 Nov 2026):
- Burung hantu (serak jawa / Tyto alba) dipakai petani sebagai pengendali hayati tikus; petani memasang rumah burung hantu (pagupon) di sawah/kebun:
  https://en.wikipedia.org/wiki/Western_barn_owl (bagian "Relationship with humans": dipakai mengendalikan tikus di perkebunan),
  https://id.wikipedia.org/wiki/Serak_jawa
- Pengendalian tikus dasar: bersihkan semak/tempat sembunyi, simpan pakan dan hasil panen di wadah tertutup:
  https://en.wikipedia.org/wiki/Rodent_control (bagian sanitasi/exclusion)
Interaksi (variasi mekanik): kasih nama sapi desa; nama dengan like komentar terbanyak dipakai (dihitung di episode yang diproduksi sesudah ini tayang)."""

META = dict(format="serial Hari N (kejadian)", pilar="bangun desa", tokoh="Kades Juara, penjaga kebun, kucing oyen, sapi", lokasi="kebun malam bulan purnama, lorong bedeng senter, oyen mengejar tikus, rumah burung hantu, kandang sapi",
            hook="desa terang, tapi separuh bibit hilang", variasi="plot kejadian + kasih nama", interaksi="kasih nama sapi, like terbanyak menang", suara="Achird")
PREV = dict(hari=7, penduduk=1227, anggaran=43)


def compute():
    assert PREV["penduduk"] == 1227
    return dict(hud=dict(hari=8, penduduk=PREV["penduduk"], anggaran=PREV["anggaran"]))


SCENES = [
    dict(id="s1", type="K_H008_HOOK", kicker="HARI 8", sub="kebun diserbu",
         say="Hari kedelapan. Malam ini sembilan puluh empat lampu surya menyala, desa *terang benderang*. Tapi pagi harinya, *separuh bibit* di kebun hilang! Yang tersisa cuma lubang kecil dan *jejak kaki* mungil.", data=["hud"]),
    dict(id="s2", type="K_H008_WATCH", kicker="RONDA KEBUN", sub="siapa pelakunya?",
         say="Penjaga kebun langsung *ronda* bawa senter. Lampu diarahkan ke bedeng paling ujung, dan kelihatan mata kecil berkilat. Pelakunya: *tikus*. Bukan satu, tapi *serombongan*!", data=["hud"]),
    dict(id="s3", type="K_H008_OYEN", kicker="PAHLAWAN", sub="si oranye",
         say="Seribu lebih warga panik, tapi ada yang *nggak*. Kucing *oyen* turun dari lemari, lari ke kebun, dan dalam sekejap tikus-tikus itu *kabur* ke semak. Oyen resmi jadi *satpam kebun*.", data=["hud"]),
    dict(id="s4", type="K_H008_LESSON", kicker="PELAJARAN", sub="biar nggak balik lagi",
         say="Tapi satu kucing nggak cukup. Pelajarannya: bersihkan *semak* tempat tikus sembunyi, simpan bibit di wadah *tertutup*, dan pasang *rumah burung hantu*. Di banyak kebun, burung hantu jadi pemburu tikus paling rajin.", data=["hud"]),
    dict(id="s5", type="K_H008_COW", kicker="SAPI DESA", sub="belum punya nama",
         say="Sementara itu di kandang, sapi baru kita tidur nyenyak, nggak peduli ribut-ribut. Masalahnya, sapi ini *belum punya nama*. Masa dipanggil sapi terus?", data=["hud"]),
    dict(id="s6", type="K_H008_ASK", kicker="QUEST KALIAN", sub="kasih nama sapi",
         say="Quest malam ini: *kasih nama* buat sapi desa. Tulis di komentar, dan nama dengan *like paling banyak* jadi nama resminya. Hasilnya, *dua hari lagi*.", data=["hud"]),
]
END_PAD = 2.5

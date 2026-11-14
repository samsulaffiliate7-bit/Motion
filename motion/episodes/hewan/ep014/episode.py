"""Hewan Berdasi Kotor ep014 (3D, konsep v3): rapat panitia 17-an rimba 4 jam tanpa keputusan; format Pepatah Baru.
Fabel fiksi; panitia dan acara rekaan."""
META = {"format": "Pepatah Baru", "pilar": "panitia dan organisasi", "tokoh": ["Kucing (ketua panitia)", "Beo", "Bunglon", "Tikus (notulen)", "Kerbau", "Burung Hantu"],
        "lokasi": ["aula RT malam (jam 19)", "aula RT (jam 20-22)", "meja notulen", "aula RT (jam 23)", "aula RT kosong (pepatah)"],
        "hook": "kontras", "variasi": [1, 2], "suara": "Puck"}


def compute():
    jam = 23 - 19; assert jam == 4
    return dict(jam=jam, bahas=[["🎨 warna spanduk?"], ["🎤 siapa pegang mic?"], ["👍 Bunglon: setuju semua"]], bahas_cues=["warna spanduk", "pegang mic", "Bunglon setuju"])


SCENES = [
    dict(id="s1", type="H_RAPAT", kicker="PEPATAH BARU", sub="aula RT, 19.00", say="Rapat panitia tujuh belasan rimba dimulai jam tujuh malam. Agendanya cuma satu: *tanggal lomba*. Kopi segelas, gorengan sepiring. Semua yakin, setengah jam juga beres.", data=[]),
    dict(id="s2", type="H_RAPAT", variant="jam", kicker="DUA JAM KEMUDIAN", sub="aula RT", say="Jam delapan, Kucing membahas warna spanduk. Jam sembilan, Beo membahas siapa yang pegang mic. Jam sepuluh, Bunglon setuju dengan semua usulan, termasuk yang saling bertentangan. Kopinya sudah *gelas keempat*.", data=[]),
    dict(id="s3", type="H_NOTULEN", kicker="NOTULEN", sub="catatan Tikus", say="Tikus, sang notulen, mencatat semuanya. Empat halaman penuh. Tapi di kolom keputusan, cuma ada satu baris: *dibahas di rapat berikutnya*.", data=[]),
    dict(id="s4", type="H_RAPAT", variant="kerbau", kicker="JAM SEBELAS", sub="aula RT", say="Jam sebelas, Kerbau angkat tangan. Pertanyaannya sederhana: jadi tanggal berapa? Semua diam. Lalu Kucing menjawab dengan yakin: *nanti kita rapatkan lagi*.", data=[]),
    dict(id="s5", type="H_RAPAT", variant="end", kicker="RAPAT BUBAR", sub="aula RT kosong", say="Rapat bubar, *empat jam* tanpa tanggal. Pepatah barunya: rapat yang tidak memutuskan apa-apa, cuma memutuskan *rapat berikutnya*. Panitia lo begini juga? Cerita di komentar.", data=[]),
]
END_PAD = 3

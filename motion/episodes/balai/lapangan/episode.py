"""Balai Desa Bocor (konsep v2, liputan warga): lapangan bola diresmikan, gawangnya "tahun depan". Cerita fiksi, desa dan tokoh rekaan."""
PARAMS = {}


def compute(p=PARAMS):
    return dict(papan_txt="Lapangan Sepak Bola Desa", board=["LAPANGAN DESA", "Sepak Bola Bocor Indah", "Gawang: tahap dua", "Diresmikan!"], field=True, janji="“TAHUN DEPAN”", janji_cue="tahun depan",
                iv=dict(who="pemuda", name="Kapten Tim Desa", role="Karang Taruna", q1="“Latihan tanpa gawang itu kayak ujian tanpa soal.”", q2="“Skor kemarin: 42 lawan 39.”", q2cue="Skor"),
                tl_notes=[["papan nama baru", "papan nama"], ["lampu sorot ditambah", "Lampu"], ["gawang: masih tahap dua", "Gawangnya"]])


SCENES = [
    dict(id="s1", type="BL_FIELD", variant="resmi", kicker="LIPUTAN WARGA", sub="lapangan baru", say="Desa kami akhirnya punya *lapangan sepak bola*. Rumputnya hijau, garisnya rapi, pitanya sudah digunting. Cuma satu yang kurang: *gawangnya*.", data=["papan_txt", "board", "field", "janji", "janji_cue", "iv", "tl_notes"]),
    dict(id="s2", type="BL_INTERVIEW", variant="pemuda", kicker="KATA WARGA", sub="Kapten tim desa", say="Menurut kapten tim desa, latihan tanpa gawang itu seperti *ujian tanpa soal*. Mau menendang ke mana, semua jadi *gol*. Skor latihan kemarin: *empat puluh dua* lawan *tiga puluh sembilan*.", data=["papan_txt", "board", "field", "janji", "janji_cue", "iv", "tl_notes"]),
    dict(id="s3", type="BL_PODIUM", kicker="PENJELASAN", sub="Pak Kades Janji", say="Pak Kades Janji menjelaskan, gawang masuk anggaran *tahap dua*. Kapan tahap dua? Jawabannya singkat: *tahun depan*.", data=["papan_txt", "board", "field", "janji", "janji_cue", "iv", "tl_notes"]),
    dict(id="s4", type="BL_FIELD", variant="kids", kicker="SEMENTARA ITU", sub="anak-anak", say="Anak-anak tidak mau menunggu tahun depan. Mereka pakai *sandal* sebagai tiang gawang. Masalahnya, setiap kali hujan, gawangnya *ikut hanyut*.", data=["papan_txt", "board", "field", "janji", "janji_cue", "iv", "tl_notes"]),
    dict(id="s5", type="BL_TIMELAPSE", kicker="TIGA BULAN KEMUDIAN", sub="papan nama baru", say="Tiga bulan kemudian, lapangan dapat papan nama baru yang lebih besar. Lampu sorotnya juga ditambah. Gawangnya? Masih *tahap dua*.", data=["papan_txt", "board", "field", "janji", "janji_cue", "iv", "tl_notes"]),
    dict(id="s6", type="BL_FIELD", variant="end", kicker="HASIL AKHIR", sub="gawang warga", say="Akhirnya bapak-bapak ronda patungan bambu dan jaring bekas. Gawangnya jadi dalam *satu sore*, dan langsung dipakai pertandingan persahabatan dengan desa sebelah. Di tempat lo, fasilitas apa yang masih menunggu tahap dua? Tulis di komentar.", data=["papan_txt", "board", "field", "janji", "janji_cue", "iv", "tl_notes"]),
]
END_PAD = 1.5

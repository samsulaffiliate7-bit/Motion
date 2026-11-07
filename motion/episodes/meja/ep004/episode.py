"""Meja Seberang Bos ep004 (3D): chat bos jam 9 malam, "besok pagi ya". Cerita fiksi, dua sisi.
Tidak membahas aturan hukum lembur; hanya komunikasi kerja."""

PARAMS = dict(jam_chat="21.03", jam_lembur=2, jam_bos_buka=10)


def compute(p=PARAMS):
    assert p["jam_bos_buka"] > 9
    return dict(chat=[["Bos", "File laporan tolong dirapikan ya", "21.03"], ["Bos", "Besok pagi ya 🙏", "21.03"]],
                tips=[["Bos", "Tulis kapan tepatnya: \"besok jam 9, nggak usah malam ini\""], ["Staf", "Ragu? Tanya balik singkat: \"Siap, saya kerjakan besok pagi ya, Pak?\""]])


SCENES = [
    dict(id="s1", type="M_PHONE", kicker="JAM 21.03", sub="HP bunyi", say="Jam sembilan malam, HP bunyi. Chat dari bos: *besok pagi ya*. Staf langsung *nggak bisa tidur*. Bosnya? Sudah *tidur duluan*. Kita lihat dua sisinya.", data=["chat"]),
    dict(id="s2", type="M_HOME", kicker="SISI STAF", sub="di rumah", say="Buat staf, chat itu kayak *alarm kebakaran*. Makan malam ditunda, laptop dibuka lagi, padahal jam kerja sudah selesai dari *sore*.", data=["chat"]),
    dict(id="s3", type="M_CAR", kicker="SISI BOS", sub="di jalan pulang", say="Buat bos, chat itu justru supaya *nggak lupa*. Dia kepikiran tugas itu di jalan pulang, langsung ketik, lalu lanjut istirahat. Maksudnya, dikerjakan *besok*, bukan malam ini.", data=["chat"]),
    dict(id="s4", type="M_SPLIT", kicker="SALAH PAHAM", sub="dua arti", say="Masalahnya, kata *besok pagi* dibaca beda. Bos maksudnya: mulai dikerjakan besok. Staf membacanya: harus sudah *jadi* besok pagi.", data=["chat"]),
    dict(id="s5", type="M_CLOCK", kicker="AKIBATNYA", sub="lembur sampai pagi", say="Akhirnya staf begadang sampai jam *dua*. Besok paginya, bos baru buka file itu jam *sepuluh*, sambil santai ngopi.", data=["chat"]),
    dict(id="s6", type="M_BOARD", kicker="SOLUSINYA", sub="dua kalimat", say="Solusinya sederhana. Bos, tulis *kapan* tepatnya: besok jam sembilan, nggak usah malam ini. Staf, kalau ragu, *tanya balik* singkat: siap, saya kerjakan besok pagi ya, Pak?", data=["tips"]),
    dict(id="s7", type="M_LIFT", kicker="GIMANA MENURUT LO?", sub="tim staf atau tim bos", say="Lo pernah dapat chat jam segini? Lo *tim staf*, atau *tim bos*? Tulis di komentar.", data=["chat"]),
]
END_PAD = 2.0

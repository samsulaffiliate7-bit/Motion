"""Meja Seberang Bos ep005 (3D): rapat 1 jam untuk info 2 kalimat. Cerita fiksi, dua sisi."""
PARAMS = dict(menit_rapat=60, peserta=8)


def compute(p=PARAMS):
    jam_orang = p["menit_rapat"] * p["peserta"] // 60; assert jam_orang == 8
    return dict(split=["infonya harus sampai", "waktu kerja habis"], jam_orang=jam_orang, peserta=p["peserta"], email=["Mulai Senin, laporan dikirim tiap Jumat jam 3.", "Formatnya tetap sama."],
                tips=[["Bos", "Info satu arah? Kirim tertulis, rapat cukup untuk diskusi"], ["Staf", "Diundang rapat? Tanya: \"Agendanya apa, Pak? Saya siapkan apa?\""]])


SCENES = [
    dict(id="s1", type="M_MEETROOM", variant="long", kicker="RAPAT 09.00", sub="satu jam penuh", say="Rapat jam sembilan, satu jam penuh, *delapan orang*. Isinya? Ternyata cuma *dua kalimat* pengumuman. Staf kesal, bos merasa perlu. Kita bedah dua sisinya.", data=["email", "peserta"]),
    dict(id="s2", type="M_SCREEN", kicker="SISI STAF", sub="harusnya bisa lewat email", say="Buat staf, isi rapat itu bisa ditulis di *satu email*. Dibaca semenit, beres. Sementara kerjaan di meja *menumpuk* selama satu jam.", data=["email"]),
    dict(id="s3", type="M_PANTRY", kicker="SISI BOS", sub="di pantry", say="Buat bos, rapat itu cara memastikan semua orang *dengar langsung*. Pengalamannya, email sering *nggak dibaca*, lalu ada yang bilang nggak tahu.", data=["email"]),
    dict(id="s4", type="M_SPLIT", kicker="SALAH PAHAM", sub="dua kekhawatiran", say="Jadi bos takut infonya *nggak sampai*. Staf takut waktunya *habis*. Padahal satu jam kali delapan orang, itu *delapan jam kerja*.", data=["email", "split"]),
    dict(id="s5", type="M_MEETROOM", variant="short", kicker="JALAN TENGAH", sub="rapat berdiri", say="Jalan tengahnya: kirim infonya tertulis dulu, lalu kalau perlu, rapat *berdiri* sepuluh menit, khusus untuk *pertanyaan*.", data=["email"]),
    dict(id="s6", type="M_BOARD", kicker="SOLUSINYA", sub="dua kalimat", say="Bos, kalau infonya satu arah, *tulis* saja, rapat dipakai untuk diskusi. Staf, kalau diundang rapat, tanya *agendanya* dulu, biar bisa siap dan rapatnya lebih cepat.", data=["tips"]),
    dict(id="s7", type="M_PANTRY", variant="outro", kicker="GIMANA MENURUT LO?", sub="tim staf atau tim bos", say="Kantor lo sering rapat yang harusnya bisa lewat email? Lo *tim staf*, atau *tim bos*? Tulis di komentar.", data=["email"]),
]
END_PAD = 2.0

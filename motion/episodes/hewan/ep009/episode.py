"""Hewan Berdasi Kotor ep009 (3D, konsep v3): tugas kelompok lima ekor, yang mengerjakan cuma Tikus; format Dari Mata Korban (Tikus bercerita) + plot twist lembar kontribusi.
Fabel fiksi; kampus, dosen, dan nilai rekaan."""
META = {"format": "Dari Mata Korban", "pilar": "kampus", "tokoh": ["Tikus Kecil (narator)", "Kucing Berdasi", "Beo (tamu)", "Bunglon (tamu)", "Ular (tamu)", "Burung Hantu (dosen)"],
        "lokasi": ["perpustakaan kampus malam", "perpustakaan (grup kelompok)", "ruang kelas (presentasi)", "ruang kelas (pertanyaan dosen)", "koridor kampus (papan nilai)"],
        "hook": "kontras", "variasi": [4, 5]}


def compute():
    anggota = ["Tikus", "Kucing", "Beo", "Bunglon", "Ular"]; assert len(anggota) == 5
    return dict(anggota=len(anggota),
                alasan=[["Kucing", "gue koordinator ya"], ["Beo", "nama gue jangan lupa"], ["Bunglon", "setuju aja sama kalian"], ["Ular", "nanti gue transfer ide"]],
                alasan_cues=["Kucing", "Beo", "Bunglon", "Ular"],
                kontribusi=[["Tikus", "bab 1-5, slide, daftar pustaka"], ["Kucing", "“koordinasi”"], ["Beo", "—"], ["Bunglon", "“setuju”"], ["Ular", "ide (belum sampai)"]],
                nilai=[["Tikus", "A"], ["Kucing", "C"], ["Beo", "C"], ["Bunglon", "C"], ["Ular", "C"]])


SCENES = [
    dict(id="s1", type="H_LIB", kicker="DARI MATA TIKUS", sub="perpus, 23.00", say="Gue Tikus. Ini tugas kelompok *lima ekor*. Yang ngerjain dari bab satu sampai daftar pustaka: *gue doang*. Jam sebelas malam, empat kursi di sebelah gue kosong. Tapi nama mereka ada di sampul.", data=[]),
    dict(id="s2", type="H_LIB", variant="chat", kicker="GRUP KELOMPOK", sub="H-1 deadline", say="Grup kelompok ramai alasan. Kucing: gue koordinator ya. Beo: nama gue jangan lupa. Bunglon: gue setuju aja sama kalian. Ular: lagi sibuk, nanti gue *transfer ide*. Idenya nggak pernah sampai.", data=[]),
    dict(id="s3", type="H_CLASS", kicker="HARI PRESENTASI", sub="kelas", say="Hari presentasi, Kucing maju paling depan. Slide gue dibacakan dengan lancar, seolah dia yang begadang. Beo mengangguk. Bunglon tepuk tangan. Gue? Disuruh *pegang remote*.", data=[]),
    dict(id="s4", type="H_CLASS", variant="tanya", kicker="PLOT TWIST", sub="dosen bertanya", say="Lalu Bu Burung Hantu, dosennya, bertanya: kenapa datanya dari tahun itu? Kucing diam. Beo menoleh ke Bunglon. Bunglon menoleh ke gue. Bu dosen lalu membuka lembar yang gue selipkan di belakang: *lembar kontribusi*.", data=[]),
    dict(id="s5", type="H_BOARD", kicker="SEMINGGU LAGI", sub="papan nilai", say="Nilainya ditempel seminggu kemudian, dibagi sesuai kontribusi. Gue dapat A. Empat lainnya dapat C. Pelajaran dari gue: kerja boleh bareng, tapi *catat siapa yang kerja*. Pernah jadi Tikus di kelompok? Cerita di komentar.", data=[]),
]
END_PAD = 2.5

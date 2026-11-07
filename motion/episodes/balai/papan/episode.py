"""Balai Desa Bocor (konsep v2, liputan warga): papan nama proyek lebih besar dari proyeknya.
Cerita fiksi, desa dan tokoh rekaan. Tanpa nomor episode, tanpa penghitung ember."""

PARAMS = dict(papan_m=3, proyek_m=2)


def compute(p=PARAMS):
    assert p["papan_m"] > p["proyek_m"]
    return dict(papan=p["papan_m"], proyek=p["proyek_m"],
                papan_txt="PAPAN PROYEK<br><small>Saluran Air Gang Kenanga</small><br><small>Panjang: 2 meter · Selesai: segera</small>")


SCENES = [
    dict(id="s1", type="BL_WIDE", variant="hook", kicker="LIPUTAN WARGA", sub="Gang Kenanga",
         say="Di ujung Gang Kenanga ada proyek baru. Papan namanya *tiga meter*. Proyeknya? *Dua meter*. Warga pun bertanya-tanya, ini proyek papan, atau proyek saluran?", data=["papan_txt"]),
    dict(id="s2", type="BL_WALK", kicker="DUDUK PERKARA", sub="saluran air",
         say="Proyeknya saluran air, supaya gang tidak banjir kalau hujan. Papan namanya datang duluan, diangkut *empat orang*, lengkap dengan lampu sorot.", data=["papan_txt"]),
    dict(id="s3", type="BL_INTERVIEW", variant="pkk", kicker="KATA WARGA", sub="Bu Ketua PKK",
         say="Menurut Bu Ketua PKK, papannya bagus sekali. Tulisannya lengkap, warnanya cerah, kelihatan dari jalan besar. Yang belum kelihatan cuma *salurannya*.", data=["papan_txt"]),
    dict(id="s4", type="BL_PODIUM", kicker="PENJELASAN", sub="Pak Kades Janji",
         say="Pak Kades Janji menjelaskan, papan besar itu penting, supaya proyek *terlihat*. Soal salurannya, beliau menjawab singkat: *minggu depan beres*.", data=["papan_txt"]),
    dict(id="s5", type="BL_TIMELAPSE", kicker="SEMINGGU KEMUDIAN", sub="lalu sebulan",
         say="Seminggu kemudian, papannya dicat ulang. Dua minggu kemudian, lampu sorotnya diganti yang lebih terang. Sebulan kemudian, salurannya masih *dua meter*.", data=["papan_txt"]),
    dict(id="s6", type="BL_RAIN", kicker="WARGA BERGERAK", sub="hujan pertama",
         say="Lalu datang hujan pertama. Gang banjir sebetis. Pemuda karang taruna akhirnya menggali sendiri, dan papan nama raksasa itu dipakai jadi *tutup saluran*.", data=["papan_txt"]),
    dict(id="s7", type="BL_WIDE", variant="end", kicker="HASIL AKHIR", sub="Gang Kenanga",
         say="Sekarang salurannya *tiga meter*. Persis sepanjang papan namanya. Di tempat lo, ada papan proyek yang lebih megah dari proyeknya? Tulis di komentar.", data=["papan_txt"]),
]
END_PAD = 1.5

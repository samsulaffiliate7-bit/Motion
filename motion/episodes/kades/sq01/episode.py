"""Kades Magang Juara, SIDE QUEST #1 (3D, sampingan tanpa voting): "Kenapa nggak tanya warga?"

Diangkat dari komentar YouTube video Hari 1 (dibaca lewat Repliz 7 Nov 2026 ±21:50 WIB):
  @NatalieCallysta: "Lah kenapa gak tanya ke warga nya dulu biar warga yang memilih" -> ditampilkan "@Na***", teks dirapikan.
Hitungan suara Hari 1 (A jalan / B sumur), satu akun satu suara, tiga platform digabung, per 7 Nov ±21:50 WIB:
  B: IG 3 (shansxart, frdnsyahaidil._, lovinjayzz04), YouTube 5 (FathanSyahmoulana, WarujuDwiSutarmi, AhmadAqil, "Sumurr" Gabut_ku, GioSugio),
     TikTok 1 ("bikin banyak air dulu bang") = 9.  A: IG 1 (_rgna24) = 1.  "A bang" di video sela tidak dihitung (bukan video Hari 1).
Mekanik baru (keputusan pemilik 7 Nov: interaksi divariasikan): tiap akun yang komentar "WARGA" = +1 penduduk, dihitung di Hari 3.
Info musyawarah: pengertian umum musyawarah/mufakat, https://kbbi.kemdikbud.go.id/entri/musyawarah dan https://kbbi.kemdikbud.go.id/entri/mufakat
(narasi tidak menyebut lembaga)."""

META = dict(format="side quest", pilar="interaksi + info desa", tokoh="Kades Juara", lokasi="lapangan, kotak suara, pendopo, papan pengumuman, gapura",
            hook="kenapa nggak tanya warga?", variasi="komentar jadi konten", interaksi="komentar WARGA = +1 penduduk")
VOTE_H1 = dict(A=1, B=9, per_platform=dict(IG=dict(A=1, B=3), YouTube=dict(A=0, B=5), TikTok=dict(A=0, B=1)))


def compute():
    v = VOTE_H1; p = v["per_platform"]
    assert sum(x["A"] for x in p.values()) == v["A"] and sum(x["B"] for x in p.values()) == v["B"] and v["B"] > v["A"]
    return dict(hud=dict(hari=2, penduduk=5, anggaran=75), a=v["A"], b=v["B"],
                komentar=["@Na***", "kenapa gak tanya ke warganya dulu, biar warga yang memilih?"])


SCENES = [
    dict(id="s1", type="K3_SQ_HOOK", kicker="SIDE QUEST", sub="pertanyaan penonton",
         say="*Side quest!* Ada penonton yang protes: kenapa kades nggak *tanya warga* dulu, biar warga yang memilih? Pertanyaan bagus. Jawabannya ternyata ada di *kolom komentar*.", data=["hud", "komentar"]),
    dict(id="s2", type="K3_SQ_BALLOT", kicker="JAWABANNYA", sub="kalian warganya",
         say="Dari Hari 1, kades *sudah* tanya warga. Warganya itu *kalian*. Tiap komentar A atau B yang masuk dihitung sebagai *satu suara*, lalu masuk ke kotak suara desa.", data=["hud"]),
    dict(id="s3", type="K3_SQ_TALLY", kicker="HASIL HARI 1", sub="suara warga",
         say="Buktinya Hari 1. Yang pilih *sumur* ada *{b|w} orang*, yang pilih *jalan* cuma *{a|w}*. Suara terbanyak menang, makanya sumur dibangun duluan.", data=["hud", "a", "b"]),
    dict(id="s4", type="K3_SQ_MUSYAWARAH", kicker="DI DESA ASLI", sub="musyawarah",
         say="Di desa sungguhan, cara ini namanya *musyawarah*. Warga duduk bareng, semua boleh bicara, lalu cari kesepakatan bersama, atau *mufakat*. Kalau tetap buntu, baru diambil *suara terbanyak*.", data=["hud"]),
    dict(id="s5", type="K3_SQ_RULES", kicker="ATURAN MAIN", sub="desa kita",
         say="Di desa kita aturannya mirip. Satu akun, *satu suara*, jadi komentar dobel tidak dihitung dua kali. Komentar yang menarik bisa jadi *kejadian* di cerita. Dan kalau komentarnya sepi, kades terpaksa *memutuskan sendiri*.", data=["hud"]),
    dict(id="s6", type="K3_SQ_GATE", kicker="QUEST KALIAN", sub="jadi warga",
         say="Sekarang *quest* buat lo: tulis *WARGA* di komentar. Tiap komentar WARGA, desa ini dapat *satu penduduk baru*. Sampai jumpa di *Hari 3*!", data=["hud"]),
]
END_PAD = 2.5

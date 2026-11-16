"""Denah Rumah Dunia "Bumi Kita" Hari 6 (tayang 11 Nov 2026 malam): komentar berbahasa Jepang, kenapa orang pindah ke kota, pilihan A sekolah / B klinik.

Komentar dipakai: YouTube Hari 1 @JailaniLani-i8b (bahasa Jepang, 9 Nov): "kalau kamu, bagaimana membuat kota yang ramai; apakah penduduk bisa bertambah atau tidak?"
(diterjemahkan bebas, nama disamarkan).
Faktor penarik perpindahan ke kota (urbanisasi): lapangan kerja, tempat tinggal, layanan pendidikan dan kesehatan:
https://en.wikipedia.org/wiki/Urbanization (bagian penyebab/pull factors), https://en.wikipedia.org/wiki/Push_and_pull_factors_in_migration
Interaksi: A sekolah / B klinik, hasil di episode yang diproduksi sesudah ini tayang ("dua hari lagi"). Biaya koin rekaan."""

META = dict(format="serial Hari N (kejadian)", pilar="tata ruang kota", tokoh="Kepala Bumi, Juragan Modal", lokasi="globe malam (komentar Jepang), timbangan 3 faktor, kota sekarang, keluarga di luar gerbang, sekolah vs klinik, globe arigatou",
            hook="komentar dari Jepang", variasi="komentar jadi konten + daftar 3 hal", interaksi="A sekolah / B klinik, hasil dua hari lagi", suara="Sulafat")
PREV = dict(hari=5, penduduk=12, koin=200)
PARAMS = dict(sekolah=150, klinik=180)


def compute(p=PARAMS):
    assert p["sekolah"] <= PREV["koin"] and p["klinik"] <= PREV["koin"]
    return dict(state=dict(hari=6, penduduk=PREV["penduduk"], koin=PREV["koin"], negara=["Indonesia"], kota="Jakarta"), sekolah=p["sekolah"], klinik=p["klinik"],
                komentar=[["@Ja***", "もし私かあなたたったら、とのようにして賑やかな街を作りますか…"]])


SCENES = [
    dict(id="s1", type="D_H006_HOOK", kicker="HARI 6", sub="komentar dari jauh",
         say="Hari keenam. Ada komentar dalam bahasa *Jepang*! Isinya kira-kira: kalau kamu, gimana bikin kota jadi *ramai*? Penduduknya bisa naik, nggak?", data=["state", "komentar"]),
    dict(id="s2", type="D_H006_THREE", kicker="JAWABANNYA", sub="3 alasan pindah ke kota",
         say="Jawabannya: orang mau pindah ke sebuah kota kalau ada tiga hal. Ada *kerja*, ada *tempat tinggal*, dan ada *layanan* seperti sekolah dan kesehatan.", data=["state"]),
    dict(id="s3", type="D_H006_CHECK", kicker="CEK KOTA KITA", sub="2 dari 3",
         say="Cek kota kita. Kerja: ada, *pasar* dan kantor. Tempat tinggal: ada, *rumah* dan kos. Layanan: *belum ada sama sekali*.", data=["state"]),
    dict(id="s4", type="D_H006_GATE", kicker="MASALAHNYA", sub="keluarga ragu",
         say="Keluarga yang punya anak, atau orang tua yang sering sakit, bakal mikir dua kali buat pindah ke kota tanpa *sekolah* dan *klinik*.", data=["state"]),
    dict(id="s5", type="D_H006_CHOICE", kicker="PILIHAN", sub="A atau B",
         say="Pilihan *A*: *sekolah* pertama, *{sekolah|w} koin*. Pilihan *B*: *klinik* kecil, *{klinik|w} koin*. Koin cuma cukup buat satu, kecuali like kalian nambah koinnya.", data=["state", "sekolah", "klinik"]),
    dict(id="s6", type="D_H006_ASK", kicker="KALIAN PILIH", sub="hasil dua hari lagi",
         say="Tulis *A* atau *B*, hasilnya *dua hari lagi*. Dan buat yang komen jauh dari Jepang: terima kasih, *arigatou*!", data=["state"]),
]
END_PAD = 4.8
SPLIT_SHIFT = {2: 1}

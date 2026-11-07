"""Hewan Berdasi Kotor ep005 (3D): Kucing cuti, Tikus kerja dobel. Fabel fiksi."""
PARAMS = dict(hari_cuti=7)


def compute(p=PARAMS):
    assert p["hari_cuti"] == 7
    return dict(cuti=p["hari_cuti"], moral_html="Kerja dobel yang tidak dicatat,<br>gampang <span style='color:#F28C28'>dianggap biasa</span>.",
                q_html="Pernah jadi Tikus di kantor lo?", ide="Laporan mingguan: SELESAI", steps="📝 serah terima: tugas · tenggat · kontak", steps_cue="dicatat",
                door=[["\"Minta serah terima tertulis.\"", "serah terima"], ["\"Tugas, tenggat, kontak.\"", "siapa yang"]])


SCENES = [
    dict(id="s1", type="H_POSTCARD", kicker="SENIN", sub="Kucing cuti", say="Kucing Berdasi cuti *seminggu* ke pantai. Semua kerjaannya diserahkan ke *Tikus Kecil*. Tanpa catatan, tanpa pesan. Begini minggu itu berjalan.", data=["cuti"]),
    dict(id="s2", type="H_TWODESKS", kicker="SELASA SAMPAI KAMIS", sub="dua meja", say="Tikus duduk di dua meja sekaligus. Telepon di kiri bunyi, email di kanan masuk terus. Kerjanya *dua orang*, gajinya tetap *satu*.", data=["cuti"]),
    dict(id="s3", type="H_CALL", kicker="JUMAT 22.00", sub="telepon dari pantai", say="Jumat jam sepuluh malam, Kucing menelepon dari pantai. Bukan untuk tanya kabar, tapi minta laporannya dikirim *malam ini juga*.", data=["cuti"]),
    dict(id="s4", type="H_RETURN", kicker="SENIN BERIKUTNYA", sub="Kucing kembali", say="Seminggu kemudian, Kucing pulang dengan kulit gosong dan satu gantungan kunci untuk Tikus. Di depan direktur, dia bilang: *tim saya* luar biasa minggu ini.", data=["ide"]),
    dict(id="s5", type="H_DOORWAY", kicker="DI POJOK", sub="saran Kerbau", say="Kerbau menepuk bahu Tikus. Katanya: lain kali, sebelum atasan cuti, minta *serah terima* tertulis. Apa saja yang dititipkan, sampai kapan, dan siapa yang bisa dihubungi.", data=["cuti", "door"]),
    dict(id="s6", type="H_MORAL", kicker="MORAL", sub="catat semuanya", say="Menggantikan rekan itu wajar. Yang bikin rugi, kerja dobel yang tidak pernah *dicatat*. Pernah jadi Tikus di kantor lo? Tulis di komentar.", data=["moral_html", "q_html", "steps", "steps_cue"]),
]
END_PAD = 2.0

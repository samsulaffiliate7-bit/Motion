"""Kades Magang Juara, episode sampingan #3 (3D, FYI): kenapa jalan dibuat sedikit cembung di tengah.

Sumber (dicek 6 Nov 2026):
- Jalan beraspal umumnya dibuat miring melintang sekitar 2% dari tengah ke pinggir supaya air hujan mengalir ke tepi;
  jalan tanah/kerikil butuh lebih miring (sekitar 4-6%):
  https://cdgrsdev.vmhost.psu.edu/wp-content/uploads/2022/06/TB_Crown_and_Cross_Slope.pdf ,
  https://www.txdot.gov/manuals/des/rdw/chapter-4--basic-design-criteria/4-10-cross-sectional-elements/4-10-4-pavement-cross-slope.html
Genangan air sebagai tempat nyamuk bertelur: https://www.cdc.gov/mosquitoes/about/life-cycles/aedes.html
Narasi tidak menyebut lembaga."""
PARAMS = dict(lebar_m=5, miring_persen=2)


def compute(p=PARAMS):
    tinggi_cm = round(p["lebar_m"] / 2 * p["miring_persen"] / 100 * 100)
    assert tinggi_cm == 5
    return dict(lebar=p["lebar_m"], miring=p["miring_persen"], tinggi_cm=tinggi_cm, hud=dict(hari=1, penduduk=5, anggaran=100))


SCENES = [
    dict(id="s1", type="K3_HOOK", kicker="SEMENTARA ITU", sub="info jalan desa",
         say="Sementara itu di desa: pernah perhatikan, jalan aspal itu ternyata *nggak rata*? Bagian tengahnya sedikit *lebih tinggi*. Itu sengaja, dan alasannya penting buat desa kita.", data=["hud"]),
    dict(id="s2", type="K3_SECTION", kicker="SAAT HUJAN", sub="air ke pinggir",
         say="Waktu hujan, air di jalan yang cembung langsung *mengalir ke pinggir*, lalu masuk ke *selokan*. Jalan cepat kering, dan tidak berubah jadi kolam.", data=["hud"]),
    dict(id="s3", type="K3_COMPARE", kicker="KALAU RATA", sub="air menggenang",
         say="Kalau jalannya rata, air *menggenang* di tengah. Kendaraan lewat terus, air meresap ke lapisan bawah, lama-lama aspalnya rusak dan muncul *lubang*. Genangan yang lama juga jadi tempat *nyamuk* bertelur.", data=["hud"]),
    dict(id="s4", type="K3_NUMBERS", kicker="BERAPA MIRING?", sub="kecil saja",
         say="Kemiringannya kecil, sekitar *{miring|w} persen* untuk jalan aspal. Jadi jalan selebar *{lebar|w} meter*, bagian tengahnya cuma sekitar *{tinggi_cm|w} senti* lebih tinggi dari pinggirnya. Jalan tanah butuh lebih miring lagi.", data=["hud", "lebar", "miring", "tinggi_cm"]),
    dict(id="s5", type="K3_TIPS", kicker="CEK JALAN DESA", sub="3 hal",
         say="Jadi kalau desa membangun jalan, cek tiga hal: tengahnya sedikit *cembung*, ada *selokan* di kiri dan kanan, dan selokannya *tidak tersumbat* sampah. Satu lagi: jangan menimbun tanah atau pasir di pinggir jalan, karena airnya jadi tertahan. Jalan di daerah lo sudah cembung belum? Tulis di komentar.", data=["hud"]),
]
END_PAD = 3.0

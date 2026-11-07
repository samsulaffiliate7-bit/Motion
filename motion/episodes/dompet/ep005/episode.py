"""Dompet Gue Nangis ep005 (3D): bekal dari rumah vs beli makan siang. Cerita fiksi; harga rekaan."""
PARAMS = dict(beli=30000, bekal=15000, hari_kerja=22)


def rp(n):
    return "Rp" + f"{n:,}".replace(",", ".")


def compute(p=PARAMS):
    beli_bln = p["beli"] * p["hari_kerja"]; bekal_bln = p["bekal"] * p["hari_kerja"]; hemat = beli_bln - bekal_bln; tahun = hemat * 12
    assert round(tahun / beli_bln) == 6 and beli_bln == 660000 and bekal_bln == 330000 and hemat == 330000 and tahun == 3960000
    return dict(beli=p["beli"], bekal=p["bekal"], hari=p["hari_kerja"], beli_bln=beli_bln, bekal_bln=bekal_bln, hemat=hemat, tahun=tahun,
                beli_rp=rp(p["beli"]), bekal_rp=rp(p["bekal"]), beli_bln_rp=rp(beli_bln), bekal_bln_rp=rp(bekal_bln), hemat_rp=rp(hemat), tahun_rp=rp(tahun),
                tip_cues=["masak sekali", "tiga kali", "ditabung"], tips=[["🍱", "Masak sekali", "untuk dua hari"], ["🗓️", "Bekal 3x seminggu", "sisanya jajan santai"], ["🫙", "Selisihnya ditabung", "langsung di hari itu"]])


SCENES = [
    dict(id="s1", type="D3_KITCHEN", kicker="JAM 6 PAGI", sub="dapur kos", say="Gue coba eksperimen sebulan: *bawa bekal* dari rumah, bukan beli makan siang. Ternyata selisihnya bikin kaget. Gue hitung bareng ya, dan di akhir ada tiga cara biar nggak cuma semangat seminggu.", data=["bekal_rp"]),
    dict(id="s2", type="D3_WARUNG", kicker="JAM 12 SIANG", sub="antre makan", say="Biasanya makan siang gue *{beli|w} rupiah* sekali makan. Kerja dua puluh dua hari, jadinya *{beli_bln|w} rupiah* sebulan.", data=["beli_rp", "beli_bln_rp"]),
    dict(id="s3", type="D3_SCALE", kicker="TIMBANG DULU", sub="beli vs bekal", say="Kalau bawa bekal, bahan masaknya kira-kira *{bekal|w} rupiah* per hari. Sebulan cuma *{bekal_bln|w} rupiah*. Selisihnya *{hemat|w} rupiah* tiap bulan.", data=["beli_rp", "bekal_rp", "hemat_rp"]),
    dict(id="s4", type="D3_JAR", kicker="SETAHUN", sub="toples tabungan", say="Dikali dua belas bulan, jadinya *{tahun|w} rupiah*. Itu hampir setara *enam bulan* makan siang beli. Si Dompet langsung *senyum*, untuk pertama kalinya.", data=["tahun_rp"]),
    dict(id="s5", type="D3_TIPS", kicker="BIAR KONSISTEN", sub="3 cara", say="Biar nggak cuma semangat seminggu, gue pakai tiga cara. Satu, *masak sekali* untuk dua hari. Dua, bekal *tiga kali* seminggu, sisanya tetap jajan santai. Tiga, selisihnya langsung *ditabung* hari itu juga.", data=["tips", "tip_cues"]),
    dict(id="s6", type="D3_OFFICE", kicker="GIMANA LO?", sub="A atau B", say="Kalau lo, tim *A*: beli makan siang, atau tim *B*: bawa bekal? Tulis di komentar.", data=["tahun_rp"]),
]
END_PAD = 2.0

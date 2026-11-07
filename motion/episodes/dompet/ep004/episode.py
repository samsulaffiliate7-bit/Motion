"""Dompet Gue Nangis ep004 (3D): langganan 5 aplikasi, yang ditonton cuma satu. Cerita fiksi; harga rekaan, tanpa nama aplikasi nyata."""

PARAMS = dict(apps=[["Film", 65000, True], ["Musik", 55000, False], ["Drama", 49000, False], ["Olahraga", 79000, False], ["Kartun", 39000, False]])


def rp(n):
    return "Rp" + f"{n:,}".replace(",", ".")


def compute(p=PARAMS):
    apps = p["apps"]; total = sum(a[1] for a in apps); dipakai = sum(a[1] for a in apps if a[2]); buang = total - dipakai
    assert total == 287000 and dipakai == 65000 and buang == 222000
    tahun = buang * 12; assert tahun == 2664000
    return dict(apps=[[a[0], rp(a[1]), a[2]] for a in apps], total=total, total_rp=rp(total), buang=buang, buang_rp=rp(buang), tahun=tahun, tahun_rp=rp(tahun),
                tips=[["📋", "Cek tiap 3 bulan", "yang 30 hari nggak dibuka, stop"], ["🔁", "Rotasi", "langganan satu-satu, gantian"], ["⏰", "Pengingat tagihan", "catat tanggal potong otomatis"]])


SCENES = [
    dict(id="s1", type="D3_HOOK", kicker="NANA BULAN INI", sub="langganan numpuk",
         say="Gue langganan *lima aplikasi* nonton dan dengerin. Yang beneran gue buka? Cuma *satu*. Gue hitung berapa uang yang kebuang setahun, dan cara biar nggak bocor lagi.", data=["apps"]),
    dict(id="s2", type="D3_TV", kicker="KENYATAANNYA", sub="yang ditonton cuma satu",
         say="Tiap malam pulang kerja, yang gue buka cuma aplikasi *film*. Empat lainnya? *Nganggur*, tapi tetap ditagih tiap bulan.", data=["apps"]),
    dict(id="s3", type="D3_RECEIPT", kicker="STRUK BULANAN", sub="lima tagihan",
         say="Kalau dijumlah, totalnya *{total|w} rupiah* sebulan. Padahal yang beneran kepakai cuma *enam puluh lima ribu*.", data=["apps", "total_rp"]),
    dict(id="s4", type="D3_CALENDAR", kicker="SETAHUN", sub="dua belas kali potong",
         say="Berarti yang kebuang *{buang|w} rupiah* tiap bulan. Dikali dua belas bulan, jadinya *{tahun|w} rupiah* setahun. Si Dompet langsung *nangis*.", data=["buang_rp", "tahun_rp"]),
    dict(id="s5", type="D3_TIPS", kicker="BIAR NGGAK BOCOR", sub="3 cara",
         say="Sekarang gue punya tiga aturan. Satu, *cek* tiap tiga bulan: yang tiga puluh hari nggak dibuka, berhenti. Dua, *rotasi*: langganan satu-satu, gantian. Tiga, catat *tanggal* potong otomatis biar nggak kaget.", data=["tips"]),
    dict(id="s6", type="D3_OUTRO", kicker="GIMANA LO?", sub="A atau B",
         say="Kalau lo, tim *A*: langganan banyak sekaligus, atau tim *B*: rotasi satu-satu? Tulis di komentar.", data=["tahun_rp"]),
]
END_PAD = 2.5

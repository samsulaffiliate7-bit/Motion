"""Meja Seberang Bos ep015 (3D, v3): Full POV Staf "anak rantau: gaji kota besar, sisanya kayak gaji kampung". Tayang 12 Nov 2026.
Cerita fiksi, angka ilustrasi (aritmetika), tanpa nama kota/perusahaan. Tidak menyebut aturan hukum kerja."""
META = {"format": "Full POV Staf", "pilar": "gaji dan negosiasi", "tokoh": ["Si Staf (anak rantau)", "ibu (video call)", "teman kos"], "suara": "Puck",
        "lokasi": ["stasiun kota besar pagi", "kamar kos sempit", "video call malam (rumah di kampung di layar)", "dapur bersama kos"], "hook": "kontras", "variasi": [1, 5]}
PARAMS = dict(gaji=5_400_000, kos=1_600_000, makan=1_800_000, transport=600_000, ortu=800_000, lain=200_000)


def rp(x):
    return "Rp" + f"{int(x):,}".replace(",", ".")


def compute(p=PARAMS):
    sisa = p["gaji"] - p["kos"] - p["makan"] - p["transport"] - p["ortu"] - p["lain"]; assert sisa == 400_000
    hemat = 600_000 + 400_000   # transport -> jalan kaki (kos dekat, bayar kos +200 rb, transport -600 rb => +400 rb), masak bareng -600 rb
    return dict(sisa_rp=rp(sisa), pos=[["kos", rp(p["kos"])], ["makan", rp(p["makan"])], ["transport", rp(p["transport"])], ["kirim rumah", rp(p["ortu"])], ["pulsa & lain", rp(p["lain"])]],
                tips=[["🍳", "Masak bareng teman kos", "makan −Rp600 rb"], ["🚶", "Kos dekat kantor", "kos +Rp200 rb, ongkos −Rp600 rb"], ["🐷", "Sisihkan di awal", "biar sisa nggak cuma sisa"]], tip_cues=["masak", "dekat kantor", "awal"])


SCENES = [
    dict(id="s1", type="M_E015_STASIUN", kicker="POV STAF", sub="anak rantau, hari pertama", say="Gue merantau ke kota besar, gaji lima koma empat juta. Di kampung, angka segitu kedengarannya *banyak banget*. Ibu gue sampai bangga cerita ke tetangga, anaknya kerja di kantor gedung tinggi.", data=[]),
    dict(id="s2", type="M_E015_KOS", kicker="POV STAF", sub="kamar kos 3x3 meter", say="Bulan pertama gue hitung. Kos satu koma enam juta, makan satu koma delapan, transport enam ratus ribu, kirim ke rumah delapan ratus, pulsa dan lain-lain dua ratus. Sisanya? *Empat ratus ribu*. Gaji kota, sisanya gaji kampung.", data=["pos", "sisa_rp"]),
    dict(id="s3", type="M_E015_VIDCALL", kicker="POV STAF", sub="video call, jam 9 malam", say="Malamnya ibu video call. Nanya, makannya cukup? Gue jawab cukup, sambil liatin mi instan di meja. Bagian ini nggak pernah masuk cerita ke tetangga. Dan jujur, gue juga nggak mau ibu tahu.", data=[]),
    dict(id="s4", type="M_E015_DAPUR", kicker="YANG GUE UBAH", sub="dapur bersama kos", say="Yang gue ubah: *masak bareng* teman kos, makan turun enam ratus ribu. Pindah ke kos *dekat kantor*, sewanya naik dua ratus, tapi ongkos hilang enam ratus. Dan uang tabungan gue sisihkan di *awal*, bukan nunggu sisa. Lo anak rantau juga? Gaji paling banyak habis buat apa?", data=["tips", "tip_cues"]),
]
END_PAD = 4.0

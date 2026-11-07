"""Hewan Berdasi Kotor ep006 (3D, konsep v3): arisan bodong di komplek, tokoh tamu Ular; format Senjata Makan Tuan (twist di akhir).
Fabel fiksi; menyindir perilaku umum, bukan orang/kejadian nyata. Angka rekaan."""
META = {"format": "Senjata Makan Tuan", "pilar": "arisan dan komunitas", "tokoh": ["Ular (tamu)", "Kucing Berdasi", "Tikus Kecil", "Kerbau", "Burung Hantu"],
        "lokasi": ["kamar kos Tikus", "teras arisan malam", "teras arisan (kocokan 2)", "depan rumah kosong", "warung kopi malam", "atap gedung"],
        "hook": "kontras", "variasi": [4, 5]}
PARAMS = dict(setor=500_000, anggota=10, bulan_tikus=3)


def rp(n):
    return "Rp" + f"{n:,}".replace(",", ".")


def compute(p=PARAMS):
    pot = p["setor"] * p["anggota"]; tikus = p["setor"] * p["bulan_tikus"]
    assert pot == 5_000_000 and tikus == 1_500_000
    return dict(pot_txt="Rp5 juta", tikus_txt="Rp1,5 juta",
                chat1=[["Ular (admin)", "Selamat datang di Arisan Rimba Berkah 🙏"], ["Ular (admin)", "Setor 500rb/bulan, 10 anggota, dapat 5 juta"], ["Kucing", "Ikut! Adminnya amanah kok"], ["Tikus", "Saya ikut ya 🙂"]],
                chat2=[["Ula_Rr (admin)", "Selamat datang di Arisan Rimba Makmur 🙏"], ["Ula_Rr (admin)", "Yang setor duluan dapat bonus 😉"], ["Kucing", "Saya duluan! Udah transfer"]],
                moral_html="Arisan tanpa catatan<br>bukan arisan.<br><span style='color:#F5D76E'>Itu sumbangan.</span>",
                q_html="Pernah kena arisan begini?<br>Cerita di komentar.", steps="📝 setoran · siapa narik · bukti transfer", steps_cue="Catat")


SCENES = [
    dict(id="s1", type="H_GROUPCHAT", kicker="GRUP BARU", sub="Arisan Rimba Berkah", say="Grup Arisan Rimba Berkah baru dibuka. Setor *lima ratus ribu* sebulan, sepuluh anggota, giliran dapat *lima juta*. Adminnya ramah sekali. Namanya *Ular*.", data=[]),
    dict(id="s2", type="H_ARISAN", variant="satu", kicker="KOCOKAN PERTAMA", sub="teras, malam", say="Kocokan pertama. Nama yang keluar: *Ular*. Bandar narik duluan, biar adil, katanya. Semua mengangguk. Namanya juga admin.", data=[]),
    dict(id="s3", type="H_ARISAN", variant="dua", kicker="KOCOKAN KEDUA", sub="sebulan kemudian", say="Kocokan kedua. Keluar nama *Kucing*, teman dekat Ular. Kebetulan, kata semua. Tikus tetap setor, tiap bulan, *tepat waktu*.", data=[]),
    dict(id="s4", type="H_DOOR", kicker="GILIRAN TIKUS", sub="bulan ketiga", say="Bulan ketiga, giliran Tikus. Ular bilang lagi di jalan. Besoknya, *Ular keluar dari grup*. Rumahnya kosong, ada tulisan dikontrakkan. Tikus sudah setor satu setengah juta, *belum pernah* narik.", data=[]),
    dict(id="s5", type="H_NEWGROUP", kicker="SEMINGGU KEMUDIAN", sub="komplek sebelah", say="Seminggu kemudian, ada grup baru di komplek sebelah: Arisan Rimba Makmur. Adminnya ramah sekali, akunnya baru. Yang paling semangat daftar: *Kucing*. Kali ini, Kucing yang *setor duluan*.", data=[]),
    dict(id="s6", type="H_MORAL", kicker="PESAN", sub="dari atap", say="Arisan tanpa catatan, bukan arisan. Itu *sumbangan*. Catat setoran, siapa yang narik, dan simpan bukti transfernya. Pernah kena arisan begini? Cerita di komentar.", data=[]),
]
END_PAD = 2.0

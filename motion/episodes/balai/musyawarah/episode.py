"""Balai Desa Bocor (konsep v3, Liputan Warga): musyawarah desa, warga diminta usul padahal keputusan sudah dicetak kemarin.
Cerita fiksi: desa, tokoh, dan angka rekaan. Tidak menyebut orang, instansi, atau daerah nyata."""
META = {"format": "Liputan Warga", "pilar": "suara warga tidak didengar", "tokoh": ["Pak Kades", "Bu Ketua PKK", "warga"],
        "lokasi": ["aula balai (musyawarah)", "teras (grup warga)", "kantor balai malam sebelumnya (printer)", "aula balai (palu diketuk)", "gang (wawancara)"],
        "hook": "kontras", "variasi": [4, 5], "suara": "Algenib"}
PARAMS = dict(hadir=30, usulan=12, rt=3)


def compute(p=PARAMS):
    assert p["usulan"] == 12
    return dict(hadir=p["hadir"], usulan=p["usulan"], rt=p["rt"], wa_title="Usulan Warga RT 1-3", wa_sub="untuk musyawarah desa", wa_chip="📝 12 usulan dari 3 RT",
                wa=[["Bu Ratna", "Usul: lampu gang Melati", True], ["Pak Darto", "Sumur RT 2 kering", True], ["Dimas", "Selokan mampet tiap hujan", True], ["Bu Ketua PKK", "Dicatat semua ya 🙏", False],
                    ["Bu Sari", "Timbangan posyandu", True], ["Pak RT", "Jalan ke sawah", True], ["Bu Ketua PKK", "Total 12 usulan ✅", False]],
                iv=dict(who="pkk", name="Bu Ketua PKK", role="Pencatat usulan warga", q1="“Usulannya saya simpan.”", q2="“Tahun depan saya bawa lagi.”", q2cue="tahun depan",
                        qend="Musyawarah di tempat lo:<br><span style=\"color:#B5452B\">tempat usul, atau dengar keputusan?</span>", qend_cue="Di tempat lo"),
                board=["MUSYAWARAH DESA", "Usulan warga: 12", "Masuk keputusan: 0", "Gapura ke-4: OK"])


SCENES = [
    dict(id="s1", type="BL_MUSY", kicker="LIPUTAN WARGA", sub="musyawarah desa", say="Musyawarah desa dibuka dengan ramah: silakan warga sampaikan *usulan*. Tiga puluh warga datang, tangan teracung. Yang tidak terlihat dari kursi warga: di meja depan, sudah ada tumpukan kertas bertuliskan *keputusan*.", data=[]),
    dict(id="s2", type="BL_WAGROUP", kicker="SEMINGGU SEBELUMNYA", sub="grup warga", say="Seminggu sebelumnya, grup warga ramai menyusun usulan. Lampu gang yang mati, sumur yang kering, selokan yang mampet. Semua dicatat rapi oleh Bu Ketua PKK: *dua belas usulan* dari tiga RT.", data=[]),
    dict(id="s3", type="BL_PRINT", kicker="MALAM SEBELUMNYA", sub="kantor balai", say="Padahal malam sebelum musyawarah, printer balai sudah bekerja. Judulnya: hasil musyawarah desa. Isinya cuma satu: pembangunan *gapura keempat*. Tanggal cetaknya: *kemarin*.", data=[]),
    dict(id="s4", type="BL_MUSY", variant="palu", kicker="HARI MUSYAWARAH", sub="aula balai", say="Usulan warga dibacakan satu per satu, lalu ditampung. Lalu palu diketuk tiga kali. Keputusan dibagikan, masih *hangat* dari printer. Dua belas usulan, *nol* yang masuk.", data=[]),
    dict(id="s5", type="BL_INTERVIEW", kicker="KATA WARGA", sub="Bu Ketua PKK", say="Bu Ketua PKK melipat catatannya pelan. Usulan itu akan ia bawa lagi tahun depan, katanya. Di tempat lo, musyawarah itu tempat usul, atau tempat *dengar keputusan*? Tulis di komentar.", data=[]),
]
END_PAD = 2.5

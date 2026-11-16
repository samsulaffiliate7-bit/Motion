# JAM TAYANG (UJI) Balai + Hewan

File per pasangan (BH). Dibaca `motion/engine/jam_tayang.py`.

Keputusan pemilik 9 Nov 2026. Blok WIB: A 07:00-08:59, B 09:00-11:59, C 12:00-13:59, D 14:00-16:59, E 17:00-19:59, F 20:00-22:15 ("luar" = di luar blok, posting lama sebelum aturan ini).

Aturan isi jadwal baru:
- Tiap posting ditaruh di blok yang PALING JARANG dipakai platform itu (per akun) dalam 14 hari terakhir di tabel ini; seri = acak.
- Menit acak, tidak bulat (bukan :00/:15/:30/:45). Satu video tidak tayang bersamaan di tiga platform (jarak minimal 40 menit antar platform).
- Setelah tiap platform+blok punya >= 6 posting: 70% posting ke 2 blok terbaik (view 48 jam dinormalkan ke median akun, analisis Senin), 30% tetap eksplorasi.
- Tiap posting baru WAJIB ditambah barisnya di sini (tanggal, akun, ep, platform, jam, blok, id jadwal). Kolom view48 diisi analisis mingguan.

| Tanggal | Akun | Ep | Platform | Jam WIB | Blok | ID jadwal | view48 |
|---|---|---|---|---|---|---|---|
| 2026-11-06 | balai | ep001 | IG | 21:52 | F | - | |
| 2026-11-06 | balai | ep001 | TikTok | 18:47 | E | - | |
| 2026-11-06 | balai | ep001 | YouTube | 13:26 | C | - | |
| 2026-11-06 | hewan | ep001 | IG | 14:09 | D | - | |
| 2026-11-06 | hewan | ep001 | TikTok | 22:36 | luar | - | |
| 2026-11-06 | hewan | ep001 | YouTube | 19:18 | E | - | |
| 2026-11-07 | balai | ep002 | IG | 14:43 | D | 6aed7cc3b28924f89e24ef42 | |
| 2026-11-07 | balai | ep002 | TikTok | 08:52 | A | 6aed7cc1078a2fff78066094 | |
| 2026-11-07 | balai | ep002 | YouTube | 12:19 | C | 6aed7cc2d02ee1307b0c38db | |
| 2026-11-07 | balai | ep003 | IG | 20:22 | F | 6aed7cc4440c3fc9ce861e6d | |
| 2026-11-07 | balai | ep003 | TikTok | 22:51 | luar | 6aed7cc5440c3fc9ce861ec7 | |
| 2026-11-07 | balai | ep003 | YouTube | 17:48 | E | 6aed7cc3078a2fff78066149 | |
| 2026-11-07 | hewan | ep002 | IG | 09:14 | B | 6aed7cbc440c3fc9ce861b90 | |
| 2026-11-07 | hewan | ep002 | TikTok | 14:07 | D | 6aed7cbe078a2fff78065fde | |
| 2026-11-07 | hewan | ep002 | YouTube | 11:32 | B | 6aed7cbdb28924f89e24ee1c | |
| 2026-11-07 | hewan | ep003 | IG | 21:13 | F | 6aed7cc0078a2fff78066065 | |
| 2026-11-07 | hewan | ep003 | TikTok | 16:21 | D | 6aed7cbe440c3fc9ce861c5a | |
| 2026-11-07 | hewan | ep003 | YouTube | 18:46 | E | 6aed7cbf440c3fc9ce861c9f | |
| 2026-11-08 | balai | lapangan | IG | 20:08 | F | 6aedcb4073d33addc514081c | |
| 2026-11-08 | balai | lapangan | TikTok | 17:53 | E | 6aedcb4097f59f4753d3875d | |
| 2026-11-08 | balai | lapangan | YouTube | 22:43 | luar | 6aedcb4197f59f4753d387a4 | |
| 2026-11-08 | balai | papan | IG | 08:47 | A | 6aedcb3d23a292c34ba5f8af | |
| 2026-11-08 | balai | papan | TikTok | 15:19 | D | 6aedcb3f97f59f4753d38743 | |
| 2026-11-08 | balai | papan | YouTube | 12:31 | C | 6aedcb3e0b73a29be6abff0b | |
| 2026-11-08 | hewan | ep004 | IG | 13:24 | C | 6aedcb7423a292c34ba60190 | |
| 2026-11-08 | hewan | ep004 | TikTok | 16:48 | D | 6aedcb7523a292c34ba601a4 | |
| 2026-11-08 | hewan | ep004 | YouTube | 09:51 | B | 6aedcb7373d33addc514101b | |
| 2026-11-08 | hewan | ep005 | IG | 22:58 | luar | 6aedcb7873d33addc5141094 | |
| 2026-11-08 | hewan | ep005 | TikTok | 19:12 | E | 6aedcb760b73a29be6ac0b5e | |
| 2026-11-08 | hewan | ep005 | YouTube | 21:17 | F | 6aedcb770b73a29be6ac0b88 | |
| 2026-11-09 | balai | jalan | IG | 09:46 | B | 6aee02c71e286deb260a2b97 | |
| 2026-11-09 | balai | jalan | TikTok | 18:34 | E | 6aee02c99088ef51eeedd1e9 | |
| 2026-11-09 | balai | jalan | YouTube | 13:19 | C | 6aee02c89088ef51eeedd1cc | |
| 2026-11-09 | balai | viral | IG | 16:38 | D | 6aee6ab49088ef51eefe70ff | |
| 2026-11-09 | balai | viral | TikTok | 12:51 | C | 6aee6ab4dbf3fe82c3211e3c | |
| 2026-11-09 | balai | viral | YouTube | 21:13 | F | 6aee6ab5c0184f720cff3827 | |
| 2026-11-09 | hewan | ep006 | IG | 21:41 | F | 6aee02cbc0184f720cee9caf | |
| 2026-11-09 | hewan | ep006 | TikTok | 12:24 | C | 6aee02c99088ef51eeedd1f2 | |
| 2026-11-09 | hewan | ep006 | YouTube | 17:16 | E | 6aee02cac0184f720cee9c8f | |
| 2026-11-09 | hewan | ep007 | IG | 10:52 | B | 6aee6ab61e286deb2626ea3b | |
| 2026-11-09 | hewan | ep007 | TikTok | 17:43 | E | 6aee6ab7dbf3fe82c3211eed | |
| 2026-11-09 | hewan | ep007 | YouTube | 22:26 | luar | 6aee6ac4c0184f720cff3b4b | |
| 2026-11-10 | balai | baliho | IG | 18:09 | E | 6aefc414ab5593483d0e8df4 | |
| 2026-11-10 | balai | baliho | TikTok | 15:23 | D | 6aefc4137f909f4bfd57232c | |
| 2026-11-10 | balai | baliho | YouTube | 11:46 | B | 6aefc4126fd3743dbc8e829f | |
| 2026-11-10 | balai | iuran | IG | 09:14 | B | 6aefc411ab5593483d0e8d98 | |
| 2026-11-10 | balai | iuran | TikTok | 06:52 | luar | 6aefc410ab5593483d0e8d75 | |
| 2026-11-10 | balai | iuran | YouTube | 12:37 | C | 6aefc411ab5593483d0e8dbe | |
| 2026-11-10 | balai | sumur | IG | 14:31 | D | 6aefc4157f909f4bfd57235d | |
| 2026-11-10 | balai | sumur | TikTok | 21:18 | F | 6aefc4166fd3743dbc8e831e | |
| 2026-11-10 | balai | sumur | YouTube | 19:56 | E | 6aefc4166fd3743dbc8e82f7 | |
| 2026-11-10 | hewan | ep008 | IG | 13:53 | C | 6aefc432da78ffe5f9fcaf71 | |
| 2026-11-10 | hewan | ep008 | TikTok | 07:28 | A | 6aefc4316fd3743dbc8e87e5 | |
| 2026-11-10 | hewan | ep008 | YouTube | 10:41 | B | 6aefc4317f909f4bfd5729dc | |
| 2026-11-10 | hewan | ep009 | IG | 12:16 | C | 6aefc4337f909f4bfd572a5a | |
| 2026-11-10 | hewan | ep009 | TikTok | 16:47 | D | 6aefc434da78ffe5f9fcafc9 | |
| 2026-11-10 | hewan | ep009 | YouTube | 19:12 | E | 6aefc435ab5593483d0e9434 | |
| 2026-11-10 | hewan | ep010 | IG | 18:34 | E | 6aefc436ab5593483d0e949b | |
| 2026-11-10 | hewan | ep010 | TikTok | 21:49 | F | 6aefc437ab5593483d0e94c5 | |
| 2026-11-10 | hewan | ep010 | YouTube | 15:07 | D | 6aefc436da78ffe5f9fcb03f | |
| 2026-11-11 | balai | bibit | YouTube | 07:47 | A | 6af1bd41774114a8ae8ce384 | |
| 2026-11-11 | balai | surat | YouTube | 08:33 | A | 6af1bd42774114a8ae8ce427 | |
| 2026-11-11 | balai | surat | TikTok | 09:13 | B | 6af1bd443ca9d6127c63f37b | |
| 2026-11-11 | balai | musyawarah | TikTok | 10:52 | B | 6af1bd46857d5ad8aa9df1e0 | |
| 2026-11-11 | balai | bibit | TikTok | 12:16 | C | 6af1bd47857d5ad8aa9df256 | |
| 2026-11-11 | balai | surat | IG | 12:36 | C | 6af1bd48774114a8ae8ce5eb | |
| 2026-11-11 | balai | musyawarah | YouTube | 14:36 | D | 6af1bd49774114a8ae8ce646 | |
| 2026-11-11 | balai | musyawarah | IG | 19:06 | E | 6af1bd4b774114a8ae8ce6af | |
| 2026-11-11 | balai | bibit | IG | 19:20 | E | 6af1bd4c774114a8ae8ce746 | |
| 2026-11-11 | hewan | ep011 | YouTube | 07:26 | A | 6af1c575fa8dfae463b98a17 | |
| 2026-11-11 | hewan | ep012 | IG | 08:12 | A | 6af1c576fa8dfae463b98a54 | |
| 2026-11-11 | hewan | ep013 | YouTube | 08:35 | A | 6af1c576fa8dfae463b98a94 | |
| 2026-11-11 | hewan | ep013 | TikTok | 10:14 | B | 6af1c577774114a8ae8ee08c | |
| 2026-11-11 | hewan | ep011 | TikTok | 10:26 | B | 6af1c5783ca9d6127c66618d | |
| 2026-11-11 | hewan | ep012 | YouTube | 13:40 | C | 6af1c579fa8dfae463b98aea | |
| 2026-11-11 | hewan | ep013 | IG | 16:03 | D | 6af1c57afa8dfae463b98b18 | |
| 2026-11-11 | hewan | ep011 | IG | 19:09 | E | 6af1c57b774114a8ae8ee0f2 | |
| 2026-11-11 | hewan | ep012 | TikTok | 21:13 | F | 6af1c57b857d5ad8aa9fed66 | |
| 2026-11-12 | balai | asap | TikTok | 07:03 | A | 6af3112ec80112b9e13bebb6 | |
| 2026-11-12 | balai | lomba | IG | 07:20 | A | 6af3112f1ea65c2f4ef22109 | |
| 2026-11-12 | balai | bazar | YouTube | 11:55 | B | 6af31130c3224fa2c576833f | |
| 2026-11-12 | balai | asap | IG | 12:05 | C | 6af31131c3224fa2c576835c | |
| 2026-11-12 | balai | lomba | TikTok | 12:36 | C | 6af31131c3224fa2c5768373 | |
| 2026-11-12 | balai | bazar | IG | 12:58 | C | 6af31132c3224fa2c5768385 | |
| 2026-11-12 | balai | lomba | YouTube | 14:54 | D | 6af31133c80112b9e13bec43 | |
| 2026-11-12 | balai | asap | YouTube | 21:23 | F | 6af31134c3224fa2c576839f | |
| 2026-11-12 | balai | bazar | TikTok | 21:54 | F | 6af311351ea65c2f4ef221a5 | |
| 2026-11-12 | hewan | ep014 | IG | 07:05 | A | 6af3185dc80112b9e13d6e0a | |
| 2026-11-12 | hewan | ep015 | TikTok | 08:11 | A | 6af3185ec3224fa2c5780760 | |
| 2026-11-12 | hewan | ep016 | TikTok | 08:25 | A | 6af3185f1ea65c2f4ef3a502 | |
| 2026-11-12 | hewan | ep016 | YouTube | 12:37 | C | 6af31860c3224fa2c578079d | |
| 2026-11-12 | hewan | ep014 | TikTok | 13:04 | C | 6af31861c80112b9e13d6e96 | |
| 2026-11-12 | hewan | ep014 | YouTube | 14:49 | D | 6af31862717841e194b71fa8 | |
| 2026-11-12 | hewan | ep015 | IG | 17:25 | E | 6af318621ea65c2f4ef3a55e | |
| 2026-11-12 | hewan | ep016 | IG | 20:10 | F | 6af318631ea65c2f4ef3a575 | |
| 2026-11-12 | hewan | ep015 | YouTube | 20:59 | F | 6af31864717841e194b72042 | |

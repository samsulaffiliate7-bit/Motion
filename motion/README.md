# Motion 6 akun

Pipeline video 9:16 (TikTok, Reels, Shorts): narasi Gemini TTS + visual 3D low-poly (three.js) dirender di Chromium headless.

```
GOOGLE_API_KEY=dummy python3 motion/engine/build.py <akun> <ep>          # timeline + narasi (TTS di-cache)
python3 motion/engine/build.py <akun> <ep> --draft                       # draf tanpa TTS, untuk cek visual
GOOGLE_API_KEY=dummy python3 motion/engine/cek_potongan.py <akun> <ep>   # cek potongan suara per adegan
node motion/engine/render.js <akun> <ep> --stills 3,12,30                # cek beberapa frame
node motion/engine/render.js <akun> <ep> --workers 4                     # render MP4 ke motion/out/<akun>-<ep>/
```

## Struktur
- `accounts/<akun>/config.json`: nama, handle, palet, model + suara TTS, `style` (dunia 3D).
- `episodes/<akun>/<ep>/episode.py`: `META` (label analitik), `compute()` (angka dengan assert), `SCENES` (narasi + jenis shot), opsional `END_PAD`, `SPLIT_SHIFT`, `CONFIG_OVERRIDE`. Audio TTS di `audio_<akun>/full.wav` (di-commit supaya render ulang tidak makan kuota).
- `engine/build.py`: TTS satu panggilan per video, potong per adegan, caption kata per kata, timeline.
- `engine/render.js` + `engine/player3d.html`: pemutar 3D (caption, logo) dan render frame + ffmpeg.
- `engine/w3d/kit.js`: perkakas bersama (tokoh, rumah, pohon, koin, hujan, bola bumi). `engine/w3d/<style>.js`: dunia per akun (`nana` Dompet, `kantor` Meja, `fabel` Hewan, `warga` Balai, `bumi` Denah, `desa3d` Kades), masing-masing mengekspor `SHOTS`, `chrome`, `frame`.
- `engine/bedah_video.py`: bedah video YouTube referensi dengan Gemini (struktur saja).
- `assets/`: font, logo, data peta dunia (Natural Earth, public domain). `media/repliz-files.json`: id + url video di storage Repliz.
- `out/` (di-ignore): hasil build dan render.

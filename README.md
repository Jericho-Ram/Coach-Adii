# Cek Form Gratis — Coach Adii

Landing page satu halaman untuk lead magnet **Cek Form Gratis**. Satu file HTML, tanpa build step, tanpa dependency. Deploy ke GitHub Pages.

```
index.html                    ← seluruh halaman (HTML + CSS + JS)
img/adii.jpg                  ← foto hero
scripts/capture-endpoint.gs   ← penangkap nomor WA (Google Apps Script)
.nojekyll                     ← matikan pemrosesan Jekyll
```

---

## 1. Deploy (10 menit)

**Bikin repo**

1. github.com → **New repository**
2. Nama: `cek-form` (atau apa pun)
3. **Public** — GitHub Pages gratis hanya untuk repo public
4. **Create repository**

**Upload isinya**

Lewat browser, tanpa git:

1. Di repo baru → **uploading an existing file**
2. Seret `index.html`, folder `img`, folder `scripts`, dan `.nojekyll`
3. **Commit changes**

Kalau lebih suka terminal:

```bash
git init
git add .
git commit -m "Landing page Cek Form Gratis"
git branch -M main
git remote add origin https://github.com/USERNAME/cek-form.git
git push -u origin main
```

**Nyalakan Pages**

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)` → **Save**
4. Tunggu 1–2 menit. URL-nya muncul di halaman itu:
   `https://USERNAME.github.io/cek-form/`

Setiap commit berikutnya otomatis ter-deploy dalam ±1 menit.

---

## 2. Pasang penangkap kontak — **wajib sebelum tes minggu 9**

Tanpa ini, nomor cuma ikut di pesan WhatsApp dan hilang begitu orang batal kirim. Artinya tidak ada daftar kontak, dan Test 3 tidak bisa dibaca.

Ikuti instruksi di `scripts/capture-endpoint.gs` — semuanya ada di komentar paling atas file itu. Hasilnya satu URL, tempel ke `index.html`:

```js
var FORM_ENDPOINT  = "https://script.google.com/macros/s/AKfy.../exec";
```

Alternatif kalau tidak mau Apps Script: **Formspree** (formspree.io, gratis 50 submission/bulan). Buat form baru, salin endpoint URL-nya ke variabel yang sama. Field yang dikirim bernama `wa`.

---

## 3. Yang harus diganti sebelum publish

**Di `index.html`, blok `SETTING CEPAT` paling bawah:**

```js
var WA_NUMBER      = "6281383110137";  // nomor WhatsApp Adii
var HARGA_DASAR    = 1800000;          // ← GANTI: harga dasar yang dipublish
var SESI_PER_PAKET = 12;               // ← sesuaikan kalau paketnya bukan 12 sesi
var FORM_ENDPOINT  = "";               // ← WAJIB diisi (lihat bagian 2)
```

**Di `<head>`:** ganti tiga `__SITE_URL__` dengan URL live-nya, lengkap dengan slash di akhir — misal `https://USERNAME.github.io/cek-form/`. Ini yang bikin preview link di WhatsApp dan Instagram muncul dengan gambar.

**Di body — semua yang bergaris putus-putus magenta:**

| Yang kosong | Kalau tidak diisi |
|---|---|
| Harga dasar + bulan berlakunya | Bagian harga jadi omong kosong |
| Dua testimoni | **Wajib izin tertulis dari kliennya.** Kalau belum ada, hapus dua kartunya, jangan dikarang |
| Angka klien ditangani / cek form dikirim | Hapus kotaknya daripada dikira-kira |
| Isi garansi | Hapus bloknya kalau Adii belum setuju kata-katanya |
| Kebijakan cicilan di FAQ | Hapus pertanyaannya kalau belum ada kebijakannya |

**Jangan ditambahkan:** nama gym mana pun, janji waktu balas selain "24 jam", section atau form tambahan.

---

## 4. Domain sendiri (opsional)

Kalau nanti pakai domain seperti `coachadii.com`:

1. Buat file `CNAME` di root repo, isinya satu baris: `coachadii.com`
2. Di penyedia domain, arahkan A record ke:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Settings → Pages → **Enforce HTTPS** setelah sertifikatnya terbit (±1 jam)

---

## 5. Angka yang dipantau

Sesuai Module 2, tracking-nya satu Google Sheet, bukan sistem terpisah:

- **Started** = bio link taps di Instagram Insights, dicatat 72 jam setelah post
- **Captured** = jumlah baris di Sheet penangkap kontak
- **Completion rate** = captured ÷ started, minimal 40 started per varian sebelum disimpulkan

Jangan A/B test apa pun di halaman ini sebelum ±500 kunjungan per bulan. Kalau Test 1 selesai di minggu 6, pindahkan hook yang menang ke H1 — itu memindahkan hasil yang sudah tervalidasi, bukan memulai tes baru.

# Product Requirements Document (PRD)
## Produk: Birthday Ecard Generator (MVP 1)

---

## 1. Overview

**Nama produk (sementara):** Wishly — Birthday Card
**Tipe produk:** Web app pembuat ucapan ulang tahun digital (ecard) yang bisa dipersonalisasi
**Model bisnis:** One-time purchase per kartu (bukan subscription)
**Target market:** Individu di luar negeri (US, Eropa, dsb), transaksi dalam USD
**Positioning:** "Bikin kartu ulang tahun personal dalam 2 menit, nggak bingung mau nulis apa"

**Masalah yang diselesaikan:**
- Orang sering lupa/mendadak butuh ucapan ulang tahun untuk orang terdekat
- Bingung mau menulis pesan yang personal dan tidak generic
- Kartu fisik butuh waktu & tidak praktis untuk pengiriman jarak jauh
- Ucapan via chat biasa (WhatsApp dll) terasa kurang spesial

**Value proposition:**
- Cepat: kartu jadi dalam hitungan menit
- Personal: nama, pesan, dan foto bisa disesuaikan
- Tidak perlu bingung menulis: tersedia bank pesan siap pakai per kategori hubungan
- Tidak perlu akun/login: proses beli-pakai instan
- Interaktif: kartu berbentuk halaman web dengan animasi/reveal effect, bukan gambar statis — pengalaman membuka kartu terasa lebih hidup dibanding file JPG/PNG biasa

---

## 2. Target User & Use Case

| Persona | Kebutuhan |
|---|---|
| Orang yang lupa ulang tahun teman/pasangan sampai H-1 | Solusi cepat, hasil tetap terlihat niat/personal |
| Orang yang ingin kirim ucapan ke keluarga/pasangan jarak jauh | Media yang terasa lebih personal dari chat biasa |
| Orang yang tidak percaya diri menulis pesan sendiri | Bank pesan siap pakai yang bisa diedit |

---

## 3. Scope MVP 1

### 3.1 Fitur yang DIBANGUN (in-scope)

1. **Landing Page**
   - Penjelasan value proposition singkat
   - CTA "Buat Kartu Sekarang"

2. **Editor Kartu**
   - Pilih 1 dari 2–3 template desain birthday card
   - Input nama penerima
   - Bank pesan siap pakai (20–30 varian, dikelompokkan per kategori hubungan: sahabat, pasangan, orang tua, coworker) — user pilih lalu boleh edit
   - Upload 1 foto (opsional)
   - Styling dasar: pilihan font (5–8 kurasi) dan warna aksen
   - Live preview real-time saat edit
   - Animasi/transisi halus pada interaksi (menggunakan Framer Motion atau setara)

3. **Preview**
   - Menampilkan hasil akhir kartu dalam versi statis/screenshot dengan watermark (bukan versi interaktif penuh)
   - Halaman kartu interaktif yang sebenarnya (tanpa watermark) hanya bisa diakses setelah pembayaran berhasil

4. **Checkout**
   - Single price tier (contoh: $3)
   - Input email pembeli (bukan untuk membuat akun, hanya untuk pengiriman hasil)
   - Diproses via Lemon Squeezy (checkout embed/redirect)

5. **Delivery Otomatis**
   - Setelah pembayaran sukses, sistem menerima webhook dari Lemon Squeezy
   - Data kartu (bukan gambar jadi) disimpan ke database dengan status `paid = true`
   - Sistem generate URL unik untuk kartu tersebut (contoh: `wishly.com/c/xyz123`)
   - Link URL unik ini dikirim otomatis ke email pembeli
   - Membuka link tersebut menampilkan halaman kartu interaktif penuh (dengan animasi/reveal effect), bukan file gambar yang didownload

### 3.2 Yang TIDAK dibangun di MVP 1 (out-of-scope)

- Autentikasi/login/akun user
- Riwayat kartu tersimpan
- Multi metode pembayaran (hanya Lemon Squeezy di MVP 1)
- Multi-tier harga
- Kartu animasi/video message
- Fitur virtual gift tambahan
- AI writing assistant (dipertimbangkan di fase berikutnya setelah validasi demand)
- Vertikal kartu selain birthday (anniversary, thank you, dll — direncanakan sebagai subfolder di fase berikutnya, contoh: `domain.com/anniversary`)

---

## 4. Business Process

### 4.1 Alur Customer (User Journey)

```
1. Landing Page
   └─ Traffic dari SEO / Pinterest / Sosmed / Ads

2. Pilih Template

3. Editor (Personalisasi)
   └─ Isi nama penerima
   └─ Pilih/edit pesan dari bank pesan
   └─ Upload foto (opsional)
   └─ Atur styling (font/warna)

4. Preview (dengan watermark)

5. Checkout
   └─ Isi email → bayar via Lemon Squeezy

6. Delivery
   └─ Terima email berisi link download kartu final (tanpa watermark)

7. User membagikan kartu ke penerima
```

### 4.2 Alur Backend (System Process)

```
1. Payment masuk via Lemon Squeezy (Merchant of Record)
   └─ Lemon Squeezy menangani pajak, konversi mata uang, fraud check

2. Webhook "order_created" diterima oleh API route
   └─ Verifikasi signature webhook
   └─ Ambil data desain (template, nama, pesan, foto) yang sebelumnya disimpan sementara saat user di editor

3. Update status kartu di database
   └─ Set status "paid = true" untuk card_id terkait
   └─ Generate card_id unik (UUID/nanoid) jika belum ada, dipakai sebagai bagian dari URL

4. Kirim email otomatis
   └─ Berisi link unik ke halaman kartu (contoh: wishly.com/c/xyz123)
   └─ Membuka link ini menampilkan halaman interaktif kartu (bukan file gambar)
```

**Catatan:** Karena delivery berbentuk halaman web (bukan file), tidak ada proses "generate gambar final" yang disimpan ke storage. Yang disimpan adalah data kartu (teks, foto, styling, template) di database, dan halaman kartu di-render secara dinamis setiap kali link dibuka.

### 4.3 Alur Uang (Money Flow)

```
Customer bayar (USD)
   → Lemon Squeezy potong fee (~5% + $0.50)
   → Dana ditahan 13 hari (fraud prevention)
   → Payout diproses tanggal 1 & 15 tiap bulan
   → Konversi USD → IDR (kurs mid-market)
   → Masuk rekening bank Indonesia (1–5 hari kerja)

Estimasi total: transaksi → dana cair ≈ 2–3 minggu (awal)
```

---

## 5. Functional Requirements

| ID | Requirement |
|---|---|
| FR-1 | Sistem menampilkan minimal 2–3 template kartu birthday yang bisa dipilih user |
| FR-2 | User dapat menginput nama penerima dan pesan (dari bank pesan atau custom) |
| FR-3 | User dapat mengunggah 1 foto opsional ke dalam desain kartu |
| FR-4 | Sistem menampilkan preview real-time dari hasil edit |
| FR-5 | Preview yang ditampilkan sebelum pembayaran wajib memiliki watermark |
| FR-6 | Sistem mengarahkan user ke checkout Lemon Squeezy dengan harga flat |
| FR-7 | Sistem menerima dan memverifikasi webhook dari Lemon Squeezy |
| FR-8 | Sistem menyimpan data kartu (template, nama, pesan, foto, styling) ke database dan menandai status `paid = true` setelah pembayaran terverifikasi |
| FR-9 | Sistem meng-generate URL unik (sulit ditebak, contoh UUID/nanoid) untuk setiap kartu yang sudah dibayar, dan mengirim link tersebut ke email pembeli |
| FR-10 | Halaman kartu interaktif hanya bisa diakses penuh (tanpa watermark) jika status kartu `paid = true`; jika belum bayar, halaman menampilkan pesan/redirect yang sesuai |
| FR-11 | Halaman kartu harus menampilkan animasi/interaksi (reveal effect) saat dibuka, dioptimalkan untuk mobile browser (iOS Safari & Android Chrome) |
| FR-12 | Tidak ada requirement autentikasi/login user di MVP 1 |

---

## 6. Non-Functional Requirements

- **Performance:** Editor harus responsif (< 200ms delay untuk update preview saat edit)
- **Reliability:** Webhook harus idempotent (tidak boleh generate ganda jika Lemon Squeezy mengirim webhook duplikat)
- **Security:**
  - Verifikasi signature webhook Lemon Squeezy wajib dilakukan sebelum memproses order
  - `card_id` harus di-generate secara acak (UUID/nanoid), tidak boleh sequential, agar tidak mudah ditebak orang lain
  - Halaman kartu dengan status belum bayar tidak boleh menampilkan konten penuh meski `card_id` diketahui
- **Scalability:** Struktur folder/routing harus mempertimbangkan ekspansi ke vertikal kartu lain di masa depan (subfolder-based, bukan subdomain)
- **Compatibility:** Harus optimal di mobile browser (mayoritas traffic sosmed/Pinterest diakses dari mobile, dan penerima kartu kemungkinan besar membuka link dari aplikasi chat di HP)
- **Performance halaman kartu:** Waktu loading halaman kartu interaktif harus cepat (target first render < 2 detik) agar pengalaman "buka kartu" tidak terasa lambat

---

## 7. Tech Stack

| Layer | Teknologi |
|---|---|
| Fullstack Framework | Next.js (App Router) |
| Editor Canvas | Fabric.js atau Konva.js |
| Animasi UI (editor & halaman kartu) | Framer Motion |
| Database (simpan data kartu) | Supabase / PlanetScale / Vercel Postgres |
| ID unik untuk URL kartu | UUID atau nanoid |
| Storage Foto Upload | Vercel Blob atau Cloudinary (khusus untuk foto yang diupload user, bukan gambar kartu jadi) |
| Payment Gateway (Merchant of Record) | Lemon Squeezy |
| Email Delivery | Resend |
| Hosting | Vercel |

---

## 8. Success Metrics (untuk validasi MVP)

- Jumlah transaksi berhasil per minggu
- Conversion rate: landing page → mulai edit → checkout → bayar
- Drop-off point terbesar dalam funnel (untuk tahu di mana user paling banyak berhenti)
- Rata-rata waktu yang dihabiskan user di editor

---

## 9. Roadmap Setelah MVP 1 (Fase 2+)

- AI writing assistant untuk generate pesan personal
- Ekspansi vertikal kartu lain (anniversary, thank you, dll) via subfolder
- Multi metode pembayaran tambahan
- Fitur riwayat kartu (butuh auth)
- Kartu animasi/video message
- Virtual gift add-on

---

---

# Instruksi Desain UI/UX untuk Google Stitch

Gunakan brief berikut sebagai prompt/instruksi saat membuat desain di Google Stitch.

## Konteks Produk
Web app pembuat kartu ucapan ulang tahun digital yang personal. Target user: individu di luar negeri yang ingin membuat kartu ucapan cepat namun tetap terasa personal dan berkualitas. Nuansa produk: hangat, ceria, personal, tidak kaku/corporate.

## Halaman yang perlu didesain

1. **Landing Page**
   - Hero section dengan headline yang menekankan kecepatan ("Buat kartu ulang tahun personal dalam 2 menit") dan personalisasi
   - Preview visual dari beberapa contoh kartu (mockup)
   - CTA jelas: "Buat Kartu Sekarang"
   - Section singkat: cara kerja (3 langkah: pilih desain → personalisasi → kirim)

2. **Halaman Editor**
   - Layout split-screen: panel kontrol di satu sisi (pilih template, isi nama, pilih/edit pesan dari bank pesan, upload foto, pilih font & warna), live preview kartu di sisi lain
   - Untuk mobile: preview di atas, kontrol edit di bawah (stack vertikal), dengan tab/segmented control untuk pindah antar jenis pengaturan (teks, foto, style)
   - Interaksi drag foto & resize harus terasa halus dan intuitif
   - Bank pesan ditampilkan sebagai list/card yang bisa di-scroll dan dipilih, dikelompokkan per kategori (sahabat, pasangan, orang tua, coworker)

3. **Halaman Preview & Checkout**
   - Preview kartu final (dengan watermark) ditampilkan besar dan jelas
   - Tombol checkout yang jelas dengan harga tercantum
   - Input email singkat sebelum diarahkan ke Lemon Squeezy checkout
   - Trust signal ringan (misal ikon "pembayaran aman", metode pembayaran yang didukung)

4. **Halaman Konfirmasi (setelah bayar)**
   - Pesan konfirmasi hangat ("Kartu kamu sudah siap!")
   - Instruksi bahwa link kartu (bukan file download) akan dikirim ke email, dan link tersebut bisa langsung dibagikan ke penerima

5. **Halaman Kartu Interaktif (yang dibuka via link, oleh pembeli maupun penerima)**
   - Ini adalah halaman utama yang dilihat penerima kartu — harus dirancang paling matang secara emosional
   - Pertimbangkan animasi "reveal" saat halaman pertama dibuka (misal efek buka amplop/kartu, confetti, atau transisi masuk yang halus) sebelum konten pesan sepenuhnya terlihat
   - Tampilkan foto (jika ada), nama penerima, dan pesan dengan tipografi yang jadi pusat perhatian
   - Desain harus tetap ringan/cepat dimuat meski ada animasi (hindari elemen berat yang bikin loading lama di mobile)
   - Sertakan elemen kecil yang memancing rasa penasaran penerima soal dari mana kartu ini dibuat (misal watermark halus/logo kecil di footer halaman, tanpa mengganggu pengalaman utama)

## Prinsip Desain
- **Warna:** palet ceria dan hangat (misal kombinasi warm pastel atau warna cerah yang asosiatif dengan perayaan), hindari palet yang terlalu korporat/dingin
- **Tipografi:** kombinasi font yang friendly namun tetap readable; hindari terlalu banyak variasi font sekaligus
- **Micro-interaction:** animasi halus saat transisi antar step, saat kartu di-preview, dan saat tombol ditekan — hindari perubahan yang instan/kaku
- **Mobile-first:** mayoritas traffic diperkirakan dari mobile (sumber traffic: Pinterest, sosial media), maka layout harus dioptimalkan untuk layar kecil terlebih dahulu
- **Kesederhanaan alur:** minimalkan jumlah klik/step dari landing page sampai checkout; hindari elemen UI yang tidak perlu
- **Emosional:** desain harus membangkitkan perasaan hangat/personal, bukan kesan "tools/software" yang teknis

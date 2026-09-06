<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wishly — Birthday Ecard Generator (Agent Guidelines & Project Standards)

Dokumen ini menjadi acuan utama bagi AI Agent dan developer dalam mengembangkan project **Wishly**. Dokumen PRD lengkap dapat dilihat di [PRD-birthday-ecard-mvp.md](file:///home/rifai/project/wishly/PRD-birthday-ecard-mvp.md).

---

## 1. Project Overview & Scope Rules

- **Nama Produk:** Wishly — Birthday Card
- **Tipe:** Web App digital ecard generator personal, one-time payment ($3 USD) via Lemon Squeezy.
- **Batasan MVP 1 (STRICT):**
  - **In-scope:** Landing page, Editor kartu (template, nama, bank pesan, upload foto, styling font & warna, live preview), Halaman Preview dengan watermark, Checkout Lemon Squeezy, Webhook handler, Halaman kartu interaktif dinamis ber-URL unik (`/c/[cardId]`) dengan animasi reveal, dan Email delivery via Resend.
  - **Out-of-scope:** Jangan buat sistem login/akun, jangan buat multi-payment gateway, jangan buat multi-tier pricing, jangan buat AI writing assistant, dan jangan buat kartu animasi video/gift add-on pada MVP 1.

---

## 2. Struktur Direktori Project

Project menggunakan **Next.js 16 (App Router)** dengan TypeScript dan Tailwind CSS:

```
wishly/
├── app/                                # Next.js App Router
│   ├── layout.tsx                      # Root layout, Google fonts, metadata
│   ├── globals.css                     # Global styles & Tailwind CSS directives
│   ├── page.tsx                        # Landing Page
│   ├── create/page.tsx                 # Editor Kartu
│   ├── preview/page.tsx                # Halaman Preview (Watermarked)
│   ├── c/[cardId]/page.tsx             # Halaman Kartu Interaktif Final
│   ├── success/page.tsx                # Halaman Konfirmasi Pembayaran
│   └── api/                            # API Routes & Webhooks
│       ├── cards/route.ts              # Create & fetch card drafts
│       ├── upload/route.ts             # Upload foto
│       ├── checkout/route.ts           # Inisialisasi Lemon Squeezy
│       └── webhook/lemon-squeezy/route.ts # Webhook listener
├── components/
│   ├── ui/                             # Komponen atomik (Button, Input, Card, Modal, dll)
│   ├── landing/                        # Komponen khusus Landing Page
│   ├── editor/                         # Komponen kontrol Editor (TemplateSelector, MessageBank, StylePicker)
│   ├── card/                           # Komponen CardRenderer & WatermarkOverlay
│   └── interactive/                    # Komponen animasi reveal kartu untuk penerima
├── lib/
│   ├── db/                             # Konfigurasi & helper database
│   ├── templates.ts                    # Metadata & styling 3 template kartu
│   ├── message-bank.ts                 # Bank pesan per kategori hubungan
│   ├── lemon-squeezy.ts                # Client & webhook verifier
│   └── resend.ts                       # Helper email sender
├── types/
│   └── card.ts                         # Interface TypeScript kartu & order
├── public/                             # Aset statis, ikon, gambar default
├── PRD-birthday-ecard-mvp.md           # Product Requirements Document (PRD)
├── AGENTS.md                           # Instruksi dan panduan agent ini
└── package.json
```

---

## 3. Konvensi Koding & Naming

1. **File & Folder:**
   - Direktori & file komponen non-page: `kebab-case.tsx` atau `PascalCase.tsx` (konsisten, disarankan `kebab-case.tsx` misal `card-renderer.tsx`).
   - File route: sesuai standar App Router (`page.tsx`, `layout.tsx`, `route.ts`).
   - Utility & helper: `kebab-case.ts` (misal `message-bank.ts`).
2. **TypeScript:**
   - Semua kode wajib bertipe jelas (hindari `any`).
   - Definisikan tipe terpusat di `types/`.
3. **Styling & Desain:**
   - Nuansa: hangat, ramah, emosional, ceria, dan tidak kaku/corporate.
   - Mobile-First: semua tampilan harus optimal di layar 375px - 430px sebelum desktop.
   - Micro-interactions: gunakan Framer Motion untuk transisi halus saat pemilihan template, preview, dan pembukaan amplop/kartu.
4. **Next.js 16 Specifics:**
   - Gunakan `'use client'` hanya pada komponen yang membutuhkan state/browser interactivity (seperti canvas, editor input, dan animasi interaktif).
   - Server Components untuk halaman yang me-render data statis/server data.
   - Parameter dinamis halaman (`params`) di App Router versi terbaru bersifat Promise (`await params`).

---

## 4. Cara Menjalankan Project Secara Lokal

```bash
# Install dependencies
npm install

# Menjalankan development server
npm run dev

# Membangun build produksi & verifikasi type check
npm run build

# Menjalankan linting
npm run lint
```

---

## 5. Alur Kerja Modular (9 Tahap)

1. **Tahap 1:** Setup project Next.js + struktur folder + AGENTS.md
2. **Tahap 2:** Setup database & schema data kartu
3. **Tahap 3:** Bangun Editor kartu (template, nama, bank pesan, upload foto, styling)
4. **Tahap 4:** Bangun halaman Preview ber-watermark
5. **Tahap 5:** Integrasi checkout Lemon Squeezy
6. **Tahap 6:** Bangun webhook handler Lemon Squeezy (verifikasi signature & idempotency)
7. **Tahap 7:** Bangun halaman kartu interaktif dinamis (`/c/[cardId]`) dengan reveal effect
8. **Tahap 8:** Integrasi pengiriman email via Resend
9. **Tahap 9:** Testing end-to-end (Lemon Squeezy test mode)

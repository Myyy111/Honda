---
description: Cara deploy website AutoPremium
---

# Panduan Deployment

Website ini dirancang untuk dideploy ke **Vercel** dengan database **PostgreSQL** (disarankan menggunakan Supabase atau Vercel Postgres).

## 1. Persiapan Database
1. Link akun Supabase atau buat database PostgreSQL baru.
2. Dapatkan `DATABASE_URL` (Connection String).

## 2. Environment Variables
Tambahkan variabel berikut di dashboard Vercel:
- `DATABASE_URL`: URL koneksi PostgreSQL Anda.

## 3. Langkah Deployment (Lokal ke VERCEL CLI)
// turbo
1. Login ke Vercel: `vercel login`
2. Inisialisasi project: `vercel`
3. Push ke production: `vercel --prod`

## 4. Inisialisasi Data (Seed)
Setelah database terhubung, jalankan perintah ini untuk mengisi data awal:
// turbo
`npx prisma db push`
`npx prisma db seed`

---
*Catatan: Pastikan Anda telah menjalankan `npm install` dan `npx prisma generate` sebelum mendeploy.*

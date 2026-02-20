---
description: Prosedur WAJIB sebelum menjalankan migrasi atau perubahan database
---

# ⚠️ PROSEDUR MIGRASI DATABASE AMAN ⚠️

**JANGAN PERNAH** menjalankan `prisma migrate`, `prisma db push`, atau perintah apapun yang mengubah struktur database TANPA mengikuti langkah-langkah ini:

1.  **MINTA IZIN (WAJIB)**
    *   Beritahu USER bahwa perubahan struktur database akan dilakukan.
    *   Jelaskan risiko kehilangan data (jika ada).
    *   Tunggu konfirmasi USER sebelum melanjutkan.

2.  **BACKUP DATABASE (WAJIB)**
    *   Sebelum melakukan perubahan, salin file database saat ini (`dev.db`) ke lokasi aman.
    *   Contoh perintah: `copy dev.db dev_backup_TIMESTAMP.db`
    *   Pastikan backup berhasil dibuat.

3.  **JALANKAN MIGRASI**
    *   Hanya jalankan perintah migrasi setelah langkah 1 dan 2 selesai.
    *   Gunakan perintah `npx prisma migrate dev --name <nama_migrasi>` atau yang sesuai.

4.  **VERIFIKASI**
    *   Pastikan data aman setelah migrasi.
    *   Jika terjadi kesalahan, pulihkan dari backup yang telah dibuat.

**INGAT:** KESELAMATAN DATA USER ADALAH PRIORITAS UTAMA. JANGAN PERNAH MENGHAPUS ATAU MERESET DATABASE TANPA IZIN EKSPLISIT.

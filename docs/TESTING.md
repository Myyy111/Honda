# 🧪 TESTING GUIDE - AutoPremium Honda

Panduan lengkap mengenai testing pada website sales mobil Honda.

## 🚀 Quick Start

### Run All Tests
```bash
npm run test:run
```

### Run Tests in Watch Mode
```bash
npm run test
```

### Run Tests with UI
```bash
npm run test:ui
```

### Generate Coverage Report
```bash
npm run test:coverage
```

---

## 🛠️ Testing Stack

- **Vitest** - Unit & Component testing framework
- **React Testing Library** - Component rendering and interaction
- **jsdom** - Browser environment simulation
- **v8** - Coverage reporting

---

## 📂 Test Structure

Semua testing berada di folder `/tests`:

```
tests/
├── components/          # React Component Tests
│   └── login-form.test.tsx
├── lib/               # Utility & Logic Tests
│   ├── auth-utils.test.ts
│   ├── rate-limit.test.ts
│   └── validation.test.ts
└── setup.tsx           # Setup & Global Mocks
```

---

## ✅ Coverage Areas

### 1. Authentication Utilities (`src/lib/auth-utils.ts`)
- ✅ Password hashing & salting
- ✅ Password verification accuracy
- ✅ Password strength validation rules
- ✅ Secure password generation logic

### 2. Rate Limiting (`src/lib/rate-limit.ts`)
- ✅ Request tracking per identifier
- ✅ Blocking after maximum attempts
- ✅ Reset functionality
- ✅ Retry window calculation

### 3. Input Validation (`src/lib/validation.ts`)
- ✅ Login schema validation (trim, lowercase, format)
- ✅ Admin & Car data schemas
- ✅ HTML Sanitization (XSS prevention)
- ✅ Input length restrictions

### 4. Components (`src/components/login-form.tsx`)
- ✅ Form rendering & layout
- ✅ Input state management
- ✅ Required field validation
- ✅ Error message display

---

## 🔧 Mocking & Configuration

### Global Mocks (`tests/setup.tsx`)
Kami melakukan mocking untuk fitur Next.js agar dapat ditest di environment Vitest:
- `next/navigation` (Router, Pathname, SearchParams)
- `next/headers` (Headers for server actions)
- `next/image` (Next.js Image component optimization)

### Component Mocks
Pada testing UI, kami melakukan mocking untuk Server Actions agar tidak memanggil database saat testing:
```typescript
vi.mock('@/actions/auth-action', () => ({
  authenticate: vi.fn(),
  logout: vi.fn(),
}));
```

---

## 📋 Security Checklist (Testing)

Setiap perubahan pada security logic **WAJIB** melalui testing berikut:

- [ ] Pastikan password hashing tidak menyimpan plain text
- [ ] Pastikan rate limit tidak bisa di-bypass dengan IP yang sama
- [ ] Pastikan input XSS di-escape dengan benar
- [ ] Pastikan password lemah ditolak oleh validator

---

## 🚨 Troubleshooting

### "vi is not defined"
Pastikan `vi` di-import dari `vitest`:
```typescript
import { vi } from 'vitest'
```

### "next/headers not found"
Pastikan `next/headers` di-mock di `tests/setup.tsx` karena modul ini hanya tersedia di environment Node.js Server.

### "Prisma Client initialization error"
Jangan melakukan testing yang memanggil database langsung di Unit Test. Gunakan Mock untuk Prisma atau Server Actions.

---

## 📊 Coverage Result

Hasil coverage terakhir:
- **Logic Coverage:** > 90%
- **Component Coverage:** > 80%

Hasil lengkap dapat dilihat di `coverage/index.html` setelah menjalankan `npm run test:coverage`.

---

**Last Updated:** February 14, 2026  
**Version:** 1.0

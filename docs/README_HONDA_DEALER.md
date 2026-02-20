# Autoland Honda - Dokumentasi

## 🎯 **Overview**
Website ini adalah **dealer resmi Honda Indonesia** yang menjual berbagai model mobil Honda dengan desain premium modern terinspirasi dari Mercedes-Benz aesthetic.

---

## 🚗 **Brand Identity**

### Logo & Branding
- **Nama**: Autoland
- **Tagline**: "The Power of Dreams"
- **Warna Utama**: Red (accent), Slate (neutral)
- **Font**: Inter (system font) dengan font-weight light untuk elegance

### Positioning
- Dealer resmi Honda Indonesia
- Fokus pada kualitas, teknologi, dan layanan purna jual
- Target market: Premium car buyers mencari Honda berkualitas

---

## 📄 **Halaman Website**

### 1. **Homepage** (`/`)
**Sections:**
- ✅ **Hero Section**
  - Honda logo badge dengan tagline
  - "Dealer Resmi Honda Indonesia"
  - Stats: 50+ Unit Honda, 10+ Model, 100% Garansi Resmi
  
- ✅ **Model Categories**
  - Sedan (2 Unit)
  - SUV (3 Unit)
  - Hatchback (2 Unit)
  - MPV (1 Unit)

- ✅ **Featured Honda Cars**
  - Grid 4 kolom (responsive)
  - 4 unit Honda pilihan
  - Link ke katalog lengkap

- ✅ **Honda Features**
  - Honda Sensing (keselamatan)
  - Mesin VTEC (performa)
  - Garansi Resmi (layanan)

- ✅ **Why Choose Us**
  - Dealer Resmi Honda
  - Inspeksi 180 Titik
  - Garansi & Servis

- ✅ **CTA Section**
  - "Siap Memiliki Honda Impian?"
  - Hubungi Kami / Lihat Katalog

### 2. **Katalog** (`/mobil`)
**Features:**
- ✅ Header: "Katalog Honda"
- ✅ Filter sidebar (desktop):
  - Urutkan (Terbaru, Harga, Tahun)
  - Model Honda (CR-V, Civic, Accord, HR-V, BR-V, City)
  - Tipe Transmisi
  - Range Harga
  
- ✅ Mobile filter (bottom sheet)
- ✅ Grid/List view toggle
- ✅ Menampilkan 6 unit Honda
- ✅ Pagination

### 3. **Navigation**
- Beranda → `/`
- Katalog → `/mobil`
- Promo → `/promo`
- Tentang → `/tentang`
- Kontak → `/kontak`

---

## 🚗 **Model Honda Tersedia**

### Current Inventory (6 Units)

1. **Honda CR-V 1.5 Turbo Prestige** (2023)
   - Harga: Rp 625.000.000
   - KM: 8.000
   - Status: Available

2. **Honda Civic RS Hatchback** (2022)
   - Harga: Rp 585.000.000
   - KM: 15.000
   - Status: Available

3. **Honda Accord 1.5 Turbo** (2023)
   - Harga: Rp 750.000.000
   - KM: 5.000
   - Status: Available

4. **Honda HR-V 1.5 SE CVT** (2022)
   - Harga: Rp 425.000.000
   - KM: 22.000
   - Status: Available

5. **Honda BR-V 1.5 Prestige** (2023)
   - Harga: Rp 315.000.000
   - KM: 12.000
   - Status: Available

6. **Honda City Hatchback RS** (2022)
   - Harga: Rp 365.000.000
   - KM: 18.000
   - Status: SOLD

---

## 🎨 **Design System**

### Typography
- **Headings**: font-light (300) untuk premium feel
- **Body**: font-light untuk readability
- **Labels**: font-medium (500) untuk emphasis
- **Tracking**: 0.2em untuk overlines/labels

### Spacing Scale
- **Section padding**: py-20 md:py-32
- **Card padding**: p-6, p-8 md:p-10
- **Gaps**: gap-6 md:gap-8, gap-8 md:gap-12

### Color Palette
```css
Primary Text: slate-900
Secondary Text: slate-600
Tertiary Text: slate-400
Accent: red-600
Borders: slate-100, slate-200
Backgrounds: white, slate-50, slate-950
```

### Components
- **Buttons**: rounded-none (sharp corners)
- **Cards**: border border-slate-200, no rounded corners
- **Images**: aspect-[4/3] untuk consistency
- **Hover**: subtle scale-105, opacity transitions

---

## ✨ **UI/UX Principles Applied**

### Visual Hierarchy
✅ F-pattern reading flow
✅ Size, weight, color untuk emphasis
✅ Consistent overline → heading → body pattern

### Gestalt Principles
✅ Proximity - Related items grouped
✅ Similarity - Consistent patterns
✅ Continuity - Smooth flow

### Accessibility (WCAG 2.1 AA)
✅ ARIA labels untuk screen readers
✅ Keyboard navigation support (tabIndex)
✅ Focus indicators (focus:ring-2)
✅ Touch targets ≥ 44px
✅ Color contrast ratios
✅ Semantic HTML

### Micro-interactions
✅ Purposeful hover states
✅ Smooth transitions (duration-300, duration-500)
✅ Icon animations on hover
✅ Staggered entrance animations (Framer Motion)

### Performance
✅ Responsive image sizes
✅ Next.js Image optimization
✅ Optimized animations (transform, opacity only)
✅ Lazy loading

---

## 📱 **Responsive Breakpoints**

```css
Mobile: < 640px (base styles)
sm: 640px (2 columns)
md: 768px (typography scaling, 3 columns)
lg: 1024px (4 columns, desktop nav)
xl: 1280px (max content width)
```

### Mobile Optimizations
- Full-width hero dengan proper padding
- Stacked layouts untuk content sections
- Touch-friendly buttons (min 44px)
- Bottom sheet filters
- Readable typography dengan proper scaling

---

## 🔧 **Tech Stack**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image

---

## 🚀 **Development**

### Run Development Server
```bash
npm run dev
```
Access: `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

### Deploy
See `/deploy` workflow for deployment instructions

---

## 📊 **SEO Recommendations**

### Meta Tags (To Implement)
```tsx
export const metadata = {
  title: "Dealer Resmi Honda Indonesia | Honda Dealer",
  description: "Dealer resmi Honda Indonesia. Temukan berbagai model Honda terbaik dengan teknologi canggih, garansi resmi, dan layanan purna jual terpercaya.",
  keywords: "Honda, dealer Honda, mobil Honda, CR-V, Civic, Accord, HR-V, BR-V, City, Honda Indonesia",
};
```

### Structured Data
- Product schema untuk setiap mobil
- Organization schema untuk dealer
- LocalBusiness schema untuk lokasi
- BreadcrumbList untuk navigation

---

## 🎯 **Conversion Strategy**

### Primary CTAs
1. **"Lihat Koleksi"** - Browse inventory
2. **"Hubungi Kami"** - Direct contact
3. **"Lihat Katalog"** - Full catalog view

### Trust Signals
- ✅ Dealer Resmi Honda Indonesia
- ✅ Garansi resmi Honda
- ✅ Inspeksi 180 titik
- ✅ Layanan purna jual
- ✅ Teknologi Honda Sensing & VTEC

### Social Proof (To Add)
- Customer testimonials
- Google reviews integration
- Instagram feed
- Success stories

---

## 📝 **Content Updates**

### To Update Regularly
1. **Car Inventory** (`HONDA_CARS` array)
   - Add/remove units
   - Update prices
   - Update status (AVAILABLE/SOLD)

2. **Promo Section**
   - Monthly promotions
   - Special offers
   - Financing options

3. **Blog/News** (Future)
   - Honda news
   - Model reviews
   - Maintenance tips

---

## 🔮 **Future Enhancements**

### Phase 2
- [ ] Admin panel untuk manage inventory
- [ ] Real-time WhatsApp integration
- [ ] Financing calculator
- [ ] Trade-in valuation tool
- [ ] Test drive booking system

### Phase 3
- [ ] Customer portal
- [ ] Service booking
- [ ] Parts ordering
- [ ] Loyalty program
- [ ] Virtual showroom (360° views)

---

## 📞 **Contact Integration**

### To Configure
- WhatsApp Business API
- Phone number click-to-call
- Contact form submissions
- Email notifications
- CRM integration

---

**Created with ❤️ by Senior UI/UX Designer**
**Design inspired by Mercedes-Benz premium aesthetic**
**Exclusively for Honda Indonesia**

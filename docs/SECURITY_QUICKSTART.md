# 🚀 QUICK START - Security Setup

Panduan cepat untuk setup security pada website Honda.

## ⚡ Fast Track (5 Menit)

### 1. Generate NEXTAUTH_SECRET

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

Copy output dan paste ke `.env`:
```bash
NEXTAUTH_SECRET="paste-output-here"
```

### 2. Create Admin User

```bash
npm run admin:create
```

Ikuti prompts:
- **Username (email):** admin@autopremium.com
- **Password:** Buat password yang kuat (min 8 chars, uppercase, lowercase, number, special char)
- **Name:** Master Admin

### 3. Test Login

```bash
npm run dev
```

Buka: http://localhost:3000/login

Login dengan credentials yang baru dibuat.

✅ **Done!** Security sudah aktif.

---

## 📋 Detailed Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm atau yarn

### Step 1: Install Dependencies

```bash
npm install
```

Dependencies yang ditambahkan:
- `bcryptjs` - Password hashing
- `zod` - Input validation
- `@types/bcryptjs` - TypeScript types

### Step 2: Database Setup

**Update `.env` dengan PostgreSQL connection:**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/honda_db"
```

**Run migrations:**

```bash
npm run db:push
```

### Step 3: Environment Variables

**Generate secure NEXTAUTH_SECRET:**

```bash
# Windows
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Linux/Mac
openssl rand -base64 32
```

**Update `.env`:**

```bash
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 4: Create Admin User

**Option A: Interactive Script (Recommended)**

```bash
npm run admin:create
```

**Option B: Direct Database**

```typescript
import { hashPassword } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

const password = await hashPassword('YourSecurePass123!');

await prisma.admin.create({
    data: {
        username: 'admin@autopremium.com',
        password: password,
        name: 'Master Admin'
    }
});
```

### Step 5: Test Everything

**Start dev server:**
```bash
npm run dev
```

**Test login:**
1. Go to: http://localhost:3000/login
2. Enter credentials
3. Should redirect to admin dashboard

**Test rate limiting:**
1. Try wrong password 5 times
2. Should see: "Too many login attempts..."
3. Wait 15 minutes or restart server

---

## 🔧 Common Commands

### Admin Management

```bash
# Create new admin
npm run admin:create

# Update admin password
npm run admin:update-password

# Open Prisma Studio (view database)
npm run db:studio
```

### Database

```bash
# Push schema changes
npm run db:push

# Run migrations (production)
npm run db:migrate

# View database
npm run db:studio
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## ✅ Security Checklist

### Before Going Live

- [ ] NEXTAUTH_SECRET is strong (32+ characters)
- [ ] All admin passwords are hashed
- [ ] Database uses PostgreSQL (not SQLite)
- [ ] HTTPS is enabled
- [ ] Rate limiting is working
- [ ] Input validation is active
- [ ] Session timeout is 30 minutes
- [ ] .env is in .gitignore

### Test Checklist

- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Rate limiting blocks after 5 attempts
- [ ] Session expires after 30 minutes
- [ ] Password validation works
- [ ] Admin dashboard is protected

---

## 🚨 Troubleshooting

### "Invalid credentials" with correct password

**Problem:** Password not hashed in database

**Solution:**
```bash
npm run admin:update-password
```

### "Too many login attempts"

**Problem:** Rate limit exceeded

**Solution:** Wait 15 minutes or restart dev server

### "NEXTAUTH_SECRET not set"

**Problem:** Missing environment variable

**Solution:** Add to `.env`:
```bash
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

### Database connection error

**Problem:** Wrong DATABASE_URL

**Solution:** Check PostgreSQL is running and credentials are correct:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

---

## 📚 Next Steps

1. ✅ **Read SECURITY.md** - Full security documentation
2. ✅ **Read AUDIT_FULLSTACK_HONDA_WEBSITE.md** - Complete audit report
3. ✅ **Setup monitoring** - Track login attempts
4. ✅ **Enable HTTPS** - For production
5. ✅ **Backup database** - Regular backups

---

## 🆘 Need Help?

1. Check **SECURITY.md** for detailed documentation
2. Check **AUDIT_FULLSTACK_HONDA_WEBSITE.md** for recommendations
3. Review error logs in console
4. Check database with `npm run db:studio`

---

**Last Updated:** February 14, 2026  
**Version:** 1.0

# 🔧 TROUBLESHOOTING GUIDE

## Database Connection Error

### Error Message
```
error: Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

### Solution

Anda mengalami error ini karena Prisma schema menggunakan PostgreSQL tapi DATABASE_URL tidak sesuai. Saya telah mengupdate ke SQLite untuk development yang lebih mudah.

---

## ✅ Quick Fix Steps

### 1. Stop All Running Processes

**Stop dev server:**
- Tekan `Ctrl+C` di terminal yang menjalankan `npm run dev`

**Stop admin:create script:**
- Tekan `Ctrl+C` di terminal yang menjalankan `npm run admin:create`

### 2. Setup Database

**Option A: Using Batch Script (Recommended)**
```bash
# Double-click atau run:
setup-database.bat
```

**Option B: Manual Commands**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 3. Restart Dev Server

```bash
npm run dev
```

### 4. Create Admin User

```bash
npm run admin:create
```

---

## 🗄️ Database Options

### SQLite (Current - For Development) ✅

**Pros:**
- ✅ No installation needed
- ✅ File-based (easy backup)
- ✅ Perfect for development
- ✅ Zero configuration

**Cons:**
- ⚠️ Not suitable for production
- ⚠️ Limited concurrent connections

**Configuration:**
```env
DATABASE_URL="file:./dev.db"
```

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

---

### PostgreSQL (For Production)

**Pros:**
- ✅ Production-ready
- ✅ Scalable
- ✅ Advanced features
- ✅ Better performance

**Cons:**
- ⚠️ Requires installation
- ⚠️ More complex setup

**Setup Steps:**

1. **Install PostgreSQL**
   - Download: https://www.postgresql.org/download/windows/
   - Install with default settings
   - Remember your password!

2. **Create Database**
   ```sql
   CREATE DATABASE honda_db;
   ```

3. **Update Configuration**

   **prisma/schema.prisma:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

   **.env:**
   ```env
   DATABASE_URL="postgresql://postgres:your-password@localhost:5432/honda_db?schema=public"
   ```

4. **Push Schema**
   ```bash
   npx prisma db push
   ```

---

## 🚨 Common Issues

### Issue 1: "EPERM: operation not permitted"

**Cause:** File is locked by running process

**Solution:**
1. Stop all terminals running npm commands
2. Close VS Code
3. Reopen and try again

### Issue 2: "Prisma Client not found"

**Cause:** Prisma client not generated

**Solution:**
```bash
npx prisma generate
```

### Issue 3: Database file locked

**Cause:** Multiple processes accessing database

**Solution:**
1. Stop all dev servers
2. Delete `prisma/dev.db` (if exists)
3. Run `npx prisma db push`

### Issue 4: Schema changes not applied

**Cause:** Database out of sync

**Solution:**
```bash
npx prisma db push --force-reset
```
⚠️ **Warning:** This will delete all data!

---

## 📋 Complete Fresh Start

If everything is broken, do a complete reset:

### Step 1: Stop Everything
- Close all terminals
- Stop dev server
- Close VS Code

### Step 2: Clean Database
```bash
# Delete database file (if using SQLite)
del prisma\dev.db
del prisma\dev.db-journal
```

### Step 3: Clean Node Modules (Optional)
```bash
rmdir /s /q node_modules
rmdir /s /q .next
npm install
```

### Step 4: Setup Database
```bash
npx prisma generate
npx prisma db push
```

### Step 5: Create Admin
```bash
npm run admin:create
```

### Step 6: Start Dev Server
```bash
npm run dev
```

---

## 🔍 Verify Setup

### Check Database File
```bash
# Should exist after db push
dir prisma\dev.db
```

### Check Prisma Client
```bash
# Should exist after generate
dir node_modules\.prisma\client
```

### Test Database Connection
```bash
npx prisma studio
```
Should open database GUI at http://localhost:5555

---

## 📞 Still Having Issues?

### Check These:

1. **Environment Variables**
   ```bash
   # .env file should have:
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

2. **Prisma Schema**
   ```prisma
   datasource db {
     provider = "sqlite"  // Should be "sqlite" for dev
     url      = env("DATABASE_URL")
   }
   ```

3. **Node Version**
   ```bash
   node --version  # Should be 18+
   ```

4. **File Permissions**
   - Make sure you have write permissions in project folder
   - Run terminal as Administrator if needed

---

## 🎯 Recommended Development Setup

For easiest development experience:

1. **Use SQLite** (current setup) ✅
2. **Switch to PostgreSQL** only when deploying to production
3. **Keep separate databases** for dev and production

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated:** February 14, 2026  
**Version:** 1.0

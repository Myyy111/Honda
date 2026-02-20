# 🔐 SECURITY IMPLEMENTATION GUIDE

## Overview

Website Honda ini telah diupgrade dengan implementasi security yang comprehensive. Dokumen ini menjelaskan semua fitur security yang telah ditambahkan dan cara menggunakannya.

---

## 🛡️ Security Features Implemented

### 1. Password Hashing dengan Bcrypt ✅

**Implementasi:**
- Semua password di-hash menggunakan bcrypt dengan salt rounds = 10
- Password tidak pernah disimpan dalam plain text
- Verifikasi password menggunakan bcrypt.compare()

**File terkait:**
- `src/lib/auth-utils.ts` - Password hashing utilities
- `src/auth.ts` - Authentication dengan password verification

**Fungsi utama:**
```typescript
// Hash password
const hashedPassword = await hashPassword('myPassword123!');

// Verify password
const isValid = await verifyPassword('myPassword123!', hashedPassword);
```

---

### 2. Rate Limiting ✅

**Implementasi:**
- Login attempts dibatasi: **5 attempts per 15 minutes** per IP address
- API endpoints bisa dibatasi: **100 requests per minute**
- In-memory storage (untuk production gunakan Redis)

**File terkait:**
- `src/lib/rate-limit.ts` - Rate limiting utilities
- `src/actions/auth-action.ts` - Rate limiting pada login

**Konfigurasi:**
```typescript
export const RATE_LIMITS = {
    LOGIN: {
        maxAttempts: 5,
        windowMs: 15 * 60 * 1000, // 15 minutes
    },
    API: {
        maxAttempts: 100,
        windowMs: 60 * 1000, // 1 minute
    },
};
```

**Error message saat rate limit:**
```
"Too many login attempts. Please try again in 15 minutes."
```

---

### 3. Input Validation dengan Zod ✅

**Implementasi:**
- Semua user input divalidasi dengan Zod schemas
- Type-safe validation
- Detailed error messages

**File terkait:**
- `src/lib/validation.ts` - Validation schemas untuk semua inputs

**Schemas tersedia:**
- `loginSchema` - Login credentials
- `adminSchema` - Admin creation/update
- `carSchema` - Car data
- `promotionSchema` - Promotion data
- `testimonialSchema` - Testimonial data
- `settingSchema` - Settings
- `contactFormSchema` - Contact form

**Contoh penggunaan:**
```typescript
import { loginSchema } from '@/lib/validation';

const result = loginSchema.safeParse({
    email: 'admin@example.com',
    password: 'SecurePass123!'
});

if (!result.success) {
    console.error(result.error.issues);
}
```

---

### 4. Secure Session Management ✅

**Implementasi:**
- JWT-based sessions
- Session timeout: **30 minutes**
- Session refresh: **every 5 minutes**
- Secure session storage

**File terkait:**
- `src/auth.ts` - NextAuth configuration

**Konfigurasi:**
```typescript
session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
    updateAge: 5 * 60, // Update every 5 minutes
}
```

---

### 5. Password Strength Requirements ✅

**Requirements:**
- ✅ Minimum 8 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one number (0-9)
- ✅ At least one special character (!@#$%^&*...)

**Validation:**
```typescript
import { validatePasswordStrength } from '@/lib/auth-utils';

const result = validatePasswordStrength('MyPass123!');
// { isValid: true, errors: [] }

const weak = validatePasswordStrength('weak');
// { isValid: false, errors: ['Password must be at least 8 characters long', ...] }
```

---

## 📋 Setup Instructions

### Step 1: Environment Variables

Tambahkan ke `.env` file:

```bash
# NextAuth Secret (generate dengan: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-key-here-minimum-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/honda_db"
```

**Generate NEXTAUTH_SECRET:**
```bash
# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Linux/Mac
openssl rand -base64 32
```

---

### Step 2: Create Admin User

**Option A: Using Script (Recommended)**

```bash
# Create new admin
npx tsx scripts/create-admin.ts

# Follow the prompts:
# - Enter username (email): admin@autopremium.com
# - Enter password: YourSecurePass123!
# - Enter full name: Master Admin
```

**Option B: Manual Database Insert**

```typescript
import { hashPassword } from '@/lib/auth-utils';

const hashedPassword = await hashPassword('YourSecurePass123!');

// Insert to database
await prisma.admin.create({
    data: {
        username: 'admin@autopremium.com',
        password: hashedPassword,
        name: 'Master Admin'
    }
});
```

---

### Step 3: Update Existing Admin Password

Jika sudah ada admin dengan password lama (plain text):

```bash
npx tsx scripts/update-admin-password.ts

# Follow the prompts:
# - Enter admin username: admin@autopremium.com
# - Enter new password: NewSecurePass123!
# - Confirm: yes
```

---

## 🔒 Security Best Practices

### For Developers

1. **Never commit secrets**
   - Add `.env` to `.gitignore`
   - Use environment variables
   - Rotate secrets regularly

2. **Always validate input**
   ```typescript
   import { carSchema } from '@/lib/validation';
   
   const validated = carSchema.parse(userInput);
   ```

3. **Use rate limiting**
   ```typescript
   import { checkRateLimit } from '@/lib/rate-limit';
   
   const result = checkRateLimit(clientIp);
   if (!result.allowed) {
       return error('Too many requests');
   }
   ```

4. **Hash all passwords**
   ```typescript
   import { hashPassword } from '@/lib/auth-utils';
   
   const hashed = await hashPassword(plainPassword);
   ```

5. **Sanitize HTML output**
   ```typescript
   import { sanitizeHtml } from '@/lib/validation';
   
   const safe = sanitizeHtml(userContent);
   ```

---

### For Production Deployment

1. **Use strong NEXTAUTH_SECRET**
   - Minimum 32 characters
   - Random generated
   - Never reuse across environments

2. **Enable HTTPS**
   - Force HTTPS redirects
   - Use HSTS headers
   - Secure cookies

3. **Database Security**
   - Use connection pooling
   - Enable SSL/TLS
   - Restrict database access
   - Regular backups

4. **Rate Limiting (Production)**
   - Use Redis instead of in-memory
   - Implement on API Gateway/CDN level
   - Monitor for abuse

5. **Monitoring**
   - Log all authentication attempts
   - Monitor for suspicious activity
   - Set up alerts for failed logins
   - Regular security audits

---

## 🚨 Security Incident Response

### If Password Compromised

1. **Immediately reset password:**
   ```bash
   npx tsx scripts/update-admin-password.ts
   ```

2. **Check logs for unauthorized access:**
   ```bash
   # Check authentication logs
   grep "Login failed" logs/*.log
   grep "Login successful" logs/*.log
   ```

3. **Rotate NEXTAUTH_SECRET:**
   - Generate new secret
   - Update .env
   - Restart application
   - All users will be logged out

### If Rate Limit Bypass Detected

1. **Check rate limit store:**
   ```typescript
   import { getRateLimitStatus } from '@/lib/rate-limit';
   
   const status = getRateLimitStatus(suspiciousIp);
   console.log(status);
   ```

2. **Block IP at firewall level**

3. **Upgrade to Redis-based rate limiting**

---

## 📊 Security Checklist

### Pre-Production

- [ ] NEXTAUTH_SECRET is set and strong (32+ chars)
- [ ] All admin passwords are hashed with bcrypt
- [ ] Rate limiting is enabled on login
- [ ] Input validation is implemented
- [ ] HTTPS is enforced
- [ ] Database uses SSL connection
- [ ] Secrets are not in git repository
- [ ] Session timeout is configured (30 min)
- [ ] CORS is properly configured
- [ ] CSP headers are set

### Post-Production

- [ ] Monitor authentication logs
- [ ] Regular security audits
- [ ] Update dependencies monthly
- [ ] Backup database daily
- [ ] Test disaster recovery
- [ ] Review access logs weekly
- [ ] Rotate secrets quarterly
- [ ] Security training for team

---

## 🔧 Troubleshooting

### "Invalid credentials" even with correct password

**Cause:** Password might not be hashed in database

**Solution:**
```bash
npx tsx scripts/update-admin-password.ts
```

### "Too many login attempts"

**Cause:** Rate limit exceeded

**Solution:**
- Wait 15 minutes
- Or manually reset:
```typescript
import { resetRateLimit } from '@/lib/rate-limit';
resetRateLimit('login:IP_ADDRESS');
```

### Session expires too quickly

**Cause:** Session maxAge too short

**Solution:** Update in `src/auth.ts`:
```typescript
session: {
    maxAge: 60 * 60, // 1 hour instead of 30 min
}
```

---

## 📚 Additional Resources

### Documentation
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Bcrypt Docs](https://github.com/kelektiv/node.bcrypt.js)
- [Zod Docs](https://zod.dev/)
- [OWASP Security Guidelines](https://owasp.org/)

### Security Tools
- [Have I Been Pwned](https://haveibeenpwned.com/) - Check if password is compromised
- [Security Headers](https://securityheaders.com/) - Check HTTP security headers
- [SSL Labs](https://www.ssllabs.com/) - Test SSL/TLS configuration

---

## 🎯 Next Steps (Optional Enhancements)

### High Priority
1. **2FA/MFA Implementation**
   - Google Authenticator
   - SMS OTP
   - Email verification

2. **Redis Rate Limiting**
   - Replace in-memory with Redis
   - Distributed rate limiting
   - Better performance

3. **Audit Logging**
   - Log all admin actions
   - Track changes
   - Compliance reporting

### Medium Priority
4. **IP Whitelisting**
   - Restrict admin access by IP
   - VPN requirement

5. **CSRF Protection**
   - Anti-CSRF tokens
   - SameSite cookies

6. **Content Security Policy**
   - Prevent XSS attacks
   - Restrict resource loading

### Low Priority
7. **Penetration Testing**
   - Regular security audits
   - Vulnerability scanning

8. **Security Training**
   - Team education
   - Best practices

---

**Last Updated:** February 14, 2026  
**Version:** 1.0  
**Maintained by:** Development Team

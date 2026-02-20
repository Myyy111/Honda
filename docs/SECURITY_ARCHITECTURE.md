# 🔐 Security Architecture Flow

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LOGIN FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. User visits /login
   │
   ├─► LoginForm Component
   │   └─► Renders email & password inputs
   │
2. User submits credentials
   │
   ├─► authenticate() action (auth-action.ts)
   │   │
   │   ├─► Get Client IP Address
   │   │   └─► From headers: x-forwarded-for, x-real-ip
   │   │
   │   ├─► Check Rate Limit
   │   │   ├─► Identifier: "login:{IP}"
   │   │   ├─► Limit: 5 attempts / 15 minutes
   │   │   │
   │   │   ├─► ✅ ALLOWED → Continue
   │   │   └─► ❌ BLOCKED → Return error
   │   │       └─► "Too many attempts. Try again in X minutes"
   │   │
   │   ├─► Validate Input with Zod
   │   │   ├─► loginSchema.parse({ email, password })
   │   │   │
   │   │   ├─► ✅ VALID → Continue
   │   │   └─► ❌ INVALID → Return validation errors
   │   │
   │   └─► signIn("credentials", formData)
   │       └─► Triggers NextAuth authorize()
   │
3. NextAuth authorize() (auth.ts)
   │
   ├─► Validate with Zod (again, for safety)
   │   └─► loginSchema.parse(credentials)
   │
   ├─► Query Database
   │   └─► prisma.admin.findUnique({ where: { username: email } })
   │       │
   │       ├─► ❌ NOT FOUND → Return null
   │       │   └─► "Invalid credentials"
   │       │
   │       └─► ✅ FOUND → Continue
   │
   ├─► Verify Password with Bcrypt
   │   └─► verifyPassword(password, admin.password)
   │       │
   │       ├─► ❌ INVALID → Return null
   │       │   └─► "Invalid credentials"
   │       │
   │       └─► ✅ VALID → Continue
   │
   └─► ✅ SUCCESS
       └─► Return user object
           └─► { id, name, email, role: "admin" }

4. Session Created
   │
   ├─► JWT Token Generated
   │   ├─► Contains: { id, email, role }
   │   ├─► Signed with NEXTAUTH_SECRET
   │   └─► Max Age: 30 minutes
   │
   └─► Redirect to /admin
       └─► Admin Dashboard

5. Subsequent Requests
   │
   ├─► JWT Token Validated
   │   ├─► Signature verified
   │   ├─► Expiry checked
   │   │
   │   ├─► ✅ VALID → Allow access
   │   └─► ❌ INVALID/EXPIRED → Redirect to /login
   │
   └─► Session Auto-Refresh
       └─► Every 5 minutes (if active)
```

---

## Rate Limiting Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      RATE LIMITING SYSTEM                        │
└─────────────────────────────────────────────────────────────────┘

Request comes in
   │
   ├─► Extract Client IP
   │   └─► x-forwarded-for || x-real-ip || 'unknown'
   │
   ├─► Create Identifier
   │   └─► "login:{IP}" (e.g., "login:192.168.1.1")
   │
   ├─► Check Rate Limit Store
   │   │
   │   ├─► Entry NOT FOUND or EXPIRED
   │   │   └─► Create new entry
   │   │       ├─► count: 1
   │   │       ├─► resetTime: now + 15 minutes
   │   │       └─► ✅ ALLOW (remaining: 4)
   │   │
   │   └─► Entry FOUND and ACTIVE
   │       │
   │       ├─► count < maxAttempts (5)
   │       │   └─► Increment count
   │       │       ├─► count++
   │       │       └─► ✅ ALLOW (remaining: 5-count)
   │       │
   │       └─► count >= maxAttempts (5)
   │           └─► ❌ BLOCK
   │               ├─► Calculate retry time
   │               ├─► retryAfter: (resetTime - now) / 1000
   │               └─► Return error message
   │                   └─► "Too many attempts. Try again in X minutes"

Cleanup Process (every 5 minutes)
   │
   └─► Iterate through all entries
       └─► If now > resetTime
           └─► Delete entry
```

---

## Password Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PASSWORD HASHING FLOW                         │
└─────────────────────────────────────────────────────────────────┘

CREATING ADMIN USER
───────────────────

1. Admin enters password
   │
   ├─► Validate Password Strength
   │   ├─► Length >= 8 characters
   │   ├─► Contains uppercase (A-Z)
   │   ├─► Contains lowercase (a-z)
   │   ├─► Contains number (0-9)
   │   ├─► Contains special char (!@#$...)
   │   │
   │   ├─► ✅ VALID → Continue
   │   └─► ❌ INVALID → Show errors
   │
   ├─► Hash Password with Bcrypt
   │   └─► bcrypt.hash(password, 10)
   │       ├─► Generate random salt
   │       ├─► Hash password with salt
   │       └─► Return hashed string
   │           └─► e.g., "$2a$10$abc123..."
   │
   └─► Store in Database
       └─► admin.password = hashedPassword


VERIFYING PASSWORD (LOGIN)
──────────────────────────

1. User enters password
   │
   ├─► Retrieve hashed password from DB
   │   └─► admin.password (e.g., "$2a$10$abc123...")
   │
   ├─► Verify with Bcrypt
   │   └─► bcrypt.compare(plainPassword, hashedPassword)
   │       ├─► Extract salt from hash
   │       ├─► Hash plain password with same salt
   │       ├─► Compare results
   │       │
   │       ├─► ✅ MATCH → Return true
   │       └─► ❌ NO MATCH → Return false
   │
   └─► Authentication Decision
       ├─► true → Login successful
       └─► false → Login failed
```

---

## Input Validation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   INPUT VALIDATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

User Input
   │
   ├─► Zod Schema Validation
   │   │
   │   ├─► Type Checking
   │   │   └─► string, number, boolean, etc.
   │   │
   │   ├─► Format Validation
   │   │   ├─► Email format
   │   │   ├─► URL format
   │   │   └─► Regex patterns
   │   │
   │   ├─► Length Validation
   │   │   ├─► min() - Minimum length
   │   │   └─► max() - Maximum length
   │   │
   │   ├─► Custom Validation
   │   │   ├─► Password strength
   │   │   ├─► JSON parsing
   │   │   └─► Business rules
   │   │
   │   ├─► Sanitization
   │   │   ├─► trim()
   │   │   ├─► toLowerCase()
   │   │   └─► Remove dangerous chars
   │   │
   │   └─► Result
   │       ├─► ✅ SUCCESS → Validated data
   │       └─► ❌ ERROR → Detailed error messages
   │
   └─► Safe to Process
       └─► Use validated data in application
```

---

## Session Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   SESSION MANAGEMENT FLOW                        │
└─────────────────────────────────────────────────────────────────┘

LOGIN SUCCESS
─────────────

1. User authenticated
   │
   ├─► Create JWT Token
   │   ├─► Payload: { id, email, role, iat, exp }
   │   ├─► Sign with NEXTAUTH_SECRET
   │   └─► Set expiry: now + 30 minutes
   │
   ├─► Store in Cookie
   │   ├─► HttpOnly: true (prevent XSS)
   │   ├─► Secure: true (HTTPS only)
   │   ├─► SameSite: lax (CSRF protection)
   │   └─► Path: /
   │
   └─► Redirect to /admin


SUBSEQUENT REQUESTS
───────────────────

Request → Middleware
   │
   ├─► Extract JWT from Cookie
   │
   ├─► Verify JWT
   │   ├─► Signature valid?
   │   ├─► Not expired?
   │   │
   │   ├─► ✅ VALID
   │   │   ├─► Decode payload
   │   │   ├─► Attach to request
   │   │   └─► Allow access
   │   │
   │   └─► ❌ INVALID/EXPIRED
   │       └─► Redirect to /login
   │
   └─► Auto-Refresh (if updateAge passed)
       ├─► Check: (now - iat) > 5 minutes
       │
       ├─► ✅ YES → Issue new token
       │   └─► New expiry: now + 30 minutes
       │
       └─► ❌ NO → Use existing token


LOGOUT
──────

User clicks logout
   │
   ├─► signOut() action
   │   ├─► Delete session cookie
   │   └─► Clear JWT token
   │
   └─► Redirect to /login


TIMEOUT
───────

30 minutes of inactivity
   │
   ├─► JWT expires
   │
   ├─► Next request fails validation
   │
   └─► Auto-redirect to /login
       └─► Show: "Session expired. Please login again."
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                             │
└─────────────────────────────────────────────────────────────────┘

Layer 1: RATE LIMITING
├─► Prevents brute force attacks
├─► 5 attempts per 15 minutes
└─► IP-based tracking

Layer 2: INPUT VALIDATION
├─► Zod schema validation
├─► Type safety
└─► Sanitization

Layer 3: PASSWORD SECURITY
├─► Bcrypt hashing (salt rounds: 10)
├─► Strong password requirements
└─► Never stored in plain text

Layer 4: SESSION MANAGEMENT
├─► JWT tokens
├─► 30-minute timeout
├─► Auto-refresh every 5 minutes
└─► Secure cookies (HttpOnly, Secure, SameSite)

Layer 5: DATABASE SECURITY
├─► Parameterized queries (Prisma)
├─► SQL injection prevention
└─► Connection pooling

Layer 6: AUTHENTICATION
├─► Database-backed user lookup
├─► Secure password verification
└─► Role-based access control

Layer 7: ERROR HANDLING
├─► Generic error messages (prevent info leakage)
├─► Detailed logging (server-side only)
└─► User-friendly feedback
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA FLOW                                 │
└─────────────────────────────────────────────────────────────────┘

CLIENT                    SERVER                    DATABASE
  │                         │                          │
  │  1. POST /login         │                          │
  ├────────────────────────►│                          │
  │  { email, password }    │                          │
  │                         │                          │
  │                         │  2. Check Rate Limit     │
  │                         ├─────────────────────────►│
  │                         │  (in-memory store)       │
  │                         │                          │
  │                         │  3. Validate Input       │
  │                         │  (Zod schema)            │
  │                         │                          │
  │                         │  4. Query User           │
  │                         ├─────────────────────────►│
  │                         │  findUnique(email)       │
  │                         │                          │
  │                         │◄─────────────────────────┤
  │                         │  { id, username,         │
  │                         │    password (hashed) }   │
  │                         │                          │
  │                         │  5. Verify Password      │
  │                         │  bcrypt.compare()        │
  │                         │                          │
  │                         │  6. Create JWT           │
  │                         │  sign({ id, role })      │
  │                         │                          │
  │  7. Set Cookie + Redirect                          │
  │◄────────────────────────┤                          │
  │  Set-Cookie: token=...  │                          │
  │  Location: /admin       │                          │
  │                         │                          │
  │  8. GET /admin          │                          │
  ├────────────────────────►│                          │
  │  Cookie: token=...      │                          │
  │                         │                          │
  │                         │  9. Verify JWT           │
  │                         │  verify(token)           │
  │                         │                          │
  │                         │  10. Fetch Data          │
  │                         ├─────────────────────────►│
  │                         │  getCars(), etc.         │
  │                         │                          │
  │                         │◄─────────────────────────┤
  │                         │  [cars data]             │
  │                         │                          │
  │  11. Render Page        │                          │
  │◄────────────────────────┤                          │
  │  HTML + Data            │                          │
  │                         │                          │
```

---

**Created by:** Senior Fullstack Developer  
**Date:** February 14, 2026  
**Version:** 1.0

# Debug: Supabase URL Required Error

## Root Cause Analysis (Phase 1 Complete)

### Error Message
```
Error: supabaseUrl is required.
```

### Evidence Gathered

**File 1: `landing/src/lib/supabase.ts`**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;  // undefined at build
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);  // FAILS
```

**File 2: `landing/src/components/FinalCTA.tsx`**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';  // empty string
const supabase = createClient(supabaseUrl, supabaseAnonKey);  // FAILS with ''
```

### Root Cause
1. Supabase client initialized at **module level** (top of file)
2. During Next.js build, env vars not available → undefined or ''
3. `createClient()` throws when URL is empty/undefined

### Pattern Issue
- Both files duplicate Supabase initialization
- FinalCTA.tsx should import from lib/supabase.ts

## Solution Required
1. ✅ Add env vars to Vercel (user action)
2. 🔧 Add build-time validation or lazy init pattern
3. 🔧 Remove duplicate initialization in FinalCTA.tsx

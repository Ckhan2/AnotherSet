# 403 Forbidden - Step-by-Step Troubleshooting Guide

## Your Issue
Still getting `403 Forbidden` when posting to `/api/members`

## What I've Updated

### 1. **Enhanced Token Storage** 
- Tokens now backed up in `localStorage` as failsafe
- Better fallback mechanism if cookies fail
- Detailed logging of token save/retrieve

### 2. **Authentication Check in AddMember**
- Component now verifies authentication on load
- Shows error if not logged in before appearing
- Logs token status before each request

### 3. **Detailed Logging Throughout**
- Every API request logs token details
- 403 errors now show detailed investigation info
- Console logs show exact headers being sent

### 4. **Enhanced Debug Tools**
- New `testAddMemberRequest()` function
- Better `checkAuth()` output
- All localStorage backup checking

## Step-by-Step Diagnosis

### Step 1: Check Immediately (Run in Console)
```javascript
window.__DEBUG__.checkAuth()
```

**Expected Output:**
- ✅ "Is Authenticated: true"
- ✅ Token should be shown
- ✅ User Session should exist
- ✅ Backup Token should be in localStorage

**If you see:**
- ❌ "Is Authenticated: false" → **Go to Step 2**
- ❌ "NO TOKEN FOUND" → **Go to Step 2**
- Token is there → **Go to Step 3**

### Step 2: Verify Login is Working

**Do this:**
1. Open browser console (F12 → Console)
2. Go to login page
3. Enter email and password
4. Watch console for logs
5. Look for: `✅ Login Successful` message

**If you see:**
- ✅ "Login Successful" → Token saved, go to Step 3
- ❌ No login message → Login endpoint issue (check backend)
- 🍪 "Token saved to cookies" → Token was stored

**After login, run:**
```javascript
window.__DEBUG__.checkAuth()
```

Should now show token and user data.

### Step 3: Test Token Format

**Run this:**
```javascript
window.__DEBUG__.testApiWithToken()
```

This makes a GET request with your token.

**If you see:**
- ✅ Status 200 → Token works! Go to Step 4
- ❌ Status 403 → Token rejected by backend

**For 403 on GET:**
- The token format might be wrong
- The token might be expired
- Backend might not recognize the token

### Step 4: Test Member Creation

**Run this:**
```javascript
window.__DEBUG__.testAddMemberRequest()
```

This creates a test member with your token.

**If you see:**
- ✅ Status 201 or 200 → Success! Member should be created
- ❌ Status 403 → Token issue persists

**For 403 on POST:**
Check console output carefully:
- Is "Authorization: Bearer ..." shown?
- Is the token full length?
- Any error message from backend?

### Step 5: Check Backend Response

If still getting 403:

1. Open DevTools → Network tab
2. Try to add a member (will fail)
3. Find the POST request to `/api/members`
4. Click on it
5. Go to "Response" tab
6. Copy the full error message
7. Share this error message - it will tell us exactly why it's being rejected

## Common 403 Causes & Solutions

### Issue 1: Token Not Saved After Login
**Signs:**
- `checkAuth()` shows "Is Authenticated: false"
- No token in cookies or localStorage

**Solution:**
```javascript
// Clear and try again
window.__DEBUG__.clearAuth()

// Then go login again and watch for:
// ✅ "Login Successful"
// 🍪 "Token saved to cookies"
```

### Issue 2: Token Format Wrong
**Signs:**
- Token exists but GET request returns 403
- Token doesn't start with expected format

**Solution:**
Check how your backend returns token:
```javascript
// After login, check token format:
window.__DEBUG__.checkAuth()

// Token should look like:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

If format is different, we need to adjust cookie storage.

### Issue 3: Token Expired
**Signs:**
- Token was working before
- Now getting 403
- It's been a while since login

**Solution:**
```javascript
// Re-login to get fresh token
window.__DEBUG__.clearAuth()
// Then login again
```

### Issue 4: Wrong Authorization Header Format
**Signs:**
- GET requests work (sometimes)
- POST requests fail with 403

**Solution:**
We're sending: `Authorization: Bearer <token>`

Backend might expect: 
- `Authorization: <token>` (without "Bearer")
- `X-Auth-Token: <token>` (different header)
- Token in body instead of headers

Let me know if you see this.

## Real-Time Troubleshooting Checklist

When you get 403, immediately run these in order:

```javascript
// 1. Check token exists
window.__DEBUG__.checkAuth()

// 2. Test if token works for GET
window.__DEBUG__.testApiWithToken()

// 3. Test exact member creation
window.__DEBUG__.testAddMemberRequest()

// 4. Check console for exact error
// Look for: ❌ CRITICAL, ❌ 403, etc.
```

## Console Log Meanings

| Log | Meaning | Action |
|-----|---------|--------|
| ❌ "No token found when attempting" | Token not in storage | Re-login |
| 🔐 "Token Length: 0" | Token is empty | Re-login |
| 📊 "Status Code: 403" | Backend rejected token | Check backend config |
| "Token was sent in headers" | Token format correct | Check backend logic |
| ✅ "member added successfully" | SUCCESS! | Done |

## If Still Stuck

Provide these details:
1. **Console output of:** `window.__DEBUG__.checkAuth()`
2. **Console output of:** `window.__DEBUG__.testAddMemberRequest()`
3. **Network tab Response for the failing request**
4. **Backend error message (if any)**

With this info, I can pin-point exactly what's wrong!

## Files Modified
- `src/utils/cookieUtils.js` - localStorage backup, better logging
- `src/AdminPanel/AddMember.jsx` - Auth check on mount
- `src/hooks/useApi.js` - Detailed request/response logging
- `src/utils/debugUtils.js` - New test functions
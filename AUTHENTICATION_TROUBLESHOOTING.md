# 403 Forbidden Error - Troubleshooting Guide

## Problem
Getting `403 Forbidden` when trying to POST to `/api/members`

## Root Causes
The 403 error typically means:
1. **No authentication token is being sent**
2. **Token is invalid or expired**
3. **Token doesn't have permissions to access this resource**
4. **CORS issue with credentials**

## Quick Diagnosis Steps

### Step 1: Check Browser Console
Open Developer Tools (F12) and look at the Console tab for log messages starting with 🔐, 📊, or ❌.

### Step 2: Check if Token Exists
Run this in the browser console:
```javascript
window.__DEBUG__.checkAuth()
```

This will show:
- Is Authenticated: true/false
- Current token
- User session data
- All cookies

### Step 3: Test API Request with Token
Run this in the console to test if the token is being sent correctly:
```javascript
window.__DEBUG__.testApiWithToken()
```

This will:
- Get the current token
- Send a test GET request with the token
- Show the response status and data

## Solutions

### Solution 1: Ensure You're Logged In
1. Go to login page
2. Enter credentials and click "Sign in"
3. Watch the console for ✅ "Login Successful" message
4. Check browser cookies (DevTools → Application → Cookies)
5. Verify `authToken` cookie exists and has a value

### Solution 2: Verify Token Format
The token should be sent in the `Authorization` header as:
```
Authorization: Bearer <your-token-here>
```

Check in Network tab (DevTools → Network):
1. Make an API request
2. Click on the request
3. Go to "Headers" tab
4. Look for `Authorization: Bearer ...`

If missing or malformed, the token isn't being sent correctly.

### Solution 3: Check Backend Response
In DevTools → Network tab:
1. Make a request that fails with 403
2. Click on the request
3. Go to "Response" tab
4. Check the error message from backend
5. Common backend messages:
   - "Unauthorized"
   - "Invalid token"
   - "Token expired"
   - "User doesn't have permission"

### Solution 4: Clear and Re-login
Sometimes cookies get corrupted. Try:
1. Open console and run:
   ```javascript
   window.__DEBUG__.clearAuth()
   ```
2. Refresh the page
3. Login again
4. Try the request again

## Logging Information

The console now logs detailed information for debugging:

### Login Success
```
✅ Login Successful: {
  hasToken: true,
  token: "eyJhbGciOiJIUzI1NiIs...",
  user: {...}
}
🍪 Token saved to cookies
👤 User session saved
```

### API Requests
```
🔐 API Request: {
  url: "http://localhost:8080/api/members",
  method: "POST",
  hasToken: true,
  token: "eyJhbGciOiJIUzI1NiIs..."
}

📊 API Response: {
  url: "http://localhost:8080/api/members",
  status: 201,
  statusText: "Created"
}
```

### Add Member Success
```
➕ Adding Member: {
  memberData: {...},
  hasToken: true
}
✅ Member added successfully
```

### Errors
```
❌ API Error: {
  message: "Unauthorized",
  status: 403
}

⚠️ Access Denied (403): Check if token is valid or if user has permissions
```

## Advanced Debugging

### Check Network Requests
1. Open DevTools → Network tab
2. Filter by "fetch/xhr"
3. Look for the failing request
4. Check:
   - Request Headers → Authorization
   - Response Status → 403
   - Response Body → Error message

### Manual Token Testing
If needed, you can manually set a test token:
```javascript
window.__DEBUG__.setTestToken('your-jwt-token-here')
```

Then test if the request works with that token.

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Token not in headers | Token not saved to cookies | Login again, check console logs |
| 403 Forbidden | Invalid token | Clear auth and re-login |
| 403 Forbidden | Token expired | Re-login to get new token |
| 403 Forbidden | No permissions | Backend user permissions issue |
| Cookie not set | Secure flag issue | Check cookie options in production |
| CORS error | Missing credentials | Add withCredentials to requests |

## Backend Checklist

Ensure your backend is:
1. ✅ Returning a `token` field in login response
2. ✅ Validating the `Authorization: Bearer <token>` header
3. ✅ Setting correct HTTP status codes (401 for auth, 403 for permissions)
4. ✅ Including clear error messages in responses
5. ✅ Not checking for token in request body (unless specifically needed)

## File Structure
- `src/utils/cookieUtils.js` - Cookie management
- `src/utils/debugUtils.js` - Debug tools
- `src/hooks/useApi.js` - API requests with logging
- `src/main.jsx` - Imports debug utilities
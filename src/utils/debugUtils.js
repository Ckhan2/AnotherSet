import { cookieUtils } from './cookieUtils';
import Cookies from 'js-cookie';


export const debugUtils = {
  
  checkAuth: () => {
    const token = cookieUtils.getAuthToken();
    const user = cookieUtils.getUserSession();
    const allCookies = Cookies.get();

    console.group('🔐 FULL AUTHENTICATION STATUS');
    console.log('Is Authenticated:', cookieUtils.isAuthenticated());
    
    if (token) {
      console.log('✅ Token Found:');
      console.log('   - Full Length:', token.length);
      console.log('   - Preview:', token.substring(0, 50) + '...');
      console.log('   - Type:', typeof token);
    } else {
      console.error('❌ NO TOKEN FOUND');
    }

    console.log('User Session:', user);
    console.log('All Cookies Object:', allCookies);
    
    
    const backupToken = localStorage.getItem('backup_authToken');
    console.log('Backup Token in localStorage:', backupToken ? 'YES' : 'NO');
    
    console.groupEnd();

    return {
      isAuthenticated: cookieUtils.isAuthenticated(),
      token,
      user,
      allCookies,
      backupToken,
    };
  },

  
  testApiWithToken: async () => {
    const token = cookieUtils.getAuthToken();

    console.group('🧪 TESTING API REQUEST WITH TOKEN');
    console.log('Token Check:', token ? `${token.substring(0, 50)}...` : 'NO TOKEN');

    if (!token) {
      console.error('❌ NO TOKEN FOUND! Cannot test API request.');
      console.error('   Please login first.');
      console.groupEnd();
      return;
    }

    try {
      console.log('Sending GET request to:', 'http://localhost:8080/api/members');
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      console.log('Request Headers:');
      console.log('  - Authorization:', `Bearer ${token.substring(0, 30)}...`);
      console.log('  - Content-Type: application/json');

      const response = await fetch('http://localhost:8080/api/members', {
        method: 'GET',
        headers,
      });

      console.log('Response Status:', response.status, response.statusText);
      
      if (response.status === 403) {
        console.error('❌ 403 FORBIDDEN received');
        console.error('   - Token was sent in Authorization header');
        console.error('   - Backend rejected the token');
        console.error('   Possible causes:');
        console.error('     1. Token is invalid');
        console.error('     2. Token is expired');
        console.error('     3. Backend uses different token format');
        console.error('     4. User has no permissions');
      }

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.log('Response is not JSON');
        data = await response.text();
      }

      console.log('Response Data:', data);
      console.log(response.ok ? '✅ Request Successful' : '❌ Request Failed');
      
    } catch (error) {
      console.error('❌ Network Error:', error);
    }

    console.groupEnd();
  },

  
  testAddMemberRequest: async (memberData = null) => {
    const token = cookieUtils.getAuthToken();

    console.group('🧪 TESTING ADD MEMBER REQUEST');
    
    if (!token) {
      console.error('❌ NO TOKEN - Cannot proceed');
      console.groupEnd();
      return;
    }

    const testData = memberData || {
      memberType: 'GYM_MEMBER',
      fullName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '123-456-7890',
      membershipStartDate: new Date().toISOString().split('T')[0],
      membershipEndDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      classType: 'YOGA',
      jobTitle: 'trainer',
    };

    console.log('Test Data:', testData);
    console.log('Token Preview:', token.substring(0, 40) + '...');
    console.log('Endpoint:', 'http://localhost:8080/api/members');

    try {
      const response = await fetch('http://localhost:8080/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(testData),
      });

      console.log('📊 RESPONSE:');
      console.log('Status:', response.status, response.statusText);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = await response.text();
      }

      console.log('Response Data:', data);

      if (response.status === 403) {
        console.error('❌ 403 FORBIDDEN - DEBUGGING INFO:');
        console.log('   Token was correctly sent in Authorization header');
        console.log('   Backend rejected access - check:');
        console.log('     1. Is the token valid?');
        console.log('     2. Is it expired?');
        console.log('     3. Does backend expect different format?');
      } else if (response.ok) {
        console.log('✅ SUCCESS - Member created!');
      } else {
        console.error('❌ Error:', response.status, data);
      }

    } catch (error) {
      console.error('❌ Network Error:', error);
    }

    console.groupEnd();
  },

  
  clearAuth: () => {
    console.group('🧹 Clearing Authentication');
    cookieUtils.removeAuthToken();
    cookieUtils.removeUserSession();
    localStorage.removeItem('backup_authToken');
    localStorage.removeItem('backup_userSession');
    console.log('✅ Auth data cleared from cookies and localStorage');
    console.log('Remaining cookies:', Cookies.get());
    console.groupEnd();
  },

  
  setTestToken: (testToken) => {
    console.group('🧪 Setting Test Token');
    if (!testToken) {
      console.error('❌ No token provided');
      console.groupEnd();
      return;
    }
    cookieUtils.setAuthToken(testToken);
    console.log('✅ Test token set');
    console.log('Token:', testToken.substring(0, 50) + '...');
    console.groupEnd();
  },

  
  fullDebug: () => {
    console.group('🐛 Full Debug Information');
    debugUtils.checkAuth();
    console.groupEnd();
  },
};


if (process.env.NODE_ENV === 'development') {
  window.__DEBUG__ = debugUtils;
  console.log(
    '%c💡 Debug utilities available at window.__DEBUG__',
    'color: blue; font-weight: bold; font-size: 14px;'
  );
  console.log(
    '%cAvailable commands:',
    'color: green; font-weight: bold;'
  );
  console.log('  • window.__DEBUG__.checkAuth()                  - Check authentication status');
  console.log('  • window.__DEBUG__.testApiWithToken()            - Test API GET request with token');
  console.log('  • window.__DEBUG__.testAddMemberRequest()        - Test exact member creation');
  console.log('  • window.__DEBUG__.testAddMemberRequest(data)    - Test with custom member data');
  console.log('  • window.__DEBUG__.clearAuth()                   - Clear all auth data');
  console.log('  • window.__DEBUG__.setTestToken(token)           - Set a test token');
  console.log('  • window.__DEBUG__.fullDebug()                   - Full debug information');
  console.log('%c⚠️  If getting 403, run: window.__DEBUG__.checkAuth()', 'color: orange; font-weight: bold;');
}

export default debugUtils;
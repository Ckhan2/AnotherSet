import Cookies from 'js-cookie';

export const cookieUtils = {
  
  set: (name, value, options = {}) => {
    const defaultOptions = {
      expires: 7, // 7 days by default
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      ...options,
    };
    Cookies.set(name, value, defaultOptions);
    
    localStorage.setItem(`backup_${name}`, value);
    console.log(`🍪 Cookie set: ${name}`, {
      valueLength: value?.length || 0,
      storedInCookie: true,
      storedInLocalStorage: true,
      options: defaultOptions,
    });
  },

  
  get: (name) => {
    let value = Cookies.get(name);
    
    if (!value) {
      value = localStorage.getItem(`backup_${name}`);
      if (value) {
        console.log(`🔄 Retrieved ${name} from localStorage (cookie expired/missing)`);
        
        Cookies.set(name, value);
      }
    }
    console.log(`🔍 Cookie get: ${name}`, {
      found: !!value,
      valueLength: value?.length || 0,
      source: Cookies.get(name) ? 'cookie' : 'localStorage',
    });
    return value;
  },

  
  remove: (name, options = {}) => {
    Cookies.remove(name, options);
    localStorage.removeItem(`backup_${name}`);
    console.log(`🗑️  Cookie removed: ${name}`);
  },

  
  exists: (name) => {
    const exists = Cookies.get(name) !== undefined || localStorage.getItem(`backup_${name}`) !== null;
    console.log(`✓ Cookie exists: ${name}`, { exists });
    return exists;
  },

  
  getAll: () => {
    return Cookies.get();
  },

  
  clearAll: () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookieName => {
      Cookies.remove(cookieName);
      localStorage.removeItem(`backup_${cookieName}`);
    });
    console.log(`🗑️  All cookies cleared`);
  },

  
  setAuthToken: (token, options = {}) => {
    if (!token) {
      console.error('❌ No token provided to setAuthToken');
      return;
    }
    cookieUtils.set('authToken', token, {
      expires: 7,
      ...options,
    });
    console.log('✅ Auth token saved successfully');
  },

  getAuthToken: () => {
    const token = cookieUtils.get('authToken');
    if (!token) {
      console.warn('⚠️  No auth token found in cookies or localStorage');
    } else {
      console.log('✅ Auth token retrieved:', {
        preview: token.substring(0, 30) + '...',
        length: token.length,
      });
    }
    return token;
  },

  removeAuthToken: () => {
    cookieUtils.remove('authToken');
    console.log('🔓 Auth token removed');
  },

  isAuthenticated: () => {
    const isAuth = cookieUtils.exists('authToken');
    console.log('🔐 Authentication check:', { isAuthenticated: isAuth });
    return isAuth;
  },

  
  setUserSession: (userData, options = {}) => {
    if (!userData) {
      console.error('❌ No user data provided to setUserSession');
      return;
    }
    cookieUtils.set('userSession', JSON.stringify(userData), {
      expires: 7,
      ...options,
    });
    console.log('👤 User session saved');
  },

  getUserSession: () => {
    const session = cookieUtils.get('userSession');
    if (!session) {
      console.warn('⚠️  No user session found');
      return null;
    }
    try {
      return JSON.parse(session);
    } catch (error) {
      console.error('❌ Error parsing user session:', error);
      return null;
    }
  },

  removeUserSession: () => {
    cookieUtils.remove('userSession');
    console.log('👤 User session removed');
  },
};
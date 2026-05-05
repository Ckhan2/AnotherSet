import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cookieUtils } from '../utils/cookieUtils';


const API_BASE_URL = 'http://localhost:8080/api';


const apiFetch = async (url, options = {}) => {
  const token = cookieUtils.getAuthToken();

  console.log('🔐 API Request:', {
    url: `${API_BASE_URL}${url}`,
    method: options.method || 'GET',
    hasToken: !!token,
    token: token ? `${token.substring(0, 20)}...` : 'No token', 
  });

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  console.log('📊 API Response:', {
    url: `${API_BASE_URL}${url}`,
    status: response.status,
    statusText: response.statusText,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    console.error('❌ API Error:', error);
    
    
    if (response.status === 403) {
      console.error('⚠️  Access Denied (403): Check if token is valid or if user has permissions');
    }
    
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      
      console.log('✅ Login Successful:', {
        hasToken: !!data.token,
        token: data.token ? `${data.token.substring(0, 30)}...` : 'No token in response',
        user: data.user,
      });

      if (data.token) {
        cookieUtils.setAuthToken(data.token);
        console.log('🍪 Token saved to cookies');
      } else {
        console.warn('⚠️  No token received from login response');
      }

      const sessionData = data.user || ((data.email || data.role) ? {
        email: data.email,
        role: data.role,
      } : null);

      if (sessionData) {
        cookieUtils.setUserSession(sessionData);
        console.log('👤 User session saved');
      } else {
        console.warn('⚠️  No user session data received from login response');
      }

      
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      return response.json();
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      
      try {
        await apiFetch('/auth/logout', { method: 'POST' });
      } catch (error) {
        
        console.log('Logout endpoint not available or failed');
      }

      
      cookieUtils.removeAuthToken();
      cookieUtils.removeUserSession();

      return true;
    },
    onSuccess: () => {
      
      queryClient.clear();
    },
  });
};


export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiFetch('/auth/me'),
    enabled: cookieUtils.isAuthenticated(),
    retry: false,
  });
};


export const useMembers = (filters = {}) => {
  return useQuery({
    queryKey: ['members', filters],
    queryFn: () => apiFetch('/members', {
      method: 'GET',
      
    }),
    enabled: cookieUtils.isAuthenticated(),
  });
};

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberData) => {
      const token = cookieUtils.getAuthToken();

      if (!token) {
        console.error('❌ CRITICAL: No token found when attempting to add member');
        throw new Error('Authentication required. Please login first.');
      }

      console.group('➕ ADDING MEMBER - DETAILED');
      console.log('1️⃣  Member Data:', memberData);
      console.log('2️⃣  Token Status:');
      console.log('   - Has Token:', !!token);
      console.log('   - Token Length:', token.length);
      console.log('   - Token Preview:', token.substring(0, 50) + '...');
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      
      console.log('3️⃣  Request Headers:', {
        'Content-Type': headers['Content-Type'],
        'Authorization': `Bearer ${token.substring(0, 30)}...`,
      });
      console.log('4️⃣  Full URL:', `${API_BASE_URL}/members`);
      console.log('5️⃣  Request Method:', 'POST');
      console.groupEnd();

      const response = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers,
        body: JSON.stringify(memberData),
      });

      console.group('📊 RESPONSE');
      console.log('Status Code:', response.status, response.statusText);
      console.log('Status OK?:', response.ok);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
      console.groupEnd();

      const data = await response.json();

      if (response.status === 403) {
        console.error('❌ 403 FORBIDDEN - INVESTIGATION:');
        console.error('   - Token was sent in headers');
        console.error('   - Backend rejected the request');
        console.error('   - Possible causes:');
        console.error('     1. Token is invalid or expired');
        console.error('     2. User lacks permissions');
        console.error('     3. Backend expects different token format');
        console.error('   - Response:', data);
      }

      if (!response.ok) {
        console.error('❌ Add Member Failed:', data);
        throw new Error(data.message || `Failed to add member (${response.status})`);
      }

      console.log('✅ Member added successfully');
      return data;
    },
    onSuccess: () => {
      console.log('✅ Member mutation successful');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error) => {
      console.error('❌ Member mutation error:', error.message);
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, memberData }) => apiFetch(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiFetch(`/members/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      console.log('📤 Registering user with data:', userData);
      return apiFetch('/users/registration', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
    onSuccess: () => {
      console.log('✅ User registered successfully');
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('❌ User registration error:', error.message);
    },
  });
};


export const useApiQuery = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: () => apiFetch(url, { method: 'GET' }),
    enabled: cookieUtils.isAuthenticated(),
    ...options,
  });
};

export const useApiMutation = (url, method = 'POST', options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiFetch(url, {
      method,
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    }),
    ...options,
    onSuccess: (data, variables, context) => {
      
      if (options.invalidateKeys) {
        options.invalidateKeys.forEach(key => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
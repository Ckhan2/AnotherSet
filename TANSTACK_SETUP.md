# TanStack Query & Cookie Setup

This project now includes TanStack Query for data fetching and caching, along with cookie utilities for managing authentication and user sessions.

## Features

### TanStack Query Setup
- **QueryClient** configured with optimized defaults
- **React Query Devtools** available in development mode
- **Automatic caching** and background refetching
- **Error handling** and retry logic

### Cookie Utilities
- **Secure cookie management** with js-cookie
- **Auth token handling** (set/get/remove)
- **User session management**
- **Security options** (secure, sameSite, httpOnly)

### Custom Hooks
- **useLogin** - Handle user authentication
- **useSignup** - Handle user registration
- **useLogout** - Handle user logout
- **useUser** - Get current user data
- **useMembers** - Fetch members list
- **useAddMember** - Add new member
- **useUpdateMember** - Update member data
- **useDeleteMember** - Delete member
- **useApiQuery** - Generic API query hook
- **useApiMutation** - Generic API mutation hook

## Usage Examples

### Authentication
```jsx
import { useLogin, useLogout } from '../hooks/useApi';

function LoginComponent() {
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Login successful, token stored automatically
    } catch (error) {
      // Handle error
    }
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    // User logged out, tokens cleared
  };
}
```

### Data Fetching
```jsx
import { useMembers, useAddMember } from '../hooks/useApi';

function MembersList() {
  const { data: members, isLoading, error } = useMembers();
  const addMemberMutation = useAddMember();

  const handleAddMember = async (memberData) => {
    try {
      await addMemberMutation.mutateAsync(memberData);
      // Member added, list will automatically refetch
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {members?.map(member => (
        <div key={member.id}>{member.fullName}</div>
      ))}
    </div>
  );
}
```

### Cookie Management
```jsx
import { cookieUtils } from '../utils/cookieUtils';

// Set auth token
cookieUtils.setAuthToken('your-jwt-token');

// Get auth token
const token = cookieUtils.getAuthToken();

// Check if authenticated
const isLoggedIn = cookieUtils.isAuthenticated();

// Set user session
cookieUtils.setUserSession({ id: 1, name: 'John Doe' });

// Get user session
const user = cookieUtils.getUserSession();

// Clear all auth data
cookieUtils.removeAuthToken();
cookieUtils.removeUserSession();
```

## Configuration

### QueryClient Options
The QueryClient is configured with:
- **staleTime**: 5 minutes
- **gcTime**: 10 minutes (formerly cacheTime)
- **retry**: 3 attempts (no retry on 4xx errors)
- **refetchOnWindowFocus**: false

### Cookie Options
Cookies are set with:
- **expires**: 7 days by default
- **secure**: true in production
- **sameSite**: 'strict'
- **httpOnly**: false (allows client-side access)

## File Structure
```
src/
├── hooks/
│   └── useApi.js          # Custom API hooks
├── providers/
│   └── AppProviders.jsx   # QueryClient provider wrapper
├── utils/
│   ├── cookieUtils.js     # Cookie management utilities
│   └── queryClient.js     # QueryClient configuration
└── main.jsx               # App wrapped with providers
```

## Development Tools
- **React Query Devtools** are enabled in development mode
- Open browser devtools and look for the "React Query" tab
- Useful for debugging queries, mutations, and cache state
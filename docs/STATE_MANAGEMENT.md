# State Management & API Documentation

This project uses Zustand for state management, Axios for HTTP requests, and react-hot-toast for notifications.

## Overview

- **Axios API Client** (`lib/api.ts`): Configured with interceptors for authentication
- **Auth Store** (`lib/store/useAuthStore.ts`): Manages authentication state with Zustand
- **App Store** (`lib/store/useAppStore.ts`): Manages global application state (sidebar, theme)
- **API Hooks** (`lib/hooks/useApi.ts`): Reusable hooks for API calls with built-in loading states and error handling
- **Notifications**: Using react-hot-toast for simple and elegant toast notifications

## Authentication

### Using the Auth Store

```tsx
import { useAuthStore } from '@/lib/store/useAuthStore';

function LoginComponent() {
  const { login, logout, user, isAuthenticated, isLoading } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      // User is now logged in, state is automatically updated
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={isLoading}>
          Login
        </button>
      )}
    </div>
  );
}
```

### Auth Methods

- `login(credentials)`: Authenticate user and store tokens
- `logout()`: Clear tokens and user data
- `refreshUser()`: Fetch current user data (called automatically on app start)
- `setUser(user)`: Manually set user data
- `clearAuth()`: Clear all auth state and tokens

## API Client

### Automatic Features

The Axios instance (`lib/api.ts`) automatically:

1. **Attaches auth tokens** to requests from cookies
2. **Handles 401 errors** by clearing tokens and redirecting to login
3. **Retries network failures** with exponential backoff
4. **Manages authentication state** automatically

### Using the API Client

```tsx
import api from '@/lib/api';

// Direct usage
const response = await api.get('/users');
const user = await api.post('/users', { name: 'John', email: 'john@example.com' });
```

### Using API Hooks

```tsx
import { useGetUsers, useCreateUser } from '@/lib/hooks/useApi';

function UsersComponent() {
  const { data: users, loading, error, execute: fetchUsers } = useGetUsers();
  const { execute: createUser, loading: createLoading } = useCreateUser();

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleCreateUser = async () => {
    try {
      await createUser({ name: 'New User', email: 'new@example.com' });
      fetchUsers(); // Refresh the list
    } catch (error) {
      // Error is automatically shown as notification
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={handleCreateUser} disabled={createLoading}>
        Create User
      </button>
    </div>
  );
}
```

## Application State

### Using the App Store

```tsx
import { useAppStore } from '@/lib/store/useAppStore';

function SidebarComponent() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>
    </div>
  );
}
```

### App Store Features

- **Sidebar state**: `sidebarOpen`, `setSidebarOpen()`, `toggleSidebar()`
- **Theme management**: `theme`, `setTheme()`

## Notifications

Notifications are handled using react-hot-toast, which provides simple and elegant toast notifications.

### Using Toast Notifications

```tsx
import toast from 'react-hot-toast';

function MyComponent() {
  const showSuccess = () => {
    toast.success('Operation successful!');
  };

  const showError = () => {
    toast.error('Something went wrong!');
  };

  const showInfo = () => {
    toast('Information message');
  };

  const showLoading = () => {
    toast.loading('Processing...', { duration: 2000 });
  };

  return (
    <div>
      <button onClick={showSuccess}>Success</button>
      <button onClick={showError}>Error</button>
      <button onClick={showInfo}>Info</button>
      <button onClick={showLoading}>Loading</button>
    </div>
  );
}
```

### Toast Configuration

The Toaster is configured in `app/layout.tsx` with custom styling:

```tsx
<Toaster 
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#4ade80',
        secondary: '#fff',
      },
    },
    error: {
      duration: 5000,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>
```

## Environment Variables

Set these in your `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.your-backend.com/api
NODE_ENV=production
```

## Token Storage

- Tokens are stored in HTTP-only cookies (more secure than localStorage)
- `auth-token`: Access token (7 days)
- Automatically clears token and redirects to login when token expires

## Error Handling

The system includes comprehensive error handling:

1. **Network errors**: Automatic retry with exponential backoff
2. **401 Unauthorized**: Clear tokens and redirect to login
3. **API errors**: Extracted and displayed in notifications (when enabled)

## Best Practices

1. **Use API hooks** instead of direct API calls for better state management
2. **Enable notifications** for user feedback on important operations
3. **Handle loading states** to improve user experience
4. **Use selectors** for better performance with large stores
5. **Clear sensitive data** on logout

## Custom API Hooks

Create custom hooks for specific API endpoints:

```tsx
// lib/hooks/useApi.ts
export function useGetDashboardStats() {
  return useApi(() => api.get('/dashboard/stats'));
}

export function useUpdateUserProfile() {
  return useApi(
    (data: any) => api.put('/profile', data),
    {
      showSuccessNotification: true,
      successMessage: 'Profile updated successfully',
    }
  );
}
```

## TypeScript Support

All stores and hooks are fully typed. Define your types in `lib/types.ts`:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

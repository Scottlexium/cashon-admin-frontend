import { LoginCredentials, User, ApiResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth token in cookie
        document.cookie = `auth-token=${data.data.token}; path=/; secure; samesite=strict`;
        document.cookie = `user-role=${data.data.user.role}; path=/; secure; samesite=strict`;
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear cookies
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.user;
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  getToken(): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
    return authCookie ? authCookie.split('=')[1] : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();

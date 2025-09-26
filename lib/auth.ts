import { LoginCredentials, User, ApiResponse, LoginResponse } from './types';
import api from './api';
import Cookies from 'js-cookie';

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/login', credentials);
      const data = response.data;

      if (data.data?.token) {
        // Store auth token in cookie
        Cookies.set('auth-token', data.data.token, { 
          path: '/', 
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'strict',
          expires: 7 
        });
        
        if (data.data.role) {
          Cookies.set('user-role', data.data.role, { 
            path: '/', 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            expires: 7 
          });
        }
      }

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear cookies
      Cookies.remove('auth-token');
      Cookies.remove('user-role');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await api.get<User>('/profile');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  getToken(): string | null {
    return Cookies.get('auth-token') || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();

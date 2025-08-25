import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import api from '../api';
import { User, AuthState, LoginCredentials, LoginResponse, ApiResponse } from '../types';
import { encryptToken, decryptToken } from '../utils';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        }, false, 'setUser');
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true }, false, 'login:start');
        
        try {
          const response = await api.post<ApiResponse<LoginResponse>>('/login', credentials);
          const loginData = response.data.data;
          
          if (loginData?.token) {
            // Encrypt and store auth token in cookies
            const encryptedToken = await encryptToken(loginData.token);
            
            Cookies.set('auth-token', encryptedToken, { 
              path: '/', 
              sameSite: 'strict', 
              secure: process.env.NODE_ENV === 'production',
              expires: 7 // 7 days
            });

            // Create user object from login response (only basic fields)
            const user: User = {
              id: loginData.id,
              name: loginData.name,
              username: loginData.username,
              email: loginData.email,
              role: loginData.role,
              status: loginData.status,
              has_temp_password: loginData.has_temp_password,
            };

            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            }, false, 'login:success');
          } else {
            throw new Error('No token received from server');
          }
        } catch (error) {
          set({ isLoading: false }, false, 'login:error');
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true }, false, 'logout:start');
        
        try {
          // Attempt to logout on server
          await api.post('/logout');
        } catch (error) {
          // Ignore logout errors, still clear local state
          console.warn('Logout API call failed:', error);
        }
        
        // Clear cookies and state
        Cookies.remove('auth-token');
        
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        }, false, 'logout:complete');
      },

      refreshUser: async () => {
        const encryptedToken = Cookies.get('auth-token');
        
        if (!encryptedToken) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          }, false, 'refreshUser:noToken');
          return;
        }

        set({ isLoading: true }, false, 'refreshUser:start');
        
        try {
          // Decrypt token before using it
          const token = await decryptToken(encryptedToken);
          
          const response = await api.get<ApiResponse<User>>('/profile');
          const user = response.data.data;
          
          set({ 
            user: user || null, 
            isAuthenticated: !!user, 
            isLoading: false 
          }, false, 'refreshUser:success');
        } catch (error) {
          console.error('refreshUser error:', error);
          // Token is invalid, clear everything
          Cookies.remove('auth-token');
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          }, false, 'refreshUser:error');
        }
      },

      clearAuth: () => {
        Cookies.remove('auth-token');
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        }, false, 'clearAuth');
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

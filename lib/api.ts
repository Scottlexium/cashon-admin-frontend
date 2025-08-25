import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { decryptToken } from './utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - attach auth token from cookie
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const encryptedToken = Cookies.get('auth-token');
      if (encryptedToken && config.headers) {
        // Decrypt token before sending
        const token = await decryptToken(encryptedToken);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // running on server or cookies not available
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor - handle errors and redirect on 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { 
      _retry?: boolean; 
      _retryCount?: number; 
    };

    // Network or CORS errors: retry with exponential backoff
    const shouldRetryNetwork = !error.response && (!originalRequest._retryCount || originalRequest._retryCount < 2);
    if (shouldRetryNetwork && originalRequest) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      const backoff = 300 * Math.pow(2, originalRequest._retryCount - 1);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return api(originalRequest);
    }

    // Handle 401 errors - redirect to login
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      Cookies.remove('auth-token');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;

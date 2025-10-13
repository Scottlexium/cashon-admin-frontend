import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { decryptToken } from './utils';
import { ApiPaginationInfo } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Legacy response type - deprecated, use ApiResponseStructure instead
export interface LegacyApiResponse<T = any> extends AxiosResponse<T> {
  pagination?: ApiPaginationInfo;
}

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - attach auth token from cookie
axiosInstance.interceptors.request.use(
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

// Base API response interface
interface BaseApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
  pagination?: {
    total_items: number;
    total_pages: number;
    current_page: string;
    per_page: string;
  };
}

// Response interceptor - handle errors and preserve full response structure
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if response follows our API structure
    if (response.data && 
        typeof response.data === 'object' && 
        'status' in response.data && 
        'data' in response.data) {
      
      const baseResponse = response.data as BaseApiResponse;
      
      // If pagination exists, transform it to our expected format
      if (baseResponse.pagination) {
        const paginationInfo: ApiPaginationInfo = {
          total_items: baseResponse.pagination.total_items,
          total_pages: baseResponse.pagination.total_pages,
          current_page: parseInt(baseResponse.pagination.current_page),
          per_page: parseInt(baseResponse.pagination.per_page)
        };
        
        // Return the full response structure with transformed pagination
        return {
          data: baseResponse.data,
          message: baseResponse.message,
          status: baseResponse.status,
          pagination: paginationInfo
        };
      }
      
      // If no pagination, return the full response structure without pagination
      return {
        data: baseResponse.data,
        message: baseResponse.message,
        status: baseResponse.status
      };
    }
    
    // Return data as-is if it doesn't match our API structure
    return response.data;
  },
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
      return axiosInstance(originalRequest);
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

// Export the response type for TypeScript users
export interface ApiResponseStructure<T = any> {
  data: T;
  message: string;
  status: boolean;
  pagination?: ApiPaginationInfo;
}

// Usage: const { data, message, status, pagination? } = await api.get<YourType>('/endpoint')
// Create the typed API as the main export
const api = {
  get: async <T = any>(url: string, config?: any): Promise<ApiResponseStructure<T>> => {
    const response = await axiosInstance.get(url, config);
    return response as unknown as ApiResponseStructure<T>;
  },
  post: async <T = any>(url: string, data?: any, config?: any): Promise<ApiResponseStructure<T>> => {
    const response = await axiosInstance.post(url, data, config);
    return response as unknown as ApiResponseStructure<T>;
  },
  put: async <T = any>(url: string, data?: any, config?: any): Promise<ApiResponseStructure<T>> => {
    const response = await axiosInstance.put(url, data, config);
    return response as unknown as ApiResponseStructure<T>;
  },
  patch: async <T = any>(url: string, data?: any, config?: any): Promise<ApiResponseStructure<T>> => {
    const response = await axiosInstance.patch(url, data, config);
    return response as unknown as ApiResponseStructure<T>;
  },
  delete: async <T = any>(url: string, config?: any): Promise<ApiResponseStructure<T>> => {
    const response = await axiosInstance.delete(url, config);
    return response as unknown as ApiResponseStructure<T>;
  },
};

// Export for backward compatibility  
export type { ApiResponseStructure as ApiResponse };

export default api;

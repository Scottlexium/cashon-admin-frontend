import { useState, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface UseApiOptions {
  showSuccessNotification?: boolean;
  showErrorNotification?: boolean;
  successMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | void>;
  reset: () => void;
}

export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<AxiosResponse<any>>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiCall(...args);
        const responseData = response.data;
        
        setData(responseData);

        if (options.showSuccessNotification) {
          toast.success(options.successMessage || 'Operation completed successfully');
        }

        if (options.onSuccess) {
          options.onSuccess(responseData);
        }

        return responseData;
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);

        if (options.showErrorNotification) {
          toast.error(errorMessage);
        }

        if (options.onError) {
          options.onError(err);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Helper function to extract error messages
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred'
    );
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

// Specific API hooks for common operations: TODO
// export function useGetUsers() {
//   return useApi(() => api.get('/users'));
// }

// export function useGetTransactions() {
//   return useApi(() => api.get('/transactions'));
// }

// export function useGetUser(id: string) {
//   return useApi(() => api.get(`/users/${id}`));
// }

// export function useCreateUser() {
//   return useApi(
//     (userData: any) => api.post('/users', userData),
//     {
//       showSuccessNotification: true,
//       showErrorNotification: true,
//       successMessage: 'User created successfully',
//     }
//   );
// }

// export function useUpdateUser() {
//   return useApi(
//     (id: string, userData: any) => api.put(`/users/${id}`, userData),
//     {
//       showSuccessNotification: true,
//       showErrorNotification: true,
//       successMessage: 'User updated successfully',
//     }
//   );
// }

// export function useDeleteUser() {
//   return useApi(
//     (id: string) => api.delete(`/users/${id}`),
//     {
//       showSuccessNotification: true,
//       showErrorNotification: true,
//       successMessage: 'User deleted successfully',
//     }
//   );
// }

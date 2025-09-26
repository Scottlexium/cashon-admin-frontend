export interface Department {
  id: number;
  name: string;
  role: string;
  status: string;
}

export interface ApiPaginationInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiPaginatedResponse<T> {
  data: T;
  pagination: ApiPaginationInfo;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  has_temp_password: 0 | 1;
  login_time?: string;
  departments?: Department[];
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  has_temp_password: 0 | 1;
  token: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

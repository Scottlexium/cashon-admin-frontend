export interface Department {
  id: number;
  name: string;
  role: string;
  status: string;
}

export interface ApiPaginationInfo {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
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

export interface SavingsSummary {
  vault_balance: string;
  total_savings: string;
  interest_earned: string;
}

export interface SavingsPlan {
  plan_id: number;
  savings_plan: string;
  amount_saved: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  interest: number;
}

export interface UserSavingsResponse {
  status: boolean;
  summary: SavingsSummary;
  savings_plans: SavingsPlan[];
}

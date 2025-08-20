import { Transaction, User, ApiResponse, PaginatedResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private getToken(): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
    return authCookie ? authCookie.split('=')[1] : null;
  }

  // Users API
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users?page=${page}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Transactions API
  async getTransactions(page = 1, limit = 10): Promise<PaginatedResponse<Transaction>> {
    const response = await fetch(`${API_BASE_URL}/transactions?page=${page}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Analytics API
  async getDashboardStats(): Promise<ApiResponse<{
    totalRevenue: number;
    activeUsers: number;
    totalTransactions: number;
    pendingIssues: number;
  }>> {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getRevenueChart(period: '7d' | '30d' | '90d' = '30d'): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${API_BASE_URL}/analytics/revenue?period=${period}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Reports API
  async generateReport(type: string, params: Record<string, any>): Promise<ApiResponse<{ downloadUrl: string }>> {
    const response = await fetch(`${API_BASE_URL}/reports/generate`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ type, params }),
    });
    return response.json();
  }

  async getReports(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }
}

export const apiService = new ApiService();

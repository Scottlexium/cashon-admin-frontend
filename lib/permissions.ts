import api from './api';

// Permission type - permissions will come from API
export type Permission = string;

// API-based role and permission interfaces
interface ApiRole {
  key: string;
  label: string;
  permissions: string[];
}

// Global variable to store API roles data
let apiRoles: ApiRole[] = [];

// Permission checking utilities
export const hasPermission = (userPermissions: Permission[], requiredPermission: Permission): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};

// Fetch roles from your API using axios instance
export const fetchRoles = async (): Promise<ApiRole[]> => {
  try {
    console.log('Fetching roles from API...');
    const response = await api.get('/admin-role');
    
    if (response.data) {
      apiRoles = response.data;
      console.log('Successfully fetched roles:', apiRoles.length, 'roles');
      console.log('Roles data:', apiRoles.map(r => ({ key: r.key, label: r.label, permissions: r.permissions.length })));
      return response.data;
    } else {
      console.warn('API response format unexpected:', response.data);
    }
  } catch (error) {
    console.error('Failed to fetch roles from API:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
  return [];
};

// Get permissions for a specific role
export const getRolePermissions = (roleName: string): Permission[] => {
  // Check if we have API roles data
  if (apiRoles.length > 0) {
    const apiRole = apiRoles.find(r => r.key === roleName);
    if (apiRole) {
      return apiRole.permissions as Permission[];
    }
  }
  
  // If no API data or role not found, return empty permissions
  console.warn(`Role '${roleName}' not found in API data. Available roles:`, apiRoles.map(r => r.key));
  return [];
};

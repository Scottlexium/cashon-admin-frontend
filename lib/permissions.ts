import api from './api';


export type Permission = string;


interface ApiRole {
  key: string;
  label: string;
  permissions: string[];
}


let apiRoles: ApiRole[] = [];


export const hasPermission = (userPermissions: Permission[], requiredPermission: Permission): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};

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
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
  return [];
};


export const getRolePermissions = (roleName: string): Permission[] => {

  if (apiRoles.length > 0) {
    const apiRole = apiRoles.find(r => r.key === roleName);
    if (apiRole) {
      return apiRole.permissions as Permission[];
    }
  }
  

  console.warn(`Role '${roleName}' not found in API data. Available roles:`, apiRoles.map(r => r.key));
  return [];
};

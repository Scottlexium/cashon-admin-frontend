'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions, getRolePermissions, fetchRoles } from '@/lib/permissions';
import { useAuthStore } from '@/lib/store/useAuthStore';

interface Department {
  id: number;
  name: string;
  role: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  has_temp_password: number;
  login_time: string;
  departments: Department[];
  permissions: Permission[];
}

interface PermissionContextType {
  user: User | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  isRole: (role: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: React.ReactNode }) {
  const authUser = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.isLoading);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [rolesLoaded, setRolesLoaded] = useState(false);

  useEffect(() => {
    const initializePermissions = async () => {
      try {
        // Only fetch roles if user is authenticated
        if (authUser) {
          await fetchRoles();
          setRolesLoaded(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        setLoading(false);
      }
    };

    // Don't run if auth is still loading
    if (!authLoading) {
      initializePermissions();
    }
  }, [authUser, authLoading]);

  useEffect(() => {
    // Update permission user when auth user changes AND roles are loaded
    if (authUser && rolesLoaded) {
      const rolePermissions = getRolePermissions(authUser.role);
      console.log(`[PermissionContext] User role: ${authUser.role}, Permissions:`, rolePermissions);
      
      const permissionUser: User = {
        id: authUser.id,
        name: authUser.name,
        username: authUser.username,
        email: authUser.email,
        phone: authUser.phone || '',
        role: authUser.role,
        status: authUser.status,
        has_temp_password: authUser.has_temp_password,
        login_time: authUser.login_time || new Date().toISOString(),
        departments: authUser.departments || [],
        permissions: rolePermissions
      };
      setUser(permissionUser);
    } else if (!authUser) {
      setUser(null);
    }
  }, [authUser, rolesLoaded]);

  const contextValue: PermissionContextType = {
    user,
    loading: loading || authLoading,
    hasPermission: (permission: Permission) => 
      user ? hasPermission(user.permissions, permission) : false,
    hasAnyPermission: (permissions: Permission[]) => 
      user ? hasAnyPermission(user.permissions, permissions) : false,
    hasAllPermissions: (permissions: Permission[]) => 
      user ? hasAllPermissions(user.permissions, permissions) : false,
    isRole: (role: string) => user?.role === role
  };

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
}

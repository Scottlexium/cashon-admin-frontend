'use client';

import React from 'react';
import { usePermissions } from '@/lib/contexts/PermissionContext';
import { Permission } from '@/lib/permissions';

interface PermissionGuardProps {
  permissions?: Permission | Permission[];
  role?: string;
  requireAll?: boolean; // For multiple permissions, require all or any
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ 
  permissions, 
  role, 
  requireAll = false, 
  fallback = null, 
  children 
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isRole, loading } = usePermissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00FFB3]"></div>
      </div>
    );
  }

  // Check role-based access
  if (role && !isRole(role)) {
    return <>{fallback}</>;
  }

  // Check permission-based access
  if (permissions) {
    const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
    
    if (permissionArray.length === 1) {
      if (!hasPermission(permissionArray[0])) {
        return <>{fallback}</>;
      }
    } else {
      const hasAccess = requireAll 
        ? hasAllPermissions(permissionArray)
        : hasAnyPermission(permissionArray);
      
      if (!hasAccess) {
        return <>{fallback}</>;
      }
    }
  }

  return <>{children}</>;
}

// HOC version for easier component wrapping
export function withPermissions<P extends object>(
  Component: React.ComponentType<P>,
  guardProps: Omit<PermissionGuardProps, 'children'>
) {
  return function PermissionWrappedComponent(props: P) {
    return (
      <PermissionGuard {...guardProps}>
        <Component {...props} />
      </PermissionGuard>
    );
  };
}

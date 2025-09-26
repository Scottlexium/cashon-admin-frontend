'use client';

import { usePermissions } from '@/lib/contexts/PermissionContext';
import { Permission } from '@/lib/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface UsePermissionCheckOptions {
  redirectTo?: string;
  showError?: boolean;
}

export function usePermissionCheck(
  requiredPermissions: Permission | Permission[],
  options: UsePermissionCheckOptions = {}
) {
  const { hasPermission, hasAnyPermission, loading } = usePermissions();
  const router = useRouter();
  const { redirectTo = '/dashboard', showError = false } = options;

  const permissions = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  const hasAccess = permissions.length === 1 
    ? hasPermission(permissions[0])
    : hasAnyPermission(permissions);

  useEffect(() => {
    if (!loading && !hasAccess && redirectTo) {
      if (showError) {
        toast.error('You do not have permission to access this page.'); 
        console.warn('Access denied: Insufficient permissions');
      }
      router.push(redirectTo);
    }
  }, [loading, hasAccess, redirectTo, router, showError]);

  return {
    hasAccess,
    loading,
    permissions
  };
}

// Hook for checking multiple permission sets
export function useMultiPermissionCheck(
  permissionSets: { permissions: Permission[]; requireAll?: boolean }[]
) {
  const { hasAnyPermission, hasAllPermissions, loading } = usePermissions();

  const results = permissionSets.map(({ permissions, requireAll = false }) => {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    
    return { permissions, hasAccess, requireAll };
  });

  return {
    results,
    loading,
    hasAnyAccess: results.some(r => r.hasAccess)
  };
}

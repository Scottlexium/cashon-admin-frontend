'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const refreshUser = useAuthStore((state) => state.refreshUser);

  useEffect(() => {
    // Restore auth state on app initialization
    refreshUser();
  }, [refreshUser]);

  return <>{children}</>;
}

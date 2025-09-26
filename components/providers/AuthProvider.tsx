'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore auth state on app initialization
    const { refreshUser } = useAuthStore.getState();
    refreshUser();
  }, []); // Empty dependency array - only run once on mount

  return <>{children}</>;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, refreshUser } = useAuthStore();

  useEffect(() => {
    // Try to restore user session first
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    // Once loading is complete, redirect based on auth status
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

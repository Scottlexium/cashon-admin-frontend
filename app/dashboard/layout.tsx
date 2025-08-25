'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, isLoading, refreshUser } = useAuthStore();
  const router = useRouter();

  // Initial auth check on mount
  useEffect(() => {
    const initAuth = async () => {
      // If user is already in store, no need to refresh
      if (user && isAuthenticated) {
        return;
      }

      // Check if we have a token
      const encryptedToken = Cookies.get('auth-token');
      if (!encryptedToken) {
        router.push('/login');
        return;
      }

      // Try to refresh user data only if we have a token but no user
      try {
        await refreshUser();
      } catch (error) {
        console.error('Auth refresh failed:', error);
        router.push('/login');
      }
    };

    initAuth();
  }, []); // Only run once on mount

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not loading, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-[#151517]">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-900/80"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className={cn("lg:ml-72 lg:pl-4 lg:pr-4 bg-[#1B1B1DB8] p-4 rounded-3xl mr-5")}>
        <Header />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

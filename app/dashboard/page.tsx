'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">C</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">CashOn Admin</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to CashOn Admin!</h2>
              <p className="text-gray-600 mb-8">You have successfully logged in to the admin dashboard.</p>
              <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">1,234</div>
                    <div className="text-gray-500">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₦2.5M</div>
                    <div className="text-gray-500">Total Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to overview page
    router.replace('/dashboard/overview');
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <p className="text-gray-600">Loading overview...</p>
      </div>
    </div>
  );
}

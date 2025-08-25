'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { navigation } from '@/lib/navigation';
import { LogoutIcon } from '@/components/icons';

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col bg-[#151517]">
      {/* Logo/Brand */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00FFB3]">
            <span className="text-sm font-bold text-white">C</span>
          </div>
          <span className="text-xl font-semibold text-white">CashOn</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-4 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            // Special handling for dashboard to match both /dashboard and /dashboard/overview, just minor stuff to make sure overview is dashboard index
            const isActive = item.href === '/dashboard' 
              ? (pathname === '/dashboard' || pathname === '/dashboard/overview' || pathname.startsWith('/dashboard/overview/'))
              : pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex gap-x-3 rounded-md p-3 text-sm font-medium leading-6 transition-colors',
                    isActive
                      ? 'bg-gray-800 text-[#00FFB3]'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isActive ? 'text-emerald-400' : 'text-gray-400 group-hover:text-white'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Profile & Logout */}
        <div className="border-t border-gray-700 pt-4">
          {user && (
            <div className="mb-3 px-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00FFB3]">
                  <span className="text-sm font-medium text-white">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-medium leading-6 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <LogoutIcon
              className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-white"
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

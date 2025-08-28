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
      <div className='flex items-center gap-2 px-4 py-2 justify-between bg-[#1F20238F] w-[90%] rounded-[11px] mx-auto mt-4'>
        <div className='space-y-2'>
          <p className="text-sm font-semibold text-white">{user?.name}</p>
          <p className="text-xs font-medium text-[#A2A2A7]">{user?.email}</p>
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00005 1C1.00005 1 7 5.4189 7 7C7 8.5812 1 13 1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>


      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-4 pb-4 mt-5">
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
                      ? 'bg-[#1F2023] text-white'
                      : 'text-[#A2A2A7] hover:bg-[#1F2023] hover:text-white'
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

          <button
            onClick={handleLogout}
            className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-medium leading-6 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <LogoutIcon
              className="h-5 w-5 shrink-0 text-red-400 group-hover:text-white"
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </nav>
    </div >
  );
}

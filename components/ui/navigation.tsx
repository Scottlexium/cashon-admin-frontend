'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChartIcon, UserIcon, SettingsIcon } from './icons';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Overview',
    href: '/',
    icon: ChartIcon,
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: UserIcon,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
  },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col space-y-1', className)}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
              'hover:bg-gray-50 hover:text-gray-900',
              isActive
                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                : 'text-gray-600'
            )}
          >
            <Icon size={18} className="flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Logo component for the sidebar
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">C</span>
      </div>
      <span className="font-bold text-xl text-gray-900">CashOn</span>
    </div>
  );
}

// Sidebar component combining logo and navigation
interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn(
      'flex flex-col w-64 min-h-screen bg-white border-r border-gray-200',
      className
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <Navigation />
      </div>

      {/* User section at bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon size={16} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@cashon.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

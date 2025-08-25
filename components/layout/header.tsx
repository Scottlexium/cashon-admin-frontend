'use client';

import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/navigation';
import { HomeIcon } from '@/components/icons';

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const pathname = usePathname();

  // Get page info dynamically from shared navigation array
  const getPageInfo = (path: string) => {
    // Find exact match first
    const exactMatch = navigation.find(item => item.href === path);
    if (exactMatch) {
      return { title: exactMatch.name, icon: exactMatch.icon };
    }

    // Find partial match for nested routes
    const partialMatch = navigation.find(item => 
      path.startsWith(item.href) && item.href !== '/dashboard'
    );
    if (partialMatch) {
      return { title: partialMatch.name, icon: partialMatch.icon };
    }

    // Fallback: generate title from path
    const segments = path.replace(/^\//, '').split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'dashboard';
    const title = lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { title, icon: HomeIcon };
  };

  const { title, icon: Icon } = getPageInfo(pathname);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-x-3">
        <Icon className="h-6 w-6 text-gray-600" />
        <h1 className="text-xl font-semibold text-gray-900">
          {title}
        </h1>
      </div>
    </div>
  );
}

import {
  UsersIcon,
  OverviewIcon,
  ExchangeIcon,
} from '@/components/icons';

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/dashboard/overview', icon: OverviewIcon },
  { name: 'Users', href: '/dashboard/users', icon: UsersIcon },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ExchangeIcon },
];

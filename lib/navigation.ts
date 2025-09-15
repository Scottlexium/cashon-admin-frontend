import {
  UsersIcon,
  OverviewIcon,
  ExchangeIcon,
  RevenueIcon,
  BoostIcon,
  ComplianceIcon,
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
  { name: 'Boost', href: '/dashboard/boost', icon: BoostIcon },
  { name: 'Compliance', href: '/dashboard/compliance', icon: ComplianceIcon },
];

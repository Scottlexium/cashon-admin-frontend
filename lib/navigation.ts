import {
  UsersIcon,
  OverviewIcon,
  ExchangeIcon,
  RevenueIcon,
  BoostIcon,
  ComplianceIcon,
  Cog6ToothIcon,
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
  { name: 'Growth', href: '/dashboard/growth', icon: RevenueIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

import {
  UsersIcon,
  OverviewIcon,
  ExchangeIcon,
  RevenueIcon,
  BoostIcon,
  ComplianceIcon,
  Cog6ToothIcon,
} from '@/components/icons';
import { Permission } from '@/lib/permissions';

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: Permission;
}

export const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/dashboard/overview', icon: OverviewIcon },
  { name: 'Users', href: '/dashboard/users', icon: UsersIcon, permission: 'view_user' },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ExchangeIcon, permission: 'view_transaction' },
  { name: 'Boost', href: '/dashboard/boost', icon: BoostIcon, permission: 'manage_payout' },
  { name: 'Compliance', href: '/dashboard/compliance', icon: ComplianceIcon, permission: 'view_kyc' },
  { name: 'Growth', href: '/dashboard/growth', icon: RevenueIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, permission: 'system_config' },
];

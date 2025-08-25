import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  OverviewIcon,
} from '@/components/icons';

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/dashboard/overview', icon: OverviewIcon },
  { name: 'Users', href: '/dashboard/users', icon: UsersIcon },

];

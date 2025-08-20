import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ChevronDownIcon } from './icons';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, actions, className }: HeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

// Time period selector component from Figma
interface TimePeriodSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function TimePeriodSelector({ 
  value = 'Last 30 days', 
  onChange,
  className 
}: TimePeriodSelectorProps) {
  return (
    <div className={cn('relative', className)}>
      <Button
        variant="secondary"
        className="flex items-center gap-2 min-w-[140px] justify-between"
        onClick={() => {
          // In a real app, this would open a dropdown
          console.log('Open time period selector');
        }}
      >
        <span className="text-sm">{value}</span>
        <ChevronDownIcon size={14} />
      </Button>
    </div>
  );
}

// Export actions component for dashboard header
export function DashboardHeaderActions() {
  return (
    <>
      <TimePeriodSelector />
      <Button variant="primary" className="font-medium">
        Export
      </Button>
    </>
  );
}

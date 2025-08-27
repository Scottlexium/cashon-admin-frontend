import React from 'react';
import { cn, formatValue } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
  format?: 'currency' | 'number' | 'percentage';
  prefix?: string;
  suffix?: string;
  currency?: string;
  locale?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  className,
  variant = 'dark',
  format,
  prefix,
  suffix,
  currency,
  locale
}: StatsCardProps) {
  const formattedValue = formatValue(value, format, prefix, suffix, currency, locale);
  
  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    if (type === 'neutral') return null;
    
    return (
      <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12" 
        fill="none"
        className={cn(
          'transition-colors',
          type === 'increase' ? 'text-green-500' : 'text-red-500'
        )}
      >
        {type === 'increase' ? (
          <path 
            d="M3 7.5L6 4.5L9 7.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        ) : (
          <path 
            d="M3 4.5L6 7.5L9 4.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1',
        'transform-gpu will-change-transform group',
        variant === 'dark' 
          ? 'bg-[#1C1C1E] border-gray-800 hover:border-[#00FFB3]/30 hover:shadow-[#00FFB3]/10' 
          : 'bg-white border-gray-200 hover:border-[#00FFB3]/30',
        className
      )}
    >
      <div className="p-4 sm:p-6">
        {/* Header with icon and title */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className={cn(
            'flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 group-hover:text-[#00FFB3]',
            variant === 'dark' ? 'text-gray-400' : 'text-gray-600'
          )}>
            {icon}
          </div>
          <span className={cn(
            'text-xs sm:text-sm font-medium transition-colors duration-300 truncate',
            variant === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-500'
          )}>
            {title}
          </span>
        </div>

        {/* Value */}
        <div className="mb-3 sm:mb-4">
          <span className={cn(
            'text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-all duration-300',
            'group-hover:text-[#00FFB3] break-all',
            variant === 'dark' ? 'text-white' : 'text-gray-900'
          )}>
            {formattedValue}
          </span>
        </div>

        {/* Change indicator */}
        {change && (
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <div className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              {getChangeIcon(change.type)}
            </div>
            <span className={cn(
              'text-xs sm:text-sm font-medium transition-colors duration-300 flex-shrink-0',
              change.type === 'increase' && 'text-green-500',
              change.type === 'decrease' && 'text-red-500',
              change.type === 'neutral' && (variant === 'dark' ? 'text-gray-400' : 'text-gray-600')
            )}>
              {change.value}
            </span>
            <span className={cn(
              'text-xs sm:text-sm transition-colors duration-300 truncate min-w-0',
              variant === 'dark' ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-500'
            )}>
              {change.period || 'from last month'}
            </span>
          </div>
        )}
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB3]/0 via-[#00FFB3]/0 to-[#00FFB3]/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

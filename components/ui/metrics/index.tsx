import React from 'react';
import { cn, formatValue } from '@/lib/utils';

interface MetricsItem {
  title: string;
  value: string | number;
  format?: 'currency' | 'number' | 'percentage';
  prefix?: string;
  suffix?: string;
  currency?: string;
  locale?: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon: React.ReactNode;
}

interface MetricsProps {
  items: MetricsItem[];
  className?: string;
  variant?: 'default' | 'dark';
}

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
        type === 'increase' ? 'text-[#3AF4BD]' : 'text-[#FF5462]'
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

export function Metrics({ 
  items,
  className,
  variant = 'dark'
}: MetricsProps) {
  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg group',
        'transform-gpu will-change-transform',
        variant === 'dark' 
          ? 'bg-[#1C1C1E] border-[#313135BA] border-2 hover:border-[#00FFB3]/30 hover:shadow-[#00FFB3]/10' 
          : 'bg-white border-gray-200 hover:border-[#00FFB3]/30',
        className
      )}
      style={{ boxShadow: '0px 1px 2px 0px #1018280D' }}
    >
      {/* Responsive flex layout */}
      <div className="flex flex-col sm:flex-row">
        {items.map((item, index) => {
          const formattedValue = formatValue(item.value, item.format, item.prefix, item.suffix, item.currency, item.locale);
          
          return (
            <div 
              key={index} 
              className={cn(
                'relative flex-1 p-4 sm:p-6 transition-all duration-300 hover:bg-[#00FFB3]/5 animate-in fade-in',
                'transform-gpu will-change-transform'
              )}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationDuration: '500ms'
              }}
            >
              {/* Responsive dividers */}
              {index < items.length - 1 && (
                <>
                  {/* Vertical divider for desktop */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-px bg-gray-800 hidden sm:block transition-colors duration-300 group-hover:bg-[#00FFB3]/30"></div>
                  {/* Horizontal divider for mobile */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gray-800 block sm:hidden transition-colors duration-300 group-hover:bg-[#00FFB3]/30"></div>
                </>
              )}
              
              {/* Header with icon and title */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                <div className={cn(
                  'flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 group-hover:text-[#00FFB3]',
                  variant === 'dark' ? 'text-[#8C8C93]' : 'text-gray-600'
                )}>
                  {item.icon}
                </div>
                <span className={cn(
                  'text-xs sm:text-sm font-medium transition-colors duration-300 truncate',
                  variant === 'dark' ? 'text-[#8C8C93] group-hover:text-[#DEDEE3]' : 'text-gray-600 group-hover:text-gray-500'
                )}>
                  {item.title}
                </span>
              </div>

              {/* Value */}
              <div className="mb-3 sm:mb-4">
                <span className={cn(
                  'text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight transition-all duration-300 break-all',
                  'group-hover:text-[#00FFB3] group-hover:scale-105 transform-gpu',
                  variant === 'dark' ? 'text-[#DEDEE3]' : 'text-black'
                )}>
                  {formattedValue}
                </span>
              </div>

              {/* Change indicator */}
              {item.change && (
                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                  <div className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    {getChangeIcon(item.change.type)}
                  </div>
                  <span className={cn(
                    'text-xs font-medium transition-colors duration-300 flex-shrink-0',
                    item.change.type === 'increase' && 'text-[#3AF4BD]',
                    item.change.type === 'decrease' && 'text-[#FF5462]',
                    item.change.type === 'neutral' && (variant === 'dark' ? 'text-gray-400' : 'text-gray-600')
                  )}>
                    {item.change.value}
                  </span>
                  <span className={cn(
                    'text-xs transition-colors duration-300 truncate min-w-0',
                    variant === 'dark' ? 'text-[#7A7A83] group-hover:text-[#8C8C93]' : 'text-[#7A7A83]'
                  )}>
                    {item.change.period || 'from last month'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB3]/0 via-[#00FFB3]/0 to-[#00FFB3]/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

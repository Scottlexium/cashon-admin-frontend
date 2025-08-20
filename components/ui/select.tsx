'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from './icons';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
              'ring-offset-background placeholder:text-muted-foreground',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'appearance-none pr-10',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon size={14} className="text-gray-400" />
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-destructive">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };

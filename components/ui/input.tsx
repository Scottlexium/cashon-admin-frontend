import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helper, 
    startIcon, 
    endIcon, 
    className, 
    ...props 
  }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-body-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              'w-full bg-surface border border-border rounded-md px-6 py-4 text-body text-text-primary placeholder:text-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-error focus:border-error focus:ring-error/50',
              startIcon && 'pl-12',
              endIcon && 'pr-12',
              className
            )}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
              {endIcon}
            </div>
          )}
        </div>
        
        {(error || helper) && (
          <p className={cn(
            'text-caption',
            error ? 'text-error' : 'text-text-secondary'
          )}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

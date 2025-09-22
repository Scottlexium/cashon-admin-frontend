import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'addon' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  icon,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center cursor-pointer font-medium transition-all duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed rounded-[12px]';
  
  const variants = {
    primary: 'bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 hover:shadow-lg hover:-translate-y-0.5 shadow-cashon-sm',
    secondary: 'bg-surface-secondary text-text-primary border border-border hover:bg-border-light',
    outline: 'border border-border bg-transparent text-text-primary hover:bg-surface-secondary',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-md',
    danger: 'bg-error text-white hover:bg-error/90 shadow-cashon-sm',
    addon: 'bg-surface border border-border-light text-text-primary hover:bg-surface-secondary shadow-cashon-sm',
    filled: 'bg-[#4A4A4F] text-[#DEDEE3] hover:bg-[#5A5A5F] focus:outline-none border-none shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-caption gap-1.5',
    md: 'px-4 py-2.5 gap-2',
    lg: 'px-6 py-3 text-body gap-2',
  };

  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

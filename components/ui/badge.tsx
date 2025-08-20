import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
  showDot?: boolean;
}

export function Badge({ 
  variant = 'default', 
  children, 
  showDot = true,
  className, 
  ...props 
}: BadgeProps) {
  const variants = {
    success: 'bg-success-bg text-success border border-success/20',
    warning: 'bg-warning-bg text-warning border border-warning/20',
    error: 'bg-error-bg text-error border border-error/20',
    info: 'bg-info-bg text-info border border-info/20',
    default: 'bg-surface-secondary text-text-secondary border border-border',
  };

  const dotColors = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    default: 'bg-text-muted',
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-2xl text-caption font-medium',
        variants[variant],
        className
      )} 
      {...props}
    >
      {showDot && (
        <div className={cn('w-2 h-2 rounded-full flex-shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

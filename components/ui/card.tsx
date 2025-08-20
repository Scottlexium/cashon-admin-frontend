import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'stats';
  children: React.ReactNode;
}

export function Card({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}: CardProps) {
  const variants = {
    default: 'bg-surface border border-border rounded-3xl p-7 shadow-cashon-sm',
    secondary: 'bg-surface-secondary border border-border-light rounded-2xl p-8',
    stats: 'bg-surface border border-border rounded-3xl p-8 shadow-cashon-sm',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  addon?: React.ReactNode;
}

export function CardHeader({ 
  children, 
  icon, 
  addon, 
  className, 
  ...props 
}: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)} {...props}>
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="flex items-center justify-center w-8 h-8 bg-surface border border-border-light rounded-md p-2">
            {icon}
          </div>
        )}
        <h3 className="text-body-lg font-medium text-text-primary">{children}</h3>
      </div>
      {addon && addon}
    </div>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  );
}

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'addon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  icon,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-black hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary/50 rounded-lg shadow-cashon-sm',
    secondary: 'bg-surface-secondary text-text-primary border border-border hover:bg-border-light focus:ring-primary/50 rounded-lg',
    outline: 'border border-border bg-transparent text-text-primary hover:bg-surface-secondary focus:ring-primary/50 rounded-lg',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary focus:ring-primary/50 rounded-md',
    danger: 'bg-error text-white hover:bg-error/90 focus:ring-error/50 rounded-lg shadow-cashon-sm',
    addon: 'bg-surface border border-border-light text-text-primary hover:bg-surface-secondary focus:ring-primary/50 rounded-md shadow-cashon-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-caption gap-1.5',
    md: 'px-4 py-3 text-body-sm gap-2',
    lg: 'px-6 py-3 text-body gap-2',
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

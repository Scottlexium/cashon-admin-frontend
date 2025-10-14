import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'ghost' | 'filled' | 'outlined' | 'dot';
  color?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'verified' | 'pending' | 'tier';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'filled',
  color = 'default',
  size = 'md',
  icon,
  children,
  className,
  ...props
}) => {
  // Color definitions for different states
  const colors = {
    default: {
      ghost: 'bg-gray-100/10 text-gray-300 hover:bg-gray-100/20',
      filled: 'bg-gray-100 text-gray-800',
      outlined: 'border-gray-300 text-gray-300 bg-transparent',
      dot: 'text-gray-300 bg-transparent'
    },
    success: {
      ghost: 'bg-[#3AF4BD]/10 text-[#3AF4BD] hover:bg-[#3AF4BD]/20',
      filled: 'bg-[#3AF4BD] text-black',
      outlined: 'border-[#3AF4BD] text-[#3AF4BD] bg-transparent',
      dot: 'text-[#3AF4BD] bg-transparent'
    },
    warning: {
      ghost: 'bg-[#FFA500]/10 text-[#FFA500] hover:bg-[#FFA500]/20',
      filled: 'bg-[#FFA500] text-black',
      outlined: 'border-[#FFA500] text-[#FFA500] bg-transparent',
      dot: 'text-[#FFA500] bg-transparent'
    },
    error: {
      ghost: 'bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20',
      filled: 'bg-[#EF4444] text-white',
      outlined: 'border-[#EF4444] text-[#EF4444] bg-transparent',
      dot: 'text-[#EF4444] bg-transparent'
    },
    info: {
      ghost: 'bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20',
      filled: 'bg-[#3B82F6] text-white',
      outlined: 'border-[#3B82F6] text-[#3B82F6] bg-transparent',
      dot: 'text-[#3B82F6] bg-transparent'
    },
    verified: {
      ghost: 'bg-[#3AF4BD]/10 text-[#3AF4BD] hover:bg-[#3AF4BD]/20',
      filled: 'bg-[#3AF4BD] text-black',
      outlined: 'border-[#3AF4BD] text-[#3AF4BD] bg-transparent',
      dot: 'text-[#3AF4BD] bg-transparent'
    },
    pending: {
      ghost: 'bg-[#FFA500]/10 text-[#FFA500] hover:bg-[#FFA500]/20',
      filled: 'bg-[#FFA500] text-black',
      outlined: 'border-[#FFA500] text-[#FFA500] bg-transparent',
      dot: 'text-[#FFA500] bg-transparent'
    },
    tier: {
      ghost: 'bg-[#3AF4BD]/10 text-[#3AF4BD] hover:bg-[#3AF4BD]/20',
      filled: 'bg-[#3AF4BD] text-black',
      outlined: 'border-[#3AF4BD] text-[#3AF4BD] bg-transparent',
      dot: 'text-[#3AF4BD] bg-transparent'
    }
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // For dot variant, we don't apply padding since we'll handle it with the dot
  const dotSizes = {
    sm: 'text-xs',
    md: 'text-sm', 
    lg: 'text-base'
  };

  const baseClasses = variant === 'dot' 
    ? 'inline-flex items-center font-medium'
    : 'inline-flex items-center rounded-full font-medium transition-colors';
  
  const borderClass = variant === 'outlined' ? 'border' : '';
  const colorClasses = colors[color][variant];
  const sizeClasses = variant === 'dot' ? dotSizes[size] : sizes[size];

  // Create dot element for dot variant
  const dotElement = variant === 'dot' ? (
    <span 
      className={`w-2 h-2 rounded-full mr-2`}
      style={{ backgroundColor: 'currentColor' }}
    />
  ) : null;

  return (
    <div
      className={cn(
        baseClasses,
        borderClass,
        colorClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {dotElement}
      {icon && !dotElement && (
        <span className={cn('mr-1.5 flex items-center justify-center', iconSizes[size])}>
          {icon}
        </span>
      )}
      {children}
    </div>
  );
};

// Pre-configured badge components for convenience
export const VerifiedBadge: React.FC<Omit<BadgeProps, 'color' | 'children'> & { 
  text?: string;
}> = ({ text = "Verified", variant = 'ghost', ...props }) => (
  <Badge 
    color="verified" 
    variant={variant}
    icon={
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.236 4.53L7.73 9.77a.75.75 0 00-1.06 1.061l2.03 2.03a.75.75 0 001.137-.089l3.5-4.9z" clipRule="evenodd" />
      </svg>
    }
    {...props}
  >
    {text}
  </Badge>
);

export const TierBadge: React.FC<Omit<BadgeProps, 'color' | 'children'> & { 
  tier: number;
}> = ({ tier, variant = 'ghost', ...props }) => (
  <Badge 
    color="tier" 
    variant={variant}
    {...props}
  >
    Tier {tier}
  </Badge>
);

export const StatusBadge: React.FC<Omit<BadgeProps, 'children'> & { 
  status: 'approved' | 'pending' | 'rejected' | 'verified';
}> = ({ status, variant = 'ghost', ...props }) => {
  const statusColors = {
    approved: 'success',
    pending: 'pending',
    rejected: 'error',
    verified: 'verified'
  } as const;

  return (
    <Badge color={statusColors[status]} variant={variant} {...props}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default Badge;

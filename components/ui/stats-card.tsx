import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  className 
}: StatsCardProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-3xl p-8 shadow-cashon-sm', className)}>
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 text-text-muted">
            {icon}
          </div>
          <span className="text-body font-medium text-text-muted">{title}</span>
        </div>

        {/* Value and Change */}
        <div className="flex flex-col gap-6">
          <span className="text-hero font-semibold text-text-primary">
            {value}
          </span>
          
          {change && (
            <div className="flex items-center gap-1">
              <div className={cn(
                'flex items-center justify-center w-3.5 h-3.5 rounded-full',
                change.type === 'increase' ? 'bg-primary/10' : 'bg-error/10'
              )}>
                <svg 
                  width="10" 
                  height="10" 
                  viewBox="0 0 10 10" 
                  fill="none"
                  className={change.type === 'increase' ? 'text-primary' : 'text-error'}
                >
                  {change.type === 'increase' ? (
                    <path 
                      d="M2.5 6.25L5 3.75L7.5 6.25" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path 
                      d="M2.5 3.75L5 6.25L7.5 3.75" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>
              <span className={cn(
                'text-caption font-medium',
                change.type === 'increase' ? 'text-primary' : 'text-error'
              )}>
                {change.value}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

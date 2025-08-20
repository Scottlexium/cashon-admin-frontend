import { cn } from '@/lib/utils';

interface ChartData {
  label: string;
  deposits: number;
  withdrawals: number;
}

interface ChartProps {
  data: ChartData[];
  title: string;
  totalValue: string;
  className?: string;
}

export function Chart({ data, title, totalValue, className }: ChartProps) {
  // Calculate max value for scaling
  const maxValue = Math.max(
    ...data.flatMap(item => [item.deposits, item.withdrawals])
  );

  return (
    <div className={cn('bg-surface border border-border rounded-3xl p-7 shadow-cashon-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 bg-surface border border-border-light rounded-md p-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-text-muted">
              <path 
                d="M1 17L5.5 12.5L9 16L17 8M17 8H13M17 8V12" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-body-lg font-medium text-text-primary">Transactions</h3>
        </div>
        
        <div className="flex items-center gap-2.5 bg-surface border border-border-light rounded-md px-4 py-2.5">
          <span className="text-caption font-medium text-text-primary">Last 7 Days</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text-primary">
            <path 
              d="M3.5 5.25L7 8.75L10.5 5.25" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue rounded-full"></div>
          <span className="text-body font-medium text-text-muted">Deposit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-light rounded-full"></div>
          <span className="text-body font-medium text-text-muted">Withdrawals</span>
        </div>
      </div>

      {/* Chart Content */}
      <div className="space-y-6">
        {/* Total Value */}
        <div className="flex flex-col gap-2">
          <span className="text-body-sm font-medium text-text-secondary">
            {title}
          </span>
          <span className="text-3xl font-semibold text-text-primary">
            {totalValue}
          </span>
        </div>

        {/* Chart */}
        <div className="h-72 flex items-end justify-between gap-5 bg-transparent">
          {data.map((item, index) => {
            const depositHeight = (item.deposits / maxValue) * 100;
            const withdrawalHeight = (item.withdrawals / maxValue) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center gap-5 flex-1">
                {/* Bars */}
                <div className="flex flex-col w-full max-w-10 h-52">
                  <div 
                    className="bg-blue-light rounded-t-sm mb-0.5"
                    style={{ height: `${withdrawalHeight}%`, minHeight: '8px' }}
                  />
                  <div 
                    className="bg-blue rounded-b-sm"
                    style={{ height: `${depositHeight}%`, minHeight: '8px' }}
                  />
                </div>
                
                {/* Label */}
                <span className="text-body-sm font-semibold text-text-muted text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export interface MetricCardProps {
  title: string;
  amount: string;
  change: string;
  icon: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  amount,
  change,
  icon,
  className = ''
}) => {
  return (
    <div className={`bg-[#1C1C1E] rounded-2xl p-6 border border-[#2B2B2E] hover:border-[#00FFB3]/20 transition-all duration-300 ${className}`}>
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-6">
        <div className=" text-[#8C8C93] flex-shrink-0">
          {icon}
        </div>
        <span className="text-[#CBCBD8] text-base font-medium">{title}</span>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <span className="text-[#DEDEE3] text-2xl font-semibold tracking-tight">
          {amount}
        </span>
      </div>

      {/* Change indicator */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-[#3AF4BD]" fill="none" stroke="currentColor" viewBox="0 0 12 12">
            <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#3AF4BD] text-sm font-medium">{change}</span>
        </div>
        <span className="text-[#8C8C93] text-sm">from last month</span>
      </div>
    </div>
  );
};

'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  ChartProps,
  ChartDataPoint,
  defaultChartColors,
  defaultChartLayout,
  defaultChartAnimation,
  chartUtils
} from './types';

// Import individual chart components
import { BarChart } from './bar-chart';
import { StackedBarChart } from './stacked-bar-chart';
import { GroupedBarChart } from './grouped-bar-chart';
import { LineChart } from './line-chart';

export function Chart({
  data,
  fields,
  type,
  layout = defaultChartLayout,
  colors = defaultChartColors,
  className,
  height = 300,
  width,
  animation = defaultChartAnimation,
  interactive = true,
  responsive = true,
  showDataPoints = true, // Default to true
  title,
  subtitle,
  header,
  formatters,
  onBarClick,
  onBarHover
}: ChartProps) {
  
  // Merge default configurations with provided ones
  const chartLayout = useMemo(() => ({ ...defaultChartLayout, ...layout }), [layout]);
  const chartColors = useMemo(() => ({ ...defaultChartColors, ...colors }), [colors]);
  const chartAnimation = useMemo(() => ({ ...defaultChartAnimation, ...animation }), [animation]);

  // Calculate chart dimensions and max values
  const maxValue = useMemo(() => chartUtils.getMaxValue(data, fields), [data, fields]);
  
  // Format data for consistency
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      formattedLabel: formatters?.label ? formatters.label(item[fields.label]) : item[fields.label]
    }));
  }, [data, fields, formatters]);

  // Common chart props that all chart types will use
  const commonProps = {
    data: processedData,
    fields,
    maxValue,
    layout: chartLayout,
    colors: chartColors,
    animation: chartAnimation,
    height,
    width,
    interactive,
    showDataPoints,
    formatters,
    onBarClick,
    onBarHover
  };

  // Render appropriate chart component based on type
  const renderChart = () => {
    switch (type) {
      case 'bar':
      case 'column':
        return <BarChart {...commonProps} />;
      case 'stacked-bar':
        return <StackedBarChart {...commonProps} />;
      case 'grouped-bar':
        return <GroupedBarChart {...commonProps} />;
      case 'line':
      case 'area':
        return <LineChart {...commonProps} />;
      default:
        return <BarChart {...commonProps} />;
    }
  };

  return (
    <div className={cn(
      'rounded-xl p-6 transition-all duration-200',
      'bg-[#1C1C1E] border-[#313135BA] border-2',
      responsive && 'w-full',
      className
    )}>
      {/* Header Section */}
      {(title || subtitle || header) && (
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold mb-1 text-[#DEDEE3]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-[#8C8C93]">
                  {subtitle}
                </p>
              )}
            </div>
            
            {header?.actions && (
              <div className="ml-4">
                {header.actions}
              </div>
            )}
          </div>
          
          {header?.customContent && (
            <div className="mt-4">
              {header.customContent}
            </div>
          )}
        </div>
      )}

      {/* Chart Container */}
      <div className="relative">
        {renderChart()}
      </div>

      {/* Legend */}
      {chartLayout.legend?.position !== 'none' && (
        <div className={cn(
          'flex items-center gap-6 pt-4 border-t border-[#313135]',
          chartLayout.legend?.position === 'top' && 'order-first border-t-0 border-b pb-4',
          chartLayout.legend?.position === 'bottom' && 'mt-6',
          chartLayout.legend?.position === 'left' && 'flex-col items-start',
          chartLayout.legend?.position === 'right' && 'flex-col items-end'
        )}>
          {fields.values.map((fieldName, index) => (
            <LegendItem 
              key={fieldName}
              label={formatters?.legend?.(fieldName) || fieldName}
              color={chartColors.series[index] || chartColors.series[0]} 
              style={chartLayout.legend?.style || 'dots'} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Legend item component
interface LegendItemProps {
  label: string;
  color: string | string[];
  style: 'dots' | 'squares' | 'lines';
}

function LegendItem({ label, color, style }: LegendItemProps) {
  const colorClass = chartUtils.getColorClass(color);
  
  const getShapeClass = () => {
    switch (style) {
      case 'dots':
        return 'w-3 h-3 rounded-full';
      case 'squares':
        return 'w-3 h-3 rounded-sm';
      case 'lines':
        return 'w-4 h-1 rounded-full';
      default:
        return 'w-3 h-3 rounded-full';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn(getShapeClass(), colorClass)} />
      <span className="text-xs font-medium text-[#8C8C93]">
        {label}
      </span>
    </div>
  );
}

// Export with common presets
export const ChartPresets = {
  // Monthly revenue chart
  monthlyRevenue: (data: any[]) => ({
    type: 'bar' as const,
    fields: {
      label: 'month',
      values: {
        primary: 'revenue',
        secondary: 'expenses'
      }
    },
    title: 'Monthly Revenue',
    subtitle: 'Revenue vs Expenses comparison'
  }),

  // User activity chart
  userActivity: (data: any[]) => ({
    type: 'grouped-bar' as const,
    fields: {
      label: 'period',
      values: {
        primary: 'activeUsers',
        secondary: 'newUsers'
      }
    },
    title: 'User Activity',
    layout: {
      spacing: 'wide' as const
    }
  }),

  // Transaction volume
  transactionVolume: (data: any[]) => ({
    type: 'stacked-bar' as const,
    fields: {
      label: 'date',
      values: {
        primary: 'deposits',
        secondary: 'withdrawals'
      }
    },
    title: 'Transaction Volume',
    colors: {
      primary: 'from-[#10B981] to-[#059669]',
      secondary: 'from-[#EF4444] to-[#DC2626]'
    }
  })
};

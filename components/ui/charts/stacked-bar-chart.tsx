'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChartDataPoint, ChartFieldConfig, ChartLayout, ChartColors, ChartAnimation, chartUtils } from './types';

interface StackedBarChartProps {
  data: ChartDataPoint[];
  fields: ChartFieldConfig;
  maxValue: number;
  layout: ChartLayout;
  colors: ChartColors;
  animation: ChartAnimation;
  height: number;
  width?: number;
  interactive: boolean;
  formatters?: {
    value?: (value: any) => string;
    label?: (label: any) => string;
    tooltip?: (data: ChartDataPoint, field: string) => string;
  };
  onBarClick?: (data: ChartDataPoint, field: string) => void;
  onBarHover?: (data: ChartDataPoint, field: string) => void;
}

export function StackedBarChart({
  data,
  fields,
  maxValue,
  layout,
  colors,
  animation,
  height,
  interactive,
  formatters,
  onBarClick,
  onBarHover
}: StackedBarChartProps) {

  const formatValue = (value: any) => {
    return chartUtils.formatValue(value, formatters?.value);
  };

  return (
    <div className="relative">
      {/* Grid Lines */}
      {layout.gridLines !== 'none' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal Grid Lines */}
          {(layout.gridLines === 'horizontal' || layout.gridLines === 'both') && (
            <div className="absolute inset-0 flex flex-col justify-between">
              {chartUtils.generateGridLines(5).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className={cn(
                    'w-full h-px',
                    `bg-[${colors.grid || '#313135'}]`
                  )}
                />
              ))}
            </div>
          )}
          
          {/* Vertical Grid Lines */}
          {(layout.gridLines === 'vertical' || layout.gridLines === 'both') && (
            <div className="absolute inset-0 flex justify-between">
              {data.map((_, i) => (
                <div
                  key={`v-${i}`}
                  className={cn(
                    'w-px h-full',
                    `bg-[${colors.grid || '#313135'}]`,
                    i === 0 && 'ml-2 sm:ml-12', // Align with chart area
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs font-medium pointer-events-none">
        {chartUtils.generateGridLines(5).map((_, i) => {
          const value = (maxValue / 5) * (5 - i);
          return (
            <span
              key={i}
              className="transform -translate-y-1/2 text-[#8C8C93] text-right pr-2 hidden sm:block"
            >
              {formatValue(value)}
            </span>
          );
        })}
      </div>

      {/* Chart Area */}
      <div className="ml-2 sm:ml-12 pl-1 sm:pl-4 overflow-x-auto">
        <div 
          className={cn(
            'flex items-end justify-between min-w-full',
            layout.spacing === 'tight' && 'gap-0.5 sm:gap-1',
            layout.spacing === 'normal' && 'gap-1 sm:gap-2',
            layout.spacing === 'wide' && 'gap-2 sm:gap-4'
          )}
          style={{ 
            height: `${height}px`,
            minWidth: `${Math.max(data.length * 50, 300)}px`
          }}
        >
          {data.map((item, index) => {
            // Get all values for the series
            const seriesValues = fields.values.map(fieldName => ({
              fieldName,
              value: item[fieldName] || 0
            }));
            
            const totalValue = seriesValues.reduce((sum, series) => sum + series.value, 0);
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                {/* Stacked Bar Container */}
                <div className="relative w-full max-w-[30px] sm:max-w-[40px]">
                  {/* Combined stacked bar */}
                  <div className="relative w-full">
                    {/* Render stacked segments from bottom to top */}
                    {seriesValues.map((series, seriesIndex) => {
                      // Calculate cumulative height for stacking
                      const previousHeight = seriesValues
                        .slice(0, seriesIndex)
                        .reduce((sum, prev) => sum + (prev.value / maxValue) * height, 0);
                      
                      const segmentHeight = (series.value / maxValue) * height;
                      
                      if (series.value <= 0) return null;
                      
                      return (
                        <div 
                          key={series.fieldName} 
                          className="absolute bottom-0 w-full group"
                          style={{ bottom: `${previousHeight}px` }}
                        >
                          <div
                            className={cn(
                              'w-full transition-all duration-700 ease-out cursor-pointer',
                              seriesIndex === 0 && layout.barStyle === 'rounded' && 'rounded-b-sm',
                              seriesIndex === seriesValues.length - 1 && layout.barStyle === 'rounded' && 'rounded-t-sm',
                              layout.barStyle === 'square' && 'rounded-none',
                              seriesIndex === 0 && layout.barStyle === 'pill' && 'rounded-b-full',
                              seriesIndex === seriesValues.length - 1 && layout.barStyle === 'pill' && 'rounded-t-full',
                              chartUtils.getColorClass(colors.series[seriesIndex] || colors.series[0]),
                              interactive && 'hover:brightness-110'
                            )}
                            style={{
                              height: `${segmentHeight}px`,
                              animationDelay: animation.stagger ? `${index * (animation.delay || 100) + seriesIndex * 50}ms` : '0ms'
                            }}
                            onClick={() => onBarClick?.(item, series.fieldName)}
                            onMouseEnter={() => onBarHover?.(item, series.fieldName)}
                          />
                          
                          {/* Tooltip on hover */}
                          {interactive && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              {formatters?.tooltip 
                                ? formatters.tooltip(item, series.fieldName)
                                : `${series.fieldName}: ${formatValue(series.value)}`
                              }
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Label - Responsive text handling */}
                <span className="text-xs font-medium mt-2 text-[#8C8C93] text-center truncate w-full max-w-[60px] sm:max-w-none">
                  {formatters?.label ? formatters.label(item[fields.label]) : item[fields.label]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChartDataPoint, ChartFieldConfig, ChartLayout, ChartColors, ChartAnimation } from './types';

interface LineChartProps {
  data: ChartDataPoint[];
  fields: ChartFieldConfig;
  maxValue: number;
  layout: ChartLayout;
  colors: ChartColors;
  animation: ChartAnimation;
  height: number;
  width?: number;
  interactive: boolean;
  showDataPoints?: boolean; // New prop to control dot visibility
  formatters?: {
    value?: (value: any) => string;
    label?: (label: any) => string;
    tooltip?: (data: ChartDataPoint, field: string) => string;
    legend?: (fieldName: string) => string;
  };
  onBarClick?: (data: ChartDataPoint, field: string) => void;
  onBarHover?: (data: ChartDataPoint, field: string) => void;
}

export function LineChart({
  data,
  fields,
  maxValue,
  layout,
  colors,
  animation,
  height,
  width,
  interactive,
  showDataPoints = true, // Default to true to maintain current behavior
  formatters,
  onBarClick,
  onBarHover
}: LineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    data: ChartDataPoint;
    field: string;
    x: number;
    y: number;
    index: number;
  } | null>(null);
  
  const padding = 60;
  const chartWidth = width || 800;
  const chartHeight = height - padding * 2;
  
  // Calculate points for the line
  const getPoints = (fieldName: string) => {
    const points: string[] = [];
    const xStep = (chartWidth - padding * 2) / (data.length - 1);
    
    data.forEach((item, index) => {
      const value = item[fieldName] || 0;
      const x = padding + index * xStep;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      points.push(`${x},${y}`);
    });
    
    return points.join(' ');
  };

  // Generate area path for filled chart
  const getAreaPath = (fieldName: string) => {
    const xStep = (chartWidth - padding * 2) / (data.length - 1);
    let path = '';
    
    // Start from bottom left
    path += `M ${padding},${padding + chartHeight}`;
    
    // Draw line through all points
    data.forEach((item, index) => {
      const value = item[fieldName] || 0;
      const x = padding + index * xStep;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      
      if (index === 0) {
        path += ` L ${x},${y}`;
      } else {
        // Create smooth curves using quadratic bezier curves
        const prevX = padding + (index - 1) * xStep;
        const prevValue = data[index - 1][fieldName] || 0;
        const prevY = padding + chartHeight - (prevValue / maxValue) * chartHeight;
        
        const controlX = (prevX + x) / 2;
        path += ` Q ${controlX},${prevY} ${x},${y}`;
      }
    });
    
    // Close the area by going to bottom right and back to start
    const lastX = padding + (data.length - 1) * xStep;
    path += ` L ${lastX},${padding + chartHeight}`;
    path += ` Z`;
    
    return path;
  };

  return (
    <div className="relative">
      <svg 
        viewBox={`0 0 ${chartWidth} ${height}`}
        className={cn(
          'w-full overflow-visible',
          interactive && 'cursor-pointer'
        )}
        style={{ height: `${height}px` }}
      >
        {/* Background Grid */}
        {layout.gridLines !== 'none' && (
          <g className="opacity-20">
            {/* Horizontal Grid Lines */}
            {(layout.gridLines === 'horizontal' || layout.gridLines === 'both') && (
              <>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const y = padding + (i * chartHeight) / 5;
                  return (
                    <line
                      key={`h-grid-${i}`}
                      x1={padding}
                      y1={y}
                      x2={chartWidth - padding}
                      y2={y}
                      stroke={colors.grid || '#374151'}
                      strokeWidth={1}
                      strokeDasharray="2,2"
                    />
                  );
                })}
              </>
            )}
            
            {/* Vertical Grid Lines */}
            {(layout.gridLines === 'vertical' || layout.gridLines === 'both') && (
              <>
                {data.map((_, index) => {
                  const x = padding + index * ((chartWidth - padding * 2) / (data.length - 1));
                  return (
                    <line
                      key={`v-grid-${index}`}
                      x1={x}
                      y1={padding}
                      x2={x}
                      y2={padding + chartHeight}
                      stroke={colors.grid || '#374151'}
                      strokeWidth={1}
                      strokeDasharray="2,2"
                    />
                  );
                })}
              </>
            )}
          </g>
        )}

        {/* Render each data series */}
        {fields.values.map((fieldName, seriesIndex) => {
          const color = colors.series[seriesIndex] || colors.series[0];
          const gradientId = `gradient-${seriesIndex}`;
          
          // Extract color value for solid colors
          const getColorValue = (colorString: string) => {
            if (colorString.startsWith('#')) return colorString;
            if (colorString.includes('[') && colorString.includes(']')) {
              return colorString.split('[')[1]?.split(']')[0] || '#3AF4BD';
            }
            return colorString || '#3AF4BD';
          };
          
          const colorValue = getColorValue(color);
          
          return (
            <g key={fieldName}>
              {/* Gradient Definition */}
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colorValue} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={colorValue} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <path
                d={getAreaPath(fieldName)}
                fill={`url(#${gradientId})`}
                className={cn(
                  'transition-all duration-500',
                  animation.enabled && 'animate-in fade-in duration-1000'
                )}
                style={{
                  animationDelay: animation.stagger ? `${seriesIndex * 200}ms` : `${animation.delay || 0}ms`
                }}
              />

              {/* Line Stroke */}
              <polyline
                points={getPoints(fieldName)}
                fill="none"
                stroke={colorValue}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'transition-all duration-500',
                  animation.enabled && 'animate-in slide-in-from-left duration-1000'
                )}
                style={{
                  animationDelay: animation.stagger ? `${seriesIndex * 200 + 200}ms` : `${animation.delay || 200}ms`
                }}
              />

              {/* Data Points */}
              {showDataPoints && data.map((item, index) => {
                const value = item[fieldName] || 0;
                const xStep = (chartWidth - padding * 2) / (data.length - 1);
                const x = padding + index * xStep;
                const y = padding + chartHeight - (value / maxValue) * chartHeight;

                return (
                  <circle
                    key={`${fieldName}-point-${index}`}
                    cx={x}
                    cy={y}
                    r={4}
                    fill={colorValue}
                    stroke="white"
                    strokeWidth={2}
                    className={cn(
                      'transition-all duration-300',
                      interactive && 'hover:r-6 hover:stroke-4 cursor-pointer',
                      animation.enabled && 'animate-in fade-in duration-500'
                    )}
                    style={{
                      animationDelay: animation.stagger ? `${seriesIndex * 200 + 400 + index * 50}ms` : `${animation.delay || 400}ms`
                    }}
                    onClick={() => onBarClick?.(item, fieldName)}
                    onMouseEnter={() => onBarHover?.(item, fieldName)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Y-axis labels */}
        <g className="text-xs fill-current text-[#8C8C93]">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const value = (maxValue / 5) * (5 - i);
            const y = padding + (i * chartHeight) / 5;
            const formattedValue = formatters?.value ? formatters.value(value) : value.toLocaleString();
            
            return (
              <text
                key={`y-label-${i}`}
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-[#8C8C93]"
              >
                {formattedValue}
              </text>
            );
          })}
        </g>

        {/* X-axis labels */}
        <g className="text-xs fill-current text-[#8C8C93]">
          {data.map((item, index) => {
            const xStep = (chartWidth - padding * 2) / (data.length - 1);
            const x = padding + index * xStep;
            const label = formatters?.label ? formatters.label(item[fields.label]) : item[fields.label];
            
            return (
              <text
                key={`x-label-${index}`}
                x={x}
                y={padding + chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-[#8C8C93]"
              >
                {label}
              </text>
            );
          })}
        </g>

        {/* Invisible hover areas for each data point */}
        {interactive && data.map((item, index) => {
          const xStep = (chartWidth - padding * 2) / (data.length - 1);
          const x = padding + index * xStep;
          
          return (
            <rect
              key={`hover-area-${index}`}
              x={x - 15}
              y={padding}
              width={30}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={(e) => {
                const fieldName = fields.values[0]; // Use first field for tooltip
                const value = item[fieldName] || 0;
                const y = padding + chartHeight - (value / maxValue) * chartHeight;
                
                setHoveredPoint({
                  data: item,
                  field: fieldName,
                  x,
                  y,
                  index
                });
                onBarHover?.(item, fieldName);
              }}
              onMouseLeave={() => setHoveredPoint(null)}
              onClick={() => {
                const fieldName = fields.values[0];
                onBarClick?.(item, fieldName);
              }}
            />
          );
        })}

        {/* Hover indicator dot */}
        {hoveredPoint && (
          <circle
            cx={hoveredPoint.x}
            cy={hoveredPoint.y}
            r={6}
            fill={colors.series?.[0] || '#3AF4BD'}
            stroke="white"
            strokeWidth={3}
            className="transition-all duration-200 animate-pulse"
          />
        )}
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute bg-[#2C2C2E] border border-[#404045] rounded-lg px-3 py-2 shadow-lg z-50 pointer-events-none"
          style={{
            left: `${Math.max(80, Math.min(hoveredPoint.x, chartWidth - 80))}px`,
            top: `${Math.max(10, hoveredPoint.y - 60)}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-xs text-[#8C8C93] mb-1">
            {formatters?.label ? formatters.label(hoveredPoint.data[fields.label]) : hoveredPoint.data[fields.label]}
          </div>
          <div className="text-sm font-semibold text-[#DEDEE3]">
            {formatters?.tooltip 
              ? formatters.tooltip(hoveredPoint.data, hoveredPoint.field)
              : formatters?.value 
                ? formatters.value(hoveredPoint.data[hoveredPoint.field])
                : hoveredPoint.data[hoveredPoint.field]?.toLocaleString()}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#2C2C2E]"></div>
        </div>
      )}
    </div>
  );
}

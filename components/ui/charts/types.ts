import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

// Base chart data structure - completely generic
export interface ChartDataPoint {
  [key: string]: any; // Allow any field names
}

// Chart configuration for field mapping
export interface ChartFieldConfig {
  label: string; // Field name for labels (e.g., 'month', 'category', 'name')
  values: string[]; // Array of field names for data series (e.g., ['deposits', 'withdrawals', 'fees'])
  tooltip?: {
    format?: (value: any) => string;
    prefix?: string;
    suffix?: string;
  };
}

// Chart type definitions
export type ChartType = 
  | 'bar' 
  | 'column' 
  | 'stacked-bar' 
  | 'grouped-bar' 
  | 'line' 
  | 'area' 
  | 'pie' 
  | 'donut';

// Layout and design options
export interface ChartLayout {
  orientation?: 'horizontal' | 'vertical';
  barStyle?: 'rounded' | 'square' | 'pill';
  spacing?: 'tight' | 'normal' | 'wide';
  gridLines?: 'none' | 'horizontal' | 'vertical' | 'both';
  legend?: {
    position: 'top' | 'bottom' | 'left' | 'right' | 'none';
    style: 'dots' | 'squares' | 'lines';
  };
}

// Color scheme configuration
export interface ChartColors {
  series: string[]; // Array of colors for each data series
  grid?: string;
  text?: {
    primary: string;
    secondary: string;
    muted: string;
  };
  background?: string;
}

// Animation settings
export interface ChartAnimation {
  enabled: boolean;
  duration?: number;
  delay?: number;
  easing?: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  stagger?: boolean; // This is what I am using to animate bars one by one
}

// Main chart props
export interface ChartProps {
  // Data and configuration
  data: ChartDataPoint[];
  fields: ChartFieldConfig;
  
  // Chart type and layout
  type: ChartType;
  layout?: ChartLayout;
  
  // Styling
  colors?: ChartColors;
  className?: string;
  height?: number;
  width?: number;
  
  // Features
  animation?: ChartAnimation;
  interactive?: boolean;
  responsive?: boolean;
  showDataPoints?: boolean; // Control visibility of dots on line/area charts
  
  // Header
  title?: string;
  subtitle?: string;
  header?: {
    actions?: ReactNode;
    customContent?: ReactNode;
  };
  
  // Customization
  formatters?: {
    value?: (value: any) => string;
    label?: (label: any) => string;
    tooltip?: (data: ChartDataPoint, field: string) => string;
    legend?: (fieldName: string) => string;
  };
  
  // Events
  onBarClick?: (data: ChartDataPoint, field: string) => void;
  onBarHover?: (data: ChartDataPoint, field: string) => void;
}

// Default configurations
export const defaultChartColors: ChartColors = {
  series: [
    'from-[#4F9CF9] to-[#1E73BE]',
    'from-[#8BC5FF] to-[#4F9CF9]',
    'from-[#A8E6CF] to-[#56C596]',
    'from-[#FFB347] to-[#FF8C00]',
    'from-[#DDA0DD] to-[#9370DB]',
    'from-[#F0E68C] to-[#DAA520]'
  ],
  grid: '#313135',
  text: {
    primary: '#DEDEE3',
    secondary: '#8C8C93',
    muted: '#6B6B6F'
  },
  background: '#1C1C1E'
};

export const defaultChartLayout: ChartLayout = {
  orientation: 'vertical',
  barStyle: 'rounded',
  spacing: 'normal',
  gridLines: 'horizontal',
  legend: {
    position: 'bottom',
    style: 'dots'
  }
};

export const defaultChartAnimation: ChartAnimation = {
  enabled: true,
  duration: 700,
  delay: 100,
  easing: 'ease-out',
  stagger: true
};

// Utility functions for chart calculations
export const chartUtils = {
  // Get max value from data
  getMaxValue: (data: ChartDataPoint[], fields: ChartFieldConfig): number => {
    const values = data.flatMap(item => 
      fields.values.map(fieldName => item[fieldName] || 0)
    );
    return Math.max(...values) * 1.1; // Add 10% padding
  },

  // Format value with default formatting
  formatValue: (value: any, formatter?: (value: any) => string): string => {
    if (formatter) return formatter(value);
    
    if (typeof value === 'number') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString();
    }
    
    return String(value);
  },

  // Calculate bar height percentage
  getBarHeight: (value: number, maxValue: number): number => {
    return Math.max((value / maxValue) * 100, 1); // Minimum 1% for visibility
  },

  // Generate grid lines
  generateGridLines: (count: number = 5): number[] => {
    return Array.from({ length: count + 1 }, (_, i) => i);
  },

  // Get color string (handle gradients)
  getColorClass: (color: string | string[]): string => {
    if (Array.isArray(color)) {
      return `bg-gradient-to-t from-[${color[0]}] to-[${color[1]}]`;
    }
    if (color.includes('from-') || color.includes('to-')) {
      return `bg-gradient-to-t ${color}`;
    }
    return `bg-[${color}]`;
  }
};

// Chart component registry for different types
export const chartComponents = {
  bar: 'BarChart',
  column: 'ColumnChart', 
  'stacked-bar': 'StackedBarChart',
  'grouped-bar': 'GroupedBarChart',
  line: 'LineChart',
  area: 'AreaChart',
  pie: 'PieChart',
  donut: 'DonutChart'
} as const;

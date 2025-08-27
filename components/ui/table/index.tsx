'use client';

import React from 'react';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => any);
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  variant?: 'default' | 'dark';
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

export function DataTable<T = any>({
  data,
  columns,
  title,
  icon,
  className = '',
  showHeader = true,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  variant = 'dark',
  striped = false,
  bordered = true,
  compact = false
}: TableProps<T>) {
  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (column.render) {
      const value = column.accessor 
        ? typeof column.accessor === 'function' 
          ? column.accessor(row)
          : row[column.accessor]
        : (row as any)[column.key];
      return column.render(value, row, data.indexOf(row));
    }
    
    if (column.accessor) {
      return typeof column.accessor === 'function' 
        ? column.accessor(row)
        : row[column.accessor];
    }
    
    return (row as any)[column.key];
  };

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const baseClasses = variant === 'dark' 
    ? 'bg-[#1C1C1E] border-[#313135BA] text-[#DEDEE3]'
    : 'bg-white border-gray-200 text-gray-900';

  const headerClasses = variant === 'dark'
    ? 'bg-[#2C2C2E] text-[#8C8C93] border-[#313135BA]'
    : 'bg-gray-50 text-gray-600 border-gray-200';

  const rowClasses = variant === 'dark'
    ? 'hover:bg-[#2C2C2E] border-[#313135BA]'
    : 'hover:bg-gray-50 border-gray-200';

  if (loading) {
    return (
      <div className={`rounded-xl ${bordered ? 'border-2' : ''} ${baseClasses} ${className}`}>
        {title && showHeader && (
          <div className="p-4 sm:p-6 border-b border-[#313135BA]">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                  {icon}
                </div>
              )}
              <h2 className="text-lg font-medium">{title}</h2>
            </div>
          </div>
        )}
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#65A3FF] mx-auto"></div>
          <p className="mt-4 text-[#8C8C93]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl ${bordered ? 'border-2' : ''} ${baseClasses} ${className}`}>
      {/* Header Section */}
      {title && showHeader && (
        <div className="p-4 sm:p-6 border-b border-[#313135BA]">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                {icon}
              </div>
            )}
            <h2 className="text-lg font-medium text-[#CBCBD8]">{title}</h2>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className={headerClasses}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`header-${column.key}-${index}`}
                  className={`
                    px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-wider
                    ${getAlignmentClass(column.align)}
                    ${column.className || ''}
                  `}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#313135BA]">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-8 text-center text-[#8C8C93]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={`
                    ${rowClasses}
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${striped && rowIndex % 2 === 1 ? (variant === 'dark' ? 'bg-[#252527]' : 'bg-gray-25') : ''}
                    transition-colors duration-200
                  `}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`cell-${rowIndex}-${column.key}-${colIndex}`}
                      className={`
                        px-4 sm:px-6 py-3 sm:py-4 text-sm
                        ${getAlignmentClass(column.align)}
                        ${column.className || ''}
                        ${compact ? 'py-2' : ''}
                      `}
                      style={{ width: column.width }}
                    >
                      {getCellValue(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status Badge Component for common use
export interface StatusBadgeProps {
  status: 'successful' | 'pending' | 'failed' | string;
  variant?: 'dot' | 'pill';
  className?: string;
}

export function StatusBadge({ status, variant = 'dot', className = '' }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const lowercaseStatus = status.toLowerCase();
    switch (lowercaseStatus) {
      case 'successful':
      case 'success':
      case 'completed':
        return {
          color: '#00D4AA',
          bg: 'rgba(0, 212, 170, 0.1)',
          dot: '#00D4AA'
        };
      case 'pending':
      case 'processing':
        return {
          color: '#F59E0B',
          bg: 'rgba(245, 158, 11, 0.1)',
          dot: '#F59E0B'
        };
      case 'failed':
      case 'error':
      case 'cancelled':
        return {
          color: '#EF4444',
          bg: 'rgba(239, 68, 68, 0.1)',
          dot: '#EF4444'
        };
      default:
        return {
          color: '#8C8C93',
          bg: 'rgba(140, 140, 147, 0.1)',
          dot: '#8C8C93'
        };
    }
  };

  const styles = getStatusStyles(status);

  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
        style={{
          color: styles.color,
          backgroundColor: styles.bg
        }}
      >
        {status}
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: styles.dot }}
      />
      <span style={{ color: styles.color }} className="text-sm font-medium">
        {status}
      </span>
    </div>
  );
}

// Currency Component for amount formatting
export interface CurrencyProps {
  amount: number;
  currency?: string;
  locale?: string;
  className?: string;
}

export function Currency({ amount, currency = 'NGN', locale = 'en-NG', className = '' }: CurrencyProps) {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={`font-medium ${className}`}>
      {formatted}
    </span>
  );
}

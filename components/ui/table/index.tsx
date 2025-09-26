'use client';

import React, { useState } from 'react';
import { formatDateTime, formatDate, formatCurrency } from '@/lib/utils';
import { ApiPaginationInfo } from '@/lib/types';

export type ColumnType = 
  | 'text' 
  | 'datetime' 
  | 'date' 
  | 'currency' 
  | 'status' 
  | 'email' 
  | 'phone' 
  | 'number'
  | 'custom';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => any);
  render?: (value: any, row: T, index: number) => React.ReactNode;
  type?: ColumnType;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  copyable?: boolean;
  truncate?: number; // Max characters before truncation
  currency?: string; // Currency code for currency type
  locale?: string; // Locale for formatting
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
  // Pagination props
  pagination?: ApiPaginationInfo;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
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
  compact = false,
  pagination,
  onPageChange,
  showPagination = true
}: TableProps<T>) {
  const [copiedCell, setCopiedCell] = useState<string | null>(null);

  const copyToClipboard = async (text: string, cellId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCell(cellId);
      setTimeout(() => setCopiedCell(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getRawCellValue = (row: T, column: TableColumn<T>) => {
    if (column.accessor) {
      return typeof column.accessor === 'function' 
        ? column.accessor(row)
        : row[column.accessor];
    }
    return (row as any)[column.key];
  };

  const formatCellValue = (value: any, column: TableColumn<T>, row: T) => {
    if (value === null || value === undefined) return 'N/A';

    switch (column.type) {
      case 'datetime':
        return formatDateTime(value);
      
      case 'date':
        return formatDate(value);
      
      case 'currency':
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        return formatCurrency(numValue, column.currency || 'NGN', column.locale || 'en-US');
      
      case 'status':
        return <StatusBadge status={value} variant="dot" />;
      
      case 'email':
        return (
          <a 
            href={`mailto:${value}`} 
            className="text-blue-400 hover:text-blue-300 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {column.truncate ? truncateText(value, column.truncate) : value}
          </a>
        );
      
      case 'phone':
        return (
          <a 
            href={`tel:${value}`} 
            className="text-blue-400 hover:text-blue-300 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        );
      
      case 'number':
        const numVal = typeof value === 'string' ? parseFloat(value) : value;
        return numVal.toLocaleString(column.locale || 'en-US');
      
      case 'text':
      default:
        return column.truncate ? truncateText(String(value), column.truncate) : String(value);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (column.render) {
      const value = getRawCellValue(row, column);
      return column.render(value, row, data.indexOf(row));
    }
    
    const rawValue = getRawCellValue(row, column);
    return formatCellValue(rawValue, column, row);
  };

  const handleCellClick = (row: T, column: TableColumn<T>, rowIndex: number, colIndex: number) => {
    if (column.copyable) {
      const rawValue = getRawCellValue(row, column);
      const cellId = `cell-${rowIndex}-${colIndex}`;
      copyToClipboard(String(rawValue), cellId);
    }
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#01AB79] mx-auto"></div>
          <p className="mt-4 text-[#8C8C93]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bordered ? 'border-2' : ''} ${baseClasses} ${className}`}>
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
          {showHeader && (
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
          )}

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
                    ${rowClasses} group
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${striped && rowIndex % 2 === 1 ? (variant === 'dark' ? 'bg-[#252527]' : 'bg-gray-25') : ''}
                    transition-colors duration-200
                  `}
                  onClick={(e) => {
                    // Only trigger row click if we didn't click on a copyable cell
                    const target = e.target as HTMLElement;
                    const isClickableCell = target.closest('td')?.classList.contains('cursor-copy');
                    if (!isClickableCell) {
                      onRowClick?.(row, rowIndex);
                    }
                  }}
                >
                  {columns.map((column, colIndex) => {
                    const cellId = `cell-${rowIndex}-${colIndex}`;
                    const isCopied = copiedCell === cellId;
                    
                    return (
                      <td
                        key={`cell-${rowIndex}-${column.key}-${colIndex}`}
                        className={`
                          px-4 sm:px-6 py-3 sm:py-4 text-sm relative
                          ${getAlignmentClass(column.align)}
                          ${column.className || ''}
                          ${compact ? 'py-2' : ''}
                          ${column.copyable ? 'cursor-copy hover:bg-opacity-50 hover:bg-gray-500 transition-colors' : ''}
                          ${isCopied ? 'bg-[#01AB79]/50 bg-opacity-20' : ''}
                        `}
                        style={{ width: column.width }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCellClick(row, column, rowIndex, colIndex);
                        }}
                        title={
                          column.copyable 
                            ? 'Click to copy' 
                            : (column.truncate && String(getRawCellValue(row, column)).length > column.truncate)
                              ? String(getRawCellValue(row, column))
                              : undefined
                        }
                      >
                        <div className="flex items-center gap-2">
                          {getCellValue(row, column)}
                          {column.copyable && (
                            <div className="flex items-center">
                              {isCopied ? (
                                <svg className="w-4 h-4 text-green-400 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-75 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Built-in Pagination */}
      {showPagination && pagination && pagination.totalPages > 1 && (
        <div className="border-t border-[#313135BA]">
          <TablePagination
            pagination={pagination}
            onPageChange={onPageChange}
            loading={loading}
            variant={variant}
          />
        </div>
      )}
    </div>
  );
}

// Table Pagination Component
interface TablePaginationProps {
  pagination: ApiPaginationInfo;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  variant?: 'default' | 'dark';
}

function TablePagination({ 
  pagination, 
  onPageChange, 
  loading = false, 
  variant = 'dark' 
}: TablePaginationProps) {
  const { currentPage, totalPages, totalItems, limit } = pagination;

  // Calculate page range to show with improved logic
  const getPageRange = () => {
    const delta = 1; // Show fewer pages for cleaner look
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    if (totalPages > 0) {
      rangeWithDots.push(1);
    }

    // Add ellipsis and middle pages
    if (currentPage > delta + 2) {
      rangeWithDots.push('...');
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }

    rangeWithDots.push(...range);

    // Add ellipsis and last page
    if (currentPage < totalPages - delta - 1) {
      rangeWithDots.push('...');
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates
    return rangeWithDots.filter((item, index, arr) => 
      index === 0 || item !== arr[index - 1]
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !loading && onPageChange) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  const textColor = variant === 'dark' ? 'text-[#8C8C93]' : 'text-gray-600';
  const highlightColor = variant === 'dark' ? 'text-[#DEDEE3]' : 'text-gray-900';
  const buttonBg = variant === 'dark' ? 'bg-[#303033] hover:bg-[#404043]' : 'bg-gray-100 hover:bg-gray-200';
  const activeBg = variant === 'dark' ? 'bg-[#01AB79] hover:bg-[#5C96E8]' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#1C1C1E] border-t border-[#313135BA]">
      {/* Results info */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-[#8C8C93]">
          Showing <span className="font-semibold text-[#DEDEE3]">{startItem}</span>-<span className="font-semibold text-[#DEDEE3]">{endItem}</span> of{' '}
          <span className="font-semibold text-[#DEDEE3]">{totalItems.toLocaleString()}</span> results
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#DEDEE3] bg-[#2C2C2E] hover:bg-[#36363A] border border-[#404043] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2C2C2E]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageRange().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="flex items-center justify-center w-10 h-10 text-[#8C8C93] text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="19" cy="12" r="2"/>
                  </svg>
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  disabled={loading}
                  className={`
                    flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-lg transition-all duration-200
                    ${currentPage === page
                      ? 'bg-[#01AB79] text-white shadow-lg shadow-[#01AB79]/25 transform scale-105'
                      : 'bg-[#2C2C2E] text-[#DEDEE3] hover:bg-[#36363A] border border-[#404043] hover:border-[#01AB79]/50'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#DEDEE3] bg-[#2C2C2E] hover:bg-[#36363A] border border-[#404043] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2C2C2E]"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile-only page info */}
      <div className="sm:hidden text-xs text-[#8C8C93] text-center">
        Page <span className="font-semibold text-[#DEDEE3]">{currentPage}</span> of{' '}
        <span className="font-semibold text-[#DEDEE3]">{totalPages}</span>
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
      case 'deposit':
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
      case 'withdrawal':
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

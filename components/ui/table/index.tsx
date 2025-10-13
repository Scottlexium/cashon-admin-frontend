'use client';

import React, { useState } from 'react';
import { formatDateTime, formatDate, formatCurrency } from '@/lib/utils';
import { ApiPaginationInfo } from '@/lib/types';
import { Button } from '../button/button';
import { Select } from '@/components/ui/select/select';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  onPageSizeChange?: (pageSize: number) => void;
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
  onPageSizeChange,
  showPagination = true
}: TableProps<T>) {
  const [copiedCell, setCopiedCell] = useState<string | null>(null);
  console.log(
    'DataTable Render:', { dataLength: data.length, loading, pagination }
  )
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#65A3FF] mx-auto"></div>
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
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="w-full min-w-max">
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
                      whitespace-nowrap
                    `}
                    style={{
                      width: column.width,
                      minWidth: column.width || '120px'
                    }}
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
                          ${isCopied ? 'bg-green-500 bg-opacity-20' : ''}
                          whitespace-nowrap
                        `}
                        style={{
                          width: column.width,
                          minWidth: column.width || '120px'
                        }}
                        onClick={(e) => {
                          // Only stop propagation for copyable cells
                          if (column.copyable) {
                            e.stopPropagation();
                            handleCellClick(row, column, rowIndex, colIndex);
                          }
                          // For non-copyable cells, let the event bubble up to trigger row click
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
      {showPagination && pagination && pagination.total_pages > 1 && (
        <div className="border-t border-[#313135BA]">
          <TablePagination
            pagination={pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
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
  onPageSizeChange?: (pageSize: number) => void;
  loading?: boolean;
  variant?: 'default' | 'dark';
  showPageSizeSelect?: boolean;
  pageSizeOptions?: number[];
}

function TablePagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false,
  variant = 'dark',
  showPageSizeSelect = true,
  pageSizeOptions = [10, 20, 50, 100]
}: TablePaginationProps) {
  const { current_page, total_pages, total_items, per_page } = pagination;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total_pages && !loading && onPageChange) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (newPageSize: string | string[] | null) => {
    if (typeof newPageSize === 'string' && onPageSizeChange && !loading) {
      onPageSizeChange(parseInt(newPageSize));
    }
  };

  // Generate smart page numbers (show first few, last few, and current vicinity)
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum page buttons to show (excluding ellipsis)
    
    if (total_pages <= maxVisible + 2) {
      // Show all pages if total is small (7 or fewer)
      return Array.from({ length: total_pages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // If current page is close to start (pages 1-4)
    if (current_page <= 3) {
      // Show: 1, 2, 3, 4, ..., last
      for (let i = 2; i <= Math.min(4, total_pages - 1); i++) {
        pages.push(i);
      }
      if (total_pages > 4) {
        pages.push('...');
        pages.push(total_pages);
      }
    }
    // If current page is close to end
    else if (current_page >= total_pages - 2) {
      // Show: 1, ..., last-3, last-2, last-1, last
      pages.push('...');
      for (let i = Math.max(2, total_pages - 3); i <= total_pages; i++) {
        if (i !== 1) pages.push(i);
      }
    }
    // Current page is in the middle
    else {
      // Show: 1, ..., current-1, current, current+1, ..., last
      pages.push('...');
      pages.push(current_page - 1);
      pages.push(current_page);
      pages.push(current_page + 1);
      pages.push('...');
      pages.push(total_pages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (current_page - 1) * per_page + 1;
  const endItem = Math.min(current_page * per_page, total_items);

  const pageSizeSelectOptions = pageSizeOptions.map(size => ({
    value: size.toString(),
    label: size.toString()
  }));

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 py-4 bg-[#1C1C1E] border-t border-[#313135BA]">
      {/* Mobile layout */}
      <div className="flex sm:hidden flex-col gap-3">
        {/* Results info */}
        <div className="text-center text-sm text-[#8C8C93]">
          <span className="font-semibold text-[#DEDEE3]">{startItem}-{endItem}</span> of{' '}
          <span className="font-semibold text-[#DEDEE3]">{total_items}</span>
        </div>
        
        {/* Page size selector */}
        {showPageSizeSelect && (
          <div className="flex items-center justify-center gap-2 text-sm text-[#8C8C93]">
            <span>Show</span>
            <div className="w-16">
              <Select
                options={pageSizeSelectOptions}
                value={per_page.toString()}
                onChange={handlePageSizeChange}
                placeholder="10"
                className="text-sm bg-[#303033] border-[#363639] text-[#DEDEE3]"
                disabled={loading}
              />
            </div>
            <span>per page</span>
          </div>
        )}

        {/* Mobile pagination controls */}
        <div className="flex items-center justify-between">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page <= 1 || loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#303033] hover:bg-[#404043] disabled:opacity-50 disabled:cursor-not-allowed text-[#DEDEE3] border border-[#363639] transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Previous</span>
          </button>

          {/* Page info */}
          <div className="text-sm text-[#DEDEE3] font-medium">
            {current_page} of {total_pages}
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={current_page >= total_pages || loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#303033] hover:bg-[#404043] disabled:opacity-50 disabled:cursor-not-allowed text-[#DEDEE3] border border-[#363639] transition-all duration-200"
          >
            <span className="text-sm">Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Left side - Results info and page size */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 text-sm text-[#8C8C93]">
          <span>
            Showing <span className="font-semibold text-[#DEDEE3]">{startItem}</span> to{' '}
            <span className="font-semibold text-[#DEDEE3]">{endItem}</span> of{' '}
            <span className="font-semibold text-[#DEDEE3]">{total_items}</span> results
          </span>
          
          {showPageSizeSelect && (
            <div className="flex items-center gap-2">
              <span>Show</span>
              <div className="w-20">
                <Select
                  options={pageSizeSelectOptions}
                  value={per_page.toString()}
                  onChange={handlePageSizeChange}
                  placeholder="10"
                  className="text-sm bg-[#303033] border-[#363639] text-[#DEDEE3]"
                  disabled={loading}
                />
              </div>
              <span>per page</span>
            </div>
          )}
        </div>

        {/* Right side - Desktop pagination controls */}
        <div className="flex items-center gap-2">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page <= 1 || loading}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#303033] hover:bg-[#404043] disabled:opacity-50 disabled:cursor-not-allowed text-[#DEDEE3] border border-[#363639] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Smart page buttons */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span className="flex items-center justify-center min-w-10 h-10 px-2 text-[#8C8C93]">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    disabled={loading}
                    className={`flex items-center justify-center min-w-10 h-10 px-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      page === current_page
                        ? loading
                          ? 'bg-[#00FFB3] text-black border-[#00FFB3]'
                          : 'bg-[#00FFB3] text-black border-[#00FFB3] shadow-lg transform scale-105'
                        : 'bg-[#303033] text-[#DEDEE3] border-[#363639] hover:bg-[#404043] hover:text-white hover:border-[#404043]'
                    } disabled:cursor-not-allowed`}
                  >
                    {loading && page === current_page ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      page
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={current_page >= total_pages || loading}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#303033] hover:bg-[#404043] disabled:opacity-50 disabled:cursor-not-allowed text-[#DEDEE3] border border-[#363639] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
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

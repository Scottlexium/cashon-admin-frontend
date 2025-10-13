'use client';

import React from 'react';
import { Button } from '../button/button';
import { ApiPaginationInfo } from '@/lib/types';

export interface PaginationProps {
  pagination: ApiPaginationInfo;
  onPageChange: (page: number) => void;
  loading?: boolean;
  className?: string;
}

export function Pagination({ 
  pagination, 
  onPageChange, 
  loading = false, 
  className = '' 
}: PaginationProps) {
  const { currentPage, totalPages, totalItems, limit } = pagination;

  // Calculate page range to show
  const getPageRange = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !loading) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className={`flex items-center justify-between px-4 py-3 sm:px-6 ${className}`}>
      {/* Mobile pagination info */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="filled"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="bg-[#303033] disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="text-sm text-[#8C8C93] flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="filled"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="bg-[#303033] disabled:opacity-50"
        >
          Next
        </Button>
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[#8C8C93]">
            Showing <span className="font-medium text-[#DEDEE3]">{startItem}</span> to{' '}
            <span className="font-medium text-[#DEDEE3]">{endItem}</span> of{' '}
            <span className="font-medium text-[#DEDEE3]">{totalItems}</span> results
          </p>
        </div>
        
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous button */}
            <Button
              variant="filled"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 bg-[#303033] hover:bg-[#404043] disabled:opacity-50 border-r border-[#404043]"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </Button>

            {/* Page numbers */}
            {getPageRange().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#8C8C93] bg-[#303033] border-r border-[#404043]">
                    ...
                  </span>
                ) : (
                  <Button
                    variant="filled"
                    size="sm"
                    onClick={() => handlePageChange(page as number)}
                    disabled={loading}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold border-r border-[#404043] ${
                      currentPage === page
                        ? 'bg-[#65A3FF] text-white hover:bg-[#5C96E8]'
                        : 'bg-[#303033] text-[#DEDEE3] hover:bg-[#404043]'
                    }`}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}

            {/* Next button */}
            <Button
              variant="filled"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 bg-[#303033] hover:bg-[#404043] disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

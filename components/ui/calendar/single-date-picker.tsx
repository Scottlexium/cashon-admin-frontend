'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button/button';
import { useDropdownPosition } from '@/lib/hooks/useDropdownPosition';

interface SingleDatePickerProps {
  value?: Date;
  onChange?: (value: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  minDate?: Date;
  maxDate?: Date;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function SingleDatePicker({ 
  value, 
  onChange, 
  placeholder = 'Select date...', 
  disabled = false,
  className,
  size = 'md',
  minDate,
  maxDate
}: SingleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use the dropdown positioning hook
  const { position: dropdownPosition } = useDropdownPosition({
    isOpen,
    triggerRef: triggerRef as React.RefObject<HTMLElement>,
    dropdownHeight: 400,
    minSpaceRequired: 200
  });

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const formatDisplayValue = () => {
    if (!value) return placeholder;
    return value.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateClick = (date: Date) => {
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    
    onChange?.(date);
    closeDropdown();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    return date.toDateString() === value.toDateString();
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: Date[] = [];
    
    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    // Add next month's leading days
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      days.push(new Date(year, month + 1, day));
    }
    
    return days;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        ref={triggerRef}
        onClick={toggleDropdown}
        disabled={disabled}
        variant="ghost"
        size={size}
        className={cn(
          'w-full justify-between bg-[#2A2C2E] border border-[#3A3C3E] text-[#DEDEE3]',
          'hover:bg-[#313135] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-[#00FFB3]',
          'px-3 py-2.5 rounded-md font-normal',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-left flex-1">{formatDisplayValue()}</span>
        </div>
        <svg 
          className={cn(
            'w-4 h-4 text-[#8C8C93] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </Button>

      {/* Mobile Bottom Sheet / Desktop Dropdown */}
      {isOpen && (
        <>
          {isMobile ? (
            <>
              {/* Mobile Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeDropdown}
              />
              
              {/* Mobile Bottom Sheet */}
              <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C1C1E] rounded-t-xl border-t border-[#313135BA] animate-in slide-in-from-bottom duration-300">
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-8 h-1 bg-[#8C8C93]/50 rounded-full" />
                </div>
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#313135BA]">
                  <button
                    onClick={closeDropdown}
                    className="text-[#8C8C93] text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <h3 className="text-lg font-medium text-[#DEDEE3]">Select Date</h3>
                  <button
                    onClick={() => {
                      if (value) {
                        onChange?.(value);
                      }
                      closeDropdown();
                    }}
                    className="text-[#00FFB3] text-sm font-medium"
                    disabled={!value}
                  >
                    Done
                  </button>
                </div>

                {/* Mobile Calendar */}
                <div className="p-4 pb-8">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                      className="p-3 hover:bg-[#313135BA] text-[#DEDEE3]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="15,18 9,12 15,6" />
                      </svg>
                    </Button>
                    
                    <h3 className="text-lg font-semibold text-[#DEDEE3]">
                      {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                      className="p-3 hover:bg-[#313135BA] text-[#DEDEE3]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="9,18 15,12 9,6" />
                      </svg>
                    </Button>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {DAYS.map(day => (
                      <div key={day} className="text-sm font-medium text-[#8C8C93] text-center py-3">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((date, index) => {
                      const isCurrentMonthDay = isCurrentMonth(date);
                      const isSelectedDate = isSelected(date);
                      const isTodayDate = isToday(date);
                      const isDisabled = isDateDisabled(date);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleDateClick(date)}
                          disabled={isDisabled}
                          className={cn(
                            'w-12 h-12 text-sm rounded-xl transition-all duration-200 flex items-center justify-center font-medium',
                            isCurrentMonthDay 
                              ? 'text-[#DEDEE3] hover:bg-[#313135BA]' 
                              : 'text-[#8C8C93]/50',
                            isSelectedDate && 'bg-[#00FFB3] text-black font-semibold hover:bg-[#00FFB3]',
                            isTodayDate && !isSelectedDate && 'bg-[#313135BA] text-[#00FFB3] font-semibold',
                            isDisabled && 'opacity-30 cursor-not-allowed'
                          )}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Desktop Dropdown */
            <div 
              className={cn(
                'absolute left-0 mt-1 bg-[#1C1C1E] border border-[#313135BA] rounded-lg shadow-lg z-50 p-4 w-80',
                dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full'
              )}
            >
              {/* Desktop Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-[#313135BA] text-[#DEDEE3]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </Button>
                
                <h3 className="text-sm font-medium text-[#DEDEE3]">
                  {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-[#313135BA] text-[#DEDEE3]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </Button>
              </div>

              {/* Desktop Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map(day => (
                  <div key={day} className="text-xs font-medium text-[#8C8C93] text-center py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Desktop Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((date, index) => {
                  const isCurrentMonthDay = isCurrentMonth(date);
                  const isSelectedDate = isSelected(date);
                  const isTodayDate = isToday(date);
                  const isDisabled = isDateDisabled(date);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      disabled={isDisabled}
                      className={cn(
                        'w-8 h-8 text-xs rounded-md transition-all duration-200 flex items-center justify-center',
                        isCurrentMonthDay 
                          ? 'text-[#DEDEE3] hover:bg-[#313135BA]' 
                          : 'text-[#8C8C93]/50',
                        isSelectedDate && 'bg-[#00FFB3] text-black font-medium hover:bg-[#00FFB3]',
                        isTodayDate && !isSelectedDate && 'bg-[#313135BA] text-[#00FFB3]',
                        isDisabled && 'opacity-30 cursor-not-allowed'
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SingleDatePicker;

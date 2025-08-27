'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type DateRange = {
  from: Date;
  to: Date;
};

export type RelativeRange = {
  label: string;
  value: string;
};

export type DatePickerValue = DateRange | RelativeRange;

interface DatePickerProps {
  value?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const RELATIVE_RANGES: RelativeRange[] = [
  { label: 'Last 7 days', value: 'last-7-days' },
  { label: 'Last 30 days', value: 'last-30-days' },
  { label: 'Last 90 days', value: 'last-90-days' },
  { label: 'Last 6 months', value: 'last-6-months' },
  { label: 'Last year', value: 'last-year' },
  { label: 'This month', value: 'this-month' },
  { label: 'Last month', value: 'last-month' },
  { label: 'This quarter', value: 'this-quarter' },
  { label: 'Last quarter', value: 'last-quarter' },
  { label: 'Year to date', value: 'year-to-date' },
];

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = 'Select date range...', 
  disabled = false,
  className 
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [activeTab, setActiveTab] = useState<'relative' | 'absolute'>('relative');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('left');
  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced open/close animation handling
  const openDropdown = () => {
    setShouldRender(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 10);
  };

  const closeDropdown = () => {
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => {
      setShouldRender(false);
      setIsAnimating(false);
    }, 300);
  };

  const toggleDropdown = () => {
    if (disabled) return;
    if (isOpen || shouldRender) {
      closeDropdown();
    } else {
      openDropdown();
    }
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

  // Position dropdown
  useEffect(() => {
    if (isOpen && triggerRef.current && !isMobile) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 400;
      
      if (rect.right + dropdownWidth > viewportWidth) {
        setDropdownPosition('right');
      } else {
        setDropdownPosition('left');
      }
    }
  }, [isOpen, isMobile]);

  // Initialize selected dates from value
  useEffect(() => {
    if (value && 'from' in value) {
      setSelectedFromDate(value.from);
      setSelectedToDate(value.to);
    } else {
      setSelectedFromDate(null);
      setSelectedToDate(null);
    }
  }, [value]);

  const formatDisplayValue = () => {
    if (!value) return placeholder;
    
    if ('value' in value) {
      return RELATIVE_RANGES.find(r => r.value === value.value)?.label || placeholder;
    }
    
    if ('from' in value && 'to' in value) {
      return `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`;
    }
    
    return placeholder;
  };

  const handleRelativeRangeSelect = (range: RelativeRange) => {
    onChange?.(range);
    closeDropdown();
  };

  const handleAbsoluteDateSelect = () => {
    if (selectedFromDate && selectedToDate) {
      onChange?.({ from: selectedFromDate, to: selectedToDate });
      closeDropdown();
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateClick = (date: Date) => {
    if (!selectedFromDate || (selectedFromDate && selectedToDate)) {
      setSelectedFromDate(date);
      setSelectedToDate(null);
    } else if (selectedFromDate && !selectedToDate) {
      if (date < selectedFromDate) {
        setSelectedFromDate(date);
        setSelectedToDate(selectedFromDate);
      } else {
        setSelectedToDate(date);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedFromDate || !selectedToDate) return false;
    return date >= selectedFromDate && date <= selectedToDate;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedFromDate) return false;
    if (selectedToDate) {
      return date.getTime() === selectedFromDate.getTime() || 
             date.getTime() === selectedToDate.getTime();
    }
    return date.getTime() === selectedFromDate.getTime();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2"></div>
      );
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isDateSelected(date);
      const isInRange = isDateInRange(date);
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={cn(
            'p-2 text-sm rounded-lg transition-all duration-300 ease-out hover:bg-[#2C2C2E] hover:scale-110 active:scale-95',
            'transform-gpu will-change-transform',
            isSelected && 'bg-[#00FFB3] text-black font-medium hover:bg-[#00E5A3] shadow-lg scale-105',
            isInRange && !isSelected && 'bg-[#00FFB3]/20 text-[#00FFB3] scale-102',
            isToday && !isSelected && !isInRange && 'bg-[#313135] text-[#DEDEE3] ring-1 ring-[#00FFB3]/30',
            !isSelected && !isInRange && !isToday && 'text-[#8C8C93] hover:text-[#DEDEE3]'
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        disabled={disabled}
        className={cn(
          'flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg border transition-all duration-300 ease-out min-w-0',
          'bg-[#1C1C1E] border-[#313135] text-[#8C8C93] hover:border-[#00FFB3] hover:text-[#DEDEE3] hover:scale-105 active:scale-95',
          'transform-gpu will-change-transform',
          disabled && 'opacity-50 cursor-not-allowed',
          (isOpen || shouldRender) && 'border-[#00FFB3] text-[#DEDEE3] scale-105 shadow-lg shadow-[#00FFB3]/20'
        )}
      >
        <span className="truncate min-w-0">{formatDisplayValue()}</span>
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          className={cn(
            'transition-all duration-300 flex-shrink-0 transform-gpu',
            (isOpen || shouldRender) && 'rotate-180 text-[#00FFB3]'
          )}
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {/* Dropdown / Bottom Sheet */}
      {shouldRender && (
        <>
          {/* Mobile Bottom Sheet */}
          {isMobile ? (
            <>
              {/* Backdrop */}
              <div 
                className={cn(
                  'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
                  isOpen ? 'opacity-100' : 'opacity-0'
                )}
                onClick={closeDropdown}
              />
              
              {/* Bottom Sheet */}
              <div className={cn(
                'fixed bottom-0 left-0 right-0 z-50 bg-[#1C1C1E] rounded-t-2xl shadow-2xl transition-transform duration-500 ease-out',
                isOpen ? 'translate-y-0' : 'translate-y-full'
              )}>
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 bg-[#313135] rounded-full transition-all duration-300 hover:bg-[#00FFB3] hover:scale-110" />
                </div>
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 pb-4">
                  <h3 className="text-lg font-semibold text-[#DEDEE3] transition-colors duration-300">Select Date Range</h3>
                  <button
                    onClick={closeDropdown}
                    className="p-2 rounded-lg hover:bg-[#2C2C2E] text-[#8C8C93] hover:text-[#DEDEE3] transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-90"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                
                {/* Content */}
                <div className="px-4 pb-safe max-h-[80vh] overflow-y-auto">
                  {/* Tab Navigation */}
                  <div className="flex mb-4 bg-[#2C2C2E] rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab('relative')}
                      className={cn(
                        'flex-1 px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out transform-gpu',
                        activeTab === 'relative' 
                          ? 'bg-[#00FFB3] text-black font-medium scale-105 shadow-lg' 
                          : 'text-[#8C8C93] hover:text-[#DEDEE3] hover:bg-[#38383A] hover:scale-102'
                      )}
                    >
                      Quick Ranges
                    </button>
                    <button
                      onClick={() => setActiveTab('absolute')}
                      className={cn(
                        'flex-1 px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out transform-gpu',
                        activeTab === 'absolute' 
                          ? 'bg-[#00FFB3] text-black font-medium scale-105 shadow-lg' 
                          : 'text-[#8C8C93] hover:text-[#DEDEE3] hover:bg-[#38383A] hover:scale-102'
                      )}
                    >
                      Custom Range
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'relative' && (
                    <div className={cn(
                      'space-y-2 transition-all duration-400 ease-out',
                      isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    )}>
                      {RELATIVE_RANGES.map((range, index) => {
                        const isSelected = value && 'value' in value && value.value === range.value;
                        return (
                          <button
                            key={range.value}
                            onClick={() => handleRelativeRangeSelect(range)}
                            className={cn(
                              'w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-300 ease-out hover:scale-102 active:scale-98 transform-gpu',
                              isSelected 
                                ? 'bg-[#00FFB3] text-black font-medium shadow-lg scale-105' 
                                : 'text-[#8C8C93] hover:bg-[#2C2C2E] hover:text-[#DEDEE3] hover:shadow-md'
                            )}
                            style={{ 
                              transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                            }}
                          >
                            {range.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'absolute' && (
                    <div className={cn(
                      'space-y-4 transition-all duration-400 ease-out',
                      isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    )}>
                      {/* Calendar content with animations */}
                      <div className={cn(
                        'transition-all duration-500 ease-out',
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      )}>
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-3">
                          <button
                            onClick={() => navigateMonth(-1)}
                            className="p-2 rounded-lg hover:bg-[#2C2C2E] text-[#8C8C93] hover:text-[#DEDEE3] transition-all duration-300 hover:scale-110 active:scale-95 hover:-translate-x-1"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                          
                          <h3 className="text-sm font-semibold text-[#DEDEE3] text-center flex-1 transition-all duration-300">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </h3>
                          
                          <button
                            onClick={() => navigateMonth(1)}
                            className="p-2 rounded-lg hover:bg-[#2C2C2E] text-[#8C8C93] hover:text-[#DEDEE3] transition-all duration-300 hover:scale-110 active:scale-95 hover:translate-x-1"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 text-xs text-[#8C8C93] font-medium mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                            <div 
                              key={day} 
                              className={cn(
                                'text-center py-2 transition-all duration-300',
                                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                              )}
                              style={{ transitionDelay: isOpen ? `${index * 30}ms` : '0ms' }}
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-4">
                          {renderCalendar()}
                        </div>
                      </div>

                      {/* Selected Range Display */}
                      {(selectedFromDate || selectedToDate) && (
                        <div className={cn(
                          'pt-3 border-t border-[#313135] mb-3 transition-all duration-400 ease-out',
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        )}>
                          <div className="text-xs text-[#8C8C93] mb-2">Selected Range:</div>
                          <div className="text-sm text-[#DEDEE3] break-words">
                            {selectedFromDate?.toLocaleDateString()} 
                            {selectedToDate && ` - ${selectedToDate.toLocaleDateString()}`}
                          </div>
                        </div>
                      )}

                      {/* Apply Button */}
                      <button
                        onClick={handleAbsoluteDateSelect}
                        disabled={!selectedFromDate || !selectedToDate}
                        className={cn(
                          'w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ease-out hover:scale-105 active:scale-95 transform-gpu',
                          selectedFromDate && selectedToDate
                            ? 'bg-[#00FFB3] text-black hover:bg-[#00E5A3] shadow-lg hover:shadow-xl'
                            : 'bg-[#2C2C2E] text-[#8C8C93] cursor-not-allowed'
                        )}
                      >
                        Apply Range
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Desktop Dropdown */
            <div 
              className={cn(
                'absolute top-full mt-2 w-80 md:w-96 bg-[#1C1C1E] border border-[#313135] rounded-xl shadow-2xl z-50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto',
                'transition-all duration-300 ease-out transform-gpu',
                dropdownPosition === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right',
                'max-w-[calc(100vw-1rem)]',
                isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'
              )}
              style={{
                maxWidth: dropdownPosition === 'right' 
                  ? `${triggerRef.current?.getBoundingClientRect().right || 400}px`
                  : undefined
              }}
            >
              {/* Tab Navigation */}
              <div className="flex mb-4 bg-[#2C2C2E] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('relative')}
                  className={cn(
                    'flex-1 px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out transform-gpu',
                    activeTab === 'relative' 
                      ? 'bg-[#00FFB3] text-black font-medium scale-105 shadow-lg' 
                      : 'text-[#8C8C93] hover:text-[#DEDEE3] hover:bg-[#38383A] hover:scale-102'
                  )}
                >
                  Quick Ranges
                </button>
                <button
                  onClick={() => setActiveTab('absolute')}
                  className={cn(
                    'flex-1 px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out transform-gpu',
                    activeTab === 'absolute' 
                      ? 'bg-[#00FFB3] text-black font-medium scale-105 shadow-lg' 
                      : 'text-[#8C8C93] hover:text-[#DEDEE3] hover:bg-[#38383A] hover:scale-102'
                  )}
                >
                  Custom Range
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'relative' && (
                <div className={cn(
                  'space-y-1 max-h-48 sm:max-h-64 overflow-y-auto transition-all duration-400 ease-out',
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}>
                  {RELATIVE_RANGES.map((range, index) => {
                    const isSelected = value && 'value' in value && value.value === range.value;
                    return (
                      <button
                        key={range.value}
                        onClick={() => handleRelativeRangeSelect(range)}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300 ease-out hover:scale-102 active:scale-98 transform-gpu',
                          isSelected 
                            ? 'bg-[#00FFB3] text-black font-medium shadow-lg scale-105' 
                            : 'text-[#8C8C93] hover:bg-[#2C2C2E] hover:text-[#DEDEE3] hover:shadow-md'
                        )}
                        style={{ 
                          transitionDelay: isOpen ? `${index * 30}ms` : '0ms'
                        }}
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTab === 'absolute' && (
                <div className={cn(
                  'space-y-4 transition-all duration-400 ease-out',
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                )}>
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-lg hover:bg-[#2C2C2E] text-[#8C8C93] hover:text-[#DEDEE3] transition-all duration-300 hover:scale-110 active:scale-95 hover:-translate-x-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    
                    <h3 className="text-sm font-semibold text-[#DEDEE3] text-center flex-1 transition-all duration-300">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-lg hover:bg-[#2C2C2E] text-[#8C8C93] hover:text-[#DEDEE3] transition-all duration-300 hover:scale-110 active:scale-95 hover:translate-x-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 text-xs text-[#8C8C93] font-medium mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                      <div 
                        key={day} 
                        className={cn(
                          'text-center py-2 transition-all duration-300',
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        )}
                        style={{ transitionDelay: isOpen ? `${index * 20}ms` : '0ms' }}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {renderCalendar()}
                  </div>

                  {/* Selected Range Display */}
                  {(selectedFromDate || selectedToDate) && (
                    <div className={cn(
                      'pt-3 border-t border-[#313135] mb-3 transition-all duration-400 ease-out',
                      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}>
                      <div className="text-xs text-[#8C8C93] mb-2">Selected Range:</div>
                      <div className="text-sm text-[#DEDEE3] break-words">
                        {selectedFromDate?.toLocaleDateString()} 
                        {selectedToDate && ` - ${selectedToDate.toLocaleDateString()}`}
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <button
                    onClick={handleAbsoluteDateSelect}
                    disabled={!selectedFromDate || !selectedToDate}
                    className={cn(
                      'w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ease-out hover:scale-105 active:scale-95 transform-gpu',
                      selectedFromDate && selectedToDate
                        ? 'bg-[#00FFB3] text-black hover:bg-[#00E5A3] shadow-lg hover:shadow-xl'
                        : 'bg-[#2C2C2E] text-[#8C8C93] cursor-not-allowed'
                    )}
                  >
                    Apply Range
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

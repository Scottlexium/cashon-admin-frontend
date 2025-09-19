'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button/button';
import { useDropdownPosition } from '@/lib/hooks/useDropdownPosition';

interface TimePickerProps {
  value?: string; // Format: "HH:mm" (24-hour format)
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  format?: '12h' | '24h';
  minuteStep?: number;
}

export function TimePicker({ 
  value, 
  onChange, 
  placeholder = 'Select time...', 
  disabled = false,
  className,
  size = 'md',
  format = '12h',
  minuteStep = 15
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM');
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

  // Initialize selected time from value
  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      if (format === '12h') {
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        setSelectedHour(displayHours);
        setSelectedPeriod(period);
      } else {
        setSelectedHour(hours);
      }
      setSelectedMinute(minutes);
    }
  }, [value, format]);

  // Use the dropdown positioning hook
  const { position: dropdownPosition } = useDropdownPosition({
    isOpen,
    triggerRef: triggerRef as React.RefObject<HTMLElement>,
    dropdownHeight: 280,
    minSpaceRequired: 150
  });

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => setIsOpen(false);

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
    
    if (format === '12h') {
      const [hours, minutes] = value.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    return value;
  };

  const generateTimeOptions = () => {
    const times: Array<{value: string, display: string}> = [];
    
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += minuteStep) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        let displayValue: string;
        if (format === '12h') {
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          displayValue = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        } else {
          displayValue = timeValue;
        }
        
        times.push({ value: timeValue, display: displayValue });
      }
    }
    
    return times;
  };

  const handleTimeSelect = (timeValue: string) => {
    onChange?.(timeValue);
    if (!isMobile) {
      closeDropdown();
    }
  };

  const handleMobileTimeConfirm = () => {
    const hours24 = format === '12h' 
      ? (selectedPeriod === 'PM' && selectedHour !== 12) 
        ? selectedHour + 12 
        : (selectedPeriod === 'AM' && selectedHour === 12) 
          ? 0 
          : selectedHour
      : selectedHour;
    
    const timeValue = `${hours24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange?.(timeValue);
    closeDropdown();
  };

  const generateHours = () => {
    const hours = [];
    if (format === '12h') {
      for (let i = 1; i <= 12; i++) {
        hours.push(i);
      }
    } else {
      for (let i = 0; i < 24; i++) {
        hours.push(i);
      }
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    // Allow all minutes 0-59, not just step intervals
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    return minutes;
  };

  const timeOptions = generateTimeOptions();

  // Get current time for highlighting
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const currentTime = getCurrentTime();

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
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
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
                  <h3 className="text-lg font-medium text-[#DEDEE3]">Select Time</h3>
                  <button
                    onClick={handleMobileTimeConfirm}
                    className="text-[#00FFB3] text-sm font-medium"
                  >
                    Done
                  </button>
                </div>

                {/* Mobile Time Picker - Wheel Style */}
                <div className="p-6 pb-8 h-96">
                  <div className="flex items-center justify-center space-x-4 h-full">
                    {/* Hours */}
                    <div className="flex flex-col items-center h-full">
                      <div className="text-[#8C8C93] text-xs font-medium mb-2">Hour</div>
                      <div className="bg-[#313135BA]/30 rounded-xl p-2 h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="space-y-2">
                          {generateHours().map((hour) => (
                            <button
                              key={hour}
                              onClick={() => setSelectedHour(hour)}
                              className={cn(
                                'w-14 h-10 rounded-lg text-base font-medium transition-all duration-200',
                                selectedHour === hour
                                  ? 'bg-[#00FFB3] text-black'
                                  : 'text-[#DEDEE3] hover:bg-[#313135BA]'
                              )}
                            >
                              {hour.toString().padStart(2, '0')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="text-[#DEDEE3] text-xl font-bold pt-6">:</div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center h-full">
                      <div className="text-[#8C8C93] text-xs font-medium mb-2">Minute</div>
                      <div className="bg-[#313135BA]/30 rounded-xl p-2 h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="space-y-2">
                          {generateMinutes().map((minute) => (
                            <button
                              key={minute}
                              onClick={() => setSelectedMinute(minute)}
                              className={cn(
                                'w-14 h-10 rounded-lg text-base font-medium transition-all duration-200',
                                selectedMinute === minute
                                  ? 'bg-[#00FFB3] text-black'
                                  : 'text-[#DEDEE3] hover:bg-[#313135BA]'
                              )}
                            >
                              {minute.toString().padStart(2, '0')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AM/PM for 12h format */}
                    {format === '12h' && (
                      <>
                        <div className="w-4" /> {/* Spacer */}
                        <div className="flex flex-col items-center h-full">
                          <div className="text-[#8C8C93] text-xs font-medium mb-2">Period</div>
                          <div className="bg-[#313135BA]/30 rounded-xl p-2 flex items-start pt-4">
                            <div className="space-y-3">
                              {['AM', 'PM'].map((period) => (
                                <button
                                  key={period}
                                  onClick={() => setSelectedPeriod(period as 'AM' | 'PM')}
                                  className={cn(
                                    'w-14 h-10 rounded-lg text-base font-medium transition-all duration-200',
                                    selectedPeriod === period
                                      ? 'bg-[#00FFB3] text-black'
                                      : 'text-[#DEDEE3] hover:bg-[#313135BA]'
                                  )}
                                >
                                  {period}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Selected Time Display */}
                  <div className="mt-8 text-center">
                    <div className="text-3xl font-bold text-[#DEDEE3] tracking-wider">
                      {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')} {format === '12h' ? selectedPeriod : ''}
                    </div>
                    <div className="text-sm text-[#8C8C93] mt-1">
                      Selected Time
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Desktop Dropdown */
            <div 
              className={cn(
                'absolute left-0 mt-1 bg-[#1C1C1E] border border-[#313135BA] rounded-lg shadow-lg z-50 w-full max-w-48',
                dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full'
              )}
            >
              <div className="p-2">
                <div className="text-xs font-medium text-[#8C8C93] px-3 py-2 border-b border-[#313135BA] mb-2">
                  Select Time
                </div>
                
                {/* Desktop Time Options */}
                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#313135BA] scrollbar-track-transparent">
                  <div className="space-y-1">
                    {timeOptions.map(({ value: timeValue, display }, index) => {
                      const isSelected = value === timeValue;
                      const isCurrentTime = timeValue === currentTime;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(timeValue)}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                            'hover:bg-[#313135BA] text-[#DEDEE3]',
                            isSelected && 'bg-[#00FFB3] text-black font-medium hover:bg-[#00FFB3]',
                            isCurrentTime && !isSelected && 'bg-[#313135BA]/50 text-[#00FFB3]'
                          )}
                        >
                          {display}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TimePicker;

'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  disabled?: boolean;
  editable?: boolean;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
  formatValue?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 10000,
  step = 100,
  minValue,
  maxValue,
  onChange,
  disabled = false,
  editable = false,
  className,
  trackClassName,
  thumbClassName,
  formatValue,
  prefix = '₦',
  suffix = '',
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [localMinInput, setLocalMinInput] = useState<string>(minValue.toString());
  const [localMaxInput, setLocalMaxInput] = useState<string>(maxValue.toString());
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update local input values when props change
  useEffect(() => {
    setLocalMinInput(minValue.toString());
  }, [minValue]);

  useEffect(() => {
    setLocalMaxInput(maxValue.toString());
  }, [maxValue]);

  const formatDisplayValue = useCallback((value: number): string => {
    if (formatValue) {
      return formatValue(value);
    }
    return `${prefix}${value.toLocaleString()}${suffix}`;
  }, [formatValue, prefix, suffix]);

  const getPercentage = useCallback((value: number): number => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPercentage = useCallback((percentage: number): number => {
    const value = min + (percentage / 100) * (max - min);
    return Math.round(value / step) * step;
  }, [min, max, step]);

  const handleMouseDown = (type: 'min' | 'max') => (event: React.MouseEvent) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const newValue = getValueFromPercentage(percentage);

    if (isDragging === 'min') {
      const newMin = Math.min(newValue, maxValue);
      onChange(newMin, maxValue);
    } else {
      const newMax = Math.max(newValue, minValue);
      onChange(minValue, newMax);
    }
  }, [isDragging, disabled, getValueFromPercentage, minValue, maxValue, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Slider Track */}
      <div
        ref={sliderRef}
        className={cn(
          'relative h-2 rounded-full bg-[#313135BA] cursor-pointer',
          trackClassName
        )}
      >
        {/* Active Track */}
        <div
          className="absolute h-2 rounded-full bg-[#00FFB3]"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />

        {/* Min Thumb */}
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#00FFB3] rounded-full cursor-grab border-2 border-[#1C1C1E] shadow-md',
            'hover:scale-110 transition-transform',
            isDragging === 'min' && 'cursor-grabbing scale-110',
            disabled && 'opacity-50 cursor-not-allowed',
            thumbClassName
          )}
          style={{ left: `${minPercentage}%`, marginLeft: '-10px' }}
          onMouseDown={handleMouseDown('min')}
        />

        {/* Max Thumb */}
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#00FFB3] rounded-full cursor-grab border-2 border-[#1C1C1E] shadow-md',
            'hover:scale-110 transition-transform',
            isDragging === 'max' && 'cursor-grabbing scale-110',
            disabled && 'opacity-50 cursor-not-allowed',
            thumbClassName
          )}
          style={{ left: `${maxPercentage}%`, marginLeft: '-10px' }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>

      {/* Value Display */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-sm text-[#DEDEE3] mr-1">{prefix}</span>
          {editable ? (
            <input
              type="number"
              value={localMinInput}
              onChange={(e) => {
                const inputValue = e.target.value;
                setLocalMinInput(inputValue);
                
                // Allow empty input for better UX while typing
                if (inputValue === '') {
                  onChange(0, maxValue);
                  return;
                }
                
                // Remove leading zeros and parse
                const cleanValue = parseInt(inputValue) || 0;
                const clampedValue = Math.max(min, Math.min(cleanValue, maxValue));
                onChange(clampedValue, maxValue);
              }}
              onBlur={() => {
                // Clean up display on blur to ensure it matches the actual value
                setLocalMinInput(minValue.toString());
              }}
              className="w-16 px-2 py-1 bg-[#313135BA] rounded text-sm text-[#DEDEE3] font-medium border-none outline-none focus:ring-1 focus:ring-[#00FFB3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={min}
              max={maxValue}
              disabled={disabled}
            />
          ) : (
            <div className="px-2 py-1 bg-[#313135BA] rounded text-sm text-[#DEDEE3] font-medium">
              {minValue.toLocaleString()}{suffix}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <span className="text-sm text-[#DEDEE3] mr-1">{prefix}</span>
          {editable ? (
            <input
              type="number"
              value={localMaxInput}
              onChange={(e) => {
                const inputValue = e.target.value;
                setLocalMaxInput(inputValue);
                
                // Allow empty input for better UX while typing
                if (inputValue === '') {
                  onChange(minValue, 0);
                  return;
                }
                
                // Remove leading zeros and parse
                const cleanValue = parseInt(inputValue) || 0;
                const clampedValue = Math.min(max, Math.max(cleanValue, minValue));
                onChange(minValue, clampedValue);
              }}
              onBlur={() => {
                // Clean up display on blur to ensure it matches the actual value
                setLocalMaxInput(maxValue.toString());
              }}
              className="w-16 px-2 py-1 bg-[#313135BA] rounded text-sm text-[#DEDEE3] font-medium border-none outline-none focus:ring-1 focus:ring-[#00FFB3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={minValue}
              max={max}
              disabled={disabled}
            />
          ) : (
            <div className="px-2 py-1 bg-[#313135BA] rounded text-sm text-[#DEDEE3] font-medium">
              {maxValue.toLocaleString()}{suffix}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

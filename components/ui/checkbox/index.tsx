'use client';

import React, { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type CheckboxProps } from './types';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  checked = false,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  helpText,
  className = '',
  size = 'md',
  variant = 'default',
  id,
  name,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  }, [onChange]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          required={required}
          className="sr-only"
          {...props}
        />
        
        <div
          className={cn(
            'relative flex items-center justify-center transition-all duration-200',
            'border rounded cursor-pointer',
            variant === 'default' ? 'bg-surface border-border' : 'bg-[#2A2C2E] border-[#3A3C3E]',
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5',
            checked ? 'bg-[#00E6A3] border-[#00E6A3]' : '',
            isFocused ? 'shadow-[0_0_0_3px_rgba(0,230,163,0.15)]' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#00E6A3]',
            error ? 'border-[#FF4D4F]' : ''
          )}
        >
          {checked && (
            <Check 
              className={cn(
                'text-black stroke-[3]',
                size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
              )} 
            />
          )}
        </div>
      </div>

      {label && (
        <label 
          htmlFor={id}
          className={cn(
            'select-none',
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            error ? 'text-[#FF4D4F]' : 'text-text-primary'
          )}
        >
          {label}
          {required && <span className="text-[#FF4D4F] ml-1">*</span>}
        </label>
      )}

      {(error || helpText) && (
        <p className={cn(
          'mt-1 text-sm',
          error ? 'text-[#FF4D4F]' : 'text-text-muted'
        )}>
          {error || helpText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

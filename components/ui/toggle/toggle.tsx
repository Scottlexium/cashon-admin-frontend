'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ToggleProps } from './types';

const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'default',
  label,
  description,
  className,
  id,
  ...props
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  // Size variants
  const sizeClasses = {
    sm: {
      switch: 'w-9 h-5',
      thumb: 'w-3.5 h-3.5',
      translate: 'translate-x-4',
    },
    md: {
      switch: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      switch: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  // Color variants
  const variantClasses = {
    default: {
      checked: 'bg-[#3AF4BD] border-[#3AF4BD]',
      unchecked: 'bg-[#303033] border-[#363639]',
      thumb: 'bg-black',
    },
    success: {
      checked: 'bg-green-500 border-green-500',
      unchecked: 'bg-[#303033] border-[#363639]',
      thumb: 'bg-black',
    },
    warning: {
      checked: 'bg-yellow-500 border-yellow-500',
      unchecked: 'bg-[#303033] border-[#363639]',
      thumb: 'bg-black',
    },
    danger: {
      checked: 'bg-red-500 border-red-500',
      unchecked: 'bg-[#303033] border-[#363639]',
      thumb: 'bg-black',
    },
  };

  const sizes = sizeClasses[size];
  const colors = variantClasses[variant];

  return (
    <div className={cn('flex items-start gap-3', className)}>
      {/* Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        id={id}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          // Base styles
          'relative inline-flex shrink-0 cursor-pointer rounded-full border transition-colors duration-200 ease-in-out focus:outline-none',
          // Size
          sizes.switch,
          // Colors
          checked ? colors.checked : colors.unchecked,
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        {...props}
      >
        <span className="sr-only">{label || 'Toggle'}</span>
        <span
          aria-hidden="true"
          className={cn(
            // Base styles
            'pointer-events-none inline-block rounded-full shadow-sm ring-0 transition duration-200 ease-in-out transform',
            // Size
            sizes.thumb,
            // Color
            colors.thumb,
            // Position - perfectly center on Y axis, with padding on X axis
            'absolute top-1/2 left-0.5 -translate-y-1/2',
            checked ? sizes.translate : 'translate-x-0',
          )}
        />
      </button>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium text-[#DEDEE3] cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className={cn(
              'text-xs text-[#8C8C93] mt-1',
              disabled && 'opacity-50'
            )}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

Toggle.displayName = 'Toggle';

export default Toggle;

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { RadioProps, RadioOptionProps, RadioGroupProps } from './types';

export { type RadioProps, type RadioOptionProps, type RadioGroupProps };

export const Radio: React.FC<RadioProps> = ({
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className,
  size = 'md',
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div 
      className={cn(
        'relative flex items-center justify-center cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={handleChange}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      
      {/* Custom radio button */}
      <div
        className={cn(
          'rounded-full border-2 flex items-center justify-center transition-all duration-200',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-5 h-5',
          size === 'lg' && 'w-6 h-6',
          checked
            ? 'border-[#00FFB3] bg-[#00FFB3]/10'
            : 'border-[#3A3C3E] bg-transparent',
          !disabled && 'hover:border-[#00FFB3]/60',
          disabled && 'border-[#3A3C3E]/50'
        )}
      >
        {/* Inner dot */}
        {checked && (
          <div
            className={cn(
              'rounded-full bg-[#00FFB3] transition-all duration-200',
              size === 'sm' && 'w-1.5 h-1.5',
              size === 'md' && 'w-2 h-2',
              size === 'lg' && 'w-2.5 h-2.5'
            )}
          />
        )}
      </div>
    </div>
  );
};

export const RadioOption: React.FC<RadioOptionProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  icon,
  disabled = false,
  className,
  size = 'md',
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 cursor-pointer transition-all duration-200',
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#313135BA]/30',
        'mt-4 rounded-lg',
        className
      )}
      onClick={handleChange}
    >
      <Radio
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        size={size}
      />
      
      {/* Icon */}
      {icon && (
        <div className={cn(
          'flex-shrink-0 text-[#8C8C93]',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg'
        )}>
          {icon}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={cn(
          'font-medium text-[#A2A2A7]',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          {label}
        </div>
        
        {description && (
          <div className={cn(
            'text-[#8C8C93] mt-1',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-xs',
            size === 'lg' && 'text-sm'
          )}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  disabled = false,
  className,
  size = 'md',
  orientation = 'vertical',
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Label */}
      {label && (
        <label className={cn(
          'block font-medium text-[#8C8C93]',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          {label}
        </label>
      )}
      
      {/* Radio Options */}
      <div
        className={cn(
          'space-y-1',
          orientation === 'horizontal' && 'flex flex-wrap gap-2 space-y-0'
        )}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            label={option.label}
            description={option.description}
            icon={option.icon}
            disabled={disabled || option.disabled}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default Radio;

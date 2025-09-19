"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InputProps } from './types';
import { validators, validate } from '@/lib/validators';

export { validators, type InputProps };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  onBlur,
  validators: inputValidators = [],
  disabled = false,
  required = false,
  helpText,
  className = '',
  showValidationIcon = true,
  validateOnChange = false,
  validateOnBlur = true,
  debounceMs = 300,
  leadingIcon,
  trailingIcon,
  onLeadingIconClick,
  onTrailingIconClick,
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Sync internal value with external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Validation function
  const validateInput = useCallback((val: string) => {
    const allValidators = required ? [validators.required(), ...inputValidators] : inputValidators;
    return validate(val, allValidators);
  }, [inputValidators, required]);

  // Debounced validation
  const debouncedValidate = useCallback((val: string) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    const timer = setTimeout(() => {
      const validationError = validateInput(val);
      setError(validationError);
    }, debounceMs);
    
    setDebounceTimer(timer);
  }, [validateInput, debounceMs]);

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Special handling for number inputs
    if (type === 'number') {
      // Allow empty string for clearing
      if (newValue === '') {
        setInternalValue(newValue);
        if (onChange) {
          onChange(e);
        }
        return;
      }
      
      // Remove any non-numeric characters except decimal point
      newValue = newValue.replace(/[^0-9.]/g, '');
      
      // Ensure only one decimal point
      const decimalCount = (newValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        const firstDecimalIndex = newValue.indexOf('.');
        newValue = newValue.substring(0, firstDecimalIndex + 1) + newValue.substring(firstDecimalIndex + 1).replace(/\./g, '');
      }
      
      // Parse to number and check if valid
      const numValue = parseFloat(newValue);
      
      // Prevent negative numbers and NaN
      if (numValue < 0 || (newValue !== '' && isNaN(numValue))) {
        return; // Don't update if invalid
      }
      
      // Update the event target value for consistency
      e.target.value = newValue;
    }
    
    setInternalValue(newValue);
    
    if (onChange) {
      onChange(e);
    }
    
    if (validateOnChange && touched) {
      debouncedValidate(newValue);
    }
  }, [onChange, validateOnChange, touched, debouncedValidate, type]);

  // Handle blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    
    if (validateOnBlur) {
      const validationError = validateInput(e.target.value);
      setError(validationError);
    }
    
    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur, validateOnBlur, validateInput]);

  // Handle key down for number inputs
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number') {
      // Allow backspace, delete, tab, escape, enter, home, end, arrow keys
      if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
          // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
          (e.keyCode === 65 && e.ctrlKey === true) || // Select all
          (e.keyCode === 67 && e.ctrlKey === true) || // Copy
          (e.keyCode === 86 && e.ctrlKey === true) || // Paste
          (e.keyCode === 88 && e.ctrlKey === true) || // Cut
          (e.keyCode === 90 && e.ctrlKey === true)) { // Undo
        return;
      }
      
      // Prevent minus sign, plus sign, and 'e' (scientific notation)
      if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        return;
      }
      
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode !== 190 && e.keyCode !== 110) {
        e.preventDefault();
      }
    }
  }, [type]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // Determine input type
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Determine validation state
  const hasError = touched && error;
  const isValid = touched && !error && internalValue;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className={cn(
          "block font-medium text-text-primary mb-1",
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          {label}
          {required && <span className="text-[#FF4D4F] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Leading Icon */}
        {leadingIcon && (
          <div 
            className={cn(
              'absolute inset-y-0 left-0 flex items-center pl-3',
              onLeadingIconClick ? 'cursor-pointer hover:text-text-primary' : 'pointer-events-none',
              'text-text-muted'
            )}
            onClick={onLeadingIconClick}
          >
            {leadingIcon}
          </div>
        )}

        <input
          ref={ref}
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full transition-all duration-300 ease-in-out outline-none focus:outline-none',
            // Hide number input spinners
            type === 'number' && '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            variant === 'default' && 'rounded-md shadow-sm bg-surface border border-border',
            variant === 'filled' && 'rounded-md shadow-sm bg-[#2A2C2E] border border-[#3A3C3E]',
            variant === 'outlined' && 'rounded-md shadow-none bg-transparent border border-[#3A3C3E]',
            variant === 'underline' && 'border-0 border-b-2 rounded-none bg-transparent px-0 focus:ring-0',
            size === 'sm' && 'text-sm px-2.5 py-2 h-9 min-h-[2.25rem]',
            size === 'md' && 'text-base px-3 py-2.5 h-10 min-h-[2.5rem]',
            size === 'lg' && 'text-lg px-4 py-3 h-12 min-h-[3rem]',
            hasError
              ? variant === 'underline'
                ? 'border-b-[#FF4D4F] focus:border-b-[#FF4D4F]'
                : 'border-[#FF4D4F] focus:ring-[#FF4D4F] focus:border-[#FF4D4F]'
              : variant === 'underline'
                ? 'border-b-[#3A3C3E] focus:border-b-[#00E6A3]'
                : 'focus:border-[#00E6A3] focus:shadow-[0_0_0_3px_rgba(0,230,163,0.15)]',
            disabled && 'bg-[#2A2C2E] cursor-not-allowed opacity-75',
            leadingIcon && 'pl-10',
            trailingIcon && 'pr-10',
            (() => {
              if (type === 'password') return 'pr-10';
              if (trailingIcon && showValidationIcon && (hasError || isValid)) return 'pr-16';
              if (trailingIcon || (showValidationIcon && (hasError || isValid))) return 'pr-10';
              return 'pr-3';
            })()
          )}
          {...props}
        />
        
        {/* Trailing Icon */}
        {trailingIcon && type !== 'password' && (
          <div 
            className={cn(
              'absolute inset-y-0 right-0 flex items-center',
              showValidationIcon && (hasError || isValid) ? 'pr-8' : 'pr-3',
              onTrailingIconClick ? 'cursor-pointer hover:text-text-primary' : 'pointer-events-none',
              'text-text-muted'
            )}
            onClick={onTrailingIconClick}
          >
            {trailingIcon}
          </div>
        )}

        {/* Password toggle button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        
        {/* Validation icons */}
        {showValidationIcon && type !== 'password' && (hasError || isValid) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {hasError ? (
              <AlertCircle className="text-[#FF4D4F]" size={20} />
            ) : (
              <Check className="text-[#00E6A3]" size={20} />
            )}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {hasError && (
        <p className="text-sm text-[#FF4D4F] flex items-center space-x-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </p>
      )}
      
      {/* Help text */}
      {helpText && !hasError && (
        <p className="text-sm text-text-muted">{helpText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TextareaProps } from './types';
import { validators, validate } from '@/lib/validators';

export { validators, type TextareaProps };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  placeholder,
  value = '',
  onChange,
  onBlur,
  validators: textareaValidators = [],
  disabled = false,
  required = false,
  helpText,
  className = '',
  showValidationIcon = true,
  validateOnChange = false,
  validateOnBlur = true,
  debounceMs = 300,
  size = 'md',
  variant = 'default',
  rows = 4,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Sync internal value with external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Validation function
  const validateTextarea = useCallback((val: string) => {
    const allValidators = required ? [validators.required(), ...textareaValidators] : textareaValidators;
    return validate(val, allValidators);
  }, [textareaValidators, required]);

  // Handle value change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    // Clear previous debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Immediate validation on change if enabled
    if (validateOnChange) {
      const validationError = validateTextarea(newValue);
      setError(validationError);
    }

    // Debounced onChange call
    const timer = setTimeout(() => {
      onChange?.(e);
      
      // Debounced validation
      if (validateOnChange) {
        const validationError = validateTextarea(newValue);
        setError(validationError);
      }
    }, debounceMs);

    setDebounceTimer(timer);
  }, [onChange, validateOnChange, validateTextarea, debounceMs, debounceTimer]);

  // Handle blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setTouched(true);
    
    if (validateOnBlur) {
      const validationError = validateTextarea(e.target.value);
      setError(validationError);
    }
    
    onBlur?.(e);
  }, [onBlur, validateOnBlur, validateTextarea]);

  // Clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Base styles
  const baseStyles = "w-full transition-all duration-200 resize-none focus:outline-none";
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg"
  };

  // Variant styles
  const variantStyles = {
    default: "bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    filled: "bg-[#303033] border border-[#45454D] rounded-lg text-[#DEDEE3] placeholder-[#8C8C93] focus:ring-2 focus:ring-[#00FFB3] focus:border-transparent",
    outlined: "bg-transparent border-2 border-gray-300 rounded-lg focus:border-blue-500",
    underline: "bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500"
  };

  // Error styles
  const errorStyles = error && touched ? 
    "border-red-500 focus:ring-red-500 focus:border-red-500" : "";

  // Success styles
  const successStyles = !error && touched && textareaValidators.length > 0 ? 
    "border-green-500 focus:ring-green-500 focus:border-green-500" : "";

  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const textareaClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    errorStyles,
    successStyles,
    disabledStyles,
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#A2A2A7] mb-4">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={textareaClasses}
          {...props}
        />
        
        {/* Validation Icons */}
        {showValidationIcon && touched && textareaValidators.length > 0 && (
          <div className="absolute right-3 top-3 flex items-center">
            {error ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Check className="h-5 w-5 text-green-500" />
            )}
          </div>
        )}
      </div>
      
      {/* Help text or error message */}
      {(helpText || (error && touched)) && (
        <p className={cn(
          "mt-2 text-sm",
          error && touched ? "text-red-600" : "text-gray-500"
        )}>
          {error && touched ? error : helpText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

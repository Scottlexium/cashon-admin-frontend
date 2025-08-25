'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AlertCircle, Check, ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validators, type ValidatorFn } from '@/lib/validators';
import { type SelectProps } from './types';

export const Select = ({
  label,
  options = [],
  value = null,
  onChange,
  onBlur,
  validation = [],
  disabled = false,
  required = false,
  multiple = false,
  searchable = false,
  clearable = false,
  placeholder = 'Select an option...',
  helpText,
  className = '',
  showValidationIcon = true,
  validateOnChange = false,
  validateOnBlur = true,
  debounceMs = 300,
  leadingIcon,
  maxHeight = '200px',
  ...props
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    multiple ? (Array.isArray(value) ? value : []) : value
  );
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync internal value with external value
  useEffect(() => {
    setInternalValue(multiple ? (Array.isArray(value) ? value : []) : value);
  }, [value, multiple]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Run all validators
  const validateValue = useCallback((val: any): string | null => {
    const validationRules = required 
      ? [validators.required(), ...validation]
      : validation;
    const validatorFns = validationRules.map(rule => 
      typeof rule === 'function' ? rule : (value: any) => rule.validator(value)
    ) as ValidatorFn[];
    
    for (const validator of validatorFns) {
      const error = validator(val);
      if (error) return error;
    }
    return null;
  }, [validation, required]);

  // Debounced validation
  const debouncedValidate = useCallback((val: any) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    const timer = setTimeout(() => {
      const validationError = validateValue(val);
      setError(validationError);
    }, debounceMs);
    
    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [validateValue, debounceMs]);

  // Handle option selection
  const handleOptionSelect = useCallback((optionValue: string) => {
    let newValue: string | string[] | null;
    
    if (multiple) {
      const currentArray = Array.isArray(internalValue) ? internalValue : [];
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter(v => v !== optionValue);
      } else {
        newValue = [...currentArray, optionValue];
      }
    } else {
      newValue = optionValue;
      setIsOpen(false);
      setSearchTerm('');
    }

    setInternalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (validateOnChange && touched) {
      debouncedValidate(newValue);
    }
  }, [internalValue, multiple, onChange, validateOnChange, touched, debouncedValidate]);

  // Handle blur
  const handleBlur = useCallback(() => {
    setTouched(true);
    
    if (validateOnBlur) {
      const validationError = validateValue(internalValue);
      setError(validationError);
    }
    
    if (onBlur) {
      onBlur(internalValue);
    }
  }, [onBlur, validateOnBlur, validateValue, internalValue]);

  // Handle clear
  const handleClear = useCallback(() => {
    const newValue = multiple ? [] : null;
    setInternalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (validateOnChange && touched) {
      debouncedValidate(newValue);
    }
  }, [multiple, onChange, validateOnChange, touched, debouncedValidate]);

  // Filter options based on search
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get display text
  const getDisplayText = () => {
    if (multiple) {
      if (!Array.isArray(internalValue) || internalValue.length === 0) {
        return placeholder;
      }
      if (internalValue.length === 1) {
        const option = options.find(opt => opt.value === internalValue[0]);
        return option ? option.label : internalValue[0];
      }
      return `${internalValue.length} items selected`;
    } else {
      if (internalValue === null || internalValue === undefined || internalValue === '') {
        return placeholder;
      }
      const option = options.find(opt => opt.value === internalValue);
      return option ? option.label : internalValue;
    }
  };

  // Check if option is selected
  const isOptionSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(internalValue) && internalValue.includes(optionValue);
    }
    return internalValue === optionValue;
  };

  // Determine validation state
  const hasError = touched && error;
  const isValid = touched && !error && (
    multiple 
      ? Array.isArray(internalValue) && internalValue.length > 0
      : internalValue !== null && internalValue !== undefined && internalValue !== ''
  );

  const hasValue = multiple 
    ? Array.isArray(internalValue) && internalValue.length > 0
    : internalValue !== null && internalValue !== undefined && internalValue !== '';

  return (
    <div className={cn("space-y-2", className)} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Leading Icon */}
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {leadingIcon}
          </div>
        )}

        {/* Select Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "w-full py-3 border rounded-lg transition-all duration-200 text-left",
            "focus:outline-none focus:ring-4 focus:ring-opacity-20",
            hasError 
              ? "border-red-300 focus:ring-red-500 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25"
              : isValid
              ? "border-green-300 focus:ring-green-500 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/25"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/25",
            disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white cursor-pointer hover:border-gray-400",
            leadingIcon ? "pl-10" : "pl-3",
            clearable && hasValue ? "pr-16" : showValidationIcon && (hasError || isValid) ? "pr-16" : "pr-10"
          )}
          {...props}
        >
          <span className={hasValue ? "text-gray-900" : "text-gray-500"}>
            {getDisplayText()}
          </span>
        </button>

        {/* Clear Button */}
        {clearable && hasValue && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}

        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown 
            className={cn(
              "text-gray-400 transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
            size={20} 
          />
        </div>

        {/* Validation Icons */}
        {showValidationIcon && (hasError || isValid) && (
          <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
            {hasError ? (
              <AlertCircle className="text-red-500" size={20} />
            ) : (
              <Check className="text-green-500" size={20} />
            )}
          </div>
        )}

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className={cn("overflow-y-auto")} style={{ maxHeight: maxHeight }}>
              {filteredOptions.length === 0 ? (
                <div className="p-3 text-gray-500 text-center">
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionSelect(option.value)}
                    className={cn(
                      "w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors duration-150",
                      isOptionSelected(option.value) 
                        ? "bg-blue-50 text-blue-700 font-medium" 
                        : "text-gray-900",
                      option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    )}
                    disabled={option.disabled}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {isOptionSelected(option.value) && (
                        <Check className="text-blue-600" size={16} />
                      )}
                    </div>
                    {option.description && (
                      <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {hasError && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </p>
      )}
      
      {/* Help text */}
      {helpText && !hasError && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

Select.displayName = 'Select';

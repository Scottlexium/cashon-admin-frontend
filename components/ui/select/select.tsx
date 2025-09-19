'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AlertCircle, Check, ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validators, type ValidatorFn } from '@/lib/validators';
import { type SelectProps } from './types';
import { useDropdownPosition } from '@/lib/hooks/useDropdownPosition';

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

  // Use the dropdown positioning hook
  const { position: dropdownPosition } = useDropdownPosition({
    isOpen,
    triggerRef: selectRef as React.RefObject<HTMLElement>,
    dropdownHeight: parseInt(maxHeight.replace('px', '')) + 100,
    minSpaceRequired: 100
  });

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
        <label className="block text-sm font-medium text-[#8C8C93]">
          {label}
          {required && <span className="text-[#FF4D4F] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Leading Icon */}
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C8C93]">
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
            "w-full py-2.5 h-10 min-h-[2.5rem] border rounded-md transition-all duration-200 text-left bg-[#2A2C2E] border-[#3A3C3E]",
            "focus:outline-none focus:border-[#00E6A3] focus:shadow-[0_0_0_3px_rgba(0,230,163,0.15)]",
            hasError 
              ? "border-[#FF4D4F] focus:border-[#FF4D4F] focus:shadow-[0_0_0_3px_rgba(255,77,79,0.15)]"
              : isValid
              ? "border-[#00E6A3] focus:border-[#00E6A3] focus:shadow-[0_0_0_3px_rgba(0,230,163,0.15)]"
              : "hover:border-[#4A4C4E]",
            disabled ? "bg-[#2A2C2E] cursor-not-allowed opacity-75" : "cursor-pointer",
            leadingIcon ? "pl-10" : "pl-3",
            clearable && hasValue ? "pr-16" : showValidationIcon && (hasError || isValid) ? "pr-16" : "pr-10"
          )}
          {...props}
        >
          <span className={hasValue ? "text-[#DEDEE3]" : "text-[#8C8C93]"}>
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
            className="absolute inset-y-0 right-8 flex items-center text-[#8C8C93] hover:text-[#DEDEE3] transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}

        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown 
            className={cn(
              "text-[#8C8C93] transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
            size={20} 
          />
        </div>

        {/* Validation Icons */}
        {showValidationIcon && (hasError || isValid) && (
          <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
            {hasError ? (
              <AlertCircle className="text-[#FF4D4F]" size={20} />
            ) : (
              <Check className="text-[#00E6A3]" size={20} />
            )}
          </div>
        )}

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div 
            className={cn(
              'absolute z-50 w-full mt-1 bg-[#2A2C2E] border border-[#3A3C3E] rounded-md shadow-lg',
              dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full'
            )}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-[#3A3C3E]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8C8C93]" size={16} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#2A2C2E] border border-[#3A3C3E] rounded-md text-[#DEDEE3] placeholder-[#8C8C93] focus:outline-none focus:border-[#00E6A3] focus:shadow-[0_0_0_3px_rgba(0,230,163,0.15)]"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className={cn("overflow-y-auto")} style={{ maxHeight: maxHeight }}>
              {filteredOptions.length === 0 ? (
                <div className="p-3 text-[#8C8C93] text-center">
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionSelect(option.value)}
                    className={cn(
                      "w-full text-left px-3 py-2 hover:bg-[#3A3C3E] transition-colors duration-150",
                      isOptionSelected(option.value) 
                        ? "bg-[#00E6A3]/10 text-[#00E6A3] font-medium" 
                        : "text-[#DEDEE3]",
                      option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    )}
                    disabled={option.disabled}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {isOptionSelected(option.value) && (
                        <Check className="text-[#00E6A3]" size={16} />
                      )}
                    </div>
                    {option.description && (
                      <p className="text-sm text-[#8C8C93] mt-1">{option.description}</p>
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
        <p className="text-sm text-[#FF4D4F] flex items-center space-x-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </p>
      )}
      
      {/* Help text */}
      {helpText && !hasError && (
        <p className="text-sm text-[#8C8C93]">{helpText}</p>
      )}
    </div>
  );
};

Select.displayName = 'Select';

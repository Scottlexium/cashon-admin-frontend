export type ValidatorFn = (value: any) => string | null;

export interface ValidationRule {
  validator: ValidatorFn;
  message?: string;
}

export type ValidationRules = ValidationRule[] | ValidatorFn[];

// Helper to normalize validation rules
const normalizeRules = (rules: ValidationRules): ValidatorFn[] => {
  return rules.map(rule => {
    if (typeof rule === 'function') {
      return rule;
    }
    return (value: any) => rule.validator(value) ? null : (rule.message || 'Invalid value');
  });
};

// Main validation function
export const validate = (value: any, rules: ValidationRules): string | null => {
  const normalizedRules = normalizeRules(rules);
  for (const rule of normalizedRules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

// Core validators
export const validators = {
  required: (message = 'This field is required'): ValidatorFn => (value: any): string | null => {
    if (value === null || value === undefined) return message;
    if (Array.isArray(value) && value.length === 0) return message;
    if (typeof value === 'string' && value.trim() === '') return message;
    if (typeof value === 'object' && Object.keys(value).length === 0) return message;
    return null;
  },

  email: (message = 'Please enter a valid email address'): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(value)) ? null : message;
  },

  minLength: (min: number, message?: string): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const length = Array.isArray(value) ? value.length : String(value).length;
    return length >= min ? null : (message || `Must be at least ${min} ${Array.isArray(value) ? 'items' : 'characters'}`);
  },

  maxLength: (max: number, message?: string): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const length = Array.isArray(value) ? value.length : String(value).length;
    return length <= max ? null : (message || `Must be no more than ${max} ${Array.isArray(value) ? 'items' : 'characters'}`);
  },

  pattern: (regex: RegExp, message = 'Invalid format'): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    return regex.test(String(value)) ? null : message;
  },

  min: (min: number, message?: string): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const num = Number(value);
    return !isNaN(num) && num >= min ? null : (message || `Must be at least ${min}`);
  },

  max: (max: number, message?: string): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const num = Number(value);
    return !isNaN(num) && num <= max ? null : (message || `Must be no more than ${max}`);
  },

  number: (message = 'Please enter a valid number'): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    return !isNaN(Number(value)) ? null : message;
  },

  integer: (message = 'Please enter a valid integer'): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const num = Number(value);
    return !isNaN(num) && Number.isInteger(num) ? null : message;
  },

  positive: (message = 'Please enter a positive number'): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    const num = Number(value);
    return !isNaN(num) && num > 0 ? null : message;
  },

  url: (message = 'Please enter a valid URL'): ValidatorFn => (value: any): string | null => {
    if (!value) return null;
    try {
      new URL(String(value));
      return null;
    } catch {
      return message;
    }
  },

  match: (otherValue: any, message?: string): ValidatorFn => (value: any): string | null => {
    return value === otherValue ? null : (message || 'Values must match');
  },

  includes: (items: any[], message?: string): ValidatorFn => (value: any): string | null => {
    if (!Array.isArray(value)) return null;
    const missing = items.filter(item => !value.includes(item));
    return missing.length === 0 ? null : (message || `Must include: ${missing.join(', ')}`);
  },

  excludes: (items: any[], message?: string): ValidatorFn => (value: any): string | null => {
    if (!Array.isArray(value)) return null;
    const included = items.filter(item => value.includes(item));
    return included.length === 0 ? null : (message || `Cannot include: ${included.join(', ')}`);
  },

  custom: (fn: (value: any) => boolean, message = 'Invalid value'): ValidatorFn => (value: any): string | null => {
    return fn(value) ? null : message;
  }
};

// Composition helper
export const composeValidators = (...validators: ValidatorFn[]): ValidatorFn => {
  return (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
};

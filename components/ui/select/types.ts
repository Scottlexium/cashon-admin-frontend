export interface Option {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options?: Option[];
  value?: string | string[] | null;
  onChange?: (value: string | string[] | null) => void;
  onBlur?: (value: string | string[] | null) => void;
  validation?: (import('@/lib/validators').ValidatorFn | import('@/lib/validators').ValidationRule)[];
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  helpText?: string;
  className?: string;
  showValidationIcon?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
  leadingIcon?: React.ReactNode;
  maxHeight?: string;
}

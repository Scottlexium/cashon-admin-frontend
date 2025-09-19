import { ValidatorFn } from "@/lib/validators";

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'default' | 'filled' | 'outlined' | 'underline';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  validators?: ValidatorFn[];
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  className?: string;
  showValidationIcon?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
  size?: TextareaSize;
  variant?: TextareaVariant;
  rows?: number;
}

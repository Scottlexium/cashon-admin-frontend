import { ValidatorFn } from "@/lib/validators";

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined' | 'underline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  validators?: ValidatorFn[];
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  className?: string;
  showValidationIcon?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onLeadingIconClick?: () => void;
  onTrailingIconClick?: () => void;
  size?: InputSize;
  variant?: InputVariant;
}

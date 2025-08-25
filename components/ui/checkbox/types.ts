import React from "react";

export interface CheckboxProps {
  label?: React.ReactNode | string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  id?: string;
  name?: string;
}

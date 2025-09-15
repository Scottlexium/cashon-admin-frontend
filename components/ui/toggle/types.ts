export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  label?: string;
  description?: string;
  className?: string;
  id?: string;
}

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'default' | 'success' | 'warning' | 'danger';

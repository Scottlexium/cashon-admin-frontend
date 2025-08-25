// import { ChangeEvent, FormEvent, InputHTMLAttributes, ReactNode } from 'react';
// import type { InputVariant, InputSize } from './input';

// export type ValidationRule = {
//   type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
//   value?: string | number | RegExp;
//   message: string;
//   validator?: (value: string) => boolean;
// };

// export type ValidationRules = {
//   required?: boolean;
//   minLength?: number;
//   maxLength?: number;
//   pattern?: RegExp;
//   custom?: (value: string) => string | undefined;
// };

// export interface FormFieldProps {
//   label?: string;
//   name: string;
//   required?: boolean;
//   error?: string;
//   helperText?: string;
//   disabled?: boolean;
//   className?: string;
//   validationRules?: ValidationRule[];
//   onValidate?: (error: string | null) => void;
// }

// export const validateField = (
//   value: string,
//   rules: ValidationRule[]
// ): string | boolean => {
//   for (const rule of rules) {
//     switch (rule.type) {
//       case 'required':
//         if (!value || value.trim() === '') {
//           return rule.message;
//         }
//         break;
//       case 'email':
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           return rule.message;
//         }
//         break;
//       case 'minLength':
//         if (typeof rule.value === 'number' && value.length < rule.value) {
//           return rule.message;
//         }
//         break;
//       case 'maxLength':
//         if (typeof rule.value === 'number' && value.length > rule.value) {
//           return rule.message;
//         }
//         break;
//       case 'pattern':
//         if (rule.value instanceof RegExp && !rule.value.test(value)) {
//           return rule.message;
//         }
//         break;
//       case 'custom':
//         if (rule.validator && !rule.validator(value)) {
//           return rule.message;
//         }
//         break;
//     }
//   }
//   return false;
// };

// export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
//   label?: string;
//   error?: string | boolean;
//   helperText?: string;
//   validationRules?: ValidationRule[];
//   onValidate?: (error: string | boolean) => void;
//   leadingItem?: ReactNode;
//   trailingItem?: ReactNode;
//   variant?: InputVariant;
//   size?: InputSize;
//   loading?: boolean;
//   tooltip?: string;
// }

// export interface SelectFieldProps extends FormFieldProps {
//   options: Array<{
//     label: string;
//     value: string | number;
//   }>;
//   value?: string | number;
//   defaultValue?: { value: string | number; label: string } | Array<{ value: string | number; label: string }>;
//   onChange?: (selected: { value: string | number; label: string }) => void;
//   onSelectionChange?: (selected: Array<{ value: string | number; label: string }>) => void;
//   placeholder?: string;
//   isSearchable?: boolean;
//   isMultiSelect?: boolean;
//   showFlags?: boolean;
// }

// export interface TextAreaFieldProps extends FormFieldProps {
//   rows?: number;
//   placeholder?: string;
//   value?: string;
//   onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
// }

// export interface CheckboxFieldProps extends FormFieldProps {
//   checked?: boolean;
//   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// export interface RadioFieldProps extends FormFieldProps {
//   options: Array<{
//     label: string;
//     value: string | number;
//   }>;
//   value?: string | number;
//   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// export interface FormProps {
//   onSubmit: (e: FormEvent<HTMLFormElement>) => void;
//   children: React.ReactNode;
//   className?: string;
// }
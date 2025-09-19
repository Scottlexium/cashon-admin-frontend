import { cn } from '@/lib/utils';

export type DropdownPosition = 'top' | 'bottom';

interface DropdownClassesProps {
  position: DropdownPosition;
  className?: string;
  offset?: string;
}

export function getDropdownClasses({ 
  position, 
  className = '', 
  offset = 'mt-1' 
}: DropdownClassesProps): string {
  const baseClasses = 'absolute left-0 z-50 bg-[#1C1C1E] border border-[#313135BA] rounded-lg shadow-lg';
  
  const positionClasses = position === 'top' 
    ? 'bottom-full mb-1' 
    : `top-full ${offset}`;
  
  return cn(baseClasses, positionClasses, className);
}

export default getDropdownClasses;

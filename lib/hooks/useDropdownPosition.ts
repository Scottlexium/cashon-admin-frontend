'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

export type DropdownPosition = 'top' | 'bottom';

interface UseDropdownPositionProps {
  isOpen: boolean;
  triggerRef: RefObject<HTMLElement>;
  dropdownHeight?: number;
  offset?: number;
  minSpaceRequired?: number;
}

export function useDropdownPosition({
  isOpen,
  triggerRef,
  dropdownHeight = 300,
  offset = 8,
  minSpaceRequired = 50
}: UseDropdownPositionProps) {
  const [position, setPosition] = useState<DropdownPosition>('bottom');

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !isOpen) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const spaceBelow = viewportHeight - rect.bottom - offset;
    const spaceAbove = rect.top - offset;
    
    // Determine if we have enough space below
    const hasSpaceBelow = spaceBelow >= Math.min(dropdownHeight, minSpaceRequired);
    const hasSpaceAbove = spaceAbove >= Math.min(dropdownHeight, minSpaceRequired);
    
    // Prefer bottom placement if there's space, otherwise use top if there's more space above
    if (hasSpaceBelow || (!hasSpaceAbove && spaceBelow >= spaceAbove)) {
      setPosition('bottom');
    } else {
      setPosition('top');
    }
  }, [isOpen, triggerRef, dropdownHeight, offset, minSpaceRequired]);

  // Calculate position when dropdown opens or on window resize
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      // Recalculate on window resize
      const handleResize = () => calculatePosition();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, { passive: true });
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
      };
    }
  }, [isOpen, calculatePosition]);

  return {
    position,
    recalculate: calculatePosition
  };
}

export default useDropdownPosition;

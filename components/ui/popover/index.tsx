'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button/button';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  offset?: number;
  sideOffset?: number; // shadcn-style prop
  className?: string;
  contentClassName?: string;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  closeOnClickOutside?: boolean;
}

export function Popover({
  trigger,
  children,
  title,
  showCloseButton = true,
  placement = 'auto',
  offset = 8,
  sideOffset,
  className,
  contentClassName,
  onOpenChange,
  disabled = false,
  closeOnClickOutside = true
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Use sideOffset if provided, otherwise fall back to offset
  const actualOffset = sideOffset ?? offset;

  // Handle open/close with animation
  const openPopover = () => {
    if (disabled) return;
    setShouldRender(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 10);
    onOpenChange?.(true);
  };

  const closePopover = () => {
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => {
      setShouldRender(false);
      setIsAnimating(false);
    }, 200);
    onOpenChange?.(false);
  };

  const togglePopover = () => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };

  // Calculate position
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let finalPlacement = placement;
    let top = 0;
    let left = 0;

    // Auto placement logic
    if (placement === 'auto') {
      const spaceBelow = viewport.height - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const spaceRight = viewport.width - triggerRect.right;
      const spaceLeft = triggerRect.left;

      if (spaceBelow >= popoverRect.height + offset) {
        finalPlacement = 'bottom';
      } else if (spaceAbove >= popoverRect.height + offset) {
        finalPlacement = 'top';
      } else if (spaceRight >= popoverRect.width + offset) {
        finalPlacement = 'right';
      } else {
        finalPlacement = 'left';
      }
    }

    // Calculate position based on placement
    switch (finalPlacement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - actualOffset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + actualOffset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - actualOffset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + actualOffset;
        break;
    }

    // Ensure popover stays within viewport with shadcn-style margins
    const edgeMargin = 8; // shadcn uses smaller margins for more natural positioning
    left = Math.max(edgeMargin, Math.min(left, viewport.width - popoverRect.width - edgeMargin));
    top = Math.max(edgeMargin, Math.min(top, viewport.height - popoverRect.height - edgeMargin));

    // Set transform origin based on placement for natural animations
    let transformOrigin = 'center';
    switch (finalPlacement) {
      case 'top':
        transformOrigin = 'bottom center';
        break;
      case 'bottom':
        transformOrigin = 'top center';
        break;
      case 'left':
        transformOrigin = 'right center';
        break;
      case 'right':
        transformOrigin = 'left center';
        break;
    }

    setPosition({ top, left });
    if (finalPlacement !== 'auto') {
      setActualPlacement(finalPlacement);
    }

    // Update CSS custom property for transform origin
    if (popoverRef.current) {
      popoverRef.current.style.setProperty('--transform-origin', transformOrigin);
    }
  };

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Recalculate position when popover opens or window resizes
  useEffect(() => {
    if (shouldRender) {
      calculatePosition();
    }
  }, [shouldRender, isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [shouldRender]);

  return (
    <>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={togglePopover}
        className={cn("inline-block", className)}
      >
        {trigger}
      </div>

      {/* Popover Content */}
      {shouldRender && (
        <>
          {/* Backdrop */}
          <div
            className={cn(
              'fixed inset-0 bg-black/20 z-40 transition-opacity duration-200',
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={closePopover}
          />

          {/* Popover */}
          <div
            ref={popoverRef}
            className={cn(
              'fixed z-50 bg-[#1C1C1E] border border-[#313135] rounded-xl shadow-2xl transition-all duration-200 ease-out transform-gpu',
              'w-72 max-w-[calc(100vw-1rem)] max-h-[calc(100vh-1rem)] overflow-hidden',
              isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2',
              contentClassName
            )}
            style={{
              top: position.top,
              left: position.left,
              transformOrigin: 'var(--transform-origin, center)',
            }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-4 border-b border-[#313135]">
                {title && (
                  <h3 className="text-lg font-medium text-[#DEDEE3]">{title}</h3>
                )}
                {showCloseButton && (
                  <Button
                    onClick={closePopover}
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-[#2C2C2E] text-[#8C8C93] hover:text-[#DEDEE3] transition-all duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {children}
            </div>

            {/* Arrow indicator */}
            <div
              className={cn(
                'absolute w-2 h-2 bg-[#1C1C1E] border border-[#313135] rotate-45 z-[-1]',
                actualPlacement === 'top' && 'bottom-[-5px] left-1/2 transform -translate-x-1/2 border-t-0 border-l-0',
                actualPlacement === 'bottom' && 'top-[-5px] left-1/2 transform -translate-x-1/2 border-b-0 border-r-0',
                actualPlacement === 'left' && 'right-[-5px] top-1/2 transform -translate-y-1/2 border-l-0 border-b-0',
                actualPlacement === 'right' && 'left-[-5px] top-1/2 transform -translate-y-1/2 border-r-0 border-t-0'
              )}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Popover;

'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string | React.ReactNode;
  showCloseButton?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  size = 'md',
  className,
  overlayClassName,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Size variants
  const sizeClasses = {
    xs: 'max-w-xs w-full mx-4 sm:mx-0',
    sm: 'max-w-sm w-full mx-4 sm:mx-0',
    md: 'max-w-md w-full mx-4 sm:mx-0',
    lg: 'max-w-lg w-full mx-4 sm:mx-0',
    xl: 'max-w-xl w-full mx-4 sm:mx-0',
    '2xl': 'max-w-2xl w-full mx-4 sm:mx-0',
    '3xl': 'max-w-3xl w-full mx-4 sm:mx-0',
    '4xl': 'max-w-4xl w-full mx-4 sm:mx-0',
    '5xl': 'max-w-5xl w-full mx-4 sm:mx-0',
    '6xl': 'max-w-6xl w-full mx-4 sm:mx-0',
    full: 'max-w-full w-full m-2 sm:m-4',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity',
          overlayClassName
        )}
        onClick={handleOverlayClick}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative bg-[#1C1C1E] border border-[#313135BA] rounded-xl shadow-lg transition-all duration-200 ease-out transform',
          'animate-in fade-in-0 zoom-in-95',
          sizeClasses[size],
          'max-h-[95vh] sm:max-h-[90vh] overflow-hidden',
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-[#313135BA]">
            {title && (
              <div className={typeof title === 'string' ? "text-lg font-medium text-[#DEDEE3]" : "flex-1"}>
                {typeof title === 'string' ? (
                  <h2 className="text-lg font-medium text-[#DEDEE3]">{title}</h2>
                ) : (
                  <div className="flex items-center justify-between w-full pr-4">
                    {title}
                  </div>
                )}
              </div>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-[#313135BA] transition-colors text-[#8C8C93] hover:text-[#DEDEE3] flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';
import { TabItem } from './Tabs';
import { LucideIcon } from 'lucide-react';

// Helper function to create a lazy tab
export const createLazyTab = (
    id: string,
    label: string,
    importPath: () => Promise<{ default: React.ComponentType }>,
    options?: {
        icon?: LucideIcon;
        badge?: string | number;
        disabled?: boolean;
    }
): TabItem => ({
    id,
    label,
    content: importPath,
    lazy: true,
    ...options
});

// Helper function to create a regular content tab
export const createContentTab = (
    id: string,
    label: string,
    content: React.ReactNode | (() => React.ReactNode),
    options?: {
        icon?: LucideIcon;
        badge?: string | number;
        disabled?: boolean;
        lazy?: boolean;
    }
): TabItem => ({
    id,
    label,
    content,
    ...options
});

// Helper function to create inline component tabs
export const createInlineTab = (
    id: string,
    label: string,
    component: React.ComponentType,
    options?: {
        icon?: LucideIcon;
        badge?: string | number;
        disabled?: boolean;
        lazy?: boolean;
    }
): TabItem => ({
    id,
    label,
    content: React.createElement(component),
    ...options
});

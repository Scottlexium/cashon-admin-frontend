import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

export interface TabItem {
    id: string;
    label: string;
    icon?: LucideIcon;
    content?: React.ReactNode | (() => React.ReactNode) | (() => Promise<{ default: React.ComponentType }>);
    disabled?: boolean;
    badge?: string | number;
    href?: string; // Add href support for navigation
    lazy?: boolean; // Whether this tab should be lazy loaded
}

interface TabsProps {
    tabs: TabItem[];
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    defaultTab?: string;
    variant?: 'default' | 'pills' | 'underline' | 'toggle';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
    tabListClassName?: string;
    tabContentClassName?: string;
    renderContent?: (activeTab: string, tab: TabItem) => React.ReactNode;
    linkMode?: boolean; // New prop to determine if tabs should render as links
    lazyMode?: boolean; // Enable lazy loading for all tabs
    loadingComponent?: React.ReactNode; // Custom loading component
}

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab: controlledActiveTab,
    onTabChange,
    defaultTab,
    variant = 'default',
    size = 'md',
    fullWidth = false,
    className = '',
    tabListClassName = '',
    tabContentClassName = '',
    renderContent,
    linkMode = false,
    lazyMode = false,
    loadingComponent = <div className="flex items-center justify-center h-64"><div className="text-gray-400">Loading...</div></div>
}) => {
    const [internalActiveTab, setInternalActiveTab] = useState<string>(
        controlledActiveTab || defaultTab || tabs[0]?.id || ''
    );

    // State for animated border
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    // State for lazy loading
    const [mountedTabs, setMountedTabs] = useState<Set<string>>(
        new Set(lazyMode ? [controlledActiveTab || defaultTab || tabs[0]?.id] : tabs.map(tab => tab.id))
    );
    const [loadedComponents, setLoadedComponents] = useState<{ [key: string]: React.ComponentType }>({});

    const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

    useEffect(() => {
        if (controlledActiveTab !== undefined) {
            setInternalActiveTab(controlledActiveTab);
        }
    }, [controlledActiveTab]);

    // Update indicator position when active tab changes
    useEffect(() => {
        const updateIndicator = () => {
            const activeTabElement = tabRefs.current[activeTab];
            if (activeTabElement && (variant === 'default' || variant === 'underline')) {
                const rect = activeTabElement.getBoundingClientRect();
                const parentRect = activeTabElement.parentElement?.getBoundingClientRect();

                if (parentRect) {
                    setIndicatorStyle({
                        left: rect.left - parentRect.left,
                        width: rect.width
                    });
                }
            }
        };

        // Small delay to ensure DOM is updated
        const timer = setTimeout(updateIndicator, 50);
        return () => clearTimeout(timer);
    }, [activeTab, variant, tabs]);

    // Handle window resize to recalculate indicator position
    useEffect(() => {
        const handleResize = () => {
            const activeTabElement = tabRefs.current[activeTab];
            if (activeTabElement && (variant === 'default' || variant === 'underline')) {
                const rect = activeTabElement.getBoundingClientRect();
                const parentRect = activeTabElement.parentElement?.getBoundingClientRect();

                if (parentRect) {
                    setIndicatorStyle({
                        left: rect.left - parentRect.left,
                        width: rect.width
                    });
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeTab, variant]);

    const handleTabChange = async (tabId: string) => {
        const tab = tabs.find(t => t.id === tabId);
        if (tab?.disabled) return;

        // Handle lazy loading if enabled
        if (lazyMode || tab?.lazy) {
            setMountedTabs(prev => new Set([...prev, tabId]));
            
            // If content is a function that returns a promise (lazy import), load it
            if (typeof tab?.content === 'function' && !loadedComponents[tabId]) {
                try {
                    const result = await (tab.content as () => Promise<{ default: React.ComponentType }>)();
                    setLoadedComponents(prev => ({ ...prev, [tabId]: result.default }));
                } catch (error) {
                    console.error(`Failed to load component for tab ${tabId}:`, error);
                }
            }
        }

        if (controlledActiveTab === undefined) {
            setInternalActiveTab(tabId);
        }
        onTabChange?.(tabId);
    };

    // Helper function to render tab content
    const renderTabContent = () => {
        const currentTab = tabs.find(tab => tab.id === activeTab);
        if (!currentTab) return null;

        // Check if tab should be mounted (for lazy loading)
        if ((lazyMode || currentTab.lazy) && !mountedTabs.has(activeTab)) {
            return null;
        }

        // Use custom render function if provided
        if (renderContent) {
            return renderContent(activeTab, currentTab);
        }

        // Handle different types of content
        if (loadedComponents[activeTab]) {
            const Component = loadedComponents[activeTab];
            return <Component />;
        }

        if (typeof currentTab.content === 'function') {
            // If it's a function that returns ReactNode (not a promise)
            if (currentTab.content.constructor.name === 'AsyncFunction') {
                // This is an async function (lazy import), show loading
                return loadingComponent;
            } else {
                // This is a regular function that returns ReactNode
                return (currentTab.content as () => React.ReactNode)();
            }
        }

        // Regular ReactNode content
        return currentTab.content;
    };

    const getTabStyles = () => {
        const baseStyles = 'flex items-center gap-2 font-medium transition-all duration-300 focus:outline-none relative';

        const sizeStyles = {
            sm: 'px-3 py-1 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-4 text-base'
        };

        const variantStyles = {
            default: {
                inactive: 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-t-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#01AB79]/20 focus-visible:ring-offset-1',
                active: 'text-[#01AB79] bg-[#01AB79]/5 rounded-t-lg font-semibold'
            },
            pills: {
                inactive: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#01AB79]/20 focus-visible:ring-offset-1',
                active: 'text-[#01AB79] bg-[#01AB79]/10 rounded-lg font-semibold border border-[#01AB79]/20'
            },
            underline: {
                inactive: 'text-gray-600 hover:text-gray-800 pb-3 hover:bg-gray-50/50 rounded-t transition-colors focus-visible:ring-2 focus-visible:ring-[#01AB79]/20 focus-visible:ring-offset-1',
                active: 'text-[#01AB79] pb-3 font-semibold'
            },
            toggle: {
                inactive: 'text-[#8C8C93] hover:text-[#DEDEE3] rounded-md transition-colors px-4 py-2.5',
                active: 'bg-[#DEDEE3] text-[#1C1C1E] rounded-md font-medium px-4 py-2.5'
            }
        };

        return {
            base: baseStyles,
            size: sizeStyles[size],
            variant: variantStyles[variant]
        };
    };

    const getTabListStyles = () => {
        const baseStyles = 'flex relative';

        const variantStyles = {
            default: 'bg-white',
            pills: 'bg-gray-100 p-1 rounded-lg',
            underline: '',
            toggle: 'bg-[#2C2C2E] p-1 rounded-lg gap-1'
        };

        const widthStyles = fullWidth ? 'w-full' : '';
        const spacingStyles = variant === 'pills' || variant === 'toggle' ? 'space-x-1' : 'space-x-0';

        return `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${spacingStyles} ${tabListClassName}`;
    };

    const styles = getTabStyles();
    const currentTab = tabs.find(tab => tab.id === activeTab);

    return (
        <div className={`${className}`}>
            {/* Tab List */}
            <nav className={getTabListStyles()} aria-label="Tabs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isDisabled = tab.disabled;

                    const tabClassName = `
                        ${styles.base}
                        ${styles.size}
                        ${isActive ? styles.variant.active : styles.variant.inactive}
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        ${fullWidth ? 'flex-1 justify-center' : ''}
                    `.trim();

                    const tabContent = (
                        <>
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{tab.label}</span>
                            {tab.badge && (
                                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                    {tab.badge}
                                </span>
                            )}
                        </>
                    );

                    // Render as Link if linkMode is true and href is provided
                    if (linkMode && tab.href) {
                        return (
                            <Link
                                key={tab.id}
                                href={tab.href}
                                className={tabClassName}
                                ref={(el) => {
                                    tabRefs.current[tab.id] = el as any;
                                }}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${tab.id}`}
                            >
                                {tabContent}
                            </Link>
                        );
                    }

                    // Render as button for content mode
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => {
                                tabRefs.current[tab.id] = el;
                            }}
                            onClick={() => handleTabChange(tab.id)}
                            className={tabClassName}
                            disabled={isDisabled}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.id}`}
                        >
                            {tabContent}
                        </button>
                    );
                })}

                {/* Animated indicator for default and underline variants */}
                {(variant === 'default' || variant === 'underline') && indicatorStyle.width > 0 && (
                    <div
                        className={`absolute transition-all duration-300 ease-out ${variant === 'default'
                            ? 'bottom-0 h-0.5 bg-gradient-to-r from-[#01AB79] to-[#018a61] rounded-full shadow-sm'
                            : 'bottom-0 h-0.5 bg-gradient-to-r from-[#01AB79] to-[#018a61] rounded-full shadow-sm'
                            }`}
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            boxShadow: '0 0 8px rgba(1, 171, 121, 0.3)'
                        }}
                    />
                )}
            </nav>

            {/* Tab Content - Only render if not in link mode */}
            {!linkMode && (
                <div
                    className={`mt-6 ${tabContentClassName}`}
                    role="tabpanel"
                    id={`panel-${activeTab}`}
                    aria-labelledby={`tab-${activeTab}`}
                >
                    <Suspense fallback={loadingComponent}>
                        {renderTabContent()}
                    </Suspense>
                </div>
            )}
        </div>
    );
};

'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Tabs } from '@/components/ui/tabs';

interface GrowthLayoutProps {
    children: React.ReactNode;
}

const GrowthLayout: React.FC<GrowthLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    
    // Extract the active tab from the pathname
    const getActiveTab = () => {
        if (pathname.includes('/campaigns')) return 'campaigns';
        if (pathname.includes('/automations')) return 'automations';
        return 'segmentations'; // default
    };

    const tabs = [
        {
            id: 'segmentations',
            label: 'Segmentations',
            href: '/dashboard/growth/segmentations'
        },
        {
            id: 'campaigns',
            label: 'Campaigns',
            href: '/dashboard/growth/campaigns'
        },
        {
            id: 'automations',
            label: 'Automations',
            href: '/dashboard/growth/automations'
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="px-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-medium text-[#A2A2A7] mb-2">Growth</h1>
                    <p className="text-[#A2A2A780]">Segment users, send campaigns, set track engagement.</p>
                </div>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={getActiveTab()}
                    linkMode={true}
                    variant="underline"
                    className="border-b border-[#313135BA]"
                />
            </div>

            {/* Tab Content */}
            <div className="px-6">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-64">
                        <div className="text-[#8C8C93]">Loading...</div>
                    </div>
                }>
                    {children}
                </Suspense>
            </div>
        </div>
    );
};

export default GrowthLayout;

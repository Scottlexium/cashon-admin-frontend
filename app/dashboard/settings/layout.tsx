'use client';

import React, { Suspense, lazy } from 'react';
import { Tabs } from '@/components/ui/tabs';

// Lazy load components
const SystemConfigurationsPage = lazy(() => import('./(TABS)/system-configurations/page'));
const ScheduleTasksPage = lazy(() => import('./(TABS)/schedule-tasks/page'));
const TeamsPermissionsPage = lazy(() => import('./(TABS)/teams-permissions/page'));
const FeeExceptionsPage = lazy(() => import('./(TABS)/fee-exceptions/page'));

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
    const tabs = [
        {
            id: 'system-configurations',
            label: 'System Configurations',
            content: () => <SystemConfigurationsPage />
        },
        {
            id: 'schedule-tasks',
            label: 'Schedule Tasks',
            content: () => <ScheduleTasksPage />
        },
        {
            id: 'teams-permissions',
            label: 'Teams & Permissions',
            content: () => <TeamsPermissionsPage />
        },
        {
            id: 'fee-exceptions',
            label: 'Fee Exceptions',
            content: () => <FeeExceptionsPage />
        }
    ];

    return (
        <div className="space-y-6 px-6">
            {/* Page Header */}
            <div className="px-6">
                <div className="my-6 mb-10">
                    <h1 className="text-2xl font-semibold text-[#DEDEE3] mb-2">Settings</h1>
                    <p className="text-[#8C8C93]">Manage system configurations, tasks, teams, and fee exceptions.</p>
                </div>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    defaultTab="system-configurations"
                    variant="underline"
                    className="border-b border-[#313135BA]"
                />
            </div>
        </div>
    );
};

export default SettingsLayout;

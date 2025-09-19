"use client";
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Select } from '@/components/ui/select';
import { TimePicker } from '@/components/ui/calendar/time-picker';

const ScheduleTasksPage = () => {
    const [schedules, setSchedules] = useState({
        boostPayout: {
            frequency: 'daily',
            time: '09:00'
        },
        interestCrediting: {
            frequency: 'daily',
            time: '09:00'
        },
        inactivityNotifications: {
            frequency: 'weekly',
            time: '09:00'
        }
    });

    // Mock data for task queue
    const taskQueueData = [
        {
            id: '1',
            taskName: 'Boost Payout Processing',
            nextRun: '2025-01-18 09:00',
            kycStatus: 'Idle',
            lastRun: '2025-01-18 06:00',
            avgDuration: '12m 34s',
            actions: 'Play/Stop'
        },
        {
            id: '2',
            taskName: 'Interest Crediting',
            nextRun: '2025-01-18 00:30',
            kycStatus: 'Queued',
            lastRun: '2025-01-18 00:30',
            avgDuration: '8m 15s',
            actions: 'Play/Stop'
        },
        {
            id: '3',
            taskName: 'Inactivity Notifications',
            nextRun: '2025-01-18 00:30',
            kycStatus: 'Idle',
            lastRun: '2025-01-18 12:15',
            avgDuration: '3m 42s',
            actions: 'Play/Stop'
        },
        {
            id: '4',
            taskName: 'Data Backup',
            nextRun: '2025-01-18 00:30',
            kycStatus: 'Running',
            lastRun: '2025-01-18 18:45',
            avgDuration: '45m 18s',
            actions: 'Play/Stop'
        }
    ];

    // Mock data for job history
    const jobHistoryData = [
        {
            id: '1',
            jobId: 'job_20250118_000001',
            taskName: 'Boost Payout Processing',
            startedAt: '2025-01-18 09:00',
            endedAt: '2025-01-18 09:09',
            kycStatus: 'Idle',
            duration: '12m 34s',
            logs: 'View'
        },
        {
            id: '2',
            jobId: 'job_20250118_000001',
            taskName: 'Interest Crediting',
            startedAt: '2025-01-18 00:30',
            endedAt: '2025-01-18 00:30',
            kycStatus: 'Queued',
            duration: '8m 15s',
            logs: 'View'
        },
        {
            id: '3',
            jobId: 'job_20250114_000001',
            taskName: 'Boost Payout Processing',
            startedAt: '2025-01-15 12:15',
            endedAt: '2025-01-15 12:15',
            kycStatus: 'Idle',
            duration: '3m 42s',
            logs: 'View'
        }
    ];

    const taskQueueColumns: TableColumn[] = [
        {
            key: 'taskName',
            header: 'TASK NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.taskName}</span>
            )
        },
        {
            key: 'nextRun',
            header: 'NEXT RUN',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.nextRun}</span>
            )
        },
        {
            key: 'kycStatus',
            header: 'KYC STATUS',
            sortable: true,
            render: (value: string, row: any) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'Idle':
                            return 'text-gray-400';
                        case 'Queued':
                            return 'text-yellow-400';
                        case 'Running':
                            return 'text-green-400';
                        default:
                            return 'text-gray-400';
                    }
                };

                const getStatusDot = (status: string) => {
                    switch (status) {
                        case 'Idle':
                            return 'bg-gray-400';
                        case 'Queued':
                            return 'bg-yellow-400';
                        case 'Running':
                            return 'bg-green-400';
                        default:
                            return 'bg-gray-400';
                    }
                };

                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(row.kycStatus)}`}></div>
                        <span className={`font-medium ${getStatusColor(row.kycStatus)}`}>
                            {row.kycStatus}
                        </span>
                    </div>
                );
            }
        },
        {
            key: 'lastRun',
            header: 'LAST RUN',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.lastRun}</span>
            )
        },
        {
            key: 'avgDuration',
            header: 'AVG DURATION',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.avgDuration}</span>
            )
        },
        {
            key: 'actions',
            header: 'ACTIONS',
            sortable: false,
            render: (value: any, row: any) => (
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-[#3A3C3E] rounded">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4876 6.8094L2.35695 0.612757C2.1445 0.48324 1.90149 0.412411 1.65272 0.407501C1.40395 0.40259 1.15833 0.463772 0.940929 0.584803C0.723531 0.705835 0.542137 0.882381 0.415263 1.09642C0.288389 1.31046 0.220578 1.55434 0.21875 1.80315V14.1964C0.220578 14.4452 0.288389 14.6891 0.415263 14.9032C0.542137 15.1172 0.723531 15.2937 0.940929 15.4148C1.15833 15.5358 1.40395 15.597 1.65272 15.5921C1.90149 15.5872 2.1445 15.5163 2.35695 15.3868L12.4876 9.19018C12.6919 9.06583 12.8607 8.89101 12.9779 8.68253C13.095 8.47405 13.1566 8.23893 13.1566 7.99979C13.1566 7.76064 13.095 7.52552 12.9779 7.31704C12.8607 7.10857 12.6919 6.93374 12.4876 6.8094ZM1.90625 13.6846V2.31502L11.1988 7.99979L1.90625 13.6846Z" fill="#8C8C93" />
                        </svg>

                    </button>
                    <button className="p-1 hover:bg-[#3A3C3E] rounded">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0625 0.96875H9.25C8.87704 0.96875 8.51935 1.11691 8.25563 1.38063C7.99191 1.64435 7.84375 2.00204 7.84375 2.375V13.625C7.84375 13.998 7.99191 14.3556 8.25563 14.6194C8.51935 14.8831 8.87704 15.0312 9.25 15.0312H12.0625C12.4355 15.0312 12.7931 14.8831 13.0569 14.6194C13.3206 14.3556 13.4688 13.998 13.4688 13.625V2.375C13.4688 2.00204 13.3206 1.64435 13.0569 1.38063C12.7931 1.11691 12.4355 0.96875 12.0625 0.96875ZM11.7812 13.3438H9.53125V2.65625H11.7812V13.3438ZM4.75 0.96875H1.9375C1.56454 0.96875 1.20685 1.11691 0.943131 1.38063C0.679408 1.64435 0.53125 2.00204 0.53125 2.375V13.625C0.53125 13.998 0.679408 14.3556 0.943131 14.6194C1.20685 14.8831 1.56454 15.0312 1.9375 15.0312H4.75C5.12296 15.0312 5.48065 14.8831 5.74437 14.6194C6.00809 14.3556 6.15625 13.998 6.15625 13.625V2.375C6.15625 2.00204 6.00809 1.64435 5.74437 1.38063C5.48065 1.11691 5.12296 0.96875 4.75 0.96875ZM4.46875 13.3438H2.21875V2.65625H4.46875V13.3438Z" fill="#8C8C93" />
                        </svg>
                    </button>
                </div>
            )
        }
    ];

    const jobHistoryColumns: TableColumn[] = [
        {
            key: 'jobId',
            header: 'JOB ID',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93] font-mono text-sm">{row.jobId}</span>
            )
        },
        {
            key: 'taskName',
            header: 'TASK NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.taskName}</span>
            )
        },
        {
            key: 'startedAt',
            header: 'STARTED AT',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.startedAt}</span>
            )
        },
        {
            key: 'endedAt',
            header: 'STARTED AT',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.endedAt}</span>
            )
        },
        {
            key: 'kycStatus',
            header: 'KYC STATUS',
            sortable: true,
            render: (value: string, row: any) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'Idle':
                            return 'text-gray-400';
                        case 'Queued':
                            return 'text-yellow-400';
                        case 'Running':
                            return 'text-green-400';
                        default:
                            return 'text-gray-400';
                    }
                };

                const getStatusDot = (status: string) => {
                    switch (status) {
                        case 'Idle':
                            return 'bg-gray-400';
                        case 'Queued':
                            return 'bg-yellow-400';
                        case 'Running':
                            return 'bg-green-400';
                        default:
                            return 'bg-gray-400';
                    }
                };

                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(row.kycStatus)}`}></div>
                        <span className={`font-medium ${getStatusColor(row.kycStatus)}`}>
                            {row.kycStatus}
                        </span>
                    </div>
                );
            }
        },
        {
            key: 'duration',
            header: 'DURATION',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.duration}</span>
            )
        },
        {
            key: 'logs',
            header: 'LOGS',
            sortable: false,
            render: (value: any, row: any) => (
                <button className="p-1 hover:bg-[#3A3C3E] rounded">
                    <svg className="w-4 h-4 text-[#8C8C93] hover:text-[#DEDEE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </button>
            )
        }
    ];

    const frequencyOptions = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' }
    ];

    const handleScheduleChange = (scheduleType: string, field: string, value: string) => {
        setSchedules(prev => ({
            ...prev,
            [scheduleType]: {
                ...prev[scheduleType as keyof typeof prev],
                [field]: value
            }
        }));
    };

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Schedule Configuration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-5 max-w-4xl">
                {/* Boost Payout Schedule */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-base font-medium text-[#A2A2A7] mb-1">Boost Payout Schedule</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm text-[#8C8C93] mb-2">Frequency</label>
                            <Select
                                value={schedules.boostPayout.frequency}
                                onChange={(value) => handleScheduleChange('boostPayout', 'frequency', value as string)}
                                options={frequencyOptions}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-[#8C8C93] mb-2">Time</label>
                            <TimePicker
                                value={schedules.boostPayout.time}
                                onChange={(value) => handleScheduleChange('boostPayout', 'time', value)}
                                className="w-full"
                            />
                            <p className="text-xs text-[#8C8C93] mt-1">WAT (UTC+1)</p>
                        </div>
                    </div>
                </div>

                {/* Interest Crediting Schedule */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-base font-medium text-[#A2A2A7] mb-1">Interest Crediting Schedule</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm text-[#8C8C93] mb-2">Frequency</label>
                            <Select
                                value={schedules.interestCrediting.frequency}
                                onChange={(value) => handleScheduleChange('interestCrediting', 'frequency', value as string)}
                                options={frequencyOptions}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-[#8C8C93] mb-2">Time</label>
                            <TimePicker
                                value={schedules.interestCrediting.time}
                                onChange={(value) => handleScheduleChange('interestCrediting', 'time', value)}
                                className="w-full"
                            />
                            <p className="text-xs text-[#8C8C93] mt-1">WAT (UTC+1)</p>
                        </div>
                    </div>
                </div>

                {/* Inactivity Notifications */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-base font-medium text-[#A2A2A7] mb-1">Inactivity Notifications</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm text-[#8C8C93] mb-2">Frequency</label>
                            <Select
                                value={schedules.inactivityNotifications.frequency}
                                onChange={(value) => handleScheduleChange('inactivityNotifications', 'frequency', value as string)}
                                options={frequencyOptions}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-[#8C8C93] mb-2">Time</label>
                            <TimePicker
                                value={schedules.inactivityNotifications.time}
                                onChange={(value) => handleScheduleChange('inactivityNotifications', 'time', value)}
                                className="w-full"
                            />
                            <p className="text-xs text-[#8C8C93] mt-1">WAT (UTC+1)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Queue Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2 className="text-lg font-medium text-[#DEDEE3]">Task Queue</h2>
                </div>
                <div className="bg-[#1C1C1E] border border-[#313135BA] rounded-xl p-6">
                    <DataTable
                        data={taskQueueData}
                        columns={taskQueueColumns}
                        variant="dark"
                        className="border-none"
                    />
                </div>
            </div>

            {/* Job History Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-lg font-medium text-[#DEDEE3]">Job History</h2>
                </div>
                <div className="bg-[#1C1C1E] border border-[#313135BA] rounded-xl p-6">
                    <DataTable
                        data={jobHistoryData}
                        columns={jobHistoryColumns}
                        variant="dark"
                        className="border-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default ScheduleTasksPage;

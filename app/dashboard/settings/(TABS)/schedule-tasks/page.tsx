"use client";
import React, { useState, useEffect } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Select } from '@/components/ui/select';
import { TimePicker } from '@/components/ui/calendar/time-picker';
import api from '@/lib/api';

interface Task {
    id: number;
    key: string;
    name: string;
    frequency: string;
    run_time: string;
    timezone: string;
    status: string;
    next_run: string;
    last_run_at: string | null;
    avg_duration_seconds: number;
    created_at: string;
    updated_at: string;
}

const ScheduleTasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await api.get<Task[]>('/tasks');
                setTasks(response.data);
                
                // Update schedule configuration based on API data
                response.data.forEach(task => {
                    const time = task.run_time.substring(0, 5); // Extract HH:MM from HH:MM:SS
                    
                    if (task.key === 'boost_payout') {
                        setSchedules(prev => ({
                            ...prev,
                            boostPayout: {
                                frequency: task.frequency,
                                time: time
                            }
                        }));
                    } else if (task.key === 'interest_crediting') {
                        setSchedules(prev => ({
                            ...prev,
                            interestCrediting: {
                                frequency: task.frequency,
                                time: time
                            }
                        }));
                    } else if (task.key === 'inactivity_notifications') {
                        setSchedules(prev => ({
                            ...prev,
                            inactivityNotifications: {
                                frequency: task.frequency,
                                time: time
                            }
                        }));
                    }
                });
            
                console.log('Fetched tasks:', response.data);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching tasks:', err);
                setError(err.message || 'Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Helper function to format duration from seconds
    const formatDuration = (seconds: number): string => {
        if (seconds === 0) return 'N/A';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Helper function to format date
    const formatDate = (dateString: string | null): string => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

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

    const taskQueueColumns: TableColumn<Task>[] = [
        {
            key: 'name',
            header: 'TASK NAME',
            sortable: true,
            render: (value: any, row: Task) => (
                <span className="text-[#DEDEE3] font-medium">{row.name}</span>
            )
        },
        {
            key: 'next_run',
            header: 'NEXT RUN',
            sortable: true,
            render: (value: any, row: Task) => (
                <span className="text-[#DEDEE3]">{formatDate(row.next_run)}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: string, row: Task) => {
                const status = row.status || 'idle';
                const getStatusColor = (status: string) => {
                    switch (status.toLowerCase()) {
                        case 'idle':
                            return 'text-gray-400';
                        case 'queued':
                            return 'text-yellow-400';
                        case 'running':
                            return 'text-green-400';
                        default:
                            return 'text-gray-400';
                    }
                };

                const getStatusDot = (status: string) => {
                    switch (status.toLowerCase()) {
                        case 'idle':
                            return 'bg-gray-400';
                        case 'queued':
                            return 'bg-yellow-400';
                        case 'running':
                            return 'bg-green-400';
                        default:
                            return 'bg-gray-400';
                    }
                };

                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(status)}`}></div>
                        <span className={`font-medium capitalize ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    </div>
                );
            }
        },
        {
            key: 'last_run_at',
            header: 'LAST RUN',
            sortable: true,
            render: (value: any, row: Task) => (
                <span className="text-[#8C8C93]">{formatDate(row.last_run_at)}</span>
            )
        },
        {
            key: 'avg_duration_seconds',
            header: 'AVG DURATION',
            sortable: true,
            render: (value: any, row: Task) => (
                <span className="text-[#DEDEE3]">{formatDuration(row.avg_duration_seconds)}</span>
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
            header: 'ENDED AT',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.endedAt}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: string, row: any) => {
                const status = row.status || row.kycStatus || 'idle';
                const getStatusColor = (status: string) => {
                    switch (status.toLowerCase()) {
                        case 'idle':
                            return 'text-gray-400';
                        case 'queued':
                            return 'text-yellow-400';
                        case 'running':
                            return 'text-green-400';
                        case 'completed':
                            return 'text-blue-400';
                        case 'failed':
                            return 'text-red-400';
                        default:
                            return 'text-gray-400';
                    }
                };

                const getStatusDot = (status: string) => {
                    switch (status.toLowerCase()) {
                        case 'idle':
                            return 'bg-gray-400';
                        case 'queued':
                            return 'bg-yellow-400';
                        case 'running':
                            return 'bg-green-400';
                        case 'completed':
                            return 'bg-blue-400';
                        case 'failed':
                            return 'bg-red-400';
                        default:
                            return 'bg-gray-400';
                    }
                };

                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(status)}`}></div>
                        <span className={`font-medium capitalize ${getStatusColor(status)}`}>
                            {status}
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

    const handleScheduleChange = async (scheduleType: string, field: string, value: string) => {
        // Update local state immediately
        setSchedules(prev => ({
            ...prev,
            [scheduleType]: {
                ...prev[scheduleType as keyof typeof prev],
                [field]: value
            }
        }));

        // Map schedule type to task key
        const taskKeyMap: Record<string, string> = {
            'boostPayout': 'boost_payout',
            'interestCrediting': 'interest_crediting',
            'inactivityNotifications': 'inactivity_notifications'
        };

        const taskKey = taskKeyMap[scheduleType];
        if (!taskKey) return;

        // Get current schedule values
        const currentSchedule = {
            ...schedules[scheduleType as keyof typeof schedules],
            [field]: value
        };

        // Prepare payload
        const payload = {
            frequency: currentSchedule.frequency,
            run_time: `${currentSchedule.time}:00`, // Convert HH:MM to HH:MM:SS
            timezone: 'Africa/Lagos'
        };

        try {
            await api.put(`/tasks/${taskKey}/schedule`, payload);
            console.log(`Updated schedule for ${taskKey}:`, payload);
            
            // Optionally refresh tasks to get updated data
            const response = await api.get<Task[]>('/tasks');
            setTasks(response.data);
        } catch (err: any) {
            console.error(`Error updating schedule for ${taskKey}:`, err);
            setError(err.message || 'Failed to update schedule');
        }
    };

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center p-8">
                    <div className="text-[#8C8C93]">Loading tasks...</div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Content - Only show when not loading */}
            {!loading && (
                <>
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
                        data={tasks}
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
                </>
            )}
        </div>
    );
};

export default ScheduleTasksPage;

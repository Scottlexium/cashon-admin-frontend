"use client";
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio';
import Badge from '@/components/ui/badge';
import { SingleDatePicker } from '@/components/ui/calendar/single-date-picker';
import { TimePicker } from '@/components/ui/calendar/time-picker';
import { Toggle } from '@/components/ui/toggle';

const AutomationsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAutomation, setSelectedAutomation] = useState<any>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form data for automation creation
    const [automationFormData, setAutomationFormData] = useState({
        automationName: '',
        triggerType: 'user-action',
        triggerCondition: '',
        channel: 'push-notification',
        messageSubject: '',
        messageBody: '',
        targetSegment: '',
        scheduleDelay: '0',
        delayUnit: 'minutes'
    });

    // Automations data based on the screenshot
    const automationsData = [
        {
            id: '1',
            automationName: 'August Boost Promo',
            triggered: 245,
            channel: 'Push Notification',
            successRate: '15.6%',
            status: 'Success',
            triggeredBy: 'Plan Maturity',
            dateCreated: '08 Aug 2025, 14:32',
            messageTitle: 'Boost Promo Available',
            messageContent: '🎯 Your savings plan has matured! Upgrade to our Boost program for higher returns.',
            triggerConditions: {
                type: 'Plan Maturity',
                criteria: 'When savings plan reaches maturity date'
            }
        },
        {
            id: '2',
            automationName: 'Dormant Reactivation',
            triggered: 23,
            channel: 'Email',
            successRate: '8.9%',
            status: 'Success',
            triggeredBy: 'Inactivity > 14 Days',
            dateCreated: '15 Jul 2025, 09:15',
            messageTitle: 'We Miss You',
            messageContent: '💸 Come back and continue growing your savings. Check out what\'s new!',
            triggerConditions: {
                type: 'User Inactivity',
                criteria: 'No login or transaction for 14 days'
            }
        },
        {
            id: '3',
            automationName: 'KYC Completion',
            triggered: 289,
            channel: 'SMS',
            successRate: '10.2%',
            status: 'Success',
            triggeredBy: 'KYC Approved',
            dateCreated: '20 Jun 2025, 16:45',
            messageTitle: 'Account Verified',
            messageContent: '✅ Your account is now verified! Start earning with our premium features.',
            triggerConditions: {
                type: 'KYC Status Change',
                criteria: 'When KYC status changes to approved'
            }
        },
        {
            id: '4',
            automationName: 'Savings Anniversary',
            triggered: 109,
            channel: 'Push Notification',
            successRate: '12.5%',
            status: 'Success',
            triggeredBy: 'Boost Allocation',
            dateCreated: '10 May 2025, 11:20',
            messageTitle: 'Anniversary Celebration',
            messageContent: '🎉 It\'s your savings anniversary! Enjoy special rates on all products.',
            triggerConditions: {
                type: 'Account Anniversary',
                criteria: 'One year since account creation'
            }
        },
        {
            id: '5',
            automationName: 'High Value Reminder',
            triggered: 573,
            channel: 'SMS',
            successRate: '9.7%',
            status: 'Failed',
            triggeredBy: 'Deposit',
            dateCreated: '02 Apr 2025, 13:55',
            messageTitle: 'High Value Alert',
            messageContent: '💰 Large deposit detected! Consider our investment options for better returns.',
            triggerConditions: {
                type: 'Transaction Amount',
                criteria: 'Deposit amount > $10,000'
            }
        }
    ];

    // Table columns for automations
    const columns: TableColumn[] = [
        {
            key: 'automationName',
            header: 'AUTOMATION NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.automationName}</span>
            )
        },
        {
            key: 'triggered',
            header: 'TRIGGERED',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.triggered}</span>
            )
        },
        {
            key: 'channel',
            header: 'CHANNEL',
            sortable: false,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.channel}</span>
            )
        },
        {
            key: 'successRate',
            header: 'SUCCESS RATE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#00FFB3] font-medium">{row.successRate}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: string, row: any) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${row.status === 'Success' ? 'bg-[#00FFB3]' : 'bg-[#FF453A]'}`}></div>
                    <span className={`font-medium ${row.status === 'Success' ? 'text-[#00FFB3]' : 'text-[#FF453A]'}`}>
                        {row.status}
                    </span>
                </div>
            )
        },
        {
            key: 'triggeredBy',
            header: 'TRIGGERED BY',
            sortable: false,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.triggeredBy}</span>
            )
        }
    ];

    const handleRowClick = (automation: any) => {
        setSelectedAutomation(automation);
        setIsDetailsModalOpen(true);
    };

    const handleCreateAutomation = () => {
        setIsCreateModalOpen(true);
    };

    const handleFormInputChange = (key: string, value: any) => {
        setAutomationFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleCreateSubmit = () => {
        console.log('Creating automation:', automationFormData);
        setIsCreateModalOpen(false);
        // Reset form
        setAutomationFormData({
            automationName: '',
            triggerType: 'user-action',
            triggerCondition: '',
            channel: 'push-notification',
            messageSubject: '',
            messageBody: '',
            targetSegment: '',
            scheduleDelay: '0',
            delayUnit: 'minutes'
        });
    };

    // Filter automations based on search query
    const filteredAutomations = automationsData.filter(automation =>
        automation.automationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Automations Table */}
            <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                {/* Table Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-[#DEDEE3]">Recent Campaigns</h2>
                        </div>
                    </div>

                    {/* Right side - Search and Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="w-full sm:w-64">
                            <Input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size="sm"
                                variant="filled"
                                trailingIcon={
                                    <svg className="w-4 h-4 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                                className="text-white placeholder-[#8C8C93]"
                            />
                        </div>

                        {/* Filter Button */}
                        <Button
                            variant="secondary"
                            size="sm"
                            className="px-3 py-2 bg-[#303033] border-[#363639] hover:bg-[#404044]"
                        >
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.8335 18V15.5" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1665 18V13" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1665 5.5V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.8335 8V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.8335 15.5C5.05693 15.5 4.66865 15.5 4.36235 15.3732C3.95398 15.204 3.62952 14.8795 3.46036 14.4712C3.3335 14.1648 3.3335 13.7766 3.3335 13C3.3335 12.2234 3.3335 11.8352 3.46036 11.5288C3.62952 11.1205 3.95398 10.796 4.36235 10.6268C4.66865 10.5 5.05693 10.5 5.8335 10.5C6.61006 10.5 6.99835 10.5 7.30464 10.6268C7.71301 10.796 8.03747 11.1205 8.20663 11.5288C8.3335 11.8352 8.3335 12.2234 8.3335 13C8.3335 13.7766 8.3335 14.1648 8.20663 14.4712C8.03747 14.8795 7.71301 15.204 7.30464 15.3732C6.99835 15.5 6.61006 15.5 5.8335 15.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
                                <path d="M14.1665 10.5C13.3899 10.5 13.0017 10.5 12.6953 10.3732C12.287 10.204 11.9625 9.8795 11.7933 9.47117C11.6665 9.16483 11.6665 8.77657 11.6665 8C11.6665 7.22343 11.6665 6.83515 11.7933 6.52886C11.9625 6.12048 12.287 5.79602 12.6953 5.62687C13.0017 5.5 13.3899 5.5 14.1665 5.5C14.9431 5.5 15.3313 5.5 15.6377 5.62687C16.046 5.79602 16.3705 6.12048 16.5397 6.52886C16.6665 6.83515 16.6665 7.22343 16.6665 8C16.6665 8.77657 16.6665 9.16483 16.5397 9.47117C16.3705 9.8795 16.046 10.204 15.6377 10.3732C15.3313 10.5 14.9431 10.5 14.1665 10.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
                            </svg>
                        </Button>

                        {/* New Automation Button */}
                        <Button
                            size="sm"
                            variant='secondary'
                            onClick={handleCreateAutomation}
                            className="px-4 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Automation
                        </Button>
                    </div>
                </div>

                {/* Table */}
                {filteredAutomations.length > 0 ? (
                    <DataTable
                        data={filteredAutomations}
                        columns={columns}
                        onRowClick={handleRowClick}
                        variant="dark"
                        className="animate-in fade-in duration-700 delay-400 border-none"
                    />
                ) : (
                    <div className="text-center py-12 px-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#303033] rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-[#DEDEE3] mb-2">
                            {searchQuery ? 'No Automations Found' : 'No Automations Yet'}
                        </h3>
                        <p className="text-[#8C8C93] mb-6">
                            {searchQuery
                                ? 'No automations match your search criteria. Try adjusting your search or create a new automation.'
                                : 'Set up automated workflows and triggers for user engagement.'
                            }
                        </p>
                        <Button onClick={handleCreateAutomation}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Automation
                        </Button>
                    </div>
                )}
            </div>

            {/* Automation Details Modal */}
            <Modal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                title={
                    <>
                        <h2 className="text-lg font-semibold text-[#8C8C93]">
                            {selectedAutomation?.automationName}
                        </h2>
                        <div className="flex items-center gap-3">
                            <Toggle
                                checked={selectedAutomation?.enabled || true}
                                onChange={() => {
                                    console.log('Toggle automation')
                                }}
                                size="sm"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 text-[#8C8CA1] hover:text-[#DEDEE3] bg-[#303033] hover:bg-[#313135BA] cursor-pointer"
                            >
                                Edit
                            </Button>
                        </div>
                    </>
                }
                size="2xl"
                className='w-full'
            >
                {selectedAutomation && (
                    <div className="p-6 space-y-6">
                        {/* Campaign Details Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-xs bg-[#3AACFF]"></div>
                                <h4 className="font-medium text-[#DEDEE3]">Campaign Details</h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Trigger Condition</label>
                                    <p className="text-[#8C8C93] font-semibold">{selectedAutomation.triggeredBy}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Channel</label>
                                    <p className="text-[#8C8C93] font-semibold">{selectedAutomation.channel}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Segment</label>
                                    <p className="text-[#8C8C93] font-semibold">Dormant Users</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Sent Date</label>
                                    <p className="text-[#8C8C93] font-semibold">{selectedAutomation.dateCreated.split(',')[0]}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm text-[#8C8C93CC]">Status</label>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${selectedAutomation.status === 'Success' ? 'bg-[#05B480]' : 'bg-[#FF453A]'}`}></div>
                                    <span className={`font-medium ${selectedAutomation.status === 'Success' ? 'text-[#05B480]' : 'text-[#FF453A]'}`}>
                                        {selectedAutomation.status === 'Success' ? 'Completed' : 'Failed'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="py-4">
                            <div className="border-t border-[#313135BA]"></div>
                        </div>

                        {/* Message Content Section */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-[#8C8C93CC] text-base">Message Content</h4>
                            <div className="bg-[#303033] rounded-lg p-4 space-y-3">
                                <div>
                                    <h5 className="font-medium text-[#DEDEE3CC] mb-2">{selectedAutomation.messageTitle}</h5>
                                    <p className="text-[#8C8C93CC]">{selectedAutomation.messageContent}</p>
                                </div>
                            </div>
                        </div>

                        {/* Performance Metrics Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-xs bg-[#E697FF] font-semibold"></div>
                                <h4 className="font-medium text-[#8C8C93]">Performance Metrics</h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Total Triggered</label>
                                    <p className="text-[#8C8C93] font-semibold">{selectedAutomation.triggered.toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Delivered</label>
                                    <p className="text-[#8C8C93] font-semibold">{Math.floor(selectedAutomation.triggered * 0.98).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">Opened</label>
                                    <p className="text-[#8C8C93] font-semibold">{Math.floor(selectedAutomation.triggered * 0.85).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8C8C93CC] font-medium mb-1">CTR</label>
                                    <p className="text-[#00FFB3] font-medium">{selectedAutomation.successRate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Create Automation Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create new automation"
                size="lg"
                className="w-full"
            >
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Automation Name</label>
                        <Input
                            placeholder="Enter automation name"
                            value={automationFormData.automationName}
                            onChange={(e) => handleFormInputChange('automationName', e.target.value)}
                            className="text-[#DEDEE3] placeholder-[#8C8C93] w-full"
                            variant='filled'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Trigger Event</label>
                        <Select
                            placeholder="Select trigger event"
                            value={automationFormData.triggerType}
                            onChange={(value) => handleFormInputChange('triggerType', value)}
                            options={[
                                { value: 'user-signup', label: 'User Signup' },
                                { value: 'plan-maturity', label: 'Plan Maturity' },
                                { value: 'deposit', label: 'Deposit Made' },
                                { value: 'kyc-approved', label: 'KYC Approved' },
                                { value: 'inactivity', label: 'User Inactivity' },
                                { value: 'boost-allocation', label: 'Boost Allocation' }
                            ]}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-3">Channel</label>
                        <RadioGroup
                            name="channel"
                            value={automationFormData.channel}
                            onChange={(value) => handleFormInputChange('channel', value)}
                            options={[
                                {
                                    value: 'email',
                                    label: 'Email',
                                    icon: (
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_2340_3226)">
                                                <path d="M2.5 6.33366C2.5 5.89163 2.67559 5.46771 2.98816 5.15515C3.30072 4.84259 3.72464 4.66699 4.16667 4.66699H15.8333C16.2754 4.66699 16.6993 4.84259 17.0118 5.15515C17.3244 5.46771 17.5 5.89163 17.5 6.33366V14.667C17.5 15.109 17.3244 15.5329 17.0118 15.8455C16.6993 16.1581 16.2754 16.3337 15.8333 16.3337H4.16667C3.72464 16.3337 3.30072 16.1581 2.98816 15.8455C2.67559 15.5329 2.5 15.109 2.5 14.667V6.33366Z" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2.5 6.33301L10 11.333L17.5 6.33301" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2340_3226">
                                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    )
                                },
                                {
                                    value: 'push-notification',
                                    label: 'Push Notification',
                                    icon: (
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_2340_3236)">
                                                <path d="M5 4.66667C5 4.22464 5.17559 3.80072 5.48816 3.48816C5.80072 3.17559 6.22464 3 6.66667 3H13.3333C13.7754 3 14.1993 3.17559 14.5118 3.48816C14.8244 3.80072 15 4.22464 15 4.66667V16.3333C15 16.7754 14.8244 17.1993 14.5118 17.5118C14.1993 17.8244 13.7754 18 13.3333 18H6.66667C6.22464 18 5.80072 17.8244 5.48816 17.5118C5.17559 17.1993 5 16.7754 5 16.3333V4.66667Z" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9.16602 3.83301H10.8327" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10 14.667V14.6757" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2340_3236">
                                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    )
                                },
                                {
                                    value: 'sms',
                                    label: 'SMS',
                                    icon: (
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_2340_3245)">
                                                <path d="M6.66699 8H13.3337" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6.66602 11.333H11.666" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15 3.83301C15.663 3.83301 16.2989 4.0964 16.7678 4.56524C17.2366 5.03408 17.5 5.66997 17.5 6.33301V12.9997C17.5 13.6627 17.2366 14.2986 16.7678 14.7674C16.2989 15.2363 15.663 15.4997 15 15.4997H10.8333L6.66667 17.9997V15.4997H5C4.33696 15.4997 3.70107 15.2363 3.23223 14.7674C2.76339 14.2986 2.5 13.6627 2.5 12.9997V6.33301C2.5 5.66997 2.76339 5.03408 3.23223 4.56524C3.70107 4.0964 4.33696 3.83301 5 3.83301H15Z" stroke="#6C6C72" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2340_3245">
                                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    )
                                }
                            ]}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Message</label>
                        <Textarea
                            placeholder=""
                            value={automationFormData.messageBody}
                            onChange={(e) => handleFormInputChange('messageBody', e.target.value)}
                            rows={3}
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Message Subject</label>
                        <Input
                            placeholder="Enter message subject"
                            value={automationFormData.messageSubject}
                            onChange={(e) => handleFormInputChange('messageSubject', e.target.value)}
                            className="w-full"
                            variant='filled'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Message Body</label>
                        <Textarea
                            placeholder="Enter message body"
                            value={automationFormData.messageBody}
                            onChange={(e) => handleFormInputChange('messageBody', e.target.value)}
                            rows={4}
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    <div className="grid gap-3 pt-4 w-3/4 grid-cols-2 justify-self-end">
                        <Button
                            variant="filled"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateSubmit}
                            className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                        >
                            Create Automation
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AutomationsPage;

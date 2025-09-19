"use client";
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const FeeExceptionsPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        exceptionType: 'early_withdrawal',
        duration: 'permanent',
        reason: ''
    });

    // Mock data for fee exceptions
    const exceptionsData = [
        {
            id: '1',
            userId: 'user_12345',
            userEmail: 'john.doe@example.com',
            exceptionType: 'Early Withdrawal',
            status: 'Active',
            createdDate: '2025-09-15',
            expiryDate: '2026-09-15',
            reason: 'Premium customer loyalty program'
        },
        {
            id: '2',
            userId: 'user_67890',
            userEmail: 'jane.smith@example.com',
            exceptionType: 'Processing Fee',
            status: 'Active',
            createdDate: '2025-09-10',
            expiryDate: 'Permanent',
            reason: 'Corporate account agreement'
        },
        {
            id: '3',
            userId: 'user_54321',
            userEmail: 'mike.wilson@example.com',
            exceptionType: 'Monthly Fee',
            status: 'Expired',
            createdDate: '2025-08-01',
            expiryDate: '2025-09-01',
            reason: 'Promotional period'
        },
        {
            id: '4',
            userId: 'user_98765',
            userEmail: 'sarah.johnson@example.com',
            exceptionType: 'Transaction Fee',
            status: 'Active',
            createdDate: '2025-09-12',
            expiryDate: '2025-12-12',
            reason: 'High-value customer retention'
        }
    ];

    const columns: TableColumn[] = [
        {
            key: 'user',
            header: 'USER',
            sortable: true,
            render: (value: any, row: any) => (
                <div>
                    <span className="text-[#DEDEE3] font-medium">{row.userEmail}</span>
                    <p className="text-[#8C8C93] text-sm mt-1">ID: {row.userId}</p>
                </div>
            )
        },
        {
            key: 'exceptionType',
            header: 'EXCEPTION TYPE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.exceptionType}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: any, row: any) => {
                const status = row.status;
                let statusColor = '';
                
                switch (status) {
                    case 'Active':
                        statusColor = 'bg-green-500/20 text-green-400';
                        break;
                    case 'Expired':
                        statusColor = 'bg-red-500/20 text-red-400';
                        break;
                    default:
                        statusColor = 'bg-gray-500/20 text-gray-400';
                }

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            key: 'expiryDate',
            header: 'EXPIRY DATE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.expiryDate}</span>
            )
        },
        {
            key: 'reason',
            header: 'REASON',
            sortable: false,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93] truncate max-w-[200px] block">{row.reason}</span>
            )
        },
        {
            key: 'actions',
            header: 'ACTIONS',
            sortable: false,
            render: (value: any, row: any) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8C8C93] hover:text-[#DEDEE3]"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                    >
                        Revoke
                    </Button>
                </div>
            )
        }
    ];

    const exceptionTypeOptions = [
        { value: 'early_withdrawal', label: 'Early Withdrawal Fee' },
        { value: 'processing_fee', label: 'Processing Fee' },
        { value: 'monthly_fee', label: 'Monthly Fee' },
        { value: 'transaction_fee', label: 'Transaction Fee' },
        { value: 'all_fees', label: 'All Fees' }
    ];

    const durationOptions = [
        { value: 'permanent', label: 'Permanent' },
        { value: '30_days', label: '30 Days' },
        { value: '60_days', label: '60 Days' },
        { value: '90_days', label: '90 Days' },
        { value: '6_months', label: '6 Months' },
        { value: '1_year', label: '1 Year' },
        { value: 'custom', label: 'Custom' }
    ];

    const handleFormInputChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleCreateSubmit = () => {
        console.log('Creating fee exception:', formData);
        setIsCreateModalOpen(false);
        setFormData({
            userId: '',
            exceptionType: 'early_withdrawal',
            duration: 'permanent',
            reason: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-[#DEDEE3]">Fee Exceptions</h2>
                        <p className="text-[#8C8C93] text-sm mt-1">Manage fee waivers and exceptions for users</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center gap-3">
                            <Input
                                placeholder="Search by user email..."
                                variant="filled"
                                className="w-full sm:w-64"
                            />
                            <Select
                                options={[
                                    { value: 'all', label: 'All Status' },
                                    { value: 'active', label: 'Active' },
                                    { value: 'expired', label: 'Expired' }
                                ]}
                                placeholder="Status"
                                variant="filled"
                                className="w-full sm:w-32"
                            />
                        </div>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Exception
                        </Button>
                    </div>
                </div>

                <DataTable
                    data={exceptionsData}
                    columns={columns}
                    variant="dark"
                    className="border-none"
                />
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="rounded-xl p-4 bg-[#1C1C1E] border-[#313135BA] border-2">
                    <div className="text-2xl font-bold text-[#DEDEE3]">24</div>
                    <div className="text-[#8C8C93] text-sm">Total Exceptions</div>
                </div>
                <div className="rounded-xl p-4 bg-[#1C1C1E] border-[#313135BA] border-2">
                    <div className="text-2xl font-bold text-green-400">18</div>
                    <div className="text-[#8C8C93] text-sm">Active</div>
                </div>
                <div className="rounded-xl p-4 bg-[#1C1C1E] border-[#313135BA] border-2">
                    <div className="text-2xl font-bold text-red-400">6</div>
                    <div className="text-[#8C8C93] text-sm">Expired</div>
                </div>
                <div className="rounded-xl p-4 bg-[#1C1C1E] border-[#313135BA] border-2">
                    <div className="text-2xl font-bold text-[#DEDEE3]">$12,450</div>
                    <div className="text-[#8C8C93] text-sm">Fees Waived (YTD)</div>
                </div>
            </div>

            {/* Create Fee Exception Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Fee Exception"
                size="lg"
                className="w-full"
            >
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">User ID or Email</label>
                        <Input
                            placeholder="Enter user ID or email address"
                            value={formData.userId}
                            onChange={(e) => handleFormInputChange('userId', e.target.value)}
                            variant="filled"
                            className="w-full"
                        />
                        <p className="text-xs text-[#8C8C93] mt-1">Enter the user's ID or email address to grant the exception</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Exception Type</label>
                        <Select
                            options={exceptionTypeOptions}
                            value={formData.exceptionType}
                            onChange={(value) => handleFormInputChange('exceptionType', value)}
                            placeholder="Select exception type"
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Duration</label>
                        <Select
                            options={durationOptions}
                            value={formData.duration}
                            onChange={(value) => handleFormInputChange('duration', value)}
                            placeholder="Select duration"
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">Reason</label>
                        <Textarea
                            placeholder="Enter the reason for this exception..."
                            value={formData.reason}
                            onChange={(e) => handleFormInputChange('reason', e.target.value)}
                            variant="filled"
                            rows={3}
                            className="w-full"
                        />
                        <p className="text-xs text-[#8C8C93] mt-1">Provide a detailed reason for audit purposes</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateSubmit}
                            className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                        >
                            Create Exception
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FeeExceptionsPage;

"use client";
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import Badge from '@/components/ui/badge';
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
            id: '2874829372',
            name: 'Daniel Owolabi',
            email: 'daniel.owolabi@cashonrails.com',
            feeType: 'Early Withdrawal',
            exception: 'Waive',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Jane Doe',
            email: 'janedoe789@gmail.com',
            feeType: 'Inactivity',
            exception: 'Inactivity',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Will Smith',
            email: 'johnsmith456@yahoo.com',
            feeType: 'Account Closure',
            exception: 'Account Closure',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Annalise Keating',
            email: 'alice.jones@gmail.com',
            feeType: 'Insufficient Funds',
            exception: 'Insufficient Funds',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Michael Scott',
            email: '',
            feeType: '',
            exception: 'Overdraft Fee',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Harriet Tubman',
            email: '',
            feeType: '',
            exception: 'Monthly Maintenance',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Leonardo DiCaprio',
            email: '',
            feeType: '',
            exception: 'Transaction Limit Exceeded',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Oprah Winfrey',
            email: '',
            feeType: '',
            exception: 'Wire Transfer Fee',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            name: 'Shakespeare',
            email: '',
            feeType: '',
            exception: 'Foreign Transaction Fee',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '',
            name: '',
            email: '',
            feeType: '',
            exception: 'Minimum Balance Requirement',
            date: ''
        }
    ];

    const columns: TableColumn[] = [
        {
            key: 'id',
            header: 'USER',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.id}</span>
            )
        },
        {
            key: 'name',
            header: 'NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.name}</span>
            )
        },
        {
            key: 'email',
            header: 'EMAIL ADDRESS',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.email}</span>
            )
        },
        {
            key: 'feeType',
            header: 'FEE TYPE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.feeType}</span>
            )
        },
        {
            key: 'exception',
            header: 'EXCEPTION',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.exception}</span>
            )
        },
        {
            key: 'date',
            header: 'DATE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.date}</span>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-lg font-medium text-[#DEDEE3]">Fee Exceptions</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Exception
                    </Button>
                </div>
            </div>

            <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">

                {/* Filter Section */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[#DEDEE3] font-medium">KYC Verification</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Search"
                            variant="filled"
                            className="w-64"
                        />
                        <Button>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </Button>
                        <Button variant='secondary'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download
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

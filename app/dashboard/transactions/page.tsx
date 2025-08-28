"use client";
import { Metrics, MetricsItem } from '@/components/ui/metrics';
import { DataTable } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { ReceiptIcon } from '@/components/icons';

const Page = () => {
    const statsData: MetricsItem[] = [
        {
            title: 'Total Deposits',
            value: 5000000.00,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#65A3FF" />
                </svg>
            </>,
            change: {
                value: '12.5%',
                type: 'increase' as const,
            },
        },
        {
            title: 'Total Withdrawals',
            value: 5000000.00,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#E697FF" />
                </svg>

            </>,
            change: {
                value: '12.6%',
                type: 'increase' as const,
            },
        },
        {
            title: 'Pending Transactions',
            value: 400,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#ECA450" />
                </svg>

            </>,
            change: {
                value: '5.4%',
                type: 'increase' as const,
            },
        },
        {
            title: 'Failed Transactions',
            value: 45,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#FF7272" />
                </svg>

            </>,
            change: {
                value: '9.3%',
                type: 'decrease' as const,
            },
        },
    ];

    // Transactions table data
    const transactionsTableData = [
        {
            id: '2874829372',
            user: 'Daniel Owolabi',
            type: 'Deposit',
            status: 'Completed',
            amount: 10000.00,
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4764829013',
            user: 'Jane Doe',
            type: 'Withdrawal',
            status: 'Pending',
            amount: 3000.00,
            date: '08 Aug 2025, 09:15'
        },
        {
            id: '4764829013',
            user: 'Will Smith',
            type: 'Deposit',
            status: 'Failed',
            amount: 3000.00,
            date: '10 Aug 2025, 11:47'
        },
        {
            id: '4764829013',
            user: 'Annalise Keating',
            type: 'Deposit',
            status: 'Completed',
            amount: 3000.00,
            date: '11 Aug 2025, 16:32'
        },
        {
            id: '4764829013',
            user: 'Michael Scott',
            type: 'Withdrawal',
            status: 'Completed',
            amount: 3000.00,
            date: '12 Aug 2025, 12:03'
        },
        {
            id: '4764829013',
            user: 'Sherlock Holmes',
            type: 'Withdrawal',
            status: 'Completed',
            amount: 3000.00,
            date: '13 Aug 2025, 08:45'
        },
        {
            id: '4764829013',
            user: 'Deandra Tenpenny',
            type: 'Deposit',
            status: 'Completed',
            amount: 3000.00,
            date: '14 Aug 2025, 19:30'
        },
        {
            id: '4764829013',
            user: 'Tony Stark',
            type: 'Withdrawal',
            status: 'Completed',
            amount: 3000.00,
            date: '15 Aug 2025, 07:50'
        },
        {
            id: '4764829013',
            user: 'Elizabeth Bennet',
            type: 'Deposit',
            status: 'Completed',
            amount: 3000.00,
            date: '16 Aug 2025, 15:11'
        },
        {
            id: '4764829013',
            user: 'Gandalf the Gray',
            type: 'Deposit',
            status: 'Completed',
            amount: 3000.00,
            date: '17 Aug 2025, 10:05'
        },
        {
            id: '4764829013',
            user: 'Hermione Granger',
            type: 'Withdrawal',
            status: 'Completed',
            amount: 3000.00,
            date: '18 Aug 2025, 13:40'
        }
    ];

    // Table columns configuration
    const transactionsTableColumns = [
        {
            key: 'id',
            header: 'TRANSACTION ID',
            accessor: 'id' as const,
            width: '180px',
            render: (value: string) => (
                <span className="text-[#DEDEE3] font-mono text-sm">{value}</span>
            )
        },
        {
            key: 'user',
            header: 'USER',
            accessor: 'user' as const,
            width: '200px',
            render: (value: string) => (
                <span className="text-[#DEDEE3] text-sm">{value}</span>
            )
        },
        {
            key: 'type',
            header: 'TYPE',
            accessor: 'type' as const,
            width: '120px',
            render: (value: string) => (
                <span className="text-[#8C8C93] text-sm">{value}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            accessor: 'status' as const,
            width: '150px',
            render: (value: string) => {
                const statusColors = {
                    'Completed': 'text-green-400',
                    'Pending': 'text-orange-400',
                    'Failed': 'text-red-400'
                };
                const dotColors = {
                    'Completed': 'bg-green-400',
                    'Pending': 'bg-orange-400',
                    'Failed': 'bg-red-400'
                };
                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${dotColors[value as keyof typeof dotColors]}`}></div>
                        <span className={`text-sm ${statusColors[value as keyof typeof statusColors]}`}>
                            {value}
                        </span>
                    </div>
                );
            }
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            accessor: 'amount' as const,
            width: '150px',
            align: 'right' as const,
            render: (value: number) => (
                <span className="text-[#DEDEE3] text-sm">₦{value.toLocaleString()}.00</span>
            )
        },
        {
            key: 'date',
            header: 'DATE',
            accessor: 'date' as const,
            width: '180px',
            render: (value: string) => (
                <span className="text-[#8C8C93] text-sm">{value}</span>
            )
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="px-4 sm:px-6 animate-in slide-in-from-top duration-600">
                <h1 className="text-xl sm:text-2xl font-medium text-[#A2A2A7] transition-all duration-300">
                    Transactions
                </h1>
                <p className="text-sm text-[#A2A2A780] mt-1 font-medium">
                    Monitor and configure boost programs for your platform
                </p>
            </div>

            {/* Stats Container */}
            <div className="px-4 sm:px-6 animate-in slide-in-from-left duration-700 delay-100">
                <Metrics
                    items={statsData}
                    variant="dark"
                    className="animate-in fade-in duration-700 delay-200"
                />
            </div>

            {/* Transactions Table Section */}
            <div className="px-4 sm:px-6 animate-in slide-in-from-bottom duration-900 delay-300">
                <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                    {/* Table Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                                <ReceiptIcon className="w-5 h-5 text-[#8C8C93]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-[#DEDEE3]">Transactions (15,000)</h2>
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
                                        <svg
                                            className="w-4 h-4 text-[#8C8C93]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* Sort Button */}
                            <Button
                                variant="filled"
                                size="sm"
                                className="px-3 py-2 bg-[#303033]"
                            >
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.83325 18V15.5" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.1667 18V13" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.1667 5.5V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83325 8V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83325 15.5C5.05669 15.5 4.6684 15.5 4.36211 15.3732C3.95374 15.204 3.62928 14.8795 3.46012 14.4712C3.33325 14.1648 3.33325 13.7766 3.33325 13C3.33325 12.2234 3.33325 11.8352 3.46012 11.5288C3.62928 11.1205 3.95374 10.796 4.36211 10.6268C4.6684 10.5 5.05669 10.5 5.83325 10.5C6.60982 10.5 6.9981 10.5 7.30439 10.6268C7.71277 10.796 8.03723 11.1205 8.20639 11.5288C8.33325 11.8352 8.33325 12.2234 8.33325 13C8.33325 13.7766 8.33325 14.1648 8.20639 14.4712C8.03723 14.8795 7.71277 15.204 7.30439 15.3732C6.9981 15.5 6.60982 15.5 5.83325 15.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
                                    <path d="M14.1667 10.5C13.3902 10.5 13.0019 10.5 12.6956 10.3732C12.2872 10.204 11.9627 9.8795 11.7936 9.47117C11.6667 9.16483 11.6667 8.77657 11.6667 8C11.6667 7.22343 11.6667 6.83515 11.7936 6.52886C11.9627 6.12048 12.2872 5.79602 12.6956 5.62687C13.0019 5.5 13.3902 5.5 14.1667 5.5C14.9433 5.5 15.3316 5.5 15.6379 5.62687C16.0462 5.79602 16.3707 6.12048 16.5399 6.52886C16.6667 6.83515 16.6667 7.22343 16.6667 8C16.6667 8.77657 16.6667 9.16483 16.5399 9.47117C16.3707 9.8795 16.0462 10.204 15.6379 10.3732C15.3316 10.5 14.9433 10.5 14.1667 10.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
                                </svg>

                            </Button>

                            {/* Download Button */}
                            <Button
                                variant="filled"
                                size="sm"
                                icon={
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 12.5833V4.25M10.0001 12.5833C9.41658 12.5833 8.32636 10.9214 7.91675 10.5M10.0001 12.5833C10.5836 12.5833 11.6738 10.9214 12.0834 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.6666 14.25C16.6666 16.3183 16.2349 16.75 14.1666 16.75H5.83325C3.76492 16.75 3.33325 16.3183 3.33325 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                                className="px-3 py-2 bg-[#303033]"
                            >
                                Download
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <DataTable
                        data={transactionsTableData}
                        columns={transactionsTableColumns}
                        variant="dark"
                        className="animate-in fade-in duration-700 delay-400"
                    />
                </div>
            </div>
        </div>
    )
}

export default Page
"use client";
import { Metrics, MetricsItem } from '@/components/ui/metrics';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabItem } from '@/components/ui/tabs/Tabs';
import { Modal } from '@/components/ui/modal';
import React, { useState, useEffect } from 'react';
import { ReceiptIcon } from '@/components/icons';
import { DepositRecord, WithdrawalRecord, TransactionStats } from './types';
import { formatCurrency } from '@/lib/utils';
import { ApiPaginationInfo } from '@/lib/types';
import api from '@/lib/api';

const Page = () => {
    // Tab management
    const [activeTab, setActiveTab] = useState('deposits');

    // Data states
    const [deposits, setDeposits] = useState<DepositRecord[]>([]);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);
    const [transactionStats, setTransactionStats] = useState<TransactionStats | null>(null);

    // UI states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<ApiPaginationInfo | undefined>(undefined);
    const [selectedTransaction, setSelectedTransaction] = useState<DepositRecord | WithdrawalRecord | null>(null);
    const [showTransactionModal, setShowTransactionModal] = useState(false);

    // Fetch transaction stats
    const fetchTransactionStats = async () => {
        try {
            const { data, message, status } = await api.get<TransactionStats>('/stats');
            setTransactionStats(data);
        } catch (err: any) {
            console.error('Error fetching transaction stats:', err);
            // Set null on error
            setTransactionStats(null);
        }
    };

    // Fetch deposits data
    const fetchDeposits = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            setError(null);

            const { data, message, status, pagination } = await api.get<DepositRecord[]>('/deposits', {
                params: { page, limit }
            });

            setDeposits(data);
            setPagination(pagination);

        } catch (err: any) {
            console.error('Error fetching deposits:', err);
            setError(err.message || 'Failed to fetch deposits');
        } finally {
            setLoading(false);
        }
    };

    // Fetch withdrawals data
    const fetchWithdrawals = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            setError(null);

            const { data, message, status, pagination } = await api.get<WithdrawalRecord[]>('/withdrawals', {
                params: { page, limit }
            });

            setWithdrawals(data);
            setPagination(pagination);

        } catch (err: any) {
            console.error('Error fetching withdrawals:', err);
            setError(err.message || 'Failed to fetch withdrawals');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data based on active tab
    const fetchCurrentTabData = async (page = 1, limit = 10) => {
        if (activeTab === 'deposits') {
            await fetchDeposits(page, limit);
        } else if (activeTab === 'withdrawals') {
            await fetchWithdrawals(page, limit);
        }
    };


    // Effects
    useEffect(() => {
        fetchTransactionStats();
        fetchCurrentTabData();
    }, []);

    useEffect(() => {
        fetchCurrentTabData();
    }, [activeTab]);

    const statsData: MetricsItem[] = [
        {
            title: 'Total Deposits',
            value: transactionStats?.total_deposits?.formatted || '₦0.00',
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#65A3FF" />
                </svg>
            </>,
            change: {
                value: `${transactionStats?.total_deposits?.percent_change || 0}%`,
                type: transactionStats?.total_deposits?.trend === 'up' ? 'increase' as const : 'decrease' as const,
            },
        },
        {
            title: 'Total Withdrawals',
            value: transactionStats?.total_withdrawals?.formatted || '₦0.00',
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#E697FF" />
                </svg>
            </>,
            change: {
                value: `${transactionStats?.total_withdrawals?.percent_change || 0}%`,
                type: transactionStats?.total_withdrawals?.trend === 'up' ? 'increase' as const : 'decrease' as const,
            },
        },
        {
            title: 'Pending Transactions',
            value: transactionStats?.pending_transactions?.value || 0,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#FFA500" />
                </svg>
            </>,
            change: {
                value: `${transactionStats?.pending_transactions?.percent_change || 0}%`,
                type: transactionStats?.pending_transactions?.trend === 'up' ? 'increase' as const : 'decrease' as const,
            },
        },
        {
            title: 'Failed Transactions',
            value: transactionStats?.failed_transactions?.value || 0,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#FF453A" />
                </svg>
            </>,
            change: {
                value: `${transactionStats?.failed_transactions?.percent_change || 0}%`,
                type: transactionStats?.failed_transactions?.trend === 'up' ? 'increase' as const : 'decrease' as const,
            },
        },
    ];


    // Deposits table columns
    const depositsTableColumns: TableColumn<DepositRecord>[] = [
        {
            key: 'reference',
            header: 'REFERENCE',
            accessor: 'reference',
            type: 'text',
            width: '180px',
            copyable: true,
            truncate: 20,
            className: 'text-[#8C8C93]'
        },
        {
            key: 'user_id',
            header: 'USER ID',
            accessor: 'user_id',
            type: 'text',
            width: '100px',
            className: 'text-[#8C8C93]'
        },
        {
            key: 'status',
            header: 'STATUS',
            accessor: 'status',
            type: 'status',
            width: '120px'
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            accessor: 'amount',
            type: 'currency',
            width: '150px',
            currency: 'NGN',
            className: 'text-[#8C8C93]'
        },

        {
            key: 'date',
            header: 'DATE',
            accessor: 'created_at',
            type: 'datetime',
            className: 'text-[#8C8C93]'
        }
    ];

    // Withdrawals table columns
    const withdrawalsTableColumns: TableColumn<WithdrawalRecord>[] = [
        {
            key: 'reference',
            header: 'REFERENCE',
            accessor: 'reference',
            type: 'text',
            width: '180px',
            copyable: true,
            truncate: 20,
            className: 'text-[#8C8C93]'
        },
        {
            key: 'user_id',
            header: 'USER ID',
            accessor: 'user_id',
            type: 'text',
            width: '100px',
            className: 'text-[#8C8C93]'
        },

        {
            key: 'status',
            header: 'STATUS',
            accessor: 'status',
            type: 'status',
            width: '120px',
            className: 'text-[#8C8C93]'
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            accessor: 'amount',
            type: 'currency',
            width: '150px',
            currency: 'NGN',
            className: 'text-[#8C8C93]'
        },
        {
            key: 'date',
            header: 'DATE',
            accessor: 'created_at',
            type: 'datetime',
            className: 'text-[#8C8C93]'

        }
    ];
    const [searchQuery, setSearchQuery] = useState('');

    // Tab configuration
    const tabItems: TabItem[] = [
        {
            id: 'deposits',
            label: 'Deposits',
            // badge: deposits.length > 0 ? deposits.length.toString() : undefined,
        },
        {
            id: 'withdrawals',
            label: 'Withdrawals',
            // badge: withdrawals.length > 0 ? withdrawals.length.toString() : undefined,
        }
    ];

    // Handle row click for transaction details
    const handleRowClick = (transaction: DepositRecord | WithdrawalRecord) => {
        setSelectedTransaction(transaction);
        setShowTransactionModal(true);
    };

    // Get current data and columns based on active tab
    const getCurrentData = () => {
        return activeTab === 'deposits' ? deposits : withdrawals;
    };

    const getCurrentColumns = () => {
        return activeTab === 'deposits' ? depositsTableColumns : withdrawalsTableColumns;
    };

    const getCurrentCount = () => {
        return activeTab === 'deposits' ? deposits.length : withdrawals.length;
    };

    // Status badge component using app colors
    const StatusBadge = ({ status }: { status: string }) => {
        const getStatusConfig = (status: string) => {
            switch (status.toLowerCase()) {
                case 'successful':
                case 'success':
                case 'completed':
                    return { bg: 'bg-[#00FFB3]/20', text: 'text-[#00FFB3]', dot: 'bg-[#00FFB3]' };
                case 'pending':
                case 'processing':
                    return { bg: 'bg-[#FFA500]/20', text: 'text-[#FFA500]', dot: 'bg-[#FFA500]' };
                case 'failed':
                case 'error':
                    return { bg: 'bg-[#FF453A]/20', text: 'text-[#FF453A]', dot: 'bg-[#FF453A]' };
                case 'reversed':
                case 'cancelled':
                    return { bg: 'bg-[#8C8C93]/20', text: 'text-[#8C8C93]', dot: 'bg-[#8C8C93]' };
                default:
                    return { bg: 'bg-[#8C8C93]/20', text: 'text-[#8C8C93]', dot: 'bg-[#8C8C93]' };
            }
        };

        const config = getStatusConfig(status);

        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}>
                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                <span className={`text-sm font-medium ${config.text} capitalize`}>{status}</span>
            </div>
        );
    };

    // Format date for modal display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };



    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="px-4 sm:px-6 animate-in slide-in-from-top duration-600">
                <h1 className="text-xl sm:text-2xl font-medium text-[#A2A2A7] transition-all duration-300">
                    Transactions
                </h1>
                <p className="text-sm text-[#A2A2A780] mt-1 font-medium">
                    Monitor and manage all deposit and withdrawal transactions
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
                        <div className='flex flex-row items-center gap-6'>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                                    <ReceiptIcon className="w-5 h-5 text-[#8C8C93]" />
                                </div>
                                <h2 className="text-lg font-medium text-[#DEDEE3]">
                                    Transactions
                                </h2>
                            </div>
                            {/* Tabs Section */}
                            <Tabs
                                tabs={tabItems}
                                activeTab={activeTab}
                                onTabChange={(tabId) => setActiveTab(tabId)}
                                variant="toggle"
                                size='sm'
                                className='flex items-center'
                            />
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
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FFB3]"></div>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="text-red-400 mb-2">⚠️ {error}</div>
                            <Button
                                onClick={() => fetchCurrentTabData()}
                                variant="filled"
                                size="sm"
                                className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : (
                        <DataTable
                            data={getCurrentData() as any}
                            columns={getCurrentColumns() as any}
                            variant="dark"
                            className="animate-in fade-in duration-700 delay-400"
                            pagination={pagination}
                            onPageChange={(page: number) => fetchCurrentTabData(page, pagination?.per_page || 10)}
                            onRowClick={handleRowClick}
                            showPagination={true}
                        />
                    )}
                </div>
            </div>

            {/* Transaction Detail Modal */}
            <Modal
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                size="2xl"
                showCloseButton={false}
                title={
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-lg font-medium text-[#A2A2A7]">Transaction Details</h2>
                        <div className="flex gap-2">
                            <button className="p-2 px-2.5 hover:bg-[#404044] bg-[#303033] rounded-md transition-colors">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2932_2899)">
                                        <path d="M10 11.25V2.5" stroke="#DEDEE3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.875 11.25V16.25H3.125V11.25" stroke="#DEDEE3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.125 8.125L10 11.25L6.875 8.125" stroke="#DEDEE3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2932_2899">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>
                            <button
                                onClick={() => setShowTransactionModal(false)}
                                className="hover:bg-[#404044] rounded-md transition-colors p-2 px-2.5"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2932_2904)">
                                        <path d="M18.75 5.25L5.25 18.75" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.75 18.75L5.25 5.25" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2932_2904">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>
                        </div>
                    </div>
                } // No title, as we have a custom header
            >
                {selectedTransaction && (
                    <div className="flex flex-col h-full">

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-8 py-6">
                            {/* Amount Section */}
                            <div className="mb-10">
                                <p className="text-xs text-[#8C8C93] uppercase tracking-wider mb-2">AMOUNT</p>
                                <p className="text-4xl font-bold text-[#00FFB3] mb-4">
                                    ₦{parseFloat(selectedTransaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>

                            {/* Transaction Details List */}
                            <div className="space-y-6 mb-10">
                                {/* Status */}
                                <div className="flex items-center">
                                    <div className="flex items-center w-64">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0019 10.392C10.0355 10.4284 10.0783 10.4551 10.1257 10.4691C10.1736 10.4832 10.2244 10.4841 10.2727 10.4718C10.3206 10.4594 10.3643 10.4344 10.3993 10.3994C10.4343 10.3644 10.4594 10.3207 10.4718 10.2728C10.484 10.2263 10.4831 10.1773 10.4694 10.1311C10.4544 10.0837 10.427 10.041 10.3901 10.0076L10.3849 10.0024L9.28665 8.90423C9.23214 8.85972 9.16378 8.83568 9.09341 8.83627C9.02531 8.83626 8.95994 8.86305 8.91143 8.91085C8.86219 8.95961 8.83314 9.02515 8.8301 9.09438C8.82706 9.16362 8.85024 9.23145 8.89503 9.28434L10.0013 10.3914L10.0019 10.392ZM6.78702 2.84692V1.30761C6.78703 1.30151 6.78736 1.29542 6.78799 1.28936C6.78737 1.23955 6.77477 1.19062 6.75126 1.1467C6.72874 1.10234 6.69447 1.06502 6.65219 1.03881C6.60925 1.0134 6.56027 1 6.51038 1C6.46049 1 6.41151 1.0134 6.36857 1.03881C6.32 1.06845 6.27972 1.1099 6.2515 1.15931C6.22559 1.20191 6.2121 1.2509 6.21256 1.30075L6.23436 2.83418C6.23877 2.90443 6.26988 2.97033 6.32131 3.01837C6.37275 3.06641 6.44061 3.09296 6.51099 3.09257C6.58171 3.09314 6.65002 3.06688 6.70215 3.0191C6.75058 2.97434 6.7808 2.9133 6.78702 2.84765V2.84692ZM2.85608 6.7863C2.92641 6.78211 2.99249 6.75122 3.0408 6.69994C3.08911 6.64865 3.11602 6.58086 3.11602 6.5104C3.11602 6.43995 3.08911 6.37215 3.0408 6.32087C2.99249 6.26959 2.92641 6.2387 2.85608 6.2345L1.27991 6.23352C1.23245 6.23143 1.18531 6.24235 1.14361 6.26512C1.10003 6.28961 1.06373 6.32523 1.03842 6.36835C1.01316 6.41121 0.999895 6.46007 1 6.50982C1.00011 6.55957 1.01358 6.60837 1.03902 6.65112C1.06446 6.69387 1.10092 6.729 1.1446 6.75283C1.18827 6.77665 1.23754 6.7883 1.28726 6.78655H2.85559L2.85608 6.7863ZM3.73656 4.10445C3.78943 4.14932 3.85729 4.17259 3.92657 4.16962C3.99586 4.16665 4.06147 4.13765 4.11031 4.08841C4.15699 4.04343 4.18394 3.98178 4.18525 3.91697C4.18472 3.84819 4.15937 3.78191 4.11386 3.73034L3.02054 2.60763C2.98669 2.57105 2.94357 2.54431 2.89575 2.53026C2.84793 2.5162 2.79719 2.51535 2.74893 2.52779C2.70098 2.54007 2.65726 2.56513 2.62243 2.60029L2.6152 2.60702C2.58375 2.64117 2.56132 2.68263 2.54993 2.72764C2.53503 2.78387 2.53402 2.84287 2.54699 2.89958C2.55645 2.94273 2.57843 2.98213 2.61018 3.01285L3.73681 4.10396L3.73656 4.10445ZM3.71366 8.90484L2.61569 10.0022L2.61043 10.0073C2.57896 10.0362 2.55654 10.0735 2.54589 10.1149C2.53416 10.1667 2.53551 10.2207 2.54981 10.2719V10.2726C2.56225 10.3205 2.58725 10.3642 2.62224 10.3992C2.65722 10.4341 2.70092 10.4591 2.74881 10.4716C2.80029 10.486 2.85454 10.4873 2.90666 10.4754C2.94798 10.4649 2.98532 10.4425 3.01405 10.411L4.12647 9.28434C4.16145 9.2451 4.18418 9.19648 4.19186 9.14448C4.19955 9.09248 4.19185 9.03936 4.16972 8.99168C4.14759 8.944 4.11199 8.90383 4.06732 8.87613C4.02264 8.84843 3.97084 8.8344 3.91829 8.83578C3.84443 8.83427 3.77231 8.85832 3.71415 8.90386L3.71366 8.90484ZM6.23448 11.7128C6.2328 11.7626 6.24451 11.812 6.2684 11.8557L6.2733 11.8657C6.29686 11.9049 6.32981 11.9377 6.36918 11.9611L6.37898 11.9673C6.42135 11.9897 6.4687 12.0009 6.5166 11.9999C6.5645 11.999 6.61137 11.9858 6.6528 11.9618C6.6965 11.9378 6.73344 11.9031 6.7602 11.861C6.78081 11.825 6.79056 11.7839 6.78824 11.7425L6.78738 10.1668C6.78337 10.0963 6.75245 10.0301 6.70102 9.98176C6.64959 9.93343 6.58157 9.90668 6.51099 9.90705C6.4356 9.9089 6.36365 9.93901 6.30942 9.99142C6.25474 10.0403 6.22042 10.1079 6.21329 10.1809L6.23448 11.7128ZM11.7345 6.78679C11.7842 6.78843 11.8334 6.77671 11.877 6.75287C11.9206 6.72902 11.957 6.69392 11.9825 6.65121C12.0079 6.6085 12.0214 6.55976 12.0216 6.51005C12.0218 6.46035 12.0087 6.4115 11.9836 6.3686C11.9571 6.32626 11.9195 6.292 11.8749 6.26953C11.8276 6.24438 11.7745 6.23201 11.7209 6.23365H11.714V6.23426H10.1534C10.0878 6.24051 10.0268 6.27067 9.98197 6.319C9.93394 6.37108 9.90746 6.43944 9.90788 6.51028C9.90763 6.58059 9.93428 6.64834 9.98236 6.69964C10.0304 6.75094 10.0963 6.7819 10.1665 6.78618H11.7347L11.7345 6.78679ZM9.28751 4.11572L10.3851 3.01812L10.3904 3.01297C10.4275 2.97765 10.4544 2.93292 10.4681 2.88353C10.4832 2.8325 10.4846 2.77839 10.4721 2.72666C10.4596 2.67876 10.4346 2.63504 10.3996 2.60004C10.3646 2.56504 10.3208 2.54001 10.2729 2.52755C10.2247 2.51507 10.174 2.51592 10.1262 2.53C10.0784 2.54408 10.0353 2.57087 10.0016 2.60751L8.88719 3.73022C8.84541 3.77843 8.82352 3.84072 8.82596 3.90447C8.83051 3.97428 8.8611 4.03983 8.91168 4.08816C8.96334 4.13999 9.03255 4.17058 9.10566 4.17388C9.17106 4.17736 9.23547 4.1568 9.28677 4.11608L9.28751 4.11572Z" fill="#8C8C93" stroke="#8C8C93" strokeWidth="1.5" />
                                        </svg>
                                        <span className="text-sm text-[#8C8C93]">Status</span>
                                    </div>
                                    <StatusBadge status={selectedTransaction.status} />
                                </div>

                                {/* Date */}
                                <div className="flex items-center">
                                    <div className="flex items-center w-64">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                            <path d="M6.00012 1.5V3.75" stroke="#8C8C93" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.9998 1.5V3.75" stroke="#8C8C93" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.62512 6.81738H15.3751" stroke="#8C8C93" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z" stroke="#8C8C93" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.7708 10.2749H11.7776" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.7708 12.5249H11.7776" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.99686 10.2749H9.00359" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.99686 12.5249H9.00359" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.22067 10.2749H6.22741" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.22067 12.5249H6.22741" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-sm text-[#8C8C93]">Date</span>
                                    </div>
                                    <span className="text-sm text-[#DEDEE3]">{formatDate(selectedTransaction.created_at)}</span>
                                </div>

                                {/* Amount */}
                                <div className="flex items-center">
                                    <div className="flex items-center w-64">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                            <g clipPath="url(#clip0_2932_2865)">
                                                <path d="M11.625 9.75C14.3174 9.75 16.5 9.07843 16.5 8.25C16.5 7.42157 14.3174 6.75 11.625 6.75C8.93261 6.75 6.75 7.42157 6.75 8.25C6.75 9.07843 8.93261 9.75 11.625 9.75Z" stroke="#8C8C93" strokeWidth="1.5" />
                                                <path d="M16.5 11.625C16.5 12.4534 14.3174 13.125 11.625 13.125C8.93257 13.125 6.75 12.4534 6.75 11.625" stroke="#8C8C93" strokeWidth="1.5" />
                                                <path d="M16.5 8.25V14.85C16.5 15.7613 14.3174 16.5 11.625 16.5C8.93257 16.5 6.75 15.7613 6.75 14.85V8.25" stroke="#8C8C93" strokeWidth="1.5" />
                                                <path d="M6.37488 4.5C9.06727 4.5 11.2499 3.82843 11.2499 3C11.2499 2.17157 9.06727 1.5 6.37488 1.5C3.68249 1.5 1.49988 2.17157 1.49988 3C1.49988 3.82843 3.68249 4.5 6.37488 4.5Z" stroke="#8C8C93" strokeWidth="1.5" />
                                                <path d="M4.49994 8.25C3.08108 8.07735 1.77737 7.63088 1.49994 6.75M4.49994 12C3.08108 11.8274 1.77737 11.3809 1.49994 10.5" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M4.49988 15.751C3.08102 15.5783 1.77731 15.1319 1.49988 14.251V3.00098" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M11.25 4.50098V3.00098" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2932_2865">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span className="text-sm text-[#8C8C93]">Amount</span>
                                    </div>
                                    <span className="text-sm text-[#DEDEE3]">₦{parseFloat(selectedTransaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>

                                {/* Transaction ID */}
                                <div className="flex items-center">
                                    <div className="flex items-center w-64">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                            <g clipPath="url(#clip0_2932_2877)">
                                                <path d="M3.375 6.75H15.75" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.375 2.8125L10.125 15.1875" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.875 2.8125L5.625 15.1875" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2.25 11.25H14.625" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2932_2877">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span className="text-sm text-[#8C8C93]">Transaction ID</span>
                                    </div>
                                    <span className="text-sm text-[#DEDEE3] font-mono">{selectedTransaction.reference}</span>
                                </div>

                                {/* Type */}
                                <div className="flex items-center">
                                    <div className="flex items-center w-64">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                            <g clipPath="url(#clip0_2932_2887)">
                                                <path d="M7.875 12.375L5.625 14.625L3.375 12.375" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5.625 3.375V14.625" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.125 5.625L12.375 3.375L14.625 5.625" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.375 14.625V3.375" stroke="#8C8C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2932_2887">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span className="text-sm text-[#8C8C93]">Type</span>
                                    </div>
                                    <span className="text-sm text-[#DEDEE3] capitalize">{activeTab === 'deposits' ? 'Deposit' : 'Withdrawal'}</span>
                                </div>
                            </div>

                            {/* Horizontal line */}
                            <hr className="border-t-[0.5px] border-[#2A2A2E] mb-8" />

                            {/* Transaction Info Section */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2.5 h-2.5 rounded-xs bg-[#65A3FF]"></div>
                                    <h3 className="text-lg font-medium text-[#DEDEE3]">Transaction Info</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4 px-2">
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Amount</p>
                                        <p className="text-sm text-[#DEDEE3]">₦{parseFloat(selectedTransaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Reference</p>
                                        <p className="text-sm text-[#DEDEE3] font-mono">{selectedTransaction.reference}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Previous Balance</p>
                                        <p className="text-sm text-[#DEDEE3]">₦{selectedTransaction.wallet ? parseFloat(selectedTransaction.wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Current Balance</p>
                                        <p className="text-sm text-[#DEDEE3]">₦{selectedTransaction.wallet ? parseFloat(selectedTransaction.wallet.available_balance).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Source</p>
                                        <p className="text-sm text-[#DEDEE3]">{activeTab === 'deposits' ? 'Wallet' : 'Bank Account'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Destination</p>
                                        <p className="text-sm text-[#DEDEE3]">{activeTab === 'deposits' ? 'Wallet' : 'Bank'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8C8C93] mb-1">Customer ID</p>
                                        <p className="text-sm text-[#DEDEE3]">{selectedTransaction.user_id}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Horizontal line */}
                            <hr className="border-t-[0.5px] border-[#2A2A2E] mb-8" />

                            {/* Transaction Metadata Section */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2.5 h-2.5 rounded-xs bg-[#E697FF]"></div>
                                    <h3 className="text-lg font-medium text-[#DEDEE3]">Transaction Metadata</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4 px-2">
                                    {activeTab === 'deposits' ? (
                                        // Deposit metadata
                                        <>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Trx</p>
                                                <p className="text-sm text-[#DEDEE3] font-mono">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.trx ? `#${meta.trx}` : `#${selectedTransaction.id}`;
                                                        } catch {
                                                            return `#${selectedTransaction.id}`;
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Session ID</p>
                                                <p className="text-sm text-[#DEDEE3] font-mono">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.sessionId || selectedTransaction.reference;
                                                        } catch {
                                                            return selectedTransaction.reference;
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Bank Code</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.sender_bank_code || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Narration</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.sender_narration || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Account Name</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.sender_account_name || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Account Number</p>
                                                <p className="text-sm text-[#DEDEE3] font-mono">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.sender_account_number ? `****${meta.sender_account_number.slice(-4)}` : 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        // Withdrawal metadata
                                        <>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Trx</p>
                                                <p className="text-sm text-[#DEDEE3] font-mono">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.trx ? `#${meta.trx}` : `#${selectedTransaction.id}`;
                                                        } catch {
                                                            return `#${selectedTransaction.id}`;
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Session ID</p>
                                                <p className="text-sm text-[#DEDEE3] font-mono">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.sessionid || meta?.sessionId || selectedTransaction.reference;
                                                        } catch {
                                                            return selectedTransaction.reference;
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Bank Code</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.bank_code || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Bank Name</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.bank_name || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Account Name</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.account_name || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Account Number</p>
                                                <p className="text-sm text-[#DEDEE3] font-mono">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.account_number ? `****${meta.account_number.slice(-4)}` : 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Narration</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.narration || 'Withdrawal from wallet';
                                                        } catch {
                                                            return 'Withdrawal from wallet';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Fee</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.fee ? `₦${parseFloat(meta.fee).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Status Message</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.statusMessage || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8C8C93] mb-1">Event</p>
                                                <p className="text-sm text-[#DEDEE3]">
                                                    {(() => {
                                                        try {
                                                            const meta = typeof selectedTransaction.meta === 'string'
                                                                ? JSON.parse(selectedTransaction.meta)
                                                                : selectedTransaction.meta;
                                                            return meta?.event || 'N/A';
                                                        } catch {
                                                            return 'N/A';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Page
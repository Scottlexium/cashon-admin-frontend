"use client";
import { Metrics, MetricsItem } from '@/components/ui/metrics';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { ReceiptIcon } from '@/components/icons';
import { TransactionsResponse, TransactionRecord } from './types';
import { formatCurrency, formatDateTime, extractPaginatedData, getPaginationInfo } from '@/lib/utils';
import { ApiPaginationInfo } from '@/lib/types';
import api from '@/lib/api';

const Page = () => {
    const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<ApiPaginationInfo | undefined>(undefined);
    const [stats, setStats] = useState<TransactionsResponse['stats']>({
        total: 0,
        total_deposit: 0,
        total_withdrawal: 0,
        wallet: null
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async (page: number = 1, limit: number = 10) => {
        try {
            setLoading(true);
            const response = await api.get<TransactionsResponse>(`/alltransaction?page=${page}&limit=${limit}`);
            
            // Extract data and pagination info using utility functions
            const { data, pagination: paginationInfo } = extractPaginatedData<TransactionsResponse>(response);
            
            if (data) {
                setStats(data.stats);
                setTransactions(data.table);
                setPagination(paginationInfo || undefined);
            }
        } catch (err) {
            setError('Failed to fetch transactions');
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    const statsData: MetricsItem[] = [
        {
            title: 'Total Deposits',
            value: stats.total_deposit,
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
            value: stats.total_withdrawal,
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
            title: 'Total Transactions',
            value: stats.total,
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
            title: 'Wallet Balance',
            value: stats.wallet ? parseFloat(stats.wallet.balance) : 0,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#00FFB3" />
                </svg>

            </>,
            change: {
                value: '2.1%',
                type: 'increase' as const,
            },
        },
    ];


    // Table columns configuration using new column types
    const transactionsTableColumns: TableColumn<TransactionRecord>[] = [
        {
            key: 'id',
            header: 'REFERENCE',
            accessor: 'id',
            type: 'text',
            width: '180px',
            copyable: true,
            truncate: 20,
            className: 'font-mono text-[#DEDEE3]'
        },
        {
            key: 'user',
            header: 'USER ID',
            accessor: 'user_id',
            type: 'text',
            width: '120px',
            className: 'text-[#DEDEE3]'
        },
        {
            key: 'type',
            header: 'TYPE',
            accessor: 'type',
            type: 'status',
            width: '120px'
        },
        {
            key: 'source',
            header: 'SOURCE',
            accessor: 'source',
            type: 'text',
            width: '120px',
            className: 'text-[#8C8C93] capitalize'
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            accessor: 'amount',
            type: 'currency',
            width: '150px',
            currency: 'NGN',
            className: 'text-[#DEDEE3]'
        },
        {
            key: 'new_balance',
            header: 'NEW BALANCE',
            accessor: 'new_balance',
            type: 'currency',
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
                                <h2 className="text-lg font-medium text-[#DEDEE3]">
                                    Transactions ({loading ? '...' : transactions.length.toLocaleString()})
                                </h2>
                                {pagination && (
                                    <p className="text-xs text-[#8C8C93] mt-1">
                                        Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalItems} total items
                                    </p>
                                )}
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
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FFB3]"></div>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="text-red-400 mb-2">⚠️ {error}</div>
                            <Button 
                                onClick={() => fetchTransactions()}
                                variant="filled"
                                size="sm"
                                className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : (
                        <DataTable
                            data={transactions}
                            columns={transactionsTableColumns}
                            variant="dark"
                            className="animate-in fade-in duration-700 delay-400"
                            pagination={pagination}
                            onPageChange={(page: number) => fetchTransactions(page, pagination?.limit || 10)}
                            showPagination={true}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
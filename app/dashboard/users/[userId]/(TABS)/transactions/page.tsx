import React, { useState, useEffect } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { MetricCard } from '@/components/ui/metric-card';
import { ReceiptIcon } from '@/components/icons';
import api, { ApiResponse } from '@/lib/api';
import { ApiPaginationInfo } from '@/lib/types';
import { useParams } from 'next/navigation';
import { Modal } from '@/components/ui/modal';

interface Transaction {
    id: number;
    user_id: number;
    wallet_id: number;
    reference: string;
    amount: string;
    type: 'debit' | 'credit';
    currency: string;
    source: string;
    note: string;
    previous_balance: string;
    new_balance: string;
    created_at: string;
    updated_at: string;
    wallet: {
        id: number;
        user_id: number;
        type: string;
        balance: string;
        available_balance: string;
        lien_balance: string;
        currency: string;
        created_at: string;
        updated_at: string;
    };
}

interface TransactionStats {
    total: number;
    total_deposit: number;
    total_withdrawal: number;
    wallet: any;
}

interface TransactionResponse {
    stats: TransactionStats;
    table: Transaction[];
}

const TransactionsContent = () => {
    const params = useParams();
    const userId = params.userId as string;
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [apiTransactionsData, setApiTransactionsData] = useState<Transaction[]>([]);
    const [stats, setStats] = useState<TransactionStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<ApiPaginationInfo | undefined>(undefined);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch transactions data
    const fetchTransactions = async (page: number = 1, limit: number = 10) => {
        try {
            setIsLoading(true);
            const response = await api.get<TransactionResponse>(`/user-transaction/${userId}?page=${page}&limit=${limit}`) as ApiResponse<TransactionResponse>;
            
            if (response.data) {
                setApiTransactionsData(response.data.table);
                setStats(response.data.stats);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchTransactions();
        }
    }, [userId]);

    // Format currency
    const formatCurrency = (amount: string | number, currency: string = 'NGN') => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
        }).format(numAmount);
    };

    // Format date
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

    // Get transaction type display
    const getTransactionTypeDisplay = (transaction: Transaction) => {
        if (transaction.type === 'credit') {
            return transaction.source === 'deposit' ? 'Pay-In' : 'Credit';
        } else {
            return transaction.source === 'withdrawal' ? 'Pay-Out' : 'Debit';
        }
    };

    // Get transaction status based on type and source
    const getTransactionStatus = (transaction: Transaction) => {
        // Since the API doesn't provide explicit status, we'll infer it
        return 'Completed'; // All transactions in the response appear to be completed
    };

    // Handle row click to show transaction details
    const handleRowClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    // Cards data based on API stats
    const cardsData = stats ? [
        {
            title: 'Total Deposits',
            amount: formatCurrency(stats.total_deposit),
            change: '0%', // API doesn't provide change percentage
            icon: (
                <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_1990_6915" fill="white">
                        <path d="M0 6.7439C0 3.29549 2.79549 0.5 6.2439 0.5H27.7561C31.2045 0.5 34 3.29549 34 6.7439V28.2561C34 31.7045 31.2045 34.5 27.7561 34.5H6.2439C2.79549 34.5 0 31.7045 0 28.2561V6.7439Z" />
                    </mask>
                    <path d="M0 6.7439C0 3.29549 2.79549 0.5 6.2439 0.5H27.7561C31.2045 0.5 34 3.29549 34 6.7439V28.2561C34 31.7045 31.2045 34.5 27.7561 34.5H6.2439C2.79549 34.5 0 31.7045 0 28.2561V6.7439Z" fill="#303033" />
                    <path d="M6.2439 0.5V1.28049H27.7561V0.5V-0.280488H6.2439V0.5ZM34 6.7439H33.2195V28.2561H34H34.7805V6.7439H34ZM27.7561 34.5V33.7195H6.2439V34.5V35.2805H27.7561V34.5ZM0 28.2561H0.780488V6.7439H0H-0.780488V28.2561H0ZM6.2439 34.5V33.7195C3.22654 33.7195 0.780488 31.2735 0.780488 28.2561H0H-0.780488C-0.780488 32.1356 2.36444 35.2805 6.2439 35.2805V34.5ZM34 28.2561H33.2195C33.2195 31.2735 30.7735 33.7195 27.7561 33.7195V34.5V35.2805C31.6356 35.2805 34.7805 32.1356 34.7805 28.2561H34ZM27.7561 0.5V1.28049C30.7735 1.28049 33.2195 3.72654 33.2195 6.7439H34H34.7805C34.7805 2.86444 31.6356 -0.280488 27.7561 -0.280488V0.5ZM6.2439 0.5V-0.280488C2.36444 -0.280488 -0.780488 2.86444 -0.780488 6.7439H0H0.780488C0.780488 3.72654 3.22654 1.28049 6.2439 1.28049V0.5Z" fill="#363639" mask="url(#path-1-inside-1_1990_6915)" />
                    <path d="M25.1731 12.719C25.0921 12.6685 24.9996 12.6394 24.9043 12.6344C24.809 12.6295 24.714 12.6489 24.6282 12.6909C21.6097 14.1674 19.4539 13.4756 17.1751 12.7457C14.7781 11.9828 12.3031 11.1918 8.8782 12.8638C8.78362 12.91 8.70388 12.9818 8.64808 13.0711C8.59227 13.1603 8.56262 13.2634 8.5625 13.3687V21.8013C8.56249 21.8967 8.58676 21.9906 8.63303 22.0741C8.6793 22.1575 8.74604 22.2279 8.82699 22.2784C8.90793 22.329 9.00041 22.3581 9.09572 22.3631C9.19103 22.3681 9.28603 22.3487 9.3718 22.3068C12.3903 20.8303 14.5461 21.5221 16.8284 22.252C18.1813 22.6844 19.5594 23.1253 21.1175 23.1253C22.3191 23.1253 23.6298 22.8637 25.119 22.1367C25.2136 22.0905 25.2933 22.0187 25.3491 21.9294C25.4049 21.8402 25.4346 21.7371 25.4347 21.6318V13.1992C25.4355 13.1036 25.412 13.0092 25.3662 12.9252C25.3204 12.8412 25.254 12.7702 25.1731 12.719ZM11.375 19.1878C11.375 19.3369 11.3157 19.48 11.2102 19.5855C11.1048 19.691 10.9617 19.7503 10.8125 19.7503C10.6633 19.7503 10.5202 19.691 10.4148 19.5855C10.3093 19.48 10.25 19.3369 10.25 19.1878V14.6878C10.25 14.5386 10.3093 14.3955 10.4148 14.29C10.5202 14.1845 10.6633 14.1253 10.8125 14.1253C10.9617 14.1253 11.1048 14.1845 11.2102 14.29C11.3157 14.3955 11.375 14.5386 11.375 14.6878V19.1878ZM17 19.7503C16.555 19.7503 16.12 19.6183 15.75 19.3711C15.38 19.1238 15.0916 18.7724 14.9213 18.3613C14.751 17.9502 14.7064 17.4978 14.7932 17.0613C14.8801 16.6248 15.0943 16.2239 15.409 15.9093C15.7237 15.5946 16.1246 15.3803 16.561 15.2935C16.9975 15.2067 17.4499 15.2512 17.861 15.4215C18.2722 15.5918 18.6236 15.8802 18.8708 16.2502C19.118 16.6202 19.25 17.0552 19.25 17.5003C19.25 18.097 19.0129 18.6693 18.591 19.0912C18.169 19.5132 17.5967 19.7503 17 19.7503ZM23.75 20.3128C23.75 20.4619 23.6907 20.605 23.5852 20.7105C23.4798 20.816 23.3367 20.8753 23.1875 20.8753C23.0383 20.8753 22.8952 20.816 22.7898 20.7105C22.6843 20.605 22.625 20.4619 22.625 20.3128V15.8128C22.625 15.6636 22.6843 15.5205 22.7898 15.415C22.8952 15.3095 23.0383 15.2503 23.1875 15.2503C23.3367 15.2503 23.4798 15.3095 23.5852 15.415C23.6907 15.5205 23.75 15.6636 23.75 15.8128V20.3128Z" fill="#DEDEE3" />
                </svg>
            )
        },
        {
            title: 'Total Withdrawals',
            amount: formatCurrency(stats.total_withdrawal),
            change: '0%',
            icon: (
                <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_1990_6915" fill="white">
                        <path d="M0 6.7439C0 3.29549 2.79549 0.5 6.2439 0.5H27.7561C31.2045 0.5 34 3.29549 34 6.7439V28.2561C34 31.7045 31.2045 34.5 27.7561 34.5H6.2439C2.79549 34.5 0 31.7045 0 28.2561V6.7439Z" />
                    </mask>
                    <path d="M0 6.7439C0 3.29549 2.79549 0.5 6.2439 0.5H27.7561C31.2045 0.5 34 3.29549 34 6.7439V28.2561C34 31.7045 31.2045 34.5 27.7561 34.5H6.2439C2.79549 34.5 0 31.7045 0 28.2561V6.7439Z" fill="#303033" />
                    <path d="M6.2439 0.5V1.28049H27.7561V0.5V-0.280488H6.2439V0.5ZM34 6.7439H33.2195V28.2561H34H34.7805V6.7439H34ZM27.7561 34.5V33.7195H6.2439V34.5V35.2805H27.7561V34.5ZM0 28.2561H0.780488V6.7439H0H-0.780488V28.2561H0ZM6.2439 34.5V33.7195C3.22654 33.7195 0.780488 31.2735 0.780488 28.2561H0H-0.780488C-0.780488 32.1356 2.36444 35.2805 6.2439 35.2805V34.5ZM34 28.2561H33.2195C33.2195 31.2735 30.7735 33.7195 27.7561 33.7195V34.5V35.2805C31.6356 35.2805 34.7805 32.1356 34.7805 28.2561H34ZM27.7561 0.5V1.28049C30.7735 1.28049 33.2195 3.72654 33.2195 6.7439H34H34.7805C34.7805 2.86444 31.6356 -0.280488 27.7561 -0.280488V0.5ZM6.2439 0.5V-0.280488C2.36444 -0.280488 -0.780488 2.86444 -0.780488 6.7439H0H0.780488C0.780488 3.72654 3.22654 1.28049 6.2439 1.28049V0.5Z" fill="#363639" mask="url(#path-1-inside-1_1990_6915)" />
                    <path d="M25.1731 12.719C25.0921 12.6685 24.9996 12.6394 24.9043 12.6344C24.809 12.6295 24.714 12.6489 24.6282 12.6909C21.6097 14.1674 19.4539 13.4756 17.1751 12.7457C14.7781 11.9828 12.3031 11.1918 8.8782 12.8638C8.78362 12.91 8.70388 12.9818 8.64808 13.0711C8.59227 13.1603 8.56262 13.2634 8.5625 13.3687V21.8013C8.56249 21.8967 8.58676 21.9906 8.63303 22.0741C8.6793 22.1575 8.74604 22.2279 8.82699 22.2784C8.90793 22.329 9.00041 22.3581 9.09572 22.3631C9.19103 22.3681 9.28603 22.3487 9.3718 22.3068C12.3903 20.8303 14.5461 21.5221 16.8284 22.252C18.1813 22.6844 19.5594 23.1253 21.1175 23.1253C22.3191 23.1253 23.6298 22.8637 25.119 22.1367C25.2136 22.0905 25.2933 22.0187 25.3491 21.9294C25.4049 21.8402 25.4346 21.7371 25.4347 21.6318V13.1992C25.4355 13.1036 25.412 13.0092 25.3662 12.9252C25.3204 12.8412 25.254 12.7702 25.1731 12.719ZM11.375 19.1878C11.375 19.3369 11.3157 19.48 11.2102 19.5855C11.1048 19.691 10.9617 19.7503 10.8125 19.7503C10.6633 19.7503 10.5202 19.691 10.4148 19.5855C10.3093 19.48 10.25 19.3369 10.25 19.1878V14.6878C10.25 14.5386 10.3093 14.3955 10.4148 14.29C10.5202 14.1845 10.6633 14.1253 10.8125 14.1253C10.9617 14.1253 11.1048 14.1845 11.2102 14.29C11.3157 14.3955 11.375 14.5386 11.375 14.6878V19.1878ZM17 19.7503C16.555 19.7503 16.12 19.6183 15.75 19.3711C15.38 19.1238 15.0916 18.7724 14.9213 18.3613C14.751 17.9502 14.7064 17.4978 14.7932 17.0613C14.8801 16.6248 15.0943 16.2239 15.409 15.9093C15.7237 15.5946 16.1246 15.3803 16.561 15.2935C16.9975 15.2067 17.4499 15.2512 17.861 15.4215C18.2722 15.5918 18.6236 15.8802 18.8708 16.2502C19.118 16.6202 19.25 17.0552 19.25 17.5003C19.25 18.097 19.0129 18.6693 18.591 19.0912C18.169 19.5132 17.5967 19.7503 17 19.7503ZM23.75 20.3128C23.75 20.4619 23.6907 20.605 23.5852 20.7105C23.4798 20.816 23.3367 20.8753 23.1875 20.8753C23.0383 20.8753 22.8952 20.816 22.7898 20.7105C22.6843 20.605 22.625 20.4619 22.625 20.3128V15.8128C22.625 15.6636 22.6843 15.5205 22.7898 15.415C22.8952 15.3095 23.0383 15.2503 23.1875 15.2503C23.3367 15.2503 23.4798 15.3095 23.5852 15.415C23.6907 15.5205 23.75 15.6636 23.75 15.8128V20.3128Z" fill="#DEDEE3" />
                </svg>
            )
        }
    ] : [];

    // Status badge component using your app colors
    const StatusBadge = ({ status }: { status: string }) => {
        const getStatusConfig = (status: string) => {
            switch (status) {
                case 'Completed':
                    return { bg: 'bg-[#00FFB3]/20', text: 'text-[#00FFB3]', dot: 'bg-[#00FFB3]' };
                case 'Pending':
                    return { bg: 'bg-[#FFA500]/20', text: 'text-[#FFA500]', dot: 'bg-[#FFA500]' };
                case 'Failed':
                    return { bg: 'bg-[#FF453A]/20', text: 'text-[#FF453A]', dot: 'bg-[#FF453A]' };
                case 'In Progress':
                    return { bg: 'bg-[#3AF4BD]/20', text: 'text-[#3AF4BD]', dot: 'bg-[#3AF4BD]' };
                case 'On Hold':
                    return { bg: 'bg-[#8C8C93]/20', text: 'text-[#8C8C93]', dot: 'bg-[#8C8C93]' };
                case 'Canceled':
                    return { bg: 'bg-[#FF453A]/20', text: 'text-[#FF453A]', dot: 'bg-[#FF453A]' };
                default:
                    return { bg: 'bg-[#8C8C93]/20', text: 'text-[#8C8C93]', dot: 'bg-[#8C8C93]' };
            }
        };

        const config = getStatusConfig(status);

        return (
            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ${config.bg}`}>
                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                <span className={`text-sm font-medium ${config.text}`}>{status}</span>
            </div>
        );
    };

    // Transactions Table Columns
    const transactionsColumns: TableColumn<Transaction>[] = [
        {
            key: 'reference',
            header: 'REFERENCE',
            sortable: true,
            render: (value: any, row: Transaction) => (
                <span className="text-[#DEDEE3] font-mono text-sm">{row.reference}</span>
            )
        },
        {
            key: 'type',
            header: 'TYPE',
            sortable: true,
            render: (value: any, row: Transaction) => (
                <span className="text-[#DEDEE3]">{getTransactionTypeDisplay(row)}</span>
            )
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            sortable: true,
            render: (value: any, row: Transaction) => (
                <span className={`font-medium ${row.type === 'credit' ? 'text-[#00FFB3]' : 'text-[#FF453A]'}`}>
                    {row.type === 'credit' ? '+' : '-'}{formatCurrency(row.amount, row.currency)}
                </span>
            )
        },
        {
            key: 'note',
            header: 'DESCRIPTION',
            sortable: false,
            render: (value: any, row: Transaction) => (
                <span className="text-[#8C8C93] text-sm">{row.note || 'N/A'}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: any, row: Transaction) => (
                <StatusBadge status={getTransactionStatus(row)} />
            )
        },
        {
            key: 'created_at',
            header: 'DATE',
            sortable: true,
            render: (value: any, row: Transaction) => (
                <span className="text-[#8C8C93]">{formatDate(row.created_at)}</span>
            )
        }
    ];

    // Filter data based on search query and active filter
    const filteredTransactions = apiTransactionsData.filter(transaction => {
        const matchesSearch = 
            transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
            getTransactionTypeDisplay(transaction).toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.amount.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === 'All' || 
            (activeFilter === 'Pay-Ins' && transaction.type === 'credit') ||
            (activeFilter === 'Pay-Outs' && transaction.type === 'debit');

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            {/* Metric Cards */}
            <div className="px-3 md:px-6 animate-in slide-in-from-bottom duration-900 delay-100">
                <div className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {cardsData.map((card, index) => (
                            <MetricCard
                                key={index}
                                title={card.title}
                                amount={card.amount}
                                change={card.change}
                                icon={card.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="px-3 md:px-6 animate-in slide-in-from-bottom duration-900 delay-300">
                <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                    {/* Table Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                                <ReceiptIcon className="w-5 h-5 text-[#8C8C93]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-[#DEDEE3]">Transactions</h2>
                            </div>
                        </div>

                        {/* Right side - Filters and Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search Input */}
                            <div className="w-64">
                                <Input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-[#303033] border-[#363639] text-[#DEDEE3] placeholder-[#8C8C93]"
                                />
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex items-center bg-[#303033] rounded-lg p-1">
                                {['All', 'Pay-Ins', 'Pay-Outs'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                                            activeFilter === filter
                                                ? 'bg-[#404044] text-[#DEDEE3]'
                                                : 'text-[#8C8C93] hover:text-[#DEDEE3]'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            {/* Download Button */}
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                }
                                className="px-3 py-2 bg-[#303033] border-[#363639] hover:bg-[#404044]"
                            >
                                Download
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <DataTable
                        data={filteredTransactions}
                        columns={transactionsColumns}
                        variant="dark"
                        loading={isLoading}
                        className="animate-in fade-in duration-700 delay-400 border-none"
                        pagination={pagination}
                        onPageChange={(page: number) => fetchTransactions(page, pagination?.per_page || 10)}
                        onPageSizeChange={(pageSize: number) => fetchTransactions(1, pageSize)}
                        onRowClick={handleRowClick}
                        showPagination={true}
                    />
                </div>
            </div>

            {/* Transaction Detail Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedTransaction && (
                    <div className="bg-[#1C1C1E] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md bg-[#303033] border border-[#363639] flex items-center justify-center">
                                    <ReceiptIcon className="w-5 h-5 text-[#8C8C93]" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-[#DEDEE3]">
                                        Transaction Details
                                    </h2>
                                    <p className="text-sm text-[#8C8C93]">
                                        {selectedTransaction.reference}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-[#303033] rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Transaction Status and Amount */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-[#303033] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">Amount</p>
                                        <p className={`text-2xl font-bold ${
                                            selectedTransaction.type === 'credit' ? 'text-[#00FFB3]' : 'text-[#FF453A]'
                                        }`}>
                                            {selectedTransaction.type === 'credit' ? '+' : '-'}
                                            {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                                        </p>
                                    </div>
                                    <StatusBadge status={getTransactionStatus(selectedTransaction)} />
                                </div>
                            </div>
                            <div className="bg-[#303033] rounded-lg p-4">
                                <p className="text-sm text-[#8C8C93] mb-1">Transaction Type</p>
                                <p className="text-lg font-semibold text-[#DEDEE3]">
                                    {getTransactionTypeDisplay(selectedTransaction)}
                                </p>
                                <p className="text-sm text-[#8C8C93] mt-1">
                                    {selectedTransaction.source}
                                </p>
                            </div>
                        </div>

                        {/* Transaction Details Grid */}
                        <div className="space-y-4">
                            <h3 className="text-md font-semibold text-[#DEDEE3] mb-3">Transaction Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">Reference ID</p>
                                        <p className="text-sm font-mono text-[#DEDEE3] bg-[#303033] rounded px-3 py-2">
                                            {selectedTransaction.reference}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">Transaction ID</p>
                                        <p className="text-sm font-mono text-[#DEDEE3] bg-[#303033] rounded px-3 py-2">
                                            #{selectedTransaction.id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">Currency</p>
                                        <p className="text-sm text-[#DEDEE3] bg-[#303033] rounded px-3 py-2">
                                            {selectedTransaction.currency}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">Date & Time</p>
                                        <p className="text-sm text-[#DEDEE3] bg-[#303033] rounded px-3 py-2">
                                            {formatDate(selectedTransaction.created_at)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">Previous Balance</p>
                                        <p className="text-sm text-[#DEDEE3] bg-[#303033] rounded px-3 py-2">
                                            {formatCurrency(selectedTransaction.previous_balance, selectedTransaction.currency)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#8C8C93] mb-1">New Balance</p>
                                        <p className="text-sm text-[#DEDEE3] bg-[#303033] rounded px-3 py-2">
                                            {formatCurrency(selectedTransaction.new_balance, selectedTransaction.currency)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {selectedTransaction.note && (
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-2">Description</p>
                                    <div className="bg-[#303033] rounded-lg p-3">
                                        <p className="text-sm text-[#DEDEE3]">{selectedTransaction.note}</p>
                                    </div>
                                </div>
                            )}

                            {/* Wallet Information */}
                            {selectedTransaction.wallet && (
                                <div>
                                    <h3 className="text-md font-semibold text-[#DEDEE3] mb-3 mt-6">Wallet Information</h3>
                                    <div className="bg-[#303033] rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-[#8C8C93] mb-1">Wallet ID</p>
                                                <p className="text-sm font-mono text-[#DEDEE3]">#{selectedTransaction.wallet.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#8C8C93] mb-1">Wallet Type</p>
                                                <p className="text-sm text-[#DEDEE3] capitalize">{selectedTransaction.wallet.type}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#8C8C93] mb-1">Current Balance</p>
                                                <p className="text-sm font-semibold text-[#00FFB3]">
                                                    {formatCurrency(selectedTransaction.wallet.balance, selectedTransaction.wallet.currency)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#8C8C93] mb-1">Available Balance</p>
                                                <p className="text-sm font-semibold text-[#3AF4BD]">
                                                    {formatCurrency(selectedTransaction.wallet.available_balance, selectedTransaction.wallet.currency)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#313135]">
                            <Button
                                variant="secondary"
                                onClick={closeModal}
                                className="px-4 py-2 bg-[#303033] border-[#363639] hover:bg-[#404044]"
                            >
                                Close
                            </Button>
                            <Button
                                variant="secondary"
                                className="px-4 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                                icon={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                }
                            >
                                Export
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TransactionsContent;
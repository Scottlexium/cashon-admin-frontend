import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { MetricCard } from '@/components/ui/metric-card';
import { ReceiptIcon } from '@/components/icons';

const TransactionsContent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    // Cards data
    const cardsData = [
        {
            title: 'Total Pay-outs',
            amount: '₦32,450.00',
            change: '15.3%',
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
            title: 'Total Pay-Ins',
            amount: '₦32,450.00',
            change: '15.3%',
            icon: (
                <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_1990_6915" fill="white">
                        <path d="M0 6.7439C0 3.29549 2.79549 0.5 6.2439 0.5H27.7561C31.2045 0.5 34 3.29549 34 6.7439V28.2561C34 31.7045 31.2045 34.5 27.7561 34.5H6.2439C2.79549 34.5 0 31.7045 0 28.2561V6.7439Z" />
                    </mask>
                    <path d="M0 6.7439C0 3.29549 2.79549 0.5 6.2439 0.5H27.7561C31.2045 0.5 34 3.29549 34 6.7439V28.2561C34 31.7045 31.2045 34.5 27.7561 34.5H6.2439C2.79549 34.5 0 31.7045 0 28.2561V6.7439Z" fill="#303033" />
                    <path d="M6.2439 0.5V1.28049H27.7561V0.5V-0.280488H6.2439V0.5ZM34 6.7439H33.2195V28.2561H34H34.7805V6.7439H34ZM27.7561 34.5V33.7195H6.2439V34.5V35.2805H27.7561V34.5ZM0 28.2561H0.780488V6.7439H0H-0.780488V28.2561H0ZM6.2439 34.5V33.7195C3.22654 33.7195 0.780488 31.2735 0.780488 28.2561H0H-0.780488C-0.780488 32.1356 2.36444 35.2805 6.2439 35.2805V34.5ZM34 28.2561H33.2195C33.2195 31.2735 30.7735 33.7195 27.7561 33.7195V34.5V35.2805C31.6356 35.2805 34.7805 32.1356 34.7805 28.2561H34ZM27.7561 0.5V1.28049C30.7735 1.28049 33.2195 3.72654 33.2195 6.7439H34H34.7805C34.7805 2.86444 31.6356 -0.280488 27.7561 -0.280488V0.5ZM6.2439 0.5V-0.280488C2.36444 -0.280488 -0.780488 2.86444 -0.780488 6.7439H0H0.780488C0.780488 3.72654 3.22654 1.28049 6.2439 1.28049V0.5Z" fill="#363639" mask="url(#path-1-inside-1_1990_6915)" />
                    <path d="M25.1731 12.719C25.0921 12.6685 24.9996 12.6394 24.9043 12.6344C24.809 12.6295 24.714 12.6489 24.6282 12.6909C21.6097 14.1674 19.4539 13.4756 17.1751 12.7457C14.7781 11.9828 12.3031 11.1918 8.8782 12.8638C8.78362 12.91 8.70388 12.9818 8.64808 13.0711C8.59227 13.1603 8.56262 13.2634 8.5625 13.3687V21.8013C8.56249 21.8967 8.58676 21.9906 8.63303 22.0741C8.6793 22.1575 8.74604 22.2279 8.82699 22.2784C8.90793 22.329 9.00041 22.3581 9.09572 22.3631C9.19103 22.3681 9.28603 22.3487 9.3718 22.3068C12.3903 20.8303 14.5461 21.5221 16.8284 22.252C18.1813 22.6844 19.5594 23.1253 21.1175 23.1253C22.3191 23.1253 23.6298 22.8637 25.119 22.1367C25.2136 22.0905 25.2933 22.0187 25.3491 21.9294C25.4049 21.8402 25.4346 21.7371 25.4347 21.6318V13.1992C25.4355 13.1036 25.412 13.0092 25.3662 12.9252C25.3204 12.8412 25.254 12.7702 25.1731 12.719ZM11.375 19.1878C11.375 19.3369 11.3157 19.48 11.2102 19.5855C11.1048 19.691 10.9617 19.7503 10.8125 19.7503C10.6633 19.7503 10.5202 19.691 10.4148 19.5855C10.3093 19.48 10.25 19.3369 10.25 19.1878V14.6878C10.25 14.5386 10.3093 13.8955 10.4148 14.29C10.5202 14.1845 10.6633 14.1253 10.8125 14.1253C10.9617 14.1253 11.1048 14.1845 11.2102 14.29C11.3157 14.3955 11.375 14.5386 11.375 14.6878V19.1878ZM17 19.7503C16.555 19.7503 16.12 19.6183 15.75 19.3711C15.38 19.1238 15.0916 18.7724 14.9213 18.3613C14.751 17.9502 14.7064 16.9978 14.7932 16.5613C14.8801 16.1248 15.0943 15.7239 15.409 15.4093C15.7237 15.0946 16.1246 14.8803 16.561 14.7935C16.9975 14.7067 17.4499 14.7512 17.861 14.9215C18.2722 15.0918 18.6236 15.3802 18.8708 15.7502C19.118 16.1202 19.25 16.5552 19.25 17.0003C19.25 17.597 19.0129 18.1693 18.591 18.5912C18.169 19.0132 17.5967 19.2503 17 19.2503ZM23.75 20.3128C23.75 20.4619 23.6907 20.605 23.5852 20.7105C23.4798 20.816 23.3367 20.8753 23.1875 20.8753C23.0383 20.8753 22.8952 20.816 22.7898 20.7105C22.6843 20.605 22.625 20.4619 22.625 20.3128V15.8128C22.625 15.6636 22.6843 15.5205 22.7898 15.415C22.8952 15.3095 23.0383 15.2503 23.1875 15.2503C23.3367 15.2503 23.4798 15.3095 23.5852 15.415C23.6907 15.5205 23.75 15.6636 23.75 15.8128V20.3128Z" fill="#DEDEE3" />
                </svg>
            )
        }
    ];

    // Transactions data
    const transactionsData = [
        {
            id: '1',
            transactionId: 'TNX001',
            type: 'Pay-Ins',
            amount: '₦10,000.00',
            status: 'Completed',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '2',
            transactionId: 'TNX002',
            type: 'Pay-Ins',
            amount: '₦3,000.00',
            status: 'Pending',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '3',
            transactionId: 'TNX002',
            type: 'Pay-Ins',
            amount: '₦3,000.00',
            status: 'Failed',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4',
            transactionId: 'TNX002',
            type: 'Pay-Ins',
            amount: '₦3,000.00',
            status: 'In Progress',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '5',
            transactionId: 'TNX002',
            type: 'Pay-Ins',
            amount: '₦3,000.00',
            status: 'On Hold',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '6',
            transactionId: 'TNX002',
            type: 'Pay-Ins',
            amount: '₦3,000.00',
            status: 'Canceled',
            date: '08 Aug 2025, 14:32'
        }
    ];

    // Status badge component
    const StatusBadge = ({ status }: { status: string }) => {
        const getStatusConfig = (status: string) => {
            switch (status) {
                case 'Completed':
                    return { bg: 'bg-green-500/20', text: 'text-green-400', dot: 'bg-green-400' };
                case 'Pending':
                    return { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' };
                case 'Failed':
                    return { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400' };
                case 'In Progress':
                    return { bg: 'bg-teal-500/20', text: 'text-teal-400', dot: 'bg-teal-400' };
                case 'On Hold':
                    return { bg: 'bg-teal-500/20', text: 'text-teal-400', dot: 'bg-teal-400' };
                case 'Canceled':
                    return { bg: 'bg-green-500/20', text: 'text-green-400', dot: 'bg-green-400' };
                default:
                    return { bg: 'bg-gray-500/20', text: 'text-gray-400', dot: 'bg-gray-400' };
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
    const transactionsColumns: TableColumn<any>[] = [
        {
            key: 'transactionId',
            header: 'TRANSACTION ID',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.transactionId}</span>
            )
        },
        {
            key: 'type',
            header: 'TYPE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.type}</span>
            )
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.amount}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: any, row: any) => (
                <StatusBadge status={row.status} />
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

    // Filter data based on search query and active filter
    const filteredTransactions = transactionsData.filter(transaction => {
        const matchesSearch = 
            transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.status.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === 'All' || 
            (activeFilter === 'Pay-Ins' && transaction.type === 'Pay-Ins') ||
            (activeFilter === 'Pay-Outs' && transaction.type === 'Pay-Outs');

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
                            {/* Filter Tabs */}
                            <div className="flex items-center bg-[#303033] rounded-lg p-1">
                                {['Pay-Ins', 'Pay-Outs'].map((filter) => (
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
                        className="animate-in fade-in duration-700 delay-400 border-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionsContent
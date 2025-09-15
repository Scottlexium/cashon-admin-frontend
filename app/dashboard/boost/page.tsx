"use client";
import { Metrics, MetricsItem } from '@/components/ui/metrics';
import { Chart } from '@/components/ui/charts';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { DatePicker, DateRange, RelativeRange } from '@/components/ui/calendar/date-picker';
import { Toggle } from '@/components/ui/toggle';
import { RevenueIcon } from '@/components/icons';
import { Popover } from '@/components/ui/popover';

const Page = () => {
    const [isBoostConfigOpen, setIsBoostConfigOpen] = useState(false);
    
    const statsData: MetricsItem[] = [
        {
            title: 'Current Annual Boost Cap',
            value: 5000000.00,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#3AF4BD" />
                </svg>
            </>,
            change: {
                value: '12.5%',
                type: 'increase' as const,
            },
            currency: "NGN",
            format: 'currency'
        },
        {
            title: 'Boost Allocated',
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#E697FF" />
                </svg>

            </>,

            value: 5000000.00,
            change: {
                value: '12.6%',
                type: 'increase' as const,
            },
            currency: "NGN",
            format: 'currency'
        },
        {
            title: 'Reserve Pool',
            value: 2800000,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#ECA450" />
                </svg>
            </>,
            change: {
                value: '5.4%',
                type: 'increase' as const,
            },
            currency: "NGN",
            format: 'currency'
        },
        {
            title: 'Upcoming Boost Payouts',
            value: 3500000,
            icon: <>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="2.5" fill="#65A3FF" />
                </svg>
            </>,
            change: {
                value: '4.2%',
                type: 'increase' as const,
            },
            currency: "NGN",
            format: 'currency'
        },
    ];

    // Boost payout data
    const boostPayoutData = [
        { month: 'Jan', payouts: 850000 },
        { month: 'Feb', payouts: 920000 },
        { month: 'Mar', payouts: 880000 },
        { month: 'Apr', payouts: 1200000 },
        { month: 'May', payouts: 1450000 },
        { month: 'Jun', payouts: 1650000 },
        { month: 'Jul', payouts: 1900000 },
        { month: 'Aug', payouts: 2200000 },
        { month: 'Sep', payouts: 2450000 },
        { month: 'Oct', payouts: 2680000 },
        { month: 'Nov', payouts: 2850000 },
        { month: 'Dec', payouts: 3200000 },
    ];

    // Chart formatters
    const boostChartFormatters = {
        value: (value: number) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
            return value.toString();
        },
        tooltip: (data: any, field: string) => {
            const value = data[field];
            const formatted = value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` :
                value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
            return `Payouts: ₦${formatted}`;
        }
    };

    // Boost payout schedule table data
    const boostScheduleData = [
        {
            month: 'AUG 2025',
            users: 800,
            amount: 10000000.00,
            avgBoost: 12500000.00,
            status: 'Upcoming',
            payoutDate: '02 Aug 2025'
        },
        {
            month: 'JUL 2025',
            users: 465,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Upcoming',
            payoutDate: '09 Aug 2025, 09:15'
        },
        {
            month: 'JUN 2025',
            users: 764,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Upcoming',
            payoutDate: '01 Aug 2025, 11:47'
        },
        {
            month: 'MAY 2025',
            users: 321,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '11 Aug 2025, 16:32'
        },
        {
            month: 'APR 2025',
            users: 987,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '12 Aug 2025, 12:03'
        },
        {
            month: 'MAR 2025',
            users: 684,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '13 Aug 2025, 08:45'
        },
        {
            month: 'FEB 2025',
            users: 156,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '14 Aug 2025, 19:30'
        },
        {
            month: 'JAN 2025',
            users: 753,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '15 Aug 2025, 07:50'
        },
        {
            month: 'DEC 2024',
            users: 602,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '16 Aug 2025, 15:11'
        },
        {
            month: 'NOV 2024',
            users: 245,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '17 Aug 2025, 10:05'
        },
        {
            month: 'OCT 2024',
            users: 968,
            amount: 18000000.00,
            avgBoost: 42000000.00,
            status: 'Paid',
            payoutDate: '18 Aug 2025, 13:40'
        }
    ];

    // Table columns configuration
    const boostScheduleColumns = [
        {
            key: 'month',
            header: 'MONTH',
            accessor: 'month' as const,
            width: '120px',
            render: (value: string) => (
                <span className="text-[#DEDEE3] text-sm font-medium">{value}</span>
            )
        },
        {
            key: 'users',
            header: 'USERS',
            accessor: 'users' as const,
            width: '100px',
            render: (value: number) => (
                <span className="text-[#DEDEE3] text-sm">{value.toLocaleString()}</span>
            )
        },
        {
            key: 'amount',
            header: 'AMOUNT',
            accessor: 'amount' as const,
            width: '150px',
            render: (value: number) => (
                <span className="text-[#DEDEE3] text-sm">₦{value.toLocaleString()}.00</span>
            )
        },
        {
            key: 'avgBoost',
            header: 'AVG BOOST',
            accessor: 'avgBoost' as const,
            width: '150px',
            render: (value: number) => (
                <span className="text-[#DEDEE3] text-sm">₦{value.toLocaleString()}.00</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            accessor: 'status' as const,
            width: '120px',
            render: (value: string) => {
                const statusColors = {
                    'Upcoming': 'text-[#05B480]',
                    'Paid': 'text-[#7987FF]'
                };
                const dotColors = {
                    'Upcoming': 'bg-[#05B480]',
                    'Paid': 'bg-[#7987FF]'
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
            key: 'payoutDate',
            header: 'PAYOUT DATE',
            accessor: 'payoutDate' as const,
            width: '180px',
            render: (value: string) => (
                <span className="text-[#8C8C93] text-sm">{value}</span>
            )
        }
    ];

    const [dateRange, setDateRange] = useState<DateRange | RelativeRange>({
        label: 'Last 7 Days',
        value: 'last-7-days'
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [liveMode, setLiveMode] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(false);

    // Boost activity data for table
    const boostActivityData = [
        { metric: 'Boost Cap (Principal)', value: '₦10,000,000' },
        { metric: 'Liquidity Threshold', value: '₦15,000,000' },
        { metric: 'Duration', value: '12 Months' },
        { metric: 'Boost Rate', value: '14%' },
        { metric: 'Minimum Saving Amount', value: '₦50,000' }
    ];

    // Boost activity table columns
    const boostActivityColumns: TableColumn<typeof boostActivityData[0]>[] = [
        {
            key: 'metric',
            header: '',
            accessor: 'metric',
            width: '60%',
            render: (value: string) => (
                <span className="text-sm text-[#8C8C93]">{value}</span>
            )
        },
        {
            key: 'value',
            header: '',
            accessor: 'value',
            width: '40%',
            align: 'right',
            render: (value: string) => (
                <span className="text-sm text-[#DEDEE3] font-semibold text-right">{value}</span>
            )
        }
    ];

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="px-4 sm:px-6 animate-in slide-in-from-top duration-600">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-medium text-[#A2A2A7] transition-all duration-300">
                            Boost
                        </h1>
                        <p className="text-sm text-[#8C8C93] mt-1">
                            Monitor and configure boost programs for your platform
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <Popover
                            trigger={<Button variant="outline">Filters</Button>}
                        >
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-[#A2A2A7] mb-2">Date Range</h3>
                                <DatePicker
                                    value={dateRange}
                                    onChange={setDateRange}
                                    className="w-full"
                                    size="sm"
                                />
                            </div>
                        </Popover> */}
                    </div>
                </div>
            </div>

            {/* Stats Container */}
            <div className="px-4 sm:px-6 animate-in slide-in-from-left duration-700 delay-100">
                <Metrics
                    items={statsData}
                    variant="dark"
                    className="animate-in fade-in duration-700 delay-200"
                />
            </div>

            {/* Charts and Side Panel Section */}
            <div className="px-4 sm:px-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom duration-800 delay-300">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Chart Section - Takes 3/4 of the space */}
                    <div className="lg:col-span-3 rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-left duration-800 delay-400">
                        {/* Chart Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-4 sm:mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center transition-all duration-300">
                                </div>
                                <div>
                                    <h2 className="text-base font-medium text-[#DEDEE3] transition-colors duration-300">Upcoming Boost Payouts</h2>
                                </div>
                            </div>

                            {/* Date Filter */}
                            <DatePicker
                                value={dateRange}
                                onChange={setDateRange}
                                className="w-full sm:w-auto sm:min-w-[140px] xl:min-w-[160px]"
                                size="sm"
                            />
                        </div>

                        {/* Total Amount */}
                        <div className="mb-4 sm:mb-6">
                            <p className="text-xs font-medium text-[#7A7A83] mb-1 transition-colors duration-300">
                                Total Transaction ({
                                    'label' in dateRange
                                        ? dateRange.label.toLowerCase()
                                        : `${dateRange.from?.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString()}`
                                })
                            </p>
                            <p className="text-base sm:text-2xl font-semibold text-[#DEDEE3] transition-all duration-300 break-all">₦2,563,975,897.00</p>
                        </div>

                        {/* Chart Container */}
                        <div className="overflow-hidden rounded-lg">
                            <Chart
                                className='border-none p-0'
                                type="bar"
                                data={boostPayoutData}
                                fields={{
                                    label: 'month',
                                    values: ['payouts']
                                }}
                                height={280}
                                colors={{
                                    series: ['#3AF4BD'],
                                    grid: '#374151',
                                    text: {
                                        primary: '#DEDEE3',
                                        secondary: '#8C8C93',
                                        muted: '#7A7A83'
                                    }
                                }}
                                layout={{
                                    gridLines: 'horizontal',
                                    legend: {
                                        position: 'none',
                                        style: 'lines',
                                    }
                                }}
                                formatters={boostChartFormatters}
                                animation={{
                                    enabled: true,
                                    duration: 1000,
                                    delay: 400,
                                    stagger: true
                                }}
                            />
                        </div>
                    </div>

                    {/* Side Panel - Takes 1/4 of the space */}
                    <div className="lg:col-span-2 rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-right duration-800 delay-500">
                        {/* Header Row */}
                        <div className="flex items-center justify-between px-4 sm:px-6 my-4">
                            <h2 className="text-base font-medium text-[#8C8C93]">Boost Activity</h2>
                            <Toggle
                                checked={liveMode}
                                onChange={setLiveMode}
                                size="sm"
                                variant="default"
                                className="flex-row-reverse gap-2"
                            />
                        </div>

                        {/* Activity Items */}
                        <DataTable
                            data={boostActivityData}
                            columns={boostActivityColumns}
                            variant="dark"
                            className="border-none"
                            showHeader={false}
                        />
                    </div>
                </div>
            </div>

            {/* Boost Payout Schedule Table Section */}
            <div className="px-4 sm:px-6 animate-in slide-in-from-bottom duration-900 delay-600">
                <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                    {/* Table Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_1634_974" fill="white">
                                    <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" />
                                </mask>
                                <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" fill="#303033" />
                                <path d="M6.2439 0V0.780488H27.7561V0V-0.780488H6.2439V0ZM34 6.2439H33.2195V27.7561H34H34.7805V6.2439H34ZM27.7561 34V33.2195H6.2439V34V34.7805H27.7561V34ZM0 27.7561H0.780488V6.2439H0H-0.780488V27.7561H0ZM6.2439 34V33.2195C3.22654 33.2195 0.780488 30.7735 0.780488 27.7561H0H-0.780488C-0.780488 31.6356 2.36444 34.7805 6.2439 34.7805V34ZM34 27.7561H33.2195C33.2195 30.7735 30.7735 33.2195 27.7561 33.2195V34V34.7805C31.6356 34.7805 34.7805 31.6356 34.7805 27.7561H34ZM27.7561 0V0.780488C30.7735 0.780488 33.2195 3.22654 33.2195 6.2439H34H34.7805C34.7805 2.36444 31.6356 -0.780488 27.7561 -0.780488V0ZM6.2439 0V-0.780488C2.36444 -0.780488 -0.780488 2.36444 -0.780488 6.2439H0H0.780488C0.780488 3.22654 3.22654 0.780488 6.2439 0.780488V0Z" fill="#363639" mask="url(#path-1-inside-1_1634_974)" />
                                <path d="M25.1731 12.219C25.0921 12.1685 24.9996 12.1394 24.9043 12.1344C24.809 12.1295 24.714 12.1489 24.6282 12.1909C21.6097 13.6674 19.4539 12.9756 17.1751 12.2457C14.7781 11.4828 12.3031 10.6918 8.8782 12.3638C8.78362 12.41 8.70388 12.4818 8.64808 12.5711C8.59227 12.6603 8.56262 12.7634 8.5625 12.8687V21.3013C8.56249 21.3967 8.58676 21.4906 8.63303 21.5741C8.6793 21.6575 8.74604 21.7279 8.82699 21.7784C8.90793 21.829 9.00041 21.8581 9.09572 21.8631C9.19103 21.8681 9.28603 21.8487 9.3718 21.8068C12.3903 20.3303 14.5461 21.0221 16.8284 21.752C18.1813 22.1844 19.5594 22.6253 21.1175 22.6253C22.3191 22.6253 23.6298 22.3637 25.119 21.6367C25.2136 21.5905 25.2933 21.5187 25.3491 21.4294C25.4049 21.3402 25.4346 21.2371 25.4347 21.1318V12.6992C25.4355 12.6036 25.412 12.5092 25.3662 12.4252C25.3204 12.3412 25.254 12.2702 25.1731 12.219ZM11.375 18.6878C11.375 18.8369 11.3157 18.98 11.2102 19.0855C11.1048 19.191 10.9617 19.2503 10.8125 19.2503C10.6633 19.2503 10.5202 19.191 10.4148 19.0855C10.3093 18.98 10.25 18.8369 10.25 18.6878V14.1878C10.25 14.0386 10.3093 13.8955 10.4148 13.79C10.5202 13.6845 10.6633 13.6253 10.8125 13.6253C10.9617 13.6253 11.1048 13.6845 11.2102 13.79C11.3157 13.8955 11.375 14.0386 11.375 14.1878V18.6878ZM17 19.2503C16.555 19.2503 16.12 19.1183 15.75 18.8711C15.38 18.6238 15.0916 18.2724 14.9213 17.8613C14.751 17.4502 14.7064 16.9978 14.7932 16.5613C14.8801 16.1248 15.0943 15.7239 15.409 15.4093C15.7237 15.0946 16.1246 14.8803 16.561 14.7935C16.9975 14.7067 17.4499 14.7512 17.861 14.9215C18.2722 15.0918 18.6236 15.3802 18.8708 15.7502C19.118 16.1202 19.25 16.5552 19.25 17.0003C19.25 17.597 19.0129 18.1693 18.591 18.5912C18.169 19.0132 17.5967 19.2503 17 19.2503ZM23.75 19.8128C23.75 19.9619 23.6907 20.105 23.5852 20.2105C23.4798 20.316 23.3367 20.3753 23.1875 20.3753C23.0383 20.3753 22.8952 20.316 22.7898 20.2105C22.6843 20.105 22.625 19.9619 22.625 19.8128V15.3128C22.625 15.1636 22.6843 15.0205 22.7898 14.915C22.8952 14.8095 23.0383 14.7503 23.1875 14.7503C23.3367 14.7503 23.4798 14.8095 23.5852 14.915C23.6907 15.0205 23.75 15.1636 23.75 15.3128V19.8128Z" fill="#DEDEE3" />
                            </svg>

                            <div>
                                <h2 className="text-lg font-medium text-[#DEDEE3]">Boost Payout Schedule</h2>
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
                        data={boostScheduleData}
                        columns={boostScheduleColumns}
                        variant="dark"
                        className="animate-in fade-in duration-700 delay-700"
                    />
                </div>
            </div>
        </div>
    )
}

export default Page

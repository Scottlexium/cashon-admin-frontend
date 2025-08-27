'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Metrics } from '@/components/ui/metrics';
import { Chart, ChartPresets } from '@/components/ui/charts';
import { CircularProgressChart, CircularProgressChartProps } from '@/components/ui/circular-progress-chart';
import { DatePicker, DateRange, RelativeRange } from '@/components/ui/date-picker';
import { WalletIcon, LayersIcon, DatabaseIcon, ReceiptIcon } from '@/components/icons';

export default function OverviewPage() {
  const { user } = useAuthStore();

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | RelativeRange>({
    label: 'Last 7 Days',
    value: 'last-7-days'
  });
  // Sample data - in a real app, this would come from an API
  const statsData = [
    {
      title: 'Total Deposit',
      value: 245890.00,
      format: 'currency' as const,
      currency: 'NGN',
      locale: 'en-NG',
      change: {
        value: '12.5%',
        type: 'increase' as const,
      },
      icon: <WalletIcon />,
    },
    {
      title: 'Total Withdrawals',
      value: 124750.00,
      format: 'currency' as const,
      currency: 'USD',
      locale: 'en-US',
      change: {
        value: '3.2%',
        type: 'decrease' as const,
      },
      icon: <LayersIcon />,
    },
    {
      title: 'Active Users',
      value: 1500,
      format: 'number' as const,
      change: {
        value: '8.4%',
        type: 'increase' as const,
      },
      icon: <DatabaseIcon />,
    },
    {
      title: 'Revenue',
      value: 32450.00,
      format: 'currency' as const,
      currency: 'EUR',
      locale: 'en-EU',
      change: {
        value: '15.3%',
        type: 'increase' as const,
      },
      icon: <ReceiptIcon />,
    },
  ];

  // Generic chart data - can use any field names
  const transactionData = [
    { month: 'Jan', deposits: 85000, withdrawals: 45000, netFlow: 40000 },
    { month: 'Feb', deposits: 55000, withdrawals: 35000, netFlow: 20000 },
    { month: 'Mar', deposits: 75000, withdrawals: 60000, netFlow: 15000 },
    { month: 'Apr', deposits: 95000, withdrawals: 70000, netFlow: 25000 },
    { month: 'May', deposits: 45000, withdrawals: 25000, netFlow: 20000 },
    { month: 'Jun', deposits: 68000, withdrawals: 52000, netFlow: 16000 },
    { month: 'Jul', deposits: 78000, withdrawals: 45000, netFlow: 33000 },
    { month: 'Aug', deposits: 52000, withdrawals: 38000, netFlow: 14000 },
    { month: 'Sep', deposits: 82000, withdrawals: 65000, netFlow: 17000 },
    { month: 'Oct', deposits: 48000, withdrawals: 30000, netFlow: 18000 },
    { month: 'Nov', deposits: 35000, withdrawals: 22000, netFlow: 13000 },
    { month: 'Dec', deposits: 88000, withdrawals: 55000, netFlow: 33000 },
  ];

  // Revenue data for circular chart
  const revenueData: CircularProgressChartProps["segments"] = [
    {
      label: 'Fees',
      value: 2000,
      color: {
        from: '#65A3FF', // Cyan
        to: '#E697FF',   // Light Cyan
        direction: 'diagonal'
      },
      percentage: 14.3
    },
    {
      label: 'ROI',
      value: 8000,
      color: {
        from: '#65A3FF', // Cyan
        to: '#E697FF',   // Light Cyan
        direction: 'diagonal'
      },
      percentage: 57.1
    },
    {
      label: 'Boost',
      value: 4000,
      color: {
        from: '#FFFFFF', // Green
        to: '#3AF4BD',   // Light Green
        direction: 'diagonal'
      },
      percentage: 28.6
    }
  ]

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="px-4 sm:px-6 animate-in slide-in-from-top duration-600">
        <h1 className="text-xl sm:text-2xl font-medium text-[#A2A2A7] transition-all duration-300">
          Welcome back, {user?.name || 'Admin'}
        </h1>
      </div>

      {/* Stats Container */}
      <div className="px-4 sm:px-6 animate-in slide-in-from-left duration-700 delay-100">
        <Metrics
          items={statsData}
          variant="dark"
          className="animate-in fade-in duration-700 delay-200"
        />
      </div>

      {/* Charts Section - Side by Side Layout */}
      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom duration-800 delay-300">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Transactions Chart */}
          <div className="xl:col-span-2 rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-left duration-800 delay-400">
          <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-left duration-800 delay-400">
            {/* Top Row - Icon, Title and Date Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center transition-all duration-300">
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-[18px] sm:h-[19px] transition-colors duration-300">
                    <path d="M17.1731 4.719C17.0921 4.66846 16.9996 4.63936 16.9043 4.63444C16.809 4.62952 16.714 4.64894 16.6282 4.69088C13.6097 6.16744 11.4539 5.47557 9.17508 4.74572C6.77813 3.98283 4.30313 3.19182 0.878203 4.86385C0.783616 4.91003 0.703885 4.98182 0.648075 5.07107C0.592266 5.16032 0.562617 5.26343 0.5625 5.36869V13.8013C0.562487 13.8967 0.586757 13.9906 0.633026 14.0741C0.679296 14.1575 0.746044 14.2279 0.826987 14.2784C0.907931 14.329 1.00041 14.3581 1.09572 14.3631C1.19103 14.3681 1.28603 14.3487 1.3718 14.3068C4.39031 12.8303 6.54609 13.5221 8.82844 14.252C10.1813 14.6844 11.5594 15.1253 13.1175 15.1253C14.3191 15.1253 15.6298 14.8637 17.119 14.1367C17.2136 14.0905 17.2933 14.0187 17.3491 13.9294C17.4049 13.8402 17.4346 13.7371 17.4347 13.6318V5.19924C17.4355 5.10355 17.412 5.00923 17.3662 4.9252C17.3204 4.84116 17.254 4.77019 17.1731 4.719ZM3.375 11.1878C3.375 11.3369 3.31574 11.48 3.21025 11.5855C3.10476 11.691 2.96168 11.7503 2.8125 11.7503C2.66332 11.7503 2.52024 11.691 2.41475 11.5855C2.30926 11.48 2.25 11.3369 2.25 11.1878V6.68775C2.25 6.53857 2.30926 6.39549 2.41475 6.29001C2.52024 6.18452 2.66332 6.12525 2.8125 6.12525C2.96168 6.12525 3.10476 6.18452 3.21025 6.29001C3.31574 6.39549 3.375 6.53857 3.375 6.68775V11.1878ZM9 11.7503C8.55499 11.7503 8.11998 11.6183 7.74997 11.3711C7.37996 11.1238 7.09157 10.7724 6.92127 10.3613C6.75097 9.95016 6.70642 9.49776 6.79323 9.0613C6.88005 8.62484 7.09434 8.22393 7.40901 7.90926C7.72368 7.59459 8.12459 7.3803 8.56105 7.29349C8.99751 7.20667 9.4499 7.25123 9.86104 7.42152C10.2722 7.59182 10.6236 7.88021 10.8708 8.25022C11.118 8.62023 11.25 9.05524 11.25 9.50025C11.25 10.097 11.0129 10.6693 10.591 11.0912C10.169 11.5132 9.59674 11.7503 9 11.7503ZM15.75 12.3128C15.75 12.4619 15.6907 12.605 15.5852 12.7105C15.4798 12.816 15.3367 12.8753 15.1875 12.8753C15.0383 12.8753 14.8952 12.816 14.7898 12.7105C14.6843 12.605 14.625 12.4619 14.625 12.3128V7.81275C14.625 7.66357 14.6843 7.52049 14.7898 7.41501C14.8952 7.30952 15.0383 7.25025 15.1875 7.25025C15.3367 7.25025 15.4798 7.30952 15.5852 7.41501C15.6907 7.52049 15.75 7.66357 15.75 7.81275V12.3128Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#DEDEE3] transition-colors duration-300">Transactions</h2>
                </div>
              </div>

              {/* Right Side - Legend and Date Filter */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 xl:gap-6">
                {/* Legend */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#A5E2FF] transition-transform duration-300"></div>
                    <span className="text-xs sm:text-sm text-[#8C8C93] transition-colors duration-300">Deposit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#65A3FF] transition-transform duration-300"></div>
                    <span className="text-xs sm:text-sm text-[#8C8C93] transition-colors duration-300">Withdrawals</span>
                  </div>
                </div>

                {/* Date Filter Dropdown */}
                <DatePicker
                  value={dateRange}
                  onChange={setDateRange}
                  className="w-full sm:w-auto sm:min-w-[140px] xl:min-w-[160px]"
                />
              </div>
            </div>

            {/* Total Transaction Amount */}
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-[#8C8C93] mb-1 transition-colors duration-300">
                Total Transaction ({
                  'label' in dateRange
                    ? dateRange.label.toLowerCase()
                    : `${dateRange.from?.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString()}`
                })
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-[#DEDEE3] transition-all duration-300 break-all">₦2,563,975,897.00</p>
            </div>

            {/* Chart Container */}
            <div className="overflow-hidden rounded-lg">
              <Chart
                className='border-none p-0'
                type="grouped-bar"
                data={transactionData}
                fields={{
                  label: 'month',
                  values: ['deposits', 'withdrawals']
                }}
                height={280}
                colors={{
                  series: [
                    'from-[#A5E2FF] to-[#A5E2FF]',
                    'from-[#65A3FF] to-[#65A3FF]'
                  ]
                }}
                layout={{
                  spacing: 'tight',
                  barStyle: 'square',
                  gridLines: "none",
                  legend: {
                    position: 'none',
                    style: 'dots'
                  }
                }}
                formatters={{
                  value: (value) => {
                    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
                    return `$${value}`;
                  },
                  tooltip: (data, field) => {
                    const value = data[field];
                    const formatted = value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : `$${value}`;
                    return `${field === 'deposits' ? 'Deposits' : 'Withdrawals'}: ${formatted}`;
                  },
                  legend: (fieldName) => {
                    return fieldName === 'deposits' ? 'Deposits' : 'Withdrawals';
                  }
                }}
                onBarClick={(data, field) => {
                  console.log('Bar clicked:', data, field);
                }}
              />
            </div>
          </div>

          {/* Revenue Chart Section */}
          <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-right duration-800 delay-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                  <ReceiptIcon />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#DEDEE3]">Revenue</h2>
              </div>
              
              {/* Date Filter Dropdown */}
              <DatePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-auto min-w-[140px]"
              />
            </div>

            {/* Chart */}
            <CircularProgressChart
              totalValue={14000}
              currency="NGN"
              locale="en-NG"
              segments={revenueData}
              className="animate-in fade-in duration-700 delay-600"
              width={300}
              height={200}
              radius={110}
              strokeWidth={12}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
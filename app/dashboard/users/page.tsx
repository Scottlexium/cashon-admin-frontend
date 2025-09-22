"use client";
import { Metrics } from '@/components/ui/metrics';
import { Chart } from '@/components/ui/charts';
import { DataTable } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { DatePicker, DateRange, RelativeRange } from '@/components/ui/calendar/date-picker';
import { ReceiptIcon, UsersIcon } from '@/components/icons';
import { CircularProgressChart, CircularProgressChartProps } from '@/components/ui/charts/circular-progress-chart';
import  { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const statsData = [
    {
      title: 'Total Users',
      value: 245890.00,
      change: {
        value: '12.5%',
        type: 'increase' as const,
      },
      // icon: <WalletIcon />,
    },
    {
      title: 'Active Users',
      value: 124750.00,
      change: {
        value: '3.2%',
        type: 'decrease' as const,
      },
      // icon: <LayersIcon />,
    },
    {
      title: 'Pending KYC Approvals',
      value: 1500,
      change: {
        value: '8.4%',
        type: 'increase' as const,
      },
      // // icon: <DatabaseIcon />,
    },
    {
      title: 'Flagged Accounts',
      value: 32450.00,
      change: {
        value: '15.3%',
        type: 'increase' as const,
      },
      // icon: <ReceiptIcon />,
    },
  ];
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
  // User growth chart data
  const userGrowthData = [
    { month: 'Jan', users: 85000, deposits: 45000, withdrawals: 35000 },
    { month: 'Feb', users: 95000, deposits: 55000, withdrawals: 40000 },
    { month: 'Mar', users: 88000, deposits: 50000, withdrawals: 38000 },
    { month: 'Apr', users: 120000, deposits: 70000, withdrawals: 55000 },
    { month: 'May', users: 145000, deposits: 85000, withdrawals: 65000 },
    { month: 'Jun', users: 165000, deposits: 95000, withdrawals: 75000 },
    { month: 'Jul', users: 190000, deposits: 110000, withdrawals: 85000 },
    { month: 'Aug', users: 220000, deposits: 125000, withdrawals: 95000 },
    { month: 'Sep', users: 245000, deposits: 140000, withdrawals: 105000 },
    { month: 'Oct', users: 268000, deposits: 155000, withdrawals: 115000 },
    { month: 'Nov', users: 285000, deposits: 165000, withdrawals: 125000 },
    { month: 'Dec', users: 320000, deposits: 180000, withdrawals: 135000 },
  ];

  // Chart formatters - defined outside JSX to avoid serialization issues
  const userChartFormatters = {
    value: (value: number) => {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
      return value.toString();
    },
    tooltip: (data: any, field: string) => {
      const value = data[field];
      const formatted = value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` :
        value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
      return `Users: ${formatted}`;
    }
  };

  // Users table data
  const usersTableData = [
    {
      id: '2874829372',
      name: 'Daniel Owolabi',
      tier: 'Gold',
      kycStatus: 'Completed',
      totalBalance: 10000.00,
      date: '08 Aug 2025, 14:32'
    },
    {
      id: '4764829013',
      name: 'Jane Doe',
      tier: 'Silver',
      kycStatus: 'Pending',
      totalBalance: 3000.00,
      date: '08 Aug 2025, 14:32'
    },
    {
      id: '4764829013',
      name: 'Will Smith',
      tier: 'Bronze',
      kycStatus: 'Failed',
      totalBalance: 3000.00,
      date: '08 Aug 2025, 14:32'
    },
    {
      id: '4764829013',
      name: 'Annalise Keating',
      tier: 'Gold',
      kycStatus: 'Completed',
      totalBalance: 3000.00,
      date: '08 Aug 2025, 14:32'
    },
    {
      id: '4764829013',
      name: 'Michael Scott',
      tier: 'Platinum',
      kycStatus: 'Completed',
      totalBalance: 3000.00,
      date: '08 Aug 2025, 14:32'
    }
  ];

  // Table columns configuration
  const usersTableColumns = [
    {
      key: 'id',
      header: 'USER ID',
      accessor: 'id' as const,
      render: (value: string) => (
        <span className="text-[#DEDEE3] font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'name',
      header: 'NAME',
      accessor: 'name' as const,
      render: (value: string) => (
        <span className="text-[#DEDEE3] text-sm">{value}</span>
      )
    },
    {
      key: 'tier',
      header: 'TIER',
      accessor: 'tier' as const,
      render: (value: string) => (
        <span className="text-[#8C8C93] text-sm">{value}</span>
      )
    },
    {
      key: 'kycStatus',
      header: 'KYC STATUS',
      accessor: 'kycStatus' as const,
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
      key: 'totalBalance',
      header: 'TOTAL BALANCE',
      accessor: 'totalBalance' as const,
      render: (value: number) => (
        <span className="text-[#8C8C93] text-sm">₦{value.toLocaleString()}.00</span>
      )
    },
    {
      key: 'date',
      header: 'DATE',
      accessor: 'date' as const,
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
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="px-4 sm:px-6 animate-in slide-in-from-top duration-600">
        <h1 className="text-xl sm:text-2xl font-medium text-[#A2A2A7] transition-all duration-300">
          Users
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
          {/* User Growth Chart - Takes 3/5 of the space */}
          <div className="lg:col-span-3 rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-left duration-800 delay-400">
            {/* Top Row - Icon, Title and Date Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                  <UsersIcon width={18} height={18} />
                </div>
                <div>
                  <h2 className="text-base font-medium text-[#DEDEE3] transition-colors duration-300">Users Growth</h2>
                </div>
              </div>

              {/* Right Side - Legend and Date Filter */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 xl:gap-6">

                {/* Date Filter Dropdown */}
                <DatePicker
                  value={dateRange}
                  onChange={setDateRange}
                  className="w-full sm:w-auto sm:min-w-[140px] xl:min-w-[160px]"
                  size="sm"
                />
              </div>
            </div>

            {/* Total Transaction Amount */}
            <div className="mb-4 sm:mb-6">
              <p className="text-xs font-medium text-[#7A7A83] mb-1 transition-colors duration-300">
                Total Users ({
                  'label' in dateRange
                    ? dateRange.label.toLowerCase()
                    : `${dateRange.from?.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString()}`
                })
              </p>
              <p className="text-base sm:text-2xl font-semibold text-[#DEDEE3] transition-all duration-300 break-all">2,563,975,897</p>
            </div>

            {/* Chart Container */}
            <div className="overflow-hidden rounded-lg">
              <Chart
                className='border-none p-0'
                type="area"
                data={userGrowthData}
                fields={{
                  label: 'month',
                  values: ['users']
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
                  gridLines: 'none',
                  legend: {
                    position: 'none',
                    style: 'lines',
                  }
                }}
                showDataPoints={false} // Disable the dots/nodes on the line
                formatters={userChartFormatters}
                animation={{
                  enabled: true,
                  duration: 1000,
                  delay: 400,
                  stagger: true
                }}
              />
            </div>
          </div>

          {/* Revenue Chart Section - Takes 2/5 of the space */}
          <div className="lg:col-span-2 rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2 transition-all animate-in slide-in-from-right duration-800 delay-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                  <ReceiptIcon />
                </div>
                <h2 className="text-lg font-medium text-[#DEDEE3]">Revenue</h2>
              </div>

              {/* Date Filter Dropdown */}
              <DatePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-auto min-w-[140px]"
                size="sm"
              />
            </div>

            {/* Chart */}
            <CircularProgressChart
              totalValue={14000}
              currency="NGN"
              locale="en-NG"
              segments={revenueData}
              className="animate-in fade-in duration-700 delay-600"
              width={350}
              height={280}
              radius={90}
              strokeWidth={9}
              segmentSpacing={0.12}
              showInnerArc={true}
              innerArcOffset={1.1}
              innerArcStrokeWidth={1.5}
              innerArcOpacity={0.8}
            // outerArcStrokeWidth={8}
            // outerArcOpacity={0.8}
            />
          </div>
        </div>
      </div>

      {/* Users Table Section */}
      <div className="px-4 sm:px-6 animate-in slide-in-from-bottom duration-900 delay-600">
        <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                <UsersIcon width={18} height={18} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-[#DEDEE3]">Users (15,000)</h2>
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
            data={usersTableData}
            columns={usersTableColumns}
            variant="dark"
            bordered={false}
            className="animate-in fade-in duration-700 delay-700"
            onRowClick={(row) => router.push(`/dashboard/users/${row.id}`)}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
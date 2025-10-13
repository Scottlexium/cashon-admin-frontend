"use client";
import { Metrics } from '@/components/ui/metrics';
import { Chart } from '@/components/ui/charts';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react'
import { DatePicker, DateRange, RelativeRange } from '@/components/ui/calendar/date-picker';
import { ReceiptIcon, UsersIcon } from '@/components/icons';
import api, { ApiResponse } from '@/lib/api';
import { ApiPaginationInfo } from '@/lib/types';
import { CircularProgressChart, CircularProgressChartProps } from '@/components/ui/charts/circular-progress-chart';
import { useRouter } from 'next/navigation';
interface UserResponse {
  stats: {
    total_users: number;
    active_users: number;
    pending_kyc: number;
    flagged_accounts: number;
  };
  table: User[];
}

interface User {
  id: number;
  phone: string;
  email: string;
  profile_picture: string | null;
  first_name: string;
  last_name: string;
  dob: string;
  verification_type: string | null;
  verification_number: string | null;
  verification_status: string;
  document_type: string | null;
  document_path: string | null;
  scan_path: string | null;
  login_alert_email: boolean;
  transaction_alert_email: boolean;
  transaction_alert_push: boolean;
  referral_code: string | null;
  phone_verified_at: string | null;
  email_verified_at: string | null;
  last_device_name: string | null;
  last_device_type: string | null;
  last_device_ip: string | null;
  last_device_verified_at: string | null;
  created_at: string;
  updated_at: string;
  referred_by: number | null;
  total_referrals: number;
  referral_earnings: string;
  referral_status: string;
  referral_code_generated_at: string | null;
  first_referral_at: string | null;
  profile: string | null;
  address: string | null;
  wallet: Wallet;
}

interface Wallet {
  id: number;
  user_id: number;
  type: string;
  balance: string;
  available_balance: string;
  lien_balance: string;
  currency: string;
  created_at: string;
  updated_at: string;
}

interface ChartApiResponse {
  user_growth: UserGrowth;
  gauge_chart: GaugeChart;
}

interface UserGrowth {
  chart_data: ChartData;
  total_balance: string;       // string for decimal precision
  selected_period: string;     // e.g. "6M", "1Y"
}

interface ChartData {
  labels: string[];            // e.g. ["Y-m"]
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: number[];
}

interface GaugeChart {
  current_value: number;
  thresholds: {
    low: number;
    medium: number;
    high: number;
  };
  percentage: number;
  color_gradient: {
    start: string;
    end: string;
  };
}


const Page = () => {
  const router = useRouter();

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
  // User growth chart data - will be fetched from API
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState<string>('2,563,975,897');
  const [chartLoading, setChartLoading] = useState(true);

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | RelativeRange>({
    label: 'Last 7 Days',
    value: 'last-7-days'
  });

  const [searchQuery, setSearchQuery] = useState('');

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
  const [usersTableData, setUsersTableData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<ApiPaginationInfo | undefined>(undefined);
  const [statsData, setStatsData] = useState([
    {
      title: 'Total Users',
      value: 0,
      change: {
        value: '0%',
        type: 'increase' as 'increase' | 'decrease',
      },
    },
    {
      title: 'Active Users',
      value: 0,
      change: {
        value: '0%',
        type: 'increase' as 'increase' | 'decrease',
      },
    },
    {
      title: 'Pending KYC Approvals',
      value: 0,
      change: {
        value: '0%',
        type: 'increase' as 'increase' | 'decrease',
      },
    },
    {
      title: 'Flagged Accounts',
      value: 0,
      change: {
        value: '0%',
        type: 'increase' as 'increase' | 'decrease',
      },
    },
  ]);

  // Fetch users data
  useEffect(() => {
    fetchUsers();
    fetchChartData();
  }, []);

  // Fetch chart data when date range changes
  useEffect(() => {
    fetchChartData();
  }, [dateRange]);

  const fetchChartData = async () => {
    try {
      setChartLoading(true);

      // Determine period parameter based on dateRange
      let period = '12M'; // default
      if ('value' in dateRange) {
        switch (dateRange.value) {
          case 'last-7-days':
            period = '7D';
            break;
          case 'last-30-days':
            period = '30D';
            break;
          case 'last-6-months':
            period = '6M';
            break;
          case 'last-12-months':
            period = '12M';
            break;
          default:
            period = '12M';
        }
      }

      const response = await api.get<ChartApiResponse>(`/api/user-charts?period=${period}`);

      if (response.data && response.data.user_growth) {
        const chartData = response.data.user_growth.chart_data;

        // Transform the API data to match the existing chart format
        const transformedData = chartData.labels.map((label, index) => ({
          month: label,
          users: chartData.datasets[0]?.data[index] || 0,
          deposits: 0, // placeholder - you can add more datasets if needed
          withdrawals: 0 // placeholder - you can add more datasets if needed
        }));

        setUserGrowthData(transformedData);

        // Format total users number with commas
        const totalBalance = response.data.user_growth.total_balance;
        const formattedTotal = parseInt(totalBalance).toLocaleString();
        setTotalUsers(formattedTotal);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
      // Keep existing data on error or set empty array
      setUserGrowthData([]);
    } finally {
      setChartLoading(false);
    }
  };

  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    try {
      setIsLoading(true);
      const response = await api.get<UserResponse>(`/users?page=${page}&limit=${limit}`) as ApiResponse<UserResponse>;

      console.log('API Response:', {
        dataLength: response.data?.table?.length,
        pagination: response.pagination,
        requestedPage: page,
        requestedLimit: limit
      });

      if (response.data) {
        setUsersTableData(response.data.table || []);
        setPagination(response.pagination || undefined);
        
        // Update stats from API response
        if (response.data.stats) {
          setStatsData([
            {
              title: 'Total Users',
              value: response.data.stats.total_users,
              change: {
                value: '12.5%', // TODO: Calculate from API if available
                type: 'increase' as 'increase' | 'decrease',
              },
            },
            {
              title: 'Active Users',
              value: response.data.stats.active_users,
              change: {
                value: '3.2%', // TODO: Calculate from API if available
                type: 'decrease' as 'increase' | 'decrease',
              },
            },
            {
              title: 'Pending KYC Approvals',
              value: response.data.stats.pending_kyc,
              change: {
                value: '8.4%', // TODO: Calculate from API if available
                type: 'increase' as 'increase' | 'decrease',
              },
            },
            {
              title: 'Flagged Accounts',
              value: response.data.stats.flagged_accounts,
              change: {
                value: '15.3%', // TODO: Calculate from API if available
                type: 'increase' as 'increase' | 'decrease',
              },
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Keep empty array on error
      setUsersTableData([]);
      setPagination(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  // Table columns configuration
  const usersTableColumns: TableColumn<User>[] = [
    {
      key: 'id',
      header: 'USER ID',
      accessor: 'id',
      width: "120px",
      render: (value: string) => (
        <span className="text-[#DEDEE3] font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'name',
      header: 'NAME',
      accessor: 'first_name',
      width: "150px",
      render: (value: string) => (
        <span className="text-[#DEDEE3] text-sm">{value ?? 'N/A'}</span>
      )
    },
    {
      key: 'last_name',
      header: 'LAST NAME',
      accessor: 'last_name',
      width: "150px",
      render: (value: string) => (
        <span className="text-[#DEDEE3] text-sm">{value ?? 'N/A'}</span>
      )
    },
    {
      key: 'verification_type',
      header: 'VERIFICATION TYPE',
      accessor: 'verification_type',
      width: "180px",
      render: (value: string) => (
        <span className="text-[#8C8C93] text-sm">{value ?? 'N/A'}</span>
      )
    },
    {
      key: 'verification_number',
      header: 'VERIFICATION NO.',
      accessor: 'verification_number',
      width: "160px",
      render: (value: string) => (
        <span className="text-[#8C8C93] text-sm">{value}</span>
      )
    },

    {
      key: 'verification_status',
      header: 'KYC STATUS',
      accessor: 'verification_status',
      width: "140px",
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
    // {
    //   key: 'totalBalance',
    //   header: 'TOTAL BALANCE',
    //   accessor: 'totalBalance',
    //   render: (value: number) => (
    //     <span className="text-[#8C8C93] text-sm">₦{value.toLocaleString()}.00</span>
    //   )
    // },
    {
      key: 'created_at',
      header: 'DATE',
      accessor: 'created_at',
      type: 'datetime',
      width: "180px",
    }
  ];
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
              <p className="text-base sm:text-2xl font-semibold text-[#DEDEE3] transition-all duration-300 break-all">
                {chartLoading ? 'Loading...' : totalUsers}
              </p>
            </div>

            {/* Chart Container */}
            <div className="overflow-hidden rounded-lg">
              {chartLoading ? (
                <div className="flex items-center justify-center h-[280px]">
                  <div className="text-[#8C8C93]">Loading chart data...</div>
                </div>
              ) : (
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
              )}
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
                <h2 className="text-lg font-medium text-[#DEDEE3]">
                  Users ({pagination?.total_items?.toLocaleString() || '0'})
                </h2>
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
            loading={isLoading}
            className="animate-in fade-in duration-700 delay-700"
            onRowClick={(row) => {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('selectedUserData', JSON.stringify(row));
              }
              router.push(`/dashboard/users/${row.id}`);
            }}
            pagination={pagination}
            onPageChange={(page: number) => fetchUsers(page, pagination?.per_page || 10)}
            onPageSizeChange={(pageSize: number) => fetchUsers(1, pageSize)}
            showPagination={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { MetricCard } from '@/components/ui/metric-card';
import { WalletIcon, ReceiptIcon } from '@/components/icons';
import api from '@/lib/api';

// TypeScript interfaces for savings data
interface SavingsSummary {
  vault_balance: string;
  total_savings: string;
  interest_earned: string;
}

interface SavingsPlan {
  plan_id: number;
  savings_plan: string;
  amount_saved: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  interest: number;
}

interface UserSavingsResponse {
  status: boolean;
  summary: SavingsSummary;
  savings_plans: SavingsPlan[];
}

const SavingsPlanContent = () => {
  const params = useParams();
  const userId = params?.userId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [savingsData, setSavingsData] = useState<UserSavingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user savings data
  useEffect(() => {
    const fetchSavingsData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<UserSavingsResponse>(`/user-savings/${userId}`);
        setSavingsData(response.data);
      } catch (err) {
        console.error('Error fetching savings data:', err);
        setError('Failed to load savings data');
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsData();
  }, [userId]);

  // Helper function to format currency
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₦${num.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
  };

  // Helper function to format status
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Cards data from API
  const cardsData = savingsData ? [
    {
      title: 'Vault Balance',
      amount: formatCurrency(savingsData.summary.vault_balance),
      change: '15.3%',
      icon: <>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1990_7912" fill="white">
            <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" />
          </mask>
          <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" fill="#303033" />
          <path d="M6.2439 0V0.780488H27.7561V0V-0.780488H6.2439V0ZM34 6.2439H33.2195V27.7561H34H34.7805V6.2439H34ZM27.7561 34V33.2195H6.2439V34V34.7805H27.7561V34ZM0 27.7561H0.780488V6.2439H0H-0.780488V27.7561H0ZM6.2439 34V33.2195C3.22654 33.2195 0.780488 30.7735 0.780488 27.7561H0H-0.780488C-0.780488 31.6356 2.36444 34.7805 6.2439 34.7805V34ZM34 27.7561H33.2195C33.2195 30.7735 30.7735 33.2195 27.7561 33.2195V34V34.7805C31.6356 34.7805 34.7805 31.6356 34.7805 27.7561H34ZM27.7561 0V0.780488C30.7735 0.780488 33.2195 3.22654 33.2195 6.2439H34H34.7805C34.7805 2.36444 31.6356 -0.780488 27.7561 -0.780488V0ZM6.2439 0V-0.780488C2.36444 -0.780488 -0.780488 2.36444 -0.780488 6.2439H0H0.780488C0.780488 3.22654 3.22654 0.780488 6.2439 0.780488V0Z" fill="#363639" mask="url(#path-1-inside-1_1990_7912)" />
          <path d="M25.1731 12.219C25.0921 12.1685 24.9996 12.1394 24.9043 12.1344C24.809 12.1295 24.714 12.1489 24.6282 12.1909C21.6097 13.6674 19.4539 12.9756 17.1751 12.2457C14.7781 11.4828 12.3031 10.6918 8.8782 12.3638C8.78362 12.41 8.70388 12.4818 8.64808 12.5711C8.59227 12.6603 8.56262 12.7634 8.5625 12.8687V21.3013C8.56249 21.3967 8.58676 21.4906 8.63303 21.5741C8.6793 21.6575 8.74604 21.7279 8.82699 21.7784C8.90793 21.829 9.00041 21.8581 9.09572 21.8631C9.19103 21.8681 9.28603 21.8487 9.3718 21.8068C12.3903 20.3303 14.5461 21.0221 16.8284 21.752C18.1813 22.1844 19.5594 22.6253 21.1175 22.6253C22.3191 22.6253 23.6298 22.3637 25.119 21.6367C25.2136 21.5905 25.2933 21.5187 25.3491 21.4294C25.4049 21.3402 25.4346 21.2371 25.4347 21.1318V12.6992C25.4355 12.6036 25.412 12.5092 25.3662 12.4252C25.3204 12.3412 25.254 12.2702 25.1731 12.219ZM11.375 18.6878C11.375 18.8369 11.3157 18.98 11.2102 19.0855C11.1048 19.191 10.9617 19.2503 10.8125 19.2503C10.6633 19.2503 10.5202 19.191 10.4148 19.0855C10.3093 18.98 10.25 18.8369 10.25 18.6878V14.1878C10.25 14.0386 10.3093 13.8955 10.4148 13.79C10.5202 13.6845 10.6633 13.6253 10.8125 13.6253C10.9617 13.6253 11.1048 13.6845 11.2102 13.79C11.3157 13.8955 11.375 14.0386 11.375 14.1878V18.6878ZM17 19.2503C16.555 19.2503 16.12 19.1183 15.75 18.8711C15.38 18.6238 15.0916 18.2724 14.9213 17.8613C14.751 17.4502 14.7064 16.9978 14.7932 16.5613C14.8801 16.1248 15.0943 15.7239 15.409 15.4093C15.7237 15.0946 16.1246 14.8803 16.561 14.7935C16.9975 14.7067 17.4499 14.7512 17.861 14.9215C18.2722 15.0918 18.6236 15.3802 18.8708 15.7502C19.118 16.1202 19.25 16.5552 19.25 17.0003C19.25 17.597 19.0129 18.1693 18.591 18.5912C18.169 19.0132 17.5967 19.2503 17 19.2503ZM23.75 19.8128C23.75 19.9619 23.6907 20.105 23.5852 20.2105C23.4798 20.316 23.3367 20.3753 23.1875 20.3753C23.0383 20.3753 22.8952 20.316 22.7898 20.2105C22.6843 20.105 22.625 19.9619 22.625 19.8128V15.3128C22.625 15.1636 22.6843 15.0205 22.7898 14.915C22.8952 14.8095 23.0383 14.7503 23.1875 14.7503C23.3367 14.7503 23.4798 14.8095 23.5852 14.915C23.6907 15.0205 23.75 15.1636 23.75 15.3128V19.8128Z" fill="#DEDEE3" />
        </svg>

      </>
    },
    {
      title: 'Total Savings',
      amount: formatCurrency(savingsData.summary.total_savings),
      change: '15.3%',
      icon: <>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1990_7912" fill="white">
            <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" />
          </mask>
          <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" fill="#303033" />
          <path d="M6.2439 0V0.780488H27.7561V0V-0.780488H6.2439V0ZM34 6.2439H33.2195V27.7561H34H34.7805V6.2439H34ZM27.7561 34V33.2195H6.2439V34V34.7805H27.7561V34ZM0 27.7561H0.780488V6.2439H0H-0.780488V27.7561H0ZM6.2439 34V33.2195C3.22654 33.2195 0.780488 30.7735 0.780488 27.7561H0H-0.780488C-0.780488 31.6356 2.36444 34.7805 6.2439 34.7805V34ZM34 27.7561H33.2195C33.2195 30.7735 30.7735 33.2195 27.7561 33.2195V34V34.7805C31.6356 34.7805 34.7805 31.6356 34.7805 27.7561H34ZM27.7561 0V0.780488C30.7735 0.780488 33.2195 3.22654 33.2195 6.2439H34H34.7805C34.7805 2.36444 31.6356 -0.780488 27.7561 -0.780488V0ZM6.2439 0V-0.780488C2.36444 -0.780488 -0.780488 2.36444 -0.780488 6.2439H0H0.780488C0.780488 3.22654 3.22654 0.780488 6.2439 0.780488V0Z" fill="#363639" mask="url(#path-1-inside-1_1990_7912)" />
          <path d="M25.1731 12.219C25.0921 12.1685 24.9996 12.1394 24.9043 12.1344C24.809 12.1295 24.714 12.1489 24.6282 12.1909C21.6097 13.6674 19.4539 12.9756 17.1751 12.2457C14.7781 11.4828 12.3031 10.6918 8.8782 12.3638C8.78362 12.41 8.70388 12.4818 8.64808 12.5711C8.59227 12.6603 8.56262 12.7634 8.5625 12.8687V21.3013C8.56249 21.3967 8.58676 21.4906 8.63303 21.5741C8.6793 21.6575 8.74604 21.7279 8.82699 21.7784C8.90793 21.829 9.00041 21.8581 9.09572 21.8631C9.19103 21.8681 9.28603 21.8487 9.3718 21.8068C12.3903 20.3303 14.5461 21.0221 16.8284 21.752C18.1813 22.1844 19.5594 22.6253 21.1175 22.6253C22.3191 22.6253 23.6298 22.3637 25.119 21.6367C25.2136 21.5905 25.2933 21.5187 25.3491 21.4294C25.4049 21.3402 25.4346 21.2371 25.4347 21.1318V12.6992C25.4355 12.6036 25.412 12.5092 25.3662 12.4252C25.3204 12.3412 25.254 12.2702 25.1731 12.219ZM11.375 18.6878C11.375 18.8369 11.3157 18.98 11.2102 19.0855C11.1048 19.191 10.9617 19.2503 10.8125 19.2503C10.6633 19.2503 10.5202 19.191 10.4148 19.0855C10.3093 18.98 10.25 18.8369 10.25 18.6878V14.1878C10.25 14.0386 10.3093 13.8955 10.4148 13.79C10.5202 13.6845 10.6633 13.6253 10.8125 13.6253C10.9617 13.6253 11.1048 13.6845 11.2102 13.79C11.3157 13.8955 11.375 14.0386 11.375 14.1878V18.6878ZM17 19.2503C16.555 19.2503 16.12 19.1183 15.75 18.8711C15.38 18.6238 15.0916 18.2724 14.9213 17.8613C14.751 17.4502 14.7064 16.9978 14.7932 16.5613C14.8801 16.1248 15.0943 15.7239 15.409 15.4093C15.7237 15.0946 16.1246 14.8803 16.561 14.7935C16.9975 14.7067 17.4499 14.7512 17.861 14.9215C18.2722 15.0918 18.6236 15.3802 18.8708 15.7502C19.118 16.1202 19.25 16.5552 19.25 17.0003C19.25 17.597 19.0129 18.1693 18.591 18.5912C18.169 19.0132 17.5967 19.2503 17 19.2503ZM23.75 19.8128C23.75 19.9619 23.6907 20.105 23.5852 20.2105C23.4798 20.316 23.3367 20.3753 23.1875 20.3753C23.0383 20.3753 22.8952 20.316 22.7898 20.2105C22.6843 20.105 22.625 19.9619 22.625 19.8128V15.3128C22.625 15.1636 22.6843 15.0205 22.7898 14.915C22.8952 14.8095 23.0383 14.7503 23.1875 14.7503C23.3367 14.7503 23.4798 14.8095 23.5852 14.915C23.6907 15.0205 23.75 15.1636 23.75 15.3128V19.8128Z" fill="#DEDEE3" />
        </svg>

      </>
    },
    {
      title: 'Interest Earned',
      amount: formatCurrency(savingsData.summary.interest_earned),
      change: '15.3%',
      icon: <>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1990_7912" fill="white">
            <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" />
          </mask>
          <path d="M0 6.2439C0 2.79549 2.79549 0 6.2439 0H27.7561C31.2045 0 34 2.79549 34 6.2439V27.7561C34 31.2045 31.2045 34 27.7561 34H6.2439C2.79549 34 0 31.2045 0 27.7561V6.2439Z" fill="#303033" />
          <path d="M6.2439 0V0.780488H27.7561V0V-0.780488H6.2439V0ZM34 6.2439H33.2195V27.7561H34H34.7805V6.2439H34ZM27.7561 34V33.2195H6.2439V34V34.7805H27.7561V34ZM0 27.7561H0.780488V6.2439H0H-0.780488V27.7561H0ZM6.2439 34V33.2195C3.22654 33.2195 0.780488 30.7735 0.780488 27.7561H0H-0.780488C-0.780488 31.6356 2.36444 34.7805 6.2439 34.7805V34ZM34 27.7561H33.2195C33.2195 30.7735 30.7735 33.2195 27.7561 33.2195V34V34.7805C31.6356 34.7805 34.7805 31.6356 34.7805 27.7561H34ZM27.7561 0V0.780488C30.7735 0.780488 33.2195 3.22654 33.2195 6.2439H34H34.7805C34.7805 2.36444 31.6356 -0.780488 27.7561 -0.780488V0ZM6.2439 0V-0.780488C2.36444 -0.780488 -0.780488 2.36444 -0.780488 6.2439H0H0.780488C0.780488 3.22654 3.22654 0.780488 6.2439 0.780488V0Z" fill="#363639" mask="url(#path-1-inside-1_1990_7912)" />
          <path d="M25.1731 12.219C25.0921 12.1685 24.9996 12.1394 24.9043 12.1344C24.809 12.1295 24.714 12.1489 24.6282 12.1909C21.6097 13.6674 19.4539 12.9756 17.1751 12.2457C14.7781 11.4828 12.3031 10.6918 8.8782 12.3638C8.78362 12.41 8.70388 12.4818 8.64808 12.5711C8.59227 12.6603 8.56262 12.7634 8.5625 12.8687V21.3013C8.56249 21.3967 8.58676 21.4906 8.63303 21.5741C8.6793 21.6575 8.74604 21.7279 8.82699 21.7784C8.90793 21.829 9.00041 21.8581 9.09572 21.8631C9.19103 21.8681 9.28603 21.8487 9.3718 21.8068C12.3903 20.3303 14.5461 21.0221 16.8284 21.752C18.1813 22.1844 19.5594 22.6253 21.1175 22.6253C22.3191 22.6253 23.6298 22.3637 25.119 21.6367C25.2136 21.5905 25.2933 21.5187 25.3491 21.4294C25.4049 21.3402 25.4346 21.2371 25.4347 21.1318V12.6992C25.4355 12.6036 25.412 12.5092 25.3662 12.4252C25.3204 12.3412 25.254 12.2702 25.1731 12.219ZM11.375 18.6878C11.375 18.8369 11.3157 18.98 11.2102 19.0855C11.1048 19.191 10.9617 19.2503 10.8125 19.2503C10.6633 19.2503 10.5202 19.191 10.4148 19.0855C10.3093 18.98 10.25 18.8369 10.25 18.6878V14.1878C10.25 14.0386 10.3093 13.8955 10.4148 13.79C10.5202 13.6845 10.6633 13.6253 10.8125 13.6253C10.9617 13.6253 11.1048 13.6845 11.2102 13.79C11.3157 13.8955 11.375 14.0386 11.375 14.1878V18.6878ZM17 19.2503C16.555 19.2503 16.12 19.1183 15.75 18.8711C15.38 18.6238 15.0916 18.2724 14.9213 17.8613C14.751 17.4502 14.7064 16.9978 14.7932 16.5613C14.8801 16.1248 15.0943 15.7239 15.409 15.4093C15.7237 15.0946 16.1246 14.8803 16.561 14.7935C16.9975 14.7067 17.4499 14.7512 17.861 14.9215C18.2722 15.0918 18.6236 15.3802 18.8708 15.7502C19.118 16.1202 19.25 16.5552 19.25 17.0003C19.25 17.597 19.0129 18.1693 18.591 18.5912C18.169 19.0132 17.5967 19.2503 17 19.2503ZM23.75 19.8128C23.75 19.9619 23.6907 20.105 23.5852 20.2105C23.4798 20.316 23.3367 20.3753 23.1875 20.3753C23.0383 20.3753 22.8952 20.316 22.7898 20.2105C22.6843 20.105 22.625 19.9619 22.625 19.8128V15.3128C22.625 15.1636 22.6843 15.0205 22.7898 14.915C22.8952 14.8095 23.0383 14.7503 23.1875 14.7503C23.3367 14.7503 23.4798 14.8095 23.5852 14.915C23.6907 15.0205 23.75 15.1636 23.75 15.3128V19.8128Z" fill="#DEDEE3" />
        </svg>

      </>
    }
  ] : [];

  // Savings plans data from API with search filtering
  const savingsPlansData = savingsData ? savingsData.savings_plans.filter(plan => 
    plan.savings_plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.plan_id.toString().includes(searchQuery)
  ).map(plan => ({
    planId: `SP${plan.plan_id.toString().padStart(4, '0')}`,
    savingsPlan: plan.savings_plan,
    amountSaved: formatCurrency(plan.amount_saved),
    status: formatStatus(plan.status),
    startDate: plan.start_date ? new Date(plan.start_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'N/A',
    endDate: plan.end_date ? new Date(plan.end_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'N/A',
    interest: formatCurrency(plan.interest)
  })) : [];

  // Table columns configuration
  const savingsPlansColumns: TableColumn<typeof savingsPlansData[0]>[] = [
    {
      key: 'planId',
      header: 'PLAN ID',
      accessor: 'planId',
      render: (value: string) => (
        <span className="text-[#8C8C93] text-sm font-mono">{value}</span>
      )
    },
    {
      key: 'savingsPlan',
      header: 'SAVINGS PLAN',
      accessor: 'savingsPlan',
      render: (value: string) => (
        <span className="text-[#DEDEE3] text-sm font-medium">{value}</span>
      )
    },
    {
      key: 'amountSaved',
      header: 'AMOUNT SAVED',
      accessor: 'amountSaved',
      render: (value: string) => (
        <span className="text-[#DEDEE3] text-sm font-semibold">{value}</span>
      )
    },
    {
      key: 'status',
      header: 'STATUS',
      accessor: 'status',
      render: (value: string) => {
        let statusClass = '';
        let dotClass = '';

        switch (value.toLowerCase()) {
          case 'active':
            statusClass = 'text-green-400';
            dotClass = 'bg-green-500';
            break;
          case 'matured':
          case 'completed':
            statusClass = 'text-green-400';
            dotClass = 'bg-green-500';
            break;
          case 'on hold':
          case 'paused':
            statusClass = 'text-yellow-400';
            dotClass = 'bg-yellow-500';
            break;
          case 'cancelled':
            statusClass = 'text-red-400';
            dotClass = 'bg-red-500';
            break;
          default:
            statusClass = 'text-gray-400';
            dotClass = 'bg-gray-500';
        }

        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dotClass}`}></div>
            <span className={`text-sm ${statusClass}`}>{value}</span>
          </div>
        );
      }
    },
    {
      key: 'startDate',
      header: 'START DATE',
      accessor: 'startDate',
      render: (value: string) => (
        <span className="text-[#8C8C93] text-sm">{value}</span>
      )
    },
    {
      key: 'endDate',
      header: 'END DATE',
      accessor: 'endDate',
      render: (value: string) => (
        <span className="text-[#8C8C93] text-sm">{value}</span>
      )
    },
    {
      key: 'interest',
      header: 'INTEREST EARNED',
      accessor: 'interest',
      render: (value: string) => (
        <span className="text-[#DEDEE3] text-sm font-semibold">{value}</span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="px-3 md:px-6 py-12 text-center text-[#8C8C93]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DEDEE3] mx-auto mb-4"></div>
        Loading savings data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 md:px-6 py-12 text-center text-[#FF6B6B]">
        <div className="mb-4">
          <svg className="w-12 h-12 mx-auto mb-4 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">{error}</p>
          <p className="text-sm text-[#8C8C93] mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!savingsData) {
    return (
      <div className="px-3 md:px-6 py-12 text-center text-[#8C8C93]">
        No savings data available
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards Container */}
      <div className="px-3 md:px-6 animate-in slide-in-from-left duration-700 delay-100">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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

      {/* Savings Plans Table Section */}
      <div className="px-3 md:px-6 animate-in slide-in-from-bottom duration-900 delay-300">
        <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                <ReceiptIcon className="w-5 h-5 text-[#8C8C93]" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-[#DEDEE3]">Savings Plans</h2>
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
                    <svg className="w-4 h-4 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                  className="text-white placeholder-[#8C8C93]"
                />
              </div>

              {/* Filter Button */}
              <Button
                variant="secondary"
                size="sm"
                className="px-3 py-2 bg-[#303033] border-[#363639] hover:bg-[#404044]"
              >
                {/* Filter icon only on mobile */}
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
            data={savingsPlansData}
            columns={savingsPlansColumns}
            variant="dark"
            className="animate-in fade-in duration-700 delay-400 border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SavingsPlanContent;
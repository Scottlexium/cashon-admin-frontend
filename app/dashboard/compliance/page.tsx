"use client";
import { Metrics, MetricsItem } from '@/components/ui/metrics';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface KYCUser {
    id: string;
    userId: string;
    name: string;
    email: string;
    status: 'Approved' | 'Pending';
    phone: string;
    date: string;
}

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleRowClick = (row: KYCUser) => {
        router.push(`/dashboard/compliance/${row.userId}`);
    };
    
    const statsData: MetricsItem[] = [
        {
            title: 'Total Verified Users',
            value: 45678,
            icon: (
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#3AF4BD" />
                </svg>
            ),
            change: {
                value: '8.4%',
                type: 'increase' as const,
            },
            currency: "NGN",
            format: 'number'
        },
        {
            title: 'Pending Verifications',
            value: 1247,
            icon: (
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#E697FF" />
                </svg>
            ),
            change: {
                value: '12.5%',
                type: 'increase' as const,
            },
            currency: "NGN",
            format: 'number'
        },
        {
            title: 'Flagged Accounts',
            value: 125,
            icon: (
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="10" height="10" rx="3" fill="#ECA450" />
                </svg>
            ),
            change: {
                value: '2.1%',
                type: 'decrease' as const,
            },
            currency: "NGN",
            format: 'number'
        }
    ];

    const kycData: KYCUser[] = [
        {
            id: '1',
            userId: '2674823372',
            name: 'Daniel Owelohi',
            email: 'daniel.owelohi@cashonrails.com',
            status: 'Approved',
            phone: '+234 8079896430',
            date: '09 Aug 2025, 14:32'
        },
        {
            id: '2',
            userId: '4784829013',
            name: 'Jane Doe',
            email: 'janedoe789@gmail.com',
            status: 'Pending',
            phone: '+234 9079896430',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '3',
            userId: '4764829013',
            name: 'Wil Smith',
            email: 'johnsmith456@yahoo.com',
            status: 'Approved',
            phone: '+234 7012345678',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '4',
            userId: '4784829013',
            name: 'Annalissa Keating',
            email: 'alice.jones@gmail.com',
            status: 'Pending',
            phone: '+234 9012345678',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '5',
            userId: '4764829013',
            name: 'Michael Scott',
            email: 'bob.brown@outlook.com',
            status: 'Approved',
            phone: '+234 8034567890',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '6',
            userId: '4784829013',
            name: 'Harriet Tubman',
            email: 'charlie.white@hotmail.com',
            status: 'Approved',
            phone: '+234 9056781234',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '7',
            userId: '4764829013',
            name: 'Leonardo DiCaprio',
            email: 'davidlee@icloud.com',
            status: 'Approved',
            phone: '+234 7068432198',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '8',
            userId: '4784829013',
            name: 'Oprah Winfrey',
            email: 'emma.taylor@gmail.com',
            status: 'Pending',
            phone: '+234 7025456789',
            date: '08 Aug 2025, 14:32'
        },
        {
            id: '9',
            userId: '4764829013',
            name: 'Shakespeare',
            email: 'frank.miller@yahoo.com',
            status: 'Approved',
            phone: '+234 9087654321',
            date: '08 Aug 2025, 14:32'
        }
    ];

    const columns: TableColumn<KYCUser>[] = [
        {
            key: 'userId',
            header: 'USER ID',
            accessor: 'userId',
            width: '120px',
        },
        {
            key: 'name',
            header: 'NAME',
            accessor: 'name',
            width: '180px',
        },
        {
            key: 'email',
            header: 'EMAIL ADDRESS',
            accessor: 'email',
            width: '250px',
        },
        {
            key: 'status',
            header: 'KYC STATUS',
            accessor: 'status',
            width: '120px',
            render: (value: string, row: KYCUser) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Approved'
                            ? 'bg-[#3AF4BD]/10 text-[#3AF4BD] border border-[#3AF4BD]/20'
                            : 'bg-[#FFA500]/10 text-[#FFA500] border border-[#FFA500]/20'
                        }`}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${row.status === 'Approved' ? 'bg-[#3AF4BD]' : 'bg-[#FFA500]'
                            }`}
                    />
                    {row.status}
                </span>
            ),
        },
        {
            key: 'phone',
            header: 'PHONE',
            accessor: 'phone',
            width: '150px',
        },
        {
            key: 'date',
            header: 'DATE',
            accessor: 'date',
            width: '150px',
        },
    ];

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="px-4 sm:px-6 animate-in slide-in-from-top duration-600">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-medium text-[#A2A2A7] transition-all duration-300">
                            Compliance
                        </h1>
                        <p className="text-sm text-[#8C8C93] mt-1">
                            Monitor and manage compliance verifications for your platform
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="primary"
                            size="md"
                            className="bg-[#303033] text-[#DEDEE3] cursor-pointer font-medium hover:bg-[#303033]/[0.8]"
                        >
                            Export Report
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Container */}
            <div className="px-4 sm:px-6 animate-in slide-in-from-bottom duration-700 delay-200">
                <Metrics
                    items={statsData}
                    variant="dark"
                    className="animate-in fade-in duration-700 delay-300"
                />
            </div>

            {/* KYC Verification Table */}
            <div className="px-4 sm:px-6 animate-in slide-in-from-bottom duration-700 delay-400">
                <div className="bg-[#1A1A1A] rounded-xl border border-[#313135] overflow-hidden">
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#313135]">
                        <div className="flex items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                    stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                    stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            <h2 className="text-lg font-semibold text-[#A2A2A7]">KYC Verification</h2>
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

                    <DataTable
                        data={kycData}
                        columns={columns}
                        variant="dark"
                        className="border-0"
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
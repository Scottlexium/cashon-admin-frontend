"use client";
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';

const TeamsPermissionsPage = () => {
    const [activeTab, setActiveTab] = useState<'roles' | 'members'>('roles');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [roleFormData, setRoleFormData] = useState({
        name: '',
        description: '',
        permissions: [] as string[]
    });

    // Mock data for roles
    const rolesData = [
        {
            id: '1',
            roleName: 'Super Admin',
            description: 'Full access to all features',
            membersAssigned: 3,
            createdBy: 'System',
            lastUpdated: '08 Aug 2025, 14:32'
        },
        {
            id: '2',
            roleName: 'Compliance',
            description: 'Manage KYC & compliance checks',
            membersAssigned: 10,
            createdBy: 'Adeleke Banjoko',
            lastUpdated: '08 Aug 2025, 14:32'
        },
        {
            id: '3',
            roleName: 'Finance',
            description: 'Approve withdrawals, payouts',
            membersAssigned: 2,
            createdBy: 'Ayomide Martins',
            lastUpdated: '08 Aug 2025, 14:32'
        },
        {
            id: '4',
            roleName: 'Growth',
            description: 'View users, reset password only',
            membersAssigned: 5,
            createdBy: 'Adeleke Banjoko',
            lastUpdated: '08 Aug 2025, 14:32'
        }
    ];

    // Mock data for members
    const membersData = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Super Admin',
            status: 'Active',
            lastLogin: '08 Aug 2025, 14:32'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'Compliance',
            status: 'Active',
            lastLogin: '07 Aug 2025, 09:15'
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            role: 'Finance',
            status: 'Inactive',
            lastLogin: '05 Aug 2025, 16:20'
        }
    ];

    const rolesColumns: TableColumn[] = [
        {
            key: 'roleName',
            header: 'ROLE NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.roleName}</span>
            )
        },
        {
            key: 'description',
            header: 'DESCRIPTION',
            sortable: false,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.description}</span>
            )
        },
        {
            key: 'membersAssigned',
            header: 'MEMBERS ASSIGNED',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.membersAssigned}</span>
            )
        },
        {
            key: 'createdBy',
            header: 'CREATED BY',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.createdBy}</span>
            )
        },
        {
            key: 'lastUpdated',
            header: 'LAST UPDATED',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.lastUpdated}</span>
            )
        }
    ];

    const membersColumns: TableColumn[] = [
        {
            key: 'name',
            header: 'NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <div>
                    <span className="text-[#DEDEE3] font-medium">{row.name}</span>
                    <p className="text-[#8C8C93] text-sm mt-1">{row.email}</p>
                </div>
            )
        },
        {
            key: 'role',
            header: 'ROLE',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3]">{row.role}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: string, row: any) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${row.status === 'Active' ? 'bg-[#00FFB3]' : 'bg-[#8C8C93]'}`}></div>
                    <span className={`font-medium ${row.status === 'Active' ? 'text-[#00FFB3]' : 'text-[#8C8C93]'}`}>
                        {row.status}
                    </span>
                </div>
            )
        },
        {
            key: 'lastLogin',
            header: 'LAST LOGIN',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.lastLogin}</span>
            )
        },
        {
            key: 'actions',
            header: 'ACTIONS',
            sortable: false,
            render: (value: any, row: any) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8C8C93] hover:text-[#DEDEE3]"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8C8C93] hover:text-[#DEDEE3]"
                    >
                        Remove
                    </Button>
                </div>
            )
        }
    ];

    const handleFormInputChange = (key: string, value: any) => {
        setRoleFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleCreateSubmit = () => {
        console.log('Creating role:', roleFormData);
        setIsCreateModalOpen(false);
        setRoleFormData({
            name: '',
            description: '',
            permissions: []
        });
    };

    const filteredData = activeTab === 'roles' 
        ? rolesData.filter(item => 
            item.roleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : membersData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.role.toLowerCase().includes(searchQuery.toLowerCase())
          );

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-xl font-medium text-[#A2A2A7]">Teams & Permissions</h1>
                
                {/* Tab Navigation */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-[#2C2C2E] rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('roles')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'roles'
                                    ? 'bg-[#DEDEE3] text-[#1C1C1E]'
                                    : 'text-[#8C8C93] hover:text-[#DEDEE3]'
                            }`}
                        >
                            Roles
                        </button>
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'members'
                                    ? 'bg-[#DEDEE3] text-[#1C1C1E]'
                                    : 'text-[#8C8C93] hover:text-[#DEDEE3]'
                            }`}
                        >
                            Members
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Input
                            placeholder={`Search ${activeTab}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="filled"
                            className="w-64"
                        />
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add {activeTab === 'roles' ? 'Role' : 'Member'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#1C1C1E] border border-[#313135BA] rounded-xl p-6">
                <DataTable
                    data={filteredData}
                    columns={activeTab === 'roles' ? rolesColumns : membersColumns}
                    variant="dark"
                    className="border-none"
                />
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title={`Create New ${activeTab === 'roles' ? 'Role' : 'Member'}`}
                size="lg"
                className="w-full"
            >
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                            {activeTab === 'roles' ? 'Role Name' : 'Name'}
                        </label>
                        <Input
                            placeholder={`Enter ${activeTab === 'roles' ? 'role' : 'member'} name`}
                            value={roleFormData.name}
                            onChange={(e) => handleFormInputChange('name', e.target.value)}
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    {activeTab === 'members' && (
                        <div>
                            <label className="block text-sm font-medium text-[#8C8C93] mb-2">Email</label>
                            <Input
                                placeholder="Enter email address"
                                type="email"
                                variant="filled"
                                className="w-full"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                            {activeTab === 'roles' ? 'Description' : 'Role'}
                        </label>
                        {activeTab === 'roles' ? (
                            <Input
                                placeholder="Enter role description"
                                value={roleFormData.description}
                                onChange={(e) => handleFormInputChange('description', e.target.value)}
                                variant="filled"
                                className="w-full"
                            />
                        ) : (
                            <Select
                                options={rolesData.map(role => ({ value: role.roleName, label: role.roleName }))}
                                placeholder="Select a role"
                                className="w-full"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateSubmit}
                            className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                        >
                            Create {activeTab === 'roles' ? 'Role' : 'Member'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TeamsPermissionsPage;

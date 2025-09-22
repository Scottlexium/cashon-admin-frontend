"use client";
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Tabs, TabItem } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { UserInfoSection } from '@/components/ui/user-info-section';

const TeamsPermissionsPage = () => {
    const [activeTab, setActiveTab] = useState<'roles' | 'members'>('roles');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [isMemberDetailsModalOpen, setIsMemberDetailsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [roleFormData, setRoleFormData] = useState({
        name: '',
        description: '',
        permissions: []
    });
    const [memberFormData, setMemberFormData] = useState({
        name: '',
        email: '',
        role: ''
    });

    // State for permission checkboxes
    const [permissions, setPermissions] = useState<Record<string, boolean>>({
        // Users permissions
        'view_users': true,
        'view_user_details': true,
        'suspend_user': false,
        'configure_boost': false,
        'export_users': false,
        // Transactions permissions
        'view_transactions': true,
        'approve_withdrawal': true,
        'reverse_transaction': false,
        'flag_transaction': false,
        'export_transactions': false,
        // Boost permissions
        'allocate_boost': true,
        'view_boost_history': true,
        'view_boost_payouts': false,
        // Audit permissions
        'view_audit_logs': true,
        'export_logs': false,
        // Settings permissions
        'view_settings': false,
        'edit_system_configs': false,
        'add_fee_exception': false,
        'edit_scheduled_tasks': false,
        // Teams & Permissions
        'view_roles': true,
        'create_edit_roles': false,
        'assign_members': false
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
            email: 'john.doe@cashonrails.com',
            role: 'Super admin',
            kycStatus: 'Active',
            lastLogin: '08 Aug 2025, 14:32'
        },
        {
            id: '2',
            name: 'Sarah James',
            email: 'sarah.james@cashonrails.com',
            role: 'Compliance',
            kycStatus: 'Active',
            lastLogin: '08 Aug 2025, 14:32'
        },
        {
            id: '3',
            name: 'David Okoro',
            email: 'david.okoro@cashonrails.com',
            role: 'Finance',
            kycStatus: 'Active',
            lastLogin: '08 Aug 2025, 14:32'
        },
        {
            id: '4',
            name: 'Uche Ezechukwu',
            email: 'uche.ezechukwu@cashonrails.com',
            role: 'Customer support',
            kycStatus: 'Suspended',
            lastLogin: '08 Aug 2025, 14:32'
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
                <span className="text-[#DEDEE3] font-medium">{row.name}</span>
            )
        },
        {
            key: 'email',
            header: 'EMAIL ADDRESS',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.email}</span>
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
            key: 'kycStatus',
            header: 'KYC STATUS',
            sortable: true,
            render: (value: string, row: any) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                        row.kycStatus === 'Active' ? 'bg-[#00FFB3]' : 
                        row.kycStatus === 'Suspended' ? 'bg-[#FF4D4F]' : 
                        'bg-[#8C8C93]'
                    }`}></div>
                    <span className={`font-medium ${
                        row.kycStatus === 'Active' ? 'text-[#00FFB3]' : 
                        row.kycStatus === 'Suspended' ? 'text-[#FF4D4F]' : 
                        'text-[#8C8C93]'
                    }`}>
                        {row.kycStatus}
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
        }
    ];

    // Permission categories with their specific permissions
    const permissionCategories = [
        {
            name: 'Users',
            permissions: [
                { id: 'view_users', label: 'View users' },
                { id: 'view_user_details', label: 'View user details' },
                { id: 'suspend_user', label: 'Suspend / unsuspend user' },
                { id: 'configure_boost', label: 'Configure boost' },
                { id: 'export_users', label: 'Export users' }
            ]
        },
        {
            name: 'Transactions',
            permissions: [
                { id: 'view_transactions', label: 'View all transactions' },
                { id: 'approve_withdrawal', label: 'Approve withdrawal' },
                { id: 'reverse_transaction', label: 'Reverse transaction' },
                { id: 'flag_transaction', label: 'Flag transaction' },
                { id: 'export_transactions', label: 'Export transactions' }
            ]
        },
        {
            name: 'Boost',
            permissions: [
                { id: 'allocate_boost', label: 'Allocate boost' },
                { id: 'view_boost_history', label: 'View boost history' },
                { id: 'view_boost_payouts', label: 'View boost upcoming payouts' }
            ]
        },
        {
            name: 'Audit',
            permissions: [
                { id: 'view_audit_logs', label: 'View audit logs' },
                { id: 'export_logs', label: 'Export logs' }
            ]
        },
        {
            name: 'Settings',
            permissions: [
                { id: 'view_settings', label: 'View settings' },
                { id: 'edit_system_configs', label: 'Edit system configurations' },
                { id: 'add_fee_exception', label: 'Add/Edit fee exception' },
                { id: 'edit_scheduled_tasks', label: 'Edit scheduled tasks' }
            ]
        },
        {
            name: 'Teams & Permissions',
            permissions: [
                { id: 'view_roles', label: 'View roles' },
                { id: 'create_edit_roles', label: 'Create/Edit roles' },
                { id: 'assign_members', label: 'Assign members' }
            ]
        }
    ];

    const handlePermissionChange = (permissionId: string, checked: boolean) => {
        setPermissions(prev => ({
            ...prev,
            [permissionId]: checked
        }));
    };

    const handleFormInputChange = (key: string, value: any) => {
        setRoleFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleCreateSubmit = () => {
        const selectedPermissions = Object.entries(permissions)
            .filter(([_, checked]) => checked)
            .map(([permissionId, _]) => permissionId);

        const roleData = {
            ...roleFormData,
            permissions: selectedPermissions
        };

        console.log('Creating role:', roleData);
        setIsCreateModalOpen(false);

        // Reset form data
        setRoleFormData({
            name: '',
            description: '',
            permissions: []
        });

        // Reset permissions to default state
        setPermissions({
            'view_users': true,
            'view_user_details': true,
            'suspend_user': false,
            'configure_boost': false,
            'export_users': false,
            'view_transactions': true,
            'approve_withdrawal': true,
            'reverse_transaction': false,
            'flag_transaction': false,
            'export_transactions': false,
            'allocate_boost': true,
            'view_boost_history': true,
            'view_boost_payouts': false,
            'view_audit_logs': true,
            'export_logs': false,
            'view_settings': false,
            'edit_system_configs': false,
            'add_fee_exception': false,
            'edit_scheduled_tasks': false,
            'view_roles': true,
            'create_edit_roles': false,
            'assign_members': false
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

    // Tab configuration for navigation only
    const tabs: TabItem[] = [
        {
            id: 'roles',
            label: 'Roles'
        },
        {
            id: 'members',
            label: 'Members'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-xl font-medium text-[#A2A2A7]">Teams & Permissions</h1>

                {/* Tab Navigation with Search and Add Button */}
                <div className="flex items-center justify-between">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        variant="toggle"
                        onTabChange={(tabId) => setActiveTab(tabId as 'roles' | 'members')}
                    />

                    <div className="flex items-center gap-3">
                        <Input
                            placeholder={`Search ${activeTab}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="filled"
                            className="w-64"
                        />
                        <Button
                            onClick={() => {
                                if (activeTab === 'roles') {
                                    setIsCreateModalOpen(true);
                                } else {
                                    setIsAddMemberModalOpen(true);
                                }
                            }}
                            variant="primary"
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
                    onRowClick={activeTab === 'members' ? (row) => {
                        setSelectedMember(row);
                        setIsMemberDetailsModalOpen(true);
                    } : undefined}
                />
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Add New Role"
                size="md"
                className="w-full max-w-2xl"
            >
                <div className="p-6 space-y-6">
                    {/* Role Name and Description */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                                Role Name
                            </label>
                            <Input
                                placeholder="Enter role name"
                                value={roleFormData.name}
                                onChange={(e) => handleFormInputChange('name', e.target.value)}
                                variant="filled"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                                Description
                            </label>
                            <Input
                                placeholder="Enter role description"
                                value={roleFormData.description}
                                onChange={(e) => handleFormInputChange('description', e.target.value)}
                                variant="filled"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Permission Matrix */}
                    <div>
                        <h3 className="text-lg font-medium text-[#DEDEE3] mb-4">Permission Matrix</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {permissionCategories.map((category) => (
                                <div key={category.name}>
                                    <h4 className="text-sm font-medium text-[#DEDEE3] mb-2">{category.name}</h4>
                                    <div className="bg-[#30303369] rounded-lg p-4 space-y-3 min-h-[180px] flex flex-col">
                                        <div className="space-y-2 flex-1">
                                            {category.permissions.map((permission) => (
                                                <Checkbox
                                                    key={permission.id}
                                                    id={permission.id}
                                                    label={permission.label}
                                                    checked={permissions[permission.id]}
                                                    onChange={(checked) => handlePermissionChange(permission.id, checked)}
                                                    size="sm"
                                                    variant="filled"
                                                    className="text-[#8C8C93]"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="secondary"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="text-[#8C8C93] hover:text-[#DEDEE3]"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleCreateSubmit}
                        >
                            Save role
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Add Member Modal */}
            <Modal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                title="Add New Member"
                size="md"
                className="w-full max-w-xl"
            >
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                            Full Name
                        </label>
                        <Input
                            placeholder="Enter member name"
                            value={memberFormData.name}
                            onChange={(e) => setMemberFormData(prev => ({ ...prev, name: e.target.value }))}
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                            Email Address
                        </label>
                        <Input
                            placeholder="Enter email address"
                            type="email"
                            value={memberFormData.email}
                            onChange={(e) => setMemberFormData(prev => ({ ...prev, email: e.target.value }))}
                            variant="filled"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#8C8C93] mb-2">
                            Assign Role
                        </label>
                        <Select
                            options={rolesData.map(role => ({ value: role.roleName, label: role.roleName }))}
                            placeholder="Select a role"
                            value={memberFormData.role}
                            onChange={(value) => setMemberFormData(prev => ({ ...prev, role: value as string }))}
                            className="w-full"
                        />
                    </div>

                    <div className="grid grid-cols-2 justify-end w-2/3 gap-3 pt-4 justify-self-end">
                        <Button
                            variant="filled"
                            onClick={() => setIsAddMemberModalOpen(false)}
                            className="text-[#8C8C93] hover:text-[#DEDEE3]"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log('Adding member:', memberFormData);
                                setIsAddMemberModalOpen(false);
                                setMemberFormData({ name: '', email: '', role: '' });
                            }}
                        >
                            Invite Member
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Member Details Modal */}
            <Modal
                isOpen={isMemberDetailsModalOpen}
                onClose={() => {
                    setIsMemberDetailsModalOpen(false);
                    setSelectedMember(null);
                }}
                title="Member Details"
                size="md"
                className="w-full max-w-2xl"
            >
                {selectedMember && (
                    <div className="p-6 space-y-6">
                        {/* Member Header */}
                        <div className="border-b border-[#313135BA] pb-4">
                            <h2 className="text-xl font-semibold text-[#DEDEE3] mb-1">{selectedMember.name}</h2>
                            <p className="text-[#8C8C93]">{selectedMember.email}</p>
                        </div>

                        {/* Member Information Sections */}
                        <div className="space-y-8">
                            <UserInfoSection
                                title="Status"
                                dotColor="#00FFB3"
                                columns={2}
                                fields={[
                                    { label: "Status", value: selectedMember.status },
                                    { label: "Date", value: "Oct 24, 2024, 5:50pm" },
                                    { label: "Last Login", value: selectedMember.lastLogin },
                                    { label: "Transaction ID", value: "COR573820583" },
                                    { label: "Type", value: "Withdrawal" }
                                ]}
                            />

                            <UserInfoSection
                                title="Member Information"
                                dotColor="#5B9BD5"
                                columns={2}
                                fields={[
                                    { label: "Amount", value: "₦500,000.74" },
                                    { label: "Fee", value: "₦500" },
                                    { label: "Net Amount", value: "₦499,000.74" }
                                ]}
                            />

                            <UserInfoSection
                                title="Transaction Flow Metadata"
                                dotColor="#B565A7"
                                columns={2}
                                fields={[
                                    { label: "Initiated By", value: "API" },
                                    { label: "Webhook Status", value: "Delivered" },
                                    { label: "IP Address", value: "192.2.7.1" },
                                    { label: "Device Info", value: "Browser" }
                                ]}
                            />

                            <UserInfoSection
                                title="Payment Information"
                                dotColor="#E8A14F"
                                columns={2}
                                fields={[
                                    { label: "Payment Type", value: "Withdrawal" },
                                    { label: "Source", value: "Vault" },
                                    { label: "Destination", value: "Bank Account" },
                                    { label: "Account Number (last 4 digits)", value: "****6930" },
                                    { label: "Bank", value: "Access Bank" },
                                    { label: "Account Name", value: "Sarah James" }
                                ]}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TeamsPermissionsPage;

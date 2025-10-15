"use client"
import React, { useState } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { RangeSlider } from '@/components/ui/range-slider';

const SegmentationsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form data for segment creation
    const [formData, setFormData] = useState({
        segmentName: '',
        savingPlanStatusEnabled: true,
        savingPlanStatus: '',
        savingsWalletBalanceEnabled: true,
        savingsWalletRange: { min: 2500, max: 2500 },
        vaultWalletBalanceEnabled: true,
        vaultWalletRange: { min: 2500, max: 2500 },
        userActivityEnabled: true,
        activityType: 'Active in last',
        activityDays: 30,
    });

    const [estimatedUsers] = useState(2315); // This would be calculated based on criteria

    const savingPlanStatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
    ];

    const activityTypeOptions = [
        { value: 'Active in last', label: 'Active in last' },
        { value: 'Inactive for', label: 'Inactive for' },
        { value: 'Last login', label: 'Last login' },
    ];

    // Form handling functions
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRangeChange = (field: string) => (min: number, max: number) => {
        setFormData(prev => ({ 
            ...prev, 
            [field]: { min, max }
        }));
    };

    const handleCreateSegment = (segmentData: any) => {
        console.log('Creating segment:', segmentData);
    };

    const handleSubmitSegment = () => {
        if (formData.segmentName.trim()) {
            handleCreateSegment(formData);
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setFormData({
            segmentName: '',
            savingPlanStatusEnabled: true,
            savingPlanStatus: '',
            savingsWalletBalanceEnabled: true,
            savingsWalletRange: { min: 2500, max: 2500 },
            vaultWalletBalanceEnabled: true,
            vaultWalletRange: { min: 2500, max: 2500 },
            userActivityEnabled: true,
            activityType: 'Active in last',
            activityDays: 30,
        });
        setIsCreateModalOpen(false);
    };

    // Segment Library data
    const segmentsData = [
        {
            id: '1',
            segmentName: 'KYC Tier 1 only',
            membersAssigned: '2,500',
            criteriaSummary: 'Balance > ₦50k, Active plan',
            dateCreated: '08 Aug 2025, 14:32'
        },
        {
            id: '2',
            segmentName: 'High Savers',
            membersAssigned: '300',
            criteriaSummary: 'Inactive > 30 days',
            dateCreated: '09 Aug 2025, 09:15'
        },
        {
            id: '3',
            segmentName: 'Dormant Users 30d',
            membersAssigned: '1,680',
            criteriaSummary: 'Tier 1, Balance > ₦50k',
            dateCreated: '10 Aug 2025, 11:47'
        },
        {
            id: '4',
            segmentName: 'Active Contributors',
            membersAssigned: '5,000',
            criteriaSummary: 'Tier 2, Balance ₦50k - ₦100k',
            dateCreated: '11 Aug 2025, 16:22'
        },
        {
            id: '5',
            segmentName: 'New Sign-ups This Month',
            membersAssigned: '8,000',
            criteriaSummary: 'Active, Last login < 7 days',
            dateCreated: '12 Aug 2025, 12:03'
        }
    ];

    // Table Columns
    const segmentsColumns: TableColumn<any>[] = [
        {
            key: 'segmentName',
            header: 'SEGMENT NAME',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] font-medium">{row.segmentName}</span>
            )
        },
        {
            key: 'membersAssigned',
            header: 'MEMBERS ASSIGNED',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#DEDEE3] bg-[#303033] px-2.5 py-2 rounded-md font-medium">{row.membersAssigned}</span>
            )
        },
        {
            key: 'criteriaSummary',
            header: 'CRITERIA SUMMARY',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.criteriaSummary}</span>
            )
        },
        {
            key: 'dateCreated',
            header: 'DATE CREATED',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="text-[#8C8C93]">{row.dateCreated}</span>
            )
        }
    ];

    // Filter data based on search query
    const filteredSegments = segmentsData.filter(segment =>
        segment.segmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.criteriaSummary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Segment Library Table */}
            <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                {/* Table Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-[#DEDEE3]">Segment Library</h2>
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
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.8335 18V15.5" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1665 18V13" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1665 5.5V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.8335 8V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.8335 15.5C5.05693 15.5 4.66865 15.5 4.36235 15.3732C3.95398 15.204 3.62952 14.8795 3.46036 14.4712C3.3335 14.1648 3.3335 13.7766 3.3335 13C3.3335 12.2234 3.3335 11.8352 3.46036 11.5288C3.62952 11.1205 3.95398 10.796 4.36235 10.6268C4.66865 10.5 5.05693 10.5 5.8335 10.5C6.61006 10.5 6.99835 10.5 7.30464 10.6268C7.71301 10.796 8.03747 11.1205 8.20663 11.5288C8.3335 11.8352 8.3335 12.2234 8.3335 13C8.3335 13.7766 8.3335 14.1648 8.20663 14.4712C8.03747 14.8795 7.71301 15.204 7.30464 15.3732C6.99835 15.5 6.61006 15.5 5.8335 15.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
                                <path d="M14.1665 10.5C13.3899 10.5 13.0017 10.5 12.6953 10.3732C12.287 10.204 11.9625 9.8795 11.7933 9.47117C11.6665 9.16483 11.6665 8.77657 11.6665 8C11.6665 7.22343 11.6665 6.83515 11.7933 6.52886C11.9625 6.12048 12.287 5.79602 12.6953 5.62687C13.0017 5.5 13.3899 5.5 14.1665 5.5C14.9431 5.5 15.3313 5.5 15.6377 5.62687C16.046 5.79602 16.3705 6.12048 16.5397 6.52886C16.6665 6.83515 16.6665 7.22343 16.6665 8C16.6665 8.77657 16.6665 9.16483 16.5397 9.47117C16.3705 9.8795 16.046 10.204 15.6377 10.3732C15.3313 10.5 14.9431 10.5 14.1665 10.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
                            </svg>
                        </Button>

                        {/* New Segment Button */}
                        <Button
                            size="sm"
                            variant='secondary'
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Segment
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <DataTable
                    data={filteredSegments}
                    columns={segmentsColumns}
                    variant="dark"
                    className="animate-in fade-in duration-700 delay-400 border-none"
                />
            </div>

            {/* Create Segment Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={handleCloseModal}
                title="Create new segment"
                size="xl"
                className='w-full'
            >
                <div className="p-6 space-y-6">
                    {/* Segment Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#8C8C93]">Segment Name</label>
                        <Input
                            type="text"
                            placeholder="Enter segment name"
                            value={formData.segmentName}
                            onChange={(e) => handleInputChange('segmentName', e.target.value)}
                            variant="filled"
                            className="text-[#DEDEE3] placeholder-[#8C8C93]"
                        />
                    </div>

                    {/* Saving Plan Status */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#8C8C93]">Saving Plan Status</label>
                            <Toggle
                                checked={formData.savingPlanStatusEnabled}
                                onChange={(checked) => handleInputChange('savingPlanStatusEnabled', checked)}
                                size="md"
                            />
                        </div>
                        {formData.savingPlanStatusEnabled && (
                            <Select
                                placeholder="Select savings plan status"
                                options={savingPlanStatusOptions}
                                value={formData.savingPlanStatus}
                                onChange={(value) => handleInputChange('savingPlanStatus', value)}
                                className="w-full"
                            />
                        )}
                    </div>

                    {/* Savings Wallet Balance */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#8C8C93]">Savings Wallet Balance</label>
                            <Toggle
                                checked={formData.savingsWalletBalanceEnabled}
                                onChange={(checked) => handleInputChange('savingsWalletBalanceEnabled', checked)}
                                size="md"
                            />
                        </div>
                        {formData.savingsWalletBalanceEnabled && (
                            <RangeSlider
                                min={0}
                                max={50000}
                                step={100}
                                minValue={formData.savingsWalletRange.min}
                                maxValue={formData.savingsWalletRange.max}
                                onChange={handleRangeChange('savingsWalletRange')}
                                editable={true}
                                prefix="₦ "
                            />
                        )}
                    </div>

                    {/* Vault Wallet Balance */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#8C8C93]">Vault Wallet Balance</label>
                            <Toggle
                                checked={formData.vaultWalletBalanceEnabled}
                                onChange={(checked) => handleInputChange('vaultWalletBalanceEnabled', checked)}
                                size="md"
                            />
                        </div>
                        {formData.vaultWalletBalanceEnabled && (
                            <RangeSlider
                                min={0}
                                max={50000}
                                step={100}
                                minValue={formData.vaultWalletRange.min}
                                maxValue={formData.vaultWalletRange.max}
                                onChange={handleRangeChange('vaultWalletRange')}
                                editable={true}
                                prefix="₦ "
                            />
                        )}
                    </div>

                    {/* User Activity */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#8C8C93]">User Activity</label>
                            <Toggle
                                checked={formData.userActivityEnabled}
                                onChange={(checked) => handleInputChange('userActivityEnabled', checked)}
                                size="md"
                            />
                        </div>
                        {formData.userActivityEnabled && (
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <Select
                                        options={activityTypeOptions}
                                        value={formData.activityType}
                                        onChange={(value) => handleInputChange('activityType', value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-20">
                                    <Input
                                        type="number"
                                        value={formData.activityDays.toString()}
                                        onChange={(e) => handleInputChange('activityDays', parseInt(e.target.value) || 0)}
                                        variant="filled"
                                        className="text-center text-[#DEDEE3]"
                                    />
                                </div>
                                <span className="text-sm text-[#8C8C93]">Days</span>
                            </div>
                        )}
                    </div>

                    {/* Segment Preview */}
                    <div className="p-4 bg-[#313135BA]/30 rounded-lg border border-[#313135BA]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-[#8C8C93] mb-1">Segment Preview</h4>
                                <p className="text-xs text-[#8C8C93]">Estimated users matching criteria</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-semibold text-[#00FFB3]">{estimatedUsers.toLocaleString()}</div>
                                <div className="text-xs text-[#8C8C93]">Users</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="secondary"
                            onClick={handleCloseModal}
                            className="px-6 py-2 bg-[#313135BA] text-[#DEDEE3] hover:bg-[#404044] border-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleSubmitSegment}
                            disabled={!formData.segmentName.trim()}
                            className="px-6 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Segment
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SegmentationsPage;

"use client";
import React, { useState, useEffect } from 'react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import Badge from '@/components/ui/badge';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import TimePicker from '@/components/ui/calendar/time-picker';
import SingleDatePicker from '@/components/ui/calendar/single-date-picker';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup } from '@/components/ui/radio';
import { Select } from '@/components/ui/select';

// Types for campaign data
interface Segment {
    id: number;
    name: string;
    criteria: Record<string, any>;
    members_count: number;
    criteria_summary: string;
    created_at: string;
    updated_at: string;
}

interface Campaign {
    id: number;
    name: string;
    segment_id: number;
    channel: 'email' | 'sms' | 'push_notification';
    subject: string | null;
    message: string;
    ctr: string | null;
    status: 'draft' | 'success' | 'failed' | 'pending' | 'scheduled';
    scheduled_at: string | null;
    sent_at: string | null;
    sent_count: number;
    delivered_count: number;
    opened_count: number;
    clicked_count: number;
    created_at: string;
    updated_at: string;
    segment: Segment;
}

interface CampaignsResponse {
    data: Campaign[];
}

const CampaignsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [segments, setSegments] = useState<Segment[]>([]);
    // Form data for campaign creation
    const [campaignFormData, setCampaignFormData] = useState({
        campaignName: '',
        targetSegment: '',
        channel: 'push_notification',
        messageSubject: '',
        messageBody: '',
        scheduleType: 'send-now',
        scheduleDate: null as Date | null,
        scheduleTime: ''
    });

    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get<CampaignsResponse>('/campaigns');
            setCampaigns(response.data.data);
        } catch (err: any) {
            console.error('Error fetching campaigns:', err);
            setError(err.message || 'Failed to fetch campaigns');
        } finally {
            setLoading(false);
        }
    };

    const fetchSegments = async () => {
        try {
            const response = await api.get<Segment[]>('/segments');
            setSegments(response.data);
        } catch (err: any) {
            console.error('Error fetching segments:', err);
        }
    };

    useEffect(() => {
        fetchCampaigns();
        fetchSegments();
    }, []);

    // Get status badge color
    const getStatusColor = (status: Campaign['status']) => {
        switch (status) {
            case 'success':
                return 'success';
            case 'failed':
                return 'error';
            case 'draft':
                return 'default';
            case 'pending':
                return 'warning';
            case 'scheduled':
                return 'info';
            default:
                return 'default';
        }
    };    // Get channel display name
    const getChannelDisplay = (channel: Campaign['channel']) => {
        switch (channel) {
            case 'email':
                return 'Email';
            case 'sms':
                return 'SMS';
            case 'push_notification':
                return 'Push Notification';
            default:
                return channel;
        }
    };

    // Table Columns
    const campaignsColumns: TableColumn<Campaign>[] = [
        {
            key: 'name',
            header: 'CAMPAIGN NAME',
            sortable: true,
            render: (value: any, row: Campaign) => (
                <span className="text-[#DEDEE3] font-medium">{row.name}</span>
            )
        },
        {
            key: 'segment',
            header: 'TARGETED SEGMENT',
            sortable: true,
            render: (value: any, row: Campaign) => (
                <span className="text-[#DEDEE3]">{row.segment.name}</span>
            )
        },
        {
            key: 'channel',
            header: 'CHANNEL',
            sortable: true,
            render: (value: any, row: Campaign) => (
                <span className="text-[#DEDEE3]">{getChannelDisplay(row.channel)}</span>
            )
        },
        {
            key: 'ctr',
            header: 'CTR',
            sortable: true,
            render: (value: any, row: Campaign) => (
                <span className="text-[#00FFB3] font-medium">{row.ctr ? `${row.ctr}%` : 'N/A'}</span>
            )
        },
        {
            key: 'status',
            header: 'STATUS',
            sortable: true,
            render: (value: any, row: Campaign) => (
                <Badge color={getStatusColor(row.status)} variant="dot">
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Badge>
            )
        },
        {
            key: 'created_at',
            header: 'DATE CREATED',
            sortable: true,
            render: (value: any, row: Campaign) => (
                <span className="text-[#8C8C93]">{formatDate(row.created_at)}</span>
            )
        }
    ];

    // Filter data based on search query
    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.channel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Options for campaign creation
    const targetSegmentOptions = segments.map(segment => ({
        value: String(segment.id),
        label: `${segment.name} (${segment.members_count} users)`
    }));

    const scheduleOptions = [
        { value: 'send-now', label: 'Send Now' },
        { value: 'send-later', label: 'Send Later' },
    ];

    // Form handlers
    const handleCampaignInputChange = (field: string, value: any) => {
        setCampaignFormData(prev => ({ ...prev, [field]: value }));
        setCreateError(null);
    };

    const handleCreateCampaign = async () => {
        try {
            setCreating(true);
            setCreateError(null);

            // Format scheduled_at if send-later is selected
            let scheduledAt = null;
            if (campaignFormData.scheduleType === 'send-later' && campaignFormData.scheduleDate) {
                // Format as YYYY-MM-DD
                const year = campaignFormData.scheduleDate.getFullYear();
                const month = String(campaignFormData.scheduleDate.getMonth() + 1).padStart(2, '0');
                const day = String(campaignFormData.scheduleDate.getDate()).padStart(2, '0');
                scheduledAt = `${year}-${month}-${day}`;
            }

            await api.post('/campaigns', {
                name: campaignFormData.campaignName,
                segment_id: Number(campaignFormData.targetSegment),
                channel: campaignFormData.channel,
                subject: campaignFormData.messageSubject,
                message: campaignFormData.messageBody,
                ...(scheduledAt && { scheduled_at: scheduledAt })
            });

            // Refresh campaigns list
            await fetchCampaigns();

            // Close modal and reset form
            handleCloseCreateModal();
        } catch (err: any) {
            console.error('Error creating campaign:', err);
            setCreateError(err.response?.data?.message || err.message || 'Failed to create campaign');
        } finally {
            setCreating(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedCampaign(null);
        setIsDetailsModalOpen(false);
    };


    const handleCloseCreateModal = () => {
        setCampaignFormData({
            campaignName: '',
            targetSegment: '',
            channel: 'push_notification',
            messageSubject: '',
            messageBody: '',
            scheduleType: 'send-now',
            scheduleDate: null,
            scheduleTime: ''
        });
        setCreateError(null);
        setIsCreateModalOpen(false);
    };

    const handleRowClick = (campaign: any) => {
        setSelectedCampaign(campaign);
        setIsDetailsModalOpen(true);
    };


    return (
        <div className="space-y-6">
            {/* Recent Campaigns Table */}
            <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
                {/* Table Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-[#DEDEE3]">Recent Campaigns</h2>
                        </div>
                    </div>

                    {/* Right side - Search and Create Button */}
                    <div className="flex items-center gap-3">
                        <div className="w-full sm:w-64">
                            <Input
                                type="text"
                                placeholder="Search campaigns..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size="sm"
                                variant="filled"
                                trailingIcon={
                                    <svg className="w-4 h-4 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                            />
                        </div>
                        <Button
                            size="sm"
                            variant='secondary'
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Campaign
                        </Button>
                    </div>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FFB3]"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="text-red-400 mb-2">⚠️ {error}</div>
                        <Button
                            onClick={() => fetchCampaigns()}
                            variant="filled"
                            size="sm"
                            className="bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90"
                        >
                            Retry
                        </Button>
                    </div>
                ) : (
                    <DataTable
                        data={filteredCampaigns}
                        columns={campaignsColumns}
                        variant="dark"
                        className="animate-in fade-in duration-700 delay-400 border-none"
                        onRowClick={handleRowClick}
                    />
                )}
            </div>
            {/* Campaign Details Modal */}
            {selectedCampaign && (
                <Modal
                    isOpen={isDetailsModalOpen}
                    onClose={handleCloseModal}
                    title={selectedCampaign.name}
                    size="2xl"
                    className='w-full'
                >
                    <div className="p-6 space-y-6">
                        {/* Campaign Details Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-[#3AACFF] rounded-xs"></div>
                                <h4 className="text-sm font-medium text-[#DEDEE3]">Campaign Details</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Channel</p>
                                    <p className="text-sm text-[#DEDEE3]">{getChannelDisplay(selectedCampaign.channel)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Segment</p>
                                    <p className="text-sm text-[#DEDEE3]">{selectedCampaign.segment.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Sent Date</p>
                                    <p className="text-sm text-[#DEDEE3]">{selectedCampaign.sent_at ? formatDate(selectedCampaign.sent_at) : 'Not sent'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${selectedCampaign.status === 'success' ? 'bg-[#05B480]' : 'bg-[#FF4D4F]'}`}></div>
                                        <span className={`text-sm font-medium ${selectedCampaign.status === 'success' ? 'text-[#05B480]' : 'text-[#FF4D4F]'}`}>
                                            {selectedCampaign.status.charAt(0).toUpperCase() + selectedCampaign.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="py-4">
                            <div className="border-t border-[#313135BA]"></div>
                        </div>

                        {/* Message Preview Section */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-[#8C8C93]">Message Preview</h4>
                            <div className="p-4 bg-[#313135BA]/30 rounded-lg border border-[#313135BA]">
                                <h5 className="text-sm font-medium text-[#DEDEE3] mb-2">{selectedCampaign.subject || 'No Subject'}</h5>
                                <p className="text-xs text-[#8C8C93]">{selectedCampaign.message}</p>
                            </div>
                        </div>

                        {/* Delivery Report Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-[#E697FF] rounded-xs"></div>
                                <h4 className="text-sm font-medium text-[#DEDEE3]">Delivery Report</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Sent</p>
                                    <p className="text-lg font-semibold text-[#DEDEE3]">{selectedCampaign.sent_count.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Delivered</p>
                                    <p className="text-lg font-semibold text-[#DEDEE3]">{selectedCampaign.delivered_count.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">Opened</p>
                                    <p className="text-lg font-semibold text-[#DEDEE3]">{selectedCampaign.opened_count.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#8C8C93] mb-1">CTR</p>
                                    <p className="text-lg font-semibold text-[#00FFB3]">{selectedCampaign.ctr ? `${selectedCampaign.ctr}%` : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Create Campaign Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                title="Create new campaign"
                size="xl"
                className="w-full mx-4 sm:mx-0 max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            >
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)] overflow-y-auto">
                    {/* Error Message */}
                    {createError && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <p className="text-red-400">{createError}</p>
                        </div>
                    )}

                    {/* Campaign Name */}
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter campaign name"
                            value={campaignFormData.campaignName}
                            onChange={(e) => handleCampaignInputChange('campaignName', e.target.value)}
                            variant="filled"
                            className="text-[#DEDEE3] placeholder-[#8C8C93] w-full mt-4"
                            label='Compaign Name'
                        />
                    </div>

                    {/* Target Segment */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-[#8C8C93]">Target Segment</label>
                        <Select
                            placeholder="Select target segment"
                            options={targetSegmentOptions}
                            value={campaignFormData.targetSegment}
                            onChange={(value) => handleCampaignInputChange('targetSegment', value)}
                            className="w-full mt-4"
                        />
                    </div>

                    {/* Channel */}
                    <div className="space-y-3">
                        <div className="space-y-2 sm:space-y-3">
                            <RadioGroup
                                label='Channel'
                                name="channel"
                                value={campaignFormData.channel}
                                onChange={(value) => handleCampaignInputChange('channel', value)}
                                options={[
                                    {
                                        label: 'Email',
                                        value: 'email',
                                        icon: (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        label: 'Push Notification',
                                        value: 'push_notification',
                                        icon: (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.343 12.343a8 8 0 1111.314 0" />
                                            </svg>
                                        )
                                    },
                                    {
                                        label: 'SMS',
                                        value: 'sms',
                                        icon: (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        )
                                    }
                                ]}
                                orientation="vertical"
                                className="space-y-1 sm:space-y-2"
                            />
                        </div>
                    </div>

                    {/* Message Section */}
                    <div className="space-y-4">
                        {/* Message Subject */}
                        <div className='bg-[#3030336E] w-full py-3 px-2 border-[#303033] border rounded-md text-[#DEDEE3CC]'>Message</div>
                        <div className="space-y-4">
                            <Input
                                label='Message Subject'
                                type="text"
                                placeholder="Enter message subject"
                                value={campaignFormData.messageSubject}
                                onChange={(e) => handleCampaignInputChange('messageSubject', e.target.value)}
                                variant="filled"
                                className="text-[#DEDEE3] placeholder-[#8C8C93] w-full"
                            />
                        </div>

                        {/* Message Body */}
                        <div className="space-y-4">
                            <Textarea
                                label='Message Body'
                                placeholder="Enter message body"
                                value={campaignFormData.messageBody}
                                onChange={(e) => handleCampaignInputChange('messageBody', e.target.value)}
                                rows={4}
                                variant="filled"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Schedule Campaign */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-[#8C8C93]">Schedule Campaign</h4>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                                <Select
                                    options={scheduleOptions}
                                    value={campaignFormData.scheduleType}
                                    onChange={(value) => handleCampaignInputChange('scheduleType', value)}
                                    className="w-full"
                                />
                            </div>

                            {campaignFormData.scheduleType === 'send-later' && (
                                <>
                                    <div className="flex-1 min-w-0">
                                        <SingleDatePicker
                                            value={campaignFormData.scheduleDate || undefined}
                                            onChange={(date) => handleCampaignInputChange('scheduleDate', date)}
                                            placeholder="Select date"
                                            minDate={new Date()} // Don't allow past dates
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <TimePicker
                                            value={campaignFormData.scheduleTime}
                                            onChange={(time) => handleCampaignInputChange('scheduleTime', time)}
                                            placeholder="Select time"
                                            format="12h"
                                            minuteStep={15}
                                            className="w-full"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#313135BA] mt-6">
                        <Button
                            variant="secondary"
                            onClick={handleCloseCreateModal}
                            disabled={creating}
                            className="w-full sm:w-auto px-6 py-2 bg-[#313135BA] text-[#DEDEE3] hover:bg-[#404044] border-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleCreateCampaign}
                            disabled={creating || !campaignFormData.campaignName.trim() || !campaignFormData.targetSegment || !campaignFormData.messageBody.trim()}
                            className="w-full sm:w-auto px-6 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {creating ? 'Creating...' : 'Create Campaign'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CampaignsPage;

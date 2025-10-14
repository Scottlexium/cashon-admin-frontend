// "use client";
// import React, { useState, useEffect } from 'react';
// import { DataTable, TableColumn } from '@/components/ui/table';
// import { Button } from '@/components/ui/button/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Modal } from '@/components/ui/modal';
// import { Select } from '@/components/ui/select';
// import { RadioGroup } from '@/components/ui/radio';
// import { SingleDatePicker } from '@/components/ui/calendar/single-date-picker';
// import { TimePicker } from '@/components/ui/calendar/time-picker';
// import { Badge } from '@/components/ui/badge';
// import api from '@/lib/api';
// import { formatDate } from '@/lib/utils';

// // Types for campaign data
// interface Segment {
//     id: number;
//     name: string;
//     criteria: Record<string, any>;
//     members_count: number;
//     criteria_summary: string;
//     created_at: string;
//     updated_at: string;
// }

// interface Campaign {
//     id: number;
//     name: string;
//     segment_id: number;
//     channel: 'email' | 'sms' | 'push_notification';
//     subject: string | null;
//     message: string;
//     ctr: string | null;
//     status: 'draft' | 'success' | 'failed' | 'pending' | 'scheduled';
//     scheduled_at: string | null;
//     sent_at: string | null;
//     sent_count: number;
//     delivered_count: number;
//     opened_count: number;
//     clicked_count: number;
//     created_at: string;
//     updated_at: string;
//     segment: Segment;
// }

// interface CampaignsResponse {
//     data: Campaign[];
// }

// const CampaignsPage = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Form data for campaign creation
//     const [campaignFormData, setCampaignFormData] = useState({
//         campaignName: '',
//         targetSegment: '',
//         channel: 'push_notification',
//         messageSubject: '',
//         messageBody: '',
//         scheduleType: 'send-now',
//         scheduleDate: null as Date | null,
//         scheduleTime: ''
//     });

//     // Fetch campaigns data
//     const fetchCampaigns = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await api.get<CampaignsResponse>('/campaigns');
//             setCampaigns(response.data);
//         } catch (err: any) {
//             console.error('Error fetching campaigns:', err);
//             setError(err.message || 'Failed to fetch campaigns');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCampaigns();
//     }, []);

//     // Get status badge variant
//     const getStatusVariant = (status: Campaign['status']) => {
//         switch (status) {
//             case 'success':
//                 return 'success';
//             case 'failed':
//                 return 'destructive';
//             case 'draft':
//                 return 'secondary';
//             case 'pending':
//                 return 'warning';
//             case 'scheduled':
//                 return 'info';
//             default:
//                 return 'secondary';
//         }
//     };

//     // Get channel display name
//     const getChannelDisplay = (channel: Campaign['channel']) => {
//         switch (channel) {
//             case 'email':
//                 return 'Email';
//             case 'sms':
//                 return 'SMS';
//             case 'push_notification':
//                 return 'Push Notification';
//             default:
//                 return channel;
//         }
//     };

//     // Recent Campaigns data
//     const campaignsData = [
//         {
//             id: '1',
//             campaignName: 'August Boost Promo',
//             targetedSegment: 'Boost Participants',
//             channel: 'Push Notification',
//             ctr: '15.6%',
//             status: 'Success',
//             dateCreated: '08 Aug 2025, 14:32',
//             sentDate: '12th June, 2025',
//             messageTitle: 'Boost is Ready',
//             messageContent: '🚀 Your Boost is ready! Earn up to 15% interest on your savings. Activate now!',
//             deliveryStats: {
//                 sent: 5678,
//                 delivered: 5600,
//                 opened: 4700,
//                 ctrValue: '32.6%'
//             }
//         },
//         {
//             id: '2',
//             campaignName: 'Dormant Reactivation',
//             targetedSegment: 'Pending KYC',
//             channel: 'Email',
//             ctr: '8.9%',
//             status: 'Success',
//             dateCreated: '09 Aug 2025, 09:15',
//             sentDate: '15th June, 2025',
//             messageTitle: 'Complete Your KYC',
//             messageContent: '📋 Complete your KYC verification to unlock all features and higher transaction limits.',
//             deliveryStats: {
//                 sent: 3245,
//                 delivered: 3200,
//                 opened: 1850,
//                 ctrValue: '8.9%'
//             }
//         },
//         {
//             id: '3',
//             campaignName: 'KYC Completion',
//             targetedSegment: 'Users w/ Active Savings',
//             channel: 'SMS',
//             ctr: '10.2%',
//             status: 'Success',
//             dateCreated: '10 Aug 2025, 11:47',
//             sentDate: '18th June, 2025',
//             messageTitle: 'Savings Update',
//             messageContent: '💰 Your savings are growing! Check your latest interest earnings in the app.',
//             deliveryStats: {
//                 sent: 7890,
//                 delivered: 7820,
//                 opened: 6100,
//                 ctrValue: '10.2%'
//             }
//         },
//         {
//             id: '4',
//             campaignName: 'Savings Anniversary',
//             targetedSegment: 'Boost Participants',
//             channel: 'Push Notification',
//             ctr: '12.5%',
//             status: 'Success',
//             dateCreated: '11 Aug 2025, 16:22',
//             sentDate: '20th June, 2025',
//             messageTitle: 'Anniversary Bonus',
//             messageContent: '🎉 Congratulations on your savings anniversary! Enjoy exclusive bonus rates this month.',
//             deliveryStats: {
//                 sent: 4567,
//                 delivered: 4500,
//                 opened: 3800,
//                 ctrValue: '12.5%'
//             }
//         },
//         {
//             id: '5',
//             campaignName: 'High Value Reminder',
//             targetedSegment: 'Pending KYC',
//             channel: 'SMS',
//             ctr: '9.7%',
//             status: 'Failed',
//             dateCreated: '12 Aug 2025, 12:03',
//             sentDate: '22nd June, 2025',
//             messageTitle: 'Account Verification',
//             messageContent: '⚠️ Important: Complete your account verification to avoid service limitations.',
//             deliveryStats: {
//                 sent: 2100,
//                 delivered: 1800,
//                 opened: 900,
//                 ctrValue: '9.7%'
//             }
//         }
//     ];

//     // Options for campaign creation
//     const targetSegmentOptions = [
//         { value: 'boost-participants', label: 'Boost Participants' },
//         { value: 'pending-kyc', label: 'Pending KYC' },
//         { value: 'active-savings', label: 'Users w/ Active Savings' },
//         { value: 'high-value-users', label: 'High Value Users' },
//         { value: 'dormant-users', label: 'Dormant Users' },
//     ];

//     const scheduleOptions = [
//         { value: 'send-now', label: 'Send Now' },
//         { value: 'send-later', label: 'Send Later' },
//     ];

//     // Form handlers
//     const handleCampaignInputChange = (field: string, value: any) => {
//         setCampaignFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const handleCreateCampaign = () => {
//         // Handle campaign creation logic here
//         console.log('Creating campaign:', campaignFormData);
//         handleCloseCreateModal();
//     };

//     const handleCloseCreateModal = () => {
//         setCampaignFormData({
//             campaignName: '',
//             targetSegment: '',
//             channel: 'push-notification',
//             messageSubject: '',
//             messageBody: '',
//             scheduleType: 'send-now',
//             scheduleDate: null,
//             scheduleTime: ''
//         });
//         setIsCreateModalOpen(false);
//     };

//     // Modal handlers
//     const handleRowClick = (campaign: any) => {
//         setSelectedCampaign(campaign);
//         setIsDetailsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setSelectedCampaign(null);
//         setIsDetailsModalOpen(false);
//     };

//     // Table Columns
//     const campaignsColumns: TableColumn<any>[] = [
//         {
//             key: 'campaignName',
//             header: 'CAMPAIGN NAME',
//             sortable: true,
//             render: (value: any, row: any) => (
//                 <span className="text-[#DEDEE3] font-medium">{row.campaignName}</span>
//             )
//         },
//         {
//             key: 'targetedSegment',
//             header: 'TARGETED SEGMENT',
//             sortable: true,
//             render: (value: any, row: any) => (
//                 <span className="text-[#DEDEE3]">{row.targetedSegment}</span>
//             )
//         },
//         {
//             key: 'channel',
//             header: 'CHANNEL',
//             sortable: true,
//             render: (value: any, row: any) => (
//                 <span className="text-[#DEDEE3]">{row.channel}</span>
//             )
//         },
//         {
//             key: 'ctr',
//             header: 'CTR',
//             sortable: true,
//             render: (value: any, row: any) => (
//                 <span className="text-[#00FFB3] font-medium">{row.ctr}</span>
//             )
//         },
//         {
//             key: 'status',
//             header: 'STATUS',
//             sortable: true,
//             render: (value: any, row: any) => {
//                 const isSuccess = row.status === 'Success';
//                 return (
//                     <div className="flex items-center gap-2">
//                         <div className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-[#00FFB3]' : 'bg-[#FF4D4F]'}`} />
//                         <span className={`text-sm font-medium ${isSuccess ? 'text-[#00FFB3]' : 'text-[#FF4D4F]'}`}>
//                             {row.status}
//                         </span>
//                     </div>
//                 );
//             }
//         },
//         {
//             key: 'dateCreated',
//             header: 'DATE CREATED',
//             sortable: true,
//             render: (value: any, row: any) => (
//                 <span className="text-[#8C8C93]">{row.dateCreated}</span>
//             )
//         }
//     ];

//     // Filter data based on search query
//     const filteredCampaigns = campaignsData.filter(campaign =>
//         campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.targetedSegment.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.channel.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="space-y-6">
//             {/* Recent Campaigns Table */}
//             <div className="rounded-xl p-4 sm:p-6 bg-[#1C1C1E] border-[#313135BA] border-2">
//                 {/* Table Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#303033] border-[0.78px] border-[#363639] flex items-center justify-center">
//                             <svg className="w-5 h-5 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
//                             </svg>
//                         </div>
//                         <div>
//                             <h2 className="text-lg font-medium text-[#DEDEE3]">Recent Campaigns</h2>
//                         </div>
//                     </div>

//                     {/* Right side - Search and Actions */}
//                     <div className="flex items-center gap-3">
//                         {/* Search */}
//                         <div className="w-full sm:w-64">
//                             <Input
//                                 type="text"
//                                 placeholder="Search"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 size="sm"
//                                 variant="filled"
//                                 trailingIcon={
//                                     <svg className="w-4 h-4 text-[#8C8C93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                     </svg>
//                                 }
//                                 className="text-white placeholder-[#8C8C93]"
//                             />
//                         </div>

//                         {/* Filter Button */}
//                         <Button
//                             variant="secondary"
//                             size="sm"
//                             className="px-3 py-2 bg-[#303033] border-[#363639] hover:bg-[#404044]"
//                         >
//                             <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M5.8335 18V15.5" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M14.1665 18V13" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M14.1665 5.5V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M5.8335 8V3" stroke="#DEDEE3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M5.8335 15.5C5.05693 15.5 4.66865 15.5 4.36235 15.3732C3.95398 15.204 3.62952 14.8795 3.46036 14.4712C3.3335 14.1648 3.3335 13.7766 3.3335 13C3.3335 12.2234 3.3335 11.8352 3.46036 11.5288C3.62952 11.1205 3.95398 10.796 4.36235 10.6268C4.66865 10.5 5.05693 10.5 5.8335 10.5C6.61006 10.5 6.99835 10.5 7.30464 10.6268C7.71301 10.796 8.03747 11.1205 8.20663 11.5288C8.3335 11.8352 8.3335 12.2234 8.3335 13C8.3335 13.7766 8.3335 14.1648 8.20663 14.4712C8.03747 14.8795 7.71301 15.204 7.30464 15.3732C6.99835 15.5 6.61006 15.5 5.8335 15.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
//                                 <path d="M14.1665 10.5C13.3899 10.5 13.0017 10.5 12.6953 10.3732C12.287 10.204 11.9625 9.8795 11.7933 9.47117C11.6665 9.16483 11.6665 8.77657 11.6665 8C11.6665 7.22343 11.6665 6.83515 11.7933 6.52886C11.9625 6.12048 12.287 5.79602 12.6953 5.62687C13.0017 5.5 13.3899 5.5 14.1665 5.5C14.9431 5.5 15.3313 5.5 15.6377 5.62687C16.046 5.79602 16.3705 6.12048 16.5397 6.52886C16.6665 6.83515 16.6665 7.22343 16.6665 8C16.6665 8.77657 16.6665 9.16483 16.5397 9.47117C16.3705 9.8795 16.046 10.204 15.6377 10.3732C15.3313 10.5 14.9431 10.5 14.1665 10.5Z" stroke="#DEDEE3" strokeWidth="1.5" />
//                             </svg>
//                         </Button>

//                         {/* New Campaign Button */}
//                         <Button
//                             size="sm"
//                             variant='secondary'
//                             onClick={() => setIsCreateModalOpen(true)}
//                             className="px-4 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold"
//                         >
//                             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                             </svg>
//                             New Campaign
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <DataTable
//                     data={filteredCampaigns}
//                     columns={campaignsColumns}
//                     variant="dark"
//                     className="animate-in fade-in duration-700 delay-400 border-none"
//                     onRowClick={handleRowClick}
//                 />
//             </div>

//             {/* Campaign Details Modal */}
//             {selectedCampaign && (
//                 <Modal
//                     isOpen={isDetailsModalOpen}
//                     onClose={handleCloseModal}
//                     title={selectedCampaign.campaignName}
//                     size="2xl"
//                     className='w-full'
//                 >
//                     <div className="p-6 space-y-6">
//                         {/* Campaign Details Section */}
//                         <div className="space-y-4">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-2.5 h-2.5 bg-[#3AACFF] rounded-xs"></div>
//                                 <h4 className="text-sm font-medium text-[#DEDEE3]">Campaign Details</h4>
//                             </div>
                            
//                             <div className="grid grid-cols-2 gap-6">
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Channel</p>
//                                     <p className="text-sm text-[#DEDEE3]">{selectedCampaign.channel}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Segment</p>
//                                     <p className="text-sm text-[#DEDEE3]">{selectedCampaign.targetedSegment}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Sent Date</p>
//                                     <p className="text-sm text-[#DEDEE3]">{selectedCampaign.sentDate}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Status</p>
//                                     <div className="flex items-center gap-2">
//                                         <div className={`w-2 h-2 rounded-full ${selectedCampaign.status === 'Success' ? 'bg-[#05B480]' : 'bg-[#FF4D4F]'}`}></div>
//                                         <span className={`text-sm font-medium ${selectedCampaign.status === 'Success' ? 'text-[#05B480]' : 'text-[#FF4D4F]'}`}>
//                                             {selectedCampaign.status === 'Success' ? 'Completed' : 'Failed'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Divider */}
//                         <div className="py-4">
//                             <div className="border-t border-[#313135BA]"></div>
//                         </div>

//                         {/* Message Preview Section */}
//                         <div className="space-y-4">
//                             <h4 className="text-sm font-medium text-[#8C8C93]">Message Preview</h4>
//                             <div className="p-4 bg-[#313135BA]/30 rounded-lg border border-[#313135BA]">
//                                 <h5 className="text-sm font-medium text-[#DEDEE3] mb-2">{selectedCampaign.messageTitle}</h5>
//                                 <p className="text-xs text-[#8C8C93]">{selectedCampaign.messageContent}</p>
//                             </div>
//                         </div>

//                         {/* Delivery Report Section */}
//                         <div className="space-y-4">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-2.5 h-2.5 bg-[#E697FF] rounded-xs"></div>
//                                 <h4 className="text-sm font-medium text-[#DEDEE3]">Delivery Report</h4>
//                             </div>
                            
//                             <div className="grid grid-cols-2 gap-6">
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Sent</p>
//                                     <p className="text-lg font-semibold text-[#DEDEE3]">{selectedCampaign.deliveryStats.sent.toLocaleString()}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Delivered</p>
//                                     <p className="text-lg font-semibold text-[#DEDEE3]">{selectedCampaign.deliveryStats.delivered.toLocaleString()}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">Opened</p>
//                                     <p className="text-lg font-semibold text-[#DEDEE3]">{selectedCampaign.deliveryStats.opened.toLocaleString()}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#8C8C93] mb-1">CTR</p>
//                                     <p className="text-lg font-semibold text-[#00FFB3]">{selectedCampaign.deliveryStats.ctrValue}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Modal>
//             )}

//             {/* Create Campaign Modal */}
//             <Modal
//                 isOpen={isCreateModalOpen}
//                 onClose={handleCloseCreateModal}
//                 title="Create new campaign"
//                 size="2xl"
//                 className="w-full mx-4 sm:mx-0 max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
//             >
//                 <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)] overflow-y-auto">
//                     {/* Campaign Name */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium text-[#8C8C93]">Campaign Name</label>
//                         <Input
//                             type="text"
//                             placeholder="Enter campaign name"
//                             value={campaignFormData.campaignName}
//                             onChange={(e) => handleCampaignInputChange('campaignName', e.target.value)}
//                             variant="filled"
//                             className="text-[#DEDEE3] placeholder-[#8C8C93] w-full"
//                         />
//                     </div>

//                     {/* Target Segment */}
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium text-[#8C8C93]">Target Segment</label>
//                         <Select
//                             placeholder="Select target segment"
//                             options={targetSegmentOptions}
//                             value={campaignFormData.targetSegment}
//                             onChange={(value) => handleCampaignInputChange('targetSegment', value)}
//                             className="w-full"
//                         />
//                     </div>

//                     {/* Channel */}
//                     <div className="space-y-3">
//                         <label className="text-sm font-medium text-[#8C8C93]">Channel</label>
//                         <div className="space-y-2 sm:space-y-3">
//                             <RadioGroup
//                                 name="channel"
//                                 value={campaignFormData.channel}
//                                 onChange={(value) => handleCampaignInputChange('channel', value)}
//                                 options={[
//                                     {
//                                         label: 'Email',
//                                         value: 'email',
//                                         icon: (
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                             </svg>
//                                         )
//                                     },
//                                     {
//                                         label: 'Push Notification',
//                                         value: 'push-notification',
//                                         icon: (
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.343 12.343a8 8 0 1111.314 0" />
//                                             </svg>
//                                         )
//                                     },
//                                     {
//                                         label: 'SMS',
//                                         value: 'sms',
//                                         icon: (
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                                             </svg>
//                                         )
//                                     }
//                                 ]}
//                                 orientation="vertical"
//                                 className="space-y-1 sm:space-y-2"
//                             />
//                         </div>
//                     </div>

//                     {/* Message Section */}
//                     <div className="p-4 bg-[#313135BA]/30 rounded-lg border border-[#313135BA] space-y-4">
//                         <h4 className="text-sm font-medium text-[#8C8C93]">Message</h4>
                        
//                         {/* Message Subject */}
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium text-[#8C8C93]">Message Subject</label>
//                             <Input
//                                 type="text"
//                                 placeholder="Enter message subject"
//                                 value={campaignFormData.messageSubject}
//                                 onChange={(e) => handleCampaignInputChange('messageSubject', e.target.value)}
//                                 variant="filled"
//                                 className="text-[#DEDEE3] placeholder-[#8C8C93] w-full"
//                             />
//                         </div>

//                         {/* Message Body */}
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium text-[#8C8C93]">Message Body</label>
//                             <Textarea
//                                 placeholder="Enter message body"
//                                 value={campaignFormData.messageBody}
//                                 onChange={(e) => handleCampaignInputChange('messageBody', e.target.value)}
//                                 rows={4}
//                                 variant="filled"
//                                 className="w-full"
//                             />
//                         </div>
//                     </div>

//                     {/* Schedule Campaign */}
//                     <div className="space-y-4">
//                         <h4 className="text-sm font-medium text-[#8C8C93]">Schedule Campaign</h4>
                        
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
//                             <div className="flex-1 min-w-0">
//                                 <Select
//                                     options={scheduleOptions}
//                                     value={campaignFormData.scheduleType}
//                                     onChange={(value) => handleCampaignInputChange('scheduleType', value)}
//                                     className="w-full"
//                                 />
//                             </div>
                            
//                             {campaignFormData.scheduleType === 'send-later' && (
//                                 <>
//                                     <div className="flex-1 min-w-0">
//                                         <SingleDatePicker
//                                             value={campaignFormData.scheduleDate || undefined}
//                                             onChange={(date) => handleCampaignInputChange('scheduleDate', date)}
//                                             placeholder="Select date"
//                                             minDate={new Date()} // Don't allow past dates
//                                             className="w-full"
//                                         />
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <TimePicker
//                                             value={campaignFormData.scheduleTime}
//                                             onChange={(time) => handleCampaignInputChange('scheduleTime', time)}
//                                             placeholder="Select time"
//                                             format="12h"
//                                             minuteStep={15}
//                                             className="w-full"
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#313135BA] mt-6">
//                         <Button
//                             variant="secondary"
//                             onClick={handleCloseCreateModal}
//                             className="w-full sm:w-auto px-6 py-2 bg-[#313135BA] text-[#DEDEE3] hover:bg-[#404044] border-none"
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="secondary"
//                             onClick={handleCreateCampaign}
//                             disabled={!campaignFormData.campaignName.trim() || !campaignFormData.targetSegment}
//                             className="w-full sm:w-auto px-6 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Create Campaign
//                         </Button>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default CampaignsPage;

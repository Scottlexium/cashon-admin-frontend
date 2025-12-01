"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import api from '@/lib/api';

interface SystemSettings {
    early_withdrawal_fee_enabled: boolean;
    early_withdrawal_fee_rate: string;
    auto_pause_boost_threshold: string;
    annual_boost_cap: string;
    max_boost_per_user: string;
    global_auto_reinvestment: boolean;
}

const SystemConfigurationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [settings, setSettings] = useState({
        earlyWithdrawalFee: {
            enabled: true,
            value: '5',
            unit: 'percentage'
        },
        autoPauseBoostThreshold: {
            value: '5'
        },
        annualBoostCap: {
            value: '5'
        },
        maxBoostPerUser: {
            value: '5'
        },
        globalAutoReinvestment: true
    });

    // Fetch settings from API
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const response = await api.get<SystemSettings[]>('/settings');
                const data = response.data[0]; // Get first object from array
                
                setSettings({
                    earlyWithdrawalFee: {
                        enabled: data.early_withdrawal_fee_enabled,
                        value: String(data.early_withdrawal_fee_rate),
                        unit: 'percentage'
                    },
                    autoPauseBoostThreshold: {
                        value: String(data.auto_pause_boost_threshold)
                    },
                    annualBoostCap: {
                        value: String(data.annual_boost_cap)
                    },
                    maxBoostPerUser: {
                        value: String(data.max_boost_per_user)
                    },
                    globalAutoReinvestment: data.global_auto_reinvestment
                });
                
                setError(null);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleToggleChange = (key: string, value: boolean | string) => {
        setSettings(prev => {
            if (key.includes('.')) {
                const [parent, child] = key.split('.');
                return {
                    ...prev,
                    [parent]: { ...(prev as any)[parent], [child]: value }
                };
            }
            return { ...prev, [key]: value };
        });
        
        setSuccessMessage(null);
        setError(null);
    };

    const handleSaveSettings = async () => {
        try {
            setSaving(true);
            
            await api.put('/settings', {
                early_withdrawal_fee_enabled: settings.earlyWithdrawalFee.enabled,
                early_withdrawal_fee_rate: settings.earlyWithdrawalFee.value,
                auto_pause_boost_threshold: settings.autoPauseBoostThreshold.value,
                annual_boost_cap: settings.annualBoostCap.value,
                max_boost_per_user: settings.maxBoostPerUser.value,
                global_auto_reinvestment: settings.globalAutoReinvestment
            });
            
            setSuccessMessage('Settings updated successfully');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl pb-10">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center p-8">
                    <div className="text-[#8C8C93]">Loading settings...</div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400">{successMessage}</p>
                </div>
            )}

            {/* Content - Only show when not loading */}
            {!loading && (
                <>
                    {/* Early Withdrawal Fee */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className="text-base font-medium text-[#A2A2A7]">Early Withdrawal Fee</h3>
                        <p className="text-[#8C8C93] text-sm">Applied when a user breaks a fixed-term savings plan early.</p>
                    </div>
                    <Toggle
                        checked={settings.earlyWithdrawalFee.enabled}
                        onChange={(checked) => handleToggleChange('earlyWithdrawalFee.enabled', checked)}
                    />
                </div>
                
                {settings.earlyWithdrawalFee.enabled && (
                    <div className="flex items-end gap-4 mt-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                value={settings.earlyWithdrawalFee.value}
                                onChange={(e) => handleToggleChange('earlyWithdrawalFee.value', e.target.value)}
                                variant="filled"
                                className="text-2xl font-medium"
                                placeholder="5"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <Select
                                value={settings.earlyWithdrawalFee.unit}
                                onChange={(value) => {
                                    const stringValue = Array.isArray(value) ? value[0] || '' : value || '';
                                    handleToggleChange('earlyWithdrawalFee.unit', stringValue);
                                }}
                                options={[
                                    { value: 'percentage', label: '%' },
                                    { value: 'fixed', label: '$' }
                                ]}
                                className="min-w-[80px]"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Auto-Pause Boost Threshold */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-base font-medium text-[#A2A2A7]">Auto-Pause Boost Threshold</h3>
                        <p className="text-[#8C8C93] text-sm">Pause granting new boosts when reserve falls below this amount.</p>
                    </div>
                    <div className="relative">
                        <Input
                            type="text"
                            value={settings.autoPauseBoostThreshold.value}
                            onChange={(e) => handleToggleChange('autoPauseBoostThreshold.value', e.target.value)}
                            variant="filled"
                            className="text-2xl font-medium"
                            placeholder="5"
                            leadingIcon={<span className="text-[#A2A2A7] text-base font-medium">₦</span>}
                        />
                    </div>
                </div>

                {/* Annual Boost Cap */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-base font-medium text-[#A2A2A7]">Annual Boost Cap</h3>
                        <p className="text-[#8C8C93] text-sm">Yearly maximum total boosts paid across the platform.</p>
                    </div>
                    <div className="relative">
                        <Input
                            type="text"
                            value={settings.annualBoostCap.value}
                            onChange={(e) => handleToggleChange('annualBoostCap.value', e.target.value)}
                            variant="filled"
                            className="text-2xl font-medium"
                            placeholder="5"
                            leadingIcon={<span className="text-[#A2A2A7] text-base font-medium">₦</span>}
                        />
                    </div>
                </div>
            </div>

            {/* Max Boost per User */}
            <div className="space-y-4 max-w-md">
                <div className="space-y-1">
                    <h3 className="text-base font-medium text-[#A2A2A7]">Max Boost per User</h3>
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        value={settings.maxBoostPerUser.value}
                        onChange={(e) => handleToggleChange('maxBoostPerUser.value', e.target.value)}
                        variant="filled"
                        className="text-2xl font-medium"
                        placeholder="5"
                        leadingIcon={<span className="text-[#A2A2A7] text-base font-medium">₦</span>}
                    />
                </div>
            </div>

            {/* Global Auto-Reinvestment */}
            <div className="space-y-4">
                <div className="flex items-start justify-between w-fit gap-4">
                    <div className="space-y-1">
                        <h3 className="text-base font-medium text-[#A2A2A7]">Global Auto-Reinvestment</h3>
                    </div>
                    <Toggle
                        checked={settings.globalAutoReinvestment}
                        onChange={(checked) => handleToggleChange('globalAutoReinvestment', checked)}
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="px-6 py-2 bg-[#00FFB3] text-black hover:bg-[#00FFB3]/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
                </>
            )}
        </div>
    );
};

export default SystemConfigurationsPage;

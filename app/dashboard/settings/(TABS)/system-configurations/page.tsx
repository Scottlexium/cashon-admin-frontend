"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';

const SystemConfigurationsPage = () => {
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

    const handleToggleChange = (key: string, value: boolean | string) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            if (key.includes('.')) {
                const [parentKey, childKey] = key.split('.');
                (newSettings as any)[parentKey] = {
                    ...(newSettings as any)[parentKey],
                    [childKey]: value
                };
            } else {
                (newSettings as any)[key] = value;
            }
            return newSettings;
        });
    };

    const handleSaveSettings = () => {
        console.log('Saving settings:', settings);
    };

    return (
        <div className="space-y-8 max-w-4xl pb-10">
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
        </div>
    );
};

export default SystemConfigurationsPage;

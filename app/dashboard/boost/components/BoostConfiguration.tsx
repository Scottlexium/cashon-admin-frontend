'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';

interface BoostConfigurationProps {
  onSave?: (data: any) => void;
  onClose?: () => void;
}

interface ConfigField {
  id: string;
  label: string;
  value: string;
}

export function BoostConfiguration({ onSave, onClose }: BoostConfigurationProps) {
  const [boostConfig, setBoostConfig] = useState<ConfigField[]>([
    { id: 'capLimit', label: 'Boost Cap Limit (₦)', value: '200,000' },
    { id: 'threshold', label: 'Liquidity Threshold (₦)', value: '200,000' },
  ]);

  const [rateConfig, setRateConfig] = useState<ConfigField[]>([
    { id: 'rate', label: 'Boost Rate (%)', value: '20' },
    { id: 'duration', label: 'Duration (Months)', value: '12' },
    { id: 'minDeposit', label: 'Minimum Deposit (₦)', value: '100,000' },
  ]);

  const handleFieldChange = (
    section: 'boost' | 'rate',
    fieldId: string,
    value: string
  ) => {
    const updateSection = section === 'boost' ? setBoostConfig : setRateConfig;
    const currentConfig = section === 'boost' ? boostConfig : rateConfig;

    updateSection(
      currentConfig.map(field =>
        field.id === fieldId ? { ...field, value } : field
      )
    );
  };

  const handleSave = () => {
    const allData = {
      boostConfiguration: boostConfig,
      rateConfiguration: rateConfig,
    };
    
    if (onSave) {
      onSave(allData);
    }
  };

  const renderSection = (
    title: string,
    fields: ConfigField[],
    section: 'boost' | 'rate'
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-white">{title}</h3>
        <Button
          variant="primary"
          size="sm"
          className="bg-[#3AF4BD] text-black font-medium hover:bg-[#3AF4BD]/90 px-3 py-1.5 rounded-md text-sm"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
      
      <div className="space-y-0">
        <div className="grid grid-cols-2 gap-6 pb-2 border-b border-gray-600">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            FIELD
          </span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            VALUE
          </span>
        </div>
        
        {fields.map((field) => (
          <div key={field.id} className="grid grid-cols-2 gap-6 items-center py-3">
            <span className="text-sm text-gray-300">{field.label}</span>
            <Input
              type="text"
              value={field.value}
              onChange={(e) => handleFieldChange(section, field.id, e.target.value)}
              className="bg-[#2A2A2A] border-gray-600 text-white text-sm h-8 rounded-md focus:ring-0 focus:border-gray-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-80 md:w-96 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-6 p-2">
        {renderSection('Boost Configuration', boostConfig, 'boost')}
        {renderSection('Boost Rate & Eligibility', rateConfig, 'rate')}
      </div>
    </div>
  );
}

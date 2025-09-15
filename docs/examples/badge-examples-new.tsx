import React from 'react';
import Badge, { VerifiedBadge, TierBadge, StatusBadge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Crown, Clock } from 'lucide-react';

// Example showing different badge variants
export const BadgeVariantsExample = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-white">Badge Variants</h2>
      
      {/* Ghost variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Ghost Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="ghost" color="success" icon={<CheckCircle />}>
            Success Ghost
          </Badge>
          <Badge variant="ghost" color="warning" icon={<AlertTriangle />}>
            Warning Ghost
          </Badge>
          <Badge variant="ghost" color="error">
            Error Ghost
          </Badge>
          <Badge variant="ghost" color="info">
            Info Ghost
          </Badge>
        </div>
      </div>

      {/* Filled variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Filled Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="filled" color="success" icon={<CheckCircle />}>
            Success Filled
          </Badge>
          <Badge variant="filled" color="warning" icon={<AlertTriangle />}>
            Warning Filled
          </Badge>
          <Badge variant="filled" color="error">
            Error Filled
          </Badge>
          <Badge variant="filled" color="info">
            Info Filled
          </Badge>
        </div>
      </div>

      {/* Outlined variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Outlined Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outlined" color="success" icon={<CheckCircle />}>
            Success Outlined
          </Badge>
          <Badge variant="outlined" color="warning" icon={<AlertTriangle />}>
            Warning Outlined
          </Badge>
          <Badge variant="outlined" color="error">
            Error Outlined
          </Badge>
          <Badge variant="outlined" color="info">
            Info Outlined
          </Badge>
        </div>
      </div>
    </div>
  );
};

// Example showing different sizes
export const BadgeSizesExample = () => {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-white">Badge Sizes</h2>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge size="sm" variant="filled" color="success">Small</Badge>
          <Badge size="md" variant="filled" color="success">Medium</Badge>
          <Badge size="lg" variant="filled" color="success">Large</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge size="sm" variant="outlined" color="warning" icon={<AlertTriangle />}>Small</Badge>
          <Badge size="md" variant="outlined" color="warning" icon={<AlertTriangle />}>Medium</Badge>
          <Badge size="lg" variant="outlined" color="warning" icon={<AlertTriangle />}>Large</Badge>
        </div>
      </div>
    </div>
  );
};

// Example showing pre-configured badge components
export const PreConfiguredBadgesExample = () => {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-white">Pre-configured Badges</h2>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Verified Badges</h3>
        <div className="flex gap-2 flex-wrap">
          <VerifiedBadge />
          <VerifiedBadge size="lg" />
          <VerifiedBadge variant="outlined" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Tier Badges</h3>
        <div className="flex gap-2 flex-wrap">
          <TierBadge tier={1} />
          <TierBadge tier={2} />
          <TierBadge tier={3} />
          <TierBadge tier={1} variant="outlined" />
          <TierBadge tier={2} size="lg" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Status Badges</h3>
        <div className="flex gap-2 flex-wrap">
          <StatusBadge status="verified" />
          <StatusBadge status="pending" />
          <StatusBadge status="approved" />
          <StatusBadge status="rejected" />
          <StatusBadge status="verified" variant="outlined" />
          <StatusBadge status="pending" size="lg" />
        </div>
      </div>
    </div>
  );
};

// Example showing custom styling
export const CustomBadgeExample = () => {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-white">Custom Styled Badges</h2>
      
      <div className="flex gap-2 flex-wrap">
        {/* Custom VIP badge */}
        <Badge 
          variant="filled" 
          color="warning"
          icon={<Crown />}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold"
        >
          VIP Member
        </Badge>

        {/* Custom Premium badge */}
        <Badge 
          variant="outlined" 
          color="success"
          className="border-2 border-[#3AF4BD] text-[#3AF4BD] font-semibold hover:bg-[#3AF4BD]/10"
        >
          Premium
        </Badge>

        {/* Custom Processing badge */}
        <Badge 
          variant="ghost" 
          color="info"
          icon={<Clock className="animate-spin" />}
          className="bg-blue-500/10 text-blue-400"
        >
          Processing...
        </Badge>
      </div>
    </div>
  );
};

// Example showing badges in DetailPageHeader context
export const DetailPageHeaderBadgeExample = () => {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-white">DetailPageHeader Badge Usage</h2>
      
      <div className="text-sm text-gray-300 space-y-2">
        <p>Here's how you can use different badges with DetailPageHeader:</p>
        
        <div className="bg-gray-800 p-4 rounded-lg font-mono text-xs">
          <div className="text-green-400">// Using pre-configured badges</div>
          <div>{'badge={<TierBadge tier={1} />}'}</div>
          <div>{'badge={<VerifiedBadge />}'}</div>
          <div>{'badge={<StatusBadge status="verified" />}'}</div>
          
          <div className="text-green-400 mt-2">// Using custom badge</div>
          <div>{'badge={<Badge variant="filled" color="success">Custom Text</Badge>}'}</div>
          
          <div className="text-green-400 mt-2">// Using multiple badges</div>
          <div>{'badge={<div className="flex gap-1"><TierBadge tier={2} /><VerifiedBadge size="sm" /></div>}'}</div>
        </div>
      </div>
    </div>
  );
};

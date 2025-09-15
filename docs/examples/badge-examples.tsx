// Example usage of the Badge component
import Badge, { VerifiedBadge, TierBadge, StatusBadge } from '@/components/ui/badge';
import { Shield, Star, CheckCircle } from 'lucide-react';

// Basic usage examples
export const BadgeExamples = () => {
  return (
    <div className="space-y-4 p-6">
      {/* Basic variants */}
      <div className="space-x-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="verified">Verified</Badge>
        <Badge variant="pending">Pending</Badge>
      </div>

      {/* Different sizes */}
      <div className="space-x-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>

      {/* With custom icons */}
      <div className="space-x-2">
        <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
          Verified Account
        </Badge>
        <Badge variant="warning" icon={<Shield className="w-3 h-3" />}>
          Security Alert
        </Badge>
        <Badge variant="info" icon={<Star className="w-3 h-3" />}>
          Premium
        </Badge>
      </div>

      {/* Pre-configured badges */}
      <div className="space-x-2">
        <VerifiedBadge>Verified</VerifiedBadge>
        <TierBadge tier={3} />
        <StatusBadge status="approved" />
        <StatusBadge status="pending" />
        <StatusBadge status="rejected" />
      </div>

      {/* Custom styling */}
      <div className="space-x-2">
        <Badge variant="success" className="font-bold">
          Custom Style
        </Badge>
        <Badge variant="verified" size="lg">
          Large Verified
        </Badge>
      </div>
    </div>
  );
};

// Usage in DetailPageHeader
export const DetailPageExample = () => {
  return (
    <DetailPageHeader
      breadcrumbText="Operations / Merchants"
      breadcrumbHref="/dashboard/compliance"
      name="John Doe"
      tier={2}
      badge={{
        text: "Verified",
        variant: "verified",
        icon: <Shield className="w-3 h-3" />
      }}
      fields={[
        // ... fields
      ]}
      rightContent={{
        label: "TOTAL BALANCE",
        value: "$25,000"
      }}
    />
  );
};

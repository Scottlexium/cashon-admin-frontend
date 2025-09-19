"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/button';
import Badge from '@/components/ui/badge';
import { User } from 'lucide-react';

interface DetailField {
  icon: React.ReactNode;
  label: string;
  value: string;
  key: string;
}

interface DetailPageHeaderProps {
  // Breadcrumb
  breadcrumbText: string;
  breadcrumbHref?: string;
  
  // Main user info
  name: string;
  avatar?: string; // Optional avatar URL
  badge?: React.ReactNode;
  
  // Detail fields (flexible array)
  fields: DetailField[];
  
  // Right side content
  rightContent?: {
    label: string;
    value: string;
    subtitle?: string;
  };
  
  // Optional customization
  className?: string;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({
  breadcrumbText,
  breadcrumbHref,
  name,
  avatar,
  badge,
  fields,
  rightContent,
  className = ""
}) => {
  const router = useRouter();

  const getInitials = (fullName: string) => {
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleBreadcrumbClick = () => {
    if (breadcrumbHref) {
      router.push(breadcrumbHref);
    } else {
      router.back();
    }
  };

  return (
    <div className={`${className}`}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-4 md:mb-6 border-b pb-4 md:pb-6 px-3 md:px-6 border-[#31313569]">
        <div className="flex items-center gap-2 text-sm text-[#8C8C93]">
          <User className="w-4 h-4" />
          <Button
            onClick={handleBreadcrumbClick}
            variant="ghost" 
            className="p-0 hover:text-[#3AF4BD] text-xs md:text-sm"
          >
            {breadcrumbText}
          </Button>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between p-3 md:p-6 gap-6 lg:gap-0 max-w-full lg:max-w-[90%]">
        {/* Left side - User info */}
        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 w-full lg:w-auto">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#3AF4BD] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-black font-bold text-base sm:text-lg lg:text-xl">
                {getInitials(name)}
              </span>
            )}
          </div>

          {/* User Details */}
          <div className="space-y-4 md:space-y-6 w-full sm:w-auto">
            {/* Name and Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h1 className="text-base sm:text-xl font-medium text-[#DEDEE3]">
                {name}
              </h1>
              
              {/* Badge */}
              {badge && (
                <div className="flex items-center">
                  {badge}
                </div>
              )}
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-3 md:space-y-4">
              {fields.map((field) => (
                <div key={field.key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-5 h-5 text-[#8C8C93] flex items-center justify-center flex-shrink-0">
                      {field.icon}
                    </div>
                    <span className="text-sm sm:text-lg text-[#8C8C9399] sm:min-w-[140px]">{field.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-[#8C8C93] font-semibold sm:ml-0 ml-6">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Dynamic Content */}
        {rightContent && (
          <div className="text-left lg:text-right mt-4 lg:mt-0 w-full lg:w-auto">
            <p className="text-xs sm:text-sm text-[#FFFFFF4D] font-semibold mb-2 tracking-wider">{rightContent.label}</p>
            <p className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-[#DEDEE3]">{rightContent.value}</p>
            {rightContent.subtitle && (
              <p className="text-xs sm:text-sm text-[#8C8C93] mt-1">{rightContent.subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPageHeader;

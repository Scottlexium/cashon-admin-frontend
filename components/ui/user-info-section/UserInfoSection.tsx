import React from 'react';

export interface InfoField {
  label: string;
  value: string | React.ReactNode;
}

export interface UserInfoSectionProps {
  title: string;
  dotColor?: 'orange' | 'purple' | 'blue' | 'green' | 'red';
  fields: InfoField[];
  columns?: 1 | 2;
  className?: string;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({
  title,
  dotColor = 'orange',
  fields,
  columns = 2,
  className = ''
}) => {
  const dotColorClasses = {
    orange: 'bg-orange-400',
    purple: 'bg-purple-400',
    blue: 'bg-blue-400',
    green: 'bg-green-400',
    red: 'bg-red-400'
  };

  // Split fields into columns
  const fieldsPerColumn = Math.ceil(fields.length / columns);
  const leftColumnFields = fields.slice(0, fieldsPerColumn);
  const rightColumnFields = columns === 2 ? fields.slice(fieldsPerColumn) : [];

  const renderFields = (fieldsList: InfoField[]) => (
    <div className="space-y-6">
      {fieldsList.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {field.label}
          </label>
          <div className="text-white">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 ${dotColorClasses[dotColor]} rounded-full`}></div>
        <h2 className="text-lg font-medium text-white">{title}</h2>
      </div>
      
      {/* Fields Grid */}
      {columns === 1 ? (
        renderFields(fields)
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {renderFields(leftColumnFields)}
          {rightColumnFields.length > 0 && renderFields(rightColumnFields)}
        </div>
      )}
    </div>
  );
};

export default UserInfoSection;

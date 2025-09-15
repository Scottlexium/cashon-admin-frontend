import React from 'react';
import { UserInfoSection } from '@/components/ui/user-info-section';

const ProfileContent = () => {
  return (
    <div className="px-3 md:px-6 grid grid-cols-1 lg:grid-cols-2 border-t-[1.5px] border-[#2B2B2E]">
      {/* User Information Section */}
      <div className='border-b-[1.5px] border-[#2B2B2E] py-6 lg:border-r-[1.5px]'>
        <UserInfoSection
          title="User Information"
          dotColor="orange"
          fields={[
            { label: 'First Name', value: 'Uche' },
            { label: 'Last Name', value: 'Martins' },
            { label: 'Date of Birth', value: '17/11/2006' },
            { label: 'Gender', value: 'Male' },
            { label: 'Relationship Status', value: 'Single' },
            { label: 'Religion', value: 'Christian' }
          ]}
        />

      </div>
      <div className='border-b-[1.5px] border-[#2B2B2E] lg:ml-6 py-6'>
        <UserInfoSection
          title="Address"
          dotColor="orange"
          fields={[
            { label: 'Street Address', value: '123 Main St' },
            { label: 'City', value: 'Anytown' },
            { label: 'State', value: 'CA' },
            { label: 'Zip Code', value: '12345' }
          ]}
        />
      </div>
      <div className='border-b-[1.5px] border-[#2B2B2E] lg:border-r-[1.5px] pt-6 pb-6'>
        <UserInfoSection
          title="Next of Kin"
          dotColor="orange"
          fields={[
            { label: 'Name', value: 'Jane Doe' },
            { label: 'Relationship', value: 'Sister' },
            { label: 'Phone Number', value: '+1 234 567 8901' },
            { label: 'Email', value: 'jane.doe@example.com' }
          ]}
        />

      </div>
      <div className='border-b-[1.5px] border-[#2B2B2E] lg:ml-6 pt-6'>
        <UserInfoSection
          title="State of Origin"
          dotColor="orange"
          fields={[
            { label: 'State of Origin', value: 'Nigeria' },
            { label: 'Local Government Area', value: 'Esa-Oke' },
            { label: 'Nationality', value: 'Nigerian' }
          ]}
        />
      </div>
      <div className='border-[#2B2B2E] lg:border-r-[1.5px] pt-6 pb-6'>
        <UserInfoSection
          title="Education"
          dotColor="orange"
          fields={[
            { label: 'Highest Level', value: 'Bachelor\'s Degree' },
            { label: 'Work Industry', value: 'Finance' },
            { label: 'Working Status', value: 'Full Time' },
            { label: 'Income Range', value: '$70,000 - $90,000' }
          ]}
        />
      </div>
      <div className='lg:ml-6 pt-6'>
        <UserInfoSection
          title="KYC Documents"
          dotColor="orange"
          columns={1}
          fields={[
            {
              label: 'Identification', value: <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3754 7.875V7.5C15.3754 4.67157 15.3754 3.25736 14.4968 2.37868C13.6181 1.5 12.2039 1.5 9.37541 1.5H8.62549C5.79711 1.5 4.38291 1.5 3.50423 2.37867C2.62556 3.25734 2.62554 4.67154 2.62552 7.49995L2.62549 10.875C2.62547 13.3405 2.62546 14.5734 3.3064 15.4031C3.43108 15.5551 3.57038 15.6943 3.7223 15.8191C4.55207 16.5 5.78486 16.5 8.25041 16.5" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.625 5.25H12.375" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.625 9H10.125" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.3735 15V12.75C15.3735 11.6779 14.3662 10.5 13.1235 10.5C11.8809 10.5 10.8735 11.6779 10.8735 12.75V15.375C10.8735 15.9963 11.3772 16.5 11.9985 16.5C12.6198 16.5 13.1235 15.9963 13.1235 15.375V12.75" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm sm:text-base">Passport.pdf</p>
              </div>
            },
            {
              label: 'Proof of Address', value:<div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3754 7.875V7.5C15.3754 4.67157 15.3754 3.25736 14.4968 2.37868C13.6181 1.5 12.2039 1.5 9.37541 1.5H8.62549C5.79711 1.5 4.38291 1.5 3.50423 2.37867C2.62556 3.25734 2.62554 4.67154 2.62552 7.49995L2.62549 10.875C2.62547 13.3405 2.62546 14.5734 3.3064 15.4031C3.43108 15.5551 3.57038 15.6943 3.7223 15.8191C4.55207 16.5 5.78486 16.5 8.25041 16.5" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.625 5.25H12.375" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.625 9H10.125" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.3735 15V12.75C15.3735 11.6779 14.3662 10.5 13.1235 10.5C11.8809 10.5 10.8735 11.6779 10.8735 12.75V15.375C10.8735 15.9963 11.3772 16.5 11.9985 16.5C12.6198 16.5 13.1235 15.9963 13.1235 15.375V12.75" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm sm:text-base">UtilityBill.pdf</p>
              </div>
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileContent;
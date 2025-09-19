import React from 'react';
import UserInfoSection from '@/components/ui/user-info-section/UserInfoSection';

const ComplianceContent = () => {
    // Identity Information fields
    const identityFields = [
        { label: 'BVN', value: '37492037489' },
        { label: 'NIN', value: '2738493022' },
        { label: 'Date of Birth', value: '17/11/2006' },
        { label: 'Gender', value: 'Male' }
    ];

    // Uploaded Documents
    const documentsFields = [
        {
            label: 'Utility Bill.pdf',
            value: (
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[#DEDEE3]">Utility Bill.pdf</span>
                </div>
            )
        },
        {
            label: 'Passport.pdf',
            value: (
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[#DEDEE3]">Passport.pdf</span>
                </div>
            )
        },
        {
            label: 'Utility Bill.pdf',
            value: (
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[#DEDEE3]">Utility Bill.pdf</span>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 max-w-4/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:divide-x lg:divide-[#313135BA]">
                {/* Identity Information */}
                <div className="lg:pr-8">
                    <UserInfoSection
                        title="Identity Information"
                        dotColor="#E8A14F"
                        fields={identityFields}
                        columns={2}
                    />
                </div>

                {/* Horizontal Divider for mobile */}
                <div className="lg:hidden border-t border-[#313135BA]"></div>

                {/* Uploaded Documents */}
                <div className="">
                    <UserInfoSection
                        title="Uploaded Documents"
                        dotColor="#3AF4BD"
                        columns={1}
                        fields={[
                            {
                                label: '', value: <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
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
                                label: '', value: <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
                                    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.3754 7.875V7.5C15.3754 4.67157 15.3754 3.25736 14.4968 2.37868C13.6181 1.5 12.2039 1.5 9.37541 1.5H8.62549C5.79711 1.5 4.38291 1.5 3.50423 2.37867C2.62556 3.25734 2.62554 4.67154 2.62552 7.49995L2.62549 10.875C2.62547 13.3405 2.62546 14.5734 3.3064 15.4031C3.43108 15.5551 3.57038 15.6943 3.7223 15.8191C4.55207 16.5 5.78486 16.5 8.25041 16.5" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.625 5.25H12.375" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.625 9H10.125" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.3735 15V12.75C15.3735 11.6779 14.3662 10.5 13.1235 10.5C11.8809 10.5 10.8735 11.6779 10.8735 12.75V15.375C10.8735 15.9963 11.3772 16.5 11.9985 16.5C12.6198 16.5 13.1235 15.9963 13.1235 15.375V12.75" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-sm sm:text-base">UtilityBill.pdf</p>
                                </div>
                            },
                            {
                                label: '', value: <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
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
        </div>
    );
};

export default ComplianceContent
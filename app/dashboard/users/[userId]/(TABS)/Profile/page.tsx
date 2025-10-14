"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UserInfoSection } from '@/components/ui/user-info-section';
import api from '@/lib/api';

interface UserProfile {
  id: number;
  user_id: number;
  state_of_origin: string;
  lga: string | null;
  religion: string;
  relationship_status: string;
  created_at: string;
  updated_at: string;
}

interface UserAddress {
  id: number;
  user_id: number;
  street_address: string;
  state_of_residence: string;
  city: string;
  created_at: string;
  updated_at: string;
}

interface UserEducation {
  id: number;
  user_id: number;
  education_level: string;
  employment_status: string;
  income_range: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

interface UserData {
  id: number;
  phone: string;
  email: string;
  profile_picture: string | null;
  first_name: string;
  last_name: string;
  dob: string;
  verification_type: string | null;
  verification_number: string | null;
  verification_status: string | null;
  document_type: string | null;
  document_path: string | null;
  scan_path: string | null;
  login_alert_email: boolean;
  transaction_alert_email: boolean;
  transaction_alert_push: boolean;
  referral_code: string | null;
  phone_verified_at: string | null;
  email_verified_at: string | null;
  last_device_name: string | null;
  last_device_type: string | null;
  last_device_ip: string | null;
  last_device_verified_at: string | null;
  created_at: string;
  updated_at: string;
  referred_by: string | null;
  total_referrals: number;
  referral_earnings: string;
  referral_status: string;
  referral_code_generated_at: string | null;
  first_referral_at: string | null;
  profile: UserProfile | null;
  next_of_kin: any | null;
  address: UserAddress | null;
  education: UserEducation | null;
}

const ProfileContent = () => {
  const params = useParams();
  const userId = params.userId as string;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Call the API endpoint to get user details
        const response = await api.get<UserData>(`/user/${userId}`);
        
        // Handle the response format: { status: true, data: {...} }
        if (response.data && response.status && response.data) {
          setUserData(response.data);
          console.log('Profile - Fetched user data from API:', response.data);
        } else if (response.data) {
          // Fallback if the response format is different
          setUserData(response.data);
          console.log('Profile - Fetched user data (fallback format):', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user profile');
        
        // Fallback to sessionStorage if API fails
        if (typeof window !== 'undefined') {
          const storedUserData = sessionStorage.getItem('selectedUserData');
          if (storedUserData) {
            try {
              const parsedData = JSON.parse(storedUserData);
              setUserData(parsedData);
              console.log('Profile - Using fallback data from sessionStorage:', parsedData);
              setError(null);
            } catch (parseError) {
              console.error('Error parsing stored user data:', parseError);
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Helper functions to format data
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatText = (text: string | null | undefined) => {
    if (!text) return 'N/A';
    return text.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatIncomeRange = (range: string) => {
    const incomeRanges = {
      '0-50000': '₦0 - ₦50,000',
      '50001-100000': '₦50,001 - ₦100,000',
      '100001-200000': '₦100,001 - ₦200,000',
      '200001-500000': '₦200,001 - ₦500,000',
      '500001-above': '₦500,001 and above'
    };
    return incomeRanges[range as keyof typeof incomeRanges] || formatText(range);
  };

  if (loading) {
    return (
      <div className="px-3 md:px-6 py-6 text-center text-[#8C8C93]">
        Loading user profile...
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="px-3 md:px-6 py-6 text-center text-[#FF6B6B]">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="px-3 md:px-6 py-6 text-center text-[#8C8C93]">
        No user data available
      </div>
    );
  }
  return (
    <div className="px-3 md:px-6 grid grid-cols-1 lg:grid-cols-2 border-t-[1.5px] border-[#2B2B2E]">
      {/* User Information Section */}
      <div className='border-b-[1.5px] border-[#2B2B2E] py-6 lg:border-r-[1.5px]'>
        <UserInfoSection
          title="User Information"
          dotColor="orange"
          fields={[
            { label: 'First Name', value: userData.first_name || 'N/A' },
            { label: 'Last Name', value: userData.last_name || 'N/A' },
            { label: 'Date of Birth', value: formatDate(userData.dob) },
            { label: 'Phone Number', value: userData.phone || 'N/A' },
            { label: 'Email', value: userData.email || 'N/A' },
            { label: 'Relationship Status', value: formatText(userData.profile?.relationship_status) },
            { label: 'Religion', value: formatText(userData.profile?.religion) }
          ]}
        />
      </div>

      {/* Address Section */}
      <div className='border-b-[1.5px] border-[#2B2B2E] lg:ml-6 py-6'>
        <UserInfoSection
          title="Address"
          dotColor="orange"
          fields={[
            { label: 'Street Address', value: userData.address?.street_address || 'N/A' },
            { label: 'City', value: formatText(userData.address?.city) },
            { label: 'State', value: formatText(userData.address?.state_of_residence) },
            { label: 'State of Origin', value: formatText(userData.profile?.state_of_origin) }
          ]}
        />
      </div>

      {/* Next of Kin Section */}
      <div className='border-b-[1.5px] border-[#2B2B2E] lg:border-r-[1.5px] pt-6 pb-6'>
        <UserInfoSection
          title="Next of Kin"
          dotColor="orange"
          fields={[
            { label: 'Name', value: userData.next_of_kin?.name || 'Not provided' },
            { label: 'Relationship', value: userData.next_of_kin?.relationship || 'Not provided' },
            { label: 'Phone Number', value: userData.next_of_kin?.phone || 'Not provided' },
            { label: 'Email', value: userData.next_of_kin?.email || 'Not provided' }
          ]}
        />
      </div>

      {/* Verification Information */}
      <div className='border-b-[1.5px] border-[#2B2B2E] lg:ml-6 pt-6'>
        <UserInfoSection
          title="Verification Details"
          dotColor="orange"
          fields={[
            { label: 'Verification Type', value: formatText(userData.document_type) },
            { label: 'Verification Number', value: userData.verification_number || 'N/A' },
            { label: 'Verification Status', value: formatText(userData.verification_status) },
            { label: 'Local Government Area', value: formatText(userData.profile?.lga) || 'Not provided' }
          ]}
        />
      </div>

      {/* Education & Employment */}
      <div className='border-[#2B2B2E] lg:border-r-[1.5px] pt-6 pb-6'>
        <UserInfoSection
          title="Education & Employment"
          dotColor="orange"
          fields={[
            { label: 'Highest Level', value: formatText(userData.education?.education_level) },
            { label: 'Work Industry', value: formatText(userData.education?.industry) },
            { label: 'Working Status', value: formatText(userData.education?.employment_status) },
            { label: 'Income Range', value: userData.education?.income_range ? formatIncomeRange(userData.education.income_range) : 'N/A' }
          ]}
        />
      </div>

      {/* KYC Documents */}
      <div className='lg:ml-6 pt-6'>
        <UserInfoSection
          title="KYC Documents"
          dotColor="orange"
          columns={1}
          fields={[
            {
              label: 'Identification', 
              value: userData.document_path ? (
                <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
                  <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3754 7.875V7.5C15.3754 4.67157 15.3754 3.25736 14.4968 2.37868C13.6181 1.5 12.2039 1.5 9.37541 1.5H8.62549C5.79711 1.5 4.38291 1.5 3.50423 2.37867C2.62556 3.25734 2.62554 4.67154 2.62552 7.49995L2.62549 10.875C2.62547 13.3405 2.62546 14.5734 3.3064 15.4031C3.43108 15.5551 3.57038 15.6943 3.7223 15.8191C4.55207 16.5 5.78486 16.5 8.25041 16.5" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.625 5.25H12.375" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.625 9H10.125" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.3735 15V12.75C15.3735 11.6779 14.3662 10.5 13.1235 10.5C11.8809 10.5 10.8735 11.6779 10.8735 12.75V15.375C10.8735 15.9963 11.3772 16.5 11.9985 16.5C12.6198 16.5 13.1235 15.9963 13.1235 15.375V12.75" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm sm:text-base">{formatText(userData.document_type)}_Document.jpg</p>
                </div>
              ) : (
                <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#8C8C93] p-3 sm:p-4 rounded-lg'>
                  <p className="text-sm sm:text-base">No identification document uploaded</p>
                </div>
              )
            },
            {
              label: 'Profile Picture', 
              value: userData.profile_picture ? (
                <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#DEDEE3C7] p-3 sm:p-4 rounded-lg'>
                  <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3754 7.875V7.5C15.3754 4.67157 15.3754 3.25736 14.4968 2.37868C13.6181 1.5 12.2039 1.5 9.37541 1.5H8.62549C5.79711 1.5 4.38291 1.5 3.50423 2.37867C2.62556 3.25734 2.62554 4.67154 2.62552 7.49995L2.62549 10.875C2.62547 13.3405 2.62546 14.5734 3.3064 15.4031C3.43108 15.5551 3.57038 15.6943 3.7223 15.8191C4.55207 16.5 5.78486 16.5 8.25041 16.5" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.625 5.25H12.375" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.625 9H10.125" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.3735 15V12.75C15.3735 11.6779 14.3662 10.5 13.1235 10.5C11.8809 10.5 10.8735 11.6779 10.8735 12.75V15.375C10.8735 15.9963 11.3772 16.5 11.9985 16.5C12.6198 16.5 13.1235 15.9963 13.1235 15.375V12.75" stroke="#A2A2A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm sm:text-base">ProfileImage.jpg</p>
                </div>
              ) : (
                <div className='bg-[#212123] flex flex-col sm:flex-row gap-3 sm:gap-4 text-[#8C8C93] p-3 sm:p-4 rounded-lg'>
                  <p className="text-sm sm:text-base">No profile picture uploaded</p>
                </div>
              )
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileContent;
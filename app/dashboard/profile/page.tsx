'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { usePermissions } from '@/lib/contexts/PermissionContext';
import { formatDateTime } from '@/lib/utils';
import Badge from '@/components/ui/badge';

export default function ProfilePage() {
  const { user: authUser } = useAuthStore();
  const { user: permissionUser } = usePermissions();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state during hydration or when data is not available
  if (!isClient || !authUser || !permissionUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FFB3]"></div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString || !isClient) return 'N/A';
    try {
      return formatDateTime(dateString);
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="border-b border-[#2A2A2D] pb-4">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-[#A2A2A7] mt-1">View your account information, role, and permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#A2A2A7] block mb-1">Full Name</label>
              <p className="text-white font-medium">{authUser.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A2A2A7] block mb-1">Username</label>
              <p className="text-white font-medium">{authUser.username}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A2A2A7] block mb-1">Email Address</label>
              <p className="text-white font-medium">{authUser.email}</p>
            </div>
            
            {authUser.phone && (
              <div>
                <label className="text-sm font-medium text-[#A2A2A7] block mb-1">Phone Number</label>
                <p className="text-white font-medium">{authUser.phone}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-[#A2A2A7] block mb-1">Last Login</label>
              <p className="text-white font-medium">{formatDate(authUser.login_time)}</p>
            </div>
          </div>
        </div>

        {/* Account Status & Role */}
        <div className="bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#A2A2A7] block mb-2">Status</label>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                authUser.status?.toLowerCase() === 'active' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : authUser.status?.toLowerCase() === 'inactive'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
              }`}>
                {authUser.status || 'Unknown'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A2A2A7] block mb-2">Role</label>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                authUser.role?.toLowerCase() === 'super_admin'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  : authUser.role?.toLowerCase() === 'admin'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
              }`}>
                {authUser.role?.replace('_', ' ') || 'Unknown'}
              </div>
            </div>
            
            {authUser.has_temp_password && (
              <div>
                <label className="text-sm font-medium text-[#A2A2A7] block mb-2">Password Status</label>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  Temporary Password
                </div>
                <p className="text-xs text-[#A2A2A7] mt-1">Please change your password</p>
              </div>
            )}
            
            {authUser.departments && authUser.departments.length > 0 && (
              <div>
                <label className="text-sm font-medium text-[#A2A2A7] block mb-2">Departments</label>
                <div className="flex flex-wrap gap-2">
                  {authUser.departments.map((dept, index) => (
                    <div 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500/10 text-gray-300 border border-gray-500/20"
                    >
                      {typeof dept === 'string' ? dept : dept.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Permissions</h3>
        {permissionUser.permissions && permissionUser.permissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {permissionUser.permissions.map((permission, index) => (
              <div
                key={index}
                className="bg-[#00FFB3]/5 border border-[#00FFB3]/20 rounded-lg p-3 text-center"
              >
                <p className="text-[#00FFB3] text-sm font-medium">
                  {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-[#A2A2A7] mb-2">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#A2A2A7] text-sm">No permissions assigned</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ComplianceDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;

    useEffect(() => {
        // Redirect to profile tab by default
        router.replace(`/dashboard/compliance/${userId}/profile`);
    }, [userId, router]);

    // Show loading or nothing while redirecting
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Loading...</div>
        </div>
    );
};

export default ComplianceDetailsPage;

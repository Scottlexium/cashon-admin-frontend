"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const router = useRouter();

    useEffect(() => {
        // This page should not be directly accessible since we're using content-based tabs
        // Redirect back to dashboard or handle differently based on your needs
        router.replace('/dashboard');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-[#8C8C93]">Loading...</div>
        </div>
    );
};

export default SettingsPage;

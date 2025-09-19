"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GrowthPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to segmentations tab by default
        router.replace('/dashboard/growth/segmentations');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-[#8C8C93]">Loading...</div>
        </div>
    );
};

export default GrowthPage;
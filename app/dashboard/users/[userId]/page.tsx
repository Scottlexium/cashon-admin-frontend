"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;

    useEffect(() => {
        // Redirect to profile tab by default
        router.replace(`/dashboard/users/${userId}/profile`);
    }, [userId, router]);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Loading...</div>
        </div>
    );
};

export default Page;

"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { unauthorized, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function page() {
    const session = useSession();
    const router = useRouter();

    if (session.status === "unauthenticated") {
        unauthorized();
    }

    if (session.status === "authenticated") {
        console.log(session)

        if (session.data.user.role === "needer") {
            router.push('/dashboard/needer');
        } else if (session.data.user.role === "helper") {
            router.push('/dashboard/helper');
        } else if (session.data.user.role === "admin") {
            router.push('/dashboard/admin');
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <LoadingSpinner />
        </div>
    )
}

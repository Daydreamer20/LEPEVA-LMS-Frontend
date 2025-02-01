'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function ClientRedirect() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading) {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, isLoading, router, mounted]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-base-100">
        <div className="mb-8 text-2xl font-bold text-primary">LEPEVA LMS</div>
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <div className="mt-8 text-sm text-base-content/70">Loading...</div>
      </div>
    );
  }

  return null;
} 
} 
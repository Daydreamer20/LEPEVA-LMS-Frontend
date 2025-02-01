'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import BaseLayout from '@/components/layout/BaseLayout';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      if (!isLoading) {
        if (isAuthenticated) {
          router.push('/dashboard');
        } else {
          router.push('/auth/login');
        }
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <BaseLayout requireAuth={false}>
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    </BaseLayout>
  );
}

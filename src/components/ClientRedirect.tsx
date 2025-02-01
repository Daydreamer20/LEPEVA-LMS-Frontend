'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function ClientRedirect() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Redirect after a short delay to ensure proper hydration
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  return null;
}
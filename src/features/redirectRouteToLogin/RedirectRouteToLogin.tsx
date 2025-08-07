'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';

export default function ClientRedirectToLogin() {
  const router = useRouter();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, []);

  return null; // 아무 것도 렌더링하지 않음
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';

export default function ClientRedirect() {
  const router = useRouter();
  const userType = useAuthStore(state => state.userInfo?.type);
  const isLoggedin = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    if (userType === 'user') {
      router.replace('/mypage');
    }

    if (!isLoggedin) {
      router.replace('/login');
    }
  }, []);

  return null; // 아무 것도 렌더링하지 않음
}

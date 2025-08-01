'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';

export default function ClientRedirect() {
  const router = useRouter();
  const userType = useAuthStore(state => state.userInfo?.type);

  useEffect(() => {
    if (userType === 'user') {
      router.replace('/mypage');
    }
  }, []);

  return null; // 아무 것도 렌더링하지 않음
}

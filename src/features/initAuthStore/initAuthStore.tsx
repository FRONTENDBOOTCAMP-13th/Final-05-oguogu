'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/shared/store/authStore';
import { usePathname } from 'next/navigation';

export default function InitAuthStore() {
  const setToken = useAuthStore(state => state.setToken);
  const setUserInfo = useAuthStore(state => state.setUserInfo);
  const logout = useAuthStore(state => state.logout);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const pathname = usePathname();

  useEffect(() => {
    const local = localStorage.getItem('auth-storage');
    const session = sessionStorage.getItem('user-storage');

    try {
      if (local) {
        const parsed = JSON.parse(local);
        const state = parsed?.state;
        const expireAt = parsed?.expireAt;

        if (state?.token && state?.userInfo && state.token !== 'null') {
          const currentTimeOnCheck = new Date().getTime();

          if (expireAt && currentTimeOnCheck > expireAt) {
            logout();

            return;
          }

          // 현재 로그인 상태가 아니고 스토리지에는 유효한 정보가 있을 때만 상태를 설정
          if (!isLoggedIn) {
            setToken(state.token);
            setUserInfo(state.userInfo);
          }
          return;
        }
      }

      if (session) {
        const parsed = JSON.parse(session)?.state;
        if (parsed?.token && parsed?.userInfo && parsed.token !== 'null') {
          if (!isLoggedIn) {
            setToken(parsed.token);
            setUserInfo(parsed.userInfo);
          }
        }
      }
    } catch (e) {
      console.error('InitAuthStore.tsx | 스토리지 복구 실패', e);
      logout();
    }
    // pathname이 변경될 때마다 useEffect가 재실행되도록
  }, [setToken, setUserInfo, logout, isLoggedIn, pathname]);

  return null;
}

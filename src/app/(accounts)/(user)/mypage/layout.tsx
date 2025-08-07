'use client';

import ScrollToTopOnRouteChange from '@/features/resetScrollStatus/ResetScrollStatus';
import ToggleOfficePageForSeller from '@/features/toggleOfficePageForSeller/ToggleOfficePageForSeller';
import dynamic from 'next/dynamic';
import React from 'react';

// INFO 클라이언트에서만 렌더링되게 SSR false
const ClientRedirect = dynamic(() => import('@/features/redirectRouteToLogin/RedirectRouteToLogin'), { ssr: false });

export default function MypageRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 로그인 상태 검증 후 위치를 강제로 이동 */}
      <ClientRedirect />

      {/* 스크롤을 최상단으로 강제 이동하는 코드 */}
      <ScrollToTopOnRouteChange />
      {children}
      <ToggleOfficePageForSeller />
    </>
  );
}

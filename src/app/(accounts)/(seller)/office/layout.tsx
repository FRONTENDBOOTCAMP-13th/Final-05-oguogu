'use client';

import ScrollToTopOnRouteChange from '@/features/resetScrollStatus/ResetScrollStatus';
import ToggleOfficePageForSeller from '@/features/toggleOfficePageForSeller/ToggleOfficePageForSeller';
import dynamic from 'next/dynamic';
import React from 'react';

// INFO 클라이언트에서만 렌더링되게 SSR false
const ClientRedirect = dynamic(() => import('@/features/redirectRouteToMypage/RedirectRouteToMypage'), { ssr: false });

export default function OfficeRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 로컬 스토리지에서 데이터를 추출하는 함수 */}
      <ClientRedirect />

      {/* 스크롤을 최상단으로 강제 이동하는 코드 */}
      <ScrollToTopOnRouteChange />
      {children}
      <ToggleOfficePageForSeller />
    </>
  );
}

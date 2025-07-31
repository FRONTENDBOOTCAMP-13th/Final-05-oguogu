import ScrollToTopOnRouteChange from '@/features/resetScrollStatus/ResetScrollStatus';
import React from 'react';

export default function MypageRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 스크롤을 최상단으로 강제 이동하는 코드 */}
      <ScrollToTopOnRouteChange />
      {children}
    </>
  );
}

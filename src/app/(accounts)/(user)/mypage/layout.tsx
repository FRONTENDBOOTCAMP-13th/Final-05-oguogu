import LinkHeader from '@/components/layouts/Header/LinkHeader';
import React from 'react';

export default function MypageRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LinkHeader />
      {children}
    </>
  );
}

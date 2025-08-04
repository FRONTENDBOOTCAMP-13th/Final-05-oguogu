import LinkHeader from '@/components/layouts/Header/LinkHeader';
import MyPageSectionDependsOnLoginStatus from '@/components/layouts/Login/MyPageSectionDependsOnLoginStatus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 | 오구오구',
  description: '주문 내역, 찜한 상품, 계정 정보를 확인할 수 있는 나의 공간입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/mypage',
  },
};

export default function UserMyPage() {
  return (
    <>
      <LinkHeader title="마이페이지" />
      <main className="pt-7 flex flex-col min-h-[calc(100vh-48px)]">
        <MyPageSectionDependsOnLoginStatus />
      </main>
    </>
  );
}

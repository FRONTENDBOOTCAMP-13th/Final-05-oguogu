import LinkHeader from '@/components/layouts/Header/LinkHeader';
import PickList from '@/features/pickList/pickList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜한 상품 | 오구텃밭',
  description: '내가 관심 있는 상품을 한눈에 확인하고 비교할 수 있는 찜 목록입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/mypage/pick',
  },
};

export default function UserPickList() {
  return (
    <>
      <LinkHeader title="찜한 상품" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <PickList />
      </main>
    </>
  );
}

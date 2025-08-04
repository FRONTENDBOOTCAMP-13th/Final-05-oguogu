import LinkHeader from '@/components/layouts/Header/LinkHeader';
import CartClientControl from '@/features/cartClientControl/cartClientControl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '장바구니 | 오구오구',
  description: '담아둔 상품을 확인하고, 한 번에 주문으로 이어질 수 있는 장바구니 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/mypage/cart',
  },
};

export default function UserCartList() {
  return (
    <>
      <LinkHeader title="장바구니" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <CartClientControl />
      </main>
    </>
  );
}

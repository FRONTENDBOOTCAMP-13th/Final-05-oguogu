import LinkHeader from '@/components/layouts/Header/LinkHeader';
import OrderClientControl from '@/features/orderClientControl/orderClientControl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문/배송 내역 | 오구오구',
  description: '내가 주문한 상품의 상태와 배송 현황을 확인할 수 있는 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/mypage/order',
  },
};

export default function UserOrderList() {
  return (
    <>
      <LinkHeader title="주문/배송 내역" />
      <OrderClientControl />
    </>
  );
}

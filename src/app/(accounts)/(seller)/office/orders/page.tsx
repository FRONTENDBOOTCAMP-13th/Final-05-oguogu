import LinkHeader from '@/components/layouts/Header/LinkHeader';
import OfficeOrderClientContorl from '@/features/officeOrderClientControl/officeOrderClientControl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문내역 | 판매자 센터 - 오구텃밭',
  description: '판매자가 확인할 수 있는 상품 주문 내역 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office/orders',
  },
};

export default function OrdersForSeller() {
  return (
    <>
      <LinkHeader title="주문 관리" />
      <OfficeOrderClientContorl />
    </>
  );
}

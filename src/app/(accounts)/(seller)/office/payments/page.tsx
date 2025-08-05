import AccountItem from '@/components/elements/AccoutItem/AccountItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '정산 | 판매자 센터 - 오구텃밭',
  description: '판매자의 상품 판매 수익 정산 내역을 확인할 수 있는 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office/payments',
  },
};

export default function PaymentsForSeller() {
  return (
    <>
      <LinkHeader title="정산" />
      <AccountItem />
    </>
  );
}

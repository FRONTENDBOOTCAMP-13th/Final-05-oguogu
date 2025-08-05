import LinkHeader from '@/components/layouts/Header/LinkHeader';
import SellerQnaPageClientControl from '@/features/sellerQnaPageClientControl/sellerQnaPageClientControl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상품 문의 내역 | 판매자 센터 - 오구텃밭',
  description: '구매자가 작성한 상품 문의에 대한 내역을 확인하고 응답할 수 있는 판매자 전용 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office/qnas',
  },
};

export default function QnasSeller() {
  return (
    <>
      <LinkHeader title="문의 내역" />

      <main className="p-4 flex flex-col gap-4  min-h-screen bg-oguogu-white">
        <SellerQnaPageClientControl />
      </main>
    </>
  );
}

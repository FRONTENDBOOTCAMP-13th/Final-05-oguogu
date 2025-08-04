import LinkHeader from '@/components/layouts/Header/LinkHeader';
import SellerProductClientControl from '@/features/sellerProductClientControl/sellerProductClientControl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상품 관리 | 판매자 센터 - 오구오구',
  description: '판매자가 등록한 상품을 수정하거나 삭제할 수 있는 상품 관리 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office/products',
  },
};

export default function ProductsForSeller() {
  return (
    <>
      <LinkHeader title="상품 관리" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <SellerProductClientControl />
      </main>
    </>
  );
}

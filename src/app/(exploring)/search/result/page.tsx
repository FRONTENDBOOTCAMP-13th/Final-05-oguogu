import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import ProductListFilteredKeyword from '@/features/productListFilteredKeyword/productListFilteredKeyword';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '상품 검색 결과 | 오구텃밭',
  description: '원하는 농산물, 체험, 텃밭 상품을 검색해보세요.',
  keywords: ['검색', '농산물', '체험', '텃밭', '상품 찾기', '오구텃밭'],
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/search',
  },
  openGraph: {
    title: '상품 검색 | 오구텃밭',
    description: '지금 바로 원하는 상품을 검색해보세요!',
    url: 'https://final-05-oguogu.vercel.app/search',
  },
  twitter: {
    card: 'summary',
    title: '상품 검색 | 오구텃밭',
    description: '원하는 농산물을 검색하고 빠르게 찾아보세요.',
  },
};

export default function SearchResult() {
  return (
    <>
      <Suspense fallback={<CuteLoading />}>
        {/* 헤더 */}
        <SearchHeader />

        {/* 정렬 기능 및 상품 목록 */}
        <ProductListFilteredKeyword />
      </Suspense>
    </>
  );
}

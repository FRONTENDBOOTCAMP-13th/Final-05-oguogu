import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import TopRatedItem from '@/components/elements/TopRatedItem/TopRatedItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import GetRecentSearchKeyword from '@/features/getRecentSearchKeyword/GetRecentSearchKeyword';
import { Suspense } from 'react';

export const metadata = {
  title: '상품 검색 | 오구오구',
  description: '원하는 농산물, 체험, 텃밭 상품을 검색해보세요.',
  keywords: ['검색', '농산물', '체험', '텃밭', '상품 찾기', '오구오구'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/search',
  },
  openGraph: {
    title: '상품 검색 | 오구오구',
    description: '지금 바로 원하는 상품을 검색해보세요!',
    url: 'https://final-05-oguogu.vercel.app/search',
  },
  twitter: {
    card: 'summary',
    title: '상품 검색 | 오구오구',
    description: '원하는 농산물을 검색하고 빠르게 찾아보세요.',
  },
};

export default function Search() {
  return (
    <>
      <Suspense fallback={<CuteLoading />}>
        <SearchHeader />

        {/* 최근 검색어 */}
        <GetRecentSearchKeyword />

        {/* 인기 텃밭 Top10 : URL 에 쿼리스트링이 있으면 숨김 */}
        <TopRatedItem />
      </Suspense>
    </>
  );
}

import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import TopRatedItem from '@/components/elements/TopRatedItem/TopRatedItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import GetRecentSearchKeyword from '@/features/getRecentSearchKeyword/GetRecentSearchKeyword';
import { Suspense } from 'react';

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

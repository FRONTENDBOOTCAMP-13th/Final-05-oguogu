import TopRatedItem from '@/components/elements/TopRatedItem/TopRatedItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import { Suspense } from 'react';

export default function Search() {
  return (
    <>
      <Suspense>
        <SearchHeader />

        {/* 인기 텃밭 Top10 : URL 에 쿼리스트링이 있으면 숨김 */}
        <TopRatedItem />
      </Suspense>
    </>
  );
}

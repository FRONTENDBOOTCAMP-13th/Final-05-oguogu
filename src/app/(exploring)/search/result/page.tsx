'use client';

import SearchHeader from '@/components/layouts/Header/SearchHeader';
import ProductListFilteredKeyword from '@/features/productListFilteredKeyword/productListFilteredKeyword';
import { useSearchKeywordStore } from '@/shared/store/keywordStore';

export default function SearchResult() {
  /* Zustand 에서 저장한 키워드 값을 가져오는 코드 */
  const getKeyword = useSearchKeywordStore(state => state.originKeyword);

  return (
    <>
      {/* 헤더 */}
      <SearchHeader />

      {/* 정렬바 */}
      {/* <ProductSortbar cnt={filtered.length} /> */}

      {/* 상품 목록 : Zustand 에 저장되어 있는 키워드를 params 로 전달 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        <ProductListFilteredKeyword keyword={getKeyword!} />
      </main>
    </>
  );
}

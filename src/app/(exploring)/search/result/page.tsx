import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import ProductListFilteredKeyword from '@/features/productListFilteredKeyword/productListFilteredKeyword';
import { Suspense } from 'react';

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

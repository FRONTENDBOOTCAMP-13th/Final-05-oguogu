import SearchHeader from '@/components/layouts/Header/SearchHeader';
import ProductListFilteredKeyword from '@/features/productListFilteredKeyword/productListFilteredKeyword';

export default function SearchResult() {
  return (
    <>
      {/* 헤더 */}
      <SearchHeader />

      {/* 정렬 기능 및 상품 목록 */}
      <ProductListFilteredKeyword />
    </>
  );
}

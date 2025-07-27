import SearchHeader from '@/components/layouts/Header/SearchHeader';
import ProductListFilteredKeyword from '@/features/productListFilteredKeyword/productListFilteredKeyword';

export default function SearchResult() {
  return (
    <>
      {/* 헤더 */}
      <SearchHeader />

      {/* 정렬바 */}
      {/* <ProductSortbar cnt={filtered.length} /> */}

      {/* 상품 목록 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        <ProductListFilteredKeyword />
      </main>
    </>
  );
}

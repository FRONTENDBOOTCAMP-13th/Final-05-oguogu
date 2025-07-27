import SearchHeader from '@/components/layouts/Header/SearchHeader';
import ProductListFilteredKeyword from '@/features/productListFilteredKeyword/productListFilteredKeyword';
import { getProducts } from '@/shared/data/functions/product';

export default async function SearchResult() {
  const res = await getProducts();

  return (
    <>
      {/* 헤더 */}
      <SearchHeader />

      {/* 정렬 기능 및 상품 목록 */}
      <ProductListFilteredKeyword data={res} />
    </>
  );
}

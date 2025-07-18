import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';

/**
 * 1차 카테고리 분류 항목으로 구성된 상품 탐색 목록 페이지
 * @description /product/[type]
 * @example /product/crop
 * @example /product/experience
 * @example /product/gardening
 */
export default function ProductListByType() {
  return (
    <>
      <CategoryHeader />
      <TextCategory />
      <ProductSortbar />
    </>
  );
}

import SearchHeader from '@/components/layouts/Header/SearchHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';

export default function SearchResult() {
  return (
    <>
      {/* 헤더 */}
      <SearchHeader />

      {/* 정렬 */}
      <ProductSortbar cnt={99} />

      {/* 농산물(crop) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]"></main>

      {/* 체험(experience) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]"></main>

      {/* 텃밭(gardening) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]"></main>
    </>
  );
}

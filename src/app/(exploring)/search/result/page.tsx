import SearchHeader from '@/components/layouts/Header/SearchHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';

export default function SearchResult() {
  return (
    <>
      <SearchHeader />
      <ProductSortbar />
      <main className="px-4">{/* 여기에 내용 작성 */}</main>
    </>
  );
}

import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';
import { getProducts } from '@/shared/data/functions/product';
import type { Item } from '@/shared/types/product';

export default async function SearchResult(/*{searchParams }: { searchParams: { keyword?: string }}*/) {
  // 쿼리 파라미터에서 keyword 추출 (null, 공백 처리)
  // const keyword = searchParams.keyword?.trim() ?? '';
  const keyword = '농장'; // 임시로 검색어 설정 (나중에 searchParams로 변경 예정)

  // 서버에서 전체 상품 목록 가져오기
  const res = await getProducts();
  const allItems = res.item;

  // 검색어 없으면 빈 배열, 있으면 필터링 후 상위 10개
  // const filtered = keyword === '' ? [] : allItems.filter((item: Item) => item.name.includes(keyword)).slice(0, 10);
  const filtered = allItems.filter((item: Item) => item.name.includes(keyword)).slice(0, 10);

  // 타입별로 분리
  const cropItems = filtered.filter((item: Item) => item.extra!.productType === 'crop');
  const experienceItems = filtered.filter((item: Item) => item.extra!.productType === 'experience');
  const gardenItems = filtered.filter((item: Item) => item.extra!.productType === 'gardening');

  return (
    <>
      {/* 헤더 */}
      <SearchHeader />

      {/* 정렬바 */}
      <ProductSortbar cnt={filtered.length} />

      {/* crop */}
      {cropItems.length > 0 && (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          {cropItems.map((item: Item) => (
            <CropItem
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price}
              rating={item.rating}
              bookmarks={item.bookmarks}
              extra={item.extra}
              seller={item.seller}
              replies={item.replies}
            />
          ))}
        </main>
      )}

      {/* experience */}
      {experienceItems.length > 0 && (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
          {experienceItems.map((item: Item) => (
            <ExperienceItem
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price}
              rating={item.rating}
              bookmarks={item.bookmarks}
              extra={item.extra}
              seller={item.seller}
              replies={item.replies}
            />
          ))}
        </main>
      )}

      {/* garden */}
      {gardenItems.length > 0 && (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          {gardenItems.map((item: Item) => (
            <GardenItem
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price}
              rating={item.rating}
              bookmarks={item.bookmarks}
              extra={item.extra}
              seller={item.seller}
              replies={item.replies}
              quantity={item.quantity}
              buyQuantity={item.buyQuantity}
            />
          ))}
        </main>
      )}

      {/* 검색 결과 없음 */}
      {filtered.length === 0 && <p className="mt-10 text-center text-gray-500">검색 결과가 없습니다.</p>}
    </>
  );
}

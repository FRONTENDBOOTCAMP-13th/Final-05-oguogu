'use client';

import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';
import { useSearchKeywordStore } from '@/shared/store/keywordStore';
import { Item } from '@/shared/types/product';

export default function ProductListFilteredKeyword({ data }: { data: Item }) {
  /* Zustand 에서 저장한 키워드 값을 가져오기 */
  const getKeyword = useSearchKeywordStore(state => state.originKeyword);

  /* Props 로 전달 받은 상품 전체 목록에서, 해당 키워드와 일치하는 name 을 가진 데이터를 추출 */
  const filteredItem = data.item.filter((item: Item) => item.name.includes(getKeyword ?? ''));

  /* 타입별로 분리 */
  const cropItems = filteredItem.filter((item: Item) => item.extra!.productType === 'crop');
  const experienceItems = filteredItem.filter((item: Item) => item.extra!.productType === 'experience');
  const gardenItems = filteredItem.filter((item: Item) => item.extra!.productType === 'gardening');

  return (
    <>
      {/* 정렬바 */}
      <ProductSortbar cnt={filteredItem.length} />

      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {/* {gardenItems.length > 0 && (
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
          )} */}

        {/* 검색 결과 없음 */}
        {/* {filtered.length === 0 && <p className="mt-10 text-center text-gray-500">검색 결과가 없습니다.</p>} */}
      </main>
    </>
  );
}

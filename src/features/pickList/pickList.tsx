'use client';

import FilterButtonForMypage from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { useEffect, useState } from 'react';
import { useBookmarkStore } from '@/shared/store/bookmarkStore';
import { getProducts } from '@/shared/data/functions/product';
import { productsRes, Item } from '@/shared/types/product';
import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';

export default function PickList() {
  const { bookmarkedIds, fetchBookmarks } = useBookmarkStore();
  const [allProducts, setAllProducts] = useState<Item[]>([]);
  const [checkedType, setCheckedType] = useState<ProductType>('crop');

  useEffect(() => {
    fetchBookmarks();
    const fetchAllProducts = async () => {
      const res: productsRes = await getProducts();
      if (res.ok) {
        setAllProducts(res.item);
      }
    };
    fetchAllProducts();
  }, [fetchBookmarks]);

  const filteredBookmarkedProducts = allProducts.filter(
    item => bookmarkedIds.includes(item._id) && item.extra!.productType === checkedType,
  );
  return (
    <>
      {/* 필터링 버튼 */}
      <div className="flex gap-1">
        <FilterButtonForMypage
          name="orderGroup"
          type="crop"
          title="농산물"
          isChecked={checkedType === 'crop'}
          onClick={() => setCheckedType('crop')}
        />
        <FilterButtonForMypage
          name="orderGroup"
          type="experience"
          title="체험"
          isChecked={checkedType === 'experience'}
          onClick={() => setCheckedType('experience')}
        />
        <FilterButtonForMypage
          name="orderGroup"
          type="gardening"
          title="텃밭"
          isChecked={checkedType === 'gardening'}
          onClick={() => setCheckedType('gardening')}
        />
      </div>

      {/* 주문 상세 내역 */}
      <div className="border-t border-t-oguogu-black pt-4 flex flex-col justify-start items-center gap-8">
        {filteredBookmarkedProducts.length === 0 ? (
          <IsEmptyMessage title="찜한 상품이 없습니다." subTxt="원하는 상품을 찜해보세요!" LinkTxt="쇼핑 계속하기 🥕" />
        ) : (
          // 데이터가 있는 경우 타입에 따라 아이템 목록 렌더링
          <>
            {checkedType === 'crop' && (
              <div className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
                {filteredBookmarkedProducts.map(item => (
                  <CropItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    price={item.price * (1 - item.extra!.dcRate / 100)}
                    rating={item.rating}
                    replies={item.replies}
                    extra={item.extra}
                    seller={item.seller}
                    bookmarks={item.bookmarks}
                  />
                ))}
              </div>
            )}
            {checkedType === 'experience' && (
              <div className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
                {filteredBookmarkedProducts.map(item => (
                  <ExperienceItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    price={item.price * (1 - item.extra!.dcRate / 100)}
                    seller={item.seller}
                    extra={item.extra}
                  />
                ))}
              </div>
            )}
            {checkedType === 'gardening' && (
              <div className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
                {filteredBookmarkedProducts.map(item => (
                  <GardenItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    price={item.price * (1 - item.extra!.dcRate / 100)}
                    seller={item.seller}
                    extra={item.extra}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

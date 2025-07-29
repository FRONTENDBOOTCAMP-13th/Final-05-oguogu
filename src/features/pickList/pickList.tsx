'use client';

import FilterButtonForMypage from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { useEffect, useState } from 'react';
import { useBookmarkStore } from '@/shared/store/bookmarkStore';
import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkItem, BookmarkResponse } from '@/shared/types/bookmarkt';
import { getBookmarks } from '@/shared/data/functions/bookmarks';

export default function PickList() {
  const { fetchBookmarks } = useBookmarkStore();
  const { token, userInfo } = useAuthStore();
  const [bookmarkItem, setBookmarkItem] = useState<BookmarkItem[] | null>(null);
  const [checkedType, setCheckedType] = useState<ProductType>('crop');

  useEffect(() => {
    fetchBookmarks();

    /* 전체 상품에서 현재 로그인된 아이디의 북마크 리스트 가져오기 */
    const getAllBookmarks = async () => {
      if (!token) return;

      try {
        const res: BookmarkResponse = await getBookmarks('product', token);
        const myBookmarks: BookmarkItem[] = res.item;
        console.log(myBookmarks);

        setBookmarkItem(myBookmarks);
        console.log(myBookmarks);
      } catch (err) {
        console.log('pickList 에서 에러 발생', err);
      }
    };

    getAllBookmarks();
  }, [fetchBookmarks, token, userInfo]);

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
        <>
          {checkedType === 'crop' &&
            (bookmarkItem?.filter(item => item.product.extra?.productType === checkedType).length !== 0 ? (
              <div className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
                {bookmarkItem
                  ?.filter((item: BookmarkItem) => item.product.extra?.productType === checkedType)
                  .map(item => (
                    <CropItem
                      key={item.product._id}
                      _id={item.product._id}
                      name={item.product.name}
                      price={item.product.price * (1 - item.product.extra!.dcRate / 100)}
                      rating={item.product.rating}
                      replies={item.product.replies}
                      extra={item.product!.extra}
                      seller={item.product!.seller}
                      bookmarks={item.product!.bookmarks}
                    />
                  ))}
              </div>
            ) : (
              <IsEmptyMessage
                title="찜한 상품이 없습니다."
                subTxt="원하는 상품을 찜해보세요!"
                LinkTxt="쇼핑 계속하기 🥕"
              />
            ))}
          {checkedType === 'experience' &&
            (bookmarkItem?.filter(item => item.product.extra?.productType === checkedType).length !== 0 ? (
              <div className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
                {bookmarkItem
                  ?.filter(item => item.product.extra?.productType === checkedType)
                  .map(item => (
                    <ExperienceItem
                      key={item.product._id}
                      _id={item.product._id}
                      name={item.product.name}
                      price={item.product.price * (1 - item.product.extra!.dcRate / 100)}
                      seller={item.product.seller}
                      extra={item.product.extra}
                    />
                  ))}
              </div>
            ) : (
              <IsEmptyMessage
                title="찜한 상품이 없습니다."
                subTxt="원하는 상품을 찜해보세요!"
                LinkTxt="쇼핑 계속하기 🥕"
              />
            ))}
          {checkedType === 'gardening' &&
            (bookmarkItem?.filter(item => item.product.extra?.productType === checkedType).length !== 0 ? (
              <div className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
                {bookmarkItem
                  ?.filter(item => item.product.extra?.productType === checkedType)
                  .map(item => (
                    <GardenItem
                      key={item.product._id}
                      _id={item.product._id}
                      name={item.product.name}
                      price={item.product.price * (1 - item.product.extra!.dcRate / 100)}
                      seller={item.product.seller}
                      extra={item.product.extra}
                    />
                  ))}
              </div>
            ) : (
              <IsEmptyMessage
                title="찜한 상품이 없습니다."
                subTxt="원하는 상품을 찜해보세요!"
                LinkTxt="쇼핑 계속하기 🥕"
              />
            ))}
        </>
      </div>
    </>
  );
}

'use client';

import FilterButtonForMypage from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import { useEffect, useState } from 'react';
import { useBookmarkStore } from '@/shared/store/bookmarkStore';
import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkItem, BookmarkResponse } from '@/shared/types/bookmarkt';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import PickListItem from '@/components/elements/PickListItem/PickListItem';

export default function PickList() {
  const { fetchBookmarks } = useBookmarkStore();
  const token = useAuthStore(state => state.token);
  const userInfo = useAuthStore(state => state.userInfo);
  const [bookmarkItem, setBookmarkItem] = useState<BookmarkItem[] | null>(null);
  const [checkedType, setCheckedType] = useState<ProductType>('crop');

  useEffect(() => {
    fetchBookmarks();

    /* 전체 상품에서 현재 로그인된 아이디의 북마크 리스트 가져오기 */
    const getAllBookmarks = async () => {
      if (token === null) return;

      try {
        const res: BookmarkResponse = await getBookmarks('product', token);
        const myBookmarks: BookmarkItem[] = res.item;

        setBookmarkItem(myBookmarks);
        console.log('현재 북마크 리스트 :', myBookmarks);
      } catch (err) {
        console.log('pickList 에서 에러 발생', err);
      }
    };

    getAllBookmarks();
  }, [fetchBookmarks, token, userInfo]);

  /* 찜하기 삭제 버튼 */
  const handleDeleteBookmark = (deletedId: number) => {
    setBookmarkItem(prev => (prev ? prev.filter(item => item._id !== deletedId) : prev));
  };

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
              <div className="flex flex-col w-full gap-5">
                {bookmarkItem
                  ?.filter((item: BookmarkItem) => item.product.extra?.productType === checkedType)
                  .map(item => (
                    <PickListItem key={item.product._id} item={item} token={token!} onDeleted={handleDeleteBookmark} />
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
              <div className="flex flex-col w-full gap-5">
                {bookmarkItem
                  ?.filter(item => item.product.extra?.productType === checkedType)
                  .map(item => (
                    <PickListItem key={item.product._id} item={item} token={token!} onDeleted={handleDeleteBookmark} />
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
              <div className="flex flex-col w-full gap-5">
                {bookmarkItem
                  ?.filter(item => item.product.extra?.productType === checkedType)
                  .map(item => (
                    <PickListItem key={item.product._id} item={item} token={token!} onDeleted={handleDeleteBookmark} />
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

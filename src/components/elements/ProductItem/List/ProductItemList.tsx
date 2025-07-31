'use client';

import CropItem, { CropItemSkeleton } from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem, { ExperienceItemSkeleton } from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem, { GardenItemSkeleton } from '@/components/elements/ProductItem/Item/GardenItem';
import { ProductItemListType } from '@/components/elements/ProductItem/List/ProductItem.type';
import { createBookmark, deleteBookmark } from '@/shared/data/actions/bookmarks';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import { getProducts } from '@/shared/data/functions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { useLoadingStore } from '@/shared/store/loadingStore';
import { BookmarkPostResponse, BookmarkResponse } from '@/shared/types/bookmarkt';
import { Item, productsRes } from '@/shared/types/product';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductItemList({ type }: ProductItemListType) {
  const [res, setRes] = useState<productsRes>();
  const [bookmarkedMap, setBookmarkedMap] = useState<Map<number, number>>(new Map()); //상품 id, 북마크 id 쌍

  /* Zustand 에서 스켈레톤 UI 작업을 위한 상태 가져오기 */
  const { isLoading, setLoading } = useLoadingStore();

  const isBookmarked = (_id: number) => bookmarkedMap.has(_id);

  /* Zustand 에서 토큰 정보 가져오기 */
  const token = useAuthStore(state => state.token);
  const toggleBookmark = async (_id: number) => {
    if (!token) {
      return;
    }

    const isBookmarked = bookmarkedMap.has(_id);
    const updateMap = new Map(bookmarkedMap);

    try {
      if (isBookmarked) {
        const bookmarkId = bookmarkedMap.get(_id);
        if (!bookmarkId) return;

        await deleteBookmark(bookmarkId, { target_id: 'any' }, token);
        updateMap.delete(_id);
      } else {
        const newBookmark: BookmarkPostResponse = await createBookmark({ target_id: _id }, token);

        if (newBookmark.ok) {
          updateMap.set(newBookmark.item.target_id, newBookmark.item._id);
        }
      }
      setBookmarkedMap(updateMap);
    } catch (error) {
      console.error('북마크 토글 실패', error);
      toast.error('북마크 처리에 실패했습니다.');
    }
  };

  // 북마크 목록 데이터를 초기에 불러오는 useEffect
  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchBookmark = async () => {
      try {
        const data: BookmarkResponse = await getBookmarks('product', token);

        if (data.ok) {
          const map = new Map<number, number>();

          data.item.forEach(item => {
            map.set(item.product._id, item._id);
            setBookmarkedMap(map);
          });
        }
      } catch (e) {
        console.error('북마크 가져오기 실패:', e);
      }
    };

    fetchBookmark();
  }, [token]);

  // 데이터를 초기에 불러오는 useEffect
  useEffect(() => {
    const fetch = async () => {
      /* 스켈레톤 UI on*/
      setLoading(true);
      try {
        const data: productsRes = await getProducts();

        if (data.ok) {
          setRes(data);
        }
      } catch (err) {
        console.log('ProductItemList 에러', err);
      } finally {
        /* 스켈레톤 UI off */
        setLoading(false);
      }
    };

    fetch();
  }, [setLoading, type]);

  const cropData = res?.item
    .filter((item: Item) => item.name.includes('옥수수'))
    .filter((item: Item) => item.extra?.productType === 'crop')
    .sort((a: Item, b: Item) => b.extra!.likeCount! - a.extra!.likeCount!);

  const expData = res?.item
    .filter((item: Item) => item.extra?.productType === 'experience')
    .sort((a: Item, b: Item) => b.extra!.likeCount! - a.extra!.likeCount!);

  const gardeningData = res?.item
    .filter((item: Item) => item.extra?.productType === 'gardening')
    .sort((a: Item, b: Item) => b.extra!.likeCount! - a.extra!.likeCount!);

  return (
    <>
      {type === 'crop' ? (
        isLoading ? (
          <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
            <CropItemSkeleton />
            <CropItemSkeleton />
            <CropItemSkeleton />
            <CropItemSkeleton />
            <CropItemSkeleton />
          </div>
        ) : (
          <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
            {cropData &&
              cropData
                .map((item: Item) => (
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
                    isbookmarked={isBookmarked(item._id)}
                    togglebookmark={() => toggleBookmark(item._id)}
                  />
                ))
                .slice(0, 10)}
          </div>
        )
      ) : type === 'experience' ? (
        isLoading ? (
          <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
            <ExperienceItemSkeleton />
            <ExperienceItemSkeleton />
            <ExperienceItemSkeleton />
            <ExperienceItemSkeleton />
            <ExperienceItemSkeleton />
          </div>
        ) : (
          <div className="flex gap-3  cursor-grab overflow-auto hide-scrollbar">
            {expData &&
              expData.map((item: Item) => (
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
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
                />
              ))}
          </div>
        )
      ) : type === 'gardening' ? (
        isLoading ? (
          <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
            <GardenItemSkeleton />
            <GardenItemSkeleton />
            <GardenItemSkeleton />
            <GardenItemSkeleton />
            <GardenItemSkeleton />
          </div>
        ) : (
          <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
            {gardeningData &&
              gardeningData.map((item: Item) => (
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
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
                />
              ))}
          </div>
        )
      ) : (
        ''
      )}
    </>
  );
}

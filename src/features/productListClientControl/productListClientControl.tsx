'use client';
import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';
import { productListCientControlType } from '@/features/productListClientControl/productListClientControl.type';
import { createBookmark, deleteBookmark } from '@/shared/data/actions/bookmarks';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkPostResponse, BookmarkResponse } from '@/shared/types/bookmarkt';
import { useEffect, useState } from 'react';

export default function ProductListClientControl({ productList, productCnt, type }: productListCientControlType) {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedMap, setBookmarkedMap] = useState<Map<number, number>>(new Map()); //상품 id, 북마크 id 쌍

  const isBookmarked = (_id: number) => bookmarkedMap.has(_id);

  const token = useAuthStore(state => state.token);

  const toggleBookmark = async (_id: number) => {
    if (!token) {
      setIsLoading(false);
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
      alert('북마크 처리에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchBookmark = async () => {
      try {
        const data: BookmarkResponse = await getBookmarks('product', token);

        if (data.ok) {
          const map = new Map<number, number>();

          // 더 안전한 방식으로 데이터 처리
          Object.entries(data).forEach(([key, value]) => {
            // 'ok' 키는 제외하고 처리
            if (key === 'ok') return;

            // value가 올바른 구조인지 체크
            if (
              value &&
              typeof value === 'object' &&
              'product' in value &&
              '_id' in value &&
              value.product &&
              typeof value.product === 'object' &&
              '_id' in value.product
            ) {
              const productId = value.product._id;
              const bookmarkId = value._id;

              // 숫자 타입인지 확인
              if (typeof productId === 'number' && typeof bookmarkId === 'number') {
                map.set(productId, bookmarkId);
              }
            }
          });

          setBookmarkedMap(map);
        }
      } catch (e) {
        console.error('북마크 가져오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmark();
  }, [token]);

  return (
    <>
      {isLoading ? (
        <CuteLoading />
      ) : (
        <>
          {/* 헤더 */}
          <CategoryHeader
            title={
              type === 'crop' ? '농산물' : type === 'experience' ? '체험' : type === 'gardening' ? '텃밭' : '오구텃밭'
            }
          />
          {/* 네비게이션 */}
          <TextCategory />
          {/* 정렬 */}
          <ProductSortbar cnt={productCnt} />
          {type === 'crop' && (
            <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
              {productList.map(item => (
                <CropItem
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  replies={item.replies}
                  extra={item.extra}
                  bookmarks={item.bookmarks}
                  seller={item.seller}
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
                />
              ))}
            </main>
          )}
          {type === 'experience' && (
            <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
              {productList.map(item => (
                <ExperienceItem
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  extra={item.extra}
                  seller={item.seller}
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
                  bookmarks={item.bookmarks}
                  rating={item.rating}
                  replies={item.replies}
                />
              ))}
            </main>
          )}
          {type === 'gardening' && (
            <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
              {productList.map(item => (
                <GardenItem
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
                  extra={item.extra}
                  seller={item.seller}
                  buyQuantity={item.buyQuantity}
                  quantity={item.quantity}
                />
              ))}
            </main>
          )}
        </>
      )}
    </>
  );
}

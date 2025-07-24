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
    if (!token) return;

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
    if (!token) return;

    const fetchBookmark = async () => {
      try {
        const data: BookmarkResponse = await getBookmarks('product', token);

        if (data.ok) {
          const map = new Map<number, number>();
          Object.values(data).forEach(entry => {
            if (typeof entry === 'object') {
              map.set(entry.product._id, entry._id);
            }
          });

          setBookmarkedMap(map);
        }
      } catch (e) {
        console.error('북마크 가져오기 실패:', e);
      } finally {
        setIsLoading(false); // ✅ 여기!
      }
    };

    fetchBookmark();
  }, [token]);

  console.log(bookmarkedMap);

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
                  price={item.price * (1 - item.extra!.dcRate / 100)}
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
                  price={item.price * (1 - item.extra!.dcRate / 100)}
                  extra={item.extra}
                  seller={item.seller}
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
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
                  price={item.price * (1 - item.extra!.dcRate / 100)}
                  isbookmarked={isBookmarked(item._id)}
                  togglebookmark={() => toggleBookmark(item._id)}
                  extra={item.extra}
                  seller={item.seller}
                />
              ))}
            </main>
          )}
        </>
      )}
    </>
  );
}

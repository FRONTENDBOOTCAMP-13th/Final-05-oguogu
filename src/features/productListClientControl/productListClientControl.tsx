'use client';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';
import { productListCientControlType } from '@/features/productListClientControl/productListClientControl.type';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkResponse } from '@/shared/types/bookmarkt';
import { useEffect, useState } from 'react';

export default function ProductListClientControl({ productList, productCnt, type }: productListCientControlType) {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  /* const isBookmarked = (_id: number) => bookmarked.includes(_id); */

  const token = useAuthStore(state => state.token);

  /* const toggleBookmark = (_id: number) => {
    setBookmarked(prev => prev.includes(_id) ? prev.filter(id => id!==_id) : [...prev, _id])
  };
 */
  useEffect(() => {
    if (!token) return;
    const fetchBookmark = async () => {
      const data: BookmarkResponse = await getBookmarks('product', token);

      if (data.ok) {
        const bookmarkArray = Object.values(data)
          .filter(item => typeof item === 'object')
          .map(item => item.product._id);

        setBookmarked(bookmarkArray);
      }
    };

    fetchBookmark();
  }, [token]);

  console.log(bookmarked);

  return (
    <>
      {/* 헤더 */}
      <CategoryHeader cartItemCount={100} />
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
              price={item.price * (1 - item.extra.dcRate / 100)}
              rating={item.rating}
              replies={item.replies}
              dcRate={item.extra.dcRate}
              bookmark={item.bookmarks}
              item={item}
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
              price={item.price * (1 - item.extra.dcRate / 100)}
              item={item}
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
              price={item.price * (1 - item.extra.dcRate / 100)}
              item={item}
            />
          ))}
        </main>
      )}
    </>
  );
}

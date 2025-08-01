'use client';

import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { productListCientControlType } from '@/features/productListClientControl/productListClientControl.type';
import { createBookmark, deleteBookmark } from '@/shared/data/actions/bookmarks';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkPostResponse, BookmarkResponse } from '@/shared/types/bookmarkt';
import { Item } from '@/shared/types/product';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductListClientControl({ productList, type }: productListCientControlType) {
  const [bookmarkedMap, setBookmarkedMap] = useState<Map<number, number>>(new Map()); // 상품 id, 북마크 id 쌍

  const isBookmarked = (_id: number) => bookmarkedMap.has(_id);

  const token = useAuthStore(state => state.token);
  const toggleBookmark = async (_id: number) => {
    if (token === null) {
      toast.error('로그인이 필요합니다.');
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
        toast.success('북마크가 제거되었습니다.');
      } else {
        const newBookmark: BookmarkPostResponse = await createBookmark({ target_id: _id }, token);

        if (newBookmark.ok) {
          updateMap.set(newBookmark.item.target_id, newBookmark.item._id);
          toast.success('북마크가 추가되었습니다.');
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
    if (token === null) {
      return;
    }

    const fetchBookmark = async () => {
      try {
        const data: BookmarkResponse = await getBookmarks('product', token);

        if (data.ok) {
          console.log('data', data);
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

  /* 필터링 기능 상태 관리 */
  const [selectedCategory, setSelectedCategory] = useState('veggie');

  /* URL 의 keyword QueryString 값을 가져와 상태로 저장  */
  // const router = useRouter();
  // const param = useSearchParams();
  // const categoryParam = param.get('category') ?? '';
  // useEffect(() => {
  //   if (categoryParam) setSelectedCategory(categoryParam);
  // }, [categoryParam]);

  /* 필터링 기능 */
  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);

    /* 라우팅 보류 */
    // const newSearchParams = new URLSearchParams(param.toString());
    // newSearchParams.set('category', e.target.value);

    // router.push(`?${newSearchParams.toString()}`);
  };

  const filteredCropData = (item: Item[]) => {
    switch (selectedCategory) {
      case 'veggie':
        return item.filter(item => item.extra?.category === 'veggie');
      case 'fruit':
        return item.filter(item => item.extra?.category === 'fruit');
      case 'grain':
        return item.filter(item => item.extra?.category === 'grain');
      case 'mushroom':
        return item.filter(item => item.extra?.category === 'mushroom');
      default:
        return item;
    }
  };

  /* 정렬 기능 상태 관리 */
  const [sort, setSort] = useState('popular');

  /* 정렬 기능 */
  const handleSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const sortItems = (item: Item[]) => {
    switch (sort) {
      /* 인기순 : buyQuantity(판매 수량) 기준 */
      case 'popular':
        return item.sort((a: Item, b: Item) => b.buyQuantity! - a.buyQuantity!);
      /* 할인 높은순 : price(가격) 기준 */
      case 'dcRate':
        return item.sort((a, b) => b.extra!.dcRate! - a.extra!.dcRate!);
      /* 리뷰 많은순 : replies(리뷰) 기준 */
      case 'review':
        return item.sort((a, b) => b.replies! - a.replies!);
      /* 별점순 : rating(별점) 기준 */
      case 'rating':
        return item.sort((a, b) => b.rating! - a.rating!);
      default:
        return item;
    }
  };

  return (
    <>
      {/* 헤더 */}
      <CategoryHeader
        title={type === 'crop' ? '농산물' : type === 'experience' ? '체험' : type === 'gardening' ? '텃밭' : '오구텃밭'}
      />

      {/* 네비게이션 */}
      <TextCategory />

      {/* 정렬 */}
      {/* INFO 정렬바 : 기존 SortBar 구조가 PropDrilling 때문에 복잡성이 높아져서, 별도 하드코딩된 SortBar 코드를 삽입했습니다! */}
      <div className="flex justify-between items-center h-[48px] p-4">
        <span>
          총&nbsp;
          {type === 'crop'
            ? selectedCategory === 'veggie'
              ? productList.filter((item: Item) => item.extra?.category === 'veggie').length
              : selectedCategory === 'fruit'
                ? productList.filter((item: Item) => item.extra?.category === 'fruit').length
                : selectedCategory === 'grain'
                  ? productList.filter((item: Item) => item.extra?.category === 'grain').length
                  : productList.filter((item: Item) => item.extra?.category === 'mushroom').length
            : type === 'experience'
              ? productList.filter((item: Item) => item.extra?.productType === 'experience').length
              : productList.filter((item: Item) => item.extra?.productType === 'gardening').length}
          개
        </span>
        <div className="flex gap-2">
          {type === 'crop' && (
            <>
              <label htmlFor="typeFiltering" className="sr-only">
                타입 필터링
              </label>
              <select
                id="typeFiltering"
                name="type"
                value={selectedCategory}
                onChange={handleSelectType}
                className="text-right pr-2"
              >
                <option value="veggie">채소</option>
                <option value="fruit">과일</option>
                <option value="grain">쌀/곡류</option>
                <option value="mushroom">버섯</option>
              </select>
            </>
          )}
          <label htmlFor="sorting" className="sr-only">
            정렬
          </label>
          <select id="sorting" name="sorting" value={sort} onChange={handleSelectSort} className="text-right pr-2">
            <option value="popular">인기순</option>
            <option value="dcRate">할인 높은순</option>
            <option value="review">리뷰 많은순</option>
            <option value="rating">별점순</option>
          </select>
        </div>
      </div>

      {/* 타입별 컴포넌트 렌더링 */}
      {type === 'crop' && (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] min-h-[calc(100vh-144px)]">
          {sortItems(filteredCropData(productList)).map((item: Item) => (
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
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] min-h-[calc(100vh-144px)]">
          {sortItems(productList).map(item => (
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
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] min-h-[calc(100vh-144px)]">
          {sortItems(productList).map(item => (
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
  );
}

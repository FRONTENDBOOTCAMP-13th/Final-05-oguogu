'use client';

import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { getProducts } from '@/shared/data/functions/product';
import { Item, productsRes } from '@/shared/types/product';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ProductListFilteredKeyword() {
  /* MongoDB 데이터 상태 관리 */
  const [data, setData] = useState<productsRes | null>(null);

  /* 정렬 기능 상태 관리 */
  const [sort, setSort] = useState('popular');

  /* 쿼리스트링 텍스트 상태 관리 */
  const [keyword, setKeyword] = useState('');

  /* 필터링 기능 상태 관리 */
  const [selectedType, setSelectedType] = useState('crop');

  /* URL 의 keyword QueryString 값을 가져와 상태로 저장  */
  const param = useSearchParams();
  const keywordParam = param.get('keyword') ?? '';

  useEffect(() => {
    if (keywordParam) setKeyword(keywordParam);
  }, [keywordParam]);

  /* 클라이언트 함수에서 useEffect 로 DB 를 마운트 시점 이후에 가져옴 */
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();
      setData(res);
    };
    fetchData();
  }, []);

  /* 데이터을 로딩 중인 경우, 대체 로딩창 렌더링 */
  if (data == null) {
    return <CuteLoading />;
  }

  /* 전체 DB 에서 해당 키워드가 상품명에 포함된 DB 를 필터링 */
  const searchDataFromKeyword = data.item.filter((item: Item) => item.name.includes(keyword ?? ''));

  /* 타입별 데이터 추출 */
  const cropDataFromKeyword = searchDataFromKeyword.filter((item: Item) => item.extra?.productType === 'crop');
  const experienceDataFromKeyword = searchDataFromKeyword.filter(
    (item: Item) => item.extra?.productType === 'experience',
  );
  const gardeningDataFromKeyword = searchDataFromKeyword.filter(
    (item: Item) => item.extra?.productType === 'gardening',
  );

  /* 매칭된 키워드의 데이터가 없을 때 */
  const emptyData = (
    <main className="pt-12 min-h-[calc(100vh-96px)]">
      <p className="text-center text-gray-500 text-xl">검색 결과가 없습니다.</p>
    </main>
  );

  /* 필터링 기능 */
  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

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
      {/* INFO 정렬바 : 기존 SortBar 구조가 PropDrilling 때문에 복잡성이 높아져서, 별도 하드코딩된 SortBar 코드를 삽입했습니다! */}
      <div className="flex justify-between items-center h-[48px] p-4">
        <span>
          총&nbsp;
          {selectedType === 'crop'
            ? cropDataFromKeyword.length
            : selectedType === 'experience'
              ? experienceDataFromKeyword.length
              : gardeningDataFromKeyword.length}
          개
        </span>
        <div className="flex gap-2">
          <label htmlFor="typeFiltering" className="sr-only">
            타입 필터링
          </label>
          <select
            id="typeFiltering"
            name="type"
            value={selectedType}
            onChange={handleSelectType}
            className="text-right pr-2"
          >
            <option value="crop">농산물</option>
            <option value="experience">체험</option>
            <option value="gardening">텃밭</option>
          </select>
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

      {/* DB 렌더링 */}
      {selectedType === 'crop' ? (
        cropDataFromKeyword.length > 0 ? (
          <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] min-h-[calc(100vh-96px)]">
            {sortItems(cropDataFromKeyword).map((item: Item) => (
              <CropItem
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                replies={item.replies}
                bookmarks={item.bookmarks}
                extra={item.extra}
                seller={item.seller}
              />
            ))}
          </main>
        ) : (
          emptyData
        )
      ) : selectedType === 'experience' ? (
        experienceDataFromKeyword.length > 0 ? (
          <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] min-h-[calc(100vh-96px)]">
            {sortItems(experienceDataFromKeyword).map((item: Item) => (
              <ExperienceItem
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                replies={item.replies}
                bookmarks={item.bookmarks}
                extra={item.extra}
                seller={item.seller}
              />
            ))}
          </main>
        ) : (
          emptyData
        )
      ) : selectedType === 'gardening' ? (
        gardeningDataFromKeyword.length > 0 ? (
          <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] min-h-[calc(100vh-96px)]">
            {sortItems(gardeningDataFromKeyword).map((item: Item) => (
              <GardenItem
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                replies={item.replies}
                bookmarks={item.bookmarks}
                quantity={item.quantity}
                buyQuantity={item.buyQuantity}
                extra={item.extra}
                seller={item.seller}
              />
            ))}
          </main>
        ) : (
          emptyData
        )
      ) : (
        ''
      )}
    </>
  );
}

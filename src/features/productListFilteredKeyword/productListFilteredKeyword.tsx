'use client';

import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { ProductSort } from '@/components/elements/ProductItem/Sort/Sort';
import { Item, productsRes } from '@/shared/types/product';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function ProductListFilteredKeyword({ data }: { data: productsRes }) {
  const searchData = data;
  /* 필터링 기능 구현을 위한 별도 상태 관리 */
  const [selectedType, setSelectedType] = useState('crop');

  /* URL 의 'keyword' 쿼리스트링 값을 추출 */
  const keywordParam = useSearchParams();
  const keyword = keywordParam.get('keyword');

  /* 전체 DB 에서 해당 키워드가 상품명에 포함된 DB 를 필터링 */
  const searchDataFromKeyword = searchData.item.filter((item: Item) => item.name.includes(keyword ?? ''));

  /* 타입별 데이터 추출 */
  const cropDataFromKeyword = searchDataFromKeyword.filter((item: Item) => item.extra?.productType === 'crop');
  const experienceDataFromKeyword = searchDataFromKeyword.filter(
    (item: Item) => item.extra?.productType === 'experience',
  );
  const gardeningDataFromKeyword = searchDataFromKeyword.filter(
    (item: Item) => item.extra?.productType === 'gardening',
  );

  /* 정렬 및 필터링 기능 */
  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  return (
    <>
      {/* 정렬바 */}
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
          <select id="typeFiltering" name="type" value={selectedType} onChange={handleSelectType}>
            <option value="crop">농산물</option>
            <option value="experience">체험</option>
            <option value="gardening">텃밭</option>
          </select>
          <ProductSort />
        </div>
      </div>

      {searchDataFromKeyword ?? (
        <main className="min-h-[calc(100vh-48px)]">
          <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
        </main>
      )}

      {selectedType === 'crop' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] min-h-[calc(100vh-96px)]">
          {cropDataFromKeyword.map((item: Item) => (
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
      ) : selectedType === 'experience' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] min-h-[calc(100vh-96px)]">
          {experienceDataFromKeyword.map((item: Item) => (
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
      ) : selectedType === 'gardening' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] min-h-[calc(100vh-96px)]">
          {gardeningDataFromKeyword.map((item: Item) => (
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
        ''
      )}
    </>
  );
}

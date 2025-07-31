'use client';

import SelectBox from '@/components/elements/SelectBox/SelectBox';
import { useState } from 'react';

export function ProductSort() {
  const [selectedSort, setSelectedSort] = useState('recommend');

  const sortOptions = [
    { value: 'recommend', label: '추천순' },
    { value: 'review', label: '리뷰순' },
    { value: 'popular', label: '인기순' },
    { value: 'deadline', label: '마감임박순' },
  ];

  return (
    <SelectBox
      label="정렬 기준"
      name="sort"
      id="sort"
      options={sortOptions}
      value={selectedSort}
      onChange={setSelectedSort}
      changeBoxSize={selectedSort === 'deadline' ? 'w-[92px]' : 'w-[62px]'}
    />
  );
}
export function ReviewSort() {
  const [selectedSort, setSelectedSort] = useState('recommend');

  const sortOptions = [
    { value: 'recent', label: '최신순' },
    { value: 'highRating', label: '높은 리뷰순' },
    { value: 'lowRating', label: '낮은 리뷰순' },
  ];

  return (
    <SelectBox
      label="정렬 기준"
      name="sort"
      id="sort"
      options={sortOptions}
      value={selectedSort}
      onChange={setSelectedSort}
      changeBoxSize={'w-[92px]'}
    />
  );
}

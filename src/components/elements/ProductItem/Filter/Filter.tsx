'use client';

import { FilterType } from '@/components/elements/ProductItem/Filter/Filter.type';
import SelectBox from '@/components/elements/SelectBox/SelectBox';
import { useState } from 'react';

export default function Filter({ filteredData }: FilterType) {
  const [selectedCategory, setSelectedCategory] = useState('default');

  const filteredByCrop = [
    { value: 'default', label: '카테고리' },
    { value: 'veggie', label: '채소' },
    { value: 'fruit', label: '과일' },
    { value: 'grain', label: '쌀 / 곡류' },
    { value: 'mushroom', label: '버섯' },
  ];

  const filteredByResult = [
    { value: 'crop', label: '농산물' },
    { value: 'experience', label: '체험' },
    { value: 'gardening', label: '텃밭' },
  ];

  return (
    <SelectBox
      label="카테고리"
      name="category"
      id="category"
      options={filteredData ? filteredByCrop : filteredByResult}
      value={selectedCategory}
      onChange={setSelectedCategory}
      changeBoxSize={selectedCategory === 'default' || selectedCategory === 'grain' ? 'w-[74px]' : 'w-[48px]'}
    />
  );
}

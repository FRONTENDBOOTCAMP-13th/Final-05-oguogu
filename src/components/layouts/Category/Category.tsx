'use client';

import { ImageCategoryItem, TextCategoryItem } from '@/components/elements/CategoryItem/CategoryItem';
import { usePathname } from 'next/navigation';

/**
 * 이미지형 카테고리 컴포넌트
 * @returns {HTMLElement}
 */
export function ImageCategory() {
  return (
    <section className="flex flex-col items-center pt-4 pb-2">
      <div className="flex gap-5">
        <ImageCategoryItem params="veggie" title="채소" />
        <ImageCategoryItem params="fruit" title="과일" />
        <ImageCategoryItem params="grain" title="쌀/곡류" />
        <ImageCategoryItem params="mushroom" title="버섯" />
      </div>
    </section>
  );
}

/**
 * 텍스트형 1차 카테고리 컴포넌트
 * @description 상품 타입(type)별 구분
 * @returns {HTMLElement}
 */
export function TextCategory() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center secondHeader">
      <TextCategoryItem
        type="product"
        params="crop"
        title="농산물"
        isClick={pathname.includes('/crop') ? true : false}
      />
      <TextCategoryItem
        type="product"
        params="experience"
        title="체험"
        isClick={pathname.includes('/experience') ? true : false}
      />
      <TextCategoryItem
        type="product"
        params="gardening"
        title="텃밭"
        isClick={pathname.includes('/gardening') ? true : false}
      />
    </nav>
  );
}

/**
 * 텍스트형 2차 카테고리 컴포넌트
 * @description 농산물 하위 카테고리(category)별 구분
 * @returns {HTMLElement}
 */
export function FilteredTextCategory() {
  return (
    <nav className="flex thirdHeader">
      <TextCategoryItem type="product" params="crop" title="채소" isClick={false} />
      <TextCategoryItem type="product" params="crop" title="과일" isClick={false} />
      <TextCategoryItem type="product" params="crop" title="쌀/곡류" isClick={false} />
      <TextCategoryItem type="product" params="crop" title="버섯" isClick={false} />
    </nav>
  );
}

'use client';
import { ImageCategoryItemType, TextCategoryItemType } from '@/components/elements/CategoryItem/CategoryItem.type';
import Link from 'next/link';

/**
 * 카테고리 개별 아이템 컴포넌트 : 이미지형
 * @param params : 1차 카테고리
 * @param title : 카테고리명
 */
export function ImageCategoryItem({ params, title }: ImageCategoryItemType) {
  return (
    <Link href={`/product/crop?category=${params}`} className="flex flex-col items-center gap-2">
      <div
        className={`bg-[url('/images/category-${params}.webp')] w-12 h-12 aspect-square bg-cover bg-center mobile-max:w-14 mobile-max:h-14`}
      ></div>
      <h3 className="text-xs">{title}</h3>
    </Link>
  );
}

/**
 * 카테고리 개별 아이템 컴포넌트 : 텍스트형
 */

/* 
  const pathname = usePathname();
  const isActive = pathname?.includes(`/${params}/${subParams}`);

  const borderColor = isActive ? 'border-oguogu-main-dark' : 'border-oguogu-gray-2';
   */
export function TextCategoryItem({ type, _id, params, title, isClick = false }: TextCategoryItemType) {
  let borderColor;
  if (isClick) {
    borderColor = 'border-oguogu-main-dark';
  } else {
    borderColor = 'border-oguogu-gray-2';
  }

  return (
    <Link
      href={`${type === 'search' ? '/search/result' : type === 'product' ? '/product' : ''}${_id ? '/' + _id : ''}/${params}`}
      className={`font-[14px] h-12 flex justify-center border-b-2 ${borderColor} py-2 w-full`}
    >
      {title}
    </Link>
  );
}

import { ImageCategoryItemType, TextCategoryItemType } from '@/components/elements/CategoryItem/CategoryItem.type';
import Image from 'next/image';
import Link from 'next/link';

/**
 * 카테고리 개별 아이템 컴포넌트 : 이미지형
 * @param params : 1차 카테고리
 * @param title : 카테고리명
 */
export function ImageCategoryItem({ params, title }: ImageCategoryItemType) {
  return (
    <Link href={`/product/crop/${params}`} className="flex flex-col items-center gap-2 pt-2">
      <Image src={`/images/category-${params}.webp`} alt={title} width={48} height={48} />
      <h3 className="text-xs">{title}</h3>
    </Link>
  );
}

/**
 * 카테고리 개별 아이템 컴포넌트 : 텍스트형
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

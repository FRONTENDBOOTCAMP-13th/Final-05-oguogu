import {
  ImageCategoryItemType,
  SelectProductItemType,
  TextCategoryItemType,
} from '@/components/elements/CategoryItem/CategoryItem.type';
import Image from 'next/image';
import Link from 'next/link';

/**
 * 카테고리 개별 아이템 컴포넌트 : 이미지형
 * @param params : 1차 카테고리
 * @param title : 카테고리명
 */
export function ImageCategoryItem({ params, title }: ImageCategoryItemType) {
  return (
    <Link href={`/product/crop?category=${params}`} className="flex flex-col items-center gap-2">
      <Image src={`/images/category-${params}.webp`} alt={title} width={48} height={48} />
      <p className="text-xs">{title}</p>
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
      className={`h-12 flex justify-center items-center border-b-2 ${borderColor} w-full`}
    >
      <h2>{title}</h2>
    </Link>
  );
}

export function SelectProductItem({ params, title }: SelectProductItemType) {
  return (
    <div className="bg-oguogu-main-light w-full p-4 rounded-xl border border-oguogu-gray-2">
      <Link href={`/office/products/select/editor/${params}`} className="flex flex-col items-center gap-2">
        <Image src={`/images/category-seller-${params}.png`} alt={title} width={60} height={60} />
        <p className="text-xl">{title}</p>
      </Link>
    </div>
  );
}

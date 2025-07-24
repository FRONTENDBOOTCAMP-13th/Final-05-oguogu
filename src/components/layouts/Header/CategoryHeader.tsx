'use client';

import Link from 'next/link';
import handleGoBack from '@/utils/handleGoBack/handleGoBack';
import { HeaderExtraProps } from '@/components/layouts/Header/types/Header.type';
import { usePathname /* useSearchParams */ } from 'next/navigation';

export default function CategoryHeader({ cartItemCount = 0, title }: HeaderExtraProps) {
  const pathname = usePathname();

  /* const queryParameterName = useSearchParams();
  const categoryName = queryParameterName.get('category');
  console.log(categoryName); */

  return (
    <header className="header">
      {/* 검색 + 버튼 */}
      <div className="flex gap-1 items-center w-full">
        <button type="button" onClick={handleGoBack} className="w-6 cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0.5L1 9.22973L9 17.5" stroke="black" />
          </svg>
        </button>

        {/* 쿼리스트링 존재 여부 검증 및 현재 위치(pathname) 기반 텍스트 동적 변경 */}
        <h1 className="textElipsis flex-1 h-6 sm:w-48 ml-2 pl-2 text-lg">
          {
            /* categoryName
            ? categoryName
            : */ pathname.includes('/product/crop')
              ? '농산물'
              : pathname.includes('/product/experience')
                ? '체험'
                : pathname.includes('/product/gardening')
                  ? '텃밭'
                  : title
          }
        </h1>

        {/* 장바구니 아이콘 + 뱃지 */}
        <Link href="/mypage/cart" className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 11L14 20M19 11L15 4M2 11H22M3.5 11L5.1 18.4C5.1935 18.8586 5.44485 19.2698 5.81028 19.5621C6.17572 19.8545 6.63211 20.0094 7.1 20H16.9C17.3679 20.0094 17.8243 19.8545 18.1897 19.5621C18.5552 19.2698 18.8065 18.8586 18.9 18.4L20.6 11M4.5 15.5H19.5M5 11L9 4M9 11L10 20"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cartItemCount > 0 ? (
            <span className="absolute bottom-0 right-0 bg-oguogu-main text-oguogu-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
              {cartItemCount > 99 ? '99' : cartItemCount}
            </span>
          ) : (
            ''
          )}
        </Link>
      </div>
    </header>
  );
}

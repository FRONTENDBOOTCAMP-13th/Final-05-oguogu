'use client';

import Link from 'next/link';
import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import SearchForm from '@/components/elements/SearchForm/SearchForm';
import { HeaderExtraProps } from '@/components/layouts/Header/Header.type';

export default function SearchHeader({ cartItemCount = 99 }: HeaderExtraProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-12 p-3 bg-oguogu-white">
      <div className="flex items-center w-full gap-1">
        {/* 뒤로가기 */}
        <GoBackIcon />

        {/* 검색창 */}
        <SearchForm />
        
        {/* 장바구니 아이콘 + 뱃지 */}
        <div>
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
      </div>
    </header>
  );
}

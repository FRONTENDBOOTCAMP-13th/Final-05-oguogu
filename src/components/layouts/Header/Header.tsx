'use client';

import Link from 'next/link';

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  return (
    <header className="h-12 sticky top-0 z-50 bg-oguogu-white flex justify-between items-center p-3">
      {/* 햄버거 메뉴 */}
      <Link href="/login" className="mr-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M4 18H20M4 6H20" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* 사이트 이름 */}
      <h1 className="text-2xl">
        <Link href="/">오구텃밭</Link>
      </h1>

      {/* 검색 */}
      <div className="flex gap-2 items-center">
        <Link href="/search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

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

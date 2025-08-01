'use client';

import HamburgerIcon from '@/components/elements/HamburgerIcon/HamburgerIcon';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      {/* 햄버거 메뉴 */}
      <HamburgerIcon />

      {/* 사이트 이름 */}
      <Link href="/">
        <h1 className="text-xl">오구텃밭</h1>
      </Link>

      {/* 검색 */}
      <div className="flex items-center gap-2">
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
        <CartItemCountIcon />
      </div>
    </header>
  );
}

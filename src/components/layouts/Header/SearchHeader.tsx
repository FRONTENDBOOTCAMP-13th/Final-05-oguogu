'use client';

import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import SearchForm from '@/components/elements/SearchForm/SearchForm';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';

export default function SearchHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-12 p-3 bg-oguogu-white">
      <div className="flex items-center w-full gap-1">
        {/* 뒤로가기 */}
        <GoBackIcon />

        {/* 검색창 */}
        <SearchForm />

        {/* 장바구니 아이콘 + 뱃지 */}
        <CartItemCountIcon />
      </div>
    </header>
  );
}

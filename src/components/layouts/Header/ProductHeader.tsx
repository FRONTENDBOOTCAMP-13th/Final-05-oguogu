'use client';

import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';

export default function ProductHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-12 p-3 bg-oguogu-white">
      {/* 검색 + 버튼 */}
      <div className="flex items-center w-full gap-1">
        <GoBackIcon />

        {/* 상단 텍스트 */}
        <p className="text-[16px] w-full text-center">{title}</p>

        {/* 장바구니 아이콘 + 뱃지 */}
        <CartItemCountIcon />
      </div>
    </header>
  );
}

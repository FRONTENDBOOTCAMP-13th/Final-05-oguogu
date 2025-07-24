'use client';

import { HeaderExtraProps } from '@/components/layouts/Header/types/Header.type';
import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';

export default function ProductHeader({ title }: HeaderExtraProps) {
  return (
    <header className="w-full h-12 sticky top-0 z-50 bg-oguogu-white flex justify-between items-center p-3">
      {/* 검색 + 버튼 */}
      <div className="flex gap-1 items-center w-full">
        <GoBackIcon />

        {/* 상단 텍스트 */}
        <p className="text-[16px] w-full text-center">{title}</p>

        {/* 장바구니 아이콘 + 뱃지 */}
        <CartItemCountIcon />
      </div>
    </header>
  );
}

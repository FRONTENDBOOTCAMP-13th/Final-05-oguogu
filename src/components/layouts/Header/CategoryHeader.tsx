'use client';

import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';

export default function CategoryHeader({ title }: { title: string }) {
  return (
    <header className="header">
      {/* 검색 + 버튼 */}
      <div className="flex items-center w-full gap-1">
        <GoBackIcon />

        {/* INFO 쿼리스트링 존재 여부 검증 및 현재 위치(pathname) 기반 텍스트 동적 변경 필요 */}
        <h1 className="flex-1 h-6 pl-2 ml-2 text-lg textElipsis sm:w-48">{title}</h1>

        {/* 장바구니 아이콘 + 뱃지 */}
        <CartItemCountIcon />
      </div>
    </header>
  );
}

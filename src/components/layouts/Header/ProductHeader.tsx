/* 미사용 컴포넌트 */

'use client';

import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';
import Link from 'next/link';

export default function ProductHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-12 p-3 bg-oguogu-white">
      {/* 검색 + 버튼 */}
      <div className="flex items-center w-full gap-1">
        <GoBackIcon />

        {/* 상단 텍스트 */}
        <p className="text-[16px] w-full text-center">{title}</p>

        <Link href="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1053 14.2652 12 14 12H10C9.73478 12 9.48043 12.1053 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21M3 9.99997C2.99993 9.70904 3.06333 9.42159 3.18579 9.15768C3.30824 8.89378 3.4868 8.65976 3.709 8.47197L10.709 2.47297C11.07 2.16788 11.5274 2.00049 12 2.00049C12.4726 2.00049 12.93 2.16788 13.291 2.47297L20.291 8.47197C20.5132 8.65976 20.6918 8.89378 20.8142 9.15768C20.9367 9.42159 21.0001 9.70904 21 9.99997V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99997Z"
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

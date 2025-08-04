'use client';

import { useAuthStore } from '@/shared/store/authStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ToggleOfficePageForSeller() {
  const LoggedInUserType: string | undefined = useAuthStore(state => state.userInfo?.type);
  const pathname = usePathname();

  if (!LoggedInUserType) return;

  return (
    <>
      {LoggedInUserType === 'seller' ? (
        pathname.includes('/mypage') ? (
          <Link
            href="/office"
            className="fixed w-20 h-20 bottom-18 right-6 border-3 border-oguogu-main rounded-[100px] bg-oguogu-white shadow-sm shadow-oguogu-gray-2 text-sm flex flex-col items-center justify-center"
          >
            <span>판매자</span>
            <span>관리페이지</span>
          </Link>
        ) : (
          <Link
            href="/mypage"
            className="fixed w-20 h-20 bottom-18 right-6 border-3 border-oguogu-main rounded-[100px] bg-oguogu-white shadow-sm shadow-oguogu-gray-2 text-sm flex items-center justify-center"
          >
            마이페이지
          </Link>
        )
      ) : (
        ''
      )}
    </>
  );
}

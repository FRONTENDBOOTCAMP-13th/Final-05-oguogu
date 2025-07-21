'use client';

import Link from 'next/link';
import { useAuthStore } from '@/shared/store/authStore';

export default function ReviewClientControl() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return isLoggedIn ? (
    <button className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center">
      리뷰 작성하기
    </button>
  ) : (
    <Link
      href="/login"
      className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
    >
      <p className="text-oguogu-main pr-1 ">로그인</p> 후 리뷰 작성하기
    </Link>
  );
}

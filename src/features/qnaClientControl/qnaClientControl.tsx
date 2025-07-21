'use client';

import Link from 'next/link';
import { useAuthStore } from '@/shared/store/authStore';

/**
 * QnA 페이지에서 로그인 여부에 따라
 * "문의글 작성하기" 버튼 또는 로그인 유도 링크를 보여주는 컴포넌트입니다.
 *
 * @component
 * @returns 로그인 상태에 따른 QnA 작성 컨트롤 UI
 */

export default function QnaClientControls() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <div className="px-4 flex flex-col gap-4 mb-6">
      {isLoggedIn ? (
        <button className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer">
          문의글 작성하기
        </button>
      ) : (
        <Link
          href="/login"
          className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
        >
          <p className="text-oguogu-main-dark pr-1">로그인</p> 후 문의글 작성하기
        </Link>
      )}
    </div>
  );
}

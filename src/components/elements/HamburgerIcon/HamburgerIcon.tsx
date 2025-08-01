import { useAuthStore } from '@/shared/store/authStore';
import Link from 'next/link';

/**
 * 햄버거 아이콘 컴포넌트
 * @description 로그인 여부에 따라 '/mypage' 또는 '/login'으로 이동
 */
export default function HamburgerIcon() {
  const loginData = useAuthStore();

  return (
    <>
      <Link href={loginData.isLoggedIn ? '/mypage' : '/login'} className="mr-8 relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M4 18H20M4 6H20" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {loginData.isLoggedIn ? (
          ''
        ) : (
          <span className="absolute top-[-5px] right-[-30px] text-[8px] bg-[#fff000] px-1.5 py-0.5 rounded-4xl animate-[floatUpDown_1.5s_ease-in-out_infinite]">
            로그인
          </span>
        )}
      </Link>
    </>
  );
}

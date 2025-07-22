import { useAuthStore } from '@/shared/store/authStore';
import Link from 'next/link';

export default function HamburgerIcon() {
  // useAuthStore 의 로컬 스토리지 상태 검증 코드 사용
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  console.log('\t로그인 상태: ', isLoggedIn);

  return (
    <>
      <Link href={isLoggedIn ? '/mypage' : '/login'} className="mr-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M4 18H20M4 6H20" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Link>
    </>
  );
}

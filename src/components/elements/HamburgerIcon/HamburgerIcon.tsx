import Link from 'next/link';

/**
 * 햄버거 아이콘 컴포넌트
 * @description 로그인 여부에 따라 '/mypage' 또는 '/login'으로 이동
 */
export default function HamburgerIcon() {
  return (
    <>
      <Link href="/mypage" className="mr-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M4 18H20M4 6H20" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </>
  );
}

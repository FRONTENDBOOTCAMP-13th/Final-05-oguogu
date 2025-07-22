import Link from 'next/link';

export default function HamburgerIcon() {
  // 로컬 스토리지에 접근해 accessToken 이 있는지 검증

  // 있다면, 페이지 라우팅 경로 재설정
  return (
    <Link href="/login" className="mr-8">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M4 18H20M4 6H20" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Link>
  );
}

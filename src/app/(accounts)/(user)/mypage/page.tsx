import LogOutIcon from '@/components/elements/LogoutIcon/LogoutIcon';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import Link from 'next/link';

export default function UserMyPage() {
  return (
    <>
      <main className="px-4 pt-7 flex flex-col gap-4 text-2xl min-h-[calc(100vh-48px)]">
        {/* 타이틀 & 서브타이틀 */}
        {/* 로그인 ⭕️ */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p>
              <span className="text-oguogu-main">반가워요! </span>
              <GetLoggedInUserData type="name" />님
            </p>
            <LogOutIcon />
          </div>
          <p className="text-xs text-oguogu-gray-4">
            <GetLoggedInUserData type="name" />
            님의 텃밭 생활을 환영합니다
          </p>
        </div>

        {/* 로그인 ❌ */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-oguogu-main">안녕하세요!</span>
          </div>
          <p className="text-xs text-oguogu-gray-4">로그인하고 더 많은 서비스를 이용해 보세요</p>
        </div>

        <Link href="/mypage/order">주문/배송 내역</Link>
        <Link href="/mypage/cart">장바구니</Link>
        <Link href="/mypage/pick">찜한 상품</Link>
        <Link href="/mypage/gardening">나의 텃밭</Link>
      </main>
    </>
  );
}

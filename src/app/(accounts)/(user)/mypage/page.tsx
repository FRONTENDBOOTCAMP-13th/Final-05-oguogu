import Link from 'next/link';

export default function UserMyPage() {
  return (
    <>
      <main className="px-4 pt-12 flex flex-col gap-4 text-2xl min-h-[calc(100vh-48px)]">
        {/* 여기에 내용 작성 */}
        <Link href="/mypage/order">주문/배송 내역</Link>
        <Link href="/mypage/cart">장바구니</Link>
        <Link href="/mypage/pick">찜한 상품</Link>
        <Link href="/mypage/gardening">나의 텃밭</Link>
      </main>
    </>
  );
}

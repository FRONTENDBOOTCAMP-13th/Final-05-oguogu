import Link from 'next/link';

export default function UserMyPage() {
  return (
    <>
      <main className="px-4">
        {/* 여기에 내용 작성 */}
        <Link href="/mypage/order">주문/배송 내역</Link>
        <Link href="/mypage/cart">장바구니</Link>
        <Link href="/mypage/pick">찜한 상품</Link>
        <Link href="/mypage/gardening">텃밭 구독</Link>
      </main>
    </>
  );
}

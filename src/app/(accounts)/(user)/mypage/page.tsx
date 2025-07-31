import HotMarkIcon from '@/components/elements/HotMarkIcon/HotMarkIcon';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import MyPageSectionDependsOnLoginStatus from '@/components/layouts/Login/MyPageSectionDependsOnLoginStatus';
import Image from 'next/image';
import Link from 'next/link';

export default function UserMyPage() {
  return (
    <>
      <LinkHeader title="마이페이지" />
      <main className="pt-7 flex flex-col min-h-[calc(100vh-48px)]">
        <MyPageSectionDependsOnLoginStatus />

        <section className="px-4 py-6 flex flex-col gap-6 text-xl">
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
              나의 텃밭 생활
              <Image src="/svgs/pot.svg" alt="" width={20} height={20}></Image>
            </h2>
            <Link href="/mypage/order">주문/배송 내역</Link>
            <Link href="/mypage/cart">장바구니</Link>
            <Link href="/mypage/pick">찜한 상품</Link>
            <Link href="/mypage/mygarden" className="relative">
              텃밭 히스토리
              <HotMarkIcon />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
              고객센터
              <Image src="/svgs/notice.svg" alt="" width={18} height={18}></Image>
            </h2>
            <Link href="/board/notice">공지사항</Link>
            <Link href="/board/qna">자주 묻는 질문</Link>
          </div>
        </section>
      </main>
    </>
  );
}

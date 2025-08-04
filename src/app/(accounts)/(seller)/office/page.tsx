import LinkHeader from '@/components/layouts/Header/LinkHeader';
import BackOffcieSectionDependsOnLoginStatus from '@/components/layouts/Login/BackOfficeSectionDependsOnLoginStatus';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '백오피스 | 판매자 센터 - 오구오구',
  description: '판매자 전용 백오피스 메인 페이지입니다. 로그인 상태에 따라 다양한 관리 메뉴를 확인할 수 있습니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office',
  },
};

export default function BackOffice() {
  return (
    <>
      <LinkHeader title="백오피스" />
      <main className="pt-7 flex flex-col min-h-[calc(100vh-48px)]">
        <BackOffcieSectionDependsOnLoginStatus />
        <section className="px-4 py-6 flex flex-col gap-6 text-xl">
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
              나의 텃밭 생활
              <Image src="/svgs/pot.svg" alt="" width={20} height={20}></Image>
            </h2>
            <Link href="/office/orders">주문 관리</Link>
            <Link href="/office/products">상품 관리</Link>
            <Link href="/office/mygarden">텃밭 히스토리 관리</Link>
            <Link href="/office/payments">정산</Link>
            <Link href="/office/qnas">문의 내역</Link>
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

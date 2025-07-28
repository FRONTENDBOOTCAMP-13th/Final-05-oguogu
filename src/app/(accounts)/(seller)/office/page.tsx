import LinkHeader from '@/components/layouts/Header/LinkHeader';
import BackOffcieSectionDependsOnLoginStatus from '@/components/layouts/Login/BackOfficeSectionDependsOnLoginStatus';
import Image from 'next/image';
import Link from 'next/link';

export default function BackOffice() {
  return (
    <>
      <LinkHeader title="백오피스" />
      <main className="pt-7 flex flex-col min-h-[calc(100vh-48px)]">
        <BackOffcieSectionDependsOnLoginStatus />
        <section className="px-4 py-6 flex flex-col gap-6 text-xl">
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

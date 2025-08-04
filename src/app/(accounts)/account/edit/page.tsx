import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원정보 수정 | 오구오구',
  description: '내 계정 정보와 비밀번호, 연락처 등의 개인정보를 수정할 수 있는 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/account/edit',
  },
};

export default function EditAccountData() {
  return (
    <>
      <LinkHeader title="회원정보 수정" />
      <main className="w-[320px] mx-auto px-4 h-[calc(100vh-48px)]">{/* 여기에 내용 작성 */}</main>
    </>
  );
}

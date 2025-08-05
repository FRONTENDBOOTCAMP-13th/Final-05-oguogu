import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원정보 | 오구텃밭',
  description: '내 계정 정보 및 연락처, 비밀번호 등 개인 정보를 확인하고 수정할 수 있는 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/account',
  },
};

export default function Account() {
  return (
    <>
      <LinkHeader title="회원정보" />
      <main className="w-[320px] mx-auto px-4 h-[calc(100vh-48px)]">{/* 여기에 내용 작성 */}</main>
    </>
  );
}

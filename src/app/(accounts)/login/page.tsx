import LinkHeader from '@/components/layouts/Header/LinkHeader';
import LoginForm from '@/components/layouts/Login/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '통합 로그인 | 오구오구',
  description: '오구오구 회원 계정으로 로그인하여 텃밭, 농산물, 체험 상품을 편리하게 이용하세요.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/login',
  },
};

export default function Login() {
  return (
    <>
      {/* 헤더 */}
      <LinkHeader title="통합 로그인" />

      {/* 로그인폼 */}
      <main className="w-[320px] mx-auto px-4 h-[calc(100vh-48px)] flex items-center overflow-y-hidden">
        <div className="flex flex-col self-center gap-5">
          <h2 className="text-2xl">
            <span className="text-oguogu-main">오구텃밭</span>에 오신것을 <br />
            환영합니다!
          </h2>
          <LoginForm />
        </div>
      </main>
    </>
  );
}

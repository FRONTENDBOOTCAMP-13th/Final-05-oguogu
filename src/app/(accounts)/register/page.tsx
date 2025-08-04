import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import RegisterCardItem from '@/components/elements/RegisterItem/RegisterCardItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 | 오구오구',
  description: '오구오구 회원으로 가입하고 텃밭, 농산물, 체험 상품을 쉽고 빠르게 이용해보세요.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/register',
  },
};

// 통합 회원가입 페이지
export default function Register() {
  return (
    <>
      <LinkHeader title="회원가입" />
      <main className="w-[320px] mx-auto px-4 h-[calc(100vh-48px)] flex items-center overflow-y-hidden">
        <div className="flex flex-col w-full self-center gap-3">
          <RegisterCardItem type="user" />
          <RegisterCardItem type="seller" />
          <ProductLinkItem link="/login" subTxt="이미 가입하셨나요?" linkTitle="로그인" mode="login" />
        </div>
      </main>
    </>
  );
}

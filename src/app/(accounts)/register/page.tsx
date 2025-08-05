import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import RegisterCardItem from '@/components/elements/RegisterItem/RegisterCardItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 | 오구텃밭',
  description: '오구텃밭 회원가입하고 신선한 농산물과 다양한 체험, 텃밭 상품을 구매해보세요.',
  keywords: ['오구텃밭', '회원가입'],
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
          <ProductLinkItem link="/login" subTxt="이미 가입하셨나요?" linkTitle="로그인" mode="registerPage" />
        </div>
      </main>
    </>
  );
}

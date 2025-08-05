import SellerRegisterForm from '@/app/(accounts)/register/seller/registerForm';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '판매자 회원가입 | 오구오구',
  description: '오구오구 판매자로 가입하고 농산물, 체험, 텃밭 상품을 직접 등록하고 판매해보세요.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/register/seller',
  },
};

export default function RegisterFormForSeller() {
  return (
    <>
      <LinkHeader title="판매자 회원가입" />
      <main className="w-[320px] mx-auto px-4 overflow-y-auto gap-2">
        <SellerRegisterForm />
      </main>
    </>
  );
}

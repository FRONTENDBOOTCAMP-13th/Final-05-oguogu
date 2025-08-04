import UserRegisterForm from '@/app/(accounts)/register/user/registerForm';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - 일반회원 | 오구오구',
  description: '오구오구 일반회원으로 가입하고 나만의 텃밭과 신선한 농산물을 경험해보세요.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/register/user',
  },
};

export default function RegisterFormForUser() {
  return (
    <>
      <LinkHeader title="회원가입" />
      <main className="w-[320px] mx-auto px-4 gap-2">
        <UserRegisterForm />
      </main>
    </>
  );
}

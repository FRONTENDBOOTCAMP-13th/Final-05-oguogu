import UserRegisterForm from '@/app/(accounts)/register/user/registerForm';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

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

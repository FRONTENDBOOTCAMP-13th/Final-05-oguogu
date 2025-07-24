import SellerRegisterForm from '@/app/(accounts)/register/seller/registerForm';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

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

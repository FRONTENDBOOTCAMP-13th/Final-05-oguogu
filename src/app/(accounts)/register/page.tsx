import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import RegisterCardItem from '@/components/elements/RegisterItem/RegisterCardItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

// 통합 회원가입 페이지
export default function Register() {
  return (
    <>
      <LinkHeader title="회원가입" />
      <main className="w-[320px] mx-auto px-4 h-[calc(100vh-48px)] flex items-center overflow-y-hidden">
        <div className="flex flex-col self-center gap-3">
          <RegisterCardItem type="seller" />
          <RegisterCardItem type="user" />
          <ProductLinkItem link="/login" subTxt="이미 가입하셨나요?" linkTitle="로그인" mode="login" />
        </div>
      </main>
    </>
  );
}

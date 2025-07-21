import CheckButton from '@/components/elements/CheckButton/CheckButton';
import CommonButton from '@/components/elements/CommonButton/CommonButton';
import LoginInput from '@/components/elements/LoginItem/LoginInput';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 서버 요청 로직
    console.log('폼 확인용');
  };
  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="sr-only">로그인 정보</legend>
          {/* 이메일 */}
          <LoginInput
            type="email"
            placeholder="예: ogugarden"
            value={email}
            onChange={setEmail}
            options={[
              { label: 'naver.com', value: 'naver.com' },
              { label: 'gmail.com', value: 'gmail.com' },
            ]}
          />

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <LoginInput
              type="password"
              placeholder="비밀번호 (영문 + 숫자 + 특수문자)"
              onChange={setPassword}
              value={password}
              id="password"
            />
          </div>
        </fieldset>

        {/* 자동 로그인 & 아이디/비밀번호 찾기 */}
        <div className="flex flex-row items-center justify-between mt-2">
          <CheckButton size={14} gap={2} checked={autoLogin} onChange={() => setAutoLogin(prev => !prev)}>
            자동 로그인
          </CheckButton>
          <div className="flex flex-row gap-[12px] text-[8px] text-oguogu-gray-3">
            <Link href={`/`}>아이디 찾기</Link>
            <Link href={`/`}>비밀번호 찾기</Link>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <CommonButton
          feature="로그인"
          textSize="text-[16px]"
          width="w-[288px]"
          height="h-[43px]"
          type="submit"
          cursorPointer
        />

        {/* 회원가입 링크 */}
        <ProductLinkItem link="/register" linkTitle="회원가입" subTxt="하러 가기" />

        {/* 외부 폼 */}

        <section className=" flex flex-col gap-y-[16px]">
          <div>
            <CommonButton
              feature="카카오 로그인"
              textSize="text-[16px]"
              width="w-[288px]"
              height="h-[43px]"
              bgColor="bg-[#FEE500]"
              textColor="text-oguogu-black"
              cursorPointer={true}
              icon={<Image src="images/iconImage/icon-login-kakao.svg" alt="카카오 아이콘" width={20} height={20} />}
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <Image src={`images/iconImage/icon-login-google.svg`} alt="googleIcon" width={36} height={36} />
            <Image src={`images/iconImage/icon-login-naver.svg`} alt="naverIcon" width={36} height={36} />
          </div>
        </section>
      </form>
    </section>
  );
}

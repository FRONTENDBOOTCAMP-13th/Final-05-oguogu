'use client';

import CheckButton from '@/components/elements/CheckButton/CheckButton';
import CommonButton from '@/components/elements/CommonButton/CommonButton';
import LoginInput from '@/components/elements/LoginItem/LoginInput';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <LinkHeader title="통합 로그인" />
      <main className="w-[320px] mx-auto px-4 h-[calc(100vh-48px)] flex items-center overflow-y-hidden">
        <div className="flex flex-col self-center gap-5">
          <h2 className="text-2xl">
            <span className="text-oguogu-main">오구텃밭</span>에 오신것을 <br />
            환영합니다!
          </h2>

          <section>
            <form className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-2">
                <legend className="sr-only">로그인 정보</legend>
                {/* 이름 */}
                <div>
                  <label htmlFor="username" className="sr-only">
                    이름
                  </label>
                  <LoginInput type="text" placeholder="이름" onChange={setMsg} value={msg} id="username" />
                </div>

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
                <CheckButton size={14} gap={2}>
                  자동 로그인
                </CheckButton>
                <div className="flex flex-row gap-[12px] text-[8px] text-oguogu-gray-3">
                  <Link href={`/`}>아이디 찾기</Link>
                  <Link href={`/`}>비밀번호 찾기</Link>
                </div>
              </div>

              {/* 로그인 버튼 */}
              <CommonButton feature="로그인" textSize="text-[16px]" width="w-[288px]" height="h-[43px]" />

              {/* 회원가입 링크 */}
              <ProductLinkItem link="/register" linkTitle="회원가입" subTxt="하러 가기" />
            </form>
          </section>

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
        </div>
      </main>
    </>
  );
}

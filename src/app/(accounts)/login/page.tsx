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
    <div className="flex flex-col items-center gap-[20px] min-w-[320px] max-w-[768px] mx-auto h-full">
      <div className="w-full">
        <LinkHeader title="통합 로그인" />
      </div>

      <main className="w-[320px] px-[16px] flex flex-col gap-[20px] mx-auto justify-center">
        <section>
          <h2 className="text-[24px]">
            <span className="text-oguogu-main ">오구텃밭에</span> 오신것을 <br />
            환영합니다!
          </h2>
        </section>

        <section>
          <form>
            <fieldset>
              <legend className="sr-only">로그인 정보</legend>
              <div>
                <label htmlFor="username" className="sr-only">
                  이름
                </label>
                <LoginInput type="text" placeholder="이름" onChange={setMsg} value={msg} id="username" />
              </div>

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

            <div className="flex flex-row justify-between mt-[10px] ">
              <CheckButton children="자동 로그인" size={14} gap={2} />
              <div className="flex flex-row gap-[12px] my-[10px] text-[8px] text-oguogu-gray-3">
                <Link href={`/`}>아이디 찾기</Link>
                <Link href={`/`}>비밀번호 찾기</Link>
              </div>
            </div>

            <div className="mt-[10px]">
              <CommonButton feature="로그인" textSize="text-[16px]" width="w-[288px]" height="h-[43px]" />
            </div>
            <div className="mt-[10px]">
              <ProductLinkItem linkTitle="회원가입" />
            </div>
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
            <Image src={`images/iconImage/icon-login-naver.svg`} alt="googleIcon" width={36} height={36} />
          </div>
        </section>
      </main>
    </div>
  );
}

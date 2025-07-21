'use client';
import CheckButton from '@/components/elements/CheckButton/CheckButton';
import CommonButton from '@/components/elements/CommonButton/CommonButton';
import LoginInput from '@/components/elements/LoginItem/LoginInput';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { useState } from 'react';

export default function RegisterFormForUser() {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birth, setBirth] = useState('');

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isAdult, setIsAdult] = useState(true);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버 요청 로직
  };

  return (
    <>
      <LinkHeader title="회원가입" />
      <main className="w-[320px] mx-auto px-4  gap-2">
        {/* 여기에 내용 작성 */}
        <form action="" onSubmit={handleSubmit} className="py-4">
          <fieldset className="flex flex-col gap-6">
            <legend className="sr-only">회원가입</legend>
            <div>
              <label htmlFor="signUpUserEmail">
                이메일<sup className="text-[10px] ">*</sup>
              </label>
              <LoginInput
                id="signUpUserEmail"
                type="email"
                placeholder="예: ogugarden"
                value={email}
                onChange={setEmail}
                options={[
                  { label: 'naver.com', value: 'naver.com' },
                  { label: 'gmail.com', value: 'gmail.com' },
                ]}
              />
            </div>

            <div>
              <label htmlFor="signUpUserName">
                이름
                <sup className="text-[10px]">*</sup>
              </label>
              <LoginInput
                id="signUpUserName"
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={setName}
                value={name}
              />
            </div>

            <div>
              <label htmlFor="signUpUserPassword">
                비밀번호
                <sup className="text-[10px] ">*</sup>
              </label>
              <LoginInput
                id="signUpUserPassword"
                type="password"
                placeholder="영문 + 숫자 + 특수문자"
                onChange={setPassword}
                value={password}
              />
            </div>
            <div>
              <label htmlFor="signUpUserConfirmPassword">
                비밀번호 확인
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpUserConfirmPassword"
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                onChange={setConfirmPassword}
                value={confirmPassword}
              />
            </div>
            <div>
              <label htmlFor="signUpUserPhoneNumber">
                연락처
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpUserPhoneNumber"
                type="phone"
                onChange={setPhoneNum}
                value={phoneNum}
                placeholder="숫자"
              />
            </div>

            <div>
              <label htmlFor="signUpUserAddress">
                주소
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpUserAddress"
                type="address"
                onChange={setAddress}
                value={address}
                placeholder="도로명, 지번, 건물명 검색"
              />
            </div>
            <div>
              <label htmlFor="signUpUserBirth">생년원일</label>
              <LoginInput id="signUpUserBirth" type="birth" onChange={setBirth} value={birth} />
            </div>

            <div className="w-full flex flex-col items-start justify-start my-[16px]">
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(prev => !prev)}
              >
                이용약관 동의
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy(prev => !prev)}
              >
                개인정보 수집 이용 동의
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={isAdult}
                onChange={() => setIsAdult(prev => !prev)}
              >
                본인은 만14세 이상입니다.
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="optional"
                checked={agreeMarketing}
                onChange={() => setAgreeMarketing(prev => !prev)}
              >
                마케팅 광고 활용을 위한 수집 및 이용 동의
              </CheckButton>
            </div>
            <div>
              <CommonButton
                feature="가입 완료하기"
                textSize="text-[16px]"
                width="w-[288px]"
                height="h-[43px]"
                type="submit"
                cursorPointer
              />
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
}

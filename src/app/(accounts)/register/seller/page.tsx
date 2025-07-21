'use client';

import CheckButton from '@/components/elements/CheckButton/CheckButton';
import CommonButton from '@/components/elements/CommonButton/CommonButton';
import LoginInput from '@/components/elements/LoginItem/LoginInput';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { useState } from 'react';

export default function RegisterFormForSeller() {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [sellerBusinessTel, setSellerBusinessTel] = useState('');
  const [sellerTel, setSellerTel] = useState('');
  const [sellerRegisNum, setSellerRegisNum] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [sellerPassword, setSellerPassword] = useState('');
  const [sellerConfirmPassword, setSellerConfirmPassword] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');

  const [sellerAgreeTerms, setSellerAgreeTerms] = useState(true);
  const [sellerFinTerms, setSellerFinTerms] = useState(true);
  const [sellerAgreePrivacy, setSellerAgreePrivacy] = useState(true);
  const [sellerProvidePrivacy, setSellerProvidePrivacy] = useState(true);
  const [sellerAgreeMarketing, setSellerAgreeMarketing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버 요청 로직
  };
  return (
    <>
      <LinkHeader title="판매자 회원가입" />
      <main className="w-[320px] mx-auto px-4  overflow-y-auto gap-2">
        <form action="" onSubmit={handleSubmit} className="py-4">
          <fieldset className="flex flex-col gap-6">
            <legend className="sr-only">판매자 회원가입</legend>
            <div>
              <label htmlFor="signUpCompanyName">
                상호명
                <sup className="text-[10px]">*</sup>
              </label>
              <LoginInput
                id="signUpCompanyName"
                type="text"
                placeholder="상호명을 입력해 주세요"
                onChange={setCompanyName}
                value={companyName}
              />
            </div>
            <div>
              <label htmlFor="signUpOwnerName">
                대표자명
                <sup className="text-[10px]">*</sup>
              </label>
              <LoginInput
                id="signUpOwnerName"
                type="text"
                placeholder="대표자명을 입력해 주세요"
                onChange={setOwnerName}
                value={ownerName}
              />
            </div>

            <div>
              <label htmlFor="signUpSellerTel">
                연락처
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpSellerTel"
                type="phone"
                onChange={setSellerTel}
                value={sellerTel}
                placeholder="숫자"
              />
            </div>
            <div>
              <label htmlFor="signUpSellerBusinessTel">
                사업자 대표 전화
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpSellerBusinessTel"
                type="phone"
                onChange={setSellerBusinessTel}
                value={sellerBusinessTel}
                placeholder="숫자"
              />
            </div>
            <div>
              <label htmlFor="signSellerAddress">
                사업장 소재지
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signSellerAddress"
                type="address"
                onChange={setSellerAddress}
                value={sellerAddress}
                placeholder="도로명, 지번, 건물명 검색"
              />
            </div>
            <div>
              <label htmlFor="signUpSellerRegisNum">
                사업자 등록 번호
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpSellerRegisNum"
                type="phone"
                onChange={setSellerRegisNum}
                value={sellerRegisNum}
                placeholder="숫자"
              />
            </div>

            <div>
              <label htmlFor="signUpSellerEmail">
                이메일<sup className="text-[10px] ">*</sup>
              </label>
              <LoginInput
                id="signUpSellerEmail"
                type="email"
                placeholder="예: ogugarden"
                value={sellerEmail}
                onChange={setSellerEmail}
                options={[
                  { label: 'naver.com', value: 'naver.com' },
                  { label: 'gmail.com', value: 'gmail.com' },
                ]}
              />
            </div>

            <div>
              <label htmlFor="signUpSellerPassword">
                비밀번호
                <sup className="text-[10px] ">*</sup>
              </label>
              <LoginInput
                id="signUpUserPassword"
                type="password"
                placeholder="영문 + 숫자 + 특수문자"
                onChange={setSellerPassword}
                value={sellerPassword}
              />
            </div>
            <div>
              <label htmlFor="signUpSellerConfirmPassword">
                비밀번호 확인
                <sup className="text-[10px] m-[2px]">*</sup>
              </label>
              <LoginInput
                id="signUpSellerConfirmPassword"
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                onChange={setSellerConfirmPassword}
                value={sellerConfirmPassword}
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-[5px] my-[16px]">
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={sellerAgreeTerms}
                onChange={() => setSellerAgreeTerms(prev => !prev)}
              >
                판매 이용약관 동의
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={sellerFinTerms}
                onChange={() => setSellerFinTerms(prev => !prev)}
              >
                전자금융거래 이용약관 동의
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={sellerAgreePrivacy}
                onChange={() => setSellerAgreePrivacy(prev => !prev)}
              >
                개인정보 수집∙이용 동의
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="required"
                checked={sellerProvidePrivacy}
                onChange={() => setSellerProvidePrivacy(prev => !prev)}
              >
                개인정보 제공 동의(사기방지 제휴기관)
              </CheckButton>
              <CheckButton
                size={14}
                gap={2}
                agreement="optional"
                checked={sellerAgreeMarketing}
                onChange={() => setSellerAgreeMarketing(prev => !prev)}
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

'use client';

import CheckButton from '@/components/elements/CheckButton/CheckButton';
import CommonButton from '@/components/elements/CommonButton/CommonButton';
import LoginInput from '@/components/elements/LoginItem/LoginInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/shared/data/actions/user';
import toast from 'react-hot-toast';
import { UserResType } from '@/shared/types/user';

export default function SellerRegisterForm() {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [sellerBusinessTel, setSellerBusinessTel] = useState('');
  const [sellerTel, setSellerTel] = useState('');
  const [sellerRegisNum, setSellerRegisNum] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [sellerPassword, setSellerPassword] = useState('');
  const [sellerConfirmPassword, setSellerConfirmPassword] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');

  // 체크 박스
  const [sellerAgreeTerms, setSellerAgreeTerms] = useState(false);
  const [sellerFinTerms, setSellerFinTerms] = useState(false);
  const [sellerAgreePrivacy, setSellerAgreePrivacy] = useState(false);
  const [sellerProvidePrivacy, setSellerProvidePrivacy] = useState(false);
  const [sellerAgreeMarketing, setSellerAgreeMarketing] = useState(false);

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const router = useRouter();

  const isPasswordValid = (pwd: string) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
    return hasLetter && hasNumber && hasSpecial;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (
      !companyName ||
      !ownerName ||
      !sellerBusinessTel ||
      !sellerTel ||
      !sellerRegisNum ||
      !sellerAddress ||
      !sellerEmail ||
      !sellerPassword ||
      !sellerConfirmPassword
    ) {
      toast.error('입력하지 않은 부분이 있습니다 모두 입력해주세요');
      return;
    }
    // 비밀번호 확인
    if (!isPasswordValid(sellerPassword)) {
      toast.error('비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
      return;
    }

    if (sellerPassword !== sellerConfirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다');
      return;
    }

    if (!sellerAgreeTerms || !sellerFinTerms || !sellerAgreePrivacy || !sellerProvidePrivacy) {
      toast.error('필수 약관에 모두 동의해주세요');
      return;
    }

    try {
      const res: UserResType = await createUser({
        email: sellerEmail,
        password: sellerPassword,
        name: ownerName,
        phone: sellerTel,
        address: sellerAddress,
        type: 'seller',
        extra: {
          businessInfo: {
            companyName: companyName,
            ownerName: ownerName,
            businessTel: sellerBusinessTel,
            businessNumber: sellerRegisNum,
          },
          agreement: {
            sellerAgreeTerms,
            sellerFinTerms,
            sellerAgreePrivacy,
            sellerProvidePrivacy,
            sellerAgreeMarketing,
          },
        },
      });

      if (res.ok === 1) {
        console.log(res);
        toast.success('회원가입이 완료되었습니다');
        router.push('/login');
      } else {
        toast.error('회원가입이 실패했습니다');
      }
    } catch (err) {
      console.error('회원가입 오류:', err);
      toast.error('회원가입 중 오류가 발생했습니다');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="py-4">
        <fieldset className="flex flex-col gap-6">
          <legend className="sr-only">판매자 회원가입</legend>

          <div>
            <label htmlFor="signUpCompanyName">
              상호명<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpCompanyName"
              type="text"
              placeholder="상호명을 입력해 주세요"
              onChange={setCompanyName}
              value={companyName}
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpOwnerName">
              대표자명<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpOwnerName"
              type="text"
              placeholder="대표자명을 입력해 주세요"
              onChange={setOwnerName}
              value={ownerName}
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpSellerTel">
              연락처<sup className="text-[10px] m-[2px]">*</sup>
            </label>
            <LoginInput
              id="signUpSellerTel"
              type="phone"
              onChange={setSellerTel}
              value={sellerTel}
              placeholder="숫자"
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpSellerBusinessTel">
              사업자 대표 전화<sup className="text-[10px] m-[2px]">*</sup>
            </label>
            <LoginInput
              id="signUpSellerBusinessTel"
              type="tel"
              onChange={setSellerBusinessTel}
              value={sellerBusinessTel}
              placeholder="숫자"
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signSellerAddress">
              사업장 소재지<sup className="text-[10px] m-[2px]">*</sup>
            </label>
            <LoginInput
              id="signSellerAddress"
              type="address"
              onChange={setSellerAddress}
              value={sellerAddress}
              placeholder="도로명, 지번, 건물명 검색"
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpSellerRegisNum">
              사업자 등록 번호<sup className="text-[10px] m-[2px]">*</sup>
            </label>
            <LoginInput
              id="signUpSellerRegisNum"
              type="business"
              onChange={setSellerRegisNum}
              value={sellerRegisNum}
              placeholder="숫자"
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpSellerEmail">
              이메일<sup className="text-[10px]">*</sup>
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
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpSellerPassword">
              비밀번호<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpSellerPassword"
              type="password"
              placeholder="영문 + 숫자 + 특수문자"
              onChange={setSellerPassword}
              value={sellerPassword}
              triggerValidation={submitAttempted}
            />
          </div>

          <div>
            <label htmlFor="signUpSellerConfirmPassword">
              비밀번호 확인<sup className="text-[10px] m-[2px]">*</sup>
            </label>
            <LoginInput
              id="signUpSellerConfirmPassword"
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={setSellerConfirmPassword}
              value={sellerConfirmPassword}
              triggerValidation={submitAttempted}
            />
          </div>

          {/* 체크박스 약관 */}
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
    </>
  );
}

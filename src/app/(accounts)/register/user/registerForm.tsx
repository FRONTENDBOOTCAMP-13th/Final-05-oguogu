'use client';

import CheckButton from '@/components/elements/CheckButton/CheckButton';
import CommonButton from '@/components/elements/CommonButton/CommonButton';
import LoginInput from '@/components/elements/LoginItem/LoginInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/shared/data/actions/user';

export default function UserRegisterForm() {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birth, setBirth] = useState('');

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 필수값 검증
    if (!email || !password || !confirmPassword || !name || !phoneNum || !address) {
      alert('입력하지 않은 부분이 있습니다 모두 입력해주세요');
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    // 약관 체크
    if (!agreeTerms || !agreePrivacy || !isAdult) {
      alert('필수 약관에 모두 동의해주세요');
      return;
    }

    try {
      const res = await createUser({
        email,
        password,
        name,
        phone: phoneNum,
        address,
        type: 'user',
        extra: {
          birth,
          agreement: {
            agreeTerms,
            agreePrivacy,
            isAdult,
            agreeMarketing,
          },
        },
      });

      if (res.ok === 1) {
        alert('회원가입 완료');
        router.push('/login');
      } else {
        alert(res.message || '회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 오류 : ', error);
      alert('회원가입중 오류가 발생했습니다 오구 텃밭으로 전화주세요');
    }
  };

  return (
    <>
      {/* 일반 회원가입 폼 */}

      <form onSubmit={handleSubmit} className="py-4">
        <fieldset className="flex flex-col gap-6">
          <legend className="sr-only">회원가입</legend>

          {/* 이메일 */}
          <div>
            <label htmlFor="signUpUserEmail">
              이메일<sup className="text-[10px]">*</sup>
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

          {/* 이름 */}
          <div>
            <label htmlFor="signUpUserName">
              이름<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpUserName"
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={setName}
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="signUpUserPassword">
              비밀번호<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpUserPassword"
              type="password"
              placeholder="영문 + 숫자 + 특수문자"
              value={password}
              onChange={setPassword}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="signUpUserConfirmPassword">
              비밀번호 확인<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpUserConfirmPassword"
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>

          {/* 연락처 */}
          <div>
            <label htmlFor="signUpUserPhoneNumber">
              연락처<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpUserPhoneNumber"
              type="phone"
              placeholder="숫자"
              value={phoneNum}
              onChange={setPhoneNum}
            />
          </div>

          {/* 주소 */}
          <div>
            <label htmlFor="signUpUserAddress">
              주소<sup className="text-[10px]">*</sup>
            </label>
            <LoginInput
              id="signUpUserAddress"
              type="address"
              placeholder="도로명, 지번, 건물명 검색"
              value={address}
              onChange={setAddress}
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label htmlFor="signUpUserBirth">생년월일</label>
            <LoginInput
              id="signUpUserBirth"
              type="birth"
              placeholder="예: 1995-08-17"
              value={birth}
              onChange={setBirth}
            />
          </div>

          {/* 약관 동의 */}
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
              본인은 만14세 이상입니다
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

          {/* 가입 버튼 */}
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

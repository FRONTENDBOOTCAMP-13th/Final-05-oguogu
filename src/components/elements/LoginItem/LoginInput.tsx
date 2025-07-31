'use client';

import { LoginInputProps } from '@/components/elements/LoginItem/LoginInput.type';
import { useEffect, useState } from 'react';

export default function LoginInput({
  type,
  value,
  placeholder = '',
  onChange,
  triggerValidation = false,
  id,
}: LoginInputProps) {
  // CHECKLIST
  // [x] 빨간색 공통 색상 추가 필요 oguogu-red 또는 oguogu-error-message
  // [ ] 생년월일 유효성 검사
  // 로그인 폼에는 유효성 검사 아직 안넣었습니다. 폼 내 디폴트 벨류 제거할 때 최종 리팩토링하겠습니다.

  const [showPassword, setShowPassword] = useState(false);
  const [phoneParts, setPhoneParts] = useState({
    part1: value.toString().slice(0, 3),
    part2: value.toString().slice(3, 7),
    part3: value.toString().slice(7, 11),
  });
  const [birthParts, setBirthParts] = useState({
    part1: value.toString().slice(0, 4),
    part2: value.toString().slice(4, 6),
    part3: value.toString().slice(6, 8),
  });

  const [businessNumParts, setBusinessNumParts] = useState({
    part1: value.toString().slice(0, 3),
    part2: value.toString().slice(3, 5),
    part3: value.toString().slice(5, 10),
  });

  // 에러
  const [phoneError, setPhoneError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [defaultError, setDefaultError] = useState('');
  const [businessNumError, setBusinessNumError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 전화번호
  const validPrefixes = ['010', '011', '016', '017', '018', '019'];
  const isPhoneValid = (parts: typeof phoneParts) => {
    const { part1, part2, part3 } = parts;
    const isAllFilled = part1.length === 3 && part2.length === 4 && part3.length === 4;
    const isValidPrefix = validPrefixes.includes(part1);
    return isAllFilled && isValidPrefix;
  };

  // 사업자 등록 번호
  const validBusinessNumberLength = {
    part1: 3,
    part2: 2,
    part3: 5,
  };

  const isBusinessNumValid = (parts: typeof businessNumParts) => {
    const { part1, part2, part3 } = parts;
    return (
      part1.length === validBusinessNumberLength.part1 &&
      part2.length === validBusinessNumberLength.part2 &&
      part3.length === validBusinessNumberLength.part3
    );
  };

  // 사용자가 폼을 제출했을 때 각 input 타입에 따라 유효성 검사를 실행하고 에러 메세지를 출력
  // 이 useEffect는 외부에서 트리거된 제출 시점에만 동작함 - 참고

  useEffect(() => {
    if (!triggerValidation) return;

    const strVal = String(value);

    if (type === 'phone') {
      if (!isPhoneValid(phoneParts)) {
        setPhoneError('전화번호를 올바르게 입력해주세요');
      } else {
        setPhoneError('');
      }
    }

    if (type === 'business') {
      if (!isBusinessNumValid(businessNumParts)) {
        setBusinessNumError('사업자 등록번호 10자리를 모두 입력해주세요');
      } else {
        setBusinessNumError('');
      }
    }

    if (type === 'password') {
      const hasLetter = /[a-zA-Z]/.test(strVal);
      const hasNumber = /\d/.test(strVal);
      const hasSpecial = /[^a-zA-Z0-9]/.test(strVal);
      if (!hasLetter || !hasNumber || !hasSpecial) {
        setPasswordError('비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다');
      } else {
        setPasswordError('');
      }
    }

    if (type === 'text' || type === 'address') {
      if (!strVal.trim()) {
        setDefaultError('필수 입력 항목입니다.');
      } else {
        setDefaultError('');
      }
    }

    if (type === 'email') {
      const emailId = strVal.split('@')[0] || '';
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (!emailId || !emailRegex.test(emailId)) {
        setEmailIdError('올바른 형식으로 이메일을 입력해주세요');
      } else {
        setEmailIdError('');
      }
    }
  }, [triggerValidation]);

  // business , birth , phone , email, address , password , 기본 순

  if (type === 'business') {
    const handleBusinessNumChange = (key: 'part1' | 'part2' | 'part3', val: string) => {
      const onlyNumbers = val.replace(/\D/g, '');
      const maxLength = validBusinessNumberLength[key];
      const trimmed = onlyNumbers.slice(0, maxLength);

      const updated = { ...businessNumParts, [key]: trimmed };
      setBusinessNumParts(updated);

      const fullNumber = `${updated.part1}${updated.part2}${updated.part3}`;
      onChange(fullNumber);

      if (!isBusinessNumValid(updated)) {
        setBusinessNumError('사업자 등록번호 10자리를 모두 입력해주세요.');
      } else {
        setBusinessNumError('');
      }
    };

    return (
      <div>
        <div className="flex items-center gap-x-4 w-[288px] h-[36px] font-normal text-[12px] py-3 border-b-1 text-oguogu-black border-oguogu-gray-2 justify-center">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part1`}
            value={businessNumParts.part1}
            onChange={e => handleBusinessNumChange('part1', e.target.value)}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
          />
          <span className="text-oguogu-black text-[16px]">-</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part2`}
            value={businessNumParts.part2}
            onChange={e => handleBusinessNumChange('part2', e.target.value)}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
          />
          <span className="text-oguogu-black text-[16px]">-</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part3`}
            value={businessNumParts.part3}
            onChange={e => handleBusinessNumChange('part3', e.target.value)}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-[60px] text-center pl-4"
          />
        </div>
        {businessNumError && <p className="text-oguogu-red text-[12px] mt-1 px-1">{businessNumError}</p>}
      </div>
    );
  }

  // 생년월일
  // CHECKLIST
  // [ ] 유효성 검사 추후 추가

  if (type === 'birth') {
    const handleBirthChange = (key: 'part1' | 'part2' | 'part3', val: string) => {
      const updated = { ...birthParts, [key]: val };
      setBirthParts(updated);
      onChange(`${updated.part1}${updated.part2}${updated.part3}`);
    };

    return (
      <div className="flex items-center gap-x-4 w-[288px] h-[36px] font-normal text-[12px] py-3 border-b-1 text-oguogu-black border-oguogu-gray-2 justify-center">
        <input
          type="text"
          inputMode="numeric"
          id={`${id}-birth-part1`}
          value={birthParts.part1}
          onChange={e => handleBirthChange('part1', e.target.value.slice(0, 4))}
          placeholder="YYYY"
          className="placeholder-oguogu-gray-2 w-[60px] text-center ml-1"
        />
        <span className="text-oguogu-black text-[16px]">/</span>
        <input
          type="text"
          inputMode="numeric"
          id={`${id}-birth-part2`}
          value={birthParts.part2}
          onChange={e => handleBirthChange('part2', e.target.value.slice(0, 2))}
          placeholder="MM"
          className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
        />
        <span className="text-oguogu-black text-[16px]">/</span>
        <input
          type="text"
          inputMode="numeric"
          id={`${id}-birth-part3`}
          value={birthParts.part3}
          onChange={e => handleBirthChange('part3', e.target.value.slice(0, 2))}
          placeholder="DD"
          className="placeholder-oguogu-gray-2 w-[60px] text-center pl-5"
        />
      </div>
    );
  }

  if (type === 'phone') {
    const handlePhoneChange = (key: 'part1' | 'part2' | 'part3', val: string) => {
      const updated = { ...phoneParts, [key]: val };
      setPhoneParts(updated);

      const fullNumber = `${updated.part1}${updated.part2}${updated.part3}`;
      onChange(fullNumber);

      if (!isPhoneValid(updated)) {
        if (updated.part1.length === 3 && !validPrefixes.includes(updated.part1)) {
          setPhoneError('올바른 앞자리 번호(ex. 010, 011, 019)를 입력해주세요.');
        } else {
          setPhoneError('전화번호를 모두 입력해주세요');
        }
      } else {
        setPhoneError('');
      }
    };

    return (
      <div>
        <div className="flex items-center gap-x-4 w-[288px] h-[36px] font-normal text-[12px] py-3 border-b-1 text-oguogu-black border-oguogu-gray-2 justify-center">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part1`}
            value={phoneParts.part1}
            onChange={e => handlePhoneChange('part1', e.target.value.slice(0, 3).replace(/\D/g, ''))}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
          />
          <span className="text-oguogu-black text-[16px]">-</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part2`}
            value={phoneParts.part2}
            onChange={e => handlePhoneChange('part2', e.target.value.slice(0, 4).replace(/\D/g, ''))}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
          />
          <span className="text-oguogu-black text-[16px]">-</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part3`}
            value={phoneParts.part3}
            onChange={e => handlePhoneChange('part3', e.target.value.slice(0, 4).replace(/\D/g, ''))}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-[60px] text-center pl-4"
          />
        </div>
        {phoneError && <p className="text-oguogu-red text-[12px] mt-1 px-1">{phoneError}</p>}
      </div>
    );
  }

  // 이메일

  if (type === 'email') {
    const emailValue = typeof value === 'string' && value.includes('@') ? value.split('@') : [value, ''];
    const emailId = emailValue[0] || '';
    const emailDomain = emailValue[1] || '';
    const isCustom = !['naver.com', 'gmail.com'].includes(emailDomain);

    const validateEmailId = (idPart: string) => {
      // 유효한 이메일 아이디 패턴 문자로 시작해야 함

      const emailIdRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;

      if (idPart.trim() === '') {
        setEmailIdError('필수 입력 항목입니다.');
        return false;
      } else if (!emailIdRegex.test(idPart)) {
        // 유효성 검사 실패 시 에러 메시지 설정
        setEmailIdError('올바른 방법으로 아이디를 입력해주세요');
        return false;
      } else {
        setEmailIdError('');
        return true;
      }
    };

    // 이메일 아이디 또는 도메인 변경을 처리하고 부모 컴포넌트로 값을 전달하는 함수
    const handleEmailChange = (idPart: string, domainPart: string) => {
      const newEmail = domainPart ? `${idPart}@${domainPart}` : idPart;
      onChange(newEmail);

      // 아이디 부분이 변경되었을 때만 유효성 검사 수행
      if (idPart !== emailId) {
        validateEmailId(idPart);
      }
    };

    return (
      <div>
        <div className="flex items-center w-[288px] h-[36px] border-b border-oguogu-gray-2 text-[12px]">
          {/* 아이디 입력 */}
          <input
            type="text"
            placeholder={placeholder}
            value={emailId}
            onChange={e => handleEmailChange(e.target.value, emailDomain)}
            className="w-1/3 pl-2 text-left placeholder-oguogu-gray-2"
          />

          <span className=" text-oguogu-black">@</span>

          {/* 직접 입력하기 */}
          {isCustom ? (
            <input
              type="text"
              placeholder="직접 입력하기"
              value={emailDomain}
              onChange={e => handleEmailChange(emailId, e.target.value)}
              className="w-1/3 pl-2 text-left placeholder-oguogu-gray-2"
            />
          ) : (
            <div className="flex items-center w-1/3 pl-2 text-oguogu-black">{emailDomain}</div>
          )}

          {/* 도메인 , 직접 입력하기 옵션 */}
          <select
            value={isCustom ? 'custom' : emailDomain}
            onChange={e => {
              const selected = e.target.value;
              if (selected === 'custom') {
                handleEmailChange(emailId, '');
              } else {
                handleEmailChange(emailId, selected);
              }
            }}
            className="w-1/3 pl-1 text-left bg-white"
          >
            <option value="custom">직접 입력하기</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
          </select>
        </div>
        {emailIdError && <p className="text-oguogu-red text-[12px] mt-1 px-1">{emailIdError}</p>}
      </div>
    );
  }

  // CHECKLIST
  // [ ] 주소 리팩토링 필요함 - 주소 검색 api
  // [ ] 유효성 검사

  if (type === 'address') {
    return (
      <div className="flex items-center justify-between w-[288px] h-[36px] font-normal text-[12px] border-b-1 text-oguogu-black border-oguogu-gray-2">
        <input
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="placeholder-oguogu-gray-2 w-full h-full  text-[12px] pl-2 pr-3 py-3 "
        />
        <button type="button" className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M10.5 10.5L8.33 8.33M9.5 5.5C9.5 7.70914 7.70914 9.5 5.5 9.5C3.29086 9.5 1.5 7.70914 1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5C7.70914 1.5 9.5 3.29086 9.5 5.5Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  // 비밀번호

  if (type === 'password') {
    const handlePasswordChange = (val: string) => {
      onChange(val);

      const hasLetter = /[a-zA-Z]/.test(val);
      const hasNumber = /\d/.test(val);
      const hasSpecial = /[^a-zA-Z0-9]/.test(val);

      if (!hasLetter || !hasNumber || !hasSpecial) {
        setPasswordError('비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다');
      } else {
        setPasswordError('');
      }
    };

    return (
      <div>
        <div className="relative w-[288px] h-[36px]">
          <input
            type={showPassword ? 'text' : 'password'}
            id={id}
            placeholder={placeholder}
            value={String(value)}
            onChange={e => handlePasswordChange(e.target.value)}
            className="w-full h-full font-normal text-[12px] pl-2 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 font-baedal-Jua"
            style={{
              paddingTop: '12px',
              paddingBottom: '12px',
              lineHeight: '1em',
              fontFamily:
                !showPassword && value.toString().length > 0
                  ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
                  : 'var(--font-baedal-Jua)',
            }}
          />
          {value && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-sm -translate-y-1/2 cursor-pointer right-2 top-1/2 text-oguogu-blue-light"
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          )}
        </div>
        {passwordError && <p className="text-oguogu-red text-[12px] mt-1 px-1">{passwordError}</p>}
      </div>
    );
  }

  return (
    <div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={String(value)}
        onChange={e => {
          onChange(e.target.value);
          if (e.target.value.trim() === '') {
            setDefaultError('필수 입력 항목입니다');
          } else {
            setDefaultError('');
          }
        }}
        className="w-full h-[36px] font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2"
      />
      {defaultError && <p className="text-oguogu-red text-[12px] mt-1 px-1">{defaultError}</p>}
    </div>
  );
}

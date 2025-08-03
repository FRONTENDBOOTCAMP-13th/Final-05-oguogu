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
  const [telParts, setTelParts] = useState({
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

  // 대표 번호
  const validTelPrefixes = [
    '02',
    '031',
    '032',
    '033',
    '041',
    '042',
    '043',
    '044',
    '051',
    '052',
    '053',
    '054',
    '055',
    '061',
    '062',
    '063',
    '064',
    '070',
  ];
  const isTelValid = (parts: typeof telParts) => {
    const { part1, part2, part3 } = parts;
    const isAllFilled = part1.length > 0 && part2.length > 0 && part3.length === 4;
    const isValidPrefix = validTelPrefixes.includes(part1);
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

    if (type === 'tel') {
      if (!isTelValid(telParts)) {
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
            className="placeholder-oguogu-gray-2 w-full text-center"
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
            className="placeholder-oguogu-gray-2 w-full text-center"
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
            className="placeholder-oguogu-gray-2 w-full text-center"
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
            className="placeholder-oguogu-gray-2 w-full text-center"
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
            className="placeholder-oguogu-gray-2 w-full text-center"
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
            className="placeholder-oguogu-gray-2 w-full text-center"
          />
        </div>
        {phoneError && <p className="text-oguogu-red text-[12px] mt-1 px-1">{phoneError}</p>}
      </div>
    );
  }

  // 전화번호
  if (type === 'tel') {
    const handleTelChange = (key: 'part1' | 'part2' | 'part3', val: string) => {
      const updated = { ...telParts, [key]: val };
      setTelParts(updated);

      const fullNumber = `${updated.part1}${updated.part2}${updated.part3}`;
      onChange(fullNumber);

      if (!isTelValid(updated)) {
        if (!validTelPrefixes.includes(updated.part1)) {
          setPhoneError('올바른 앞자리 번호(ex. 02, 031, 053)를 입력해주세요.');
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
            value={telParts.part1}
            onChange={e => handleTelChange('part1', e.target.value.slice(0, 3).replace(/\D/g, ''))}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-full text-center"
          />
          <span className="text-oguogu-black text-[16px]">-</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part2`}
            value={telParts.part2}
            onChange={e => handleTelChange('part2', e.target.value.slice(0, 4).replace(/\D/g, ''))}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-full text-center"
          />
          <span className="text-oguogu-black text-[16px]">-</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id={`${id}-part3`}
            value={telParts.part3}
            onChange={e => handleTelChange('part3', e.target.value.slice(0, 4).replace(/\D/g, ''))}
            placeholder={placeholder}
            className="placeholder-oguogu-gray-2 w-full text-center "
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
              {showPassword ? (
                <svg
                  className="w-4 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="4"
                  viewBox="0 0 8 4"
                  fill="none"
                >
                  <path
                    d="M0.0230056 0.52703C0.00410833 0.47625 -0.00326496 0.422572 0.0013229 0.36918C0.00591077 0.315788 0.0223664 0.263768 0.0497141 0.216205C0.0770618 0.168642 0.114745 0.126505 0.160529 0.0922902C0.206313 0.0580758 0.259266 0.0324813 0.316248 0.0170247C0.37323 0.00156796 0.433081 -0.00343632 0.492252 0.00230829C0.551424 0.0080529 0.608711 0.0244295 0.660718 0.0504672C0.712724 0.0765049 0.758391 0.111674 0.79501 0.153888C0.83163 0.196103 0.858456 0.244503 0.873899 0.29622C1.80126 3.09073 6.20065 3.09113 7.1289 0.297821C7.14554 0.247444 7.17304 0.200508 7.20984 0.159695C7.24664 0.118882 7.29201 0.08499 7.34336 0.0599543C7.39472 0.0349186 7.45105 0.0192296 7.50914 0.0137828C7.56723 0.00833598 7.62595 0.0132381 7.68194 0.0282094C7.73792 0.0431807 7.79009 0.0679282 7.83544 0.101038C7.8808 0.134149 7.91847 0.174973 7.94629 0.221181C7.97411 0.26739 7.99155 0.318077 7.9976 0.370348C8.00366 0.42262 7.99821 0.475453 7.98157 0.52583C7.81993 1.02636 7.54558 1.49163 7.17558 1.89269L7.7424 2.40311C7.82338 2.47855 7.86819 2.5796 7.86717 2.68448C7.86616 2.78936 7.81941 2.88969 7.73698 2.96386C7.65456 3.03802 7.54305 3.08009 7.42649 3.081C7.30993 3.08191 7.19763 3.04159 7.11378 2.96873L6.53096 2.44431C6.21647 2.6578 5.86901 2.82881 5.49958 2.95193L5.65829 3.48595C5.67522 3.53717 5.68057 3.59093 5.67403 3.64404C5.66749 3.69716 5.64918 3.74855 5.6202 3.7952C5.59122 3.84184 5.55214 3.88279 5.50528 3.91562C5.45841 3.94845 5.40472 3.97249 5.34735 3.98634C5.28999 4.00019 5.23013 4.00355 5.17129 3.99623C5.11246 3.98891 5.05586 3.97106 5.00482 3.94373C4.95378 3.91641 4.90935 3.88015 4.87414 3.83711C4.83893 3.79408 4.81367 3.74513 4.79983 3.69316L4.63801 3.15034C4.21701 3.20634 3.78668 3.20634 3.36567 3.15034L3.20385 3.69316C3.19002 3.74513 3.16475 3.79408 3.12955 3.83711C3.09434 3.88015 3.0499 3.91641 2.99887 3.94373C2.94783 3.97106 2.89123 3.98891 2.83239 3.99623C2.77356 4.00355 2.7137 4.00019 2.65633 3.98634C2.59897 3.97249 2.54527 3.94845 2.49841 3.91562C2.45155 3.88279 2.41247 3.84184 2.38349 3.7952C2.3545 3.74855 2.3362 3.69716 2.32966 3.64404C2.32312 3.59093 2.32847 3.53717 2.3454 3.48595L2.50411 2.95193C2.13466 2.82869 1.78719 2.65754 1.47273 2.44391L0.890348 2.96873C0.806989 3.04384 0.693883 3.08608 0.575912 3.08616C0.457941 3.08623 0.344768 3.04414 0.261291 2.96913C0.177814 2.89412 0.130871 2.79235 0.130787 2.6862C0.130704 2.58005 0.177488 2.47822 0.260847 2.40311L0.827665 1.89309C0.479127 1.51867 0.20172 1.06305 0.0230056 0.52703Z"
                    fill="#3c9afa"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M5 1.8C5.32549 1.8 5.63765 1.92643 5.86781 2.15147C6.09797 2.37652 6.22727 2.68174 6.22727 3C6.22727 3.31826 6.09797 3.62348 5.86781 3.84853C5.63765 4.07357 5.32549 4.2 5 4.2C4.67451 4.2 4.36235 4.07357 4.13219 3.84853C3.90203 3.62348 3.77273 3.31826 3.77273 3C3.77273 2.68174 3.90203 2.37652 4.13219 2.15147C4.36235 1.92643 4.67451 1.8 5 1.8ZM5 0C7.04545 0 8.79227 1.244 9.5 3C8.79227 4.756 7.04545 6 5 6C2.95455 6 1.20773 4.756 0.5 3C1.20773 1.244 2.95455 0 5 0ZM1.39182 3C1.72247 3.66012 2.2359 4.2163 2.87374 4.6053C3.51158 4.9943 4.24825 5.20053 5 5.20053C5.75175 5.20053 6.48842 4.9943 7.12626 4.6053C7.7641 4.2163 8.27753 3.66012 8.60818 3C8.27753 2.33988 7.7641 1.7837 7.12626 1.3947C6.48842 1.0057 5.75175 0.799472 5 0.799472C4.24825 0.799472 3.51158 1.0057 2.87374 1.3947C2.2359 1.7837 1.72247 2.33988 1.39182 3Z"
                    fill="#3c9afa"
                  />
                </svg>
              )}
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

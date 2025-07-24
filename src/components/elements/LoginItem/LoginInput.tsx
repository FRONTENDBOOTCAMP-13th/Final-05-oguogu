'use client';

import { LoginInputProps } from '@/components/elements/LoginItem/LoginInput.type';
import { useState } from 'react';

export default function LoginInput({ type, value, placeholder = '', onChange, options, id }: LoginInputProps) {
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

  if (type === 'birth') {
    const handleBirthChange = (key: 'part1' | 'part2' | 'part3', val: string) => {
      const updated = { ...birthParts, [key]: val };
      setBirthParts(updated);
      onChange(`${updated.part1}${updated.part2}${updated.part3}`);
    };

    return (
      <div className="flex items-center gap-x-4 w-[288px] h-[36px] font-normal text-[12px] py-3 border-b-1 text-oguogu-black border-oguogu-gray-2 justify-center">
        <input
          type="number"
          id={`${id}-birth-part1`}
          value={birthParts.part1}
          onChange={e => handleBirthChange('part1', e.target.value.slice(0, 4))}
          placeholder="YYYY"
          className="placeholder-oguogu-gray-2 w-[60px] text-center ml-1"
        />
        <span className="text-oguogu-black text-[16px]">/</span>
        <input
          type="number"
          id={`${id}-birth-part2`}
          value={birthParts.part2}
          onChange={e => handleBirthChange('part2', e.target.value.slice(0, 2))}
          placeholder="MM"
          className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
        />
        <span className="text-oguogu-black text-[16px]">/</span>
        <input
          type="number"
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
      onChange(`${updated.part1}${updated.part2}${updated.part3}`);
    };

    return (
      <div className="flex items-center gap-x-4 w-[288px] h-[36px] font-normal text-[12px] py-3 border-b-1 text-oguogu-black border-oguogu-gray-2 justify-center">
        <input
          type="number"
          id={`${id}-part1`}
          value={phoneParts.part1}
          onChange={e => handlePhoneChange('part1', e.target.value.slice(0, 3))}
          placeholder={placeholder}
          className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
        />
        <span className="text-oguogu-black text-[16px]">-</span>
        <input
          type="number"
          id={`${id}-part2`}
          value={phoneParts.part2}
          onChange={e => handlePhoneChange('part2', e.target.value.slice(0, 4))}
          placeholder={placeholder}
          className="placeholder-oguogu-gray-2 w-[60px] text-center pl-2"
        />
        <span className="text-oguogu-black text-[16px]">-</span>
        <input
          type="number"
          id={`${id}-part3`}
          value={phoneParts.part3}
          onChange={e => handlePhoneChange('part3', e.target.value.slice(0, 4))}
          placeholder={placeholder}
          className="placeholder-oguogu-gray-2 w-[60px] text-center pl-4"
        />
      </div>
    );
  }

  if (type === 'email') {
    const emailValue = typeof value === 'string' && value.includes('@') ? value.split('@') : [value, ''];
    const emailId = emailValue[0] || '';
    const emailDomain = emailValue[1] || '';

    const handleEmailChange = (idPart: string, domainPart: string) => {
      const newEmail = domainPart ? `${idPart}@${domainPart}` : idPart;
      onChange(newEmail);
    };

    return (
      <div className="flex items-center w-[288px] h-[36px] font-normal text-[12px] pl-2 py-3 border-b-1 text-oguogu-black border-oguogu-gray-2">
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={emailId}
          onChange={e => handleEmailChange(e.target.value, emailDomain)}
          className="placeholder-oguogu-gray-2 w-[120px] text-left"
        />
        <div className="flex gap-1">
          <span className="text-oguogu-black">@</span>
          <select value={emailDomain} onChange={e => handleEmailChange(emailId, e.target.value)} className="w-[140px]">
            <option value="">선택하기</option>
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (type === 'address') {
    return (
      <div className="flex items-center justify-between w-[288px] h-[36px] font-normal text-[12px] pl-2 pr-3 py-3 border-b-1 text-oguogu-black border-oguogu-gray-2">
        <input
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="placeholder-oguogu-gray-2"
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

  if (type === 'password') {
    return (
      <div className="relative w-[288px] h-[36px]">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          value={String(value)}
          onChange={e => onChange(e.target.value)}
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-ogugu-blue-light cursor-pointer"
          >
            {showPassword ? '숨기기' : '보기'}
          </button>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={String(value)}
      onChange={e => onChange(e.target.value)}
      className="w-[288px] h-[36px] font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2"
    />
  );
}

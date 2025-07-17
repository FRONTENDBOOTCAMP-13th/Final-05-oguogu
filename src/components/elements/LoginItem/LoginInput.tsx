import { LoginInputProps } from '@/components/elements/LoginItem/LoginInput.type';
import { useState } from 'react';

export default function LoginInput({ type, value, placeholder = '', onChange, options, id }: LoginInputProps) {
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');

  const [phoneParts, setPhoneParts] = useState({
    part1: value.toString().slice(0, 3),
    part2: value.toString().slice(3, 7),
    part3: value.toString().slice(7, 11),
  });

  // 3-4-4 형식의 전화번호 스타일
  if (type === 'phone') {
    const handlePhoneChange = (key: 'part1' | 'part2' | 'part3', val: string) => {
      const updated = { ...phoneParts, [key]: val };
      setPhoneParts(updated);
      onChange(`${updated.part1}${updated.part2}${updated.part3}`);
    };
    return (
      <>
        <div className="flex items-center gap-x-4 w-[288px] h-[36px] font-normal text-[12px] py-3 border-b-1 text-oguogu-black border-oguogu-gray-2">
          <input
            type="number"
            id={`${id}-part1`}
            value={phoneParts.part1}
            onChange={e => handlePhoneChange('part1', e.target.value.slice(0, 3))}
            placeholder={placeholder}
            maxLength={3}
            className="placeholder-oguogu-gray-2 w-[70px] text-center"
          />
          <span className="inline-block text-oguogu-black">-</span>
          <input
            type="number"
            id={`${id}-part2`}
            value={phoneParts.part2}
            onChange={e => handlePhoneChange('part2', e.target.value.slice(0, 4))}
            placeholder={placeholder}
            maxLength={4}
            className="placeholder-oguogu-gray-2 w-[70px] text-center"
          />
          <span className="inline-block text-oguogu-black">-</span>
          <input
            type="number"
            id={`${id}-part3`}
            value={phoneParts.part3}
            onChange={e => handlePhoneChange('part3', e.target.value.slice(0, 4))}
            placeholder={placeholder}
            maxLength={4}
            className="placeholder-oguogu-gray-2 w-[70px] text-center"
          />
        </div>
      </>
    );
  }

  if (type === 'email') {
    const handleEmailChange = (id: string, domain: string) => {
      onChange(domain ? `${id}@${domain}` : id);
    };

    return (
      <div className="flex  items-center w-[288px] h-[36px] font-normal text-[12px] pl-2 py-3 border-b-1 text-oguogu-black border-oguogu-gray-2">
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={emailId}
          onChange={e => {
            setEmailId(e.target.value);
            handleEmailChange(e.target.value, emailDomain);
          }}
          className={`placeholder-oguogu-gray-2 w-[120px] ${value ? 'text-center' : 'text-left'}`}
        />
        <div className="flex gap-1">
          <span className="text-oguogu-black inline-block">@</span>
          <select
            value={emailDomain}
            onChange={e => {
              setEmailDomain(e.target.value);
              handleEmailChange(emailId, e.target.value);
            }}
            className="w-[140px]"
          >
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
        <button type="submit" className="cursor-pointer">
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

  // 기본 input (text, password)
  return (
    <>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={String(value)}
        onChange={e => onChange(e.target.value)}
        className={`w-[288px] h-[36px] font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2`}
      />
    </>
  );
}

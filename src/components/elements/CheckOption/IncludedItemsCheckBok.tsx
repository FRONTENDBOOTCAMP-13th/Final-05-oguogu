'use client';

import { useState } from 'react';

const size = 15; // 아이콘 크기 15px로 지정

const CheckedIcon = () => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      fill="none"
      className="absolute top-0 left-0"
      width={size}
      height={size}
    >
      <path
        d="M7.0332 0C10.9175 7.03683e-05 14.0663 3.1489 14.0664 7.0332C14.0663 10.9175 10.9175 14.0663 7.0332 14.0664C3.1489 14.0663 7.03703e-05 10.9175 0 7.0332C7.05161e-05 3.1489 3.1489 7.05141e-05 7.0332 0Z"
        fill="#489F51"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 6 4"
      fill="none"
      className="absolute"
      style={{
        top: size * 0.3,
        left: size * 0.27,
        width: size * 0.4,
        height: size * 0.4,
      }}
    >
      <path
        d="M4.63955 0.373063C4.83477 0.177846 5.15131 0.177938 5.34659 0.373063C5.54172 0.568335 5.5418 0.884875 5.34659 1.08009L2.73331 3.69338C2.63957 3.78711 2.51235 3.83982 2.37979 3.83986C2.24729 3.83983 2.12 3.78703 2.02627 3.69338L0.719633 2.38673C0.524482 2.19146 0.524408 1.87493 0.719633 1.6797C0.91486 1.4845 1.2314 1.48456 1.42666 1.6797L2.37979 2.63283L4.63955 0.373063Z"
        fill="#FAFAFA"
      />
    </svg>
  </div>
);

const UncheckedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" width={size} height={size}>
    <path
      d="M7.0332 0C10.9175 7.03683e-05 14.0663 3.1489 14.0664 7.0332C14.0663 10.9175 10.9175 14.0663 7.0332 14.0664C3.1489 14.0663 7.03703e-05 10.9175 0 7.0332C7.05161e-05 3.1489 3.1489 7.05141e-05 7.0332 0ZM7.0332 1C3.70119 1.00007 1.00007 3.70119 1 7.0332C1.00007 10.3652 3.70119 13.0663 7.0332 13.0664C10.3652 13.0663 13.0663 10.3652 13.0664 7.0332C13.0663 3.70119 10.3652 1.00007 7.0332 1ZM8.63965 5.37305C8.83486 5.17783 9.15141 5.17792 9.34668 5.37305C9.54181 5.56832 9.5419 5.88486 9.34668 6.08008L6.7334 8.69336C6.63966 8.7871 6.51244 8.83981 6.37988 8.83984C6.24738 8.83981 6.1201 8.78702 6.02637 8.69336L4.71973 7.38672C4.52458 7.19145 4.5245 6.87491 4.71973 6.67969C4.91495 6.48448 5.23149 6.48454 5.42676 6.67969L6.37988 7.63281L8.63965 5.37305Z"
      fill="black"
    />
  </svg>
);

const includedOptions = ['조식', '중식', '석식', '야식', '간식', '숙소', '픽업'];

export default function IncludedItemsCheckbox({ onChange }: { onChange?: (items: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (item: string) => {
    setSelected(prev => {
      const next = prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item];
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-[16px]">
        <span>포함</span>
        <sup className="text-[10px] px-[2px]">*</sup>
      </div>
      <div className="flex flex-wrap gap-3">
        {includedOptions.map(option => {
          const isChecked = selected.includes(option);
          return (
            <label key={option} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={option}
                checked={isChecked}
                onChange={() => handleChange(option)}
                className="accent-oguogu-main hidden"
              />
              <span>{isChecked ? <CheckedIcon /> : <UncheckedIcon />}</span>
              <span className="text-[14px]">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

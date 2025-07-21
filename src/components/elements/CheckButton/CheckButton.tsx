'use client';
import CheckButtonType from '@/components/elements/CheckButton/CheckButton.type';
import { checkedSVG, uncheckedSVG } from '@/components/elements/CheckButton/CheckSvg';

export default function CheckButton({ children, size = 14, gap = 2, agreement, checked, onChange }: CheckButtonType) {
  return (
    <label className={`flex items-center gap-${gap} text-[${size}px] font-normal leading-[14px] h-fit`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {checked ? checkedSVG({ size }) : uncheckedSVG({ size })}
      <span>
        {children}
        {agreement === 'required' && <span className="text-oguogu-gray-3 text-[12px] ml-2">(필수)</span>}
        {agreement === 'optional' && <span className="text-oguogu-gray-3 text-[12px] ml-2">(선택)</span>}
      </span>
    </label>
  );
}

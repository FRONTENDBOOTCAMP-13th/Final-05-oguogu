'use client';

import { checkedSVG, uncheckedSVG } from '@/components/elements/CheckButton/CheckSvg';
import { useState } from 'react';

interface CheckButtonProps {
  children: string;
  size: number;
  gap: number;
}

export default function CheckButton({ children, size = 14, gap = 2 }: CheckButtonProps) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <label className={`flex items-center gap-${gap} text-[${size}px] font-normal leading-[14px] h-fit`}>
        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="sr-only" />
        {checked ? checkedSVG({ size }) : uncheckedSVG({ size })}

        <span>{children}</span>
      </label>
    </>
  );
}

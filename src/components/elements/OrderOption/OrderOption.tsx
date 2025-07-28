'use client';

import { useState } from 'react';

const orderOptions = [
  { label: '전체', value: 'all' },
  { label: '배송완료', value: 'delivered' },
  { label: '구매완료', value: 'OS020' },
  { label: '환불 접수', value: 'refundInProgress' },
  { label: '환불 완료', value: 'refundCompleted' },
];

export default function OrderDropdown({ onChange }: { onChange?: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(orderOptions[0]);

  return (
    <div className="relative w-full max-w-[400px]">
      <button
        type="button"
        className="w-full relative px-4 py-1 text-[12px] border border-oguogu-gray-2 rounded-[4px] flex items-center justify-center"
        onClick={() => setOpen(prev => !prev)}
      >
        <span>{selected.label}</span>
        <span className="absolute right-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {orderOptions.map(option => (
            <li
              key={option.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selected.value === option.value ? 'bg-gray-100 ' : ''}`}
              onClick={() => {
                setSelected(option);
                setOpen(false);
                onChange?.(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

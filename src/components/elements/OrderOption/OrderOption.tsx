'use client';

import { useState } from 'react';

export interface OrderDropdownType {
  onChange?: (value: string) => void;
  selected: { label: string; value: string };
  setSelected: (option: { label: string; value: string }) => void; // 수정
  orderOptions: { label: string; value: string }[];
}

export default function OrderDropdown({ onChange, selected, setSelected, orderOptions }: OrderDropdownType) {
  const [open, setOpen] = useState(false);

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

// 상품관리 페이지 ( 상품 / 업로드)

// 상품

const productOptions = [
  { label: '전체', value: 'all' },
  { label: '농산물', value: 'crop' },
  { label: '체험', value: 'experience' },
  { label: '텃밭', value: 'gardening' },
];

export function ProductDropdown({ onChange }: { onChange?: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(productOptions[0]);

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
          {productOptions.map(option => (
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

const uploadOptions = [
  { label: '최근 업로드 순', value: 'recent' },
  { label: '오래된 순', value: 'oldest' },
  { label: '가격 높은 순', value: 'priceHigh' },
  { label: '가격 낮은 순', value: 'priceLow' },
  { label: '재고 많은 순', value: 'stockHigh' },
  { label: '재고 적은 순', value: 'stockLow' },
];

export function UploadDropdown({ onChange }: { onChange?: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(uploadOptions[0]);

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
          {uploadOptions.map(option => (
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

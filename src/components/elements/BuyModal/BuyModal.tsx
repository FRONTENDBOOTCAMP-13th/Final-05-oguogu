// components/elements/BuyBox/BuyModal.tsx
'use client';
import BuyBoxOption from '@/components/elements/BuyBoxForMobile/BuyBoxOption';
import { useEffect, useRef } from 'react';

interface BuyModalProps {
  onClose: () => void;
  type: 'crop' | 'experience' | 'gardening';
}

export default function BuyModal({ onClose, type }: BuyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleBuy = () => {
    onClose();
    alert('장바구니에 담겼습니다.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center max-w-[320px] mx-auto">
      {/* 반투명 배경 + 블러 (상위에서 오버레이 추가한 경우 생략 가능) */}
      {/* <div className="absolute inset-0 backdrop-blur-sm bg-black/10" onClick={onClose} /> */}

      {/* 모달 본체 */}
      <div ref={modalRef} className="w-full bg-white rounded-t-2xl  p-4 max-h-[80vh]  animate-slide-up">
        <BuyBoxOption type={type} name="감자 캐기 체험" price={10000} maxQuantity={4} />

        {/* 확인 버튼 */}
        <button
          className={`flex items-center justify-center text-center
         bg-oguogu-main text-oguogu-white 
         text-[16px] h-[44px]
         px-[24px] py-[6px] rounded-[4px] w-full`}
          onClick={handleBuy}
        >
          {type === 'crop' ? '장바구니 담기' : '구매하기'}
        </button>
      </div>
    </div>
  );
}

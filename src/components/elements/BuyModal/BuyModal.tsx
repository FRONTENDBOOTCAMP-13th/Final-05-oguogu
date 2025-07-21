// components/elements/BuyBox/BuyModal.tsx
'use client';

import BuyBoxOption from '@/components/elements/BuyBoxForMobile/BuyBoxOption';
import { createCart } from '@/shared/data/actions/cart';
import { useAuthStore } from '@/shared/store/authStore';
import { res } from '@/shared/types/product';
import { useEffect, useRef } from 'react';

interface BuyModalProps {
  onClose: () => void;
  type: 'crop' | 'experience' | 'gardening' | undefined;
  res: res;
}

export default function BuyModal({ onClose, type, res }: BuyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isLoggedIn: boolean = useAuthStore(state => state.isLoggedIn); //전역 로그인 속성

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

  const handleBuy = async (product_id: number, quantity: number, token: string) => {
    console.log('구매 핸들러 동작');
    if (isLoggedIn) {
      await createCart({ product_id, quantity, token });
      onClose();
      alert('장바구니에 담겼습니다.');
    } else {
      onClose();
      alert('장바구니 기능은 로그인이 필요합니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 left-1/2 translate-x-[-50%] flex items-end min-w-[320px] max-w-[768px] w-full ">
      {/* 반투명 배경 + 블러 (상위에서 오버레이 추가한 경우 생략 가능) */}
      {/* <div className="absolute inset-0 backdrop-blur-sm bg-black/10" onClick={onClose} /> */}

      {/* 모달 본체 */}
      <div ref={modalRef} className="w-full bg-white rounded-t-2xl  p-4 max-h-[80vh]  animate-slide-up">
        {type === 'crop' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra.dcRate / 100)}
            maxQuantity={res.item.quantity - res.item.buyQuantity}
            handleBuy={handleBuy}
            product_id={res.item._id}
          />
        )}
        {type === 'experience' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra.dcRate / 100)}
            maxQuantity={res.item.quantity - res.item.buyQuantity}
            handleBuy={handleBuy}
            product_id={res.item._id}
          />
        )}
        {type === 'gardening' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra.dcRate / 100)}
            handleBuy={handleBuy}
            product_id={res.item._id}
          />
        )}
        {/* 확인 버튼 */}
      </div>
    </div>
  );
}

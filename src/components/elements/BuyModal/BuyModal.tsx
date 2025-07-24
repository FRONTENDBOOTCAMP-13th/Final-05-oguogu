// components/elements/BuyBox/BuyModal.tsx
'use client';

import BuyBoxOption from '@/components/elements/BuyBoxForMobile/BuyBoxOption';
import { BuyModalProps } from '@/components/elements/BuyModal/BuyModal.type';
import { createCart } from '@/shared/data/actions/cart';
import { useAuthStore } from '@/shared/store/authStore';
import { useEffect, useRef } from 'react';

/**
 * 상품 구매 옵션을 선택할 수 있는 모달 컴포넌트입니다.
 * crop, experience, gardening 타입별로 다른 옵션을 보여주며,
 * 장바구니에 상품을 추가할 수 있는 기능을 제공합니다.
 *
 * @component
 * @param {BuyModalProps} props - 모달 동작과 상품 데이터, 타입 정보
 * @param {() => void} props.onClose - 모달 닫기 핸들러
 * @param {'crop' | 'experience' | 'gardening'} props.type - 상품 유형
 * @param props.res - 상품 정보 응답 객체 (getProduct 결과)
 * @returns 구매 모달 UI
 */

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

  /**
   * 장바구니에 상품을 추가하고 모달을 닫습니다.
   * 로그인 여부에 따라 다르게 동작합니다.
   *
   * @param {number} product_id - 상품 ID
   * @param {number} quantity - 수량
   * @param {string} token - 사용자 인증 토큰
   */
  const handleBuy = async (product_id: number, quantity: number, token: string) => {
    console.log('구매 핸들러 동작');
    if (isLoggedIn) {
      await createCart({ product_id, quantity }, token);
      onClose();
      alert('장바구니에 담겼습니다.');
    } else {
      onClose();
      alert('장바구니 기능은 로그인이 필요합니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 left-1/2 translate-x-[-50%] flex items-end min-w-[320px] max-w-[768px] w-full ">
      {/* 모달 본체 */}
      <div ref={modalRef} className="w-full bg-white rounded-t-2xl  p-4 max-h-[80vh]  animate-slide-up">
        {type === 'crop' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra!.dcRate / 100)}
            maxQuantity={res.item.quantity! - res.item.buyQuantity!}
            handleBuy={handleBuy}
            product_id={res.item._id}
          />
        )}
        {type === 'experience' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra!.dcRate / 100)}
            maxQuantity={res.item.quantity! - res.item.buyQuantity!}
            handleBuy={handleBuy}
            product_id={res.item._id}
          />
        )}
        {type === 'gardening' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra!.dcRate / 100)}
            handleBuy={handleBuy}
            product_id={res.item._id}
          />
        )}
        {/* 확인 버튼 */}
      </div>
    </div>
  );
}

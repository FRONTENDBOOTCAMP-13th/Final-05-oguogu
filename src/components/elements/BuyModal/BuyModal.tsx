'use client';

import BuyBoxOption from '@/components/elements/BuyBoxForMobile/BuyBoxOption';
import { BuyModalProps } from '@/components/elements/BuyModal/BuyModal.type';
import { createCart } from '@/shared/data/actions/cart';
import { getCart } from '@/shared/data/functions/cart';
import { getOrders } from '@/shared/data/functions/order';
import { useAuthStore } from '@/shared/store/authStore';
import { CartItem } from '@/shared/types/cart';
import { Order } from '@/shared/types/order';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

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

export default function BuyModal({ onClose, type, res, onSuccess }: BuyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isLoggedIn: boolean = useAuthStore(state => state.isLoggedIn); // 전역 로그인 속성
  const userId = useAuthStore(state => state.userInfo?._id);
  const token = useAuthStore(state => state.token);

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
  const handleBuy = async (product_id: number, quantity: number) => {
    if (!isLoggedIn || !token || !userId) {
      toast.error('로그인이 필요합니다!');
      onClose();
      return;
    }

    /* 전체 주문 목록에서 환불 상태가 아닌 상품 중 해당 상품을 확인 */
    const orderList = await getOrders(token);
    console.log('전체 주문 목록', orderList);

    const unrefundOrderList = orderList.item.filter(
      (item: Order) =>
        item.state !== 'refundCompleted' && item.state !== 'refundInProgress' && item.state !== 'purchaseCompleted',
    );
    console.log(`\t전체 주문 목록 중 환불 및 구매 완료 상태가 아닌 목록`, unrefundOrderList);

    const isInOrderList = unrefundOrderList
      .filter((item: Order) => item.products[0]._id === product_id)
      .filter((item: Order) => item.products[0].extra.productType === 'gardening');
    console.log(`\t현재 상품이 주문 목록에 존재하면 데이터 추출`, isInOrderList);

    /* 전체 장바구니 목록에서 해당 상품을 확인 */
    const cartList = await getCart(token);
    console.log('전체 장바구니 목록', cartList);

    const isInCartList = cartList.item
      .filter((item: CartItem) => item.product_id === product_id)
      .filter((item: CartItem) => item.product.extra.productType === 'gardening');
    console.log(`\t현재 상품이 장바구니 목록에 존재하면 데이터 추출`, isInCartList);

    /* 주문 목록에 환불 상태가 아닌 상품이 있으면 장바구니 담지 않기 */
    if (isInOrderList.length) {
      toast.error('동일한 텃밭 상품은 구매가 완료되어야 재주문이 가능합니다.');
      return;
    }

    /* 장바구니 목록에 상품이 있으면 장바구니 담지 않기 */
    if (isInCartList.length) {
      toast.error('해당 텃밭 상품이 이미 장바구니에 존재합니다.');
      return;
    }

    try {
      await createCart({ product_id, quantity }, token);
      onSuccess(); // <-- 성공 시 상위에 알림 요청
    } catch (e) {
      console.error('장바구니 담기 실패', e);
    }
  };
  return (
    <div className="fixed inset-0 z-50 left-1/2 translate-x-[-50%] flex items-end min-w-[320px] max-w-[768px] w-full ">
      {/* 모달 본체 */}
      <div ref={modalRef} className="w-full bg-white rounded-t-2xl  px-4 py-3 max-h-[80vh]  animate-slide-up">
        {type === 'crop' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra!.dcRate! / 100)}
            maxQuantity={res.item.quantity! - res.item.buyQuantity!}
            handleBuy={handleBuy}
            product_id={res.item._id}
            res={res}
          />
        )}
        {type === 'experience' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra!.dcRate! / 100)}
            maxQuantity={res.item.quantity! - res.item.buyQuantity!}
            handleBuy={handleBuy}
            product_id={res.item._id}
            res={res}
          />
        )}
        {type === 'gardening' && (
          <BuyBoxOption
            type={type}
            name={res.item.name}
            price={res.item.price * (1 - res.item.extra!.dcRate! / 100)}
            handleBuy={handleBuy}
            product_id={res.item._id}
            res={res}
          />
        )}
        {/* 확인 버튼 */}
      </div>
    </div>
  );
}

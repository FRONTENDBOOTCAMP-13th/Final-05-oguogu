'use client';

import { useEffect, useState } from 'react';
import { BuyBoxOptionType } from '@/components/elements/BuyBoxForMobile/BuyBoxOption.type';
import BuyBoxOptionExtraItem from '@/components/elements/BuyBoxForMobile/BuyBoxOptionExtraItem';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuthStore } from '@/shared/store/authStore';

// 체험 상품 더미 데이터
const rawData = [
  {
    _id: 1,
    quantity: 16,
    buyQuantity: 0,
    extra: {
      departureDate: new Date('2025-07-26T10:00:00'),
    },
  },
  {
    _id: 2,
    quantity: 16,
    buyQuantity: 4,
    price: 10000,
    name: '고구마캐기 체험',
    extra: {
      productType: 'experience',
      departureDate: new Date('2025-07-26T14:00:00'),
      maxQuantity: 4,
    },
  },
  {
    _id: 3,
    quantity: 16,
    buyQuantity: 16,
    price: 10000,
    name: '감자캐기 체험',
    extra: {
      productType: 'experience',
      departureDate: new Date('2025-07-27T10:00:00'),
      maxQuantity: 4,
    },
  },
];

/**
 * 구매하기 버튼을 클랙했을 때 모달창으로 나타나는 옵션 선택 및 구매 관련 컴포넌트
 * 상품 유형에 따라 수량 또는 날짜(체험 상품)를 선택할 수 있으며, 최종 수량 및 총 금액을 표시
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.name - 상품명
 * @param {number} props.price - 개당/인당 금액
 * @param {number} props.maxQuantity - 최대 구매 가능 수량
 * @param {'crop' | 'experience' | 'gardening'} props.type - 상품 유형
 * @returns {JSX.Element} 구매 옵션 선택 영역
 */
export default function BuyBoxOption({ name, price, maxQuantity = 1, type, handleBuy, product_id }: BuyBoxOptionType) {
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const TOKEN = useAuthStore(state => state.token); //전역 관리중인 사용자 토큰

  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    if (count < maxQuantity) {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    setTotalPrice(price * count);
  }, [price, count]);

  // 체험 상품 데이터 추출
  const data = rawData;

  return (
    <div className="text-base flex flex-col gap-6 p-4 rounded-se-xl rounded-ss-xl">
      {/* 상품명 */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-oguogu-gray-4">상품명</span>
        <h3 className="text-xl max-w-full textElipsis">{name}</h3>
      </div>

      {/* 날짜 선택 : 체험 상품 전용 */}

      {type === 'experience' ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-oguogu-gray-4">날짜 선택</span>
          <div className="flex gap-3 max-w-full overflow-auto hide-scrollbar">
            {/* 선택 가능 & 선택됨 */}
            {data.map(item => {
              const { _id, quantity, buyQuantity } = item;

              const formattedDate = format(item.extra.departureDate, 'M월 d일 (eee)', { locale: ko });
              const formattedTime = format(item.extra.departureDate, 'HH:mm');

              return (
                <BuyBoxOptionExtraItem
                  key={_id}
                  date={formattedDate}
                  time={formattedTime}
                  count={quantity - buyQuantity}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}

      {/* 수량 선택 */}
      {type === 'gardening' ? (
        ''
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-oguogu-gray-4">{type === 'experience' ? '인원' : '수량'} 선택</span>
          <div className="flex justify-between">
            {/* 버튼 영역 */}
            <div className="flex gap-0 text-xs">
              <button
                type="button"
                className="w-7 h-7 border border-oguogu-gray-2 flex justify-center items-center cursor-pointer"
                onClick={minusCount}
              >
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0.996094H9" stroke="black" strokeLinecap="round" />
                </svg>
              </button>
              <p className="w-7 h-7 border-t border-b border-oguogu-gray-2 text-center content-center">{count}</p>
              <button
                type="button"
                className="w-7 h-7 border border-oguogu-gray-2 flex justify-center items-center cursor-pointer"
                onClick={addCount}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.00391 0.5C5.28005 0.5 5.50391 0.723858 5.50391 1V4.49609H9C9.27614 4.49609 9.5 4.71995 9.5 4.99609C9.5 5.27224 9.27614 5.49609 9 5.49609H5.50391V9C5.50391 9.27614 5.28005 9.5 5.00391 9.5C4.72776 9.5 4.50391 9.27614 4.50391 9V5.49609H1C0.723858 5.49609 0.5 5.27224 0.5 4.99609C0.5 4.71995 0.723858 4.49609 1 4.49609H4.50391V1C4.50391 0.723858 4.72776 0.5 5.00391 0.5Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>

            {/* 개당 금액 및 최대 구매 가능 수량 */}
            <div className="flex flex-col items-end">
              <div className="flex gap-2 text-xs">
                <span>{type === 'experience' ? '인' : '개'}당</span>
                <div className="flex gap-1">
                  <span>{price.toLocaleString()}</span>
                  <span>원</span>
                </div>
              </div>
              <div className="text-[8px] text-oguogu-gray-3">
                <span>최대&nbsp;</span>
                <span>{maxQuantity}</span>
                <span>{type === 'experience' ? '명 예약' : '개 구매'} 가능</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 총 수량 및 최종 금액 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <span>{type === 'experience' ? '총 인원' : '총 수량'}</span>
          <div className="flex gap-2">
            <span className="text-oguogu-main">{count}</span>
            <span>{type === 'experience' ? '명' : '개'}</span>
          </div>
        </div>
        <div className="text-xl flex gap-2">
          <span className="text-oguogu-main">{totalPrice.toLocaleString()}</span>
          <span>원</span>
        </div>
      </div>
      <button
        className={`flex items-center justify-center text-center
         bg-oguogu-main text-oguogu-white 
         text-[16px] h-[44px]
         px-6 py-1.5 rounded-sm w-full`}
        onClick={() => {
          console.log('버튼 클릭됨');
          console.log('TOKEN:', TOKEN);
          if (!TOKEN) {
            alert('로그인이 필요합니다.');
            return;
          }
          handleBuy(product_id, count, TOKEN);
        }}
      >
        {type === 'crop' ? '장바구니 담기' : '구매하기'}
      </button>
    </div>
  );
}
